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
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case(/^https:*/.test(nextQuestionId)): // 「//」の中でjsの正規表現の世界を表し、チェックしたいキーワードを入れて、それに「.test()」を使用して、nextQuestionIdにそのキーワードが含まれているかをチェックする
        const a = document.createElement('a'); // DOM要素(aタグを作成する)
        a.href = nextQuestionId; // aタグのhrefに選択された回答に設定されたURLのリンクを挿入する
        a.target = '_blank'; // 別タブで開くようにする
        a.click(); // クリックで別タブが開くようにする
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

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500); // ユーザーが質問してから少し待ってから回答を表示する際にsetTimeout()を使用する
        break;
    }
  };



  // コンポーネントが初期化して最初のrenderが終わった後に何かしらの副作用がある処理をしたいときにcomponentDidMountを記述する
  componentDidMount() {
    const initAnswer = ""
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight; // チャットを追加することで増加するチャット領域のHightの値をscrollAreaに代入することで、新しくチャットが追加された時に自動的に最新のチャットが表示されるようにする
    }
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
