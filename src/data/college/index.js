export const treeAzuriteNeeded = {
  infantry: 416990,
  cavalry: 416990,
  archer: 416990,
  mage: 416990,
  angel: 110570
}

export const mysticCollege = [
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
  }
]

export const mysticBuildingReq = [
  { building: 'mcExhilaration', lvl: 1, mcReq: 1 },
  { building: 'mcExhilaration', lvl: 2, mcReq: 2 },
  { building: 'mcExhilaration', lvl: 3, mcReq: 3 },
  { building: 'mcExhilaration', lvl: 4, mcReq: 4 },
  { building: 'mcExhilaration', lvl: 5, mcReq: 5 },
  { building: 'mcToughness', lvl: 1, mcReq: 5 },
  { building: 'mcToughness', lvl: 2, mcReq: 5 },
  { building: 'mcToughness', lvl: 3, mcReq: 5 },
  { building: 'mcToughness', lvl: 4, mcReq: 5 },
  { building: 'mcToughness', lvl: 5, mcReq: 5 },
  { building: 'mcDodge', lvl: 1, mcReq: 1 },
  { building: 'mcDodge', lvl: 2, mcReq: 2 },
  { building: 'mcDodge', lvl: 3, mcReq: 3 },
  { building: 'mcDodge', lvl: 4, mcReq: 4 },
  { building: 'mcDodge', lvl: 5, mcReq: 5 },
  { building: 'mcSavageImpact', lvl: 1, mcReq: 5 },
  { building: 'mcSavageImpact', lvl: 2, mcReq: 5 },
  { building: 'mcSavageImpact', lvl: 3, mcReq: 5 },
  { building: 'mcSavageImpact', lvl: 4, mcReq: 5 },
  { building: 'mcSavageImpact', lvl: 5, mcReq: 5 },
  { building: 'mcMageKiller', lvl: 1, mcReq: 3 },
  { building: 'mcMageKiller', lvl: 2, mcReq: 4 },
  { building: 'mcMageKiller', lvl: 3, mcReq: 4 },
  { building: 'mcMageKiller', lvl: 4, mcReq: 4 },
  { building: 'mcMageKiller', lvl: 5, mcReq: 4 },
  { building: 'mcSplitArrow', lvl: 1, mcReq: 5 },
  { building: 'mcSplitArrow', lvl: 2, mcReq: 5 },
  { building: 'mcSplitArrow', lvl: 3, mcReq: 5 },
  { building: 'mcSplitArrow', lvl: 4, mcReq: 5 },
  { building: 'mcSplitArrow', lvl: 5, mcReq: 5 },
  { building: 'mcFatalHit', lvl: 1, mcReq: 4 },
  { building: 'mcFatalHit', lvl: 2, mcReq: 4 },
  { building: 'mcFatalHit', lvl: 3, mcReq: 4 },
  { building: 'mcFatalHit', lvl: 4, mcReq: 4 },
  { building: 'mcFatalHit', lvl: 5, mcReq: 4 },
  { building: 'mcFanaticism', lvl: 1, mcReq: 5 },
  { building: 'mcFanaticism', lvl: 2, mcReq: 5 },
  { building: 'mcFanaticism', lvl: 3, mcReq: 5 },
  { building: 'mcFanaticism', lvl: 4, mcReq: 5 },
  { building: 'mcFanaticism', lvl: 5, mcReq: 5 },
  { building: 'mcBlazingSoul', lvl: 1, mcReq: 1 },
  { building: 'mcBlazingSoul', lvl: 2, mcReq: 2 },
  { building: 'mcBlazingSoul', lvl: 3, mcReq: 3 },
  { building: 'mcBlazingSoul', lvl: 4, mcReq: 4 },
  { building: 'mcBlazingSoul', lvl: 5, mcReq: 5 },
  { building: 'mcFlameMissile', lvl: 1, mcReq: 3 },
  { building: 'mcFlameMissile', lvl: 2, mcReq: 3 },
  { building: 'mcFlameMissile', lvl: 3, mcReq: 3 },
  { building: 'mcFlameMissile', lvl: 4, mcReq: 5 },
  { building: 'mcFlameMissile', lvl: 5, mcReq: 5 },
  { building: 'eliteInfantry', lvl: 1, mcReq: 6 },
  { building: 'eliteInfantry', lvl: 2, mcReq: 6 },
  { building: 'eliteInfantry', lvl: 3, mcReq: 6 },
  { building: 'eliteInfantry', lvl: 4, mcReq: 6 },
  { building: 'eliteInfantry', lvl: 5, mcReq: 6 },
  { building: 'dragonArmor', lvl: 1, mcReq: 8 },
  { building: 'dragonArmor', lvl: 2, mcReq: 8 },
  { building: 'dragonArmor', lvl: 3, mcReq: 8 },
  { building: 'dragonArmor', lvl: 4, mcReq: 8 },
  { building: 'dragonArmor', lvl: 5, mcReq: 8 },
  { building: 'dragonScaleShield', lvl: 1, mcReq: 7 },
  { building: 'dragonScaleShield', lvl: 2, mcReq: 7 },
  { building: 'dragonScaleShield', lvl: 3, mcReq: 7 },
  { building: 'dragonScaleShield', lvl: 4, mcReq: 7 },
  { building: 'dragonScaleShield', lvl: 5, mcReq: 7 },
  { building: 'intervene', lvl: 1, mcReq: 9 },
  { building: 'intervene', lvl: 2, mcReq: 9 },
  { building: 'intervene', lvl: 3, mcReq: 9 },
  { building: 'intervene', lvl: 4, mcReq: 9 },
  { building: 'intervene', lvl: 5, mcReq: 9 },
  { building: 'eliteCavalry', lvl: 1, mcReq: 6 },
  { building: 'eliteCavalry', lvl: 2, mcReq: 6 },
  { building: 'eliteCavalry', lvl: 3, mcReq: 6 },
  { building: 'eliteCavalry', lvl: 4, mcReq: 6 },
  { building: 'eliteCavalry', lvl: 5, mcReq: 6 },
  { building: 'goldHorseshoes', lvl: 1, mcReq: 8 },
  { building: 'goldHorseshoes', lvl: 2, mcReq: 8 },
  { building: 'goldHorseshoes', lvl: 3, mcReq: 8 },
  { building: 'goldHorseshoes', lvl: 4, mcReq: 8 },
  { building: 'goldHorseshoes', lvl: 5, mcReq: 8 },
  { building: 'magicBarrier', lvl: 1, mcReq: 7 },
  { building: 'magicBarrier', lvl: 2, mcReq: 7 },
  { building: 'magicBarrier', lvl: 3, mcReq: 7 },
  { building: 'magicBarrier', lvl: 4, mcReq: 7 },
  { building: 'magicBarrier', lvl: 5, mcReq: 7 },
  { building: 'wildInstict', lvl: 1, mcReq: 9 },
  { building: 'wildInstict', lvl: 2, mcReq: 9 },
  { building: 'wildInstict', lvl: 3, mcReq: 9 },
  { building: 'wildInstict', lvl: 4, mcReq: 9 },
  { building: 'wildInstict', lvl: 5, mcReq: 9 },
  { building: 'eliteArcher', lvl: 1, mcReq: 6 },
  { building: 'eliteArcher', lvl: 2, mcReq: 6 },
  { building: 'eliteArcher', lvl: 3, mcReq: 6 },
  { building: 'eliteArcher', lvl: 4, mcReq: 6 },
  { building: 'eliteArcher', lvl: 5, mcReq: 6 },
  { building: 'dragonBow', lvl: 1, mcReq: 8 },
  { building: 'dragonBow', lvl: 2, mcReq: 8 },
  { building: 'dragonBow', lvl: 3, mcReq: 8 },
  { building: 'dragonBow', lvl: 4, mcReq: 8 },
  { building: 'dragonBow', lvl: 5, mcReq: 8 },
  { building: 'dragonslayerArrow', lvl: 1, mcReq: 7 },
  { building: 'dragonslayerArrow', lvl: 2, mcReq: 7 },
  { building: 'dragonslayerArrow', lvl: 3, mcReq: 7 },
  { building: 'dragonslayerArrow', lvl: 4, mcReq: 7 },
  { building: 'dragonslayerArrow', lvl: 5, mcReq: 7 },
  { building: 'rainOfArrows', lvl: 1, mcReq: 9 },
  { building: 'rainOfArrows', lvl: 2, mcReq: 9 },
  { building: 'rainOfArrows', lvl: 3, mcReq: 9 },
  { building: 'rainOfArrows', lvl: 4, mcReq: 9 },
  { building: 'rainOfArrows', lvl: 5, mcReq: 9 },
  { building: 'eliteMages', lvl: 1, mcReq: 6 },
  { building: 'eliteMages', lvl: 2, mcReq: 6 },
  { building: 'eliteMages', lvl: 3, mcReq: 6 },
  { building: 'eliteMages', lvl: 4, mcReq: 6 },
  { building: 'eliteMages', lvl: 5, mcReq: 6 },
  { building: 'phoenixWand', lvl: 1, mcReq: 8 },
  { building: 'phoenixWand', lvl: 2, mcReq: 8 },
  { building: 'phoenixWand', lvl: 3, mcReq: 8 },
  { building: 'phoenixWand', lvl: 4, mcReq: 8 },
  { building: 'phoenixWand', lvl: 5, mcReq: 8 },
  { building: 'pierceArmorSkill', lvl: 1, mcReq: 7 },
  { building: 'pierceArmorSkill', lvl: 2, mcReq: 7 },
  { building: 'pierceArmorSkill', lvl: 3, mcReq: 7 },
  { building: 'pierceArmorSkill', lvl: 4, mcReq: 7 },
  { building: 'pierceArmorSkill', lvl: 5, mcReq: 7 },
  { building: 'spell', lvl: 1, mcReq: 9 },
  { building: 'spell', lvl: 2, mcReq: 9 },
  { building: 'spell', lvl: 3, mcReq: 9 },
  { building: 'spell', lvl: 4, mcReq: 9 },
  { building: 'spell', lvl: 5, mcReq: 9 }
]

export const mysticBuilding = [
  {
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 1,
    rss: { f: 2219064, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [],
    troopType: 'infantry',
    statDesc: 'Increase HP of Infantry by 4%.'
  },
  {
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [],
    troopType: 'infantry',
    statDesc: 'Increase HP of Infantry by 7%.'
  },
  {
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [],
    troopType: 'infantry',
    statDesc: 'Increase HP of Infantry by 10%.'
  },
  {
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [],
    troopType: 'infantry',
    statDesc: 'Increase HP of Infantry by 13.5%.'
  },
  {
    building: 'mcExhilaration',
    desc: 'Exhilaration',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [],
    troopType: 'infantry',
    statDesc: 'Increase HP of Infantry by 18%.'
  },
  {
    building: 'mcToughness',
    desc: 'Toughness',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mcExhilaration', level: 3 }],
    troopType: 'infantry',
    statDesc: 'Infantry take 4.5% less attack damage.'
  },
  {
    building: 'mcToughness',
    desc: 'Toughness',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mcExhilaration', level: 3 }],
    troopType: 'infantry',
    statDesc: 'Infantry take 8% less attack damage.'
  },
  {
    building: 'mcToughness',
    desc: 'Toughness',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mcExhilaration', level: 3 }],
    troopType: 'infantry',
    statDesc: 'Infantry take 11.5% less attack damage.'
  },
  {
    building: 'mcToughness',
    desc: 'Toughness',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mcExhilaration', level: 3 }],
    troopType: 'infantry',
    statDesc: 'Infantry take 15.5% less attack damage.'
  },
  {
    building: 'mcToughness',
    desc: 'Toughness',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mcExhilaration', level: 3 }],
    troopType: 'infantry',
    statDesc: 'Infantry take 20% less attack damage.'
  },
  {
    building: 'mcDodge',
    desc: 'Dodge',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [],
    troopType: 'cavalry',
    statDesc: 'Cavalry have a 3.5% chance to dodge enemy attacks.'
  },
  {
    building: 'mcDodge',
    desc: 'Dodge',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [],
    troopType: 'cavalry',
    statDesc: 'Cavalry have a 6% chance to dodge enemy attacks.'
  },
  {
    building: 'mcDodge',
    desc: 'Dodge',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [],
    troopType: 'cavalry',
    statDesc: 'Cavalry have a 8.5% chance to dodge enemy attacks.'
  },
  {
    building: 'mcDodge',
    desc: 'Dodge',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [],
    troopType: 'cavalry',
    statDesc: 'Cavalry have a 12% chance to dodge enemy attacks.'
  },
  {
    building: 'mcDodge',
    desc: 'Dodge',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [],
    troopType: 'cavalry',
    statDesc: 'Cavalry have a 16% chance to dodge enemy attacks.'
  },
  {
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mcDodge', level: 3 }],
    troopType: 'cavalry',
    statDesc: 'Cavalry attacks have 5% chance to Stun targered enemies.'
  },
  {
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mcDodge', level: 3 }],
    troopType: 'cavalry',
    statDesc: 'Cavalry attacks have 8.5% chance to Stun targered enemies.'
  },
  {
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mcDodge', level: 3 }],
    troopType: 'cavalry',
    statDesc: 'Cavalry attacks have 12% chance to Stun targered enemies.'
  },
  {
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mcDodge', level: 3 }],
    troopType: 'cavalry',
    statDesc: 'Cavalry attacks have 16.5% chance to Stun targered enemies.'
  },
  {
    building: 'mcSavageImpact',
    desc: 'Savage Impact',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mcDodge', level: 3 }],
    troopType: 'cavalry',
    statDesc: 'Cavalry attacks have 21% chance to Stun targered enemies.'
  },
  {
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [],
    troopType: 'archer',
    statDesc: 'Archers deal 5.5% more damage to Mages'
  },
  {
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [],
    troopType: 'archer',
    statDesc: 'Archers deal 9.5% more damage to Mages'
  },
  {
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [],
    troopType: 'archer',
    statDesc: 'Archers deal 13.5% more damage to Mages'
  },
  {
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [],
    troopType: 'archer',
    statDesc: 'Archers deal 18.5% more damage to Mages'
  },
  {
    building: 'mcMageKiller',
    desc: 'Mage Killer',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [],
    troopType: 'archer',
    statDesc: 'Archers deal 24% more damage to Mages'
  },
  {
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mcMageKiller', level: 3 }],
    troopType: 'archer',
    statDesc: 'Archers have a 4% chance to simultaneously hit 3 enemies in the front.'
  },
  {
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mcMageKiller', level: 3 }],
    troopType: 'archer',
    statDesc: 'Archers have a 7% chance to simultaneously hit 3 enemies in the front.'
  },
  {
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mcMageKiller', level: 3 }],
    troopType: 'archer',
    statDesc: 'Archers have a 10% chance to simultaneously hit 3 enemies in the front.'
  },
  {
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mcMageKiller', level: 3 }],
    troopType: 'archer',
    statDesc: 'Archers have a 13.5% chance to simultaneously hit 3 enemies in the front.'
  },
  {
    building: 'mcSplitArrow',
    desc: 'Split Arrow',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mcMageKiller', level: 3 }],
    troopType: 'archer',
    statDesc: 'Archers have a 18% chance to simultaneously hit 3 enemies in the front.'
  },
  {
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [],
    troopType: 'mage',
    statDesc: 'Mages have a 3.5% chance of dealing higher damage to the enemy each attack.'
  },
  {
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [],
    troopType: 'mage',
    statDesc: 'Mages have a 6% chance of dealing higher damage to the enemy each attack.'
  },
  {
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [],
    troopType: 'mage',
    statDesc: 'Mages have a 8.5% chance of dealing higher damage to the enemy each attack.'
  },
  {
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [],
    troopType: 'mage',
    statDesc: 'Mages have a 12% chance of dealing higher damage to the enemy each attack.'
  },
  {
    building: 'mcFatalHit',
    desc: 'Fatal Hit',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [],
    troopType: 'mage',
    statDesc: 'Mages have a 16% chance of dealing higher damage to the enemy each attack.'
  },
  {
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mcFatalHit', level: 3 }],
    troopType: 'mage',
    statDesc: 'Mage Attack Damage increased by 4.5%.'
  },
  {
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mcFatalHit', level: 3 }],
    troopType: 'mage',
    statDesc: 'Mage Attack Damage increased by 8%.'
  },
  {
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mcFatalHit', level: 3 }],
    troopType: 'mage',
    statDesc: 'Mage Attack Damage increased by 11.5%.'
  },
  {
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mcFatalHit', level: 3 }],
    troopType: 'mage',
    statDesc: 'Mage Attack Damage increased by 15.5%.'
  },
  {
    building: 'mcFanaticism',
    desc: 'Fanaticism',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mcFatalHit', level: 3 }],
    troopType: 'mage',
    statDesc: 'Mage Attack Damage increased by 20%.'
  },
  {
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 3600 },
    requirements: [],
    troopType: 'angel',
    statDesc: 'Increases damage of Angels Sacred Flame by 5.5%.'
  },
  {
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 5460 },
    requirements: [],
    troopType: 'angel',
    statDesc: 'Increases damage of Angels Sacred Flame by 9.5%.'
  },
  {
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 7600 },
    requirements: [],
    troopType: 'angel',
    statDesc: 'Increases damage of Angels Sacred Flame by 13.5%.'
  },
  {
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10100 },
    requirements: [],
    troopType: 'angel',
    statDesc: 'Increases damage of Angels Sacred Flame by 18.5%.'
  },
  {
    building: 'mcBlazingSoul',
    desc: 'Blazing Soul',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13200 },
    requirements: [],
    troopType: 'angel',
    statDesc: 'Increases damage of Angels Sacred Flame by 24%.'
  },
  {
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 1,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 6600 },
    requirements: [{ building: 'mcBlazingSoul', level: 3 }],
    troopType: 'angel',
    statDesc: 'Angels normal attack deals additional 4.5% damage to one enemy nearest the target.'
  },
  {
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9750 },
    requirements: [{ building: 'mcBlazingSoul', level: 3 }],
    troopType: 'angel',
    statDesc: 'Angels normal attack deals additional 8% damage to one enemy nearest the target.'
  },
  {
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 13480 },
    requirements: [{ building: 'mcBlazingSoul', level: 3 }],
    troopType: 'angel',
    statDesc: 'Angels normal attack deals additional 11.5% damage to one enemy nearest the target.'
  },
  {
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 17780 },
    requirements: [{ building: 'mcBlazingSoul', level: 3 }],
    troopType: 'angel',
    statDesc: 'Angels normal attack deals additional 15.5% damage to one enemy nearest the target.'
  },
  {
    building: 'mcFlameMissile',
    desc: 'Flame Missile',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 23000 },
    requirements: [{ building: 'mcBlazingSoul', level: 3 }],
    troopType: 'angel',
    statDesc: 'Angels normal attack deals additional 20% damage to one enemy nearest the target.'
  },
  {
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base HP of Infantry by 20.'
  },
  {
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base HP of Infantry by 40.'
  },
  {
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base HP of Infantry by 60.'
  },
  {
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base HP of Infantry by 80.'
  },
  {
    building: 'eliteInfantry',
    desc: 'Elite Infantry',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base HP of Infantry by 100.'
  },
  {
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Reduces Damage taken by infantry during Cross-Realm battles by 4.5%.'
  },
  {
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Reduces Damage taken by infantry during Cross-Realm battles by 8%.'
  },
  {
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Reduces Damage taken by infantry during Cross-Realm battles by 11.5%.'
  },
  {
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Reduces Damage taken by infantry during Cross-Realm battles by 15.5%.'
  },
  {
    building: 'dragonArmor',
    desc: 'Dragon Armor',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Reduces Damage taken by infantry during Cross-Realm battles by 20%.'
  },
  {
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base Defense of Infantry by 3 when attacked by Archers.'
  },
  {
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base Defense of Infantry by 6 when attacked by Archers.'
  },
  {
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base Defense of Infantry by 9 when attacked by Archers.'
  },
  {
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base Defense of Infantry by 12 when attacked by Archers.'
  },
  {
    building: 'dragonScaleShield',
    desc: 'Dragon Scale Shield',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 }
    ],
    troopType: 'infantry',
    statDesc: 'Increases base Defense of Infantry by 15 when attacked by Archers.'
  },
  {
    building: 'intervene',
    desc: 'Intervene',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 },
      { building: 'dragonArmor', level: 3 },
      { building: 'dragonScaleShield', level: 3 }
    ],
    troopType: 'infantry',
    statDesc:
      'When battling with lords, infantry will share the Damage taken by Archers and Mages by 20%. Also, all shared Damage taken by Infantry is additionally reduced by 60%.'
  },
  {
    building: 'intervene',
    desc: 'Intervene',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 },
      { building: 'dragonArmor', level: 3 },
      { building: 'dragonScaleShield', level: 3 }
    ],
    troopType: 'infantry',
    statDesc:
      'When battling with lords, infantry will share the Damage taken by Archers and Mages by 25%. Also, all shared Damage taken by Infantry is additionally reduced by 60%.'
  },
  {
    building: 'intervene',
    desc: 'Intervene',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 },
      { building: 'dragonArmor', level: 3 },
      { building: 'dragonScaleShield', level: 3 }
    ],
    troopType: 'infantry',
    statDesc:
      'When battling with lords, infantry will share the Damage taken by Archers and Mages by 30%. Also, all shared Damage taken by Infantry is additionally reduced by 60%.'
  },
  {
    building: 'intervene',
    desc: 'Intervene',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 },
      { building: 'dragonArmor', level: 3 },
      { building: 'dragonScaleShield', level: 3 }
    ],
    troopType: 'infantry',
    statDesc:
      'When battling with lords, infantry will share the Damage taken by Archers and Mages by 40%. Also, all shared Damage taken by Infantry is additionally reduced by 60%.'
  },
  {
    building: 'intervene',
    desc: 'Intervene',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [
      { building: 'mcExhilaration', level: 3 },
      { building: 'mcToughness', level: 3 },
      { building: 'eliteInfantry', level: 3 },
      { building: 'dragonArmor', level: 3 },
      { building: 'dragonScaleShield', level: 3 }
    ],
    troopType: 'infantry',
    statDesc:
      'When battling with lords, infantry will share the Damage taken by Archers and Mages by 50%. Also, all shared Damage taken by Infantry is additionally reduced by 60%.'
  },
  {
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base HP of Cavalry by 20.'
  },
  {
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base HP of Cavalry by 40.'
  },
  {
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base HP of Cavalry by 60.'
  },
  {
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base HP of Cavalry by 80.'
  },
  {
    building: 'eliteCavalry',
    desc: 'Elite Cavalry',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base HP of Cavalry by 100.'
  },
  {
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Reduces Damage taken by Cavalry during Cross-Realm battles by 4.5%.'
  },
  {
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Reduces Damage taken by Cavalry during Cross-Realm battles by 8%.'
  },
  {
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Reduces Damage taken by Cavalry during Cross-Realm battles by 11.5%.'
  },
  {
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Reduces Damage taken by Cavalry during Cross-Realm battles by 15.5%.'
  },
  {
    building: 'goldHorseshoes',
    desc: 'Gold Horseshoes',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Reduces Damage taken by Cavalry during Cross-Realm battles by 20%.'
  },
  {
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base Defense of Cavalry by 3 when attacked by Mages.'
  },
  {
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base Defense of Cavalry by 6 when attacked by Mages.'
  },
  {
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base Defense of Cavalry by 9 when attacked by Mages.'
  },
  {
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base Defense of Cavalry by 12 when attacked by Mages.'
  },
  {
    building: 'magicBarrier',
    desc: 'Magic Barrier',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc: 'Increases base Defense of Cavalry by 15 when attacked by Mages.'
  },
  {
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 },
      { building: 'goldHorseshoes', level: 3 },
      { building: 'magicBarrier', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc:
      'Cavalry has 15% chance of perceiving an attack when battling with Lords, reducing the Damage of this attack by 13.5%. When it hasnt been triggered, the chances of being triggered increases by 15%. The effect can be stacked. The stacked effects are cleared after being triggered.'
  },
  {
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 },
      { building: 'goldHorseshoes', level: 3 },
      { building: 'magicBarrier', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc:
      'Cavalry has 15% chance of perceiving an attack when battling with Lords, reducing the Damage of this attack by 24%. When it hasnt been triggered, the chances of being triggered increases by 15%. The effect can be stacked. The stacked effects are cleared after being triggered.'
  },
  {
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 },
      { building: 'goldHorseshoes', level: 3 },
      { building: 'magicBarrier', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc:
      'Cavalry has 15% chance of perceiving an attack when battling with Lords, reducing the Damage of this attack by 34.5%. When it hasnt been triggered, the chances of being triggered increases by 15%. The effect can be stacked. The stacked effects are cleared after being triggered.'
  },
  {
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 },
      { building: 'goldHorseshoes', level: 3 },
      { building: 'magicBarrier', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc:
      'Cavalry has 15% chance of perceiving an attack when battling with Lords, reducing the Damage of this attack by 46.5%. When it hasnt been triggered, the chances of being triggered increases by 15%. The effect can be stacked. The stacked effects are cleared after being triggered.'
  },
  {
    building: 'wildInstict',
    desc: 'Wild Instinct',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [
      { building: 'mcDodge', level: 3 },
      { building: 'mcSavageImpact', level: 3 },
      { building: 'eliteCavalry', level: 3 },
      { building: 'goldHorseshoes', level: 3 },
      { building: 'magicBarrier', level: 3 }
    ],
    troopType: 'cavalry',
    statDesc:
      'Cavalry has 15% chance of perceiving an attack when battling with Lords, reducing the Damage of this attack by 60%. When it hasnt been triggered, the chances of being triggered increases by 15%. The effect can be stacked. The stacked effects are cleared after being triggered.'
  },
  {
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increasses base Attack of Archers by 2.'
  },
  {
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increasses base Attack of Archers by 4.'
  },
  {
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increasses base Attack of Archers by 6.'
  },
  {
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increasses base Attack of Archers by 8.'
  },
  {
    building: 'eliteArcher',
    desc: 'Elite Archers',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increasses base Attack of Archers by 10.'
  },
  {
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases Damage dealt by Archers during Cross-Realm battles by 4.5%.'
  },
  {
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases Damage dealt by Archers during Cross-Realm battles by 8%.'
  },
  {
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases Damage dealt by Archers during Cross-Realm battles by 11.5%.'
  },
  {
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases Damage dealt by Archers during Cross-Realm battles by 15.5%.'
  },
  {
    building: 'dragonBow',
    desc: 'Dragon Bow',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases Damage dealt by Archers during Cross-Realm battles by 20%.'
  },
  {
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases base Attack of Archers by 3 when Attacking Cavalry.'
  },
  {
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases base Attack of Archers by 6 when Attacking Cavalry.'
  },
  {
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases base Attack of Archers by 9 when Attacking Cavalry.'
  },
  {
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases base Attack of Archers by 12 when Attacking Cavalry.'
  },
  {
    building: 'dragonslayerArrow',
    desc: 'Dragonslayer Arrow',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 }
    ],
    troopType: 'archer',
    statDesc: 'Increases base Attack of Archers by 15 when Attacking Cavalry.'
  },
  {
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 },
      { building: 'dragonBow', level: 3 },
      { building: 'dragonslayerArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc:
      'When battling with Lords, Archers additionally launch the Rain of Arrows to attack all enemy Troops (exluding Beasts) when attacking 6 times, dealing Damage by 2% of Archers Normal Attack. Rain of Arrows has a 30% chance of additionally dealing Damage.'
  },
  {
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 },
      { building: 'dragonBow', level: 3 },
      { building: 'dragonslayerArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc:
      'When battling with Lords, Archers additionally launch the Rain of Arrows to attack all enemy Troops (exluding Beasts) when attacking 6 times, dealing Damage by 4.5% of Archers Normal Attack. Rain of Arrows has a 30% chance of additionally dealing Damage.'
  },
  {
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 },
      { building: 'dragonBow', level: 3 },
      { building: 'dragonslayerArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc:
      'When battling with Lords, Archers additionally launch the Rain of Arrows to attack all enemy Troops (exluding Beasts) when attacking 6 times, dealing Damage by 7% of Archers Normal Attack. Rain of Arrows has a 30% chance of additionally dealing Damage.'
  },
  {
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 },
      { building: 'dragonBow', level: 3 },
      { building: 'dragonslayerArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc:
      'When battling with Lords, Archers additionally launch the Rain of Arrows to attack all enemy Troops (exluding Beasts) when attacking 6 times, dealing Damage by 9.5% of Archers Normal Attack. Rain of Arrows has a 30% chance of additionally dealing Damage.'
  },
  {
    building: 'rainOfArrows',
    desc: 'Rain of Arrows',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [
      { building: 'mcMageKiller', level: 3 },
      { building: 'mcSplitArrow', level: 3 },
      { building: 'eliteArcher', level: 3 },
      { building: 'dragonBow', level: 3 },
      { building: 'dragonslayerArrow', level: 3 }
    ],
    troopType: 'archer',
    statDesc:
      'When battling with Lords, Archers additionally launch the Rain of Arrows to attack all enemy Troops (exluding Beasts) when attacking 6 times, dealing Damage by 12% of Archers Normal Attack. Rain of Arrows has a 30% chance of additionally dealing Damage.'
  },
  {
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 1,
    rss: { f: 4720951, w: 4720951, s: 916818, i: 482149, a: 6120 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increasses base Attack of Mages by 2.'
  },
  {
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 9120 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increasses base Attack of Mages by 4.'
  },
  {
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12640 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increasses base Attack of Mages by 6.'
  },
  {
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16720 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increasses base Attack of Mages by 8.'
  },
  {
    building: 'eliteMages',
    desc: 'Elite Mages',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 21720 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increasses base Attack of Mages by 10.'
  },
  {
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases Damage dealt by Mages during Cross-Realm battles by 4.5%.'
  },
  {
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases Damage dealt by Mages during Cross-Realm battles by 8%.'
  },
  {
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases Damage dealt by Mages during Cross-Realm battles by 11.5%.'
  },
  {
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases Damage dealt by Mages during Cross-Realm battles by 15.5%.'
  },
  {
    building: 'phoenixWand',
    desc: 'Phoenix Wand',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases Damage dealt by Mages during Cross-Realm battles by 20%.'
  },
  {
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 1,
    rss: { f: 5429093, w: 5429093, s: 1054340, i: 554471, a: 7030 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases base Attack of Mages by 3 when Attacking Infantry.'
  },
  {
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 10480 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases base Attack of Mages by 6 when Attacking Infantry.'
  },
  {
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 14530 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases base Attack of Mages by 9 when Attacking Infantry.'
  },
  {
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 19220 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases base Attack of Mages by 12 when Attacking Infantry.'
  },
  {
    building: 'pierceArmorSkill',
    desc: 'Pierce Armor Skill',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 24970 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 }
    ],
    troopType: 'mage',
    statDesc: 'Increases base Attack of Mages by 15 when Attacking Infantry.'
  },
  {
    building: 'spell',
    desc: 'Spell',
    level: 1,
    rss: { f: 6514911, w: 6514911, s: 1265208, i: 665365, a: 8080 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 },
      { building: 'phoenixWand', level: 3 },
      { building: 'pierceArmorSkill', level: 3 }
    ],
    troopType: 'mage',
    statDesc:
      'When battling with Lords, increase the critical Damage by Mages launching Critical Strikes by 6%. (Critical Strikes include Fatal Hit, Power Strike, and Critical Strike).'
  },
  {
    building: 'spell',
    desc: 'Spell',
    level: 2,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 12050 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 },
      { building: 'phoenixWand', level: 3 },
      { building: 'pierceArmorSkill', level: 3 }
    ],
    troopType: 'mage',
    statDesc:
      'When battling with Lords, increase the critical Damage by Mages launching Critical Strikes by 12.5%. (Critical Strikes include Fatal Hit, Power Strike, and Critical Strike).'
  },
  {
    building: 'spell',
    desc: 'Spell',
    level: 3,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 16700 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 },
      { building: 'phoenixWand', level: 3 },
      { building: 'pierceArmorSkill', level: 3 }
    ],
    troopType: 'mage',
    statDesc:
      'When battling with Lords, increase the critical Damage by Mages launching Critical Strikes by 19%. (Critical Strikes include Fatal Hit, Power Strike, and Critical Strike).'
  },
  {
    building: 'spell',
    desc: 'Spell',
    level: 4,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 22100 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 },
      { building: 'phoenixWand', level: 3 },
      { building: 'pierceArmorSkill', level: 3 }
    ],
    troopType: 'mage',
    statDesc:
      'When battling with Lords, increase the critical Damage by Mages launching Critical Strikes by 25%. (Critical Strikes include Fatal Hit, Power Strike, and Critical Strike).'
  },
  {
    building: 'spell',
    desc: 'Spell',
    level: 5,
    rss: { f: 0, w: 0, s: 0, i: 0, a: 28710 },
    requirements: [
      { building: 'mcFatalHit', level: 3 },
      { building: 'mcFanaticism', level: 3 },
      { building: 'eliteMages', level: 3 },
      { building: 'phoenixWand', level: 3 },
      { building: 'pierceArmorSkill', level: 3 }
    ],
    troopType: 'mage',
    statDesc:
      'When battling with Lords, increase the critical Damage by Mages launching Critical Strikes by 30%. (Critical Strikes include Fatal Hit, Power Strike, and Critical Strike).'
  }
]

export const mysticSlots = [
  {
    slot: 0,
    troop: 'infantry',
    minLevel: 0,
    maxLevel: 5,
    ability: [
      { key: 1, level: 0, a: 0, building: 'mcExhilaration' },
      { key: 2, level: 0, a: 0, building: 'mcToughness' },
      { key: 3, level: 0, a: 0, building: 'eliteInfantry' },
      { key: 4, level: 0, a: 0, building: 'dragonArmor' },
      { key: 5, level: 0, a: 0, building: 'dragonScaleShield' },
      { key: 6, level: 0, a: 0, building: 'intervene' }
    ]
  },
  {
    slot: 1,
    troop: 'cavalry',
    minLevel: 0,
    maxLevel: 5,
    ability: [
      { key: 1, level: 0, a: 0, building: 'mcDodge' },
      { key: 2, level: 0, a: 0, building: 'mcSavageImpact' },
      { key: 3, level: 0, a: 0, building: 'eliteCavalry' },
      { key: 4, level: 0, a: 0, building: 'goldHorseshoes' },
      { key: 5, level: 0, a: 0, building: 'magicBarrier' },
      { key: 6, level: 0, a: 0, building: 'wildInstict' }
    ]
  },
  {
    slot: 2,
    troop: 'archer',
    minLevel: 0,
    maxLevel: 5,
    ability: [
      { key: 1, level: 0, a: 0, building: 'mcMageKiller' },
      { key: 2, level: 0, a: 0, building: 'mcSplitArrow' },
      { key: 3, level: 0, a: 0, building: 'eliteArcher' },
      { key: 4, level: 0, a: 0, building: 'dragonBow' },
      { key: 5, level: 0, a: 0, building: 'dragonslayerArrow' },
      { key: 6, level: 0, a: 0, building: 'rainOfArrows' }
    ]
  },
  {
    slot: 3,
    troop: 'mage',
    minLevel: 0,
    maxLevel: 5,
    ability: [
      { key: 1, level: 0, a: 0, building: 'mcFatalHit' },
      { key: 2, level: 0, a: 0, building: 'mcFanaticism' },
      { key: 3, level: 0, a: 0, building: 'eliteMages' },
      { key: 4, level: 0, a: 0, building: 'phoenixWand' },
      { key: 5, level: 0, a: 0, building: 'pierceArmorSkill' },
      { key: 6, level: 0, a: 0, building: 'spell' }
    ]
  },
  {
    slot: 4,
    troop: 'angel',
    minLevel: 0,
    maxLevel: 5,
    ability: [
      { key: 1, level: 0, a: 0, building: 'mcBlazingSoul' },
      { key: 2, level: 0, a: 0, building: 'mcFlameMissile' }
    ]
  }
]

export const highCollegeOptions = [
  {
    row: 'A',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Manage Food I',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: 0,
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Food costs for Building $1%.',
    levels: [
      { level: 1, points: 1170, stat: [2] },
      { level: 2, points: 1430, stat: [4] },
      { level: 3, points: 1650, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'A',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Manage Wood I',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: 0,
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Wood costs for Building $1%.',
    levels: [
      { level: 1, points: 1170, stat: [2] },
      { level: 2, points: 1430, stat: [4] },
      { level: 3, points: 1650, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'B',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Manage Stone I',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [{ row: 'A', col: 1, minLevel: 1 }],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Stone costs for Building $1%.',
    levels: [
      { level: 1, points: 1340, stat: [2] },
      { level: 2, points: 1620, stat: [4] },
      { level: 3, points: 2060, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'B',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Manage Iron I',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [{ row: 'A', col: 2, minLevel: 1 }],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Iron costs for Building $1%.',
    levels: [
      { level: 1, points: 1340, stat: [2] },
      { level: 2, points: 1620, stat: [4] },
      { level: 3, points: 2060, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'C',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Superior Leadership I',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increase the limit of the Marching Army to $1.',
    levels: [
      { level: 1, points: 680, stat: [1600] },
      { level: 2, points: 890, stat: [3200] },
      { level: 3, points: 1130, stat: [4800] },
      { level: 4, points: 1400, stat: [6400] },
      { level: 5, points: 1680, stat: [8000] }
    ]
  },

  {
    row: 'D',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Melee Attack I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the Attack of Infantry and Cavalry $1%.',
    levels: [
      { level: 1, points: 270, stat: [1] },
      { level: 2, points: 380, stat: [2] },
      { level: 3, points: 500, stat: [3] },
      { level: 4, points: 610, stat: [4] },
      { level: 5, points: 730, stat: [5] },
      { level: 6, points: 850, stat: [6] },
      { level: 7, points: 990, stat: [7] },
      { level: 8, points: 1130, stat: [8] },
      { level: 9, points: 1280, stat: [9] },
      { level: 10, points: 1450, stat: [10] }
    ]
  },

  {
    row: 'D',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Ranged Attack I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the Attack of Mages and Archers $1%.',
    levels: [
      { level: 1, points: 270, stat: [1] },
      { level: 2, points: 380, stat: [2] },
      { level: 3, points: 500, stat: [3] },
      { level: 4, points: 610, stat: [4] },
      { level: 5, points: 730, stat: [5] },
      { level: 6, points: 850, stat: [6] },
      { level: 7, points: 990, stat: [7] },
      { level: 8, points: 1130, stat: [8] },
      { level: 9, points: 1280, stat: [9] },
      { level: 10, points: 1450, stat: [10] }
    ]
  },

  {
    row: 'E',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Melee HP I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the HP of Infantry and Cavalry $1%.',
    levels: [
      { level: 1, points: 270, stat: [1] },
      { level: 2, points: 380, stat: [2] },
      { level: 3, points: 500, stat: [3] },
      { level: 4, points: 610, stat: [4] },
      { level: 5, points: 730, stat: [5] },
      { level: 6, points: 850, stat: [6] },
      { level: 7, points: 990, stat: [7] },
      { level: 8, points: 1130, stat: [8] },
      { level: 9, points: 1280, stat: [9] },
      { level: 10, points: 1450, stat: [10] }
    ]
  },

  {
    row: 'E',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Ranged HP I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the HP of Mages and Archers $1%.',
    levels: [
      { level: 1, points: 270, stat: [1] },
      { level: 2, points: 380, stat: [2] },
      { level: 3, points: 500, stat: [3] },
      { level: 4, points: 610, stat: [4] },
      { level: 5, points: 730, stat: [5] },
      { level: 6, points: 850, stat: [6] },
      { level: 7, points: 990, stat: [7] },
      { level: 8, points: 1130, stat: [8] },
      { level: 9, points: 1280, stat: [9] },
      { level: 10, points: 1450, stat: [10] }
    ]
  },

  {
    row: 'F',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Superior Angel Attack I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the Attack of Angels $1%.',
    levels: [
      { level: 1, points: 320, stat: [1] },
      { level: 2, points: 440, stat: [2] },
      { level: 3, points: 570, stat: [3] },
      { level: 4, points: 680, stat: [4] },
      { level: 5, points: 810, stat: [5] },
      { level: 6, points: 940, stat: [6] },
      { level: 7, points: 1080, stat: [7] },
      { level: 8, points: 1240, stat: [8] },
      { level: 9, points: 1400, stat: [9] },
      { level: 10, points: 1570, stat: [10] }
    ]
  },

  {
    row: 'G',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Superior Angel HP I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the HP of Angels $1%.',
    levels: [
      { level: 1, points: 320, stat: [1] },
      { level: 2, points: 440, stat: [2] },
      { level: 3, points: 570, stat: [3] },
      { level: 4, points: 680, stat: [4] },
      { level: 5, points: 810, stat: [5] },
      { level: 6, points: 940, stat: [6] },
      { level: 7, points: 1080, stat: [7] },
      { level: 8, points: 1240, stat: [8] },
      { level: 9, points: 1400, stat: [9] },
      { level: 10, points: 1570, stat: [10] }
    ]
  },

  {
    row: 'H',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Elite Blade I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases Damage of Troops during Elite War $1%.',
    levels: [
      { level: 1, points: 320, stat: [2] },
      { level: 2, points: 440, stat: [4] },
      { level: 3, points: 570, stat: [6] },
      { level: 4, points: 680, stat: [8] },
      { level: 5, points: 810, stat: [10] },
      { level: 6, points: 940, stat: [12] },
      { level: 7, points: 1080, stat: [14] },
      { level: 8, points: 1240, stat: [16] },
      { level: 9, points: 1400, stat: [18] },
      { level: 10, points: 1570, stat: [20] }
    ]
  },

  {
    row: 'H',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Invasion Blade I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases Damage of Troops during Realm Invasion $1%.',
    levels: [
      { level: 1, points: 320, stat: [2] },
      { level: 2, points: 440, stat: [4] },
      { level: 3, points: 570, stat: [6] },
      { level: 4, points: 680, stat: [8] },
      { level: 5, points: 810, stat: [10] },
      { level: 6, points: 940, stat: [12] },
      { level: 7, points: 1080, stat: [14] },
      { level: 8, points: 1240, stat: [16] },
      { level: 9, points: 1400, stat: [18] },
      { level: 10, points: 1570, stat: [20] }
    ]
  },

  {
    row: 'I',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Elite Shield I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Damage taken by Troops during Elite War $1%.',
    levels: [
      { level: 1, points: 320, stat: [1.5] },
      { level: 2, points: 440, stat: [3] },
      { level: 3, points: 570, stat: [4.5] },
      { level: 4, points: 680, stat: [6] },
      { level: 5, points: 810, stat: [7.5] },
      { level: 6, points: 940, stat: [9] },
      { level: 7, points: 1080, stat: [10.5] },
      { level: 8, points: 1240, stat: [12] },
      { level: 9, points: 1400, stat: [13.5] },
      { level: 10, points: 1570, stat: [15] }
    ]
  },

  {
    row: 'I',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Invasion Shield I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Damage taken by Troops during Realm Invasion $1%.',
    levels: [
      { level: 1, points: 320, stat: [1.5] },
      { level: 2, points: 440, stat: [3] },
      { level: 3, points: 570, stat: [4.5] },
      { level: 4, points: 680, stat: [6] },
      { level: 5, points: 810, stat: [7.5] },
      { level: 6, points: 940, stat: [9] },
      { level: 7, points: 1080, stat: [10.5] },
      { level: 8, points: 1240, stat: [12] },
      { level: 9, points: 1400, stat: [13.5] },
      { level: 10, points: 1570, stat: [15] }
    ]
  },

  {
    row: 'J',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Rally Decree I',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the limit of Rally Troops to $1.',
    levels: [
      { level: 1, points: 800, stat: [30000] },
      { level: 2, points: 0, stat: [60000] },
      { level: 3, points: 0, stat: [90000] },
      { level: 4, points: 0, stat: [120000] },
      { level: 5, points: 0, stat: [150000] },
      { level: 6, points: 0, stat: [180000] },
      { level: 7, points: 0, stat: [210000] },
      { level: 8, points: 0, stat: [240000] },
      { level: 9, points: 0, stat: [270000] },
      { level: 10, points: 0, stat: [300000] }
    ]
  },

  {
    row: 'K',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Manage Food II',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Food costs for Building $1%.',
    levels: [
      { level: 1, points: 3000, stat: [2] },
      { level: 2, points: 3650, stat: [4] },
      { level: 3, points: 0, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'K',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Manage Wood II',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Wood costs for Building $1%.',
    levels: [
      { level: 1, points: 3000, stat: [2] },
      { level: 2, points: 3650, stat: [4] },
      { level: 3, points: 0, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'L',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Manage Stone II',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Stone costs for Building $1%.',
    levels: [
      { level: 1, points: 3370, stat: [2] },
      { level: 2, points: 4040, stat: [4] },
      { level: 3, points: 0, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'L',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Manage Iron II',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Iron costs for Building $1%.',
    levels: [
      { level: 1, points: 3370, stat: [2] },
      { level: 2, points: 4040, stat: [4] },
      { level: 3, points: 0, stat: [6] },
      { level: 4, points: 0, stat: [8] },
      { level: 5, points: 0, stat: [10] }
    ]
  },

  {
    row: 'M',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Superior Leadership II',
    counter: 0,
    maxCounter: 5,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increase the limit of the Marching Army to $1.',
    levels: [
      { level: 1, points: 2010, stat: [1600] },
      { level: 2, points: 2360, stat: [3200] },
      { level: 3, points: 2730, stat: [4800] },
      { level: 4, points: 3140, stat: [6400] },
      { level: 5, points: 3570, stat: [8000] }
    ]
  },

  {
    row: 'N',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Melee Attack II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the Attack of Infantry and Cavalry $1%.',
    levels: [
      { level: 1, points: 1570, stat: [1] },
      { level: 2, points: 1680, stat: [2] },
      { level: 3, points: 1810, stat: [3] },
      { level: 4, points: 1940, stat: [4] },
      { level: 5, points: 2070, stat: [5] },
      { level: 6, points: 2210, stat: [6] },
      { level: 7, points: 2360, stat: [7] },
      { level: 8, points: 2510, stat: [8] },
      { level: 9, points: 2660, stat: [9] },
      { level: 10, points: 2810, stat: [10] }
    ]
  },

  {
    row: 'N',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Ranged Attack II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the Attack of Mages and Archers $1%.',
    levels: [
      { level: 1, points: 1570, stat: [1] },
      { level: 2, points: 1680, stat: [2] },
      { level: 3, points: 1810, stat: [3] },
      { level: 4, points: 1940, stat: [4] },
      { level: 5, points: 2070, stat: [5] },
      { level: 6, points: 2210, stat: [6] },
      { level: 7, points: 2360, stat: [7] },
      { level: 8, points: 2510, stat: [8] },
      { level: 9, points: 2660, stat: [9] },
      { level: 10, points: 2810, stat: [10] }
    ]
  },

  {
    row: 'O',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Melee HP II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the HP of Infantry and Cavalry $1%.',
    levels: [
      { level: 1, points: 1570, stat: [1] },
      { level: 2, points: 1680, stat: [2] },
      { level: 3, points: 1810, stat: [3] },
      { level: 4, points: 1940, stat: [4] },
      { level: 5, points: 2070, stat: [5] },
      { level: 6, points: 2210, stat: [6] },
      { level: 7, points: 2360, stat: [7] },
      { level: 8, points: 2510, stat: [8] },
      { level: 9, points: 2660, stat: [9] },
      { level: 10, points: 2810, stat: [10] }
    ]
  },

  {
    row: 'O',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Ranged HP II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the HP of Mages and Archers $1%.',
    levels: [
      { level: 1, points: 1570, stat: [1] },
      { level: 2, points: 1680, stat: [2] },
      { level: 3, points: 1810, stat: [3] },
      { level: 4, points: 1940, stat: [4] },
      { level: 5, points: 2070, stat: [5] },
      { level: 6, points: 2210, stat: [6] },
      { level: 7, points: 2360, stat: [7] },
      { level: 8, points: 2510, stat: [8] },
      { level: 9, points: 2660, stat: [9] },
      { level: 10, points: 2810, stat: [10] }
    ]
  },

  {
    row: 'P',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Superior Angel Attack II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 },
      { row: 'O', col: 1, minLevel: 1 },
      { row: 'O', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the Attack of Angels $1%.',
    levels: [
      { level: 1, points: 1680, stat: [1] },
      { level: 2, points: 1810, stat: [2] },
      { level: 3, points: 1940, stat: [3] },
      { level: 4, points: 2070, stat: [4] },
      { level: 5, points: 2210, stat: [5] },
      { level: 6, points: 2360, stat: [6] },
      { level: 7, points: 2510, stat: [7] },
      { level: 8, points: 2660, stat: [8] },
      { level: 9, points: 2810, stat: [9] },
      { level: 10, points: 2970, stat: [10] }
    ]
  },

  {
    row: 'Q',
    col: 1,
    type: 1,
    beast: 'all',
    description: 'Superior Angel HP II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 },
      { row: 'O', col: 1, minLevel: 1 },
      { row: 'O', col: 2, minLevel: 1 },
      { row: 'P', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases the HP of Angels $1%.',
    levels: [
      { level: 1, points: 1680, stat: [1] },
      { level: 2, points: 1810, stat: [2] },
      { level: 3, points: 1940, stat: [3] },
      { level: 4, points: 2070, stat: [4] },
      { level: 5, points: 2210, stat: [5] },
      { level: 6, points: 2360, stat: [6] },
      { level: 7, points: 2510, stat: [7] },
      { level: 8, points: 2660, stat: [8] },
      { level: 9, points: 2810, stat: [9] },
      { level: 10, points: 2970, stat: [10] }
    ]
  },

  {
    row: 'R',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Elite Blade II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 },
      { row: 'O', col: 1, minLevel: 1 },
      { row: 'O', col: 2, minLevel: 1 },
      { row: 'P', col: 1, minLevel: 1 },
      { row: 'Q', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases Damage of Troops during Elite War $1%.',
    levels: [
      { level: 1, points: 1680, stat: [2] },
      { level: 2, points: 1810, stat: [4] },
      { level: 3, points: 1940, stat: [6] },
      { level: 4, points: 2070, stat: [8] },
      { level: 5, points: 2210, stat: [10] },
      { level: 6, points: 2360, stat: [12] },
      { level: 7, points: 2510, stat: [14] },
      { level: 8, points: 2660, stat: [16] },
      { level: 9, points: 2810, stat: [18] },
      { level: 10, points: 2970, stat: [20] }
    ]
  },

  {
    row: 'R',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Invasion Blade II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 },
      { row: 'O', col: 1, minLevel: 1 },
      { row: 'O', col: 2, minLevel: 1 },
      { row: 'P', col: 1, minLevel: 1 },
      { row: 'Q', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Increases Damage of Troops during Realm Invasion $1%.',
    levels: [
      { level: 1, points: 1680, stat: [2] },
      { level: 2, points: 1810, stat: [4] },
      { level: 3, points: 1940, stat: [6] },
      { level: 4, points: 2070, stat: [8] },
      { level: 5, points: 2210, stat: [10] },
      { level: 6, points: 2360, stat: [12] },
      { level: 7, points: 2510, stat: [14] },
      { level: 8, points: 2660, stat: [16] },
      { level: 9, points: 2810, stat: [18] },
      { level: 10, points: 2970, stat: [20] }
    ]
  },

  {
    row: 'S',
    col: 1,
    type: 2,
    beast: 'all',
    description: 'Elite Shield II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 },
      { row: 'O', col: 1, minLevel: 1 },
      { row: 'O', col: 2, minLevel: 1 },
      { row: 'P', col: 1, minLevel: 1 },
      { row: 'Q', col: 1, minLevel: 1 },
      { row: 'R', col: 1, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Damage taken by Troops during Elite War $1%.',
    levels: [
      { level: 1, points: 1680, stat: [1.5] },
      { level: 2, points: 1810, stat: [3] },
      { level: 3, points: 1940, stat: [4.5] },
      { level: 4, points: 2070, stat: [6] },
      { level: 5, points: 2210, stat: [7.5] },
      { level: 6, points: 2360, stat: [9] },
      { level: 7, points: 2510, stat: [10.5] },
      { level: 8, points: 2660, stat: [12] },
      { level: 9, points: 2810, stat: [13.5] },
      { level: 10, points: 2970, stat: [15] }
    ]
  },

  {
    row: 'S',
    col: 2,
    type: 2,
    beast: 'all',
    description: 'Invasion Shield II',
    counter: 0,
    maxCounter: 10,
    minCounter: 0,
    dependency: [
      { row: 'A', col: 1, minLevel: 1 },
      { row: 'A', col: 2, minLevel: 1 },
      { row: 'B', col: 1, minLevel: 1 },
      { row: 'B', col: 2, minLevel: 1 },
      { row: 'C', col: 1, minLevel: 1 },
      { row: 'D', col: 1, minLevel: 1 },
      { row: 'D', col: 2, minLevel: 1 },
      { row: 'E', col: 1, minLevel: 1 },
      { row: 'E', col: 2, minLevel: 1 },
      { row: 'F', col: 1, minLevel: 1 },
      { row: 'G', col: 1, minLevel: 1 },
      { row: 'H', col: 1, minLevel: 1 },
      { row: 'H', col: 2, minLevel: 1 },
      { row: 'I', col: 1, minLevel: 1 },
      { row: 'I', col: 2, minLevel: 1 },
      { row: 'J', col: 1, minLevel: 1 },
      { row: 'K', col: 1, minLevel: 1 },
      { row: 'K', col: 2, minLevel: 1 },
      { row: 'L', col: 1, minLevel: 1 },
      { row: 'L', col: 2, minLevel: 1 },
      { row: 'M', col: 1, minLevel: 1 },
      { row: 'N', col: 1, minLevel: 1 },
      { row: 'N', col: 2, minLevel: 1 },
      { row: 'O', col: 1, minLevel: 1 },
      { row: 'O', col: 2, minLevel: 1 },
      { row: 'P', col: 1, minLevel: 1 },
      { row: 'Q', col: 1, minLevel: 1 },
      { row: 'R', col: 2, minLevel: 1 }
    ],
    curLevel: 0,
    curTotalPoints: 0,
    statText: 'Reduces Damage taken by Troops during Realm Invasion $1%.',
    levels: [
      { level: 1, points: 1680, stat: [1.5] },
      { level: 2, points: 1810, stat: [3] },
      { level: 3, points: 1940, stat: [4.5] },
      { level: 4, points: 2070, stat: [6] },
      { level: 5, points: 2210, stat: [7.5] },
      { level: 6, points: 2360, stat: [9] },
      { level: 7, points: 2510, stat: [10.5] },
      { level: 8, points: 2660, stat: [12] },
      { level: 9, points: 2810, stat: [13.5] },
      { level: 10, points: 2970, stat: [15] }
    ]
  }
]
