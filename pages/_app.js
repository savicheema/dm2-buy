import '../styles/globals.css'
import { AppWrapper } from '../contexts/StoreDataContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper sharedState={pageProps?.storeData}>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
