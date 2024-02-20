export const buildingLevel = {
  castle: [
    { l: 30 },
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 },
    { l: 41, sl: 'sacredCastle', el: 1 },
    { l: 42, sl: 'sacredCastle', el: 2 },
    { l: 43, sl: 'sacredCastle', el: 3 }
  ],
  wall: [
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 },
    { l: 41 },
    { l: 42 },
    { l: 43 }
  ],
  barracks: [
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 },
    { l: 41, sl: 'sacredBarrack', el: 1 },
    { l: 42, sl: 'sacredBarrack', el: 2 },
    { l: 43, sl: 'sacredBarrack', el: 3 }
  ],
  drillGrounds: [
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 }
  ],
  guardianTemple: [{ l: 1 }, { l: 2 }, { l: 3 }, { l: 4 }, { l: 5 }, { l: 6 }, { l: 7 }, { l: 8 }, { l: 9 }],
  depot: [
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 },
    { l: 41, sl: 'sacredDepot', el: 1 }
  ],
  embassy: [
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 }
  ],
  blacksmith: [
    { l: 30 },
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 }
  ],
  college: [
    { l: 30 },
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 }
  ],
  hospital: [
    { l: 30 },
    { l: 31 },
    { l: 32 },
    { l: 33 },
    { l: 34 },
    { l: 35 },
    { l: 36 },
    { l: 37 },
    { l: 38 },
    { l: 39 },
    { l: 40 },
    { l: 41, sl: 'sacredHospital', el: 1 },
    { l: 42, sl: 'sacredHospital', el: 2 }
  ]
}

export const buildingList = [
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 31,
    rss: { f: 61500000, w: 26600000, s: 7400000, i: 4200000, a: 1210 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 32,
    rss: { f: 76600000, w: 31900000, s: 9800000, i: 5600000, a: 2160 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 33,
    rss: { f: 93800000, w: 37500000, s: 12900000, i: 7300000, a: 4580 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 34,
    rss: { f: 112900000, w: 43200000, s: 16700000, i: 9300000, a: 7460 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 35,
    rss: { f: 135800000, w: 49400000, s: 21400000, i: 11900000, a: 11210 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 36,
    rss: { f: 143790000, w: 53880000, s: 23760000, i: 13410000, a: 11890 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 37,
    rss: { f: 152040000, w: 58530000, s: 26210000, i: 14950000, a: 13190 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 38,
    rss: { f: 160630000, w: 63370000, s: 28760000, i: 16550000, a: 14860 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 39,
    rss: { f: 169550000, w: 68410000, s: 31410000, i: 18210000, a: 16350 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'barracks',
    desc: 'Barracks',
    level: 40,
    rss: { f: 178830000, w: 73640000, s: 34410000, i: 19940000, a: 17500 },
    requirements: [{ building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 31,
    rss: { f: 0, w: 9330000, s: 3730000, i: 933850, a: 720 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 32,
    rss: { f: 0, w: 11960000, s: 4790000, i: 1200000, a: 1290 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 33,
    rss: { f: 0, w: 15060000, s: 6020000, i: 1500000, a: 2630 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 34,
    rss: { f: 0, w: 18580000, s: 7470000, i: 1870000, a: 4370 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 35,
    rss: { f: 0, w: 23160000, s: 9270000, i: 2230000, a: 6270 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 36,
    rss: { f: 0, w: 24820000, s: 10240000, i: 2860000, a: 6460 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 37,
    rss: { f: 0, w: 26510000, s: 11250000, i: 3410000, a: 7020 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 38,
    rss: { f: 0, w: 28240000, s: 12270000, i: 3980000, a: 7760 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 39,
    rss: { f: 0, w: 30010000, s: 13320000, i: 4460000, a: 8420 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'blacksmith',
    desc: 'Blacksmith',
    level: 40,
    rss: { f: 0, w: 31810000, s: 14310000, i: 5150000, a: 8910 },
    requirements: [{ building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 31,
    rss: { f: 182370000, w: 182370000, s: 39520000, i: 19760000, a: 4810 },
    requirements: [
      { building: 'wall', level: 30 },
      { building: 'blacksmith', level: 30 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 32,
    rss: { f: 216720000, w: 216720000, s: 50880000, i: 25440000, a: 8620 },
    requirements: [
      { building: 'wall', level: 31 },
      { building: 'drillGrounds', level: 31 }
    ]
  },

  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 33,
    rss: { f: 247150000, w: 247150000, s: 64380000, i: 33340000, a: 16760 },
    requirements: [
      { building: 'wall', level: 32 },
      { building: 'depot', level: 32 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 34,
    rss: { f: 275890000, w: 275890000, s: 80010000, i: 42770000, a: 29100 },
    requirements: [
      { building: 'wall', level: 33 },
      { building: 'embassy', level: 33 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 35,
    rss: { f: 309270000, w: 309270000, s: 94410000, i: 53720000, a: 41770 },
    requirements: [
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 34 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 36,
    rss: { f: 327730000, w: 327730000, s: 101620000, i: 58400000, a: 42000 },
    requirements: [
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 35 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 37,
    rss: { f: 347110000, w: 347110000, s: 109210000, i: 63320000, a: 44750 },
    requirements: [
      { building: 'wall', level: 36 },
      { building: 'depot', level: 36 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 38,
    rss: { f: 367470000, w: 367470000, s: 117170000, i: 68480000, a: 48770 },
    requirements: [
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 37 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 39,
    rss: { f: 388840000, w: 388840000, s: 125520000, i: 73910000, a: 52220 },
    requirements: [
      { building: 'wall', level: 38 },
      { building: 'college', level: 38 }
    ]
  },
  {
    type: 'Building',
    building: 'castle',
    desc: 'Castle',
    level: 40,
    rss: { f: 411290000, w: 411290000, s: 134300000, i: 79600000, a: 54610 },
    requirements: [
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 39 }
    ]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 31,
    rss: { f: 0, w: 16600000, s: 5310000, i: 2320000, a: 1090 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 32,
    rss: { f: 0, w: 21250000, s: 6800000, i: 2970000, a: 1940 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 33,
    rss: { f: 0, w: 26760000, s: 8560000, i: 3740000, a: 3940 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 34,
    rss: { f: 0, w: 33200000, s: 10620000, i: 4640000, a: 6540 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 35,
    rss: { f: 0, w: 41170000, s: 13170000, i: 5620000, a: 9410 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 36,
    rss: { f: 0, w: 45760000, s: 14420000, i: 6300000, a: 9740 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 37,
    rss: { f: 0, w: 49120000, s: 15710000, i: 6870000, a: 10670 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 38,
    rss: { f: 0, w: 53330000, s: 17060000, i: 7460000, a: 11900 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 39,
    rss: { f: 0, w: 57710000, s: 18460000, i: 8060000, a: 12990 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'college',
    desc: 'College',
    level: 40,
    rss: { f: 0, w: 62270000, s: 19920000, i: 8710000, a: 13810 },
    requirements: [{ building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 31,
    rss: { f: 14050000, w: 14050000, s: 1410000, i: 710000, a: 1290 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 32,
    rss: { f: 17990000, w: 17990000, s: 2100000, i: 1100000, a: 1290 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 33,
    rss: { f: 22650000, w: 22650000, s: 2910000, i: 1450000, a: 2630 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 34,
    rss: { f: 28990000, w: 28990000, s: 4010000, i: 2000000, a: 4370 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 35,
    rss: { f: 34840000, w: 34840000, s: 5500000, i: 2800000, a: 6270 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 36,
    rss: { f: 36730000, w: 36730000, s: 6300000, i: 3270000, a: 6460 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 37,
    rss: { f: 38670000, w: 38670000, s: 7310000, i: 3850000, a: 7020 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 38,
    rss: { f: 40540000, w: 40540000, s: 8250000, i: 4430000, a: 7760 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 39,
    rss: { f: 42660000, w: 42660000, s: 9220000, i: 5030000, a: 8420 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 31,
    rss: { f: 0, w: 47030000, s: 3440000, i: 1410000, a: 1440 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 32,
    rss: { f: 0, w: 56200000, s: 4700000, i: 2200000, a: 2590 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 33,
    rss: { f: 0, w: 65800000, s: 6100000, i: 3100000, a: 6890 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 34,
    rss: { f: 0, w: 75260000, s: 7840000, i: 4240000, a: 11200 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 35,
    rss: { f: 0, w: 85540000, s: 10100000, i: 5830000, a: 16820 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 36,
    rss: { f: 0, w: 89250000, s: 11810000, i: 6940000, a: 21530 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 37,
    rss: { f: 0, w: 93030000, s: 13540000, i: 8080000, a: 26400 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 38,
    rss: { f: 0, w: 96890000, s: 15310000, i: 9240000, a: 30580 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 39,
    rss: { f: 0, w: 100830000, s: 17120000, i: 10430000, a: 33410 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'drillGrounds',
    desc: 'Drill Grounds',
    level: 40,
    rss: { f: 0, w: 104850000, s: 18960000, i: 11640000, a: 34690 },
    requirements: [{ building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 31,
    rss: { f: 0, w: 12720000, s: 3870000, i: 1490000, a: 720 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 32,
    rss: { f: 0, w: 15590000, s: 4960000, i: 1990000, a: 1290 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 33,
    rss: { f: 0, w: 18750000, s: 6250000, i: 2590000, a: 2630 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 34,
    rss: { f: 0, w: 22130000, s: 7800000, i: 3400000, a: 4370 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 35,
    rss: { f: 0, w: 26100000, s: 9610000, i: 4260000, a: 6270 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 36,
    rss: { f: 0, w: 27790000, s: 10590000, i: 4830000, a: 6460 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 37,
    rss: { f: 0, w: 29550000, s: 11610000, i: 5430000, a: 7020 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 38,
    rss: { f: 0, w: 31340000, s: 12640000, i: 6040000, a: 7760 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 31,
    rss: { f: 39900000, w: 16000000, s: 4000000, i: 2400000, a: 1210 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 32,
    rss: { f: 43360000, w: 19270000, s: 5300000, i: 3140000, a: 2160 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 33,
    rss: { f: 53110000, w: 22760000, s: 6980000, i: 4100000, a: 4380 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 34,
    rss: { f: 63960000, w: 26340000, s: 9030000, i: 5260000, a: 7270 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 35,
    rss: { f: 76980000, w: 30320000, s: 11660000, i: 6740000, a: 10450 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 36,
    rss: { f: 82560000, w: 34040000, s: 13630000, i: 8030000, a: 10820 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 37,
    rss: { f: 88370000, w: 37900000, s: 15670000, i: 9350000, a: 11850 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 38,
    rss: { f: 94400000, w: 41910000, s: 17800000, i: 10730000, a: 13220 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 39,
    rss: { f: 100680000, w: 46090000, s: 20010000, i: 12160000, a: 14430 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'hospital',
    desc: 'Hospital',
    level: 40,
    rss: { f: 107200000, w: 50440000, s: 22310000, i: 13640000, a: 15340 },
    requirements: [{ building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 31,
    rss: { f: 0, w: 118300000, s: 19300000, i: 9700000, a: 1810 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 32,
    rss: { f: 0, w: 143500000, s: 25600000, i: 12800000, a: 3230 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 33,
    rss: { f: 0, w: 170700000, s: 33200000, i: 16600000, a: 6890 },
    requirements: [{ building: 'castle', level: 33 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 34,
    rss: { f: 0, w: 199300000, s: 42400000, i: 21200000, a: 11200 },
    requirements: [{ building: 'castle', level: 34 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 35,
    rss: { f: 0, w: 231500000, s: 54100000, i: 27100000, a: 16820 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 36,
    rss: { f: 0, w: 243340000, s: 57690000, i: 29290000, a: 17060 },
    requirements: [{ building: 'castle', level: 36 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 37,
    rss: { f: 0, w: 255580000, s: 61500000, i: 31680000, a: 18320 },
    requirements: [{ building: 'castle', level: 37 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 38,
    rss: { f: 0, w: 268300000, s: 65460000, i: 34130000, a: 20080 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 39,
    rss: { f: 0, w: 281530000, s: 69580000, i: 36700000, a: 21620 },
    requirements: [{ building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 40,
    rss: { f: 0, w: 295290000, s: 73860000, i: 39370000, a: 24700 },
    requirements: [{ building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 1,
    rss: { f: 1970000, w: 423360, s: 84670, i: 0, a: 0 },
    requirements: [{ building: 'castle', level: 15 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 2,
    rss: { f: 4030000, w: 806120, s: 198430, i: 37200, a: 0 },
    requirements: [{ building: 'castle', level: 18 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 3,
    rss: { f: 7350000, w: 1340000, s: 416900, i: 147140, a: 0 },
    requirements: [{ building: 'castle', level: 21 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 4,
    rss: { f: 15400000, w: 2800000, s: 988600, i: 476280, a: 0 },
    requirements: [{ building: 'castle', level: 24 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 5,
    rss: { f: 40620000, w: 9300000, s: 3210000, i: 1860000, a: 0 },
    requirements: [{ building: 'castle', level: 28 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 6,
    rss: { f: 100000000, w: 26200000, s: 9600000, i: 6500000, a: 3000 },
    requirements: [{ building: 'castle', level: 32 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 7,
    rss: { f: 193250000, w: 50730000, s: 18500000, i: 12500000, a: 12000 },
    requirements: [{ building: 'castle', level: 35 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 8,
    rss: { f: 217030000, w: 59790000, s: 21780000, i: 14690000, a: 30000 },
    requirements: [{ building: 'castle', level: 38 }]
  },
  {
    type: 'Building',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 0 },
    requirements: [{ building: 'castle', level: 31 }]
  },
  {
    type: 'Building',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 2,
    rss: { f: 28490000, w: 2849000, s: 8540000, i: 4270000, a: 4320 },
    requirements: [{ building: 'mysticCollege', level: 1 }]
  },
  {
    type: 'Building',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 3,
    rss: { f: 51170000, w: 51170000, s: 15350000, i: 7670000, a: 7540 },
    requirements: [{ building: 'mysticCollege', level: 2 }]
  },
  {
    type: 'Building',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 4,
    rss: { f: 70430000, w: 70430000, s: 21130000, i: 10560000, a: 11040 },
    requirements: [{ building: 'mysticCollege', level: 3 }]
  },
  {
    type: 'Building',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 5,
    rss: { f: 90330000, w: 90330000, s: 27100000, i: 13550000, a: 15460 },
    requirements: [{ building: 'mysticCollege', level: 4 }]
  },
  {
    type: 'High College',
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 1,
    rss: { f: 2219064, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [{ building: 'mysticCollege', level: 1 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [{ building: 'mysticCollege', level: 2 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcToughness',
    desc: 'Toughness',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcToughness',
    desc: 'Toughness',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcToughness',
    desc: 'Toughness',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcToughness',
    desc: 'Toughness',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcToughness',
    desc: 'Toughness',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'infantry'
  },
  {
    type: 'High College',
    building: 'mcDodge',
    desc: 'Dodge',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [{ building: 'mysticCollege', level: 1 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcDodge',
    desc: 'Dodge',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [{ building: 'mysticCollege', level: 2 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcDodge',
    desc: 'Dodge',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcDodge',
    desc: 'Dodge',
    level: 4,
    rss: { f: 4507812, w: 6761719, s: 0, i: 1099677, a: 10100 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcDodge',
    desc: 'Dodge',
    level: 5,
    rss: { f: 5845216, w: 8767825, s: 0, i: 1357949, a: 13200 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'cavalry'
  },
  {
    type: 'High College',
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [{ building: 'mysticCollege', level: 1 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [{ building: 'mysticCollege', level: 2 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'archer'
  },
  {
    type: 'High College',
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [{ building: 'mysticCollege', level: 1 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [{ building: 'mysticCollege', level: 2 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'mage'
  },
  {
    type: 'High College',
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [{ building: 'mysticCollege', level: 1 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [{ building: 'mysticCollege', level: 2 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mysticCollege', level: 3 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mysticCollege', level: 4 }],
    troopType: 'angel'
  },
  {
    type: 'High College',
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mysticCollege', level: 5 }],
    troopType: 'angel'
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageFood1',
    desc: 'Manage Food I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1170 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageStone1',
    desc: 'Manage Stone I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1340 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageWood1',
    desc: 'Manage Wood I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1170 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageIron1',
    desc: 'Manage Iron I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1340 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL1',
    desc: 'Superior Leadership I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 680 },
    requirements: [
      { building: 'mcMaganeFood', level: 1 },
      { building: 'mcManageStone', level: 1 },
      { building: 'mcManageWood', level: 1 },
      { building: 'mcManageIron', level: 1 }
    ],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 270 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 270 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 270 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 270 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 320 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 320 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 320 },
    requirements: [{ building: 'college', level: 33 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 440 },
    requirements: [{ building: 'college', level: 33 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 570 },
    requirements: [{ building: 'college', level: 33 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 680 },
    requirements: [{ building: 'college', level: 33 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 810 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 940 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1080 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1240 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1400 },
    requirements: [{ building: 'college', level: 35 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade1',
    desc: 'Elite Blade I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [{ building: 'college', level: 35 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 320 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 440 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 570 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 680 },
    requirements: [{ building: 'college', level: 34 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 810 },
    requirements: [{ building: 'college', level: 35 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 940 },
    requirements: [{ building: 'college', level: 35 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1080 },
    requirements: [{ building: 'college', level: 35 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1240 },
    requirements: [{ building: 'college', level: 35 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1400 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield1',
    desc: 'Elite Shield I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRallyDecree1',
    desc: 'Rally Decree I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 560 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageFood2',
    desc: 'Manage Food II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3000 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageStone2',
    desc: 'Manage Stone II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3000 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageWood2',
    desc: 'Manage Wood II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3370 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageIron2',
    desc: 'Manage Iron II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3370 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL2',
    desc: 'Superior Leadership II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2010 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1940 },
    requirements: [{ building: 'college', level: 37 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [{ building: 'college', level: 37 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [{ building: 'college', level: 38 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [{ building: 'college', level: 38 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [{ building: 'college', level: 39 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [{ building: 'college', level: 39 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [{ building: 'college', level: 40 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteBlade2',
    desc: 'Elite Blade II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2970 },
    requirements: [{ building: 'college', level: 40 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [{ building: 'college', level: 36 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1940 },
    requirements: [{ building: 'college', level: 37 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [{ building: 'college', level: 37 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [{ building: 'college', level: 38 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [{ building: 'college', level: 38 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [{ building: 'college', level: 39 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [{ building: 'college', level: 39 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [{ building: 'college', level: 40 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcEliteShield2',
    desc: 'Elite Shield II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2970 },
    requirements: [{ building: 'college', level: 40 }],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageFood1',
    desc: 'Manage Food I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1430 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageFood1',
    desc: 'Manage Food I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1650 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageStone1',
    desc: 'Manage Stone I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1620 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageStone1',
    desc: 'Manage Stone I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2060 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageWood1',
    desc: 'Manage Wood I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1430 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageWood1',
    desc: 'Manage Wood I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1650 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageIron1',
    desc: 'Manage Iron I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1620 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcManageIron1',
    desc: 'Manage Iron I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2060 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL1',
    desc: 'Superior Leadership I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 809 },
    requirements: [
      { building: 'mcMaganeFood', level: 1 },
      { building: 'mcManageStone', level: 1 },
      { building: 'mcManageWood', level: 1 },
      { building: 'mcManageIron', level: 1 }
    ],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL1',
    desc: 'Superior Leadership I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1130 },
    requirements: [
      { building: 'mcMaganeFood', level: 1 },
      { building: 'mcManageStone', level: 1 },
      { building: 'mcManageWood', level: 1 },
      { building: 'mcManageIron', level: 1 }
    ],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL1',
    desc: 'Superior Leadership I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1400 },
    requirements: [
      { building: 'mcMaganeFood', level: 1 },
      { building: 'mcManageStone', level: 1 },
      { building: 'mcManageWood', level: 1 },
      { building: 'mcManageIron', level: 1 }
    ],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL1',
    desc: 'Superior Leadership I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [
      { building: 'mcMaganeFood', level: 1 },
      { building: 'mcManageStone', level: 1 },
      { building: 'mcManageWood', level: 1 },
      { building: 'mcManageIron', level: 1 }
    ],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 380 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 500 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 610 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 730 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 850 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 990 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1130 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1280 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack1',
    desc: 'Melee Attack I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1450 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 380 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 500 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 610 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 730 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 850 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 990 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1130 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1280 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp1',
    desc: 'Melee HP I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1450 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 380 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 500 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 610 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 730 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 850 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 990 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1130 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1280 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack1',
    desc: 'Ranged Attack I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1450 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 380 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 500 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 610 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 730 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 850 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 990 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1130 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1280 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP1',
    desc: 'Ranged HP I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1450 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3440 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 840 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1080 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1240 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1400 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA1',
    desc: 'Superior Angel Attack I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3440 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 840 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1080 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1240 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1400 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH1',
    desc: 'Superior Angel HP I',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL2',
    desc: 'Superior Leadership II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL2',
    desc: 'Superior Leadership II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2730 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL2',
    desc: 'Superior Leadership II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 4140 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorL2',
    desc: 'Superior Leadership II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3570 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1840 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeAttack2',
    desc: 'Melee Attack II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1840 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcMeleeHp2',
    desc: 'Melee HP II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1840 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeAttack2',
    desc: 'Ranged Attack II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1680 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1840 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcRangeHP2',
    desc: 'Ranged HP II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1940 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAA2',
    desc: 'Superior Angel Attack II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2970 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 1940 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2070 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2210 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2360 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2510 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2660 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2810 },
    requirements: [],
    troopType: ''
  },
  {
    type: 'High Tehcnology',
    building: 'hcSuperiorAH2',
    desc: 'Superior Angel HP II',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 2970 },
    requirements: [],
    troopType: ''
  },

  {
    type: 'Mystic College',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 6,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 18430 },
    requirements: [{ building: 'mysticCollege', level: 5 }]
  },
  {
    type: 'Mystic College',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 7,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22110 },
    requirements: [{ building: 'mysticCollege', level: 6 }]
  },
  {
    type: 'Mystic College',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 8,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 26530 },
    requirements: [{ building: 'mysticCollege', level: 7 }]
  },
  {
    type: 'Mystic College',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 9,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 31830 },
    requirements: [{ building: 'mysticCollege', level: 8 }]
  },
  {
    type: 'Mystic College',
    building: 'mysticCollege',
    desc: 'Mystic College',
    level: 10,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 38190 },
    requirements: [{ building: 'mysticCollege', level: 9 }]
  },
  {
    type: 'Mystic College',
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'intervene',
    desc: 'Intervene',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'intervene',
    desc: 'Intervene',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'intervene',
    desc: 'Intervene',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'intervene',
    desc: 'Intervene',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'intervene',
    desc: 'Intervene',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [],
    troopType: 'infantry'
  },
  {
    type: 'Mystic College',
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [],
    troopType: 'cavalry'
  },
  {
    type: 'Mystic College',
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [],
    troopType: 'archer'
  },
  {
    type: 'Mystic College',
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'spell',
    desc: 'Spell',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'spell',
    desc: 'Spell',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'spell',
    desc: 'Spell',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'spell',
    desc: 'Spell',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Mystic College',
    building: 'spell',
    desc: 'Spell',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [],
    troopType: 'mage'
  },
  {
    type: 'Building',
    building: 'sacredCastle',
    desc: 'Sacred Castle I',
    level: 1,
    rss: { f: 276886000, w: 276886000, s: 80006949, i: 42762330, a: 65000 },
    requirements: [
      { type: 'Building', building: 'wall', level: 40 },
      { type: 'Building', building: 'embassy', level: 40 },
      { type: 'Building', building: 'chargeTier', level: 1 }
    ]
  },
  {
    type: 'Building',
    building: 'sacredCastle',
    desc: 'Sacred Castle II',
    level: 2,
    rss: { f: 217600000, w: 217600000, s: 63500000, i: 34000000, a: 73000 },
    requirements: [
      { type: 'Building', building: 'wall', level: 41 },
      { type: 'Building', building: 'depot', level: 40 },
      { type: 'Building', building: 'sacredCastle', level: 1 },
      { type: 'Building', building: 'chargeTier', level: 2 }
    ]
  },
  {
    type: 'Building',
    building: 'sacredCastle',
    desc: 'Sacred Castle III',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 82000 },
    requirements: [
      { type: 'Building', building: 'wall', level: 41 },
      { type: 'Building', building: 'sacredHospital', level: 1 },
      { type: 'Building', building: 'sacredHospital', level: 2 },
      { type: 'Building', building: 'sacredCastle', level: 1 },
      { type: 'Building', building: 'chargeTier', level: 3 }
    ]
  },
  {
    type: 'Building',
    building: 'chargeTier',
    desc: 'Sacred Tier I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 72000 },
    requirements: [{ type: 'Building', building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'chargeTier',
    desc: 'Sacred Tier II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 88000 },
    requirements: [{ type: 'Building', building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'chargeTier',
    desc: 'Sacred Tier III',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 108000 },
    requirements: [{ type: 'Building', building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'sacredBarrack',
    desc: 'Sacred Barrack I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 33330 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 1 }]
  },
  {
    type: 'Building',
    building: 'sacredBarrack',
    desc: 'Sacred Barrack II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 37430 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 2 }]
  },
  {
    type: 'Building',
    building: 'sacredBarrack',
    desc: 'Sacred Barrack III',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 42040 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 3 }]
  },
  {
    type: 'Building',
    building: 'depot',
    desc: 'Depot',
    level: 40,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 8910 },
    requirements: [{ type: 'Building', building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'sacredDepot',
    desc: 'Sacred Depot I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14850 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 1 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 39,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 8420 },
    requirements: [{ type: 'Building', building: 'castle', level: 39 }]
  },
  {
    type: 'Building',
    building: 'embassy',
    desc: 'Embassy',
    level: 40,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 8910 },
    requirements: [{ type: 'Building', building: 'castle', level: 40 }]
  },
  {
    type: 'Building',
    building: 'sacredHospital',
    desc: 'Sacred Hospital I',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24650 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 1 }]
  },
  {
    type: 'Building',
    building: 'sacredHospital',
    desc: 'Sacred Hospital II',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 27680 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 2 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 41,
    rss: { f: 0, w: 157000000, s: 33400000, i: 16800000, a: 39690 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 1 }]
  },
  {
    type: 'Building',
    building: 'wall',
    desc: 'Wall',
    level: 42,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 44570 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 2 }]
  },
  {
    type: 'Building',
    building: 'guardianTemple',
    desc: 'Guardian Temple',
    level: 9,
    rss: { f: 84200000, w: 19300000, s: 7800000, i: 5400000, a: 50000 },
    requirements: [{ type: 'Building', building: 'sacredCastle', level: 1 }]
  }
]

export const itemTemplates = [
  {
    template: 'c31toc40',
    desc: 'c31 to c40 w Angels T12',
    buildings: [
      { building: 'castle', level: 31 },
      { building: 'wall', level: 31 },
      { building: 'drillGrounds', level: 31 },
      { building: 'castle', level: 32 },
      { building: 'guardianTemple', level: 6 },
      { building: 'wall', level: 32 },
      { building: 'depot', level: 31 },
      { building: 'depot', level: 32 },
      { building: 'castle', level: 33 },
      { building: 'wall', level: 33 },
      { building: 'embassy', level: 31 },
      { building: 'embassy', level: 32 },
      { building: 'embassy', level: 33 },
      { building: 'castle', level: 34 },
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 31 },
      { building: 'hospital', level: 32 },
      { building: 'hospital', level: 33 },
      { building: 'hospital', level: 34 },
      { building: 'castle', level: 35 },
      { building: 'guardianTemple', level: 7 },
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 31 },
      { building: 'drillGrounds', level: 32 },
      { building: 'drillGrounds', level: 33 },
      { building: 'drillGrounds', level: 34 },
      { building: 'drillGrounds', level: 35 },
      { building: 'castle', level: 36 },
      { building: 'wall', level: 36 },
      { building: 'depot', level: 33 },
      { building: 'depot', level: 34 },
      { building: 'depot', level: 35 },
      { building: 'depot', level: 36 },
      { building: 'castle', level: 37 },
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 34 },
      { building: 'embassy', level: 35 },
      { building: 'embassy', level: 36 },
      { building: 'embassy', level: 37 },
      { building: 'castle', level: 38 },
      { building: 'guardianTemple', level: 8 },
      { building: 'wall', level: 38 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 },
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 }
    ]
  },
  {
    template: 'c31tosc3',
    desc: 'c31 to Sacred Castle III w Angels T13',
    buildings: [
      { building: 'blacksmith', level: 31 },
      { building: 'castle', level: 31 },
      { building: 'wall', level: 31 },
      { building: 'drillGrounds', level: 31 },
      { building: 'castle', level: 32 },
      { building: 'guardianTemple', level: 6 },
      { building: 'wall', level: 32 },
      { building: 'depot', level: 31 },
      { building: 'depot', level: 32 },
      { building: 'castle', level: 33 },
      { building: 'wall', level: 33 },
      { building: 'embassy', level: 31 },
      { building: 'embassy', level: 32 },
      { building: 'embassy', level: 33 },
      { building: 'castle', level: 34 },
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 31 },
      { building: 'hospital', level: 32 },
      { building: 'hospital', level: 33 },
      { building: 'hospital', level: 34 },
      { building: 'castle', level: 35 },
      { building: 'guardianTemple', level: 7 },
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 31 },
      { building: 'drillGrounds', level: 32 },
      { building: 'drillGrounds', level: 33 },
      { building: 'drillGrounds', level: 34 },
      { building: 'drillGrounds', level: 35 },
      { building: 'castle', level: 36 },
      { building: 'wall', level: 36 },
      { building: 'depot', level: 33 },
      { building: 'depot', level: 34 },
      { building: 'depot', level: 35 },
      { building: 'depot', level: 36 },
      { building: 'castle', level: 37 },
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 34 },
      { building: 'embassy', level: 35 },
      { building: 'embassy', level: 36 },
      { building: 'embassy', level: 37 },
      { building: 'castle', level: 38 },
      { building: 'guardianTemple', level: 8 },
      { building: 'wall', level: 38 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 },
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 },
      { building: 'wall', level: 40 },
      { building: 'embassy', level: 38 },
      { building: 'embassy', level: 39 },
      { building: 'embassy', level: 40 },
      { building: 'chargeTier', level: 1 },
      { building: 'sacredCastle', level: 1 },
      { building: 'guardianTemple', level: 9 },
      { building: 'wall', level: 41 },
      { building: 'depot', level: 37 },
      { building: 'depot', level: 38 },
      { building: 'depot', level: 39 },
      { building: 'depot', level: 40 },
      { building: 'sacredDepot', level: 1 },
      { building: 'chargeTier', level: 2 },
      { building: 'sacredCastle', level: 2 },
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'wall', level: 42 },
      { building: 'sacredHospital', level: 1 },
      { building: 'sacredHospital', level: 2 },
      { building: 'chargeTier', level: 3 },
      { building: 'sacredCastle', level: 3 },
      { building: 'sacredBarrack', level: 3 }
    ]
  },
  {
    template: 'c34toc40',
    desc: 'c34 to c40 w Angels T12',
    buildings: [
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 31 },
      { building: 'hospital', level: 32 },
      { building: 'hospital', level: 33 },
      { building: 'hospital', level: 34 },
      { building: 'castle', level: 35 },
      { building: 'guardianTemple', level: 7 },
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 31 },
      { building: 'drillGrounds', level: 32 },
      { building: 'drillGrounds', level: 33 },
      { building: 'drillGrounds', level: 34 },
      { building: 'drillGrounds', level: 35 },
      { building: 'castle', level: 36 },
      { building: 'wall', level: 36 },
      { building: 'depot', level: 33 },
      { building: 'depot', level: 34 },
      { building: 'depot', level: 35 },
      { building: 'depot', level: 36 },
      { building: 'castle', level: 37 },
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 34 },
      { building: 'embassy', level: 35 },
      { building: 'embassy', level: 36 },
      { building: 'embassy', level: 37 },
      { building: 'castle', level: 38 },
      { building: 'guardianTemple', level: 8 },
      { building: 'wall', level: 38 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 },
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 }
    ]
  },
  {
    template: 'c31toc34angels',
    desc: 'c31 to c34 w Angels T10',
    buildings: [
      { building: 'castle', level: 31 },
      { building: 'wall', level: 31 },
      { building: 'drillGrounds', level: 31 },
      { building: 'castle', level: 32 },
      { building: 'guardianTemple', level: 6 },
      { building: 'wall', level: 32 },
      { building: 'depot', level: 31 },
      { building: 'depot', level: 32 },
      { building: 'castle', level: 33 },
      { building: 'wall', level: 33 },
      { building: 'embassy', level: 31 },
      { building: 'embassy', level: 32 },
      { building: 'embassy', level: 33 },
      { building: 'castle', level: 34 }
    ]
  },
  {
    template: 'c34toC35bs',
    desc: 'c34 to c35 w BlackSmith',
    buildings: [
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 31 },
      { building: 'hospital', level: 32 },
      { building: 'hospital', level: 33 },
      { building: 'hospital', level: 34 },
      { building: 'castle', level: 35 },
      { building: 'blacksmith', level: 31 },
      { building: 'blacksmith', level: 32 },
      { building: 'blacksmith', level: 33 },
      { building: 'blacksmith', level: 34 },
      { building: 'blacksmith', level: 35 }
    ]
  },
  {
    template: 'c34toc35angels',
    desc: 'c34 to c35 w Angels T11',
    buildings: [
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 31 },
      { building: 'hospital', level: 32 },
      { building: 'hospital', level: 33 },
      { building: 'hospital', level: 34 },
      { building: 'castle', level: 35 },
      { building: 'guardianTemple', level: 7 }
    ]
  },
  {
    template: 'c35toc37',
    desc: 'c35 to c37',
    buildings: [
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 31 },
      { building: 'drillGrounds', level: 32 },
      { building: 'drillGrounds', level: 33 },
      { building: 'drillGrounds', level: 34 },
      { building: 'drillGrounds', level: 35 },
      { building: 'castle', level: 36 },
      { building: 'wall', level: 36 },
      { building: 'depot', level: 33 },
      { building: 'depot', level: 34 },
      { building: 'depot', level: 35 },
      { building: 'depot', level: 36 },
      { building: 'castle', level: 37 }
    ]
  },
  {
    template: 'c35toc37angels',
    desc: 'c35 to c37 w Angels T11',
    buildings: [
      { building: 'guardianTemple', level: 7 },
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 31 },
      { building: 'drillGrounds', level: 32 },
      { building: 'drillGrounds', level: 33 },
      { building: 'drillGrounds', level: 34 },
      { building: 'drillGrounds', level: 35 },
      { building: 'castle', level: 36 },
      { building: 'wall', level: 36 },
      { building: 'depot', level: 33 },
      { building: 'depot', level: 34 },
      { building: 'depot', level: 35 },
      { building: 'depot', level: 36 },
      { building: 'castle', level: 37 }
    ]
  },
  {
    template: 'c37toc38angels',
    desc: 'c37 to c38 w Angels T12',
    buildings: [
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 34 },
      { building: 'embassy', level: 35 },
      { building: 'embassy', level: 36 },
      { building: 'embassy', level: 37 },
      { building: 'castle', level: 38 },
      { building: 'guardianTemple', level: 8 }
    ]
  },
  {
    template: 'c38toc40angels',
    desc: 'c38 to c40 w Angels T12',
    buildings: [
      { building: 'wall', level: 38 },
      { building: 'guardianTemple', level: 8 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 },
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 }
    ]
  },
  {
    template: 'c37toc40',
    desc: 'c37 to c40',
    buildings: [
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 34 },
      { building: 'embassy', level: 35 },
      { building: 'embassy', level: 36 },
      { building: 'embassy', level: 37 },
      { building: 'castle', level: 38 },
      { building: 'wall', level: 38 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 },
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 }
    ]
  },
  {
    template: 'c38toc40',
    desc: 'c38 to c40',
    buildings: [
      { building: 'wall', level: 38 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 },
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 }
    ]
  },
  {
    template: 'c41toSacred1',
    desc: 'c40 to Sacred Castle I',
    buildings: [
      { building: 'wall', level: 40 },
      { building: 'embassy', level: 38 },
      { building: 'embassy', level: 39 },
      { building: 'embassy', level: 40 },
      { building: 'chargeTier', level: 1 },
      { building: 'sacredCastle', level: 1 }
    ]
  },
  {
    template: 'c41toSacred1WA',
    desc: 'c40 to Sacred Castle I w Angels T13',
    buildings: [
      { building: 'wall', level: 40 },
      { building: 'embassy', level: 38 },
      { building: 'embassy', level: 39 },
      { building: 'embassy', level: 40 },
      { building: 'chargeTier', level: 1 },
      { building: 'sacredCastle', level: 1 },
      { building: 'guardianTemple', level: 9 }
    ]
  },
  {
    template: 'sc1tosc2',
    desc: 'Sacred Castle I to Sacred Castle II + Sacred Barracks II',
    buildings: [
      { building: 'wall', level: 41 },
      { building: 'depot', level: 37 },
      { building: 'depot', level: 38 },
      { building: 'depot', level: 39 },
      { building: 'depot', level: 40 },
      { building: 'sacredDepot', level: 1 },
      { building: 'chargeTier', level: 2 },
      { building: 'sacredCastle', level: 2 },
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 }
    ]
  },
  {
    template: 'sc1tosc3',
    desc: 'Sacred Castle II to Sacred Castle III + Sacred Barracks III',
    buildings: [
      { building: 'wall', level: 42 },
      { building: 'sacredHospital', level: 1 },
      { building: 'sacredHospital', level: 2 },
      { building: 'chargeTier', level: 3 },
      { building: 'sacredCastle', level: 3 },
      { building: 'sacredBarrack', level: 3 }
    ]
  },
  {
    template: 'c41toScIIWA',
    desc: 'c40 to Sacred Castle III w Angels T13',
    buildings: [
      { building: 'wall', level: 40 },
      { building: 'embassy', level: 38 },
      { building: 'embassy', level: 39 },
      { building: 'embassy', level: 40 },
      { building: 'chargeTier', level: 1 },
      { building: 'sacredCastle', level: 1 },
      { building: 'guardianTemple', level: 9 },
      { building: 'wall', level: 41 },
      { building: 'depot', level: 37 },
      { building: 'depot', level: 38 },
      { building: 'depot', level: 39 },
      { building: 'depot', level: 40 },
      { building: 'sacredDepot', level: 1 },
      { building: 'chargeTier', level: 2 },
      { building: 'sacredCastle', level: 2 },
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'wall', level: 42 },
      { building: 'sacredHospital', level: 1 },
      { building: 'sacredHospital', level: 2 },
      { building: 'chargeTier', level: 3 },
      { building: 'sacredCastle', level: 3 },
      { building: 'sacredBarrack', level: 3 }
    ]
  },
  {
    template: 'eBladeNshield1',
    desc: 'Elite Blade and Shield I lv10',
    buildings: [
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'hcManageFood1', level: 1 },
      { building: 'hcManageStone1', level: 1 },
      { building: 'hcManageWood1', level: 1 },
      { building: 'hcManageIron1', level: 1 },
      { building: 'hcSuperiorL1', level: 1 },
      { building: 'hcMeleeAttack1', level: 1 },
      { building: 'hcMeleeHp1', level: 1 },
      { building: 'hcRangeAttack1', level: 1 },
      { building: 'hcRangeHP', level: 1 },
      { building: 'hcSuperiorAA1', level: 1 },
      { building: 'hcSuperiorAH2', level: 1 },
      { building: 'hcEliteBlade1', level: 1 },
      { building: 'hcEliteBlade1', level: 2 },
      { building: 'hcEliteBlade1', level: 3 },
      { building: 'hcEliteBlade1', level: 4 },
      { building: 'hcEliteBlade1', level: 5 },
      { building: 'hcEliteBlade1', level: 6 },
      { building: 'hcEliteBlade1', level: 7 },
      { building: 'hcEliteBlade1', level: 8 },
      { building: 'hcEliteBlade1', level: 9 },
      { building: 'hcEliteBlade1', level: 10 },
      { building: 'hcEliteShield1', level: 1 },
      { building: 'hcEliteShield1', level: 2 },
      { building: 'hcEliteShield1', level: 3 },
      { building: 'hcEliteShield1', level: 4 },
      { building: 'hcEliteShield1', level: 5 },
      { building: 'hcEliteShield1', level: 6 },
      { building: 'hcEliteShield1', level: 7 },
      { building: 'hcEliteShield1', level: 8 },
      { building: 'hcEliteShield1', level: 9 },
      { building: 'hcEliteShield1', level: 10 }
    ]
  },
  {
    template: 'eBladeNshield2',
    desc: 'Elite Blade and Shield I and II lv10',
    buildings: [
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'college', level: 39 },
      { building: 'college', level: 40 },
      { building: 'hcManageFood1', level: 1 },
      { building: 'hcManageStone1', level: 1 },
      { building: 'hcManageWood1', level: 1 },
      { building: 'hcManageIron1', level: 1 },
      { building: 'hcSuperiorL1', level: 1 },
      { building: 'hcMeleeAttack1', level: 1 },
      { building: 'hcMeleeHp1', level: 1 },
      { building: 'hcRangeAttack1', level: 1 },
      { building: 'hcRangeHP', level: 1 },
      { building: 'hcSuperiorAA1', level: 1 },
      { building: 'hcSuperiorAH2', level: 1 },
      { building: 'hcEliteBlade1', level: 1 },
      { building: 'hcEliteBlade1', level: 2 },
      { building: 'hcEliteBlade1', level: 3 },
      { building: 'hcEliteBlade1', level: 4 },
      { building: 'hcEliteBlade1', level: 5 },
      { building: 'hcEliteBlade1', level: 6 },
      { building: 'hcEliteBlade1', level: 7 },
      { building: 'hcEliteBlade1', level: 8 },
      { building: 'hcEliteBlade1', level: 9 },
      { building: 'hcEliteBlade1', level: 10 },
      { building: 'hcEliteShield1', level: 1 },
      { building: 'hcEliteShield1', level: 2 },
      { building: 'hcEliteShield1', level: 3 },
      { building: 'hcEliteShield1', level: 4 },
      { building: 'hcEliteShield1', level: 5 },
      { building: 'hcEliteShield1', level: 6 },
      { building: 'hcEliteShield1', level: 7 },
      { building: 'hcEliteShield1', level: 8 },
      { building: 'hcEliteShield1', level: 9 },
      { building: 'hcEliteShield1', level: 10 },
      { building: 'hcRallyDecree1', level: 1 },
      { building: 'hcManageFood2', level: 1 },
      { building: 'hcManageStone2', level: 1 },
      { building: 'hcManageWood2', level: 1 },
      { building: 'hcManageIron2', level: 1 },
      { building: 'hcSuperiorL2', level: 1 },
      { building: 'hcMeleeAttack2', level: 1 },
      { building: 'hcMeleeHp2', level: 1 },
      { building: 'hcRangeAttack2', level: 1 },
      { building: 'hcRangeHP 2', level: 1 },
      { building: 'hcSuperiorAA2', level: 1 },
      { building: 'hcSuperiorAH2', level: 1 },
      { building: 'hcEliteBlade2', level: 1 },
      { building: 'hcEliteBlade2', level: 2 },
      { building: 'hcEliteBlade2', level: 3 },
      { building: 'hcEliteBlade2', level: 4 },
      { building: 'hcEliteBlade2', level: 5 },
      { building: 'hcEliteBlade2', level: 6 },
      { building: 'hcEliteBlade2', level: 7 },
      { building: 'hcEliteBlade2', level: 8 },
      { building: 'hcEliteBlade2', level: 9 },
      { building: 'hcEliteBlade2', level: 10 },
      { building: 'hcEliteShield2', level: 1 },
      { building: 'hcEliteShield2', level: 2 },
      { building: 'hcEliteShield2', level: 3 },
      { building: 'hcEliteShield2', level: 4 },
      { building: 'hcEliteShield2', level: 5 },
      { building: 'hcEliteShield2', level: 6 },
      { building: 'hcEliteShield2', level: 7 },
      { building: 'hcEliteShield2', level: 8 },
      { building: 'hcEliteShield2', level: 9 },
      { building: 'hcEliteShield2', level: 10 }
    ]
  },
  {
    template: 'b31tob34',
    desc: 'Barracks 31 to 34',
    buildings: [
      { building: 'barracks', level: 31 },
      { building: 'barracks', level: 32 },
      { building: 'barracks', level: 33 },
      { building: 'barracks', level: 34 }
    ]
  },
  {
    template: 'b35tob37',
    desc: 'Barracks 35 to 37',
    buildings: [
      { building: 'barracks', level: 35 },
      { building: 'barracks', level: 36 },
      { building: 'barracks', level: 37 }
    ]
  },
  {
    template: 'b38tob40',
    desc: 'Barracks 38 to 40',
    buildings: [
      { building: 'barracks', level: 38 },
      { building: 'barracks', level: 39 },
      { building: 'barracks', level: 40 }
    ]
  },

  {
    template: 'sbItosbIII',
    desc: 'Sacred Barracks I to III',
    buildings: [
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'sacredBarrack', level: 3 }
    ]
  },
  {
    template: 'b31tob40',
    desc: 'Barracks 31 to 40',
    buildings: [
      { building: 'barracks', level: 31 },
      { building: 'barracks', level: 32 },
      { building: 'barracks', level: 33 },
      { building: 'barracks', level: 34 },
      { building: 'barracks', level: 35 },
      { building: 'barracks', level: 36 },
      { building: 'barracks', level: 37 },
      { building: 'barracks', level: 38 },
      { building: 'barracks', level: 39 },
      { building: 'barracks', level: 40 }
    ]
  },
  {
    template: 'b31tosIII',
    desc: 'Barracks 31 to Sacred Barracks III',
    buildings: [
      { building: 'barracks', level: 31 },
      { building: 'barracks', level: 32 },
      { building: 'barracks', level: 33 },
      { building: 'barracks', level: 34 },
      { building: 'barracks', level: 35 },
      { building: 'barracks', level: 36 },
      { building: 'barracks', level: 37 },
      { building: 'barracks', level: 38 },
      { building: 'barracks', level: 39 },
      { building: 'barracks', level: 40 },
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'sacredBarrack', level: 3 }
    ]
  }
]

export const extraBarracks = [
  {
    template: 'b31tob34',
    desc: 'Barracks 31 to 34',
    buildings: [
      { building: 'barracks', level: 31 },
      { building: 'barracks', level: 32 },
      { building: 'barracks', level: 33 },
      { building: 'barracks', level: 34 }
    ]
  },
  {
    template: 'b35tob37',
    desc: 'Barracks 35 to 37',
    buildings: [
      { building: 'barracks', level: 35 },
      { building: 'barracks', level: 36 },
      { building: 'barracks', level: 37 }
    ]
  },
  {
    template: 'b38tob40',
    desc: 'Barracks 38 to 40',
    buildings: [
      { building: 'barracks', level: 38 },
      { building: 'barracks', level: 39 },
      { building: 'barracks', level: 40 }
    ]
  },

  {
    template: 'sbItosbIII',
    desc: 'Sacred Barracks I to III',
    buildings: [
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'sacredBarrack', level: 3 }
    ]
  },
  {
    template: 'b31tob40',
    desc: 'Barracks 31 to 40',
    buildings: [
      { building: 'barracks', level: 31 },
      { building: 'barracks', level: 32 },
      { building: 'barracks', level: 33 },
      { building: 'barracks', level: 34 },
      { building: 'barracks', level: 35 },
      { building: 'barracks', level: 36 },
      { building: 'barracks', level: 37 },
      { building: 'barracks', level: 38 },
      { building: 'barracks', level: 39 },
      { building: 'barracks', level: 40 }
    ]
  },
  {
    template: 'b31tosIII',
    desc: 'Barracks 31 to Sacred Barracks III',
    buildings: [
      { building: 'barracks', level: 31 },
      { building: 'barracks', level: 32 },
      { building: 'barracks', level: 33 },
      { building: 'barracks', level: 34 },
      { building: 'barracks', level: 35 },
      { building: 'barracks', level: 36 },
      { building: 'barracks', level: 37 },
      { building: 'barracks', level: 38 },
      { building: 'barracks', level: 39 },
      { building: 'barracks', level: 40 },
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'sacredBarrack', level: 3 }
    ]
  }
]

export const azuCalcConf = {
  royalChallenge: [
    { level: 0, azurite: 0 },
    { level: 1, azurite: 45 },
    { level: 2, azurite: 60 },
    { level: 3, azurite: 75 },
    { level: 4, azurite: 90 },
    { level: 5, azurite: 100 },
    { level: 6, azurite: 115 },
    { level: 7, azurite: 130 },
    { level: 8, azurite: 150 },
    { level: 9, azurite: 175 },
    { level: 10, azurite: 200 }
  ],
  chests: [
    { level: 0, azurite: 0 },
    { level: 1, azurite: 100 },
    { level: 2, azurite: 100 },
    { level: 3, azurite: 100 },
    { level: 4, azurite: 100 },
    { level: 5, azurite: 100 }
  ],
  card: 90
}

export const requirementList = [
  {
    c: 31,
    req: [
      { building: 'blacksmith', level: 30 },
      { building: 'castle', level: 31 }
    ]
  },
  {
    c: 32,
    req: [
      { building: 'wall', level: 31 },
      { building: 'drillGrounds', level: 31 },
      { building: 'castle', level: 32 }
    ]
  },
  {
    c: 33,
    req: [
      { building: 'wall', level: 32 },
      { building: 'depot', level: 31 },
      { building: 'depot', level: 32 },
      { building: 'castle', level: 33 }
    ]
  },
  {
    c: 34,
    req: [
      { building: 'wall', level: 33 },
      { building: 'embassy', level: 31 },
      { building: 'embassy', level: 32 },
      { building: 'embassy', level: 33 },
      { building: 'castle', level: 34 }
    ]
  },
  {
    c: 35,
    req: [
      { building: 'wall', level: 34 },
      { building: 'hospital', level: 31 },
      { building: 'hospital', level: 32 },
      { building: 'hospital', level: 33 },
      { building: 'hospital', level: 34 },
      { building: 'castle', level: 35 }
    ]
  },
  {
    c: 36,
    req: [
      { building: 'wall', level: 35 },
      { building: 'drillGrounds', level: 31 },
      { building: 'drillGrounds', level: 32 },
      { building: 'drillGrounds', level: 33 },
      { building: 'drillGrounds', level: 34 },
      { building: 'drillGrounds', level: 35 },
      { building: 'castle', level: 36 }
    ]
  },
  {
    c: 37,
    req: [
      { building: 'wall', level: 36 },
      { building: 'depot', level: 33 },
      { building: 'depot', level: 34 },
      { building: 'depot', level: 35 },
      { building: 'depot', level: 36 },
      { building: 'castle', level: 37 }
    ]
  },
  {
    c: 38,
    req: [
      { building: 'wall', level: 37 },
      { building: 'embassy', level: 34 },
      { building: 'embassy', level: 35 },
      { building: 'embassy', level: 36 },
      { building: 'embassy', level: 37 },
      { building: 'castle', level: 38 }
    ]
  },
  {
    c: 39,
    req: [
      { building: 'wall', level: 38 },
      { building: 'college', level: 31 },
      { building: 'college', level: 32 },
      { building: 'college', level: 33 },
      { building: 'college', level: 34 },
      { building: 'college', level: 35 },
      { building: 'college', level: 36 },
      { building: 'college', level: 37 },
      { building: 'college', level: 38 },
      { building: 'castle', level: 39 }
    ]
  },
  {
    c: 40,
    req: [
      { building: 'wall', level: 39 },
      { building: 'hospital', level: 34 },
      { building: 'hospital', level: 35 },
      { building: 'hospital', level: 36 },
      { building: 'hospital', level: 37 },
      { building: 'hospital', level: 38 },
      { building: 'hospital', level: 39 },
      { building: 'castle', level: 40 }
    ]
  },
  {
    c: 41,
    req: [
      { building: 'wall', level: 40 },
      { building: 'embassy', level: 38 },
      { building: 'embassy', level: 39 },
      { building: 'embassy', level: 40 },
      { building: 'chargeTier', level: 1 },
      { building: 'sacredCastle', level: 1 }
    ]
  },
  {
    c: 42,
    req: [
      { building: 'wall', level: 41 },
      { building: 'depot', level: 37 },
      { building: 'depot', level: 38 },
      { building: 'depot', level: 39 },
      { building: 'depot', level: 40 },
      { building: 'sacredDepot', level: 1 },
      { building: 'chargeTier', level: 2 },
      { building: 'sacredCastle', level: 2 }
    ]
  },
  {
    c: 43,
    req: [
      { building: 'sacredBarrack', level: 1 },
      { building: 'sacredBarrack', level: 2 },
      { building: 'wall', level: 42 },
      { building: 'sacredHospital', level: 1 },
      { building: 'sacredHospital', level: 2 },
      { building: 'chargeTier', level: 3 },
      { building: 'sacredCastle', level: 3 },
      { building: 'sacredBarrack', level: 3 }
    ]
  }
]

export const barracksReqList = [
  { building: 'barracks', level: 31 },
  { building: 'barracks', level: 32 },
  { building: 'barracks', level: 33 },
  { building: 'barracks', level: 34 },
  { building: 'barracks', level: 35 },
  { building: 'barracks', level: 36 },
  { building: 'barracks', level: 37 },
  { building: 'barracks', level: 38 },
  { building: 'barracks', level: 39 },
  { building: 'barracks', level: 40 },
  { building: 'sacredBarrack', level: 41, el: 1 },
  { building: 'sacredBarrack', level: 42, el: 2 },
  { building: 'sacredBarrack', level: 43, el: 3 }
]

export const angelsReqList = [
  { c: 32, building: 'guardianTemple', level: 6 },
  { c: 35, building: 'guardianTemple', level: 7 },
  { c: 38, building: 'guardianTemple', level: 8 },
  { c: 42, building: 'guardianTemple', level: 9 }
]
