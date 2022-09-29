import React from 'react';

import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import Head from 'next/head';
import { MoralisProvider } from 'react-moralis';

import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>L1fter | Digital marketing | web developement | Berlin</title>
      </Head>
      {/* <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
        // initializeOnMount={false}
      > */}
      {/* <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}> */}
      <Layout>
        <Component {...pageProps} />{' '}
      </Layout>{' '}
      {/* </SessionProvider>
      </WagmiConfig>{' '} */}
      {/* </MoralisProvider> */}
    </>
  );
}

export default MyApp;
