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
import { itemList, packs } from 'src/data/packs'
import { round } from 'src/utils/round'
import PackUserListHeader from './PackUserListHeader'

// ** Variables
function getItemName(item) {
  const itemDesc = itemList.find(i => i.key === item)

  if (itemDesc) {
    return itemDesc
  } else {
    return {}
  }
}

const defaultColumns = [
  {
    flex: 0.1,
    field: 'packId',
    minWidth: 100,
    headerName: 'Pack',
    renderCell: ({ row }) => <Typography variant='body2'>{row.desc}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'tab',
    headerName: 'Tab',
    renderCell: ({ row }) => <Typography variant='body2'>{row.tab}</Typography>
  },

  {
    flex: 0.05,
    minWidth: 50,
    field: 'category',
    headerName: 'Category',
    renderCell: ({ row }) => <Typography variant='body2'>{row.category}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'level',
    headerName: 'Lvl',
    renderCell: ({ row }) => <Typography variant='body2'>{row.level}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'price',
    headerName: 'Price',
    renderCell: ({ row }) => <Typography variant='body2'>{row.price}</Typography>
  },

  {
    flex: 0.05,
    minWidth: 50,
    field: 'qty',
    headerName: 'Qty',
    renderCell: ({ row }) => <Typography variant='body2'>{row.qty}</Typography>
  },

  {
    flex: 0.05,
    minWidth: 50,
    field: 'pricePerItem',
    headerName: '$ / Qty',
    renderCell: ({ row }) => <Typography variant='body2'>{row.pricePerItem}</Typography>
  },
  {
    flex: 0.05,
    minWidth: 50,
    field: 'gems',
    headerName: 'Gems',
    renderCell: ({ row }) => <Typography variant='body2'>{row.gems}</Typography>
  }
]

/* eslint-enable */
const PackUserList = props => {
  // ** State
  const { data, deleteRows } = props
  const [selectedRows, setSelectedRows] = useState([])
  const [buildingData, setBuildingData] = useState([...buildingList])
  const activeTab = 'items'
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 15 })
  const [search, setSearch] = useState({ found: true, search: '' })

  useEffect(() => {
    const timeoutId = setTimeout(() => {}, 1500)

    return () => clearTimeout(timeoutId)
  }, [search])

  const dataColumns = [...data]?.map(item => {
    const itemInfo = packs?.find(p => p.packId === item.packId)
    const itemInfoDet = itemInfo?.packDet?.find(pd => pd.l === item.l)

    return {
      packId: item.packId,
      desc: itemInfo?.desc,
      tab: itemInfo?.tab,
      category: itemInfo?.category[0],
      level: itemInfoDet.l,
      price: itemInfoDet.p,
      qty: itemInfoDet.items[0].qty,
      pricePerItem: `${round(itemInfoDet.p / itemInfoDet.items[0].qty, 2).toLocaleString()}`,
      gems: itemInfoDet.items[0].g
    }
  })

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

  const handleClick = packs => {
    deleteRows(packs)
  }

  return (
    <>
      <Card>
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
            <Alert severity='error' sx={{ margin: '10px' }}>
              <Typography variant='body2' align='center' sx={{ paddingTop: '10px' }}>
                {`There are no results for "${search.search}"`}
              </Typography>
            </Alert>
          </>
        )}
        <PackUserListHeader selectedRows={selectedRows} handleClick={handleClick} itemList={data} />

        {dataColumns.length > 0 && (
          <DataGrid
            autoHeight
            pagination
            getRowId={row => row.packId + '-' + row.level}
            checkboxSelection
            rows={dataColumns}
            columns={defaultColumns}
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

export default PackUserList
