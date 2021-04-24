import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Aos from "aos";
import "aos/dist/aos.css";
import Button from "@material-ui/core/Button/Button";
import { ShopContext } from "../../components/context/ShopContext";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import router from "next/router";
import Container from "../grid/Container";
import RoundWideUnderline from "../underline/RoundWideUnderline";
import { CircularProgress } from "@material-ui/core";

interface Props {
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme) => ({
  braceletsContainer: {
    margin: "5px auto",
    paddingBottom: "50px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "140px",
      marginTop: "100px",
    },
  },
  centering: {
    margin: "0 auto",
  },
  featuredName: {
    marginTop: "50px",
    marginBottom: "-15px",
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
  braceletImgs: {
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
  },
}));

export default function FeaturedProducts(props: Props) {
  const { fetchAllProducts, products } = useContext<any>(ShopContext);
  const theme = useTheme();
  const featuredProducts = [products[0], products[1], products[2]];
  const classes = useStyles();
  const matches = {
    sm: useMediaQuery(theme.breakpoints.down("sm")),
    md: useMediaQuery(theme.breakpoints.down("md")),
    lg: useMediaQuery(theme.breakpoints.down("lg")),
    xl: useMediaQuery(theme.breakpoints.down("xl")),
  }; // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles

  useEffect(() => {
    if (products.length < 1) {
      fetchAllProducts().then(() => {});
    }
    Aos.init({ duration: 900 });
  }, [fetchAllProducts]);

  return (
    <>
      <div className={classes.centering}>
        <Typography
          component="h2"
          variant="h2"
          data-aos="fade-left"
        >
          Featured Bracelets
        </Typography>

        <RoundWideUnderline />
      </div>
      <Container
        xs={10}
        md={4}
        justify="space-around"
        width={matches.md ? "80%" : "950px"}
        margin={matches.sm ? "5px auto 150px" : "70px auto 200px"}
      >
        {featuredProducts.map((product: any, index) =>
          !product ? (
            <CircularProgress key={index} />
          ) : (
            <React.Fragment key={index}>
              <Typography
                className={classes.featuredName}
                paragraph={true}
                variant="caption"
              >
                {product.title}
                <br />
                <Button
                  className={classes.featuredPricesBtn}
                  onClick={() => {
                    props.setValue(1);
                    router.push(`/collections/${product.handle}`);
                  }}
                >
                  <div className={classes.featuredPrices}>
                    ${product.variants[0].price}
                  </div>
                  <img
                    src={product.images[0].src}
                    className={classes.braceletImgs}
                    alt="bracelet"
                  />
                </Button>
              </Typography>
            </React.Fragment>
          )
        )}
      </Container>
    </>
  );
}
