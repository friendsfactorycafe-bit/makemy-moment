import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];
const INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish";

function getAuth() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY or GOOGLE_CLIENT_EMAIL env vars");
  }

  return new GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });
}

export async function POST(request: Request) {
  try {
    const { urls, type = "URL_UPDATED" } = await request.json();

    // Validate API key from header
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.INDEXING_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls must be a non-empty array" }, { status: 400 });
    }

    if (urls.length > 200) {
      return NextResponse.json({ error: "Max 200 URLs per request" }, { status: 400 });
    }

    const auth = getAuth();
    const client = await auth.getClient();

    const results: { url: string; status: string; error?: string }[] = [];

    for (const url of urls) {
      try {
        const res = await client.request({
          url: INDEXING_ENDPOINT,
          method: "POST",
          data: {
            url: url,
            type: type, // URL_UPDATED or URL_DELETED
          },
        });
        results.push({ url, status: "success" });
      } catch (err: any) {
        results.push({
          url,
          status: "error",
          error: err?.message || "Unknown error",
        });
      }
    }

    const successCount = results.filter((r) => r.status === "success").length;
    const errorCount = results.filter((r) => r.status === "error").length;

    return NextResponse.json({
      total: urls.length,
      success: successCount,
      errors: errorCount,
      results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
