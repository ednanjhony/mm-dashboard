import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../styles/theme'
import { makeServer } from '../services/mirage'
import { makeServerSuppliers } from '../services/mirage/apiSuppliers'
import { makeServerFlow } from '../services/mirage/apiFlow'
import { makeServerBills } from '../services/mirage/apiBill'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../services/queryClient'

makeServer();
makeServerSuppliers();
makeServerFlow();
makeServerBills();

function MyApp({ Component, pageProps }: AppProps) {
  return (

      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </QueryClientProvider>
  )
}

export default MyApp
