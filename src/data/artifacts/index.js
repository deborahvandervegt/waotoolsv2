export const artifactsList = [
  {
    key: 'aspis',
    desc: 'Aspis',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'Oh stranger, tell the Lacedaemonians that we lie here, obedient to their words.',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 1.3, statDesc: 'Infantry Attack', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 6.7, statDesc: 'Infantry HP', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 7.8, statDesc: 'Mage Attack', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 5.5, statDesc: 'Damage Reduction for Infantry', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'bookofthoth',
    desc: 'Book Of Thoth',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'People who read the contents of this book get the means to master the land, sea, sky, and stars.',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 3.4, statDesc: 'Depot Capacity', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 16, statDesc: 'Research Speed', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Building Speed', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 5.5, statDesc: 'HP Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'bootsofspeed',
    desc: 'Boots of Speed',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'The one who wears them becomes the fastest person in the world.',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 3.4, statDesc: 'March Speed', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 29, statDesc: 'Monster Attack Speed', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Recruitment Speed Up', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 7, statDesc: 'Stamina Recovery', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'chukonu',
    desc: 'Chu-Ko-Nu',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'As known as a special crossbow of the highest caliber that fires ten piercing arrows with every shot.',

    skill: '',
    mainStatInc: 0.3,
    stars: [
      { star: 1, rank: 0, prevStat: 0, stat: 1.3, statDesc: 'Archer Attack', reqLevel: 1 },
      { star: 2, rank: 0, prevStat: 0, stat: 4.5, statDesc: 'Archer HP', reqLevel: 10 },
      { star: 3, rank: 0, prevStat: 0, stat: 6.5, statDesc: 'Infantry HP', reqLevel: 20 },
      { star: 3, rank: 1, prevStat: 4.5, stat: 5.6, statDesc: 'Archer HP', reqLevel: 20 },
      { star: 4, rank: 0, prevStat: 0, stat: 8.5, statDesc: 'Archer Damage', reqLevel: 30 },
      { star: 4, rank: 1, prevStat: 5.6, stat: 6.7, statDesc: 'Archer HP', reqLevel: 30 },
      { star: 4, rank: 2, prevStat: 6.5, stat: 7.8, statDesc: 'Infantry HP', reqLevel: 30 }
    ],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 1.3, statDesc: 'Archer Attack', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 8.5, statDesc: 'Archer Damage', reqLevel: 30 },
      { star: 3, shards: 160, rank: 0, prevStat: 5.6, stat: 6.7, statDesc: 'Archer HP', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 6.5, stat: 7.8, statDesc: 'Infantry HP', reqLevel: 30 }
    ]
  },
  {
    key: 'draconite',
    desc: 'Draconite',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'A piece of rock uncommonly rare that emits an eerie glow.',
    mainStatInc: 100,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 1100, statDesc: 'Max Wounded', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 16, statDesc: 'Building Speed', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Healing Speed', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 5.5, statDesc: 'Attack Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'emperorsCrown',
    desc: "Emperor's Crown",
    type: 'crown',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'The treasure once worn by Charlemagne symbolizes power, influence, and status.',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 3.4, statDesc: 'Monster Attack Speed', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 9, statDesc: 'Gather Speed Boost', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'Load Boost', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 8, statDesc: 'Infantry and Cavalry HP Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'lubushalberd',
    desc: 'Lubu’s Halberd',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'My swings and thrusts are legendary!',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 1.3, statDesc: 'Cavalry Attack', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 6.7, statDesc: 'Cavalry HP', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 7.8, statDesc: 'Archer Attack', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 5.5, statDesc: 'Damage Reduction for Cavalry', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'muramasa',
    desc: 'Muramasa',
    type: 'force',
    minLevel: 1,
    maxLevel: 30,
    quality: 'Blue',
    baseB: 864,
    info: 'An evil blade crafted by the swordsmith Muramasa known to cut everything that passed its way.',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 1.3, statDesc: 'Mage Attack', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 6.7, statDesc: 'Mage HP', reqLevel: 20 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 7.8, statDesc: 'Cavalry HP', reqLevel: 30 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 8.5, statDesc: 'Mage Damage', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'curtana',
    desc: 'Curtana',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'A sword by name of Curtana, forged by the same steel and temper as Joyeuse and Durendal',
    mainStatInc: 0.2,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4, statDesc: 'Damage Against Infantry Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 10.4, statDesc: 'Mage Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 11.7, statDesc: 'Mage HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.4, statDesc: 'Cavalry Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'Attack Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'draupnir',
    desc: 'Draupnir',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'A golden ring and a source of endless wealth',
    mainStatInc: 10000,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 30000,
        statDesc: 'Reduces Wood cost for Bulding',
        reqLevel: 1
      },
      {
        star: 2,
        shards: 80,
        rank: 0,
        prevStat: 0,
        stat: 234500,
        statDesc: 'Reduces Food cost for Building',
        reqLevel: 10
      },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 20, statDesc: 'Depot Capacity', reqLevel: 20 },
      {
        star: 4,
        shards: 280,
        rank: 0,
        prevStat: 0,
        stat: 56000,
        statDesc: 'Reduces Stone Costs for Building',
        reqLevel: 30
      },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 5500, statDesc: 'Max Wounded', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'durendal',
    desc: 'Durendal',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'The sword was brought by an angel to Charlemagne, who then gave it to the legendary paladin Roland.',
    mainStatInc: 0.2,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4, statDesc: 'Damage Against Cavalry Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 10.4, statDesc: 'Archer Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 11.7, statDesc: 'Archer HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.4, statDesc: 'Infantry Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'Attack Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'erebusCrown',
    desc: "Erebu's Crown",
    type: 'crown',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: "Deities of the Underworld made this crown. It's as if you can hear the murmur of Demons with its breathtaking magic.",
    mainStatInc: 0.2,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4, statDesc: 'Infantry and Cavalry HP Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 8.5, statDesc: 'Infantry Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'Angel HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 10, statDesc: 'Cavalry Attack', reqLevel: 30 },
      {
        star: 5,
        shards: 460,
        rank: 0,
        prevStat: 0,
        stat: 9.5,
        statDesc: 'Increase the Attack of Archers and Mages',
        reqLevel: 40
      }
    ],
    skill: []
  },
  {
    key: 'featherdress',
    desc: 'Feather Dress',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'A beautiful feathery coat exuding a pleasant fragrance, that allows its wearer to fly to the heavens.',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 2.4,
        statDesc: 'Reduces Damage taken from Archers',
        reqLevel: 1
      },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 10.4, statDesc: 'Infantry HP', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 11.7, statDesc: 'Infantry Attack', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.4, statDesc: 'Archer HP', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'HP Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'ganjiangmoye',
    desc: 'Ganjiang Moye',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'Forged by body and soul, the hero and heroine swords, Gan Jiang and Mo Ye!',
    mainStatInc: 0.2,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4, statDesc: 'HP Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 10.4, statDesc: 'Infantry HP', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 11.7, statDesc: 'Infantry Attack', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.4, statDesc: 'Cavalry Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 7, statDesc: 'Troops Damage taken Reduction', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'gusli',
    desc: 'Gusli',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 893,
    info: 'Use a wonderful piece of music to inspire the soldiers.',
    skill: '',
    mainStatInc: 0.4,
    stars: [
      { star: 1, rank: 0, prevStat: 0, stat: 2.4, statDesc: 'Reduces Damage taken from Mages', reqLevel: 1 },
      { star: 2, rank: 1, prevStat: 0, stat: 4.5, statDesc: 'Attack Boost', reqLevel: 10 },
      { star: 3, rank: 0, prevStat: 0, stat: 6, statDesc: 'Damage Against Angels Boost', reqLevel: 20 },
      { star: 3, rank: 1, prevStat: 4.5, stat: 5.3, statDesc: 'Attack Boost', reqLevel: 20 },
      { star: 4, rank: 0, prevStat: 0, stat: 11, statDesc: 'Cavalry Attack', reqLevel: 30 },
      { star: 4, rank: 1, prevStat: 5.3, stat: 6.1, statDesc: 'Attack Boost', reqLevel: 30 },
      { star: 4, rank: 2, prevStat: 6, stat: 7, statDesc: 'Damage Against Angels Boost', reqLevel: 30 },
      { star: 5, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'HP Boost', reqLevel: 40 },
      { star: 5, rank: 1, prevStat: 6.1, stat: 6.9, statDesc: 'Attack Boost', reqLevel: 40 },
      { star: 5, rank: 2, prevStat: 7, stat: 8, statDesc: 'Damage Against Angels Boost', reqLevel: 40 },
      { star: 5, rank: 3, prevStat: 11, stat: 12.4, statDesc: 'Cavalry Attack', reqLevel: 40 }
    ],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 2.4,
        statDesc: 'Reduces Damage taken from Mages',
        reqLevel: 1
      },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'HP Boost', reqLevel: 40 },
      { star: 3, shards: 160, rank: 0, prevStat: 6.1, stat: 6.9, statDesc: 'Attack Boost', reqLevel: 40 },
      { star: 4, shards: 280, rank: 0, prevStat: 7, stat: 8, statDesc: 'Damage Against Angels Boost', reqLevel: 40 },
      { star: 5, shards: 460, rank: 0, prevStat: 11, stat: 12.4, statDesc: 'Cavalry Attack', reqLevel: 40 }
    ]
  },
  {
    key: 'joyeuse',
    desc: 'Joyeuse',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'The sword of Charles the Great, said to change colors thirty times a day!',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 2.4, statDesc: 'Infantry Attack', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 6100, statDesc: 'Army Size Limit', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 20, statDesc: 'Recruitment Speed Up', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 27, statDesc: 'March Speed', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 9.5, statDesc: 'Attack Boost', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'magiclamp',
    desc: 'MagicLamp',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'I will give three wishes to the one who rescues me.',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 2.4, statDesc: 'Angel HP', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 10.4, statDesc: 'Mage HP', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 11.7, statDesc: 'Angel Defense', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 8.5, statDesc: 'HP Boost', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 14, statDesc: 'Angel Attack', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'necronomicon',
    desc: 'Necronomicon',
    type: 'force',
    minLevel: 1,
    maxLevel: 40,
    quality: 'Purple',
    baseB: 940,
    info: 'That is not dead which can eternal lie. And with strange aeons even death may die.',
    mainStatInc: 125,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 625, statDesc: 'Max Golems', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 31.1, statDesc: 'Golem Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 35, statDesc: 'Golem HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 38, statDesc: 'Golem Defense', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 22, statDesc: 'Guardian Conversion', reqLevel: 40 }
    ],
    skill: []
  },
  {
    key: 'angelsword',
    desc: 'Angel Sword',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The razor-sharp sword that belonged to Michael the Archangel!',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4.3, statDesc: 'HP Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Cavalry Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Infantry Attack', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 18.5, statDesc: 'Archer Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 20, statDesc: 'Mage Attack', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 5800, statDesc: 'Angel Limit', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'Increases Attack, Defense, and HP in Realm Invasion and Elite War by 20%' }]
  },
  {
    key: 'apollosbow',
    desc: "Apollo's Bow",
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The arrows fired By Apollo never miss',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: [], prevStat: 0, stat: 4.3, statDesc: 'Damage Against Cavalry Boost', reqLevel: 1 },
      {
        star: 2,
        shards: 80,
        rank: [{ r: 1, stat: 9, statDesc: 'Archer Attack' }],
        prevStat: 0,
        stat: 7.5,
        statDesc: 'Archer Attack',
        reqLevel: 10
      },
      {
        star: 3,
        shards: 160,
        rank: [
          { r: 1, stat: 10.5, statDesc: 'Archer Attack' },
          { r: 2, stat: 8.5, statDesc: 'Damage Against Angels Boost' }
        ],
        prevStat: 0,
        stat: 7.5,
        statDesc: 'Damage Against Angels Boost',
        reqLevel: 20
      },
      {
        star: 4,
        shards: 280,
        rank: [
          { r: 1, stat: 12.5, statDesc: 'Archer Attack' },
          { r: 2, stat: 10, statDesc: 'Damage Against Angels Boost' },
          { r: 3, stat: 16, statDesc: 'Infantry Attack' }
        ],
        prevStat: 0,
        stat: 14,
        statDesc: 'Infantry Attack',
        reqLevel: 30
      },
      {
        star: 5,
        shards: 460,
        rank: [
          { r: 1, stat: 15, statDesc: 'Archer Attack' },
          { r: 2, stat: 12, statDesc: 'Damage Against Angels Boost' },
          { r: 3, stat: 18.5, statDesc: 'Infantry Attack' },
          { r: 4, stat: 20, statDesc: 'Cavalry HP' }
        ],
        prevStat: 0,
        stat: 17.2,
        statDesc: 'Cavalry HP',
        reqLevel: 40
      },
      { star: 6, shards: 700, rank: [], prevStat: 0, stat: 11, statDesc: 'Troops Damage', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'My Lords Troop have a 7% change of a Power Strike, dealing 1.5 times Damage.' }]
  },
  {
    key: 'athenasaegis',
    desc: "Athena's Aegis",
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The shield of the goddess Athena. At the center is the head of Medusa, where a single gaze will turn men to stone.',
    mainStatInc: 0.5,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 3.5,
        statDesc: 'Reduces Damage taken from Archers',
        reqLevel: 1
      },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Infantry Defense', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Infantry HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.5, statDesc: 'HP Boost', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 10, statDesc: 'Troops Damage taken Reduction', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 15, statDesc: 'Damage Reduction for Infantry', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'Within 1hr after you use the Skill, your Melee Troops get a Shield at the start of the battle. Each Shield can absorb Troops HPx15% Damage to protect your Melee Troops (up to 800000 Melee Troops). Shield lasts for up to 10 seconds.'
      }
    ]
  },
  {
    key: 'brionac',
    desc: 'Brionac',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'Known as the Long-Arm, the enemy is never too far from its reach.',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4.3, statDesc: 'Damage Against Infantry Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Mage Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Mage HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 18.5, statDesc: 'Cavalry Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 13.5, statDesc: 'Attack Boost', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 11, statDesc: 'Troops Damage taken Reduction', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'When Attacking lords, use the magic-piercing Gunslinger to Attack 6 enemy targets. Damage is (the number of surviving Troops) * 12. Cooldown: 12 seconds.'
      }
    ]
  },
  {
    key: 'caledfwlch',
    desc: 'Caledfwlch',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The finest sword also known as Cut Steel that sliced through steel as through wood!',
    mainStatInc: 0.5,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 3.5,
        statDesc: 'Reduces Damage taken from Mages',
        reqLevel: 1
      },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 11, statDesc: 'Damage Against Angels Boost', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Cavalry Attack', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.5, statDesc: 'Attack Boost', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 13, statDesc: 'HP Boost', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 22, statDesc: 'Cavalry HP', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'When Attacking lords, cast 3 sets of Lightning Balls towards the enemys position. Damage is (the number of your surviving Troops) * 21 and have 20% change of making the targets Attack stop for 2 seconds. Cooldown: 10 seconds.'
      }
    ]
  },
  {
    key: 'cupofjamshid',
    desc: 'Cup of Jamshid',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'It is believed that all seven heavens of the universe could be observed by looking into it.',
    mainStatInc: 200,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 1100, statDesc: 'Max Golems', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 48, statDesc: 'Golem Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 52.5, statDesc: 'Golem HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 56.5, statDesc: 'Golem Defense', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 27, statDesc: 'Healing Speed', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 15, statDesc: 'HP Boost', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'Increases the Wounded Limit in Hospital by 20%.' }]
  },
  {
    key: 'emperorsword',
    desc: 'Emperor Sword',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'Forged with bronze from the Shoushan Mountain, it holds infinite power that drives away demons.',
    mainStatInc: 0.5,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 3.5,
        statDesc: 'Reduces Damage taken from Archers',
        reqLevel: 1
      },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Infantry HP', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Infantry Attack', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 18.5, statDesc: 'Archer HP', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 10, statDesc: 'Troops Damage taken Reduction', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 15, statDesc: 'Attack Boost', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'During your first solo attack after using the skill, killing 5% of wounded enemies in this battle (takes effect when attacking Castles or resource mine.'
      }
    ]
  },
  {
    key: 'eyeofhorus',
    desc: 'Eye of Horus',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The eye of Horus used to symbolize sacrifice, healing restoration and protection',
    mainStatInc: 2200,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 26200,
        statDesc: 'Reduces Stone costs for Bulding',
        reqLevel: 1
      },
      {
        star: 2,
        shards: 80,
        rank: 0,
        prevStat: 0,
        stat: 14.5,
        statDesc: 'Damage increased when defending',
        reqLevel: 10
      },
      {
        star: 3,
        shards: 160,
        rank: 0,
        prevStat: 0,
        stat: 34000,
        statDesc: 'Reduce the Iron cost for Building',
        reqLevel: 20
      },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 7500, statDesc: 'Max Wounded', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 18, statDesc: 'Defending Army Defense', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 15, statDesc: 'HP Boost', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'Increases the Rally Troops Limit by 20%.' }]
  },
  {
    key: 'excalibur',
    desc: 'Excalibur',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'Whoso pulleth out this sword of this stone and anvil, is rightwise king born',
    skill: [
      {
        level: 1,
        statDesc:
          'Select a Castle to make its Defense Troops reduce damage dealt by 6% for 12Hr. The effect cant be stacked'
      }
    ],
    mainStatInc: 0.3,
    stars: [
      { star: 1, rank: 0, prevStat: 0, stat: 4.3, statDesc: 'Attack Boost', reqLevel: 1 },
      { star: 2, rank: 0, prevStat: 0, stat: 7.5, statDesc: 'Cavalry Attack', reqLevel: 10 },
      { star: 2, rank: 1, prevStat: 7.5, stat: 9, statDesc: 'Cavalry Attack', reqLevel: 10 },
      { star: 3, rank: 0, prevStat: 0, stat: 6500, statDesc: 'Army Size Limit', reqLevel: 20 },
      { star: 3, rank: 1, prevStat: 9, stat: 10.5, statDesc: 'Cavalry Attack', reqLevel: 20 },
      { star: 3, rank: 2, prevStat: 6500, stat: 7200, statDesc: 'Army Size Limit', reqLevel: 20 },
      { star: 4, rank: 0, prevStat: 0, stat: 14, statDesc: 'Infantry Attack', reqLevel: 30 },
      { star: 4, rank: 1, prevStat: 10.5, stat: 12.5, statDesc: 'Cavalry Attack', reqLevel: 30 },
      { star: 4, rank: 2, prevStat: 7200, stat: 7900, statDesc: 'Army Size Limit', reqLevel: 30 },
      { star: 4, rank: 3, prevStat: 14, stat: 16, statDesc: 'Infantry Attack', reqLevel: 30 },
      { star: 5, rank: 0, prevStat: 0, stat: 22, statDesc: 'March Speed', reqLevel: 40 },
      { star: 5, rank: 1, prevStat: 12.5, stat: 15, statDesc: 'Cavalry Attack', reqLevel: 40 },
      { star: 5, rank: 2, prevStat: 7900, stat: 8700, statDesc: 'Army Size Limit', reqLevel: 40 },
      { star: 5, rank: 3, prevStat: 16, stat: 18.5, statDesc: 'Infantry Attack', reqLevel: 40 },
      { star: 5, rank: 4, prevStat: 22, stat: 31, statDesc: 'March Speed', reqLevel: 40 },
      { star: 6, rank: 0, prevStat: 0, stat: 11, statDesc: 'Troops Damage', reqLevel: 50 }
    ],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4.3, statDesc: 'Attack Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 12.5, stat: 15, statDesc: 'Cavalry Attack', reqLevel: 40 },
      { star: 3, shards: 160, rank: 0, prevStat: 7900, stat: 8700, statDesc: 'Army Size Limit', reqLevel: 40 },
      { star: 4, shards: 280, rank: 0, prevStat: 16, stat: 18.5, statDesc: 'Infantry Attack', reqLevel: 40 },
      { star: 5, shards: 460, rank: 0, prevStat: 22, stat: 31, statDesc: 'March Speed', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 11, statDesc: 'Troops Damage', reqLevel: 50 }
    ]
  },
  {
    key: 'fireDemonsCrown',
    desc: "Fire Demon's Crown",
    type: 'crown',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: "Legend has it that placing the Fire Demon's Crown in flames can conjure the fire giant that will destroy the world.",
    mainStatInc: 0.2,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 4,
        statDesc: 'Damage Against Infantry and Cavalry Boost',
        reqLevel: 1
      },
      {
        star: 2,
        shards: 80,
        rank: 0,
        prevStat: 0,
        stat: 14,
        statDesc: 'Infantry and Cavalry HP Boost',
        reqLevel: 10
      },
      {
        star: 3,
        shards: 160,
        rank: 0,
        prevStat: 0,
        stat: 13,
        statDesc: 'Attack Boost',
        reqLevel: 20
      },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 14, statDesc: 'Damage Against Angels Boost', reqLevel: 30 },
      {
        star: 5,
        shards: 460,
        rank: 0,
        prevStat: 0,
        stat: 16,
        statDesc: 'Infantry and Cavalry Attack Boost',
        reqLevel: 40
      },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 11, statDesc: 'Troops Damage', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: "When the battle stars, the Fire Demon uses flames to fortify your Troop's weapons, increasing Attack by 6% and increasing Damage by 4.8% when your troops attack the enemy's infantry and Cavalry."
      }
    ]
  },
  {
    key: 'goldenarmor',
    desc: 'Golden Armor',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'This splendid armor is the greatest gift for the Einherjar!',
    mainStatInc: 0.5,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 3.5,
        statDesc: 'Reduces Damage taken from Mages',
        reqLevel: 1
      },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Cavalry Defense', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Cavalry HP', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.5, statDesc: 'HP Boost', reqLevel: 30 },
      {
        star: 5,
        shards: 460,
        rank: 0,
        prevStat: 0,
        stat: 13.5,
        statDesc: 'Damage Reduction for Calvary',
        reqLevel: 40
      },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 11, statDesc: 'Troops Damage taken Reduction', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'Reduces the Damage of Troops that Attack your Castle by 5%.' }]
  },
  {
    key: 'heavenlyspear',
    desc: 'Heavenly Spear',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'To his enemies, a dragon so horrid and dreadful.',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4.3, statDesc: 'Damage Against Cavalry Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Archer HP', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 11.5, statDesc: 'Attack Boost', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 18.5, statDesc: 'Archer Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 10, statDesc: 'Troops Damage', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 22, statDesc: 'Archer Damage', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'When attacking Lords, use Joans Spear to strike the enemys unit with the most Troops. Damage is (the number of your surviving Troops) * 40. Cooldown: 8 seconds.'
      }
    ]
  },
  {
    key: 'holyrobe',
    desc: 'Holy Robe',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'Undying love of the Blessed Virgin granted to those who follow her.',
    mainStatInc: 0.5,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 3.5, statDesc: 'Angel HP', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15.5, statDesc: 'Mage HP', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 17, statDesc: 'Angel Defense', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 12.5, statDesc: 'Damage Reduction for Angels', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 13.5, statDesc: 'HP Boost', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 22, statDesc: 'Angel Attack', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'Recover 8% of Wounded instantly after every battle is over.' }]
  },
  {
    key: 'laevateinn',
    desc: 'Laevateinn',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'A weapon capable of fighting on its own, slaying the enemies of the person who wields this sword.',
    mainStatInc: 300,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 2300, statDesc: 'Army Size Limit', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 10.5, statDesc: 'Attack Boost', reqLevel: 10 },
      {
        star: 3,
        shards: 160,
        rank: 0,
        prevStat: 0,
        stat: 17,
        statDesc: 'Reduces Damage taken from Mages',
        reqLevel: 20
      },
      {
        star: 4,
        shards: 280,
        rank: 0,
        prevStat: 0,
        stat: 18.5,
        statDesc: 'Reduces Damage taken from Archers ',
        reqLevel: 30
      },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 10, statDesc: 'Troops Damage', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 15, statDesc: 'HP Boost', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'When attacking opponents, launch the Victory Horn every 5 seconds to increase the Attack of all your Troops by 3%. The effect can be stacked up to 4% times until the battle is over.'
      }
    ]
  },
  {
    key: 'mjolnir',
    desc: 'Mjolnir',
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The weapon of Thor that holds great power!',
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 4.3, statDesc: 'Damage Against Infantry Boost', reqLevel: 1 },
      { star: 2, shards: 80, rank: 0, prevStat: 0, stat: 15, statDesc: 'Infantry Attack', reqLevel: 10 },
      { star: 3, shards: 160, rank: 0, prevStat: 0, stat: 12, statDesc: 'Attack Boost', reqLevel: 20 },
      { star: 4, shards: 280, rank: 0, prevStat: 0, stat: 18.5, statDesc: 'Mage Attack', reqLevel: 30 },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 20, statDesc: 'Infantry HP', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 22, statDesc: 'Mage Damage', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: 'Select a Castle to make its Defense Troops increase Damage Taken by 6% for 12Hr. The effect cant be stacked.'
      }
    ]
  },
  {
    key: 'poseidonstrident',
    desc: "Poseidon's Trident",
    type: 'force',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: 'The symbol of the Atlantis Throne. Possess this Trident to rule the ocean.',
    mainStatInc: 0.4,
    stars: [],
    starsGeneral: [
      { star: 1, shards: 20, rank: 0, prevStat: 0, stat: 5.2, statDesc: 'Cross-Realm Attack Boost', reqLevel: 1 },
      {
        star: 2,
        shards: 80,
        rank: 0,
        prevStat: 0,
        stat: 12.5,
        statDesc: 'Cross-Realm Damage To Cavalry Boost',
        reqLevel: 10
      },
      {
        star: 3,
        shards: 160,
        rank: 0,
        prevStat: 0,
        stat: 11300,
        statDesc: 'Cross-Realm Army Size Limit',
        reqLevel: 20
      },
      {
        star: 4,
        shards: 280,
        rank: 0,
        prevStat: 0,
        stat: 15.5,
        statDesc: 'Cross-Realm Damage To Infantry Boost',
        reqLevel: 30
      },
      { star: 5, shards: 460, rank: 0, prevStat: 0, stat: 16.5, statDesc: 'Cross-Realm Troops HP', reqLevel: 40 },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 14.3, statDesc: 'Cross-Realm Troops Damage', reqLevel: 50 }
    ],
    skill: [{ level: 1, desc: 'During the Cross-Realm event, increases the max limit of the Marching Army by 6%.' }]
  },
  {
    key: 'thunderboltCrown',
    desc: 'Thunderbolt Crown',
    type: 'crown',
    minLevel: 1,
    maxLevel: 50,
    quality: 'Orange',
    baseB: 1410,
    info: "The Thunderbolt Crown contains the fiercest elements of thunder. It's said to control changes in the weather according to its bearer's mood.",
    mainStatInc: 0.3,
    stars: [],
    starsGeneral: [
      {
        star: 1,
        shards: 20,
        rank: 0,
        prevStat: 0,
        stat: 6,
        statDesc: 'Increase the Attack of Archers and Mages',
        reqLevel: 1
      },
      {
        star: 2,
        shards: 80,
        rank: 0,
        prevStat: 0,
        stat: 11.5,
        statDesc: 'Enemy Troops HP Reduction',
        reqLevel: 10
      },
      {
        star: 3,
        shards: 160,
        rank: 0,
        prevStat: 0,
        stat: 17,
        statDesc: 'Angel Attack',
        reqLevel: 20
      },
      {
        star: 4,
        shards: 280,
        rank: 0,
        prevStat: 0,
        stat: 12.5,
        statDesc: 'Enemy Troops Attack Reduction',
        reqLevel: 30
      },
      {
        star: 5,
        shards: 460,
        rank: 0,
        prevStat: 0,
        stat: 16,
        statDesc: 'Archers and Mages HP Boost',
        reqLevel: 40
      },
      { star: 6, shards: 700, rank: 0, prevStat: 0, stat: 11, statDesc: 'Troops Damage taken Reduction', reqLevel: 50 }
    ],
    skill: [
      {
        level: 1,
        desc: "When the battle stars, Thunder's Power entwines on my Lord's Archers and Mages, increasing their Attack by 6% and increasing their Damage deal by 4.8%."
      }
    ]
  }
]

export const crownSlots = [
  {
    key: 1,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: 0,
    toStar: 0,
    maxLevel: 30,
    type: 'crown',
    minLevel: 1,
    selectedRank: { star: 4, rank: 0 },
    artifactDetails: {},
    artifact: {}
  },
  {
    key: 2,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: { star: 1, rank: 0 },
    toStar: { star: 1, rank: 0 },
    maxLevel: 30,
    type: 'crown',
    minLevel: 1,
    selectedRank: {},
    artifactDetails: {},
    artifact: {}
  },
  {
    key: 3,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: { star: 1, rank: 0 },
    toStar: { star: 1, rank: 0 },
    maxLevel: 30,
    type: 'crown',
    minLevel: 1,
    selectedRank: {},
    artifactDetails: {},
    artifact: {}
  }
]

export const forceSlots = [
  {
    key: 1,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: 0,
    toStar: 0,
    maxLevel: 30,
    type: 'force',
    minLevel: 1,
    selectedRank: { star: 4, rank: 0 },
    artifactDetails: {},
    artifact: {}
  },
  {
    key: 2,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: { star: 1, rank: 0 },
    toStar: { star: 1, rank: 0 },
    maxLevel: 30,
    type: 'force',
    minLevel: 1,
    selectedRank: {},
    artifactDetails: {},
    artifact: {}
  },
  {
    key: 3,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: { star: 1, rank: 0 },
    toStar: { star: 1, rank: 0 },
    maxLevel: 30,
    type: 'force',
    minLevel: 1,
    selectedRank: {},
    artifactDetails: {},
    artifact: {}
  },
  {
    key: 4,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: { star: 1, rank: 0 },
    toStar: { star: 1, rank: 0 },
    maxLevel: 30,
    type: 'force',
    minLevel: 1,
    selectedRank: {},
    artifactDetails: {},
    artifact: {}
  },
  {
    key: 5,
    type: 1,
    level: 1,
    expNeeded: 0,
    from: 0,
    to: 0,
    shardsNeeded: 0,
    fromStar: { star: 1, rank: 0 },
    toStar: { star: 1, rank: 0 },
    maxLevel: 30,
    type: 'force',
    minLevel: 1,
    selectedRank: {},
    artifactDetails: {},
    artifact: {}
  }
]

export const artifactExperience = {
  blue: [
    { level: 1, exp: 0 },
    { level: 2, exp: 30 },
    { level: 3, exp: 70 },
    { level: 4, exp: 130 },
    { level: 5, exp: 260 },
    { level: 6, exp: 420 },
    { level: 7, exp: 640 },
    { level: 8, exp: 900 },
    { level: 9, exp: 1350 },
    { level: 10, exp: 1950 },
    { level: 11, exp: 2700 },
    { level: 12, exp: 4050 },
    { level: 13, exp: 5850 },
    { level: 14, exp: 7880 },
    { level: 15, exp: 10500 },
    { level: 16, exp: 13800 },
    { level: 17, exp: 17130 },
    { level: 18, exp: 20610 },
    { level: 19, exp: 24200 },
    { level: 20, exp: 27920 },
    { level: 21, exp: 31920 },
    { level: 22, exp: 36050 },
    { level: 23, exp: 40300 },
    { level: 24, exp: 44600 },
    { level: 25, exp: 49050 },
    { level: 26, exp: 53610 },
    { level: 27, exp: 58290 },
    { level: 28, exp: 63090 },
    { level: 29, exp: 68010 },
    { level: 30, exp: 73050 }
  ],
  purple: [
    { level: 1, exp: 0 },
    { level: 2, exp: 40 },
    { level: 3, exp: 80 },
    { level: 4, exp: 150 },
    { level: 5, exp: 290 },
    { level: 6, exp: 480 },
    { level: 7, exp: 720 },
    { level: 8, exp: 1020 },
    { level: 9, exp: 1530 },
    { level: 10, exp: 2210 },
    { level: 11, exp: 3600 },
    { level: 12, exp: 4590 },
    { level: 13, exp: 6630 },
    { level: 14, exp: 8920 },
    { level: 15, exp: 11900 },
    { level: 16, exp: 15600 },
    { level: 17, exp: 19500 },
    { level: 18, exp: 23400 },
    { level: 19, exp: 27500 },
    { level: 20, exp: 31700 },
    { level: 21, exp: 36200 },
    { level: 22, exp: 40900 },
    { level: 23, exp: 45650 },
    { level: 24, exp: 50550 },
    { level: 25, exp: 55590 },
    { level: 26, exp: 60800 },
    { level: 27, exp: 66100 },
    { level: 28, exp: 71500 },
    { level: 29, exp: 77100 },
    { level: 30, exp: 82800 },
    { level: 31, exp: 88700 },
    { level: 32, exp: 94700 },
    { level: 33, exp: 100000 },
    { level: 34, exp: 107000 },
    { level: 35, exp: 113600 },
    { level: 36, exp: 120200 },
    { level: 37, exp: 127000 },
    { level: 38, exp: 134000 },
    { level: 39, exp: 141000 },
    { level: 40, exp: 148500 }
  ],
  orange: [
    { level: 1, exp: 0 },
    { level: 2, exp: 50 },
    { level: 3, exp: 100 },
    { level: 4, exp: 180 },
    { level: 5, exp: 340 },
    { level: 6, exp: 560 },
    { level: 7, exp: 850 },
    { level: 8, exp: 1200 },
    { level: 9, exp: 1800 },
    { level: 10, exp: 2600 },
    { level: 11, exp: 3600 },
    { level: 12, exp: 5400 },
    { level: 13, exp: 7800 },
    { level: 14, exp: 10500 },
    { level: 15, exp: 14010 },
    { level: 16, exp: 18350 },
    { level: 17, exp: 22840 },
    { level: 18, exp: 27480 },
    { level: 19, exp: 32270 },
    { level: 20, exp: 37220 },
    { level: 21, exp: 42570 },
    { level: 22, exp: 48060 },
    { level: 23, exp: 53690 },
    { level: 24, exp: 59470 },
    { level: 25, exp: 65400 },
    { level: 26, exp: 71480 },
    { level: 27, exp: 77720 },
    { level: 28, exp: 84120 },
    { level: 29, exp: 90680 },
    { level: 30, exp: 97400 },
    { level: 31, exp: 104290 },
    { level: 32, exp: 111350 },
    { level: 33, exp: 118590 },
    { level: 34, exp: 126010 },
    { level: 35, exp: 133610 },
    { level: 36, exp: 141400 },
    { level: 37, exp: 149380 },
    { level: 38, exp: 157550 },
    { level: 39, exp: 165920 },
    { level: 40, exp: 174490 },
    { level: 41, exp: 183260 },
    { level: 42, exp: 192240 },
    { level: 43, exp: 201440 },
    { level: 44, exp: 210850 },
    { level: 45, exp: 220490 },
    { level: 46, exp: 230350 },
    { level: 47, exp: 240450 },
    { level: 48, exp: 250780 },
    { level: 49, exp: 261350 },
    { level: 50, exp: 272170 }
  ]
}

export const artifactsExperienceDetails = {
  blue: {
    maxLevel: 30,
    shards: [
      { star: 1, shards: 20, rank: { shard: 20, qty: 1 } },
      { star: 2, shards: 80, rank: { shard: 80, qty: 1 } },
      { star: 3, shards: 160, rank: { shard: 160, qty: 1 } },
      { star: 4, shards: 280, rank: { shard: 280, qty: 1 } }
    ]
  },
  purple: {
    maxLevel: 40,
    shards: [
      { star: 1, shards: 20, rank: { shard: 20, qty: 1 } },
      { star: 2, shards: 80, rank: { shard: 80, qty: 1 } },
      { star: 3, shards: 160, rank: { shard: 160, qty: 1 } },
      { star: 4, shards: 280, rank: { shard: 280, qty: 1 } },
      { star: 5, shards: 460, rank: { shard: 460, qty: 1 } }
    ]
  },
  orange: {
    maxLevel: 50,
    shards: [
      { star: 1, shards: 20, rank: { shard: 20, qty: 1 } },
      { star: 2, shards: 80, rank: { shard: 80, qty: 1 } },
      { star: 3, shards: 160, rank: { shard: 80, qty: 2 } },
      { star: 4, shards: 280, rank: { shard: 93, qty: 3 } },
      { star: 5, shards: 460, rank: { shard: 115, qty: 4 } },
      { star: 6, shards: 700, rank: { shard: 140, qty: 5 } }
    ]
  }
}

export const artifactsTemplates = [
  { key: 'custom', desc: 'Custom', config: [] },
  {
    key: 'arch_cav_1',
    desc: 'Arch / Cav - Gold Moderate',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'heavenlyspear' },
      { key: 'caledfwlch' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'arch_cav_2',
    desc: 'Arch / Cav - Gold VIP',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'heavenlyspear' },
      { key: 'laevateinn' },
      { key: 'poseidonstrident' }
    ]
  },
  {
    key: 'arch_cav_3',
    desc: 'Arch / Cav - PvP 1',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'heavenlyspear' },
      { key: 'brionac' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'arch_cav_4',
    desc: 'Arch / Cav - PvP 2',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'heavenlyspear' },
      { key: 'brionac' },
      { key: 'laevateinn' }
    ]
  },
  {
    key: 'arch_cav_5',
    desc: 'Arch / Cav - F2P 1',
    config: [{ key: 'apollosbow' }, { key: 'chukonu' }, { key: 'durendal' }, { key: 'gusli' }, { key: 'excalibur' }]
  },
  {
    key: 'arch_cav_6',
    desc: 'Arch / Cav - F2P 2',
    config: [{ key: 'lubushalberd' }, { key: 'chukonu' }, { key: 'durendal' }, { key: 'gusli' }, { key: 'excalibur' }]
  },

  {
    key: 'arch_infantry_1',
    desc: 'Arch / Infantry - Gold Moderate',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'heavenlyspear' },
      { key: 'caledfwlch' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'arch_infantry_2',
    desc: 'Arch / Infantry - Gold VIP',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'heavenlyspear' },
      { key: 'laevateinn' },
      { key: 'poseidonstrident' }
    ]
  },
  {
    key: 'arch_infantry_3',
    desc: 'Arch / Infantry - PvP 1',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'heavenlyspear' },
      { key: 'brionac' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'arch_infantry_4',
    desc: 'Arch / Infantry - PvP 2',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'heavenlyspear' },
      { key: 'brionac' },
      { key: 'laevateinn' }
    ]
  },
  {
    key: 'arch_infantry_5',
    desc: 'Arch / Infantry - F2P 1',
    config: [{ key: 'apollosbow' }, { key: 'chukonu' }, { key: 'durendal' }, { key: 'aspis' }, { key: 'excalibur' }]
  },
  {
    key: 'arch_infantry_6',
    desc: 'Arch / Infantry - F2P 2',
    config: [{ key: 'gusli' }, { key: 'chukonu' }, { key: 'durendal' }, { key: 'aspis' }, { key: 'excalibur' }]
  },

  {
    key: 'mage_cav_1',
    desc: 'Mage / Cav - Gold Moderate',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'mjolnir' },
      { key: 'caledfwlch' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'mage_cav_2',
    desc: 'Mage / Cav - Gold VIP',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'mjolnir' },
      { key: 'laevateinn' },
      { key: 'poseidonstrident' }
    ]
  },
  {
    key: 'mage_cav_3',
    desc: 'Mage / Cav - PvP 1',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'mjolnir' },
      { key: 'brionac' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'mage_cav_4',
    desc: 'Mage / Cav - PvP 2',
    config: [
      { key: 'apollosbow' },
      { key: 'goldenarmor' },
      { key: 'mjolnir' },
      { key: 'brionac' },
      { key: 'laevateinn' }
    ]
  },
  {
    key: 'mage_cav_5',
    desc: 'Mage / Cav - F2P 1',
    config: [{ key: 'apollosbow' }, { key: 'muramasa' }, { key: 'curtana' }, { key: 'gusli' }, { key: 'excalibur' }]
  },
  {
    key: 'mage_cav_6',
    desc: 'Mage / Cav - F2P 2',
    config: [{ key: 'lubushalberd' }, { key: 'muramasa' }, { key: 'curtana' }, { key: 'gusli' }, { key: 'excalibur' }]
  },

  {
    key: 'mage_infantry_1',
    desc: 'Mage / Infantry - Gold Moderate',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'mjolnir' },
      { key: 'caledfwlch' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'mage_infantry_2',
    desc: 'Mage / Infantry - Gold VIP',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'mjolnir' },
      { key: 'laevateinn' },
      { key: 'poseidonstrident' }
    ]
  },
  {
    key: 'mage_infantry_3',
    desc: 'Mage / Infantry - PvP 1',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'mjolnir' },
      { key: 'brionac' },
      { key: 'excalibur' }
    ]
  },
  {
    key: 'mage_infantry_4',
    desc: 'Mage / Infantry - PvP 2',
    config: [
      { key: 'apollosbow' },
      { key: 'athenasaegis' },
      { key: 'mjolnir' },
      { key: 'brionac' },
      { key: 'laevateinn' }
    ]
  },
  {
    key: 'mage_infantry_5',
    desc: 'Mage / Infantry - F2P 1',
    config: [{ key: 'apollosbow' }, { key: 'muramasa' }, { key: 'curtana' }, { key: 'aspis' }, { key: 'excalibur' }]
  },
  {
    key: 'mage_infantry_6',
    desc: 'Mage / Infantry - F2P 2',
    config: [{ key: 'gusli' }, { key: 'muramasa' }, { key: 'curtana' }, { key: 'aspis' }, { key: 'excalibur' }]
  }
]

export const eventsInfo = [
  { key: 'infinityShop', checked: false, nombre: 'Infinity Shop', expTotal: 10000, expItemsc: '10x 500 + 5x 1k' },
  { key: 'starRuinsShop', checked: false, nombre: 'Star Ruins Shop', expTotal: 10000, expItemsc: '10x 500 + 5x 1k' },
  { key: 'monsterSwarn', checked: false, nombre: 'Weekly Monster Swarn', expTotal: 42000, expItemsc: '6x 500 + 11x 1k' }
]
