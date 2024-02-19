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
  enhancementsData,
  infoData,
  qualityList,
  equipmentList,
  equipmentSlots,
  equipmentTemplates,
  enhancementTemplates,
  listItems
} from 'src/data/equipment'
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
  Paper,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import { red } from '@mui/material/colors'
import { TabContext, TabPanel } from '@mui/lab'
import { AddToPhotos, ClearAll, DoneAll, ExpandMore, Save, SortByAlpha } from '@mui/icons-material'
import EquipmentPreview from 'src/views/pages/equipment/EquipmentPreview'
import EnhancementPreview from 'src/views/pages/equipment/EnhancementPreview'
import EquipmentList from 'src/views/pages/equipment/EquipmentList'

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
function generateStats(data, dataEnhancement = []) {
  if (data?.length > 0) {
    let generalStats = []
    let generalData = []

    data.forEach(eq => {
      if (eq?.equipment?.level > 0) {
        if (eq.equipment.levels.length > 0) {
          eq.equipment.levels
            .find(q => q.quality === eq.quality)
            .stats.forEach(item => {
              const newStatObj = { stat: item.stat, statDesc: item.statDesc }
              generalStats.push(newStatObj)
            })
        }
      } else {
        return []
      }
    })
    if (dataEnhancement?.length > 0) {
      generalData = [...generalStats, ...dataEnhancement]
    } else {
      generalData = [...generalStats]
    }

    const generalStatsGrouped = [
      ...generalData
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

function generateStatsEnhancement(data) {
  if (data?.length > 0) {
    let generalStats = []

    data.forEach(eq => {
      if (eq?.enhancement) {
        if (eq.eLevel > 0) {
          const newStatObj = { stat: eq.eStat, statDesc: eq.enhancement?.key }
          generalStats.push(newStatObj)
        }
      } else {
        return []
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

function generateItemList(data, sortedBy) {
  if (data?.length > 0) {
    let itemList = []

    data.forEach(eq => {
      if (eq?.equipment?.level > 0) {
        if (eq.equipment.materials.length > 0) {
          eq.equipment.materials.forEach(item => {
            itemList.push(item)
          })
        }
      } else {
        return []
      }
    })

    const itemListGrouped = [
      ...itemList
        .reduce((r, o) => {
          const key = o.m
          const item = r.get(key) || Object.assign({}, o, { q: 0 })
          item.q += o.q * 1

          return r.set(key, item)
        }, new Map())
        .values()
    ]

    let sortedItemListGrouped = [...itemListGrouped]

    if (sortedBy !== 'Asc') {
      sortedItemListGrouped.sort((a, b) => (a.m > b.m ? 1 : -1))
    } else {
      const newList = itemListGrouped?.map(item => {
        const orden = listItems?.find(il => il.item === item.m)

        return { ...item, orden: orden.orden }
      })
      sortedItemListGrouped = newList.sort((a, b) => (a.orden > b.orden ? 1 : -1))
    }

    return sortedItemListGrouped
  } else {
    return []
  }
}

function getStats(obj, level, enhancementObj) {
  const slotObj = obj
  const eObj = enhancementObj

  if (slotObj && eObj) {
    let eStat = +eObj.baseStat

    if (level > 20) {
      let eStatTmp = 0

      // Lv20+
      for (let counter = 20; counter < level; counter++) {
        eStatTmp = eStatTmp + eObj?.lvl3?.stat
      }

      // Lv11-20
      eStatTmp = eStatTmp + eObj?.lvl2?.stat * 10

      // Lv1-10
      eStatTmp = eStatTmp + eObj?.lvl1?.stat * 9
      eStat = eStat + eStatTmp
    }
    if (level > 10 && level < 21) {
      let eStatTmp = 0

      // Lv11 - 20
      for (let counter = 10; counter < level; counter++) {
        eStatTmp = eStatTmp + eObj?.lvl2?.stat
      }

      // Lv1-10
      eStatTmp = eStatTmp + eObj?.lvl1?.stat * 9
      eStat = eStat + eStatTmp
    }

    if (level < 11) {
      let eStatTmp = 0

      // Lv1-10
      for (let counter = 1; counter < level; counter++) {
        eStatTmp = eStatTmp + eObj?.lvl1?.stat
      }
      eStat = eStat + eStatTmp
    }

    return round(eStat, 1)
  } else {
    return 0
  }
}

// ** Custom Vars
const tabConf = {
  equipment: { icon: 'game-icons:shoulder-armor' },
  enhancements: { icon: 'game-icons:upgrade' },
  list: { icon: 'fluent:list-24-regular' }
}

const qualityInfo = {
  none: { color: '', backgroundColor: '' },
  blue: { color: '#216de7e0', backgroundColor: '#216de729' },
  purple: { color: '#7028dde0', backgroundColor: '#7028dd2b' },
  orange: { color: '#cf893c', backgroundColor: '#cf893c2e' }
}

/* eslint-enable */
const Equipment = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('equipment')
  const [isLoading, setIsLoading] = useState(false)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [snackOpen, setSnackOpen] = useState({ open: false, type: '' })
  const [openEquipmentDialog, setOpenEquipmentDialog] = useState({ open: false, slot: {} })
  const [openClearDialog, setOpenClearDialog] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState({ equipment: '', quality: '', equipmentObj: '' })

  const [slotsInfo, setSlotsInfo] = useState({
    slots: equipmentSlots,
    template: 'custom',
    templateEnhancement: 'custom',
    ownedItems: []
  })

  const [sortedBy, setSortedBy] = useState('Game')

  const generalStatsEnhancement = generateStatsEnhancement(slotsInfo.slots)
  const generalStats = generateStats(slotsInfo.slots, generalStatsEnhancement)

  const generalItemList = generateItemList(slotsInfo.slots, sortedBy)

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('slotsInfoEquipment'))
    }

    if (saved) setSlotsInfo(saved)
    setIsLoading(false)
  }, [])

  const handleClearItemData = e => {
    setSlotsInfo({ ...slotsInfo, ownedItems: [] })
  }

  const sortBy = () => {
    if (sortedBy !== 'Asc') {
      setSortedBy('Asc')
    } else {
      setSortedBy('Game')
    }
  }

  const handleEnhancementChange = (e, slot) => {
    const newEnhancement = e
    const newEnhancementObj = enhancementsData?.find(e => e.key === newEnhancement)

    const newState = slotsInfo?.slots?.map(obj =>
      obj.key === slot.key ? { ...obj, enhancement: newEnhancementObj, eLevel: 0 } : obj
    )

    if (slot?.eLevel > 0) {
      handleEnhancementLevelChange(slot?.eLevel, slot, newEnhancementObj)
    } else {
      setSlotsInfo({ ...slotsInfo, slots: newState })
    }
  }

  const handleEnhancementLevelChange = (level, slot, enancementObj = null) => {
    const selectedSlot = slot
    const slotObj = slotsInfo?.slots?.find(s => s.key === selectedSlot.key)
    const eObj = enancementObj ?? slotObj.enhancement

    if (slotObj && eObj) {
      let eStat = +eObj.baseStat

      if (level > 20) {
        let eStatTmp = 0

        // Lv20+
        for (let counter = 20; counter < level; counter++) {
          eStatTmp = eStatTmp + eObj?.lvl3?.stat
        }

        // Lv11-20
        eStatTmp = eStatTmp + eObj?.lvl2?.stat * 10

        // Lv1-10
        eStatTmp = eStatTmp + eObj?.lvl1?.stat * 9
        eStat = eStat + eStatTmp
      }
      if (level > 10 && level < 21) {
        let eStatTmp = 0

        // Lv11 - 20
        for (let counter = 10; counter < level; counter++) {
          eStatTmp = eStatTmp + eObj?.lvl2?.stat
        }

        // Lv1-10
        eStatTmp = eStatTmp + eObj?.lvl1?.stat * 9
        eStat = eStat + eStatTmp
      }

      if (level < 11) {
        let eStatTmp = 0

        // Lv1-10
        for (let counter = 1; counter < level; counter++) {
          eStatTmp = eStatTmp + eObj?.lvl1?.stat
        }
        eStat = eStat + eStatTmp
      }

      const obsidianTemp = [...infoData.info]

      const obsidianQty = obsidianTemp
        .filter(o => o.level >= 1 && o.level <= level)
        ?.reduce((acc, cur) => acc + cur.quantity, 0)

      const newSlotsInfo = slotsInfo?.slots?.map(obj =>
        obj.key === selectedSlot.key
          ? { ...slotObj, enhancement: eObj, eLevel: level, eStat: round(eStat, 1), obsidian: obsidianQty }
          : obj
      )

      setSlotsInfo({ ...slotsInfo, slots: newSlotsInfo })
    }
  }

  const handleLoadEnhancementTemplateChange = e => {
    const newTemplate = e.target.value
    const templateObj = enhancementTemplates?.find(at => at.key === newTemplate)

    if (templateObj?.config?.length > 0 && newTemplate !== 'custom') {
      const newState = slotsInfo?.slots?.map(obj => {
        const slotType = obj.slotDesc
        const newKey = templateObj?.config?.find(c => c.key === slotType)
        const newEnhancementObj = enhancementsData?.find(e => e.key === newKey.value) || {}

        return { ...obj, enhancement: newEnhancementObj, eLevel: 1, eStat: newEnhancementObj.baseStat }
      })

      setSlotsInfo({ ...slotsInfo, slots: newState, templateEnhancement: newTemplate })
    }
  }

  const handleClearDataDialogClose = e => {
    setOpenClearDialog(false)
  }

  const handleEnhancementMaxLevelFill = () => {
    const newState = slotsInfo?.slots?.map(obj => {
      let eStat = 0
      let obsidianQty = 0

      const level = obj.quality === 'Purple' ? 20 : 30
      if (obj.enhancement) {
        eStat = getStats(obj, level, obj.enhancement)
        const obsidianTemp = [...infoData.info]
        obsidianQty = obsidianTemp
          .filter(o => o.level >= 1 && o.level <= level)
          ?.reduce((acc, cur) => acc + cur.quantity, 0)
      }

      return { ...obj, eLevel: level, eStat: round(eStat, 1), obsidian: obsidianQty }
    })
    setSlotsInfo({ ...slotsInfo, slots: newState })
  }

  const handleRemoveEquipment = slot => {
    const slotObj = slot

    const slotsArray = slotsInfo.slots.map(slot =>
      slot.key === slotObj.key ? { ...slotObj, equipment: {}, quality: '' } : slot
    )

    setSlotsInfo({ ...slotsInfo, slots: slotsArray })
  }

  const handleEquipmentDialogAdd = slot => {
    const slotObj = slotsInfo?.slots?.find(obj => obj.key === slot.key)
    setOpenEquipmentDialog({ open: true, slot: slotObj })
  }

  const handleEquipmentAddDialogClose = (e, slot) => {
    setOpenEquipmentDialog({ open: false, slot: {} })
    setSelectedEquipment({ equipment: '', quality: '', equipmentObj: '' })
  }

  const handleEquipmentDialogChange = e => {
    const newEquipment = e.target.value
    const selectedEquipmentObj = equipmentList?.find(e => e.desc === newEquipment)
    setSelectedEquipment({ equipment: newEquipment, quality: '', equipmentObj: selectedEquipmentObj })
  }

  const handleQualityChange = e => {
    setSelectedEquipment({ ...selectedEquipment, quality: e.target.value })
  }

  const handleEquipmentDialogAddOk = (slot, equipment) => {
    const newEquipment = equipment
    const newEquipmentObj = equipmentList?.find(e => e.desc === newEquipment?.equipment)

    const newState = slotsInfo?.slots?.map(obj =>
      obj.key === slot.key ? { ...obj, equipment: newEquipmentObj, quality: newEquipment.quality } : obj
    )

    setSlotsInfo({ ...slotsInfo, slots: newState })
    setOpenEquipmentDialog({ open: false, slot: {} })
    setSelectedEquipment({ equipment: '', quality: '', equipmentObj: '' })
  }

  const handleClearAllEquipments = e => {
    setSlotsInfo({ slots: equipmentSlots, template: 'custom', templateEnhancement: '', ownedItems: [] })
    localStorage.removeItem('slotsInfoEquipment')
    setOpenClearDialog(false)
  }

  const handleClearDialogOpen = e => {
    setOpenClearDialog(true)
  }

  const handleSaveData = e => {
    localStorage.setItem('slotsInfoEquipment', JSON.stringify(slotsInfo))
    setSnackOpen({ open: `Information Saved.`, type: 'success', time: 3000 })
  }

  const handleLoadTemplateChange = e => {
    const newTemplate = e.target.value
    const templateObj = equipmentTemplates?.find(at => at.key === newTemplate)

    if (templateObj?.config?.length > 0 && newTemplate !== 'custom') {
      const newState = slotsInfo?.slots?.map(obj => {
        const slotType = obj.slotDesc
        const newKey = templateObj?.config?.find(c => c.key === slotType)
        const equipmentObj = equipmentList?.find(e => e.desc === newKey.value) || {}

        return { ...obj, quality: 'Orange', equipment: equipmentObj }
      })

      setSlotsInfo({ ...slotsInfo, slots: newState, template: newTemplate })
    }
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

  const handleSnackAction = props => {
    setSnackOpen({ ...props, time: 3000 })
  }

  const tabContentList = {
    equipment: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Snackbar
              open={snackOpen.open ? true : false}
              autoHideDuration={snackOpen.time ?? 7000}
              onClose={snackClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert variant='filled' onClose={snackClose} severity={snackOpen.type ?? 'success'}>
                <AlertTitle>{snackOpen.type === 'success' ? 'Done!' : 'Info:'}</AlertTitle>
                {snackOpen.open}
              </Alert>
            </Snackbar>
            <Box>
              <Grid key={'header-equipments'} item xs={12}>
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
                    <Icon fontSize={30} icon={tabConf['equipment'].icon} />
                  </Typography>
                  <Typography variant='h5' color='primary' align='center' sx={{ marginLeft: '5px' }}>
                    {' EQUIPMENTS'}
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
                    id='load-preset-equipment-select'
                    size='small'
                    variant='outlined'
                    select
                    sx={{ minWidth: '155px', marginTop: '5px' }}
                    onChange={handleLoadTemplateChange}
                  >
                    {equipmentTemplates?.map(option => (
                      <MenuItem key={option.key} value={option.key}>
                        {option.desc} (Lv{option.level})
                      </MenuItem>
                    ))}
                  </TextField>
                  {slotsInfo?.slots?.map(s => (s?.equipment?.level ? 1 : 0)).reduce((a, v) => a + v) > 0 && (
                    <RedButton
                      align='center'
                      variant='contained'
                      color='secondary'
                      size='small'
                      startIcon={<ClearAll />}
                      sx={{ marginTop: '5px', marginBottom: '15px' }}
                      onClick={handleClearDialogOpen}
                    >
                      clear all
                    </RedButton>
                  )}
                </Box>

                {slotsInfo?.slots?.map(s => (s?.equipment?.level ? 1 : 0)).reduce((a, v) => a + v) > 0 && (
                  <>
                    <Divider sx={{ marginBottom: '5px' }}>CONFIGURATION</Divider>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: '8px'
                      }}
                    >
                      <Tooltip title={'Save Information'} arrow>
                        <GreenButton
                          color='primary'
                          variant='contained'
                          startIcon={<Save />}
                          onClick={handleSaveData}
                          sx={{ marginRight: '8px' }}
                        >
                          SAVE
                        </GreenButton>
                      </Tooltip>
                    </Box>
                  </>
                )}

                <Divider sx={{ marginBottom: '5px', marginTop: '8px' }}>EQUIPMENTS</Divider>

                <Grid
                  container
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='center'
                  spacing={6}
                  sx={{ padding: '1rem' }}
                >
                  {slotsInfo?.slots?.map(slot => {
                    return (
                      <Grid key={slot.key} item xs={6} lg={2} md={2}>
                        <EquipmentPreview
                          slot={slot}
                          onRemove={handleRemoveEquipment}
                          onAddEquipmentOpen={handleEquipmentDialogAdd}
                        />
                      </Grid>
                    )
                  })}
                </Grid>

                <Divider sx={{ marginBottom: '15px', marginTop: '15px' }}>DETAILS</Divider>

                {/* GENERAL STATS DETAILS */}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Accordion
                      square
                      disabled={generalStats?.length > 0 ? false : true}
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
                        {generalStats?.length > 0 && (
                          <Paper>
                            {
                              <Box>
                                <TableContainer>
                                  <Table aria-labelledby='tableTitle' size={'small'} aria-label='enhanced table'>
                                    <TableBody>
                                      {/* HEADER */}
                                      <TableRow>
                                        <TableCell align='left'>
                                          {
                                            <Typography color='primary' variant='h6'>
                                              Ability
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell align='right'>
                                          {
                                            <Typography color='primary' variant='h6'>
                                              Stat
                                            </Typography>
                                          }
                                        </TableCell>
                                      </TableRow>

                                      {/* DETAILS */}
                                      {generalStats.map(row => {
                                        return (
                                          <>
                                            <TableRow key={row.statDesc}>
                                              <TableCell align='left'>
                                                {
                                                  <Typography variant='body2' color='textPrimary'>
                                                    {row.statDesc}
                                                  </Typography>
                                                }
                                              </TableCell>
                                              <TableCell align='right'>
                                                {
                                                  <Typography variant='body2' color='textPrimary'>
                                                    {Math.ceil(row.stat) > 999
                                                      ? row.stat.toLocaleString()
                                                      : `${row.stat.toLocaleString()}%`}
                                                  </Typography>
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
                            }
                          </Paper>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>

                <Divider sx={{ marginBottom: '8px', marginTop: '15px' }}>ITEMS CALCULATOR</Divider>
                {/* ITEMS CALCULATOR */}
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    {generalItemList?.length > 0 && (
                      <>
                        <Box>
                          <TableContainer>
                            <Table aria-labelledby='tableTitle' size={'small'} aria-label='enhanced table'>
                              <TableBody>
                                {/* HEADER */}
                                <TableRow>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Item
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Quantity Needed
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Quantity Owned
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Total Items
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Weapon
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Belt
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Accessory
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Helmet
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Clothes
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='primary'>
                                        Boots
                                      </Typography>
                                    }
                                  </TableCell>
                                </TableRow>
                                {/* EQUIPMENT DETAILS */}
                                <TableRow>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {
                                          <Button color='primary' startIcon={<SortByAlpha />} onClick={sortBy}>
                                            Sort by {sortedBy} ORDER
                                          </Button>
                                        }
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {' '}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {' '}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {' '}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {slotsInfo?.slots?.find(s => s.slotDesc === 'Weapon')?.equipment?.desc}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {slotsInfo?.slots?.find(s => s.slotDesc === 'Belt')?.equipment?.desc}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {slotsInfo?.slots?.find(s => s.slotDesc === 'Accessory')?.equipment?.desc}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {slotsInfo?.slots?.find(s => s.slotDesc === 'Helmet')?.equipment?.desc}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {slotsInfo?.slots?.find(s => s.slotDesc === 'Clothes')?.equipment?.desc}
                                      </Typography>
                                    }
                                  </TableCell>
                                  <TableCell align='center'>
                                    {
                                      <Typography variant='body2' color='textPrimary'>
                                        {slotsInfo?.slots?.find(s => s.slotDesc === 'Boots')?.equipment?.desc}
                                      </Typography>
                                    }
                                  </TableCell>
                                </TableRow>
                                {/* DETAILS */}
                                {generalItemList?.map(row => {
                                  const weaponRow = slotsInfo?.slots
                                    ?.find(s => s.slotDesc === 'Weapon')
                                    ?.equipment?.materials?.find(m => m.m === row.m) || { m: row.m, q: 0 }

                                  const beltRow = slotsInfo?.slots
                                    ?.find(s => s.slotDesc === 'Belt')
                                    ?.equipment?.materials?.find(m => m.m === row.m) || { m: row.m, q: 0 }

                                  const accessoryRow = slotsInfo?.slots
                                    ?.find(s => s.slotDesc === 'Accessory')
                                    ?.equipment?.materials?.find(m => m.m === row.m) || { m: row.m, q: 0 }

                                  const helmetRow = slotsInfo?.slots
                                    ?.find(s => s.slotDesc === 'Helmet')
                                    ?.equipment?.materials?.find(m => m.m === row.m) || { m: row.m, q: 0 }

                                  const clothesRow = slotsInfo?.slots
                                    ?.find(s => s.slotDesc === 'Clothes')
                                    ?.equipment?.materials?.find(m => m.m === row.m) || { m: row.m, q: 0 }

                                  const bootsRow = slotsInfo?.slots
                                    ?.find(s => s.slotDesc === 'Boots')
                                    ?.equipment?.materials?.find(m => m.m === row.m) || { m: row.m, q: 0 }

                                  const ownedItemQ = +slotsInfo?.ownedItems?.find(i => i.m === row.m)?.q || +0

                                  return (
                                    <>
                                      <TableRow>
                                        <TableCell align='center'>
                                          {
                                            <Typography variant='body2' color='textPrimary'>
                                              {row.m}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell align='center'>
                                          {
                                            <Typography variant='body2' color='textPrimary'>
                                              {row.q}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell align='center'>
                                          {
                                            <TextField
                                              key={`${row.m}-${row.q}`}
                                              style={{ minWidth: '25px' }}
                                              variant='outlined'
                                              align='center'
                                              id={`${row.m}-${row.q}`}
                                              size='small'
                                              type='number'
                                              value={ownedItemQ}
                                              onChange={e => {
                                                let newOwnedItems
                                                newOwnedItems = [...slotsInfo?.ownedItems]
                                                const newOwnedObj = newOwnedItems?.find(i => i.m === row.m)

                                                if (!newOwnedObj?.q) newOwnedItems.push({ m: row.m, q: 0 })

                                                if (+e.target.value >= 99 || +e.target.value < 0) {
                                                  newOwnedItems = newOwnedItems.map(i => {
                                                    return i.m === row.m ? { ...i, q: 99 } : i
                                                  })
                                                  setSnackOpen({
                                                    open: `Please use an input less than 99 and more than 0.`,
                                                    type: 'warning',
                                                    time: 3000
                                                  })
                                                } else {
                                                  newOwnedItems = newOwnedItems.map(i => {
                                                    return i.m === row.m ? { ...i, q: +e.target.value } : i
                                                  })
                                                }
                                                setSlotsInfo({ ...slotsInfo, ownedItems: newOwnedItems })
                                              }}
                                            />
                                          }
                                        </TableCell>
                                        {row.q > ownedItemQ && (
                                          <TableCell align='center'>
                                            {
                                              <Typography style={{ color: '#ed2727' }}>
                                                -{(row.q - ownedItemQ)?.toLocaleString()}
                                              </Typography>
                                            }
                                          </TableCell>
                                        )}
                                        {row.q <= ownedItemQ && (
                                          <TableCell align='center'>
                                            {
                                              <Button style={{ color: '#50a308' }} startIcon={<DoneAll />}>
                                                {' '}
                                                +{(ownedItemQ - row.q).toLocaleString()}
                                              </Button>
                                            }
                                          </TableCell>
                                        )}

                                        <TableCell
                                          align='center'
                                          style={{
                                            backgroundColor: `${
                                              weaponRow?.q > 0 && ownedItemQ >= weaponRow.q ? '#50a308' : 'white'
                                            }`
                                          }}
                                        >
                                          {
                                            <Typography
                                              variant='body2'
                                              color='textPrimary'
                                              style={{
                                                color: `${
                                                  weaponRow?.q > 0 && ownedItemQ >= weaponRow.q ? 'white' : 'black'
                                                }`
                                              }}
                                            >
                                              {weaponRow?.q > 0 ? weaponRow.q : 0}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell
                                          align='center'
                                          style={{
                                            backgroundColor: `${
                                              beltRow?.q > 0 && ownedItemQ >= weaponRow?.q + beltRow?.q
                                                ? '#50a308'
                                                : 'white'
                                            }`
                                          }}
                                        >
                                          {
                                            <Typography
                                              variant='body2'
                                              color='textPrimary'
                                              style={{
                                                color: `${
                                                  beltRow?.q > 0 && ownedItemQ >= weaponRow?.q + beltRow.q
                                                    ? 'white'
                                                    : 'black'
                                                }`
                                              }}
                                            >
                                              {beltRow?.q > 0 ? beltRow.q : 0}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell
                                          align='center'
                                          style={{
                                            backgroundColor: `${
                                              accessoryRow?.q > 0 &&
                                              ownedItemQ >= weaponRow?.q + beltRow?.q + accessoryRow?.q
                                                ? '#50a308'
                                                : 'white'
                                            }`
                                          }}
                                        >
                                          {
                                            <Typography
                                              variant='body2'
                                              color='textPrimary'
                                              style={{
                                                color: `${
                                                  accessoryRow?.q > 0 &&
                                                  ownedItemQ >= weaponRow?.q + beltRow?.q + accessoryRow?.q
                                                    ? 'white'
                                                    : 'black'
                                                }`
                                              }}
                                            >
                                              {accessoryRow?.q > 0 ? accessoryRow.q : 0}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell
                                          align='center'
                                          style={{
                                            backgroundColor: `${
                                              helmetRow?.q > 0 &&
                                              ownedItemQ >= weaponRow?.q + beltRow?.q + accessoryRow?.q + helmetRow?.q
                                                ? '#50a308'
                                                : 'white'
                                            }`
                                          }}
                                        >
                                          {
                                            <Typography
                                              variant='body2'
                                              color='textPrimary'
                                              style={{
                                                color: `${
                                                  helmetRow?.q > 0 &&
                                                  ownedItemQ >=
                                                    weaponRow?.q + beltRow?.q + accessoryRow?.q + helmetRow?.q
                                                    ? 'white'
                                                    : 'black'
                                                }`
                                              }}
                                            >
                                              {helmetRow?.q > 0 ? helmetRow.q : 0}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell
                                          align='center'
                                          style={{
                                            backgroundColor: `${
                                              clothesRow?.q > 0 &&
                                              ownedItemQ >=
                                                weaponRow?.q +
                                                  beltRow?.q +
                                                  accessoryRow?.q +
                                                  helmetRow?.q +
                                                  clothesRow?.q
                                                ? '#50a308'
                                                : 'white'
                                            }`
                                          }}
                                        >
                                          {
                                            <Typography
                                              variant='body2'
                                              color='textPrimary'
                                              style={{
                                                color: `${
                                                  clothesRow?.q > 0 &&
                                                  ownedItemQ >=
                                                    weaponRow?.q +
                                                      beltRow?.q +
                                                      accessoryRow?.q +
                                                      helmetRow?.q +
                                                      clothesRow?.q
                                                    ? 'white'
                                                    : 'black'
                                                }`
                                              }}
                                            >
                                              {clothesRow?.q > 0 ? clothesRow.q : 0}
                                            </Typography>
                                          }
                                        </TableCell>
                                        <TableCell
                                          align='center'
                                          style={{
                                            backgroundColor: `${
                                              bootsRow?.q > 0 &&
                                              ownedItemQ >=
                                                weaponRow?.q +
                                                  beltRow?.q +
                                                  accessoryRow?.q +
                                                  helmetRow?.q +
                                                  clothesRow?.q +
                                                  bootsRow?.q
                                                ? '#50a308'
                                                : 'white'
                                            }`
                                          }}
                                        >
                                          {
                                            <Typography
                                              variant='body2'
                                              color='textPrimary'
                                              style={{
                                                color: `${
                                                  bootsRow?.q > 0 &&
                                                  ownedItemQ >=
                                                    weaponRow?.q +
                                                      beltRow?.q +
                                                      accessoryRow?.q +
                                                      helmetRow?.q +
                                                      clothesRow?.q +
                                                      bootsRow?.q
                                                    ? 'white'
                                                    : 'black'
                                                }`
                                              }}
                                            >
                                              {bootsRow?.q > 0 ? bootsRow.q : 0}
                                            </Typography>
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

                        <Divider sx={{ my: '15px' }} />
                        <Box
                          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                        >
                          <Tooltip title={'Save Information'} arrow>
                            <GreenButton
                              color='primary'
                              variant='contained'
                              startIcon={<Save />}
                              onClick={handleSaveData}
                            >
                              SAVE
                            </GreenButton>
                          </Tooltip>
                          <Tooltip title={'Clear all owned items. You need to save before leaving the page.'} arrow>
                            <RedButton
                              edge='start'
                              color='primary'
                              variant='contained'
                              startIcon={<ClearAll />}
                              onClick={handleClearItemData}
                              sx={{ marginLeft: '8px' }}
                            >
                              CLEAR
                            </RedButton>
                          </Tooltip>
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
                <Box sx={{ my: '50px' }}></Box>
              </Grid>
            </Box>
          </Box>
        </Card>
      </>
    ),
    enhancements: (
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
              <Grid key={'header-enhancements'} item xs={12}>
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
                    <Icon fontSize={30} icon={tabConf['enhancements'].icon} />
                  </Typography>
                  <Typography variant='h5' color='primary' align='center' sx={{ marginLeft: '5px' }}>
                    {' ENHANCEMENTS'}
                  </Typography>
                </Box>

                <Divider sx={{ marginBottom: '5px' }}>PRESETS</Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Box>
                    <TextField
                      value={slotsInfo.templateEnhancement}
                      align='center'
                      label='Load Preset'
                      id='load-preset-select'
                      size='small'
                      variant='outlined'
                      select
                      onChange={handleLoadEnhancementTemplateChange}
                    >
                      {enhancementTemplates?.map(option => (
                        <MenuItem key={option.key} value={option.key}>
                          {option.desc}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>
                <Divider sx={{ marginBottom: '8px', marginTop: '8px' }}>CONFIGURATION</Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  {
                    <Box>
                      <Tooltip title={'Save Information'} arrow>
                        <GreenButton
                          color='primary'
                          variant='contained'
                          startIcon={<Save />}
                          sx={{ marginRight: '5px' }}
                          onClick={handleSaveData}
                        >
                          SAVE
                        </GreenButton>
                      </Tooltip>
                      {slotsInfo?.slots?.map(s => (s?.equipment?.level > 0 ? 1 : 0)).reduce((a, v) => a + v) > 0 && (
                        <Tooltip title={'Clear all information saved.'} arrow>
                          <RedButton
                            align='center'
                            variant='contained'
                            color='secondary'
                            startIcon={<ClearAll />}
                            sx={{ marginRight: '5px' }}
                            onClick={handleClearDialogOpen}
                          >
                            clear all
                          </RedButton>
                        </Tooltip>
                      )}
                      {slotsInfo?.templateEnhancement?.length > 0 && (
                        <Tooltip title={'Max All Enhancements Levels.'} arrow>
                          <Button
                            align='center'
                            variant='contained'
                            color='primary'
                            startIcon={<AddToPhotos />}
                            onClick={handleEnhancementMaxLevelFill}
                          >
                            Max All
                          </Button>
                        </Tooltip>
                      )}
                    </Box>
                  }
                </Box>

                <Divider sx={{ marginBottom: '8px', marginTop: '8px' }}>ENHANCEMENTS</Divider>

                <Grid
                  container
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='center'
                  spacing={6}
                  sx={{ padding: '1rem' }}
                >
                  {slotsInfo?.slots?.map(slot => {
                    return (
                      <Grid key={slot.key} item xs={12} lg={6} md={6}>
                        <EnhancementPreview
                          slot={slot}
                          onEnhancementChange={handleEnhancementChange}
                          onEnhancementLevelChange={handleEnhancementLevelChange}
                          onSnackAction={handleSnackAction}
                        />
                      </Grid>
                    )
                  })}
                </Grid>

                <Box sx={{ my: '50px' }}></Box>
              </Grid>
            </Box>
          </Box>
        </Card>
      </>
    ),
    list: <EquipmentList tabConf={tabConf} />
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='equipment' title='Equipment and Enhancements' />
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
                      value='equipment'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['equipment'].icon} />
                          {'Equipment'}
                        </Box>
                      }
                    />
                    <Tab
                      value='enhancements'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['enhancements'].icon} />
                          {'Enhancements'}
                        </Box>
                      }
                    />
                    <Tab
                      value='list'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['list'].icon} />
                          {'List'}
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

        <Dialog open={openClearDialog} onClose={handleClearDataDialogClose}>
          <DialogTitle>{`REMOVE SAVED DATA`}</DialogTitle>
          <DialogContent>
            <Typography variant='body1' color='textPrimary' align='center'>
              Are you sure you want to delete all saved data?
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClearDataDialogClose} color='primary'>
              Cancel
            </Button>
            <Button color='primary' onClick={handleClearAllEquipments}>
              YES
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openEquipmentDialog?.open} onClose={handleEquipmentAddDialogClose}>
          <DialogTitle>{`Add ${openEquipmentDialog?.slot?.slotDesc} Equipment`}</DialogTitle>
          <DialogContent>
            <Divider />
            <Box
              sx={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TextField
                align='center'
                select
                fullWidth
                size='small'
                label={`Equipment:`}
                id={'slot-select-' + openEquipmentDialog?.slot}
                variant='outlined'
                type='info'
                value={selectedEquipment?.equipment}
                sx={{ minWidth: '335px' }}
                onChange={e => {
                  handleEquipmentDialogChange(e)
                }}
              >
                {equipmentList
                  ?.filter(e => e.type === openEquipmentDialog?.slot?.slotDesc)
                  ?.map(option => (
                    <MenuItem key={option.desc} value={option.desc}>
                      {`${option.level} - ${option.desc} (${option.troop})`}
                    </MenuItem>
                  ))}
              </TextField>
              <Divider />
              <TextField
                align='center'
                select
                size='small'
                label={`Quality:`}
                id={'slot-quality-' + openEquipmentDialog?.slot}
                variant='outlined'
                type='info'
                value={selectedEquipment?.quality}
                sx={{ marginTop: '8px', marginBottom: '8px' }}
                onChange={e => {
                  handleQualityChange(e)
                }}
              >
                {qualityList?.map(option => (
                  <MenuItem key={option.option} value={option.option}>
                    {option.option}
                  </MenuItem>
                ))}
              </TextField>
              <Divider />
              <Typography variant='body1' color='primary' align='center'>
                DETAILS
              </Typography>
              <Divider />
              {selectedEquipment?.equipmentObj?.level > 0 && selectedEquipment?.quality?.length > 0 && (
                <>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <Typography variant='body2' color='textPrimary' align='left'>
                      Description:
                    </Typography>
                    <Typography
                      variant='body1'
                      color='primary'
                      align='left'
                      style={{
                        color: qualityInfo[selectedEquipment?.quality?.toLowerCase()]?.color,
                        marginLeft: '5px'
                      }}
                    >
                      {selectedEquipment?.equipmentObj?.desc}
                    </Typography>
                  </Box>
                  <Divider light />

                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <Typography variant='body2' color='textPrimary' align='left'>
                      Recomended For:
                    </Typography>
                    <Typography
                      variant='body1'
                      color='primary'
                      align='left'
                      sx={{ color: qualityInfo[selectedEquipment?.quality?.toLowerCase()]?.color, marginLeft: '5px' }}
                    >
                      {selectedEquipment?.equipmentObj?.troop}
                    </Typography>
                  </Box>
                  <Divider light />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <Typography variant='body2' color='textPrimary' align='left'>
                      Stats:
                    </Typography>
                    <Box>
                      {selectedEquipment?.equipmentObj?.levels
                        .find(q => q.quality === selectedEquipment?.quality)
                        ?.stats?.map((stat, index) => {
                          return (
                            <Typography
                              key={stat.statDesc + index}
                              variant='body2'
                              align='left'
                              sx={{ color: qualityInfo[selectedEquipment?.quality?.toLowerCase()]?.color }}
                            >
                              {`${stat.statDesc} ${
                                Math.ceil(stat.stat) > 999 ? stat.stat.toLocaleString() : `${stat.stat}%`
                              }`}
                            </Typography>
                          )
                        })}
                    </Box>
                  </Box>
                  <Divider light />
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
                    <Typography variant='body2' color='textPrimary' align='left'>
                      Materials:
                    </Typography>
                    <Box>
                      {selectedEquipment?.equipmentObj?.materials?.map((material, index) => {
                        return (
                          <Typography
                            key={material.m + index}
                            variant='body2'
                            color='primary'
                            align='left'
                            style={{ color: qualityInfo[selectedEquipment?.quality?.toLowerCase()]?.color }}
                          >
                            {`${material.m} x${selectedEquipment?.equipmentObj?.level >= 35 ? 2 : 1} item/s.`}
                          </Typography>
                        )
                      })}
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleEquipmentAddDialogClose} color='primary'>
              Cancel
            </Button>
            {selectedEquipment?.equipment?.length > 0 && selectedEquipment?.quality?.length > 0 && (
              <Button
                color='primary'
                onClick={e => {
                  handleEquipmentDialogAddOk(openEquipmentDialog?.slot, selectedEquipment)
                }}
              >
                SAVE
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  )
}

export default Equipment
