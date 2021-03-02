import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";

import Link from "../../Link";

interface IProps {
  setValue: (value: number) => void;
  setSelectedIndex: (value: number) => void;
  // routes: IRoute[];
  // anchorEl?: HTMLElement;
  // openMenu: boolean;
  // menuOptions: IMenuOption[];
  // handleClose: () => void;
  // handleMenuItemClick:  (e: MouseEvent, i: number) => void;
  // handleChange: () => any;
  //   pageStyle: CSSProperties;
  //   pageAnimations: IPageAnimations;
  //   motions: IMotions;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "35px",
    },
  },
  footerContainer: {
    backgroundColor: theme.palette.common.brightMudBrown,
    padding: "100px 0px 90px",
    position: 'relative',
    fontFamily: 'Roboto',
    borderTop: `15px solid ${theme.palette.common.slateTan}`,
    // marginTop: "100px",
    // height: '950px',
    // width: '100%',
    [theme.breakpoints.up("lg")]: {
      // paddingLeft: "120px",
      // paddingRight: "120px",
    },
  },
  footerNavigation: {
    listStyle: "none",
    color: theme.palette.common.slateTan,

    lineHeight: "2.5",
    paddingLeft: "0px",
  },
  iconWrapper: {
    width: "35px",
    marginBottom: '20px',
    '&:hover': {
      opacity: '0.3',
      color: 'white',
      cursor: 'pointer',
    },
    [theme.breakpoints.up("sm")]: {
      width: "45px",
      marginBottom: '0px',
    },
  },
  footerRight: {
    marginTop: "50px",
    borderBottom: `2px solid ${theme.palette.common.dimegray}`,
    //
    //
    //
    // paddingBottom: "60px",
    [theme.breakpoints.up("sm")]: {
      borderLeft: `2px solid ${theme.palette.common.dimegray}`,
      borderBottom: "none",
      paddingBottom: "0px",
    },
  },
  footerbottombar: {
    height: "26px",
    color: theme.palette.common.slateTan,
    maxWidth: '260px',
    paddingTop: '10px',
    
    // position: "absolute",
    // bottom: "0.45%",
    margin: '0px auto',
    [theme.breakpoints.up("sm")]: {
      borderTop: `1px solid ${theme.palette.common.dimegray}`,
            marginTop: '100px',
    },
  },
  footerNavBtn: {
    opacity: "0.75",
    transition: 'color 0.3s, opacity 0.3s',
    color: theme.palette.common.slateTan,
    '&:hover': {
      opacity: '0.9',
      color: 'white'
    }

  },
}));

export default function Footer(props: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  };
  return (
    <>
      <Grid
        container
        className={classes.footerContainer}
        // style={matches.sm ? { height: "400px" } : { height: "inherit" }}
        justify={matches.sm ? "space-around" : "center"}
        alignContent={"center"}
        direction={matches.sm ? "row" : "column"}
      >
        <Grid item xs={12} sm={6}>
          {/* LeftSide of Footer*/}
          <Typography className={classes.footerNavigation} component="ul">
            <li>
              <Button className={classes.footerNavBtn} component={Link} href="/">
                Home
              </Button>
            </li>
            <li>
              <Button
                className={classes.footerNavBtn}
                component={Link}
                href="/contact"
              >
                Contact Us
              </Button>
            </li>
            <li>
              <Button
                className={classes.footerNavBtn}
                component={Link}
                href="/collections"
              >
                Collections
              </Button>
            </li>
          </Typography>
        </Grid>
        {/* Rightside of Footer*/}
        <Grid item xs={12} sm={6}>
          <Grid container style={{width: matches.sm ? '40%' : '100%'}}>
            <Grid item xs={12} className={classes.footerRight}>
              <Grid
                container
                justify="space-around"
                direction="row"
                data-aos="fade-left"
              >
                <Grid item className={classes.iconWrapper}>
                  <img style={{ width: "100%" }} src='/assets/facebook.svg' alt='facebook' />
                </Grid>
                <Grid item className={classes.iconWrapper}>
                  <img
                    style={{ width: "100%", paddingTop: "0.15px" }}
                    src='/assets/instagram.svg' alt='instagram'
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4}>
        <div className={classes.footerbottombar}>
          <span style={{ opacity: 0.65 }}>
            &#169;Copyright 2021 Benson's Bracelets
          </span>
        </div>
        </Grid>
      </Grid>
    </>
  );
}
