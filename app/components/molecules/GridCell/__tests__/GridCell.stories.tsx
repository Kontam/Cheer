import React from 'react';
import GridCellComponent from '../index';
import { Member } from '../../../../redux/modules/types';
import { UserMessage } from '../../../../modules/util/requests/webClient';

export default {
  title: 'molecules/GridCell',
};

const gridMessage = {
  cell: 0,
  showing: true,
  color: '#66b7ec',
  message: {
    user: `userA`,
    text: `text0`,
  } as UserMessage,
};

const member: Member = {
  id: 'userA',
  name: 'user nameA',
  real_name: 'real_nameA',
  iconUrl:
    'https://avatars.slack-edge.com/2020-05-23/1165733145520_4dd3b24876a33b761675_192.jpg',
};

export const Conveyor = () => (
  <GridCellComponent
    gridMessage={gridMessage}
    member={member}
    positionX="left"
    positionY="top"
  />
);
