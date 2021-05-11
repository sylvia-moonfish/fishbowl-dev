import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";

import ArchiveIcon from "@material-ui/icons/Archive";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { useRouter } from "next/router";

import React from "react";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const DrawerList = (props) => {
  const router = useRouter();

  const [isArchiveOpen, setArchiveOpen] = React.useState(false);
  const toggleArchiveOpen = () => {
    setArchiveOpen(!isArchiveOpen);
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <List component="nav">
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => {
            props.setMobileOpen(false);
            router.push("/");
          }}
        >
          <ListItemAvatar>
            <Avatar src="/avatar.jpg" />
          </ListItemAvatar>
          <ListItemText primary="플래티" secondary="Sylvia Moonfish" />
        </ListItem>
        <Divider />
        <ListSubheader component="div">글로벌 &amp; 한국 서버</ListSubheader>
        <ListItem
          button
          onClick={() => {
            props.setMobileOpen(false);
            router.push("/bis-guide/5.5");
          }}
          selected={router.asPath.indexOf("/bis-guide/5.5") !== -1}
        >
          <ListItemAvatar>
            <Avatar src="/icons/job-guide.png" />
          </ListItemAvatar>
          <ListItemText primary="5.5 BiS 가이드" />
        </ListItem>
        <Divider />
        <ListSubheader component="div">아카이브</ListSubheader>
        <ListItem button onClick={toggleArchiveOpen}>
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="BiS 아카이브" />
          {isArchiveOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={isArchiveOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText primary="TEST" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </React.Fragment>
  );
};

export default DrawerList;
