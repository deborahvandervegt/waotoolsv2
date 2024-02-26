// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import { mysticBuilding, mysticBuildingReq, mysticCollege, mysticSlots, treeAzuriteNeeded } from 'src/data/college'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Paper,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import { AccountTree, ClearAll, Remove, Save } from '@mui/icons-material'
import { green, red } from '@mui/material/colors'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Icon } from '@iconify/react'

// ** Custom Component
const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[500],
  color: theme.palette.getContrastText(green[500]),
  '&:hover': {
    backgroundColor: green[700]
  }
}))

const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: red[500],
  color: theme.palette.getContrastText(red[500]),
  '&:hover': {
    backgroundColor: red[700]
  }
}))

// ** Custom Functions
function mysticCollegeCheck(data, userData = null) {
  const reqList = []
  if (data?.length > 0) {
    data.forEach(slot => {
      slot.ability.forEach(ability => {
        const mysticBuildingObj = mysticBuildingReq?.find(
          b => b.building === ability.building && b.lvl === ability.level
        )

        if (mysticBuildingObj) {
          const checkBuildingObj = mysticCollege?.find(mc => mc.level === mysticBuildingObj.mcReq)
          const checkBuildingReq = reqList.find(req => req?.level === checkBuildingObj.level)
          if (!checkBuildingReq && checkBuildingObj) {
            reqList.push({ level: checkBuildingObj.level, a: checkBuildingObj.rss.a, completed: false })
          }
        }
      })
    })

    const maxMcLevel = Math.max(...reqList.map(o => o.level))
    const reqListOutput = []
    for (let level = 2; level <= maxMcLevel; level++) {
      const azurite = mysticCollege.find(mc => mc.level === level)
      const completed = level <= userData ? true : false
      reqListOutput.push({ level: level, a: azurite.rss.a, completed: completed })
    }

    return reqListOutput
  } else {
    return []
  }
}

const defaultMysticConfig = {
  mcLevel: 0,
  reqList: [],
  troopTabSelected: 0,
  troopSelected: 'infantry',
  slotsInfo: [...mysticSlots],
  troopObj: mysticSlots.find(t => t.slot === 0)
}

const Mystic = props => {
  let counter = 0

  const [isLoading, setIsLoading] = useState(true)

  const [mysticConfig, setMysticConfig] = useState(defaultMysticConfig)
  const [activeTab, setActiveTab] = useState('infantry')
  const [snackOpen, setSnackOpen] = useState({ open: false, type: 'success', time: undefined })
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('mysticConfig'))
    }
    if (saved) {
      setMysticConfig(saved)
      setActiveTab(saved.troopSelected)
    }
    setIsLoading(false)
  }, [])

  const handleClearAll = e => {
    setMysticConfig({ ...defaultMysticConfig })
  }

  const handlePrerequisiteFill = (level, slot, abilityLevel, quantity, type) => {
    let newState
    let newAbilityArray
    let expArrayFiltered
    const slotObj = mysticConfig.slotsInfo?.find(s => s.slot === slot)
    const abilityArray = slotObj.ability
    newAbilityArray = slotObj.ability
    const abilityObj = abilityArray?.find(k => k.key === abilityLevel)
    const expArray = [...mysticBuilding]
    const reqArray = mysticBuilding?.find(mb => mb.building === abilityObj?.building)

    const dependencyArray = []

    let dependencyMsj = '',
      dependencyMet = false

    if (reqArray?.requirements?.length > 0) {
      reqArray.requirements.forEach(d => {
        const checkDependency = slotObj?.ability?.find(b => b.building === d?.building)
        if (d?.level > checkDependency?.level) {
          // Verify dependency
          const dependencyName = mysticBuilding?.find(mb => mb.building === d?.building && mb.level === 1)
          dependencyArray.push({
            description: dependencyName?.desc,
            minLevel: d?.level,
            counter: checkDependency?.level
          })

          if (d?.level === slotObj.maxLevel) return

          if (d?.level > 1) {
            expArrayFiltered = expArray?.filter(
              obj => obj.level > 0 && obj.level <= d?.level && obj.building === d.building
            )
          } else {
            expArrayFiltered = expArray?.filter(obj => obj.level === d?.level && obj.building === d.building)
          }

          const newAzurite = expArrayFiltered?.reduce(
            (accumulator, currentValue) => accumulator + currentValue.rss.a,
            0
          )
          const newAzuriteFiltered = abilityObj.a + (newAzurite > 0 ? newAzurite : 0)

          newAbilityArray = newAbilityArray.map(obj =>
            obj.key === checkDependency.key ? { ...checkDependency, level: d.level, a: newAzuriteFiltered } : obj
          )
        }
      })
    } else {
      dependencyMet = true
    }

    newState = mysticConfig.slotsInfo?.map(s => (s.slot === slot ? { ...s, ability: newAbilityArray } : s))

    if (dependencyArray?.length > 0) {
      dependencyMet = false
    } else {
      dependencyMet = true
    }

    if (!dependencyMet) {
      setMysticConfig({
        ...mysticConfig,
        slotsInfo: [...newState],
        troopObj: newState?.find(s => s.slot === slot),
        reqList: mysticCollegeCheck(newState, mysticConfig.mcLevel)
      })

      dependencyMsj = 'Prerequisites loaded.'
      setSnackOpen({ open: dependencyMsj, type: 'success', time: 3000 })

      return
    }
  }

  const handleLevelChange = (level, slot, abilityLevel, quantity, type) => {
    let newState
    let newAbilityArray
    let expArrayFiltered
    const currentLevel = level
    const slotObj = mysticConfig.slotsInfo?.find(s => s.slot === slot)
    const abilityArray = slotObj.ability
    const abilityObj = abilityArray?.find(k => k.key === abilityLevel)
    const expArray = [...mysticBuilding]
    const reqArray = mysticBuilding?.find(mb => mb.building === abilityObj?.building)

    const dependencyArray = []

    let dependencyMsj = '',
      dependencyMet = false

    if (reqArray?.requirements?.length > 0) {
      reqArray.requirements.forEach(d => {
        const checkDependency = slotObj?.ability?.find(b => b.building === d?.building)
        if (d?.level > checkDependency?.level) {
          const dependencyName = mysticBuilding?.find(mb => mb.building === d?.building && mb.level === 1)
          dependencyArray.push({
            description: dependencyName?.desc,
            minLevel: d?.level,
            counter: checkDependency?.level
          })
        }
      })
      if (dependencyArray?.length > 0) {
        dependencyMet = false
        dependencyMsj = dependencyArray
          ?.map(d => {
            return `Needs ${d?.description} to reach lv${d?.minLevel}. (${d?.counter}/${d?.minLevel})`
          })
          .join('\r. ')
      } else {
        dependencyMet = true
      }
    } else {
      dependencyMet = true
    }

    if (!dependencyMet) {
      const message = dependencyMsj
      dependencyMsj = ''

      setSnackOpen({ open: message, type: 'warning', time: 7000 })

      return
    }

    if (type === 'sum') {
      if (currentLevel === slotObj.maxLevel) return

      const newLevel = currentLevel + quantity >= slotObj.maxLevel ? slotObj.maxLevel : currentLevel + quantity

      expArrayFiltered = expArray?.filter(obj => obj.level === newLevel && obj.building === abilityObj.building)

      const newAzurite = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.a, 0)
      const newAzuriteFiltered = abilityObj.a + (newAzurite > 0 ? newAzurite : 0)

      newAbilityArray = abilityArray.map(obj =>
        obj.key === abilityLevel ? { ...abilityObj, level: newLevel, a: newAzuriteFiltered } : obj
      )

      newState = mysticConfig.slotsInfo?.map(s => (s.slot === slot ? { ...s, ability: newAbilityArray } : s))
    } else if (type === 'minus') {
      if (currentLevel === slotObj.minLevel) return

      const newLevel = currentLevel - quantity <= slotObj.minLevel ? slotObj.minLevel : currentLevel - quantity
      expArrayFiltered = expArray?.filter(obj => obj.level === currentLevel && obj.building === abilityObj.building)

      const newAzurite = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.a, 0)

      const newAzuriteFiltered = abilityObj.a - (newAzurite > 0 ? newAzurite : 0)

      newAbilityArray = abilityArray.map(obj =>
        obj.key === abilityLevel ? { ...abilityObj, level: newLevel, a: newAzuriteFiltered } : obj
      )

      newState = mysticConfig.slotsInfo?.map(s => (s.slot === slot ? { ...s, ability: newAbilityArray } : s))
    }

    setMysticConfig({
      ...mysticConfig,
      slotsInfo: [...newState],
      troopObj: newState?.find(s => s.slot === slot),
      reqList: mysticCollegeCheck(newState, mysticConfig.mcLevel)
    })
  }

  const handleUserConfig = (value, type) => {
    let newMysticConfig
    if (type === 'mysticCollege') newMysticConfig = { ...mysticConfig, mcLevel: value }

    setMysticConfig(newMysticConfig)
  }

  const handleSaveData = e => {
    localStorage.setItem('mysticConfig', JSON.stringify(mysticConfig))
    setSnackOpen({ open: `Information Saved.`, type: 'success', time: 3000 })
  }

  const handleRemoveItems = e => {
    localStorage.removeItem('mysticConfig')
    setSnackOpen({ open: `Information Cleared.`, type: 'error' })
    setMysticConfig({ ...defaultMysticConfig })
  }

  const snackClose = (event, reason) => {
    setSnackOpen({ open: undefined, type: snackOpen.type, time: 3000 })
    if (reason === 'clickaway') {
      return
    }
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
    const newSlot = mysticSlots?.find(s => s.troop === newValue).slot
    setMysticConfig({
      ...mysticConfig,
      troopTabSelected: newSlot,
      troopSelected: newValue,
      troopObj: mysticConfig.slotsInfo?.find(s => s.slot === newSlot)
    })
  }

  return (
    <>
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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='mystic' title='MYSTIC COLLEGE SIMULATOR' />
            <Divider />
          </Card>
        </Grid>
      </Grid>
      <>
        <Card>
          <Grid container spacing={3} style={{ minWidth: '320px', padding: '1rem' }}>
            <Grid item xs={12} md={6} lg={8}>
              <Paper elevation={6} sx={{ padding: '1rem' }}>
                <Divider light>{<Typography variant='caption'>USER CONFIGURATION</Typography>}</Divider>
                <Box
                  key={'set-talents-limit'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: '0.5em'
                  }}
                >
                  <Typography
                    variant='body2'
                    color='primary'
                    align='right'
                    sx={{ marginRight: '5px', marginBottom: '6px' }}
                  >
                    Set Owned Mystic College Level:
                  </Typography>

                  <TextField
                    size='small'
                    align='center'
                    select
                    id='mystic-college-select'
                    defaultValue={mysticConfig?.mcLevel}
                    variant='outlined'
                    type='info'
                    helperText=''
                    onChange={e => {
                      handleUserConfig(e.target.value, 'mysticCollege')
                    }}
                  >
                    {mysticCollege?.map(option => (
                      <MenuItem key={option.level} value={option.level}>
                        {option.desc} Lv. {option.level}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Toolbar>
                  <Tooltip title={'Save current configuration.'}>
                    <GreenButton
                      edge='start'
                      color='primary'
                      variant='contained'
                      startIcon={<Save />}
                      onClick={handleSaveData}
                    >
                      SAVE
                    </GreenButton>
                  </Tooltip>
                  <Divider style={{ marginLeft: '5px' }} />

                  <Tooltip title={'Clear all the saved data.'}>
                    <RedButton
                      edge='start'
                      color='primary'
                      variant='contained'
                      startIcon={<Remove />}
                      onClick={handleRemoveItems}
                    >
                      DELETE
                    </RedButton>
                  </Tooltip>
                  <Divider style={{ marginLeft: '5px' }} />
                  <Tooltip title={'Clear all the information.'}>
                    <Button
                      edge='start'
                      color='primary'
                      variant='contained'
                      startIcon={<ClearAll />}
                      onClick={handleClearAll}
                    >
                      CLEAR
                    </Button>
                  </Tooltip>
                </Toolbar>
                <Divider>{<Typography variant='caption'>TROOPS</Typography>}</Divider>
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
                              value='infantry'
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...(!hideText && { '& svg': { mr: 2 } })
                                  }}
                                >
                                  <Icon fontSize={20} icon='game-icons:orc-head' />
                                  {!hideText && 'Infantry'}
                                </Box>
                              }
                            />
                            <Tab
                              value='cavalry'
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...(!hideText && { '& svg': { mr: 2 } })
                                  }}
                                >
                                  <Icon fontSize={20} icon='game-icons:horse-head' />
                                  {!hideText && 'Cavalry'}
                                </Box>
                              }
                            />
                            <Tab
                              value='archer'
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...(!hideText && { '& svg': { mr: 2 } })
                                  }}
                                >
                                  <Icon fontSize={20} icon='game-icons:pocket-bow' />
                                  {!hideText && 'Archer'}
                                </Box>
                              }
                            />
                            <Tab
                              value='mage'
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...(!hideText && { '& svg': { mr: 2 } })
                                  }}
                                >
                                  <Icon fontSize={20} icon='mdi:wizard-hat' />
                                  {!hideText && 'Mage'}
                                </Box>
                              }
                            />
                            <Tab
                              value='angel'
                              label={
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ...(!hideText && { '& svg': { mr: 2 } })
                                  }}
                                >
                                  <Icon fontSize={20} icon='game-icons:angel-outfit' />
                                  {!hideText && 'Angel'}
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
                              <Divider>{<Typography variant='caption'>SKILLS</Typography>}</Divider>
                              <>
                                {mysticConfig.slotsInfo?.find(s => s.slot === mysticConfig.troopTabSelected)?.troop
                                  ?.length > 0 && (
                                  <Grid key={mysticConfig.troopObj.slot} item xs={12}>
                                    <Paper
                                      sx={{
                                        padding: theme => `${theme.spacing(2)} !important`,
                                        display: 'flex',
                                        overflow: 'auto',
                                        flexDirection: 'column',
                                        minHeight: '145px',
                                        minWidth: '115px',
                                        height: '100%',
                                        justifyContent: 'center'
                                      }}
                                    >
                                      <>
                                        <Paper elevation={6} sx={{ minWidth: '350px' }}>
                                          {mysticConfig.troopObj?.troop?.length > 0 && (
                                            <>
                                              <Box
                                                sx={{
                                                  margin: theme => `${theme.spacing(1)} !important`,
                                                  marginTop: '8px',
                                                  display: 'flex',
                                                  justifyContent: 'space-around',
                                                  alignItems: 'center',
                                                  flexDirection: 'row',
                                                  minWidth: '320px'
                                                }}
                                              >
                                                {mysticConfig.troopObj?.ability?.map(ability => {
                                                  counter += 1
                                                  let nextAzurite

                                                  if (ability.level < 5) {
                                                    const expArray = [...mysticBuilding]

                                                    const expArrayFiltered = expArray?.filter(
                                                      obj =>
                                                        obj.level === ability.level + 1 &&
                                                        obj.building === ability.building
                                                    )
                                                    nextAzurite = expArrayFiltered?.reduce(
                                                      (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                                      0
                                                    )
                                                  } else {
                                                    nextAzurite = 0
                                                  }

                                                  return (
                                                    <>
                                                      <Box
                                                        key={ability.key}
                                                        style={{
                                                          display: 'flex',
                                                          flexDirection: 'column',
                                                          alignItems: 'center'
                                                        }}
                                                      >
                                                        <Avatar
                                                          alt={`${mysticConfig.troopObj.troop}_${ability.key}`}
                                                          src={`/images/mystic/${mysticConfig.troopObj.troop}_a${ability.key}.jpg`}
                                                        />
                                                        <Divider light style={{ marginTop: '10px' }} />

                                                        <Typography
                                                          variant='h5'
                                                          color='primary'
                                                          align='center'
                                                          sx={{ marginTop: '10px' }}
                                                        >
                                                          {ability.level}
                                                        </Typography>
                                                        <Divider light />

                                                        <ButtonGroup
                                                          color='primary'
                                                          orientation='vertical'
                                                          size='small'
                                                          sx={{ marginTop: '8px' }}
                                                        >
                                                          <Tooltip title={'Add prerequisites for this skill.'}>
                                                            <IconButton
                                                              variant='contained'
                                                              aria-label='add-dependencies'
                                                              size='small'
                                                              color='primary'
                                                              disabled={ability.level >= 3 ? true : false}
                                                              onClick={e => {
                                                                handlePrerequisiteFill(
                                                                  ability.level,
                                                                  mysticConfig.troopObj.slot,
                                                                  ability.key,
                                                                  1,
                                                                  'sum'
                                                                )
                                                              }}
                                                            >
                                                              {<AccountTree fontSize='inherit' />}
                                                            </IconButton>
                                                          </Tooltip>
                                                          <Button
                                                            variant='contained'
                                                            aria-label='increase5'
                                                            size='small'
                                                            disabled={
                                                              ability.level === mysticConfig.troopObj.maxLevel
                                                                ? true
                                                                : false
                                                            }
                                                            onClick={e => {
                                                              handleLevelChange(
                                                                ability.level,
                                                                mysticConfig.troopObj.slot,
                                                                ability.key,
                                                                1,
                                                                'sum'
                                                              )
                                                            }}
                                                          >
                                                            + 1
                                                          </Button>
                                                          <RedButton
                                                            disableElevation
                                                            variant='contained'
                                                            aria-label='reduce'
                                                            size='small'
                                                            disabled={
                                                              ability.level === mysticConfig.troopObj.minLevel
                                                                ? true
                                                                : false
                                                            }
                                                            onClick={e => {
                                                              handleLevelChange(
                                                                ability.level,
                                                                mysticConfig.troopObj.slot,
                                                                ability.key,
                                                                1,
                                                                'minus'
                                                              )
                                                            }}
                                                          >
                                                            - 1
                                                          </RedButton>
                                                        </ButtonGroup>
                                                        <Divider light sx={{ marginTop: '10px' }} />
                                                        <Typography
                                                          variant='caption'
                                                          color={nextAzurite > 0 ? 'primary' : 'error'}
                                                          align='center'
                                                          sx={{
                                                            marginTop: '10px'
                                                          }}
                                                        >
                                                          {nextAzurite > 0 ? `Next Lvl:` : 'MAXED'}
                                                        </Typography>

                                                        <Typography variant='body2' color='textPrimary' align='center'>
                                                          {nextAzurite > 0 ? `+${nextAzurite.toLocaleString()}` : '-'}
                                                        </Typography>
                                                        <Divider light sx={{ marginTop: '10px' }} />
                                                        <Typography
                                                          variant='caption'
                                                          color='primary'
                                                          align='center'
                                                          sx={{ marginTop: '10px' }}
                                                        >
                                                          Total AZU:
                                                        </Typography>
                                                        <Typography variant='body1' color='textPrimary' align='center'>
                                                          {ability.a.toLocaleString()}
                                                        </Typography>
                                                      </Box>
                                                      {counter < 6 && mysticConfig.troopObj.troop !== 'angel' && (
                                                        <Divider
                                                          orientation='vertical'
                                                          flexItem
                                                          light
                                                          stysxle={{ marginLeft: '5px', marginRight: '5px' }}
                                                        />
                                                      )}
                                                      {counter < 2 && mysticConfig.troopObj.troop === 'angel' && (
                                                        <Divider
                                                          orientation='vertical'
                                                          flexItem
                                                          light
                                                          sx={{ marginLeft: '5px', marginRight: '5px' }}
                                                        />
                                                      )}
                                                    </>
                                                  )
                                                })}
                                              </Box>
                                            </>
                                          )}
                                        </Paper>
                                      </>
                                    </Paper>
                                    <Paper variant='outlined' sx={{ padding: '0.5em', marginTop: '10px' }}>
                                      <TableContainer>
                                        <Table aria-labelledby='tableTitle' size={'small'} aria-label='enhanced table'>
                                          <TableBody>
                                            {/* HEADER */}
                                            <TableRow>
                                              <TableCell align='center'>{`Azurite Used on ${mysticConfig.troopObj.troop.toUpperCase()} branch`}</TableCell>
                                              <TableCell align='center'>{`Azurite Needed to Max ${mysticConfig.troopObj.troop.toUpperCase()} branch`}</TableCell>
                                            </TableRow>

                                            {/* DETAILS */}
                                            <TableRow>
                                              <TableCell align='center'>
                                                {
                                                  <Typography
                                                    variant='body2'
                                                    color='textPrimary'
                                                    style={{
                                                      color: `${
                                                        mysticConfig.troopObj?.ability.reduce(
                                                          (accumulator, currentValue) => accumulator + currentValue.a,
                                                          0
                                                        ) === treeAzuriteNeeded[mysticConfig.troopObj.troop]
                                                          ? '#50a308'
                                                          : ''
                                                      }`
                                                    }}
                                                  >
                                                    {mysticConfig.troopObj?.ability
                                                      .reduce(
                                                        (accumulator, currentValue) => accumulator + currentValue.a,
                                                        0
                                                      )
                                                      ?.toLocaleString()}
                                                    {mysticConfig.troopObj?.ability.reduce(
                                                      (accumulator, currentValue) => accumulator + currentValue.a,
                                                      0
                                                    ) === treeAzuriteNeeded[mysticConfig.troopObj.troop]
                                                      ? ' - COMPLETED'
                                                      : ''}
                                                  </Typography>
                                                }
                                              </TableCell>
                                              <TableCell align='center'>
                                                {
                                                  <Typography
                                                    variant='body1'
                                                    color='textPrimary'
                                                    style={{
                                                      color: `${
                                                        mysticConfig.troopObj?.ability.reduce(
                                                          (accumulator, currentValue) => accumulator + currentValue.a,
                                                          0
                                                        ) < treeAzuriteNeeded[mysticConfig.troopObj.troop]
                                                          ? '#ed2727'
                                                          : ''
                                                      }`
                                                    }}
                                                  >
                                                    {(
                                                      mysticConfig.troopObj?.ability.reduce(
                                                        (accumulator, currentValue) => accumulator + currentValue.a,
                                                        0
                                                      ) - treeAzuriteNeeded[mysticConfig.troopObj.troop]
                                                    )?.toLocaleString()}
                                                  </Typography>
                                                }
                                              </TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Paper>
                                    <Paper
                                      key={'second-header-totals-paper'}
                                      variant='outlined'
                                      sx={{
                                        padding: theme => `${theme.spacing(2)} !important`,
                                        display: 'flex',
                                        overflow: 'auto',
                                        flexDirection: 'column',
                                        minHeight: '145px',
                                        minWidth: '115px',
                                        height: '100%',
                                        justifyContent: 'center',
                                        marginTop: '10px'
                                      }}
                                    >
                                      {/* TABLE TOTALS */}
                                      <Box key={'totalDiv'}>
                                        <Box key={'totalDivSubHeader'}>
                                          <Box
                                            key={'thrid-header-totals-paper'}
                                            sx={{
                                              padding: theme => `${theme.spacing(2)} !important`,
                                              display: 'flex',
                                              overflow: 'auto',
                                              flexDirection: 'column',
                                              minHeight: '145px',
                                              minWidth: '125px',
                                              justifyContent: 'center'
                                            }}
                                          >
                                            <Typography align='center' variant='body1' color='primary'>
                                              BUILDINGS
                                            </Typography>
                                            <TableContainer>
                                              <Table
                                                aria-labelledby='tableTitleTotals'
                                                size={'small'}
                                                aria-label='enhanced table totals'
                                              >
                                                <TableBody>
                                                  {/* HEADER MC Buildings */}
                                                  <TableRow>
                                                    <TableCell align='center'>{''}</TableCell>

                                                    <TableCell align='center'>{''}</TableCell>
                                                    <TableCell align='center'>{''}</TableCell>
                                                  </TableRow>

                                                  {/* DETAIL MC Buildings */}
                                                  <TableRow>
                                                    <TableCell align='center'>{'Building'}</TableCell>
                                                    <TableCell align='center'>{'Azurite'}</TableCell>
                                                    <TableCell align='center'>{'Owned?'}</TableCell>
                                                  </TableRow>

                                                  <TableRow>
                                                    <TableCell align='center'>{'~'}</TableCell>
                                                    <TableCell align='center'>{'~'}</TableCell>
                                                    <TableCell align='center'>{'~'}</TableCell>
                                                  </TableRow>

                                                  {mysticConfig.reqList?.map(mcReq => {
                                                    const buildingObj = mysticCollege?.find(
                                                      mc => mc.level === mcReq.level
                                                    )

                                                    return (
                                                      <>
                                                        <TableRow>
                                                          <TableCell align='center'>
                                                            {
                                                              <Typography variant='body2'>
                                                                {buildingObj.desc} Lv.{buildingObj.level}
                                                              </Typography>
                                                            }
                                                          </TableCell>
                                                          <TableCell align='center'>
                                                            {
                                                              <Typography variant='body2'>
                                                                {buildingObj.rss.a.toLocaleString()}
                                                              </Typography>
                                                            }
                                                          </TableCell>
                                                          <TableCell align='center'>
                                                            {
                                                              <Typography variant='body2'>{`${
                                                                mcReq.completed ? 'Yes' : 'No'
                                                              }`}</Typography>
                                                            }
                                                          </TableCell>
                                                        </TableRow>
                                                      </>
                                                    )
                                                  })}

                                                  {/* HEADER Total */}
                                                  <TableRow>
                                                    <TableCell align='center'>
                                                      {
                                                        <Typography variant='body1' color='primary'>
                                                          Azurite for Required Buildings
                                                        </Typography>
                                                      }
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                      {
                                                        <Typography variant='body1' color='primary'>
                                                          Azurite for Selected Skills
                                                        </Typography>
                                                      }
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                      {
                                                        <Typography variant='body1' color='primary'>
                                                          Total Azurite
                                                        </Typography>
                                                      }
                                                    </TableCell>
                                                  </TableRow>

                                                  {/* DETAILS */}
                                                  <TableRow>
                                                    <TableCell align='center'>
                                                      {
                                                        <Typography variant='h6' color='textPrimary'>
                                                          {mysticConfig.reqList
                                                            ?.filter(req => req.completed === false)
                                                            .reduce(
                                                              (accumulator, currentValue) =>
                                                                accumulator + currentValue.a,
                                                              0
                                                            )
                                                            ?.toLocaleString()}
                                                        </Typography>
                                                      }
                                                    </TableCell>

                                                    <TableCell align='center'>
                                                      {
                                                        <Typography variant='h6' color='textPrimary'>
                                                          {mysticConfig.slotsInfo
                                                            ?.map(slot => {
                                                              return slot.ability.reduce(
                                                                (accumulator, currentValue) =>
                                                                  accumulator + currentValue.a,
                                                                0
                                                              )
                                                            })
                                                            .reduce(
                                                              (accumulator, currentValue) => accumulator + currentValue,
                                                              0
                                                            )
                                                            ?.toLocaleString()}
                                                        </Typography>
                                                      }
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                      {
                                                        <Typography variant='h5' color='textPrimary'>
                                                          {(
                                                            mysticConfig.reqList
                                                              ?.filter(req => req.completed === false)
                                                              .reduce(
                                                                (accumulator, currentValue) =>
                                                                  accumulator + currentValue.a,
                                                                0
                                                              ) +
                                                            mysticConfig.slotsInfo
                                                              ?.map(slot => {
                                                                return slot.ability.reduce(
                                                                  (accumulator, currentValue) =>
                                                                    accumulator + currentValue.a,
                                                                  0
                                                                )
                                                              })
                                                              .reduce(
                                                                (accumulator, currentValue) =>
                                                                  accumulator + currentValue,
                                                                0
                                                              )
                                                          ).toLocaleString()}
                                                        </Typography>
                                                      }
                                                    </TableCell>
                                                  </TableRow>
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                            <Divider light />
                                            <Grid
                                              item
                                              xs={12}
                                              sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginTop: '5px'
                                              }}
                                            >
                                              <Grid item xs={5}>
                                                <Paper style={{ marginLeft: '8px' }} square variant='outlined'>
                                                  <Typography
                                                    align='center'
                                                    style={{ marginLeft: '8px' }}
                                                    variant='body2'
                                                    color='primary'
                                                  >
                                                    Ability
                                                  </Typography>
                                                </Paper>
                                              </Grid>
                                              <Grid item xs={6}>
                                                <Paper style={{ marginLeft: '3px' }} square variant='outlined'>
                                                  <Typography
                                                    align='center'
                                                    style={{ marginLeft: '8px' }}
                                                    variant='body2'
                                                    color='primary'
                                                  >
                                                    Stat
                                                  </Typography>
                                                </Paper>
                                              </Grid>
                                              <Grid item xs={1}>
                                                <Paper style={{ marginLeft: '3px' }} square variant='outlined'>
                                                  <Typography
                                                    align='center'
                                                    style={{ marginLeft: '8px' }}
                                                    variant='body2'
                                                    color='primary'
                                                  >
                                                    Lv
                                                  </Typography>
                                                </Paper>
                                              </Grid>
                                            </Grid>
                                            {mysticConfig.slotsInfo?.map(s => {
                                              return s?.ability?.map(ability => {
                                                const troopObj = mysticBuilding?.find(
                                                  mb => mb.building === ability.building && mb.level === ability.level
                                                )
                                                if (troopObj) {
                                                  return (
                                                    <Grid
                                                      key={`${troopObj.building}-${troopObj.troopType}`}
                                                      item
                                                      xs={12}
                                                      style={{ display: 'flex', flexDirection: 'row' }}
                                                    >
                                                      <Grid item xs={5}>
                                                        <Paper
                                                          sx={{
                                                            marginLeft: '6px',
                                                            display: 'flex',
                                                            flexDirection: 'row'
                                                          }}
                                                          elevation={0}
                                                          square
                                                        >
                                                          <Typography
                                                            align='left'
                                                            sx={{
                                                              marginLeft: '6px',
                                                              color: `${
                                                                ability.level > 0 && ability.level >= s.maxLevel
                                                                  ? '#006e1e'
                                                                  : ''
                                                              }`
                                                            }}
                                                            variant='body2'
                                                          >
                                                            {troopObj
                                                              ? `(${troopObj?.troopType.slice(0, 3).toUpperCase()}) ${
                                                                  troopObj?.desc
                                                                }`
                                                              : ''}
                                                          </Typography>
                                                        </Paper>
                                                      </Grid>
                                                      <Grid item xs={6}>
                                                        <Paper sx={{ marginLeft: '6px' }} elevation={0} square>
                                                          <Typography
                                                            align='center'
                                                            sx={{
                                                              marginRight: '4px',
                                                              color: `${
                                                                ability.level > 0 && ability.level >= s.maxLevel
                                                                  ? '#006e1e'
                                                                  : 'textPrimary'
                                                              }`
                                                            }}
                                                            variant='caption'
                                                          >
                                                            {troopObj?.statDesc}
                                                          </Typography>
                                                        </Paper>
                                                      </Grid>
                                                      <Grid item xs={1}>
                                                        <Paper style={{ marginLeft: '8px' }} elevation={0} square>
                                                          <Typography
                                                            align='center'
                                                            sx={{
                                                              marginRight: '4px',
                                                              color: `${
                                                                ability.level > 0 && ability.level >= s.maxLevel
                                                                  ? '#006e1e'
                                                                  : 'textPrimary'
                                                              }`
                                                            }}
                                                            variant='body2'
                                                          >
                                                            {troopObj?.level}
                                                          </Typography>
                                                        </Paper>
                                                      </Grid>
                                                    </Grid>
                                                  )
                                                }
                                              })
                                            })}
                                            <Divider light />
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Paper>
                                  </Grid>
                                )}
                              </>
                            </TabPanel>
                          )}
                        </Grid>
                      </Grid>
                    </TabContext>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </>
    </>
  )
}

export default Mystic
