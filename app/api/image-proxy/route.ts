import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ALLOWED_HOSTS = new Set([
  "s4.anilist.co",
  "cdn.myanimelist.net",
  "img.youtube.com",
  "i.ytimg.com",
  "media.kitsu.app",
  "media.kitsu.io",
  "wsrv.nl"
]);

export async function GET(req: NextRequest) {
  const rawUrl = req.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), {
      headers: {
        "User-Agent": "DiscArchiveAnimeRating/1.0"
      },
      next: { revalidate: 86400 }
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "Upstream fetch failed" }, { status: upstream.status });
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
      }
    });
  } catch {
    return NextResponse.json({ error: "Proxy error" }, { status: 502 });
  }
}
