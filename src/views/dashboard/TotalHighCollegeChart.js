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

const defaultCollegeInfo = {
  options: [...highCollegeOptions],
  userTalents: 0
}

const TotalHighCollegeChart = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const [collegeInfo, setCollegeInfo] = useState(defaultCollegeInfo)
  const [progress, setProgress] = useState(0)

  const totalAvailablePoints = [...highCollegeOptions]
    .filter(o => o.beast === 'all' || o.beast === 'any')
    .map(o => o.levels)
    .map(od => {
      return od.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const totalPoints = collegeInfo.options.reduce(
    (accumulator, currentValue) => accumulator + currentValue.curTotalPoints,
    0
  )

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('collegeInfo'))
    }
    if (saved) {
      setCollegeInfo(saved)
    } else {
      const newOptions = [...highCollegeOptions].filter(o => o.beast === 'all' || o.beast === 'any')
      setCollegeInfo({ ...defaultCollegeInfo, options: newOptions })
    }
  }, [])

  useEffect(() => {
    let totalCompleted = 0

    if (collegeInfo.userTalents > 0) {
      totalCompleted = 100 - ((collegeInfo.userTalents - totalPoints) / collegeInfo.userTalents) * 100
    } else {
      totalCompleted = 100 - ((totalAvailablePoints - totalPoints) / totalAvailablePoints) * 100
    }

    setProgress(totalCompleted)
  }, [totalPoints, totalAvailablePoints, collegeInfo.userTalents])

  const handleClick = () => {
    router.push('/college')
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
        <ReactApexcharts type='radialBar' height={103} options={options} series={[Math.round(progress, 2)]} />
        <Typography variant='body2' sx={{ mt: 3, textAlign: 'center', color: 'text.primary' }}>
          {totalPoints.toLocaleString()} Done
        </Typography>
        <Typography variant='body2' sx={{ mt: 1.5, textAlign: 'center', color: 'text.primary' }}>
          {(totalAvailablePoints - totalPoints).toLocaleString()} to MAX
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

export default TotalHighCollegeChart
