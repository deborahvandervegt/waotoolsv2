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
  Toolbar,
  useMediaQuery
} from '@mui/material'
import { green, red } from '@mui/material/colors'
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

import { beastList, beastSkills, beastSkillsTemplates, dataOptions } from 'src/data/beast'

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

// ** Var custom
const defaultBeastInfo = {
  options: [...dataOptions],
  beast: 'pegasus',
  userTalents: 0
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress color='success' variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body2' sx={{ color: '#ffffffcf' }}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired
}

/* eslint-enable */
const Beast = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('talents')
  const [isLoading, setIsLoading] = useState(true)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [beastInfo, setBeastInfo] = useState(defaultBeastInfo)
  const beastSkillList = beastSkills.beastSkillList
  const [slotLevel, setSlotLevel] = useState(beastSkills.slots)
  const [skillTemplate, setSkillTemplate] = useState('')
  const [progress, setProgress] = useState(0)

  const [snackOpen, setSnackOpen] = useState({ open: false })

  const [totalAvailablePoints, setTotalAvailablePoints] = useState(
    [...dataOptions]
      .filter(o => o.beast === 'all' || o.beast === 'any' || o.beast === beastInfo.beast)
      .map(o => o.levels)
      .map(od => {
        return od.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  )

  const totalPoints = beastInfo.options.reduce(
    (accumulator, currentValue) => accumulator + currentValue.curTotalPoints,
    0
  )

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('beastInfo'))
    }
    if (saved) {
      setBeastInfo(saved)
    } else {
      const newOptions = [...dataOptions].filter(
        o => o.beast === 'all' || o.beast === 'any' || o.beast === defaultBeastInfo.beast
      )
      setBeastInfo({ ...defaultBeastInfo, options: newOptions })
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let totalCompleted = 0

    if (beastInfo.userTalents > 0) {
      totalCompleted = 100 - ((beastInfo.userTalents - totalPoints) / beastInfo.userTalents) * 100
    } else {
      totalCompleted = 100 - ((totalAvailablePoints - totalPoints) / totalAvailablePoints) * 100
    }

    setProgress(totalCompleted)
  }, [totalPoints, totalAvailablePoints, beastInfo.userTalents])

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const handleSaveData = e => {
    localStorage.setItem('beastInfo', JSON.stringify(beastInfo))

    return setSnackOpen({ open: `Information Stored in the browser!`, type: 'success', time: 3000 })
  }

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen({ open: false })
  }

  // Beast Talents
  const handleBeastChange = e => {
    const newBeast = e.target.value
    const newOptions = [...dataOptions].filter(o => o.beast === 'all' || o.beast === 'any' || o.beast === newBeast)
    setBeastInfo({ ...beastInfo, options: newOptions, beast: newBeast })
  }

  const handlePrerequisiteFill = (row, col) => {
    let newOptionArray = [...beastInfo.options]
    let expArrayFiltered
    let dependencyArray = []

    const optionObj = beastInfo.options?.find(o => o.row === row && o.col === col)
    const reqArray = optionObj.dependency
    const reqArrayB = optionObj?.dependencyB

    if (reqArray?.length > 0) {
      reqArray.forEach(d => {
        const checkDependency = beastInfo.options?.find(opt => opt.row === d.row && opt.col === d.col)
        if (d?.minLevel > checkDependency?.curLevel) {
          // Verify dependency
          dependencyArray.push({
            description: checkDependency?.description,
            minLevel: d?.minLevel,
            counter: d?.minLevel
          })

          if (d?.minLevel > 0) {
            expArrayFiltered = checkDependency.levels?.filter(obj => obj.level > 0 && obj.level <= d?.minLevel)
          }

          const newPointsNeeded = expArrayFiltered?.reduce(
            (accumulator, currentValue) => accumulator + currentValue.points,
            0
          )

          newOptionArray = newOptionArray.map(obj =>
            obj.row === checkDependency.row && obj.col === checkDependency.col
              ? { ...checkDependency, counter: d?.minLevel, curLevel: d?.minLevel, curTotalPoints: newPointsNeeded }
              : obj
          )
        }
      })
    }

    if (reqArrayB?.length > 0 && optionObj?.curLevel >= optionObj?.dependencyBlevel) {
      reqArrayB.forEach(d => {
        const checkDependency = beastInfo.options?.find(opt => opt.row === d.row && opt.col === d.col)
        if (d?.minLevel > checkDependency?.curLevel) {
          // Verify dependency
          dependencyArray.push({
            description: checkDependency?.description,
            minLevel: d?.minLevel,
            counter: d?.minLevel
          })

          if (d?.minLevel > 0) {
            expArrayFiltered = checkDependency.levels?.filter(obj => obj.level > 0 && obj.level <= d?.minLevel)
          }

          const newPointsNeeded = expArrayFiltered?.reduce(
            (accumulator, currentValue) => accumulator + currentValue.points,
            0
          )

          newOptionArray = newOptionArray.map(obj =>
            obj.row === checkDependency.row && obj.col === checkDependency.col
              ? { ...checkDependency, counter: d?.minLevel, curLevel: d?.minLevel, curTotalPoints: newPointsNeeded }
              : obj
          )
        }
      })
    }

    const checkPointsLimit = [...newOptionArray]
      .filter(o => o.beast === 'all' || o.beast === 'any' || o.beast === beastInfo.beast)
      .reduce((accumulator, currentValue) => accumulator + currentValue.curTotalPoints, 0)

    if (checkPointsLimit > beastInfo.userTalents && beastInfo.userTalents > 0)
      return setSnackOpen({
        open: `You dont have enough BEAST TALENTS points available. You need ${checkPointsLimit?.toLocaleString()} and you have a limit of ${beastInfo.userTalents?.toLocaleString()} `,
        type: 'warning',
        time: 3000
      })

    setBeastInfo(prevState => ({ ...prevState, options: newOptionArray }))

    setSnackOpen({ open: `Prerequisites loaded.`, type: 'success', time: 3000 })
  }

  const handleIncrease = (row, col, incAll = false) => {
    const oldObject = beastInfo.options.find(r => r.row === row && r.col === col)
    if (oldObject?.counter === oldObject?.maxCounter) return

    let newTotalPoints = 0
    let newState

    const newCounter = oldObject.counter === oldObject.maxCounter ? oldObject.maxCounter : oldObject.counter + 1
    const dependencyObj = []

    let dependencyMsj = '',
      dependencyMet = false

    if (oldObject?.dependency?.length > 0) {
      oldObject.dependency.forEach(d => {
        const checkDependency = beastInfo.options.find(o => o.row === d.row && o.col === d.col)
        if (d?.minLevel > checkDependency?.counter) {
          dependencyObj.push({
            row: checkDependency?.row,
            col: checkDependency?.col,
            counter: checkDependency?.counter,
            description: checkDependency?.description,
            minLevel: d?.minLevel
          })
        }
      })

      if (dependencyObj?.length > 0) {
        dependencyMet = false
        dependencyMsj = dependencyObj
          ?.map(d => {
            return `Needs ${d?.description} to reach lv${d?.minLevel}. (${d?.counter}/${d?.minLevel}). `
          })
          .join('')
      } else {
        dependencyMet = true
      }
    }

    if (oldObject?.dependencyB?.length > 0 && newCounter > oldObject?.dependencyBlevel) {
      oldObject.dependencyB.forEach(d => {
        const checkDependency = beastInfo.options.find(o => o.row === d.row && o.col === d.col)
        if (d?.minLevel > checkDependency?.counter) {
          dependencyObj.push({
            row: checkDependency?.row,
            col: checkDependency?.col,
            counter: checkDependency?.counter,
            description: checkDependency?.description,
            minLevel: d?.minLevel
          })
        }
      })

      if (dependencyObj?.length > 0) {
        dependencyMet = false
        dependencyMsj = dependencyObj
          ?.map(d => {
            return `Needs ${d?.description} to reach lv${d?.minLevel}. (${d?.counter}/${d?.minLevel}).`
          })
          .join('')
      } else {
        dependencyMet = true
      }
    }

    if (oldObject.dependency === 0 && typeof oldObject.dependency === 'number') dependencyMet = true

    if (!dependencyMet) {
      const message = dependencyMsj
      dependencyMsj = ''

      // `The conditions to upgrade the Talent aren't met: `
      return setSnackOpen({ open: message, type: 'warning', time: 6000 })
    }

    const oldTotalPoints = oldObject?.curTotalPoints

    // Fill skill at maxCounter
    if (incAll) {
      if (row === 'I' && col === 1 && oldObject?.dependencyBlevel > oldObject?.counter) {
        newTotalPoints = oldObject?.levels
          ?.filter(l => l.level > oldObject.counter && l.level < oldObject?.dependencyBlevel)
          .reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
        newState = beastInfo.options?.map(obj =>
          obj.row === row && obj.col === col
            ? {
                ...obj,
                counter: oldObject?.dependencyBlevel,
                curLevel: oldObject?.dependencyBlevel,
                curTotalPoints: oldTotalPoints + newTotalPoints
              }
            : obj
        )
      } else {
        newTotalPoints = oldObject?.levels
          ?.filter(l => l.level > oldObject.counter)
          .reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
        newState = beastInfo.options?.map(obj =>
          obj.row === row && obj.col === col
            ? {
                ...obj,
                counter: oldObject.maxCounter,
                curLevel: oldObject.maxCounter,
                curTotalPoints: oldTotalPoints + newTotalPoints
              }
            : obj
        )
      }
    } else {
      newTotalPoints = oldObject?.levels?.find(l => l.level === newCounter)?.points
      newState = beastInfo.options?.map(obj =>
        obj.row === row && obj.col === col
          ? { ...obj, counter: newCounter, curLevel: newCounter, curTotalPoints: oldTotalPoints + newTotalPoints }
          : obj
      )
    }

    const checkPointsLimit = [...newState]
      .filter(o => o.beast === 'all' || o.beast === 'any' || o.beast === beastInfo.beast)
      .reduce((accumulator, currentValue) => accumulator + currentValue.curTotalPoints, 0)

    if (checkPointsLimit > beastInfo.userTalents && beastInfo.userTalents > 0)
      return setSnackOpen({
        open: `You dont have enough BEAST TALENTS points available. You need ${checkPointsLimit?.toLocaleString()} and you have a limit of ${beastInfo.userTalents?.toLocaleString()} `,
        type: 'warning',
        time: 3000
      })

    setBeastInfo(prevState => ({ ...prevState, options: newState }))
  }

  const handleDrecrease = (row, col) => {
    const oldObject = beastInfo.options.find(r => r.row === row && r.col === col)
    if (oldObject?.counter === oldObject?.minCounter) return
    const newCounter = oldObject.counter

    const oldTotalPoints = oldObject?.curTotalPoints
    const newTotalPoints = oldObject?.levels?.find(l => l.level === newCounter)?.points

    const newState = beastInfo.options?.map(obj =>
      obj.row === row && obj.col === col
        ? { ...obj, counter: newCounter - 1, curLevel: newCounter - 1, curTotalPoints: oldTotalPoints - newTotalPoints }
        : obj
    )
    setBeastInfo(prevState => ({ ...prevState, options: newState }))
  }

  const handleFillAll = e => {
    const defaultBeast = beastInfo.beast ?? defaultBeastInfo.beast

    const newState = [...beastInfo.options]?.map(obj => {
      return {
        ...obj,
        counter: obj.maxCounter,
        curLevel: obj.maxCounter,
        curTotalPoints: obj.levels.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
      }
    })

    const totalPoints = newState
      .filter(o => o.beast === 'all' || o.beast === 'any' || o.beast === defaultBeast)
      .map(o => o.levels)
      .map(od => {
        return od.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const checkPointsLimit = totalPoints

    if (checkPointsLimit > beastInfo.userTalents && beastInfo.userTalents > 0)
      return setSnackOpen({
        open: `You dont have enough BEAST TALENTS points available. You need ${checkPointsLimit?.toLocaleString()} and you have a limit of ${beastInfo.userTalents?.toLocaleString()} `,
        type: 'warning',
        time: 3000
      })

    setTotalAvailablePoints(totalPoints)
    setBeastInfo(prevState => ({ ...prevState, options: newState }))
  }

  const handleClearAll = e => {
    setBeastInfo(prevState => ({
      ...prevState,
      options: [...dataOptions].filter(o => o.beast === 'all' || o.beast === 'any' || o.beast === prevState.beast)
    }))
  }

  const handleRemoveItems = e => {
    setBeastInfo({ ...defaultBeastInfo })
    localStorage.removeItem('beastInfo')

    return setSnackOpen({ open: `Information Cleared from the browser.`, type: 'error' })
  }

  // Beast Skills
  const handleBeastSkillChange = (e, slot) => {
    const newBeastSkill = e.target.value
    const oldObject = slotLevel?.find(r => r.key === slot)
    const alreadyPicked = slotLevel?.find(s => s.skill.key === newBeastSkill)

    if (alreadyPicked) {
      const message = `This skill was already picked at SLOT #${alreadyPicked.key}.`

      return setSnackOpen({ open: message, type: 'warning', time: 6000 })
    }

    if (oldObject) {
      const newSkill = beastSkillList.find(bs => bs.key === newBeastSkill)
      const newState = slotLevel?.map(obj => (obj.key === slot ? { ...obj, skill: newSkill } : obj))
      setSlotLevel(newState)
    }
  }

  const handleBeastSkillChangeTemplate = e => {
    const skillTemplate = +e.target.value
    const newTemplate = beastSkillsTemplates.find(t => t.k === skillTemplate)

    if (!newTemplate) {
      return snackOpen({ open: 'Template not exists.', type: 'error', time: 3000 })
    }

    const newSlotLevel = [...slotLevel]

    slotLevel.forEach((slot, i) => {
      const skillKey = newTemplate?.skills[i]
      const newSkill = beastSkillList.find(bs => bs.key === skillKey)
      const maxLevel = newSlotLevel[i].maxLevel

      const newExpNeeded = beastSkills.skillLevel
        .filter(r => r.level <= maxLevel)
        .reduce((accumulator, currentValue) => accumulator + currentValue.exp, 0)

      newSlotLevel[i].skill = newSkill
      newSlotLevel[i].level = maxLevel
      newSlotLevel[i].expNeeded = newExpNeeded
    })

    setSlotLevel(newSlotLevel)
    setSkillTemplate(skillTemplate)
  }

  const handleDrecreaseBeastSkillChange = slot => {
    const oldObject = slotLevel?.find(r => r.key === slot)
    if (oldObject?.level === oldObject?.minLevel) return
    const newCounter = oldObject.level === oldObject.minLevel ? oldObject.minLevel : oldObject.level - 1
    const levelExp = beastSkills.skillLevel.find(s => s.level === oldObject?.level)?.exp
    const newExpNeeded = oldObject.expNeeded - levelExp

    const newState = slotLevel?.map(obj =>
      obj.key === slot ? { ...obj, level: newCounter, expNeeded: newExpNeeded } : obj
    )
    setSlotLevel(newState)
  }

  const handleIncreaseBeastSkillChange = slot => {
    const oldObject = slotLevel?.find(r => r.key === slot)
    if (oldObject?.level === oldObject?.maxLevel) return
    const newCounter = oldObject.level === oldObject.maxLevel ? oldObject.maxLevel : oldObject.level + 1
    const levelExp = beastSkills.skillLevel.find(s => s.level === newCounter)?.exp
    const newExpNeeded = oldObject.expNeeded + levelExp

    const newState = slotLevel?.map(obj =>
      obj.key === slot ? { ...obj, level: newCounter, expNeeded: newExpNeeded } : obj
    )
    setSlotLevel(newState)
  }

  const handleIncreaseBeastSkillAll = (slot, level) => {
    if (!slot || !level) return

    const newCounter = +level

    const newExpNeeded = beastSkills.skillLevel
      .filter(r => r.level <= level)
      .reduce((accumulator, currentValue) => accumulator + currentValue.exp, 0)

    const newState = slotLevel?.map(obj =>
      obj.key === slot ? { ...obj, level: newCounter, expNeeded: newExpNeeded } : obj
    )
    setSlotLevel(newState)

    return setSnackOpen({ open: 'Max level set.', type: 'success', time: 3000 })
  }

  const tabContentList = {
    talents: (
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
            <Grid container spacing={2} sx={{ padding: '0.5em' }}>
              <Grid item xs={12} sx={{ display: 'flex' }}>
                <Paper elevation={1}>
                  <Typography
                    align='center'
                    variant='h6'
                    color='primary'
                    sx={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}
                  >
                    BEAST TALENTS SIMULATOR
                  </Typography>
                  <Divider light>{<Typography variant='caption'>USER CONFIGURATION</Typography>}</Divider>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: '10px',
                      padding: '0.5em'
                    }}
                  >
                    <GreenButton
                      variant='contained'
                      startIcon={<Icon icon='ic:baseline-save' />}
                      onClick={handleSaveData}
                      sx={{ marginBottom: '10px', marginRight: '10px' }}
                    >
                      SAVE
                    </GreenButton>
                    <RedButton
                      edge='start'
                      color='primary'
                      variant='contained'
                      startIcon={<ClearAll />}
                      onClick={handleRemoveItems}
                      sx={{ marginBottom: '10px', marginRight: '10px' }}
                    >
                      DELETE
                    </RedButton>
                  </Box>
                  <Divider />
                  <Box
                    elevation={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '0.6em'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3 }}>
                        <TextField
                          size='small'
                          align='center'
                          select
                          label='Beast:'
                          id='beast-select'
                          defaultValue={beastInfo.beast}
                          variant='outlined'
                          type='info'
                          helperText=''
                          onChange={handleBeastChange}
                        >
                          {beastList?.map(option => (
                            <MenuItem key={option.key} value={option.key}>
                              {option.desc}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Avatar sx={{ ml: 3 }} alt={beastInfo.beast} src={`/images/beast/${beastInfo.beast}.png`} />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '0.5em',
                          flexWrap: 'wrap'
                        }}
                      >
                        <Typography variant='body2' color='primary' align='right' sx={{ marginRight: '3px' }}>
                          Set Beast Talents Limit:
                        </Typography>

                        <TextField
                          id='talents-limit'
                          size='small'
                          variant='outlined'
                          type='number'
                          sx={{ maxWidth: '150px' }}
                          value={beastInfo.userTalents > 0 ? beastInfo.userTalents : ''}
                          onChange={e => {
                            const value =
                              +e.target.value >= totalAvailablePoints ? totalAvailablePoints : +e.target.value

                            setBeastInfo(prevState => ({
                              ...prevState,
                              userTalents: value
                            }))
                          }}
                        />
                        <Tooltip title={'New option!'} arrow>
                          <NewReleases color='primary' />
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                  <Divider light>{<Typography variant='caption'>TREE</Typography>}</Divider>
                  <Box sx={{ minWidth: `${hideText ? '1px' : '520px'}` }}>
                    {beastInfo.options.map(opt => {
                      if (
                        opt.type === 1 &&
                        (opt.beast === beastInfo.beast || opt.beast === 'all' || opt.beast === 'any')
                      ) {
                        return (
                          <>
                            {opt.col === 1 && opt.row === 'K' && (
                              <>
                                <div style={{ marginTop: '5px' }} />

                                <Divider>{<Typography variant='caption'>NEW BRANCH</Typography>}</Divider>
                                <Divider light sx={{ marginTop: '5px' }} />
                              </>
                            )}
                            <Grid container>
                              <Grid key={`${opt.row}-col1_empty`} item xs={3} sm={3}></Grid>
                              <Grid key={`${opt.row}-col1`} item xs={6} sm={6} sx={{ padding: '0.5rem' }}>
                                <Paper
                                  elevation={12}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: `${hideText ? '150px' : '200px'}`
                                  }}
                                  key={`${opt.row}-col1-paper`}
                                >
                                  <Box
                                    sx={{
                                      margin: theme.spacing(1),
                                      minWidth: 90
                                    }}
                                    key={`${opt.row}-col1-paper-box`}
                                  >
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginBottom: '10px' }}
                                    >
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.description}
                                    </Typography>

                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexGrow: 'revert',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                      }}
                                      key={`${opt.row}-col1-paper-box-sub`}
                                    >
                                      <Badge
                                        color={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        badgeContent={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.curTotalPoints
                                        }
                                        max={50001}
                                      >
                                        <Avatar
                                          alt={`${opt.row}_${opt.col}`}
                                          src={`/images/beast/row${opt.row}_${opt.col}_${
                                            opt.beast === 'any' ? beastInfo.beast : opt.beast
                                          }.png`}
                                          sx={{
                                            width: theme.spacing(7),
                                            height: theme.spacing(7)
                                          }}
                                        />
                                      </Badge>
                                      <Typography
                                        color={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        variant='body2'
                                        sx={{
                                          marginTop: '-12px'
                                        }}
                                      >
                                        {beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)?.counter}{' '}
                                        /{' '}
                                        {
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                        }{' '}
                                      </Typography>

                                      {/* MAXED */}
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)?.counter ===
                                        beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                          ?.maxCounter && (
                                        <Typography
                                          color={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.maxCounter
                                              ? 'error'
                                              : 'primary'
                                          }
                                          variant='body2'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          {beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                            ? '(MAXED)'
                                            : ''}
                                        </Typography>
                                      )}

                                      {/* NEXT LEVEL */}
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)?.counter !==
                                        beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                          ?.maxCounter && (
                                        <Typography
                                          color='textPrimary'
                                          variant='caption'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          NEXT LVL: +{opt.levels?.find(l => l.level === opt.curLevel + 1)?.points}
                                        </Typography>
                                      )}

                                      <ButtonGroup
                                        color='primary'
                                        size='small'
                                        sx={{
                                          marginTop: '10px'
                                        }}
                                      >
                                        <Button
                                          aria-label='reduce'
                                          disabled={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.minCounter
                                              ? true
                                              : false
                                          }
                                          onClick={() => {
                                            handleDrecrease(opt.row, opt.col)
                                          }}
                                        >
                                          <RemoveSharp fontSize='small' />
                                        </Button>
                                        <Button
                                          aria-label='increase'
                                          onClick={() => {
                                            handleIncrease(opt.row, opt.col)
                                          }}
                                          disabled={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.maxCounter
                                              ? true
                                              : false
                                          }
                                        >
                                          <AddSharp fontSize='small' />
                                        </Button>
                                        <Tooltip title={'Fill skill at max.'}>
                                          <Button
                                            aria-label='increase-all'
                                            onClick={() => {
                                              handleIncrease(opt.row, opt.col, true)
                                            }}
                                            disabled={
                                              beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                                ?.counter ===
                                              beastInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                                ?.maxCounter
                                                ? true
                                                : false
                                            }
                                          >
                                            <AddToPhotos />{' '}
                                          </Button>
                                        </Tooltip>
                                        {opt.row !== 'A' && !hideText && (
                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                            <Button
                                              variant='contained'
                                              aria-label='add-dependencies'
                                              size='small'
                                              color='primary'
                                              disabled={false}
                                              onClick={e => {
                                                handlePrerequisiteFill(opt.row, 1)
                                              }}
                                            >
                                              {<AccountTree fontSize='inherit' />}
                                            </Button>
                                          </Tooltip>
                                        )}
                                      </ButtonGroup>
                                      {opt.row !== 'A' && hideText && (
                                        <ButtonGroup
                                          color='primary'
                                          size='small'
                                          sx={{
                                            marginTop: '5px',
                                            minHeight: '32px',
                                            minWidth: '48px'
                                          }}
                                        >
                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                            <Button
                                              variant='contained'
                                              aria-label='add-dependencies'
                                              size='small'
                                              color='primary'
                                              disabled={false}
                                              onClick={e => {
                                                handlePrerequisiteFill(opt.row, 1)
                                              }}
                                              sx={{ minHeight: '32px', minWidth: '48px' }}
                                            >
                                              {<AccountTree fontSize='inherit' />}
                                            </Button>
                                          </Tooltip>
                                        </ButtonGroup>
                                      )}
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>

                              <Grid key={`${opt.row}-col2_empty`} item xs={3} sm={3}></Grid>
                            </Grid>

                            <Divider light />
                          </>
                        )
                      } else if (
                        opt.type === 2 &&
                        opt.col === 1 &&
                        (opt.beast === beastInfo.beast || opt.beast === 'all' || opt.beast === 'any')
                      ) {
                        return (
                          <>
                            <Grid container>
                              {/* LEFT */}
                              <Grid key={`${opt.row}-col1`} item xs={6} lg={5} md={5} sm={6} sx={{ padding: '0.5rem' }}>
                                <Paper
                                  elevation={12}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: `${hideText ? '150px' : '200px'}`
                                  }}
                                  key={`${opt.row}-col1-paper`}
                                >
                                  <Box
                                    sx={{
                                      margin: theme.spacing(1),
                                      minWidth: 90
                                    }}
                                    key={`${opt.row}-col1-paper-box`}
                                  >
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginBottom: '10px' }}
                                    >
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.description}
                                    </Typography>

                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexGrow: 'revert',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                      }}
                                      key={`${opt.row}-col1-paper-box-sub`}
                                    >
                                      <Badge
                                        color={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        badgeContent={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.curTotalPoints
                                        }
                                        max={50001}
                                      >
                                        <Avatar
                                          alt={`${opt.row}_${opt.col}`}
                                          src={`/images/beast/row${opt.row}_1_${
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.beast ===
                                            'any'
                                              ? beastInfo.beast
                                              : opt.beast
                                          }.png`}
                                          sx={{
                                            width: theme.spacing(7),
                                            height: theme.spacing(7)
                                          }}
                                        />
                                      </Badge>

                                      <Typography
                                        color={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        variant='body2'
                                        sx={{
                                          marginTop: '-12px'
                                        }}
                                      >
                                        {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter} /{' '}
                                        {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter}{' '}
                                      </Typography>

                                      {/* MAXED */}
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                        beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter && (
                                        <Typography
                                          color={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                              ? 'error'
                                              : 'primary'
                                          }
                                          variant='body2'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                            ? '(MAXED)'
                                            : ''}
                                        </Typography>
                                      )}

                                      {/* NEXT LEVEL */}
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter !==
                                        beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter && (
                                        <Typography
                                          color='textPrimary'
                                          variant='caption'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          NEXT LVL: +{opt.levels?.find(l => l.level === opt.counter + 1)?.points}
                                        </Typography>
                                      )}
                                      <ButtonGroup
                                        color='primary'
                                        size='small'
                                        sx={{
                                          marginTop: '10px'
                                        }}
                                      >
                                        <Button
                                          aria-label='reduce'
                                          disabled={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.minCounter
                                              ? true
                                              : false
                                          }
                                          onClick={() => {
                                            handleDrecrease(opt.row, 1)
                                          }}
                                        >
                                          <RemoveSharp fontSize='small' />
                                        </Button>
                                        <Button
                                          aria-label='increase'
                                          onClick={() => {
                                            handleIncrease(opt.row, 1)
                                          }}
                                          disabled={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                              ? true
                                              : false
                                          }
                                        >
                                          <AddSharp fontSize='small' />
                                        </Button>
                                        <Tooltip title={'Fill skill at max.'}>
                                          <Button
                                            aria-label='increase-all'
                                            onClick={() => {
                                              handleIncrease(opt.row, 1, true)
                                            }}
                                            disabled={
                                              beastInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                                ?.counter ===
                                              beastInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                                ? true
                                                : false
                                            }
                                          >
                                            <AddToPhotos />{' '}
                                          </Button>
                                        </Tooltip>
                                        {!hideText && (
                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                            <Button
                                              variant='contained'
                                              aria-label='add-dependencies'
                                              size='small'
                                              color='primary'
                                              disabled={false}
                                              onClick={e => {
                                                handlePrerequisiteFill(opt.row, 1)
                                              }}
                                            >
                                              {<AccountTree fontSize='inherit' />}
                                            </Button>
                                          </Tooltip>
                                        )}
                                      </ButtonGroup>
                                      {hideText && (
                                        <ButtonGroup
                                          color='primary'
                                          size='small'
                                          sx={{
                                            marginTop: '5px',
                                            minHeight: '32px',
                                            minWidth: '48px'
                                          }}
                                        >
                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                            <Button
                                              variant='contained'
                                              aria-label='add-dependencies'
                                              size='small'
                                              color='primary'
                                              disabled={false}
                                              onClick={e => {
                                                handlePrerequisiteFill(opt.row, 1)
                                              }}
                                              sx={{ minHeight: '32px', minWidth: '48px' }}
                                            >
                                              {<AccountTree fontSize='inherit' />}
                                            </Button>
                                          </Tooltip>
                                        </ButtonGroup>
                                      )}
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                              {/* MIDDLE */}
                              <Grid key={`${opt.row}-col2_empty`} item lg={2} md={2}></Grid>
                              {/* RIGHT */}
                              <Grid key={`${opt.row}-col2`} item xs={6} lg={5} md={5} sm={6} sx={{ padding: '0.5rem' }}>
                                <Paper
                                  elevation={12}
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    width: `${hideText ? '150px' : '200px'}`
                                  }}
                                  key={`${opt.row}-col2-paper`}
                                >
                                  <Box
                                    sx={{
                                      margin: theme.spacing(1),
                                      minWidth: 90
                                    }}
                                    key={`${opt.row}-col2-paper-box`}
                                  >
                                    <Typography
                                      variant='body2'
                                      color='primary'
                                      align='center'
                                      sx={{ marginBottom: '10px' }}
                                    >
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.description}
                                    </Typography>

                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flexGrow: 'revert',
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                      }}
                                      key={`${opt.row}-col2-paper-box-sub`}
                                    >
                                      <Badge
                                        color={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        badgeContent={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.curTotalPoints
                                        }
                                        max={50001}
                                      >
                                        <Avatar
                                          alt={`${opt.row}_${opt.col}`}
                                          src={`/images/beast/row${opt.row}_2_${
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.beast ===
                                            'all'
                                              ? beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.beast
                                              : beastInfo.beast
                                          }.png`}
                                          sx={{
                                            width: theme.spacing(7),
                                            height: theme.spacing(7)
                                          }}
                                        />
                                      </Badge>

                                      <Typography
                                        color={
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        variant='body2'
                                        sx={{
                                          marginTop: '-12px'
                                        }}
                                      >
                                        {beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter} /{' '}
                                        {beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter}{' '}
                                      </Typography>

                                      {/* MAXED */}
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                        beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter && (
                                        <Typography
                                          color={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                              ? 'error'
                                              : 'primary'
                                          }
                                          variant='body2'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          {beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                          beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                            ? '(MAXED)'
                                            : ''}
                                        </Typography>
                                      )}

                                      {/* NEXT LEVEL */}
                                      {beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter !==
                                        beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter && (
                                        <Typography
                                          color='textPrimary'
                                          variant='caption'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          NEXT LVL: +
                                          {
                                            beastInfo.options
                                              ?.find(o => o.row === opt.row && o.col === 2)
                                              .levels?.find(
                                                l =>
                                                  l.level ===
                                                  beastInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                                    .counter +
                                                    1
                                              )?.points
                                          }
                                        </Typography>
                                      )}

                                      <ButtonGroup
                                        color='primary'
                                        size='small'
                                        sx={{
                                          marginTop: '10px'
                                        }}
                                      >
                                        <Button
                                          aria-label='reduce'
                                          disabled={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.minCounter
                                              ? true
                                              : false
                                          }
                                          onClick={() => {
                                            handleDrecrease(opt.row, 2)
                                          }}
                                        >
                                          <RemoveSharp fontSize='small' />
                                        </Button>
                                        <Button
                                          aria-label='increase'
                                          onClick={() => {
                                            handleIncrease(opt.row, 2)
                                          }}
                                          disabled={
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                            beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                              ? true
                                              : false
                                          }
                                        >
                                          <AddSharp fontSize='small' />
                                        </Button>
                                        <Tooltip title={'Fill skill at max.'}>
                                          <Button
                                            aria-label='increase-all'
                                            onClick={() => {
                                              handleIncrease(opt.row, 2, true)
                                            }}
                                            disabled={
                                              beastInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                                ?.counter ===
                                              beastInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                                ? true
                                                : false
                                            }
                                          >
                                            <AddToPhotos />{' '}
                                          </Button>
                                        </Tooltip>
                                        {!hideText && (
                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                            <Button
                                              variant='contained'
                                              aria-label='add-dependencies'
                                              size='small'
                                              color='primary'
                                              disabled={false}
                                              onClick={e => {
                                                handlePrerequisiteFill(opt.row, 2)
                                              }}
                                              sx={{ minHeight: '32px', minWidth: '48px' }}
                                            >
                                              {<AccountTree fontSize='inherit' />}
                                            </Button>
                                          </Tooltip>
                                        )}
                                      </ButtonGroup>
                                      {hideText && (
                                        <ButtonGroup
                                          color='primary'
                                          size='small'
                                          sx={{
                                            marginTop: '5px',
                                            minHeight: '32px',
                                            minWidth: '48px'
                                          }}
                                        >
                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                            <Button
                                              variant='contained'
                                              aria-label='add-dependencies'
                                              size='small'
                                              color='primary'
                                              disabled={false}
                                              onClick={e => {
                                                handlePrerequisiteFill(opt.row, 2)
                                              }}
                                              sx={{ minHeight: '32px', minWidth: '48px' }}
                                            >
                                              {<AccountTree fontSize='inherit' />}
                                            </Button>
                                          </Tooltip>
                                        </ButtonGroup>
                                      )}
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                            </Grid>

                            <Divider light />
                          </>
                        )
                      }
                    })}
                  </Box>
                  {totalPoints > 0 && <Divider light>SELECTED TALENTS SKILLS</Divider>}
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: '450px' }}>
                    {[...beastInfo.options].map(opt => {
                      if (opt.counter > 0) {
                        let statDescription = { text: opt.statText }
                        opt.levels[opt.counter - 1].stat.forEach((s, i) => {
                          const indexText = `$${i + 1}`
                          statDescription.text = statDescription.text?.replace(indexText, s)
                        })

                        return (
                          <List key={`${opt.row}_${opt.col}_${opt.beast}`}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar
                                  alt={`${opt.row}_${opt.col}`}
                                  src={`/images/beast/row${opt.row}_${opt.col}_${
                                    opt.beast === 'all' ? 'all' : beastInfo.beast
                                  }.png`}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primaryTypographyProps={{ color: 'primary' }}
                                primary={`${opt.description} - Lv${opt.counter}`}
                                secondary={statDescription.text}
                              />
                            </ListItem>
                          </List>
                        )
                      }
                    })}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <AppBar
            position='fixed'
            color='primary'
            sx={{
              top: 'auto',
              bottom: 0
            }}
          >
            <LinearProgressWithLabel value={progress} />
            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center' }}>
                <Typography variant='caption' style={{ marginTop: '3px' }}>
                  Available
                </Typography>
                <Typography variant='body1' align='right' sx={{ color: '#ffffffcf' }}>
                  {`${
                    beastInfo.userTalents > 0
                      ? (beastInfo.userTalents - totalPoints).toLocaleString()
                      : (totalAvailablePoints - totalPoints).toLocaleString()
                  }`}
                </Typography>
              </div>

              <Divider
                orientation='vertical'
                flexItem
                sx={{
                  margin: theme.spacing(1)
                }}
              />

              <GreenButton
                variant='contained'
                size='small'
                sx={{
                  margin: theme.spacing(1)
                }}
                onClick={handleFillAll}
                disabled={
                  beastInfo.userTalents > 0
                    ? beastInfo.userTalents - totalPoints <= 0
                      ? true
                      : false
                    : totalAvailablePoints - totalPoints <= 0
                    ? true
                    : false
                }
              >
                FILL
              </GreenButton>
              <RedButton
                variant='contained'
                size='small'
                sx={{
                  margin: theme.spacing(1)
                }}
                onClick={handleClearAll}
              >
                CLEAR
              </RedButton>

              <Divider
                orientation='vertical'
                flexItem
                sx={{
                  margin: theme.spacing(1)
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', alignContent: 'center' }}>
                <Typography variant='caption' style={{ marginTop: '3px' }}>
                  Used / Total
                </Typography>
                <Typography variant='body2' sx={{ color: '#ffffffcf' }}>
                  {totalPoints.toLocaleString()} / {totalAvailablePoints.toLocaleString()}
                </Typography>
                <Typography variant='body2' sx={{ color: '#ffffffcf' }}>
                  ${Math.round((totalPoints / 80) * 5).toLocaleString()}
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </Card>
      </>
    ),
    skills: (
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
                <Paper elevation={12}>
                  <Typography
                    align='center'
                    variant='h6'
                    color='primary'
                    sx={{ paddingTop: '0.5em', paddingBottom: '0.5em' }}
                  >
                    BEAST PASSIVE SKILLS SIMULATOR
                  </Typography>
                  <Divider>{<Typography variant='caption'>SETUP</Typography>}</Divider>
                  <Box
                    sx={{
                      padding: '0.8em',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <TextField
                        align='center'
                        id='beast-skill-template-select'
                        size='small'
                        variant='outlined'
                        label='Presets'
                        select
                        sx={{ minWidth: '200px', mt: 3 }}
                        value={skillTemplate}
                        onChange={handleBeastSkillChangeTemplate}
                      >
                        {beastSkillsTemplates?.map(option => (
                          <MenuItem key={option.k} value={option.k}>
                            {option.desc}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Box>
                  <Divider>{<Typography variant='caption'>SKILLS SLOTS</Typography>}</Divider>
                  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {slotLevel?.map((slot, index) => {
                      return (
                        <>
                          <Grid item xs={12} md={3} lg={3} sm={12} sx={{ padding: '1.5em' }}>
                            <Paper
                              elevation={12}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <Avatar
                                alt={slot.key}
                                src={`/images/beast_skills/${slot.skill?.key}.png`}
                                sx={{
                                  width: theme.spacing(7),
                                  height: theme.spacing(7),
                                  marginTop: '10px'
                                }}
                              >
                                {slot?.key === 1 && <LooksOne />}
                                {slot?.key === 2 && <LooksTwo />}
                                {slot?.key === 3 && <Looks3 />}
                                {slot?.key === 4 && <Looks4 />}
                              </Avatar>
                              <Divider flexItem light variant='middle' sx={{ margin: '5px' }} />
                              <Box>
                                <TextField
                                  align='center'
                                  select
                                  size='small'
                                  label={`SLOT #${slot.key}`}
                                  id={'slot-select-' + slot.key}
                                  variant='outlined'
                                  type='info'
                                  helperText=''
                                  value={slotLevel[index].skill?.key ?? ''}
                                  sx={{ margin: theme.spacing(1), width: '15ch' }}
                                  onChange={e => {
                                    handleBeastSkillChange(e, slot.key)
                                  }}
                                >
                                  <ListSubheader>WAR</ListSubheader>

                                  {beastSkillList
                                    ?.filter(f => f.group === 'WAR')
                                    ?.map(option => (
                                      <MenuItem key={option.key} value={option.key}>
                                        {option.desc}
                                      </MenuItem>
                                    ))}
                                  <ListSubheader>Development</ListSubheader>
                                  {beastSkillList
                                    ?.filter(f => f.group === 'Development')
                                    ?.map(option => (
                                      <MenuItem key={option.key} value={option.key}>
                                        {option.desc}
                                      </MenuItem>
                                    ))}
                                  <ListSubheader>Misc</ListSubheader>
                                  {beastSkillList
                                    ?.filter(f => f.group === 'Misc')
                                    ?.map(option => (
                                      <MenuItem key={option.key} value={option.key}>
                                        {option.desc}
                                      </MenuItem>
                                    ))}
                                </TextField>
                                <Divider flexItem light />
                                <Typography variant='body1' color='primary' align='center'>
                                  Level:
                                </Typography>
                                <Typography variant='h5' color='secondary' align='center'>
                                  {slot.level}
                                </Typography>
                              </Box>
                              <Divider flexItem light variant='middle' sx={{ margin: '5px' }} />

                              <ButtonGroup color='primary' size='small' sx={{ mt: 1, mb: 3 }}>
                                <Tooltip title='Decrease 1 level.'>
                                  <Button
                                    color='secondary'
                                    aria-label='reduce'
                                    disabled={slot?.skill?.key?.length > 0 ? false : true}
                                    onClick={e => {
                                      handleDrecreaseBeastSkillChange(slot.key)
                                    }}
                                  >
                                    <RemoveSharp fontSize='small' />
                                  </Button>
                                </Tooltip>
                                <Tooltip title='Increase 1 level.'>
                                  <Button
                                    aria-label='increase'
                                    disabled={slot?.skill?.key?.length > 0 ? false : true}
                                    onClick={e => {
                                      handleIncreaseBeastSkillChange(slot.key)
                                    }}
                                  >
                                    <AddSharp fontSize='small' />
                                  </Button>
                                </Tooltip>
                                <Tooltip title='Set Max Level'>
                                  <Button
                                    aria-label='increase'
                                    disabled={slot?.skill?.key?.length > 0 ? false : true}
                                    onClick={e => {
                                      handleIncreaseBeastSkillAll(slot.key, 30)
                                    }}
                                  >
                                    <LibraryAdd fontSize='small' />
                                  </Button>
                                </Tooltip>
                              </ButtonGroup>
                            </Paper>
                          </Grid>
                        </>
                      )
                    })}
                  </Box>
                  {(slotLevel[0].skill?.key?.length > 0 ||
                    slotLevel[1].skill?.key?.length > 0 ||
                    slotLevel[2].skill?.key?.length > 0 ||
                    slotLevel[3].skill?.key?.length > 0) && (
                    <Divider>{<Typography variant='caption'>SELECTED SKILLS</Typography>}</Divider>
                  )}
                  <Box>
                    {slotLevel?.map(opt => {
                      let statDescription = { text: opt?.skill?.info }

                      const newStat =
                        opt?.level === 1
                          ? opt?.skill?.statInit
                          : opt?.skill?.statInit + opt?.skill?.statInc * (opt?.level - 1)
                      statDescription.text = statDescription.text?.replace('$1', newStat.toFixed(1))

                      if (opt?.skill?.key?.length > 0) {
                        return (
                          <List key={opt.key}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar
                                  alt={`${opt.key}`}
                                  src={`/images/beast_skills/${opt?.skill?.key}.png`}
                                  sx={{
                                    width: theme.spacing(5),
                                    height: theme.spacing(5)
                                  }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primaryTypographyProps={{ color: 'primary' }}
                                primary={`Skill #${opt?.key} - ${opt?.skill?.desc} - Lv${opt?.level}`}
                                secondary={`${statDescription.text}  Requirements: ${
                                  opt?.requeriments
                                } Total Experience needed: ${opt.expNeeded.toLocaleString()}. Total Scrolls needed from Lv1: ${Math.round(
                                  opt.expNeeded / 50
                                ).toLocaleString()}. ${
                                  opt?.level < 30
                                    ? `Scrolls needed for next level (${
                                        opt?.level !== 30 ? opt?.level + 1 : '30'
                                      }): ${Math.round(
                                        beastSkills?.skillLevel?.find(
                                          lvl => lvl.level === (opt?.level !== 30 ? opt?.level + 1 : 30)
                                        ).exp / 50
                                      ).toLocaleString()}`
                                    : ''
                                } `}
                              />
                            </ListItem>
                          </List>
                        )
                      }
                    })}
                  </Box>
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
            <CustomHeader icon='beast' title='BEAST' />
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
                      value='talents'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='game-icons:black-book' />
                          {'Talents'}
                        </Box>
                      }
                    />
                    <Tab
                      value='skills'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='game-icons:book-aura' />
                          {'Skills'}
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

export default Beast
