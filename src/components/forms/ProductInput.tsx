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
  product: any,
  setVariantId: React.Dispatch<React.SetStateAction<string>>;
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

  for (let i = 1; i < 11; i++)
    QuantityMenuItems.push(<MenuItem value={i} key={'key' + i}>{i}</MenuItem>);

  // for (let i = 4; i < 10; i++)
  //   SizeMenuItems.push(<MenuItem value={`${i}"`} key={'key' + i}>{i+'"'}</MenuItem>);

  /* Build SizeMenuItems and the setVariantId once that menuitem is clicked? */
  props.product?.options[0].values.forEach((element: {value: string, type: any}, index: number) => {
      SizeMenuItems.push(<MenuItem
        value={`${element.value}"`}
        onClick={() => props.setVariantId(props.product?.variants[index].id)}
        key={element.value}>
            {`${element.value}"`}
          </MenuItem>)
  });

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
