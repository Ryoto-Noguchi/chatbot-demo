import React from 'react';
import defaultDataset from "./dataset";
import './assets/styles/style.css';
import {AnswersList} from "./components/index"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
  }

  initAnswer = () => {
    const initDataset = this.state.dataset[this.state.currentId] // 初期状態ではthis.state.currentId="init"
    const initAnswers = initDataset.answers // "init"の中のanswersをinitAnswers変数に入れる
    this.setState({
      answers: initAnswers // 2行上のinitAnswersをstateのanswersに入れて更新する
    })
  }

  // コンポーネントが初期化して最初のrenderが終わった後に何かしらの副作用がある処理をしたいときにcomponentDidMountを記述する
  componentDidMount() {
    this.initAnswer() // 下の最初のrenderが走った後にinitAnswerメソッドが走ってinitAnswersのデータがセットされる
  }

  render() {
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <AnswersList answers={this.state.answers} />
          </div>

        </section>
      </div>
    );
  }
}
