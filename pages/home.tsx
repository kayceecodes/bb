import React, { CSSProperties, useEffect } from "react";
import Link from '../src/Link'
import { useHistory } from "react-router-dom";

import { motion } from "framer-motion";

import { IPageAnimations, IMotions } from "../src/types/interfaces";

import { Parallax } from "react-parallax";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";

import Aos from "aos";
import "aos/dist/aos.css";

import Footer from "../src/ui/footer/Footer";

import { bracelets } from "../src/data/data";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";

interface IProps {
  value: number;
  setValue: (value: number) => void;
  setSelectedIndex: (value: number) => void;
  pageStyle: CSSProperties;
  pageAnimations: IPageAnimations;
  motions: IMotions;
  jumpTo: (jumpingTarget: string | number | Element) => void;
}

interface ITabLinks {
  show: boolean;
  tabProps: { name: string; route: string }[];
  routeIndex: number;
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
  centering: {
    margin: "0 auto",
  },
  headersUnderline: {
    padding: "0px 13px 10px",
    borderBottom: `3px solid ${theme.palette.common.antiqueWhite}`,
  },
  tabLinks: {
    position: "absolute",
    zIndex: 1,
    left: "calc(50% - 75px)",
    top: "8px",
    color: "#ffffffcf",
  },
  tabLinksBtn: {
    minWidth: "75px",
  },
  tabsIndicator: {
    height: "2.5px",
  },
  heroBtnWrapper: {
    padding: "4px",
    border: `11px solid ${theme.palette.common.orange}27`,
    borderRadius: "5px",
    position: "fixed",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 3,

    [theme.breakpoints.up("sm")]: {
      top: "320px",
    },
    [theme.breakpoints.down("sm")]: {
      top: "170px",
      border: `8px solid ${theme.palette.common.orange}27`,
    },
  },
  heroBtn: {
    textTransform: "none",
    letterSpacing: "2.8px",
    backgroundColor: "rgb(0, 0, 0, 0.005)",
    color: "white",
    border: "1.5px solid white",
    borderRadius: "0px",
    textShadow: "0px 0px 8px rgba(0,0,0,0.99)",
    transition: "opacity 0.4s",
    padding: "0 45px",
    [theme.breakpoints.up("sm")]: {
      font: "1.25rem Raleway",
    },
    [theme.breakpoints.down("sm")]: {
      font: "0.8rem Raleway",
    },
    "&:hover": {
      opacity: "0.6",
    },
    // boxShadow: '0px 0px 17px rgba(0, 0, 0, 1)',
  },
  overlayWrapper: {
    top: 0,
    width: "100%",
    position: "relative",
    zIndex: 0,
    opacity: 0.93,
    [theme.breakpoints.up("sm")]: {
      overflow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      overflow: "hidden",
      height: "335px",
    },
  },
  heroCompanyName: {
    letterSpacing: " 0.85px",
    wordSpacing: "8px",
    position: "fixed",
    right: "40px",
    color: theme.palette.common.orange,
    textShadow: "0px 0px 5px rgba(0,0,0,0.99)",
    zIndex: 3,
    margin: "0px 0px 0px 0px",
    borderBottom: "2px solid white",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
      top: "540px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.45rem",
      top: "290px",
      letterSpacing: "0.3px",
      wordSpacing: "2px",
      right: "5%",
    },
  },

  featuredBraceletsHeader: {
    fontFamily: "Raleway",
    color: "rgba(74,63,53, 0.85)",
    marginTop: "15px",
    // fontSize: "1.7rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  },
  paragraph: {
    font: "1.4rem Raleway",
    color: `${theme.palette.common.dimGray}`,
    letterSpacing: "0.5px",
    maxWidth: "850px",
    margin: "80px auto 0px",
    paddingBottom: "80px",
    [theme.breakpoints.up("sm")]: {
      margin: "140px auto 90px",
      fontSize: "1.10rem",
      lineHeight: "1.7",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "80px auto",
      fontSize: "0.85rem",
      lineHeight: 1.8,
      width: "85%",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "140px auto 90px",
      fontSize: "1.10rem",
      lineHeight: "3",
    },
  },
  braceletsContainer: {
    margin: "5px auto",
    paddingBottom: "50px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "140px",
      marginTop: "100px",
    },
  },
  braceletImgs: {
    // width: '60%',
    // width: '200px', //TEST OUT XS and the GRID SYSTEM
    [theme.breakpoints.up("sm")]: {
      width: "220px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "140px",
    },
  },
  featuredPricesBtn: {
    border: "2px solid transparent",
    marginTop: "15px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "25px",
    },
    "&:hover": {
      border: `2px solid ${theme.palette.common.slateTan}`,
    },
  },
  featuredName: {
    marginBottom: "-15px",
    marginTop: "50px",
  },
  featuredPrices: {
    position: "absolute",
    top: "40%",
    left: "37%",
    color: theme.palette.common.dimegray,
    // fontFamily: 'Raleway',
    fontSize: "0.85rem",
    fontWeight: 400,
    textAlign: "center",
    margin: "0px auto",
    [theme.breakpoints.up("lg")]: {
      left: "40%",
    },
    // border: `2px solid ${theme.palette.common.dimegray}`,
  },
}));

export default function Home(props: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory(); //History obj from react-router
  const collectionsPath = "/collections/";
  enum Images {
    HeroMobile = '/assets/images/bracelets/heroImgMobile5.jpg',
    HeroParallax = '/assets/images/bracelets/bensonbracelet-hero-parallax.jpg',
    Bracelet1 = '/assets/images/bracelets/bracelet1.jpg',
    Bracelet2 = '/assets/images/bracelets/bracelet2.jpg',
    Bracelet3 = '/assets/images/bracelets/bracelet3.jpg'
  }
  const matches = {
    sm: useMediaQuery(theme.breakpoints.down("sm")),
    md: useMediaQuery(theme.breakpoints.down("md")),
    lg: useMediaQuery(theme.breakpoints.down("lg")),
    xl: useMediaQuery(theme.breakpoints.down("xl")),
  }; // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles
  const featuredBracelets = [bracelets[0], bracelets[1], bracelets[2]];

  /** Return tabs to be highlighted when route is chosen and clicked
   * @param {show, routeIndex, tabProps}
   */
  const TabLinks = ({ show, routeIndex, tabProps }: ITabLinks) => {
    return (
      <Tabs
        className={classes.tabLinks}
        classes={{
          root: classes.tabLinksBtn,
          indicator: classes.tabsIndicator,
        }}
        style={{ display: show ? "block" : "none" }}
        value={routeIndex}
        aria-label="Mobile View Navigation - Width less than md: 960px"
      >
        {tabProps.map((tabProp: { name: string; route: string }) => (
          <Tab
            key={tabProp.name + tabProp.route}
            label={tabProp.name}
            component={Link}
            href={tabProp.route}
            classes={{ textColorInherit: classes.tabLinksBtn }}
          />
        ))}
      </Tabs>
    );
  };
  /* Aos adds on screen effects, changes opacity, scaleX & scaleY*/
  useEffect(() => {
    Aos.init({ duration: 900 });
  }, []);

  const dimegrayOverlay: CSSProperties = {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.common.brightMudBrown,
    opacity: 0.8,
    zIndex: 3,
  };

  function convertToRoute(nestedRoute: string, itemName: string) {
    // Example www.website.com/nestedRoute/itemName
    itemName = nestedRoute + itemName;
    let spaces = new RegExp("[ ]+", "g");
    let namedRoute = itemName.replace(spaces, "");
    // return namedRoute;
    let uppercase = new RegExp("[A-Z]", "g");

    return namedRoute.replace(uppercase, (x: string) => x.toLowerCase());
  }
 
  const setRouteToCollections = () => {history.push("/collections"); props.setValue(3)}  

  return (
    <div>
      <motion.div
        style={props.pageStyle} // Style of the page as a container
        initial={props.motions.initial}
        animate={props.motions.animate}
        exit={props.motions.exit}
        variants={props.pageAnimations.variants} //pageAnimations obj broken up to 2 nested objs, variant & transitions
        transition={props.pageAnimations.transition}
      >
        {matches.sm ? (
          <TabLinks
            show={matches.sm}
            routeIndex={props.value}
            tabProps={[
              { name: "Home", route: "/" },
              { name: "Cart", route: "/shoppingcart" },
            ]}
          />
        ) : null}
        <div
          className={classes.overlayWrapper}
          style={{
            overflow: `${matches.sm ? "hidden" : ""}`,
            position: "relative",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
          }}
        >
          <div style={dimegrayOverlay} />
          <Parallax
            strength={550}
            style={{
              height: "600px",
              minWidth: `${matches.sm ? "800px" : "1400px"}`,
            }}
            bgImage={matches.sm ? Images.HeroMobile : Images.HeroParallax}
          >
            <div className={classes.heroBtnWrapper}>
                <Button
                  className={classes.heroBtn}
                  onClick={() => setRouteToCollections()}
                >
                  {matches.sm === false ? <p>Shop Collections</p> : <p>Shop Collections</p>}
                </Button>
              </div>
            <p className={classes.heroCompanyName} style={{fontFamily: 'Raleway'}}>Benson Bracelets</p>
          </Parallax>
        </div>

        <div className={classes.sectionMargin} />

        <Grid container direction="column" justify="center">
          <Grid item style={{ margin: "0 auto" }}>
            {/* Header - About.. */}
            <Typography variant="h2" component="h2">
              <div className={classes.headersUnderline}>
                About Benson Bracelets
              </div>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              minima maxime temporibus at deleniti eum sapiente vitae iure velit
              maiores aliquid ea quo pariatur quidem reiciendis quas,
              consequatur corrupti officiis earum corporis recusandae quasi
              consequuntur nisi dolorem. Odit, nisi. Id. Tenetur minima maxime
              temporibus at deleniti eum sapiente vitae iure velit maiores
              aliquid ea quo pariatur quidem reiciendis quas, consequatur
              corrupti officiis earum corporis recusandae quasi consequuntur
              nisi dolorem.
            </p>
          </Grid>
          {/* Header - Featured Bracelets */}
          <div className={classes.centering}>
            <Typography
              component="h2"
              variant="h2"
              data-aos="fade-left"
              id="featuredBracelets"
            >
              <div className={classes.headersUnderline}>Featured Bracelets</div>
            </Typography>
          </div>
          {/* Bracelet Container */}
          <Grid
            container
            direction="row"
            justify="center"
            className={classes.braceletsContainer}
            style={{ maxWidth: "78%" }}
          >
            <Grid
              data-aos="fade-up"
              item
              xs={10}
              sm={4}
              style={{ position: "relative" }}
            >
              <Typography
                className={classes.featuredName}
                paragraph={true}
                variant="caption"
              >
                {featuredBracelets[0].name}
              </Typography>
              <Button
                className={classes.featuredPricesBtn}
                component={Link}
                href={convertToRoute(collectionsPath, featuredBracelets[0].name)}
                onClick={() => props.setValue(1)}
              >
                <Typography
                  className={classes.featuredPrices}
                  paragraph={true}
                  variant="caption"
                >
                  ${featuredBracelets[0].price}
                </Typography>
                <img
                  src={Images.Bracelet1}
                  className={classes.braceletImgs}
                  alt="bracelet"
                />
              </Button>
            </Grid>
            <Grid
              data-aos="fade-up"
              item
              xs={10}
              sm={4}
              style={{ position: "relative" }}
            >
              <Typography
                className={classes.featuredName}
                paragraph={true}
                variant="caption"
              >
                {featuredBracelets[1].name}
              </Typography>
              <Button
                className={classes.featuredPricesBtn}
                component={Link}
                href={convertToRoute(collectionsPath, featuredBracelets[1].name)}
                onClick={() => props.setValue(1)}
              >
                <Typography
                  className={classes.featuredPrices}
                  paragraph={true}
                  variant="caption"
                >
                  ${featuredBracelets[1].price}
                </Typography>
                <img
                  src={Images.Bracelet2}
                  className={classes.braceletImgs}
                  alt="bracelet"
                />
              </Button>
            </Grid>
            <Grid
              data-aos="fade-up"
              item
              xs={10}
              sm={4}
              style={{ position: "relative" }}
            >
              <Typography
                className={classes.featuredName}
                paragraph={true}
                variant="caption"
              >
                {featuredBracelets[2].name}
              </Typography>
              <Button
                className={classes.featuredPricesBtn}
                component={Link}
                href={convertToRoute(collectionsPath, featuredBracelets[2].name)}
                onClick={() => props.setValue(1)}
              >
                <Typography
                  className={classes.featuredPrices}
                  paragraph={true}
                  variant="caption"
                >
                  ${featuredBracelets[2].price}
                </Typography>
                <img
                  src={Images.Bracelet3}
                  className={classes.braceletImgs}
                  alt="bracelet"
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Footer
          setValue={props.setValue}
          setSelectedIndex={props.setSelectedIndex}
        />
      </motion.div>
    </div>
  );
}
