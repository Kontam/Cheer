import React from 'react';
import { useSelector } from 'react-redux';
import MessageBoardComponent from './MessageBoard';

const MessageBoard: React.FC = () => {
  const mode = useSelector((state) => state.settings.mode);

  // TODO: 設定をロードしてGridだったりNicoだったりにだし分ける
  return <MessageBoardComponent mode={mode} />;
};

export default MessageBoard;
