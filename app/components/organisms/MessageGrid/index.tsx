import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import MessageGridComponent from './MessageGrid';
import {
  getGridMessagesFromQue,
  initializeGridMessages,
  hideGridMessages,
} from '../../../redux/modules/app/gridMessages';
import { requestSlackMessages } from '../../../redux/modules/sagas/requestSlackMessagesSagas';

/**
 * キューからメッセージを一定間隔ごとに抽出して特定のセルと紐付けるスレッドを作成する
 * @param cellNum 紐づけるセル番号
 * @param dispatch store.dispatch()
 */
function setEnqueInterval(cellNum: number, dispatch: Dispatch) {
  return setInterval(() => {
    dispatch(getGridMessagesFromQue(cellNum));
    setTimeout(() => {
      dispatch(hideGridMessages([cellNum]));
    }, 4100);
  }, 5100);
}

const MessageGrid: React.FC = () => {
  const dispatch = useDispatch();
  const gridSetting = useSelector((state) => state.settings.screen.grid);
  const gridMessages = useSelector((state) => state.app.grid.gridMessages);
  const members = useSelector((state) => state.app.members);
  const requestRef = useRef<number>();
  const intervalsRef = useRef<number[]>();
  useEffect(() => {
    dispatch(initializeGridMessages(gridSetting.activeCell));
    requestRef.current = setInterval(() => {
      dispatch(requestSlackMessages());
    }, 2000);
    // 一定間隔ごとに表示メッセージをキューから取り出す
    intervalsRef.current = [];
    gridSetting.activeCell.map((cellNum, index) => {
      return setTimeout(() => {
        intervalsRef.current!.push(setEnqueInterval(cellNum, dispatch));
      }, index * 1300);
    });
    return () => {
      clearInterval(requestRef.current);
      intervalsRef.current!.forEach((id) => clearInterval(id));
    };
  }, [gridSetting, dispatch]);

  return <MessageGridComponent gridMessages={gridMessages} members={members} />;
};

export default MessageGrid;
