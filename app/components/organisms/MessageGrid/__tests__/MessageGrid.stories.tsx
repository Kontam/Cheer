import React from 'react';
import MessageGridComponent from '../MessageGrid';
import { GridMessages, Members } from '../../../../redux/modules/types';
import { UserMessage } from '../../../../modules/util/requests/webClient';

export default {
  title: 'organisms/MessageGrid',
};

function messageCreator(amount: number) {
  const retVal: GridMessages = [];
  for (let i = 0; i < amount; i += 1) {
    retVal.push({
      color: '#66b7ec',
      cell: i,
      showing: true,
      message: {
        user: `userA`,
        text: `text${i}`,
      } as UserMessage,
    });
  }
  return retVal;
}

const gridMessages: GridMessages = messageCreator(9);

const members: Members = [
  {
    id: 'userA',
    name: 'user nameA',
    real_name: 'real_nameA',
    iconUrl:
      'https://avatars.slack-edge.com/2020-05-23/1165733145520_4dd3b24876a33b761675_192.jpg',
  },
];

const emoji = {
  test: 'https://placehold.jp/150x150.png',
};

export const Conveyor = () => (
  <MessageGridComponent
    gridMessages={gridMessages}
    members={members}
    emoji={emoji}
  />
);
