import React from 'react';
import { SlackEmoji } from '../../../modules/util/requests/webClient';

type Props = {
  emoji: SlackEmoji;
  emojiExpression: string;
};

const Emoji: React.FC<Props> = ({ emoji, emojiExpression }) => {
  const emojiName = emojiExpression.match(':(.*):')?.[1];
  const src = emojiName ? emoji[emojiName] : '';

  return (
    <>
      <img src={src} alt={emojiExpression} />
    </>
  );
};

export default Emoji;
