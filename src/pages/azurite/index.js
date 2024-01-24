// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Custom Components Imports
import { azuCalcConf } from 'src/data/building'

// ** Styled Components
import { InfoOutlined } from '@mui/icons-material'
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Switch
} from '@mui/material'
import CustomHeader from 'src/@core/components/Header'
import nRound from 'src/@core/utils/numberRound'

const CustomBox = styled(Box)(({ theme }) => ({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
}))

function renderMessage(type) {
  switch (type) {
    case 'azuriteCard':
      return 'This information is available when you click on Map > Limited > Benefits Pack. '
    case 'royalChallenge':
      return 'This information is available when you run the Royal Challenge on any Ancient ruins, daily.'
    case 'azuriteMine':
      return 'This information is available when you click on Azurite Mine > Details > Azurite Production. (both values summed together)'
    case 'azuriteChest':
      return 'This information is available when you click on Pack > Other. '
    default:
      return ''
  }
}

const defaultValues = { mineHour: 0, rcLevel: 0, card: 0, packs: 0, chests: 0, owned: 0, needed: 0, total: 0 }

const minValues = {
  mineHour: 35,
  rcLevel: 10,
  card: 90,
  packs: 99999,
  chests: 5,
  owned: 999999,
  needed: 999999,
  total: 0
}

const AzuriteCalculator = props => {
  const [azuCalculator, setAzuCalculator] = useState(defaultValues)
  const [openInfo, setOpenInfo] = useState(false)
  const [openInfoData, setOpenInfoData] = useState({ info: '', message: '' })

  const handleCalculatorChange = (e, type, level = undefined) => {
    let newObj = {}
    const enterValue = +e.target.value > minValues[type] ? minValues[type] : +e.target.value
    const enterCheck = e.target.checked
    if (type === 'mineHour') {
      newObj = { ...azuCalculator, mineHour: enterValue }
    } else if (type === 'rcLevel') {
      newObj = { ...azuCalculator, rcLevel: enterValue }
    } else if (type === 'card') {
      newObj = { ...azuCalculator, card: enterCheck }
    } else if (type === 'packs') {
      newObj = { ...azuCalculator, packs: enterValue }
    } else if (type === 'chests') {
      newObj = { ...azuCalculator, chests: enterValue }
    } else if (type === 'owned') {
      newObj = { ...azuCalculator, owned: enterValue }
    } else if (type === 'needed') {
      newObj = { ...azuCalculator, needed: enterValue }
    }

    const total =
      (newObj.mineHour > 0 ? nRound(newObj.mineHour * 24, 2) : 0) +
      (newObj.rcLevel > 0 ? azuCalcConf?.royalChallenge?.find(rc => rc.level === newObj.rcLevel)?.azurite : 0) +
      (newObj.card ? azuCalcConf?.card : 0) +
      (newObj.packs > 0 ? newObj.packs : 0) +
      (newObj.chests > 0 ? newObj.chests * 100 : 0)
    const totalObj = { ...newObj, total: total }

    setAzuCalculator(totalObj)
  }

  const handleDialogOpen = (e, info) => {
    setOpenInfo(true)
    const messageDetail = renderMessage(info)
    setOpenInfoData({ info: info, message: messageDetail })
  }

  const handleDialogClose = (e, slot) => {
    setOpenInfo(false)
  }

  return (
    <>
      <>
        <Card>
          <CustomHeader icon='azurite' title='AZURITE CALCULATOR' />
          <Divider />
          <Grid container spacing={3} style={{ minWidth: '320px', padding: '1rem' }}>
            <Grid item xs={12} md={6} lg={8}>
              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Azurite Mine per Hour:
                  </Typography>
                </Box>
                <TextField
                  id='mine-per-hour'
                  size='small'
                  variant='outlined'
                  type='number'
                  value={azuCalculator.mineHour > 0 ? azuCalculator.mineHour : ''}
                  inputProps={{
                    min: 0,
                    max: 20000
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'mineHour')
                  }}
                />
                <IconButton
                  aria-label='mine-info-button'
                  onClick={e => {
                    handleDialogOpen(e, 'azuriteMine')
                  }}
                >
                  <InfoOutlined color='primary' />
                </IconButton>
              </CustomBox>
              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Royal Challenge Wave(s):
                  </Typography>
                </Box>
                <TextField
                  align='left'
                  id='rc-select'
                  size='small'
                  sx={{ width: '95px' }}
                  variant='outlined'
                  select
                  value={azuCalculator.rcLevel}
                  inputProps={{
                    min: 1,
                    max: 10
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'rcLevel')
                  }}
                >
                  {azuCalcConf?.royalChallenge?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton
                  aria-label='rc-info-button'
                  onClick={e => {
                    handleDialogOpen(e, 'royalChallenge')
                  }}
                >
                  <InfoOutlined color='primary' />
                </IconButton>
              </CustomBox>
              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Monthly Azurite Card:
                  </Typography>
                </Box>
                <Switch
                  checked={azuCalculator?.card ? true : false}
                  onChange={e => {
                    handleCalculatorChange(e, 'card')
                  }}
                  name='monthly-card-checked'
                  color='primary'
                />
                <IconButton
                  aria-label='card-info-button'
                  onClick={e => {
                    handleDialogOpen(e, 'azuriteCard')
                  }}
                >
                  <InfoOutlined color='primary' />
                </IconButton>
              </CustomBox>
              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Azurite from packs (daily):
                  </Typography>
                </Box>
                <TextField
                  id='azurite-from-packs'
                  size='small'
                  variant='outlined'
                  type='number'
                  value={azuCalculator.packs > 0 ? azuCalculator.packs : ''}
                  inputProps={{
                    min: 0,
                    max: 20000
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'packs')
                  }}
                />
              </CustomBox>
              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Azurite Daily Chests:
                  </Typography>
                </Box>
                <TextField
                  align='left'
                  id='chests-select'
                  size='small'
                  sx={{ width: '95px' }}
                  variant='outlined'
                  type='number'
                  select
                  value={azuCalculator.chests}
                  inputProps={{
                    min: 1,
                    max: 5
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'chests')
                  }}
                >
                  {azuCalcConf?.chests?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton
                  aria-label='chest-info-button'
                  onClick={e => {
                    handleDialogOpen(e, 'azuriteChest')
                  }}
                >
                  <InfoOutlined color='primary' />
                </IconButton>
              </CustomBox>

              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Azurite Owned:
                  </Typography>
                </Box>
                <TextField
                  id='azurite-owned'
                  size='small'
                  sx={{ width: '95px' }}
                  variant='outlined'
                  type='number'
                  value={azuCalculator.owned > 0 ? azuCalculator.owned : ''}
                  inputProps={{
                    min: 0,
                    max: 999999
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'owned')
                  }}
                />
              </CustomBox>

              <CustomBox>
                <Box sx={{
                  minWidth: '200px'
                }}>
                  <Typography variant='body2' color='primary' align='left'>
                    Azurite Needed:
                  </Typography>
                </Box>
                <TextField
                  id='azurite-needed'
                  size='small'
                  sx={{ width: '95px' }}
                  variant='outlined'
                  type='number'
                  value={azuCalculator.needed > 0 ? azuCalculator.needed : ''}
                  inputProps={{
                    min: 0,
                    max: 999999
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'needed')
                  }}
                />
              </CustomBox>
              {azuCalculator.owned > 0 && azuCalculator.needed > 0 && (
                <CustomBox>
                  <div style={{ width: '200px', marginRight: '5px' }}>
                    <Typography variant='body2' color='primary' align='left'>
                      Missing Azurite (Needed - Owned):
                    </Typography>
                  </div>
                  <Typography variant='h5' sx={{ marginLeft: '5px' }}>
                    {(azuCalculator.needed - azuCalculator.owned > 0
                      ? azuCalculator.needed - azuCalculator.owned
                      : 'None'
                    ).toLocaleString()}
                  </Typography>
                </CustomBox>
              )}

              <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center'>
                      Azurite Daily:
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {azuCalculator.total.toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                      Azurite Weekly:
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {(azuCalculator.total * 7).toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                      Azurite Monthly (30d):
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {(azuCalculator.total * 30).toLocaleString()}
                  </Typography>
                </div>
                {azuCalculator.needed > 0 &&
                  azuCalculator.needed > azuCalculator.owned &&
                  azuCalculator.total > 0 && (
                    <div>
                      <div style={{ minWidth: '200px' }}>
                        <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                          Days needed to complete missing azurite (Needed - owned)/Daily output:
                        </Typography>
                      </div>
                      <Typography variant='body2' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                        {Math.round(
                          (azuCalculator.needed - azuCalculator.owned) / azuCalculator.total
                        ).toLocaleString()}
                        d to get {(azuCalculator.needed - azuCalculator.owned).toLocaleString()} azurite.
                      </Typography>
                    </div>
                  )}
              </div>
            </Grid>
          </Grid>
        </Card>
        <Dialog fullWidth open={openInfo} onClose={handleDialogClose}>
          <DialogTitle>{`Info`}</DialogTitle>
          <DialogContent>
            <form>
              <FormControl>
                <Typography variant='body2' color='textPrimary' align='justify' style={{ marginLeft: '10px' }}>
                  {openInfoData?.message}
                </Typography>
                <Divider light />
                <div style={{ marginBottom: '10px' }}></div>
                <CardMedia
                  image={`/images/azurite/${openInfoData?.info}.jpg`}
                  title={openInfoData?.info}
                  sx={{
                    minHeight: '320px',
                    maxWidth: '370px',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain'
                  }}
                />
                <div
                  style={{
                    height: '64px',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    filter: 'contrast(75%)',
                    backgroundImage: `url('/img/azurite/${openInfoData?.info}.jpg}'`,
                    position: 'absolute',
                    top: '0px',
                    width: '100%',
                    zIndex: -2
                  }}
                />
              </FormControl>
            </form>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleDialogClose} color='primary'>
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  )
}

export default AzuriteCalculator
