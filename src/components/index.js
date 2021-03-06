
// エントリーポイントを作る
// エントリーポイントというのは、componetsフォルダに複数のファイルがあったとしても、このindex.jsを参照すれば、 exportされたそれぞれのコンポーネントをここからimportできる状態にするもの

// AnswersListの中でexport defaultされているものを改めて、「AnswersList」という名前で再度exportしているみたいなイメージ。こうすることによって、「import {AnswersList} from "./components/index"」のように書くことができる
export {default as AnswersList} from './AnswersList'
export {default as Answer} from './Answer'
