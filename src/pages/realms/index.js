// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import MuiTabList from '@mui/lab/TabList'

// ** Third Party Imports
import _ from 'lodash'

// ** Custom Components Imports
import { mergeList, globeList } from 'src/data/realms'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import { Button, ButtonGroup, Divider, Fade, InputBase, Paper } from '@mui/material'
import { green, indigo } from '@mui/material/colors'
import { ClearAll, Search } from '@mui/icons-material'

// ** Variables
const defaultColumns = [
  {
    flex: 0.01,
    minWidth: 25,
    field: 'globe',
    headerName: 'Globe',
    renderCell: ({ row }) => (
      <>
        <Box
          key={`${row.primaryRealm}`}
          sx={{
            backgroundColor: row.realmColor,
            borderStyle: 'groove',
            borderColor: 'black',
            borderWidth: 'thin',
            minWidth: '32px',
            paddingLeft: '2px',
            paddingRight: '2px'
          }}
        >
          <Typography align='center' variant='body1' color='black'>
            {row?.globe}
          </Typography>
        </Box>
      </>
    )
  },
  {
    flex: 0.01,
    minWidth: 25,
    field: 'primaryRealm',
    headerName: 'Realm',
    renderCell: ({ row }) => (
      <>
        <Box
          key={`${row.primaryRealm}`}
          sx={{
            backgroundColor: row.realmColor,
            borderStyle: 'groove',
            borderColor: 'black',
            borderWidth: 'thin',
            minWidth: '32px',
            paddingLeft: '2px',
            paddingRight: '2px'
          }}
        >
          <Typography align='center' variant='body1' color='black'>
            {row?.primaryRealm}
          </Typography>
        </Box>
      </>
    )
  },

  {
    flex: 0.04,
    minWidth: 50,
    field: 'realmsMerged',
    headerName: 'Realms Merged',
    valueGetter: params => params.row?.realmsMerged,
    renderCell: ({ row }) => (
      <>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {row?.realmsMerged?.length > 0 ? (
            row?.realmsMerged.map(r => {
              return (
                <Box
                  key={`${row.primaryRealm} - ${r.realm}`}
                  sx={{
                    backgroundColor: r.color,
                    borderStyle: 'groove',
                    borderColor: 'black',
                    borderWidth: 'thin',
                    minWidth: '28px',
                    paddingLeft: '2px',
                    paddingRight: '2px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Typography align='center' variant='caption' color='black'>
                    {r.realm}
                  </Typography>
                </Box>
              )
            })
          ) : (
            <Typography align='center' variant='body1'>
              {'None yet.'}
            </Typography>
          )}
        </Box>
      </>
    )
  },
  {
    flex: 0.01,
    minWidth: 15,
    field: 'mergesQty',
    headerName: ' Qty',
    valueGetter: params => params.row?.mergesQty,
    renderCell: ({ row }) => <Typography variant='body2'>{`${row.mergesQty?.toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.02,
    minWidth: 25,
    field: 'lastMerge',
    headerName: 'Last Merge',
    valueGetter: params => params.row?.lastMerge,
    renderCell: ({ row }) => <Typography variant='body2'>{`${row.lastMerge?.toLocaleString() || 0}`}</Typography>
  }
]

// ** Custom Functions
const generateGlobeList = (globes, realms) => {
  const newItems = realms?.map(realm => {
    let realmGlobe
    const realmsMerged = []

    // Get primary realm globe and color
    globes.forEach(globe => {
      if (_.inRange(realm.primaryRealm, globe.from, globe.to + 1)) {
        realmGlobe = globe
      }
    })
    const mergesQty = realm.realmsMerged?.length ?? 0

    // Get merged realms globe and color
    if (realm?.realmsMerged?.length > 0) {
      realm.realmsMerged.forEach(rMerged => {
        globes.forEach(globe => {
          if (_.inRange(rMerged, globe.from, globe.to + 1)) {
            realmsMerged.push({ realm: rMerged, color: globe.color })
          }
        })
      })
    }

    return {
      ...realm,
      globe: realmGlobe?.globe,
      realmColor: realmGlobe?.color,
      mergesQty: mergesQty,
      realmsMerged: realmsMerged
    }
  })

  return newItems ?? []
}

/* eslint-enable */
const Realms = () => {
  // ** State
  const activeTab = 'items'
  const realmList = generateGlobeList(globeList, mergeList)
  const [itemList, setItemList] = useState(realmList)
  const [selectedRows, setSelectedRows] = useState([])

  const [search, setSearch] = useState({ found: true, search: '' })
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 50 })

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 1500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const handleFilterSearch = input => {
    const searchString = input.target.value
    if (searchString.length === 0 || searchString === null) {
      setItemList(realmList)
      setSearch({ found: true, search: searchString })

      return
    }

    const newRealmList = []

    realmList.forEach(realm => {
      const realmStr = realm.primaryRealm.toString().toLocaleLowerCase()

      const realmsMergedStr = realm.realmsMerged
        .map(r => r.realm)
        .join(' ')
        .toString()
        .toLocaleLowerCase()
      const searchData = `${realmStr} ${realmsMergedStr}`

      if (searchData.search(searchString.toLocaleLowerCase()) > -1) {
        newRealmList.push(realm)
      }
    })
    if (newRealmList?.length > 0) {
      setItemList(newRealmList)
      setSearch({ found: true, search: searchString ?? '' })
    } else {
      setItemList([])
      setSearch({ found: false, search: searchString ?? '' })
    }
  }

  const handleGlobeRealmsSearch = globe => {
    const globeObj = globeList.find(g => g.globe === globe)

    const newRealmList = []
    const loopTo = globeObj.to + 1

    for (let loopFrom = globeObj.from; loopFrom < loopTo; loopFrom++) {
      realmList.forEach(realm => {
        if (realm.realmsMerged.find(rm => rm.realm === loopFrom)) {
          newRealmList.push(realm)
        }
      })
    }

    const uniqueList = [...new Set(newRealmList.map(realm => realm.primaryRealm))]
    const newUniqueList = []

    uniqueList.forEach(uRealm => {
      const uRealmObj = realmList.find(fRealm => fRealm.primaryRealm === uRealm)
      if (uRealmObj) {
        newUniqueList.push(uRealmObj)
      }
    })

    if (newUniqueList?.length > 0) {
      setItemList(newUniqueList)
    }
  }

  const handleGlobeSearch = globe => {
    const newRealmList = [...realmList.filter(realm => realm.globe === globe)]

    if (newRealmList?.length > 0) {
      setItemList(newRealmList)
    }
  }

  const handleShowAllSearch = globe => {
    const newRealmList = [...realmList]

    if (newRealmList?.length > 0) {
      setItemList(newRealmList)
    }
  }

  const columns = [...defaultColumns]

  const tabContentList = {
    items: (
      <>
        <Card>
          <Paper elevation={6} sx={{ padding: '1rem' }}>
            <Typography variant='body2' align='center'>
              REALMS GLOBES - LAST UPDATE: 10 NOVEMBER 2023
            </Typography>
            <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />
            <Box key='wrapping-div' sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
              {globeList?.length > 0 && (
                <>
                  <Grid container spacing={3}>
                    {globeList.map(globe => {
                      return (
                        <Grid key={globe.globe} item xs={6} lg={2}>
                          <ButtonGroup
                            key={globe.globe}
                            color='primary'
                            size='small'
                            sx={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                          >
                            <Button
                              sx={{ backgroundColor: globe.color }}
                              aria-label={`${globe.globe}`}
                              onClick={e => {
                                handleGlobeSearch(globe.globe)
                              }}
                            >
                              {
                                <Typography variant='body2' color='black'>
                                  {globe.globe}
                                </Typography>
                              }
                            </Button>
                            <Button
                              aria-label={`from-to-${globe.globe}`}
                              onClick={e => {
                                handleGlobeRealmsSearch(globe.globe)
                              }}
                            >
                              <Typography variant='caption' color='textPrimary' sx={{ minWidth: '71px' }}>
                                {globe.from}
                                {' - '}
                                {globe.to}
                              </Typography>
                            </Button>
                          </ButtonGroup>
                        </Grid>
                      )
                    })}

                    <Grid key={'00'} item xs={6} lg={2}>
                      <ButtonGroup
                        color='primary'
                        size='small'
                        sx={{ marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                      >
                        <Button
                          size='small'
                          variant='contained'
                          aria-label={`from-to-show-all`}
                          onClick={handleShowAllSearch}
                        >
                          SHOW ALL
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
            <Divider sx={{ marginTop: '10px', marginBottom: '15px' }} />
            <Paper
              elevation={12}
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
                  marginLeft: theme => theme.spacing(1),
                  flex: 1,
                  width: '75px'
                }}
                placeholder='Realm Filter'
                inputProps={{ 'aria-label': 'filter information' }}
                onChange={handleFilterSearch}
                value={search.search}
              />
              <IconButton
                aria-label='clear'
                onClick={e => {
                  setItemList([...realmList])
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
          </Paper>
          {itemList.length > 0 && (
            <Box>
              <DataGrid
                autoHeight
                pagination
                disableDensitySelector
                getRowId={row => row.primaryRealm + '-' + row.globe}
                getRowHeight={params => 'auto'}
                rows={itemList}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[50, 75, 100]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={rows => setSelectedRows(rows)}
                slots={{ toolbar: GridToolbar }}
              />
            </Box>
          )}
        </Card>
      </>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='realms' title='REALMS' />
            <Divider />
            {tabContentList[activeTab]}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Realms
