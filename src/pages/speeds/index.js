// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import {
  recruitmentConfig,
  recruitmentTemplates,
  defaultTierDiff,
  defaultTierDiffGems,
  troopsConf
} from 'src/data/speeds/recruitment'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { ClearAll, Refresh, Save } from '@mui/icons-material'
import { green, red } from '@mui/material/colors'
import { formatCompactNumber } from 'src/@core/utils/numberFormatter'
import { Icon } from '@iconify/react'

const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0.4em'
}))

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[500],
  color: theme.palette.getContrastText(green[500]),
  '&:hover': {
    backgroundColor: green[700]
  }
}))

const RedButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  '&:hover': {
    backgroundColor: red[700]
  }
}))

const defaultSpeedInfo = {
  userInfo: {
    gems: 0,
    ns: { d: '', h: '' },
    rs: { d: '', h: '' }
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

function toHoursMinutes(totalSeconds) {
  const totalSecs = Math.floor(totalSeconds)
  const totalMinutes = Math.floor(totalSecs / 60)

  const seconds = totalSeconds % 60
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { h: hours, m: minutes, s: seconds }
}

const Speeds = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [speedInfo, setSpeedInfo] = useState(defaultSpeedInfo)
  const [snackOpen, setSnackOpen] = useState({ open: false, type: 'error', time: 0 })

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
    setIsLoading(false)
  }, [])

  const handleSaveData = e => {
    localStorage.setItem('speedInfo', JSON.stringify(speedInfo))
    setSnackOpen({ open: `Information Saved in the Browser.`, type: 'success' })
  }

  const handleRemoveItems = e => {
    setSpeedInfo(defaultSpeedInfo)
    localStorage.removeItem('speedInfo')
    setSnackOpen({ open: `Information Cleared from the Browser`, type: 'error' })
  }

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackOpen({ open: false, type: 'error', time: 1000 })
  }

  const handleTroopHours = newSpeedInfo => {
    let troopHours
    let recruitmentTime

    if (speedInfo.troopTier.length === 0 || speedInfo.troopsBatch === 0) {
      setSpeedInfo({ ...newSpeedInfo })

      return
    }

    const troopTier = newSpeedInfo.troopTier

    if (troopTier === 14) {
      recruitmentTime =
        recruitmentTemplates?.find(p => p.recruitmentSpeed === newSpeedInfo.profile)?.tierTime[13] *
        defaultTierDiff[troopTier]
    } else {
      recruitmentTime = recruitmentTemplates?.find(p => p.recruitmentSpeed === newSpeedInfo.profile)?.tierTime[
        troopTier
      ]
    }

    const extraBuffs = newSpeedInfo.baron
      ? recruitmentConfig.default.baronPercent
      : newSpeedInfo.duke
      ? recruitmentConfig.default.dukePercent
      : false

    const templeBuffs =
      newSpeedInfo.nationalRecruitment?.calcPercent > 0 ? newSpeedInfo.nationalRecruitment?.calcPercent : 0

    troopHours = recruitmentTime * (extraBuffs > 0 ? extraBuffs : 1) * (templeBuffs > 0 ? templeBuffs : 1)
    troopHours = troopHours * newSpeedInfo.troopsBatch

    const timeArray = toHoursMinutes(troopHours)
    setSpeedInfo({ ...newSpeedInfo, timeBatch: `${timeArray.h}h${timeArray.m}m${Math.floor(timeArray.s)}s` })
  }

  const handleCalculate = e => {
    let totalTroopsGems, totalTroops, calcPercent, totalTroopsGrl, newRssObj

    // Speeds and troops data
    const { troopTier, profile, userInfo, baron, duke, nationalRecruitment } = speedInfo
    const ns = userInfo.ns.d * 24 + userInfo.ns.h
    const rs = userInfo.rs.d * 24 + userInfo.rs.h
    const totalHours = (+ns + +rs) * 60 * 60

    // Buffs data
    const extraBuffs = baron
      ? recruitmentConfig.default.baronPercent
      : duke
      ? recruitmentConfig.default.dukePercent
      : false

    const templeBuffs = nationalRecruitment?.calcPercent > 0 ? nationalRecruitment?.calcPercent : 0

    // Troops Speed Calculation
    if (troopTier === 14) {
      calcPercent =
        recruitmentTemplates?.find(p => p.recruitmentSpeed === profile)?.tierTime[13] * defaultTierDiff[troopTier]
      totalTroops = totalHours / (calcPercent * (extraBuffs > 0 ? extraBuffs : 1) * (templeBuffs > 0 ? templeBuffs : 1))
    } else {
      totalTroops =
        totalHours /
        (recruitmentTemplates?.find(p => p.recruitmentSpeed === profile)?.tierTime[troopTier] *
          (extraBuffs > 0 ? extraBuffs : 1) *
          (templeBuffs > 0 ? templeBuffs : 1))
    }

    // Gems Speeds Calculation
    if (userInfo.gems > 0) {
      const profileObj = recruitmentTemplates?.find(p => p.recruitmentSpeed === profile)?.gemQty ?? undefined
      if (profileObj) {
        if (troopTier === 14) {
          const gemsDiff =
            recruitmentTemplates?.find(p => p.recruitmentSpeed === profile)?.gemQty[13] * defaultTierDiffGems[troopTier]
          totalTroopsGems =
            userInfo.gems / (gemsDiff * (extraBuffs > 0 ? extraBuffs : 1) * (templeBuffs > 0 ? templeBuffs : 1))
        } else {
          totalTroopsGems =
            userInfo.gems /
            (recruitmentTemplates?.find(p => p.recruitmentSpeed === profile)?.gemQty[troopTier] *
              (extraBuffs > 0 ? extraBuffs : 1) *
              (templeBuffs > 0 ? templeBuffs : 1))
        }
      }
    }

    if (totalTroops > 0) totalTroopsGrl = totalTroops
    if (totalTroopsGems > 0) totalTroopsGrl = totalTroops + totalTroopsGems

    if (totalTroops > 0) {
      const infantry = troopsConf?.troopsRecruitmentRSS?.infantry[troopTier]
      const cavalry = troopsConf?.troopsRecruitmentRSS?.cavalry[troopTier]
      const archer = troopsConf?.troopsRecruitmentRSS?.archer[troopTier]
      const mage = troopsConf?.troopsRecruitmentRSS?.mage[troopTier]

      newRssObj = !infantry
        ? []
        : [
            {
              name: 'Infantry',
              key: 'infantry',
              f: infantry?.f * totalTroopsGrl,
              w: infantry?.f * totalTroopsGrl,
              s: infantry?.s * totalTroopsGrl,
              i: infantry?.i * totalTroopsGrl
            },
            {
              name: 'Cavalry',
              key: 'cavalry',
              f: cavalry?.f * totalTroopsGrl,
              w: cavalry?.f * totalTroopsGrl,
              s: cavalry?.s * totalTroopsGrl,
              i: cavalry?.i * totalTroopsGrl
            },
            {
              name: 'Archer',
              key: 'archer',
              f: archer?.f * totalTroopsGrl,
              w: archer?.f * totalTroopsGrl,
              s: archer?.s * totalTroopsGrl,
              i: archer?.i * totalTroopsGrl
            },
            {
              name: 'Mage',
              key: 'mage',
              f: mage?.f * totalTroopsGrl,
              w: mage?.f * totalTroopsGrl,
              s: mage?.s * totalTroopsGrl,
              i: mage?.i * totalTroopsGrl
            }
          ]
    }

    setSpeedInfo({
      ...speedInfo,
      totalTroops: totalTroops,
      totalTroopsGems: totalTroopsGems,
      totalTroopsGrl: totalTroopsGrl,
      rss: newRssObj
    })
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='speeds' title='SPEEDS CALCULATOR' />
            <Divider />
          </Card>
        </Grid>
      </Grid>
      <>
        <Card>
          <Snackbar
            open={snackOpen.open ? true : false}
            autoHideDuration={snackOpen.time ?? 7000}
            onClose={snackClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert variant='filled' onClose={snackClose} severity={snackOpen.type}>
              <AlertTitle>{snackOpen.type === 'success' ? 'Done!' : 'Info:'}</AlertTitle>
              {snackOpen.open}
            </Alert>
          </Snackbar>
          <Grid container spacing={3} style={{ minWidth: '320px', padding: '1rem' }}>
            <Grid item xs={12} md={6} lg={8}>
              <Paper elevation={6} sx={{ padding: '1rem' }}>
                <Divider>{<Typography variant='caption'>1 - USER CONFIGURATION</Typography>}</Divider>
                <CustomBox>
                  <Typography variant='body1' color='textPrimary' sx={{ marginRight: '5px' }}>
                    Gems:
                  </Typography>
                  <TextField
                    size='small'
                    id='gems-u'
                    variant='outlined'
                    type='number'
                    value={speedInfo.userInfo.gems > 0 ? speedInfo.userInfo.gems : ''}
                    sx={{ maxWidth: '8.2rem' }}
                    onChange={e => {
                      const maxNumber = 9999999
                      const value = +e.target.value * 1 >= maxNumber ? maxNumber : +e.target.value * 1
                      const newUserInfo = { ...speedInfo.userInfo, gems: value }
                      setSpeedInfo({ ...speedInfo, userInfo: newUserInfo })
                    }}
                  />
                </CustomBox>
                <CustomBox>
                  <Typography variant='body1' color='textPrimary' sx={{ marginRight: '5px' }}>
                    Normal Speeds:
                  </Typography>
                  <TextField
                    label='Days'
                    size='small'
                    id='nspeeds-ud'
                    variant='outlined'
                    type='number'
                    value={speedInfo.userInfo.ns.d > 0 ? speedInfo.userInfo.ns.d : ''}
                    sx={{ maxWidth: '5.2rem', marginRight: '3px' }}
                    onChange={e => {
                      const maxNumber = 9999
                      let value = +e.target.value * 1 >= maxNumber ? maxNumber : +e.target.value * 1
                      const newUserInfo = { ...speedInfo.userInfo, ns: { ...speedInfo.userInfo.ns, d: value } }
                      setSpeedInfo({ ...speedInfo, userInfo: newUserInfo })
                    }}
                  />
                  <TextField
                    label='Hours'
                    size='small'
                    id='nspeeds-uh'
                    variant='outlined'
                    type='number'
                    value={speedInfo.userInfo.ns.h > 0 ? speedInfo.userInfo.ns.h : ''}
                    sx={{ maxWidth: '5.2rem', marginRight: '5px' }}
                    onChange={e => {
                      const maxNumber = 9999
                      let value = +e.target.value * 1 >= maxNumber ? maxNumber : +e.target.value * 1
                      const newUserInfo = { ...speedInfo.userInfo, ns: { ...speedInfo.userInfo.ns, h: value } }
                      setSpeedInfo({ ...speedInfo, userInfo: newUserInfo })
                    }}
                  />
                  <Typography variant='body2' color='primary'>
                    {`${Math.round(speedInfo.userInfo.ns.d * 24) + speedInfo.userInfo.ns.h} hours.`}
                  </Typography>
                </CustomBox>
                <CustomBox>
                  <Typography variant='body1' color='textPrimary' sx={{ marginRight: '5px' }}>
                    Recruitment Speeds:
                  </Typography>
                  <TextField
                    label='Days'
                    size='small'
                    id='rspeeds-ud'
                    variant='outlined'
                    type='number'
                    value={speedInfo.userInfo.rs.d > 0 ? speedInfo.userInfo.rs.d : ''}
                    sx={{ maxWidth: '5.2rem', marginRight: '3px' }}
                    onChange={e => {
                      const maxNumber = 9999
                      let value = +e.target.value * 1 >= maxNumber ? maxNumber : +e.target.value * 1
                      const newUserInfo = { ...speedInfo.userInfo, rs: { ...speedInfo.userInfo.rs, d: value } }
                      setSpeedInfo({ ...speedInfo, userInfo: newUserInfo })
                    }}
                  />
                  <TextField
                    label='Hours'
                    size='small'
                    id='rspeeds-uh'
                    variant='outlined'
                    type='number'
                    value={speedInfo.userInfo.rs.h > 0 ? speedInfo.userInfo.rs.h : ''}
                    sx={{ maxWidth: '5.2rem', marginRight: '5px' }}
                    onChange={e => {
                      const maxNumber = 9999
                      let value = +e.target.value * 1 >= maxNumber ? maxNumber : +e.target.value * 1
                      const newUserInfo = { ...speedInfo.userInfo, rs: { ...speedInfo.userInfo.rs, h: value } }
                      setSpeedInfo({ ...speedInfo, userInfo: newUserInfo })
                    }}
                  />
                  <Typography variant='body2' color='primary'>
                    {`${Math.round(speedInfo.userInfo.rs.d * 24) + speedInfo.userInfo.rs.h} hours.`}
                  </Typography>
                </CustomBox>
                <Divider>{<Typography variant='caption'>2 - PRESETS</Typography>}</Divider>
                <CustomBox>
                  <TextField
                    select
                    size='small'
                    label='Select Preset'
                    id='load-preset'
                    variant='outlined'
                    type='text'
                    value={speedInfo.profile > 0 ? speedInfo.profile : ''}
                    onChange={e => {
                      handleTroopHours({ ...speedInfo, profile: e.target.value })
                    }}
                    sx={{ marginRight: '5px' }}
                  >
                    {recruitmentTemplates?.map(option => (
                      <MenuItem key={option.recruitmentSpeed} value={option.recruitmentSpeed}>
                        {option.recruitmentSpeed}% {option?.gemQty ? `+ Gems` : ``}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Tooltip title={'Save configuration'} arrow>
                    <GreenButton
                      color='primary'
                      variant='filled'
                      startIcon={<Save />}
                      onClick={handleSaveData}
                      sx={{ marginRight: '5px' }}
                    >
                      SAVE
                    </GreenButton>
                  </Tooltip>
                  <Tooltip title={'Remove saved configuration.'} arrow>
                    <RedButton align='center' color='primary' onClick={handleRemoveItems}>
                      <ClearAll />
                    </RedButton>
                  </Tooltip>
                </CustomBox>
                {speedInfo.profile > 0 && (
                  <>
                    <Divider>{<Typography variant='caption'>3 - BUFFS</Typography>}</Divider>
                    <CustomBox>
                      <TextField
                        size='small'
                        disabled
                        label='Recruitment %'
                        id='recruitmen-speed'
                        value={
                          speedInfo.profile > 0
                            ? (speedInfo.profile +
                                (speedInfo.duke ? 6 : 0) +
                                (speedInfo.baron ? 5 : 0) +
                                (speedInfo.nationalRecruitment?.percentage > 0
                                  ? speedInfo.nationalRecruitment?.percentage
                                  : 0)) *
                              1
                            : 0
                        }
                        variant='outlined'
                        type='number'
                      />
                    </CustomBox>
                    <CustomBox>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={speedInfo.duke}
                            disabled={speedInfo.profile ? false : true}
                            onChange={e => {
                              handleTroopHours({
                                ...speedInfo,
                                baron: e.target.checked ? false : speedInfo.baron,
                                duke: e.target.checked
                              })
                            }}
                            name='duke-checked'
                            color='primary'
                          />
                        }
                        label='Grand Duke Buff (6%)'
                      />
                    </CustomBox>
                    <CustomBox>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={speedInfo.baron}
                            disabled={speedInfo.profile ? false : true}
                            onChange={e => {
                              handleTroopHours({
                                ...speedInfo,
                                duke: e.target.checked ? false : speedInfo.duke,
                                baron: e.target.checked
                              })
                            }}
                            name='baron-checked'
                            color='primary'
                          />
                        }
                        label='Baron Buff (5%)'
                      />
                    </CustomBox>
                    <CustomBox>
                      <TextField
                        select
                        size='small'
                        label='National Rec. Skill'
                        id='nationalRecruitment'
                        value={speedInfo.nationalRecruitment?.level > 0 ? speedInfo.nationalRecruitment?.level : ''}
                        variant='outlined'
                        disabled={speedInfo.profile ? false : true}
                        onChange={e => {
                          const nrObj = recruitmentConfig?.default?.nationalRecruitmentList?.find(
                            nr => nr.level === e.target.value
                          )
                          handleTroopHours({ ...speedInfo, nationalRecruitment: nrObj })
                        }}
                      >
                        {recruitmentConfig?.default?.nationalRecruitmentList?.map(option => (
                          <MenuItem key={option.level} value={option.level}>
                            {option.percentage}% (Lvl {option.level})
                          </MenuItem>
                        ))}
                      </TextField>
                    </CustomBox>

                    <Divider>{<Typography variant='caption'>4 - TROOPS</Typography>}</Divider>
                    <CustomBox>
                      <TextField
                        label='Troops Per Batch'
                        id='troops-batch'
                        size='small'
                        variant='outlined'
                        type='number'
                        disabled={speedInfo.profile > 0 ? false : true}
                        value={speedInfo.troopsBatch > 0 ? speedInfo.troopsBatch : ''}
                        onChange={e => {
                          const value = +e.target.value > 4500 ? 4500 : +e.target.value <= 1 ? 1 : +e.target.value
                          handleTroopHours({ ...speedInfo, troopsBatch: value })
                        }}
                        sx={{ maxWidth: '170px', marginRight: '5px' }}
                      />
                      <TextField
                        select
                        label='Troops Tier'
                        id='troops-points'
                        size='small'
                        variant='outlined'
                        type='number'
                        value={speedInfo.troopTier > 0 ? speedInfo.troopTier : 13}
                        disabled={speedInfo.profile > 0 ? false : true}
                        onChange={e => {
                          handleTroopHours({ ...speedInfo, troopTier: e.target.value })
                        }}
                      >
                        {recruitmentConfig?.default?.troopsPoints?.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </CustomBox>
                    <CustomBox>
                      <TextField
                        disabled
                        label='Total time per Batch'
                        id='hours-per-batch'
                        value={speedInfo.timeBatch.length > 0 ? speedInfo.timeBatch : ''}
                        size='small'
                        variant='outlined'
                        type='text'
                      />
                    </CustomBox>

                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                      <Button
                        disabled={
                          speedInfo.troopTier.length === 0 || speedInfo.troopsBatch === 0
                            ? true
                            : speedInfo.userInfo.ns.d * 24 +
                                speedInfo.userInfo.ns.h +
                                speedInfo.userInfo.rs.d * 24 +
                                speedInfo.userInfo.rs.h >
                              0
                            ? false
                            : true
                        }
                        variant='contained'
                        endIcon={<Refresh />}
                        onClick={handleCalculate}
                      >
                        CALCULATE
                      </Button>
                    </Box>
                    {speedInfo.troopTier.length === 0 || speedInfo.troopsBatch === 0
                      ? true
                      : speedInfo.userInfo.ns.d * 24 +
                          speedInfo.userInfo.ns.h +
                          speedInfo.userInfo.rs.d * 24 +
                          speedInfo.userInfo.rs.h >
                        0
                      ? false
                      : true && (
                          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <Typography variant='caption' color='error' align='center'>
                              You need to specify how many speeds you have in Normal and Recruitment Speeds.
                            </Typography>
                          </Box>
                        )}
                  </>
                )}
                {speedInfo.totalTroopsGrl > 0 && (
                  <>
                    <Divider>{<Typography variant='caption'>5 - RESULTS</Typography>}</Divider>
                    <Divider>{<Typography variant='caption'>5.1 - RECRUITMENT</Typography>}</Divider>
                    <TableContainer>
                      <Table
                        aria-labelledby='tableTitleTotals'
                        size={'small'}
                        aria-label='enhanced table totals'
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: 'none'
                          }
                        }}
                      >
                        <TableBody>
                          <TableRow hover>
                            <TableCell align='right'>{<Typography color='primary'>Total</Typography>}</TableCell>
                            <TableCell align='center'>{''}</TableCell>
                            <TableCell align='center'>{''}</TableCell>
                          </TableRow>

                          <TableRow hover>
                            <TableCell align='right'>
                              {
                                <Typography variant='body1' color='textPrimary'>
                                  {Math.round(speedInfo.totalTroops).toLocaleString()}
                                </Typography>
                              }
                            </TableCell>
                            <TableCell align='left'>
                              {
                                <Typography variant='body1' color='primary'>
                                  Troops from Speeds
                                </Typography>
                              }
                            </TableCell>

                            <TableCell align='center'>{''}</TableCell>
                          </TableRow>
                          {recruitmentTemplates.find(p => p.recruitmentSpeed === speedInfo.profile)?.gemQty &&
                            speedInfo.userInfo.gems > 0 && (
                              <TableRow hover>
                                <TableCell align='right'>
                                  {
                                    <Typography variant='body1' color='textPrimary'>
                                      {Math.round(speedInfo.totalTroopsGems ?? 0).toLocaleString()}
                                    </Typography>
                                  }
                                </TableCell>
                                <TableCell align='left'>
                                  {
                                    <Typography variant='body1' color='primary'>
                                      Troops from Gems
                                    </Typography>
                                  }
                                </TableCell>

                                <TableCell align='center'>{''}</TableCell>
                              </TableRow>
                            )}
                          <TableRow hover>
                            <TableCell align='right'>
                              {
                                <Typography variant='h6' color='textPrimary'>
                                  {Math.round(speedInfo.totalTroopsGrl).toLocaleString()}
                                </Typography>
                              }
                            </TableCell>
                            <TableCell align='left'>
                              {
                                <Typography variant='body1' color='primary'>
                                  Total Troops(All)
                                </Typography>
                              }
                            </TableCell>

                            <TableCell align='center'>{''}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell align='right'>
                              {
                                <Typography variant='h6' color='textPrimary'>
                                  {recruitmentConfig.default.troopsPoints.find(t => t.value === speedInfo.troopTier)
                                    .points *
                                    speedInfo.totalTroopsGrl >
                                  0
                                    ? Math.round(
                                        recruitmentConfig.default.troopsPoints.find(
                                          t => t.value === speedInfo.troopTier
                                        ).points * speedInfo.totalTroopsGrl
                                      ).toLocaleString()
                                    : 0}
                                </Typography>
                              }
                            </TableCell>
                            <TableCell align='left'>
                              {
                                <Typography variant='body1' color='primary'>
                                  Total Points (Void/Frenzy)
                                </Typography>
                              }
                            </TableCell>

                            <TableCell align='center'>{''}</TableCell>
                          </TableRow>
                          <TableRow hover>
                            <TableCell align='right'>
                              {
                                <Typography variant='h6' color='textPrimary'>
                                  {speedInfo.totalTroopsGrl > 0
                                    ? Math.round(
                                        speedInfo.totalTroopsGrl *
                                          recruitmentConfig.default.troopsPoints.find(
                                            t => t.value === speedInfo.troopTier
                                          ).bp
                                      ).toLocaleString()
                                    : 0}
                                </Typography>
                              }
                            </TableCell>
                            <TableCell align='left'>
                              {
                                <Typography variant='body1' color='primary'>
                                  Total Battle Power (BP)
                                </Typography>
                              }
                            </TableCell>

                            <TableCell align='center'>{''}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Divider>{<Typography variant='caption'>5.2 - RSS NEEDED</Typography>}</Divider>
                    <Typography variant='body1' color='primary'>
                      {speedInfo.rss?.length > 0 &&
                        speedInfo.rss?.map(troop => (
                          <List key={troop.key}>
                            <ListItem alignItems='flex-start'>
                              <ListItemAvatar>
                                <Avatar alt={troop.key} src={`/images/colossus/${troop.name.toLowerCase()}.jpg`} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={`${troop.name} T${speedInfo.troopTier}`}
                                secondary={
                                  <>
                                    <Icon icon='game-icons:wheat' color='#e7ba83' />
                                    {`${formatCompactNumber(troop?.w)}  `}
                                    <Icon icon='game-icons:wood-pile' color='#c18439' />
                                    {`${formatCompactNumber(troop?.f)}  `}
                                    <Icon icon='game-icons:stone-pile' color='#ffffff' />
                                    {`${formatCompactNumber(troop?.s)}  `}
                                    <Icon icon='game-icons:metal-bar' color='#8f8881' />
                                    {`${formatCompactNumber(troop?.i)}  `}
                                  </>
                                }
                              />
                            </ListItem>
                            <Divider variant='inset' component='li' />
                          </List>
                        ))}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Card>
      </>
    </>
  )
}

export default Speeds
