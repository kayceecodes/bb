import Grid, {
  GridContentAlignment,
  GridDirection,
  GridSpacing,
  GridWrap,
  GridJustification,
  GridItemsAlignment,
} from "@material-ui/core/Grid/Grid";
import { GridSize } from "@material-ui/core/Grid/Grid";

import React, { HtmlHTMLAttributes, ReactNode } from "react";

interface Container {
  alignContent: GridContentAlignment;
  alignItems: GridItemsAlignment;
  //   container: boolean;
  direction: GridDirection;
  //   item: boolean;
  justify: GridJustification;
  spacing: GridSpacing;
  wrap: GridWrap;
  zeroMinWidth: boolean;
  children: ReactNode[];
  matches: number[]
}

interface Item {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

interface Styles {
  width: string | number;
  margin: string;
}

type Props = Item & Container & HtmlHTMLAttributes<any> & Styles;

export default function Container(props: Partial<Props>) {
  return (
    <Grid
      container
      alignContent={props.alignContent as GridContentAlignment}
      alignItems={props.alignItems as GridItemsAlignment}
      direction={props.direction as GridDirection}
      justify={props.justify as GridJustification}
      spacing={props.spacing as GridSpacing}
      wrap={props.wrap as GridWrap}
      style={{ width: props.width, margin: props.margin }}
    >
      {props.children?.map((child, index) => (
        <Grid
          key={index}
          item
          xs={props.xs as GridSize}
          sm={props.sm as GridSize}
          md={props.md as GridSize}
          lg={props.lg as GridSize}
          zeroMinWidth={props.zeroMinWidth ?? false}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
}
