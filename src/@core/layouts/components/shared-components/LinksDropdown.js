// ** React Import
import { useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'

// ** Custom Vars
const options = [
  {
    text: 'Donate',
    href: 'https://www.paypal.com/paypalme/oNaare',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='logos:paypal' color='primary' />
  },
  {
    text: 'Buy Me a Coffee',
    href: 'https://www.buymeacoffee.com/onadev',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='simple-icons:buymeacoffee' color='primary' />
  },
  {
    text: 'Support My Work',
    href: 'https://www.patreon.com/oNare',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='logos:patreon' color='primary' />
  },
  {
    text: 'Contact Me',
    href: 'https://onadev.net',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='iconoir:developer' color='primary' />
  },
  {
    text: 'WAOTools V1',
    href: 'https://waotoolsv1.web.app/',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='ph:number-one-duotone' color='primary' />
  },

  {
    text: 'Contribute',
    href: 'https://tinyurl.com/waotoolsdata',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='mdi:help-outline' color='primary' />
  },
  {
    text: 'Wao Recharge',
    href: 'https://pay-service.camelgames-wao.com/#/recharge',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='game-icons:coins' color='primary' />
  },
  {
    text: 'Line Group',
    href: 'https://line.me/R/ti/g/ZOVjaf9UiG',
    linkProps: { target: '_blank', rel: 'noopener' },
    icon: <Icon icon='clarity:chat-bubble-line' color='primary' />
  }
]

const LinksDropdown = ({ settings, saveSettings }) => {
  // ** Vars
  const { layout } = 'horizontal'

  return (
    <OptionsMenu
      icon={<Icon icon='mdi:link-variant' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={options}
    />
  )
}

export default LinksDropdown
