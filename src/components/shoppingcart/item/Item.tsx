import React, { useContext, useEffect, useState } from "react";
import { ICartItems } from "../../../types/interfaces";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Grid from "@material-ui/core/Grid/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon"; /*Works with a CDN fount at Material-UI.com*/
import Aos from "aos";
import { fixedTitleLength } from "../../../utils/Parse";
import { ShopContext } from "../../../context/ShopContext";
import SelectQuantity from "../../forms/SelectQuantity";

/**
 * @typedef {Object} ICartCardProps
 * @property {function} countTotalItems - Update quantity total with each
 */
interface ICartCardProps {
  countTotalItems: () => number;
  // onAddQuantityToItem: ({props, quantity}: any) => void
  addQuantityToItem?: ({ props, quantity }: any) => void;  
}

type Props = ICartCardProps & ICartItems;

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
  cartCardContainer: {
    border: "0.5px solid lightGray",
    borderRadius: "4px",
    boxShadow: "0px 0px 8px 10px #efefef99",
    height: "130px",
    position: "relative",
    width: "340px",
    margin: "10px auto 25px",
    padding: "0px 8px",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: "580px",
    },
  },
  cartItemImgContainer: {
    height: "100%",
  },
  cartItemImg: {
    width: "50px",
    [theme.breakpoints.up("lg")]: {
      width: "70px",
    },
  },
  cartItemBtn: {
    margin: "0px 2px",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.05)",
    color: `${theme.palette.common.slateTan}`,
    minWidth: "40px",
    [theme.breakpoints.up("xs")]: {
      width: "40px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "65px",
    },
  },
  currentQty: {
    color: `${theme.palette.common.dimGray}`,
    letterSpacing: "0.5px",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    lineHeight: 1.55,
    marginTop: "8px",
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.85rem",
    },
  },
  deleteCard: {
    position: "absolute",
    color: "lightGray",
    top: "3px",
    right: "4px",
    transition: "color 0.3s",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.common.dimegray,
    },
  },
}));

export default function Item(props: Props) {
  const { updateQuantity } = useContext<any>(ShopContext);
  const classes = useStyles();
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [showSelect, setShowSelect] = useState(false);

  const handleChange = (event: React.ChangeEvent<any>) => {
    setQuantity(event.target.value as number);
  };

  useEffect(() => {
    Aos.init({ duration: 900 });
      setQuantity(props.quantity);
    console.log('Quantity in "' + props.name + '" is ' + props.quantity + " .");
  }, []);

  const handleSave = (id: string | number, qty: number) => {
    updateQuantity(id, qty);
    setQuantity(qty);

    // if(qty === 0)
    // props.removeItem(props.lineItems, props.name + props.size)
    // props.setLineItems(
    //   props.lineItems.filter((val: any, index: number) => 
    //           props.index != index
    //          ))
  };

  const handleProgress = () => {
    setLoading(true);
    /*When its done loading reveal SelectQuantity*/
   
    const timedSetLoading = (ms = 500) => new Promise((resolve) => {/*Give timeSetLoading a func signature and promise*/
      setTimeout(() => {
        setLoading(false);
        resolve('Resolved, Loading Stopped');
      }, ms)
    })
    timedSetLoading().then(() => setShowSelect(!showSelect))
  };

  setTimeout(() => setMounted(true), 1000);

  return (
    <Grid
      data-aos={mounted === false ? "fade-up" : "none"}
      container
      direction="row"
      className={classes.cartCardContainer}
    >
      <Grid item xs={2} md={3}>
        <Grid
          container
          className={classes.cartItemImgContainer}
          justify="center"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <img
              className={classes.cartItemImg}
              src={props.src}
              alt="Items in card"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} md={8}>
        <Grid
          container
          direction="row"
          alignContent="center"
          alignItems="center"
          justify={"space-between"}
          style={{ height: "100%" }}
        >
          {/* Name of Item
               i.e. props.name from global state (redux) */}
          <Grid item xs={5} md={2}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Nunito",
                letterSpacing: "0.5px",
              }}
              variant="body2"
            >
              {fixedTitleLength(props.name, 15)}
              <br />
              <span
                style={{
                  color: "#afafaf",
                  fontSize: "0.68rem",
                  letterSpacing: "0.5px",
                  display: "inline",
                  marginLeft: "4px",
                }}
              >
                {"Size " + props.size}
              </span>
            </Typography>

            <Typography variant="body2">{"$" + props.price}</Typography>
          </Grid>
          <Grid item xs={3}>
            {!showSelect ? (
              <Typography variant="body2">
                Quantity <br /> {quantity}
              </Typography>
            ) : (
              <SelectQuantity quantity={quantity} handleChange={handleChange} />
            )}
          </Grid>
          <Grid item xs={3}>
            {showSelect ? (
              <Button
                onClick={() => {
                  handleProgress();
                  handleSave(props.id, Number(quantity));
                }}
              >
                <Typography variant="caption">
                  {loading? <CircularProgress size={15} thickness={2} /> : <b>Save</b>}
                </Typography>
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowSelect(!showSelect);
                }}
              >
                <Typography variant="caption">
                  <b>Edit</b>
                </Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Icon
        className={classes.deleteCard}
        onClick={() => {
          handleSave(props.id, 0);
        }}
        data-testid="remove-item-btn"
      >
        close
      </Icon>
    </Grid>
  );
}
