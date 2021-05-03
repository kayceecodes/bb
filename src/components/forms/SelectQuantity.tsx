import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ShopContext } from '../context/ShopContext'

interface Props {
    quantity: number,
    handleChange: (event: React.ChangeEvent<any>) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 75,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    select: {
        fontSize: '0.8rem',
        height: 50
    }
  }),
);

/* Update Quantity in the shoppingcart, before you checkou */
export default function SelectQuantity(props: Props) {
  const classes = useStyles();

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel style={{fontSize: '.8rem'}} htmlFor="outlined-quantity-native-simple">Qty</InputLabel>
        <Select
          native
          className={classes.select}
          value={props.quantity as number}
          onChange={props.handleChange}
          label="Quantity"
          inputProps={{
            name: 'quantity',
            id: 'outlined-quantity-native-simple',
          }}
        >
          <option aria-label="None" value={0 as number}>0</option>
          <option value={1 as number}>1</option>
          <option value={2 as number}>2</option>
          <option value={3 as number}>3</option>
          <option value={4 as number}>4</option>
          <option value={5 as number}>5</option>
          <option value={6 as number}>6</option>
        </Select>
      </FormControl>
    </div>
  );
}