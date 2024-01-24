// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardMenu from 'src/@core/components/card-menu/index'
import { menuList } from '../data/general/menu'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import { Box, Button, Paper, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'

const PurpleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#0278AE'),
  marginTop: '8px',
  background: 'linear-gradient(to right, #265faf, #1c5db9,#10499b, #043987)!important;',
  '&:hover': {
    background: 'linear-gradient(to right, #8852ff, #632ecb, #4e19c1, #381683)!important'
  }
}))

const Home = () => {
  const router = useRouter()

  return (
    <ApexChartWrapper>
      <Grid container spacing={6} columns={8}>
        <Grid key='welcome-header' item xs={12}>
          <Paper elevation={12} sx={{ padding: '1.5rem', paddingLeft: '2.5rem' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography variant='body2' sx={{ marginRight: '2px' }}>
                Welcome to,
              </Typography>
              <Typography variant='h5' color='primary'>
                WAO Tools v2
              </Typography>
              <Typography variant='caption' align='center'>
                A webapp designed to make your journey through WaO less painful, giving you the ability to make plans
                and information to know what you need to get or do in order to grow your castle stronger. If you want to
                continue supporting this website and project, go and buy us some coffees here:
              </Typography>
              <PurpleButton
                variant='contained'
                onClick={e => {
                  router.push('/contributors')
                }}
              >
                Contribute
              </PurpleButton>
            </Box>
          </Paper>
        </Grid>

        {menuList.map(menu => {
          return (
            <Grid
              key={menu.desc}
              item
              xs={12}
              sm={6}
              md={2}
              sx={{
                pt: theme => `${theme.spacing(5)} !important`,
                '&:nth-child(2n) .cardHeader': { backgroundColor: 'customColors.skyPaletteSecondary' },
                '&:nth-child(3n) .cardHeader': { backgroundColor: 'customColors.skyPaletteTertiary' },
                '&:nth-child(4n) .cardHeader': { backgroundColor: 'customColors.skyPaletteQuaternary' }
              }}
            >
              <CardMenu data={menu} />
            </Grid>
          )
        })}
      </Grid>
    </ApexChartWrapper>
  )
}

export default Home
