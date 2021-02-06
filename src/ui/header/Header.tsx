import * as React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Link from "../../Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Hidden from "@material-ui/core/Hidden/Hidden";

import Headertabs from "./headertabs/Headertabs";
import Sidedrawer from "./sidedrawer/Sidedrawer";

import { MouseEvent } from "../../types/aliases"; // TYPE - Events

import { bracelets } from "../../data/data";
import Typography from "@material-ui/core/Typography/Typography";

interface IHideOnScrollProps {
  children?: any;
}

export interface IRoute {
  name: string;
  link: any;
  activeIndex: number;
  selectIndex?: number;
  ariaOwns?: string;
  ariaHasPopup?: string;
  mouseOver?: any;
}

export interface IMenuOption {
  name: string;
  link: string;
  activeIndex: number;
  selectedIndex: number;
}

function HideOnScroll(props: IHideOnScrollProps) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up("md")]: {
      marginBottom: "5em",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0em",
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    boxShadow: "none",
    padding: '0',
  },
  upperToolbar: {},
  homeBtn: {
    "&:hover": {
      // backgroundColor: 'transparent',
    },
  },
  logo: {
    // LOGO FOR NOW - TEMPORARY
    color: theme.palette.common.white,
    padding: "1px 4px",
    border: `3px solid ${theme.palette.common.dimegray}`,
    textDecoration: "none",
  },
  logoOuterBorder: {
    marginLeft: "30px",
    padding: "5px 2px",
    borderRadius: "4px",
    border: `0.8px solid #ffffff90`,
  },
  secondToolbar: {
    height: "20px",
    marginLeft: "auto",
  },

  popperZIndex: {
    zIndex: 1303,
  },
  optionsText: {
    // AUTO COMPLETE SELECT - OPTIONS
    color: "rgb(85,77,64)",
    letterSpacing: "0.5px",
    fontSize: "0.85rem",
    backgroundColor: "rgba(231,212,195, 0.01)",
    fontFamily: "Raleway",
    "&:hover": {
      color: theme.palette.common.orange,
      backgroundColor: "rgba(231,212,195, 0.15)",
    },
  },
  toolbarGrid: {
    borderTop: `2px solid ${theme.palette.common.dimegray}99`,
    backgroundColor: theme.palette.common.antiqueWhite,
    padding: "0px 0px 30px",
  },
  underline: {
    "&:focused": {
      color: "blue",
    },
    "&:hover": {
      underline: "green",
    },
  },
  root: {
    width: "100%",
    marginLeft: "auto",
  },
}));

export default function Header(props: any) {
  const classes = useStyles(); //useStyles is a funct that will build the classes object
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };
  const handleMenuItemClick = (e: MouseEvent, i: number) => {
    //   setAnchorEl(null);
    setOpenMenu(false);
    props.setSelectedIndex(i);
  };
  const handleClose = () => setOpenMenu(false);

  const menuOptions = [
    {
      name: "Collections",
      link: "/collections",
      activeIndex: 1,
      selectedIndex: 0,
    },
    {
      name: "Luxury",
      link: "/collections/luxury",
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: "Fraternity & Sorority",
      link: "/collections/fraternitysorority",
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: "Team Colors",
      link: "/collections/teamcolors",
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const routes: IRoute[] = [
    { name: "Home", link: "/", activeIndex: 0 },
    {
      name: "Collections",
      link: "/collections",
      activeIndex: 1,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaHasPopup: anchorEl ? "true" : undefined,
      mouseOver: (event: MouseEvent) => handleClick(event),
    },
    { name: "Contact Us", link: "/contact", activeIndex: 2 },
    { name: "Cart", link: "/shoppingcart", activeIndex: 3 },
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach((route: any) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (props.value !== route.activeIndex) {
            props.setValue(route.activeIndex);
            if (
              route.selectedIndex &&
              route.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [props, props.value, menuOptions, props.selectedIndex, routes]);

  const tabs = (
    <Headertabs
      value={props.value}
      setValue={props.setValue}
      selectedIndex={props.selectedIndex}
      routes={routes}
      anchorEl={anchorEl}
      openMenu={openMenu}
      menuOptions={menuOptions}
      handleClose={handleClose}
      handleChange={props.handleChange}
      handleMenuItemClick={handleMenuItemClick}
    />
  );

  const sidedrawer = (
    <Sidedrawer routes={routes} value={props.value} setValue={props.setValue} />
  );

  function convertToRoute(nestedRoute: string, itemName: string) {
    // www.website.com/nestedRoute/itemName
    itemName = nestedRoute + itemName;

    let spaces = new RegExp("[ ]+", "g");
    let namedRoute = itemName.replace(spaces, "");
    let uppercase = new RegExp("[A-Z]", "g");

    return namedRoute.replace(uppercase, (x: string) => x.toLowerCase());
  }

  const handleAutoComplete = (name: string) => {
    console.log("String in Autocomplet: ", typeof name);
    if (name !== null) {
      router.push(convertToRoute("/collections/", name));
    } else {
      router.push("/collections");
    }
  };

  return (
    <>
      <HideOnScroll>
        <AppBar className={classes.appbar} position="fixed">
          <Toolbar>
            <Grid
              container
              justify="space-around"
              alignItems="center"
              className={classes.upperToolbar}
            >
              <Grid item xs={6}>
                <Link
                  style={{ textDecoration: "none" }}
                  className={classes.homeBtn}
                  onClick={() => props.setValue(0)}
                  href="/"
                >
                  <Typography variant="h4">
                    <span className={classes.logoOuterBorder}>
                      <span className={classes.logo}>BB</span>
                    </span>
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  {matches ? sidedrawer : tabs}
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
          <Hidden smDown>
            <Grid container classes={{ root: classes.toolbarGrid }}>
              <Toolbar className={classes.secondToolbar}>
                <div style={{ width: 300 }}>
                  <Autocomplete
                    classes={{
                      popper: classes.popperZIndex,
                      option: classes.optionsText,
                      listbox: classes.optionsText,
                    }}
                    onChange={(event: ChangeEvent<{}>, value: any) => {
                      handleAutoComplete(value);
                    }}
                    id="free-solo-demo"
                    freeSolo
                    options={bracelets.map((option) => option.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        id="outlined-size-small"
                        label="Search Bracelets"
                        margin="normal"
                        color={undefined}
                        classes={{ root: classes.underline }}
                      />
                    )}
                  />
                </div>
              </Toolbar>
            </Grid>
          </Hidden>
        </AppBar>
      </HideOnScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
}
