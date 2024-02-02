import { useState } from 'react'
import { AddCircle, Clear } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Rating,
  TextField,
  Typography
} from '@mui/material'
import { red } from '@mui/material/colors'
import { styled } from '@mui/system'
import { artifactsExperienceDetails, artifactExperience } from 'src/data/artifacts'
import { Icon } from '@iconify/react'

const RedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[400]),
  backgroundColor: red[400],
  '&:hover': {
    backgroundColor: red[800]
  }
}))

const BoxStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}))

// ** Custom Functions
function getExperienceNeeded(levelMin, levelMax, quality) {
  if (levelMin > levelMax || !quality) return ''

  const experienceOutput = []
  const experienceList = artifactExperience[quality].filter(l => l.level > 0)

  const tenth = Number.isInteger(experienceList.length / 10)
    ? experienceList.length / 10
    : Math.trunc(experienceList.length / 10) + 1
  const tenthBlocks = Array.from(Array(tenth).keys())

  tenthBlocks.forEach(block => {
    let experience
    const level = block + 1
    const levelTenth = level * 10
    if (levelTenth < levelMin) return
    if (levelMin <= levelTenth) {
      experience = artifactExperience[quality]
        .filter(l => l.level > levelMin && l.level <= levelTenth)
        .reduce((acc, cur) => acc + cur.exp, 0)
    } else {
      experience = artifactExperience[quality]
        .filter(l => l.level > levelTenth - 10 && l.level <= levelTenth)
        .reduce((acc, cur) => acc + cur.exp, 0)
    }
    experienceOutput.push({ t: levelTenth, exp: experience })
  })

  return experienceOutput
}

function getShardsNeeded(levelMin, levelMax, quality) {
  if (levelMin > levelMax || !quality) return ''
  if (levelMin === levelMax) return [{ t: levelMax, shards: 0 }]

  const shardsOuput = []
  const shardList = [...artifactsExperienceDetails[quality].shards].filter(s => s.star > 0)

  const blocks = Array.from(Array(shardList.length).keys())

  blocks.forEach(block => {
    let shard
    const level = block + 1
    if (level <= levelMin) return
    if (level === 1) {
      shard = shardList.filter(s => s.star >= levelMin && s.star <= level).reduce((acc, cur) => acc + cur.shards, 0)
    } else {
      shard = shardList.filter(s => s.star > levelMin && s.star <= level).reduce((acc, cur) => acc + cur.shards, 0)
    }

    shardsOuput.push({ t: level, shards: shard })
  })

  return shardsOuput
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0)

  return Math.round(value * multiplier) / multiplier
}

// ** Custom Vars
const starIcon = {
  0: 'fluent:star-24-regular',
  25: 'fluent:star-one-quarter-24-regular',
  50: 'fluent:star-half-24-regular',
  75: 'fluent:star-three-quarter-24-regular',
  100: 'fluent:star-24-filled'
}

const qualityInfo = {
  blue: { color: '#216de7e0' },
  purple: { color: '#7028dde0' },
  orange: { color: '#cf893c' }
}

const colors = {
  primary: '#0278aeb5',
  secondary: '#3a354199',
  full: '#12782ad6'
}

const ArtifactDetails = props => {
  const { onChangeArtPrev, onNext, onPrev } = props
  const slot = props.slot
  const artifact = slot.artifact
  const quality = artifact?.quality?.toLowerCase()
  const stars = artifactsExperienceDetails[quality]
  const artifactBase = stars?.shards.find(s => s.star === 1)?.rank
  const iconColor = qualityInfo[quality]?.color
  const artifactMaxStar = artifact?.starsGeneral?.length

  const artifactInput =
    Object.keys(slot.artifactDetails).length > 0
      ? slot.artifactDetails
      : {
          star: 1,
          rank: 0,
          expLevel: 1,
          levelMin: 1,
          levelMax: artifact?.maxLevel
        }

  const expNeeded = getExperienceNeeded(artifactInput.levelMin, artifactInput.levelMax, quality)
  const starsNeeded = getShardsNeeded(artifactInput.star, artifact?.starsGeneral?.length, quality)

  const handleInputChange = (value, type) => {
    let newArtifactInput = { ...artifactInput }
    if (type === 'star') newArtifactInput = { ...newArtifactInput, star: value }
    if (type === 'level') newArtifactInput = { ...newArtifactInput, levelMin: value, expLevel: value }

    const newSlotInfo = { ...slot, artifactDetails: newArtifactInput }
    onChangeArtPrev(artifact?.type, newSlotInfo)
  }

  const handleNextArtifact = e => {
    onNext(slot)
  }

  const handlePrevArtifact = e => {
    onPrev(slot)
  }

  return (
    <Grid key={slot.key} item xs={11} lg={6} md={6}>
      {Object.keys(slot.artifact).length === 0 ? (
        <>
          <Typography variant='body1' color='primary'>
            Select an Artifact for Preview.
          </Typography>
        </>
      ) : (
        <Paper
          elevation={12}
          sx={{
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Box>
            <Box>
              <Typography
                variant='h6'
                color={iconColor}
                align='left'
                sx={{ fontWeight: 600, paddingLeft: '1rem', paddingTop: '1rem' }}
              >
                {artifact?.desc}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', paddingLeft: '1rem' }}>
                <Typography variant='body2' color={iconColor} align='left'>
                  Lv.{artifactInput?.expLevel} / {artifact?.maxLevel}
                </Typography>
                <Box key={`header-icons-${artifact?.key}`} sx={{ marginLeft: '5px' }}>
                  {artifact?.starsGeneral?.map(star => {
                    const starPercent = artifactInput?.star >= star.star ? 100 : 0

                    return (
                      <>
                        <Icon
                          key={star.s}
                          fontSize={20}
                          icon={starIcon[starPercent]}
                          style={{ color: `${iconColor}` }}
                        />
                      </>
                    )
                  })}
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ marginTop: '-8px', marginBottom: '10px', display: 'flex', flexWrap: 'wrap', marginRight: '1rem' }}
            >
              <Typography variant='caption' color='primary' sx={{ paddingLeft: '1rem', marginBottom: '15px' }}>
                {artifact?.info}
              </Typography>
            </Box>

            <Divider />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <IconButton aria-label='prev-art' onClick={handlePrevArtifact}>
                <Icon fontSize={50} icon='pepicons-print:angle-left' style={{ color: `${iconColor}` }} />
              </IconButton>

              <Avatar
                variant='square'
                alt={artifact?.key}
                src={`/images/artifacts/${artifact?.key}.png`}
                sx={{ width: '85px', height: '85px', marginTop: '15px', marginBottom: '15px' }}
              />
              <IconButton aria-label='next-art' onClick={handleNextArtifact}>
                <Icon fontSize={50} icon='pepicons-print:angle-right' style={{ color: `${iconColor}` }} />
              </IconButton>
            </Box>
            <Divider>Configuration</Divider>

            <Box
              sx={{
                padding: '1rem'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', my: '8px' }}>
                <TextField
                  value={artifactInput.expLevel}
                  sx={{ maxWidth: '120px' }}
                  align='center'
                  label='Artifact Level'
                  id='artifact-level-select'
                  size='small'
                  variant='outlined'
                  select
                  onChange={e => {
                    handleInputChange(e.target.value, 'level')
                  }}
                >
                  {artifactExperience[quality]?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  value={artifactInput?.star > 0 ? artifactInput?.star : artifactMaxStar}
                  sx={{ maxWidth: '100px', marginLeft: '5px' }}
                  align='center'
                  label='Stars Level'
                  id='stars-level'
                  size='small'
                  variant='outlined'
                  select
                  onChange={e => {
                    handleInputChange(e.target.value, 'star')
                  }}
                >
                  {artifact?.starsGeneral?.map(option => (
                    <MenuItem key={option.key} value={option.star}>
                      {option.star}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box sx={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {expNeeded.length > 0 && (
                  <Box>
                    <Typography variant='body2' color='primary' sx={{ maxWidth: '160px' }}>
                      Artifact Experience needed from Lv.{artifactInput.expLevel}:
                    </Typography>
                    {expNeeded?.map(exp => {
                      return (
                        <Box
                          key={exp.t}
                          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: '2px' }}
                        >
                          <Typography variant='caption' color={colors['primary']}>
                            To Lv{exp.t}:
                          </Typography>
                          <Typography variant='body2' sx={{ ml: '5px' }}>
                            {exp.t === artifact?.maxLevel && exp.exp === 0 ? 'MAXED' : exp.exp.toLocaleString()}
                          </Typography>
                        </Box>
                      )
                    })}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: '2px' }}>
                      <Typography variant='caption' color={colors['primary']}>
                        Total:
                      </Typography>
                      <Typography variant='body2' sx={{ ml: '5px' }}>
                        {expNeeded?.reduce((acc, cur) => acc + cur.exp, 0) === 0
                          ? 'MAXED'
                          : expNeeded?.reduce((acc, cur) => acc + cur.exp, 0).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                )}

                {starsNeeded.length > 0 && (
                  <Box sx={{ maxWidth: '160px' }}>
                    <Typography variant='body2' color='primary'>
                      Artifact Shards needed from {artifactInput.star} Star{artifactInput.star > 1 ? 's' : ''}:
                    </Typography>
                    {starsNeeded?.map(exp => {
                      return (
                        <Box
                          key={exp.t}
                          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: '2px' }}
                        >
                          <Typography variant='caption' color={colors['primary']}>
                            To Lv{exp.t}:
                          </Typography>
                          <Typography variant='body2' sx={{ ml: '5px' }}>
                            {starsNeeded?.reduce((acc, cur) => acc + cur.shards, 0) === 0
                              ? 'MAXED'
                              : exp.shards.toLocaleString()}
                          </Typography>
                        </Box>
                      )
                    })}
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: '2px' }}>
                      <Typography variant='caption' color={colors['primary']}>
                        Total:
                      </Typography>
                      <Typography variant='body2' sx={{ ml: '5px' }}>
                        {starsNeeded?.reduce((acc, cur) => acc + cur.shards, 0) === 0
                          ? 'MAXED'
                          : starsNeeded?.reduce((acc, cur) => acc + cur.shards, 0).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              <Divider>Details</Divider>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                <Typography variant='body2' color='primary'>
                  Base Stat
                </Typography>
                <Box
                  key={artifact?.starsGeneral[0]?.star}
                  sx={{ display: 'flex', flexDirection: 'column', my: '1px', alignItems: 'center' }}
                >
                  <Divider flexItem>
                    <Typography variant='body2'>
                      1{<Icon fontSize={15} icon={starIcon['100']} style={{ color: `${iconColor}` }} />}
                    </Typography>
                  </Divider>

                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={4}>
                      <Typography variant='caption' color={colors.primary}>
                        Shards:
                      </Typography>
                      <Box>
                        <Typography variant='caption'>{`${artifact?.starsGeneral[0]?.shards} (${artifactBase.shard}x${artifactBase.qty})`}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant='caption' color={colors.primary}>
                        Stats:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Typography variant='caption'>{artifact?.starsGeneral[0]?.statDesc}</Typography>
                        <Typography variant='caption'>
                          {round(
                            artifact?.starsGeneral[0]?.stat + artifact?.mainStatInc * (artifactInput?.expLevel - 1),
                            1
                          ).toLocaleString()}
                          {artifact?.starsGeneral[0]?.stat +
                            artifact?.mainStatInc * (artifactInput?.expLevel - 1).toString().length >
                          3
                            ? ''
                            : '%'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                </Box>

                <Typography variant='body2' color='primary' sx={{ my: '5px' }}>
                  Ability
                </Typography>
                {[...artifact?.starsGeneral]
                  ?.filter(s => s.star > 1)
                  .map(sg => {
                    const starsSg = artifactsExperienceDetails[quality].shards.find(s => s.star === sg.star)?.rank

                    return (
                      <Box
                        key={sg.star}
                        sx={{ display: 'flex', flexDirection: 'column', marginBottom: '15px', alignItems: 'center' }}
                      >
                        <Divider flexItem>
                          <Typography variant='body2'>
                            {sg.star}
                            {<Icon fontSize={15} icon={starIcon['100']} style={{ color: `${iconColor}` }} />}
                          </Typography>
                        </Divider>

                        <Grid container spacing={2} alignItems='center'>
                          <Grid item xs={4}>
                            <Typography variant='caption' color={colors.primary}>
                              Shards:
                            </Typography>
                            <Box sx={{}}>
                              <Typography variant='caption'>{`${sg.shards} (${starsSg.shard}x${starsSg.qty})`}</Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant='caption' color={colors.primary}>
                              Stats:
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              <Typography variant='caption'>{sg?.statDesc}</Typography>
                              <Typography variant='caption'>
                                {sg.stat.toLocaleString()}
                                {Math.trunc(sg.stat).toString().length > 3 ? '' : '%'}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )
                  })}

                {artifact?.skill[0]?.desc?.length > 0 && (
                  <>
                    <Typography variant='body2' color='primary' sx={{ my: '5px' }}>
                      Artifact Skill
                    </Typography>
                    <BoxStats>
                      <Typography variant='caption' sx={{ maxWidth: '250px' }}>
                        {artifact?.skill[0]?.desc}
                      </Typography>
                      <Typography variant='caption'>Lv.{artifact?.skill[0].level}</Typography>
                    </BoxStats>
                  </>
                )}
              </Box>
            </Box>

            <Divider light />
          </Box>
        </Paper>
      )}
    </Grid>
  )
}

export default ArtifactDetails
