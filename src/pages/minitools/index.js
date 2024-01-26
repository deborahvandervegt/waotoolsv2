// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Snackbar,
  Tab,
  useMediaQuery
} from '@mui/material'
import { green, red } from '@mui/material/colors'
import { TabContext, TabPanel } from '@mui/lab'
import { Clear, Refresh, Save } from '@mui/icons-material'

// ** Styled component
const CustomBox = styled(Box)(({ theme }) => ({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
}))

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

// ** Custom Vars
const defaultTier = 12

const infoData = [
  {
    slot: 1,
    key: 'angelDust',
    desc: 'Angel Dust Calculator',
    info: { al: 0, aq: 0, tier: 0, dust: 0, missing: 0 },
    conf: {
      angelTiers: [
        { l: 13, dust: 92 },
        { l: 12, dust: 78 },
        { l: 11, dust: 66 },
        { l: 10, dust: 56 },
        { l: 9, dust: 47 },
        { l: 8, dust: 39 },
        { l: 7, dust: 31 },
        { l: 6, dust: 23 },
        { l: 5, dust: 15 }
      ]
    }
  }
]

/* eslint-enable */
const Minitools = () => {
  // ** State
  const [activeTab, setActiveTab] = useState('angelDust')
  const [isLoading, setIsLoading] = useState(false)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [snackOpen, setSnackOpen] = useState({ open: false, type: '' })
  const [mtData, setMtData] = useState([...infoData])

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('mtData'))
    }

    if (saved) setMtData(saved)
    setIsLoading(false)
  }, [])

  const handleSaveData = e => {
    localStorage.setItem('mtData', JSON.stringify(mtData))
    setSnackOpen({ open: `Information Saved.`, type: 'success' })
  }

  const handleRemoveItems = e => {
    setMtData([...infoData])
    localStorage.removeItem('mtData')
    setSnackOpen({ open: `Information Cleared.`, type: 'error' })
  }

  const handleUserConfig = (value, tool, input) => {
    let newMtDataConf
    let mtDataTool = mtData?.find(t => t.key === tool)

    if (input === 'angelLimit') newMtDataConf = { ...mtDataTool.info, al: value }
    if (input === 'angelQty') newMtDataConf = { ...mtDataTool.info, aq: value }
    if (input === 'angelMissing') newMtDataConf = { ...mtDataTool.info, missing: value }
    if (input === 'angelTier') newMtDataConf = { ...mtDataTool.info, tier: value }

    if (mtDataTool.info.tier === 0) newMtDataConf = { ...mtDataTool.info, tier: defaultTier }

    const newMtData = mtData.map(t => (t.key === tool ? { ...mtDataTool, info: newMtDataConf } : t))

    setMtData(newMtData)
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

  const tabContentList = {
    angelDust: (
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
            <Grid container spacing={3} sx={{ minWidth: '320px', padding: '1rem' }}>
              <Grid key={'header-totem'} item xs={12}>
                <Typography
                  variant='h5'
                  color='primary'
                  align='center'
                  sx={{ marginBottom: '10px', marginTop: '10px' }}
                >
                  {'ANGEL DUST CALCULATOR'}
                </Typography>
                <Divider sx={{ marginBottom: '5px' }} />
                <Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
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
                    <Divider sx={{ marginLeft: '5px' }} />

                    <Tooltip title={'Clear all the inputs.'}>
                      <RedButton
                        edge='start'
                        color='primary'
                        variant='contained'
                        startIcon={<Clear />}
                        onClick={handleRemoveItems}
                      >
                        CLEAR INFO
                      </RedButton>
                    </Tooltip>
                  </Box>
                  <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
                  <Box sx={{ marginLeft: '15px' }}>
                    <CustomBox>
                      <Box
                        sx={{
                          minWidth: '200px'
                        }}
                      >
                        <Typography variant='body2' color='primary' align='left'>
                          Max Angel Limit:
                        </Typography>
                      </Box>

                      <TextField
                        id='angels-limit'
                        size='small'
                        variant='outlined'
                        type='number'
                        inputProps={{
                          min: 0,
                          max: 150000
                        }}
                        value={
                          mtData?.find(d => d.key === activeTab)?.info?.al > 0
                            ? mtData?.find(d => d.key === activeTab)?.info?.al
                            : ''
                        }
                        onChange={e => {
                          const value = +e.target.value >= 155000 ? 155000 : +e.target.value
                          handleUserConfig(value, activeTab, 'angelLimit')
                        }}
                      />
                    </CustomBox>

                    <Box sx={{ marginBottom: '8px' }} />

                    <CustomBox>
                      <Box
                        sx={{
                          minWidth: '200px'
                        }}
                      >
                        <Typography variant='body2' color='primary' align='left'>
                          Current Angel Quantity:
                        </Typography>
                      </Box>

                      <TextField
                        id='angels-quantity-limit'
                        size='small'
                        variant='outlined'
                        type='number'
                        disabled={mtData?.find(d => d.key === activeTab)?.info?.al > 0 ? false : true}
                        value={
                          mtData?.find(d => d.key === activeTab)?.info?.aq > 0
                            ? mtData?.find(d => d.key === activeTab)?.info?.aq
                            : ''
                        }
                        inputProps={{
                          min: 0,
                          max: 155000
                        }}
                        onChange={e => {
                          const value =
                            +e.target.value >= mtData?.find(d => d.key === activeTab)?.info?.al
                              ? mtData?.find(d => d.key === activeTab)?.info?.al
                              : +e.target.value
                          handleUserConfig(value, activeTab, 'angelQty')
                        }}
                      />
                    </CustomBox>
                    <Box sx={{ marginBottom: '8px' }}></Box>

                    <CustomBox>
                      <Box
                        sx={{
                          minWidth: '200px'
                        }}
                      >
                        <Typography variant='body2' color='primary' align='left'>
                          Angel Tier:
                        </Typography>
                      </Box>

                      <TextField
                        defaultValue={12}
                        align='center'
                        label='Tier'
                        id='load-tier-angel-select'
                        size='small'
                        variant='outlined'
                        value={
                          mtData?.find(d => d.key === activeTab)?.info?.tier > 0
                            ? mtData?.find(d => d.key === activeTab)?.info?.tier
                            : defaultTier
                        }
                        select
                        onChange={e => {
                          const value = +e.target.value
                          handleUserConfig(value, activeTab, 'angelTier')
                        }}
                      >
                        {mtData
                          .find(d => d.key === activeTab)
                          ?.conf?.angelTiers?.map(option => (
                            <MenuItem key={option.l} value={option.l}>
                              {option.l}
                            </MenuItem>
                          ))}
                      </TextField>
                    </CustomBox>
                    <Box sx={{ marginBottom: '8px' }} />

                    <CustomBox>
                      <Box
                        sx={{
                          minWidth: '200px'
                        }}
                      >
                        <Typography variant='body2' color='primary' align='left'>
                          How many do you need?
                        </Typography>
                      </Box>

                      <TextField
                        id='angels-missing-limit'
                        size='small'
                        variant='outlined'
                        type='number'
                        inputProps={{
                          min: 0,
                          max: 155000
                        }}
                        defaultValue={
                          mtData?.find(d => d.key === activeTab)?.info?.al > 0
                            ? mtData?.find(d => d.key === activeTab)?.info?.al -
                              mtData?.find(d => d.key === activeTab)?.info?.aq
                            : null
                        }
                        value={
                          mtData?.find(d => d.key === activeTab)?.info?.missing > 0
                            ? mtData?.find(d => d.key === activeTab)?.info?.missing
                            : mtData?.find(d => d.key === activeTab)?.info?.al -
                              mtData?.find(d => d.key === activeTab)?.info?.aq
                        }
                        onChange={e => {
                          const value =
                            +e.target.value >=
                            mtData?.find(d => d.key === activeTab)?.info?.al -
                              mtData?.find(d => d.key === activeTab)?.info?.aq
                              ? mtData?.find(d => d.key === activeTab)?.info?.al -
                                mtData?.find(d => d.key === activeTab)?.info?.aq
                              : +e.target.value
                          handleUserConfig(value, activeTab, 'angelMissing')
                        }}
                      />
                    </CustomBox>
                  </Box>
                  <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />

                  <Box sx={{ marginLeft: '15px' }}>
                    <CustomBox>
                      <Box
                        sx={{
                          minWidth: '200px'
                        }}
                      >
                        <Typography variant='body2' color='primary' align='left'>
                          Total Angel Dust Needed:
                        </Typography>
                      </Box>
                      <Typography variant='h5' color='textPrimary' align='left'>
                        {(mtData?.find(d => d.key === activeTab)?.info?.missing > 0
                          ? mtData
                              ?.find(d => d.key === activeTab)
                              ?.conf?.angelTiers?.find(a => a.l === mtData?.find(d => d.key === activeTab)?.info?.tier)
                              ?.dust * mtData?.find(d => d.key === activeTab)?.info?.missing
                          : 0
                        ).toLocaleString()}
                      </Typography>
                    </CustomBox>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <Button
                        variant='contained'
                        startIcon={<Refresh />}
                        sx={{ marginLeft: '10px' }}
                        disabled={
                          mtData?.find(d => d.key === activeTab)?.info?.al > 0 &&
                          mtData?.find(d => d.key === activeTab)?.info?.aq > 0
                            ? false
                            : true
                        }
                        onClick={() => {
                          const missing =
                            mtData?.find(d => d.key === activeTab)?.info?.al -
                            mtData?.find(d => d.key === activeTab)?.info?.aq
                          handleUserConfig(missing, activeTab, 'angelMissing')
                        }}
                      >
                        REFRESH
                      </Button>
                    </Box>
                  </Box>
                </Box>
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
            <CustomHeader icon='minitools' title='MINITOOLS' />
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
                      value='angelDust'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='game-icons:angel-outfit' />
                          {'Angel Dust'}
                        </Box>
                      }
                    />
                    {/* <Tab
                      value='calculator'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='ion:stats-chart-sharp' />
                          {'Calculator'}
                        </Box>
                      }
                    /> */}
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

export default Minitools
