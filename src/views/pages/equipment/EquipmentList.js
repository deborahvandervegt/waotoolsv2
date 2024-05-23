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
import { round } from 'src/utils/round'
import { equipmentList } from 'src/data/equipment'

// ** Styled Components
import { ClearAll, Search } from '@mui/icons-material'
import { Divider, InputBase, Paper } from '@mui/material'
import { nFormatter } from 'src/@core/utils/numberFormatter'
import { Icon } from '@iconify/react'

// ** Custom Functions
const getData = tmpData => {
  if (tmpData?.length === 0) return

  const equipmentsData = [...tmpData]

  const tempInfo = [...equipmentsData].map(b => {
    let statsDescPurple = []
    let statsDescOrange = []

    const materialInfo = b.materials.map(m => {
      return `${m.m} x${m.q}`
    })

    b.levels.forEach(level => {
      const info = b.levels
        .find(l => l.quality === level.quality)
        .stats.map(stat => {
          return `${stat.statDesc} ${Math.ceil(stat.stat) > 999 ? nFormatter(stat.stat, 1) : `${stat.stat}%`}`
        })

      if (level.quality === 'Purple') {
        statsDescPurple = [...info]
      } else {
        statsDescOrange = [...info]
      }
    })
    const statsDescPurpleFormatted = statsDescPurple.join('\n')
    const statsDescOrangeFormatted = statsDescOrange.join('\n')
    const materialsFormatted = materialInfo.join('\n')

    return {
      type: b.type,
      equipment: b.desc,
      level: b.level,
      recommended: b.troop,
      materials: materialsFormatted,
      statsPurple: statsDescPurpleFormatted,
      statsOrange: statsDescOrangeFormatted
    }
  })

  return tempInfo
}

// ** Variables
const defaultColumns = [
  {
    flex: 0.01,
    minWidth: 20,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }) => <Typography variant='body2'>{row.type}</Typography>
  },
  {
    flex: 0.02,
    minWidth: 20,
    field: 'equipment',
    headerName: 'Equipment',
    renderCell: ({ row }) => <Typography variant='body2'>{row.equipment}</Typography>
  },
  {
    flex: 0.01,
    minWidth: 20,
    field: 'level',
    headerName: 'Level',
    renderCell: ({ row }) => <Typography variant='body2'>{row.level}</Typography>
  },
  {
    flex: 0.02,
    minWidth: 20,
    field: 'recommended',
    headerName: 'Recommended For',
    renderCell: ({ row }) => <Typography variant='body2'>{row.recommended}</Typography>
  },
  {
    flex: 0.02,
    minWidth: 20,
    field: 'materials',
    headerName: 'Materials',
    renderCell: ({ row }) => {
      const { equipment } = row
      const materials = row.materials.split('\n')

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {materials.map((m, index) => {
            return (
              <Typography key={`${equipment}-${m}-${index}`} variant='body2'>
                {m}
              </Typography>
            )
          })}
        </Box>
      )
    }
  },
  {
    flex: 0.02,
    minWidth: 20,
    field: 'statsPurple',
    headerName: 'Stats Purple',
    renderCell: ({ row }) => {
      const { equipment } = row
      const stats = row.statsPurple.split('\n')

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {stats.map((m, index) => {
            return (
              <Typography key={`${equipment}-${m}-${index}`} variant='body2'>
                {m}
              </Typography>
            )
          })}
        </Box>
      )
    }
  },
  {
    flex: 0.02,
    minWidth: 20,
    field: 'statsOrange',
    headerName: 'Stats Orange',
    renderCell: ({ row }) => {
      const { equipment } = row
      const stats = row.statsOrange.split('\n')

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {stats.map((m, index) => {
            return (
              <Typography key={`${equipment}-${m}-${index}`} variant='body2'>
                {m}
              </Typography>
            )
          })}
        </Box>
      )
    }
  }
]

/* eslint-enable */
const EquipmentList = props => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([])
  const [equipmentsData, setEquipmentsData] = useState([...equipmentList])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const { tabConf } = props
  const [search, setSearch] = useState({ found: true, search: '' })

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 3000)

    return () => clearTimeout(timeoutId)
  }, [search])

  const data = getData(equipmentsData)

  const handleFilterSearch = input => {
    const searchString = input.target.value.toLowerCase()

    if (searchString.length === 0 || searchString === null) {
      setEquipmentsData([...equipmentList])
      setSearch({ found: true, search: searchString })

      return
    }

    const newEquipmentData = []

    const tempData = getData(equipmentList)

    tempData.forEach(info => {
      const { statsPurple, statsOrange, materials, recommended } = info
      const infoStr = info.equipment.toString()?.toLowerCase()

      const searchData = `${infoStr} ${statsPurple?.toLowerCase()} ${statsOrange.toLowerCase()} ${materials.toLowerCase()} ${recommended?.toLowerCase()}`

      if (searchData.search(searchString?.toLowerCase()) > -1) {
        const equipmentObj = equipmentList?.find(e => e.desc === info.equipment)
        newEquipmentData.push(equipmentObj)
      }
    })

    if (newEquipmentData?.length > 0) {
      setEquipmentsData(newEquipmentData)
      setSearch({ found: true, search: searchString ?? '' })
    } else {
      setEquipmentsData([])
      setSearch({ found: false, search: searchString ?? '' })
    }
  }

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
            <Icon fontSize={30} icon={tabConf['list'].icon} />
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
              setEquipmentsData([...equipmentList])
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

        {data?.length > 0 && (
          <DataGrid
            autoHeight
            pagination
            getRowId={row => row.equipment}
            rows={data}
            columns={defaultColumns}
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

export default EquipmentList
