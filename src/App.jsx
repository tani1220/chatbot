import React from "react";
import dataset from "./dataset.js";
import "./assets/styles/style.css";
import { AnswersList } from "./components/AnswersList";
import { Chats } from "./components/Chats";
import FormDialog from "./components/Forms/FormDialog";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "firstAnswer",
      dataset: dataset,
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: "question",
    });

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    });
  };

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "firstAnswer":
        this.displayNextQuestion(nextQuestionId);
        break;
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;
      case nextQuestionId === "contact":
        this.handleClickOpen();
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: "answer",
        });

        this.setState({
          chats: chats,
        });

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
    }
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  componentDidMount() {
    const firstAnswer = "";
    this.selectAnswer(firstAnswer, this.state.currentId);
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  render() {
    return (
      <section className="c-section">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList
            select={this.selectAnswer}
            answers={this.state.answers}
          />
          <FormDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}
