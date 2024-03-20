// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import { Button, createTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { equipmentSlots } from 'src/data/equipment'

// ** Custom Styles and Vars
const theme = createTheme()

const getDetails = {
  Weapon: { icon: 'game-icons:broadsword', color: 'warning' },
  Belt: { icon: 'game-icons:belt-armor', color: 'error' },
  Accessory: { icon: 'game-icons:gem-necklace', color: 'error' },
  Helmet: { icon: 'game-icons:crested-helmet', color: 'info' },
  Clothes: { icon: 'game-icons:shoulder-armor', color: 'info' },
  Boots: { icon: 'game-icons:leg-armor', color: 'error' }
}

const qualityInfo = {
  none: { color: '', backgroundColor: '' },
  blue: { color: '#216de7e0', backgroundColor: '#216de729' },
  purple: { color: '#7028dde0', backgroundColor: '#7028dd2b' },
  orange: { color: '#cf893c', backgroundColor: '#cf893c2e' }
}

function getData(config) {
  const data = []

  config.forEach(slot => {
    const outputObj = {
      imgWidth: 20,
      imgHeight: 22,
      trendDir: 'up',
      title: slot.slotDesc,
      imgAlt: slot.slotDesc.toLowerCase(),
      quality: slot?.quality?.toLowerCase(),
      level: slot?.equipment?.level,
      equipment: slot?.equipment?.desc,
      enhancement: slot?.enhancement?.key,
      enhancementLevel: slot?.eLevel,
      enhancementStat: slot?.eStat,
      avatarColor: getDetails[slot.slotDesc].color,
      icon: getDetails[slot.slotDesc].icon
    }

    data.push(outputObj)
  })

  return data
}

const EquipmentChart = () => {
  // ** Hooks
  const router = useRouter()

  const [slotsInfo, setSlotsInfo] = useState({
    slots: equipmentSlots,
    template: 'custom',
    templateEnhancement: 'custom',
    ownedItems: []
  })

  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('slotsInfoEquipment'))
    }

    if (saved) setSlotsInfo(saved)
  }, [])

  const data = getData(slotsInfo.slots)

  const handleClick = () => {
    router.push('/equipment')
  }

  return (
    <Card>
      <CardHeader
        title='Equipment & Enhancements'
        titleTypographyProps={{ sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' } }}
        action={
          <Button size='small' onClick={handleClick}>
            Check
          </Button>
        }
      />
      <CardContent>
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 6 } : {})
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
                <Icon icon={item.icon} fontSize={35} style={{ color: theme.palette[item.avatarColor]?.light }} />
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
                  <Typography
                    sx={{ mb: 0.25, fontWeight: 600, fontSize: '0.875rem', color: qualityInfo[item.quality]?.color }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant='body2'>{item.equipment}</Typography>

                  <Typography variant='caption' sx={{ color: '#0c6d0d' }}>
                    {item.enhancement} (Lv{item.enhancementLevel})
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography sx={{ mr: 1, fontWeight: 600, color: '#0c6d0d' }}>{item.enhancementStat}%</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default EquipmentChart
