export function getMessageLengthWithEmoji(message: string) {
  const slackEmojiRegex = /:[^:]*?:/g;
  const match = message.match(slackEmojiRegex);
  const messageWithoutEmoji = message.replace(slackEmojiRegex, '');

  return match
    ? messageWithoutEmoji.length + match.length
    : messageWithoutEmoji.length;
}
