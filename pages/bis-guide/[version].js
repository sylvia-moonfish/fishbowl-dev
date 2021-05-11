import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import fs from "fs";
import { useRouter } from "next/router";
import path from "path";
import React from "react";

import SiteInfo from "/data/site-info";
import {
  generateFooter,
  generateHead,
  generatePreviewImage,
} from "/src/utility";

const useStyles = makeStyles((theme) => ({
  banner: {
    maxWidth: 400,
    width: "100%",
  },
}));

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { version } = context.params;

  const jobsPath = path.join(
    process.cwd(),
    `/data/bis-guide/${version}/bis-jobs.json`
  );
  if (!fs.existsSync(jobsPath)) {
    console.log(`${jobsPath} doesn't exist!`);
    return {
      notFound: true,
    };
  }
  const jobs = fs.readFileSync(jobsPath);

  const pageDataPath = path.join(
    process.cwd(),
    `/data/bis-guide/${version}/bis-page-data.json`
  );
  if (!fs.existsSync(pageDataPath)) {
    console.log(`${pageDataPath} doesn't exist!`);
    return {
      notFound: true,
    };
  }
  const pageData = fs.readFileSync(pageDataPath);

  return {
    props: {
      jobs: JSON.parse(jobs),
      pageData: JSON.parse(pageData),
    },
  };
}

const BisGuide = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <LinearProgress color="secondary" />;
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      {generateHead(
        `${props.pageData.pageTitle} | ${SiteInfo.siteTitle}`,
        props.pageData.pageDescription
      )}
      {generatePreviewImage(props.pageData.banners[0])}
      <Container maxWidth="md">
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Grid
              alignItems="center"
              container
              direction="column"
              justify="center"
              spacing={5}
            >
              <Grid item>
                <Typography variant="h5">{props.pageData.pageTitle}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              alignItems="center"
              container
              direction="row"
              justify="center"
              spacing={5}
            >
              {props.pageData.banners.map((banner, bannerIndex) => {
                return (
                  <Grid item key={bannerIndex}>
                    <img className={classes.banner} src={banner} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              {props.pageData.descriptionText}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={5}>
              <Grid item xs={6}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar src="/icons/jobs/tank.png" variant="square" />
                    }
                    title="방어 역할군"
                  />
                  <CardContent>
                    <List component="div" dense>
                      {props.jobs.tanks.map((job, jobIndex) => {
                        return (
                          <ListItem
                            button
                            key={jobIndex}
                            onClick={() => {
                              router.push(`${router.asPath}/${job.initial}`);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={`/icons/jobs/${job.initial}.png`}
                                variant="square"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={job.name}
                              secondary={job.initial.toUpperCase()}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar src="/icons/jobs/healer.png" variant="square" />
                    }
                    title="회복 역할군"
                  />
                  <CardContent>
                    <List component="div" dense>
                      {props.jobs.healers.map((job, jobIndex) => {
                        return (
                          <ListItem
                            button
                            key={jobIndex}
                            onClick={() => {
                              router.push(`${router.asPath}/${job.initial}`);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={`/icons/jobs/${job.initial}.png`}
                                variant="square"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={job.name}
                              secondary={job.initial.toUpperCase()}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader
                avatar={<Avatar src="/icons/jobs/dps.png" variant="square" />}
                title="공격 역할군"
              />
              <CardContent>
                <Grid container direction="row" spacing={5}>
                  <Grid item xs={6}>
                    <List component="div" dense>
                      <ListSubheader component="div">근거리 공격</ListSubheader>
                      {props.jobs.melees.map((job, jobIndex) => {
                        return (
                          <ListItem
                            button
                            key={jobIndex}
                            onClick={() => {
                              router.push(`${router.asPath}/${job.initial}`);
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar
                                src={`/icons/jobs/${job.initial}.png`}
                                variant="square"
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={job.name}
                              secondary={job.initial.toUpperCase()}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container direction="column" spacing={5}>
                      <Grid item>
                        <List component="div" dense>
                          <ListSubheader component="div">
                            원거리 물리 공격
                          </ListSubheader>
                          {props.jobs.physicalRanged.map((job, jobIndex) => {
                            return (
                              <ListItem
                                button
                                key={jobIndex}
                                onClick={() => {
                                  router.push(
                                    `${router.asPath}/${job.initial}`
                                  );
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    src={`/icons/jobs/${job.initial}.png`}
                                    variant="square"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={job.name}
                                  secondary={job.initial.toUpperCase()}
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Grid>
                      <Grid item>
                        <List component="div" dense>
                          <ListSubheader component="div">
                            원거리 마법 공격
                          </ListSubheader>
                          {props.jobs.magicalRanged.map((job, jobIndex) => {
                            return (
                              <ListItem
                                button
                                key={jobIndex}
                                onClick={() => {
                                  router.push(
                                    `${router.asPath}/${job.initial}`
                                  );
                                }}
                              >
                                <ListItemAvatar>
                                  <Avatar
                                    src={`/icons/jobs/${job.initial}.png`}
                                    variant="square"
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={job.name}
                                  secondary={job.initial.toUpperCase()}
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>{generateFooter()}</Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default BisGuide;
