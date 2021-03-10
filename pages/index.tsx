import React, { CSSProperties, useEffect } from "react";
import Link from "../src/Link";

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

import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import { useRouter } from "next/router";
import FeaturedProducts from '../src/landingpage/FeaturedProducts'

interface IProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
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
      marginBottom: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "35px",
    },
  },
  sectionBorder: {
    borderTop: `20px solid ${theme.palette.common.slateTan}`,
    borderBottom: `0.2px solid ${theme.palette.common.slateBrown}`,
  },
  centering: {
    margin: "0 auto",
  },
  headersUnderline: {
    borderRadius: '4px',
    padding: '5px 10px',
    // backgroundColor: '#d6c7a9',
    backgroundColor: theme.palette.common.antiqueWhite,
    marginTop: '10px',
    border: `0.5px solid ${theme.palette.common.slateBrown}30`, 
  },
  thinInnerLine: {
    backgroundColor: `${theme.palette.common.slateTan}99`,
    height: "1px",
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
    padding: "0px",
    [theme.breakpoints.up("sm")]: {
      font: "1.25rem Raleway",
      padding: "0 45px",
    },
    [theme.breakpoints.down("sm")]: {
      font: "0.8rem Raleway",
      width: "200px",
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
    fontFamily: "Roboto",
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
}));

export default function Home(props: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  enum Images {
    HeroMobile = "/assets/images/bracelets/heroImgMobile5.jpg",
    HeroParallax = "/assets/images/bracelets/bensonbracelet-hero-parallax.jpg",
    Bracelet1 = "/assets/images/bracelets/bracelet1.jpg",
    Bracelet2 = "/assets/images/bracelets/bracelet2.jpg",
    Bracelet3 = "/assets/images/bracelets/bracelet3.jpg",
  }
  const matches = {
    sm: useMediaQuery(theme.breakpoints.down("sm")),
    md: useMediaQuery(theme.breakpoints.down("md")),
    lg: useMediaQuery(theme.breakpoints.down("lg")),
    xl: useMediaQuery(theme.breakpoints.down("xl")),
  };//If query matches sm,md,lg,xl then use the 'matches' object to change styles

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

  const setRouteToCollections = () => {
    router.push("/collections");
    props.setValue(3);
  };

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
                {matches.sm === false ? (
                  <p>Shop Collections</p>
                ) : (
                  <p>Shop Collections</p>
                )}
              </Button>
            </div>
            <p className={classes.heroCompanyName}>Benson Bracelets</p>
          </Parallax>
        </div>

        <div className={classes.sectionBorder} />
        <div className={classes.sectionMargin}></div>

        <Grid container direction="column" justify="center">
          <Grid item style={{ margin: "0 auto" }}>
            {/* Header - About.. */}
            <div className={classes.sectionMargin}></div>
            <Typography variant="h2" component="h2">
              About Benson Bracelets
            </Typography>
            <div className={classes.headersUnderline}>
              <div className={classes.thinInnerLine} />      
            </div>
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
          
        <FeaturedProducts setValue={props.setValue} />
        </Grid>
        <Footer
          setValue={props.setValue}
          setSelectedIndex={props.setSelectedIndex}
        />
      </motion.div>
    </div>
  );
}
