import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import { APIProvider, ErrorProvider, UserProvider } from '../contexts'

export default function MyApp(props) {
  const { Component, pageProps, user, baseUrl, token } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>DataWatch</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <APIProvider baseUrl={baseUrl} token={token}>
            <UserProvider user={user}>
              <ErrorProvider>
                <Component {...pageProps} />
              </ErrorProvider>
            </UserProvider>
          </APIProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const req = ctx.req
  const api = req && req.api

  return {
    kauth: req && req.kauth,
    baseUrl: api && api.baseUrl, 
    token: api && api.token,
    user: api && api.token ? await api.user() : null,
    pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
  }
}
