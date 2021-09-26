import {
  Twitter as TwitterIcon,
  YouTube as YoutubeIcon,
} from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";
import Script from "next/script";
import * as React from "react";

import SiteInfo from "/data/site-info";
import DiscordIcon from "/src/components/icons/discord-icon";
import TwitchIcon from "/src/components/icons/twitch-icon";
import DrawerList from "/src/components/layout/drawer-list";

export default function DrawerImpl(props) {
  const router = useRouter();

  const DivComponent = styled("div")({
    flexGrow: 1,
  });

  const AnchorComponent = styled("a")({
    color: "inherit",
    textDecoration: "none",
  });

  const NavComponent = styled("nav")({
    width: {
      lg: 255,
    },
    flexShrink: {
      lg: 0,
    },
  });

  const AdDivComponent = styled("div")(({ theme }) => ({
    height: 250,
    marginTop: 0,
    marginBottom: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    padding: 0,
    width: 250,
  }));

  const DivToolbar = styled("div")({
    minHeight: 45,
  });

  const drawer = (
    <DivComponent>
      <DrawerList
        setMobileOpen={props.setMobileOpen}
        sx={{
          flexGrow: 1,
        }}
      />
    </DivComponent>
  );

  const bottomLink = (
    <React.Fragment>
      <AdDivComponent>
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            height: 250,
            width: 250,
          }}
          data-ad-client="ca-pub-8296888972658787"
          data-ad-slot="7431559115"
        ></ins>
        <Script
          id="drawerAds"
          strategy="afterInteractive"
        >{`(adsbygoogle = window.adsbygoogle || []).push({});`}</Script>
      </AdDivComponent>
      <Grid container justifyContent="center">
        <AnchorComponent
          href={SiteInfo.twitterLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </AnchorComponent>
        <Tooltip arrow placement="top" title={SiteInfo.discordName}>
          <IconButton
            onClick={() => {
              router.push("/contact");
            }}
          >
            <DiscordIcon />
          </IconButton>
        </Tooltip>
        <AnchorComponent
          href={SiteInfo.twitchLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton>
            <TwitchIcon />
          </IconButton>
        </AnchorComponent>
        <AnchorComponent
          href={SiteInfo.youtubeLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton>
            <YoutubeIcon />
          </IconButton>
        </AnchorComponent>
      </Grid>
      <Grid container justifyContent="center">
        <Typography
          align="center"
          paragraph
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
          }}
          variant="caption"
        >
          {SiteInfo.siteTitle} ⓒ {SiteInfo.copyrightYear} {SiteInfo.author}
          <br />
          All Rights Reserved.
        </Typography>
      </Grid>
    </React.Fragment>
  );

  return (
    <NavComponent>
      <Drawer
        ModalProps={{
          keepMounted: true,
        }}
        onClose={props.toggleMobileOpen}
        open={props.isMobileOpen}
        sx={{
          display: {
            lg: "none",
          },
          flexDirection: "column",
          flexShrink: 0,
          width: 255,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 255,
          },
        }}
        variant="temporary"
      >
        <DivToolbar />
        {drawer}
        {bottomLink}
      </Drawer>
      <Drawer
        open
        sx={{
          display: {
            xs: "none",
            lg: "block",
          },
          flexDirection: "column",
          flexShrink: 0,
          width: 255,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 255,
          },
        }}
        variant="permanent"
      >
        <DivToolbar />
        {drawer}
        {bottomLink}
      </Drawer>
    </NavComponent>
  );
}
