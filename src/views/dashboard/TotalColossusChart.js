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
import { colossusSlots } from 'src/data/colossus'

const TotalColossusChart = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const [slotsInfo, setSlotsInfo] = useState(colossusSlots)

  const colossusFirst = slotsInfo[0]?.ability?.reduce((acc, cur) => acc + cur.level, 0)
  const colossusSecond = slotsInfo[1]?.ability?.reduce((acc, cur) => acc + cur.level, 0)

  const progress = ((colossusFirst + colossusSecond) / 300) * 100

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('slotsInfoColossus'))
    }
    if (saved) {
      setSlotsInfo(saved)
    } else {
      setSlotsInfo(colossusSlots)
    }
  }, [])

  const handleClick = () => {
    router.push('/colossus')
  }

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [theme.palette.warning.dark],
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
          Colossus
        </Typography>
        <ReactApexcharts type='radialBar' height={103} options={options} series={[Math.round(progress, 2)]} />
        <Typography variant='body2' sx={{ mt: 3, textAlign: 'center', color: 'text.primary' }}>
          1st: {colossusFirst} / 150
        </Typography>
        <Typography variant='body2' sx={{ mt: 1.5, textAlign: 'center', color: 'text.primary' }}>
          2nd: {colossusSecond} / 150
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

export default TotalColossusChart
