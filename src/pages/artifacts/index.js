// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'

// ** Custom Imports
import {
  artifactsList,
  forceSlots,
  crownSlots,
  artifactsTemplates,
  artifactExperience,
  artifactsExperienceDetails
} from 'src/data/artifacts'
import { round } from 'src/utils/round'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ListSubheader,
  Paper,
  Snackbar,
  Tab,
  useMediaQuery
} from '@mui/material'
import { red } from '@mui/material/colors'
import { TabContext, TabPanel } from '@mui/lab'
import { ClearAll, ExpandMore } from '@mui/icons-material'
import ArtifactPreview from 'src/views/pages/artifacts/ArtifactPreview'
import ArtifactDetails from 'src/views/pages/artifacts/ArtifactDetails'
import ArtifactList from 'src/views/pages/artifacts/ArtifactList'

// ** Styled component
const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.skyPaletteTertiary,
  color: theme.palette.customColors.skyPaletteTitle,
  '&:hover': {
    backgroundColor: theme.palette.customColors.skyPaletteTertiary,
    filter: 'brightness(0.85)'
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

// ** Custom Functions
function generateStats(data) {
  if (data?.length > 0) {
    let generalStats = []
    data.forEach((s, i) => {
      if (Object.keys(s?.artifact).length > 0) {
        s.artifact.starsGeneral.forEach(sg => {
          const maxStat =
            sg?.star === 1 ? round(sg?.stat + s?.artifact?.mainStatInc * (+s?.artifact?.maxLevel - 1), 1) : sg?.stat
          const newStatObj = { stat: maxStat * 1, statDesc: sg?.statDesc }
          generalStats.push(newStatObj)
        })
      }
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

// ** Custom Vars
const tabConf = {
  forceArray: { icon: 'game-icons:winged-sword' },
  crownArray: { icon: 'game-icons:crenel-crown' },
  calculator: { icon: 'material-symbols:calculate-rounded' },
  artifactsList: { icon: 'pepicons-print:list' }
}

/* eslint-enable */
const Artifacts = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('forceArray')
  const [isLoading, setIsLoading] = useState(false)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [snackOpen, setSnackOpen] = useState({ open: false, type: '' })
  const [slotsInfo, setSlotsInfo] = useState({ force: forceSlots, crown: crownSlots })
  const [currenSlot, setCurrentSlot] = useState({ slot: slotsInfo.force[0], type: 'force' })
  const [openAddArtifact, setOpenAddArtifact] = useState({ open: false, slot: {} })
  const [selectedArtifact, setSelectedArtifact] = useState()

  const [calculator, setCalculator] = useState({
    quality: '',
    from: 0,
    to: 0,
    expNeeded: 0,
    fromStar: 0,
    toStar: 0,
    shardsNeeded: 0
  })

  const generalStats = { force: generateStats(slotsInfo.force), crown: generateStats(slotsInfo.crown) }

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('artifactsInfo'))
    }

    if (saved) setSlotsInfo(saved)
    setIsLoading(false)
  }, [])

  const handleChangeArtPrev = (type, data) => {
    let slotsArray, slotList
    const slotObj = data

    if (type === 'force') {
      slotList = [...slotsInfo.force]
      slotsArray = slotList.map(slot => (slot.key === slotObj.key ? slotObj : slot))
      setSlotsInfo({ ...slotsInfo, force: slotsArray })
      setCurrentSlot({ slot: slotObj, type: 'force' })
    } else {
      slotList = [...slotsInfo.crown]
      slotsArray = slotList.map(slot => (slot.key === slotObj.key ? slotObj : slot))
      setSlotsInfo({ ...slotsInfo, crown: slotsArray })
      setCurrentSlot({ slot: slotObj, type: 'crown' })
    }
  }

  const handleNextArtifactButton = slot => {
    let outputSlot
    const newSlotsInfo = [...slotsInfo[slot?.type]]?.filter(s => s?.artifact?.key?.length > 0)

    if (newSlotsInfo.length > 0) {
      if (slot.key === newSlotsInfo.length) {
        outputSlot = newSlotsInfo[0]
      } else {
        const nextNumber = slot.key + 1
        outputSlot = newSlotsInfo.find(s => s.key === nextNumber)
      }
    }

    setCurrentSlot({ slot: outputSlot, type: outputSlot.type })
  }

  const handlePrevArtifactButton = slot => {
    let outputSlot
    const newSlotsInfo = [...slotsInfo[slot?.type]]?.filter(s => s?.artifact?.key?.length > 0)

    if (newSlotsInfo.length > 0) {
      if (slot.key === 1) {
        outputSlot = newSlotsInfo[newSlotsInfo.length - 1]
      } else {
        const prevNumber = slot.key - 1
        outputSlot = newSlotsInfo.find(s => s.key === prevNumber)
      }
    }

    setCurrentSlot({ slot: outputSlot, type: outputSlot.type })
  }

  const handleEditArtifact = slot => {
    setCurrentSlot({ slot: slot, type: slot.type })
  }

  const handleRemoveArtifact = slot => {
    let slotsArray, slotList
    const slotObj = slot
    slotObj.artifact = {}

    if (slotObj.type === 'force') {
      slotList = [...slotsInfo.force]
      slotsArray = slotList.map(slot => (slot.key === slotObj.key ? slotObj : slot))
      setSlotsInfo({ ...slotsInfo, force: slotsArray })
    } else {
      slotList = [...slotsInfo.crown]
      slotsArray = slotList.map(slot => (slot.key === slotObj.key ? slotObj : slot))
      setSlotsInfo({ ...slotsInfo, crown: slotsArray })
    }
  }

  const handleLoadTemplateChange = e => {
    let randomObj
    const newTemplate = e.target.value
    const templateObj = artifactsTemplates?.find(at => at.key === newTemplate)

    if (templateObj?.config?.length > 0 && newTemplate !== 'custom') {
      if (activeTab === 'forceArray') {
        const newState = slotsInfo?.force?.map(obj => {
          const newKey = templateObj?.config[obj.key - 1]?.key
          const artifactObj = artifactsList?.find(a => a.key === newKey)

          const newArtifactObj = {
            ...obj,
            artifact: artifactObj,
            artifactDetails: {
              star: artifactObj?.starsGeneral?.length,
              rank: 0,
              expLevel: artifactObj?.maxLevel,
              levelMin: artifactObj?.maxLevel,
              levelMax: artifactObj?.maxLevel
            }
          }

          if (Object.keys(artifactObj).length > 0) randomObj = newArtifactObj

          return newArtifactObj
        })
        setSlotsInfo({ ...slotsInfo, force: newState, template: newTemplate })
        setCurrentSlot({ slot: randomObj, type: 'force' })
      } else {
        setSlotsInfo({ ...slotsInfo, crown: newState })
      }
    }
  }

  const handleClearAllArtifacts = e => {
    setSlotsInfo({ force: forceSlots, crown: [] })
  }

  const handleAddArtifactDialogClose = (e, slot) => {
    setOpenAddArtifact({ open: false, slot: {} })
    setSnackOpen({ open: false, type: 'warning', errorMessage: undefined })
  }

  const handleArtifactChangeDialog = (e, type) => {
    const newArtifact = e.target.value
    let alreadyPicked
    if (type === 'force') {
      alreadyPicked = slotsInfo?.force?.find(s => s?.artifact?.key === newArtifact)
    } else {
      alreadyPicked = slotsInfo?.crown?.find(s => s?.artifact?.key === newArtifact)
    }

    if (alreadyPicked) {
      const message = `This artifact was already picked at SLOT #${alreadyPicked?.key}. `
      setSnackOpen({ open: message, type: 'warning', errorMessage: 'Please select another artifact.' })
    } else {
      setSelectedArtifact(newArtifact)
    }
  }

  const handleAddArtifactDialogOk = (slot, artifact) => {
    const newArtifact = artifact
    const newArtifactObj = artifactsList?.find(a => a.key === newArtifact)
    newArtifactObj.stars = []

    const newState = slotsInfo[slot.type].map(obj =>
      obj.key === slot.key
        ? {
            ...obj,
            artifact: newArtifactObj,
            artifactDetails: {
              star: newArtifactObj?.starsGeneral?.length,
              rank: 0,
              expLevel: newArtifactObj?.maxLevel,
              levelMin: newArtifactObj?.maxLevel,
              levelMax: newArtifactObj?.maxLevel
            }
          }
        : obj
    )

    if (slot.type === 'force') {
      setSlotsInfo({ ...slotsInfo, force: newState })
    } else {
      setSlotsInfo({ ...slotsInfo, crown: newState })
    }

    setSnackOpen({
      open: `${newArtifactObj.desc} added in slots #${slot.key}`,
      type: 'success',
      errorMessage: undefined
    })
    setOpenAddArtifact({ open: false, slot: {} })
    setSelectedArtifact('')
  }

  const handleAddArtifactOpenDialog = slot => {
    const slotObj = slotsInfo[slot.type]?.find(obj => obj.key === slot.key)
    setOpenAddArtifact({ open: true, slot: slotObj })
  }

  const handleSaveData = e => {
    localStorage.setItem('artifactsInfo', JSON.stringify(slotsInfo))
    setSnackOpen({ open: `Information Saved.`, type: 'success' })
  }

  const handleRemoveItems = e => {
    localStorage.removeItem('artifactsInfo')
    setSnackOpen({ open: `Information Cleared.`, type: 'error' })
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

  const handleQualityChange = e => {
    setCalculator({ ...calculator, quality: e.target.value })
  }

  const handleLevelCalcChangeArtFrom = e => {
    let newState
    const newLevelFrom = +e.target.value

    if (calculator?.to > 0 && newLevelFrom > 1) {
      const newArtifactList = [...artifactExperience[calculator?.quality]]

      const newExpNeeded = newArtifactList
        ?.filter(a => a.level > (newLevelFrom === 1 ? 0 : newLevelFrom) && a.level <= calculator.to)
        ?.reduce((accumulator, currentValue) => accumulator + currentValue.exp, 0)
      newState = { ...calculator, from: newLevelFrom, expNeeded: newExpNeeded }
    } else {
      newState = { ...calculator, from: newLevelFrom }
    }

    setCalculator(newState)
  }

  const handleLevelCalcChangeArtTo = e => {
    const newLevelTo = e.target.value
    const newArtifactList = [...artifactExperience[calculator?.quality]]

    const newExpNeeded = newArtifactList
      ?.filter(a => a.level > (calculator.from === 1 ? 0 : calculator.from) && a.level <= newLevelTo)
      ?.reduce((accumulator, currentValue) => accumulator + currentValue.exp, 0)

    const newState = { ...calculator, to: newLevelTo, expNeeded: newExpNeeded }
    setCalculator(newState)
  }

  const handleStarCalcArtFrom = (e, slot) => {
    let newState
    const newStarFrom = +e.target.value

    if (calculator.toStar > 0 && newStarFrom >= 1) {
      const newArtifactList = [...artifactsExperienceDetails[calculator?.quality]?.shards]

      const shardsNeeded = newArtifactList
        ?.filter(a => a.star > newStarFrom && a.star <= calculator.toStar)
        ?.reduce((accumulator, currentValue) => accumulator + currentValue.shards, 0)
      newState = { ...calculator, fromStar: newStarFrom, shardsNeeded: shardsNeeded }
    } else {
      newState = { ...calculator, fromStar: newStarFrom }
    }

    setCalculator(newState)
  }

  const handleStarCalcArtTo = (e, slot) => {
    const newStarTo = e.target.value
    const newArtifactList = [...artifactsExperienceDetails[calculator?.quality]?.shards]

    const shardsNeeded = newArtifactList
      ?.filter(a => a.star > calculator?.fromStar && a.star <= newStarTo)
      ?.reduce((accumulator, currentValue) => accumulator + currentValue.shards, 0)

    const newState = { ...calculator, toStar: newStarTo, shardsNeeded: shardsNeeded }

    setCalculator(newState)
  }

  const tabContentList = {
    forceArray: (
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
            <Box>
              <Grid key={'header-totem'} item xs={12}>
                <Box
                  sx={{
                    marginBottom: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='h5' color='primary' align='center'>
                    <Icon fontSize={30} icon={tabConf['forceArray'].icon} />
                  </Typography>
                  <Typography variant='h5' color='primary' align='center' sx={{ marginLeft: '5px' }}>
                    {' FORCE ARTIFACTS ARRAY'}
                  </Typography>
                </Box>

                <Divider sx={{ marginBottom: '5px' }}>PRESETS</Divider>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minWidth: '250px',
                    alignItems: 'center'
                  }}
                >
                  <TextField
                    value={slotsInfo?.template?.length > 0 ? slotsInfo?.template : ''}
                    align='center'
                    label='Load Preset'
                    id='load-preset-select'
                    size='small'
                    variant='outlined'
                    select
                    sx={{ minWidth: '155px', marginTop: '5px' }}
                    onChange={handleLoadTemplateChange}
                  >
                    {artifactsTemplates?.map(option => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.desc}
                      </MenuItem>
                    ))}
                  </TextField>
                  {slotsInfo?.force?.map(s => (s.artifact.key ? 1 : 0)).reduce((a, v) => a + v) > 0 && (
                    <RedButton
                      align='center'
                      variant='contained'
                      color='secondary'
                      size='small'
                      startIcon={<ClearAll />}
                      sx={{ marginTop: '5px', marginBottom: '15px' }}
                      onClick={handleClearAllArtifacts}
                    >
                      clear all
                    </RedButton>
                  )}
                </Box>

                <Divider sx={{ marginBottom: '5px' }}>ARRAY</Divider>

                <Grid
                  container
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='center'
                  spacing={6}
                  sx={{ padding: '1rem' }}
                >
                  {slotsInfo.force.map(slot => {
                    return (
                      <Grid key={slot.key} item xs={6} lg={2} md={2}>
                        <ArtifactPreview
                          slot={slot}
                          currentSlot={currenSlot.slot}
                          onEdit={handleEditArtifact}
                          onRemove={handleRemoveArtifact}
                          onAddArtifactOpen={handleAddArtifactOpenDialog}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
                <Divider sx={{ my: '10px' }} />
                <Box>
                  <Accordion
                    square
                    disabled={generalStats?.force?.length > 0 ? false : true}
                    TransitionProps={{ unmountOnExit: true }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore color='primary' />}
                      aria-controls='normal-content'
                      id='normal-header'
                    >
                      <Typography align='center' color='primary' size='medium' variant='body1'>
                        GENERAL STATS DETAILS
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {generalStats?.force?.length > 0 && (
                        <Paper>
                          <Grid container spacing={3}>
                            <Grid item xs={9}>
                              <Paper style={{ marginLeft: '8px' }} square>
                                <Typography
                                  align='center'
                                  style={{ marginLeft: '8px' }}
                                  variant='body2'
                                  color='primary'
                                >
                                  Ability Boost
                                </Typography>
                              </Paper>
                            </Grid>

                            <Grid item xs={3}>
                              <Paper style={{ marginLeft: '8px' }} elevation={0}>
                                <Typography align='center' variant='body2' color='primary'>
                                  Stat
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                          {generalStats.force.map(as => {
                            return (
                              <>
                                <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Grid item xs={9}>
                                    <Paper style={{ marginLeft: '8px', minWidth: '230px' }} square>
                                      <Typography sx={{ marginLeft: '8px' }} variant='caption' color='textPrimary'>
                                        {as?.statDesc}
                                      </Typography>
                                    </Paper>
                                  </Grid>

                                  <Grid item xs={3}>
                                    <Paper sx={{ marginLeft: '8px' }} elevation={0}>
                                      <Typography align='center' variant='body2' color='textPrimary'>
                                        {Math.round(as?.stat)?.toString().length > 3
                                          ? as?.stat?.toLocaleString()
                                          : round(as?.stat, 1)}
                                        {Math.round(as?.stat)?.toString().length > 3 ? '' : '%'}
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                </Grid>
                              </>
                            )
                          })}
                        </Paper>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Divider sx={{ my: '10px' }}>CONFIGURATION</Divider>

                <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

                <Divider sx={{ my: '10px' }}>PREVIEW</Divider>

                <Grid key={currenSlot?.slot?.key} container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ArtifactDetails
                    slot={currenSlot.slot}
                    onChangeArtPrev={handleChangeArtPrev}
                    onNext={handleNextArtifactButton}
                    onPrev={handlePrevArtifactButton}
                  />
                </Grid>
                <Box sx={{ my: '50px' }}></Box>
              </Grid>
            </Box>
          </Box>
        </Card>
      </>
    ),
    crownArray: (
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
            <Box>
              <Grid key={'header-totem'} item xs={12}>
                <Box
                  sx={{
                    marginBottom: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='h5' color='primary' align='center'>
                    <Icon fontSize={30} icon={tabConf['crownArray'].icon} />
                  </Typography>
                  <Typography variant='h5' color='primary' align='center' sx={{ marginLeft: '5px' }}>
                    {' CROWN ARTIFACTS ARRAY'}
                  </Typography>
                </Box>

                <Divider sx={{ marginBottom: '5px' }}>ARRAY</Divider>

                <Grid
                  container
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='center'
                  spacing={6}
                  sx={{ padding: '1rem' }}
                >
                  {slotsInfo.crown.map(slot => {
                    return (
                      <Grid key={slot.key} item xs={6} lg={2} md={2}>
                        <ArtifactPreview
                          slot={slot}
                          currentSlot={currenSlot.slot}
                          onEdit={handleEditArtifact}
                          onRemove={handleRemoveArtifact}
                          onAddArtifactOpen={handleAddArtifactOpenDialog}
                        />
                      </Grid>
                    )
                  })}
                </Grid>
                <Divider sx={{ my: '10px' }} />
                <Box>
                  <Accordion
                    square
                    disabled={generalStats?.force?.length > 0 ? false : true}
                    TransitionProps={{ unmountOnExit: true }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore color='primary' />}
                      aria-controls='normal-content'
                      id='normal-header'
                    >
                      <Typography align='center' color='primary' size='medium' variant='body1'>
                        GENERAL STATS DETAILS
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {generalStats?.crown?.length > 0 && (
                        <Paper>
                          <Grid container spacing={3}>
                            <Grid item xs={9}>
                              <Paper style={{ marginLeft: '8px' }} square>
                                <Typography
                                  align='center'
                                  style={{ marginLeft: '8px' }}
                                  variant='body2'
                                  color='primary'
                                >
                                  Ability Boost
                                </Typography>
                              </Paper>
                            </Grid>

                            <Grid item xs={3}>
                              <Paper style={{ marginLeft: '8px' }} elevation={0}>
                                <Typography align='center' variant='body2' color='primary'>
                                  Stat
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                          {generalStats.crown.map(as => {
                            return (
                              <>
                                <Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'row' }}>
                                  <Grid item xs={9}>
                                    <Paper style={{ marginLeft: '8px', minWidth: '230px' }} square>
                                      <Typography sx={{ marginLeft: '8px' }} variant='caption' color='textPrimary'>
                                        {as?.statDesc}
                                      </Typography>
                                    </Paper>
                                  </Grid>

                                  <Grid item xs={3}>
                                    <Paper sx={{ marginLeft: '8px' }} elevation={0}>
                                      <Typography align='center' variant='body2' color='textPrimary'>
                                        {Math.round(as?.stat)?.toString().length > 3
                                          ? as?.stat?.toLocaleString()
                                          : round(as?.stat, 1)}
                                        {Math.round(as?.stat)?.toString().length > 3 ? '' : '%'}
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                </Grid>
                              </>
                            )
                          })}
                        </Paper>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <Divider sx={{ my: '10px' }}>CONFIGURATION</Divider>

                <Box sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

                <Divider sx={{ my: '10px' }}>PREVIEW</Divider>

                <Grid key={currenSlot?.slot?.key} container sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ArtifactDetails
                    slot={currenSlot.slot}
                    onChangeArtPrev={handleChangeArtPrev}
                    onNext={handleNextArtifactButton}
                    onPrev={handlePrevArtifactButton}
                  />
                </Grid>
                <Box sx={{ my: '50px' }}></Box>
              </Grid>
            </Box>
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
                <Box
                  sx={{
                    marginBottom: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='h5' color='primary' align='center'>
                    <Icon fontSize={30} icon={tabConf['calculator'].icon} />
                  </Typography>
                  <Typography variant='h5' color='primary' align='center' sx={{ marginLeft: '5px' }}>
                    {' ARTIFACTS ITEMS CALCULATOR'}
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: '8px' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1rem', flexWrap: 'wrap' }}>
                  <Box sx={{ marginTop: '5px', marginBottom: '10px' }}>
                    <Typography variant='body1' color='primary'>
                      Artifact Quality:
                    </Typography>
                    <TextField
                      value={calculator?.quality}
                      align='center'
                      label='Quality'
                      id='artifact-quality-select'
                      size='small'
                      variant='outlined'
                      select
                      onChange={handleQualityChange}
                      sx={{ marginTop: '8px' }}
                    >
                      <MenuItem key='blue' value={'blue'}>
                        Blue
                      </MenuItem>
                      <MenuItem key='purple' value={'purple'}>
                        Purple
                      </MenuItem>

                      <MenuItem key='orange' value={'orange'}>
                        Orange
                      </MenuItem>
                    </TextField>
                  </Box>
                  <Divider />
                  <Box sx={{ marginTop: '5px', marginBottom: '10px' }}>
                    <Typography variant='body1' color='primary'>
                      Experience Calculator:
                    </Typography>
                    <Box sx={{ my: '8px' }}>
                      <TextField
                        label='From'
                        id='fromlevelart-select'
                        size='small'
                        variant='outlined'
                        type='number'
                        select
                        disabled={!calculator?.quality ? true : false}
                        inputProps={{
                          min: 1,
                          max: 50
                        }}
                        sx={{ marginRight: '5px', marginBottom: '5', maxWidth: '70px' }}
                        onChange={e => {
                          handleLevelCalcChangeArtFrom(e)
                        }}
                      >
                        {artifactExperience[calculator?.quality]?.map(option => (
                          <MenuItem key={option.level} value={option.level}>
                            {option.level}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        disabled={!calculator?.quality ? true : false}
                        label='To'
                        id='levelart-select'
                        size='small'
                        variant='outlined'
                        type='number'
                        select
                        inputProps={{
                          min: 1,
                          max: 50
                        }}
                        sx={{ marginRight: '5px', marginBottom: '5', maxWidth: '70px' }}
                        onChange={e => {
                          handleLevelCalcChangeArtTo(e)
                        }}
                      >
                        {Array.from(Array(artifactsExperienceDetails[calculator?.quality]?.maxLevel), (_, i) => i + 1)
                          .map(n => {
                            return { level: n }
                          })
                          .filter(n => n.level > calculator.from)
                          .map(option => (
                            <MenuItem key={option.level} value={option.level}>
                              {option.level}
                            </MenuItem>
                          ))}
                      </TextField>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: '8px'
                        }}
                      >
                        <Typography variant='h5' color='primary'>
                          =
                        </Typography>

                        <Typography
                          variant='h5'
                          align='center'
                          color='primary'
                          sx={{
                            border: '1px solid #0278AE',
                            borderRadius: '10px',
                            padding: '0.3rem',
                            marginLeft: '8px',
                            minWidth: '125px'
                          }}
                        >
                          {calculator.expNeeded?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                  <Box sx={{ marginTop: '5px', marginBottom: '10px' }}>
                    <Typography variant='body1' color='primary'>
                      Shards Calculator:
                    </Typography>
                    <Box sx={{ my: '8px' }}>
                      <TextField
                        label='From'
                        id='starfromart-select'
                        size='small'
                        variant='outlined'
                        select
                        disabled={!calculator?.quality ? true : false}
                        sx={{ marginRight: '5px', marginBottom: '5', maxWidth: '70px' }}
                        onChange={e => {
                          handleStarCalcArtFrom(e)
                        }}
                      >
                        {artifactsExperienceDetails[calculator?.quality]?.shards?.map(option => (
                          <MenuItem key={option.star} value={option.star}>
                            {`${option.star}⭐`}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        disabled={!calculator?.quality ? true : false}
                        label='To'
                        id='startoart-select'
                        size='small'
                        variant='outlined'
                        select
                        sx={{ marginRight: '5px', marginBottom: '5', maxWidth: '70px' }}
                        onChange={e => {
                          handleStarCalcArtTo(e)
                        }}
                      >
                        {Array.from(
                          Array(artifactsExperienceDetails[calculator?.quality]?.shards?.length),
                          (_, i) => i + 1
                        )
                          .map(n => {
                            return { star: n }
                          })
                          .filter(n => n.star > calculator.fromStar)
                          .map(option => (
                            <MenuItem key={option.star} value={option.star}>
                              {`${option.star}🌟`}
                            </MenuItem>
                          ))}
                      </TextField>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: '8px'
                        }}
                      >
                        <Typography variant='h5' color='primary'>
                          =
                        </Typography>

                        <Typography
                          variant='h5'
                          color='primary'
                          align='center'
                          sx={{
                            border: '1px solid #0278AE',
                            borderRadius: '10px',
                            padding: '0.3rem',
                            marginLeft: '8px',
                            minWidth: '125px'
                          }}
                        >
                          {calculator.shardsNeeded?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    ),
    artifactsList: <ArtifactList tabConf={tabConf} />
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='artifacts' title='Artifacts' />
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
                      value='forceArray'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['forceArray'].icon} />
                          {'Force'}
                        </Box>
                      }
                    />
                    <Tab
                      value='crownArray'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['crownArray'].icon} />
                          {'Crown'}
                        </Box>
                      }
                    />
                    <Tab
                      value='calculator'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['calculator'].icon} />
                          {'Calc'}
                        </Box>
                      }
                    />

                    <Tab
                      value='artifactsList'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['artifactsList'].icon} />
                          {'Artifacts'}
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

        <Dialog open={openAddArtifact?.open} onClose={handleAddArtifactDialogClose}>
          <DialogTitle>{`Add a ${openAddArtifact?.slot?.type?.toUpperCase()} Artifact into slot #${
            openAddArtifact?.slot?.key
          }`}</DialogTitle>
          <DialogContent>
            <Box sx={{ padding: '1rem' }}>
              <TextField
                align='left'
                select
                fullWidth
                error={snackOpen.open ? true : false}
                helperText={snackOpen?.errorMessage ? snackOpen?.errorMessage : ''}
                value={selectedArtifact}
                size='small'
                label={`Artifact:`}
                id={'slot-select-' + openAddArtifact?.slot?.key}
                variant='outlined'
                type='info'
                onChange={e => {
                  handleArtifactChangeDialog(e, openAddArtifact?.slot?.type)
                }}
              >
                <ListSubheader>Orange</ListSubheader>

                {artifactsList
                  ?.filter(a => a.quality === 'Orange' && a.type === openAddArtifact?.slot?.type)
                  ?.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.desc}
                    </MenuItem>
                  ))}
                <ListSubheader>Purple</ListSubheader>
                {artifactsList
                  ?.filter(a => a.quality === 'Purple' && a.type === openAddArtifact?.slot?.type)
                  ?.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.desc}
                    </MenuItem>
                  ))}
                <ListSubheader>Blue</ListSubheader>
                {artifactsList
                  ?.filter(a => a.quality === 'Blue' && a.type === openAddArtifact?.slot?.type)
                  ?.map(option => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.desc}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleAddArtifactDialogClose} color='primary'>
              Cancel
            </Button>
            {selectedArtifact && (
              <Button
                onClick={e => {
                  handleAddArtifactDialogOk(openAddArtifact?.slot, selectedArtifact)
                }}
                color='primary'
              >
                Ok
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

export default Artifacts
