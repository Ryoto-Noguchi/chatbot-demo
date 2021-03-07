import React from "react";
import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import { AnswersList, Chats } from "./components/index"; // componentsフォルダにindex.jsをおいてエントリーポイントとすることで、複数ファイルをインポートする時に1行で済むためコードの可読性が高まる

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this)
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats
    chats.push({
      text:this.state.dataset[nextQuestionId].question,
      type: 'question'
    })

    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === "init"):
        this.displayNextQuestion(nextQuestionId)
        break;
      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer, // currentIdに入っている値のquestionの値を取得する
          type: "answer",
        });

        this.setState({
          chats: chats
        });

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  };



  // コンポーネントが初期化して最初のrenderが終わった後に何かしらの副作用がある処理をしたいときにcomponentDidMountを記述する
  componentDidMount() {
    const initAnswer = ""
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  render() {
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats} />
            <AnswersList answers={this.state.answers} select={this.selectAnswer}/>
          </div>
        </section>
      </div>
    );
  }
}
