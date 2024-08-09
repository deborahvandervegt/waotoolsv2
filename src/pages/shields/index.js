// ** React Imports
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { createTheme, styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Custom Components Imports

import { Button, Divider, Tab, useMediaQuery, CircularProgress } from '@mui/material'
import CustomHeader from 'src/@core/components/Header'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import MuiTabList from '@mui/lab/TabList'

// ** Styled component for the link in the dataTable
const theme = createTheme()

const CustomBox = styled(Box)(({ theme }) => ({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
}))

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.skyPaletteTertiary,
  color: theme.palette.customColors.skyPaletteTitle,
  '&:hover': {
    backgroundColor: theme.palette.customColors.skyPaletteTertiary,
    filter: 'brightness(0.85)'
  }
}))

const ShieldsTracker = props => {
  const [realmNumber, setRealmNumber] = useState('')
  const [shieldName, setShieldName] = useState('')
  const [activeTab, setActiveTab] = useState('my-shields')
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem('realmNumber') || ''
    setRealmNumber(value)

    let name
    // Get the value from local storage if it exists
    name = localStorage.getItem('shieldName') || ''
    setShieldName(name)

    setActiveTab('myShields')
    setIsLoading(false)
  }, [])

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  const handleSaveData = e => {
    localStorage.setItem('realmNumber', realmNumber)
    localStorage.setItem('shieldName', shieldName)

    return toast.success('Data successfully stored in the browser!')
  }

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

  const tabContentList = {
    myShields: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} sx={{ minWidth: '320px', padding: '1rem' }}>
              <Grid item xs={12} md={6} lg={8}>
                <CustomBox>
                  <Box
                    sx={{
                      minWidth: '200px'
                    }}
                  >
                    <Typography variant='body2' color='primary' align='left'>
                      Realm:
                    </Typography>
                  </Box>
                  <TextField
                    id='realm-number'
                    size='small'
                    variant='outlined'
                    type='number'
                    value={realmNumber}
                    onChange={e => setRealmNumber(e.target.value)}
                  />
                </CustomBox>
                <CustomBox>
                  <Box
                    sx={{
                      minWidth: '200px'
                    }}
                  >
                    <Typography variant='body2' color='primary' align='left'>
                      Shield Name:
                    </Typography>
                  </Box>
                  <TextField
                    id='shield-name'
                    size='small'
                    variant='outlined'
                    type='text'
                    value={shieldName}
                    onChange={e => setShieldName(e.target.value)}
                  />
                </CustomBox>
                <CustomBox>
                  <Box
                    sx={{
                      minWidth: '200px'
                    }}
                  >
                    <Typography variant='body2' color='primary' align='left'>
                      Server Time New Shield:
                    </Typography>
                  </Box>
                </CustomBox>
                <br></br>
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
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    ),
    enemyShields: (
      <>
        <Card>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} sx={{ padding: '0.5em' }}>
              <Grid item xs={12}>
                <Typography align='center' variant='h6' color='primary' sx={{ paddingTop: '0.5em' }}>
                  Enemy Shields
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </>
    )
  }

  return (
    <>
      <>
        <Card>
          <CustomHeader icon='shields' title='SHIELDS' />
          <Divider />
          <Grid container spacing={6} sx={{ padding: '1rem' }}>
            <Grid item xs={12} sm={12}>
              <Typography variant='body2'>
                Keep track of your own shields across realms by entering the server time on which you set your new
                shield and the shield length. Or keep an eye on your enemies when you see them shield and get your
                warning on various shield lengths.
              </Typography>
              <Grid item xs={12} sm={6}>
                <br></br>
                <Alert severity='warning'>
                  {`After each modification (add, edit or delete) please, use the `}
                  {
                    <span role='img' aria-labelledby='floppy-disk'>
                      {`💾`}
                    </span>
                  }{' '}
                  {`button before refreshing or leaving the page.`}
                </Alert>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <br></br>
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
                      value='myShields'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='material-symbols:security' />
                          {'My Shields'}
                        </Box>
                      }
                    />
                    <Tab
                      value='enemyShields'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='material-symbols:security' />
                          {'Enemy Shields'}
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
      </>
    </>
  )
}

export default ShieldsTracker
