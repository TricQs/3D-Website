export type IllustrationMotif =
  | "vending-machine"
  | "torii-shrine"
  | "comet-sky"
  | "arcade-cabinet"
  | "magic-circle"
  | "sakura-crossing"
  | "cassette-synth"
  | "ocean-tiger"
  | "school-desk"
  | "polar-wave";

export interface ArchiveTrack {
  number: string;
  title: string;
  role: string;
  duration: string;
  bpm: number;
  notes: number[];
  waveformSeed: number;
  isOfficialOst?: boolean;
  previewUrl?: string;
}

export interface AnimeRelease {
  id: string;
  catalogCode: string;
  shortTitle: string;
  titleRomaji: string;
  titleEnglish: string;
  rating: number;
  releaseYear: number;
  category: "TV Series" | "Movie";
  ageRating: string;
  genres: string[];
  synopsis: string;
  quote1: string;
  quote2: string;
  songTitle: string;
  songArtist: string;
  songSearchQuery: string;
  jikanQuery: string;
  studio: string;
  bpm: number;
  keySignature: string;
  coverUrl: string;
  bannerUrl: string;
  youtubeId: string;
  songPreviewUrl: string;
  spineColor: string;
  spineTextColor: string;
  coverBgColor: string;
  coverInkColor: string;
  accentColor: string;
  illustrationType: IllustrationMotif;
  currentEpisode?: number;
  totalEpisodes?: number;
  isOngoing?: boolean;
  tracks: ArchiveTrack[];
}

interface RawAnimeEntry {
  id: string;
  shortTitle: string;
  titleRomaji: string;
  titleEnglish: string;
  rating: number;
  releaseYear: number;
  category: "TV Series" | "Movie";
  ageRating: string;
  genres: string[];
  synopsis: string;
  quote1: string;
  quote2: string;
  songTitle: string;
  songArtist: string;
  songSearchQuery: string;
  jikanQuery: string;
  studio: string;
  bpm: number;
  keySignature: string;
  coverUrl: string;
  bannerUrl: string;
  youtubeId: string;
  songPreviewUrl: string;
  illustrationType: IllustrationMotif;
  currentEpisode?: number;
  totalEpisodes?: number;
  isOngoing?: boolean;
}

/**
 * 17 Distinct Rich Archival Spine & Packaging Palettes
 */
const ARCHIVAL_PALETTES = [
  { spineColor: "#1C2838", spineTextColor: "#F2F1EC", coverBgColor: "#212F42", coverInkColor: "#F4F3EF", accentColor: "#E05A3A" }, // Navy
  { spineColor: "#E8C5C0", spineTextColor: "#181818", coverBgColor: "#F2DAD6", coverInkColor: "#181818", accentColor: "#D6492A" }, // Pastel Pink
  { spineColor: "#C8522A", spineTextColor: "#FAF7F2", coverBgColor: "#EDE6DA", coverInkColor: "#181818", accentColor: "#C8522A" }, // Burnt Orange
  { spineColor: "#EBE7DD", spineTextColor: "#181818", coverBgColor: "#F4F1E8", coverInkColor: "#181818", accentColor: "#204A87" }, // Cream
  { spineColor: "#1E448E", spineTextColor: "#F5F5F2", coverBgColor: "#234C9E", coverInkColor: "#F6F5F0", accentColor: "#F2C14E" }, // Cobalt Blue
  { spineColor: "#5C1E28", spineTextColor: "#F4EFEA", coverBgColor: "#EFE9E2", coverInkColor: "#3D1219", accentColor: "#8C2939" }, // Burgundy
  { spineColor: "#748773", spineTextColor: "#141A14", coverBgColor: "#DCE3DA", coverInkColor: "#181E18", accentColor: "#3F5740" }, // Sage Green
  { spineColor: "#1B1B1A", spineTextColor: "#EAEAE8", coverBgColor: "#1E1E1D", coverInkColor: "#F0EFEA", accentColor: "#E05A3A" }, // Matte Black
  { spineColor: "#1C5359", spineTextColor: "#F2F5F4", coverBgColor: "#E6ECEB", coverInkColor: "#143538", accentColor: "#1C5359" }, // Teal
  { spineColor: "#D49E2A", spineTextColor: "#181818", coverBgColor: "#F3EAD2", coverInkColor: "#181818", accentColor: "#B85D19" }, // Mustard Yellow
  { spineColor: "#2C2956", spineTextColor: "#F2F0F7", coverBgColor: "#25224A", coverInkColor: "#F4F2FA", accentColor: "#E05A3A" }, // Indigo
  { spineColor: "#F5F4EE", spineTextColor: "#181818", coverBgColor: "#F8F7F2", coverInkColor: "#181818", accentColor: "#E05A3A" }, // Off-White
  { spineColor: "#B56922", spineTextColor: "#FAF6F0", coverBgColor: "#EFE5D8", coverInkColor: "#261709", accentColor: "#B56922" }, // Amber
  { spineColor: "#6B7CA6", spineTextColor: "#141720", coverBgColor: "#E3E7F2", coverInkColor: "#1B2234", accentColor: "#3D5285" }, // Periwinkle
  { spineColor: "#263F32", spineTextColor: "#EFECE6", coverBgColor: "#E7ECE8", coverInkColor: "#182820", accentColor: "#C85A32" }, // Forest Moss
  { spineColor: "#3D4C57", spineTextColor: "#F3F4F5", coverBgColor: "#E4E8EB", coverInkColor: "#182026", accentColor: "#E05A3A" }, // Slate Petrol
  { spineColor: "#9E4638", spineTextColor: "#F6F2EC", coverBgColor: "#F2E7E4", coverInkColor: "#291410", accentColor: "#9E4638" }  // Terracotta
];

const CHORD_BANK: number[][] = [
  [261.63, 329.63, 392.0, 493.88, 587.33],
  [293.66, 369.99, 440.0, 554.37, 659.25],
  [246.94, 293.66, 369.99, 440.0, 523.25],
  [220.0, 261.63, 329.63, 392.0, 493.88],
  [349.23, 440.0, 523.25, 659.25, 783.99],
  [311.13, 392.0, 466.16, 587.33, 698.46],
  [277.18, 329.63, 415.3, 493.88, 622.25]
];

const OFFICIAL_TRACKS_BY_ID: Record<string, { title: string; artist: string; previewUrl: string }[]> = {
  "1": [
    {
      "title": "くちづけDiamond",
      "artist": "WEAVER",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/80/c4/90/80c4904b-7485-686d-bf5d-c279dd24188d/mzaf_10698822257358362061.plus.aac.p.m4a"
    },
    {
      "title": "くちづけDiamond (LIVE)",
      "artist": "WEAVER",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/93/83/67/9383678b-dfd7-da9c-85c9-7a19faa3d989/mzaf_12909180013204887028.plus.aac.p.m4a"
    },
    {
      "title": "Shall we dance〜くちづけDiamond (LIVE)",
      "artist": "WEAVER",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/99/75/fb/9975fb89-de16-5f5f-6df2-b012b853c90b/mzaf_17551312488002729651.plus.aac.p.m4a"
    },
    {
      "title": "Beloved",
      "artist": "WEAVER",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/26/c8/df/26c8df3e-56d8-d5b5-1a5a-49d643fc76b0/mzaf_18425117046241338032.plus.aac.p.m4a"
    },
    {
      "title": "Inception",
      "artist": "WEAVER",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/20/66/ca/2066caa2-c662-f4d8-1452-93cff8da683f/mzaf_2716632395375623549.plus.aac.p.m4a"
    }
  ],
  "2": [
    {
      "title": "恋人以上、好き未満 (Full Size)",
      "artist": "=LOVE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/44/67/cb/4467cb87-4231-b75a-b4f9-4bfd729c7a41/mzaf_13539162494623898650.plus.aac.p.m4a"
    },
    {
      "title": "恋人以上、好き未満 (=LOVE ARENA TOUR 2025「～Timeless Tales～」)",
      "artist": "=LOVE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ce/bc/1f/cebc1fa1-e11d-4a09-dbba-0ce33ddc4b74/mzaf_14066876057770121556.plus.aac.p.m4a"
    },
    {
      "title": "恋人以上、好き未満 (=LOVE 8th ANNIVERSARY PREMIUM TOUR)",
      "artist": "=LOVE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/ce/b6/4eceb6d9-05fc-6023-80bc-97ac8d80b28c/mzaf_4333175518401490154.plus.aac.p.m4a"
    },
    {
      "title": "恋人以上、好き未満 (TV Size)",
      "artist": "=LOVE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/4c/be/e04cbef6-5e67-85af-226b-ba90bc9a5081/mzaf_14938006972721253808.plus.aac.p.m4a"
    },
    {
      "title": "とくべチュ、して",
      "artist": "=LOVE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/00/af/f2/00aff2da-500a-cae3-22d1-e0160e29204b/mzaf_6307710514933024967.plus.aac.p.m4a"
    }
  ],
  "3": [
    {
      "title": "SURVIVE",
      "artist": "MindaRyn",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9f/61/ff/9f61ffe6-e59d-59bf-e2a5-a5740bd7e1ac/mzaf_8165454170293598556.plus.aac.p.m4a"
    },
    {
      "title": "Fireworks",
      "artist": "MindaRyn",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4a/08/d2/4a08d2db-8867-3a01-5919-373b31c46a3d/mzaf_6403195680951941636.plus.aac.p.m4a"
    },
    {
      "title": "The Reason of Kindness (English Version)",
      "artist": "MindaRyn",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e0/f9/aa/e0f9aa64-3b88-76f1-41a6-a5c4c485b1db/mzaf_11677860719770396752.plus.aac.p.m4a"
    },
    {
      "title": "Remaining Story",
      "artist": "MindaRyn",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/76/36/78/76367821-8afb-e1d6-e0cf-f3e825ccda6d/mzaf_16180693394954479069.plus.aac.p.m4a"
    },
    {
      "title": "KUUSOU MESOROGII (English Version)",
      "artist": "MindaRyn",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/8e/f7/e7/8ef7e78b-4c75-b0fa-2447-581754cefc4b/mzaf_10520766103010161288.plus.aac.p.m4a"
    }
  ],
  "4": [
    {
      "title": "ワタシノテンシ (Cover)",
      "artist": "CocoTsuki",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/33/34/79/33347921-4ec9-6bac-7b86-e08cafff53d2/mzaf_2923877196214728477.plus.aac.p.m4a"
    },
    {
      "title": "月の天使",
      "artist": "CHAQLA.",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cf/64/bc/cf64bc48-e6f4-deb1-35d5-c4ce8723bec2/mzaf_15583980525055094753.plus.aac.p.m4a"
    },
    {
      "title": "月の光",
      "artist": "川越好博",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/c9/10/dc/c910dcd7-431f-528c-393b-5c238a5422fb/mzaf_3437454154400018632.plus.aac.p.m4a"
    },
    {
      "title": "Pray",
      "artist": "[Alexandros]",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fd/b8/4d/fdb84dba-f885-533c-f61e-6d6d5847bac3/mzaf_15202257343005143730.plus.aac.p.m4a"
    },
    {
      "title": "answer",
      "artist": "Janne Da Arc",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/04/f4/57/04f45710-483d-7c77-d006-f04d96010cdd/mzaf_14612406285185217171.plus.aac.p.m4a"
    }
  ],
  "5": [
    {
      "title": "Donna Hoshizora Yori Mo, Donna Omoide Yori Mo (From \"Imouto sae Ireba Ii\") [Ending]",
      "artist": "Fonzi M",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/90/0e/0e/900e0e34-7f88-4f28-5506-2a81befe04b2/mzaf_13214241906341084344.plus.aac.p.m4a"
    },
    {
      "title": "明日の君さえいればいい。",
      "artist": "ChouCho",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/b6/d2/59b6d20e-c85a-f5b2-9f79-9acc8dbcdb59/mzaf_4446349734059029313.plus.aac.p.m4a"
    },
    {
      "title": "明日の君さえいればいい。 (Acoustic Album \"naked garden\" Ver.)",
      "artist": "ChouCho",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0a/3f/bd/0a3fbd87-af13-bd66-f47a-905d9362f4c5/mzaf_17690654521689884135.plus.aac.p.m4a"
    },
    {
      "title": "アンダンテ",
      "artist": "ChouCho",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/2a/dd/752add36-aba1-b640-d7f8-e7520025d9e4/mzaf_11144937223416869631.plus.aac.p.m4a"
    },
    {
      "title": "明日の君さえいればいい。 (TV SIZE)",
      "artist": "ChouCho",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview118/v4/59/c6/36/59c6368e-272f-06f1-312a-d95e644898aa/mzaf_7307430442645450981.plus.aac.p.m4a"
    }
  ],
  "6": [
    {
      "title": "Papapa (From \"Oresuki: Ore wo Suki nano wa Omae dake ka yo\") [Opening]",
      "artist": "Fonzi M",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/fe/66/7b/fe667bb1-9938-c73b-3d17-b2fcd73ded32/mzaf_3845652231522774784.plus.aac.p.m4a"
    },
    {
      "title": "Hanakotoba (From \"Ore wo Suki nano wa Omae dake ka yo\")",
      "artist": "Steve Hansen",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/40/4b/86/404b8613-8d25-4272-c898-eea180cb3f2b/mzaf_3644602209253144651.plus.aac.p.m4a"
    },
    {
      "title": "パパパ",
      "artist": "Steve Hansen",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/be/9e/31/be9e31bf-047c-3df0-231a-c133265b860d/mzaf_10999197111142291022.plus.aac.p.m4a"
    },
    {
      "title": "Labyrinth",
      "artist": "RAZOR",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/22/d5/cd/22d5cddf-a98f-75fc-ddad-d05ad73cf81d/mzaf_1991191645922371093.plus.aac.p.m4a"
    },
    {
      "title": "Eternal Destination",
      "artist": "MINMI, TMG & 4WD",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/47/04/e04704f5-9a25-5484-42fa-e100fa93971e/mzaf_14614972781345340461.plus.aac.p.m4a"
    }
  ],
  "7": [
    {
      "title": "あのね、",
      "artist": "ポルカドットスティングレイ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/eb/e9/f2/ebe9f23b-d68f-e971-3684-301c5f4ac1ac/mzaf_12586668274530331524.plus.aac.p.m4a"
    },
    {
      "title": "ねてもさめても",
      "artist": "ポルカドットスティングレイ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8e/ba/b3/8ebab32a-9d14-459a-cc8a-5072ad9acbb9/mzaf_16400766503623144093.plus.aac.p.m4a"
    },
    {
      "title": "DENKOUSEKKA",
      "artist": "ポルカドットスティングレイ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9d/9e/da/9d9edad1-abfc-5625-1842-211beef0402c/mzaf_12143963573980163883.plus.aac.p.m4a"
    },
    {
      "title": "エレクトリック・パブリック",
      "artist": "ポルカドットスティングレイ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/ac/13/3fac134d-407d-e5ae-983c-0f30c7ad9500/mzaf_673991187519765564.plus.aac.p.m4a"
    },
    {
      "title": "リドー",
      "artist": "ポルカドットスティングレイ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f4/cf/2f/f4cf2f55-c1bc-d3a3-4ab2-0235eacdf409/mzaf_12745061973797487490.plus.aac.p.m4a"
    }
  ],
  "8": [
    {
      "title": "残念系隣人部★★☆(星二つ半)",
      "artist": "友達つくり隊/三日月夜空(CV:井上麻里奈)、柏崎星奈(CV:伊藤かな恵)、 楠幸村(CV:山本希望)、志熊理科(CV:福圓美里)、羽瀬川小鳩(CV:花澤香 菜)、高山マリア(CV:井口裕香)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/46/3b/46/463b469f-7932-c7cd-127e-fa5797ffbe51/mzaf_9331505858828125381.plus.aac.p.m4a"
    },
    {
      "title": "TVアニメ「僕は友達が少ない」オープニングテーマ「残念系隣人部★★☆(星ふたつ半)(TVサイズ)」",
      "artist": "TOM-H@CK",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c2/e7/a4/c2e7a42c-50d3-73b1-e0d7-d3d640872888/mzaf_13155000197396596269.plus.aac.p.m4a"
    },
    {
      "title": "残念系隣人部★★☆(星二つ半) オリジナルカラオケ",
      "artist": "友達つくり隊/三日月夜空(CV:井上麻里奈)、柏崎星奈(CV:伊藤かな恵)、 楠幸村(CV:山本希望)、志熊理科(CV:福圓美里)、羽瀬川小鳩(CV:花澤香 菜)、高山マリア(CV:井口裕香)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a7/55/4f/a7554f43-63c1-4d1b-1ca3-b09241638690/mzaf_16144212266088032333.plus.aac.p.m4a"
    },
    {
      "title": "残念系隣人部★★☆",
      "artist": "ANIME PROJECT",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/Music/v4/ff/4e/aa/ff4eaa4c-2beb-89d2-721f-bce0589c2a98/mzaf_3103245856644361038.plus.aac.p.m4a"
    },
    {
      "title": "笑顔のデッサン",
      "artist": "三日月夜空(CV:井上麻里奈)、柏崎星奈(CV:伊藤かな恵)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/17/5a/c4/175ac412-e8c7-fc75-0ee2-eb1b3e5900da/mzaf_9202665197653078259.plus.aac.p.m4a"
    }
  ],
  "9": [
    {
      "title": "Kishuku Gakkou no Juliet RAP",
      "artist": "AeAone",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/48/f1/47/48f147bc-4311-4e33-569f-d534bde89c2e/mzaf_17502360879918715097.plus.aac.p.m4a"
    },
    {
      "title": "Kishuku Gakkou no Juliet | Opening (Love wth You)",
      "artist": "Just Let That Sh*t Go",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/37/c8/74/37c87442-37d6-446a-dc03-e6db3fe69dba/mzaf_10001675570626272367.plus.aac.p.m4a"
    },
    {
      "title": "Love with You",
      "artist": "fripSide",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b3/51/99/b35199fb-33fc-fd85-6fd1-a020a2d8be93/mzaf_9717050700522262997.plus.aac.p.m4a"
    },
    {
      "title": "Love with You<Phase2> (20th Anniversary Festival) [Live]",
      "artist": "fripSide",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/79/a9/ae/79a9ae92-7cd4-ca54-22b0-3649fddb6f30/mzaf_13519758861802008241.plus.aac.p.m4a"
    },
    {
      "title": "Blue Moon",
      "artist": "fripSide",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3b/f4/6c/3bf46c86-6480-6b30-4fd7-64ab5dca6495/mzaf_17349727270845411020.plus.aac.p.m4a"
    }
  ],
  "10": [
    {
      "title": "I SAY YES(主題歌/ゼロの使い魔~双月の騎士~(TVアニメ))(カバー)",
      "artist": "YURIE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fb/53/a7/fb53a779-8b29-6bfb-e1ca-0a751c26a74c/mzaf_1687469877260158986.plus.aac.p.m4a"
    },
    {
      "title": "First kiss (ゼロの使い魔 OP)",
      "artist": "Kanae",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8f/e5/b7/8fe5b7a9-91bd-a87e-b4f8-d63ed9d657ee/mzaf_2488651955026471644.plus.aac.p.m4a"
    },
    {
      "title": "First Kiss (主題歌/ゼロの使い魔(TVアニメ))(カバー)",
      "artist": "YURIE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/22/03/40/22034073-f7b8-5985-1141-472fa96f5043/mzaf_3702811055522076896.plus.aac.p.m4a"
    },
    {
      "title": "YOU'RE THE ONE(主題歌/ゼロの使い魔~三美姫の輪舞~(TVアニメ)) feat.たまゆら(カバー)",
      "artist": "DJ Sa9",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/84/13/cc/8413ccef-3e00-9cc2-5421-75631ae68a91/mzaf_18196265185344865535.plus.aac.p.m4a"
    },
    {
      "title": "I say yes / Ichiko (marimba short) ゼロの使い魔",
      "artist": "アニソン倶楽部♪ JAPAN",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e2/0c/d4/e20cd478-4dad-9d61-cb7f-b0b6b8ee5f53/mzaf_2293024403880262778.plus.aac.p.m4a"
    }
  ],
  "11": [
    {
      "title": "質問、恋って何でしょうか? (feat. ハコニワリリィ)",
      "artist": "MARUMOCHI from HoneyWorks",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0f/85/c9/0f85c911-2932-31e0-893b-13cb49b77067/mzaf_6950154421065402166.plus.aac.p.m4a"
    },
    {
      "title": "質問、恋って何でしょうか? (feat. Hanon)",
      "artist": "MARUMOCHI from HoneyWorks",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b0/0d/40/b00d40f9-1c7b-4964-5410-05daa0a52ee8/mzaf_18108244798710156328.plus.aac.p.m4a"
    },
    {
      "title": "質問、恋って何でしょうか? (feat. Kotoha)",
      "artist": "MARUMOCHI from HoneyWorks",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f1/45/b6/f145b64c-5498-97c0-5bcf-b32350caa1d8/mzaf_8192090738412714184.plus.aac.p.m4a"
    },
    {
      "title": "質問、恋って何でしょうか? (feat. ハコニワリリィ) [TV size ver.]",
      "artist": "MARUMOCHI from HoneyWorks",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/8a/46/2f/8a462fff-1950-0360-ce5d-8ce66b5690d4/mzaf_8384651782156835284.plus.aac.p.m4a"
    },
    {
      "title": "質問、恋って何でしょうか? (feat. 犬塚日葵(CV:鈴代紗弓))",
      "artist": "MARUMOCHI from HoneyWorks",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/94/1f/41/941f418f-0a3d-3296-8371-17762f89bccb/mzaf_4527108558179615328.plus.aac.p.m4a"
    }
  ],
  "12": [
    {
      "title": "やわく恋して ～ずっと僕らでいられますように～ (Live at 横浜スタジアム 2025.8.2)",
      "artist": "ももいろクローバーZ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7d/c8/9c/7dc89c4e-469b-0d47-58d9-591ad9d0b114/mzaf_1962518942424014895.plus.aac.p.m4a"
    },
    {
      "title": "やわく恋して ～ずっと僕らでいられますように～",
      "artist": "ももいろクローバーZ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9d/17/ec/9d17ec1b-b6b1-a745-9b94-7d7dac5a4833/mzaf_17775663850520350052.plus.aac.p.m4a"
    },
    {
      "title": "DNA狂詩曲",
      "artist": "ももいろクローバーZ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/83/52/0c/83520c4f-ec60-ca1e-cca8-38dcae12aac5/mzaf_4239246706309089976.plus.aac.p.m4a"
    },
    {
      "title": "DNA狂詩曲 -ZZ ver.-",
      "artist": "ももいろクローバーZ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/11/ec/68/11ec688b-7c13-914e-0e2b-49ddc1c594be/mzaf_2682565929503641639.plus.aac.p.m4a"
    },
    {
      "title": "僕等のセンチュリー",
      "artist": "ももいろクローバーZ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/79/7d/ff/797dff1a-77da-39f5-fa4e-a86251bb1bb7/mzaf_8955373725244769945.plus.aac.p.m4a"
    }
  ],
  "13": [],
  "14": [
    {
      "title": "Futari No Start Button",
      "artist": "リリー・ベイカー(CV:天城サリー) & 草壁葵衣(CV:小山内怜央)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3b/60/c0/3b60c018-71fe-4795-51d0-1b249b9fcc32/mzaf_14180398115083916745.plus.aac.p.m4a"
    },
    {
      "title": "Futariquest!",
      "artist": "ちろぴの",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c7/cb/35/c7cb355b-0361-ec2f-4acd-e64a1a03d2ca/mzaf_9519220161210714109.plus.aac.p.m4a"
    },
    {
      "title": "Hajimari No Uta",
      "artist": "Poppo",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/77/9e/c7/779ec732-c6e7-4032-bd7c-11e42acf7375/mzaf_9666919914609705633.plus.aac.p.m4a"
    },
    {
      "title": "One More Play (feat. Mayui)",
      "artist": "T-J",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9c/e3/6a/9ce36a10-1d63-f23e-a900-5ab505c325c9/mzaf_870221201430594997.plus.aac.p.m4a"
    },
    {
      "title": "I Want to Marry a Microwave",
      "artist": "KaedeMusic",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3f/a0/0c/3fa00cdf-a4fc-0562-4886-02cd03911886/mzaf_7438891477836890099.plus.aac.p.m4a"
    }
  ],
  "15": [
    {
      "title": "Yuki No Oto (Yubisaki to Renren Opening )",
      "artist": "Binou SZ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/10/eb/6b/10eb6bb8-cb19-25af-242f-df2944e773e2/mzaf_5375316700555201097.plus.aac.p.m4a"
    },
    {
      "title": "スノースプリング (From \"ゆびさきと恋々\") [カバー]",
      "artist": "Anneka Music",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/93/1b/ab/931bab37-9a28-15cd-0cfa-41c1262e4429/mzaf_7539253019081237516.plus.aac.p.m4a"
    },
    {
      "title": "A Sign of Affection (Opening  Yuki no Ne) Yubisaki to Renren",
      "artist": "Dimension Anime",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/02/36/c0/0236c06d-cd88-d519-b6e2-e53bc30bc0cf/mzaf_15469547955912405068.plus.aac.p.m4a"
    },
    {
      "title": "Nuestro mundo  Yubisaki to Renren  A Sign of Affection",
      "artist": "NeithanMc",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5d/b3/ee/5db3ee87-d667-1151-6de2-c0c3910b8ca7/mzaf_16013425146784936244.plus.aac.p.m4a"
    },
    {
      "title": "A Sign of Affection  Opening 1  Yubisaki to Renren",
      "artist": "Just Let That Sh*t Go",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/1a/b9/3a1ab9c3-61d2-0920-d38b-aa7609d4dc35/mzaf_16743277957419394211.plus.aac.p.m4a"
    }
  ],
  "16": [
    {
      "title": "Crescendo",
      "artist": "ASTERISM",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/26/fd/e926fd09-49cf-dd11-92d3-5cc2217c5537/mzaf_1705471967308512988.plus.aac.p.m4a"
    },
    {
      "title": "ロックは死なない",
      "artist": "22/7",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d4/0f/24/d40f24e8-8efe-0063-c4f0-203057b53132/mzaf_15158454842903284490.plus.aac.p.m4a"
    }
  ],
  "17": [
    {
      "title": "ODD NUMBER",
      "artist": "Yoshino",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/32/9f/98329f59-06bd-bd13-ac13-e36daecb95f0/mzaf_1364021365327521390.plus.aac.p.m4a"
    },
    {
      "title": "ハローとグッバイ",
      "artist": "鯨木",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f4/8d/91/f48d9120-8713-4bd6-edaa-6bfdb9701ad8/mzaf_13995483587802065300.plus.aac.p.m4a"
    },
    {
      "title": "Sleep Walking Orchestra",
      "artist": "BUMP OF CHICKEN",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a8/55/db/a855db7c-762d-67a6-8d1c-9db333893ef9/mzaf_13857001201116124281.plus.aac.p.m4a"
    },
    {
      "title": "Lilac",
      "artist": "IU",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/be/62/d2/be62d240-fe27-0514-9e20-b29645cc3dcb/mzaf_8930037822844249227.plus.aac.p.m4a"
    },
    {
      "title": "ノニサクウタ",
      "artist": "Mrs. GREEN APPLE",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0a/96/b7/0a96b7dd-13c7-71ee-fa67-ab206be9528a/mzaf_4944176604236879570.plus.aac.p.m4a"
    }
  ],
  "18": [
    {
      "title": "ボタン",
      "artist": "PENGUIN RESEARCH",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/43/f0/4443f00d-c804-ba56-c43a-bf79a2d40028/mzaf_2294137931653674743.plus.aac.p.m4a"
    },
    {
      "title": "ReLIFE",
      "artist": "海崎新太(CV.小野賢章)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a1/17/9d/a1179d38-c4b4-2fc3-8b2a-02c0ff57e204/mzaf_10499511006491450229.plus.aac.p.m4a"
    },
    {
      "title": "RELIFE",
      "artist": "RUNG HYANG",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/35/b3/72/35b37261-afe4-5cbf-3589-f141f1bf6dd9/mzaf_3481373705033673767.plus.aac.p.m4a"
    },
    {
      "title": "Relife!",
      "artist": "Rushex, Navjaxx & MONTAGEM",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f2/ec/28/f2ec283b-dcce-d789-0c8b-c43ff7a41b1a/mzaf_14122983518407755213.plus.aac.p.m4a"
    },
    {
      "title": "RELIFE (feat. Yackle & Show Chick Boy)",
      "artist": "立仙愛理",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2a/1d/c5/2a1dc553-0b2f-a861-7272-6776e92d4fe5/mzaf_8449687809821949182.plus.aac.p.m4a"
    }
  ],
  "19": [
    {
      "title": "まなざしは光",
      "artist": "キタニタツヤ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/eb/bd/1debbd79-705c-79c3-7b57-689628483627/mzaf_234292626159871160.plus.aac.p.m4a"
    },
    {
      "title": "まなざし",
      "artist": "Honey L Days",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7d/7f/77/7d7f776e-53d7-4ea8-5e36-9689c527f40b/mzaf_7884214821252625080.plus.aac.p.m4a"
    },
    {
      "title": "まなざし (Live from ZOZO MARINE STADIUM 2025)",
      "artist": "SUPER BEAVER",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2c/4e/82/2c4e821d-855a-b6bf-ec65-f5d58ef5a582/mzaf_5082847583418597428.plus.aac.p.m4a"
    },
    {
      "title": "Where Our Blue Is",
      "artist": "Tatsuya Kitani",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/92/c9/7a/92c97ab2-5fdd-d00b-34eb-b2b58cd3c610/mzaf_15460441178714099183.plus.aac.p.m4a"
    },
    {
      "title": "Fatal",
      "artist": "GEMN, Kento Nakajima & Tatsuya Kitani",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/19/5f/a0/195fa0a8-5f36-1f01-fefc-ab45ddb203ba/mzaf_1909407659469478863.plus.aac.p.m4a"
    }
  ],
  "20": [
    {
      "title": "TVアニメ「ニセコイ」オープニングテーマ (STEP)",
      "artist": "CANDY BAND",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/27/a7/0d/27a70db0-1efe-0e5a-e577-9d92d08b5be3/mzaf_10865803798471155802.plus.aac.p.m4a"
    },
    {
      "title": "CLICK",
      "artist": "ClariS",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9c/42/ff/9c42ffce-7cac-aa67-2c93-563daeed8940/mzaf_13028682713551074548.plus.aac.p.m4a"
    },
    {
      "title": "STEP",
      "artist": "ClariS",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/60/e2/46/60e246da-fabe-ae82-aace-7edc9b1210b9/mzaf_950641041905031662.plus.aac.p.m4a"
    },
    {
      "title": "Rally Go Round",
      "artist": "LiSA",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/de/1e/37/de1e37d0-87f9-98dc-9a5c-6b5fdb6f1364/mzaf_5797894343634137259.plus.aac.p.m4a"
    },
    {
      "title": "Nisekoi (JIRIM IN PANT$ Remix Version)",
      "artist": "Laptopboyboy",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5b/f2/0c/5bf20c4c-8df4-137a-9434-5ba4892243da/mzaf_4415253874888593581.plus.aac.p.m4a"
    }
  ],
  "21": [],
  "22": [
    {
      "title": "Walking with you",
      "artist": "Novelbright",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e7/cc/64/e7cc64b9-f1bd-454f-1632-60014d0c8083/mzaf_14347820585037570997.plus.aac.p.m4a"
    },
    {
      "title": "ツキミソウ",
      "artist": "Novelbright",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c4/f1/c0/c4f1c07a-b6bc-1b09-105b-ea9cc9f8aabd/mzaf_1208978176308982864.plus.aac.p.m4a"
    },
    {
      "title": "愛とか恋とか",
      "artist": "Novelbright",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/06/17/1a/06171a8a-3d54-fcba-9dbb-40bf5fcf4903/mzaf_14019629773222528245.plus.aac.p.m4a"
    },
    {
      "title": "アイビー",
      "artist": "Novelbright",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/67/e9/71/67e9712d-c9ec-7b80-c473-566e9e7026ca/mzaf_13513832982156126783.plus.aac.p.m4a"
    },
    {
      "title": "透明",
      "artist": "Novelbright",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/15/06/e9/1506e916-1197-f827-2f15-81c3b01cf3ff/mzaf_1656077387332112316.plus.aac.p.m4a"
    }
  ],
  "23": [
    {
      "title": "君の名は…(だってしょうがないじゃない)",
      "artist": "DABO",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/be/05/1c/be051c68-b843-09fa-f236-900b1843c5b3/mzaf_17150075874945355390.plus.aac.p.m4a"
    },
    {
      "title": "僕のすべては君のもの",
      "artist": "M!LK",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/30/db/69/30db69c4-0cb5-c185-1ab4-aa51a4bd4553/mzaf_6118104685493205899.plus.aac.p.m4a"
    },
    {
      "title": "きっと大丈夫",
      "artist": "Little Glee Monster",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/70/e5/ed/70e5ed39-c129-e760-95b5-bcbbabf114fc/mzaf_7221459118728140721.plus.aac.p.m4a"
    },
    {
      "title": "Clock Strikes",
      "artist": "ONE OK ROCK",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ed/9f/ca/ed9fca40-82bd-a58d-ee7c-c25e34a36a3d/mzaf_1058779618435486381.plus.aac.p.m4a"
    },
    {
      "title": "Good Vibes Only (feat. JP THE WAVY & EXILE SHOKICHI)",
      "artist": "SALU",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a5/c4/7f/a5c47f76-515a-b6ec-0eaf-855eec5427e0/mzaf_16809429808816379560.plus.aac.p.m4a"
    }
  ],
  "24": [
    {
      "title": "lit",
      "artist": "牛尾憲輔",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/48/3b/80/483b80fb-7dab-efc2-85b6-203515a8722f/mzaf_7738641777029768152.plus.aac.p.m4a"
    },
    {
      "title": "Koe No Katachi - Lit",
      "artist": "Theishter",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/48/f2/7d/48f27d42-3b5e-e567-279e-caf9fe5e2d18/mzaf_17328171652716222071.plus.aac.p.m4a"
    },
    {
      "title": "See You Again (電影《聲之形》主題曲)",
      "artist": "リア・ドウ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/02/0c/13/020c13bf-c336-1fb3-5f2a-a1a51e802618/mzaf_1049806549874353313.plus.aac.p.m4a"
    },
    {
      "title": "恋をしたのは 「聲の形」より ORIGINAL COVER",
      "artist": "NIYARI計画",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a7/b2/1d/a7b21d94-d28b-c936-5059-353128e7630c/mzaf_13012567008041661110.plus.aac.p.m4a"
    },
    {
      "title": "聲の形",
      "artist": "やるき",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ac/5e/24/ac5e2407-269b-d44f-572d-a55ef2504bc2/mzaf_9096242416688585351.plus.aac.p.m4a"
    }
  ],
  "25": [
    {
      "title": "Josee to Tora to Sakana-tachi",
      "artist": "Pasipavs",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cb/6f/31/cb6f3175-bae1-a7db-7de6-4809231d9520/mzaf_13839034177115434687.plus.aac.p.m4a"
    },
    {
      "title": "蒼のワルツ",
      "artist": "Eve",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a1/17/b4/a117b473-ffb1-6c7e-771f-b50804b4004f/mzaf_3218237334022403632.plus.aac.p.m4a"
    },
    {
      "title": "宵の明星",
      "artist": "Eve",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/79/38/51/7938511b-8e8c-c7f5-48bf-328c098d717f/mzaf_4319072536985724973.plus.aac.p.m4a"
    },
    {
      "title": "廻廻奇譚",
      "artist": "Eve",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bd/68/58/bd6858fc-1dc4-4791-93db-72d4f2639838/mzaf_16592428111742478189.plus.aac.p.m4a"
    },
    {
      "title": "心海",
      "artist": "Eve",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7a/c8/fd/7ac8fd15-93b0-967a-a26d-cb39957deb6d/mzaf_11445574096920082929.plus.aac.p.m4a"
    }
  ],
  "26": [
    {
      "title": "秒速5センチメートル",
      "artist": "kona",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview114/v4/2d/c6/da/2dc6da91-ca3b-3886-6ed9-b89440d1a761/mzaf_15778050104478837105.plus.aac.p.m4a"
    },
    {
      "title": "byousoku 5 centimeter",
      "artist": "enchanter & vanrssh",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c8/98/cd/c898cd43-7b2f-346b-7116-083af6109cbc/mzaf_11274881079094228302.plus.aac.p.m4a"
    },
    {
      "title": "One more time, One more chance",
      "artist": "山崎まさよし",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/09/4c/98094c33-072b-36a5-3c8d-21a9d7d45c36/mzaf_11500047042945065618.plus.aac.p.m4a"
    },
    {
      "title": "One more time,One more chance",
      "artist": "山崎まさよし",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b7/bc/54/b7bc545b-8186-24f3-9a89-64f006b1d4e1/mzaf_16849402651922362128.plus.aac.p.m4a"
    },
    {
      "title": "One more time, One more chance ('From 'Boku To Kimi' Soundtrack)",
      "artist": "山崎まさよし",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5f/e1/1c/5fe11c45-b421-29e8-f83d-589daa0efae7/mzaf_9199035089977639277.plus.aac.p.m4a"
    }
  ],
  "cw-1": [
    {
      "title": "あなたの花の色",
      "artist": "aiko",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c2/4b/de/c24bde06-939d-d707-e477-a93fd315f2f3/mzaf_8399683614149580354.plus.aac.p.m4a"
    },
    {
      "title": "Same Blue",
      "artist": "Official髭男dism",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0e/5d/92/0e5d92f5-17b1-0b46-af7d-f72ad7e78614/mzaf_17020336874762690964.plus.aac.p.m4a"
    },
    {
      "title": "然らば",
      "artist": "マカロニえんぴつ",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3b/29/28/3b29287c-fe81-2564-ae3b-7c9219c6ad25/mzaf_13684848009191995626.plus.aac.p.m4a"
    },
    {
      "title": "コントラスト",
      "artist": "TOMOO",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3d/f9/07/3df90767-fcf3-8019-7bf3-3e52d724b580/mzaf_18416944046661926938.plus.aac.p.m4a"
    },
    {
      "title": "恋色",
      "artist": "大間々昂",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fb/a8/16/fba816cd-249f-01d4-87f1-22f2d49d8f8e/mzaf_8784821207482436854.plus.aac.p.m4a"
    }
  ],
  "cw-2": [
    {
      "title": "1番輝く星",
      "artist": "アーリャ(CV:上坂すみれ)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1a/eb/03/1aeb034d-9826-8aa4-142b-bda5dad45c36/mzaf_7693415494682986218.plus.aac.p.m4a"
    },
    {
      "title": "CHE.R.RY",
      "artist": "アーリャ(CV:上坂すみれ)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/40/c1/8e/40c18ef5-054c-3c79-0be2-4434a6a522fd/mzaf_15644626656175567114.plus.aac.p.m4a"
    },
    {
      "title": "ワールドイズマイン",
      "artist": "アーリャ(CV:上坂すみれ)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3d/03/a6/3d03a631-a3fc-675f-3029-29e6852e552c/mzaf_7934578759692318076.plus.aac.p.m4a"
    },
    {
      "title": "可愛くてごめん",
      "artist": "アーリャ(CV:上坂すみれ)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/47/c7/3c/47c73c5b-b6da-6696-cd78-75ecee2da87c/mzaf_13557816712117716055.plus.aac.p.m4a"
    },
    {
      "title": "学園天国",
      "artist": "アーリャ(CV:上坂すみれ)",
      "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/82/f4/b0/82f4b0a7-7ced-fb65-e984-456461883642/mzaf_18221218883823294.plus.aac.p.m4a"
    }
  ]
};

function buildTracksForAnime(entry: RawAnimeEntry, index: number): ArchiveTrack[] {
  const extras = OFFICIAL_TRACKS_BY_ID[entry.id] || [];
  const track01Url = entry.songPreviewUrl || extras[0]?.previewUrl || "";
  const getExtra = (slot: number, fallbackTitle: string, fallbackRole: string) => {
    const ex = extras[slot];
    return {
      title: ex?.title || fallbackTitle,
      role: ex ? `OFFICIAL • ${ex.artist}` : fallbackRole,
      previewUrl: ex?.previewUrl || track01Url
    };
  };
  const t2 = getExtra(1, `${entry.shortTitle} — Theme II`, `OST • ${entry.studio}`);
  const t3 = getExtra(2, `${entry.shortTitle} — Ending / Insert`, "Official Soundtrack");
  const t4 = getExtra(3, `${entry.shortTitle} — Character / Scene`, `Score • ★ ${entry.rating.toFixed(1)}`);
  const t5 = getExtra(4, `${entry.songTitle} (Reprise)`, `Official • ${entry.songArtist}`);

  return [
    {
      number: "01",
      title: `${entry.songTitle} (Official Theme)`,
      role: `OFFICIAL OP • ${entry.songArtist}`,
      duration: "00:30",
      bpm: entry.bpm,
      notes: CHORD_BANK[index % CHORD_BANK.length],
      waveformSeed: index * 13 + 1,
      isOfficialOst: true,
      previewUrl: track01Url
    },
    {
      number: "02",
      title: t2.title,
      role: t2.role,
      duration: "00:30",
      bpm: Math.max(84, entry.bpm - 12),
      notes: CHORD_BANK[(index + 2) % CHORD_BANK.length],
      waveformSeed: index * 13 + 2,
      isOfficialOst: true,
      previewUrl: t2.previewUrl
    },
    {
      number: "03",
      title: t3.title,
      role: t3.role,
      duration: "00:30",
      bpm: Math.max(76, entry.bpm - 20),
      notes: CHORD_BANK[(index + 4) % CHORD_BANK.length],
      waveformSeed: index * 13 + 3,
      isOfficialOst: true,
      previewUrl: t3.previewUrl
    },
    {
      number: "04",
      title: t4.title,
      role: t4.role,
      duration: "00:30",
      bpm: Math.min(168, entry.bpm + 8),
      notes: CHORD_BANK[(index + 1) % CHORD_BANK.length],
      waveformSeed: index * 13 + 4,
      isOfficialOst: true,
      previewUrl: t4.previewUrl
    },
    {
      number: "05",
      title: t5.title,
      role: t5.role,
      duration: "00:30",
      bpm: Math.max(72, Math.round(entry.bpm * 0.8)),
      notes: CHORD_BANK[(index + 5) % CHORD_BANK.length],
      waveformSeed: index * 13 + 5,
      isOfficialOst: true,
      previewUrl: t5.previewUrl
    }
  ];
}

/* ============================================================================
   📺 STEP 1: CURRENTLY WATCHING (ON-GOING PERSONAL PROGRESS)
   ============================================================================ */
const RAW_CURRENTLY_WATCHING: RawAnimeEntry[] = [
  {
    id: "cw-1",
    shortTitle: "BLUE BOX",
    titleRomaji: "Ao no Hako",
    titleEnglish: "Blue Box",
    category: "TV Series",
    releaseYear: 2024,
    ageRating: "PG-13",
    currentEpisode: 8,
    totalEpisodes: 25,
    isOngoing: true,
    rating: 8.8,
    genres: ["Romance", "Sports", "School"],
    synopsis:
      "Taiki Inomata, a dedicated badminton player, admires basketball star Chinatsu Kano from afar every morning in the gym—until fate unexpectedly brings Chinatsu to live under his family's roof.",
    quote1: "WHOLESOME MORNING GYM ROUTINES AND SLOW-BURN FIRST LOVE",
    quote2: "WATCHING EPISODE 8 OF 25 — ON-GOING PERSONAL PROGRESS",
    songTitle: "Same Blue",
    songArtist: "Official HIGE DANdism",
    songSearchQuery: "Same Blue Official HIGE DANdism",
    jikanQuery: "Ao no Hako",
    studio: "Telecom Animation Film",
    bpm: 134,
    keySignature: "E Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx170942-KKcLfQzV57nG.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/170942-v2GO5YNO0Q5I.jpg",
    youtubeId: "uvvYMBLY-w4",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0e/5d/92/0e5d92f5-17b1-0b46-af7d-f72ad7e78614/mzaf_17020336874762690964.plus.aac.p.m4a",
    illustrationType: "school-desk"
  },
  {
    id: "cw-2",
    shortTitle: "ROSHIDERE",
    titleRomaji: "Tokidoki Bosotto Roshia-go de Dereru Tonari no Alya-san",
    titleEnglish: "Alya Sometimes Hides Her Feelings in Russian",
    category: "TV Series",
    releaseYear: 2024,
    ageRating: "PG-13",
    currentEpisode: 5,
    totalEpisodes: 12,
    isOngoing: true,
    rating: 8.5,
    genres: ["Romance", "Comedy", "School"],
    synopsis:
      "Silver-haired honor student Alya constantly teases her lazy desk neighbor Masachika Kuze with sweet flirtations whispered in Russian, completely unaware that he understands every single word.",
    quote1: "HILARIOUS ROM-COM BANTER AND SECRET RUSSIAN WHISPERS",
    quote2: "WATCHING EPISODE 5 OF 12 — ON-GOING PERSONAL PROGRESS",
    songTitle: "1-ban Kagayaku Hoshi",
    songArtist: "Alya (CV: Sumire Uesaka)",
    songSearchQuery: "1番輝く星 上坂すみれ",
    jikanQuery: "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
    studio: "Doga Kobo",
    bpm: 128,
    keySignature: "G Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx162804-TBeptcAfvqTd.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/162804-NwvD3Lya8IZp.jpg",
    youtubeId: "pBX6TtOlYow",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1a/eb/03/1aeb034d-9826-8aa4-142b-bda5dad45c36/mzaf_7693415494682986218.plus.aac.p.m4a",
    illustrationType: "vending-machine"
  }
];

/* ============================================================================
   ⭐ STEP 2: COMPLETE 26 WATCHED ANIME ARCHIVE
   AUTOMATICALLY SORTED CHRONOLOGICALLY FROM LEFT (2006) → RIGHT (2026)
   ============================================================================ */
const RAW_WATCHED_ANIME: RawAnimeEntry[] = [
  {
    id: "10",
    shortTitle: "ZERO NO TSUKAIMA",
    titleRomaji: "Zero no Tsukaima",
    titleEnglish: "The Familiar of Zero",
    rating: 9.2,
    releaseYear: 2006,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Fantasy", "Romance", "Isekai"],
    synopsis:
      "Inept noble mage Louise 'the Zero' summons ordinary Tokyo teenager Saito Hiraga as her familiar, sparking an iconic magical adventure of legendary rune powers, tsundere romance, and kingdom-saving battles.",
    quote1: "A TIMELESS PIONEER OF MODERN FANTASY AND ISEKAI ROMANCE",
    quote2: "UNFORGETTABLE NOSTALGIA PACKED WITH MAGIC AND DEVOTION",
    songTitle: "First kiss",
    songArtist: "ICHIKO",
    songSearchQuery: "First kiss ICHIKO",
    jikanQuery: "Zero no Tsukaima",
    studio: "J.C.Staff",
    bpm: 135,
    keySignature: "Ab Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1195-odpKgDQ7A1fV.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1195-IgKkWPVvWHmf.jpg",
    youtubeId: "j-UofYKswhI",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8f/e5/b7/8fe5b7a9-91bd-a87e-b4f8-d63ed9d657ee/mzaf_2488651955026471644.plus.aac.p.m4a",
    illustrationType: "magic-circle"
  },
  {
    id: "26",
    shortTitle: "5 CENTIMETERS",
    titleRomaji: "Byousoku 5 Centimeter",
    titleEnglish: "5 Centimeters per Second",
    rating: 7.0,
    releaseYear: 2007,
    category: "Movie",
    ageRating: "PG-13",
    genres: ["Drama", "Romance", "Slice of Life"],
    synopsis:
      "Told across three poignant chapters, childhood sweethearts Takaki and Akari drift apart like cherry blossoms falling at five centimeters per second as time and distance test the lingering ache of first love.",
    quote1: "POETIC MELANCHOLY MEASURED IN FALLING CHERRY BLOSSOMS",
    quote2: "CAPTURES THE QUIET ACHE OF DISTANCE AND GROWING UP",
    songTitle: "One More Time, One More Chance",
    songArtist: "Masayoshi Yamazaki",
    songSearchQuery: "One More Time One More Chance Masayoshi Yamazaki",
    jikanQuery: "Byousoku 5 Centimeter",
    studio: "CoMix Wave",
    bpm: 92,
    keySignature: "Ab Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1689-rJKhjLEjQHSy.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1689.jpg",
    youtubeId: "iPsu_sk-e7Q",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/09/4c/98094c33-072b-36a5-3c8d-21a9d7d45c36/mzaf_11500047042945065618.plus.aac.p.m4a",
    illustrationType: "sakura-crossing"
  },
  {
    id: "8",
    shortTitle: "HAGANAI",
    titleRomaji: "Boku wa Tomodachi ga Sukunai",
    titleEnglish: "Haganai: I Don't Have Many Friends",
    rating: 8.1,
    releaseYear: 2011,
    category: "TV Series",
    ageRating: "17+",
    genres: ["Comedy", "Romance", "School"],
    synopsis:
      "Misunderstood transfer student Kodaka Hasegawa and sharp-tongued loner Yozora Mikazuki form the Neighbors' Club, recruiting fellow social outcasts to practice the art of making friends.",
    quote1: "A CLASSIC HIGH SCHOOL CLUB COMEDY OF LOVABLE MISFITS",
    quote2: "CHAOTIC FRIENDSHIP SIMULATIONS AND ICONIC BANTER",
    songTitle: "Zannenkei Rinjinbu",
    songArtist: "Tomodachi Tsukuritai",
    songSearchQuery: "Boku wa Tomodachi ga Sukunai",
    jikanQuery: "Boku wa Tomodachi ga Sukunai",
    studio: "AIC Build",
    bpm: 148,
    keySignature: "C Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx10719-aNf9gOOw62Fs.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/10719-d6DYjUtuSmdg.jpg",
    youtubeId: "-W3fXMTBsuI",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/Music/v4/ff/4e/aa/ff4eaa4c-2beb-89d2-721f-bce0589c2a98/mzaf_3103245856644361038.plus.aac.p.m4a",
    illustrationType: "arcade-cabinet"
  },
  {
    id: "20",
    shortTitle: "NISEKOI",
    titleRomaji: "Nisekoi",
    titleEnglish: "Nisekoi: False Love",
    rating: 8.0,
    releaseYear: 2014,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "School"],
    synopsis:
      "To prevent an all-out turf war between their rival families, yakuza heir Raku Ichijo and gangster's daughter Chitoge Kirisaki must pretend to be a lovey-dovey couple while searching for a childhood promise key.",
    quote1: "STUDIO SHAFT'S KALEIDOSCOPIC VISUAL FLAIR MEETS ROM-COM GOLD",
    quote2: "THE ULTIMATE PROMISE LOCK MYSTERY AND TSUNDERE SPARKS",
    songTitle: "CLICK",
    songArtist: "ClariS",
    songSearchQuery: "CLICK ClariS",
    jikanQuery: "Nisekoi",
    studio: "Shaft",
    bpm: 135,
    keySignature: "Eb Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx18897-G2Fx2ZACsXBU.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/18897-h3TRFmkGYLkd.jpg",
    youtubeId: "PuB1VpKbWtE",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9c/42/ff/9c42ffce-7cac-aa67-2c93-563daeed8940/mzaf_13028682713551074548.plus.aac.p.m4a",
    illustrationType: "cassette-synth"
  },
  {
    id: "1",
    shortTitle: "YAMADA-KUN",
    titleRomaji: "Yamada-kun to 7-nin no Majo",
    titleEnglish: "Yamada-kun and the Seven Witches",
    rating: 8.0,
    releaseYear: 2015,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "Supernatural"],
    synopsis:
      "High school delinquent Ryu Yamada accidentally discovers he can swap bodies with a kiss, leading him and honor student Urara Shiraishi on a chaotic hunt to uncover the school's seven witches.",
    quote1: "BODY-SWAPPING CHAOS AND SUPERNATURAL HIGH SCHOOL ROMANCE",
    quote2: "INFECTIOUS COMEDIC TIMING WITH AN ICONIC OPENING THEME",
    songTitle: "Kuchizuke Diamond",
    songArtist: "WEAVER",
    songSearchQuery: "Kuchizuke Diamond WEAVER",
    jikanQuery: "Yamada-kun to 7-nin no Majo",
    studio: "LIDENFILMS",
    bpm: 138,
    keySignature: "F Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20966-HboUtUzEKWl6.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20966-0KwHGdCF9Ie1.jpg",
    youtubeId: "vDOknfJIUu4",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/80/c4/90/80c4904b-7485-686d-bf5d-c279dd24188d/mzaf_10698822257358362061.plus.aac.p.m4a",
    illustrationType: "vending-machine"
  },
  {
    id: "18",
    shortTitle: "RELIFE",
    titleRomaji: "ReLIFE",
    titleEnglish: "ReLIFE",
    rating: 8.5,
    releaseYear: 2016,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Drama", "Romance", "School"],
    synopsis:
      "Unemployed 27-year-old Arata Kaizaki takes a mysterious pill that restores his 17-year-old appearance for a one-year social rehabilitation experiment, rediscovering youth, purpose, and love.",
    quote1: "A DEEPLY MOVING SECOND CHANCE AT YOUTH AND SELF-FORGIVENESS",
    quote2: "BITTERSWEET, FUNNY, AND UNFORGETTABLY HUMAN",
    songTitle: "Button",
    songArtist: "PENGUIN RESEARCH",
    songSearchQuery: "Button PENGUIN RESEARCH",
    jikanQuery: "ReLIFE",
    studio: "TMS Entertainment",
    bpm: 134,
    keySignature: "A Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21049-4AHSLeiDE9eg.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21049-PeKXMMYru3Xl.png",
    youtubeId: "fZCgXuxMAZY",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/60/e1/25/60e12584-cf56-0bb0-ec57-92b7b34d8836/mzaf_15489300278049320019.plus.aac.p.m4a",
    illustrationType: "vending-machine"
  },
  {
    id: "23",
    shortTitle: "YOUR NAME.",
    titleRomaji: "Kimi no Na wa.",
    titleEnglish: "Your Name.",
    rating: 9.3,
    releaseYear: 2016,
    category: "Movie",
    ageRating: "PG-13",
    genres: ["Romance", "Supernatural", "Drama"],
    synopsis:
      "Countryside shrine maiden Mitsuha and Tokyo schoolboy Taki mysteriously begin swapping bodies across time and space, racing against a falling comet to find each other before their memories fade.",
    quote1: "A TRANSCENDENT CINEMATIC PHENOMENON OF TIME AND RED STRING FATE",
    quote2: "SHINKAI'S LUMINOUS SKYSCAPES POWERED BY RADWIMPS' ICONIC SCORE",
    songTitle: "Zenzenzense (Movie Ver.)",
    songArtist: "RADWIMPS",
    songSearchQuery: "Zenzenzense RADWIMPS",
    jikanQuery: "Kimi no Na wa.",
    studio: "CoMix Wave Films",
    bpm: 190,
    keySignature: "B Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-SUo3ZQuCbYhJ.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21519-1ayMXgNlmByb.jpg",
    youtubeId: "k4xGqY5IDBE",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f8/fd/9f/f8fd9f88-67e8-ce12-f44d-1b4fe421f1f9/mzaf_5313510550820503304.plus.aac.p.m4a",
    illustrationType: "comet-sky"
  },
  {
    id: "24",
    shortTitle: "A SILENT VOICE",
    titleRomaji: "Koe no Katachi",
    titleEnglish: "A Silent Voice",
    rating: 9.4,
    releaseYear: 2016,
    category: "Movie",
    ageRating: "PG-13",
    genres: ["Drama", "Romance", "Slice of Life"],
    synopsis:
      "Haunted by guilt for bullying his deaf classmate Shoko Nishimiya in elementary school, isolated teen Shoya Ishida seeks her out years later on a deeply emotional journey of forgiveness, healing, and connection.",
    quote1: "DEVASTATINGLY RAW, EMPATHETIC, AND CATHARTICALLY BEAUTIFUL",
    quote2: "KYOTO ANIMATION'S FINEST TRIUMPH ON REDEMPTION AND SELF-WORTH",
    songTitle: "Koi wo Shita no wa",
    songArtist: "aiko",
    songSearchQuery: "Koi wo Shita no wa aiko",
    jikanQuery: "Koe no Katachi",
    studio: "Kyoto Animation",
    bpm: 108,
    keySignature: "G Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20954-sYRfE5jQRtSB.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/20954-f30bHMXa5Qoe.jpg",
    youtubeId: "Sy4bPCuzfiQ",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/06/d6/eb/06d6eb1c-9c6b-84bc-4da3-1462074798ff/mzaf_3233254386248855645.plus.aac.p.m4a",
    illustrationType: "sakura-crossing"
  },
  {
    id: "5",
    shortTitle: "IMOUTO SAE",
    titleRomaji: "Imouto sae Ireba Ii.",
    titleEnglish: "A Sister's All You Need",
    rating: 7.2,
    releaseYear: 2017,
    category: "TV Series",
    ageRating: "17+",
    genres: ["Comedy", "Romance", "Slice of Life"],
    synopsis:
      "Light novelist Itsuki Hashima—obsessed with writing about the ultimate little sister—navigates publishing deadlines, tabletop games, and heartfelt romance alongside his eccentric circle of fellow creators.",
    quote1: "BEHIND ITS OUTRAGEOUS OPENING LIES A GENUINE WRITER DRAMA",
    quote2: "AN ODE TO CREATIVE PASSION, FRIENDSHIP, AND UNREQUITED LOVE",
    songTitle: "Ashita no Kimi sae Ireba Ii.",
    songArtist: "ChouCho",
    songSearchQuery: "Ashita no Kimi sae Ireba Ii ChouCho",
    jikanQuery: "Imouto sae Ireba Ii",
    studio: "SILVER LINK.",
    bpm: 136,
    keySignature: "Bb Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx98596-E2aZouOyuQ8G.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/98596-w7gpbUP7QESX.jpg",
    youtubeId: "sPsIk-Weqoc",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/b6/d2/59b6d20e-c85a-f5b2-9f79-9acc8dbcdb59/mzaf_4446349734059029313.plus.aac.p.m4a",
    illustrationType: "cassette-synth"
  },
  {
    id: "9",
    shortTitle: "JULIET",
    titleRomaji: "Kishuku Gakkou no Juliet",
    titleEnglish: "Boarding School Juliet",
    rating: 8.9,
    releaseYear: 2018,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "Action"],
    synopsis:
      "At the elite Dahlia Academy where two rival dorms war constantly, leaders Romio Inuzuka and Juliet Persia secretly start dating and must hide their forbidden romance while striving to change their world.",
    quote1: "FORBIDDEN DEVOTION COMBINED WITH UNSTOPPABLE COMEDIC ENERGY",
    quote2: "ONE OF THE MOST EARNEST AND REWARDING COUPLES IN ANIME",
    songTitle: "Love with You",
    songArtist: "fripSide",
    songSearchQuery: "Love with You fripSide",
    jikanQuery: "Kishuku Gakkou no Juliet",
    studio: "LIDENFILMS",
    bpm: 146,
    keySignature: "F# Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx101310-w1PLPsyg0XHr.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101310-ybQFtNXjTyhp.jpg",
    youtubeId: "Z9qlvLoZH8k",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b3/51/99/b35199fb-33fc-fd85-6fd1-a020a2d8be93/mzaf_9717050700522262997.plus.aac.p.m4a",
    illustrationType: "polar-wave"
  },
  {
    id: "6",
    shortTitle: "ORESUKI",
    titleRomaji: "Ore wo Suki nano wa Omae dake ka yo",
    titleEnglish: "Are You the Only One Who Loves Me?",
    rating: 8.3,
    releaseYear: 2019,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Comedy", "Romance", "School"],
    synopsis:
      "Expecting love confessions from two gorgeous girls on the infamous park bench, scheming nice-guy Joro instead gets asked to play wingman—while gloomy library girl Pansy sets her sights on him.",
    quote1: "SUBVERTS EVERY ROM-COM TROPE WITH SAVAGE SELF-AWARENESS",
    quote2: "BEWARE THE PARK BENCH IN THIS HILARIOUS TWISTED COMEDY",
    songTitle: "Papapa",
    songArtist: "Shuka Saito",
    songSearchQuery: "Papapa Shuka Saito",
    jikanQuery: "Ore wo Suki nano wa Omae dake ka yo",
    studio: "CONNECT",
    bpm: 144,
    keySignature: "G Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx104464-UdOCt3uyA2K9.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/104464-XbfWyamahIAu.jpg",
    youtubeId: "Pt3MqwiSyKY",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/3d/45/bd/3d45bd3a-51bb-9060-6f21-01d649fd0a0c/mzaf_2231614658992872241.plus.aac.p.m4a",
    illustrationType: "school-desk"
  },
  {
    id: "25",
    shortTitle: "JOSEE",
    titleRomaji: "Josee to Tora to Sakana-tachi",
    titleEnglish: "Josee, the Tiger and the Fish",
    rating: 8.7,
    releaseYear: 2020,
    category: "Movie",
    ageRating: "PG-13",
    genres: ["Drama", "Romance", "Slice of Life"],
    synopsis:
      "University student and avid diver Tsuneo takes a caretaker job for Josee, a fiercely imaginative wheelchair-bound artist, inspiring each other to chase their dreams into the wide, scary ocean of life.",
    quote1: "SOARS WITH ARTISTIC COURAGE AND OCEANIC WONDER",
    quote2: "AN UPLIFTING ODE TO CHASING DREAMS AGAINST ALL ODDS",
    songTitle: "Ao no Waltz",
    songArtist: "Eve",
    songSearchQuery: "Ao no Waltz Eve",
    jikanQuery: "Josee to Tora to Sakana-tachi",
    studio: "Bones",
    bpm: 120,
    keySignature: "Db Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113596-LKA0bYJGjLnB.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113596-8r3fCSFgQHIY.jpg",
    youtubeId: "QvgpMxoyDds",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a1/17/b4/a117b473-ffb1-6c7e-771f-b50804b4004f/mzaf_3218237334022403632.plus.aac.p.m4a",
    illustrationType: "ocean-tiger"
  },
  {
    id: "3",
    shortTitle: "RAELIANA",
    titleRomaji: "Kanojo ga Koushaku-tei ni Itta Riyuu",
    titleEnglish: "Why Raeliana Ended Up at the Duke's Mansion",
    rating: 8.1,
    releaseYear: 2023,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Fantasy", "Mystery"],
    synopsis:
      "Reincarnated as a minor novel character destined to be poisoned by her fiancé, Raeliana strikes a high-stakes six-month fake engagement with the calculating Duke Noah Wynknight to rewrite her fate.",
    quote1: "SHARP WIT AND ARISTOCRATIC INTRIGUE IN A DEADLY ROMANCE",
    quote2: "A CLEVER REINCARNATION MYSTERY THAT KEEPS YOU GUESSING",
    songTitle: "SURVIVE",
    songArtist: "MindaRyn",
    songSearchQuery: "SURVIVE MindaRyn",
    jikanQuery: "Kanojo ga Koushaku-tei ni Itta Riyuu",
    studio: "Typhoon Graphics",
    bpm: 142,
    keySignature: "C# Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151847-OnTYbvb4y4mp.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151847-S1pTlfRY2DqB.jpg",
    youtubeId: "PlLli6OaU8U",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9f/61/ff/9f61ffe6-e59d-59bf-e2a5-a5740bd7e1ac/mzaf_8165454170293598556.plus.aac.p.m4a",
    illustrationType: "magic-circle"
  },
  {
    id: "15",
    shortTitle: "SIGN OF AFFECTION",
    titleRomaji: "Yubisaki to Renren",
    titleEnglish: "A Sign of Affection",
    rating: 8.7,
    releaseYear: 2024,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Slice of Life"],
    synopsis:
      "Yuki Itose, a deaf university student living in a quiet world of her own, has her horizons tenderly expanded when she meets Itsuomi Nagi, a warm multilingual traveler who eagerly learns sign language.",
    quote1: "TENDER, BREATHTAKINGLY INTIMATE AND VISUALLY POETIC",
    quote2: "A MASTERCLASS IN GENTLE COMMUNICATION AND EMPATHY",
    songTitle: "Yuki no Ne",
    songArtist: "Novelbright",
    songSearchQuery: "Yuki no Ne Novelbright",
    jikanQuery: "Yubisaki to Renren",
    studio: "Ajia-do",
    bpm: 112,
    keySignature: "B Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx166794-1MAXFMgND6qS.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/166794-11TpGckiG12q.jpg",
    youtubeId: "hJd9FxYWzL0",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/37/0f/cc/370fcc96-1434-1aa1-397e-97d03b2e953c/mzaf_4543420244149963104.plus.aac.p.m4a",
    illustrationType: "cassette-synth"
  },
  {
    id: "4",
    shortTitle: "TENSHI-TSUKI",
    titleRomaji: "One Room, Hiatari Futsuu, Tenshi-tsuki.",
    titleEnglish: "Studio Apartment, Good Lighting, Angel Included",
    rating: 8.2,
    releaseYear: 2024,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "Supernatural"],
    synopsis:
      "Kindhearted high schooler Shintaro Tokumitsu wakes up one morning to find Towa, a pure and literal angel sent from heaven to study humans, living on his studio apartment balcony.",
    quote1: "PURE HEALING WARMTH UNDER ONE TINY STUDIO ROOF",
    quote2: "SOOTHING SLICE-OF-LIFE SWEETNESS WITH HEAVENLY CHARM",
    songTitle: "Kimi Iro no Kiseki",
    songArtist: "Yui Ogura",
    songSearchQuery: "Kimi Iro no Kiseki Yui Ogura",
    jikanQuery: "One Room Hiatari Futsuu Tenshi-tsuki",
    studio: "Okuruto Noboru",
    bpm: 126,
    keySignature: "A Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx169927-3FwBuKn4x5LL.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/169927-Z42R2hk0LvjJ.jpg",
    youtubeId: "O06j982UG58",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/01/49/b2/0149b2eb-0f2d-626b-c38d-08b033cd8804/mzaf_11792931977983511243.plus.aac.p.m4a",
    illustrationType: "vending-machine"
  },
  {
    id: "12",
    shortTitle: "AMAGAMI-SAN",
    titleRomaji: "Amagami-san Chi no Enmusubi",
    titleEnglish: "Tying the Knot with an Amagami Sister",
    rating: 8.0,
    releaseYear: 2024,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "Supernatural"],
    synopsis:
      "Orphaned student Uryu Kamihate moves into Kyoto's historic Amagami Shrine expecting quiet study time for medical school, only to learn he must marry one of the three shrine maiden sisters.",
    quote1: "KYOTO SHRINE MYSTICISM MEETS HEARTFELT FAMILY BONDS",
    quote2: "GORGEOUS AUTUMN COLORS AND SUPERNATURAL DESTINY",
    songTitle: "Yawaku Koishite",
    songArtist: "Momoiro Clover Z",
    songSearchQuery: "Yawaku Koishite Momoiro Clover Z",
    jikanQuery: "Amagami-san Chi no Enmusubi",
    studio: "Drive",
    bpm: 136,
    keySignature: "A Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx164172-GY2aqItIuqtR.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/164172-ceuofxXerReI.jpg",
    youtubeId: "pwb10_z0zvw",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7d/c8/9c/7dc89c4e-469b-0d47-58d9-591ad9d0b114/mzaf_1962518942424014895.plus.aac.p.m4a",
    illustrationType: "torii-shrine"
  },
  {
    id: "17",
    shortTitle: "LONER LIFE",
    titleRomaji: "Hitoribocchi no Isekai Kouryaku",
    titleEnglish: "Loner Life in Another World",
    rating: 7.5,
    releaseYear: 2024,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Fantasy", "Comedy", "Isekai"],
    synopsis:
      "Summoned to another world after all the good cheat skills are already taken by his classmates, dedicated loner Haruka combines leftover oddball skills to live freely—until he has to rescue his class anyway.",
    quote1: "TURNS LEFTOVER JUNK SKILLS INTO UNCONVENTIONAL GENIUS",
    quote2: "LAID-BACK ISEKAI HUMOR WITH AN ANTI-HERO FLAIR",
    songTitle: "ODD NUMBER",
    songArtist: "Yoshino",
    songSearchQuery: "ODD NUMBER Yoshino",
    jikanQuery: "Hitoribocchi no Isekai Kouryaku",
    studio: "Hayabusa Film × Passione",
    bpm: 138,
    keySignature: "G Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx173693-tRLdDE1BieXe.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/173693-TirKwvMQTEqr.jpg",
    youtubeId: "eWzTg1d3W1o",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/32/9f/98329f59-06bd-bd13-ac13-e36daecb95f0/mzaf_1364021365327521390.plus.aac.p.m4a",
    illustrationType: "arcade-cabinet"
  },
  {
    id: "2",
    shortTitle: "KURAKON",
    titleRomaji: "Class no Daikirai na Joshi to Kekkon suru Koto ni Natta.",
    titleEnglish: "I'm Getting Married to a Girl I Hate in My Class",
    rating: 8.4,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "School"],
    synopsis:
      "Forced into an arranged marriage by their grandparents, bitter classroom rivals Saito Hojo and Akane Sakuramori must navigate secret newlywed life under the same roof while slowly falling for each other.",
    quote1: "FROM BITTER CLASSROOM RIVALS TO SECRET NEWLYWEDS",
    quote2: "A DELIGHTFULLY TSUNDERE COHABITATION ROMANTIC COMEDY",
    songTitle: "Koibito Ijou, Suki Miman",
    songArtist: "=LOVE",
    songSearchQuery: "恋人以上、好き未満 =LOVE",
    jikanQuery: "Class no Daikirai na Joshi to Kekkon suru Koto ni Natta",
    studio: "Studio Gokumi × AXsiZ",
    bpm: 132,
    keySignature: "D Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx178462-YW6BgSGGP4az.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/178462-Ez3ZwJx9szLY.jpg",
    youtubeId: "ss7htgZZw8Y",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/44/67/cb/4467cb87-4231-b75a-b4f9-4bfd729c7a41/mzaf_13539162494623898650.plus.aac.p.m4a",
    illustrationType: "school-desk"
  },
  {
    id: "7",
    shortTitle: "CRUSH AT WORK",
    titleRomaji: "Kono Kaisha ni Suki na Hito ga Imasu",
    titleEnglish: "I Have a Crush at Work",
    rating: 8.7,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "Slice of Life"],
    synopsis:
      "Coworkers Masugu Tateishi and Yui Mitsuya seem like constant office rivals by day, but behind closed doors they are madly in love and trying their hardest to keep their sweet workplace romance a secret.",
    quote1: "ADULT WORKPLACE ROMANCE DONE WITH REFRESHING MATURITY",
    quote2: "SECRET OFFICE GLANCES AND HEART-MELTING AFTER-HOURS SWEETNESS",
    songTitle: "Ano ne,",
    songArtist: "Polkadot Stingray",
    songSearchQuery: "Ano ne Polkadot Stingray",
    jikanQuery: "Kono Kaisha ni Suki na Hito ga Imasu",
    studio: "Blade",
    bpm: 124,
    keySignature: "E Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx179696-1MAqXYVXT7IT.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/179696-F96hLlVTFe3B.jpg",
    youtubeId: "OWEzSDduLps",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/eb/e9/f2/ebe9f23b-d68f-e971-3684-301c5f4ac1ac/mzaf_12586668274530331524.plus.aac.p.m4a",
    illustrationType: "vending-machine"
  },
  {
    id: "16",
    shortTitle: "APPRAISER",
    titleRomaji: 'Fuguushoku "Kanteishi" ga Jitsu wa Saikyou Datta',
    titleEnglish: 'Even Given the Worthless "Appraiser" Class, I\'m Actually the Strongest',
    rating: 7.8,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Action", "Fantasy", "Adventure"],
    synopsis:
      "Betrayed and abandoned in a deadly dungeon abyss for having only the 'Appraiser' skill, Ein is rescued by the World Tree's spirit Yuri and awakens godlike ocular powers that make him unstoppable.",
    quote1: "FROM ABANDONED UNDERDOG TO GOD-TIER WORLD TREE CHAMPION",
    quote2: "SATISFYING POWER PROGRESSION AND CATHARTIC REDEMPTION",
    songTitle: "Crescendo",
    songArtist: "ASTERISM",
    songSearchQuery: "Crescendo ASTERISM",
    jikanQuery: "Fuguushoku Kanteishi ga Jitsu wa Saikyou Datta",
    studio: "Okuruto Noboru",
    bpm: 156,
    keySignature: "D Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx178548-4QkzBuJAx8w7.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/178548-dKtmhvOKdr6t.jpg",
    youtubeId: "3ZDbVRlCI4o",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/26/fd/e926fd09-49cf-dd11-92d3-5cc2217c5537/mzaf_1705471967308512988.plus.aac.p.m4a",
    illustrationType: "magic-circle"
  },
  {
    id: "11",
    shortTitle: "DANJO YUUJOU",
    titleRomaji: "Danjo no Yuujou wa Seiritsu suru?",
    titleEnglish: "Can a Boy-Girl Friendship Survive?",
    rating: 7.0,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "School"],
    synopsis:
      "Middle school best friends Himari Inuzuka and Yuu Natsume swore an eternal pact of platonic friendship while crafting floral accessories, until Yuu's first crush threatens to turn their bond upside down.",
    quote1: "TESTS THE FRAGILE LINE BETWEEN PLATONIC BOND AND FIRST LOVE",
    quote2: "COLORFUL YOUTH BANTER WITH FLORAL ARTISTRY",
    songTitle: "Shitsumon, Koitte Nandeshoka?",
    songArtist: "HoneyWorks feat. Hakoniwalily",
    songSearchQuery: "HoneyWorks Danjo no Yuujou",
    jikanQuery: "Danjo no Yuujou wa Seiritsu suru",
    studio: "J.C.Staff",
    bpm: 130,
    keySignature: "D Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153554-hHYe9aV6Gvlv.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153554-tB8pqiRhaKsy.jpg",
    youtubeId: "fZH5jDK5qV8",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0f/85/c9/0f85c911-2932-31e0-893b-13cb49b77067/mzaf_6950154421065402166.plus.aac.p.m4a",
    illustrationType: "sakura-crossing"
  },
  {
    id: "13",
    shortTitle: "SUMMER POCKETS",
    titleRomaji: "Summer Pockets",
    titleEnglish: "Summer Pockets",
    rating: 7.6,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Drama", "Romance", "Supernatural"],
    synopsis:
      "Visiting the tranquil island of Torishirojima to sort through his late grandmother's belongings, Hairi Takahara experiences an unforgettable, nostalgic summer filled with sea breezes and mystery.",
    quote1: "SUNLIT ISLAND NOSTALGIA INFUSED WITH KEY'S SIGNATURE EMOTION",
    quote2: "A WISTFUL SUMMER MEMORY OF CICADAS AND SEA BREEZES",
    songTitle: "Alka Tale",
    songArtist: "Konomi Suzuki",
    songSearchQuery: "Alka Tale Konomi Suzuki",
    jikanQuery: "Summer Pockets",
    studio: "feel.",
    bpm: 122,
    keySignature: "Eb Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx143200-42OaDCS6VEy3.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/143200-R0qpwS1C6b8i.jpg",
    youtubeId: "x3_Pcru8SS8",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c1/c5/9a/c1c59aab-dba7-50e7-35e9-45ec17b8e408/mzaf_10499504250048985447.plus.aac.p.m4a",
    illustrationType: "ocean-tiger"
  },
  {
    id: "14",
    shortTitle: "GAME CENTER",
    titleRomaji: "Game Center Shoujo to Ibunka Kouryuu",
    titleEnglish: "Cultural Exchange with a Game Center Girl",
    rating: 7.8,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "Slice of Life"],
    synopsis:
      "Working part-time at a local arcade, Renji Kusakabe helps energetic British girl Lily Baker win a crane game plushie on Valentine's Day, kicking off an adorable cross-cultural friendship.",
    quote1: "ADORABLE ARCADE CRANE GAMES AND CROSS-CULTURAL SPARKS",
    quote2: "PURE SUGAR-RUSH WHOLESOMENESS IN EVERY EPISODE",
    songTitle: "Futari no Start Button",
    songArtist: "Lily Baker (CV: Sally Amaki) & Aoi",
    songSearchQuery: "ふたりのスタートボタン",
    jikanQuery: "Game Center Shoujo to Ibunka Kouryuu",
    studio: "Nomad",
    bpm: 140,
    keySignature: "C Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx180794-rQGxkguEc2ov.png",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/180794-15AlhRdZMhv7.jpg",
    youtubeId: "QOVabX4iYYY",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3b/60/c0/3b60c018-71fe-4795-51d0-1b249b9fcc32/mzaf_14180398115083916745.plus.aac.p.m4a",
    illustrationType: "arcade-cabinet"
  },
  {
    id: "19",
    shortTitle: "KAORU HANA",
    titleRomaji: "Kaoru Hana wa Rin to Saku",
    titleEnglish: "The Fragrant Flower Blooms with Dignity (Waguri)",
    rating: 8.2,
    releaseYear: 2025,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Drama", "School"],
    synopsis:
      "Despite the bitter rivalry between his rough delinquent boys' school and the prestigious girls' academy next door, intimidating-looking Rintaro Tsumugi forms a pure bond with cake-loving Kaoruko Waguri.",
    quote1: "DISARMING KINDNESS THAT MELTS AWAY PREJUDICE AND FEAR",
    quote2: "PURE HEARTFELT SINCERITY ANCHORED BY WAGURI'S RADIANT SMILE",
    songTitle: "Manazashi wa Hikari",
    songArtist: "Tatsuya Kitani",
    songSearchQuery: "まなざしは光 キタニタツヤ",
    jikanQuery: "Kaoru Hana wa Rin to Saku",
    studio: "CloverWorks",
    bpm: 128,
    keySignature: "F Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx181444-Ut9DDUZdfHwg.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/181444-SBhwJNPxjHrr.jpg",
    youtubeId: "wMDwbC-cAQg",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1d/eb/bd/1debbd79-705c-79c3-7b57-689628483627/mzaf_234292626159871160.plus.aac.p.m4a",
    illustrationType: "sakura-crossing"
  },
  {
    id: "22",
    shortTitle: "RAMPARTS OF ICE",
    titleRomaji: "Koori no Jouheki",
    titleEnglish: "The Ramparts of Ice",
    rating: 8.9,
    releaseYear: 2026,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Drama", "School"],
    synopsis:
      "Guarded behind an icy emotional wall, Koyuki Hikawa keeps everyone at arm's length until outgoing Minato Amamiya persistently steps into her world, sparking a nuanced story of four teens untangling love.",
    quote1: "INTRICATE PSYCHOLOGICAL DEPTH AND DELICATE EMOTIONAL THAWING",
    quote2: "AN ACHINGLY REAL PORTRAIT OF TEENAGE BOUNDARIES AND TRUST",
    songTitle: "Toumei",
    songArtist: "Novelbright",
    songSearchQuery: "透明 Novelbright",
    jikanQuery: "Koori no Jouheki",
    studio: "Studio KAI",
    bpm: 118,
    keySignature: "F Minor",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx186497-uwPrNPphXvjP.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/186497-naXtQFMHJaR1.jpg",
    youtubeId: "a7ah5by0Ffw",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/15/06/e9/1506e916-1197-f827-2f15-81c3b01cf3ff/mzaf_1656077387332112316.plus.aac.p.m4a",
    illustrationType: "polar-wave"
  },
  {
    id: "21",
    shortTitle: "POLAR OPPOSITES",
    titleRomaji: "Seihantai na Kimi to Boku (S1 & S2)",
    titleEnglish: "You and I Are Polar Opposites",
    rating: 10.0,
    releaseYear: 2026,
    category: "TV Series",
    ageRating: "PG-13",
    genres: ["Romance", "Comedy", "School"],
    synopsis:
      "Bubbly, trend-conscious Miyu Suzuki and quiet, brutally honest Yusuke Tani couldn't be more different, yet their refreshingly genuine communication and hilarious friend group create an absolute 10/10 masterpiece.",
    quote1: "CROWNED 10 / 10 — THE GOLD STANDARD OF MODERN ROMANTIC COMEDY",
    quote2: "REFRESHINGLY HONEST COMMUNICATION AND FLAWLESS ENSEMBLE CHEMISTRY",
    songTitle: "Megane wo Hazushite",
    songArtist: "Noa (乃紫)",
    songSearchQuery: "メガネを外して 乃紫",
    jikanQuery: "Seihantai na Kimi to Boku",
    studio: "Lapin Track",
    bpm: 130,
    keySignature: "C Major",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx184951-s8Lg2muPBhdX.jpg",
    bannerUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/184951-Rx1mZZfKa9IU.jpg",
    youtubeId: "b5vpRUDkhT0",
    songPreviewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bd/ac/08/bdac08c1-c66a-29bf-32f7-488d95a2c4e9/mzaf_95014382894924247.plus.aac.p.m4a",
    illustrationType: "polar-wave"
  }
];

function hydrateChronologically(
  rawList: RawAnimeEntry[],
  codePrefix: string,
  paletteOffset = 0
): AnimeRelease[] {
  // Always sort strictly chronologically ascending by releaseYear (Left = Oldest -> Right = Newest)
  const sorted = [...rawList].sort((a, b) => {
    if (a.releaseYear !== b.releaseYear) return a.releaseYear - b.releaseYear;
    return a.titleEnglish.localeCompare(b.titleEnglish);
  });

  return sorted.map((entry, idx) => {
    const palette = ARCHIVAL_PALETTES[(idx + paletteOffset) % ARCHIVAL_PALETTES.length];
    const catalogCode = `${codePrefix}-${String(idx + 1).padStart(3, "0")}`;
    return {
      ...entry,
      catalogCode,
      ...palette,
      tracks: buildTracksForAnime(entry, idx + paletteOffset)
    };
  });
}

export const WATCHED_ANIME_RELEASES: AnimeRelease[] = hydrateChronologically(RAW_WATCHED_ANIME, "ANM", 0);
export const CURRENTLY_WATCHING_RELEASES: AnimeRelease[] = hydrateChronologically(
  RAW_CURRENTLY_WATCHING,
  "ONG",
  4
);
export const ALL_ANIME_RELEASES: AnimeRelease[] = [
  ...WATCHED_ANIME_RELEASES,
  ...CURRENTLY_WATCHING_RELEASES
];

export const TIMELINE_YEARS: number[] = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024, 2025, 2026
];

export function formatTimelineYearLabel(year: number): string {
  if (year === 2006 || year === 2011 || year === 2016 || year === 2020 || year === 2026) {
    return String(year);
  }
  return `'${String(year).slice(2)}`;
}

/**
 * Returns a CORS-safe URL for loading anime artwork onto Three.js WebGL <canvas> textures.
 * Uses our Next.js /api/image-proxy route when hosted on HTTP(S), falling back to wsrv.nl for file://.
 */
export function getCorsSafeArtworkUrl(rawUrl: string): string {
  if (!rawUrl) return "";
  if (typeof window !== "undefined" && window.location.protocol.startsWith("http")) {
    return `/api/image-proxy?url=${encodeURIComponent(rawUrl)}`;
  }
  return `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=900&output=webp`;
}

export interface PopularRadioHit {
  id: string;
  title: string;
  artist: string;
  views: string;
  previewUrl: string;
}

/**
 * Curated YouTube Top-Viewed Iconic Anime & J-Pop Mega-Hits for Default-ON Radio Station
 */
export const POPULAR_RADIO_HITS: PopularRadioHit[] = [
  {
    id: "idol",
    title: "Idol (アイドル)",
    artist: "YOASOBI",
    views: "580M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f0/db/16/f0db16be-457e-f10f-98b6-f30b11de34e4/mzaf_5189430943078523093.plus.aac.p.m4a"
  },
  {
    id: "lemon",
    title: "Lemon",
    artist: "Kenshi Yonezu",
    views: "880M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/27/17/9b/27179b15-2153-25e8-d035-35fdb4d059d8/mzaf_757024838235216109.plus.aac.p.m4a"
  },
  {
    id: "pretender",
    title: "Pretender",
    artist: "Official HIGE DANdism",
    views: "540M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/71/93/7a/71937a82-5662-3d08-c78d-65179c560a6b/mzaf_4128339501254480840.plus.aac.p.m4a"
  },
  {
    id: "kaikai",
    title: "Kaikai Kitan (廻廻奇譚)",
    artist: "Eve",
    views: "380M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/47/ca/1747ca2b-1ab8-a43f-35d5-e0d01d9be305/mzaf_17560760129565806208.plus.aac.p.m4a"
  },
  {
    id: "bbbb",
    title: "Bling-Bang-Bang-Born",
    artist: "Creepy Nuts",
    views: "320M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5c/54/5e/5c545e9a-c8ca-c673-f85d-a74b14c2c882/mzaf_2313943576213161760.plus.aac.p.m4a"
  },
  {
    id: "zenzenzense",
    title: "Zenzenzense (前前前世)",
    artist: "RADWIMPS",
    views: "320M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f8/fd/9f/f8fd9f88-67e8-ce12-f44d-1b4fe421f1f9/mzaf_5313510550820503304.plus.aac.p.m4a"
  },
  {
    id: "yoru",
    title: "Yoru ni Kakeru (夜に駆ける)",
    artist: "YOASOBI",
    views: "290M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/73/ae/4e73ae7f-96d6-5100-d3d3-3c50c28a1f19/mzaf_6031201848020469124.plus.aac.p.m4a"
  },
  {
    id: "zankyo",
    title: "Zankyosanka (残響散歌)",
    artist: "Aimer",
    views: "250M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e7/65/bc/e765bc4b-7710-5c13-c35d-8cd30d7bcacd/mzaf_5473058310448658183.plus.aac.p.m4a"
  },
  {
    id: "inferno",
    title: "Inferno (インフェルノ)",
    artist: "Mrs. GREEN APPLE",
    views: "240M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/70/25/37/70253773-995d-296e-19db-6a2457b9f3db/mzaf_2716666302310961916.plus.aac.p.m4a"
  },
  {
    id: "silhouette",
    title: "Silhouette (シルエット)",
    artist: "KANA-BOON",
    views: "230M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/68/4b/e0/684be0b1-7d5a-b7a8-a6d9-f369de931320/mzaf_6309023904855490382.plus.aac.p.m4a"
  },
  {
    id: "kickback",
    title: "KICK BACK",
    artist: "Kenshi Yonezu",
    views: "210M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/86/2d/45/862d4572-805c-3a72-49a4-905a8c327888/mzaf_14805576631717868964.plus.aac.p.m4a"
  },
  {
    id: "gurenge",
    title: "Gurenge (紅蓮華)",
    artist: "LiSA",
    views: "200M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d7/45/22/d7452274-6107-7ace-420b-1b509d55d067/mzaf_15546458713313472040.plus.aac.p.m4a"
  },
  {
    id: "shinjidai",
    title: "New Genesis (新時代)",
    artist: "Ado",
    views: "190M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/6b/f3/59/6bf35909-9a90-8642-b4fc-0932fcd4f862/mzaf_9878820709909147000.plus.aac.p.m4a"
  },
  {
    id: "aonosumika",
    title: "Where Our Blue Is (青のすみか)",
    artist: "Tatsuya Kitani",
    views: "150M+ views",
    previewUrl:
      "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/92/c9/7a/92c97ab2-5fdd-d00b-34eb-b2b58cd3c610/mzaf_15460441178714099183.plus.aac.p.m4a"
  }
];
