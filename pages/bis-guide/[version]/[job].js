import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
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
    maxWidth: 128,
    width: "100%",
  },
  link: {
    color: "inherit",
    cursor: "pointer",
    textDecoration: "none",
  },
}));

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { version, job } = context.params;

  const parentPageDataPath = path.join(
    process.cwd(),
    `/data/bis-guide/${version}/bis-page-data.json`
  );
  if (!fs.existsSync(parentPageDataPath)) {
    return {
      notFound: true,
    };
  }
  const parentPageData = fs.readFileSync(parentPageDataPath);

  const pageDataPath = path.join(
    process.cwd(),
    `/data/bis-guide/${version}/bis-${job}-page-data.json`
  );
  if (!fs.existsSync(pageDataPath)) {
    return {
      notFound: true,
    };
  }
  const pageData = fs.readFileSync(pageDataPath);

  const gearDataPath = path.join(
    process.cwd(),
    `/data/bis-guide/${version}/bis-${job}-gear-data.json`
  );
  if (!fs.existsSync(gearDataPath)) {
    return {
      notFound: true,
    };
  }
  const gearData = fs.readFileSync(gearDataPath);

  return {
    props: {
      parentPageData: JSON.parse(parentPageData),
      pageData: JSON.parse(pageData),
      gearData: JSON.parse(gearData),
    },
  };
}

const BisGuideJob = (props) => {
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
      {generatePreviewImage(props.pageData.banner)}
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Breadcrumbs>
            <Link
              className={classes.link}
              color="inherit"
              onClick={() => {
                router.push(`/bis-guide/${version}`);
              }}
            >
              {props.parentPageData.pageTitle}
            </Link>
            <Typography color="textPrimary">
              {props.pageData.pageTitle}
            </Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <Container maxWidth="md">
            <Grid container direction="column" spacing={5}>
              <Grid item>
                <Grid
                  alignItems="center"
                  container
                  direction="row"
                  justify="center"
                >
                  <Grid item>
                    <Typography variant="h5">
                      {props.pageData.pageTitle}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  alignItems="center"
                  container
                  direction="row"
                  justify="center"
                >
                  <Grid item>
                    <img
                      className={classes.banner}
                      src={props.pageData.banner}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  {props.pageData.descriptionText}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        {props.gearData.map((table, tableIndex) => {
          return (
            <Grid item key={tableIndex}>
              <Toolbar>
                <Typography variant="h6">{table.title}</Typography>
              </Toolbar>
              <Typography variant="body2">{table.description}</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <Hidden mdDown>
                        <TableCell />
                      </Hidden>
                      {table.columnDefinitions.map(
                        (columnDefinition, columnDefinitionIndex) => {
                          return (
                            <TableCell key={columnDefinitionIndex}>
                              {columnDefinition.printedName}
                            </TableCell>
                          );
                        }
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.gearSets.map((gearSet, gearSetIndex) => {
                      return (
                        <TableRow
                          className={classes.link}
                          hover
                          key={gearSetIndex}
                          onClick={() => {}}
                        >
                          <Hidden mdDown>
                            <TableCell>{gearSet.title}</TableCell>
                          </Hidden>
                          {table.columnDefinitions.map(
                            (columnDefinition, columnDefinitionIndex) => {
                              return (
                                <TableCell key={columnDefinitionIndex}>
                                  {gearSet[columnDefinition.propertyName]}
                                  {columnDefinition.append}
                                </TableCell>
                              );
                            }
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          );
        })}
        <Grid item>{generateFooter()}</Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BisGuideJob;
