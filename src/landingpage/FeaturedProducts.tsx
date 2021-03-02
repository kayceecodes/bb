import React, { useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography";

import Aos from "aos";
import "aos/dist/aos.css";
import Button from "@material-ui/core/Button/Button";
import { ShopContext } from "../components/context/ShopContext";
import Link from "@material-ui/core/Link/Link";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

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
  headersUnderline: {
    borderRadius: "4px",
    padding: "5px 10px",
    // backgroundColor: '#d6c7a9',
    backgroundColor: theme.palette.common.antiqueWhite,
    marginTop: "10px",
    border: `0.5px solid ${theme.palette.common.slateBrown}30`,
  },
  thinInnerLine: {
    backgroundColor: `${theme.palette.common.slateTan}99`,
    height: "1px",
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

export default function FeaturedProducts(props: Props) {
  const { fetchAllProducts, products } = useContext<any>(ShopContext);
  const theme = useTheme()
  const featuredProducts = [products[0], products[1], products[2]];
  const classes = useStyles();
  const matches = {
    sm: useMediaQuery(theme.breakpoints.down("sm")),
    md: useMediaQuery(theme.breakpoints.down("md")),
    lg: useMediaQuery(theme.breakpoints.down("lg")),
    xl: useMediaQuery(theme.breakpoints.down("xl")),
  }; // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles

  useEffect(() => {
    fetchAllProducts();
    Aos.init({ duration: 900 });
  }, [fetchAllProducts]);

   return (
    <>
      <div className={classes.centering}>
        <Typography
          component="h2"
          variant="h2"
          data-aos="fade-left"
          id="featuredBracelets"
        >
          Featured Bracelets
        </Typography>
        <div className={classes.headersUnderline}>
          <div className={classes.thinInnerLine} />
        </div>
      </div>
      {/* Bracelet Container */}
      <Grid
        container
        direction="row"
        justify="space-around"
        className={classes.braceletsContainer}
        style={{ maxWidth: matches.sm ? "60%" : "80%" }}
      >
          {featuredProducts.map( (product: any) => !product ? 'Loading' 
          : 
              <Grid
              item
              xs={10}
              sm={3}
              style={{ position: "relative", padding: '0px 10px' }}
            >
              <Typography
                className={classes.featuredName}
                paragraph={true}
                variant="caption"
              >
                {product.title}
              </Typography>
              <Button
                className={classes.featuredPricesBtn}
                component={Link}
                href={product.handle}
                onClick={() => props.setValue(1)}
              >
                <Typography
                  className={classes.featuredPrices}
                  paragraph={true}
                  variant="caption"
                >
                  ${product.variants[0].price}
                </Typography>
                <img
                  src={product.images[0].src}
                  className={classes.braceletImgs}
                  alt="bracelet"
                />
              </Button>
            </Grid>
          )}

      </Grid>
      {/* EO Grid Container Featured Bracelets */}
    </>
  );
}
