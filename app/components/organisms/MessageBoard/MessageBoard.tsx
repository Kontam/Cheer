import React from 'react';
import MessageGrid from '../MessageGrid';
import { Mode } from '../../../redux/modules/types';
import appConst from '../../../modules/constants/appConst';
import HorizonConveyor from '../HrizonConveyor';

type Props = {
  mode: Mode;
};

const MessageBoard: React.FC<Props> = ({ mode }) => {
  return mode.screen === appConst.SCREEN_MODE_GRID ? (
    <MessageGrid />
  ) : (
    <HorizonConveyor />
  );
};

export default MessageBoard;
