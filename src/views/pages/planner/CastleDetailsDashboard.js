// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

const tierList = {
  None: ' - ',
  8: 'XIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII',
  13: 'XIII',
  14: 'XIV - Frontline',
  142: 'XIV - Backline'
}

const CastleDetails = props => {
  const { castle, extra, totalProgress, planInfo } = props

  return (
    <Box sx={{ padding: '0.875rem' }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: '1rem' }}
      >
        {/* Castle */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <CustomAvatar
            variant='rounded'
            color=''
            sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
          >
            {<Icon icon='emojione-monotone:castle' />}
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Castle</Typography>
            <Typography variant='h6'>{castle?.castle?.v}</Typography>
          </Box>
        </Box>

        {/* Troops Tier */}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <CustomAvatar
            variant='rounded'
            color=''
            sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
          >
            {<Icon icon='game-icons:rally-the-troops' />}
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Troops </Typography>
            <Typography variant='h6'>{`${tierList[extra?.tier]}`}</Typography>
          </Box>
        </Box>

        {/* Angels Tier */}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <CustomAvatar
            variant='rounded'
            color=''
            sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
          >
            {<Icon icon='game-icons:angel-wings' />}
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Angels</Typography>
            <Typography variant='h6'>{`${tierList[extra?.angelTier]}`}</Typography>
          </Box>
        </Box>

        {/* Completition Progress */}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <CustomAvatar
            variant='rounded'
            color=''
            sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
          >
            {<Icon icon='game-icons:progression' />}
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Progress</Typography>
            <Typography variant='h6'>{Math.round(totalProgress)}%</Typography>
          </Box>
        </Box>

        {/* Daily Azurite */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, mt: 2 }}>
          <CustomAvatar
            variant='rounded'
            color=''
            sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
          >
            {<Icon icon='game-icons:crystal-growth' />}
          </CustomAvatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Daily Azurite</Typography>
            <Typography variant='h6'> {planInfo?.azuCalculator?.total.toLocaleString()}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CastleDetails
