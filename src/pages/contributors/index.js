// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import { contributorsList } from 'src/data/general/contributors'

// ** Styled Component Import
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Fade,
  IconButton,
  Link,
  Paper,
  Typography
} from '@mui/material'
import { styled } from '@mui/system'
import { Icon } from '@iconify/react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const PurpleButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#0278AE'),
  marginTop: '8px',
  background: 'linear-gradient(to right, #265faf, #1c5db9,#10499b, #043987)!important;',
  '&:hover': {
    background: 'linear-gradient(to right, #8852ff, #632ecb, #4e19c1, #381683)!important'
  }
}))

const urls = {
  dataGathering: 'https://tinyurl.com/waotoolsdata',
  paypal: 'https://www.paypal.com/paypalme/oNaare'
}

const options = [
  {
    text: 'Support The Project',
    href: 'https://www.paypal.com/paypalme/oNaare',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='logos:paypal' color='primary' />
  },
  {
    text: 'Buy Me a Coffee',
    href: 'https://www.buymeacoffee.com/onadev',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='simple-icons:buymeacoffee' color='primary' />
  },
  {
    text: 'Support The Project',
    href: 'https://www.patreon.com/oNare',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='logos:patreon' color='primary' />
  }
]

const ContributorsDetails = props => {
  const icon = {
    supporters: <Icon icon='solar:cup-star-bold' fontSize={30} style={{ color: 'grey' }} />,
    developers: <Icon icon='iconoir:developer' fontSize={30} style={{ color: 'grey' }} />,
    contributors: <Icon icon='la:hands-helping' fontSize={30} style={{ color: 'grey' }} />
  }

  return (
    <>
      <Paper elevation={6} sx={{ padding: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {icon[props.title.toLowerCase()]}

          <Typography variant='h5' color='primary' sx={{ marginLeft: '6px' }}>
            {props.title}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: '5px', marginBottom: '8px' }} />
        <Grid
          container
          spacing={6}
          sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', flexWrap: 'wrap' }}
        >
          {props.data?.map(ct => {
            return (
              <Grid key={ct.name} item xs={12} lg={3} md={4}>
                <Box
                  sx={{
                    marginRight: '3px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant='body1'>{ct.name}</Typography>
                  <Typography variant='caption' sx={{ ml: '6px', mr: '6px' }}>
                    {ct.realm}
                  </Typography>
                  {ct.type === 'VIP supporter' || ct.type === 'VIP contributor' ? (
                    <Icon icon='flat-color-icons:vip' fontSize={25} sx={{ ml: '6px' }} />
                  ) : (
                    ''
                  )}
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </>
  )
}

const Contributors = () => {
  // ** Hooks
  const [openCoffee, setOpenCoffee] = useState(false)

  return (
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
            <Typography variant='h5' color='primary'>
              INFORMATION IS POWER!
            </Typography>
            <Typography variant='caption' align='center'>
              This is a compilation of a hundred pictures, spreadsheets, and information gathered through the years from
              people who shared it. Make good use of all these tools and information. If you want to continue supporting
              this website and project, go and buy us some coffee {<Icon icon='iconoir:coffee-cup' />} here:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5px', marginBottom: '5px' }}>
              <PurpleButton
                variant='contained'
                startIcon={<Icon icon='game-icons:coffee-cup' />}
                onClick={() => setOpenCoffee(true)}
              >
                BUY ME SOME COFFEES
              </PurpleButton>
            </Box>
            <Typography variant='caption'>
              If you want to contribute, give any ideas or report a bug, please leave me a comment:
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5px', marginBottom: '5px' }}>
              <PurpleButton variant='contained' startIcon={<Icon icon='mdi:google-spreadsheet' />}>
                <Link target='_blank' rel='noopener' style={{ color: 'white' }} component='a' href={urls.dataGathering}>
                  CONTRIBUTE
                </Link>
              </PurpleButton>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={12} sx={{ padding: '1.5rem', marginTop: '15px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {/* Developers */}
              <ContributorsDetails
                data={[...contributorsList].filter(ct => ct.type === 'creator' || ct.type === 'developer')}
                title='Developers'
              />
            </Grid>
            <Grid item xs={12}>
              {/* Supporters */}
              <ContributorsDetails
                data={[...contributorsList].filter(ct => ct.type === 'supporter' || ct.type === 'VIP supporter')}
                title='Supporters'
              />
            </Grid>
            <Grid item xs={12}>
              {/* Contributors */}
              <ContributorsDetails
                data={[...contributorsList].filter(ct => ct.type === 'contributor' || ct.type === 'VIP contributor')}
                title='Contributors'
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Dialog | Support */}
      <Dialog
        open={openCoffee}
        maxWidth='md'
        scroll='body'
        onClose={e => {
          setOpenCoffee(false)
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
              setOpenCoffee(false)
            }}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Buy me some coffees!
            </Typography>
            <Typography variant='body2'>
              The work I do coding this website is for your use and everyone playing War and Order. Your support is
              vital to continue delivering these amazing updates!
            </Typography>
            <Divider sx={{ my: 5 }} />

            {options.map((option, index) => {
              return (
                <>
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      my: 3
                    }}
                  >
                    {option.icon}
                    <Typography variant='body1' sx={{ ml: 2 }}>
                      <Link target='_blank' rel='noopener' component='a' href={option.href}>
                        {option.text}
                      </Link>
                    </Typography>
                  </Box>
                </>
              )
            })}
          </Box>
        </DialogContent>
        <Divider />

        <DialogActions>
          <Button color='primary' onClick={e => setOpenCoffee(false)}>
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Contributors
