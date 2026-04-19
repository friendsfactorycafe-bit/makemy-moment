/**
 * Auto-submit URLs to Google Indexing API (200/day quota)
 *
 * Calls Google Indexing API directly — no dev server needed.
 * Tracks progress in scripts/indexing-progress.json so it
 * picks up where it left off each day.
 *
 * Usage:
 *   npx tsx scripts/submit-urls.ts          # submit next 200
 *   npx tsx scripts/submit-urls.ts --reset   # reset progress & start over
 *   npx tsx scripts/submit-urls.ts --status  # show progress without submitting
 *
 * Automate with cron (runs daily at 2 AM):
 *   0 2 * * * cd /path/to/makemymoment && npx tsx scripts/submit-urls.ts >> scripts/indexing.log 2>&1
 *
 * Or use launchd on macOS — see scripts/com.bookmymoment.indexing.plist
 */

import * as fs from "fs";
import * as path from "path";
import { GoogleAuth } from "google-auth-library";
import * as dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const BASE_URL = "https://bookmymoment.in";
const DAILY_QUOTA = 200;
const SCOPES = ["https://www.googleapis.com/auth/indexing"];
const INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const PROGRESS_FILE = path.join(__dirname, "indexing-progress.json");

interface Progress {
  submittedUrls: string[];
  lastRunDate: string;
  lastRunCount: number;
  totalSubmitted: number;
}

// ── Helpers ──────────────────────────────────────────────

function loadProgress(): Progress {
  if (fs.existsSync(PROGRESS_FILE)) {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
  }
  return { submittedUrls: [], lastRunDate: "", lastRunCount: 0, totalSubmitted: 0 };
}

function saveProgress(progress: Progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

function parseCSV(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.trim().split("\n").slice(1);
  return lines.map((line) => line.split(",")[0].trim()).filter(Boolean);
}

function toSlug(keyword: string): string {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getAllUrls(): string[] {
  const keywordsDir = path.join(process.cwd(), "seo-keywords");
  const urls: string[] = [
    BASE_URL,
    `${BASE_URL}/vadodara`,
    `${BASE_URL}/surat`,
  ];

  const vadodaraKeywords = parseCSV(path.join(keywordsDir, "vadodara-keywords.csv"));
  const suratKeywords = parseCSV(path.join(keywordsDir, "surat-keywords.csv"));

  for (const kw of vadodaraKeywords) urls.push(`${BASE_URL}/vadodara/${toSlug(kw)}`);
  for (const kw of suratKeywords) urls.push(`${BASE_URL}/surat/${toSlug(kw)}`);

  return urls;
}

function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  if (!privateKey || !clientEmail) {
    console.error("ERROR: Missing GOOGLE_PRIVATE_KEY or GOOGLE_CLIENT_EMAIL in .env.local");
    process.exit(1);
  }
  return new GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: SCOPES,
  });
}

// ── Main ─────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // --reset flag
  if (args.includes("--reset")) {
    if (fs.existsSync(PROGRESS_FILE)) fs.unlinkSync(PROGRESS_FILE);
    console.log("Progress reset. Will start from the beginning on next run.");
    return;
  }

  const allUrls = getAllUrls();
  const progress = loadProgress();
  const submittedSet = new Set(progress.submittedUrls);
  const pending = allUrls.filter((u) => !submittedSet.has(u));

  // --status flag
  if (args.includes("--status")) {
    console.log(`Total URLs:     ${allUrls.length}`);
    console.log(`Submitted:      ${progress.totalSubmitted}`);
    console.log(`Remaining:      ${pending.length}`);
    console.log(`Last run:       ${progress.lastRunDate || "never"}`);
    console.log(`Last run count: ${progress.lastRunCount}`);
    if (pending.length === 0) console.log("\n✅ All URLs have been submitted!");
    else console.log(`\nDays remaining: ~${Math.ceil(pending.length / DAILY_QUOTA)}`);
    return;
  }

  // Check if anything left
  if (pending.length === 0) {
    console.log("✅ All URLs already submitted! Use --reset to resubmit.");
    return;
  }

  // Take today's batch (max 200)
  const todayBatch = pending.slice(0, DAILY_QUOTA);
  const today = new Date().toISOString().split("T")[0];

  console.log(`📅 ${today}`);
  console.log(`Total: ${allUrls.length} | Already submitted: ${progress.totalSubmitted} | Today: ${todayBatch.length} | After today: ${pending.length - todayBatch.length} remaining`);
  console.log("");

  // Authenticate once
  const auth = getAuth();
  const client = await auth.getClient();

  let successCount = 0;
  let errorCount = 0;
  let quotaHit = false;

  for (let i = 0; i < todayBatch.length; i++) {
    const url = todayBatch[i];
    try {
      await client.request({
        url: INDEXING_ENDPOINT,
        method: "POST",
        data: { url, type: "URL_UPDATED" },
      });
      successCount++;
      submittedSet.add(url);
      progress.submittedUrls.push(url);

      // Log every 50
      if ((i + 1) % 50 === 0) {
        console.log(`  ✓ ${i + 1}/${todayBatch.length} submitted...`);
      }
    } catch (err: any) {
      const msg = err?.message || "";
      if (msg.includes("Quota exceeded")) {
        console.log(`  ⚠ Quota hit after ${successCount} URLs. Will resume tomorrow.`);
        quotaHit = true;
        break;
      }
      errorCount++;
      console.log(`  ✗ FAILED [${i + 1}]: ${url}`);
      console.log(`    ${msg.slice(0, 200)}`);
    }

    // Small delay every 10 requests to be nice to the API
    if ((i + 1) % 10 === 0 && i + 1 < todayBatch.length) {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  // Save progress
  progress.lastRunDate = today;
  progress.lastRunCount = successCount;
  progress.totalSubmitted = progress.submittedUrls.length;
  saveProgress(progress);

  const remaining = allUrls.length - progress.totalSubmitted;

  console.log("");
  console.log(`✅ Today: ${successCount} success, ${errorCount} errors${quotaHit ? " (quota hit)" : ""}`);
  console.log(`📊 Total submitted: ${progress.totalSubmitted}/${allUrls.length}`);
  if (remaining > 0) {
    console.log(`📆 ~${Math.ceil(remaining / DAILY_QUOTA)} days remaining to finish all URLs`);
  } else {
    console.log(`🎉 All URLs submitted!`);
  }
}

main().catch(console.error);
