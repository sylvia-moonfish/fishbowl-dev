import { CacheProvider } from "@emotion/react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";

import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import PropTypes from "prop-types";
import * as React from "react";

import * as gtag from "/lib/gtag";
import AppBarImpl from "/src/components/layout/app-bar-impl";
import DrawerImpl from "/src/components/layout/drawer-impl";
import createEmotionCache from "/src/createEmotionCache";
import theme from "/src/theme";
import "/styles/fonts.css";

const clientSideEmotionCache = createEmotionCache();

export default function FishbowlApp(props) {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [isMobileOpen, setMobileOpen] = React.useState(false);
  const toggleMobileOpen = () => {
    setMobileOpen(!isMobileOpen);
  };

  const MainComponent = styled("main")({
    display: "flex",
  });

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${gtag.GA_TRACKING_ID}', {
    page_path: window.location.pathname,
  });
        `,
        }}
        id="gtag"
        strategy="afterInteractive"
      />
      <CacheProvider value={emotionCache}>
        <Head>
          <meta content="initial-scale=1, width=device-width" name="viewport" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainComponent>
            <AppBarImpl
              isMobileOpen={isMobileOpen}
              toggleMobileOpen={toggleMobileOpen}
            />
            <DrawerImpl
              isMobileOpen={isMobileOpen}
              setMobileOpen={setMobileOpen}
              toggleMobileOpen={toggleMobileOpen}
            />
            <Container
              sx={{
                flexGrow: 1,
                padding: 3,
                width: "100%",
              }}
            >
              <Toolbar />
              <Component {...pageProps} />
            </Container>
          </MainComponent>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

FishbowlApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
