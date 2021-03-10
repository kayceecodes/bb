import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  headersUnderline: {
    borderRadius: "4px",
    padding: "5px 10px",
    backgroundColor: theme.palette.common.antiqueWhite,
    marginTop: "10px",
    border: `0.5px solid ${theme.palette.common.slateBrown}30`,
  },
  thinInnerLine: {
    backgroundColor: `${theme.palette.common.slateTan}99`,
    height: "1px",
  },
}));

/**
 * Returns a wide underline for headers
 * @export
 * @returns 
 */
export default function RoundWideUnderline() {
  const classes = useStyles();

  return (
    <div className={classes.headersUnderline}>
      <div className={classes.thinInnerLine} />
    </div>
  );
}
