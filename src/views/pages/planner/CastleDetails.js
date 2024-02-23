// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
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
  const { castle, extra, totalProgress } = props

  return (
    <Card variant='outlined' sx={{ my: 3 }}>
      <CardContent sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {/* Castle */}
          <Grid item xs={6} sm={3} md={2} lg={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Grid>

          {/* Troops Tier */}
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar
                variant='rounded'
                color=''
                sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
              >
                {<Icon icon='game-icons:rally-the-troops' />}
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Troops Tier</Typography>
                <Typography variant='h6'>{`${tierList[extra?.tier]}`}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Angels Tier */}
          <Grid item xs={6} sm={6} md={2} lg={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar
                variant='rounded'
                color=''
                sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
              >
                {<Icon icon='game-icons:angel-wings' />}
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Angels Tier</Typography>
                <Typography variant='h6'>{`${tierList[extra?.angelTier]}`}</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Completition Progress */}
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar
                variant='rounded'
                color=''
                sx={{ mr: 3, boxShadow: 3, width: 44, height: 44, '& svg': { fontSize: '1.75rem', color: '#0278AE' } }}
              >
                {<Icon icon='game-icons:progression' />}
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='caption'>Castle Completion (T14 Backline)</Typography>
                <Typography variant='h6'>{Math.round(totalProgress)}%</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CastleDetails
