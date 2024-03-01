// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import { infoData } from 'src/data/general/data'

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  createTheme
} from '@mui/material'
import CustomHeader from 'src/@core/components/Header'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import toast from 'react-hot-toast'

const theme = createTheme()

const DatabaseList = props => {
  // ** Hooks
  const router = useRouter()

  const [chartData, setChartData] = useState([
    ...infoData.sort((a, b) => (a.desc > b.desc ? 1 : b.desc > a.desc ? -1 : 0))
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

        const newInfo = { ...checkIfExists }

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
      const infoStr = info.desc.toString().toLocaleLowerCase()
      const searchData = `${infoStr} ${info.key}`
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
    const link = `https://waotools.com/database/#${refTag}`

    navigator.clipboard.writeText(link)

    return toast.success('Link copied!')
  }

  return (
    <>
      <>
        <Card>
          <CustomHeader icon='database' title='DATABASE' />
          <Divider />
          <Grid
            container
            spacing={3}
            sx={{
              padding: '1rem'
            }}
          >
            <Grid item xs={12}>
              <Paper
                elevation={5}
                component='form'
                sx={{
                  padding: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: '250px',
                  marginBottom: '10px',
                  border: '1px solid rgb(49 113 235 / 39%)'
                }}
              >
                <InputBase
                  sx={{
                    marginLeft: theme.spacing(1),
                    flex: 1,
                    width: '75px'
                  }}
                  placeholder='Data Filter'
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
          <Divider />

          {chartData.length > 0 && openLink?.render && (
            <Grid container spacing={3} sx={{ width: '100%' }}>
              <Grid item key='header-accordions' xs={12}>
                {chartData.map(chart => {
                  let totalQuantity = 0
                  const chartName = chart.desc
                  const info = chart.info

                  return (
                    <Box key={chart.key}>
                      <Divider />
                      <Box
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', alignItems: 'center' }}
                      >
                        <Box>
                          <IconButton
                            aria-label='share-trick'
                            color='primary'
                            sx={{
                              fontSize: '20px',
                              marginRight: '6px',
                              alignContent: 'center',
                              alignItems: 'center',
                              display: 'flex'
                            }}
                            onClick={e => handleShareLink(chart.key)}
                          >
                            <Icon icon='fluent:share-24-filled' />
                          </IconButton>
                        </Box>
                        <Accordion
                          defaultExpanded={openLink?.open && openLink?.tag === chart.key ? true : false}
                          id={chart.key}
                          square
                          sx={{ width: '100%' }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMore color='primary' />}
                            aria-controls='normal-content'
                            id={`normal-header-${chart.slot}`}
                          >
                            <Typography color='primary'>{chartName}</Typography>
                            <Divider />
                          </AccordionSummary>
                          <AccordionDetails>
                            {
                              <Box>
                                <TableContainer>
                                  <Table
                                    key={`${chart.slot}-${chart.key}`}
                                    aria-labelledby='tableTitle'
                                    size={'small'}
                                    aria-label='enhanced table'
                                  >
                                    <TableBody>
                                      {/* HEADER */}
                                      <TableRow>
                                        <TableCell align='center'>{`Level`}</TableCell>
                                        <TableCell align='center'>{`${chart.need} needed`}</TableCell>
                                        <TableCell align='center'>{`Total Needed From Lv0`}</TableCell>
                                        <TableCell align='center'>{`Extra Info`}</TableCell>
                                      </TableRow>

                                      {/* DETAILS */}
                                      {info.map(row => {
                                        totalQuantity =
                                          totalQuantity +
                                          (typeof row.quantity === 'number' ? row.quantity : row.extraQuantity)

                                        return (
                                          <>
                                            <TableRow>
                                              <TableCell align='center'>
                                                {
                                                  <Typography variant='body2' color='textPrimary'>
                                                    {row.level}
                                                  </Typography>
                                                }
                                              </TableCell>
                                              <TableCell align='center'>
                                                {
                                                  <Typography variant='body2' color='textPrimary'>
                                                    {row.quantity.toLocaleString()}
                                                  </Typography>
                                                }
                                              </TableCell>
                                              <TableCell align='center'>
                                                {
                                                  <Typography variant='body2' color='textPrimary'>
                                                    {typeof totalQuantity === 'number'
                                                      ? totalQuantity.toLocaleString()
                                                      : ''}
                                                  </Typography>
                                                }
                                              </TableCell>

                                              {row?.info && (
                                                <TableCell align='center'>
                                                  {
                                                    <Typography variant='body2' color='textPrimary'>
                                                      {row.info}
                                                    </Typography>
                                                  }
                                                </TableCell>
                                              )}
                                            </TableRow>
                                          </>
                                        )
                                      })}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Box>
                            }
                          </AccordionDetails>
                        </Accordion>
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

export default DatabaseList
