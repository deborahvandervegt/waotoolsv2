// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ** Custom Components Imports
import { artifactsList } from 'src/data/artifacts'
import { round } from 'src/utils/round'

// ** Styled Components
import { ClearAll, Search } from '@mui/icons-material'
import { Divider, InputBase, Paper } from '@mui/material'
import { nFormatter } from 'src/@core/utils/numberFormatter'
import { Icon } from '@iconify/react'

// ** Custom Functions

// ** Variables
const defaultColumns = [
  {
    flex: 0.03,
    field: 'key',
    headerName: 'Artifact',
    valueGetter: params => params.row?.key,
    renderCell: ({ row }) => {
      const { type, desc } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, flexWrap: 'wrap' }}>
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
    flex: 0.02,
    minWidth: 20,
    field: 'quality',
    headerName: 'Quality',
    renderCell: ({ row }) => <Typography variant='body2'>{row.quality}</Typography>
  },

  {
    flex: 0.08,
    minWidth: 50,
    maxWith: 100,
    field: 'stats',
    headerName: 'Stats',
    renderCell: ({ row }) => {
      const { starsGeneral, mainStatInc, maxLevel } = row
      const statsDesc = []
      starsGeneral.forEach(s => {
        const desc = `${'*'.repeat(s.star)}: ${s.statDesc} ${
          s.star === 1
            ? ` ${
                Math.ceil(s.stat + mainStatInc * (maxLevel - 1)) > 999
                  ? nFormatter(s.stat + mainStatInc * (maxLevel - 1), 1)
                  : `${round(s.stat + mainStatInc * (maxLevel - 1), 1)}%`
              }`
            : `${Math.ceil(s.stat) > 999 ? nFormatter(s.stat, 1) : `${s.stat}%`} `
        }`
        statsDesc.push(desc)
      })

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
          {statsDesc.map((stat, index) => {
            return (
              <Box
                key={stat}
                sx={{
                  minWidth: '150px',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}
              >
                <Typography variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {stat}
                </Typography>
              </Box>
            )
          })}
        </Box>
      )
    }
  }
]

/* eslint-enable */
const ArtifactList = props => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([])
  const [artifactsData, setArtifactsData] = useState([...artifactsList])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const { tabConf } = props
  const [search, setSearch] = useState({ found: true, search: '' })
  console.log(tabConf)
  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 200)

    return () => clearTimeout(timeoutId)
  }, [search])

  const handleFilterSearch = input => {
    const searchString = input.target.value.toLowerCase()

    if (searchString.length === 0 || searchString === null) {
      setArtifactsData([...artifactsList])
      setSearch({ found: true, search: searchString })

      return
    }

    const newArtifactData = []

    artifactsList.forEach(info => {
      const { starsGeneral, mainStatInc, maxLevel } = info
      const statsDesc = []
      starsGeneral.forEach(s => {
        const desc = `${'*'.repeat(s.star)}: ${s.statDesc} ${
          s.star === 1
            ? ` ${
                Math.ceil(s.stat + mainStatInc * (maxLevel - 1)) > 999
                  ? nFormatter(s.stat + mainStatInc * (maxLevel - 1), 1)
                  : `${round(s.stat + mainStatInc * (maxLevel - 1), 1)}%`
              }`
            : `${Math.ceil(s.stat) > 999 ? nFormatter(s.stat, 1) : `${s.stat}%`} `
        }`
        statsDesc.push(desc.toLowerCase())
      })

      const statsDescFormatted = statsDesc.join(', ')

      const infoStr = info.desc.toString().toLocaleLowerCase()
      const searchData = `${infoStr} ${info.type} ${statsDescFormatted}`

      if (searchData.search(searchString.toLocaleLowerCase()) > -1) {
        newArtifactData.push(info)
      }
    })

    if (newArtifactData?.length > 0) {
      setArtifactsData(newArtifactData)
      setSearch({ found: true, search: searchString ?? '' })
    } else {
      setArtifactsData([])
      setSearch({ found: false, search: searchString ?? '' })
    }
  }
  const columns = [...defaultColumns]

  return (
    <>
      <Card sx={{ padding: '1rem' }}>
        <Box
          sx={{
            marginBottom: '10px',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Typography variant='h5' color='primary' align='center'>
            <Icon fontSize={30} icon={tabConf['artifactsList'].icon} />
          </Typography>
          <Typography variant='h5' color='primary' align='center' sx={{ marginLeft: '5px' }}>
            {' ARTIFACTS LIST'}
          </Typography>
        </Box>
        <Divider />
        <Paper
          elevation={6}
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
              setArtifactsData([...artifactsList])
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
            <Alert severity='error' sx={{ margin: '10px' }}>
              <Typography variant='body2' align='center' sx={{ paddingTop: '10px' }}>
                {`There are no results for "${search.search}"`}
              </Typography>
            </Alert>
          </>
        )}

        {artifactsData.length > 0 && (
          <DataGrid
            autoHeight
            pagination
            getRowId={row => row.key}
            rows={artifactsData}
            columns={columns}
            getRowHeight={params => 'auto'}
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

export default ArtifactList
