import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Icon from "@material-ui/core/Icon/Icon";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Props {
  addItemToCheckout: (id: string, quantity: string) => void;
  onAddToCart: (values: any) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  loadCartSummary: (e: any) => void;
  product: any;
  values: any;
  variantId: string
}

const useStyles = makeStyles((theme) => ({
  addShoppingcartBtn: {
    marginTop: "5px",
    padding: "7px 12px",
    color: `${theme.palette.common.orange}99`,
  },
}));

export default function BtnAddToCart(props: Props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.addShoppingcartBtn}
      variant="outlined"
      data-testid="add-to-cart"
      disabled={
        props.values.size === 0 || props.values.quantity === 0 ? true : false
      }
      onClick={(e: any) => {
        console.log('Values In BtnAddToCart: ', props.values)
        props.onAddToCart(props.values);
        props.addItemToCheckout(
          props.variantId,
          props.values.quantity
        );
        props.loadCartSummary(e);
      }}
    >
      {props.loading ? (
        <CircularProgress size={24} />
      ) : (
        <Icon>add_shopping_cart</Icon>
      )}
    </Button>
  );
}
