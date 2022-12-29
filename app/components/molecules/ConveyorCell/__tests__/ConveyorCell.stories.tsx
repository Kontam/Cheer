import React from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';
import ConveyorCellComponent from '../index';
import { Member } from '../../../../redux/modules/types';
import {
  SlackEmoji,
  UserMessage,
} from '../../../../modules/util/requests/webClient';

export default {
  title: 'molecules/ConveyorCell',
  decorators: [withKnobs],
};

const slideMessage = {
  color: '#66b7ec',
  message: {
    user: `userA`,
    text: `text`,
  } as UserMessage,
};

const member: Member = {
  id: 'userA',
  name: 'user nameA',
  real_name: 'real_nameA',
  iconUrl:
    'https://avatars.slack-edge.com/2020-05-23/1165733145520_4dd3b24876a33b761675_192.jpg',
};

const emoji: SlackEmoji = {
  test: 'https://placehold.jp/150x150.png',
};

export const Conveyor = () => (
  <ConveyorCellComponent
    slideMessage={slideMessage}
    emoji={emoji}
    member={member}
    direction="left"
    length={number('length', 2)}
  />
);
