import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextInput } from "./TextInput";
import SLACK_URL from "../../webhookConfig";

export default function FormDialog(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const imputName = useCallback(
    (event) => {
      setName(event.target.value); //入力された値を随時更新していく
    },
    [setName]
  );

  const imputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const imputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const emailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(email);
  };

  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  };

  const submit = () => {
    const isBlank = validateRequiredInput(name, email, description);
    const isValidEmail = emailFormat(email);

    if (isBlank) {
      alert("必須入力欄が空白です。");
      return false;
    } else if (!isValidEmail) {
      alert("メールアドレスの書式が異なります。");
      return false;
    } else {
      const payload = {
        text:
          "お問い合わせがありました\n" +
          "お名前: " +
          name +
          "\n" +
          "メールアドレス: " +
          email +
          "\n" +
          "【問い合わせ内容】\n" +
          description,
      };

      fetch(SLACK_URL.slack, {
        method: "POST",
        body: JSON.stringify(payload),
      }).then(() => {
        alert("送信が完了しました。");
        setName("");
        setEmail("");
        setDescription("");
        return props.handleClose();
      });
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問い合わせ</DialogTitle>
      <DialogContent>
        <TextInput
          label={"お名前"}
          multiline={false}
          value={name}
          rows={1}
          type={"text"}
          onChange={imputName}
        />
        <TextInput
          label={"メールアドレス"}
          multiline={false}
          value={email}
          rows={1}
          type={"email"}
          onChange={imputEmail}
        />
        <TextInput
          label={"お問い合わせ内容"}
          multiline={true}
          value={description}
          rows={5}
          type={"text"}
          onChange={imputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submit} color="primary" autoFocus>
          送信
        </Button>
      </DialogActions>
    </Dialog>
  );
}
