import React, {useState, useEffect, useCallback} from "react";
// import defaultDataset from "./dataset";
import "./assets/styles/style.css";
import {AnswersList, Chats, FormDialog} from "./components/index"; // componentsフォルダにindex.jsをおいてエントリーポイントとすることで、複数ファイルをインポートする時に1行で済むためコードの可読性が高まる
import {db} from "./firebase/index";

const App = () => {
    const [answers, setAnswers] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentId, setCurrentId] = useState("init");
    const [dataset, setDataset] = useState({});
    const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats ({
      text:nextDataset.question,
      type: 'question'
    });

  setAnswers(nextDataset.answers);
  setCurrentId(nextQuestionId);
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'contact'):
        handleClickOpen();
        break;

      case(/^https:*/.test(nextQuestionId)): // 「//」の中でjsの正規表現の世界を表し、チェックしたいキーワードを入れて、それに「.test()」を使用して、nextQuestionIdにそのキーワードが含まれているかをチェックする
        const a = document.createElement('a'); // DOM要素(aタグを作成する)
        a.href = nextQuestionId; // aタグのhrefに選択された回答に設定されたURLのリンクを挿入する
        a.target = '_blank'; // 別タブで開くようにする
        a.click(); // クリックで別タブが開くようにする
        break;
      default:
        addChats({
          text: selectedAnswer, // currentIdに入っている値のquestionの値を取得する
          type: "answer",
        })

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500); // ユーザーが質問してから少し待ってから回答を表示する際にsetTimeout()を使用する
        break;
    }
  };

  const addChats = (chat) => { // 前回のチャットの内容を引数にとり、そこに今回のチャットを追加する
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  // コンポーネントが初期化して最初のrenderが終わった後に何かしらの副作用がある処理をしたいときにcomponentDidMountを記述する
  useEffect(() => {
    (async() => {
      const initDataset = {};
      await db.collection("questions").get().then(snapshots => { // get()でfirestoreのデータベースのdocument全てを取得し、snapshotsという変数に格納する
          snapshots.forEach(doc => {
            const id = doc.id
            const data = doc.data()
            initDataset[id] = data
          })
      })

      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  },[])

  useEffect(() =>  {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight; // チャットを追加することで増加するチャット領域のHightの値をscrollAreaに代入することで、新しくチャットが追加された時に自動的に最新のチャットが表示されるようにする
    }
  })

  return (
    <div>
      <section className="c-section">
        <div className="c-box">
          <Chats chats={chats} />
          <AnswersList answers={answers} select={selectAnswer}/>
          <FormDialog open={open} handleClose={handleClose}/>
        </div>
      </section>
    </div>
  );
}

export default App
