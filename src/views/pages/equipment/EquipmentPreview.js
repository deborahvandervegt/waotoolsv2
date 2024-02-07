import { AddCircle, Clear } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Grid, IconButton, Paper, Typography } from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { styled } from '@mui/system'
import { Icon } from '@iconify/react'

const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[400]),
  backgroundColor: red[400],
  '&:hover': {
    backgroundColor: red[800]
  }
}))

const BlueButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(indigo[400]),
  backgroundColor: indigo[400],
  '&:hover': {
    backgroundColor: indigo[800]
  }
}))

const starIcon = {
  0: 'fluent:star-24-regular',
  25: 'fluent:star-one-quarter-24-regular',
  50: 'fluent:star-half-24-regular',
  75: 'fluent:star-three-quarter-24-regular',
  100: 'fluent:star-24-filled'
}

const qualityInfo = {
  none: { color: '', backgroundColor: '' },
  blue: { color: '#216de7e0', backgroundColor: '#216de729' },
  purple: { color: '#7028dde0', backgroundColor: '#7028dd2b' },
  orange: { color: '#cf893c', backgroundColor: '#cf893c2e' }
}

const colors = {
  primary: '#0e0e0ed6',
  secondary: '#3a354199',
  full: '#12782ad6'
}

const EquipmentPreview = props => {
  const { slot, onRemove, onAddEquipmentOpen } = props
  if (!slot) return

  const equipment = slot.equipment
  const quality = slot?.quality?.toLowerCase() ?? 'none'
  const iconColor = qualityInfo[quality]?.color
  const iconBgColor = qualityInfo[quality]?.backgroundColor

  const handleRemoveEquipment = slot => {
    onRemove(slot)
  }

  const handleAddEquipmentOpenDialog = slot => {
    onAddEquipmentOpen(slot)
  }

  return (
    <Grid key={slot.key} item>
      {equipment?.level > 0 && (
        <Paper
          elevation={12}
          sx={{
            padding: theme => theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            minHeight: '205px',
            minWidth: '125px',
            justifyContent: 'center',
            backgroundColor: iconBgColor

            // border: `${currentSlot?.key === slot?.key ? '5px outset #0278aecc' : ''}`
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 'revert',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Avatar
              alt={slot.slotDesc}
              src={`/images/equipment/${equipment?.desc}.jpg`}
              sx={{ width: '55px', height: '55px' }}
            />
            <Typography variant='body2' sx={{ color: iconColor }}>
              {quality?.charAt(0)?.toUpperCase()}
              {quality?.slice(1)}
            </Typography>
            <Typography variant='body2' color='primary' align='center'>
              Lv.{equipment?.level} | {slot?.slotDesc}
            </Typography>

            <Typography variant='caption' color='primary' align='center' sx={{ color: iconColor }}>
              {equipment?.desc ? equipment?.desc : 'Not selected'}
            </Typography>
            <Divider flexItem light />
            {slot?.eLevel > 0 && (
              <Typography variant='caption' color='primary' align='center' sx={{ color: '#438b4d', maxWidth: '150px' }}>
                {`${slot?.enhancement?.key} ${slot?.eStat}${slot?.eStat?.length > 3 ? '' : '%'}`}
              </Typography>
            )}
            <Divider flexItem light />
            <RedButton
              align='center'
              variant='contained'
              color='secondary'
              size='small'
              startIcon={<Clear />}
              sx={{ marginTop: '5px' }}
              onClick={e => {
                handleRemoveEquipment(slot)
              }}
            >
              REMOVE
            </RedButton>
          </Box>
        </Paper>
      )}
      {!equipment?.level && (
        <Paper
          elevation={6}
          sx={{
            padding: theme => theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            minHeight: '165px',
            minWidth: '125px',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 'revert',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <IconButton
              aria-label='add-equipment'
              onClick={e => {
                handleAddEquipmentOpenDialog(slot)
              }}
            >
              <AddCircle color='primary' sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant='body2' color='primary' align='center'>
              {slot?.slotDesc}
            </Typography>
          </Box>
        </Paper>
      )}
    </Grid>
  )
}

export default EquipmentPreview
