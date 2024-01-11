// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import MuiTabList from '@mui/lab/TabList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import { buildingList, itemTemplates, extraBarracks, azuCalcConf } from 'src/data/building'

// ** Styled Components
import CustomHeader from 'src/@core/components/Header'
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Fade,
  InputBase,
  Paper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  useMediaQuery
} from '@mui/material'
import { green, indigo } from '@mui/material/colors'
import { nFormatter } from 'src/@core/utils/numberFormatter'
import { TabContext, TabPanel } from '@mui/lab'
import nRound from 'src/@core/utils/numberRound'
import moment from 'moment'
import { ClearAll, Search } from '@mui/icons-material'

// ** Styled component for the link in the dataTable
const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: indigo[500],
  color: theme.palette.getContrastText(indigo[500]),
  '&:hover': {
    backgroundColor: indigo[700]
  }
}))

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: green[500],
  color: theme.palette.getContrastText(green[500]),
  '&:hover': {
    backgroundColor: green[700]
  }
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const TabList = styled(MuiTabList)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 38,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
      minWidth: 130
    }
  }
}))

const CustomBox = styled(Box)(({ theme }) => ({
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'row'
}))

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

const defaultInfo = {
  itemList: [],
  totalAzurite: [],
  movementsList: [],
  preset: '',
  presetB: '',
  selectedList: [],
  totalGot: { a: 0, w: 0, f: 0, s: 0, i: 0 },
  azuCalculator: { mineHour: 0, rcLevel: 0, card: 0, packs: 0, chests: 0, owned: 0, needed: 0, total: 0 }
}

// ** Custom Functions
function getTotalAzurite(template) {
  let newArray = []

  const arr = itemTemplates?.find(i => i.template === template)

  if (!arr) return 0

  arr.buildings.forEach(t => {
    const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
    if (buildingObj) {
      newArray.push(buildingObj)
    }
  })

  if (newArray?.length > 0) {
    const totalAzurite = newArray.reduce((accumulator, currentValue) => accumulator + currentValue?.rss?.a, 0)

    return totalAzurite
  }

  return 0
}

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
