// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Imports
import moment from 'moment'

// ** Styled Components
import { Divider } from '@mui/material'
import CustomHeader from 'src/@core/components/Header'
import { releaseNotes } from 'src/data/general/releaseNotes'
import { Icon } from '@iconify/react'

const ReleaseNotes = props => {
  return (
    <>
      <>
        <Card>
          <CustomHeader icon='releases' title='RELEASE NOTES' />
          <Divider />
          <Grid container spacing={3} sx={{ padding: '2.5rem' }}>
            <Grid item xs={12}>
              <Box sx={{ padding: '1rem' }}>
                <Typography variant='h6' color='primary'>
                  WaoTools V2 WebApp
                </Typography>
                <Typography variant='body1'>
                  Behold the evolution of WaoTools! Find out what’s new, what’s fixed, or just take a trip down memory
                  lane with a nostalgic swagger, remembering those bugs of yesterday.
                </Typography>
              </Box>
              <Box sx={{ padding: '1rem' }}>
                {releaseNotes.releases?.map(release => {
                  return (
                    <>
                      <Box key={release.version} sx={{ my: '25px' }}>
                        <Box
                          sx={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}
                        >
                          <Typography variant='h5' sx={{ fontWeight: 650 }}>
                            Version {release.version}
                          </Typography>
                        </Box>
                        <Typography variant='body1'>
                          {moment(release.date, 'YYYY-MM-DD').format('MMM Do, YYYY')}
                        </Typography>

                        <Typography variant='body2'>{release.quote}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '5px', mt: '10px' }}>
                          <Typography variant='body1'>New ✨</Typography>
                          {release.new.map((n, index) => (
                            <Box key={'new-' + index}>
                              <Typography variant='caption'>
                                {<Icon icon='f7:gear-alt-fill' style={{ fontSize: '10px' }} />} {n}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', my: '5px' }}>
                          <Typography variant='body1'>Improvements 🙌</Typography>
                          {release.improvements.map((n, index) => (
                            <Box key={'new-' + index}>
                              <Typography variant='caption'>
                                {<Icon icon='f7:gear-alt-fill' style={{ fontSize: '10px' }} />} {n}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', my: '5px' }}>
                          <Typography variant='body1'>Bug Fixes 🐛</Typography>
                          {release.bugs.map((n, index) => (
                            <Box key={'new-' + index}>
                              <Typography variant='caption'>
                                {<Icon icon='f7:gear-alt-fill' style={{ fontSize: '10px' }} />} {n}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </>
                  )
                })}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </>
    </>
  )
}

export default ReleaseNotes
