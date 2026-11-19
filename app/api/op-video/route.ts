import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json({ videoUrl: null }, { status: 400 });
  }

  try {
    const clean = query.replace(/\(.*?\)/g, "").replace(/[?.!"]/g, "").trim();
    const url = `https://api.animethemes.moe/anime?filter[name]=${encodeURIComponent(
      clean
    )}&include=animethemes.animethemeentries.videos,animethemes.song.artists&page[size]=3`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "DiscArchiveAnimeRating/1.0",
        Accept: "application/json"
      },
      signal: AbortSignal.timeout(4500)
    });

    if (!res.ok) {
      return NextResponse.json({ videoUrl: null });
    }

    const json = await res.json();
    const list = json?.anime || [];
    for (const anime of list) {
      const themes = anime?.animethemes || [];
      const op = themes.find((t: { type?: string }) => t.type === "OP") || themes[0];
      const video = op?.animethemeentries?.[0]?.videos?.[0];
      if (video?.link) {
        return NextResponse.json(
          {
            videoUrl: video.link,
            songTitle: op?.song?.title || null,
            songArtist: op?.song?.artists?.[0]?.name || null
          },
          {
            headers: {
              "Cache-Control": "public, max-age=86400, s-maxage=604800"
            }
          }
        );
      }
    }

    return NextResponse.json({ videoUrl: null });
  } catch {
    return NextResponse.json({ videoUrl: null });
  }
}
