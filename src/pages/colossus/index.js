// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  MenuItem,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  createTheme,
  useMediaQuery
} from '@mui/material'
import {
  Check,
  ClearAll,
  DoneAll,
  Filter1Outlined,
  Filter2Outlined,
  Filter3Outlined,
  Filter4Outlined,
  Filter5Outlined,
  NewReleases,
  Remove,
  Save
} from '@mui/icons-material'
import { green, red } from '@mui/material/colors'
import { Box, styled } from '@mui/system'

import {
  colossusExp,
  colossusSlots,
  colossusAbilityStatsLevel as abilityStatsLevel,
  colossusLevelTemplates,
  colossusTroopsConf
} from 'src/data/colossus'

const theme = createTheme()

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

const RedButtonOutlined = styled(Button)(({ theme }) => ({
  backgroundColor: red[500],
  color: theme.palette.getContrastText(red[500]),
  '&:hover': {
    backgroundColor: red[700]
  }
}))

const Colossus = props => {
  let counter = 0
  const [slotsInfo, setSlotsInfo] = useState(colossusSlots)
  const [userConfig, setUserConfig] = useState({ crystalLimit: 0, relicLimit: 0 })
  const [snackOpen, setSnackOpen] = useState({ open: false, type: 'success', time: undefined })

  // ** Hooks
  useEffect(() => {
    let saved, savedUserConfig
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('slotsInfoColossus'))
      savedUserConfig = JSON.parse(localStorage.getItem('userConfig'))
    }
    if (saved) {
      setSlotsInfo(saved)
      setUserConfig(savedUserConfig)
    } else {
      setSlotsInfo(colossusSlots)
      setUserConfig({ crystalLimit: 0, relicLimit: 0 })
    }
  }, [])

  const handleUserConfig = (value, type) => {
    let newUserConfigObj

    if (type === 'relic') newUserConfigObj = { ...userConfig, relicLimit: value }
    if (type === 'crystal') newUserConfigObj = { ...userConfig, crystalLimit: value }

    setUserConfig(newUserConfigObj)
  }

  const handleTemplateChange = (e, slot) => {
    let newState
    let newAbilityArray
    let expArrayFiltered
    const template = e.target.value
    const slotObj = slotsInfo?.find(s => s.slot === slot)
    const expArray = [...colossusExp]
    const abilityArray = slotObj.ability
    newAbilityArray = slotObj.ability
    const levelTemplate = [...colossusLevelTemplates?.find(lt => lt.template === template).abilities]

    levelTemplate.forEach(ability => {
      const abilityObj = abilityArray.find(a => a.key === ability.key)

      if (ability.level > 1) {
        expArrayFiltered = expArray?.filter(obj => obj.level > 0 && obj.level <= ability.level)
      } else {
        expArrayFiltered = expArray?.filter(obj => obj.level === ability.level)
      }

      const newCrystals = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.c, 0)
      const newAncientR = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.ar, 0)

      newAbilityArray = newAbilityArray.map(obj =>
        obj.key === ability.key ? { ...abilityObj, level: ability.level, c: newCrystals, ar: newAncientR } : obj
      )
    })

    newState = slotsInfo?.map(s => (s.slot === slot ? { ...s, ability: newAbilityArray, template: template } : s))

    setSlotsInfo(newState)
  }

  const handleLevelChange = (level, slot, abilityLevel, quantity, type) => {
    let newState
    let newAbilityArray
    let expArrayFiltered
    const currentLevel = level
    const slotObj = slotsInfo?.find(s => s.slot === slot)
    const expArray = [...colossusExp]
    const abilityArray = slotObj.ability
    const abilityObj = abilityArray?.find(k => k.key === abilityLevel)

    if (type === 'sum') {
      if (currentLevel === slotObj.maxLevel) return

      const newLevel = currentLevel + quantity >= slotObj.maxLevel ? slotObj.maxLevel : currentLevel + quantity
      if (quantity > 1) {
        expArrayFiltered = expArray?.filter(obj => obj.level > currentLevel && obj.level <= newLevel)
      } else {
        expArrayFiltered = expArray?.filter(obj => obj.level === newLevel)
      }

      const newCrystals = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.c, 0)
      const newAncientR = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.ar, 0)

      const newCrystalsFiltered = abilityObj.c + (newCrystals > 0 ? newCrystals : 0)
      const newAncientRFiltered = abilityObj.ar + (newAncientR > 0 ? newAncientR : 0)

      newAbilityArray = abilityArray.map(obj =>
        obj.key === abilityLevel
          ? { ...abilityObj, level: newLevel, c: newCrystalsFiltered, ar: newAncientRFiltered }
          : obj
      )

      newState = slotsInfo?.map(s => (s.slot === slot ? { ...s, ability: newAbilityArray } : s))
      const checkLimit = newState?.find(s => s.slot === slot)

      const totalCrystals = checkLimit.ability.reduce((accumulator, currentValue) => accumulator + currentValue.c, 0)
      const totalRelics = checkLimit.ability.reduce((accumulator, currentValue) => accumulator + currentValue.ar, 0)

      if (totalCrystals > userConfig.crystalLimit && userConfig.crystalLimit > 0)
        return setSnackOpen({
          open: 'You already spent the available CRYSTALS set by you in your user configuration.',
          type: 'warning',
          time: 3000
        })
      if (totalRelics > userConfig.relicLimit && userConfig.relicLimit > 0)
        return setSnackOpen({
          open: 'You already spent the available RELICS set by you in your user configuration.',
          type: 'warning',
          time: 3000
        })
    } else if (type === 'minus') {
      if (currentLevel === slotObj.minLevel) return

      const newLevel = currentLevel - quantity <= slotObj.minLevel ? slotObj.minLevel : currentLevel - quantity
      if (quantity > 1) {
        expArrayFiltered = expArray?.filter(obj => obj.level > newLevel && obj.level <= currentLevel)
      } else {
        expArrayFiltered = expArray?.filter(obj => obj.level === currentLevel)
      }

      const newCrystals = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.c, 0)
      const newAncientR = expArrayFiltered?.reduce((accumulator, currentValue) => accumulator + currentValue.ar, 0)

      const newCrystalsFiltered = abilityObj.c - (newCrystals > 0 ? newCrystals : 0)
      const newAncientRFiltered = abilityObj.ar - (newAncientR > 0 ? newAncientR : 0)

      newAbilityArray = abilityArray.map(obj =>
        obj.key === abilityLevel
          ? { ...abilityObj, level: newLevel, c: newCrystalsFiltered, ar: newAncientRFiltered }
          : obj
      )

      newState = slotsInfo?.map(s => (s.slot === slot ? { ...s, ability: newAbilityArray } : s))
    }

    setSlotsInfo(newState)
  }

  const handleTroopChange = (e, slot) => {
    const avoidDuplicity = slotsInfo?.find(s => s.troop === e.target.value)

    if (avoidDuplicity) {
      return setSnackOpen({
        open: 'This colossus was already loaded, please choose another.',
        type: 'warning',
        time: 5000
      })
    }
    let newState = slotsInfo?.map(obj => (obj.slot === slot ? { ...obj, troop: e.target.value } : obj))
    setSlotsInfo(newState)
  }

  const handleSaveData = e => {
    localStorage.setItem('slotsInfoColossus', JSON.stringify(slotsInfo))
    localStorage.setItem('userConfig', JSON.stringify(userConfig))
    setSnackOpen({ open: `Information Saved.`, type: 'success' })
  }

  const handleRemoveItems = e => {
    setSlotsInfo([...colossusSlots])
    localStorage.removeItem('slotsInfoColossus')
    localStorage.removeItem('userConfig')
    setSnackOpen({ open: `Information Cleared.`, type: 'error' })
  }

  const snackClose = (event, reason) => {
    setSnackOpen({ open: undefined, type: snackOpen.type })
    if (reason === 'clickaway') {
      return
    }
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='colossus' title='COLOSSUS SIMULATOR' />
            <Divider />
          </Card>
        </Grid>
      </Grid>
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
        <Card>
          <Grid container spacing={3} style={{ padding: '1rem' }}>
            <Grid item xs={12} md={8} lg={8} sm={12}>
              <Paper
                elevation={6}
                sx={{
                  padding: theme.spacing(2),
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                  minHeight: '145px',
                  minWidth: '115px',
                  height: '100%',
                  justifyContent: 'center'
                }}
              >
                <Alert severity='info'>
                  You can select 2 colossus max. Use CLEAR INFO button if you want to start over.
                </Alert>

                <Box>
                  <Divider light sx={{ marginBottom: '5px', marginTop: '5px' }}>
                    {<Typography variant='caption'>USER CONFIGURATION</Typography>}
                  </Divider>
                </Box>
                <Toolbar
                  sx={{
                    flexGrow: 1,
                    justifyContent: 'center'
                  }}
                >
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
                  <Box />

                  <Tooltip title={'Clear all the inputs.'}>
                    <Button
                      edge='start'
                      color='primary'
                      variant='contained'
                      startIcon={<ClearAll />}
                      sx={{ marginLeft: '8px' }}
                      onClick={handleRemoveItems}
                    >
                      CLEAR INFO
                    </Button>
                  </Tooltip>
                </Toolbar>
                <Alert severity='warning'>Leave these limits empty if you don't want any restrictions.</Alert>

                <Divider sx={{ marginBottom: '5px', marginTop: '5px' }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: '8px'
                  }}
                >
                  <Typography variant='body2' color='primary' align='right'>
                    Set Max Crystals Limit:
                  </Typography>

                  <TextField
                    id='crystals-limit'
                    size='small'
                    variant='outlined'
                    type='number'
                    sx={{
                      margin: theme.spacing(1)
                    }}
                    value={userConfig.crystalLimit > 0 ? userConfig.crystalLimit : ''}
                    onChange={e => {
                      const value = +e.target.value >= 376800 ? 376800 : +e.target.value
                      handleUserConfig(value, 'crystal')
                    }}
                  />
                  <Tooltip title={'New option!'} arrow>
                    <NewReleases color='primary' />
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <Typography variant='body2' color='primary' align='right'>
                    Set Max Relics Limit:
                  </Typography>

                  <TextField
                    id='relics-limit'
                    size='small'
                    variant='outlined'
                    type='number'
                    value={userConfig.relicLimit > 0 ? userConfig.relicLimit : ''}
                    sx={{
                      margin: theme.spacing(1)
                    }}
                    onChange={e => {
                      const value = +e.target.value >= 15060 ? 15060 : +e.target.value
                      handleUserConfig(value, 'relic')
                    }}
                  />
                  <Tooltip title={'New option!'} arrow>
                    <NewReleases color='primary' />
                  </Tooltip>
                </Box>
                <Divider style={{ marginBottom: '5px', marginTop: '5px' }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <Typography variant='body2' color='primary' align='center'>
                    {'Total Crystals Selected:'}
                  </Typography>
                  <Typography variant='body1' color='textSecondary' align='center' style={{ marginLeft: '5px' }}>
                    {`${slotsInfo
                      ?.map(s => {
                        return { c: s.ability?.reduce((a, c) => a + c.c, 0) }
                      })
                      ?.reduce((a, c) => a + c.c, 0)
                      ?.toLocaleString()} ($${Math.round(
                      slotsInfo
                        ?.map(s => {
                          return { c: s.ability?.reduce((a, c) => a + c.c, 0) }
                        })
                        ?.reduce((a, c) => a + c.c, 0) / 42.666666667
                    )?.toLocaleString()})`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <Typography variant='body2' color='primary' align='center'>
                    {'Total Relics Selected:'}
                  </Typography>
                  <Typography variant='body1' color='textSecondary' align='center' style={{ marginLeft: '5px' }}>
                    {`${slotsInfo
                      ?.map(s => {
                        return { c: s.ability?.reduce((a, c) => a + c.ar, 0) }
                      })
                      ?.reduce((a, c) => a + c.c, 0)
                      ?.toLocaleString()}  ($${Math.round(
                      slotsInfo
                        ?.map(s => {
                          return { c: s.ability?.reduce((a, c) => a + c.ar, 0) }
                        })
                        ?.reduce((a, c) => a + c.c, 0) / 4.333333333
                    )?.toLocaleString()})`}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <Typography variant='body2' color='primary' align='center'>
                    {'Total Levels:'}
                  </Typography>
                  <Typography variant='body1' color='textSecondary' align='center' style={{ marginLeft: '5px' }}>
                    {'1: '}
                    {slotsInfo
                      ?.find(s => s.slot === 1)
                      ?.ability?.reduce((a, c) => a + c.level, 0)
                      ?.toLocaleString()}{' '}
                    |{' 2: '}
                    {slotsInfo
                      ?.find(s => s.slot === 2)
                      ?.ability?.reduce((a, c) => a + c.level, 0)
                      ?.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Paper
                elevation={6}
                sx={{
                  padding: theme.spacing(2),
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '145px',
                  minWidth: '115px',
                  height: '100%',
                  justifyContent: 'center'
                }}
              >
                {slotsInfo?.map(s => {
                  let totalLevels = s?.ability?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.level,
                    0
                  )
                  let totalRelics = s?.ability?.reduce((accumulator, currentValue) => accumulator + currentValue.ar, 0)
                  let totalCrystals = s?.ability?.reduce((accumulator, currentValue) => accumulator + currentValue.c, 0)
                  const troopType = s?.troop

                  return (
                    <Grid key={`slot-header-${s.slot}`} item xs={12} md={12} lg={8} sx={{ marginBottom: '10px' }}>
                      <Paper
                        variant='outlined'
                        sx={{
                          padding: theme.spacing(2),
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
                          <Box
                            sx={{
                              margin: theme.spacing(1),
                              marginTop: '8px',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              flexDirection: 'row'
                            }}
                          >
                            {s.slot === 1 ? (
                              <Filter1Outlined style={{ fontSize: '45px' }} />
                            ) : s.slot === 2 ? (
                              <Filter2Outlined style={{ fontSize: '45px' }} />
                            ) : s.slot === 3 ? (
                              <Filter3Outlined style={{ fontSize: '45px' }} />
                            ) : s.slot === 4 ? (
                              <Filter4Outlined style={{ fontSize: '45px' }} />
                            ) : s.slot === 5 ? (
                              <Filter5Outlined style={{ fontSize: '45px' }} />
                            ) : (
                              ''
                            )}

                            <Divider
                              orientation='vertical'
                              flexItem
                              light
                              sx={{ marginLeft: '5px', marginRight: '5px' }}
                            />

                            {troopType.length > 0 && (
                              <Avatar alt={`${s.troop}`} src={`/images/colossus/${s.troop}.jpg`} />
                            )}

                            {troopType.length > 0 && (
                              <Divider
                                orientation='vertical'
                                flexItem
                                light
                                sx={{ marginLeft: '5px', marginRight: '5px' }}
                              />
                            )}

                            <TextField
                              value={troopType.length > 0 ? troopType : ''}
                              align='center'
                              label='Select Colossus'
                              id='load-colossus-select'
                              size='small'
                              variant='outlined'
                              select
                              onChange={e => {
                                handleTroopChange(e, s.slot)
                              }}
                            >
                              {colossusTroopsConf?.map(option => (
                                <MenuItem key={option.troop} value={option.troop}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                          <Box
                            sx={{
                              margin: theme.spacing(1),
                              marginTop: '8px',
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              flexDirection: 'row'
                            }}
                          >
                            {troopType.length > 0 && (
                              <TextField
                                value={s.template}
                                align='center'
                                label='Select Preset'
                                id='colossus-template-select'
                                size='small'
                                variant='outlined'
                                select
                                sx={{
                                  minWidth: '155px',
                                  marginLeft: '5px'
                                }}
                                onChange={e => {
                                  handleTemplateChange(e, s.slot)
                                }}
                              >
                                {colossusLevelTemplates?.map(option => (
                                  <MenuItem key={option.template} value={option.template}>
                                    {`Colossus ${option.template}`}
                                  </MenuItem>
                                ))}
                              </TextField>
                            )}
                          </Box>

                          {troopType.length > 0 && (
                            <>
                              <Divider />

                              <Grid
                                key={`slot-sub-header-${s.slot}`}
                                item
                                sx={{
                                  margin: theme.spacing(1),
                                  marginTop: '8px',
                                  display: 'flex',
                                  justifyContent: 'space-around',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  minWidth: '320px'
                                }}
                              >
                                {s?.ability?.map(ability => {
                                  counter += 1

                                  const abilityDesc = colossusTroopsConf
                                    ?.find(tc => tc.troop === s.troop)
                                    ?.abilityStats?.find(as => as.abilityLevel === ability.key)

                                  return (
                                    <>
                                      <Box
                                        key={`${s.troop}_${ability.key}`}
                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                      >
                                        <Tooltip title={abilityDesc?.desc} arrow>
                                          <>
                                            <Avatar
                                              alt={`${s.troop}_${ability.key}`}
                                              src={`/images/colossus/${s.troop}_a${ability.key}.jpg`}
                                            />
                                          </>
                                        </Tooltip>
                                        <Divider orientation='horizontal' light style={{ marginTop: '10px' }} />

                                        <Typography
                                          variant='h5'
                                          color='primary'
                                          align='center'
                                          style={{ marginTop: '10px' }}
                                        >
                                          {ability.level}
                                        </Typography>
                                        <Divider light orientation='horizontal' />

                                        <ButtonGroup
                                          color='primary'
                                          orientation='vertical'
                                          size='small'
                                          sx={{ marginTop: '10px' }}
                                        >
                                          <Button
                                            variant='outlined'
                                            aria-label='increase'
                                            size='small'
                                            disabled={ability.level === s.maxLevel ? true : false}
                                            onClick={e => {
                                              handleLevelChange(ability.level, s.slot, ability.key, 5, 'sum')
                                            }}
                                          >
                                            + 5
                                          </Button>
                                          <Button
                                            variant='contained'
                                            aria-label='increase5'
                                            size='small'
                                            disabled={ability.level === s.maxLevel ? true : false}
                                            onClick={e => {
                                              handleLevelChange(ability.level, s.slot, ability.key, 1, 'sum')
                                            }}
                                          >
                                            + 1
                                          </Button>
                                          <RedButton
                                            disableElevation
                                            variant='contained'
                                            aria-label='reduce'
                                            size='small'
                                            disabled={ability.level === s.minLevel ? true : false}
                                            onClick={e => {
                                              handleLevelChange(ability.level, s.slot, ability.key, 1, 'minus')
                                            }}
                                          >
                                            - 1
                                          </RedButton>
                                          <RedButtonOutlined
                                            disableElevation
                                            variant='contained'
                                            aria-label='reduce5'
                                            size='small'
                                            disabled={ability.level === s.minLevel ? true : false}
                                            onClick={e => {
                                              handleLevelChange(ability.level, s.slot, ability.key, 5, 'minus')
                                            }}
                                          >
                                            - 5
                                          </RedButtonOutlined>
                                        </ButtonGroup>
                                        <Divider item orientation='horizontal' light sx={{ marginTop: '10px' }} />
                                        <Typography
                                          variant='caption'
                                          color='primary'
                                          align='center'
                                          style={{ marginTop: '10px' }}
                                        >
                                          Crystals:
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' align='center'>
                                          {ability.c.toLocaleString()}
                                        </Typography>
                                        <Typography
                                          variant='caption'
                                          color='primary'
                                          align='center'
                                          style={{ marginTop: '10px' }}
                                        >
                                          Relics:
                                        </Typography>
                                        <Typography variant='body2' color='textSecondary' align='center'>
                                          {ability.ar.toLocaleString()}
                                        </Typography>
                                      </Box>
                                      {counter < 6 && (
                                        <Divider
                                          orientation='vertical'
                                          flexItem
                                          light
                                          style={{ marginLeft: '5px', marginRight: '5px' }}
                                        />
                                      )}
                                    </>
                                  )
                                })}
                              </Grid>
                              {/* TABLE TOTALS */}
                              <Box>
                                <Box>
                                  <TableContainer>
                                    <Table
                                      aria-labelledby='colossus-details'
                                      size={'small'}
                                      aria-label='enhanced table colossus'
                                      sx={{
                                        minWidth: 320
                                      }}
                                    >
                                      <TableBody>
                                        {/* HEADER */}
                                        <TableRow>
                                          {/* <TableCell align='center'>{''}</TableCell> */}
                                          <TableCell align='center'>{'Total Crystals'}</TableCell>
                                          <TableCell align='center'>{'Total Relics'}</TableCell>
                                          <TableCell align='center'>{'Total Levels'}</TableCell>
                                        </TableRow>

                                        {/* DETAILS */}
                                        <TableRow>
                                          {/* <StyledTableCell align='center'>{<Typography color='primary'>test</Typography>}</StyledTableCell> */}

                                          <TableCell align='center'>
                                            {
                                              <Typography variant='h5' color='textSecondary'>
                                                {totalCrystals.toLocaleString()}
                                              </Typography>
                                            }
                                          </TableCell>

                                          <TableCell align='center'>
                                            {
                                              <Typography variant='h5' color='textSecondary'>
                                                {totalRelics.toLocaleString()}
                                              </Typography>
                                            }
                                          </TableCell>
                                          <TableCell align='center'>
                                            {
                                              <Typography variant='h5' color='textSecondary'>
                                                {totalLevels.toLocaleString()}
                                              </Typography>
                                            }
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </Box>

                              <Divider light />
                              <Grid container sx={{ display: 'flex', flexDirection: 'row', marginTop: '5px' }}>
                                <Grid item xs={6}>
                                  <Paper style={{ marginLeft: '8px' }} square variant='outlined'>
                                    <Typography
                                      align='center'
                                      style={{ marginLeft: '8px' }}
                                      variant='body2'
                                      color='primary'
                                    >
                                      Stats
                                    </Typography>
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper style={{ marginLeft: '8px' }} square variant='outlined'>
                                    <Typography
                                      align='center'
                                      style={{ marginLeft: '8px' }}
                                      variant='body2'
                                      color='primary'
                                    >
                                      Colossus Skill
                                    </Typography>
                                  </Paper>
                                </Grid>
                              </Grid>
                              {s?.ability?.map(ability => {
                                const troopObj = colossusTroopsConf.find(t => t.troop === s.troop)
                                const abilityStat = troopObj?.abilityStats?.find(as => as.abilityLevel === ability.key)
                                const colossusStat = troopObj?.levelStats?.find(ls => ls.abilityLevel === ability.key)

                                const abilityStatLevel =
                                  ability.key === 1 || ability.key === 2 || ability.key === 3
                                    ? abilityStatsLevel?.abilityStatsDetA?.find(al => al.level === ability.level)
                                    : abilityStatsLevel?.abilityStatsDetB?.find(al => al.level === ability.level)

                                return (
                                  <Grid key={s.ability?.key} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Grid item xs={4}>
                                      <Paper
                                        style={{ marginLeft: '8px', display: 'flex', flexDirection: 'row' }}
                                        elevation={0}
                                        square
                                      >
                                        {ability.level > 0 &&
                                          ability.level <= s.maxLevel &&
                                          ability.level !== s.maxLevel && <Check style={{ color: '#006e1e' }} />}
                                        {ability.level > 0 && ability.level >= s.maxLevel && (
                                          <DoneAll style={{ color: '#006e1e' }} />
                                        )}
                                        {ability.level === 0 && <Remove />}
                                        <Typography
                                          align='left'
                                          style={{
                                            marginLeft: '8px',
                                            color: `${
                                              ability.level > 0 && ability.level >= s.maxLevel ? '#006e1e' : ''
                                            }`
                                          }}
                                          variant='body2'
                                          color={ability?.level > 0 ? 'textSecondary' : 'textSecondary'}
                                        >
                                          {abilityStat?.desc}
                                        </Typography>
                                      </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Paper style={{ marginLeft: '8px' }} elevation={0} square>
                                        <Typography
                                          align='right'
                                          sx={{
                                            marginRight: '4px',
                                            color: `${
                                              ability.level > 0 && ability.level >= s.maxLevel
                                                ? '#006e1e'
                                                : 'textSecondary'
                                            }`
                                          }}
                                          variant='body2'
                                          color='primary'
                                        >
                                          {ability?.level > 0 ? `${abilityStatLevel?.stat}%` : ''}
                                        </Typography>
                                      </Paper>
                                    </Grid>
                                    <Divider light orientation='vertical' />
                                    <Grid item xs={4}>
                                      <Paper
                                        sx={{ marginLeft: '8px', display: 'flex', flexDirection: 'row' }}
                                        elevation={0}
                                        square
                                      >
                                        {colossusStat?.level <= totalLevels && <DoneAll style={{ color: '#006e1e' }} />}
                                        {colossusStat?.level > totalLevels && colossusStat?.level < 199 && <Remove />}
                                        <Typography
                                          align='left'
                                          style={{
                                            marginLeft: '8px',
                                            color: `${colossusStat?.level <= totalLevels ? '#006e1e' : ''}`
                                          }}
                                          variant='body2'
                                          color={colossusStat?.level <= totalLevels ? 'textSecondary' : 'textSecondary'}
                                        >
                                          {colossusStat?.level < 199
                                            ? `${colossusStat?.statDesc} (lv${colossusStat?.level})`
                                            : ''}
                                        </Typography>
                                      </Paper>
                                    </Grid>
                                    <Grid item xs={2}>
                                      <Paper style={{ marginLeft: '8px' }} elevation={0} square>
                                        <Typography
                                          align='right'
                                          style={{
                                            marginRight: '4px',
                                            color: `${colossusStat?.level <= totalLevels ? '#006e1e' : ''}`
                                          }}
                                          variant='body2'
                                          color={colossusStat?.level <= totalLevels ? 'textSecondary' : 'textSecondary'}
                                        >
                                          {colossusStat?.stat ? `${colossusStat?.stat}%` : ''}
                                        </Typography>
                                      </Paper>
                                    </Grid>
                                    <Divider light orientation='vertical' />
                                  </Grid>
                                )
                              })}

                              <Divider light />
                            </>
                          )}
                        </>
                      </Paper>
                    </Grid>
                  )
                })}
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </>
    </>
  )
}

export default Colossus
