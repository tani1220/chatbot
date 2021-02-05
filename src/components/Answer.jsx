import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      borderColor: "blue",
      color: "blue",
      fontWeight: 600,
      marginBotton: "8px",
    },
  })
);

export default function Answer(props) {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      className={classes.button}
      onClick={() => props.select(props.content, props.nextId)}
    >
      {props.content}
    </Button>
  );
}
