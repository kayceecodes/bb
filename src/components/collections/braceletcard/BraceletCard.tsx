import React from "react";

import Link from "../../../Link";
import { IBraceletData } from "../../../types/interfaces";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import UseImgFile from "../../../ui/useImgFile/UseImgFile";
import { convertNameToHandle } from "../../../utils/Parse";

interface IProps {
  name: IBraceletData["name"];
  price: IBraceletData["price"] | string;
  src: IBraceletData["src"];
  category: IBraceletData["category"];
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme) => ({
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "35px",
    },
  },
  root: {},
  braceletCard: {
    width: "100%",
    position: "relative",
  },
  braceletImg: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginTop: "10px",
    },
  },
  priceWrapper: {
    padding: "2px 5px",
    backgroundColor: "#fff5",
    position: "absolute",
    top: "45%",
    left: "32%",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
      left: "36%",
    },
  },
}));

export default function BraceletCard(props: IProps) {
  const classes = useStyles();

  const handle = convertNameToHandle(props.name);
  // itemRouter = convertToRoute(props.name)

  return (
    <Button
      component={Link}
      as={`/collections/${handle}`}
      href={`/collections/${handle}`}
      onClick={() => {props.setValue(1)}}
      data-testid="bracelet-card"
    >
      <div className={classes.braceletCard}>
        <Typography variant="caption">
          {props.name} {UseImgFile(props.category)}
        </Typography>

        <img
          src={props.src}
          alt="Bracelet - Product"
          className={classes.braceletImg}
        />
        <div className={classes.priceWrapper}>
          <Typography variant="caption">${props.price}</Typography>
        </div>
      </div>
    </Button>
  );
}
