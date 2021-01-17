import React from 'react';
import HorizonConveyorComponent from '../HorizonConveyor';
import {
  Members,
  SlideMessages,
  HorizonConveyor,
} from '../../../../redux/modules/types';
import { UserMessage } from '../../../../modules/util/requests/webClient';

export default {
  title: 'organisms/HorizonConveyor',
};

function messageCreator(amount: number) {
  const retVal: SlideMessages = [];
  for (let i = 0; i < amount; i += 1) {
    retVal.push({
      color: '#66b7ec',
      message: {
        user: `userA`,
        text: `text${i}`,
      } as UserMessage,
    });
  }
  return retVal;
}

const slideMessages: SlideMessages = messageCreator(3);

const members: Members = [
  {
    id: 'userA',
    name: 'user nameA',
    real_name: 'real_nameA',
    iconUrl:
      'https://avatars.slack-edge.com/2020-05-23/1165733145520_4dd3b24876a33b761675_192.jpg',
  },
];

const conveyorSetting: HorizonConveyor = {
  amount: 3,
  overflow: true,
  queueLimit: 3,
};

export const Conveyor = () => (
  <HorizonConveyorComponent
    setting={conveyorSetting}
    slideMessages={slideMessages}
    members={members}
  />
);
