// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ** Custom Components Imports
import { buildingList } from 'src/data/building'

// ** Styled Components
import { ClearAll, Search } from '@mui/icons-material'
import { Divider, InputBase, Paper } from '@mui/material'
import CustomHeader from 'src/@core/components/Header'
import { nFormatter } from 'src/@core/utils/numberFormatter'

// ** Variables
const defaultColumns = [
  {
    flex: 0.1,
    field: 'item',
    minWidth: 100,
    headerName: 'Item',
    valueGetter: params => params.row?.desc,
    renderCell: ({ row }) => {
      const { type, desc } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderClient(row)} */}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {desc}
            </Typography>
            <Typography noWrap variant='caption'>
              {type}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'level',
    headerName: 'Level',
    renderCell: ({ row }) => <Typography variant='body2'>{`${row.level.toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'azurite',
    headerName: 'Azurite',
    valueGetter: params => params.row?.rss?.a,
    renderCell: ({ row }) => <Typography variant='body2'>{`${row.rss.a.toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'food',
    headerName: 'Food',
    valueGetter: params => params.row?.rss?.f,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.f).toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'wood',
    headerName: 'Wood',
    valueGetter: params => params.row?.rss?.w,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.w).toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'stone',
    headerName: 'Stone',
    valueGetter: params => params.row?.rss?.s,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.s).toLocaleString() || 0}`}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'iron',
    headerName: 'Iron',
    valueGetter: params => params.row?.rss?.i,
    renderCell: ({ row }) => <Typography variant='body2'>{`${nFormatter(row.rss.i).toLocaleString() || 0}`}</Typography>
  }
]

/* eslint-enable */
const Building = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([])
  const [buildingData, setBuildingData] = useState([...buildingList])
  const activeTab = 'items'
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const [search, setSearch] = useState({ found: true, search: '' })

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 1500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const handleFilterSearch = input => {
    const searchString = input.target.value

    if (searchString.length === 0 || searchString === null) {
      setBuildingData([...buildingList])
      setSearch({ found: true, search: searchString })

      return
    }

    const newBuildingData = []

    buildingList.forEach(info => {
      const infoStr = info.desc.toString().toLocaleLowerCase()
      const searchData = `${infoStr} ${info.type}`
      if (searchData.search(searchString.toLocaleLowerCase()) > -1) {
        newBuildingData.push(info)
      }
    })

    if (newBuildingData?.length > 0) {
      setBuildingData(newBuildingData)
      setSearch({ found: true, search: searchString ?? '' })
    } else {
      setBuildingData([])
      setSearch({ found: false, search: searchString ?? '' })
    }
  }

  const columns = [
    ...defaultColumns
  ]

  const tabContentList = {
    items: (
      <>
        <Card>
          <Paper
            elevation={12}
            component='form'
            sx={{
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '250px',
              margin: '10px',
              border: '1px solid rgb(49 113 235 / 39%)'
            }}
          >
            <InputBase
              sx={{
                marginLeft: theme => theme.spacing(1),
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
                setBuildingData([...buildingList])
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
              <Alert severity="error" sx={{ margin: '10px'}}>
                <Typography variant='body2' align='center' sx={{ paddingTop: '10px' }}>
                  {`There are no results for "${search.search}"`}
                </Typography>
              </Alert>
            </>
          )}
          
          {buildingData.length > 0 && (
            <DataGrid
              autoHeight
              pagination
              getRowId={row => row.building + '-' + row.level}
              rows={buildingData}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={rows => setSelectedRows(rows)}
              slots={{ toolbar: GridToolbar }}
            />
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
            <CustomHeader icon='building' title='BUILDINGS LIST' />
            <Divider />
            {tabContentList[activeTab]}
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Building
