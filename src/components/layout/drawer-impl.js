import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/Home";

import Link from "next/link";

import React from "react";

import SiteInfo from "/data/site-info";
import TwitchIcon from "/src/components/icons/twitch-icon";
import TwitterIcon from "/src/components/icons/twitter-icon";
import YoutubeIcon from "/src/components/icons/youtube-icon";
import DrawerList from "/src/components/layout/drawer-list";

const useStyles = makeStyles((theme) => ({
  caption: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  direction: {
    flexDirection: "column",
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: 250,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: 250,
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
  toolbar: {
    minHeight: 45,
  },
}));

const DrawerImpl = (props) => {
  const classes = useStyles();

  const drawer = (
    <div className={classes.grow}>
      <DrawerList
        className={classes.grow}
        currentMenu={props.currentMenu}
        setMobileOpen={props.setMobileOpen}
      />
    </div>
  );

  const bottomLink = (
    <React.Fragment>
      <Grid container justify="center">
        <Link href="/">
          <IconButton>
            <HomeIcon />
          </IconButton>
        </Link>
        <a
          className={classes.link}
          href={SiteInfo.twitchLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton>
            <TwitchIcon />
          </IconButton>
        </a>
        <a
          className={classes.link}
          href={SiteInfo.twitterLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </a>
        <a
          className={classes.link}
          href={SiteInfo.youtubeLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton>
            <YoutubeIcon />
          </IconButton>
        </a>
      </Grid>
      <Grid container justify="center">
        <Typography
          align="center"
          className={classes.caption}
          paragraph
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
    <nav className={classes.drawer}>
      <Hidden lgUp implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.direction}
          ModalProps={{
            keepMounted: true,
          }}
          onClose={props.toggleMobileOpen}
          open={props.isMobileOpen}
          variant="temporary"
        >
          {drawer}
          {bottomLink}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          className={classes.direction}
          open
          variant="permanent"
        >
          <div className={classes.toolbar} />
          {drawer}
          {bottomLink}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default DrawerImpl;
