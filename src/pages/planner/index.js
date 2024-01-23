// ** React Imports
import { forwardRef, useEffect, useState } from 'react';

// ** Next Import

// ** MUI Imports
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MuiTabList from '@mui/lab/TabList';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Imports
import toast from 'react-hot-toast';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';
import { azuCalcConf, buildingList, extraBarracks, itemTemplates } from 'src/data/building';
import TableHeader from 'src/views/apps/invoice/list/TableHeader';

// ** Styled Components
import { TabContext, TabPanel } from '@mui/lab';
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Fade,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import moment from 'moment';
import CustomHeader from 'src/@core/components/Header';
import { nFormatter } from 'src/@core/utils/numberFormatter';
import nRound from 'src/@core/utils/numberRound';

// ** Styled component for the link in the dataTable (Add from template button)
const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.skyPaletteSecondary,
  color: theme.palette.customColors.skyPaletteTitle,
  '&:hover': {
    backgroundColor: theme.palette.customColors.skyPaletteSecondary,
    filter: 'brightness(0.85)'  }
}))

// ** Save button
const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.customColors.skyPaletteTertiary,
  color: theme.palette.customColors.skyPaletteTitle,
  '&:hover': {
    backgroundColor: theme.palette.customColors.skyPaletteTertiary,
    filter: 'brightness(0.85)'
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
const Planner = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([])
  const [activeTab, setActiveTab] = useState('items')
  const [isLoading, setIsLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [showAddTemplate, setShowAddTemplate] = useState(false)
  const [showAddItems, setShowAddItems] = useState(false)
  const [showAddTemp, setShowAddTemp] = useState(false)
  const [showAddTempAzurite, setShowAddtempAzurite] = useState(0)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const hideText = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [planInfo, setPlanInfo] = useState(defaultInfo)

  // ** Hooks
  useEffect(() => {
    let saved
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      saved = JSON.parse(localStorage.getItem('planInfo'))
    }

    if (saved) setPlanInfo(saved)
    setIsLoading(false)
  }, [])

  const handleLoadTemplateChange = e => {
    const newPreset = e.target.value
    const selectedList = itemTemplates?.find(i => i.template === newPreset)

    setPlanInfo({
      ...planInfo,
      preset: newPreset,
      selectedList: [...selectedList.buildings, ...planInfo?.selectedList]
    })
    const tmpA = getTotalAzurite(newPreset)
    const tmpB = getTotalAzurite(planInfo?.presetB)
    const total = tmpA + (tmpB > 0 ? tmpB : 0)
    setShowAddtempAzurite(total)
  }

  const handleLoadTemplateBChange = e => {
    const newPreset = e.target.value
    const selectedList = itemTemplates?.find(i => i.template === newPreset)

    setPlanInfo({
      ...planInfo,
      presetB: newPreset,
      selectedList: [...selectedList.buildings, ...planInfo?.selectedList]
    })
    const tmpA = getTotalAzurite(newPreset)
    const tmpB = getTotalAzurite(planInfo?.preset)
    const total = tmpA + (tmpB > 0 ? tmpB : 0)
    setShowAddtempAzurite(total)
  }

  const handleSelectedItemsChange = v => {
    const newValues = [...v]
    setPlanInfo({
      ...planInfo,
      selectedList: newValues
    })
  }

  const handleAddTemplateClose = props => {
    setShowAddTemplate(false)
  }

  const handleAddItemClose = e => {
    setShowAddItems(false)
    handleClearDialogForm()
  }

  const handleClearDialogForm = () => {
    setShowAddTemp(false)
    setShowAddtempAzurite(false)
    setShowAddtempAzurite(false)

    setPlanInfo({ ...planInfo, preset: '', presetB: '', selectedList: [] })
  }

  const handleLoadTemplateSave = e => {
    let newItemList = []
    let templateObjA, templateObjB
    const itemList = [...planInfo.itemList]

    templateObjA = itemTemplates?.find(i => i.template === planInfo?.preset)
    if (planInfo?.presetB?.length > 0) templateObjB = itemTemplates?.find(i => i.template === planInfo?.presetB)
    if (templateObjB) templateObjA.buildings = [...templateObjA.buildings, ...templateObjB.buildings]
    const templateObj = templateObjA

    if (templateObj?.buildings?.length > 0) {
      templateObj.buildings.forEach(t => {
        const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
        if (buildingObj) {
          newItemList.push(buildingObj)
        }
      })
    }

    if (newItemList?.length > 0) {
      const newFilteredItemList = [
        ...newItemList?.filter(elem => {
          return !itemList?.some(ele => {
            return ele.building === elem.building && ele.level === elem.level
          })
        })
      ]

      const newList = [...itemList, ...newFilteredItemList]
      let currentDate = new Date().toJSON().slice(0, 10)
      let newMovementsList = []

      if (newList.length > 0) {
        newList.forEach(t => {
          const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
          if (buildingObj) {
            newMovementsList.push(buildingObj)
          }
        })
      }

      const newMovements = [...newMovementsList].map(m => {
        return {
          building: m.building,
          desc: m.desc,
          level: m.level,
          rss: { a: m.rss.a },
          movementDate: currentDate,
          type: 'ADDED'
        }
      })

      // setMovementsList([...newMovements, ...movementsList])
      setPlanInfo({ ...planInfo, itemList: newList, preset: '', presetB: '', selectedList: [] })
      setShowAddTemplate(false)
      setShowAddTemp(false)
      setShowAddtempAzurite(false)
      setShowAddtempAzurite(false)

      return toast.success('Item/s added from Preset successfully!')
    }

    return toast.blank('No changes made!')
  }

  const handleSaveItems = e => {
    const newArray = [...planInfo.itemList, ...planInfo?.selectedList]

    let currentDate = new Date().toJSON().slice(0, 10)
    let newItemList = []

    if (newArray.length > 0) {
      newArray.forEach(t => {
        const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
        if (buildingObj) {
          newItemList.push(buildingObj)
        }
      })
    }

    const newMovements = [...newItemList].map(m => {
      return {
        building: m.building,
        desc: m.desc,
        level: m.level,
        rss: { a: m.rss.a },
        movementDate: currentDate,
        type: 'ADDED'
      }
    })

    // setMovementsList([...newMovements, ...movementsList])
    setPlanInfo({ ...planInfo, itemList: newItemList, selectedList: [] })
    setShowAddItems(false)

    return toast.success('Item/s added successfully!')
  }

  const handleSaveData = e => {
    localStorage.setItem('planInfo', JSON.stringify(planInfo))

    return toast.success('Data successfully stored in the browser!')
  }

  const handleEditDialogChange = action => {
    const selectedList = [...selectedRows].map(row => {
      return { building: row.split('-')[0], level: +row.split('-')[1] }
    })

    const actionLabel = action === 'REMOVE' ? 'REMOVED' : 'COMPLETED'

    let newSelectedList = [
      ...planInfo?.itemList?.filter(elem => {
        return !selectedList.some(ele => {
          return ele.building === elem.building && ele.level === elem.level
        })
      })
    ]

    let currentDate = new Date().toJSON().slice(0, 10)
    let newItemList = []

    if (selectedList.length > 0) {
      selectedList.forEach(t => {
        const buildingObj = buildingList?.find(b => b.building === t.building && b.level === t.level)
        if (buildingObj) {
          newItemList.push(buildingObj)
        }
      })
    }

    const newMovements = [...newItemList].map(m => {
      return {
        building: m.building,
        desc: m.desc,
        level: m.level,
        rss: { a: m.rss.a },
        movementDate: currentDate,
        type: actionLabel
      }
    })

    setEditDialogOpen(false)
    setPlanInfo({ ...planInfo, itemList: newSelectedList, selectedList: [] })

    return toast.success(`${selectedRows?.length} item/s were ${actionLabel}.`)
  }

  const handleClick = () => {
    setEditDialogOpen(true)
  }

  const handleChange = (event, value) => {
    // setIsLoading(true)
    setActiveTab(value)
  }

  const handleCalculatorChange = (e, type, level = undefined) => {
    let newObj = {}
    const enterValue = +e.target.value
    const enterCheck = e.target.checked
    if (type === 'mineHour') {
      newObj = { ...planInfo?.azuCalculator, mineHour: enterValue }
    } else if (type === 'rcLevel') {
      newObj = { ...planInfo?.azuCalculator, rcLevel: enterValue }
    } else if (type === 'card') {
      newObj = { ...planInfo?.azuCalculator, card: enterCheck }
    } else if (type === 'packs') {
      newObj = { ...planInfo?.azuCalculator, packs: enterValue }
    } else if (type === 'chests') {
      newObj = { ...planInfo?.azuCalculator, chests: enterValue }
    } else if (type === 'owned') {
      newObj = { ...planInfo?.azuCalculator, owned: enterValue }
    } else if (type === 'needed') {
      newObj = { ...planInfo?.azuCalculator, needed: enterValue }
    }

    const total =
      (newObj.mineHour > 0 ? nRound(newObj.mineHour * 24, 2) : 0) +
      (newObj.rcLevel > 0 ? azuCalcConf?.royalChallenge?.find(rc => rc.level === newObj.rcLevel)?.azurite : 0) +
      (newObj.card ? azuCalcConf?.card : 0) +
      (newObj.packs > 0 ? newObj.packs : 0) +
      (newObj.chests > 0 ? newObj.chests * 100 : 0)
    const totalObj = { ...newObj, total: total }

    setPlanInfo({ ...planInfo, azuCalculator: totalObj })
  }

  const columns = [
    ...defaultColumns
  ]

  const tabContentList = {
    items: (
      <>
        <Card>
          <TableHeader selectedRows={selectedRows} handleClick={handleClick} itemList={planInfo?.itemList} />
          {planInfo?.itemList?.length > 0 && (
            <DataGrid
              autoHeight
              pagination
              getRowId={row => row.building + '-' + row.level}
              rows={planInfo?.itemList}
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
    ),
    azuriteCalc: (
      <>
        <Card>
          <Grid container spacing={3} style={{ minWidth: '320px', padding: '1rem' }}>
            <Grid item xs={12} md={6} lg={8}>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Azurite Mine per Hour:
                  </Typography>
                </div>
                <TextField
                  id='mine-per-hour'
                  size='small'
                  variant='outlined'
                  type='number'
                  value={planInfo?.azuCalculator?.mineHour}
                  inputProps={{
                    min: 0,
                    max: 20000
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'mineHour')
                  }}
                />
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Royal Challenge Wave(s):
                  </Typography>
                </div>
                <TextField
                  align='left'
                  id='rc-select'
                  size='small'
                  variant='outlined'
                  select
                  value={planInfo?.azuCalculator?.rcLevel}
                  inputProps={{
                    min: 1,
                    max: 10
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'rcLevel')
                  }}
                >
                  {azuCalcConf?.royalChallenge?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Monthly Azurite Card:
                  </Typography>
                </div>
                <Switch
                  checked={planInfo?.azuCalculator?.card ? true : false}
                  onChange={e => {
                    handleCalculatorChange(e, 'card')
                  }}
                  name='monthly-card-checked'
                  color='primary'
                />
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Azurite from packs (daily):
                  </Typography>
                </div>
                <TextField
                  id='azurite-from-packs'
                  size='small'
                  variant='outlined'
                  type='number'
                  value={planInfo?.azuCalculator?.packs}
                  inputProps={{
                    min: 0,
                    max: 20000
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'packs')
                  }}
                />
              </CustomBox>
              <CustomBox>
                <div style={{ minWidth: '200px', marginRight: '5px' }}>
                  <Typography variant='body2' color='primary' align='right'>
                    Azurite Daily Chests:
                  </Typography>
                </div>
                <TextField
                  align='left'
                  id='chests-select'
                  size='small'
                  variant='outlined'
                  type='number'
                  select
                  value={planInfo?.azuCalculator?.chests}
                  inputProps={{
                    min: 1,
                    max: 5
                  }}
                  onChange={e => {
                    handleCalculatorChange(e, 'chests')
                  }}
                >
                  {azuCalcConf?.chests?.map(option => (
                    <MenuItem key={option.level} value={option.level}>
                      {option.level}
                    </MenuItem>
                  ))}
                </TextField>
              </CustomBox>

              <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center'>
                      Azurite Daily:
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {planInfo?.azuCalculator?.total.toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                      Azurite Weekly:
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {(planInfo?.azuCalculator?.total * 7).toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <div style={{ minWidth: '200px' }}>
                    <Typography variant='body2' color='primary' align='center' style={{ marginLeft: '10px' }}>
                      Azurite Monthly (30d):
                    </Typography>
                  </div>
                  <Typography variant='h6' color='textPrimary' align='center' style={{ marginLeft: '10px' }}>
                    {(planInfo?.azuCalculator?.total * 30).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>
      </>
    ),
    resources: (
      <>
        <Card>
          <Toolbar sx={{ padding: '1.25rem' }}>
            {/* <div edge='start' /> */}

            <Tooltip title={'Clear all the data saved in inputs.'}>
              <Button
                edge='start'
                color='primary'
                variant='contained'
                startIcon={<Icon icon='material-symbols-light:clear-all' />}
                onClick={() => {
                  setPlanInfo({ ...planInfo, totalGot: defaultInfo.totalGot })
                }}
              >
                CLEAR INPUTS
              </Button>
            </Tooltip>
          </Toolbar>
          <Divider />

          {/* AZURITE CALCULATOR DATA */}
          <Grid container spacing={6} sx={{ padding: '2rem', width: '100%' }}>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
              <TableContainer>
                <Table aria-labelledby='tableTitle' size={'small'} aria-label='enhanced table'>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center'>{'Daily Azurite Output'}</TableCell>
                      <TableCell align='center'>{'Days to Get Azurite Needed'}</TableCell>
                      <TableCell align='center'>{'Date to Get Azurite Needed'}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableBody>
                    <TableRow>
                      <TableCell align='center'>
                        <Typography color='primary' variant='h5'>
                          {planInfo?.azuCalculator.total.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='primary' variant='body1'>
                          {planInfo?.azuCalculator.total === 0
                            ? '0 days'
                            : `${Math.ceil(
                                (planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                  0
                                ) -
                                  planInfo?.totalGot.a) /
                                  planInfo?.azuCalculator.total
                              ).toLocaleString()} day/s.`}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='primary' variant='body1'>
                          {planInfo?.azuCalculator.total === 0
                            ? '-'
                            : `${moment()
                                .add(
                                  Math.ceil(
                                    (planInfo?.itemList?.reduce(
                                      (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                      0
                                    ) -
                                      planInfo?.totalGot.a) /
                                      planInfo?.azuCalculator.total
                                  ),
                                  'days'
                                )
                                .format('MMMM Do, YYYY')}`}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

              {/* RESOURCES DATA  */}
              <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                <TableContainer>
                  <Table aria-labelledby='tableTitleInfo' size={'small'} aria-label='enhanced table info'>
                    <TableBody>
                      <TableRow>
                        <TableCell align='center'>{'RSS'}</TableCell>
                        <TableCell align='center'>{'RSS Needed'}</TableCell>
                        <TableCell align='center'>{'RSS Owned'}</TableCell>
                        <TableCell align='center'>{'Total'}</TableCell>
                      </TableRow>
                      {/* AZURITE */}
                      <TableRow>
                        <TableCell align='center'>{<Typography color='primary'>Azurite</Typography>}</TableCell>

                        <TableCell align='center'>
                          {
                            <Typography color='textPrimary'>
                              {planInfo?.itemList
                                ?.reduce((accumulator, currentValue) => accumulator + currentValue.rss.a, 0)
                                ?.toLocaleString()}
                            </Typography>
                          }
                        </TableCell>
                        <TableCell align='center'>
                          {
                            <TextField
                              label=''
                              style={{ minWidth: '100px' }}
                              variant='outlined'
                              align='center'
                              id='azurite-input'
                              size='small'
                              type='number'
                              value={planInfo?.totalGot.a === 0 ? '' : planInfo?.totalGot.a}
                              onChange={e => {
                                let newState
                                let error
                                if (+e.target.value >= 2000000 || +e.target.value < 0) {
                                  newState = { ...planInfo?.totalGot, a: 2000000 }
                                  error = true
                                } else {
                                  newState = { ...planInfo?.totalGot, a: +e.target.value }
                                }
                                setPlanInfo({ ...planInfo, totalGot: newState })
                                if (error)
                                  return toast.error('Please use an input less than 2,000,000 and more than 0.')
                              }}
                            />
                          }
                        </TableCell>
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.a,
                          0
                        ) > planInfo?.totalGot.a && (
                          <TableCell align='center'>
                            {
                              <Typography style={{ color: '#ed2727' }}>
                                -
                                {(
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                    0
                                  ) - planInfo?.totalGot.a
                                )?.toLocaleString()}
                              </Typography>
                            }
                          </TableCell>
                        )}
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.a,
                          0
                        ) < planInfo?.totalGot.a && (
                          <TableCell align='center'>
                            {
                              <Button style={{ color: '#4DDDB2' }} startIcon={<Icon icon='mingcute:check-2-line' />}>
                                {' '}
                                +
                                {(
                                  planInfo?.totalGot.a -
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.a,
                                    0
                                  )
                                ).toLocaleString()}
                              </Button>
                            }
                          </TableCell>
                        )}
                      </TableRow>

                      {/* FOOD */}
                      <TableRow>
                        <TableCell align='center'>{<Typography color='primary'>Food</Typography>}</TableCell>

                        <TableCell align='center'>
                          {
                            <Typography color='textPrimary'>
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.f,
                                  0
                                ),
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                        <TableCell align='center'>
                          {
                            <TextField
                              label=''
                              align='center'
                              variant='outlined'
                              id='food-input'
                              size='small'
                              type='number'
                              value={planInfo?.totalGot.f === 0 ? '' : planInfo?.totalGot.f}
                              onChange={e => {
                                let newState
                                let error
                                if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                  newState = { ...planInfo?.totalGot, f: 4000000000 }
                                  error = true
                                } else {
                                  newState = { ...planInfo?.totalGot, f: +e.target.value }
                                }
                                setPlanInfo({ ...planInfo, totalGot: newState })
                                if (error)
                                  return toast.error('Please use an input less than 2,000,000 and more than 0.')
                              }}
                            />
                          }
                        </TableCell>
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.f,
                          0
                        ) > planInfo?.totalGot.f && (
                          <TableCell align='center'>
                            {
                              <Typography style={{ color: '#ed2727' }}>
                                -
                                {nFormatter(
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.f,
                                    0
                                  ) - planInfo?.totalGot.f,
                                  1
                                )}
                              </Typography>
                            }
                          </TableCell>
                        )}
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.f,
                          0
                        ) < planInfo?.totalGot.f && (
                          <TableCell align='center'>
                            {
                              <Button
                                style={{ color: '#50a308' }}
                                color='primary'
                                startIcon={<Icon icon='mingcute:check-2-line' />}
                              >
                                +
                                {nFormatter(
                                  planInfo?.totalGot.f -
                                    planInfo?.itemList?.reduce(
                                      (accumulator, currentValue) => accumulator + currentValue.rss.f,
                                      0
                                    ),
                                  1
                                )}
                              </Button>
                            }
                          </TableCell>
                        )}
                      </TableRow>
                      {/* WOOD */}
                      <TableRow>
                        <TableCell align='center'>{<Typography color='primary'>Wood</Typography>}</TableCell>

                        <TableCell align='center'>
                          {
                            <Typography color='textPrimary'>
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.w,
                                  0
                                ),
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                        <TableCell align='center'>
                          {
                            <TextField
                              label=''
                              align='center'
                              variant='outlined'
                              id='wood-input'
                              size='small'
                              type='number'
                              value={planInfo?.totalGot.w === 0 ? '' : planInfo?.totalGot.w}
                              onChange={e => {
                                let newState
                                let error
                                if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                  newState = { ...planInfo?.totalGot, w: 4000000000 }
                                  error = true
                                } else {
                                  newState = { ...planInfo?.totalGot, w: +e.target.value }
                                }
                                setPlanInfo({ ...planInfo, totalGot: newState })
                                if (error)
                                  return toast.error('Please use an input less than 2,000,000 and more than 0.')
                              }}
                            />
                          }
                        </TableCell>
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.w,
                          0
                        ) > planInfo?.totalGot.w && (
                          <TableCell align='center'>
                            {
                              <Typography style={{ color: '#ed2727' }}>
                                -
                                {nFormatter(
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.w,
                                    0
                                  ) - planInfo?.totalGot.w,
                                  1
                                )}
                              </Typography>
                            }
                          </TableCell>
                        )}
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.w,
                          0
                        ) < planInfo?.totalGot.w && (
                          <TableCell align='center'>
                            {
                              <Button
                                style={{ color: '#50a308' }}
                                color='primary'
                                startIcon={<Icon icon='mingcute:check-2-line' />}
                              >
                                +
                                {nFormatter(
                                  planInfo?.totalGot.w -
                                    planInfo?.itemList?.reduce(
                                      (accumulator, currentValue) => accumulator + currentValue.rss.w,
                                      0
                                    ),
                                  1
                                )}
                              </Button>
                            }
                          </TableCell>
                        )}
                      </TableRow>
                      {/* STONE */}
                      <TableRow>
                        <TableCell align='center'>{<Typography color='primary'>Stone</Typography>}</TableCell>

                        <TableCell align='center'>
                          {
                            <Typography color='textPrimary'>
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.s,
                                  0
                                ),
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                        <TableCell align='center'>
                          {
                            <TextField
                              label=''
                              align='center'
                              variant='outlined'
                              id='stone-input'
                              size='small'
                              type='number'
                              value={planInfo?.totalGot.s === 0 ? '' : planInfo?.totalGot.s}
                              onChange={e => {
                                let newState
                                let error
                                if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                  newState = { ...planInfo?.totalGot, s: 4000000000 }
                                  error = true
                                } else {
                                  newState = { ...planInfo?.totalGot, s: +e.target.value }
                                }
                                setPlanInfo({ ...planInfo, totalGot: newState })
                                if (error)
                                  return toast.error('Please use an input less than 2,000,000 and more than 0.')
                              }}
                            />
                          }
                        </TableCell>
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.s,
                          0
                        ) > planInfo?.totalGot.s && (
                          <TableCell align='center'>
                            {
                              <Typography style={{ color: '#ed2727' }}>
                                -
                                {nFormatter(
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.s,
                                    0
                                  ) - planInfo?.totalGot.s,
                                  1
                                )}
                              </Typography>
                            }
                          </TableCell>
                        )}
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.s,
                          0
                        ) < planInfo?.totalGot.s && (
                          <TableCell align='center'>
                            {
                              <Button
                                style={{ color: '#50a308' }}
                                color='primary'
                                startIcon={<Icon icon='mingcute:check-2-line' />}
                              >
                                +
                                {nFormatter(
                                  planInfo?.totalGot.s -
                                    planInfo?.itemList?.reduce(
                                      (accumulator, currentValue) => accumulator + currentValue.rss.s,
                                      0
                                    ),
                                  1
                                )}
                              </Button>
                            }
                          </TableCell>
                        )}
                      </TableRow>

                      {/* IRON */}
                      <TableRow>
                        <TableCell align='center'>{<Typography color='primary'>Iron</Typography>}</TableCell>

                        <TableCell align='center'>
                          {
                            <Typography color='textPrimary'>
                              {nFormatter(
                                planInfo?.itemList?.reduce(
                                  (accumulator, currentValue) => accumulator + currentValue.rss.i,
                                  0
                                ),
                                1
                              )}
                            </Typography>
                          }
                        </TableCell>
                        <TableCell align='center'>
                          {
                            <TextField
                              label=''
                              align='center'
                              variant='outlined'
                              id='iron-input'
                              size='small'
                              type='number'
                              value={planInfo?.totalGot.i === 0 ? '' : planInfo?.totalGot.i}
                              onChange={e => {
                                let newState
                                let error
                                if (+e.target.value >= 4000000001 || +e.target.value < 0) {
                                  newState = { ...planInfo?.totalGot, i: 4000000000 }
                                  error = true
                                } else {
                                  newState = { ...planInfo?.totalGot, i: +e.target.value }
                                }
                                setPlanInfo({ ...planInfo, totalGot: newState })
                                if (error)
                                  return toast.error('Please use an input less than 2,000,000 and more than 0.')
                              }}
                            />
                          }
                        </TableCell>
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.i,
                          0
                        ) > planInfo?.totalGot.i && (
                          <TableCell align='center'>
                            {
                              <Typography style={{ color: '#ed2727' }}>
                                -
                                {nFormatter(
                                  planInfo?.itemList?.reduce(
                                    (accumulator, currentValue) => accumulator + currentValue.rss.i,
                                    0
                                  ) - planInfo?.totalGot.i,
                                  1
                                )}
                              </Typography>
                            }
                          </TableCell>
                        )}
                        {planInfo?.itemList?.reduce(
                          (accumulator, currentValue) => accumulator + currentValue.rss.i,
                          0
                        ) < planInfo?.totalGot.i && (
                          <TableCell align='center'>
                            {
                              <Button
                                style={{ color: '#50a308' }}
                                color='primary'
                                startIcon={<Icon icon='mingcute:check-2-line' />}
                              >
                                +
                                {nFormatter(
                                  planInfo?.totalGot.i -
                                    planInfo?.itemList?.reduce(
                                      (accumulator, currentValue) => accumulator + currentValue.rss.i,
                                      0
                                    ),
                                  1
                                )}
                              </Button>
                            }
                          </TableCell>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
          </Grid>
        </Card>
      </>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CustomHeader icon='planner' title='BUILDING AND TECHNOLOGY PLANNER' />
            <Divider />
            <Grid container spacing={6} sx={{ padding: '1rem' }}>
              <Grid item xs={12} sm={6}>
              <Alert severity="warning">
              {`After each modification (add, edit or delete) please, use the `}
                {
                  <span role='img' aria-labelledby='floppy-disk'>
                    {`💾`}
                  </span>
                }{' '}
              {`button before refreshing or leaving the page.`}
            </Alert>
                <Box sx={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                  <BlueButton
                    variant='contained'
                    size='small'
                    startIcon={<Icon icon='lets-icons:widget-add-light' />}
                    onClick={() => setShowAddTemplate(true)}
                  >
                    Add from Template
                  </BlueButton>
                </Box>
                <Box sx={{ marginTop: '10px' }}>
                  <GreenButton
                    variant='contained'
                    startIcon={<Icon icon='ic:baseline-save' />}
                    onClick={handleSaveData}
                    sx={{ marginBottom: '10px', marginRight: '10px' }}
                  >
                    SAVE
                  </GreenButton>
                  <Button
                    variant='contained'
                    startIcon={<Icon icon='ic:round-add' />}
                    onClick={() => setShowAddItems(true)}
                    sx={{ marginBottom: '10px' }}
                  >
                    ADD ITEM/S
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {activeTab === undefined ? null : (
          <Grid item xs={12}>
            <TabContext value={activeTab}>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <TabList
                    variant='scrollable'
                    scrollButtons='auto'
                    onChange={handleChange}
                    aria-label='customized tabs'
                  >
                    <Tab
                      value='items'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='mdi:view-grid-outline' />
                          {!hideText && 'Items'}
                        </Box>
                      }
                    />
                    <Tab
                      value='resources'
                      disabled={planInfo?.itemList?.length > 0 ? false : true}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='carbon:software-resource-cluster' />
                          {!hideText && 'Resources'}
                        </Box>
                      }
                    />
                    <Tab
                      value='azuriteCalc'
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', ...(!hideText && { '& svg': { mr: 2 } }) }}>
                          <Icon fontSize={20} icon='game-icons:crystal-bars' />
                          {!hideText && 'Azurite Calculator'}
                        </Box>
                      }
                    />
                  </TabList>
                </Grid>
                <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(4)} !important` }}>
                  {isLoading ? (
                    <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <CircularProgress sx={{ mb: 4 }} />
                      <Typography>Loading...</Typography>
                    </Box>
                  ) : (
                    <TabPanel sx={{ p: 0 }} value={activeTab}>
                      {tabContentList[activeTab]}
                    </TabPanel>
                  )}
                </Grid>
              </Grid>
            </TabContext>
          </Grid>
        )}
      </Grid>

      {/* Dialog | ADD FROM TEMPLATE */}
      <Dialog
        fullWidth
        open={showAddTemplate}
        maxWidth='md'
        scroll='body'
        onClose={handleAddTemplateClose}
        TransitionComponent={Transition}
        onBackdropClick={handleAddTemplateClose}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleAddTemplateClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Planner - Add Preset of Items
            </Typography>
            <Typography variant='body2'>
              List of presets to add any goals quickly. When you add a template from here, it'll automatically add those
              items on your item list.
            </Typography>
          </Box>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent
          sx={{
            position: 'relative',
            pt: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <TextField
                value={planInfo?.preset}
                fullWidth
                align='center'
                label='Select Preset'
                id='load-template-select'
                size='small'
                variant='outlined'
                select
                onChange={handleLoadTemplateChange}
              >
                {itemTemplates?.map(option => (
                  <MenuItem key={option.template} value={option.template}>
                    {option.desc}
                  </MenuItem>
                ))}
              </TextField>
              {planInfo?.preset?.length > 0 && (
                <CustomAvatar
                  skin='light'
                  color='success'
                  sx={{ width: '1.875rem', height: '1.875rem', marginLeft: '5px' }}
                >
                  <Icon icon={'mdi:check'} fontSize='1rem' />
                </CustomAvatar>
              )}
            </Box>
          </Box>
          {planInfo?.preset?.length > 0 && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  flexWrap: { xs: 'wrap', sm: 'nowrap' },
                  justifyContent: 'center'
                }}
              >
                <Button
                  startIcon={<Icon icon={'mdi:add'} />}
                  variant='contained'
                  onClick={e => {
                    setShowAddTemp(true)
                  }}
                  disabled={showAddTemp}
                  color='primary'
                  sx={{ marginTop: '8px', marginBottom: '10px' }}
                >
                  ADD BARRACKS PRESETS
                </Button>
              </Box>
              <>
                {showAddTemp && (
                  <>
                    <Box sx={{ mb: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          flexWrap: { xs: 'wrap', sm: 'nowrap' }
                        }}
                      >
                        <TextField
                          value={planInfo?.presetB}
                          fullWidth
                          align='center'
                          label='Add Barracks'
                          id='load-barracks-select'
                          size='small'
                          variant='outlined'
                          select
                          onChange={handleLoadTemplateBChange}
                        >
                          {extraBarracks?.map(option => (
                            <MenuItem key={option.template} value={option.template}>
                              {option.desc}
                            </MenuItem>
                          ))}
                        </TextField>
                        {planInfo?.presetB?.length > 0 && (
                          <CustomAvatar
                            skin='light'
                            color='success'
                            sx={{ width: '1.875rem', height: '1.875rem', marginLeft: '5px' }}
                          >
                            <Icon icon={'mdi:check'} fontSize='1rem' />
                          </CustomAvatar>
                        )}
                      </Box>
                    </Box>
                  </>
                )}
              </>
            </Box>
          )}
        </DialogContent>
        {planInfo?.selectedList?.length > 0 && (
          <>
            <Divider sx={{ my: '0 !important' }} />
            <DialogContent
              sx={{
                position: 'relative',
                pt: theme => `${theme.spacing(5)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Box>
                <Typography align='center' variant='h6' sx={{ mb: 4 }}>
                  Total Azurite Cost:
                </Typography>
                <Typography align='center' color='primary' variant='h4' sx={{ mb: 4 }}>
                  {showAddTempAzurite?.toLocaleString()}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button size='small' color='primary' onClick={handleAddTemplateClose}>
            CLOSE
          </Button>

          {planInfo?.selectedList?.length > 0 && (
            <>
              <Button
                startIcon={<Icon icon='material-symbols-light:clear-all' />}
                variant='outlined'
                onClick={handleClearDialogForm}
                color='error'
              >
                Clear selection
              </Button>{' '}
              <Button variant='contained' onClick={handleLoadTemplateSave} color='primary'>
                ADD ITEMS
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog | ADD ITEMS */}
      <Dialog
        fullWidth
        open={showAddItems}
        maxWidth='md'
        scroll='body'
        onClose={handleAddTemplateClose}
        TransitionComponent={Transition}
        onBackdropClick={handleAddItemClose}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={handleAddItemClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Planner - Add Items
            </Typography>
            <Typography variant='body2'>
              When you add a ITEMS from here, they'll be automatically added on your item list.
            </Typography>
          </Box>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent
          sx={{
            position: 'relative',
            pt: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
              <Autocomplete
                multiple
                id='tags-outlined'
                options={[
                  ...buildingList?.filter(elem => {
                    return !planInfo.itemList?.some(ele => {
                      return ele.building === elem.building && ele.level === elem.level
                    })
                  })
                ]}
                getOptionLabel={option => {
                  return `${option.desc} ${option.level}`
                }}
                filterSelectedOptions
                disableListWrap
                fullWidth
                size='medium'
                renderInput={params => (
                  <TextField color='primary' {...params} variant='outlined' label='' placeholder='Select...' />
                )}
                onChange={(e, v, r) => {
                  handleSelectedItemsChange(v)
                }}
                ChipProps={{ variant: 'outlined' }}
                popupIcon={<ArrowDropDownIcon color='primary' />}
              />
            </Box>
          </Box>
        </DialogContent>
        <Divider sx={{ my: '0 !important' }} />
        <DialogContent>
          {planInfo?.selectedList?.length > 0 && (
            <div>
              <TableContainer>
                <Table aria-labelledby='tableTitleDialog' size={'small'} aria-label='enhanced table'>
                  <TableBody>
                    {/* HEADER */}
                    <TableRow>
                      {/* <TableCell align='center'>{''}</TableCell> */}
                      <TableCell align='center'>
                        {
                          <Typography color='primary' variant='body1'>
                            Item
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <Typography color='primary' variant='body1'>
                            Item Type
                          </Typography>
                        }
                      </TableCell>
                      <TableCell align='center'>
                        {
                          <Typography color='primary' variant='body1'>
                            Azurite Cost
                          </Typography>
                        }
                      </TableCell>
                    </TableRow>

                    {/* DETAILS */}

                    {planInfo?.selectedList?.map(item => {
                      return (
                        <TableRow key={`${item?.desc}-${item?.level}`}>
                          <TableCell align='center'>
                            {
                              <Typography variant='body2' color='textPrimary'>
                                {`${item?.desc} Lv${item?.level}`}
                              </Typography>
                            }
                          </TableCell>
                          <TableCell align='center'>
                            {
                              <Typography variant='body2' color='textPrimary'>
                                {item?.type}
                              </Typography>
                            }
                          </TableCell>
                          <TableCell align='center'>
                            {
                              <Typography variant='body1' color='textPrimary'>
                                {item?.rss?.a?.toLocaleString()}
                              </Typography>
                            }
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>
        {planInfo?.selectedList?.length > 0 && (
          <>
            <Divider sx={{ my: '0 !important' }} />
            <DialogContent
              sx={{
                position: 'relative',
                pt: theme => `${theme.spacing(5)} !important`,
                px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                pb: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Box>
                <Typography align='center' variant='h6' sx={{ mb: 4 }}>
                  Total Azurite Cost:
                </Typography>
                <Typography align='center' color='primary' variant='h4' sx={{ mb: 4 }}>
                  {planInfo?.selectedList
                    ?.reduce((accumulator, currentValue) => accumulator + currentValue?.rss?.a, 0)
                    ?.toLocaleString()}
                </Typography>
              </Box>
            </DialogContent>
          </>
        )}
        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button size='small' color='primary' onClick={handleAddItemClose}>
            CLOSE
          </Button>

          {planInfo?.selectedList?.length > 0 && (
            <>
              <Button variant='contained' onClick={handleSaveItems} color='primary'>
                ADD ITEMS
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog | EDIT / REMOVE ITEMS */}
      <Dialog
        fullWidth
        open={editDialogOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => setEditDialogOpen(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setEditDialogOpen(false)}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setEditDialogOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Item/s
            </Typography>
            <Typography variant='body2'>Are you sure that you want to edit {selectedRows?.length} item/s?</Typography>
          </Box>
        </DialogContent>

        <Divider sx={{ my: '0 !important' }} />
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color='primary'>
            CLOSE
          </Button>
          <Button
            onClick={() => {
              handleEditDialogChange('REMOVE')
            }}
            color='error'
          >
            REMOVE
          </Button>
          <GreenButton
            onClick={() => {
              handleEditDialogChange('COMPLETE')
            }}
            color='success'
          >
            COMPLETED
          </GreenButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Planner
