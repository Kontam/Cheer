import React from 'react';
import styled from 'styled-components';
import { withKnobs, text } from '@storybook/addon-knobs';
import MessageComponent from '../index';
import iconForStory from '../../../../static/image/iconForStory.png';

export default {
  title: 'molecules/Message',
  decorators: [withKnobs],
};

export const VeryShortMessage = () => (
  <Container>
    <MessageComponent
      text={text('Message', '１行は１１文字です。こんにちは。')}
      iconUrl={text('src', iconForStory)}
      name={text('name', 'Nekoyama Cat')}
      color={text('color', '#B9CEF3')}
    />
  </Container>
);

export const ShortMessage = () => (
  <Container>
    <MessageComponent
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

const Container = styled.div`
  padding: 100px;
`;
