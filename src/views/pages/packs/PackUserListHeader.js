// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { Button, Typography } from '@mui/material'

const PackUserListHeader = props => {
  // ** Props
  const { selectedRows, handleClick, itemList } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: `${selectedRows?.length > 0 ? 3 : 5}`,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {itemList?.length > 0 && (
          <Button
            color='error'
            disabled={selectedRows?.length > 0 ? false : true}
            variant='contained'
            onClick={() => handleClick(selectedRows)}
          >
            DELETE Selected {selectedRows?.length > 0 ? `${selectedRows?.length} pack/s.` : ''}
          </Button>
        )}
        {itemList?.length <= 0 && (
          <>
            <Typography variant='body2'>
              There are not items added yet. Use the Add Item or Add from template options.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default PackUserListHeader
