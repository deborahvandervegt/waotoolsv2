import { Icon } from '@iconify/react'
import { FilterNoneOutlined, LibraryAddCheckRounded } from '@mui/icons-material'
import { Avatar, Box, Card, CardContent, Checkbox, Chip, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { nFormatter } from 'src/@core/utils/numberFormatter'
import { round } from 'src/utils/round'

const colors = {
  selected: { border: '#003c0dd1', background: { dark: '#003c0dd1', light: '#edfff1d1' } },
  normal: { border: '#7a7a7a6e', background: { dark: '', light: '' } },
  priority: { border: '#0278AE', background: { dark: '#002b3e85', light: '#8fd6f761' } }
}

const PackCardDetails = props => {
  const { pack, onCheck, onCheckList, userData } = props
  let cardColor, cardBackground
  const theme = useTheme()

  const userChecked = [...userData?.items]?.filter(p => p.packId === pack.packId)?.length
  const packItems = pack?.packDet?.length
  const packItem = pack?.packDet[0]?.items[0]?.i

  cardColor = userChecked === packItems ? colors.selected?.border : colors.normal?.border
  cardBackground =
    userChecked === packItems
      ? colors.selected?.background[theme.palette.mode]
      : colors.normal?.background[theme.palette.mode]

  if (packItem) {
    const checkIfPriority = userData?.conf?.priority?.find(pr => pr.key === packItem)
    if (checkIfPriority) {
      cardColor = colors.priority?.border
      cardBackground = colors.priority?.background[theme.palette.mode]
    }
  }

  return (
    <Card id='card-body' sx={{ border: `solid 1px ${cardColor}`, borderRadius: '8px', background: cardBackground }}>
      <CardContent>
        <Grid>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              m: 1,
              alignItems: 'center',
              border: 'solid 1px #7a7a7a6e',
              borderRadius: '8px',
              p: 2,
              width: '100%'
            }}
          >
            <Avatar
              sx={{ width: '50px', height: '50px', borderRadius: '8px' }}
              variant='square'
              alt={pack.packId}
              src={`/images/packs/${pack.packDet[0].items[0].i}.jpg`}
            />
            <Box sx={{ ml: '6px', width: '100%' }}>
              <Typography variant='body2' color='primary' sx={{ fontWeight: 500 }}>
                {pack.desc}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='body2'>
                  {pack.loc} - {pack.tab}
                </Typography>
                <Box>
                  {pack?.wday?.map(p => {
                    return (
                      <>
                        <Chip
                          key={p}
                          size='small'
                          variant='outlined'
                          label={<Typography variant='caption'>{p}</Typography>}
                          sx={{ m: '1px' }}
                        />
                      </>
                    )
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ my: '8px' }}>
            <Typography variant='body1' align='center' sx={{ fontWeight: 500 }}>
              {pack.packDet.reduce((acc, cur) => acc + cur.items[0].g, 0)?.toLocaleString()} gems for all packs
            </Typography>
          </Box>

          <Box sx={{ border: 'solid 1px #7a7a7a6e', borderRadius: '8px', p: 3 }}>
            <Grid
              container
              spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                borderBottom: 'solid 1px #7a7a7a6e',
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}
            >
              <Grid item xs={2}>
                <Checkbox
                  icon={<FilterNoneOutlined />}
                  checkedIcon={<LibraryAddCheckRounded />}
                  onClick={e => onCheckList({ packId: pack.packId, checked: e.target.checked })}
                />
              </Grid>
              <Grid item xs={1}>
                <Typography align='center' color='primary' variant='body2'>
                  Lvl
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align='center' color='primary' variant='body2'>
                  $
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align='center' color='primary' variant='body2'>
                  Qty
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography align='center' color='primary' variant='body2'>
                  $/Qty
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography align='center' color='primary' variant='body2'>
                  Gems
                </Typography>
              </Grid>
            </Grid>
            {pack?.packDet?.map((pd, index) => {
              let checkMaxValue = undefined
              let recommendedColor = {}

              if (userData?.items?.length > 0) {
                const userItemsPack = userData?.items?.filter(i => i.packId === pack.packId)
                if (userItemsPack?.length > 0)
                  checkMaxValue = userData?.items
                    ?.filter(item => item.packId === pack.packId)
                    ?.reduce((prev, current) => (prev && prev.l > current.l ? prev : current))
              }

              if (!checkMaxValue) checkMaxValue = { packId: 0, l: 0 }

              if (pd?.r) {
                recommendedColor = { border: 'solid 2px #cf9900e0', borderRadius: '8px' }
              }

              return (
                <Grid
                  container
                  key={`${pack?.desc?.toLowerCase()?.replace(' ', '')}-${pd.l}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderBottom: packItems === index + 1 ? '' : 'solid 1px #7a7a7a6e',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    ...recommendedColor
                  }}
                >
                  <Grid item xs={2} sx={{}}>
                    <Checkbox
                      checked={checkMaxValue?.l >= pd.l ? true : false}
                      disabled={pd.l > checkMaxValue?.l + 1 ? true : false}
                      color='success'
                      onClick={e => onCheck({ packId: pack.packId, l: pd.l, checked: e.target.checked })}
                    />
                  </Grid>
                  <Grid item xs={1} sx={{}}>
                    <Typography align='center' variant='body1'>
                      {pd.l}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align='right' variant='body2'>
                      ${pd.p}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align='right' variant='body2'>
                      {pd.items[0].qty > 999 ? nFormatter(pd.items[0].qty)?.toLocaleString() : pd.items[0].qty}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography align='right' variant='body2'>
                      ${round(pd.p / pd.items[0].qty, 2)?.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align='center'>{pd.items[0].g?.toLocaleString()}</Typography>
                  </Grid>
                </Grid>
              )
            })}
          </Box>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default PackCardDetails
