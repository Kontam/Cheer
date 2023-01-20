export type DividedMessageEmoji = [string[], string[]];

export function divideMessageIntoEmoji(message: string): DividedMessageEmoji {
  const slackEmojiRegex = /:[^:]*?:/g;
  const match = message.match(slackEmojiRegex);
  if (!match?.length) return [[message], []];

  const separatedMessage = match.reduce<DividedMessageEmoji>(
    (acc, emoji, currentIndex) => {
      const currentMessage = acc[0][currentIndex];
      const before = currentMessage.slice(0, currentMessage.indexOf(emoji));
      const after = currentMessage.slice(
        currentMessage.indexOf(emoji) + emoji.length
      );
      const alreadyDivided = acc[0].slice(0, acc[0].length - 1);
      return [
        [...alreadyDivided, before, after],
        [...acc[1], emoji],
      ];
    },
    [[message], []]
  );

  return separatedMessage;
}
