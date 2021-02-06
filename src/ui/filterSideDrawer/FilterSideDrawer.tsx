import React from "react"

import Button from "@material-ui/core/Button/Button"
import Icon from "@material-ui/core/Icon/Icon"
import Typography from "@material-ui/core/Typography/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import useTheme from "@material-ui/core/styles/useTheme"
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery"

import { motion } from "framer-motion"
import { CATEGORIES } from "../../../pages/collections"

interface IFilterDrawerProps {
  filterCategory: string
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>
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
  heightOfContainer: {
    height: "100%",
  },
  header: {
    borderBottom: `2px solid ${theme.palette.common.antiqueWhite}`,
    padding: "0px 30px 30px",
    width: "190px",
    textAlign: "center",
    margin: "0 auto 70px",
  },
  shoppingcartContainer: {
    width: "95%",
    margin: "0px auto",
    maxWidth: "1150px",
    [theme.breakpoints.up("lg")]: {
      width: "85%",
    },
  },
  totalItems: {
    textAlign: "left",
    fontFamily: "Nunito",
    color: "rgba(54, 68, 92, 1)",
  },
  scrollOverflow: {
    overflow: "auto",
    height: "350px",
    marginTop: "20px",
    border: `1px solid ${theme.palette.common.dimegray}10`,
    backgroundColor: theme.palette.common.offWhite,
    borderRadius: "4px",
  },
  absolutePos: {
    position: "absolute",
    right: "30px",
    top: 0,
  },
  bottomBorder: {
    marginTop: "25px",
    border: `0.5px solid ${theme.palette.common.orange}`,
    width: "280px",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "450px",
    },
  },
  filterDrawer: {
    position: "fixed",
    top: "45%",
    left: "-0.11%",
    padding: "4px 3px",
    lineHeight: 3,
    listStyle: "none",
    borderRadius: "4px",
    backgroundColor: "#b9ac9210",
    opacity: 0.85,
    zIndex: 3,
    color: theme.palette.common.dimegray,
    boxShadow: `0px 0px 12px #52390650`,
    [theme.breakpoints.up("md")]: {
      padding: "5px 35px",
    },
  },
  filterDrawerBtn: {
    color: theme.palette.common.dimegray,
    textTransform: "none",
    fontFamily: "Raleway",
    letterSpacing: "1.8px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.68rem",
    },
  },
  filterDrawerBtnArrow: {
    fontSize: "0.85rem",
    color: theme.palette.common.kitkatOrange,
  },
}))

const FilterDrawer = (props: IFilterDrawerProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  } // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles

  return (
    <Typography
      variant="body1"
      component="ul"
      className={classes.filterDrawer}
      data-aos="fade-up"
    >
      <motion.span
        style={{
          position: "absolute",
          left: "15px",
          color: props.filterCategory === "" ? "white" : "darkorange",
        }}
        initial={{
          y: 1,
        }}
        animate={{
          y:
            props.filterCategory === ""
              ? 1
              : CATEGORIES[`${props.filterCategory}`].filterArrowPos,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        {matches.md && props.filterCategory !== "" ? (
          <Icon className={classes.filterDrawerBtnArrow}>
            arrow_forward_ios
          </Icon>
        ) : null}
      </motion.span>
      <li>
        <Button
          className={classes.filterDrawerBtn}
          style={{
            color:
              props.filterCategory === CATEGORIES["Luxury"].name
                ? theme.palette.common.kitkatOrange
                : theme.palette.common.dimegray,
          }}
          onClick={() => props.setFilterCategory(CATEGORIES["Luxury"].name)}
        >
          <i
            style={{ paddingRight: "8px", fontSize: "9px" }}
            className="far fa-gem"
          ></i>
          {/* <img src={HexagonOutline} alt='Luxury' style={{paddingRight: '6px', width: '15px', color: theme.palette.common.orange}} /> */}
          Luxury
        </Button>
      </li>
      <li>
        <Button
          className={classes.filterDrawerBtn}
          style={{
            color:
              props.filterCategory === CATEGORIES["Fraternity & Sorority"].name
                ? theme.palette.common.kitkatOrange
                : theme.palette.common.dimegray,
          }}
          onClick={() =>
            props.setFilterCategory(CATEGORIES["Fraternity & Sorority"].name)
          }
        >
          <i
            className="fas fa-venus-mars"
            style={{ fontSize: "11px", paddingRight: "6px" }}
          ></i>
          Frat & Sor
        </Button>
      </li>
      <li>
        <Button
          className={classes.filterDrawerBtn}
          style={{
            color:
              props.filterCategory === CATEGORIES["Team Colors"].name
                ? theme.palette.common.kitkatOrange
                : theme.palette.common.dimegray,
          }}
          onClick={() => props.setFilterCategory(CATEGORIES["Team Colors"].name)}
        >
          <Icon style={{ fontSize: "12px", paddingRight: "6px" }}>
            sports_basketball
          </Icon>
          Team Colors
        </Button>
      </li>
    </Typography>
  )
}

export default FilterDrawer
