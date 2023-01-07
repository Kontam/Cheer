import { SlackEmoji } from '../../../modules/util/requests/webClient';

export function getEmojiSrc(emoji: SlackEmoji, emojiExpression: string) {
  const emojiName = emojiExpression.match(':(.*):')?.[1];
  const emojiSource = emojiName ? emoji[emojiName] : '';
  if (!emojiSource) return undefined;

  let origin: string | undefined;
  if (emojiSource.includes('alias:')) {
    const match = emojiSource.match(/alias:(.*$)/);
    origin = match && match.length > 1 ? emoji[match[1]] : undefined;
  }

  return origin || emojiSource;
}
