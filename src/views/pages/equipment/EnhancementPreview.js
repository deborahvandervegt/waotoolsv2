import { AddCircle, AttachMoney, BarChart, Clear } from '@mui/icons-material'
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@mui/material'
import { indigo, red } from '@mui/material/colors'
import { styled } from '@mui/system'
import { useState } from 'react'

// ** Custom Imports
import { enhancementsData, enhancementsEquipment, packsData } from 'src/data/equipment'
import { round } from 'src/utils/round'

// ** Custom Style
const BoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 'revert',
  alignContent: 'center',
  justifyContent: 'flex-start',
  alignItems: 'center'
}))

// ** Custom Variables
const qualityInfo = {
  none: { color: '', backgroundColor: '' },
  blue: { color: '#216de7e0', backgroundColor: '#216de729' },
  purple: { color: '#7028dde0', backgroundColor: '#7028dd2b' },
  orange: { color: '#cf893c', backgroundColor: '#cf893c2e' }
}

const EnhancementPreview = props => {
  const { slot, onEnhancementChange, onEnhancementLevelChange, onSnackAction } = props
  if (!slot) return

  const equipment = slot.equipment
  const quality = slot?.quality?.toLowerCase() ?? 'none'
  const iconColor = qualityInfo[quality]?.color
  const iconBgColor = qualityInfo[quality]?.backgroundColor
  const packPrice = packsData.find(p => p.key === 'obsidian')

  const handleEnhancementChange = (e, slot) => {
    onEnhancementChange(e.target.value, slot)
  }

  const handleEnhancementLevelChange = (e, slot) => {
    onEnhancementLevelChange(e, slot)
  }

  const handleSnack = props => {
    onSnackAction(props)
  }

  return (
    <Grid key={slot.key} item>
      <Paper
        sx={{
          backgroundColor: iconBgColor,
          padding: theme => theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
        elevation={4}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 'revert',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 'revert',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              minWidth: '81px'
            }}
          >
            <Typography variant='body1' color='primary' align='center'>
              {slot.slotDesc}
            </Typography>
            <Typography variant='body2' color='primary' align='center'>
              Lv.{equipment?.level}
            </Typography>
            {equipment?.desc?.length > 0 && (
              <Avatar
                alt={slot?.slotDesc}
                src={`/images/equipment/${equipment?.desc}.jpg`}
                sx={{ height: '55px', width: '55px' }}
              />
            )}
          </Box>

          <Divider flexItem variant='inset' orientation='vertical' sx={{ marginLeft: '5px', marginRight: '5px' }} />
          <BoxContainer
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 'revert',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <Box>
              <Typography variant='body1' color='primary' align='center' sx={{ color: iconColor, marginLeft: '5px' }}>
                {equipment?.desc?.length > 0 ? equipment?.desc : 'Not selected'}
              </Typography>
            </Box>

            <Divider flexItem sx={{ marginBottom: '10px', marginTop: '5px' }} />

            <Box>
              <TextField
                align='left'
                select
                size='small'
                label={`Enhancement:`}
                id={'slot-select-enhancement-' + slot.key}
                defaultValue={''}
                variant='outlined'
                value={slot?.enhancement?.key ?? ''}
                type='info'
                sx={{ minWidth: '305px', marginBottom: '8px' }}
                onChange={e => {
                  const value = e.target.value
                  const type = enhancementsData?.find(e => e.key === value)?.type

                  if (type === 'gol') {
                    return handleSnack({
                      open: `If you're checking this, you should really UNINSTALL the game asap. Cheers.`,
                      type: 'warning'
                    })
                  } else {
                    handleEnhancementChange(e, slot)
                  }
                }}
              >
                {enhancementsEquipment
                  ?.find(e => e.key === slot?.key)
                  ?.enhancements?.map(option => (
                    <MenuItem key={option.desc} value={option.desc}>
                      {option.desc}
                    </MenuItem>
                  ))}
              </TextField>
            </Box>

            <BoxContainer>
              <TextField
                disabled={!slot?.enhancement?.key ?? false}
                align='left'
                label='Level'
                id={`level-enancement-select-${slot.key}`}
                size='small'
                variant='outlined'
                type='number'
                select
                value={slot?.eLevel}
                sx={{ width: '80px' }}
                inputProps={{
                  min: 0,
                  max: 30
                }}
                onChange={e => {
                  const level = +e.target.value
                  if (slot?.enhancement?.type === 'gol') {
                    return handleSnack({
                      open: `If you're checking this, you should really UNINSTALL the game asap. Cheers.`,
                      type: 'warning'
                    })
                  } else {
                    handleEnhancementLevelChange(level, slot)
                  }
                }}
              >
                {Array.from(Array(quality === 'Purple' ? 20 : 30), (_, i) => i + 1)
                  .map(n => {
                    return { level: n }
                  })
                  .filter(n => n.level > 0)
                  .map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
              </TextField>
              {slot?.eStat > 0 && (
                <BoxContainer>
                  <BoxContainer sx={{ minWidth: '15px', marginLeft: '5px' }}>
                    <BarChart />
                    <Typography variant='h5' color='primary' align='center'>
                      {`${slot?.eStat}${slot?.eStat?.length > 3 ? '' : '%'}`}
                    </Typography>
                  </BoxContainer>
                  <BoxContainer sx={{ minWidth: '15px', marginLeft: '8px' }}>
                    <AttachMoney />
                    <Typography variant='body1' color='primary' align='center'>
                      {`${round((slot?.obsidian / packPrice.qty) * packPrice.price, 0)?.toLocaleString()}+-`}
                    </Typography>
                  </BoxContainer>
                </BoxContainer>
              )}
            </BoxContainer>

            {slot?.eStat > 0 && <Divider flexItem sx={{ marginBottom: '5px', marginTop: '5px' }} />}
            <BoxContainer>
              {slot?.eStat > 0 && (
                <>
                  <Typography variant='caption' color='primaryText' align='center' sx={{ marginLeft: '7px' }}>
                    Obsidian needed for Next Level:
                  </Typography>
                  <Typography variant='body2' color='primary' align='center' sx={{ marginLeft: '7px' }}>
                    {slot?.obsidianNext?.toLocaleString()}
                  </Typography>
                </>
              )}
            </BoxContainer>
            <BoxContainer>
              {slot?.eStat > 0 && (
                <>
                  <Typography variant='caption' color='primaryText' align='center' sx={{ marginLeft: '7px' }}>
                    Obsidian needed from Lv1 to this Level:
                  </Typography>
                  <Typography variant='body2' color='primary' align='center' sx={{ marginLeft: '7px' }}>
                    {slot?.obsidian?.toLocaleString()}
                  </Typography>
                </>
              )}
            </BoxContainer>
            <BoxContainer>
              {slot?.eStat > 0 && (
                <>
                  <Typography variant='caption' color='primaryText' align='center' sx={{ marginLeft: '7px' }}>
                    Obsidian needed from this Level to MAX:
                  </Typography>
                  <Typography variant='body2' color='primary' align='center' sx={{ marginLeft: '7px' }}>
                    {slot?.obsidianMax?.toLocaleString()}
                  </Typography>
                </>
              )}
            </BoxContainer>
          </BoxContainer>
        </Box>
      </Paper>
    </Grid>
  )
}

export default EnhancementPreview
