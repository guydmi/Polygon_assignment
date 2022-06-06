import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { SigninContext } from './signin'

const MyApp = ({Component, pageProps:{ session, ...pageProps }}: AppProps) => {
    return (
        // {/* // <SessionProvider session={session}> */}
            <Component {...pageProps} />
        // {/* // </SessionProvider> */}
    )
}

export default MyApp