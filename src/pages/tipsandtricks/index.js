// ** React Imports
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import { infoData } from 'src/data/tipsandtricks'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Styled Components
import { ClearAll, ExpandMore, Search } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  createTheme
} from '@mui/material'
import CustomHeader from 'src/@core/components/Header'

const theme = createTheme()

const TipsNTricks = props => {
  // ** Hooks
  const router = useRouter()

  const [chartData, setChartData] = useState([
    ...infoData.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
  ])
  const [search, setSearch] = useState({ found: true, search: '' })
  const [openLink, setOpenLink] = useState({ open: false, tag: '', render: false })

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 1500)

    return () => clearTimeout(timeoutId)
  }, [search])

  useEffect(() => {
    const url = router?.asPath
    if (url) {
      const newTag = url?.split('/')[2]?.replace('#', '')
      const checkIfExists = infoData?.find(i => i.key === newTag)
      if (checkIfExists) {
        setOpenLink({ open: true, tag: newTag, render: true })

        const { video } = checkIfExists
        const newInfo = { ...checkIfExists, video: { ...video, open: true } }

        const loadExistingUrl = [...infoData.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))].map(
          info => (info.key === newTag ? newInfo : info)
        )
        setChartData(loadExistingUrl)
        router.push(`#${newTag}`)
      } else {
        return setOpenLink({ open: false, tag: '', render: true })
      }
    }
  }, [])

  const handleFilterSearch = input => {
    const searchString = input.target.value

    if (searchString.length === 0 || searchString === null) {
      setChartData([...infoData])
      setSearch({ found: true, search: searchString })

      return
    }

    const newChartData = []

    ;[...infoData].forEach(info => {
      const infoStr = info.title.toString().toLocaleLowerCase()
      const searchData = `${infoStr} ${info.desc}`
      if (searchData.search(searchString.toLocaleLowerCase()) > -1) {
        newChartData.push(info)
      }
    })

    if (newChartData?.length > 0) {
      setChartData(newChartData)
      setSearch({ found: true, search: searchString ?? '' })
    } else {
      setChartData([])
      setSearch({ found: false, search: searchString ?? '' })
    }
  }

  const handleShareLink = refTag => {
    const link = `https://waotools.com/tipsandtricks/#${refTag}`
    navigator.clipboard.writeText(link)

    return toast.success('Link copied!')
  }

  const handleExpand = info => {
    const { video } = info
    const newInfo = { ...info, video: { ...video, open: !video.open } }
    const newChartData = [...chartData].map(data => (data.key === info.key ? newInfo : data))
    setChartData(newChartData)
  }

  return (
    <>
      <>
        <Card>
          <CustomHeader icon='tipsandtricks' title='TIPS N TRICKS' />
          <Divider />
          <Grid container spacing={3} sx={{ padding: '1rem' }}>
            <Grid item xs={12} md={6} lg={8}>
              <Paper
                elevation={6}
                sx={{
                  padding: '2px 4px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '320px',
                  marginBottom: '10px',
                  border: '1px solid rgb(49 113 235 / 39%)'
                }}
              >
                <InputBase
                  sx={{
                    marginLeft: theme.spacing(1),
                    flex: 1,
                    width: '75px',
                    '&:focused': {
                      border: '1px solid rgb(49 113 235 / 39%)'
                    }
                  }}
                  placeholder='Search...'
                  inputProps={{ 'aria-label': 'filter information' }}
                  onChange={handleFilterSearch}
                  value={search.search}
                />
                <Divider orientation='vertical' />
                <IconButton
                  aria-label='clear'
                  onClick={e => {
                    setChartData([...infoData])
                    setSearch({ found: true, search: '' })
                  }}
                >
                  <ClearAll />
                </IconButton>
                <IconButton disabled aria-label='search'>
                  <Search />
                </IconButton>
              </Paper>
              {!search.found && (
                <>
                  <Divider />
                  <div style={{ marginBottom: '10px' }}></div>

                  <Typography variant='body2' align='center'>
                    {`There are not results for "${search.search}"`}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>

          {chartData.length > 0 && openLink?.render && (
            <Grid container spacing={3} style={{ minWidth: '240px' }}>
              <Grid item key='header-accordions' xs={12} md={12} lg={12}>
                {chartData.map(info => {
                  const Body = props => {
                    return <Box dangerouslySetInnerHTML={{ __html: info.desc }} sx={{ whiteSpace: 'pre-wrap' }} />
                  }

                  return (
                    <Box key={info.key}>
                      <Divider />
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Accordion
                          defaultExpanded={openLink?.open && openLink?.tag === info.key ? true : false}
                          id={info.key}
                          square
                          slotprops={{ transition: { unmountOnExit: true } }}
                          sx={{ minWidth: '240px' }}
                          onChange={e => handleExpand(info)}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMore color='primary' />}
                            aria-controls='normal-content'
                            id={info.key}
                            sx={{ minWidth: '240px' }}
                          >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Typography color='primary'>
                                {info.title} ({info.type})
                              </Typography>
                            </Box>
                          </AccordionSummary>
                          <AccordionDetails sx={{ minWidth: '240px' }}>
                            <Typography variant='body2' sx={{ marginBottom: '8px' }}>
                              {info.subTitle}
                            </Typography>
                            {info?.video?.v?.length > 0 && info?.video?.open && (
                              <Box sx={{ display: 'flex', justifyContent: 'center', margin: '8px' }}>
                                <ReactPlayer url={info.video.v} loop />
                              </Box>
                            )}
                            <Box sx={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                              <Body />
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                        <Box>
                          <IconButton
                            aria-label='share-trick'
                            color='primary'
                            sx={{ fontSize: '20px', marginRight: '6px' }}
                            onClick={e => handleShareLink(info.key)}
                          >
                            <Icon icon='fluent:share-24-filled' />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  )
                })}
              </Grid>
            </Grid>
          )}
        </Card>
      </>
    </>
  )
}

export default TipsNTricks
