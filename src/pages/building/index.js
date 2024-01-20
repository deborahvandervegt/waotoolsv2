// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

// ** Custom Components Imports
import { buildingList } from 'src/data/building'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import { Button, Divider, Fade, InputBase, Paper } from '@mui/material'
import { green, indigo } from '@mui/material/colors'
import { nFormatter } from 'src/@core/utils/numberFormatter'
import { ClearAll, Search } from '@mui/icons-material'

// ** Variables
const defaultColumns = [
  // {
  //   flex: 0.1,
  //   field: 'id',
  //   minWidth: 80,
  //   headerName: '#',
  //   renderCell: ({ row }) => <LinkStyled href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</LinkStyled>
  // },

  // {
  //   flex: 0.1,
  //   minWidth: 80,
  //   field: 'invoiceStatus',
  //   renderHeader: () => <Icon icon='mdi:trending-up' fontSize={20} />,
  //   renderCell: ({ row }) => {
  //     const { dueDate, balance, invoiceStatus } = row
  //     const color = invoiceStatusObj[invoiceStatus] ? invoiceStatusObj[invoiceStatus].color : 'primary'

  //     return (
  //       <Tooltip
  //         title={
  //           <div>
  //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
  //               {invoiceStatus}
  //             </Typography>
  //             <br />
  //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
  //               Balance:
  //             </Typography>{' '}
  //             {balance}
  //             <br />
  //             <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
  //               Due Date:
  //             </Typography>{' '}
  //             {dueDate}
  //           </div>
  //         }
  //       >
  //         <CustomAvatar skin='light' color={color} sx={{ width: '1.875rem', height: '1.875rem' }}>
  //           <Icon icon={invoiceStatusObj[invoiceStatus].icon} fontSize='1rem' />
  //         </CustomAvatar>
  //       </Tooltip>
  //     )
  //   }
  // },
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

  // {
  //   flex: 0.15,
  //   minWidth: 125,
  //   field: 'issuedDate',
  //   headerName: 'Issued Date',
  //   renderCell: ({ row }) => <Typography variant='body2'>{row.issuedDate}</Typography>
  // },
  // {
  //   flex: 0.1,
  //   minWidth: 90,
  //   field: 'balance',
  //   headerName: 'Balance',
  //   renderCell: ({ row }) => {
  //     return row.balance !== 0 ? (
  //       <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //         {row.balance}
  //       </Typography>
  //     ) : (
  //       <CustomChip size='small' skin='light' color='success' label='Paid' />
  //     )
  //   }
  // }
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

    // {
    //   flex: 0.1,
    //   minWidth: 130,
    //   sortable: false,
    //   field: 'actions',
    //   headerName: 'Actions',
    //   renderCell: ({ row }) => (
    //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //       <Tooltip title='Delete Invoice'>
    //         <IconButton size='small' onClick={() => dispatch(deleteInvoice(row.id))}>
    //           <Icon icon='mdi:delete-outline' fontSize={20} />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title='View'>
    //         <IconButton size='small' component={Link} href={`/apps/invoice/preview/${row.id}`}>
    //           <Icon icon='mdi:eye-outline' fontSize={20} />
    //         </IconButton>
    //       </Tooltip>
    //       <OptionsMenu
    //         iconProps={{ fontSize: 20 }}
    //         iconButtonProps={{ size: 'small' }}
    //         menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
    //         options={[
    //           {
    //             text: 'Download',
    //             icon: <Icon icon='mdi:download' fontSize={20} />
    //           },
    //           {
    //             text: 'Edit',
    //             href: `/apps/invoice/edit/${row.id}`,
    //             icon: <Icon icon='mdi:pencil-outline' fontSize={20} />
    //           },
    //           {
    //             text: 'Duplicate',
    //             icon: <Icon icon='mdi:content-copy' fontSize={20} />
    //           }
    //         ]}
    //       />
    //     </Box>
    //   )
    // }
  ]

  const tabContentList = {
    items: (
      <>
        <Card>
          <Paper elevation={6} sx={{ padding: '1rem' }}>
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
                <Divider />
                <div style={{ marginBottom: '10px' }}></div>

                <Typography variant='body2' align='center'>
                  {`There are not results for "${search.search}"`}
                </Typography>
              </>
            )}
          </Paper>{' '}
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
