import React from 'react';
import emojiData from 'emoji-datasource';
import { SlackEmoji } from '../../../modules/util/requests/webClient';
import { getEmojiSrc } from './getEmojiSrc';

type Props = {
  emoji: SlackEmoji;
  emojiExpression: string;
};

type EmojiDataSource = typeof emojiData;

const Emoji: React.FC<Props> = ({ emoji, emojiExpression }) => {
  const emojiName = emojiExpression.match(':(.*):')?.[1];
  const unicodeEmoji: EmojiDataSource[number] | undefined = (
    emojiData as EmojiDataSource
  ).find((emo) => emo.short_name === emojiName);
  const byteSplitted = unicodeEmoji?.unified.split('-') || [];
  const unicode =
    byteSplitted.length > 0
      ? String.fromCodePoint(
          ...(byteSplitted.map((byte) => {
            return `0x${byte}`;
          }) as any[])
        )
      : '';

  return (
    <>
      {unicode ? (
        <span>{unicode}</span>
      ) : (
        <img src={getEmojiSrc(emoji, emojiExpression)} alt={emojiExpression} />
      )}
    </>
  );
};

export default Emoji;
