import React, { ReactElement } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ICartItems } from "../../types/interfaces";

interface Props {
  values: {
    quantity: number;
    size: number;
  };
  handleChange: (prop: keyof ICartItems, event: any) => void;
  inputType: string;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 85,
    [theme.breakpoints.up("sm")]: {
      width: 100,
    },
  },
  outlined: {
    color: theme.palette.common.dimegray,
  },
}));

export default function ProductInput(props: Props) {
  const classes = useStyles();
  let inputElement: ReactElement = <Select />;
  let QuantityMenuItems = [<MenuItem key={'key0'} value={0}>0 - 10</MenuItem>];
  let SizeMenuItems = [<MenuItem key={'key0'} value={0}>Inches</MenuItem>];

  for (let i = 1; i < 12; i++) {
    QuantityMenuItems.push(<MenuItem value={i} key={'key' + i}>{i}</MenuItem>);
    SizeMenuItems.push(<MenuItem value={`${i}"`} key={'key' + i}>{i+'"'}</MenuItem>);
  }
  /* Pick what will inputElement be for, Quantities or Sizes */
  switch (props.inputType) {
    case "quantity":
      inputElement = (
        <Select
          data-testid={`${props.inputType}-select-btn`}
          value={props.values.quantity}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange(props.inputType as keyof ICartItems, event)
          }
          label="Qty"
          className={classes.outlined}
        >
          {QuantityMenuItems}
        </Select>
      );
      break;
    case "size":
      inputElement = (
        <Select
          data-testid={`${props.inputType}-select-btn`}
          value={props.values.size}
          onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
            props.handleChange("size", event)
          }
          label="Size"
          className={classes.outlined}
        >
          {SizeMenuItems}
        </Select>
      );
      break;
    default:
      <Select />;
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>
        {props.inputType === "quantity" ? "Qty" : "Size"}
      </InputLabel>
      {inputElement}
    </FormControl>
  );
}
