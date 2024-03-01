// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { angelsReqList, barracksReqList, buildingList, requirementList } from 'src/data/building'
import CastleDetails from '../pages/planner/CastleDetailsDashboard'

const defaultInfo = {
  itemList: [],
  totalAzurite: [],
  movementsList: [],
  preset: '',
  presetB: '',
  selectedList: [],
  totalGot: { a: 0, w: 0, f: 0, s: 0, i: 0 },
  azuCalculator: { mineHour: 0, rcLevel: 0, card: 0, packs: 0, chests: 0, owned: 0, needed: 0, total: 0 },
  castle: {
    castle: { v: 0, min: 30, max: 43 },
    wall: { v: 0, min: 30, max: 43 },
    barracks: { v: 0, min: 30, max: 43 },
    drillGrounds: { v: 0, min: 30, max: 43 },
    guardianTemple: { v: 0, min: 30, max: 43 },
    depot: { v: 0, min: 30, max: 43 },
    embassy: { v: 0, min: 30, max: 43 },
    blacksmith: { v: 0, min: 30, max: 43 },
    college: { v: 0, min: 30, max: 43 },
    hospital: { v: 0, min: 30, max: 43 },
    chargeTier: { v: 0, min: 1, max: 3 }
  },
  strictMode: true
}

function getRssNeeded(minLevel, maxLevel, castleObj = { ...defaultInfo.castle }) {
  const resultList = []
  const barracksResultList = []
  const angelsResultList = []

  if (Object?.keys(castleObj) === 0) return

  // Get all castle buildings
  const buildingReqList = [...requirementList].filter(b => b.c > minLevel && b.c <= maxLevel)

  buildingReqList.forEach(brl => {
    const reqList = []
    brl.req.forEach(req => {
      if (castleObj[req.building]?.v < req.level) {
        const getBuildingInfo = buildingList.find(b => b.building === req.building && b.level === req.level)
        reqList.push({
          b: req.building,
          l: req.level,
          a: getBuildingInfo?.rss?.a,
          f: getBuildingInfo?.rss?.f,
          w: getBuildingInfo?.rss?.w,
          s: getBuildingInfo?.rss?.s,
          i: getBuildingInfo?.rss?.i
        })
      }
    })

    resultList.push({ c: brl.c, req: reqList })
  })

  // Generate totals
  const resultGenerate = (type, list) => {
    const rssList = []
    list.forEach(rl => {
      if (rl.req?.length > 0) {
        const azurite = rl.req.reduce((acc, cur) => acc + cur.a, 0)
        const food = rl.req.reduce((acc, cur) => acc + cur.f, 0)
        const wood = rl.req.reduce((acc, cur) => acc + cur.w, 0)
        const stone = rl.req.reduce((acc, cur) => acc + cur.s, 0)
        const iron = rl.req.reduce((acc, cur) => acc + cur.i, 0)
        rssList.push({ t: type, req: rl.req, l: rl.c, a: azurite, f: food, w: wood, s: stone, i: iron })
      }
    })

    return rssList
  }

  // Get Barracks buildings
  const barracksList = [...barracksReqList].filter(bl => bl.level > minLevel && bl.level <= maxLevel)

  barracksList.forEach(req => {
    const reqList = []
    if (castleObj['barracks']?.v < req.level) {
      const getBuildingInfo = buildingList.find(b => b.building === req.building && b.level === req.level)
      reqList.push({
        b: req.building,
        l: req.level,
        a: getBuildingInfo.rss.a,
        f: getBuildingInfo.rss.f,
        w: getBuildingInfo.rss.w,
        s: getBuildingInfo.rss.s,
        i: getBuildingInfo.rss.i
      })
    }

    barracksResultList.push({ c: req.level, req: reqList })
  })

  // Get Angels buildings
  const angelList = [...angelsReqList].filter(bl => bl.c > minLevel && bl.c <= maxLevel)

  angelList.forEach(req => {
    const reqList = []

    if (castleObj['guardianTemple']?.v < req.level) {
      const getBuildingInfo = buildingList.find(b => b.building === req.building && b.level === req.level)
      reqList.push({
        b: req.building,
        l: req.level,
        a: getBuildingInfo.rss.a,
        f: getBuildingInfo.rss.f,
        w: getBuildingInfo.rss.w,
        s: getBuildingInfo.rss.s,
        i: getBuildingInfo.rss.i
      })
    }

    angelsResultList.push({ c: req.level, req: reqList })
  })

  return {
    barracks: resultGenerate('barracks', barracksResultList),
    castle: resultGenerate('castle', resultList),
    angels: resultGenerate('guardianTemple', angelsResultList)
  }
}

function getTier(type, castleObj = {}) {
  const barrack = castleObj?.barracks?.v
  const guardianTemple = castleObj?.guardianTemple?.v
  let tier

  if (Object.keys(castleObj).length === 0) return 'None'
  if (type === 'troops') {
    if (barrack < 34) tier = 10
    if (barrack > 33 && barrack < 37) tier = 11
    if (barrack > 36 && barrack < 40) tier = 12
    if (barrack > 39 && barrack < 42) tier = 13
    if (barrack > 41 && barrack < 43) tier = 14
    if (barrack === 43) tier = 142
  }

  if (type === 'angels') {
    if (guardianTemple === 6) tier = 10
    if (guardianTemple === 7) tier = 11
    if (guardianTemple === 8) tier = 12
    if (guardianTemple === 9) tier = 13
    if (guardianTemple < 6) tier = 'None'
  }

  return tier
}

function getTotalReq(data, all = false) {
  const { angels, barracks, castle } = data
  const items = []
  let generalItems = 0

  if (angels?.length > 0) {
    angels.forEach(i => items.push(i.req))
  }

  if (barracks?.length > 0) {
    barracks.forEach(i => items.push(i.req))
  }

  if (castle?.length > 0) {
    castle.forEach(i => {
      i.req.forEach(id => {
        items.push(id)
      })
    })
  }

  if (all) {
    generalItems =
      requirementList.reduce((acc, cur) => acc + cur.req.length, 0) + barracksReqList.length + angelsReqList.length
  }

  return all ? generalItems : items.length
}

const CastleDetailsChart = () => {
  // ** Hooks
  const router = useRouter()
  const [planInfo, setPlanInfo] = useState(defaultInfo)

  const castleExtra = { tier: getTier('troops', planInfo.castle), angelTier: getTier('angels', planInfo.castle) }
  const totalBuildings = getTotalReq(getRssNeeded(30, 43, defaultInfo?.castle), true)
  const totalMissingBuildings = getTotalReq(getRssNeeded(30, 43, planInfo?.castle))
  const totalProgress = (1 - totalMissingBuildings / totalBuildings) * 100

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('planInfo'))
    }

    if (saved) {
      const strictMode = saved.hasOwnProperty('strictMode') ? saved.strictMode : defaultInfo.strictMode
      const castle = saved.hasOwnProperty('castle') ? saved.castle : defaultInfo.castle
      setPlanInfo({ ...saved, strictMode, castle })
    }
  }, [])

  const handleClick = () => {
    router.push('/planner')
  }

  return (
    <Card>
      <CardHeader
        title='Castle Details'
        action={
          <Button size='small' onClick={handleClick}>
            Check
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={[5, 0]}>
          <CastleDetails
            castle={planInfo.castle}
            extra={castleExtra}
            totalProgress={totalProgress}
            planInfo={planInfo}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CastleDetailsChart
