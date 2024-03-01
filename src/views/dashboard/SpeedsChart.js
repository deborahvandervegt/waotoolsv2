// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const defaultData = {
  ns: { d: 0, h: 0 },
  rs: { d: 0, h: 0 },
  profile: 0,
  recruitmentSpeed: 0,
  gems: 0
}

const getDetails = {
  ns: { desc: 'Normal Speeds', color: 'success' },
  rs: { desc: 'Recruitment Speeds', color: 'info' },
  profile: { desc: 'Recruitment Preset', color: 'error' },
  recruitmentSpeed: { desc: 'Recruitment Speed %', color: 'warning' },
  gems: { desc: 'Gems for Recruitment', color: 'success' }
}

function getData(config) {
  const data = []

  Object.keys(defaultData).forEach(speed => {
    let outputObj = {}

    if (speed === 'ns' || speed === 'rs') {
      outputObj = {
        sales: Math.round(config.userInfo[speed].d * 24) + config.userInfo[speed].h,
        title: getDetails[speed].desc,
        color: getDetails[speed].color,
        trendDir: 'down',
        trendNumber: 'hours'
      }
    } else if (speed === 'recruitmentSpeed') {
      outputObj = {
        sales:
          (config.profile +
            (config.duke ? 6 : 0) +
            (config.baron ? 5 : 0) +
            (config.nationalRecruitment?.percentage > 0 ? config.nationalRecruitment?.percentage : 0)) *
          1,
        title: getDetails[speed].desc,
        color: getDetails[speed].color,
        trendDir: 'down',
        trendNumber: '%'
      }
    } else {
      outputObj = {
        sales: speed === 'gems' ? config.userInfo[speed] : config[speed],
        title: getDetails[speed]?.desc,
        color: getDetails[speed]?.color,
        trendDir: 'down',
        trendNumber: speed === 'gems' ? '' : '%'
      }
    }

    data.push(outputObj)
  })

  return data
}

const defaultSpeedInfo = {
  userInfo: {
    gems: 0,
    ns: { d: 0, h: 0 },
    rs: { d: 0, h: 0 }
  },
  profile: '',
  duke: false,
  baron: false,
  recruitmentSpeed: 0,
  nationalRecruitment: false,
  troopsBatch: 2000,
  troopTier: 13,
  timeBatch: '',
  totalTroops: 0,
  totalTroopsGems: 0,
  totalTroopsGrl: 0,
  rss: {}
}

const SpeedChart = () => {
  const router = useRouter()

  const [speedInfo, setSpeedInfo] = useState(defaultSpeedInfo)

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('speedInfo'))
    }
    if (saved) {
      setSpeedInfo(saved)
    } else {
      setSpeedInfo(defaultSpeedInfo)
    }
  }, [])

  const data = getData(speedInfo)

  const totalHours =
    Math.round(speedInfo.userInfo.ns.d * 24) +
    +speedInfo.userInfo.ns.h +
    (Math.round(speedInfo.userInfo.rs.d * 24) + +speedInfo.userInfo.rs.h)

  const handleClick = () => {
    router.push('/speeds')
  }

  return (
    <Card>
      <CardHeader
        title='Speeds'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <Button size='small' onClick={handleClick}>
            Check
          </Button>
        }
      />
      <CardContent>
        <Box sx={{ mt: 2.75, mb: 4.75, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='h3'> {`${totalHours?.toLocaleString()} hours`}</Typography>
            <Typography variant='caption'>Total Hours Availabe</Typography>
          </Box>
        </Box>
        <TableContainer>
          <Table>
            <TableBody>
              {data.map(row => {
                return (
                  <TableRow
                    key={row.title}
                    sx={{
                      '&:last-of-type td': { border: 0, pb: 0 },
                      '& .MuiTableCell-root': {
                        py: theme => `${theme.spacing(3.125)} !important`,
                        '&:last-of-type': { pr: 0 },
                        '&:first-of-type': { pl: 0 }
                      },
                      '&:first-of-type td': { borderTop: theme => `1px solid ${theme.palette.divider}` }
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.8, color: `${row.color}.main` } }}
                      >
                        <Icon icon='mdi:circle' fontSize='1.05rem' />
                        <Typography sx={{ fontSize: '0.875rem' }}>{row.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='right'>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.sales}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          '& svg': { color: row.trendDir === 'down' ? 'error.main' : 'success.main' }
                        }}
                      >
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{row.trendNumber}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}

export default SpeedChart
