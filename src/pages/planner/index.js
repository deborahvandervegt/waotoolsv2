// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** Next Import

// ** MUI Imports
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MuiTabList from '@mui/lab/TabList'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import {
  azuCalcConf,
  angelsReqList,
  buildingList,
  buildingLevel,
  extraBarracks,
  itemTemplates,
  requirementList,
  barracksReqList
} from 'src/data/building'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'

// ** Styled Components
import { TabContext, TabPanel } from '@mui/lab'
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Fade,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  useMediaQuery
} from '@mui/material'
import moment from 'moment'
import CustomHeader from 'src/@core/components/Header'
import { nFormatter } from 'src/@core/utils/numberFormatter'
import nRound from 'src/@core/utils/numberRound'
import { InfoOutlined } from '@mui/icons-material'
import { red } from '@mui/material/colors'
import CastleDetails from 'src/views/pages/planner/CastleDetails'

// ** Styled component for the link in the dataTable (Add from template button)
const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.skyPaletteSecondary,
  color: theme.palette.customColors.skyPaletteTitle,
  '&:hover': {
    backgroundColor: theme.palette.customColors.skyPaletteSecondary,
    filter: 'brightness(0.85)'
  }
}))

const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700],
    filter: 'brightness(0.85)'
  }
}))

// ** Save button
const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.skyPaletteTertiary,
  color: theme.palette.customColors.skyPaletteTitle,
  '&:hover': {
    backgroundColor: theme.palette.customColors.skyPaletteTertiary,
    filter: 'brightness(0.85)'
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const CustomBox = styled(Box)(({ theme }) => ({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
}))

const RssBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}))

// ** Variables
const defaultColumns = [
  {
    flex: 0.1,
    field: 'item',
    minWidth: 100,
    headerName: 'Item',
    valueGetter: params => params.row?.desc,
    renderCell: ({ row }) => {
      const { type, desc } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderClient(row)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {desc}
            </Typography>
            <Typography noWrap variant='caption'>
              {type}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'level',
    headerName: 'Level',
    renderCell: ({ row }) => <Typography variant='body2'>{`${row.level.toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'azurite',
    headerName: 'Azurite',
    valueGetter: params => params.row?.rss?.a,
    renderCell: ({ row }) => <Typography variant='body2'>{`${row.rss.a.toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'food',
    headerName: 'Food',
    valueGetter: params => params.row?.rss?.f,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.f).toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'wood',
    headerName: 'Wood',
    valueGetter: params => params.row?.rss?.w,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.w).toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'stone',
    headerName: 'Stone',
    valueGetter: params => params.row?.rss?.s,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.s).toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'iron',
    headerName: 'Iron',
    valueGetter: params => params.row?.rss?.i,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.i).toLocaleString() || 0}`}</Typography>
  }
]

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

// ** Custom Functions
function getTotalAzurite(template) {
  let newArray = []

  const arr = itemTemplates?.find(i => i.template === template)

  if (!arr) return 0

  arr.buildings.forEach(t => {
    const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
    if (buildingObj) {
      newArray.push(buildingObj)
    }
  })

  if (newArray?.length > 0) {
    const totalAzurite = newArray.reduce((accumulator, currentValue) => accumulator + currentValue?.rss?.a, 0)

    return totalAzurite
  }

  return 0
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

/* eslint-enable */
const Planner = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([])
  const [activeTab, setActiveTab] = useState('castle')
  const [isLoading, setIsLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showAddTemplate, setShowAddTemplate] = useState(false)
  const [showAddItems, setShowAddItems] = useState(false)
  const [showAutoFill, setShowAutoFill] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddTemp, setShowAddTemp] = useState(false)
  const [showAddTempAzurite, setShowAddtempAzurite] = useState(0)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [planInfo, setPlanInfo] = useState(defaultInfo)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
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
    setIsLoading(false)
  }, [])

  const handleLoadTemplateChange = e => {
    const newPreset = e.target.value
    const selectedList = itemTemplates?.find(i => i.template === newPreset)

    setPlanInfo({
      ...planInfo,
      preset: newPreset,
      selectedList: [...selectedList.buildings, ...planInfo?.selectedList]
    })
    const tmpA = getTotalAzurite(newPreset)
    const tmpB = getTotalAzurite(planInfo?.presetB)
    const total = tmpA + (tmpB > 0 ? tmpB : 0)
    setShowAddtempAzurite(total)
  }

  const handleLoadTemplateBChange = e => {
    const newPreset = e.target.value
    const selectedList = itemTemplates?.find(i => i.template === newPreset)

    setPlanInfo({
      ...planInfo,
      presetB: newPreset,
      selectedList: [...selectedList.buildings, ...planInfo?.selectedList]
    })
    const tmpA = getTotalAzurite(newPreset)
    const tmpB = getTotalAzurite(planInfo?.preset)
    const total = tmpA + (tmpB > 0 ? tmpB : 0)
    setShowAddtempAzurite(total)
  }

  const handleSelectedItemsChange = v => {
    const newValues = [...v]
    setPlanInfo({
      ...planInfo,
      selectedList: newValues
    })
  }

  const handleAddTemplateClose = props => {
    setShowAddTemplate(false)
  }

  const handleAddItemClose = e => {
    setShowAddItems(false)
    handleClearDialogForm()
  }

  const handleClearDialogForm = () => {
    setShowAddTemp(false)
    setShowAddtempAzurite(false)
    setShowAddtempAzurite(false)

    setPlanInfo({ ...planInfo, preset: '', presetB: '', selectedList: [] })
  }

  const handleLoadTemplateSave = e => {
    let newItemList = []
    let templateObjA, templateObjB
    const itemList = [...planInfo.itemList]

    templateObjA = itemTemplates?.find(i => i.template === planInfo?.preset)
    if (planInfo?.presetB?.length > 0) templateObjB = itemTemplates?.find(i => i.template === planInfo?.presetB)
    if (templateObjB) templateObjA.buildings = [...templateObjA.buildings, ...templateObjB.buildings]
    const templateObj = templateObjA

    if (templateObj?.buildings?.length > 0) {
      templateObj.buildings.forEach(t => {
        const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
        if (buildingObj) {
          newItemList.push(buildingObj)
        }
      })
    }

    if (newItemList?.length > 0) {
      const newFilteredItemList = [
        ...newItemList?.filter(elem => {
          return !itemList?.some(ele => {
            return ele.building === elem.building && ele.level === elem.level
          })
        })
      ]

      const newList = [...itemList, ...newFilteredItemList]
      let currentDate = new Date().toJSON().slice(0, 10)
      let newMovementsList = []

      if (newList.length > 0) {
        newList.forEach(t => {
          const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
          if (buildingObj) {
            newMovementsList.push(buildingObj)
          }
        })
      }

      const newMovements = [...newMovementsList].map(m => {
        return {
          building: m.building,
          desc: m.desc,
          level: m.level,
          rss: { a: m.rss.a },
          movementDate: currentDate,
          type: 'ADDED'
        }
      })

      // setMovementsList([...newMovements, ...movementsList])
      setPlanInfo({ ...planInfo, itemList: newList, preset: '', presetB: '', selectedList: [] })
      setShowAddTemplate(false)
      setShowAddTemp(false)
      setShowAddtempAzurite(false)
      setShowAddtempAzurite(false)

      return toast.success('Item/s added from Preset successfully!')
    }

    return toast.blank('No changes made!')
  }

  const handleSaveItems = e => {
    const newArray = [...planInfo.itemList, ...planInfo?.selectedList]

    let currentDate = new Date().toJSON().slice(0, 10)
    let newItemList = []

    if (newArray.length > 0) {
      newArray.forEach(t => {
        const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
        if (buildingObj) {
          newItemList.push(buildingObj)
        }
      })
    }

    const newMovements = [...newItemList].map(m => {
      return {
        building: m.building,
        desc: m.desc,
        level: m.level,
        rss: { a: m.rss.a },
        movementDate: currentDate,
        type: 'ADDED'
      }
    })

    // setMovementsList([...newMovements, ...movementsList])
    setPlanInfo({ ...planInfo, itemList: newItemList, selectedList: [] })
    setShowAddItems(false)

    return toast.success('Item/s added successfully!')
  }

  const handleSaveData = e => {
    localStorage.setItem('planInfo', JSON.stringify(planInfo))

    return toast.success('Data successfully stored in the browser!')
  }

  const handleEditDialogChange = action => {
    const selectedList = [...selectedRows].map(row => {
      return { building: row.split('-')[0], level: +row.split('-')[1] }
    })

    const actionLabel = action === 'REMOVE' ? 'REMOVED' : 'COMPLETED'

    let newSelectedList = [
      ...planInfo?.itemList?.filter(elem => {
        return !selectedList.some(ele => {
          return ele.building === elem.building && ele.level === elem.level
        })
      })
    ]

    let currentDate = new Date().toJSON().slice(0, 10)
    let newItemList = []

    if (selectedList.length > 0) {
      selectedList.forEach(t => {
        const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
        if (buildingObj) {
          newItemList.push(buildingObj)
        }
      })
    }

    const newMovements = [...newItemList].map(m => {
      return {
        building: m.building,
        desc: m.desc,
        level: m.level,
        rss: { a: m.rss.a },
        movementDate: currentDate,
        type: actionLabel
      }
    })

    setEditDialogOpen(false)
    setPlanInfo({ ...planInfo, itemList: newSelectedList, selectedList: [] })

    return toast.success(`${selectedRows?.length} item/s were ${actionLabel}.`)
  }

  const handleClick = () => {
    setEditDialogOpen(true)
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const handleCalculatorChange = (e, type, level = undefined) => {
    let newObj = {}
    const enterValue = +e.target.value
    const enterCheck = e.target.checked
    if (type === 'mineHour') {
      newObj = { ...planInfo?.azuCalculator, mineHour: enterValue }
    } else if (type === 'rcLevel') {
      newObj = { ...planInfo?.azuCalculator, rcLevel: enterValue }
    } else if (type === 'card') {
      newObj = { ...planInfo?.azuCalculator, card: enterCheck }
    } else if (type === 'packs') {
      newObj = { ...planInfo?.azuCalculator, packs: enterValue }
    } else if (type === 'chests') {
      newObj = { ...planInfo?.azuCalculator, chests: enterValue }
    } else if (type === 'owned') {
      newObj = { ...planInfo?.azuCalculator, owned: enterValue }
    } else if (type === 'needed') {
      newObj = { ...planInfo?.azuCalculator, needed: enterValue }
    }

    const total =
      (newObj.mineHour > 0 ? nRound(newObj.mineHour * 24, 2) : 0) +
      (newObj.rcLevel > 0 ? azuCalcConf?.royalChallenge?.find(rc => rc.level === newObj.rcLevel)?.azurite : 0) +
      (newObj.card ? azuCalcConf?.card : 0) +
      (newObj.packs > 0 ? newObj.packs : 0) +
      (newObj.chests > 0 ? newObj.chests * 100 : 0)
    const totalObj = { ...newObj, total: total }

    setPlanInfo({ ...planInfo, azuCalculator: totalObj })
  }

  const handleCastleConfig = (e, key, autocomplete = false) => {
    const level = e.target.value
    const newCastle = { ...planInfo.castle }
    const valuesReq = { ...newCastle }
    const valueList = Object.keys(newCastle)

    if (key === 'castle') newCastle['castle'].v === level

    // If strict mode, check for requirements.
    if (planInfo.strictMode) {
      const requirementsList = [...buildingList].filter(b => b.building === key && b.level <= level)

      // Check for requirements for min value
      requirementsList.forEach(rl => {
        rl.requirements.forEach(req => {
          if (valuesReq.hasOwnProperty(req.building)) {
            valuesReq[req.building].min = req.level
          }
        })
      })

      if (key === 'castle') {
        valueList.forEach((v, index) => {
          if (v === key) {
            newCastle[v].v = level
          } else if (v === 'chargeTier') {
            if (level < 40) {
              newCastle[v].min = 0
              newCastle[v].max = 0
            }
            if (level === 40) {
              newCastle[v].min = 0
              newCastle[v].max = 1
            }
            if (level === 41) {
              newCastle[v].min = 1
              newCastle[v].max = 2
            }
            if (level === 42) {
              newCastle[v].min = 2
              newCastle[v].max = 3
            }
            if (level === 43) {
              newCastle[v].min = 3
              newCastle[v].max = 3
            }
          } else if (v === 'guardianTemple') {
            newCastle[v].min = 1
            if (level < 32) newCastle[v].max = 5
            if (level < 35 && level > 31) newCastle[v].max = 6
            if (level < 38 && level > 34) newCastle[v].max = 7
            if (level < 42 && level > 37) newCastle[v].max = 8
            if (level >= 42) newCastle[v].max = 9
          } else if (v === 'barracks') {
            if (level > 30 && level < 35) {
              newCastle[v].min = 30
            }
            if (level > 34 && level < 38) {
              newCastle[v].min = 34
            }
            if (level > 37 && level < 41) {
              newCastle[v].min = 37
            }
            if (level > 40 && level < 43) {
              newCastle[v].min = 40
            }
            if (level === 43) {
              newCastle[v].min = 42
            }
            newCastle[v].max = level
          } else {
            newCastle[v].min = valuesReq[v]?.min
            newCastle[v].max = level
          }
        })
      } else {
        newCastle[key].v = level
      }
    } else {
      newCastle[key].v = level
    }

    if (autocomplete) {
      Object.keys(newCastle).forEach(v => {
        if (v !== 'castle') newCastle[v].v = newCastle[v].min
      })
      setPlanInfo(prevState => ({ ...prevState, castle: newCastle }))
      setShowAutoFill(false)
    } else {
      setPlanInfo(prevState => ({ ...prevState, castle: newCastle }))
      if (key === 'castle') setShowAutoFill(true)
    }
  }

  const handleClearAllData = e => {
    localStorage.removeItem('planInfo', JSON.stringify(planInfo))
    setPlanInfo({ ...planInfo, preset: '', presetB: '', selectedList: [] })
    setShowDeleteDialog(false)

    return toast.success('Data successfully REMOVED from the browser!')
  }

  const columns = [...defaultColumns]

  const tabContentList = {
    castle: (
      <>
        <Card>
          <Grid container spacing={3} sx={{ padding: '1rem' }}>
            <Grid item xs={12}>
              <Divider>DETAILS</Divider>
              <CastleDetails castle={planInfo.castle} extra={castleExtra} totalProgress={totalProgress} />

              <Divider>CONFIGURATION</Divider>
              <Typography variant='body2'>Set your current Castle Configuration.</Typography>

              <CustomBox>
                <Box sx={{ marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Strict Mode:
                  </Typography>
                </Box>
                <Switch
                  inputProps={{ 'aria-label': 'Strict Mode Switch' }}
                  checked={planInfo.strictMode}
                  onChange={e => {
                    setPlanInfo(prevState => ({ ...prevState, strictMode: e.target.checked }))
                  }}
                  color='success'
                />
                <IconButton
                  aria-label='card-info-button'
                  onClick={e => {
                    return toast.success(
                      `With the strict mode on you'll have a controlled version of the planner. You'll able to update your progress through the ITEMS tab.`,
                      {
                        duration: 8000,
                        position: 'bottom-center',
                        style: {
                          borderRadius: '10px',
                          border: '1px solid #0278AE',
                          padding: '16px',
                          color: '#0278AE'
                        },
                        iconTheme: {
                          primary: '#0278AE',
                          secondary: '#FFFAEE'
                        }
                      }
                    )
                  }}
                >
                  <InfoOutlined color='primary' />
                </IconButton>
              </CustomBox>

              {planInfo?.castle?.castle?.v > 0 && (
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='left'>
                      Set Default Castle Level Requirements:
                    </Typography>
                  </Box>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={e => {
                      handleCastleConfig({ target: { value: planInfo?.castle?.castle?.v } }, 'castle', true)
                    }}
                  >
                    UPDATE
                  </Button>
                </CustomBox>
              )}

              <Divider sx={{ mt: 3 }} />
              <Box sx={{ mt: 1, p: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem' }}>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Castle:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='castle-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.castle?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'castle')
                    }}
                  >
                    {[...buildingLevel['castle']].map(option => (
                      <MenuItem key={option.l} value={option.l}>
                        {option.l}
                      </MenuItem>
                    ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Wall:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='wall-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.wall?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'wall')
                    }}
                  >
                    {[...buildingLevel['wall']]
                      .filter(b => b.l >= planInfo?.castle?.wall?.min && b.l <= planInfo?.castle?.wall?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Barrack:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='barracks-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.barracks?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'barracks')
                    }}
                  >
                    {[...buildingLevel['barracks']]
                      .filter(b => b.l >= planInfo?.castle?.barracks?.min && b.l <= planInfo?.castle?.barracks?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Drill Grounds:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='drill-grounds-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.drillGrounds?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'drillGrounds')
                    }}
                  >
                    {[...buildingLevel['drillGrounds']]
                      .filter(
                        b => b.l >= planInfo?.castle?.drillGrounds?.min && b.l <= planInfo?.castle?.drillGrounds?.max
                      )
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Guardian Temple:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='guardian-temple-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.guardianTemple?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'guardianTemple')
                    }}
                  >
                    {[...buildingLevel['guardianTemple']]
                      .filter(
                        b =>
                          b.l >= planInfo?.castle?.guardianTemple?.min && b.l <= planInfo?.castle?.guardianTemple?.max
                      )
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Depot:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='depot-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.depot?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'depot')
                    }}
                  >
                    {[...buildingLevel['depot']]
                      .filter(b => b.l >= planInfo?.castle?.depot?.min && b.l <= planInfo?.castle?.depot?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Embassy:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='embassy-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.embassy?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'embassy')
                    }}
                  >
                    {[...buildingLevel['embassy']]
                      .filter(b => b.l >= planInfo?.castle?.embassy?.min && b.l <= planInfo?.castle?.embassy?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Blacksmith:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='blacksmith-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.blacksmith?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'blacksmith')
                    }}
                  >
                    {[...buildingLevel['blacksmith']]
                      .filter(b => b.l >= planInfo?.castle?.blacksmith?.min && b.l <= planInfo?.castle?.blacksmith?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      College:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='college-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.college?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'college')
                    }}
                  >
                    {[...buildingLevel['college']]
                      .filter(b => b.l >= planInfo?.castle?.college?.min && b.l <= planInfo?.castle?.college?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Hospital:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='hospital-select'
                    size='small'
                    variant='outlined'
                    select
                    value={planInfo?.castle?.hospital?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'hospital')
                    }}
                  >
                    {[...buildingLevel['hospital']]
                      .filter(b => b.l >= planInfo?.castle?.hospital?.min && b.l <= planInfo?.castle?.hospital?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
                <CustomBox>
                  <Box sx={{ marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='right'>
                      Charge Tier:
                    </Typography>
                  </Box>
                  <TextField
                    align='left'
                    id='chargeTier-select'
                    size='small'
                    variant='outlined'
                    select
                    disabled={planInfo?.castle?.castle?.v > 39 ? false : true}
                    value={planInfo?.castle?.chargeTier?.v ?? ''}
                    sx={{ maxWidth: '70px' }}
                    onChange={e => {
                      handleCastleConfig(e, 'chargeTier')
                    }}
                  >
                    {[...buildingLevel['chargeTier']]
                      .filter(b => b.l >= planInfo?.castle?.chargeTier?.min && b.l <= planInfo?.castle?.chargeTier?.max)
                      .map(option => (
                        <MenuItem key={option.l} value={option.l}>
                          {option.l}
                        </MenuItem>
                      ))}
                  </TextField>
                </CustomBox>
              </Box>
              <Divider>DEVELOPMENT</Divider>
              <Box sx={{ mt: 1, p: 1, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem' }}>
                {/* CASTLE 34 */}
                {planInfo?.castle?.castle?.v < 35 && planInfo?.castle?.castle?.v >= 30 && (
                  <Box sx={{ p: '1rem' }}>
                    <Box>
                      <Typography variant='body1' color='primary'>
                        Requirements for Castle Lvl 34:
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant='body2' color='primary'>
                        Castle 34:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(30, 34, planInfo?.castle)
                                ?.castle.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {getRssNeeded(30, 34, planInfo?.castle)?.castle[0]?.req?.map(req => {
                          return (
                            <Box key={`${req.b}-${req.l}`}>
                              <Typography variant='caption'>{`[ ${req.b} ${req.l} ]`}</Typography>
                            </Box>
                          )
                        })}
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Barracks 34 (Troops T11/XI):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(30, 34, planInfo?.castle)
                                ?.barracks.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Angels (T10/X):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(30, 34, planInfo?.castle)
                                ?.angels.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(30, 34, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* CASTLE 37 */}
                {planInfo?.castle?.castle?.v < 38 && planInfo?.castle?.castle?.v >= 30 && (
                  <Box sx={{ p: '1rem' }}>
                    <Box>
                      <Typography variant='body1' color='primary'>
                        Requirements for Castle Lvl 37:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='body2' color='primary'>
                        Castle 37:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(34, 37, planInfo?.castle)
                                ?.castle.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {getRssNeeded(34, 37, planInfo?.castle)?.castle[0]?.req?.map(req => {
                          return (
                            <Box key={`${req.b}-${req.l}`}>
                              <Typography variant='caption'>{`[ ${req.b} ${req.l} ]`}</Typography>
                            </Box>
                          )
                        })}
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Barracks 37 (Troops T12/XII):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(34, 37, planInfo?.castle)
                                ?.barracks.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Angels (T11/XI):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(34, 37, planInfo?.castle)
                                ?.angels.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(34, 37, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* CASTLE 40 */}
                {planInfo?.castle?.castle?.v < 41 && planInfo?.castle?.castle?.v >= 30 && (
                  <Box sx={{ p: '1rem' }}>
                    <Box>
                      <Typography variant='body1' color='primary'>
                        Requirements for Castle Lvl 40:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='body2' color='primary'>
                        Castle 40:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(37, 40, planInfo?.castle)
                                ?.castle.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {getRssNeeded(37, 40, planInfo?.castle)?.castle[0]?.req?.map(req => {
                          return (
                            <Box key={`${req.b}-${req.l}`}>
                              <Typography variant='caption'>{`[ ${req.b} ${req.l} ]`}</Typography>
                            </Box>
                          )
                        })}
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Barracks 40 (Troops T13/XIII):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(37, 40, planInfo?.castle)
                                ?.barracks.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Angels (T12/XII):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(37, 40, planInfo?.castle)
                                ?.angels.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(37, 40, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* CASTLE 41 */}
                {planInfo?.castle?.castle?.v < 42 && planInfo?.castle?.castle?.v >= 40 && (
                  <Box sx={{ p: '1rem' }}>
                    <Box>
                      <Typography variant='body1' color='primary'>
                        Requirements for Castle Lvl 41:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='body2' color='primary'>
                        Castle 41:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(40, 41, planInfo?.castle)
                                ?.castle.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {getRssNeeded(40, 41, planInfo?.castle)?.castle[0]?.req?.map(req => {
                          return (
                            <Box key={`${req.b}-${req.l}`}>
                              <Typography variant='caption'>{`[ ${req.b} ${req.l} ]`}</Typography>
                            </Box>
                          )
                        })}
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Barracks 41:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(40, 41, planInfo?.castle)
                                ?.barracks.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Angels (T13/XIII):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(40, 41, planInfo?.castle)
                                ?.angels.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(40, 41, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* CASTLE 42 */}
                {planInfo?.castle?.castle?.v < 43 && planInfo?.castle?.castle?.v >= 40 && (
                  <Box sx={{ p: '1rem' }}>
                    <Box>
                      <Typography variant='body1' color='primary'>
                        Requirements for Castle Lvl 42:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='body2' color='primary'>
                        Castle 42:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(41, 42, planInfo?.castle)
                                ?.castle.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {getRssNeeded(41, 42, planInfo?.castle)?.castle[0]?.req?.map(req => {
                          return (
                            <Box key={`${req.b}-${req.l}`}>
                              <Typography variant='caption'>{`[ ${req.b} ${req.l} ]`}</Typography>
                            </Box>
                          )
                        })}
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Barracks 42 (Troops T14/XIV - Frontline):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(41, 42, planInfo?.castle)
                                ?.barracks.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Angels (T13/XIII):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(41, 42, planInfo?.castle)
                                ?.angels.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(41, 42, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}

                {/* CASTLE 43 */}
                {planInfo?.castle?.castle?.v < 44 && planInfo?.castle?.castle?.v >= 40 && (
                  <Box sx={{ p: '1rem' }}>
                    <Box>
                      <Typography variant='body1' color='primary'>
                        Requirements for Castle Lvl 43:
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant='body2' color='primary'>
                        Castle 43:
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(42, 43, planInfo?.castle)
                                ?.castle.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.castle.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {getRssNeeded(42, 43, planInfo?.castle)?.castle[0]?.req?.map(req => {
                          return (
                            <Box key={`${req.b}-${req.l}`}>
                              <Typography variant='caption'>{`[ ${req.b} ${req.l} ]`}</Typography>
                            </Box>
                          )
                        })}
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Barracks 43 (Troops T14/XIV - Backline):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(42, 43, planInfo?.castle)
                                ?.barracks.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.barracks.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>

                      <Typography variant='body2' color='primary' sx={{ mt: '6px' }}>
                        Angels (T13/XIII):
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          gap: '1rem',
                          alignItems: 'center'
                        }}
                      >
                        <>
                          <RssBox>
                            <Icon icon='game-icons:crystal-growth' color='#22a0bf' fontSize={18} />

                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${getRssNeeded(42, 43, planInfo?.castle)
                                ?.angels.reduce((acc, cur) => acc + cur.a, 0)
                                .toLocaleString()}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:wheat' color='#e7ba83' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.f, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>

                          <RssBox>
                            <Icon icon='game-icons:wood-pile' color='#c18439' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.w, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:stone-pile' color='#bdbdbd' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.s, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                          <RssBox>
                            <Icon icon='game-icons:metal-bar' color='#8f8881' fontSize={18} />
                            <Typography variant='body2' sx={{ marginLeft: '2px' }}>
                              {`${nFormatter(
                                getRssNeeded(42, 43, planInfo?.castle)?.angels.reduce((acc, cur) => acc + cur.i, 0),
                                1
                              )}  `}
                            </Typography>
                          </RssBox>
                        </>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box sx={{ pb: '5rem' }} />
            </Grid>
          </Grid>
        </Card>
      </>
    ),
    items: (
      <>
        <Card>
          <TableHeader selectedRows={selectedRows} handleClick={handleClick} itemList={planInfo?.itemList} />
          {planInfo?.itemList?.length > 0 && (
            <DataGrid
              autoHeight
              pagination
              getRowId={row => row.building + '-' + row.level}
              rows={planInfo?.itemList}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={rows => setSelectedRows(rows)}
              slots={{ toolbar: GridToolbar }}
            />
          )}
        </Card>
      </>
    ),
    azuriteCalc: (
      <>
        <Card>
          <Grid container spacing={3} style={{ minWidth: '320px', padding: '1rem' }}>
            <Grid item xs={12} md={6} lg={8}>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Azurite Mine per Hour:
                  </Typography>
                </div>
                <TextField
                  id='mine-per-hour'
                  size='small'
                  variant='outlined'
                  type='number'
                  value={planInfo?.azuCalculator?.mineHour}
                  inputProps={{
                    min: 0,
                    max: 20000
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'mineHour')
                  }}
                />
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Royal Challenge Wave(s):
                  </Typography>
                </div>
                <TextField
                  align='left'
                  id='rc-select'
                  size='small'
                  variant='outlined'
                  select
                  value={planInfo?.azuCalculator?.rcLevel}
                  inputProps={{
                    min: 1,
                    max: 10
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'rcLevel')
                  }}
                >
                  {azuCalcConf?.royalChallenge?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Monthly Azurite Card:
                  </Typography>
                </div>
                <Switch
                  checked={planInfo?.azuCalculator?.card ? true : false}
                  onChange={e => {
                    handleCalculatorChange(e, 'card')
                  }}
                  name='monthly-card-checked'
                  color='primary'
                />
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Azurite from packs (daily):
                  </Typography>
                </div>
                <TextField
                  id='azurite-from-packs'
                  size='small'
                  variant='outlined'
                  type='number'
                  value={planInfo?.azuCalculator?.packs}
                  inputProps={{
                    min: 0,
                    max: 20000
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'packs')
                  }}
                />
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Azurite Daily Chests:
                  </Typography>
                </div>
                <TextField
                  align='left'
                  id='chests-select'
                  size='small'
                  variant='outlined'
                  type='number'
                  select
                  value={planInfo?.azuCalculator?.chests}
                  inputProps={{
                    min: 1,
                    max: 5
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'chests')
                  }}
                >
                  {azuCalcConf?.chests?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>
              </CustomBox>

              <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center'>
                      Azurite Daily:
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {planInfo?.azuCalculator?.total.toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                      Azurite Weekly:
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {(planInfo?.azuCalculator?.total * 7).toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                      Azurite Monthly (30d):
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {(planInfo?.azuCalculator?.total * 30).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      </>
    ),
    resources: (
      <>
        <Card>
          <Toolbar sx={{ padding: '1.25rem' }}>
            {/* <div edge='start' /> */}

            <Tooltip title={'Clear all the data saved in inputs.'}>
              <Button
                edge='start'
                color='primary'
                variant='contained'
                startIcon={<Icon icon='material-symbols-light:clear-all' />}
                onClick={() => {
                  setPlanInfo({ ...planInfo, totalGot: defaultInfo.totalGot })
                }}
              >
                CLEAR INPUTS
              </Button>
            </Tooltip>
          </Toolbar>
          <Divider />

          {/* AZURITE CALCULATOR DATA */}
          <Grid container spacing={6} sx={{ padding: '2rem', width: '100%' }}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              <TableContainer>
                <Table aria-labelledby='tableTitle' size={'small'} aria-label='enhanced table'>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center'>{'Daily Azurite Output'}</TableCell>
                      <TableCell align='center'>{'Days to Get Azurite Needed'}</TableCell>
                      <TableCell align='center'>{'Date to Get Azurite Needed'}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center'>
                        <Typography color='primary' variant='h5'>
                          {planInfo?.azuCalculator.total.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='primary' variant='body1'>
                          {planInfo?.azuCalculator.total === 0
                            ? '0 days'
                            : `${Math.ceil(
                                (planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                  0
                                ) -
                                  planInfo?.totalGot.a) /
                                  planInfo?.azuCalculator.total
                              ).toLocaleString()} day/s.`}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='primary' variant='body1'>
                          {planInfo?.azuCalculator.total === 0
                            ? '-'
                            : `${moment()
                                .add(
                                  Math.ceil(
                                    (planInfo?.itemList?.reduce(
                                      (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                      0
                                    ) -
                                      planInfo?.totalGot.a) /
                                      planInfo?.azuCalculator.total
                                  ),
                                  'days'
                                )
                                .format('MMMM Do, YYYY')}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* RESOURCES DATA  */}
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              <TableContainer>
                <Table aria-labelledby='tableTitleInfo' size={'small'} aria-label='enhanced table info'>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center'>{'RSS'}</TableCell>
                      <TableCell align='center'>{'RSS Needed'}</TableCell>
                      <TableCell align='center'>{'RSS Owned'}</TableCell>
                      <TableCell align='center'>{'Total'}</TableCell>
                    </TableRow>
                    {/* AZURITE */}
                    <TableRow>
                      <TableCell align='center'>{<Typography color='primary'>Azurite</Typography>}</TableCell>

                      <TableCell align='center'>
                        {
                          <Typography color='textPrimary'>
                            {planInfo?.itemList
                              ?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.a, 0)
                              ?.toLocaleString()}
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <TextField
                            label=''
                            sx={{ minWidth: '100px' }}
                            variant='outlined'
                            align='center'
                            id='azurite-input'
                            size='small'
                            type='number'
                            value={planInfo?.totalGot.a === 0 ? '' : planInfo?.totalGot.a}
                            onChange={e => {
                              let newState
                              let error
                              if (+e.target.value >= 2000000 || +e.target.value < 0) {
                                newState = { ...planInfo?.totalGot, a: 2000000 }
                                error = true
                              } else {
                                newState = { ...planInfo?.totalGot, a: +e.target.value }
                              }
                              setPlanInfo({ ...planInfo, totalGot: newState })
                              if (error) return toast.error('Please use an input less than 2,000,000 and more than 0.')
                            }}
                          />
                        }
                      </TableCell>
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.a, 0) >
                        planInfo?.totalGot.a && (
                        <TableCell align='center'>
                          {
                            <Typography sx={{ color: '#ed2727' }}>
                              -
                              {(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                  0
                                ) - planInfo?.totalGot.a
                              )?.toLocaleString()}
                            </Typography>
                          }
                        </TableCell>
                      )}
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.a, 0) <
                        planInfo?.totalGot.a && (
                        <TableCell align='center'>
                          {
                            <Button sx={{ color: '#4DDDB2' }} startIcon={<Icon icon='mingcute:check-2-line' />}>
                              {' '}
                              +
                              {(
                                planInfo?.totalGot.a -
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                  0
                                )
                              ).toLocaleString()}
                            </Button>
                          }
                        </TableCell>
                      )}
                    </TableRow>

                    {/* FOOD */}
                    <TableRow>
                      <TableCell align='center'>{<Typography color='primary'>Food</Typography>}</TableCell>

                      <TableCell align='center'>
                        {
                          <Typography color='textPrimary'>
                            {nFormatter(
                              planInfo?.itemList?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.rss.f,
                                0
                              ),
                              1
                            )}
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <TextField
                            label=''
                            align='center'
                            variant='outlined'
                            id='food-input'
                            size='small'
                            type='number'
                            value={planInfo?.totalGot.f === 0 ? '' : planInfo?.totalGot.f}
                            onChange={e => {
                              let newState
                              let error
                              if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                newState = { ...planInfo?.totalGot, f: 4000000000 }
                                error = true
                              } else {
                                newState = { ...planInfo?.totalGot, f: +e.target.value }
                              }
                              setPlanInfo({ ...planInfo, totalGot: newState })
                              if (error) return toast.error('Please use an input less than 2,000,000 and more than 0.')
                            }}
                          />
                        }
                      </TableCell>
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.f, 0) >
                        planInfo?.totalGot.f && (
                        <TableCell align='center'>
                          {
                            <Typography style={{ color: '#ed2727' }}>
                              -
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.f,
                                  0
                                ) - planInfo?.totalGot.f,
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                      )}
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.f, 0) <
                        planInfo?.totalGot.f && (
                        <TableCell align='center'>
                          {
                            <Button
                              style={{ color: '#50a308' }}
                              color='primary'
                              startIcon={<Icon icon='mingcute:check-2-line' />}
                            >
                              +
                              {nFormatter(
                                planInfo?.totalGot.f -
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.f,
                                    0
                                  ),
                                1
                              )}
                            </Button>
                          }
                        </TableCell>
                      )}
                    </TableRow>
                    {/* WOOD */}
                    <TableRow>
                      <TableCell align='center'>{<Typography color='primary'>Wood</Typography>}</TableCell>

                      <TableCell align='center'>
                        {
                          <Typography color='textPrimary'>
                            {nFormatter(
                              planInfo?.itemList?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.rss.w,
                                0
                              ),
                              1
                            )}
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <TextField
                            label=''
                            align='center'
                            variant='outlined'
                            id='wood-input'
                            size='small'
                            type='number'
                            value={planInfo?.totalGot.w === 0 ? '' : planInfo?.totalGot.w}
                            onChange={e => {
                              let newState
                              let error
                              if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                newState = { ...planInfo?.totalGot, w: 4000000000 }
                                error = true
                              } else {
                                newState = { ...planInfo?.totalGot, w: +e.target.value }
                              }
                              setPlanInfo({ ...planInfo, totalGot: newState })
                              if (error) return toast.error('Please use an input less than 2,000,000 and more than 0.')
                            }}
                          />
                        }
                      </TableCell>
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.w, 0) >
                        planInfo?.totalGot.w && (
                        <TableCell align='center'>
                          {
                            <Typography style={{ color: '#ed2727' }}>
                              -
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.w,
                                  0
                                ) - planInfo?.totalGot.w,
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                      )}
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.w, 0) <
                        planInfo?.totalGot.w && (
                        <TableCell align='center'>
                          {
                            <Button
                              style={{ color: '#50a308' }}
                              color='primary'
                              startIcon={<Icon icon='mingcute:check-2-line' />}
                            >
                              +
                              {nFormatter(
                                planInfo?.totalGot.w -
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.w,
                                    0
                                  ),
                                1
                              )}
                            </Button>
                          }
                        </TableCell>
                      )}
                    </TableRow>
                    {/* STONE */}
                    <TableRow>
                      <TableCell align='center'>{<Typography color='primary'>Stone</Typography>}</TableCell>

                      <TableCell align='center'>
                        {
                          <Typography color='textPrimary'>
                            {nFormatter(
                              planInfo?.itemList?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.rss.s,
                                0
                              ),
                              1
                            )}
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <TextField
                            label=''
                            align='center'
                            variant='outlined'
                            id='stone-input'
                            size='small'
                            type='number'
                            value={planInfo?.totalGot.s === 0 ? '' : planInfo?.totalGot.s}
                            onChange={e => {
                              let newState
                              let error
                              if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                newState = { ...planInfo?.totalGot, s: 4000000000 }
                                error = true
                              } else {
                                newState = { ...planInfo?.totalGot, s: +e.target.value }
                              }
                              setPlanInfo({ ...planInfo, totalGot: newState })
                              if (error) return toast.error('Please use an input less than 2,000,000 and more than 0.')
                            }}
                          />
                        }
                      </TableCell>
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.s, 0) >
                        planInfo?.totalGot.s && (
                        <TableCell align='center'>
                          {
                            <Typography style={{ color: '#ed2727' }}>
                              -
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.s,
                                  0
                                ) - planInfo?.totalGot.s,
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                      )}
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.s, 0) <
                        planInfo?.totalGot.s && (
                        <TableCell align='center'>
                          {
                            <Button
                              style={{ color: '#50a308' }}
                              color='primary'
                              startIcon={<Icon icon='mingcute:check-2-line' />}
                            >
                              +
                              {nFormatter(
                                planInfo?.totalGot.s -
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.s,
                                    0
                                  ),
                                1
                              )}
                            </Button>
                          }
                        </TableCell>
                      )}
                    </TableRow>

                    {/* IRON */}
                    <TableRow>
                      <TableCell align='center'>{<Typography color='primary'>Iron</Typography>}</TableCell>

                      <TableCell align='center'>
                        {
                          <Typography color='textPrimary'>
                            {nFormatter(
                              planInfo?.itemList?.reduce(
                                (accumulator, currentValue) => accumulator + currentValue.rss.i,
                                0
                              ),
                              1
                            )}
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <TextField
                            label=''
                            align='center'
                            variant='outlined'
                            id='iron-input'
                            size='small'
                            type='number'
                            value={planInfo?.totalGot.i === 0 ? '' : planInfo?.totalGot.i}
                            onChange={e => {
                              let newState
                              let error
                              if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                newState = { ...planInfo?.totalGot, i: 4000000000 }
                                error = true
                              } else {
                                newState = { ...planInfo?.totalGot, i: +e.target.value }
                              }
                              setPlanInfo({ ...planInfo, totalGot: newState })
                              if (error) return toast.error('Please use an input less than 2,000,000 and more than 0.')
                            }}
                          />
                        }
                      </TableCell>
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.i, 0) >
                        planInfo?.totalGot.i && (
                        <TableCell align='center'>
                          {
                            <Typography style={{ color: '#ed2727' }}>
                              -
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.i,
                                  0
                                ) - planInfo?.totalGot.i,
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                      )}
                      {planInfo?.itemList?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.i, 0) <
                        planInfo?.totalGot.i && (
                        <TableCell align='center'>
                          {
                            <Button
                              style={{ color: '#50a308' }}
                              color='primary'
                              startIcon={<Icon icon='mingcute:check-2-line' />}
                            >
                              +
                              {nFormatter(
                                planInfo?.totalGot.i -
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.i,
                                    0
                                  ),
                                1
                              )}
                            </Button>
                          }
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Card>
      </>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='planner' title='BUILDING AND TECHNOLOGY PLANNER' />
            <Divider />
            <Grid container spacing={6} sx={{ padding: '1rem' }}>
              <Grid item xs={12} sm={6}>
                <Alert severity='warning'>
                  {`After each modification (add, edit or delete) please, use the `}
                  {
                    <span role='img' aria-labelledby='floppy-disk'>
                      {`💾`}
                    </span>
                  }{' '}
                  {`button before refreshing or leaving the page.`}
                </Alert>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                  <BlueButton
                    variant='contained'
                    size='small'
                    startIcon={<Icon icon='lets-icons:widget-add-light' />}
                    onClick={() => setShowAddTemplate(true)}
                  >
                    Add from Template
                  </BlueButton>
                </Box>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                  <Button
                    variant='contained'
                    size='small'
                    startIcon={<Icon icon='ic:round-add' />}
                    onClick={() => setShowAddItems(true)}
                  >
                    ADD ITEM/S
                  </Button>
                </Box>
                <Box sx={{ marginTop: '10px', flexWrap: 'wrap' }}>
                  <GreenButton
                    variant='contained'
                    startIcon={<Icon icon='ic:baseline-save' />}
                    onClick={handleSaveData}
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  >
                    SAVE
                  </GreenButton>
                  <RedButton
                    variant='contained'
                    startIcon={<Icon icon='mdi:delete-forever-outline' />}
                    onClick={e => {
                      setShowDeleteDialog(true)
                    }}
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  >
                    DELETE
                  </RedButton>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {activeTab === undefined ? null : (
          <Grid item xs={12}>
            <TabContext value={activeTab}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TabList
                    variant='scrollable'
                    scrollButtons='auto'
                    onChange={handleChange}
                    aria-label='customized tabs'
                  >
                    <Tab
                      value='castle'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='emojione-monotone:castle' />
                          {!hideText && 'Castle'}
                        </Box>
                      }
                    />
                    <Tab
                      value='items'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:view-grid-outline' />
                          {!hideText && 'Items'}
                        </Box>
                      }
                    />
                    <Tab
                      value='resources'
                      disabled={planInfo?.itemList?.length > 0 ? false : true}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='carbon:software-resource-cluster' />
                          {!hideText && 'Resources'}
                        </Box>
                      }
                    />
                    <Tab
                      value='azuriteCalc'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='game-icons:crystal-bars' />
                          {!hideText && 'Azurite Calculator'}
                        </Box>
                      }
                    />
                  </TabList>
                </Grid>
                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                  {isLoading ? (
                    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <CircularProgress sx={{ mb: 4 }} />
                      <Typography>Loading...</Typography>
                    </Box>
                  ) : (
                    <TabPanel sx={{ p: 0 }} value={activeTab}>
                      {tabContentList[activeTab]}
                    </TabPanel>
                  )}
                </Grid>
              </Grid>
            </TabContext>
          </Grid>
        )}
      </Grid>

      {/* Dialog | ADD FROM TEMPLATE */}
      <Dialog
        fullWidth
        open={showAddTemplate}
        maxWidth='md'
        scroll='body'
        onClose={handleAddTemplateClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleAddTemplateClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Planner - Add Preset of Items
            </Typography>
            <Typography variant='body2'>
              List of presets to add any goals quickly. When you add a template from here, it'll automatically add those
              items on your item list.
            </Typography>
          </Box>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent
          sx={{
            position: 'relative',
            pt: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <TextField
                value={planInfo?.preset}
                fullWidth
                align='center'
                label='Select Preset'
                id='load-template-select'
                size='small'
                variant='outlined'
                select
                onChange={handleLoadTemplateChange}
              >
                {itemTemplates?.map(option => (
                  <MenuItem key={option.template} value={option.template}>
                    {option.desc}
                  </MenuItem>
                ))}
              </TextField>
              {planInfo?.preset?.length > 0 && (
                <CustomAvatar
                  skin='light'
                  color='success'
                  sx={{ width: '1.875rem', height: '1.875rem', marginLeft: '5px' }}
                >
                  <Icon icon={'mdi:check'} fontSize='1rem' />
                </CustomAvatar>
              )}
            </Box>
          </Box>
          {planInfo?.preset?.length > 0 && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  justifyContent: 'center'
                }}
              >
                <Button
                  startIcon={<Icon icon={'mdi:add'} />}
                  variant='contained'
                  onClick={e => {
                    setShowAddTemp(true)
                  }}
                  disabled={showAddTemp}
                  color='primary'
                  sx={{ marginTop: '8px', marginBottom: '10px' }}
                >
                  ADD BARRACKS PRESETS
                </Button>
              </Box>
              <>
                {showAddTemp && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          flexWrap: { xs: 'wrap', sm: 'nowrap' }
                        }}
                      >
                        <TextField
                          value={planInfo?.presetB}
                          fullWidth
                          align='center'
                          label='Add Barracks'
                          id='load-barracks-select'
                          size='small'
                          variant='outlined'
                          select
                          onChange={handleLoadTemplateBChange}
                        >
                          {extraBarracks?.map(option => (
                            <MenuItem key={option.template} value={option.template}>
                              {option.desc}
                            </MenuItem>
                          ))}
                        </TextField>
                        {planInfo?.presetB?.length > 0 && (
                          <CustomAvatar
                            skin='light'
                            color='success'
                            sx={{ width: '1.875rem', height: '1.875rem', marginLeft: '5px' }}
                          >
                            <Icon icon={'mdi:check'} fontSize='1rem' />
                          </CustomAvatar>
                        )}
                      </Box>
                    </Box>
                  </>
                )}
              </>
            </Box>
          )}
        </DialogContent>
        {planInfo?.selectedList?.length > 0 && (
          <>
            <Divider sx={{ my: '0 !important' }} />
            <DialogContent
              sx={{
                position: 'relative',
                pt: theme => `${theme.spacing(5)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Box>
                <Typography align='center' variant='h6' sx={{ mb: 4 }}>
                  Total Azurite Cost:
                </Typography>
                <Typography align='center' color='primary' variant='h4' sx={{ mb: 4 }}>
                  {showAddTempAzurite?.toLocaleString()}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button size='small' color='primary' onClick={handleAddTemplateClose}>
            CLOSE
          </Button>

          {planInfo?.selectedList?.length > 0 && (
            <>
              <Button
                startIcon={<Icon icon='material-symbols-light:clear-all' />}
                variant='outlined'
                onClick={handleClearDialogForm}
                color='error'
              >
                Clear selection
              </Button>{' '}
              <Button variant='contained' onClick={handleLoadTemplateSave} color='primary'>
                ADD ITEMS
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog | ADD ITEMS */}
      <Dialog
        fullWidth
        open={showAddItems}
        maxWidth='md'
        scroll='body'
        onClose={handleAddTemplateClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleAddItemClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Planner - Add Items
            </Typography>
            <Typography variant='body2'>
              When you add a ITEMS from here, they'll be automatically added on your item list.
            </Typography>
          </Box>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent
          sx={{
            position: 'relative',
            pt: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <Autocomplete
                multiple
                id='tags-outlined'
                options={[
                  ...buildingList?.filter(elem => {
                    return !planInfo.itemList?.some(ele => {
                      return ele.building === elem.building && ele.level === elem.level
                    })
                  })
                ]}
                getOptionLabel={option => {
                  return `${option.desc} ${option.level}`
                }}
                filterSelectedOptions
                disableListWrap
                fullWidth
                size='medium'
                renderInput={params => (
                  <TextField color='primary' {...params} variant='outlined' label='' placeholder='Select...' />
                )}
                onChange={(e, v, r) => {
                  handleSelectedItemsChange(v)
                }}
                ChipProps={{ variant: 'outlined' }}
                popupIcon={<ArrowDropDownIcon color='primary' />}
              />
            </Box>
          </Box>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent>
          {planInfo?.selectedList?.length > 0 && (
            <div>
              <TableContainer>
                <Table aria-labelledby='tableTitleDialog' size={'small'} aria-label='enhanced table'>
                  <TableBody>
                    {/* HEADER */}
                    <TableRow>
                      {/* <TableCell align='center'>{''}</TableCell> */}
                      <TableCell align='center'>
                        {
                          <Typography color='primary' variant='body1'>
                            Item
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <Typography color='primary' variant='body1'>
                            Item Type
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <Typography color='primary' variant='body1'>
                            Azurite Cost
                          </Typography>
                        }
                      </TableCell>
                    </TableRow>

                    {/* DETAILS */}

                    {planInfo?.selectedList?.map(item => {
                      return (
                        <TableRow key={`${item?.desc}-${item?.level}`}>
                          <TableCell align='center'>
                            {
                              <Typography variant='body2' color='textPrimary'>
                                {`${item?.desc} Lv${item?.level}`}
                              </Typography>
                            }
                          </TableCell>
                          <TableCell align='center'>
                            {
                              <Typography variant='body2' color='textPrimary'>
                                {item?.type}
                              </Typography>
                            }
                          </TableCell>
                          <TableCell align='center'>
                            {
                              <Typography variant='body1' color='textPrimary'>
                                {item?.rss?.a?.toLocaleString()}
                              </Typography>
                            }
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>
        {planInfo?.selectedList?.length > 0 && (
          <>
            <Divider sx={{ my: '0 !important' }} />
            <DialogContent
              sx={{
                position: 'relative',
                pt: theme => `${theme.spacing(5)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Box>
                <Typography align='center' variant='h6' sx={{ mb: 4 }}>
                  Total Azurite Cost:
                </Typography>
                <Typography align='center' color='primary' variant='h4' sx={{ mb: 4 }}>
                  {planInfo?.selectedList
                    ?.reduce((accumulator, currentValue) => accumulator + currentValue?.rss?.a, 0)
                    ?.toLocaleString()}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button size='small' color='primary' onClick={handleAddItemClose}>
            CLOSE
          </Button>

          {planInfo?.selectedList?.length > 0 && (
            <>
              <Button variant='contained' onClick={handleSaveItems} color='primary'>
                ADD ITEMS
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog | EDIT / REMOVE ITEMS */}
      <Dialog
        fullWidth
        open={editDialogOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setEditDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setEditDialogOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Item/s
            </Typography>
            <Typography variant='body2'>Are you sure that you want to edit {selectedRows?.length} item/s?</Typography>
          </Box>
        </DialogContent>

        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color='primary'>
            CLOSE
          </Button>
          <Button
            onClick={() => {
              handleEditDialogChange('REMOVE')
            }}
            color='error'
          >
            REMOVE
          </Button>
          <GreenButton
            onClick={() => {
              handleEditDialogChange('COMPLETE')
            }}
            color='success'
          >
            COMPLETED
          </GreenButton>
        </DialogActions>
      </Dialog>

      {/* Dialog | AUTO FILL CASTLE DEPENDENCIES */}
      <Dialog
        fullWidth
        open={showAutoFill}
        maxWidth='md'
        scroll='body'
        onClose={e => {
          setShowAutoFill(false)
        }}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={e => {
              setShowAutoFill(false)
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Castle Requirements
            </Typography>
            <Typography variant='body2'>
              Do you want to auto fill all the minimum required buildings for this Castle level? (Only works with strict
              mode on)
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size='small' color='primary' onClick={e => setShowAutoFill(false)}>
            NO, CLOSE
          </Button>

          <Button
            variant='contained'
            onClick={e => {
              handleCastleConfig({ target: { value: planInfo?.castle?.castle?.v } }, 'castle', true, {
                ...planInfo.castle,
                castle: { v: planInfo?.castle?.castle?.v, min: 30, max: 43 }
              })
            }}
            color='primary'
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog | DELETE DATA */}
      <Dialog
        fullWidth
        open={showDeleteDialog}
        maxWidth='md'
        scroll='body'
        onClose={e => {
          setShowDeleteDialog(false)
        }}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={e => {
              setShowDeleteDialog(false)
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Delete Stored Data
            </Typography>
            <Typography variant='body2'>
              Do you want to delete all stored/saved data? This action can't be undone.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button size='small' color='primary' onClick={e => setShowDeleteDialog(false)}>
            NO, CLOSE
          </Button>

          <RedButton variant='contained' onClick={handleClearAllData} color='primary'>
            YES
          </RedButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Planner
