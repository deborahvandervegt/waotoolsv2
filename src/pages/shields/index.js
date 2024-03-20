// ** React Imports
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createTheme, styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Custom Components Imports

import {
  Button,
  Divider
} from '@mui/material'
import CustomHeader from 'src/@core/components/Header'

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
  const [realmNumber, setRealmNumber] = useState("")

  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("realmNumber") || ""
    setRealmNumber(value)
  }, [])

  const handleSaveData = e => {
    localStorage.setItem("realmNumber", realmNumber)
    console.log(realmNumber)

    return toast.success('Data successfully stored in the browser!')
  }

  return (
    <>
      <>
        <Card>
          <CustomHeader icon='shields' title='SHIELDS' />
          <Divider />
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
        </Card>
      </>
    </>
  )
}

export default ShieldsTracker
