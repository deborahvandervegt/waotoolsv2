// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Store Imports
import { Provider } from 'react-redux'
import { store } from 'src/store'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import { defaultACLObj } from 'src/configs/acl'
import 'src/configs/i18n'
import themeConfig from 'src/configs/themeConfig'
import { analytics } from 'src/utils/firebaseInit'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import UserLayout from 'src/layouts/UserLayout'

// ** Spinner Import

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import { AuthProvider } from 'src/context/AuthContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/themes/prism-tomorrow.css'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'src/iconify-bundle/icons-bundle-react'

// ** Global css styles
import '../../styles/globals.scss'

// ** MUI Imports
import CircularProgress from '@mui/material/CircularProgress'
import FallbackSpinner from 'src/@core/components/spinner'

const clientSideEmotionCache = createEmotionCache()

// logEvent(analytics, 'notification_received')

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

const Guard = ({ children, authGuard, guestGuard }) => {
  // if (guestGuard) {
  //   return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>
  // } else if (!guestGuard && !authGuard) {
  //   return <>{children}</>
  // } else {
  //   return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>
  // }
  return <>{children}</>
}

// ** Configure JSS & ClassName
const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Hooks
  const [loading, setLoading] = useState(true)

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>)
  const setConfig = Component.setConfig ?? undefined
  const authGuard = Component.authGuard ?? true
  const guestGuard = Component.guestGuard ?? false
  const aclAbilities = Component.acl ?? defaultACLObj

  useEffect(() => {
    analytics
  }, [])

  useEffect(() => {
    const handleLoading = () => {
      setLoading(false)
    }

    const waitingForLoading = setTimeout(() => {
      handleLoading()
    }, 500)

    return () => clearTimeout(waitingForLoading)
  }, [])

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`WAO Tools V2 - Making your War and Order path easier`}</title>
          <meta name='description' content={`${themeConfig.templateName} is a War and Order compilation of tools.`} />
          <meta
            name='keywords'
            content='war and order, wao, waotools, war and order game,wao tricks,wao tips,wao requirements'
          />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <Guard authGuard={authGuard} guestGuard={guestGuard}>
                      {/* <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard} authGuard={authGuard}> */}
                      {loading ? <FallbackSpinner /> : getLayout(<Component {...pageProps} />)}
                      {/* </AclGuard> */}
                    </Guard>

                    {/* {getLayout(<Component {...pageProps} />)} */}
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                )
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  )
}

export default App
