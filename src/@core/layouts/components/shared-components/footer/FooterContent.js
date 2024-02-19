// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import moment from 'moment'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FooterContent = () => {
  // ** Var
  const hidden = null

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
        <LinkStyled target='_blank' href='https://www.paypal.com/paypalme/oNaare'>
          Donate
        </LinkStyled>
        <LinkStyled
          target='_blank'
          href='https://docs.google.com/spreadsheets/d/1xm6xgMbUCUfuFLibFPYWBFKyitfCr20KPvIl7l-OtAo/edit#gid=1888561516'
        >
          Contribute
        </LinkStyled>
        <LinkStyled target='_blank' href='https://onadev.net'>
          onaDev
        </LinkStyled>
        {` © ${moment().year()}`}
      </Box>
    </Box>
  )
}

export default FooterContent
