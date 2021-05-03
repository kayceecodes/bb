import React from "react";
import Button from "@material-ui/core/Button/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import { Parallax } from "react-parallax";
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Props {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme) => ({
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
  }

}));

export default function HeroParallax(props: Props) {
  const theme = useTheme();
  const matches = { sm: useMediaQuery(theme.breakpoints.down("sm")) };
  const classes = useStyles();
  const router = useRouter();
  enum Images {
    HeroMobile = "/assets/images/bracelets/heroImgMobile5.jpg",
    HeroParallax = "/assets/images/bracelets/bensonbracelet-hero-parallax.jpg",
  }
  return (
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
          onClick={() => {
            router.push("/collections");
            props.setPageIndex(3);
          }}
        >
          <p>Shop Collections</p>
        </Button>
      </div>
      <p className={classes.heroCompanyName}>Benson Bracelets</p>
    </Parallax>
  );
}
