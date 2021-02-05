import React from "react";
import Chat from "./Chat";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Chats(props) {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.chats.map((chat, index) => {
        return (
          <Chat text={chat.text} type={chat.type} kye={index.toString()} />
        );
      })}
    </List>
  );
}
