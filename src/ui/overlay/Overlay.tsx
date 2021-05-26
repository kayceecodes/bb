import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(() => ({
  overlay: {
    position: 'absolute',
    zIndex: 1,
    opacity: 0.75,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export default function Overlay(props: { color: string }) {
  const classes = useStyles();

  return (
    <div style={{ backgroundColor: props.color }} className={classes.overlay} />
  );
}
