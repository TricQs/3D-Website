/* ============================================================================
   💿 DISC ARCHIVE — INTERACTIVE 3D ANIME RATING & SOUNDTRACK SHOWCASE
   ============================================================================
   HOW TO EDIT YOUR ANIME RATING DATA:
   1. Edit `CURRENTLY_WATCHING` below (STEP 1) to update the anime you are
      watching right now and your current episode progress.
   2. Edit `ANIME_WATCHLIST` further down (STEP 2) to add new anime or update
      your personal ratings.
   3. All 3D Sleeve Spines, Swiss Editorial Front Cover Illustrations, and
      Vinyl/CD Disc Labels are generated 100% procedurally via high-DPI HTML5
      <canvas> textures (zero broken external image dependencies), with optional
      live MyAnimeList (Jikan v4), AnimeThemes HD OP, and iTunes 30s OST enrichment.
   ============================================================================ */

/* ============================================================================
   📺 STEP 1: CURRENTLY WATCHING (ON-GOING PERSONAL PROGRESS)
   ============================================================================ */
const RAW_CURRENTLY_WATCHING = [
  {
    id: "cw-1",
    catalogCode: "ONG-001",
    shortTitle: "BLUE BOX",
    titleRomaji: "Ao no Hako",
    titleEnglish: "Blue Box",
    category: "TV Series",
    releaseYear: 2024,
    ageRating: "PG-13",
    currentEpisode: 8,   // 👈 EDIT THIS: Episode you are currently watching
    totalEpisodes: 25,   // 👈 EDIT THIS: Total episodes in the season
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
    illustrationType: "school-desk"
  },
  {
    id: "cw-2",
    catalogCode: "ONG-002",
    shortTitle: "ROSHIDERE",
    titleRomaji: "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
    titleEnglish: "Alya Sometimes Hides Her Feelings in Russian",
    category: "TV Series",
    releaseYear: 2024,
    ageRating: "PG-13",
    currentEpisode: 5,   // 👈 EDIT THIS: Episode you are currently watching
    totalEpisodes: 12,   // 👈 EDIT THIS: Total episodes in the season
    isOngoing: true,
    rating: 8.5,
    genres: ["Romance", "Comedy", "School"],
    synopsis:
      "Silver-haired honor student Alya constantly teases her lazy desk neighbor Masachika Kuze with sweet flirtations whispered in Russian, completely unaware that he understands every single word.",
    quote1: "HILARIOUS ROM-COM BANTER AND SECRET RUSSIAN WHISPERS",
    quote2: "WATCHING EPISODE 5 OF 12 — ON-GOING PERSONAL PROGRESS",
    songTitle: "Ichiban Kagayaku Hoshi",
    songArtist: "Sumire Uesaka",
    songSearchQuery: "Ichiban Kagayaku Hoshi Sumire Uesaka",
    jikanQuery: "Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san",
    studio: "Doga Kobo",
    bpm: 128,
    keySignature: "G Major",
    illustrationType: "vending-machine"
  }
];

/* ============================================================================
   ⭐ STEP 2: COMPLETE 26 WATCHED ANIME ARCHIVE (22 TV SERIES + 4 MOVIES)
   ============================================================================ */
const RAW_WATCHED_ANIME = [
  {
    id: "1",
    catalogCode: "ANM-001",
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
    illustrationType: "vending-machine"
  },
  {
    id: "2",
    catalogCode: "ANM-002",
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
    songTitle: "Koikaze",
    songArtist: "Hinaki Yano",
    songSearchQuery: "Class no Daikirai na Joshi to Kekkon",
    jikanQuery: "Class no Daikirai na Joshi to Kekkon suru Koto ni Natta",
    studio: "Studio Gokumi × AXsiZ",
    bpm: 132,
    keySignature: "D Major",
    illustrationType: "school-desk"
  },
  {
    id: "3",
    catalogCode: "ANM-003",
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
    illustrationType: "magic-circle"
  },
  {
    id: "4",
    catalogCode: "ANM-004",
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
    illustrationType: "vending-machine"
  },
  {
    id: "5",
    catalogCode: "ANM-005",
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
    illustrationType: "cassette-synth"
  },
  {
    id: "6",
    catalogCode: "ANM-006",
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
    illustrationType: "school-desk"
  },
  {
    id: "7",
    catalogCode: "ANM-007",
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
    illustrationType: "vending-machine"
  },
  {
    id: "8",
    catalogCode: "ANM-008",
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
    illustrationType: "arcade-cabinet"
  },
  {
    id: "9",
    catalogCode: "ANM-009",
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
    illustrationType: "polar-wave"
  },
  {
    id: "10",
    catalogCode: "ANM-010",
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
    illustrationType: "magic-circle"
  },
  {
    id: "11",
    catalogCode: "ANM-011",
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
    songArtist: "HoneyWorks",
    songSearchQuery: "HoneyWorks Danjo no Yuujou",
    jikanQuery: "Danjo no Yuujou wa Seiritsu suru",
    studio: "J.C.Staff",
    bpm: 130,
    keySignature: "D Major",
    illustrationType: "sakura-crossing"
  },
  {
    id: "12",
    catalogCode: "ANM-012",
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
    illustrationType: "torii-shrine"
  },
  {
    id: "13",
    catalogCode: "ANM-013",
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
    illustrationType: "ocean-tiger"
  },
  {
    id: "14",
    catalogCode: "ANM-014",
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
    songTitle: "Arcade Heartbeat",
    songArtist: "Lily & Renji",
    songSearchQuery: "Game Center Shoujo",
    jikanQuery: "Game Center Shoujo to Ibunka Kouryuu",
    studio: "Nomad",
    bpm: 140,
    keySignature: "C Major",
    illustrationType: "arcade-cabinet"
  },
  {
    id: "15",
    catalogCode: "ANM-015",
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
    illustrationType: "cassette-synth"
  },
  {
    id: "16",
    catalogCode: "ANM-016",
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
    illustrationType: "magic-circle"
  },
  {
    id: "17",
    catalogCode: "ANM-017",
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
    illustrationType: "arcade-cabinet"
  },
  {
    id: "18",
    catalogCode: "ANM-018",
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
    illustrationType: "vending-machine"
  },
  {
    id: "19",
    catalogCode: "ANM-019",
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
    songSearchQuery: "Tatsuya Kitani",
    jikanQuery: "Kaoru Hana wa Rin to Saku",
    studio: "CloverWorks",
    bpm: 128,
    keySignature: "F Major",
    illustrationType: "sakura-crossing"
  },
  {
    id: "20",
    catalogCode: "ANM-020",
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
    illustrationType: "cassette-synth"
  },
  {
    id: "21",
    catalogCode: "ANM-021",
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
    songTitle: "Polar Opposites Theme",
    songArtist: "Seihantai Ensemble",
    songSearchQuery: "Seihantai na Kimi to Boku",
    jikanQuery: "Seihantai na Kimi to Boku",
    studio: "Lapin Track",
    bpm: 130,
    keySignature: "C Major",
    illustrationType: "polar-wave"
  },
  {
    id: "22",
    catalogCode: "ANM-022",
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
    songTitle: "Koori no Jouheki Theme",
    songArtist: "Original Soundtrack",
    songSearchQuery: "Koori no Jouheki",
    jikanQuery: "Koori no Jouheki",
    studio: "Studio KAI",
    bpm: 118,
    keySignature: "F Minor",
    illustrationType: "polar-wave"
  },
  {
    id: "23",
    catalogCode: "ANM-023",
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
    songTitle: "Zenzenzense",
    songArtist: "RADWIMPS",
    songSearchQuery: "Zenzenzense RADWIMPS",
    jikanQuery: "Kimi no Na wa.",
    studio: "CoMix Wave Films",
    bpm: 190,
    keySignature: "B Major",
    illustrationType: "comet-sky"
  },
  {
    id: "24",
    catalogCode: "ANM-024",
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
    illustrationType: "sakura-crossing"
  },
  {
    id: "25",
    catalogCode: "ANM-025",
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
    illustrationType: "ocean-tiger"
  },
  {
    id: "26",
    catalogCode: "ANM-026",
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
    illustrationType: "sakura-crossing"
  }
];

/* ============================================================================
   🎨 17 ARCHIVAL SLEEVE PALETTES & PROCEDURAL TRACKLIST HYDRATION
   ============================================================================ */
const ARCHIVAL_PALETTES = [
  { spineColor: "#E8C5C0", spineTextColor: "#181818", coverBgColor: "#F2DAD6", coverInkColor: "#181818", accentColor: "#E05A3A" }, // Pastel Pink
  { spineColor: "#1C2838", spineTextColor: "#F2F1EC", coverBgColor: "#212F42", coverInkColor: "#F4F3EF", accentColor: "#E05A3A" }, // Navy
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

const CHORD_BANK = [
  [261.63, 329.63, 392.0, 493.88, 587.33],
  [293.66, 369.99, 440.0, 554.37, 659.25],
  [246.94, 293.66, 369.99, 440.0, 523.25],
  [220.0, 261.63, 329.63, 392.0, 493.88],
  [349.23, 440.0, 523.25, 659.25, 783.99],
  [311.13, 392.0, 466.16, 587.33, 698.46],
  [277.18, 329.63, 415.3, 493.88, 622.25]
];

function hydrateList(rawList, offset) {
  return rawList.map((entry, idx) => {
    const pal = ARCHIVAL_PALETTES[(idx + offset) % ARCHIVAL_PALETTES.length];
    const i = idx + offset;
    const tracks = [
      {
        number: "01",
        title: `${entry.songTitle} (Opening Theme)`,
        role: `OP • ${entry.songArtist}`,
        duration: "01:30",
        bpm: entry.bpm,
        notes: CHORD_BANK[i % CHORD_BANK.length],
        waveformSeed: i * 13 + 1
      },
      {
        number: "02",
        title: `${entry.shortTitle} — Main Overture`,
        role: `OST Suite • ${entry.studio}`,
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
    return { ...entry, ...pal, tracks };
  });
}

const WATCHED_RELEASES = hydrateList(RAW_WATCHED_ANIME, 0);
const ONGOING_RELEASES = hydrateList(RAW_CURRENTLY_WATCHING, 3);
const ALL_RELEASES = [...WATCHED_RELEASES, ...ONGOING_RELEASES];
const RULER_YEARS = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  2023, 2024, 2025, 2026
];

/* ============================================================================
   🖼️ PROCEDURAL HIGH-DPI HTML5 <CANVAS> TEXTURE GENERATOR
   ============================================================================ */
const spineTexCache = new Map();
const frontTexCache = new Map();
const backTexCache = new Map();
const discTexCache = new Map();

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

  // Swiss background grid
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

  switch (release.illustrationType) {
    case "vending-machine": {
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.16;
      ctx.beginPath();
      ctx.arc(cx + 28, cy - 8, 190, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      const vmW = w * 0.32;
      const vmH = h * 0.72;
      const vmX = cx - vmW / 2;
      const vmY = cy - vmH / 2 + 6;

      // Isometric depth
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.moveTo(vmX + vmW, vmY);
      ctx.lineTo(vmX + vmW + 24, vmY - 16);
      ctx.lineTo(vmX + vmW + 24, vmY + vmH - 16);
      ctx.lineTo(vmX + vmW, vmY + vmH);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(vmX, vmY);
      ctx.lineTo(vmX + 24, vmY - 16);
      ctx.lineTo(vmX + vmW + 24, vmY - 16);
      ctx.lineTo(vmX + vmW, vmY);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#FAF8F5";
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3;
      ctx.fillRect(vmX, vmY, vmW, vmH);
      ctx.strokeRect(vmX, vmY, vmW, vmH);

      // Display window & beverage cans
      const winH = vmH * 0.48;
      ctx.fillStyle = bg;
      ctx.fillRect(vmX + 16, vmY + 18, vmW - 32, winH);
      ctx.strokeRect(vmX + 16, vmY + 18, vmW - 32, winH);

      for (let r = 0; r < 3; r++) {
        const sy = vmY + 18 + ((r + 1) * winH) / 3;
        ctx.beginPath();
        ctx.moveTo(vmX + 18, sy);
        ctx.lineTo(vmX + vmW - 18, sy);
        ctx.stroke();
        for (let c = 0; c < 5; c++) {
          const canW = (vmW - 64) / 5;
          const canX = vmX + 24 + c * (canW + 4);
          const canY = sy - winH / 3 + 8;
          ctx.fillStyle = (r + c) % 2 === 0 ? accent : ink;
          ctx.fillRect(canX, canY, canW - 2, winH / 3 - 10);
        }
      }

      ctx.fillStyle = accent;
      ctx.fillRect(vmX + 16, vmY + winH + 28, vmW - 32, 26);
      ctx.fillStyle = ink;
      ctx.fillRect(vmX + 16, vmY + vmH - 56, vmW - 72, 38);
      break;
    }

    case "torii-shrine": {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy - 12, Math.min(w, h) * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = ink;
      ctx.fillRect(cx - 140, cy - 95, 280, 18);
      ctx.fillRect(cx - 115, cy - 58, 230, 13);
      ctx.fillRect(cx - 84, cy - 80, 20, 195);
      ctx.fillRect(cx + 64, cy - 80, 20, 195);
      break;
    }

    case "comet-sky": {
      ctx.strokeStyle = ink;
      for (let r = 35; r <= 185; r += 30) {
        ctx.lineWidth = r === 125 ? 2.4 : 1.1;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 4.5;
      ctx.beginPath();
      ctx.moveTo(x + 45, y + h - 50);
      ctx.quadraticCurveTo(cx - 35, cy - 100, x + w - 50, y + 55);
      ctx.stroke();

      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx + 45, cy - 42, 13, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "arcade-cabinet": {
      const bw = Math.min(w, h) * 0.58;
      const bx = cx - bw / 2;
      const by = cy - bw / 2;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3.5;
      ctx.strokeRect(bx, by, bw, bw);
      ctx.fillStyle = accent;
      ctx.fillRect(bx, by, bw, 30);
      ctx.beginPath();
      ctx.moveTo(cx, by + 30);
      ctx.lineTo(cx, cy - 15);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + 12, 34, Math.PI * 0.85, Math.PI * 0.15, true);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy + 68, 28, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "magic-circle": {
      const rOuter = Math.min(w, h) * 0.36;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
      ctx.stroke();

      for (let t = 0; t < 2; t++) {
        ctx.strokeStyle = t === 0 ? ink : accent;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = ((i * 120 + t * 60 - 90) * Math.PI) / 180;
          const px = cx + Math.cos(a) * rOuter * 0.78;
          const py = cy + Math.sin(a) * rOuter * 0.78;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case "sakura-crossing": {
      ctx.strokeStyle = ink;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx - 70, y + 40);
      ctx.lineTo(cx - 70, y + h - 30);
      ctx.stroke();

      ctx.strokeStyle = accent;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(cx - 105, cy + 35);
      ctx.lineTo(cx + 155, cy - 68);
      ctx.stroke();

      ctx.fillStyle = accent;
      [[cx + 35, cy - 85, 14], [cx + 95, cy - 20, 18], [cx + 15, cy + 40, 15], [cx + 115, cy + 75, 12]].forEach(
        ([px, py, pr]) => {
          ctx.beginPath();
          ctx.ellipse(px, py, pr, pr * 0.6, Math.PI / 5, 0, Math.PI * 2);
          ctx.fill();
        }
      );
      break;
    }

    case "cassette-synth": {
      const dw = w * 0.54;
      const dh = h * 0.5;
      ctx.fillStyle = ink;
      ctx.fillRect(cx - dw / 2, cy - dh / 2, dw, dh);
      ctx.fillStyle = accent;
      ctx.fillRect(cx - dw / 2 + 20, cy - dh / 2 + 20, dw - 40, 52);
      [-dw * 0.24, dw * 0.24].forEach((off) => {
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(cx + off, cy + 24, 44, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case "ocean-tiger": {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx, cy - 24, Math.min(w, h) * 0.24, 0, Math.PI * 2);
      ctx.fill();
      for (let r = 0; r < 5; r++) {
        ctx.fillStyle = r % 2 === 0 ? ink : bg;
        ctx.fillRect(x + 48, cy + 12 + r * 26, w - 96, 14);
      }
      break;
    }

    case "school-desk": {
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.22;
      ctx.beginPath();
      ctx.moveTo(cx - 120, cy - 120);
      ctx.lineTo(cx + 75, cy - 120);
      ctx.lineTo(cx + 165, cy + 135);
      ctx.lineTo(cx - 25, cy + 135);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 3.5;
      ctx.strokeRect(cx - 120, cy - 120, 195, 195);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(cx + 120, cy - 50);
      ctx.lineTo(cx - 12, cy - 8);
      ctx.lineTo(cx + 28, cy + 24);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case "polar-wave":
    default: {
      const r = Math.min(w, h) * 0.24;
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(cx - r * 0.52, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(cx + r * 0.52, cy, r, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
  }

  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.2;
  ctx.strokeRect(x, y, w, h);
  ctx.restore();
}

function getSpineTexture(release) {
  if (spineTexCache.has(release.id)) return spineTexCache.get(release.id);

  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = release.spineColor;
  ctx.fillRect(0, 0, 256, 1024);
  drawPaperGrain(ctx, 256, 1024, 0.04);

  const grad = ctx.createLinearGradient(0, 0, 256, 0);
  grad.addColorStop(0, "rgba(0,0,0,0.24)");
  grad.addColorStop(0.08, "rgba(255,255,255,0.12)");
  grad.addColorStop(0.92, "rgba(255,255,255,0.06)");
  grad.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 1024);

  ctx.fillStyle = release.spineTextColor;
  ctx.strokeStyle = release.spineTextColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 36, 200, 56);
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(release.catalogCode, 128, 64);

  if (release.rating >= 9.0 || release.isOngoing) {
    ctx.fillStyle = "#E05A3A";
    ctx.beginPath();
    ctx.arc(128, 122, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(128, 515);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = release.spineTextColor;
  ctx.font = "700 34px 'Inter', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(release.shortTitle.toUpperCase(), 0, -4);
  ctx.globalAlpha = 0.75;
  ctx.font = "500 20px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "top";
  ctx.fillText(`${release.songArtist.toUpperCase()}  •  ${release.releaseYear}`, 0, 8);
  ctx.restore();

  ctx.fillStyle = release.spineTextColor;
  ctx.font = "700 26px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(`★ ${release.rating.toFixed(1)}`, 128, 945);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  spineTexCache.set(release.id, tex);
  return tex;
}

function getFrontCoverTexture(release, externalImg = null) {
  const key = `${release.id}_${externalImg ? "img" : "proc"}`;
  if (frontTexCache.has(key)) return frontTexCache.get(key);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

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
  ctx.font = "500 19px 'IBM Plex Mono', monospace";
  ctx.globalAlpha = 0.72;
  ctx.fillText(`${release.category.toUpperCase()}  •  ${release.studio.toUpperCase()}  •  ${release.releaseYear}`, 68, 118);
  ctx.globalAlpha = 1;

  const scoreText = release.isOngoing
    ? `EP ${release.currentEpisode}/${release.totalEpisodes} • ★ ${release.rating.toFixed(1)}`
    : release.rating >= 10
    ? "👑 10.0 / 10"
    : `SCORE ★ ${release.rating.toFixed(1)} / 10`;

  ctx.fillStyle = accent;
  ctx.fillRect(670, 62, 286, 56);
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 22px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(scoreText, 813, 97);

  ctx.fillStyle = ink;
  ctx.fillRect(68, 144, 888, 2.5);

  drawProceduralIllustration(ctx, release, 68, 170, 888, 535);
  if (externalImg) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(520, 194, 412, 487);
    ctx.clip();
    const sc = Math.max(412 / externalImg.width, 487 / externalImg.height);
    const dw = externalImg.width * sc;
    const dh = externalImg.height * sc;
    ctx.drawImage(externalImg, 520 + (412 - dw) / 2, 194 + (487 - dh) / 2, dw, dh);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 4;
    ctx.strokeRect(520, 194, 412, 487);
    ctx.restore();
  }

  ctx.fillStyle = ink;
  ctx.fillRect(68, 732, 888, 2.5);

  ctx.fillStyle = "#E05A3A";
  ctx.beginPath();
  ctx.arc(80, 768, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = ink;
  ctx.font = "700 20px 'IBM Plex Mono', monospace";
  ctx.textAlign = "left";
  ctx.fillText(
    `${release.genres.join(" / ").toUpperCase()}   —   ${release.bpm} BPM   —   ${release.ageRating}`,
    102,
    775
  );

  ctx.font = "800 56px 'Inter', sans-serif";
  const disp = release.titleEnglish.length > 26 ? release.shortTitle : release.titleEnglish;
  ctx.fillText(disp, 68, 848);

  ctx.globalAlpha = 0.78;
  ctx.font = "500 24px 'Inter', sans-serif";
  ctx.fillText(release.titleRomaji, 68, 892);

  ctx.globalAlpha = 1;
  ctx.font = "600 21px 'IBM Plex Mono', monospace";
  ctx.fillStyle = accent;
  ctx.fillText(`♪ ${release.songTitle.toUpperCase()} — ${release.songArtist.toUpperCase()}`, 68, 942);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  frontTexCache.set(key, tex);
  return tex;
}

function getBackCoverTexture(release) {
  if (backTexCache.has(release.id)) return backTexCache.get(release.id);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = release.coverBgColor;
  ctx.fillRect(0, 0, 1024, 1024);
  ctx.strokeStyle = release.coverInkColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 928, 928);

  ctx.fillStyle = release.coverInkColor;
  ctx.font = "700 28px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.catalogCode}  //  ARCHIVE DOSSIER & TRACKLIST`, 84, 118);

  const tex = new THREE.CanvasTexture(canvas);
  backTexCache.set(release.id, tex);
  return tex;
}

function getVinylDiscTexture(release) {
  if (discTexCache.has(release.id)) return discTexCache.get(release.id);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  const cx = 512;
  const cy = 512;

  ctx.fillStyle = "#141413";
  ctx.beginPath();
  ctx.arc(cx, cy, 504, 0, Math.PI * 2);
  ctx.fill();

  for (let r = 205; r < 490; r += 4) {
    ctx.strokeStyle = r % 36 < 4 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = release.coverBgColor;
  ctx.beginPath();
  ctx.arc(cx, cy, 192, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 192, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = release.accentColor;
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = release.coverInkColor;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, 184, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 24px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText(release.catalogCode, cx, cy - 112);
  ctx.font = "700 19px 'IBM Plex Mono', monospace";
  ctx.fillText(`★ ${release.rating.toFixed(1)} / 10`, cx, cy - 82);

  ctx.fillStyle = release.coverInkColor;
  ctx.font = "800 22px 'Inter', sans-serif";
  ctx.fillText(release.shortTitle.slice(0, 14), cx, cy + 102);
  ctx.font = "600 16px 'IBM Plex Mono', monospace";
  ctx.fillText(`${release.releaseYear} • ${release.bpm} BPM`, cx, cy + 132);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  discTexCache.set(release.id, tex);
  return tex;
}

/* ============================================================================
   🔊 WEB AUDIO API POLYPHONIC SYNTH & MECHANICAL TURNTABLE SOUND ENGINE
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
    gain.gain.setValueAtTime(0.055, now);
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
    filter.frequency.setValueAtTime(divingIn ? 240 : 1100, now);
    filter.frequency.exponentialRampToValueAtTime(divingIn ? 1400 : 180, now + 0.55);
    osc.frequency.setValueAtTime(divingIn ? 95 : 260, now);
    osc.frequency.exponentialRampToValueAtTime(divingIn ? 290 : 88, now + 0.55);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.58);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
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
      ostAudio.volume = 0.72;
      ostAudio.play().catch(runLoop);
    } catch {
      runLoop();
    }
  } else {
    runLoop();
  }

  progressTimer = setInterval(() => {
    const elapsed = performance.now() - start;
    const prog = Math.min(1, elapsed / 24000);
    onTick && onTick(prog);
    if (prog >= 1) {
      stopTrackSynth();
      onDone && onDone();
    }
  }, 80);
}

/* ============================================================================
   🌐 EXTERNAL MEDIA ENRICHMENT (JIKAN MAL, ITUNES OST, ANIMETHEMES OP)
   ============================================================================ */
const MEDIA_STORAGE_KEY = "disc_archive_anime_media_v1";
const loadedPosterImages = {};

function getStoredMedia() {
  try {
    return JSON.parse(localStorage.getItem(MEDIA_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveStoredMedia(key, patch) {
  try {
    const all = getStoredMedia();
    all[key] = { ...(all[key] || {}), ...patch };
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(all));
  } catch {}
}

async function resolveExternalMedia(release) {
  const key = release.jikanQuery || release.titleRomaji;
  const cached = getStoredMedia()[key] || {};

  if (!cached.posterUrl || !cached.youtubeId) {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(key)}&limit=1`);
      if (res.ok) {
        const json = await res.json();
        const found = json?.data?.[0];
        if (found) {
          cached.posterUrl = found.images?.jpg?.large_image_url || found.images?.jpg?.image_url;
          cached.youtubeId = found.trailer?.youtube_id;
          saveStoredMedia(key, cached);
        }
      }
    } catch {}
  }

  if (!cached.songPreviewUrl) {
    try {
      const term = release.songSearchQuery || `${release.songTitle} ${release.songArtist}`;
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=1`
      );
      if (res.ok) {
        const json = await res.json();
        const prev = json?.results?.[0]?.previewUrl;
        if (prev) {
          cached.songPreviewUrl = prev;
          saveStoredMedia(key, cached);
        }
      }
    } catch {}
  }

  if (cached.posterUrl && !loadedPosterImages[release.id]) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedPosterImages[release.id] = img;
      if (appState.useOfficialPosters) {
        rebuildSleeveMaterials();
      }
    };
    img.src = cached.posterUrl;
  }

  return cached;
}

/* ============================================================================
   🎛️ APPLICATION STATE & 3D THREE.JS TURNTABLE SCENE
   ============================================================================ */
const appState = {
  category: "all",
  releases: [...WATCHED_RELEASES],
  activeIndex: 0,
  scrollCurrent: 0,
  scrollVelocity: 0,
  diveState: "shelf", // "shelf" | "diving-in" | "detail" | "diving-out"
  isHoveredCenter: false,
  radioActive: false,
  soundEnabled: true,
  useOfficialPosters: false,
  playingTrackNum: null,
  trackProgress: 0,
  detailMediaTab: "cover",
  externalMedia: {}
};

let scene, camera, renderer, platterGroup, sleevesGroup, discGroup, discSpinMesh;
let sleeveEntries = [];
const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();

function computeAccordionTransform(d) {
  const absD = Math.abs(d);
  const centerWeight = Math.exp(-(d * d) / 0.14);

  const spinePitch = 0.285;
  const leftAnchor = -1.72;
  const rightAnchor = 1.92;
  const centerAnchor = -0.16;

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

  const rotY = (1 - centerWeight) * (Math.PI / 2 - d * 0.026);
  const z = -0.048 * (x * x) + 0.42 * centerWeight;
  const y = 0.42 + 0.05 * centerWeight;
  const scale = absD > 8.6 ? Math.max(0.001, 1 - (absD - 8.6) * 1.4) : 1;

  return { x, y, z, rotY, centerWeight, scale, isVisible: absD < 9.3 };
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
  if (w < 640) return 8.2;
  if (w < 1024) return 7.1;
  return 6.35;
}

function initThreeScene() {
  const container = document.getElementById("three-canvas-container");
  if (!container) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.04, 45);
  camera.position.set(0, 0.58, getBaseCameraZ());
  camera.lookAt(0, 0.36, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // Soft Gallery Studio Lighting
  const ambient = new THREE.AmbientLight("#FAF9F5", 1.35);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight("#FFFDF9", 1.45);
  dirLight.position.set(4.5, 8.5, 6.5);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight("#E6E7E2", 0.55);
  fillLight.position.set(-6, 4, 3);
  scene.add(fillLight);

  // 1. Curved Perforated Brushed-Metal Turntable Platter Rim
  const platterRoot = new THREE.Group();
  platterRoot.position.set(0, -0.96, -8.35);
  scene.add(platterRoot);

  platterGroup = new THREE.Group();
  platterRoot.add(platterGroup);

  const rimMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(10.42, 11.02, 0.46, 128),
    new THREE.MeshStandardMaterial({ color: "#B8B9B4", metalness: 0.62, roughness: 0.34 })
  );
  rimMesh.position.y = -0.06;
  rimMesh.receiveShadow = true;
  platterGroup.add(rimMesh);

  const lowerLip = new THREE.Mesh(
    new THREE.CylinderGeometry(11.02, 10.88, 0.14, 128),
    new THREE.MeshStandardMaterial({ color: "#9E9F9A", metalness: 0.7, roughness: 0.28 })
  );
  lowerLip.position.y = -0.34;
  platterGroup.add(lowerLip);

  // 136 Repeating Rectangular Perforated Strobe Slots along Front Bevel
  const slotGeom = new THREE.BoxGeometry(0.25, 0.21, 0.07);
  const slotMat = new THREE.MeshStandardMaterial({ color: "#181818", metalness: 0.2, roughness: 0.85 });
  const slotCount = 136;
  for (let i = 0; i < slotCount; i++) {
    const angle = (i / slotCount) * Math.PI * 2;
    const holder = new THREE.Group();
    holder.position.set(Math.sin(angle) * 10.74, -0.02, Math.cos(angle) * 10.74);
    holder.rotation.y = angle;
    const slotMesh = new THREE.Mesh(slotGeom, slotMat);
    slotMesh.rotation.x = -0.52;
    holder.add(slotMesh);
    platterGroup.add(holder);
  }

  // Dark Charcoal Platter Mat
  const matMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(10.22, 10.28, 0.05, 128),
    new THREE.MeshStandardMaterial({ color: "#232321", metalness: 0.08, roughness: 0.88 })
  );
  matMesh.position.y = 0.21;
  matMesh.receiveShadow = true;
  platterGroup.add(matMesh);

  // 2. Accordion Spine-to-Cover 3D Shelf Group
  sleevesGroup = new THREE.Group();
  scene.add(sleevesGroup);

  // 3. Floating Mini Vinyl / CD Disc with Hollow Center Spindle Hole
  discGroup = new THREE.Group();
  discGroup.position.set(0.98, 0.45, 0.34);
  scene.add(discGroup);

  const discGeom = createHollowDiscGeometry(0.088, 0.96, 96);
  const discMat = new THREE.MeshStandardMaterial({
    roughness: 0.24,
    metalness: 0.35,
    side: THREE.DoubleSide
  });
  discSpinMesh = new THREE.Mesh(discGeom, discMat);
  discSpinMesh.userData = { isFloatingDisc: true };
  discGroup.add(discSpinMesh);

  const spindleCollar = new THREE.Mesh(
    new THREE.RingGeometry(0.086, 0.106, 64),
    new THREE.MeshStandardMaterial({ color: "#D2D2CF", metalness: 0.85, roughness: 0.2, side: THREE.DoubleSide })
  );
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
  const spineTex = getSpineTexture(release);
  const extImg = appState.useOfficialPosters ? loadedPosterImages[release.id] : null;
  const frontTex = getFrontCoverTexture(release, extImg);
  const backTex = getBackCoverTexture(release);

  const spineMat = new THREE.MeshStandardMaterial({ map: spineTex, roughness: 0.42, metalness: 0.04 });
  const frontMat = new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.36, metalness: 0.05 });
  const backMat = new THREE.MeshStandardMaterial({ map: backTex, roughness: 0.44, metalness: 0.04 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: release.spineColor, roughness: 0.55, metalness: 0.04 });

  return [spineMat, spineMat, edgeMat, edgeMat, frontMat, backMat];
}

function buildShelfMeshes() {
  if (!sleevesGroup) return;
  while (sleevesGroup.children.length > 0) {
    sleevesGroup.remove(sleevesGroup.children[0]);
  }
  sleeveEntries = [];

  const boxGeom = new THREE.BoxGeometry(2.32, 2.32, 0.235);

  appState.releases.forEach((rel, idx) => {
    const group = new THREE.Group();
    const materials = buildSleeveMaterialsForRelease(rel);
    const mesh = new THREE.Mesh(boxGeom, materials);
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
  discSpinMesh.material.map = getVinylDiscTexture(activeRel);
  discSpinMesh.material.needsUpdate = true;
}

function startRenderLoop() {
  let lastTime = performance.now();

  function animate(now) {
    requestAnimationFrame(animate);
    const delta = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    // Spring physics toward activeIndex
    const stiffness = 115;
    const damping = 18;
    const disp = appState.activeIndex - appState.scrollCurrent;
    const force = disp * stiffness - appState.scrollVelocity * damping;
    appState.scrollVelocity += force * delta;
    appState.scrollCurrent += appState.scrollVelocity * delta;

    // Platter rotation
    if (platterGroup) {
      platterGroup.rotation.y = -appState.scrollCurrent * 0.045 + now * 0.000035;
    }

    // Update each digipak sleeve in the accordion shelf
    const damp = Math.min(1, delta * 14);
    sleeveEntries.forEach((entry) => {
      const d = entry.index - appState.scrollCurrent;
      const t = computeAccordionTransform(d);
      entry.group.visible = t.isVisible;
      if (!t.isVisible) return;

      const isCenter = entry.index === appState.activeIndex;
      const tiltX = isCenter && appState.isHoveredCenter ? -0.055 : 0;
      const tiltY = t.rotY + (isCenter && appState.isHoveredCenter ? -0.08 : 0);
      const liftY = t.y + (isCenter && appState.isHoveredCenter ? 0.045 : 0);

      entry.group.position.x = THREE.MathUtils.lerp(entry.group.position.x, t.x, damp);
      entry.group.position.y = THREE.MathUtils.lerp(entry.group.position.y, liftY, damp);
      entry.group.position.z = THREE.MathUtils.lerp(entry.group.position.z, t.z, damp);
      entry.group.rotation.x = THREE.MathUtils.lerp(entry.group.rotation.x, tiltX, damp);
      entry.group.rotation.y = THREE.MathUtils.lerp(entry.group.rotation.y, tiltY, damp);
      entry.group.scale.setScalar(
        THREE.MathUtils.lerp(entry.group.scale.x, t.scale * (1 + t.centerWeight * 0.02), damp)
      );
    });

    // Spin & position the floating mini vinyl/CD disc
    if (discSpinMesh) {
      const speed = appState.isHoveredCenter ? 3.2 : 1.15;
      discSpinMesh.rotation.z -= delta * speed;
    }

    if (discGroup && appState.diveState === "shelf") {
      const settleDiff = Math.abs(appState.activeIndex - appState.scrollCurrent);
      const visFactor = Math.max(0, 1 - settleDiff * 1.35);
      const targetX = appState.isHoveredCenter ? 1.16 : 0.98;
      const targetY = 0.45 + Math.sin(now * 0.0024) * 0.025;
      const targetZ = 0.34;
      const targetRotY = appState.isHoveredCenter ? -0.14 : -0.06;

      discGroup.position.x = THREE.MathUtils.lerp(discGroup.position.x, targetX, damp);
      discGroup.position.y = THREE.MathUtils.lerp(discGroup.position.y, targetY, damp);
      discGroup.position.z = THREE.MathUtils.lerp(discGroup.position.z, targetZ, damp);
      discGroup.rotation.y = THREE.MathUtils.lerp(discGroup.rotation.y, targetRotY, damp);
      discGroup.scale.setScalar(
        THREE.MathUtils.lerp(discGroup.scale.x, 0.88 * (0.4 + 0.6 * visFactor), damp)
      );
    }

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}

/* ============================================================================
   🚀 SIGNATURE MULTI-STAGE GSAP SPINDLE-HOLE CAMERA DIVE TRANSITION
   ============================================================================ */
function triggerSignatureDiveIn() {
  if (appState.diveState !== "shelf" || !discGroup) return;
  appState.diveState = "diving-in";
  playDiveWhoosh(true, appState.soundEnabled);

  const tl = gsap.timeline({
    onComplete: () => {
      appState.diveState = "detail";
      openDetailViewDOM();
    }
  });

  // Stage 1: Floating disc centers itself, scales up, and aligns parallel to camera
  tl.to(discGroup.position, { x: 0, y: 0.48, z: 1.65, duration: 0.46, ease: "power3.out" }, 0);
  tl.to(discGroup.rotation, { x: 0, y: 0, z: 0, duration: 0.42, ease: "power2.out" }, 0);
  tl.to(discGroup.scale, { x: 1.75, y: 1.75, z: 1.75, duration: 0.48, ease: "power3.out" }, 0);

  // Stage 2: Camera accelerates straight through the center spindle hole
  tl.to(camera.position, { x: 0, y: 0.48, z: 1.48, duration: 0.58, ease: "power3.in" }, 0.38);
}

function triggerReverseDiveOut() {
  if (appState.diveState !== "detail" || !discGroup) return;
  if (!appState.radioActive) {
    stopTrackSynth();
    appState.playingTrackNum = null;
  }

  document.getElementById("release-detail-view").classList.add("hidden");
  document.getElementById("shelf-stage-wrap").classList.remove("opacity-0", "pointer-events-none");

  appState.diveState = "diving-out";
  playDiveWhoosh(false, appState.soundEnabled);

  const baseZ = getBaseCameraZ();
  const tl = gsap.timeline({
    onComplete: () => {
      appState.diveState = "shelf";
    }
  });

  tl.to(camera.position, { x: 0, y: 0.58, z: baseZ, duration: 0.62, ease: "power3.out" }, 0);
  tl.to(discGroup.position, { x: 0.98, y: 0.45, z: 0.34, duration: 0.58, ease: "power3.inOut" }, 0.22);
  tl.to(discGroup.scale, { x: 0.88, y: 0.88, z: 0.88, duration: 0.58, ease: "power3.inOut" }, 0.22);
}

/* ============================================================================
   🖥️ HUD, TIMELINE & RELEASE DETAIL DOM SYNCHRONIZATION
   ============================================================================ */
function selectReleaseIndex(nextIndex) {
  if (appState.releases.length === 0) return;
  const clamped = Math.max(0, Math.min(appState.releases.length - 1, nextIndex));
  if (clamped !== appState.activeIndex) {
    appState.activeIndex = clamped;
    playStepClick(appState.soundEnabled);
    updateActiveDiscTexture();
    syncStageHUD();
    if (appState.diveState === "detail") {
      populateDetailViewDOM();
    }
  }
}

function syncStageHUD() {
  const rel = appState.releases[appState.activeIndex];
  if (!rel) return;

  const isTen = rel.rating >= 10;
  document.getElementById("hud-platter-title").textContent = `${rel.catalogCode} ${rel.shortTitle}`;
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

  // Timeline coral needle position
  const minY = RULER_YEARS[0];
  const maxY = RULER_YEARS[RULER_YEARS.length - 1];
  const pct = Math.max(1.5, Math.min(98.5, ((rel.releaseYear - minY) / (maxY - minY)) * 100));
  document.getElementById("timeline-coral-needle").style.left = `${pct}%`;
  document.getElementById("timeline-needle-label").textContent = String(rel.releaseYear);

  renderTimelineRuler();

  // Resolve media in background
  resolveExternalMedia(rel).then((media) => {
    appState.externalMedia[rel.id] = media;
  });

  if (appState.radioActive && appState.soundEnabled) {
    document.getElementById("radio-banner-text").textContent = `RADIO: ♪ ${rel.songTitle} — ${rel.songArtist}`;
    startTrackSynth(rel.tracks[0], appState.externalMedia[rel.id]?.songPreviewUrl);
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
    const h = isMajor ? 24 : Math.round(7 + wave * 17);
    const colorClass =
      approxY === activeRel.releaseYear
        ? "bg-[#E05A3A]"
        : hasRel
        ? "bg-[#181818]/65"
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
      ? "text-[#181818] font-medium hover:text-[#E05A3A]"
      : "text-[#6E6E6A]/60 hover:text-[#181818]";
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

function openDetailViewDOM() {
  document.getElementById("shelf-stage-wrap").classList.add("opacity-0", "pointer-events-none");
  const detailView = document.getElementById("release-detail-view");
  detailView.classList.remove("hidden");
  populateDetailViewDOM();
}

function populateDetailViewDOM() {
  const rel = appState.releases[appState.activeIndex];
  if (!rel) return;

  const isTen = rel.rating >= 10;
  document.getElementById("detail-catalog-badge").textContent = rel.catalogCode;
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

  // Draw procedural 2D cover canvas
  const coverCanvas = document.getElementById("detail-cover-canvas");
  if (coverCanvas) {
    const srcTex = getFrontCoverTexture(rel);
    const ctx = coverCanvas.getContext("2d");
    ctx.drawImage(srcTex.image, 0, 0, 640, 640);
  }

  // Rating breakdown bars
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
          <span class="text-[#6E6E6A]">${m.label}</span>
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
        <div data-track-num="${tr.number}" class="py-3.5 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#181818]/[0.03]">
          <div class="flex items-center gap-3.5 min-w-0">
            <button type="button" class="w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs shrink-0 ${
              isPlaying ? "border-[#E05A3A] bg-[#E05A3A] text-white" : "border-[#181818]/35 text-[#181818]"
            }">${isPlaying ? "■" : "▶"}</button>
            <span class="font-mono text-xs text-[#6E6E6A] w-6 shrink-0">${tr.number}</span>
            <div class="min-w-0">
              <div class="font-medium text-sm text-[#181818] truncate">${tr.title}</div>
              <div class="font-mono text-[11px] text-[#6E6E6A] truncate">${tr.role} • ${tr.bpm} BPM</div>
            </div>
          </div>
          <div class="flex items-center gap-3 self-end sm:self-center shrink-0">
            <div class="flex items-end gap-[2px] h-7 w-40 sm:w-48 px-1.5 py-1 bg-[#181818]/[0.04] border border-[#181818]/10">${bars}</div>
            <span class="font-mono text-xs text-[#6E6E6A] w-11 text-right">${tr.duration}</span>
          </div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll("[data-track-num]").forEach((row) => {
    row.addEventListener("click", () => {
      const num = row.getAttribute("data-track-num");
      const track = rel.tracks.find((t) => t.number === num);
      if (!track) return;

      if (appState.playingTrackNum === num) {
        stopTrackSynth();
        appState.playingTrackNum = null;
        renderDetailTracklist(rel);
      } else {
        appState.playingTrackNum = num;
        appState.trackProgress = 0;
        const extUrl = num === "01" ? appState.externalMedia[rel.id]?.songPreviewUrl : null;
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
        <div data-cw-idx="${idx}" class="p-5 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all group">
          <div class="flex items-center justify-between font-mono text-xs">
            <span class="text-[#E05A3A] font-bold">● ${cw.catalogCode} — ON-GOING</span>
            <span class="font-semibold text-[#181818]">Episode ${cw.currentEpisode} / ${cw.totalEpisodes} (${pct}%)</span>
          </div>
          <h3 class="mt-1.5 text-xl font-bold text-[#181818] group-hover:text-[#E05A3A]">${cw.titleEnglish}</h3>
          <p class="text-xs text-[#6E6E6A]">${cw.titleRomaji}</p>
          <div class="mt-3 w-full h-1.5 bg-[#181818]/10 overflow-hidden">
            <div class="h-full bg-[#E05A3A]" style="width:${pct}%"></div>
          </div>
          <div class="mt-3 flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
            <span>♪ ${cw.songTitle} — ${cw.songArtist}</span>
            <span class="text-[#181818] font-bold">★ ${cw.rating.toFixed(1)} / 10</span>
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
      return Number(a.id) - Number(b.id);
    });

    tableEl.innerHTML = filtered
      .map(
        (rel) => `
        <div data-rel-id="${rel.id}" class="py-3.5 px-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:bg-[#181818]/[0.04] cursor-pointer group">
          <div class="flex items-center gap-3 min-w-0">
            <span class="w-3 h-7 shrink-0 border border-[#181818]/20" style="background:${rel.spineColor}"></span>
            <span class="text-[#6E6E6A] w-16 shrink-0">${rel.catalogCode}</span>
            <div class="min-w-0 font-sans">
              <div class="font-semibold text-sm text-[#181818] group-hover:text-[#E05A3A] truncate">${rel.titleEnglish}</div>
              <div class="text-xs text-[#6E6E6A] truncate">${rel.titleRomaji}</div>
            </div>
          </div>
          <div class="flex items-center gap-5 shrink-0">
            <span class="hidden md:inline text-[#6E6E6A]">${rel.genres.slice(0, 2).join(" / ")}</span>
            <span class="hidden sm:inline text-[#6E6E6A]">${rel.category} • ${rel.releaseYear}</span>
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
    <div data-artist-rel="${rel.id}" class="p-4 border border-[#181818]/20 bg-[#EAEAE8] hover:border-[#E05A3A] cursor-pointer transition-all flex flex-col justify-between gap-3 group">
      <div>
        <div class="flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
          <span>${rel.catalogCode} • ${rel.studio}</span>
          <span class="text-[#E05A3A] font-bold">${rel.bpm} BPM</span>
        </div>
        <div class="mt-1.5 text-lg font-bold text-[#181818] group-hover:text-[#E05A3A]">${rel.songArtist}</div>
        <div class="font-mono text-xs text-[#181818]">♪ “${rel.songTitle}”</div>
      </div>
      <div class="pt-2.5 border-t border-[#181818]/10 flex items-center justify-between font-mono text-[11px] text-[#6E6E6A]">
        <span class="truncate">${rel.shortTitle} (${rel.releaseYear})</span>
        <span class="text-[#181818] font-bold">★ ${rel.rating.toFixed(1)}</span>
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

function switchCategory(cat, startIndex = 0) {
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

  appState.activeIndex = startIndex;
  appState.scrollCurrent = startIndex;
  appState.scrollVelocity = 0;

  if (appState.diveState === "detail") {
    triggerReverseDiveOut();
  }

  buildShelfMeshes();
  syncStageHUD();
}

/* ============================================================================
   ⚡ EVENT LISTENERS & POINTER RAYCASTING
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Populate genre dropdown
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

  // Canvas Drag & Raycast Click / Hover
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
    if (appState.diveState !== "shelf") return;

    if (isDragging) {
      const dx = e.clientX - dragStartX;
      pointerMovedDistance = Math.abs(dx);
      const stepOffset = Math.round(-dx / 68);
      const next = Math.max(0, Math.min(appState.releases.length - 1, dragStartIndex + stepOffset));
      if (next !== appState.activeIndex) {
        selectReleaseIndex(next);
      }
      return;
    }

    // Hover raycast on center sleeve or floating disc
    if (!renderer || !camera) return;
    const rect = renderer.domElement.getBoundingClientRect();
    pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointerNDC, camera);

    const targets = [...sleeveEntries.map((s) => s.mesh), discSpinMesh].filter(Boolean);
    const hits = raycaster.intersectObjects(targets, false);
    if (hits.length > 0) {
      const hitObj = hits[0].object;
      const isCenterHit =
        hitObj.userData?.isFloatingDisc || hitObj.userData?.sleeveIndex === appState.activeIndex;
      appState.isHoveredCenter = Boolean(isCenterHit);
      canvasWrap.style.cursor = "pointer";
    } else {
      appState.isHoveredCenter = false;
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

  // Mouse Wheel & Keyboard Navigation
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
      return;
    }
    if (appState.diveState === "shelf") {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") selectReleaseIndex(appState.activeIndex + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") selectReleaseIndex(appState.activeIndex - 1);
      if (e.key === "Enter") triggerSignatureDiveIn();
    }
  });

  // Flanking 40px Circular Buttons & Center Caption Dive
  document.getElementById("prev-sleeve-btn")?.addEventListener("click", () => {
    selectReleaseIndex(appState.activeIndex - 1);
  });
  document.getElementById("next-sleeve-btn")?.addEventListener("click", () => {
    selectReleaseIndex(appState.activeIndex + 1);
  });
  document.getElementById("center-caption-trigger")?.addEventListener("click", () => {
    triggerSignatureDiveIn();
  });

  // Timeline Scrubber Drag & Click
  const timelineEl = document.getElementById("timeline-scrubber");
  let scrubbingTimeline = false;
  const scrubAtX = (clientX) => {
    if (!timelineEl) return;
    const rect = timelineEl.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const minY = RULER_YEARS[0];
    const maxY = RULER_YEARS[RULER_YEARS.length - 1];
    const targetYear = minY + ratio * (maxY - minY);

    let bestIdx = 0;
    let bestDist = Infinity;
    appState.releases.forEach((r, i) => {
      const d = Math.abs(r.releaseYear - targetYear);
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

  // Top Navigation Buttons
  document.getElementById("nav-brand-btn")?.addEventListener("click", () => {
    document.getElementById("releases-modal").classList.add("hidden");
    document.getElementById("artists-modal").classList.add("hidden");
    if (appState.diveState === "detail") triggerReverseDiveOut();
  });

  document.querySelectorAll("#category-tabs .cat-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchCategory(btn.getAttribute("data-cat"), 0);
    });
  });

  document.getElementById("toggle-art-mode-btn")?.addEventListener("click", () => {
    appState.useOfficialPosters = !appState.useOfficialPosters;
    document.getElementById("art-mode-label").textContent = appState.useOfficialPosters
      ? "MAL VISUAL"
      : "SWISS CANVAS";
    rebuildSleeveMaterials();
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
      dot.classList.replace("bg-[#6E6E6A]", "bg-[#E05A3A]");
      banner.classList.remove("hidden");
      banner.classList.add("flex");
      const rel = appState.releases[appState.activeIndex];
      if (rel) {
        document.getElementById("radio-banner-text").textContent = `RADIO: ♪ ${rel.songTitle} — ${rel.songArtist}`;
        startTrackSynth(rel.tracks[0], appState.externalMedia[rel.id]?.songPreviewUrl);
      }
    } else {
      dot.classList.replace("bg-[#E05A3A]", "bg-[#6E6E6A]");
      banner.classList.add("hidden");
      banner.classList.remove("flex");
      stopTrackSynth();
    }
  });

  document.getElementById("radio-mute-btn")?.addEventListener("click", () => {
    appState.soundEnabled = !appState.soundEnabled;
    document.getElementById("radio-mute-btn").textContent = appState.soundEnabled ? "MUTE" : "UNMUTE";
    if (!appState.soundEnabled) stopTrackSynth();
  });

  // Detail View Controls
  document.getElementById("back-to-shelf-btn")?.addEventListener("click", () => {
    triggerReverseDiveOut();
  });

  document.getElementById("detail-prev-btn")?.addEventListener("click", () => {
    selectReleaseIndex(appState.activeIndex - 1);
  });
  document.getElementById("detail-next-btn")?.addEventListener("click", () => {
    selectReleaseIndex(appState.activeIndex + 1);
  });

  document.querySelectorAll("[data-detail-tab]").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const tab = tabBtn.getAttribute("data-detail-tab");
      document.querySelectorAll("[data-detail-tab]").forEach((b) => {
        b.classList.toggle("active", b === tabBtn);
      });

      const coverCanvas = document.getElementById("detail-cover-canvas");
      const visualWrap = document.getElementById("detail-visual-wrap");
      const trailerWrap = document.getElementById("detail-trailer-wrap");
      const rel = appState.releases[appState.activeIndex];
      const media = appState.externalMedia[rel?.id] || {};

      coverCanvas.classList.toggle("hidden", tab !== "cover");
      visualWrap.classList.toggle("hidden", tab !== "visual");
      trailerWrap.classList.toggle("hidden", tab !== "trailer");

      if (tab === "visual") {
        const imgEl = document.getElementById("detail-visual-img");
        if (media.posterUrl) {
          imgEl.src = media.posterUrl;
        } else {
          coverCanvas.classList.remove("hidden");
          visualWrap.classList.add("hidden");
        }
      }

      if (tab === "trailer") {
        stopTrackSynth();
        const ytEl = document.getElementById("detail-yt-iframe");
        const fbEl = document.getElementById("detail-trailer-fallback");
        if (media.youtubeId) {
          ytEl.src = `https://www.youtube.com/embed/${media.youtubeId}?autoplay=1&rel=0`;
          ytEl.classList.remove("hidden");
          fbEl.classList.add("hidden");
        } else {
          ytEl.classList.add("hidden");
          fbEl.classList.remove("hidden");
        }
      } else {
        const ytEl = document.getElementById("detail-yt-iframe");
        if (ytEl) ytEl.src = "";
      }
    });
  });
});
