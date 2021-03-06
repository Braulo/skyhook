import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from 'src/components/Layout';
import {
  RealmApplicationContext,
  RealmApplicationContextProvider,
} from 'state/context/realmApplicationContextProvider';
import { useContext, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Skyhook</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RealmApplicationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RealmApplicationContextProvider>
    </>
  );
}

export default MyApp;
