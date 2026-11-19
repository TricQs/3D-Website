/* ============================================================================
   💿 DISC ARCHIVE — INTERACTIVE 3D ANIME RATING & SOUNDTRACK SHOWCASE
   ============================================================================
   - Chronologically sorted Left (2006) -> Right (2026) along the 3D shelf
   - Zero-clipping 3D Accordion Spine-to-Cover Shelf + Floating Vinyl Disc
   - Full-bleed Official Anime Key Visuals via CORS-safe proxy + Swiss Minimal fallback
   - Verified Official Theme Song Vocal Previews + Embeddable YouTube Trailers/OPs
   - Multi-Stage GSAP Spindle-Hole Camera Dive-In & Reverse Dive-Out Choreography
   ============================================================================ */

/* ============================================================================
   📺 STEP 1: CURRENTLY WATCHING (ON-GOING PERSONAL PROGRESS)
   ============================================================================ */
const RAW_CURRENTLY_WATCHING = [
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
   ⭐ STEP 2: COMPLETE 26 WATCHED ANIME ARCHIVE (CHRONOLOGICALLY SORTED 2006 -> 2026)
   ============================================================================ */
const RAW_WATCHED_ANIME = [
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

/* ============================================================================
   🎨 17 ARCHIVAL PALETTES & STRICT CHRONOLOGICAL HYDRATION (2006 -> 2026)
   ============================================================================ */
const ARCHIVAL_PALETTES = [
  { spineColor: "#1C2838", spineTextColor: "#F2F1EC", coverBgColor: "#212F42", coverInkColor: "#F4F3EF", accentColor: "#E05A3A" },
  { spineColor: "#E8C5C0", spineTextColor: "#181818", coverBgColor: "#F2DAD6", coverInkColor: "#181818", accentColor: "#D6492A" },
  { spineColor: "#C8522A", spineTextColor: "#FAF7F2", coverBgColor: "#EDE6DA", coverInkColor: "#181818", accentColor: "#C8522A" },
  { spineColor: "#EBE7DD", spineTextColor: "#181818", coverBgColor: "#F4F1E8", coverInkColor: "#181818", accentColor: "#204A87" },
  { spineColor: "#1E448E", spineTextColor: "#F5F5F2", coverBgColor: "#234C9E", coverInkColor: "#F6F5F0", accentColor: "#F2C14E" },
  { spineColor: "#5C1E28", spineTextColor: "#F4EFEA", coverBgColor: "#EFE9E2", coverInkColor: "#3D1219", accentColor: "#8C2939" },
  { spineColor: "#748773", spineTextColor: "#141A14", coverBgColor: "#DCE3DA", coverInkColor: "#181E18", accentColor: "#3F5740" },
  { spineColor: "#1B1B1A", spineTextColor: "#EAEAE8", coverBgColor: "#1E1E1D", coverInkColor: "#F0EFEA", accentColor: "#E05A3A" },
  { spineColor: "#1C5359", spineTextColor: "#F2F5F4", coverBgColor: "#E6ECEB", coverInkColor: "#143538", accentColor: "#1C5359" },
  { spineColor: "#D49E2A", spineTextColor: "#181818", coverBgColor: "#F3EAD2", coverInkColor: "#181818", accentColor: "#B85D19" },
  { spineColor: "#2C2956", spineTextColor: "#F2F0F7", coverBgColor: "#25224A", coverInkColor: "#F4F2FA", accentColor: "#E05A3A" },
  { spineColor: "#F5F4EE", spineTextColor: "#181818", coverBgColor: "#F8F7F2", coverInkColor: "#181818", accentColor: "#E05A3A" },
  { spineColor: "#B56922", spineTextColor: "#FAF6F0", coverBgColor: "#EFE5D8", coverInkColor: "#261709", accentColor: "#B56922" },
  { spineColor: "#6B7CA6", spineTextColor: "#141720", coverBgColor: "#E3E7F2", coverInkColor: "#1B2234", accentColor: "#3D5285" },
  { spineColor: "#263F32", spineTextColor: "#EFECE6", coverBgColor: "#E7ECE8", coverInkColor: "#182820", accentColor: "#C85A32" },
  { spineColor: "#3D4C57", spineTextColor: "#F3F4F5", coverBgColor: "#E4E8EB", coverInkColor: "#182026", accentColor: "#E05A3A" },
  { spineColor: "#9E4638", spineTextColor: "#F6F2EC", coverBgColor: "#F2E7E4", coverInkColor: "#291410", accentColor: "#9E4638" }
];

const CHORD_BANK = [
  [261.63, 329.63, 392.0, 493.88, 587.33],
  [293.66, 369.99, 440.0, 554.37, 659.25],
  [246.94, 293.66, 369.99, 440.0, 523.25],
  [220.0, 261.63, 329.63, 392.0, 493.88],
  [349.23, 440.0, 523.25, 659.25, 783.99],
  [311.13, 392.0, 466.16, 587.33, 698.46],
  [277.18, 329.63, 415.3, 493.88, 622.25]
];

function hydrateChronologically(rawList, prefix, offset) {
  const sorted = [...rawList].sort((a, b) => {
    if (a.releaseYear !== b.releaseYear) return a.releaseYear - b.releaseYear;
    return a.titleEnglish.localeCompare(b.titleEnglish);
  });

  return sorted.map((entry, idx) => {
    const pal = ARCHIVAL_PALETTES[(idx + offset) % ARCHIVAL_PALETTES.length];
    const i = idx + offset;
    const catalogCode = `${prefix}-${String(idx + 1).padStart(3, "0")}`;
    const tracks = [
      {
        number: "01",
        title: `${entry.songTitle} (Official Theme)`,
        role: `OFFICIAL OP / OST • ${entry.songArtist}`,
        duration: "00:30",
        bpm: entry.bpm,
        notes: CHORD_BANK[i % CHORD_BANK.length],
        waveformSeed: i * 13 + 1,
        isOfficialOst: true
      },
      {
        number: "02",
        title: `${entry.shortTitle} — Main Overture`,
        role: `Synth Suite • ${entry.studio}`,
        duration: "03:18",
        bpm: Math.max(84, entry.bpm - 18),
        notes: CHORD_BANK[(i + 2) % CHORD_BANK.length],
        waveformSeed: i * 13 + 2
      },
      {
        number: "03",
        title: `${entry.genres[0] || "Theme"} Motif in ${entry.keySignature}`,
        role: "Scene Score • Side A",
        duration: "02:44",
        bpm: Math.max(76, entry.bpm - 28),
        notes: CHORD_BANK[(i + 4) % CHORD_BANK.length],
        waveformSeed: i * 13 + 3
      },
      {
        number: "04",
        title: "Climax & Turning Point",
        role: `Episode Highlight • ★ ${entry.rating.toFixed(1)}`,
        duration: "04:05",
        bpm: Math.min(168, entry.bpm + 10),
        notes: CHORD_BANK[(i + 1) % CHORD_BANK.length],
        waveformSeed: i * 13 + 4
      },
      {
        number: "05",
        title: `${entry.songTitle} (Analog Synth Dub)`,
        role: "Ending Reprise • Side B",
        duration: "02:56",
        bpm: Math.max(72, Math.round(entry.bpm * 0.75)),
        notes: CHORD_BANK[(i + 5) % CHORD_BANK.length],
        waveformSeed: i * 13 + 5
      }
    ];
    return { ...entry, catalogCode, ...pal, tracks };
  });
}

const WATCHED_RELEASES = hydrateChronologically(RAW_WATCHED_ANIME, "ANM", 0);
const ONGOING_RELEASES = hydrateChronologically(RAW_CURRENTLY_WATCHING, "ONG", 4);
const ALL_RELEASES = [...WATCHED_RELEASES, ...ONGOING_RELEASES];
const RULER_YEARS = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024, 2025, 2026
];

const POPULAR_RADIO_HITS = [
  { id: "idol", title: "Idol (アイドル)", artist: "YOASOBI", views: "580M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f0/db/16/f0db16be-457e-f10f-98b6-f30b11de34e4/mzaf_5189430943078523093.plus.aac.p.m4a" },
  { id: "lemon", title: "Lemon", artist: "Kenshi Yonezu", views: "880M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/27/17/9b/27179b15-2153-25e8-d035-35fdb4d059d8/mzaf_757024838235216109.plus.aac.p.m4a" },
  { id: "pretender", title: "Pretender", artist: "Official HIGE DANdism", views: "540M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/71/93/7a/71937a82-5662-3d08-c78d-65179c560a6b/mzaf_4128339501254480840.plus.aac.p.m4a" },
  { id: "kaikai", title: "Kaikai Kitan (廻廻奇譚)", artist: "Eve", views: "380M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/47/ca/1747ca2b-1ab8-a43f-35d5-e0d01d9be305/mzaf_17560760129565806208.plus.aac.p.m4a" },
  { id: "bbbb", title: "Bling-Bang-Bang-Born", artist: "Creepy Nuts", views: "320M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5c/54/5e/5c545e9a-c8ca-c673-f85d-a74b14c2c882/mzaf_2313943576213161760.plus.aac.p.m4a" },
  { id: "zenzenzense", title: "Zenzenzense (前前前世)", artist: "RADWIMPS", views: "320M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f8/fd/9f/f8fd9f88-67e8-ce12-f44d-1b4fe421f1f9/mzaf_5313510550820503304.plus.aac.p.m4a" },
  { id: "yoru", title: "Yoru ni Kakeru (夜に駆ける)", artist: "YOASOBI", views: "290M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/73/ae/4e73ae7f-96d6-5100-d3d3-3c50c28a1f19/mzaf_6031201848020469124.plus.aac.p.m4a" },
  { id: "zankyo", title: "Zankyosanka (残響散歌)", artist: "Aimer", views: "250M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e7/65/bc/e765bc4b-7710-5c13-c35d-8cd30d7bcacd/mzaf_5473058310448658183.plus.aac.p.m4a" },
  { id: "inferno", title: "Inferno (インフェルノ)", artist: "Mrs. GREEN APPLE", views: "240M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/70/25/37/70253773-995d-296e-19db-6a2457b9f3db/mzaf_2716666302310961916.plus.aac.p.m4a" },
  { id: "silhouette", title: "Silhouette (シルエット)", artist: "KANA-BOON", views: "230M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/68/4b/e0/684be0b1-7d5a-b7a8-a6d9-f369de931320/mzaf_6309023904855490382.plus.aac.p.m4a" },
  { id: "kickback", title: "KICK BACK", artist: "Kenshi Yonezu", views: "210M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/86/2d/45/862d4572-805c-3a72-49a4-905a8c327888/mzaf_14805576631717868964.plus.aac.p.m4a" },
  { id: "gurenge", title: "Gurenge (紅蓮華)", artist: "LiSA", views: "200M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d7/45/22/d7452274-6107-7ace-420b-1b509d55d067/mzaf_15546458713313472040.plus.aac.p.m4a" },
  { id: "shinjidai", title: "New Genesis (新時代)", artist: "Ado", views: "190M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/6b/f3/59/6bf35909-9a90-8642-b4fc-0932fcd4f862/mzaf_9878820709909147000.plus.aac.p.m4a" },
  { id: "aonosumika", title: "Where Our Blue Is (青のすみか)", artist: "Tatsuya Kitani", views: "150M+ views", previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/92/c9/7a/92c97ab2-5fdd-d00b-34eb-b2b58cd3c610/mzaf_15460441178714099183.plus.aac.p.m4a" }
];

/* ============================================================================
   🖼️ HIGH-DPI HTML5 <CANVAS> TEXTURES (OFFICIAL ANIME ART + SWISS FALLBACK)
   ============================================================================ */
const spineTexCache = new Map();
const frontTexCache = new Map();
const backTexCache = new Map();
const discTexCache = new Map();
const loadedPosterImages = {};

function drawCoverImage(ctx, img, dx, dy, dw, dh, focusY = 0.25) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;
  const scale = Math.max(dw / iw, dh / ih);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (iw - sw) / 2;
  const sy = Math.max(0, Math.min(ih - sh, (ih - sh) * focusY));
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function drawPaperGrain(ctx, w, h, alpha = 0.03) {
  ctx.save();
  ctx.fillStyle = `rgba(24, 24, 24, ${alpha})`;
  for (let i = 0; i < 800; i++) {
    ctx.fillRect((i * 7919) % w, (i * 104729) % h, 1.5, 1.5);
  }
  ctx.restore();
}

function drawProceduralIllustration(ctx, release, x, y, w, h) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  const ink = release.coverInkColor;
  const accent = release.accentColor;
  const bg = release.coverBgColor;
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);

  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.1;
  ctx.lineWidth = 1;
  for (let gx = x; gx <= x + w; gx += 46) {
    ctx.beginPath();
    ctx.moveTo(gx, y);
    ctx.lineTo(gx, y + h);
    ctx.stroke();
  }
  for (let gy = y; gy <= y + h; gy += 46) {
    ctx.beginPath();
    ctx.moveTo(x, gy);
    ctx.lineTo(x + w, gy);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const cx = x + w / 2;
  const cy = y + h / 2;
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.2;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

function getSpineTexture(release, externalImg = null) {
  const key = `${release.id}_${externalImg ? "sp_img_v3" : "sp_proc_v3"}`;
  if (spineTexCache.has(key)) return spineTexCache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 256, 1024);
  drawPaperGrain(ctx, 256, 1024, 0.045);

  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.30)");
  grad.addColorStop(0.09, "rgba(255,255,255,0.16)");
  grad.addColorStop(0.92, "rgba(255,255,255,0.08)");
  grad.addColorStop(1, "rgba(0,0,0,0.34)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  ctx.fillStyle = release.rating >= 9.0 ? "#E05A3A" : release.spineTextColor;
  ctx.globalAlpha = release.rating >= 9.0 ? 0.95 : 0.28;
  ctx.fillRect(0, 0, 256, 14);
  ctx.fillRect(0, 1010, 256, 14);
  ctx.globalAlpha = 1;

  ctx.fillStyle = release.spineTextColor;
  ctx.strokeStyle = release.spineTextColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 38, 196, 52);
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(release.catalogCode, 128, 65);

  ctx.font = "700 19px 'IBM Plex Mono', monospace";
  ctx.globalAlpha = 0.85;
  ctx.fillText(String(release.releaseYear), 128, 118);
  ctx.globalAlpha = 1;

  if (externalImg) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(34, 146, 188, 134);
    ctx.clip();
    drawCoverImage(ctx, externalImg, 34, 146, 188, 134, 0.22);
    ctx.restore();
    ctx.strokeStyle = release.spineTextColor;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 146, 188, 134);
    ctx.globalAlpha = 1;
  }

  ctx.save();
  ctx.translate(128, 590);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = release.spineTextColor;
  ctx.font = "800 32px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(release.shortTitle.toUpperCase(), 0, -4);
  ctx.globalAlpha = 0.78;
  ctx.font = "500 18px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "top";
  ctx.fillText(`${release.songArtist.toUpperCase()}  •  ${release.studio.toUpperCase()}`, 0, 8);
  ctx.restore();

  ctx.fillStyle = release.spineTextColor;
  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.rating >= 10 ? "★ 10.0" : `★ ${release.rating.toFixed(1)}`, 128, 942);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  spineTexCache.set(key, tex);
  return tex;
}

function getFrontCoverTexture(release, externalImg = null) {
  const key = `${release.id}_${externalImg ? "art_v2" : "swiss_v2"}`;
  if (frontTexCache.has(key)) return frontTexCache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (externalImg) {
    ctx.fillStyle = "#161615";
    ctx.fillRect(0, 0, 1024, 1024);
    drawCoverImage(ctx, externalImg, 0, 0, 1024, 1024, 0.24);

    const topGrad = ctx.createLinearGradient(0, 0, 0, 200);
    topGrad.addColorStop(0, "rgba(18, 18, 17, 0.82)");
    topGrad.addColorStop(1, "rgba(18, 18, 17, 0)");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, 1024, 200);

    const botGrad = ctx.createLinearGradient(0, 620, 0, 1024);
    botGrad.addColorStop(0, "rgba(16, 16, 15, 0)");
    botGrad.addColorStop(0.45, "rgba(16, 16, 15, 0.78)");
    botGrad.addColorStop(1, "rgba(16, 16, 15, 0.96)");
    ctx.fillStyle = botGrad;
    ctx.fillRect(0, 620, 1024, 404);

    ctx.strokeStyle = "rgba(255,255,255,0.32)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(28, 28, 968, 968);

    ctx.fillStyle = "#FAF9F6";
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 56, 76);
    ctx.fillStyle = "rgba(250,249,246,0.78)";
    ctx.font = "500 18px 'IBM Plex Mono', monospace";
    ctx.fillText(`${release.releaseYear}  •  ${release.category.toUpperCase()}  •  ${release.studio.toUpperCase()}`, 56, 108);

    const scoreText = release.isOngoing
      ? `EP ${release.currentEpisode}/${release.totalEpisodes} • ★ ${release.rating.toFixed(1)}`
      : release.rating >= 10
      ? "👑 10.0 / 10"
      : `★ ${release.rating.toFixed(1)} / 10`;

    ctx.fillStyle = "#E05A3A";
    ctx.fillRect(712, 48, 256, 54);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "700 23px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText(scoreText, 840, 83);
    ctx.textAlign = "left";

    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(66, 804, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(250,249,246,0.9)";
    ctx.font = "600 19px 'IBM Plex Mono', monospace";
    ctx.fillText(`${release.genres.join(" / ").toUpperCase()}  •  ${release.bpm} BPM  •  ${release.ageRating}`, 88, 811);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "800 54px 'Inter', sans-serif";
    const disp = release.titleEnglish.length > 26 ? release.shortTitle : release.titleEnglish;
    ctx.fillText(disp, 56, 882);

    ctx.fillStyle = "rgba(234,234,232,0.82)";
    ctx.font = "500 22px 'Inter', sans-serif";
    ctx.fillText(release.titleRomaji, 56, 922);

    ctx.fillStyle = "#F5A894";
    ctx.font = "600 20px 'IBM Plex Mono', monospace";
    ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 56, 966);
  } else {
    const bg = release.coverBgColor;
    const ink = release.coverInkColor;
    const accent = release.accentColor;

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 1024);
    drawPaperGrain(ctx, 1024, 1024, 0.035);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 3;
    ctx.strokeRect(36, 36, 952, 952);

    ctx.fillStyle = ink;
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(`DISC ARCHIVE  —  ${release.catalogCode}`, 68, 86);

    drawProceduralIllustration(ctx, release, 68, 170, 888, 535);

    ctx.fillStyle = ink;
    ctx.font = "800 54px 'Inter', sans-serif";
    const disp = release.titleEnglish.length > 26 ? release.shortTitle : release.titleEnglish;
    ctx.fillText(disp, 68, 848);
    ctx.fillStyle = accent;
    ctx.font = "600 21px 'IBM Plex Mono', monospace";
    ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 68, 942);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  frontTexCache.set(key, tex);
  return tex;
}

function getBackCoverTexture(release, externalImg = null) {
  const key = `${release.id}_${externalImg ? "bk_art_v3" : "bk_dark_v3"}`;
  if (backTexCache.has(key)) return backTexCache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#181817";
  ctx.fillRect(0, 0, 1024, 1024);

  if (externalImg) {
    ctx.save();
    ctx.globalAlpha = 0.28;
    drawCoverImage(ctx, externalImg, 0, 0, 1024, 1024, 0.25);
    ctx.restore();
  }

  const vign = ctx.createLinearGradient(0, 0, 1024, 1024);
  vign.addColorStop(0, "rgba(20, 20, 19, 0.78)");
  vign.addColorStop(1, "rgba(14, 14, 13, 0.94)");
  ctx.fillStyle = vign;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 88, 1024);
  ctx.fillStyle = "#E05A3A";
  ctx.fillRect(88, 0, 6, 1024);

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 2;
  ctx.strokeRect(126, 48, 850, 928);

  ctx.fillStyle = "#FAF9F6";
  ctx.textAlign = "left";
  ctx.font = "800 42px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.toUpperCase(), 164, 128);

  ctx.fillStyle = "#E05A3A";
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.catalogCode}  //  ${release.studio.toUpperCase()}  •  ${release.releaseYear}  •  ★ ${release.rating.toFixed(1)}`, 164, 172);

  release.tracks.forEach((tr, i) => {
    const ty = 274 + i * 102;
    ctx.fillStyle = "#E05A3A";
    ctx.font = "700 22px 'IBM Plex Mono', monospace";
    ctx.fillText(tr.number, 164, ty);
    ctx.fillStyle = "#FAF9F6";
    ctx.font = "600 24px 'Inter', sans-serif";
    ctx.fillText(tr.title.slice(0, 38), 216, ty);
    ctx.fillStyle = "rgba(234,234,232,0.62)";
    ctx.font = "500 18px 'IBM Plex Mono', monospace";
    ctx.fillText(`${tr.role.slice(0, 42)}  •  ${tr.bpm} BPM  •  ${tr.duration}`, 216, ty + 32);
  });

  ctx.fillStyle = "#FAF9F6";
  ctx.fillRect(736, 822, 198, 106);
  ctx.fillStyle = "#141413";
  let bx = 750;
  for (let b = 0; b < 34; b++) {
    const bw = ((b * 7 + release.releaseYear) % 3) + 1.5;
    if (b % 2 === 0) ctx.fillRect(bx, 834, bw, 68);
    bx += bw + 2.2;
    if (bx > 920) break;
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  backTexCache.set(key, tex);
  return tex;
}

function getVinylDiscTexture(release, externalImg = null) {
  const key = `${release.id}_${externalImg ? "img" : "proc"}`;
  if (discTexCache.has(key)) return discTexCache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  const cx = 512;
  const cy = 512;

  ctx.fillStyle = "#131312";
  ctx.beginPath();
  ctx.arc(cx, cy, 508, 0, Math.PI * 2);
  ctx.fill();

  for (let r = 212; r < 494; r += 3.8) {
    ctx.strokeStyle = r % 36 < 4 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 198, 0, Math.PI * 2);
  ctx.clip();
  if (externalImg) {
    drawCoverImage(ctx, externalImg, cx - 198, cy - 198, 396, 396, 0.25);
    ctx.fillStyle = "rgba(18,18,17,0.42)";
    ctx.fillRect(cx - 198, cy - 198, 396, 396);
  } else {
    ctx.fillStyle = release.coverBgColor;
    ctx.fillRect(cx - 198, cy - 198, 396, 396);
    ctx.fillStyle = release.accentColor;
    ctx.fillRect(cx - 198, cy - 198, 396, 198);
  }
  ctx.restore();

  ctx.strokeStyle = "#E05A3A";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 194, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 24px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.catalogCode, cx, cy - 114);
  ctx.font = "700 19px 'IBM Plex Mono', monospace";
  ctx.fillText(`★ ${release.rating.toFixed(1)} / 10`, cx, cy - 84);
  ctx.font = "800 22px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.slice(0, 15), cx, cy + 108);
  ctx.font = "600 16px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.releaseYear} • ${release.bpm} BPM`, cx, cy + 138);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  discTexCache.set(key, tex);
  return tex;
}

/* ============================================================================
   🔊 WEB AUDIO API POLYPHONIC SYNTH + OFFICIAL VOCAL OST AUDIO PLAYER
   ============================================================================ */
let audioCtx = null;
let synthTimer = null;
let progressTimer = null;
let ostAudio = null;

function ensureAudioCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playStepClick(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(195, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.028);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.032);
  } catch {}
}

function playDiveWhoosh(divingIn = true, enabled = true) {
  if (!enabled) return;
  try {
    const ctx = ensureAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(divingIn ? 220 : 1400, now);
    filter.frequency.exponentialRampToValueAtTime(divingIn ? 1850 : 180, now + 0.65);
    osc.frequency.setValueAtTime(divingIn ? 88 : 280, now);
    osc.frequency.exponentialRampToValueAtTime(divingIn ? 280 : 82, now + 0.65);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.72);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.74);
  } catch {}
}

function stopTrackSynth() {
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
  if (ostAudio) {
    ostAudio.pause();
    ostAudio.currentTime = 0;
  }
}

function startTrackSynth(track, realOstUrl, onTick, onDone) {
  stopTrackSynth();
  const ctx = ensureAudioCtx();
  const start = performance.now();
  let playingReal = false;

  const runLoop = () => {
    if (!ctx) return;
    const stepMs = Math.max(180, Math.round((60 / track.bpm) * 500));
    let step = 0;
    const fire = () => {
      try {
        const now = ctx.currentTime;
        const freq = track.notes[step % track.notes.length];
        const osc = ctx.createOscillator();
        const sub = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = step % 4 === 0 ? "triangle" : "sine";
        sub.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        sub.frequency.setValueAtTime(freq * 0.5, now);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, now);
        gain.gain.setValueAtTime(0.0008, now);
        gain.gain.linearRampToValueAtTime(0.032, now + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.0006, now + stepMs * 0.0014);
        osc.connect(filter);
        sub.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        sub.start(now);
        osc.stop(now + stepMs * 0.0015);
        sub.stop(now + stepMs * 0.0015);
        step++;
      } catch {}
    };
    fire();
    synthTimer = setInterval(fire, stepMs);
  };

  if (realOstUrl) {
    try {
      if (!ostAudio) {
        ostAudio = new Audio();
        ostAudio.crossOrigin = "anonymous";
      }
      ostAudio.src = realOstUrl;
      ostAudio.volume = 0.78;
      playingReal = true;
      ostAudio.onended = () => {
        stopTrackSynth();
        onDone && onDone();
      };
      ostAudio.play().catch(() => {
        playingReal = false;
        runLoop();
      });
    } catch {
      playingReal = false;
      runLoop();
    }
  } else {
    runLoop();
  }

  progressTimer = setInterval(() => {
    let prog = Math.min(1, (performance.now() - start) / 24000);
    if (playingReal && ostAudio && ostAudio.duration > 0) {
      prog = Math.min(1, ostAudio.currentTime / ostAudio.duration);
    }
    onTick && onTick(prog);
    if (!playingReal && prog >= 1) {
      stopTrackSynth();
      onDone && onDone();
    }
  }, 80);
}

/* ============================================================================
   🎛️ APPLICATION STATE & ZERO-CLIPPING 3D THREE.JS TURNTABLE SCENE
   ============================================================================ */
const appState = {
  category: "all",
  releases: [...WATCHED_RELEASES],
  activeIndex: 6,
  scrollCurrent: 6,
  scrollVelocity: 0,
  diveState: "shelf",
  hoveredIndex: null,
  isHoveredDisc: false,
  radioActive: true, // Radio ON by default with YouTube Top-Viewed Mega-Hits!
  radioHitIndex: 0,
  soundEnabled: true,
  playingTrackNum: null,
  trackProgress: 0,
  spinBoost: 0,
  waveProgress: 1,
  isDetailSwitching: false,
  pointerX: 0,
  pointerY: 0
};

let scene, camera, renderer, platterGroup, sleevesGroup, discGroup, discSpinGroup, discSpinMesh, opOverlayMesh;
let opReelCanvas, opReelCtx, opReelTex;
let sleeveEntries = [];
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();
const loadedBannerImages = {};

function formatMMSS(sec) {
  const s = Math.max(0, Math.floor(Number.isFinite(sec) ? sec : 0));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function playFadeVolume(audio, from, to, ms, onDone) {
  const start = performance.now();
  audio.volume = Math.max(0, Math.min(1, from));
  const step = (now) => {
    const t = Math.min(1, (now - start) / Math.max(1, ms));
    const ease = t * t * (3 - 2 * t);
    audio.volume = Math.max(0, Math.min(1, from + (to - from) * ease));
    if (t < 1) requestAnimationFrame(step);
    else if (onDone) onDone();
  };
  requestAnimationFrame(step);
}

function playPopularRadio(hitIdx) {
  if (!appState.radioActive || !appState.soundEnabled || appState.diveState !== "shelf") return;
  const hit = POPULAR_RADIO_HITS[hitIdx % POPULAR_RADIO_HITS.length];
  if (!hit) return;
  const txt = document.getElementById("radio-banner-text");
  const sub = document.getElementById("radio-banner-sub");
  if (txt) txt.textContent = `RADIO FM: ♪ ${hit.title}`;
  if (sub) sub.textContent = `${hit.artist} • ${hit.views}`;

  const launch = () => {
    if (!ostAudio) {
      ostAudio = new Audio();
      ostAudio.crossOrigin = "anonymous";
    }
    ostAudio.src = hit.previewUrl;
    ostAudio.volume = 0;
    ostAudio.onended = () => {
      appState.radioHitIndex = (appState.radioHitIndex + 1) % POPULAR_RADIO_HITS.length;
      playPopularRadio(appState.radioHitIndex);
    };
    ostAudio.play().then(() => {
      playFadeVolume(ostAudio, 0, 0.72, 600);
    }).catch(() => {
      if (sub) sub.textContent = `${hit.artist} • CLICK ANYWHERE TO UNMUTE`;
      const unlock = () => {
        playPopularRadio(appState.radioHitIndex);
      };
      window.addEventListener("pointerdown", unlock, { once: true });
      window.addEventListener("keydown", unlock, { once: true });
    });
  };

  if (ostAudio && !ostAudio.paused && ostAudio.volume > 0.02) {
    playFadeVolume(ostAudio, ostAudio.volume, 0, 240, () => {
      ostAudio.pause();
      launch();
    });
  } else {
    launch();
  }
}

function computeAccordionTransform(d) {
  const absD = Math.abs(d);
  const centerWeight = Math.exp(-(d * d) / 0.14);

  const spinePitch = 0.255;
  const leftAnchor = -1.72;
  const rightAnchor = 2.14;
  const centerAnchor = -0.34;

  let x = 0;
  if (d <= -1) {
    x = leftAnchor + (d + 1) * spinePitch;
  } else if (d >= 1) {
    x = rightAnchor + (d - 1) * spinePitch;
  } else if (d < 0) {
    const t = d + 1;
    const s = t * t * (3 - 2 * t);
    x = leftAnchor + (centerAnchor - leftAnchor) * s;
  } else {
    const t = d;
    const s = t * t * (3 - 2 * t);
    x = centerAnchor + (rightAnchor - centerAnchor) * s;
  }

  const rotY = (1 - centerWeight) * (Math.PI / 2 - d * 0.022);
  const z = -0.042 * (x * x) + 0.5 * centerWeight - 0.14 * (1 - centerWeight);
  const y = 0.85 + 0.05 * centerWeight;
  const scale = absD > 8.5 ? Math.max(0.001, 1 - (absD - 8.5) * 1.4) : 1;

  return { x, y, z, rotY, centerWeight, scale, isVisible: absD < 9.2 };
}

function createHollowDiscGeometry(innerR, outerR, segs = 96) {
  const geom = new THREE.RingGeometry(innerR, outerR, segs, 2);
  const pos = geom.attributes.position;
  const uvs = geom.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    uvs.setXY(i, vx / (outerR * 2) + 0.5, vy / (outerR * 2) + 0.5);
  }
  uvs.needsUpdate = true;
  return geom;
}

function getBaseCameraZ() {
  const w = window.innerWidth;
  if (w < 640) return 9.1;
  if (w < 1024) return 7.75;
  return 6.85;
}

function preloadOfficialAnimeArtwork() {
  ALL_RELEASES.forEach((rel) => {
    if (rel.coverUrl && !loadedPosterImages[rel.id]) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        loadedPosterImages[rel.id] = img;
        rebuildSleeveMaterials();
        updateActiveDiscTexture();
      };
      img.src = `https://wsrv.nl/?url=${encodeURIComponent(rel.coverUrl)}&w=900&output=webp`;
    }
    if (rel.bannerUrl && !loadedBannerImages[rel.id]) {
      const bImg = new Image();
      bImg.crossOrigin = "anonymous";
      bImg.onload = () => {
        loadedBannerImages[rel.id] = bImg;
      };
      bImg.src = `https://wsrv.nl/?url=${encodeURIComponent(rel.bannerUrl)}&w=900&output=webp`;
    }
  });
}

function initThreeScene() {
  const container = document.getElementById("three-canvas-container");
  if (!container) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 0.04, 48);
  camera.position.set(0, 0.88, getBaseCameraZ());
  camera.lookAt(0, 0.42, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight("#FAF9F5", 1.42));

  const dirLight = new THREE.DirectionalLight("#FFFDF9", 1.36);
  dirLight.position.set(4.5, 9.5, 7.5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight("#EAEAE6", 0.58);
  fillLight.position.set(-6, 4.5, 4);
  scene.add(fillLight);

  // 1. Clean Minimalist Brushed-Silver Studio Pedestal (NO chunky dark blocks behind title!)
  const platterRoot = new THREE.Group();
  platterRoot.position.set(0, -0.22, -9.95);
  scene.add(platterRoot);

  platterGroup = new THREE.Group();
  platterRoot.add(platterGroup);

  const rimMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(11.15, 11.28, 0.12, 128),
    new THREE.MeshStandardMaterial({ color: "#C2C3BE", metalness: 0.55, roughness: 0.34 })
  );
  rimMesh.position.y = 0.02;
  rimMesh.receiveShadow = true;
  platterGroup.add(rimMesh);

  const lowerLip = new THREE.Mesh(
    new THREE.CylinderGeometry(11.24, 11.12, 0.035, 128),
    new THREE.MeshStandardMaterial({ color: "#9FA09B", metalness: 0.62, roughness: 0.28 })
  );
  lowerLip.position.y = -0.055;
  platterGroup.add(lowerLip);

  const matMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(11.06, 11.12, 0.03, 128),
    new THREE.MeshStandardMaterial({ color: "#D6D7D2", metalness: 0.18, roughness: 0.78 })
  );
  matMesh.position.y = 0.09;
  matMesh.receiveShadow = true;
  platterGroup.add(matMesh);

  // 2. Accordion Spine-to-Cover 3D Shelf
  sleevesGroup = new THREE.Group();
  scene.add(sleevesGroup);

  // 3. Floating Black Vinyl Disc + 20% Layered Spinning OP/Wallpaper Motion Projection
  discGroup = new THREE.Group();
  discGroup.position.set(0.88, 0.88, 0.76);
  scene.add(discGroup);

  discSpinGroup = new THREE.Group();
  discGroup.add(discSpinGroup);

  const discGeom = createHollowDiscGeometry(0.095, 0.72, 96);
  const discMat = new THREE.MeshStandardMaterial({
    roughness: 0.22,
    metalness: 0.38,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide
  });
  discSpinMesh = new THREE.Mesh(discGeom, discMat);
  discSpinMesh.userData = { isFloatingDisc: true };
  discSpinGroup.add(discSpinMesh);

  // Live 20%-opacity spinning motion reel layered IN FRONT OF the black vinyl grooves
  opReelCanvas = document.createElement("canvas");
  opReelCanvas.width = 512;
  opReelCanvas.height = 512;
  opReelCtx = opReelCanvas.getContext("2d");
  opReelTex = new THREE.CanvasTexture(opReelCanvas);

  const opOverlayGeom = createHollowDiscGeometry(0.196, 0.714, 96);
  const opOverlayMat = new THREE.MeshBasicMaterial({
    map: opReelTex,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    side: THREE.FrontSide
  });
  opOverlayMesh = new THREE.Mesh(opOverlayGeom, opOverlayMat);
  opOverlayMesh.position.z = 0.005;
  discSpinGroup.add(opOverlayMesh);

  const outerRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.72, 0.026, 96, 1, true),
    new THREE.MeshStandardMaterial({ color: "#1D1D1C", metalness: 0.62, roughness: 0.28, side: THREE.DoubleSide })
  );
  outerRim.rotation.x = Math.PI / 2;
  discGroup.add(outerRim);

  const spindleCollar = new THREE.Mesh(
    new THREE.RingGeometry(0.093, 0.117, 64),
    new THREE.MeshStandardMaterial({ color: "#D8D8D4", metalness: 0.88, roughness: 0.18, side: THREE.DoubleSide })
  );
  spindleCollar.position.z = 0.006;
  discGroup.add(spindleCollar);

  buildShelfMeshes();
  startRenderLoop();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    if (appState.diveState === "shelf") {
      camera.position.z = getBaseCameraZ();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function buildSleeveMaterialsForRelease(release) {
  const extImg = loadedPosterImages[release.id] || null;
  const spineTex = getSpineTexture(release, extImg);
  const frontTex = getFrontCoverTexture(release, extImg);
  const backTex = getBackCoverTexture(release, extImg);

  const spineMat = new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.38, metalness: 0.08 });
  const frontMat = new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.32, metalness: 0.06 });
  const backMat = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.4, metalness: 0.08 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: release.spineColor, roughness: 0.48, metalness: 0.08 });

  return [spineMat, spineMat, edgeMat, edgeMat, frontMat, backMat];
}

function buildShelfMeshes() {
  if (!sleevesGroup) return;
  while (sleevesGroup.children.length > 0) {
    sleevesGroup.remove(sleevesGroup.children[0]);
  }
  sleeveEntries = [];

  const boxGeom = new THREE.BoxGeometry(1.9, 1.9, 0.2);

  appState.releases.forEach((rel, idx) => {
    const group = new THREE.Group();
    const mesh = new THREE.Mesh(boxGeom, buildSleeveMaterialsForRelease(rel));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData = { sleeveIndex: idx };

    const initT = computeAccordionTransform(idx - appState.scrollCurrent);
    group.position.set(initT.x, initT.y, initT.z);
    group.rotation.y = initT.rotY;

    group.add(mesh);
    sleevesGroup.add(group);
    sleeveEntries.push({ group, mesh, release: rel, index: idx });
  });

  updateActiveDiscTexture();
}

function rebuildSleeveMaterials() {
  sleeveEntries.forEach((entry) => {
    entry.mesh.material = buildSleeveMaterialsForRelease(entry.release);
  });
}

function updateActiveDiscTexture() {
  const activeRel = appState.releases[appState.activeIndex];
  if (!activeRel || !discSpinMesh) return;
  const extImg = loadedPosterImages[activeRel.id] || null;
  discSpinMesh.material.map = getVinylDiscTexture(activeRel, extImg);
  discSpinMesh.material.needsUpdate = true;
}

function startRenderLoop() {
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);
    const delta = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    const stiffness = 120;
    const damping = 18.5;
    const disp = appState.activeIndex - appState.scrollCurrent;
    const force = disp * stiffness - appState.scrollVelocity * damping;
    appState.scrollVelocity += force * delta;
    appState.scrollCurrent += appState.scrollVelocity * delta;

    if (platterGroup) {
      platterGroup.rotation.y = -appState.scrollCurrent * 0.036 + now * 0.000025;
    }

    const damp = Math.min(1, delta * 13);
    const isCenterHover = appState.hoveredIndex === appState.activeIndex || appState.isHoveredDisc;

    sleeveEntries.forEach((entry) => {
      const d = entry.index - appState.scrollCurrent;
      const t = computeAccordionTransform(d);
      entry.group.visible = t.isVisible;
      if (!t.isVisible) return;

      const isCenter = entry.index === appState.activeIndex;
      const isThisHovered = appState.hoveredIndex === entry.index;

      // Kinetic Category Switch Wave Offset
      const staggerDelay = Math.min(0.45, Math.abs(d) * 0.055);
      const localWave = Math.max(0, Math.min(1, (appState.waveProgress - staggerDelay) / (1 - staggerDelay)));
      const inv = 1 - localWave;
      const waveEase = 1 - inv * inv * inv;
      const waveYOffset = (1 - waveEase) * -0.82;
      const waveScaleMult = 0.72 + 0.28 * waveEase;
      const waveRotExtra = (1 - waveEase) * (d >= 0 ? 0.35 : -0.35);

      let hoverLiftY = 0;
      let hoverPullZ = 0;
      let hoverRotY = 0;
      let hoverRotX = 0;

      if (isThisHovered) {
        if (isCenter) {
          hoverLiftY = 0.055;
          hoverPullZ = 0.04;
          hoverRotY = appState.pointerX * 0.14;
          hoverRotX = -appState.pointerY * 0.09;
        } else {
          // Hovering inactive side cover lifts it up & peeks gently toward the cursor!
          hoverLiftY = 0.26;
          hoverPullZ = 0.36;
          hoverRotY = d > 0 ? -0.34 : 0.34;
          hoverRotX = -0.05 - appState.pointerY * 0.05;
        }
      }

      entry.group.position.x = THREE.MathUtils.lerp(entry.group.position.x, t.x, damp);
      entry.group.position.y = THREE.MathUtils.lerp(entry.group.position.y, t.y + hoverLiftY + waveYOffset, damp);
      entry.group.position.z = THREE.MathUtils.lerp(entry.group.position.z, t.z + hoverPullZ, damp);
      entry.group.rotation.x = THREE.MathUtils.lerp(entry.group.rotation.x, hoverRotX, damp);
      entry.group.rotation.y = THREE.MathUtils.lerp(entry.group.rotation.y, t.rotY + hoverRotY + waveRotExtra, damp);
      entry.group.scale.setScalar(
        THREE.MathUtils.lerp(entry.group.scale.x, t.scale * (1 + t.centerWeight * 0.02) * waveScaleMult, damp)
      );
    });

    // Spin both the black vinyl AND the layered 20%-opacity OP motion projection together!
    if (discSpinGroup) {
      const speed = (isCenterHover ? 3.1 : 1.15) + appState.spinBoost;
      discSpinGroup.rotation.z -= delta * speed;
    }

    // Animate 20%-opacity live Ken Burns motion reel on the vinyl groove layer
    const activeRel = appState.releases[appState.activeIndex];
    const motionImg = activeRel ? (loadedBannerImages[activeRel.id] || loadedPosterImages[activeRel.id]) : null;
    if (motionImg && opReelCtx && opReelTex) {
      const iw = motionImg.naturalWidth || motionImg.width;
      const ih = motionImg.naturalHeight || motionImg.height;
      if (iw && ih) {
        const sec = now * 0.001;
        opReelCtx.clearRect(0, 0, 512, 512);
        const zoom = 1.12 + Math.sin(sec * 0.45) * 0.08;
        const sc = Math.max(512 / iw, 512 / ih) * zoom;
        const dw = iw * sc;
        const dh = ih * sc;
        const panX = Math.sin(sec * 0.35) * ((dw - 512) * 0.42);
        const panY = Math.cos(sec * 0.28) * ((dh - 512) * 0.25);
        opReelCtx.drawImage(motionImg, (512 - dw) / 2 + panX, (512 - dh) / 2 + panY, dw, dh);
        opReelTex.needsUpdate = true;
      }
    }

    if (discGroup && appState.diveState === "shelf") {
      const settleDiff = Math.abs(appState.activeIndex - appState.scrollCurrent);
      const visFactor = Math.max(0, 1 - settleDiff * 2.2);
      const targetX = isCenterHover ? 1.04 : 0.88;
      const targetY = 0.88 + Math.sin(now * 0.0024) * 0.022;
      const targetZ = isCenterHover ? 0.82 : 0.76;
      const targetRotY = isCenterHover ? -0.14 : -0.05;

      discGroup.position.x = THREE.MathUtils.lerp(discGroup.position.x, targetX, damp);
      discGroup.position.y = THREE.MathUtils.lerp(discGroup.position.y, targetY, damp);
      discGroup.position.z = THREE.MathUtils.lerp(discGroup.position.z, targetZ, damp);
      discGroup.rotation.y = THREE.MathUtils.lerp(discGroup.rotation.y, targetRotY, damp);
      discGroup.scale.setScalar(
        THREE.MathUtils.lerp(discGroup.scale.x, 0.94 * (0.25 + 0.75 * visFactor), damp)
      );
      discSpinMesh.material.opacity = THREE.MathUtils.lerp(discSpinMesh.material.opacity, visFactor, damp);
      if (opOverlayMesh) {
        opOverlayMesh.material.opacity = THREE.MathUtils.lerp(opOverlayMesh.material.opacity, 0.2 * visFactor, damp);
      }
      discGroup.visible = visFactor > 0.02;
    } else if (discGroup) {
      discGroup.visible = true;
      discSpinMesh.material.opacity = 1;
      if (opOverlayMesh) {
        opOverlayMesh.material.opacity = THREE.MathUtils.lerp(opOverlayMesh.material.opacity, 0, Math.min(1, delta * 10));
      }
    }

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}

/* ============================================================================
   🚀 CINEMA-GRADE MULTI-STAGE GSAP SPINDLE-HOLE CAMERA DIVE TRANSITION
   ============================================================================ */
function triggerSignatureDiveIn() {
  if (appState.diveState !== "shelf" || !discGroup || !sleevesGroup) return;
  appState.diveState = "diving-in";
  playDiveWhoosh(true, appState.soundEnabled);

  const veilEl = document.getElementById("dive-aperture-veil");
  const animState = { fov: camera.fov, lookY: 0.42, veil: 0 };
  const baseZ = getBaseCameraZ();

  const tl = gsap.timeline({
    onUpdate: () => {
      camera.fov = animState.fov;
      camera.updateProjectionMatrix();
      camera.lookAt(0, animState.lookY, 0);
      if (veilEl) veilEl.style.opacity = String(animState.veil);
    },
    onComplete: () => {
      if (veilEl) veilEl.style.opacity = "0";
      appState.diveState = "detail";
      openDetailViewDOM();
    }
  });

  tl.to(sleevesGroup.position, { z: -1.5, y: -0.24, duration: 0.48, ease: "power3.inOut" }, 0);
  tl.to(discGroup.position, { x: 0, y: 0.88, z: 2.28, duration: 0.46, ease: "expo.out" }, 0);
  tl.to(discGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.44, ease: "power3.out" }, 0);
  tl.to(discGroup.scale, { x: 2.15, y: 2.15, z: 2.15, duration: 0.48, ease: "expo.out" }, 0);
  tl.to(appState, { spinBoost: 6.4, duration: 0.55, ease: "power2.in" }, 0);

  tl.to(animState, { lookY: 0.88, duration: 0.36, ease: "power2.out" }, 0);
  tl.to(camera.position, { x: 0, y: 0.88, z: baseZ + 0.32, duration: 0.3, ease: "power2.out" }, 0);

  tl.to(camera.position, { x: 0, y: 0.88, z: 2.04, duration: 0.62, ease: "power4.in" }, 0.34);
  tl.to(animState, { fov: 54, duration: 0.34, ease: "power2.in" }, 0.34);
  tl.to(animState, { fov: 26, duration: 0.28, ease: "power3.out" }, 0.68);
  tl.to(animState, { veil: 1, duration: 0.24, ease: "power2.in" }, 0.74);
}

function triggerReverseDiveOut() {
  if (appState.diveState !== "detail" || !discGroup || !sleevesGroup || appState.isDetailSwitching) return;
  stopTrackSynth();
  appState.playingTrackNum = null;

  const ytEl = document.getElementById("detail-yt-iframe");
  if (ytEl) ytEl.src = "";

  const detailView = document.getElementById("release-detail-view");
  const veilEl = document.getElementById("dive-aperture-veil");
  playDiveWhoosh(false, appState.soundEnabled);

  gsap.to(detailView, {
    opacity: 0,
    duration: 0.2,
    ease: "power2.in",
    onComplete: () => {
      detailView.classList.add("hidden");
      detailView.style.opacity = "1";
      document.getElementById("shelf-stage-wrap").classList.remove("opacity-0", "pointer-events-none");

      appState.diveState = "diving-out";
      const baseZ = getBaseCameraZ();
      const animState = { fov: 26, lookY: 0.88, veil: 1 };

      const tl = gsap.timeline({
        onUpdate: () => {
          camera.fov = animState.fov;
          camera.updateProjectionMatrix();
          camera.lookAt(0, animState.lookY, 0);
          if (veilEl) veilEl.style.opacity = String(animState.veil);
        },
        onComplete: () => {
          if (veilEl) veilEl.style.opacity = "0";
          appState.spinBoost = 0;
          appState.diveState = "shelf";
          if (appState.radioActive && appState.soundEnabled) {
            playPopularRadio(appState.radioHitIndex);
          }
        }
      });

      tl.to(animState, { veil: 0, duration: 0.24, ease: "power2.out" }, 0);
      tl.to(camera.position, { x: 0, y: 0.88, z: baseZ, duration: 0.72, ease: "expo.out" }, 0.04);
      tl.to(animState, { fov: 46, duration: 0.24, ease: "power2.out" }, 0.04);
      tl.to(animState, { fov: 33, duration: 0.48, ease: "power3.out" }, 0.28);
      tl.to(animState, { lookY: 0.42, duration: 0.65, ease: "power3.out" }, 0.14);
      tl.to(appState, { spinBoost: 0, duration: 0.68, ease: "power3.out" }, 0.08);
      tl.to(discGroup.position, { x: 0.88, y: 0.88, z: 0.76, duration: 0.62, ease: "expo.inOut" }, 0.16);
      tl.to(discGroup.scale, { x: 0.94, y: 0.94, z: 0.94, duration: 0.62, ease: "expo.inOut" }, 0.16);
      tl.to(sleevesGroup.position, { z: 0, y: 0, duration: 0.65, ease: "expo.out" }, 0.14);
    }
  });
}

function transitionDetailWithVinylBounce(nextIdx, direction) {
  if (appState.isDetailSwitching || appState.releases.length === 0) return;
  const clamped = Math.max(0, Math.min(appState.releases.length - 1, nextIdx));
  if (clamped === appState.activeIndex) return;

  const curRel = appState.releases[appState.activeIndex];
  const nextRel = appState.releases[clamped];
  appState.isDetailSwitching = true;
  stopTrackSynth();
  appState.playingTrackNum = null;

  const layer = document.getElementById("detail-vinyl-bounce-layer");
  const discEl = document.getElementById("detail-vinyl-bounce-disc");
  const spinEl = document.getElementById("detail-vinyl-bounce-spin");
  const innerEl = document.getElementById("detail-inner-content");
  const imgEl = document.getElementById("detail-bounce-img");
  const codeEl = document.getElementById("detail-bounce-code");
  const titleEl = document.getElementById("detail-bounce-title");

  if (imgEl) imgEl.src = curRel.coverUrl;
  if (codeEl) codeEl.textContent = curRel.catalogCode;
  if (titleEl) titleEl.textContent = curRel.shortTitle;

  layer.classList.remove("hidden");
  layer.classList.add("flex");

  const tl = gsap.timeline({
    onComplete: () => {
      layer.classList.add("hidden");
      layer.classList.remove("flex");
      appState.isDetailSwitching = false;
      if (appState.soundEnabled) {
        appState.playingTrackNum = "01";
        startTrackSynth(nextRel.tracks[0], nextRel.songPreviewUrl, (p) => {
          appState.trackProgress = p;
          renderDetailTracklist(nextRel);
        }, () => {
          appState.playingTrackNum = null;
          renderDetailTracklist(nextRel);
        });
      }
    }
  });

  if (innerEl) {
    tl.to(innerEl, { opacity: 0.18, scale: 0.95, x: direction === "next" ? -28 : 28, duration: 0.28, ease: "power2.in" }, 0);
  }
  tl.fromTo(discEl, { scale: 0.12, opacity: 0, y: 40 }, { scale: 1.05, opacity: 1, y: 0, duration: 0.34, ease: "back.out(1.45)" }, 0);
  tl.fromTo(spinEl, { rotation: 0 }, { rotation: direction === "next" ? 420 : -420, duration: 0.92, ease: "power2.inOut" }, 0);

  tl.to(discEl, {
    scale: 1.24,
    duration: 0.13,
    ease: "power2.out",
    onComplete: () => {
      appState.activeIndex = clamped;
      updateActiveDiscTexture();
      syncStageHUD();
      populateDetailViewDOM();
      if (imgEl) imgEl.src = nextRel.coverUrl;
      if (codeEl) codeEl.textContent = nextRel.catalogCode;
      if (titleEl) titleEl.textContent = nextRel.shortTitle;
    }
  }, 0.34);
  tl.to(discEl, { scale: 0.92, duration: 0.12, ease: "power2.inOut" }, 0.47);
  tl.to(discEl, { scale: 1.04, duration: 0.1, ease: "power2.out" }, 0.59);
  tl.to(discEl, { scale: 0.08, opacity: 0, duration: 0.28, ease: "power3.in" }, 0.69);

  if (innerEl) {
    tl.fromTo(innerEl, { opacity: 0.18, scale: 0.96, x: direction === "next" ? 36 : -36 }, { opacity: 1, scale: 1, x: 0, duration: 0.42, ease: "expo.out", clearProps: "transform" }, 0.58);
  }
}

/* ============================================================================
   🖥️ CHRONOLOGICAL TIMELINE, HUD & RELEASE DETAIL DOM SYNC
   ============================================================================ */
function computeTimelinePositions() {
  const minY = RULER_YEARS[0];
  const maxY = RULER_YEARS[RULER_YEARS.length - 1];
  const span = maxY - minY;
  const counts = {};
  appState.releases.forEach((r) => {
    counts[r.releaseYear] = (counts[r.releaseYear] || 0) + 1;
  });
  const seen = {};
  return appState.releases.map((r) => {
    const tot = counts[r.releaseYear] || 1;
    const pos = seen[r.releaseYear] || 0;
    seen[r.releaseYear] = pos + 1;
    const sub = tot > 1 ? (pos / (tot - 1) - 0.5) * 0.65 : 0;
    const yr = Math.max(minY, Math.min(maxY, r.releaseYear + sub));
    return Math.max(1.5, Math.min(98.5, ((yr - minY) / span) * 100));
  });
}

function selectReleaseIndex(nextIndex) {
  if (appState.releases.length === 0) return;
  const clamped = Math.max(0, Math.min(appState.releases.length - 1, nextIndex));
  if (clamped !== appState.activeIndex) {
    appState.activeIndex = clamped;
    playStepClick(appState.soundEnabled);
    updateActiveDiscTexture();
    syncStageHUD();
    if (appState.diveState === "shelf" && appState.radioActive && appState.soundEnabled) {
      appState.radioHitIndex = clamped % POPULAR_RADIO_HITS.length;
      playPopularRadio(appState.radioHitIndex);
    }
  }
}

function syncStageHUD() {
  const rel = appState.releases[appState.activeIndex];
  if (!rel) return;

  const isTen = rel.rating >= 10;
  document.getElementById("hud-platter-title").textContent = `${rel.catalogCode} ${rel.shortTitle} (${rel.releaseYear})`;
  document.getElementById("hud-platter-score").textContent = isTen ? "👑 10.0" : `★ ${rel.rating.toFixed(1)}`;

  document.getElementById("hud-slot-index").textContent = String(appState.activeIndex + 1).padStart(2, "0");
  document.getElementById("hud-slot-total").textContent = String(appState.releases.length).padStart(2, "0");
  document.getElementById("hud-corner-score").textContent = isTen
    ? "👑 10.0 / 10 (MASTERPIECE)"
    : `★ ${rel.rating.toFixed(1)} / 10`;

  const ongoingEl = document.getElementById("hud-ongoing-badge");
  if (rel.isOngoing) {
    ongoingEl.textContent = `● WATCHING EPISODE ${rel.currentEpisode} OF ${rel.totalEpisodes}`;
    ongoingEl.classList.remove("hidden");
  } else {
    ongoingEl.classList.add("hidden");
  }

  document.getElementById("caption-catalog-genre").textContent = `${rel.catalogCode} — ${rel.genres
    .slice(0, 2)
    .join(" / ")
    .toUpperCase()}`;
  document.getElementById("caption-rating-tag").textContent = `★ ${rel.rating.toFixed(1)}`;
  document.getElementById("caption-main-title").textContent = rel.titleEnglish;
  document.getElementById("caption-subtitle").textContent = `${rel.titleRomaji} • ♪ ${rel.songArtist}, ${rel.releaseYear}`;

  document.getElementById("prev-sleeve-btn").disabled = appState.activeIndex <= 0;
  document.getElementById("next-sleeve-btn").disabled = appState.activeIndex >= appState.releases.length - 1;

  const positions = computeTimelinePositions();
  const pct = positions[appState.activeIndex] ?? 50;
  document.getElementById("timeline-coral-needle").style.left = `${pct}%`;
  document.getElementById("timeline-needle-label").textContent = String(rel.releaseYear);

  renderTimelineRuler();

  // Smooth GSAP Editorial Text Reveal Animation on Title Switch
  const lines = document.querySelectorAll("#center-caption-trigger .caption-anim-line");
  if (lines.length && appState.diveState === "shelf") {
    gsap.fromTo(
      lines,
      { y: 16, opacity: 0, filter: "blur(3px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.42, stagger: 0.05, ease: "expo.out", overwrite: true }
    );
  }
}

function renderTimelineRuler() {
  const ticksRow = document.getElementById("timeline-ticks-row");
  const yearsRow = document.getElementById("timeline-years-row");
  const activeRel = appState.releases[appState.activeIndex];
  if (!ticksRow || !yearsRow || !activeRel) return;

  const minY = RULER_YEARS[0];
  const maxY = RULER_YEARS[RULER_YEARS.length - 1];
  const yearSet = new Set(appState.releases.map((r) => r.releaseYear));

  ticksRow.innerHTML = Array.from({ length: 120 }, (_, i) => {
    const ratio = i / 119;
    const approxY = Math.round(minY + ratio * (maxY - minY));
    const hasRel = yearSet.has(approxY);
    const isMajor = i % 6 === 0;
    const wave = Math.abs(Math.sin(i * 0.55) * 0.52 + Math.cos(i * 0.23) * 0.38) * (hasRel ? 1 : 0.65);
    const h = isMajor ? 22 : Math.round(7 + wave * 15);
    const colorClass =
      approxY === activeRel.releaseYear
        ? "bg-[#E05A3A]"
        : hasRel
        ? "bg-[#181818]/70"
        : "bg-[#6E6E6A]/35";
    return `<div style="height:${h}px" class="w-[1.5px] transition-colors ${colorClass}"></div>`;
  }).join("");

  yearsRow.innerHTML = RULER_YEARS.map((yr) => {
    const isCur = activeRel.releaseYear === yr;
    const hasRel = yearSet.has(yr);
    const label =
      yr === 2006 || yr === 2011 || yr === 2016 || yr === 2020 || yr === 2026
        ? String(yr)
        : `'${String(yr).slice(2)}`;
    const cls = isCur
      ? "text-[#E05A3A] font-bold"
      : hasRel
      ? "text-[#181818] font-semibold hover:text-[#E05A3A]"
      : "text-[#6E6E6A]/55 hover:text-[#181818]";
    return `<button type="button" data-timeline-year="${yr}" class="px-0.5 transition-colors ${cls}">${label}</button>`;
  }).join("");

  yearsRow.querySelectorAll("[data-timeline-year]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const yr = Number(btn.getAttribute("data-timeline-year"));
      const idx = appState.releases.findIndex((r) => r.releaseYear === yr);
      if (idx >= 0) selectReleaseIndex(idx);
    });
  });
}

function setDetailMediaTab(tab) {
  const rel = appState.releases[appState.activeIndex];
  if (!rel) return;

  document.querySelectorAll("[data-detail-tab]").forEach((b) => {
    b.classList.toggle("active", b.getAttribute("data-detail-tab") === tab);
  });

  const mediaBox = document.getElementById("detail-media-box");
  const visualWrap = document.getElementById("detail-visual-wrap");
  const trailerWrap = document.getElementById("detail-trailer-wrap");
  const ytExternalBar = document.getElementById("detail-yt-external-bar");
  const ytExternalLink = document.getElementById("detail-yt-external-link");
  const ytEl = document.getElementById("detail-yt-iframe");

  visualWrap.classList.toggle("hidden", tab !== "visual");
  trailerWrap.classList.toggle("hidden", tab !== "trailer");

  if (tab === "trailer") {
    mediaBox.classList.remove("aspect-square");
    mediaBox.classList.add("aspect-video");
    stopTrackSynth();
    appState.playingTrackNum = null;
    renderDetailTracklist(rel);

    ytEl.src = `https://www.youtube-nocookie.com/embed/${rel.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    ytExternalBar.classList.remove("hidden");
    ytExternalBar.classList.add("flex");
    ytExternalLink.href = `https://www.youtube.com/watch?v=${rel.youtubeId}`;
  } else {
    mediaBox.classList.remove("aspect-video");
    mediaBox.classList.add("aspect-square");
    ytEl.src = "";
    ytExternalBar.classList.add("hidden");
    ytExternalBar.classList.remove("flex");
  }
}

function openDetailViewDOM() {
  document.getElementById("shelf-stage-wrap").classList.add("opacity-0", "pointer-events-none");
  const detailView = document.getElementById("release-detail-view");
  detailView.classList.remove("hidden");
  gsap.fromTo(detailView, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
  populateDetailViewDOM();

  // Auto-play Official Theme Song preview when diving in
  const rel = appState.releases[appState.activeIndex];
  if (rel && appState.soundEnabled) {
    appState.playingTrackNum = "01";
    startTrackSynth(
      rel.tracks[0],
      rel.songPreviewUrl,
      (prog) => {
        appState.trackProgress = prog;
        renderDetailTracklist(rel);
      },
      () => {
        appState.playingTrackNum = null;
        renderDetailTracklist(rel);
      }
    );
  }
}

function populateDetailViewDOM() {
  const rel = appState.releases[appState.activeIndex];
  if (!rel) return;

  const isTen = rel.rating >= 10;
  document.getElementById("detail-catalog-badge").textContent = `${rel.catalogCode} • ${rel.releaseYear}`;
  document.getElementById("detail-score-badge").textContent = isTen
    ? "👑 10.0 / 10 MASTERPIECE"
    : `PERSONAL RATING: ★ ${rel.rating.toFixed(1)} / 10`;

  const ongoingPill = document.getElementById("detail-ongoing-pill");
  if (rel.isOngoing) {
    ongoingPill.textContent = `EP ${rel.currentEpisode} / ${rel.totalEpisodes}`;
    ongoingPill.classList.remove("hidden");
  } else {
    ongoingPill.classList.add("hidden");
  }

  document.getElementById("detail-genres").textContent = rel.genres.join(" / ");
  document.getElementById("detail-year-bpm").textContent = `${rel.releaseYear} • ${rel.bpm} BPM • ${rel.keySignature}`;
  document.getElementById("detail-title-en").textContent = rel.titleEnglish;
  document.getElementById("detail-title-romaji").textContent = `${rel.titleRomaji} — ♪ ${rel.songTitle} (${rel.songArtist})`;
  document.getElementById("detail-synopsis").textContent = rel.synopsis;
  document.getElementById("detail-quote-1").textContent = `“${rel.quote1}”`;
  document.getElementById("detail-quote-2").textContent = `“${rel.quote2}”`;

  document.getElementById("credit-cat-format").textContent = `${rel.catalogCode} • ${rel.category}`;
  document.getElementById("credit-studio").textContent = rel.studio;
  document.getElementById("credit-year-age").textContent = `${rel.releaseYear} • ${rel.ageRating}`;
  document.getElementById("credit-score").textContent = `★ ${rel.rating.toFixed(1)} / 10`;
  document.getElementById("detail-audit-score").textContent = `★ ${rel.rating.toFixed(1)} / 10`;

  document.getElementById("detail-visual-img").src = rel.coverUrl;
  setDetailMediaTab("visual");

  const base = rel.rating;
  const clamp = (v) => Math.min(10, Math.max(6.5, Math.round(v * 10) / 10));
  const metrics = [
    { label: "NARRATIVE & PACING", score: isTen ? 10 : clamp(base + 0.1) },
    { label: "CHARACTER CHEMISTRY", score: isTen ? 10 : clamp(base + 0.2) },
    { label: "DIRECTION & VISUAL ART", score: isTen ? 10 : clamp(base) },
    { label: "OST & THEME DIRECTION", score: isTen ? 10 : clamp(base + 0.3) },
    { label: "PERSONAL VERDICT", score: base }
  ];
  document.getElementById("detail-rating-bars").innerHTML = metrics
    .map(
      (m) => `
      <div class="space-y-1">
        <div class="flex justify-between font-mono text-[11px]">
          <span class="text-[#575752]">${m.label}</span>
          <span class="font-semibold text-[#181818]">${m.score.toFixed(1)}</span>
        </div>
        <div class="w-full h-1.5 bg-[#181818]/10 overflow-hidden">
          <div class="h-full bg-[#E05A3A]" style="width:${(m.score / 10) * 100}%"></div>
        </div>
      </div>
    `
    )
    .join("");

  renderDetailTracklist(rel);
}

function renderDetailTracklist(rel) {
  const container = document.getElementById("detail-tracklist");
  if (!container) return;

  container.innerHTML = rel.tracks
    .map((tr) => {
      const isPlaying = appState.playingTrackNum === tr.number;
      const bars = Array.from({ length: 42 }, (_, i) => {
        const h = Math.max(0.18, Math.min(1, Math.abs(Math.sin(tr.waveformSeed + i * 0.42)) * 0.85 + 0.15));
        const active = isPlaying && i / 42 <= appState.trackProgress;
        return `<span style="height:${Math.round(h * 100)}%" class="flex-1 ${
          active ? "bg-[#E05A3A]" : "bg-[#6E6E6A]/45"
        }"></span>`;
      }).join("");

      return `
        <div data-track-num="${tr.number}" class="py-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#181818]/[0.03]">
          <div data-track-play="${tr.number}" class="flex items-center gap-3.5 min-w-0 cursor-pointer">
            <button type="button" class="w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs shrink-0 ${
              isPlaying ? "border-[#E05A3A] bg-[#E05A3A] text-white" : "border-[#181818]/40 text-[#181818]"
            }">${isPlaying ? "■" : "▶"}</button>
            <span class="font-mono text-xs text-[#6E6E6A] w-6 shrink-0">${tr.number}</span>
            <div class="min-w-0">
              <div class="font-semibold text-sm text-[#181818] truncate flex items-center gap-2">
                <span class="truncate">${tr.title}</span>
                ${tr.isOfficialOst ? `<span class="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-[#E05A3A] text-white shrink-0">OFFICIAL</span>` : ""}
              </div>
              <div class="font-mono text-[11px] text-[#575752] truncate">${tr.role} • ${tr.bpm} BPM</div>
            </div>
          </div>
          <div class="flex items-center gap-3 self-end sm:self-center shrink-0">
            <div data-track-seek="${tr.number}" title="Click anywhere to seek timestamp" class="relative flex items-end gap-[2px] h-8 w-44 sm:w-56 px-1.5 py-1 bg-[#181818]/[0.045] border border-[#181818]/15 hover:border-[#E05A3A] cursor-pointer">${bars}</div>
            <span class="font-mono text-[11px] text-[#575752] w-[76px] text-right">${
              isPlaying ? `${formatMMSS(appState.trackProgress * 30)} / 00:30` : tr.duration
            }</span>
          </div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll("[data-track-play]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const num = btn.getAttribute("data-track-play");
      const track = rel.tracks.find((t) => t.number === num);
      if (!track) return;

      if (appState.playingTrackNum === num) {
        stopTrackSynth();
        appState.playingTrackNum = null;
        renderDetailTracklist(rel);
      } else {
        appState.playingTrackNum = num;
        appState.trackProgress = 0;
        const extUrl = num === "01" ? rel.songPreviewUrl : null;
        startTrackSynth(
          track,
          extUrl,
          (prog) => {
            appState.trackProgress = prog;
            renderDetailTracklist(rel);
          },
          () => {
            appState.playingTrackNum = null;
            renderDetailTracklist(rel);
          }
        );
      }
    });
  });

  // Click anywhere on the track waveform timeline to seek directly to that exact second!
  container.querySelectorAll("[data-track-seek]").forEach((bar) => {
    bar.addEventListener("click", (e) => {
      e.stopPropagation();
      const num = bar.getAttribute("data-track-seek");
      const track = rel.tracks.find((t) => t.number === num);
      if (!track) return;
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(0.99, (e.clientX - rect.left) / rect.width));

      if (appState.playingTrackNum === num && ostAudio && ostAudio.duration > 0) {
        ostAudio.currentTime = ratio * ostAudio.duration;
        appState.trackProgress = ratio;
        renderDetailTracklist(rel);
      } else {
        appState.playingTrackNum = num;
        appState.trackProgress = ratio;
        const extUrl = num === "01" ? rel.songPreviewUrl : null;
        startTrackSynth(
          track,
          extUrl,
          (prog) => {
            appState.trackProgress = prog;
            renderDetailTracklist(rel);
          },
          () => {
            appState.playingTrackNum = null;
            renderDetailTracklist(rel);
          }
        );
        if (extUrl && ostAudio) {
          ostAudio.addEventListener(
            "loadedmetadata",
            () => {
              if (ostAudio.duration > 0) ostAudio.currentTime = ratio * ostAudio.duration;
            },
            { once: true }
          );
        }
      }
    });
  });
}

/* ============================================================================
   🗂️ RELEASES & ARTISTS DRAWERS
   ============================================================================ */
function renderReleasesModal() {
  const cwGrid = document.getElementById("modal-cw-grid");
  const tableEl = document.getElementById("modal-releases-table");
  const q = (document.getElementById("modal-search-input")?.value || "").toLowerCase().trim();
  const genre = document.getElementById("modal-genre-select")?.value || "All";
  const sort = document.getElementById("modal-sort-select")?.value || "catalog";

  if (cwGrid) {
    cwGrid.innerHTML = ONGOING_RELEASES.map((cw, idx) => {
      const pct = Math.min(100, Math.round((cw.currentEpisode / cw.totalEpisodes) * 100));
      return `
        <div data-cw-idx="${idx}" class="p-4 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all group flex gap-4">
          <img src="${cw.coverUrl}" alt="${cw.shortTitle}" class="w-16 h-24 object-cover border border-[#181818]/20 shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between font-mono text-[11px]">
              <span class="text-[#E05A3A] font-bold">● ${cw.catalogCode} — ON-GOING</span>
              <span class="font-semibold text-[#181818]">Ep ${cw.currentEpisode}/${cw.totalEpisodes} (${pct}%)</span>
            </div>
            <h3 class="mt-1 text-lg font-bold text-[#181818] group-hover:text-[#E05A3A] truncate">${cw.titleEnglish}</h3>
            <p class="text-xs text-[#6E6E6A] truncate">${cw.titleRomaji}</p>
            <div class="mt-2.5 w-full h-1.5 bg-[#181818]/10 overflow-hidden"><div class="h-full bg-[#E05A3A]" style="width:${pct}%"></div></div>
            <div class="mt-2 flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
              <span class="truncate">♪ ${cw.songTitle} — ${cw.songArtist}</span>
              <span class="text-[#181818] font-bold shrink-0 ml-2">★ ${cw.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    cwGrid.querySelectorAll("[data-cw-idx]").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.getAttribute("data-cw-idx"));
        document.getElementById("releases-modal").classList.add("hidden");
        switchCategory("watching", idx);
      });
    });
  }

  if (tableEl) {
    const filtered = WATCHED_RELEASES.filter((r) => {
      if (genre !== "All" && !r.genres.includes(genre)) return false;
      if (q) {
        const hit =
          r.titleEnglish.toLowerCase().includes(q) ||
          r.titleRomaji.toLowerCase().includes(q) ||
          r.songArtist.toLowerCase().includes(q) ||
          r.catalogCode.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "year-desc") return b.releaseYear - a.releaseYear;
      if (sort === "title-asc") return a.titleEnglish.localeCompare(b.titleEnglish);
      return a.releaseYear - b.releaseYear || a.catalogCode.localeCompare(b.catalogCode);
    });

    tableEl.innerHTML = filtered
      .map(
        (rel) => `
        <div data-rel-id="${rel.id}" class="py-3 px-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:bg-[#181818]/[0.04] cursor-pointer group">
          <div class="flex items-center gap-3 min-w-0">
            <img src="${rel.coverUrl}" alt="${rel.shortTitle}" class="w-8 h-11 object-cover border border-[#181818]/20 shrink-0" />
            <span class="text-[#6E6E6A] w-16 shrink-0">${rel.catalogCode}</span>
            <div class="min-w-0 font-sans">
              <div class="font-semibold text-sm text-[#181818] group-hover:text-[#E05A3A] truncate">${rel.titleEnglish}</div>
              <div class="text-xs text-[#6E6E6A] truncate">${rel.titleRomaji}</div>
            </div>
          </div>
          <div class="flex items-center gap-5 shrink-0">
            <span class="hidden md:inline text-[#6E6E6A]">${rel.genres.slice(0, 2).join(" / ")}</span>
            <span class="hidden sm:inline text-[#181818] font-medium">${rel.releaseYear} • ${rel.category}</span>
            <span class="px-2.5 py-1 font-bold ${
              rel.rating >= 10 ? "bg-[#E05A3A] text-white" : "bg-[#181818]/10 text-[#181818]"
            }">${rel.rating >= 10 ? "👑 10.0 / 10" : `★ ${rel.rating.toFixed(1)}`}</span>
          </div>
        </div>
      `
      )
      .join("");

    tableEl.querySelectorAll("[data-rel-id]").forEach((row) => {
      row.addEventListener("click", () => {
        const id = row.getAttribute("data-rel-id");
        const idx = WATCHED_RELEASES.findIndex((r) => r.id === id);
        document.getElementById("releases-modal").classList.add("hidden");
        switchCategory("all", Math.max(0, idx));
      });
    });
  }
}

function renderArtistsModal() {
  const grid = document.getElementById("modal-artists-grid");
  if (!grid) return;

  grid.innerHTML = ALL_RELEASES.map(
    (rel) => `
    <div data-artist-rel="${rel.id}" class="p-4 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all flex gap-3.5 group">
      <img src="${rel.coverUrl}" alt="${rel.shortTitle}" class="w-12 h-16 object-cover border border-[#181818]/20 shrink-0" />
      <div class="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between font-mono text-[10px] text-[#6E6E6A]">
            <span class="truncate">${rel.catalogCode} • ${rel.studio}</span>
            <span class="text-[#E05A3A] font-bold shrink-0 ml-1">${rel.bpm} BPM</span>
          </div>
          <div class="mt-1 text-base font-bold text-[#181818] group-hover:text-[#E05A3A] truncate">${rel.songArtist}</div>
          <div class="font-mono text-xs text-[#181818] truncate">♪ “${rel.songTitle}”</div>
        </div>
        <div class="pt-2 mt-2 border-t border-[#181818]/10 flex items-center justify-between font-mono text-[10px] text-[#6E6E6A]">
          <span class="truncate">${rel.shortTitle} (${rel.releaseYear})</span>
          <span class="text-[#181818] font-bold shrink-0">★ ${rel.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  `
  ).join("");

  grid.querySelectorAll("[data-artist-rel]").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-artist-rel");
      document.getElementById("artists-modal").classList.add("hidden");
      const ongoingIdx = ONGOING_RELEASES.findIndex((r) => r.id === id);
      if (ongoingIdx >= 0) {
        switchCategory("watching", ongoingIdx);
      } else {
        const watchedIdx = WATCHED_RELEASES.findIndex((r) => r.id === id);
        switchCategory("all", Math.max(0, watchedIdx));
      }
    });
  });
}

function switchCategory(cat, startIndex) {
  appState.category = cat;
  if (cat === "Movie") {
    appState.releases = WATCHED_RELEASES.filter((r) => r.category === "Movie");
  } else if (cat === "TV Series") {
    appState.releases = WATCHED_RELEASES.filter((r) => r.category === "TV Series");
  } else if (cat === "watching") {
    appState.releases = [...ONGOING_RELEASES];
  } else {
    appState.releases = [...WATCHED_RELEASES];
  }

  document.querySelectorAll("#category-tabs .cat-pill").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-cat") === cat);
  });

  const idx = startIndex !== undefined ? startIndex : cat === "all" ? 6 : 0;
  appState.activeIndex = Math.max(0, Math.min(appState.releases.length - 1, idx));
  appState.scrollCurrent = appState.activeIndex;
  appState.scrollVelocity = 0;

  if (appState.diveState === "detail") {
    triggerReverseDiveOut();
  }

  buildShelfMeshes();
  appState.waveProgress = 0;
  gsap.to(appState, { waveProgress: 1, duration: 0.78, ease: "power3.out" });
  syncStageHUD();
  if (appState.radioActive && appState.soundEnabled && appState.diveState === "shelf") {
    appState.radioHitIndex = (appState.radioHitIndex + 1) % POPULAR_RADIO_HITS.length;
    playPopularRadio(appState.radioHitIndex);
  }
}

/* ============================================================================
   ⚡ EVENT LISTENERS & POINTER RAYCASTING
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const genreSelect = document.getElementById("modal-genre-select");
  if (genreSelect) {
    const genres = new Set();
    ALL_RELEASES.forEach((r) => r.genres.forEach((g) => genres.add(g)));
    genreSelect.innerHTML =
      `<option value="All">All Genres</option>` +
      Array.from(genres)
        .sort()
        .map((g) => `<option value="${g}">${g}</option>`)
        .join("");
  }

  initThreeScene();
  syncStageHUD();
  preloadOfficialAnimeArtwork();
  playPopularRadio(appState.radioHitIndex);

  const canvasWrap = document.getElementById("three-canvas-container");
  let isDragging = false;
  let dragStartX = 0;
  let dragStartIndex = 0;
  let pointerMovedDistance = 0;

  canvasWrap.addEventListener("pointerdown", (e) => {
    if (appState.diveState !== "shelf") return;
    isDragging = true;
    dragStartX = e.clientX;
    dragStartIndex = appState.activeIndex;
    pointerMovedDistance = 0;
  });

  window.addEventListener("pointermove", (e) => {
    appState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    appState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    if (appState.diveState !== "shelf") return;
    if (isDragging) {
      const dx = e.clientX - dragStartX;
      pointerMovedDistance = Math.abs(dx);
      const stepOffset = Math.round(-dx / 64);
      const next = Math.max(0, Math.min(appState.releases.length - 1, dragStartIndex + stepOffset));
      if (next !== appState.activeIndex) selectReleaseIndex(next);
      return;
    }

    if (!renderer || !camera) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNDC, camera);
    const targets = [...sleeveEntries.map((s) => s.mesh), discSpinMesh].filter(Boolean);
    const hits = raycaster.intersectObjects(targets, false);
    if (hits.length > 0) {
      const hitObj = hits[0].object;
      appState.isHoveredDisc = Boolean(hitObj.userData?.isFloatingDisc);
      appState.hoveredIndex =
        typeof hitObj.userData?.sleeveIndex === "number" ? hitObj.userData.sleeveIndex : null;
      canvasWrap.style.cursor = "pointer";
    } else {
      appState.isHoveredDisc = false;
      appState.hoveredIndex = null;
      canvasWrap.style.cursor = "grab";
    }
  });

  window.addEventListener("pointerup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    if (pointerMovedDistance < 8 && appState.diveState === "shelf" && renderer) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);
      const targets = [...sleeveEntries.map((s) => s.mesh), discSpinMesh].filter(Boolean);
      const hits = raycaster.intersectObjects(targets, false);
      if (hits.length > 0) {
        const hitObj = hits[0].object;
        if (hitObj.userData?.isFloatingDisc || hitObj.userData?.sleeveIndex === appState.activeIndex) {
          triggerSignatureDiveIn();
        } else if (typeof hitObj.userData?.sleeveIndex === "number") {
          selectReleaseIndex(hitObj.userData.sleeveIndex);
        }
      }
    }
  });

  let wheelCooldown = false;
  window.addEventListener(
    "wheel",
    (e) => {
      const releasesOpen = !document.getElementById("releases-modal").classList.contains("hidden");
      const artistsOpen = !document.getElementById("artists-modal").classList.contains("hidden");
      if (appState.diveState !== "shelf" || releasesOpen || artistsOpen) return;
      if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return;
      if (wheelCooldown) return;
      wheelCooldown = true;
      const dir = (e.deltaY || e.deltaX) > 0 ? 1 : -1;
      selectReleaseIndex(appState.activeIndex + dir);
      setTimeout(() => {
        wheelCooldown = false;
      }, 130);
    },
    { passive: true }
  );

  window.addEventListener("keydown", (e) => {
    const releasesModal = document.getElementById("releases-modal");
    const artistsModal = document.getElementById("artists-modal");
    if (!releasesModal.classList.contains("hidden") || !artistsModal.classList.contains("hidden")) {
      if (e.key === "Escape") {
        releasesModal.classList.add("hidden");
        artistsModal.classList.add("hidden");
      }
      return;
    }
    if (appState.diveState === "detail") {
      if (e.key === "Escape") triggerReverseDiveOut();
      if (e.key === "ArrowRight") transitionDetailWithVinylBounce(appState.activeIndex + 1, "next");
      if (e.key === "ArrowLeft") transitionDetailWithVinylBounce(appState.activeIndex - 1, "prev");
      return;
    }
    if (appState.diveState === "shelf") {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") selectReleaseIndex(appState.activeIndex + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") selectReleaseIndex(appState.activeIndex - 1);
      if (e.key === "Enter") triggerSignatureDiveIn();
    }
  });

  document.getElementById("prev-sleeve-btn")?.addEventListener("click", () => selectReleaseIndex(appState.activeIndex - 1));
  document.getElementById("next-sleeve-btn")?.addEventListener("click", () => selectReleaseIndex(appState.activeIndex + 1));
  document.getElementById("center-caption-trigger")?.addEventListener("click", () => triggerSignatureDiveIn());

  const timelineEl = document.getElementById("timeline-scrubber");
  let scrubbingTimeline = false;
  const scrubAtX = (clientX) => {
    if (!timelineEl) return;
    const rect = timelineEl.getBoundingClientRect();
    const targetPct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const positions = computeTimelinePositions();
    let bestIdx = 0;
    let bestDist = Infinity;
    positions.forEach((p, i) => {
      const d = Math.abs(p - targetPct);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    });
    selectReleaseIndex(bestIdx);
  };

  timelineEl?.addEventListener("pointerdown", (e) => {
    scrubbingTimeline = true;
    scrubAtX(e.clientX);
  });
  window.addEventListener("pointermove", (e) => {
    if (scrubbingTimeline) scrubAtX(e.clientX);
  });
  window.addEventListener("pointerup", () => {
    scrubbingTimeline = false;
  });

  document.getElementById("nav-brand-btn")?.addEventListener("click", () => {
    document.getElementById("releases-modal").classList.add("hidden");
    document.getElementById("artists-modal").classList.add("hidden");
    if (appState.diveState === "detail") triggerReverseDiveOut();
  });

  document.querySelectorAll("#category-tabs .cat-pill").forEach((btn) => {
    btn.addEventListener("click", () => switchCategory(btn.getAttribute("data-cat")));
  });

  document.getElementById("toggle-art-mode-btn")?.addEventListener("click", () => {
    appState.useOfficialPosters = !appState.useOfficialPosters;
    document.getElementById("art-mode-label").textContent = appState.useOfficialPosters
      ? "ANIME ART"
      : "SWISS MINIMAL";
    rebuildSleeveMaterials();
    updateActiveDiscTexture();
  });

  document.getElementById("nav-releases-btn")?.addEventListener("click", () => {
    document.getElementById("artists-modal").classList.add("hidden");
    const modal = document.getElementById("releases-modal");
    const willOpen = modal.classList.contains("hidden");
    modal.classList.toggle("hidden", !willOpen);
    if (willOpen) renderReleasesModal();
  });

  document.getElementById("close-releases-modal-btn")?.addEventListener("click", () => {
    document.getElementById("releases-modal").classList.add("hidden");
  });

  document.getElementById("modal-search-input")?.addEventListener("input", renderReleasesModal);
  document.getElementById("modal-genre-select")?.addEventListener("change", renderReleasesModal);
  document.getElementById("modal-sort-select")?.addEventListener("change", renderReleasesModal);

  document.getElementById("nav-artists-btn")?.addEventListener("click", () => {
    document.getElementById("releases-modal").classList.add("hidden");
    const modal = document.getElementById("artists-modal");
    const willOpen = modal.classList.contains("hidden");
    modal.classList.toggle("hidden", !willOpen);
    if (willOpen) renderArtistsModal();
  });

  document.getElementById("close-artists-modal-btn")?.addEventListener("click", () => {
    document.getElementById("artists-modal").classList.add("hidden");
  });

  document.getElementById("nav-radio-btn")?.addEventListener("click", () => {
    appState.radioActive = !appState.radioActive;
    const dot = document.getElementById("radio-status-dot");
    const banner = document.getElementById("radio-live-banner");
    if (appState.radioActive) {
      dot.classList.remove("bg-[#6E6E6A]");
      dot.classList.add("bg-[#E05A3A]", "animate-ping");
      banner.classList.remove("hidden");
      banner.classList.add("flex");
      appState.soundEnabled = true;
      playPopularRadio(appState.radioHitIndex);
    } else {
      dot.classList.remove("bg-[#E05A3A]", "animate-ping");
      dot.classList.add("bg-[#6E6E6A]");
      banner.classList.add("hidden");
      banner.classList.remove("flex");
      stopTrackSynth();
    }
  });

  document.getElementById("radio-next-btn")?.addEventListener("click", () => {
    appState.soundEnabled = true;
    appState.radioHitIndex = (appState.radioHitIndex + 1) % POPULAR_RADIO_HITS.length;
    playPopularRadio(appState.radioHitIndex);
  });

  document.getElementById("radio-mute-btn")?.addEventListener("click", () => {
    appState.soundEnabled = !appState.soundEnabled;
    document.getElementById("radio-mute-btn").textContent = appState.soundEnabled ? "MUTE" : "PLAY";
    if (!appState.soundEnabled) stopTrackSynth();
    else playPopularRadio(appState.radioHitIndex);
  });

  document.getElementById("back-to-shelf-btn")?.addEventListener("click", () => triggerReverseDiveOut());
  document.getElementById("detail-prev-btn")?.addEventListener("click", () => transitionDetailWithVinylBounce(appState.activeIndex - 1, "prev"));
  document.getElementById("detail-next-btn")?.addEventListener("click", () => transitionDetailWithVinylBounce(appState.activeIndex + 1, "next"));

  document.getElementById("detail-visual-wrap")?.addEventListener("click", () => setDetailMediaTab("trailer"));
  document.querySelectorAll("[data-detail-tab]").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => setDetailMediaTab(tabBtn.getAttribute("data-detail-tab")));
  });
});
