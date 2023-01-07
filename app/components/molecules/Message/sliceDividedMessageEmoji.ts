import { DividedMessageEmoji } from './divideMessageIntoEmoji';

export function sliceDividedMessageEmoji(
  dividedMessageEmoji: DividedMessageEmoji,
  limit: number
) {
  let count = 0;
  const messages: string[] = [];
  const emoji: string[] = [];
  dividedMessageEmoji[0].forEach((message, index) => {
    if (count >= limit) return;
    if (count + message.length > limit) {
      messages.push(`${message.slice(0, limit - count)}...`);
      return;
    }

    // 最後の1文字が絵文字のケース
    if (
      count + message.length === limit &&
      dividedMessageEmoji[1].length > index
    ) {
      messages.push(`${message}...`);
      return;
    }

    messages.push(message);
    if (dividedMessageEmoji[1].length > index) {
      emoji.push(dividedMessageEmoji[1][index]);
    }
    count += message.length + 1;
  });

  return [messages, emoji];
}
