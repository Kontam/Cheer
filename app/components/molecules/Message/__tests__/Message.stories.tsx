import React from 'react';
import styled from 'styled-components';
import { withKnobs, text } from '@storybook/addon-knobs';
import MessageComponent from '../index';
import iconForStory from '../../../../static/image/iconForStory.png';
import { QA_ATTRIBUTES } from '../../../../modules/testUtil/testAttributes';
import { SlackEmoji } from '../../../../modules/util/requests/webClient';

export default {
  title: 'molecules/Message',
  decorators: [withKnobs],
};

const emoji: SlackEmoji = {
  test: 'https://placehold.jp/150x150.png',
};

export const VeryShortMessage = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text('Message', '１行は１１文字です。こんにちは。')}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
      exAttributes={QA_ATTRIBUTES.CONVEYOR_MESSAGE}
    />
  </Container>
);

export const ShortMessage = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text('Message', '１行は１３文字です。こんにちはみなさん。')}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
    />
  </Container>
);

export const MidiumMessage = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text(
        'Message',
        '１行は１５文字です。こんにちはみなさん。私からのメッセージが見えていますか？'
      )}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
    />
  </Container>
);

export const LongMessage = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text(
        'Message',
        '１行は１７文字です。こんにちはみなさん。私からのメッセージが見えていますか？このくらいがギリギリの文字サイズでしょう。'
      )}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
    />
  </Container>
);

export const VeryLongMessage = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text(
        'Message',
        '１行は１７文字です。こんにちはみなさん。私からのメッセージが見えていますか？このくらいがギリギリの文字サイズでしょう。限界を超えたメッセージは消去されます。'
      )}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
    />
  </Container>
);

export const emojiOnly = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text('Message', ':test:')}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
      exAttributes={QA_ATTRIBUTES.CONVEYOR_MESSAGE}
    />
  </Container>
);

export const emojiWithMessage = () => (
  <Container>
    <MessageComponent
      emoji={emoji}
      text={text('Message', '絵文字を含んだ:test:メッセージです')}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
      exAttributes={QA_ATTRIBUTES.CONVEYOR_MESSAGE}
    />
  </Container>
);

const Container = styled.div`
  padding: 100px;
`;
