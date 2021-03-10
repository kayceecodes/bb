import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import router from "next/router";
import React from "react";
import theme from "../../../src/ui/Theme";

const useStyles = makeStyles((theme) => ({
  arrow: {
    fontSize: "1.6rem",
  },
  headersUnderline: {
    padding: "0px 13px 10px",
    borderBottom: `3px solid ${theme.palette.common.antiqueWhite}`,
  },
  itemName: {
    width: "100%",
    marginTop: "8px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6px",
    },
  },
}));

export default function ProductHeader(props: {title: string}) {
  const classes = useStyles();

  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  }; // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles

  const goBackHandle = () => {
    router.push("/collections");
  };

  return (
    <Grid
      container
      spacing={matches.sm ? 8 : 3}
      justify="space-between"
    >
      <Grid item xs={1} sm={1}>
        {/*Left Side of container - the Back Arrow */}
        <Typography variant="caption">
          <Button onClick={() => goBackHandle()}>
            <Icon className={classes.arrow}>arrow_back_ios</Icon>
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={10} sm={9}>
        {/* Right Side of Cantainer - The Item's Name */}
        <Typography variant="h3" className={classes.itemName}>
          <div className={classes.headersUnderline}>
            {props.title}
          </div>
        </Typography>
      </Grid>
    </Grid>
  );
}
