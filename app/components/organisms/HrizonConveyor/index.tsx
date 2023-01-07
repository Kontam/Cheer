import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HorizonConveyorComponent from './HorizonConveyor';
import { getSlideMessagesFromQue } from '../../../redux/modules/app/slideMessages';
import { requestSlackMessages } from '../../../redux/modules/sagas/requestSlackMessagesSagas';

const HorizonConveyor: React.FC = () => {
  const slideMessages = useSelector(
    (state) => state.app.horizonConveyor.slideMessages
  );
  const settingHorizonConveyor = useSelector(
    (state) => state.settings.screen.horizonConveyor
  );
  const members = useSelector((state) => state.app.members);
  const emoji = useSelector((state) => state.api.slackEmojiList.emoji);
  const dispatch = useDispatch();

  useEffect(() => {
    // 一定間隔ごとにslackからのメッセージ取得
    const requestIntervalId = setInterval(() => {
      dispatch(requestSlackMessages());
    }, 2000);
    // 一定間隔ごとにコンベヤにアイテムを流す
    const slideIntervalId = setInterval(() => {
      dispatch(getSlideMessagesFromQue(1));
    }, 2000);
    return () => {
      clearInterval(requestIntervalId);
      clearInterval(slideIntervalId);
    };
  }, [dispatch]);
  return (
    <HorizonConveyorComponent
      slideMessages={slideMessages}
      setting={settingHorizonConveyor}
      members={members}
      emoji={emoji}
    />
  );
};

export default HorizonConveyor;
