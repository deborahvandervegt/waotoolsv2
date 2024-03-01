// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { highCollegeOptions } from 'src/data/college'

const defaultInfo = {
  itemList: [],
  totalAzurite: [],
  movementsList: [],
  preset: '',
  presetB: '',
  selectedList: [],
  totalGot: { a: 0, w: 0, f: 0, s: 0, i: 0 },
  azuCalculator: { mineHour: 0, rcLevel: 0, card: 0, packs: 0, chests: 0, owned: 0, needed: 0, total: 0 },
  castle: {
    castle: { v: 0, min: 30, max: 43 },
    wall: { v: 0, min: 30, max: 43 },
    barracks: { v: 0, min: 30, max: 43 },
    drillGrounds: { v: 0, min: 30, max: 43 },
    guardianTemple: { v: 0, min: 30, max: 43 },
    depot: { v: 0, min: 30, max: 43 },
    embassy: { v: 0, min: 30, max: 43 },
    blacksmith: { v: 0, min: 30, max: 43 },
    college: { v: 0, min: 30, max: 43 },
    hospital: { v: 0, min: 30, max: 43 },
    chargeTier: { v: 0, min: 1, max: 3 }
  },
  strictMode: true
}

const TotalPlannerChart = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()
  const [planInfo, setPlanInfo] = useState(defaultInfo)

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('planInfo'))
    }

    if (saved) {
      const strictMode = saved.hasOwnProperty('strictMode') ? saved.strictMode : defaultInfo.strictMode
      const castle = saved.hasOwnProperty('castle') ? saved.castle : defaultInfo.castle
      setPlanInfo({ ...saved, strictMode, castle })
    }
  }, [])

  const handleClick = () => {
    router.push('/planner')
  }

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [theme.palette.error.light],
    plotOptions: {
      radialBar: {
        endAngle: 90,
        startAngle: -90,
        hollow: { size: '60%' },
        track: { background: theme.palette.customColors.trackBg },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 0,
            fontWeight: 500,
            fontSize: '1.25rem',
            color: theme.palette.text.secondary
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h6' align='center' sx={{ mb: 2.5 }}>
          High College
        </Typography>
        <Typography variant='body1' sx={{ mt: 3, textAlign: 'center', color: 'text.primary' }}>
          Next Building: {planInfo.itemList[0]?.desc}
        </Typography>
        <Typography variant='body2' sx={{ mt: 3, textAlign: 'center', color: 'text.primary' }}>
          {planInfo?.azuCalculator?.total.toLocaleString()} Daily Azurite
        </Typography>

        <Typography variant='body2' sx={{ mt: 1.5, textAlign: 'center', color: 'text.primary' }}>
          {(planInfo?.azuCalculator?.total * 30).toLocaleString()} Monthly A.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size='small' onClick={handleClick}>
            Check
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TotalPlannerChart
