import { useState } from 'react'
import { AddCircle, Clear } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  ListSubheader,
  MenuItem,
  Paper,
  Rating,
  TextField,
  Typography
} from '@mui/material'
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
  none: {},
  blue: { color: '#216de7e0', backgroundColor: '#216de729' },
  purple: { color: '#7028dde0', backgroundColor: '#7028dd2b' },
  orange: { color: '#cf893c', backgroundColor: '#cf893c2e' }
}

const colors = {
  primary: '#0e0e0ed6',
  secondary: '#3a354199',
  full: '#12782ad6'
}

const ArtifactPreview = props => {
  const { slot, currentSlot, onEdit, onRemove, onAddArtifactOpen } = props
  if (!slot) return

  const artifact = slot.artifact
  const quality = artifact?.quality?.toLowerCase() ?? 'none'
  const iconColor = qualityInfo[quality].color
  const iconBgColor = qualityInfo[quality].backgroundColor

  const artifactInput =
    Object.keys(slot.artifactDetails).length > 0
      ? slot.artifactDetails
      : {
          star: 1,
          rank: 0,
          expLevel: 1,
          levelMin: 1,
          levelMax: artifact?.maxLevel
        }

  const handleRemoveArtifact = slot => {
    onRemove(slot)
  }

  const handleEditArtifact = slot => {
    onEdit(slot)
  }

  const handleAddArtifactOpenDialog = slot => {
    onAddArtifactOpen(slot)
  }

  return (
    <Grid key={slot.key} item>
      {artifact?.key && (
        <Paper
          elevation={currentSlot.key === slot.key ? 24 : 0}
          sx={{
            padding: theme => theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            minHeight: '205px',
            minWidth: '125px',
            justifyContent: 'center',
            backgroundColor: iconBgColor,
            border: `${currentSlot.key === slot.key ? '5px outset #0278aecc' : ''}`
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
              alt={artifact?.key}
              src={`/images/artifacts/${artifact?.key}.png`}
              sx={{ width: '55px', height: '55px' }}
            />
            <Typography variant='body2' color='primary' align='center'>
              Lv.{artifactInput?.expLevel} / {artifact?.maxLevel}
            </Typography>

            <Box key={`header-icons-${slot.key}`} sx={{ marginLeft: '5px' }}>
              {artifact?.starsGeneral?.map(star => {
                const starPercent = artifactInput?.star >= star.star ? 100 : 0

                return (
                  <>
                    <Icon key={star.s} fontSize={20} icon={starIcon[starPercent]} style={{ color: `${iconColor}` }} />
                  </>
                )
              })}
            </Box>
            <Typography variant='caption' color='primary' align='center'>
              {artifact?.desc ? artifact?.desc : 'Not selected'}
            </Typography>
            <Divider light />
            <BlueButton
              align='center'
              variant='contained'
              color='secondary'
              disabled={currentSlot.key === slot.key ? true : false}
              size='small'
              startIcon={currentSlot.key === slot.key ? null : <Clear />}
              onClick={e => {
                handleEditArtifact(slot)
              }}
            >
              {currentSlot.key === slot.key ? 'SELECTED' : 'EDIT'}
            </BlueButton>

            <Button
              align='center'
              variant='text'
              color='error'
              size='small'
              sx={{ marginTop: '5px' }}
              onClick={e => {
                handleRemoveArtifact(slot)
              }}
            >
              REMOVE
            </Button>
          </Box>
        </Paper>
      )}
      {!artifact?.key && (
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
              aria-label='add-artifact'
              onClick={e => {
                handleAddArtifactOpenDialog(slot)
              }}
            >
              <AddCircle color='primary' sx={{ fontSize: 50 }} />
            </IconButton>
            <Typography variant='body2' color='primary' align='center'>
              Add Artifact
            </Typography>
          </Box>
        </Paper>
      )}
    </Grid>
  )
}

export default ArtifactPreview
