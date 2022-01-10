import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { wrapper } from '../redux/store/index';
import AppWrapper from '../@jumbo/components/AppWrapper';
import DappContextProvider from '../modules/Context/DappContextProvider';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-notifications/lib/notifications.css';
import 'prismjs/themes/prism-okaidia.css';
import { DAppProvider } from '@usedapp/core';
import { AuthProvider } from '../authentication';
import AppContextProvider from '../@jumbo/components/contextProvider/AppContextProvider';

const config = {
  multicallAddresses: {
    "1337": "0x1b9E19D470c6638EBF326191296A654871DA0eAf"
  }
}


const MainApp = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>UpsilonX Dashboard</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <DAppProvider config={config}>
        <AppContextProvider>
          <DappContextProvider>
            <AuthProvider>
              <AppWrapper>
                <Component {...pageProps} />
              </AppWrapper>
            </AuthProvider>
          </DappContextProvider>
        </AppContextProvider>
      </DAppProvider>
    </React.Fragment>
  );
};

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MainApp);
