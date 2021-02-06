import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextInput } from "./TextInput";

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: "",
    };
    this.imputName = this.imputName.bind(this);
    this.imputEmail = this.imputEmail.bind(this);
    this.imputDescription = this.imputDescription.bind(this);
  }

  imputName = (event) => {
    //onchangeに作用
    this.setState({
      name: event.target.value, //入力された値を随時更新していく
    });
  };

  imputEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  imputDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  submit = () => {
    const name = this.state.name;
    const email = this.state.email;
    const description = this.state.description;

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

    const url =
      "https://hooks.slack.com/services/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";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then(() => {
      alert("送信が完了しました。");
      this.setState({
        name: "",
        email: "",
        description: "",
      });
      return this.props.handleClose();
    });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">お問い合わせ</DialogTitle>
        <DialogContent>
          <TextInput
            label={"お名前"}
            multiline={false}
            value={this.state.name}
            rows={1}
            type={"text"}
            onChange={this.imputName}
          />
          <TextInput
            label={"メールアドレス"}
            multiline={false}
            value={this.state.email}
            rows={1}
            type={"email"}
            onChange={this.imputEmail}
          />
          <TextInput
            label={"お問い合わせ内容"}
            multiline={true}
            value={this.state.description}
            rows={5}
            type={"text"}
            onChange={this.imputDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            キャンセル
          </Button>
          <Button onClick={this.submit} color="primary" autoFocus>
            送信
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
