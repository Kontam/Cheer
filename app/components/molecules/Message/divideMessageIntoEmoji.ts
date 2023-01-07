export type DividedMessageEmoji = [string[], string[]];

export function divideMessageIntoEmoji(message: string): DividedMessageEmoji {
  const slackEmojiRegex = /:[^:]*?:/g;
  const match = message.match(slackEmojiRegex);
  if (!match?.length) return [[message], []];

  const separatedMessage = match.reduce<DividedMessageEmoji>(
    (acc, emoji, currentIndex) => {
      const currentMessage = acc[0][currentIndex];
      const splitted = currentMessage.split(emoji);
      const newDividedMessages = acc[0].map((m, index) => {
        if (index !== currentIndex) return m;
        return splitted[0];
      });
      return [
        [...newDividedMessages, splitted[1]],
        [...acc[1], emoji],
      ];
    },
    [[message], []]
  );

  return separatedMessage;
}
