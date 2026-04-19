/**
 * Submit all URLs to Google Indexing API
 *
 * Usage:
 *   npx tsx scripts/submit-urls.ts
 *
 * Requires .env.local with:
 *   GOOGLE_CLIENT_EMAIL=...
 *   GOOGLE_PRIVATE_KEY=...
 *   INDEXING_API_KEY=... (same as in your .env.local)
 *   NEXT_PUBLIC_BASE_URL=https://bookmymoment.in (optional)
 */

import * as fs from "fs";
import * as path from "path";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookmymoment.in";
const API_URL = process.env.SUBMIT_API_URL || "http://localhost:3000/api/google-index";
const API_KEY = process.env.INDEXING_API_KEY || "";

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

async function submitBatch(urls: string[]): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({ urls, type: "URL_UPDATED" }),
  });

  const data = await res.json();
  console.log(`  Batch: ${data.success} success, ${data.errors} errors out of ${data.total}`);

  if (data.errors > 0) {
    const failed = data.results.filter((r: any) => r.status === "error");
    for (const f of failed) {
      console.log(`    FAILED: ${f.url} — ${f.error}`);
    }
  }
}

async function main() {
  if (!API_KEY) {
    console.error("ERROR: Set INDEXING_API_KEY environment variable");
    process.exit(1);
  }

  const keywordsDir = path.join(process.cwd(), "seo-keywords");

  // Collect all URLs
  const allUrls: string[] = [
    BASE_URL,
    `${BASE_URL}/vadodara`,
    `${BASE_URL}/surat`,
  ];

  // Parse CSVs and build keyword URLs
  const vadodaraKeywords = parseCSV(path.join(keywordsDir, "vadodara-keywords.csv"));
  const suratKeywords = parseCSV(path.join(keywordsDir, "surat-keywords.csv"));

  for (const kw of vadodaraKeywords) {
    allUrls.push(`${BASE_URL}/vadodara/${toSlug(kw)}`);
  }
  for (const kw of suratKeywords) {
    allUrls.push(`${BASE_URL}/surat/${toSlug(kw)}`);
  }

  console.log(`Total URLs to submit: ${allUrls.length}`);
  console.log(`API endpoint: ${API_URL}`);
  console.log("");

  // Submit in batches of 100
  const BATCH_SIZE = 100;
  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    console.log(`Submitting batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} URLs)...`);
    await submitBatch(batch);

    // Wait 1 second between batches to avoid rate limits
    if (i + BATCH_SIZE < allUrls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("\nDone! All URLs submitted.");
}

main().catch(console.error);
