// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled, createTheme } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Custom Components Imports
import { troopsTemplates } from 'src/data/troops'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Fade,
  Paper,
  Tab,
  useMediaQuery
} from '@mui/material'
import { green } from '@mui/material/colors'
import { TabContext, TabPanel } from '@mui/lab'
import { InfoOutlined } from '@mui/icons-material'

// ** Styled component for the link in the dataTable
const theme = createTheme()

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[500],
  color: theme.palette.getContrastText(green[500]),
  '&:hover': {
    backgroundColor: green[700]
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

const CustomBadgeAvatar = props => {
  const { hidden, tierType, tier, troopsCount, troopType } = props

  return (
    <>
      {hidden ? (
        <Box
          key={`${troopType}-${tierType.toLowerCase()}`}
          sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, alignContent: 'center', alignItems: 'center' }}>
            <Typography variant='caption'>{tierType.toUpperCase()}</Typography>
            <Badge
              overlap='circular'
              badgeContent={tier}
              color='primary'
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              invisible={true}
            >
              <Avatar sx={{ width: 24, height: 24 }} variant='rounded' src={`/images/troops/${troopType}Logo.png`} />
            </Badge>

            <Typography sx={{ fontWeight: '600' }} variant='caption'>
              {troopsCount?.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          key={`${troopType}-${tierType.toLowerCase()}`}
          sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}
        >
          <Badge
            overlap='circular'
            badgeContent={tier}
            color='primary'
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <Avatar variant='rounded' src={`/images/troops/${troopType}Logo.png`} />
          </Badge>

          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <Typography variant='caption'>{tierType.toUpperCase()}</Typography>
            <Typography variant='body1'>{troopsCount?.toLocaleString()}</Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

// ** Variables
const tierList = {
  even: [
    { t: 2, desc: 'II' },
    { t: 4, desc: 'IV' },
    { t: 6, desc: 'VI' },
    { t: 8, desc: 'VIII' },
    { t: 10, desc: 'X' },
    { t: 12, desc: 'XII' },
    { t: 14, desc: 'XIV' }
  ],
  odd: [
    { t: 1, desc: 'I' },
    { t: 3, desc: 'III' },
    { t: 5, desc: 'V' },
    { t: 7, desc: 'VII' },
    { t: 9, desc: 'IX' },
    { t: 11, desc: 'XI' },
    { t: 13, desc: 'XIII' }
  ],
  angel: [
    { t: 5, desc: 'V' },
    { t: 6, desc: 'VI' },
    { t: 7, desc: 'VII' },
    { t: 8, desc: 'VIII' },
    { t: 9, desc: 'IX' },
    { t: 10, desc: 'X' },
    { t: 11, desc: 'XI' },
    { t: 12, desc: 'XII' },
    { t: 13, desc: 'XIII' }
  ]
}

const armySetup = {
  evenCavTier: 2,
  evenCav: 0,
  evenInfTier: 2,
  evenInf: 0,
  evenMageTier: 2,
  evenMage: 0,
  evenArcherTier: 2,
  evenArcher: 0,
  oddCavTier: 1,
  oddCav: 0,
  oddInfTier: 1,
  oddInf: 0,
  oddMageTier: 1,
  oddMage: 0,
  oddArcherTier: 1,
  oddArcher: 0,
  angelTier: 5,
  angel: 0
}

const defaultTroopsInfo = {
  currentSlot: 1,
  currentSlotName: '',
  setup: { ...armySetup },
  slots: [
    { s: 1, setup: {}, u: false },
    { s: 2, setup: {}, u: false },
    { s: 3, setup: {}, u: false },
    { s: 4, setup: {}, u: false },
    { s: 5, setup: {}, u: false },
    { s: 6, setup: {}, u: false },
    { s: 7, setup: {}, u: false },
    { s: 8, setup: {}, u: false }
  ],
  armySizeLimit: 0
}

const layoutConfig = {
  activities: [
    { k: 'anubis', desc: 'Anubis' },
    { k: 'fiend', desc: 'Fiend Trial' },
    { k: 'undead', desc: 'Undead' },
    { k: 'sos', desc: 'SOS' },
    { k: 'sa', desc: 'Speed Attack' },
    { k: 'lodes', desc: 'Star Ruins' },
    { k: 'box', desc: 'BOX' }
  ],
  templates: [...troopsTemplates]
}

// ** Custom Functions
function generateFormations(setup) {
  const { evenCav, evenInf, evenMage, evenArcher, oddCav, oddInf, oddMage, oddArcher, angel } = setup
  let frontlineSetup = []
  let midSetup = []
  let backlineSetup = []

  // Frontline Setup
  if (evenCav > 0 && evenInf > 0 && oddInf > 0 && oddCav > 0)
    frontlineSetup.push('evenCav', 'evenInf', 'oddInf', 'oddCav')
  if (evenCav === 0 && evenInf > 0 && oddInf > 0 && oddCav > 0)
    frontlineSetup.push('empty', 'evenInf', 'oddInf', 'oddCav')
  if (evenCav > 0 && evenInf > 0 && oddInf === 0 && oddCav > 0)
    frontlineSetup.push('empty', 'evenCav', 'evenInf', 'oddCav')
  if (evenCav > 0 && evenInf === 0 && oddInf > 0 && oddCav > 0)
    frontlineSetup.push('empty', 'evenCav', 'oddInf', 'oddCav')
  if (evenCav === 0 && evenInf > 0 && oddInf > 0 && oddCav === 0)
    frontlineSetup.push('empty', 'evenInf', 'oddInf', 'empty')
  if (evenCav > 0 && evenInf > 0 && oddInf > 0 && oddCav === 0)
    frontlineSetup.push('empty', 'evenCav', 'evenInf', 'oddInf')
  if (evenCav === 0 && evenInf === 0 && oddInf > 0 && oddCav > 0)
    frontlineSetup.push('empty', 'oddInf', 'oddCav', 'empty')
  if (evenCav === 0 && evenInf > 0 && oddInf === 0 && oddCav > 0)
    frontlineSetup.push('empty', 'evenInf', 'oddCav', 'empty')
  if (evenCav > 0 && evenInf === 0 && oddInf === 0 && oddCav > 0)
    frontlineSetup.push('empty', 'evenCav', 'oddCav', 'empty')
  if (evenCav === 0 && evenInf === 0 && oddInf === 0 && oddCav > 0)
    frontlineSetup.push('empty', 'empty', 'oddCav', 'empty')
  if (evenCav > 0 && evenInf === 0 && oddInf === 0 && oddCav === 0)
    frontlineSetup.push('empty', 'empty', 'evenCav', 'empty')
  if (evenCav === 0 && evenInf > 0 && oddInf === 0 && oddCav === 0)
    frontlineSetup.push('empty', 'empty', 'evenInf', 'empty')
  if (evenCav === 0 && evenInf === 0 && oddInf > 0 && oddCav === 0)
    frontlineSetup.push('empty', 'empty', 'oddInf', 'empty')
  if (evenCav > 0 && evenInf > 0 && oddInf === 0 && oddCav === 0)
    frontlineSetup.push('empty', 'evenCav', 'evenInf', 'empty')
  if (evenCav > 0 && evenInf === 0 && oddInf > 0 && oddCav === 0)
    frontlineSetup.push('empty', 'evenCav', 'oddInf', 'empty')
  if (evenCav === 0 && evenInf === 0 && oddInf === 0 && oddCav === 0)
    frontlineSetup.push('empty', 'empty', 'empty', 'empty')

  // Mid Setup
  if (angel > 0) midSetup.push('empty', 'empty', 'angel', 'empty')
  if (angel === 0) midSetup.push('empty', 'empty', 'empty', 'empty')

  // Backline Setup
  if (evenMage > 0 && evenArcher > 0 && oddArcher > 0 && oddMage > 0)
    backlineSetup.push('evenMage', 'evenArcher', 'oddArcher', 'oddMage')
  if (evenMage > 0 && evenArcher === 0 && oddArcher === 0 && oddMage === 0)
    backlineSetup.push('empty', 'empty', 'evenMage', 'empty')
  if (evenMage === 0 && evenArcher > 0 && oddArcher === 0 && oddMage === 0)
    backlineSetup.push('empty', 'empty', 'evenArcher', 'empty')
  if (evenMage === 0 && evenArcher === 0 && oddArcher > 0 && oddMage === 0)
    backlineSetup.push('empty', 'empty', 'oddArcher', 'empty')
  if (evenMage === 0 && evenArcher === 0 && oddArcher === 0 && oddMage > 0)
    backlineSetup.push('empty', 'empty', 'oddMage', 'empty')
  if (evenMage > 0 && evenArcher === 0 && oddArcher === 0 && oddMage > 0)
    backlineSetup.push('empty', 'evenMage', 'oddMage', 'empty')
  if (evenMage === 0 && evenArcher > 0 && oddArcher > 0 && oddMage === 0)
    backlineSetup.push('empty', 'evenArcher', 'oddArcher', 'empty')
  if (evenMage > 0 && evenArcher > 0 && oddArcher > 0 && oddMage === 0)
    backlineSetup.push('empty', 'evenMage', 'evenArcher', 'oddArcher')
  if (evenMage === 0 && evenArcher > 0 && oddArcher > 0 && oddMage > 0)
    backlineSetup.push('empty', 'evenArcher', 'oddArcher', 'oddMage')
  if (evenMage === 0 && evenArcher === 0 && oddArcher > 0 && oddMage > 0)
    backlineSetup.push('empty', 'oddArcher', 'oddMage', 'empty')
  if (evenMage > 0 && evenArcher > 0 && oddArcher === 0 && oddMage === 0)
    backlineSetup.push('empty', 'evenMage', 'evenArcher', 'empty')
  if (evenMage > 0 && evenArcher > 0 && oddArcher === 0 && oddMage > 0)
    backlineSetup.push('empty', 'evenMage', 'evenArcher', 'oddMage')
  if (evenMage > 0 && evenArcher === 0 && oddArcher > 0 && oddMage > 0)
    backlineSetup.push('empty', 'evenMage', 'oddArcher', 'oddMage')
  if (evenMage === 0 && evenArcher > 0 && oddArcher === 0 && oddMage > 0)
    backlineSetup.push('empty', 'evenArcher', 'oddMage', 'empty')
  if (evenMage === 0 && evenArcher === 0 && oddArcher === 0 && oddMage === 0)
    backlineSetup.push('empty', 'empty', 'empty', 'empty')
  if (evenMage > 0 && evenArcher === 0 && oddArcher > 0 && oddMage === 0)
    backlineSetup.push('empty', 'evenMage', 'oddArcher', 'empty')

  return { fs: frontlineSetup, ms: midSetup, bs: backlineSetup }
}

function getTotalTroops(setup) {
  const { angel, evenCav, evenInf, evenArcher, evenMage, oddCav, oddInf, oddArcher, oddMage } = setup
  let total = angel + evenCav + evenInf + evenArcher + evenMage + oddCav + oddInf + oddArcher + oddMage

  if (typeof total !== 'number') total = 0

  return total
}

/* eslint-enable */
const Troops = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('setup')
  const [isLoading, setIsLoading] = useState(true)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const hidden = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [troopsInfo, setTroopsInfo] = useState({ ...defaultTroopsInfo })
  const [showSaveSlots, setShowSaveSlots] = useState(false)
  const [showClearSlots, setShowClearSlots] = useState(false)
  const [showUseLayoutInfo, setShowUseLayoutInfo] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState({ slot: 1, name: '' })
  const [selectedLayout, setSelectedLayout] = useState({ act: '', setup: '', desc: '', preview: { ...armySetup } })

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('troopsInfo'))
    }

    if (saved) setTroopsInfo(saved)
    setIsLoading(false)
  }, [])

  const formations = generateFormations({ ...troopsInfo.setup })
  const formationPreview = generateFormations({ ...selectedLayout.preview })
  const usedTroops = getTotalTroops(troopsInfo.setup)

  const handleSaveData = e => {
    setShowSaveSlots(true)
  }

  const handleSaveSlots = (e, slotData) => {
    const slotsInfo = [...troopsInfo.slots]
    const { slot, name: slotName } = slotData
    const idxSlot = slotsInfo?.findIndex(s => s.s === slot)

    // Saving Slots information
    slotsInfo[idxSlot].name = slotName
    slotsInfo[idxSlot].setup = { ...troopsInfo.setup }
    slotsInfo[idxSlot].u = true

    // Update troopsInfo and Slots
    const newTroopsInfo = { ...troopsInfo, slots: slotsInfo, currentSlot: slot, currentSlotName: slotName }
    setTroopsInfo(newTroopsInfo)

    localStorage.setItem('troopsInfo', JSON.stringify(newTroopsInfo))
    setShowSaveSlots(false)
    setSelectedSlot({ slot: 0, name: '' })

    return toast.success('Data successfully stored in the browser!')
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
    setSelectedLayout({ act: '', setup: '', desc: '', preview: { ...armySetup } })
  }

  const handleCalculatorChange = (e, type, level = undefined) => {
    const enterValue = +e.target.value > 999999 ? 999999 : +e.target.value

    if (troopsInfo?.armySizeLimit > 0 && troopsInfo?.armySizeLimit < usedTroops) {
      return toast.error(
        `You already used more troops(${
          usedTroops - troopsInfo?.armySizeLimit
        } more) than your configured Army Size Limit.`
      )
    }
    const newObj = { ...troopsInfo }

    // Updating values
    newObj.setup[type] = enterValue
    setTroopsInfo(newObj)
  }

  const handleLoadFormation = (e, slotNumber) => {
    const newTroopsInfo = { ...troopsInfo }
    const defaultSetup = { ...armySetup }
    const slotObj = newTroopsInfo.slots.find(s => s.s === slotNumber)

    const setup = Object.keys(slotObj.setup).length > 0 ? { ...slotObj.setup } : defaultSetup

    setSelectedSlot({ slot: slotNumber, name: slotObj?.name || '' })

    setTroopsInfo({
      currentSlot: slotNumber,
      currentSlotName: slotObj?.name || '',
      setup: setup,
      slots: newTroopsInfo.slots
    })
  }

  const handleClearSlots = () => {
    setTroopsInfo({ ...defaultTroopsInfo })
    setShowClearSlots(false)
    localStorage.setItem('troopsInfo', JSON.stringify({ ...defaultTroopsInfo }))

    return toast.error('Data successfully REMOVED from the browser!')
  }

  const elementList = {
    empty: (
      <Grid item xs={3}>
        <Box key={'1'} sx={{ display: 'flex', alignItems: 'center' }}></Box>
      </Grid>
    ),
    evenCav: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='EVEN'
          tier={tierList.even?.find(tl => tl.t === troopsInfo.setup['evenCavTier'])?.desc}
          troopsCount={troopsInfo.setup['evenCav']}
          troopType='cav'
        />
      </Grid>
    ),
    evenInf: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='EVEN'
          tier={tierList.even?.find(tl => tl.t === troopsInfo.setup['evenInfTier'])?.desc}
          troopsCount={troopsInfo.setup['evenInf']}
          troopType='inf'
        />
      </Grid>
    ),
    oddInf: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='ODD'
          tier={tierList.odd?.find(tl => tl.t === troopsInfo.setup['oddInfTier'])?.desc}
          troopsCount={troopsInfo.setup['oddInf']}
          troopType='inf'
        />
      </Grid>
    ),
    oddCav: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='ODD'
          tier={tierList.odd?.find(tl => tl.t === troopsInfo.setup['oddCavTier'])?.desc}
          troopsCount={troopsInfo.setup['oddCav']}
          troopType='cav'
        />
      </Grid>
    ),
    evenMage: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='EVEN'
          tier={tierList.even?.find(tl => tl.t === troopsInfo.setup['evenMageTier'])?.desc}
          troopsCount={troopsInfo.setup['evenMage']}
          troopType='mage'
        />
      </Grid>
    ),
    evenArcher: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='EVEN'
          tier={tierList.even?.find(tl => tl.t === troopsInfo.setup['evenArcherTier'])?.desc}
          troopsCount={troopsInfo.setup['evenArcher']}
          troopType='archer'
        />
      </Grid>
    ),
    oddArcher: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='ODD'
          tier={tierList.odd?.find(tl => tl.t === troopsInfo.setup['oddArcherTier'])?.desc}
          troopsCount={troopsInfo.setup['oddArcher']}
          troopType='archer'
        />
      </Grid>
    ),
    oddMage: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='ODD'
          tier={tierList.odd?.find(tl => tl.t === troopsInfo.setup['oddMageTier'])?.desc}
          troopsCount={troopsInfo.setup['oddMage']}
          troopType='mage'
        />
      </Grid>
    ),
    angel: (
      <Grid item xs={3}>
        <CustomBadgeAvatar
          hidden={hidden}
          tierType='ANGELS'
          tier={tierList.angel?.find(tl => tl.t === troopsInfo.setup['angelTier'])?.desc}
          troopsCount={troopsInfo.setup['angel']}
          troopType='angel'
        />
      </Grid>
    )
  }

  const tabContentList = {
    setup: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ padding: '0.5em' }}>
              <Grid item xs={12}>
                <Paper elevation={24}>
                  <Typography align='center' variant='h6' color='primary' sx={{ paddingTop: '0.5em' }}>
                    TROOPS SETUP
                  </Typography>
                  <Paper
                    elevation={4}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '0.5em'
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
                        id='army-size-limit'
                        size='small'
                        variant='outlined'
                        label='Set Army Size Limit'
                        sx={{ minWidth: '200px', mt: 3 }}
                        value={troopsInfo?.armySizeLimit > 0 ? troopsInfo?.armySizeLimit : ''}
                        onChange={e => {
                          const armyLimit = +e.target.value > 999999 ? 999999 : +e.target.value
                          setTroopsInfo({ ...troopsInfo, armySizeLimit: armyLimit })
                        }}
                      />
                      <Box sx={{ m: 3 }}>
                        <Typography align='center' color='primary' variant='body2'>
                          Troops Used:
                        </Typography>
                        <Typography align='center' variant='h5'>
                          {usedTroops?.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: '0.5rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* EVEN TIERS */}
                    <Paper
                      elevation={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '0.5em'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* FRONTLINE TROOPS */}
                        <Typography align='center' color='primary' variant='h6'>
                          EVEN TIERS
                        </Typography>
                        <div>
                          <Divider>
                            <Typography variant='caption'>FRONTLINE</Typography>
                          </Divider>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='evenCavTier'
                              size='small'
                              variant='outlined'
                              label='Tier'
                              select
                              sx={{ maxWidth: '60px' }}
                              value={troopsInfo.setup['evenCavTier']}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenCavTier')
                              }}
                            >
                              {tierList.even?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='evenCav'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Cavalry'
                              value={troopsInfo.setup['evenCav']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenCav')
                              }}
                            />
                          </Box>

                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='evenInfTier'
                              size='small'
                              variant='outlined'
                              label='Tier'
                              select
                              sx={{ maxWidth: '60px' }}
                              value={troopsInfo.setup['evenInfTier']}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenInfTier')
                              }}
                            >
                              {tierList.even?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='evenInf'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Infantry'
                              value={troopsInfo.setup['evenInf']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenInf')
                              }}
                            />
                          </Box>
                        </Box>
                        {/* EMPTY */}
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={{ padding: '1.5em' }}></Box>
                        </Box>
                        {/* BACKLINE TROOPS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>BACKLINE</Typography>
                          </Divider>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='evenMageTier'
                              size='small'
                              variant='outlined'
                              select
                              label='Tier'
                              value={troopsInfo.setup['evenMageTier']}
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenMageTier')
                              }}
                            >
                              {tierList.even?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='evenMage'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Mages'
                              sx={{ maxWidth: '115px' }}
                              value={troopsInfo.setup['evenMage']}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenMage')
                              }}
                            />
                          </Box>

                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='evenArcherTier'
                              size='small'
                              variant='outlined'
                              label='Tier'
                              value={troopsInfo.setup['evenArcherTier']}
                              select
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenArcherTier')
                              }}
                            >
                              {tierList.even?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='evenArcher'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Archers'
                              value={troopsInfo.setup['evenArcher']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'evenArcher')
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                    <div style={{ marginLeft: '10px' }} />
                    {/* ODD TIERS */}
                    <Paper
                      elevation={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '0.5em'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* FRONTLINE TROOPS */}
                        <Typography align='center' color='primary' variant='h6'>
                          ODD TIERS
                        </Typography>
                        <div>
                          <Divider>
                            <Typography variant='caption'>FRONTLINE</Typography>
                          </Divider>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='oddInfTier'
                              size='small'
                              variant='outlined'
                              label='Tier'
                              select
                              value={troopsInfo.setup['oddInfTier']}
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddInfTier')
                              }}
                            >
                              {tierList['odd']?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='oddInf'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Infantry'
                              value={troopsInfo.setup['oddInf']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddInf')
                              }}
                            />
                          </Box>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='oddCavTier'
                              size='small'
                              variant='outlined'
                              label='Tier'
                              select
                              value={troopsInfo.setup['oddCavTier']}
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddCavTier')
                              }}
                            >
                              {tierList['odd']?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='oddCav'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Cavalry'
                              value={troopsInfo.setup['oddCav']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddCav')
                              }}
                            />
                          </Box>
                        </Box>
                        {/* ANGELS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>ANGELS</Typography>
                          </Divider>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='angelTier'
                              size='small'
                              variant='outlined'
                              select
                              label='Tier'
                              value={troopsInfo.setup['angelTier']}
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'angelTier')
                              }}
                            >
                              {tierList['angel']?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='angel'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Angels'
                              value={troopsInfo.setup['angel']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'angel')
                              }}
                            />
                          </Box>
                        </Box>
                        {/* BACKLINE TROOPS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>BACKLINE</Typography>
                          </Divider>
                        </div>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='oddArcherTier'
                              size='small'
                              variant='outlined'
                              label='Tier'
                              select
                              value={troopsInfo.setup['oddArcherTier']}
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddArcherTier')
                              }}
                            >
                              {tierList['odd']?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='oddArcher'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Archers'
                              value={troopsInfo.setup['oddArcher']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddArcher')
                              }}
                            />
                          </Box>
                          <Box sx={{ padding: '0.3em' }}>
                            <TextField
                              align='left'
                              id='oddMageTier'
                              size='small'
                              variant='outlined'
                              select
                              label='Tier'
                              value={troopsInfo.setup['oddMageTier']}
                              sx={{ maxWidth: '60px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddMageTier')
                              }}
                            >
                              {tierList['odd']?.map(option => (
                                <MenuItem key={option.t} value={option.t}>
                                  {option.desc}
                                </MenuItem>
                              ))}
                            </TextField>
                            <TextField
                              id='oddMage'
                              size='small'
                              variant='outlined'
                              type='number'
                              label='Mages'
                              value={troopsInfo.setup['oddMage']}
                              sx={{ maxWidth: '115px' }}
                              onChange={e => {
                                handleCalculatorChange(e, 'oddMage')
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={24}>
                  <Typography align='center' variant='h6' color='primary' sx={{ paddingTop: '0.5em' }}>
                    FORMATION GENERATOR
                  </Typography>
                  {/* FORMATIONS SLOTS */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '1rem' }}>
                    <Paper
                      elevation={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '1em',
                        width: '100%'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                          <GreenButton
                            variant='contained'
                            startIcon={<Icon icon='ic:baseline-save' />}
                            onClick={handleSaveData}
                            sx={{ marginBottom: '10px', marginRight: '10px' }}
                          >
                            SAVE
                          </GreenButton>
                        </Box>

                        <Divider sx={{ mt: 2, mb: 3 }} />
                        <Box
                          key={'slots-header'}
                          sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
                        >
                          {troopsInfo.slots?.map(slot => {
                            const { s: slotNumber } = slot
                            const slotName = slot?.name

                            return (
                              <>
                                <Box
                                  key={`${slotNumber}-load-formation`}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <Box
                                    key={`${slotNumber}-load-formation-det`}
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                      ml: 5,
                                      border: `${
                                        slotNumber === troopsInfo?.currentSlot
                                          ? `2px solid ${theme.palette.primary.main}`
                                          : 0
                                      }`
                                    }}
                                  >
                                    <Button
                                      onClick={e => {
                                        handleLoadFormation(e, slotNumber)
                                      }}
                                    >
                                      <Badge
                                        overlap='circular'
                                        badgeContent={slotNumber}
                                        color='primary'
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right'
                                        }}
                                        sx={{ marginBottom: '3px' }}
                                      >
                                        <Avatar>
                                          <Icon icon='game-icons:battle-gear' />
                                        </Avatar>
                                      </Badge>
                                    </Button>
                                    <Typography variant='caption' align='center'>
                                      {slotName ?? 'Not Set'}
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            )
                          })}
                        </Box>
                      </Box>
                    </Paper>
                  </Box>

                  {/* PREVIEW */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '1rem' }}>
                    <Paper
                      elevation={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '1em',
                        width: '100%'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* FRONTLINE TROOPS */}
                        <Typography align='center' color='primary' variant='body1'>
                          {troopsInfo.currentSlotName === ''
                            ? `SLOT ${troopsInfo.currentSlot} - `
                            : `${troopsInfo.currentSlotName} - `}
                          FORMATION
                        </Typography>
                        <Typography align='center' variant='caption'>
                          Army Size: {usedTroops?.toLocaleString()}
                        </Typography>
                        <div>
                          <Divider>
                            <Typography variant='caption'>FRONTLINE</Typography>
                          </Divider>
                        </div>
                        {/* FRONTLINE */}
                        <Grid container>
                          {/* EVEN CAV */}
                          {elementList[formations.fs[0]]}
                          {/* EVEN INFANTRY */}
                          {elementList[formations.fs[1]]}
                          {/* ODD INFANTRY */}
                          {elementList[formations.fs[2]]}
                          {/* ODD CAVALRY */}
                          {elementList[formations.fs[3]]}
                        </Grid>
                        {/* ANGELS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>ANGELS</Typography>
                          </Divider>
                        </div>
                        <Grid container>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}></Grid>
                          {elementList[formations.ms[2]]}
                          <Grid item xs={3}></Grid>
                        </Grid>

                        {/* BACKLINE TROOPS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>BACKLINE</Typography>
                          </Divider>
                        </div>
                        <Grid container>
                          {/* EVEN MAGE */}
                          {elementList[formations.bs[0]]}
                          {/* EVEN ARCHERS */}
                          {elementList[formations.bs[1]]}
                          {/* ODD ARCHERS */}
                          {elementList[formations.bs[2]]}
                          {/* ODD MAGE */}
                          {elementList[formations.bs[3]]}
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    ),
    layout: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ padding: '1.5em' }}>
              <Grid item xs={12}>
                <Paper elevation={24}>
                  <Typography align='center' variant='h6' color='primary' sx={{ paddingTop: '0.3em' }}>
                    TROOPS LAYOUTS
                  </Typography>
                  <Divider sx={{ mt: 3 }} />
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
                        id='activity-select'
                        size='small'
                        variant='outlined'
                        label='Activity'
                        select
                        sx={{ minWidth: '200px', mt: 3 }}
                        value={selectedLayout.act}
                        onChange={e => {
                          setSelectedLayout({ ...selectedLayout, act: e.target.value })
                        }}
                      >
                        {layoutConfig.activities?.map(option => (
                          <MenuItem key={option.k} value={option.k}>
                            {option.desc}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        align='center'
                        id='setup-select'
                        size='small'
                        variant='outlined'
                        label='Troops Formation'
                        select
                        disabled={selectedLayout.act.length > 0 ? false : true}
                        sx={{ minWidth: '200px', mt: 4 }}
                        value={selectedLayout.setup}
                        onChange={e => {
                          const template = layoutConfig.templates.find(
                            t => t.act === selectedLayout.act && t.setup === e.target.value
                          )

                          setSelectedLayout({
                            ...selectedLayout,
                            setup: e.target.value,
                            desc: template?.desc,
                            preview: template
                          })
                          setTroopsInfo({ ...troopsInfo, setup: template })
                        }}
                      >
                        {[...layoutConfig.templates]
                          .filter(t => t.act === selectedLayout.act)
                          ?.map(option => (
                            <MenuItem key={option.setup} value={option.setup}>
                              {option.desc}
                            </MenuItem>
                          ))}
                      </TextField>

                      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Button
                          disabled={selectedLayout.act.length > 0 && selectedLayout.setup.length > 0 ? false : true}
                          variant='contained'
                          sx={{ mt: 5, mb: 5, mr: 2 }}
                          onClick={e => {
                            handleChange(e, 'setup')
                          }}
                        >
                          USE THIS LAYOUT
                        </Button>
                        <Tooltip title='This option will send you to the SETUP tab.' placement='bottom'>
                          <IconButton onClick={() => setShowUseLayoutInfo(true)} color='primary'>
                            <InfoOutlined color='primary' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={24}>
                  <Typography align='center' variant='h6' color='primary' sx={{ paddingTop: '0.5em' }}>
                    LAYOUT PREVIEW
                  </Typography>

                  {/* PREVIEW */}
                  <Box sx={{ display: 'flex', flexDirection: 'row', padding: '1rem' }}>
                    <Paper
                      elevation={12}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '1em',
                        width: '100%'
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* FRONTLINE TROOPS */}
                        <Typography align='center' color='primary' variant='body1'>
                          {selectedLayout.setup.length > 0
                            ? `${selectedLayout.desc} [${selectedLayout.act.toUpperCase()}]`
                            : ''}
                        </Typography>
                        <Typography align='center' variant='caption'>
                          Army Size: {usedTroops?.toLocaleString()}
                        </Typography>
                        <div>
                          <Divider>
                            <Typography variant='caption'>FRONTLINE</Typography>
                          </Divider>
                        </div>
                        {/* FRONTLINE */}
                        <Grid container>
                          {/* EVEN CAV */}
                          {elementList[formationPreview.fs[0]]}
                          {/* EVEN INFANTRY */}
                          {elementList[formationPreview.fs[1]]}
                          {/* ODD INFANTRY */}
                          {elementList[formationPreview.fs[2]]}
                          {/* ODD CAVALRY */}
                          {elementList[formationPreview.fs[3]]}
                        </Grid>
                        {/* ANGELS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>ANGELS</Typography>
                          </Divider>
                        </div>
                        <Grid container>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}></Grid>
                          {elementList[formationPreview.ms[2]]}
                          <Grid item xs={3}></Grid>
                        </Grid>

                        {/* BACKLINE TROOPS */}
                        <div>
                          <Divider>
                            <Typography variant='caption'>BACKLINE</Typography>
                          </Divider>
                        </div>
                        <Grid container>
                          {/* EVEN MAGE */}
                          {elementList[formationPreview.bs[0]]}
                          {/* EVEN ARCHERS */}
                          {elementList[formationPreview.bs[1]]}
                          {/* ODD ARCHERS */}
                          {elementList[formationPreview.bs[2]]}
                          {/* ODD MAGE */}
                          {elementList[formationPreview.bs[3]]}
                        </Grid>
                      </Box>
                    </Paper>
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
            <CustomHeader icon='troops' title='TROOPS SETUP AND LAYOUTS' />
            <Divider />
            <Grid container spacing={6} sx={{ padding: '1rem' }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ marginTop: '10px' }}>
                  <GreenButton
                    variant='contained'
                    startIcon={<Icon icon='ic:baseline-save' />}
                    onClick={handleSaveData}
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  >
                    SAVE
                  </GreenButton>
                  <Button
                    variant='contained'
                    color='error'
                    startIcon={<Icon icon='ic:round-add' />}
                    onClick={() => {
                      setShowClearSlots(true)
                    }}
                    sx={{ marginBottom: '10px' }}
                  >
                    CLEAR SLOTS
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                  <Typography variant='caption' color='primary'>
                    {`After each modification (add, edit or delete) please, use the `}
                    {
                      <span role='img' aria-labelledby='floppy-disk'>
                        {`💾`}
                      </span>
                    }{' '}
                    {`button before refreshing or leaving the page.`}
                  </Typography>
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
                      value='setup'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:view-grid-outline' />
                          {!hideText && 'Setup'}
                        </Box>
                      }
                    />
                    <Tab
                      value='layout'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='carbon:software-resource-cluster' />
                          {!hideText && 'Layouts'}
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

      {/* Dialog | SAVE SLOTS */}
      <Dialog
        fullWidth
        open={showSaveSlots}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowSaveSlots(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowSaveSlots(false)}
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
            onClick={() => setShowSaveSlots(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Typography variant='h5' align='center'>
            SAVE ARMY FORMATION
          </Typography>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='body2'>In which slot do you want to save this formation?</Typography>
          <TextField
            align='left'
            id='army-slot-select'
            size='small'
            variant='outlined'
            type='number'
            label='Slot'
            select
            defaultValue={1}
            value={selectedSlot.slot > 0 ? selectedSlot.slot : troopsInfo.currentSlot}
            onChange={e => {
              setSelectedSlot({ ...selectedSlot, slot: +e.target.value })
            }}
            sx={{ mb: 3, mt: 3 }}
          >
            {troopsInfo?.slots?.map(option => (
              <MenuItem key={option.s} value={option.s}>
                #{option.s}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant='body2'>How would you like to name this formation?</Typography>
          <TextField
            align='left'
            id='army-slot-name'
            size='small'
            variant='outlined'
            value={selectedSlot.name?.length > 0 ? selectedSlot.name : ''}
            onChange={e => {
              setSelectedSlot({ ...selectedSlot, name: e.target.value })
            }}
            sx={{ mb: 3, mt: 3 }}
          />
        </DialogContent>

        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button onClick={() => setShowSaveSlots(false)} color='primary'>
            CLOSE
          </Button>

          <GreenButton
            onClick={e => {
              handleSaveSlots(e, { ...selectedSlot })
            }}
            color='success'
          >
            SAVE FORMATION
          </GreenButton>
        </DialogActions>
      </Dialog>

      {/* Dialog | CLEAR SLOTS */}
      <Dialog
        fullWidth
        open={showClearSlots}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowClearSlots(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowClearSlots(false)}
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
            onClick={() => setShowClearSlots(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Typography variant='h5' align='center'>
            CLEAR SAVED SLOTS
          </Typography>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='body2'>Are you sure you want to clear all the saved slots?</Typography>
        </DialogContent>

        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button onClick={() => setShowClearSlots(false)} color='primary'>
            CLOSE
          </Button>

          <Button onClick={handleClearSlots} color='error'>
            CLEAR SAVED DATA
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog | CLEAR SLOTS */}
      <Dialog
        fullWidth
        open={showUseLayoutInfo}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowUseLayoutInfo(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowUseLayoutInfo(false)}
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
            onClick={() => setShowUseLayoutInfo(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Typography variant='h5' align='center'>
            USE THIS LAYOUT
          </Typography>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='body2'>
            This option will send you to the SETUP tab with the current setup information for you to edit and save it in
            any slot you'll like.
          </Typography>
        </DialogContent>

        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button onClick={() => setShowUseLayoutInfo(false)} color='primary'>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Troops
