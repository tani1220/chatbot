import React, { useState, useEffect, useCallback } from "react";
import "./assets/styles/style.css";
import defaultDataset from "./dataset";
import { AnswersList } from "./components/AnswersList";
import { Chats } from "./components/Chats";
import FormDialog from "./components/Forms/FormDialog";

export default function App() {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("firstAnswer");
  const [dataset] = useState(defaultDataset);
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId) => {
    addChats({
      text: dataset[nextQuestionId].question,
      type: "question",
    });

    setAnswers(dataset[nextQuestionId].answers);

    setCurrentId(nextQuestionId);
  };

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case nextQuestionId === "firstAnswer":
        displayNextQuestion(nextQuestionId);
        break;
      case /^https:*/.test(nextQuestionId):
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;
      case nextQuestionId === "contact":
        handleClickOpen();
        break;
      default:
        addChats({
          text: selectedAnswer,
          type: "answer",
        });

        setTimeout(() => displayNextQuestion(nextQuestionId), 500);
        break;
    }
  };

  const addChats = (chat) => {
    setChats((prevChats) => {
      //setStateは前回の配列やオブジェを引数で受け取れる
      return [...prevChats, chat];
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    const firstAnswer = "";
    selectAnswer(firstAnswer, currentId);
  }, []);

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if (scrollArea) {
      scrollArea.scrollTo({
        top: scrollArea.scrollHeight,
        behavior: "smooth",
      });
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList select={selectAnswer} answers={answers} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}
