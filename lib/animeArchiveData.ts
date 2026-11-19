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

function buildTracksForAnime(entry: RawAnimeEntry, index: number): ArchiveTrack[] {
  return [
    {
      number: "01",
      title: `${entry.songTitle} (Official Theme)`,
      role: `OFFICIAL OP / OST • ${entry.songArtist}`,
      duration: "00:30",
      bpm: entry.bpm,
      notes: CHORD_BANK[index % CHORD_BANK.length],
      waveformSeed: index * 13 + 1,
      isOfficialOst: true
    },
    {
      number: "02",
      title: `${entry.shortTitle} — Main Overture`,
      role: `Synth Suite • ${entry.studio}`,
      duration: "03:18",
      bpm: Math.max(84, entry.bpm - 18),
      notes: CHORD_BANK[(index + 2) % CHORD_BANK.length],
      waveformSeed: index * 13 + 2
    },
    {
      number: "03",
      title: entry.genres[0] ? `${entry.genres[0]} Motif in ${entry.keySignature}` : "Character Leitmotif",
      role: "Scene Score • Side A",
      duration: "02:44",
      bpm: Math.max(76, entry.bpm - 28),
      notes: CHORD_BANK[(index + 4) % CHORD_BANK.length],
      waveformSeed: index * 13 + 3
    },
    {
      number: "04",
      title: "Climax & Turning Point",
      role: `Episode Highlight • ★ ${entry.rating.toFixed(1)}`,
      duration: "04:05",
      bpm: Math.min(168, entry.bpm + 10),
      notes: CHORD_BANK[(index + 1) % CHORD_BANK.length],
      waveformSeed: index * 13 + 4
    },
    {
      number: "05",
      title: `${entry.songTitle} (Analog Synth Dub)`,
      role: "Ending Reprise • Side B",
      duration: "02:56",
      bpm: Math.max(72, Math.round(entry.bpm * 0.75)),
      notes: CHORD_BANK[(index + 5) % CHORD_BANK.length],
      waveformSeed: index * 13 + 5
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
