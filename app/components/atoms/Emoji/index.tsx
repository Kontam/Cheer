import React from 'react';
import emojiData from 'emoji-datasource';
import { SlackEmoji } from '../../../modules/util/requests/webClient';

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
  const src = emojiName ? emoji[emojiName] : '';

  return (
    <>
      {unicodeEmoji ? (
        <span>{String.fromCodePoint(`0x${unicodeEmoji.unified}` as any)}</span>
      ) : (
        <img src={src} alt={emojiExpression} />
      )}
    </>
  );
};

export default Emoji;
