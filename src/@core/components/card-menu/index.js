// ** MUI Imports
import { CardActions, Chip, Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Custom Components Imports
import Link from 'next/link'
import Icon from 'src/@core/components/icon'

// ** Custom Var and Components
const statusProps = {
  finished: { desc: 'Finished', color: '', show: true },
  development: { desc: 'Under development', color: '#6d2ebf', show: false },
  comingsoon: { desc: 'Coming soon', color: '#14623bb0', show: false }
}

const StatusChip = props => {
  const { status } = props

  return (
    <Chip
      label={`${statusProps[status].desc}`}
      variant='filled'
      sx={{ marginLeft: '5px', backgroundColor: statusProps[status].color }}
    />
  )
}

const CardMenu = props => {
  // ** Vars
  const { desc, icon, color, src, subModule, text, status } = props.data

  return (
    <Card
      sx={{
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Box
        className='cardHeader'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '0.5em',
          paddingBottom: '0.5em',
          paddingLeft: '20px',
          backgroundColor: 'customColors.skyPalettePrimary',
          height: '60px',
          fontWeight: '600',
          '&:hover *': { color: `${statusProps[status].show ? '#e7e3fcde' : ''}` }
        }}
      >
        <Typography
          variant='h7'
          component={statusProps[status].show ? Link : null}
          href={statusProps[status].show ? `/${text}` : '#'}
          className='cardHeaderTitle'
          color='customColors.skyPaletteTitle'
          sx={{
            fontWeight: 600,
            textDecoration: 'none',
            textAlign: 'center',
            width: 'auto',
            display: 'inline',
            textTransform: 'uppercase'
          }}
        >
          <CustomAvatar
            skin='light'
            variant='rounded'
            sx={{
              mr: 3,
              height: 34,
              width: 34,
              color: 'customColors.skyPaletteTitle',
              backgroundColor: 'transparent',
              display: 'inline',
              marginRight: '0.25rem',
              verticalAlign: 'middle'
            }}
          >
            <Icon icon={icon} />
          </CustomAvatar>
          {desc}
        </Typography>
        {status !== 'finished' ? <StatusChip status={status} /> : null}
      </Box>
      <Divider />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', minHeight: '155px' }}>
        <Box
          sx={{
            display: 'contents'
          }}
        >
          {subModule
            ? subModule.map(module => {
                return (
                  <Typography key={module.name} variant='caption' sx={{ mr: 1.5 }}>
                    {module.name}
                  </Typography>
                )
              })
            : null}
        </Box>
      </CardContent>
      <CardActions>
        <Button disabled={!statusProps[status].show} size='small' component={Link} href={`/${text}`}>
          CHECK TOOL
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardMenu
