// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import {
  Box,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  DialogContent,
  Dialog,
  DialogActions,
  Fade,
  TextField,
  MenuItem
} from '@mui/material'
import toast from 'react-hot-toast'

// Styled component for the triangle shaped background image
const CustomBox = styled(Box)(({ theme }) => ({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TriangleImg = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute',
  ...(theme.direction === 'rtl' ? { transform: 'scaleX(-1)' } : {})
}))

const getDetails = {
  angel: { icon: 'game-icons:angel-outfit', color: 'warning' },
  infantry: { icon: 'game-icons:orc-head', color: 'error' },
  cavalry: { icon: 'game-icons:horse-head', color: 'error' },
  archer: { icon: 'game-icons:pocket-bow', color: 'info' },
  mage: { icon: 'mdi:wizard-hat', color: 'info' }
}

const UserInfoChart = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'
  const [openDialog, setOpenDialog] = useState(false)

  const [userInfo, setUserInfo] = useState({
    realm: '1286',
    player: 'oNare',
    frontline: 'Infantry',
    backline: 'Mage'
  })

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('userInfo'))
    }

    if (saved) {
      setUserInfo(saved)
    }
  }, [])

  const handleClick = () => {
    setOpenDialog(true)
  }

  const handleSave = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    setOpenDialog(false)

    return toast.success('Data successfully stored in the browser!')
  }

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant='h6'>
            Welcome {userInfo.player}! {<Icon icon='emojione:castle' color='primary' />}
          </Typography>
        }
        action={
          <Button size='small' onClick={handleClick}>
            Edit Info
          </Button>
        }
      />
      <CardContent>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          You are currently playing in the realm {<span style={{ fontWeight: 800 }}>#{userInfo.realm}</span>}
        </Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          Your main troops type:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Icon icon={getDetails[userInfo.frontline.toLowerCase()].icon} fontSize={30} style={{ color: '#0278AE' }} />
            <Typography variant='body1' sx={{ my: 4, color: 'primary.main', ml: '6px' }}>
              {userInfo.frontline}
            </Typography>
            <Typography variant='body2' sx={{ my: 4, ml: '6px' }}>
              and
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: '8px' }}>
            <Icon icon={getDetails[userInfo.backline.toLowerCase()].icon} fontSize={30} style={{ color: '#0278AE' }} />
            <Typography variant='body1' sx={{ my: 4, color: 'primary.main', ml: '6px' }}>
              {userInfo.backline}
            </Typography>
          </Box>
        </Box>

        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        {/* <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> */}
      </CardContent>

      {/* Dialog | EDIT INFO */}
      <Dialog
        open={openDialog}
        scroll='body'
        onClose={e => {
          setOpenDialog(false)
        }}
        TransitionComponent={Transition}
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
            onClick={e => {
              setOpenDialog(false)
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
              Edit User information.
            </Typography>
            <CustomBox>
              <Box sx={{ marginRight: '5px' }}>
                <Typography variant='body2' color='primary' align='right'>
                  Player:
                </Typography>
              </Box>
              <TextField
                align='left'
                id='player-select'
                size='small'
                variant='outlined'
                value={userInfo?.player?.length > 0 ? userInfo?.player : ''}
                onChange={e => {
                  const player = e.target.value?.substring(0, 24)
                  setUserInfo(prev => ({ ...prev, player: player }))
                }}
              />
            </CustomBox>
            <CustomBox>
              <Box sx={{ marginRight: '5px' }}>
                <Typography variant='body2' color='primary' align='right'>
                  Realm:
                </Typography>
              </Box>
              <TextField
                align='left'
                id='realm-select'
                size='small'
                variant='outlined'
                value={userInfo?.realm?.length > 0 ? userInfo?.realm : ''}
                onChange={e => {
                  const realm = e.target.value?.substring(0, 4)
                  setUserInfo(prev => ({ ...prev, realm: realm }))
                }}
              />
            </CustomBox>
            <CustomBox>
              <Box sx={{ marginRight: '5px' }}>
                <Typography variant='body2' color='primary' align='right'>
                  Frontline:
                </Typography>
              </Box>
              <TextField
                align='left'
                id='frontline-select'
                size='small'
                variant='outlined'
                select
                value={userInfo?.frontline?.length > 0 ? userInfo?.frontline : ''}
                onChange={e => {
                  setUserInfo(prev => ({ ...prev, frontline: e.target.value }))
                }}
              >
                <MenuItem key='infantry' value='Infantry'>
                  Infantry
                </MenuItem>
                <MenuItem key='cavalry' value='Cavalry'>
                  Cavalry
                </MenuItem>
              </TextField>
            </CustomBox>
            <CustomBox>
              <Box sx={{ marginRight: '5px' }}>
                <Typography variant='body2' color='primary' align='right'>
                  Backline:
                </Typography>
              </Box>
              <TextField
                align='left'
                id='backline-select'
                size='small'
                variant='outlined'
                select
                value={userInfo?.backline?.length > 0 ? userInfo?.backline : ''}
                onChange={e => {
                  setUserInfo(prev => ({ ...prev, backline: e.target.value }))
                }}
              >
                <MenuItem key='infantry' value='Archer'>
                  Archer
                </MenuItem>
                <MenuItem key='mage' value='Mage'>
                  Mage
                </MenuItem>
              </TextField>
            </CustomBox>
          </Box>
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button color='primary' onClick={() => setOpenDialog(false)}>
            CLOSE
          </Button>
          <Button color='primary' onClick={handleSave}>
            SAVE
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default UserInfoChart
