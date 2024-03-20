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
import { mysticSlots, treeAzuriteNeeded } from 'src/data/college'

const defaultMysticConfig = {
  mcLevel: 0,
  reqList: [],
  troopTabSelected: 0,
  troopSelected: 'infantry',
  slotsInfo: [...mysticSlots],
  troopObj: mysticSlots.find(t => t.slot === 0)
}

function getTroopsInfo(config) {
  let output = { ...treeAzuriteNeeded }
  let first = { troop: '', azurite: '' }
  let second = { troop: '', azurite: '' }
  let third = { troop: '', azurite: '' }

  const data = config
  if (data?.slotsInfo?.length > 0) {
    data?.slotsInfo.forEach(slot => {
      const totalAzurite = slot.ability.reduce((acc, cur) => acc + cur.a, 0)
      output[slot.troop] = totalAzurite
    })

    first = {
      troop: output.infantry > output.cavalry ? 'Infantry' : 'Cavalry',
      azurite: output.infantry > output.cavalry ? output.infantry : output.cavalry
    }
    second = {
      troop: output.archer > output.mage ? 'Archer' : 'Mage',
      azurite: output.archer > output.mage ? output.archer : output.mage
    }
    third = output.angel
  }

  return { first, second, third }
}

const TotalMysticChart = () => {
  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const [mysticConfig, setMysticConfig] = useState(defaultMysticConfig)

  const mysticInfo = getTroopsInfo(mysticConfig)

  const progress =
    ((mysticInfo.first.azurite + mysticInfo.second.azurite + mysticInfo.third) /
      (treeAzuriteNeeded.infantry + treeAzuriteNeeded.archer + treeAzuriteNeeded.angel)) *
    100

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('mysticConfig'))
    }
    if (saved) {
      setMysticConfig(saved)
    }
  }, [])

  const handleClick = () => {
    router.push('/mystic')
  }

  const options = {
    chart: {
      sparkline: { enabled: true }
    },
    stroke: { lineCap: 'round' },
    colors: [theme.palette.info.dark],
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
          Mystic College
        </Typography>
        <ReactApexcharts type='radialBar' height={103} options={options} series={[Math.round(progress, 2)]} />
        <Typography variant='body2' sx={{ mt: 3, textAlign: 'center', color: 'text.primary' }}>
          {mysticInfo.first.troop}: {mysticInfo.first.azurite.toLocaleString()}
        </Typography>
        <Typography variant='body2' sx={{ mt: 1.5, textAlign: 'center', color: 'text.primary' }}>
          {mysticInfo.second.troop}: {mysticInfo.second.azurite.toLocaleString()}
        </Typography>
        <Typography variant='body2' sx={{ mt: 1.5, textAlign: 'center', color: 'text.primary' }}>
          Angel: {mysticInfo.third.toLocaleString()}
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

export default TotalMysticChart
