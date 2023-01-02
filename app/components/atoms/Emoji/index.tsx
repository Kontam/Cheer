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
  const unicodeEmoji = (emojiData as EmojiDataSource).find(
    (emo) => emo.short_name === emojiName
  );

  return (
    <>
      {unicodeEmoji ? (
        <span>{String.fromCodePoint(`0x${unicodeEmoji.unified}` as any)}</span>
      ) : (
        <img src={getEmojiSrc(emoji, emojiExpression)} alt={emojiExpression} />
      )}
    </>
  );
};

export default Emoji;
