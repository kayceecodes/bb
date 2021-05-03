import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import React from "react";

interface Props {
    header: string
    aos?: string
}

const useStyles = makeStyles((theme) => ({
  m_auto: {
    margin: "0 auto",
  },
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

export default function TitleHeader(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.m_auto}>
      <Typography component="h2" variant="h2" data-aos={props.aos ? props.aos : ''}>
        {props.header}
      </Typography>

      <div className={classes.headersUnderline}>
        <div className={classes.thinInnerLine} />
      </div>
    </div>
  );
}
