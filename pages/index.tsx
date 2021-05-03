import React, { CSSProperties, useEffect } from "react";
import Link from "../src/Link";
import { PageAnimations, Motions } from "../src/types/interfaces";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "../src/ui/footer/Footer";
import Tab from "@material-ui/core/Tab/Tab";
import Tabs from "@material-ui/core/Tabs/Tabs";
import FeaturedProducts from "../src/ui/landingpage/FeaturedProducts";
import PageTransition from "../src/ui/hoc/PageTransition";
import HeroParallax from "../src/ui/landingpage/HeroParallax";
import Overlay from "../src/ui/overlay/Overlay";
import TitleHeader from "../src/ui/titleHeader/TitleHeader";

interface IProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIndex: (value: number) => void;
  pageStyle: CSSProperties;
  pageAnimations: PageAnimations;
  motions: Motions;
  jumpTo: (jumpingTarget: string | number | Element) => void;
}

interface ITabLinks {
  show: boolean;
  tabProps: { name: string; route: string }[];
  routeIndex: number;
}

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.up("sm")]: {
      marginBottom: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "35px",
    },
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
  overlayWrapper: {
    top: 0,
    width: "100%",
    position: "relative",
    zIndex: 0,
    opacity: 0.93,
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      overflow: "none",
    },
    [theme.breakpoints.down("sm")]: {
      overflow: "hidden",
      height: "335px",
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
      margin: "100px auto 90px",
      fontSize: "1.10rem",
      lineHeight: "3",
    },
  },
}));

  /** Return tabs to be highlighted when route is chosen and clicked
   * @param {show, routeIndex, tabProps}
   */
   const TabLinks = ({ show, routeIndex, tabProps }: ITabLinks) => {
    const classes = useStyles();
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
export default function Home(props: IProps) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = {
    sm: useMediaQuery(theme.breakpoints.down("sm")),
  };

  /* Aos adds on screen effects, changes opacity, scaleX & scaleY*/
  useEffect(() => {
    Aos.init({ duration: 900 });
  }, []);

  return (
    <PageTransition
      pageStyle={props.pageStyle}
      pageAnimations={props.pageAnimations}
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
      <div className={classes.overlayWrapper}>
        <Overlay color={theme.palette.common.brightMudBrown} />
        <HeroParallax setPageIndex={props.setValue} />
      </div>

      <div className={classes.sectionBorder} />

      <Grid container direction="column" justify="center">
          {/* Header - About.. */}
          <div className={classes.sectionMargin}></div>
        <TitleHeader header='About Benson Bracelets' />
        <Grid item xs={12}>
          <p className={classes.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            minima maxime temporibus at deleniti eum sapiente vitae iure velit
            maiores aliquid ea quo pariatur quidem reiciendis quas, consequatur
            corrupti officiis earum corporis recusandae quasi consequuntur nisi
            dolorem. Odit, nisi. Id. Tenetur minima maxime temporibus at
            deleniti eum sapiente vitae iure velit maiores aliquid ea quo
            pariatur quidem reiciendis quas, consequatur corrupti officiis earum
            corporis recusandae quasi consequuntur nisi dolorem.
          </p>
        </Grid>
        {/* Header - Featured Bracelets */}

        <FeaturedProducts setValue={props.setValue} />
      </Grid>
      <Footer
        setValue={props.setValue}
        setSelectedIndex={props.setSelectedIndex}
      />
    </PageTransition>
  );
}
