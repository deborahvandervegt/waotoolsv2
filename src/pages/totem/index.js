// ** React Imports
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled, createTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Alert,
  AlertTitle,
  AppBar,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  useMediaQuery
} from '@mui/material'
import { amber, blue, deepPurple, green, red } from '@mui/material/colors'
import { TabContext, TabPanel } from '@mui/lab'
import {
  AccountTree,
  AddSharp,
  AddToPhotos,
  ClearAll,
  LibraryAdd,
  Looks3,
  Looks4,
  LooksOne,
  LooksTwo,
  NewReleases,
  RemoveSharp
} from '@mui/icons-material'

import {
  totemConf,
  totemTemplates,
  totemInfo,
  totemStones,
  totemSkill,
  totemStats,
  totemList,
  totemSlots,
  totemRewards
} from 'src/data/totem'

// ** Styled component for the link in the dataTable
const theme = createTheme()

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[500],
  color: theme.palette.getContrastText(green[500]),
  '&:hover': {
    backgroundColor: green[700]
  }
}))

const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700]
  }
}))

const BlueButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[600]),
  backgroundColor: blue[600],
  '&:hover': {
    backgroundColor: blue[800]
  }
}))

const PurpleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(deepPurple[400]),
  backgroundColor: deepPurple[400],
  '&:hover': {
    backgroundColor: deepPurple[800]
  }
}))

const GoldButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(amber[400]),
  backgroundColor: amber[400],
  '&:hover': {
    backgroundColor: amber[700]
  }
}))

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

// ** Custom Functions
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0)

  return Math.round(value * multiplier) / multiplier
}

function generateStats(data) {
  if (data?.length > 0) {
    let generalStats = data.map(d => {
      return { statDesc: d.statDesc, stat: d.stat }
    })

    const generalStatsGrouped = [
      ...generalStats
        .reduce((r, o) => {
          const key = o.statDesc
          const item = r.get(key) || Object.assign({}, o, { stat: 0 })
          item.stat += o.stat * 1

          return r.set(key, item)
        }, new Map())
        .values()
    ]

    generalStatsGrouped.sort((a, b) => (a.statDesc > b.statDesc ? 1 : -1))

    return generalStatsGrouped
  } else {
    return []
  }
}

function getStats(mode, totem, level, params) {
  if (!totem) return []

  let list1

  // Auto
  if (mode === 1) {
    if (totem.nodes === 2) {
      const level1 = (level / 2) % 2 === 0 ? level / 2 : Math.trunc(level / 2) + 1
      const level2 = (level / 2) % 2 === 0 ? level / 2 : Math.trunc(level / 2)
      const arrayExtra1 = []
      const arrayExtra2 = []

      if (level === 1) {
        list1 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level === level)

        return list1
      }

      if (level1 >= totem.bonusA.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level1 >= totem.bonusB.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })
      if (level2 >= totem.bonusA.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level2 >= totem.bonusB.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })

      list1 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level <= level1)
      const list2 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level <= level2)

      const newArray = [...list1, ...list2, ...arrayExtra1, ...arrayExtra2]

      return newArray
    } else if (totem.nodes === 3) {
      const level1 = (level / 3) % 2 === 0 ? level / 3 : Math.trunc(level / 3)
      const level2 = (level / 3) % 2 === 0 ? level / 3 : Math.trunc(level / 3)
      const level3 = (level / 3) % 2 === 0 ? level / 3 : level - (level1 + level2)
      const arrayExtra1 = []
      const arrayExtra2 = []
      const arrayExtra3 = []

      if (level === 1) {
        list1 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level === level)

        return list1
      }

      if (level1 >= totem.bonusA.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level1 >= totem.bonusB.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })
      if (level2 >= totem.bonusA.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level2 >= totem.bonusB.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })
      if (level3 >= totem.bonusA.level)
        arrayExtra3.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level3 >= totem.bonusB.level)
        arrayExtra3.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })

      list1 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level <= level1)
      const list2 = [...totemStats[totem.key]]?.filter(t => t.node === 2 && t.level <= level2)
      const list3 = [...totemStats[totem.key]]?.filter(t => t.node === 3 && t.level <= level3)
      const newArray = [...list1, ...list2, ...list3, ...arrayExtra1, ...arrayExtra2, ...arrayExtra3]

      return newArray
    }
  }

  // Custom
  if (mode === 2) {
    if (totem.nodes === 2) {
      const level1 = params[1]
      const level2 = params[2]
      const arrayExtra1 = []
      const arrayExtra2 = []

      if (level1 >= totem.bonusA.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level1 >= totem.bonusB.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })
      if (level2 >= totem.bonusA.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level2 >= totem.bonusB.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })

      const list1 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level <= level1)
      const list2 = [...totemStats[totem.key]]?.filter(t => t.node === 2 && t.level <= level2)

      const newArray = [...list1, ...list2, ...arrayExtra1, ...arrayExtra2]

      return newArray
    } else if (totem.nodes === 3) {
      const level1 = params[1]
      const level2 = params[2]
      const level3 = params[3]
      const arrayExtra1 = []
      const arrayExtra2 = []
      const arrayExtra3 = []

      if (level1 >= totem.bonusA.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level1 >= totem.bonusB.level)
        arrayExtra1.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })
      if (level2 >= totem.bonusA.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level2 >= totem.bonusB.level)
        arrayExtra2.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })
      if (level3 >= totem.bonusA.level)
        arrayExtra3.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusA.statDesc, stat: totem.bonusA.stat })
      if (level3 >= totem.bonusB.level)
        arrayExtra3.push({ node: 0, level: 0, stones: 0, statDesc: totem.bonusB.statDesc, stat: totem.bonusB.stat })

      const list1 = [...totemStats[totem.key]]?.filter(t => t.node === 1 && t.level <= level1)
      const list2 = [...totemStats[totem.key]]?.filter(t => t.node === 2 && t.level <= level2)
      const list3 = [...totemStats[totem.key]]?.filter(t => t.node === 3 && t.level <= level3)
      const newArray = [...list1, ...list2, ...list3, ...arrayExtra1, ...arrayExtra2, ...arrayExtra3]

      return newArray
    }
  }

  return []
}

function getStatUpDown(blue, purple, gold) {
  const colorList = { blue, purple, gold }

  return Object.keys(colorList).reduce((a, b) => (colorList[a] > colorList[b] ? a : b))
}

function getDaysNeeded(type, runestones) {
  let outputData = []
  const filterData = [...totemRewards].filter(tr => tr.group === type)

  if (filterData?.length > 0) {
    filterData.forEach((row, idx) => {
      const calculate = row.qty * row.times
      const calculateDays = calculate / (row.event === 'daily' ? 1 : 7)
      outputData.push(calculateDays)
    })
  }

  const daysNeeded = `${Math.round(
    runestones / outputData.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  )?.toLocaleString()} day/s to get needed ${filterData.find(tr => tr.group === type).type}`

  return { result: daysNeeded }
}

// ** Custom Vars
const totemCalculator = [
  {
    quality: 'blue',
    desc: 'Blue',
    maxLevel: 120,
    maxSkill: 10,
    levelFrom: 0,
    levelTo: 0,
    skillFrom: 0,
    skillTo: 0,
    stones: 0,
    tattoos: 0,
    userStones: 0,
    userTattoos: 0
  },
  {
    quality: 'purple',
    desc: 'Purple',
    maxLevel: 450,
    maxSkill: 30,
    levelFrom: 0,
    levelTo: 0,
    skillFrom: 0,
    skillTo: 0,
    stones: 0,
    tattoos: 0,
    userStones: 0,
    userTattoos: 0
  },
  {
    quality: 'gold',
    desc: 'Gold',
    maxLevel: 450,
    maxSkill: 30,
    levelFrom: 0,
    levelTo: 0,
    skillFrom: 0,
    skillTo: 0,
    stones: 0,
    tattoos: 0,
    userStones: 0,
    userTattoos: 0
  }
]

const totemColors = {
  blue: { bg: '#1e88e5' },
  purple: { bg: '#7e57c2' },
  gold: { bg: '#ffca28' }
}

/* eslint-enable */
const Totems = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('runestones')
  const [isLoading, setIsLoading] = useState(false)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [snackOpen, setSnackOpen] = useState({ open: false })
  const [slotsInfo, setSlotsInfo] = useState(totemSlots)
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const [calculator, setCalculator] = useState(totemCalculator)

  const generalItemList = generateStats(
    Array.prototype.concat.apply(
      [],
      slotsInfo.map(s => s?.generalStats)
    )
  )

  // ** Hooks

  const handleLoadTemplateChange = e => {
    const newTemplate = e.target.value
    const templateObj = totemTemplates?.find(at => at.key === newTemplate)

    let newSlotsInfo = [...totemSlots]

    if (templateObj) {
      // Blue
      if (templateObj.config.blueLevel > 0) {
        const slot = 1
        const level = templateObj.config.blueLevel
        const totem = 'fertility'
        const slotObj = slotsInfo?.find(s => s.slot === slot)
        const totemObj = totemList.find(t => t.key === totem)

        const totemStats = getStats(slotObj?.mode, totemObj, level, {})
        const totalStones = totemStats.reduce((accumulator, currentValue) => accumulator + currentValue.stones, 0)

        const generalStats = generateStats(totemStats)

        newSlotsInfo = newSlotsInfo.map(obj =>
          obj.slot === slot
            ? {
                ...slotObj,
                totem: totem,
                totemObj: totemObj,
                level: level,
                generalStats: generalStats,
                stones: totalStones
              }
            : obj
        )
      }

      // Purple
      if (templateObj.config.purpleLevel > 0) {
        const slot = 2
        const level = templateObj.config.purpleLevel
        const totem = 'fire'
        const slotObj = slotsInfo?.find(s => s.slot === slot)
        const totemObj = totemList.find(t => t.key === totem)

        const totemStats = getStats(slotObj?.mode, totemObj, level, {})
        const totalStones = totemStats.reduce((accumulator, currentValue) => accumulator + currentValue.stones, 0)

        const generalStats = generateStats(totemStats)

        newSlotsInfo = newSlotsInfo.map(obj =>
          obj.slot === slot
            ? {
                ...slotObj,
                totem: totem,
                totemObj: totemObj,
                level: level,
                generalStats: generalStats,
                stones: totalStones
              }
            : obj
        )
      }

      // Gold
      if (templateObj.config.goldLevel > 0) {
        const slot = 3
        const level = templateObj.config.goldLevel
        const totem = 'earth'
        const slotObj = slotsInfo?.find(s => s.slot === slot)
        const totemObj = totemList.find(t => t.key === totem)

        const totemStats = getStats(slotObj?.mode, totemObj, level, {})
        const totalStones = totemStats.reduce((accumulator, currentValue) => accumulator + currentValue.stones, 0)

        const generalStats = generateStats(totemStats)

        newSlotsInfo = newSlotsInfo.map(obj =>
          obj.slot === slot
            ? {
                ...slotObj,
                totem: totem,
                totemObj: totemObj,
                level: level,
                generalStats: generalStats,
                stones: totalStones
              }
            : obj
        )
      }

      setSlotsInfo(newSlotsInfo)
      setSelectedTemplate(newTemplate)
    }
  }

  const handleClearAll = e => {
    setSlotsInfo(totemSlots)
    setSelectedTemplate(null)
  }

  const handleTotemChange = (slot, totem) => {
    const slotObj = slotsInfo?.find(s => s.slot === slot)

    if (slotObj) {
      const totemObj = totemList.find(t => t.key === totem)

      const newSlotsInfo = slotsInfo.map(obj =>
        obj.slot === slot ? { ...slotObj, totem: totem, totemObj: totemObj } : obj
      )
      setSlotsInfo(newSlotsInfo)
    }
  }

  const handleTotemModeChange = (slot, mode) => {
    const slotObj = slotsInfo?.find(s => s.slot === slot)

    if (slotObj) {
      const newSlotsInfo = slotsInfo.map(obj => (obj.slot === slot ? { ...slotObj, mode: mode } : obj))
      setSlotsInfo(newSlotsInfo)
    }
  }

  const handleTotemLevelChange = (slot, level) => {
    const slotObj = slotsInfo?.find(s => s.slot === slot)

    if (slotObj) {
      const totemStats = getStats(slotObj?.mode, slotObj?.totemObj, level, {})
      const totalStones = totemStats.reduce((accumulator, currentValue) => accumulator + currentValue.stones, 0)

      const generalStats = generateStats(totemStats)

      const newSlotsInfo = slotsInfo.map(obj =>
        obj.slot === slot ? { ...slotObj, level: level, generalStats: generalStats, stones: totalStones } : obj
      )

      setSlotsInfo(newSlotsInfo)
    }
  }

  const handleTotemNodeLevelChange = (slot, node, level) => {
    const slotObj = slotsInfo?.find(s => s.slot === slot)

    if (slotObj) {
      let newNodes = {}

      if (node === 1) newNodes = { ...slotObj.nodes, 1: level }
      if (node === 2) newNodes = { ...slotObj.nodes, 2: level }
      if (node === 3) newNodes = { ...slotObj.nodes, 3: level }

      const totemStats = getStats(slotObj?.mode, slotObj?.totemObj, level, newNodes)
      const totalStones = totemStats.reduce((accumulator, currentValue) => accumulator + currentValue.stones, 0)

      const generalStats = generateStats(totemStats)

      const newSlotsInfo = slotsInfo.map(obj =>
        obj.slot === slot
          ? { ...slotObj, level: node, generalStats: generalStats, stones: totalStones, nodes: newNodes }
          : obj
      )

      setSlotsInfo(newSlotsInfo)
    }
  }

  const handleCalculatorChange = (quality, from, to, type) => {
    const caltulatorObj = calculator.find(t => t.quality === quality)
    const calcFrom = from > 0 ? from : 1
    const calcTo = to > 0 ? to : from
    let newCalculatorState = [...calculator]

    if (type === 'skill') {
      const newLevelsList = [...totemSkill[quality]]

      const newQuantity = newLevelsList
        ?.filter(a => a.level >= (calcFrom === 1 ? calcFrom : calcFrom + 1) && a.level <= calcTo)
        ?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)

      newCalculatorState = newCalculatorState.map(totem =>
        totem.quality === quality
          ? { ...caltulatorObj, skillFrom: calcFrom, skillTo: calcTo, tattoos: newQuantity }
          : totem
      )
    }

    if (type === 'stones') {
      const newLevelsList = [...totemStones[quality]]

      const newQuantity = newLevelsList
        ?.filter(a => a.level >= (calcFrom === 1 ? calcFrom : calcFrom + 1) && a.level <= calcTo)
        ?.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)

      newCalculatorState = newCalculatorState.map(totem =>
        totem.quality === quality
          ? { ...caltulatorObj, levelFrom: calcFrom, levelTo: calcTo, stones: newQuantity }
          : totem
      )
    }

    if (type === 'skillInput') {
      newCalculatorState = newCalculatorState.map(totem =>
        totem.quality === quality ? { ...caltulatorObj, userTattoos: to } : totem
      )
    }

    if (type === 'stonesInput') {
      newCalculatorState = newCalculatorState.map(totem =>
        totem.quality === quality ? { ...caltulatorObj, userStones: to } : totem
      )
    }

    setCalculator(newCalculatorState)
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen({ open: false })
  }

  const tableIcons = {
    up: <Icon icon='icon-park-solid:up-two' fontSize='18' color='green' />,
    down: <Icon icon='icon-park-solid:down-two' fontSize='18' color='red' />
  }

  const tabContentList = {
    runestones: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Snackbar
              open={snackOpen.open ? true : false}
              autoHideDuration={snackOpen.time ?? 7000}
              onClose={snackClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert variant='filled' onClose={snackClose} severity={snackOpen.type}>
                <AlertTitle>{snackOpen.type === 'success' ? 'Done!' : 'Info:'}</AlertTitle>
                {snackOpen.open}
              </Alert>
            </Snackbar>
            <Grid container spacing={3} sx={{}}>
              <Grid key={'header-totem'} item xs={12} md={12} lg={12}>
                <Paper sx={{ alignItems: 'center' }}>
                  <Typography
                    variant='h5'
                    color='primary'
                    align='center'
                    sx={{ marginBottom: '10px', marginTop: '10px' }}
                  >
                    {'RUNESTONES STATS COMPARATOR'}
                  </Typography>
                  <Divider sx={{ marginBottom: '5px' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Tooltip title={'Clear all the information.'}>
                      <Button
                        edge='start'
                        color='primary'
                        variant='contained'
                        startIcon={<ClearAll />}
                        onClick={handleClearAll}
                      >
                        START OVER
                      </Button>
                    </Tooltip>
                  </Box>

                  <Divider sx={{ marginBottom: '10px' }} />

                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                      value={selectedTemplate ? selectedTemplate : ''}
                      align='center'
                      label='Load Presets'
                      id='load-template-select'
                      size='small'
                      variant='outlined'
                      type='number'
                      sx={{
                        minWidth: '155px',
                        marginLeft: '5px'
                      }}
                      select
                      onChange={handleLoadTemplateChange}
                    >
                      {totemTemplates?.map(option => (
                        <MenuItem key={option.key} value={option.key}>
                          {option.desc}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />

                  <Paper sx={{ padding: '1.5rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Grid container spacing={3}>
                        {slotsInfo?.map(slot => {
                          const totemListFiltered = [...totemList]?.filter(t => t.quality === slot.quality)

                          const packPrice = totemInfo.stone[slot.quality]?.avgPrice

                          return (
                            <Grid key={slot.quality} item xs={6} lg={4}>
                              <Paper elevation={24} sx={{ border: `2px solid ${totemColors[slot.quality].bg}` }}>
                                <Box
                                  key={slot.quality}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                  }}
                                >
                                  <Box
                                    sx={{
                                      marginTop: '15px'
                                    }}
                                  />
                                  {slot.quality === 'blue' && <BlueButton>{slot.quality}</BlueButton>}
                                  {slot.quality === 'purple' && <PurpleButton>{slot.quality}</PurpleButton>}
                                  {slot.quality === 'gold' && <GoldButton>{slot.quality}</GoldButton>}

                                  <Divider light sx={{ marginTop: '5px', marginBottom: '8px' }} />

                                  <TextField
                                    value={slot.totem}
                                    align='center'
                                    label='Totem'
                                    id='load-totem-select'
                                    size='small'
                                    variant='outlined'
                                    select
                                    onChange={e => {
                                      handleTotemChange(slot.slot, e.target.value)
                                    }}
                                  >
                                    {totemListFiltered.map(option => (
                                      <MenuItem key={option.key} value={option.key}>
                                        {option.desc}
                                      </MenuItem>
                                    ))}
                                  </TextField>

                                  <Divider light sx={{ marginTop: '5px', marginBottom: '8px' }} />

                                  <TextField
                                    value={slot.mode}
                                    align='center'
                                    label='Mode'
                                    id='mode-totem-select'
                                    size='small'
                                    variant='outlined'
                                    disabled={slot.totem.length > 0 ? false : true}
                                    select
                                    onChange={e => {
                                      handleTotemModeChange(slot.slot, e.target.value)
                                    }}
                                  >
                                    {totemConf.levelType.map(option => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.desc}
                                      </MenuItem>
                                    ))}
                                  </TextField>

                                  <Divider light sx={{ marginTop: '5px', marginBottom: '8px' }} />

                                  {/* AUTO MODE */}
                                  {slot.mode === 1 && (
                                    <TextField
                                      id='level'
                                      size='small'
                                      align='center'
                                      sx={{ maxWidth: '105px' }}
                                      disabled={slot.totem.length > 0 ? false : true}
                                      variant='outlined'
                                      type='number'
                                      placeholder='Level'
                                      value={slot.level ? slot.level : ''}
                                      inputProps={{
                                        min: 0,
                                        max: slot.maxLevel
                                      }}
                                      onChange={e => {
                                        const level =
                                          +e.target.value >= slot?.totemObj?.maxLevel * slot?.totemObj?.nodes
                                            ? slot?.totemObj?.maxLevel * slot?.totemObj?.nodes
                                            : +e.target.value

                                        handleTotemLevelChange(slot.slot, level)
                                      }}
                                    />
                                  )}

                                  {/* CUSTOM MODE */}
                                  {slot.mode === 2 && (
                                    <>
                                      <Typography
                                        variant='caption'
                                        color='textPrimary'
                                        align='center'
                                        sx={{ marginTop: '5px' }}
                                      >
                                        Node 1 - (I):
                                      </Typography>
                                      <TextField
                                        id='level'
                                        size='small'
                                        sx={{ maxWidth: '105px' }}
                                        disabled={slot.totem.length > 0 ? false : true}
                                        variant='outlined'
                                        type='number'
                                        placeholder='Level'
                                        value={slot.nodes[1] ? slot.nodes[1] : ''}
                                        inputProps={{
                                          min: 0,
                                          max: slot.maxLevel
                                        }}
                                        onChange={e => {
                                          const level =
                                            +e.target.value >= slot?.totemObj?.maxLevel
                                              ? slot?.totemObj?.maxLevel
                                              : +e.target.value

                                          handleTotemNodeLevelChange(slot.slot, 1, level)
                                        }}
                                      />

                                      <Typography
                                        variant='caption'
                                        color='textPrimary'
                                        align='center'
                                        sx={{ marginTop: '5px' }}
                                      >
                                        Node 2 - (II):
                                      </Typography>
                                      <TextField
                                        id='level'
                                        size='small'
                                        sx={{ maxWidth: '105px' }}
                                        disabled={slot.totem.length > 0 ? false : true}
                                        variant='outlined'
                                        type='number'
                                        placeholder='Level'
                                        value={slot.nodes[2] ? slot.nodes[2] : ''}
                                        inputProps={{
                                          min: 0,
                                          max: slot.maxLevel
                                        }}
                                        onChange={e => {
                                          const level =
                                            +e.target.value >= slot?.totemObj?.maxLevel
                                              ? slot?.totemObj?.maxLevel
                                              : +e.target.value

                                          handleTotemNodeLevelChange(slot.slot, 2, level)
                                        }}
                                      />
                                      {slot?.totemObj?.nodes === 3 && (
                                        <>
                                          <Typography
                                            variant='caption'
                                            color='textPrimary'
                                            align='center'
                                            sx={{ marginTop: '5px' }}
                                          >
                                            Node 3 - (III):
                                          </Typography>
                                          <TextField
                                            id='level'
                                            size='small'
                                            sx={{ maxWidth: '105px' }}
                                            disabled={slot.totem.length > 0 ? false : true}
                                            variant='outlined'
                                            type='number'
                                            placeholder='Level'
                                            value={slot.nodes[3] ? slot.nodes[3] : ''}
                                            inputProps={{
                                              min: 0,
                                              max: slot.maxLevel
                                            }}
                                            onChange={e => {
                                              const level =
                                                +e.target.value >= slot?.totemObj?.maxLevel
                                                  ? slot?.totemObj?.maxLevel
                                                  : +e.target.value

                                              handleTotemNodeLevelChange(slot.slot, 3, level)
                                            }}
                                          />
                                        </>
                                      )}
                                    </>
                                  )}

                                  <Divider light sx={{ marginTop: '5px', marginBottom: '5px' }} />

                                  <Typography
                                    variant='caption'
                                    color='textPrimary'
                                    align='center'
                                    sx={{ marginTop: '10px' }}
                                  >
                                    Total Levels:
                                  </Typography>

                                  <Typography variant='h5' color='primary' align='center' sx={{ marginTop: '10px' }}>
                                    {slot.mode === 1 ? slot.level : slot.nodes[1] + slot.nodes[2] + slot.nodes[3]}
                                  </Typography>

                                  <Divider light sx={{ marginTop: '5px', marginBottom: '5px' }} />

                                  <Typography
                                    variant='caption'
                                    color='textPrimary'
                                    align='center'
                                    sx={{ marginTop: '10px' }}
                                  >
                                    Total Stones:
                                  </Typography>

                                  <Typography variant='h5' color='primary' align='center' sx={{ marginTop: '10px' }}>
                                    {slot.stones.toLocaleString()}
                                  </Typography>

                                  {slot.stones > 0 && (
                                    <>
                                      <Typography
                                        variant='caption'
                                        color='textPrimary'
                                        align='center'
                                        sx={{ marginTop: '10px' }}
                                      >
                                        Average Price ($):
                                      </Typography>

                                      <Typography
                                        variant='h5'
                                        color='primary'
                                        align='center'
                                        sx={{ marginTop: '10px' }}
                                      >
                                        {`$${round(
                                          (slot.stones / packPrice?.qty) * packPrice?.p,
                                          0
                                        )?.toLocaleString()} +-`}
                                      </Typography>
                                    </>
                                  )}

                                  <Box sx={{ marginBottom: '15px' }} />
                                </Box>
                              </Paper>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Box>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
            <Box sx={{ marginBottom: '10px' }} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={24} sx={{ padding: '0.5rem' }}>
                  <Typography variant='h6' color='primary' align='center'>
                    {'STATS COMPARISON CHART'}
                  </Typography>
                  <Divider sx={{ marginBottom: '10px' }} />

                  {generalItemList?.length > 0 && (
                    <>
                      <Paper elevation={24}>
                        <Box>
                          <TableContainer>
                            <Table aria-labelledby='tableTitle' size={'small'} aria-label='enhanced table'>
                              <TableBody>
                                <TableRow>
                                  <TableCell align='center' color='black' sx={{ backgroundColor: `#a0a3a5c4` }}>
                                    {
                                      <Typography variant='body2' color='black'>
                                        Stat
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center' sx={{ backgroundColor: `${totemColors['blue'].bg}` }}>
                                    {
                                      <Typography variant='body2' color='black'>
                                        BLUE
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center' sx={{ backgroundColor: `${totemColors['purple'].bg}` }}>
                                    {
                                      <Typography variant='body2' color='black'>
                                        PURPLE
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center' sx={{ backgroundColor: `${totemColors['gold'].bg}` }}>
                                    {
                                      <Typography variant='body2' color='black'>
                                        GOLD
                                      </Typography>
                                    }
                                  </TableCell>
                                </TableRow>

                                {generalItemList?.map(row => {
                                  const blueRow = slotsInfo
                                    ?.find(s => s.slot === 1)
                                    ?.generalStats?.find(stat => stat.statDesc === row.statDesc) ?? { stat: 0 }

                                  const purpleRow = slotsInfo
                                    ?.find(s => s.slot === 2)
                                    ?.generalStats?.find(stat => stat.statDesc === row.statDesc) ?? { stat: 0 }

                                  const goldRow = slotsInfo
                                    ?.find(s => s.slot === 3)
                                    ?.generalStats?.find(stat => stat.statDesc === row.statDesc) ?? { stat: 0 }

                                  return (
                                    <>
                                      <TableRow>
                                        <TableCell align='center'>
                                          {<Typography variant='body2'>{row.statDesc}</Typography>}
                                        </TableCell>

                                        <TableCell
                                          align='center'
                                          sx={{ border: `2px solid ${totemColors['blue'].bg}` }}
                                        >
                                          {
                                            <Box
                                              sx={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}
                                            >
                                              <Typography
                                                variant='body2'
                                                color={totemColors['blue'].bg}
                                                sx={{ marginRight: '2px' }}
                                              >
                                                {blueRow?.stat > 0 ? round(blueRow?.stat, 1) : 0}
                                              </Typography>
                                              {blueRow?.stat === 0
                                                ? ''
                                                : getStatUpDown(blueRow?.stat, purpleRow?.stat, goldRow?.stat) ===
                                                  'blue'
                                                ? tableIcons.up
                                                : tableIcons.down}
                                            </Box>
                                          }
                                        </TableCell>
                                        <TableCell
                                          align='center'
                                          sx={{ border: `2px solid ${totemColors['purple'].bg}` }}
                                        >
                                          {
                                            <Box
                                              sx={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}
                                            >
                                              <Typography
                                                variant='body2'
                                                color={totemColors['purple'].bg}
                                                sx={{ marginRight: '2px' }}
                                              >
                                                {purpleRow?.stat > 0 ? round(purpleRow.stat, 1) : 0}
                                              </Typography>
                                              {purpleRow?.stat === 0
                                                ? ''
                                                : getStatUpDown(blueRow?.stat, purpleRow?.stat, goldRow?.stat) ===
                                                  'purple'
                                                ? tableIcons.up
                                                : tableIcons.down}
                                            </Box>
                                          }
                                        </TableCell>
                                        <TableCell align='center' sx={{ border: `2px solid #f3990a` }}>
                                          {
                                            <Box
                                              sx={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}
                                            >
                                              <Typography variant='body2' color='#f3990a' sx={{ marginRight: '2px' }}>
                                                {goldRow?.stat > 0 ? round(goldRow.stat, 1) : 0}
                                              </Typography>
                                              {goldRow?.stat === 0
                                                ? ''
                                                : getStatUpDown(blueRow?.stat, purpleRow?.stat, goldRow?.stat) ===
                                                  'gold'
                                                ? tableIcons.up
                                                : tableIcons.down}
                                            </Box>
                                          }
                                        </TableCell>
                                      </TableRow>
                                    </>
                                  )
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Box>
                      </Paper>
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    ),
    calculator: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Snackbar
              open={snackOpen.open}
              autoHideDuration={snackOpen.time ?? 6000}
              onClose={snackClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              {snackOpen.open && (
                <Alert variant='filled' onClose={snackClose} severity={snackOpen.type}>
                  <AlertTitle>{snackOpen.type === 'success' ? 'Done!' : 'Info:'}</AlertTitle>
                  {snackOpen.open}
                </Alert>
              )}
            </Snackbar>
            <Grid container spacing={2} sx={{ padding: '0.5em' }}>
              <Grid item xs={12}>
                <Paper elevation={24}>
                  <Typography
                    align='center'
                    variant='h6'
                    color='primary'
                    sx={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}
                  >
                    RUNESTONES AND TATTOOS CALCULATOR
                  </Typography>
                  <Divider sx={{ marginBottom: '8px' }} />
                  {calculator.map(totem => {
                    const packPriceScroll = totemInfo.scroll[totem.quality]?.avgPrice
                    const packPriceStone = totemInfo.stone[totem.quality]?.avgPrice

                    return (
                      <>
                        <Paper sx={{ border: `2px solid ${totemColors[totem.quality].bg}` }}>
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: '8px' }}
                          >
                            {totem.quality === 'blue' && <BlueButton>{totem.quality} Totem</BlueButton>}
                            {totem.quality === 'purple' && <PurpleButton>{totem.quality} Totem</PurpleButton>}
                            {totem.quality === 'gold' && <GoldButton>{totem.quality} Totem</GoldButton>}
                          </Box>
                          <Divider light sx={{ marginBottom: '8px', marginTop: '8px' }} />
                          <Grid container spacing={5}>
                            <Grid key={totem.quality + totem.maxLevel + '-stones'} item xs={6} lg={6} md={6}>
                              {/* Stones */}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant='body1' color='primary' align='center' sx={{ marginBottom: '8px' }}>
                                  Level (Stones):
                                </Typography>

                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '8px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <TextField
                                    align='center'
                                    label='From'
                                    id='fromlevelstones-select'
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    select
                                    sx={{ marginRight: '5px' }}
                                    value={totem.levelFrom ? totem.levelFrom : ''}
                                    inputProps={{
                                      min: 0,
                                      max: totem.maxLevel
                                    }}
                                    onChange={e => {
                                      const value = +e.target.value
                                      handleCalculatorChange(totem.quality, value, totem.levelTo, 'stones')
                                    }}
                                  >
                                    {[...totemStones[totem.quality]]
                                      ?.filter(t => t.level < totem.maxLevel)
                                      .map(option => (
                                        <MenuItem key={option.level} value={option.level}>
                                          {option.level}
                                        </MenuItem>
                                      ))}
                                  </TextField>

                                  <TextField
                                    disabled={totem.levelFrom > 0 ? false : true}
                                    align='center'
                                    label='To'
                                    id='levelstones-select'
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    select
                                    sx={{ marginRight: '5px' }}
                                    value={totem.levelTo ? totem.levelTo : ''}
                                    inputProps={{
                                      min: 0,
                                      max: totem.maxLevel
                                    }}
                                    onChange={e => {
                                      const value = +e.target.value
                                      handleCalculatorChange(totem.quality, totem.levelFrom, value, 'stones')
                                    }}
                                  >
                                    {Array.from(Array(totem.maxLevel), (_, i) => i + 1)
                                      .map(n => {
                                        return { level: n }
                                      })
                                      .filter(n => n.level > totem.levelFrom)
                                      .map(option => (
                                        <MenuItem key={option.level} value={option.level}>
                                          {option.level}
                                        </MenuItem>
                                      ))}
                                  </TextField>
                                </Box>

                                <Typography variant='h6' color='primary' align='center'>
                                  =
                                </Typography>

                                <Typography variant='h5' color='textPrimary' align='center'>
                                  {totem.stones?.toLocaleString()}
                                </Typography>

                                <>
                                  <Typography
                                    variant='caption'
                                    color='primary'
                                    align='center'
                                    sx={{ marginLeft: '3px' }}
                                  >
                                    Avg Price ($):
                                  </Typography>

                                  <Typography variant='h5' align='center' sx={{ marginLeft: '3px' }}>
                                    {`$${round(
                                      (totem.stones / packPriceStone?.qty) * packPriceStone?.p,
                                      0
                                    )?.toLocaleString()} +-`}
                                  </Typography>
                                </>
                              </Box>

                              <Box sx={{ marginBottom: '5px', marginTop: '5px' }}></Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <Typography variant='body2' color='primary' align='center' sx={{ marginBottom: '5px' }}>
                                  Your Stones:
                                </Typography>

                                <TextField
                                  id='stones-input'
                                  size='small'
                                  sx={{ maxWidth: '175px', marginLeft: '3px' }}
                                  variant='outlined'
                                  type='number'
                                  placeholder='Quantity'
                                  value={totem.userStones ? totem.userStones : ''}
                                  inputProps={{
                                    min: 0,
                                    max: 999999
                                  }}
                                  onChange={e => {
                                    const level = +e.target.value >= totem.stones ? totem.stones : +e.target.value

                                    handleCalculatorChange(totem.quality, 0, level, 'stonesInput')
                                  }}
                                />

                                {totem.userStones > 0 && (
                                  <>
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginTop: '5px' }}
                                    >
                                      Missing Runestones:
                                    </Typography>
                                    <Typography
                                      variant='h5'
                                      color='textPrimary'
                                      align='center'
                                      sx={{
                                        color: `${totem.stones - totem.userStones > 0 ? '#ed2727' : '#50a308'}`
                                      }}
                                    >
                                      {totem.stones - totem.userStones > 0 ? '-' : ''}
                                      {(totem.stones - totem.userStones > 0
                                        ? totem.stones - totem.userStones
                                        : 0
                                      ).toLocaleString()}
                                    </Typography>
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginBottom: '5px' }}
                                    >
                                      Daily/Weekly quests:
                                    </Typography>
                                    <Typography variant='caption' color='textPrimary' align='center'>
                                      {
                                        getDaysNeeded(
                                          totem.quality === 'blue' ? 'nrs' : 'srs',
                                          totem.stones - totem.userStones > 0 ? totem.stones - totem.userStones : 0
                                        )?.result
                                      }
                                    </Typography>
                                  </>
                                )}
                              </Box>

                              <Divider light sx={{ marginBottom: '8px', marginTop: '8px' }} />
                            </Grid>
                            <Grid key={totem.quality + totem.maxLevel + '-tattoos'} item xs={6} lg={6} md={6}>
                              {/* Tattoos */}
                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography variant='body1' color='primary' align='center' sx={{ marginBottom: '8px' }}>
                                  Skill (Tattoos):
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginBottom: '8px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <TextField
                                    align='center'
                                    label='From'
                                    id='fromlevelskill-select'
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    select
                                    sx={{ marginRight: '5px' }}
                                    value={totem.skillFrom ? totem.skillFrom : ''}
                                    inputProps={{
                                      min: 0,
                                      max: totem.maxSkill
                                    }}
                                    onChange={e => {
                                      const value = +e.target.value
                                      handleCalculatorChange(totem.quality, value, totem.skillTo, 'skill')
                                    }}
                                  >
                                    {[...totemSkill[totem.quality]]
                                      ?.filter(t => t.level < totem.maxSkill)
                                      .map(option => (
                                        <MenuItem key={option.level} value={option.level}>
                                          {option.level}
                                        </MenuItem>
                                      ))}
                                  </TextField>

                                  <TextField
                                    disabled={totem.skillFrom > 0 ? false : true}
                                    align='center'
                                    label='To'
                                    id='levelskill-select'
                                    size='small'
                                    variant='outlined'
                                    type='number'
                                    select
                                    sx={{ marginRight: '5px' }}
                                    value={totem.skillTo ? totem.skillTo : ''}
                                    inputProps={{
                                      min: 0,
                                      max: totem.maxSkill
                                    }}
                                    onChange={e => {
                                      const value = +e.target.value
                                      handleCalculatorChange(totem.quality, totem.skillFrom, value, 'skill')
                                    }}
                                  >
                                    {Array.from(Array(totem.maxSkill), (_, i) => i + 1)
                                      .map(n => {
                                        return { level: n }
                                      })
                                      .filter(n => n.level > totem.skillFrom)
                                      .map(option => (
                                        <MenuItem key={option.level} value={option.level}>
                                          {option.level}
                                        </MenuItem>
                                      ))}
                                  </TextField>
                                </Box>
                                <Typography variant='h6' color='primary' align='center' sx={{ marginLeft: '3px' }}>
                                  =
                                </Typography>

                                <Typography variant='h5' color='textPrimary' align='center' sx={{ marginLeft: '3px' }}>
                                  {totem.tattoos?.toLocaleString()}
                                </Typography>

                                <>
                                  <Typography
                                    variant='caption'
                                    color='primary'
                                    align='center'
                                    sx={{ marginLeft: '3px' }}
                                  >
                                    Avg Price ($):
                                  </Typography>

                                  <Typography variant='h5' align='center' sx={{ marginLeft: '3px' }}>
                                    {`$${round(
                                      (totem.tattoos / packPriceScroll?.qty) * packPriceScroll?.p,
                                      0
                                    )?.toLocaleString()} +-`}
                                  </Typography>
                                </>
                              </Box>

                              <Box sx={{ marginBottom: '5px', marginTop: '5px' }}></Box>

                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <Typography variant='body2' color='primary' align='center' sx={{ marginBottom: '5px' }}>
                                  Your Tattoos:
                                </Typography>

                                <TextField
                                  id='tattoos-input'
                                  size='small'
                                  sx={{ maxWidth: '175px', marginLeft: '3px' }}
                                  variant='outlined'
                                  type='number'
                                  placeholder='Quantity'
                                  value={totem.userTattoos ? totem.userTattoos : ''}
                                  inputProps={{
                                    min: 0,
                                    max: 999999
                                  }}
                                  onChange={e => {
                                    const level = +e.target.value >= totem.tattoos ? totem.tattoos : +e.target.value

                                    handleCalculatorChange(totem.quality, 0, level, 'skillInput')
                                  }}
                                />

                                {totem.userTattoos > 0 && (
                                  <>
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginTop: '5px' }}
                                    >
                                      Missing Tattoos:
                                    </Typography>
                                    <Typography
                                      variant='h5'
                                      color='textPrimary'
                                      align='center'
                                      sx={{
                                        color: `${totem.tattoos - totem.userTattoos > 0 ? '#ed2727' : '#50a308'}`
                                      }}
                                    >
                                      {totem.tattoos - totem.userTattoos > 0 ? '-' : ''}
                                      {(totem.tattoos - totem.userTattoos > 0
                                        ? totem.tattoos - totem.userTattoos
                                        : 0
                                      ).toLocaleString()}
                                    </Typography>
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginBottom: '5px' }}
                                    >
                                      Daily/Weekly quests:
                                    </Typography>
                                    <Typography variant='caption' color='textPrimary' align='center'>
                                      {totem.quality === 'gold'
                                        ? '~'
                                        : getDaysNeeded(
                                            totem.quality === 'blue' ? 'bpt' : 'ppt',
                                            totem.tattoos - totem.userTattoos > 0
                                              ? totem.tattoos - totem.userTattoos
                                              : 0
                                          )?.result}
                                    </Typography>
                                  </>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </Paper>
                        <Box sx={{ padding: '0.3rem' }} />
                      </>
                    )
                  })}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='totem' title='TOTEMS' />
          </Card>
        </Grid>

        {activeTab === undefined ? (
          ''
        ) : (
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
                      value='runestones'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='game-icons:rune-stone' />
                          {'Runestones'}
                        </Box>
                      }
                    />
                    <Tab
                      value='calculator'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='ion:stats-chart-sharp' />
                          {'Calculator'}
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
    </>
  )
}

export default Totems
