import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import {Chat} from "./index";

const useStyles = makeStyles({
  chats: {
    height: 400,
    padding: '0',
    overflow: 'auto' // スクロールできるようにする
  }
})

const Chats = (props) => {
  const classes = useStyles();
  return (
  <List className={classes.chats}>
    {props.chats.map((chat, index) => {
      return <Chat text={chat.text} type={chat.type} key={index.toString()}/> // リスト要素の中にkeyを入れておくことで変更があったときに、変更部分のみ書き換えるという設計思想からkeyをリストに含めている
    })}
  </List>
  );
};

export default Chats;
