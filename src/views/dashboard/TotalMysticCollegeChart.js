// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { mysticSlots, treeAzuriteNeeded } from 'src/data/college'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, createTheme } from '@mui/material'

const theme = createTheme()

const defaultMysticConfig = {
  mcLevel: 0,
  reqList: [],
  troopTabSelected: 0,
  troopSelected: 'infantry',
  slotsInfo: [...mysticSlots],
  troopObj: mysticSlots.find(t => t.slot === 0)
}

const getDetails = {
  angel: { icon: 'game-icons:angel-outfit', color: 'warning' },
  infantry: { icon: 'game-icons:orc-head', color: 'error' },
  cavalry: { icon: 'game-icons:horse-head', color: 'error' },
  archer: { icon: 'game-icons:pocket-bow', color: 'info' },
  mage: { icon: 'mdi:wizard-hat', color: 'info' }
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
    third = { troop: 'Angel', azurite: output.angel }
  }

  return { first, second, third }
}

function getData(config) {
  const data = []

  Object.keys(config).forEach(troop => {
    let outputObj = {}

    const troopObj = config[troop]
    const troopType = troopObj.troop.toLowerCase()
    const progress = (troopObj.azurite / treeAzuriteNeeded[troopType]) * 100

    outputObj = {
      progress: Math.round(progress, 2),
      imgHeight: 30,
      title: troopObj.troop,
      color: getDetails[troopType].color,
      amount: `${Math.round(progress, 2)}%`,
      subtitle: `${troopObj.azurite.toLocaleString()} / ${treeAzuriteNeeded[troopType].toLocaleString()}`,
      imgSrc: getDetails[troopType].icon
    }

    data.push(outputObj)
  })

  return data
}

const TotalMysticCollegeChart = () => {
  // ** Hook
  const router = useRouter()

  const [mysticConfig, setMysticConfig] = useState(defaultMysticConfig)

  const mysticInfo = getTroopsInfo(mysticConfig)
  const totalTiers = mysticInfo.first.azurite + mysticInfo.second.azurite + mysticInfo.third.azurite
  const totalAvailable = treeAzuriteNeeded.infantry + treeAzuriteNeeded.archer + treeAzuriteNeeded.angel

  const progress = (totalTiers / totalAvailable) * 100

  const data = getData(mysticInfo)

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

  return (
    <Card>
      <CardHeader
        title='Mystic College'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <Button size='small' onClick={handleClick}>
            Check
          </Button>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            {Math.round(progress, 2)}%
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'success.main',
              '& svg': { fontSize: '1.875rem', verticalAlign: 'middle' },
              marginLeft: '6px'
            }}
          >
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              Completion of {totalTiers.toLocaleString()} from {totalAvailable.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          You have upgraded {mysticInfo.first?.troop} as Frontline and {mysticInfo.second?.troop} as Backline more than
          any other troop type.
        </Typography>

        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Box
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  color: theme.palette[item.color]?.main
                }}
              >
                <Icon icon={item.imgSrc} color={item.color} />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalMysticCollegeChart
