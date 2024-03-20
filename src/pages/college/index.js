// ** React Imports
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled, createTheme } from '@mui/material/styles'
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
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  Toolbar,
  useMediaQuery
} from '@mui/material'
import { green, red } from '@mui/material/colors'
import { AccountTree, AddSharp, AddToPhotos, ClearAll, RemoveSharp } from '@mui/icons-material'

import { highCollegeOptions } from 'src/data/college'

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
const defaultCollegeInfo = {
  options: [...highCollegeOptions],
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
const HighCollege = () => {
  // ** State
  const activeTab = 'talents'
  const [isLoading, setIsLoading] = useState(true)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [collegeInfo, setCollegeInfo] = useState(defaultCollegeInfo)
  const [progress, setProgress] = useState(0)

  const [snackOpen, setSnackOpen] = useState({ open: false })

  const [totalAvailablePoints, setTotalAvailablePoints] = useState(
    [...highCollegeOptions]
      .filter(o => o.beast === 'all' || o.beast === 'any')
      .map(o => o.levels)
      .map(od => {
        return od.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  )

  const totalPoints = collegeInfo.options.reduce(
    (accumulator, currentValue) => accumulator + currentValue.curTotalPoints,
    0
  )

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('collegeInfo'))
    }
    if (saved) {
      setCollegeInfo(saved)
    } else {
      const newOptions = [...highCollegeOptions].filter(o => o.beast === 'all' || o.beast === 'any')
      setCollegeInfo({ ...defaultCollegeInfo, options: newOptions })
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let totalCompleted = 0

    if (collegeInfo.userTalents > 0) {
      totalCompleted = 100 - ((collegeInfo.userTalents - totalPoints) / collegeInfo.userTalents) * 100
    } else {
      totalCompleted = 100 - ((totalAvailablePoints - totalPoints) / totalAvailablePoints) * 100
    }

    setProgress(totalCompleted)
  }, [totalPoints, totalAvailablePoints, collegeInfo.userTalents])

  const handleSaveData = e => {
    localStorage.setItem('collegeInfo', JSON.stringify(collegeInfo))

    return setSnackOpen({ open: `Information Stored in the browser!`, type: 'success', time: 3000 })
  }

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen({ open: false })
  }

  const handlePrerequisiteFill = (row, col) => {
    let newOptionArray = [...collegeInfo.options]
    let expArrayFiltered
    let dependencyArray = []

    const optionObj = collegeInfo.options?.find(o => o.row === row && o.col === col)
    const reqArray = optionObj.dependency
    const reqArrayB = optionObj?.dependencyB

    if (reqArray?.length > 0) {
      reqArray.forEach(d => {
        const checkDependency = collegeInfo.options?.find(opt => opt.row === d.row && opt.col === d.col)
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
        const checkDependency = collegeInfo.options?.find(opt => opt.row === d.row && opt.col === d.col)
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
      .filter(o => o.beast === 'all' || o.beast === 'any')
      .reduce((accumulator, currentValue) => accumulator + currentValue.curTotalPoints, 0)

    if (checkPointsLimit > collegeInfo.userTalents && collegeInfo.userTalents > 0)
      return setSnackOpen({
        open: `You dont have enough AZURITE available. You need ${checkPointsLimit?.toLocaleString()} and you have a limit of ${collegeInfo.userTalents?.toLocaleString()} `,
        type: 'warning',
        time: 3000
      })

    setCollegeInfo(prevState => ({ ...prevState, options: newOptionArray }))

    setSnackOpen({ open: `Prerequisites loaded.`, type: 'success', time: 3000 })
  }

  const handleIncrease = (row, col, incAll = false) => {
    const oldObject = collegeInfo.options.find(r => r.row === row && r.col === col)
    if (oldObject?.counter === oldObject?.maxCounter) return

    let newTotalPoints = 0
    let newState

    const newCounter = oldObject.counter === oldObject.maxCounter ? oldObject.maxCounter : oldObject.counter + 1
    const dependencyObj = []

    let dependencyMsj = '',
      dependencyMet = false

    if (oldObject?.dependency?.length > 0) {
      oldObject.dependency.forEach(d => {
        const checkDependency = collegeInfo.options.find(o => o.row === d.row && o.col === d.col)
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
        const checkDependency = collegeInfo.options.find(o => o.row === d.row && o.col === d.col)
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
        newState = collegeInfo.options?.map(obj =>
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
        newState = collegeInfo.options?.map(obj =>
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
      newState = collegeInfo.options?.map(obj =>
        obj.row === row && obj.col === col
          ? { ...obj, counter: newCounter, curLevel: newCounter, curTotalPoints: oldTotalPoints + newTotalPoints }
          : obj
      )
    }

    const checkPointsLimit = [...newState]
      .filter(o => o.beast === 'all' || o.beast === 'any')
      .reduce((accumulator, currentValue) => accumulator + currentValue.curTotalPoints, 0)

    if (checkPointsLimit > collegeInfo.userTalents && collegeInfo.userTalents > 0)
      return setSnackOpen({
        open: `You dont have enough AZURITE available. You need ${checkPointsLimit?.toLocaleString()} and you have a limit of ${collegeInfo.userTalents?.toLocaleString()} `,
        type: 'warning',
        time: 3000
      })

    setCollegeInfo(prevState => ({ ...prevState, options: newState }))
  }

  const handleDrecrease = (row, col) => {
    const oldObject = collegeInfo.options.find(r => r.row === row && r.col === col)
    if (oldObject?.counter === oldObject?.minCounter) return
    const newCounter = oldObject.counter

    const oldTotalPoints = oldObject?.curTotalPoints
    const newTotalPoints = oldObject?.levels?.find(l => l.level === newCounter)?.points

    const newState = collegeInfo.options?.map(obj =>
      obj.row === row && obj.col === col
        ? { ...obj, counter: newCounter - 1, curLevel: newCounter - 1, curTotalPoints: oldTotalPoints - newTotalPoints }
        : obj
    )
    setCollegeInfo(prevState => ({ ...prevState, options: newState }))
  }

  const handleFillAll = e => {
    const newState = [...collegeInfo.options]?.map(obj => {
      return {
        ...obj,
        counter: obj.maxCounter,
        curLevel: obj.maxCounter,
        curTotalPoints: obj.levels.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
      }
    })

    const totalPoints = newState
      .filter(o => o.beast === 'all' || o.beast === 'any')
      .map(o => o.levels)
      .map(od => {
        return od.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const checkPointsLimit = totalPoints

    if (checkPointsLimit > collegeInfo.userTalents && collegeInfo.userTalents > 0)
      return setSnackOpen({
        open: `You dont have enough AZURITE available. You need ${checkPointsLimit?.toLocaleString()} and you have a limit of ${collegeInfo.userTalents?.toLocaleString()} `,
        type: 'warning',
        time: 3000
      })

    setTotalAvailablePoints(totalPoints)
    setCollegeInfo(prevState => ({ ...prevState, options: newState }))
  }

  const handleClearAll = e => {
    setCollegeInfo(prevState => ({
      ...prevState,
      options: [...highCollegeOptions].filter(o => o.beast === 'all' || o.beast === 'any')
    }))
  }

  const handleRemoveItems = e => {
    setCollegeInfo({ ...defaultCollegeInfo })
    localStorage.removeItem('collegeInfo')

    return setSnackOpen({ open: `Information Cleared from the browser.`, type: 'error' })
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
                <Paper elevation={6} sx={{ maxWidth: '550px' }}>
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
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '0.5em',
                          flexWrap: 'wrap'
                        }}
                      >
                        <Box>
                          <Alert severity='warning' sx={{ m: 1 }}>
                            There are some skills missing azurite requeriments, like Manage Food II lv3+ and Rally
                            Decree I lv3+. If you want to help with this missing info, check CONTRIBUTORS tab.{' '}
                          </Alert>
                          <Alert severity='info' sx={{ m: 1 }}>
                            Requirement azurite for College levels are not being counted, just the skills. Price is an
                            average of 490 azurite / $8.{' '}
                          </Alert>
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
                            Set AZURITE Limit:
                          </Typography>

                          <TextField
                            id='talents-limit'
                            size='small'
                            variant='outlined'
                            type='number'
                            sx={{ maxWidth: '150px' }}
                            value={collegeInfo.userTalents > 0 ? collegeInfo.userTalents : ''}
                            onChange={e => {
                              const value =
                                +e.target.value >= totalAvailablePoints ? totalAvailablePoints : +e.target.value

                              setCollegeInfo(prevState => ({
                                ...prevState,
                                userTalents: value
                              }))
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Divider light>{<Typography variant='caption'>TREE</Typography>}</Divider>
                  <Box sx={{ minWidth: `${hideText ? '1px' : '520px'}` }}>
                    {collegeInfo.options.map(opt => {
                      if (
                        opt.type === 1 &&
                        (opt.beast === collegeInfo.beast || opt.beast === 'all' || opt.beast === 'any')
                      ) {
                        return (
                          <>
                            <Grid container>
                              <Grid key={`${opt.row}-col1_empty`} item xs={3} sm={3}></Grid>
                              <Grid key={`${opt.row}-col1`} item xs={6} sm={6} sx={{ padding: '0.5rem' }}>
                                <Paper
                                  elevation={24}
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
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.description}
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
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        badgeContent={
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.curTotalPoints
                                        }
                                        max={50001}
                                      >
                                        <Avatar
                                          alt={`${opt.row}_${opt.col}`}
                                          src={`/images/college/row${opt.row}_${opt.col}.png`}
                                          sx={{
                                            width: theme.spacing(7),
                                            height: theme.spacing(7)
                                          }}
                                        />
                                      </Badge>
                                      <Typography
                                        color={
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        variant='body2'
                                        sx={{
                                          marginTop: '-12px'
                                        }}
                                      >
                                        {
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter
                                        }{' '}
                                        /{' '}
                                        {
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                        }{' '}
                                      </Typography>

                                      {/* MAXED */}
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                        ?.counter ===
                                        collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                          ?.maxCounter && (
                                        <Typography
                                          color={
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.maxCounter
                                              ? 'error'
                                              : 'primary'
                                          }
                                          variant='body2'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          {collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                            ?.maxCounter
                                            ? '(MAXED)'
                                            : ''}
                                        </Typography>
                                      )}

                                      {/* NEXT LEVEL */}
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                        ?.counter !==
                                        collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
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
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
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
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
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
                                              collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
                                                ?.counter ===
                                              collegeInfo.options?.find(o => o.row === opt.row && o.col === opt.col)
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
                        (opt.beast === collegeInfo.beast || opt.beast === 'all' || opt.beast === 'any')
                      ) {
                        return (
                          <>
                            <Grid container>
                              {/* LEFT */}
                              <Grid key={`${opt.row}-col1`} item xs={6} lg={5} md={5} sm={6} sx={{ padding: '0.5rem' }}>
                                <Paper
                                  elevation={24}
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
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.description}
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
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        badgeContent={
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                            ?.curTotalPoints
                                        }
                                        max={50001}
                                      >
                                        <Avatar
                                          alt={`${opt.row}_${opt.col}`}
                                          src={`/images/college/row${opt.row}_1.png`}
                                          sx={{
                                            width: theme.spacing(7),
                                            height: theme.spacing(7)
                                          }}
                                        />
                                      </Badge>

                                      <Typography
                                        color={
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        variant='body2'
                                        sx={{
                                          marginTop: '-12px'
                                        }}
                                      >
                                        {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter} /{' '}
                                        {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter}{' '}
                                      </Typography>

                                      {/* MAXED */}
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                        collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                          ?.maxCounter && (
                                        <Typography
                                          color={
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                              ? 'error'
                                              : 'primary'
                                          }
                                          variant='body2'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
                                            ? '(MAXED)'
                                            : ''}
                                        </Typography>
                                      )}

                                      {/* NEXT LEVEL */}
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.counter !==
                                        collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                          ?.maxCounter && (
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
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.minCounter
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
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)?.maxCounter
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
                                              collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                                ?.counter ===
                                              collegeInfo.options?.find(o => o.row === opt.row && o.col === 1)
                                                ?.maxCounter
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
                                  elevation={24}
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
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.description}
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
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        badgeContent={
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                            ?.curTotalPoints
                                        }
                                        max={50001}
                                      >
                                        <Avatar
                                          alt={`${opt.row}_${opt.col}`}
                                          src={`/images/college/row${opt.row}_2.png`}
                                          sx={{
                                            width: theme.spacing(7),
                                            height: theme.spacing(7)
                                          }}
                                        />
                                      </Badge>

                                      <Typography
                                        color={
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                            ? 'error'
                                            : 'primary'
                                        }
                                        variant='body2'
                                        sx={{
                                          marginTop: '-12px'
                                        }}
                                      >
                                        {collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter} /{' '}
                                        {collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter}{' '}
                                      </Typography>

                                      {/* MAXED */}
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                        collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                          ?.maxCounter && (
                                        <Typography
                                          color={
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                              ? 'error'
                                              : 'primary'
                                          }
                                          variant='body2'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          {collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter ===
                                          collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
                                            ? '(MAXED)'
                                            : ''}
                                        </Typography>
                                      )}

                                      {/* NEXT LEVEL */}
                                      {collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.counter !==
                                        collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                          ?.maxCounter && (
                                        <Typography
                                          color='textPrimary'
                                          variant='caption'
                                          style={{ marginTop: '1px', marginBottom: '-5px' }}
                                        >
                                          NEXT LVL: +
                                          {
                                            collegeInfo.options
                                              ?.find(o => o.row === opt.row && o.col === 2)
                                              .levels?.find(
                                                l =>
                                                  l.level ===
                                                  collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
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
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.minCounter
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
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                              ?.counter ===
                                            collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)?.maxCounter
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
                                              collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                                ?.counter ===
                                              collegeInfo.options?.find(o => o.row === opt.row && o.col === 2)
                                                ?.maxCounter
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
                  {totalPoints > 0 && (
                    <Divider light>{<Typography variant='caption'>SELECTED TALENTS</Typography>}</Divider>
                  )}
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: '450px' }}>
                    {[...collegeInfo.options].map(opt => {
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
                                  src={`/images/college/row${opt.row}_${opt.col}.png`}
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
                <Typography variant='caption' style={{ marginTop: '3px', color: '#ffffffcf' }}>
                  Available
                </Typography>
                <Typography variant='body1' align='right' sx={{ color: '#ffffffcf' }}>
                  {`${
                    collegeInfo.userTalents > 0
                      ? (collegeInfo.userTalents - totalPoints).toLocaleString()
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
                  collegeInfo.userTalents > 0
                    ? collegeInfo.userTalents - totalPoints <= 0
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
                <Typography variant='caption' style={{ marginTop: '3px', color: '#ffffffcf' }}>
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
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='college' title='HIGH COLLEGE SIMULATOR' />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              {tabContentList[activeTab]}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default HighCollege
