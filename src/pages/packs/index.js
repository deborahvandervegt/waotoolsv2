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
import { packs, weekdayDet, weekdayConf, itemList } from '../../data/packs/index'
import CardPackDetails from '../../views/pages/packs/PackCard'
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
  Autocomplete,
  Badge,
  Button,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  InputBase,
  ListSubheader,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  Tooltip,
  useMediaQuery
} from '@mui/material'
import { red } from '@mui/material/colors'
import { TabContext, TabPanel } from '@mui/lab'
import moment from 'moment'
import { ClearAll, Save, Search } from '@mui/icons-material'
import toast from 'react-hot-toast'
import PackUserList from 'src/views/pages/packs/PackUserList'
import { useTheme } from '@mui/system'

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

const AddedPacksCard = props => {
  return (
    <Box sx={{ m: 2, p: 2, border: `solid 1px #7a7a7a6e`, borderRadius: '8px', width: '130px' }}>
      <Typography variant='body2' color='primary' align='center'>
        {props.title}
      </Typography>
      <Typography variant='body1' color='primaryText' align='center'>
        {props.info}
      </Typography>
    </Box>
  )
}

// ** Custom Vars
const tabConf = {
  userPacks: { icon: 'game-icons:diamond-hard' },
  packs: { icon: 'game-icons:gold-stack' },
  calculator: { icon: 'material-symbols:calculate-rounded' },
  artifactsList: { icon: 'pepicons-print:list' }
}

const colors = {
  selected: { border: '#003c0dd1', background: { dark: '#003c0dd1', light: '#edfff1d1' } },
  normal: { border: '#7a7a7a6e', background: { dark: '', light: '' } },
  priority: { border: '#0278AE', background: { dark: '#002b3e85', light: '#8fd6f761' } }
}

const weekDay = moment.utc().day()

const defaultUserData = {
  items: [],
  conf: { budget: 0, priority: [] }
}

// ** Custom Functions
function getUserInfo(data) {
  if (data?.items?.length > 0) {
    const newData = [...data?.items].map(item => {
      let weekTime
      const itemInfo = packs?.find(p => p.packId === item.packId)
      const itemInfoDet = itemInfo?.packDet?.find(pd => pd.l === item.l)

      if (itemInfo.tab === 'daily') weekTime = { d: itemInfo.wday.length, w: 1, monthly: 0.25, biweekly: 2 }
      if (itemInfo.tab === 'weekly') weekTime = { d: 1, w: 1, monthly: 0.25, biweekly: 2 }
      if (itemInfo.tab === 'monthly') weekTime = { d: 1, w: 1, monthly: 1, biweekly: 2 }
      if (itemInfo.tab === 'biweekly') weekTime = { d: 2, w: 1, monthly: 0.25, biweekly: 1 }

      const weekPrice = weekTime.d * itemInfoDet.p
      const weekGems = weekTime.d * itemInfoDet.items[0].g
      const monthPrice = weekPrice * 4
      const monthGems = weekGems * 4

      // const weekAzurite = itemInfoDet.items[0]?.qty * itemInfo?.wday?.length()
      const weekAzurite = weekTime.d * itemInfoDet.items[0]?.qty
      const monthAzurite = weekAzurite * 4

      return {
        ...itemInfo,
        packDet: itemInfoDet,
        price: itemInfoDet.p,
        gems: itemInfoDet.items[0].g,
        weekPrice,
        weekGems,
        monthPrice,
        monthGems,
        weekAzurite,
        monthAzurite
      }
    })

    const totalPrice = round(
      newData.reduce((a, v) => a + v.price, 0),
      2
    )

    const totalPacks = newData.length
    const totalGems = newData.reduce((a, v) => a + v.gems, 0)
    const totalWeekPrice = newData.reduce((a, v) => a + v.weekPrice, 0)
    const totalWeekGems = newData.reduce((a, v) => a + v.weekGems, 0)
    const totalMonthPrice = newData.reduce((a, v) => a + v.monthPrice, 0)
    const totalMonthGems = newData.reduce((a, v) => a + v.monthGems, 0)
    const totalAzuriteW = newData.reduce((a, v) => a + v.weekAzurite, 0)
    const totalAzuriteM = newData.reduce((a, v) => a + v.monthAzurite, 0)

    return {
      totalPacks,
      totalPrice,
      totalGems,
      totalWeekPrice,
      totalMonthPrice,
      totalWeekGems,
      totalMonthGems,
      totalAzuriteW,
      totalAzuriteM
    }
  }
}

/* eslint-enable */
const Packs = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('userPacks')
  const [isLoading, setIsLoading] = useState(false)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [weekdayTabSelected, setWeekdayTabSelected] = useState(weekDay === 0 ? 7 : weekDay)
  const [weekdaySelected, setWeekdaySelected] = useState('all')
  const [packsInfo, setPacksInfo] = useState([...packs])
  const [search, setSearch] = useState({ found: true, search: null, cleared: false })
  const [openClearDialog, setOpenClearDialog] = useState(false)
  const [showItems, setShowItems] = useState(false)
  const theme = useTheme()

  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('packsUserData')
    const initialValue = JSON.parse(saved)

    return initialValue || defaultUserData
  })
  const userInfo = getUserInfo(userData)

  useEffect(() => {
    handleWeekdaySelected(null, weekdayTabSelected)
  }, [])

  const handleSaveData = e => {
    localStorage.setItem('packsUserData', JSON.stringify(userData))

    return toast.success('Data saved in the browser.')
  }

  const handleRemoveItems = e => {
    localStorage.removeItem('packsUserData')
    setUserData(defaultUserData)
    setOpenClearDialog(false)

    return toast.error('Data removed from your browser.')
  }

  const handleCheckClick = pack => {
    let newItemsList = [...userData?.items]
    let newItemsPackList = [[...userData?.items]?.find(pi => pi.packId === pack.packId)]
    const budget = userData?.conf?.budget

    if (pack.checked) {
      newItemsList.push({ packId: pack.packId, l: pack.l })
      const tmpUserInfo = getUserInfo({ items: newItemsList })
      if (budget > 0 && tmpUserInfo?.totalMonthPrice > budget)
        return toast.error('Budget limit exceed. Please raise the budget or select another item.')
    } else {
      newItemsPackList = newItemsPackList.filter(ipl => ipl.l < pack.l)
      newItemsList = newItemsList?.filter(ui => ui.packId !== pack.packId).concat(newItemsPackList)
    }

    setUserData(prevState => ({ ...prevState, items: newItemsList }))
  }

  const handleCheckClickList = pack => {
    let newItemsList = [...userData.items]
    const packList = [...packs]?.find(p => p.packId === pack.packId)

    if (pack.checked) {
      packList?.packDet?.forEach(item => {
        const budget = userData?.conf?.budget
        const checkIfExists = newItemsList?.find(itemList => itemList.packId === pack.packId && itemList.l === item.l)
        const tmpUserInfo = getUserInfo({ items: newItemsList })

        if (budget > 0 && tmpUserInfo?.totalMonthPrice > budget)
          return toast.error('Budget limit exceed. Please raise the budget or select another item.')

        if (!checkIfExists) newItemsList.push({ packId: pack.packId, l: item.l })
      })
    } else {
      newItemsList = newItemsList.filter(item => item.packId !== pack.packId)
    }

    setUserData(prevState => ({ ...prevState, items: newItemsList }))
  }

  const handleWeekdaySelected = (event, newValue) => {
    setWeekdayTabSelected(newValue)
    const newPacks = [...packs]
    const weekday = weekdayDet[newValue]?.day
    setWeekdaySelected(weekday)

    if (weekday === 'all') {
      setPacksInfo([...packs])
    } else {
      const newPackInfo = newPacks.filter(p => p.wday.includes(weekday))
      setPacksInfo([...newPackInfo])
    }
  }

  const handleFilterSearch = input => {
    const searchString = input.target.value

    if (searchString.length === 0 || searchString === null) {
      setPacksInfo([...packs])
      setSearch({ found: true, search: searchString })

      return
    }

    const newPacksData = []

    ;[...packs].forEach(pack => {
      const infoStr = pack.desc.toString().toLocaleLowerCase()
      const tagStr = pack.category.join(' ').toString().toLocaleLowerCase()
      const itemsStr = pack.packDet[0].items[0].i
      const searchData = `${infoStr} ${tagStr} ${itemsStr}`
      if (searchData.search(searchString.toLocaleLowerCase()) > -1) {
        newPacksData.push(pack)
      }
    })

    if (newPacksData?.length > 0) {
      setPacksInfo(newPacksData)
      setWeekdayTabSelected(0)
      setWeekdaySelected('all')
      setSearch({ found: true, search: searchString ?? '', cleared: false })
    } else {
      setPacksInfo(newPacksData)
      setWeekdayTabSelected(0)
      setWeekdaySelected('all')
      setSearch({ found: false, search: searchString ?? '', cleared: false })
    }
  }

  const handleClearSearch = e => {
    setSearch({ found: false, search: '', cleared: true })
    handleWeekdaySelected('', weekDay === 0 ? 7 : weekDay)
  }

  const handleClearDataDialog = (e, slot) => {
    setOpenClearDialog(true)
  }

  const handleDeleteRows = packs => {
    let newPackList = [...userData?.items]
    if (packs?.length > 0) {
      packs.forEach(pack => {
        const separador = pack.indexOf('-')
        const packId = +pack.substring(separador, -5)
        const packLevel = +pack.substring(separador + 1, 5)
        const packIndex = newPackList.findIndex(pl => pl.packId === packId && pl.l === packLevel)
        newPackList.splice(packIndex, 1)
      })
    }
    setUserData(prevState => ({ ...prevState, items: newPackList }))

    return toast.success(
      'Packages were removed from the user list. Click SAVE button to save changes or refresh to get the removed packages back.'
    )
  }

  const SaveClear = props => {
    return (
      <Box sx={{ display: 'flex', m: '8px' }}>
        <Tooltip title={'Save current configuration.'}>
          <GreenButton
            size='small'
            edge='start'
            color='primary'
            variant='contained'
            startIcon={<Save />}
            onClick={handleSaveData}
          >
            SAVE
          </GreenButton>
        </Tooltip>

        <Tooltip title={'Clear all the inputs.'}>
          <RedButton
            size='small'
            edge='start'
            color='primary'
            variant='contained'
            startIcon={<ClearAll />}
            onClick={handleClearDataDialog}
            sx={{ ml: 1 }}
          >
            DELETE DATA
          </RedButton>
        </Tooltip>
      </Box>
    )
  }

  const tabContentList = {
    userPacks: (
      <Box sx={{ m: 1 }}>
        <Grid container spacing={4} sx={{ pl: '1rem', pb: '1rem' }}>
          <Card sx={{ border: 'solid 1px #7a7a7a6e', borderRadius: '8px', width: '100%' }}>
            <CardContent>
              <Box>
                <Typography variant='h6'>Added Packs</Typography>
                <Divider />
                <Card elevation={1} sx={{ p: 1 }}>
                  <>
                    <Box sx={{ my: '8px', p: 2 }}>
                      {userData?.items?.length > 0 ? (
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            flexWrap: 'wrap'
                          }}
                        >
                          <AddedPacksCard info={userInfo?.totalPacks} title={'Added Packs'} />
                          <AddedPacksCard info={userInfo?.totalGems?.toLocaleString()} title={'Gems for Packs'} />
                          <AddedPacksCard info={userInfo?.totalMonthGems?.toLocaleString()} title={'Monthly Gems'} />
                          <AddedPacksCard info={userInfo?.totalWeekGems?.toLocaleString()} title={'Weekly Gems'} />
                          <AddedPacksCard info={`$${userInfo?.totalPrice}`} title={'Price for Packs'} />
                          <AddedPacksCard
                            info={`$${round(userInfo?.totalMonthPrice, 2).toLocaleString()}`}
                            title={'Monthly Price'}
                          />
                          <AddedPacksCard
                            info={`$${round(userInfo?.totalWeekPrice, 2).toLocaleString()}`}
                            title={'Weekly Price'}
                          />
                          {userInfo?.totalAzuriteW > 0 && (
                            <>
                              <AddedPacksCard
                                info={userInfo?.totalAzuriteW?.toLocaleString()}
                                title={'Weekly Azurite'}
                              />
                              <AddedPacksCard
                                info={round(userInfo?.totalAzuriteM, 2).toLocaleString()}
                                title={'Monthly Azurite'}
                              />
                            </>
                          )}
                        </Box>
                      ) : (
                        <Typography variant='body1' color='primary' align='left' sx={{ my: '16px', p: 2 }}>
                          You haven't added any items yet.
                        </Typography>
                      )}

                      <Divider sx={{ my: '8px' }} />

                      <Box sx={{ my: '8px' }}>
                        <TextField
                          id='monthly-budget'
                          label='Monthly Budget'
                          variant='outlined'
                          size='small'
                          value={userData?.conf?.budget ?? null}
                          placeholder='0.00'
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>
                          }}
                          sx={{ m: '8px' }}
                          onChange={e => {
                            if (e.target.value > 100000) {
                              return toast.error('Max budget reached. $100,000.00 MAX.')
                            }
                            setUserData(prevState => ({
                              ...prevState,
                              conf: { ...prevState?.conf, budget: e.target.value }
                            }))
                          }}
                        />

                        <Autocomplete
                          multiple
                          id='party-players'
                          options={itemList}
                          size='small'
                          getOptionLabel={option => option.desc}
                          value={userData?.conf?.priority ?? []}
                          onChange={(e, values) => {
                            if (values.length > 10) {
                              return toast.error('Max priorities reached.')
                            }

                            setUserData(prevState => ({
                              ...prevState,
                              conf: { ...prevState?.conf, priority: values }
                            }))
                          }}
                          sx={{ m: '8px' }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant='outlined'
                              label='Priorities (10 MAX)'
                              placeholder='Priority'
                            />
                          )}
                        />
                      </Box>

                      <Divider sx={{ my: '8px' }} />

                      <SaveClear />

                      <Divider sx={{ my: '8px' }} />

                      <Button
                        size='small'
                        variant='contained'
                        color={!showItems ? 'primary' : 'secondary'}
                        onClick={() => setShowItems(!showItems)}
                        sx={{ m: '8px' }}
                      >
                        {showItems ? 'Hide Item List' : 'Show Added Packs List'}
                      </Button>
                    </Box>
                  </>
                </Card>
                {userData?.items?.length > 0 && showItems && (
                  <PackUserList data={userData?.items} deleteRows={handleDeleteRows} />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    ),
    packs: (
      <Box sx={{ m: 1 }}>
        <Grid container spacing={4} sx={{ pl: '1rem', pb: '1rem' }}>
          <Card sx={{ border: 'solid 1px #7a7a7a6e', borderRadius: '8px', width: '100%' }}>
            <CardContent>
              <Tabs
                variant='scrollable'
                selectionFollowsFocus
                value={weekdayTabSelected}
                onChange={handleWeekdaySelected}
                aria-label='packs-menu-tab'
                sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}
              >
                <Tab label='All' sx={{ minWidth: '50px' }} />
                <Tab label='Monday' sx={{ minWidth: '50px' }} />
                <Tab label='Tuesday' sx={{ minWidth: '50px' }} />
                <Tab label='Wednesday' sx={{ minWidth: '50px' }} />
                <Tab label='Thursday' sx={{ minWidth: '50px' }} />
                <Tab label='Friday' sx={{ minWidth: '50px' }} />
                <Tab label='Saturday' sx={{ minWidth: '50px' }} />
                <Tab label='Sunday' sx={{ minWidth: '50px' }} />
                <Tab label='Weekly' sx={{ minWidth: '50px' }} />
                <Tab label='Monthly' sx={{ minWidth: '50px' }} />
              </Tabs>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Paper
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '320px',
                    m: '8px',
                    border: 'solid 1px #7a7a7a6e',
                    borderRadius: '8px'
                  }}
                >
                  <InputBase
                    value={search.search}
                    placeholder='Filter'
                    inputProps={{ 'aria-label': 'filter information' }}
                    onChange={handleFilterSearch}
                    sx={{
                      ml: '8px',
                      p: '0.3rem'
                    }}
                  />
                  <Search />
                  <ClearAll onClick={handleClearSearch} sx={{ mx: '8px' }} />
                </Paper>
                <SaveClear />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', m: '8px' }}>
                <Typography>Legend:</Typography>
                <Box sx={{ border: 'solid 2px #cf9900e0', borderRadius: '8px', width: '100px', m: 1 }}>
                  <Typography variant='caption' sx={{ p: 1 }}>
                    Recommended
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: `solid 2px ${colors.priority?.border}`,
                    borderRadius: '8px',
                    minWidth: '50px',
                    m: 1,
                    background: colors.priority?.background[theme.palette.mode]
                  }}
                >
                  <Typography variant='caption' align='center' sx={{ p: 1 }}>
                    Priority
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: `solid 2px ${colors.selected?.border}`,
                    borderRadius: '8px',
                    minWidth: '50px',
                    m: 1,
                    background: colors.selected?.background[theme.palette.mode]
                  }}
                >
                  <Typography variant='caption' sx={{ p: 1 }}>
                    Checked All
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid container spacing={4}>
          {packsInfo?.map(pack => {
            return (
              <Grid
                key={`${pack?.desc?.toLowerCase()?.replace(' ', '')}-${pack.packId}`}
                item
                xs={12}
                sm={12}
                md={6}
                lg={3}
              >
                <CardPackDetails
                  pack={pack}
                  onCheck={handleCheckClick}
                  onCheckList={handleCheckClickList}
                  userData={userData}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    )
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='packs' title='Packs' />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                mb: '16px',
                mt: '-8px',
                alignItems: 'center'
              }}
            >
              <Alert icon={false} severity='info'>
                Credits to aHTu #1360
              </Alert>
            </Box>
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
                      value='userPacks'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['userPacks'].icon} />
                          {'User'}
                        </Box>
                      }
                    />
                    <Tab
                      value='packs'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon={tabConf['packs'].icon} />
                          {'Packs'}
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
            <Dialog open={openClearDialog} onClose={() => setOpenClearDialog(false)}>
              <DialogTitle>{`REMOVE SAVED DATA`}</DialogTitle>
              <DialogContent>
                <Typography variant='body1' color='textPrimary' align='center'>
                  Are you sure you want to delete all saved data?
                </Typography>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setOpenClearDialog(false)} color='primary'>
                  Cancel
                </Button>
                <Button color='primary' onClick={handleRemoveItems}>
                  YES
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default Packs
