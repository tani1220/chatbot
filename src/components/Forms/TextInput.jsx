import React from "react";
import TextField from "@material-ui/core/TextField";

export function TextInput(props) {
  return (
    <TextField
      fullWidth={true}
      value={props.value}
      type={props.type}
      rows={props.rows}
      multiline={props.multiline}
      margin={"dense"}
      label={props.label}
      onChange={props.onChange}
    />
  );
}
