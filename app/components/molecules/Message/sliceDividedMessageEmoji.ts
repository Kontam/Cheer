import { DividedMessageEmoji } from './divideMessageIntoEmoji';

export function sliceDividedMessageEmoji(
  dividedMessageEmoji: DividedMessageEmoji,
  limit: number
) {
  let count = 0;
  const messages: string[] = [];
  const emoji: string[] = [];
  dividedMessageEmoji[0].forEach((message, index) => {
    if (count > limit) return;

    // メッセージが入りきらないケース
    if (count + message.length > limit) {
      messages.push(`${message.slice(0, limit - count)}...`);
      count += message.length;
      return;
    }

    // メッセージは入りきるが、その後のemojiが入りきらないケース
    if (
      count + message.length === limit &&
      dividedMessageEmoji[1].length > index
    ) {
      messages.push(`${message}...`);
      count += message.length + 1;
      return;
    }

    // メッセージもemojiも入りきるケース
    messages.push(message);
    count += message.length;
    if (dividedMessageEmoji[1].length > index) {
      emoji.push(dividedMessageEmoji[1][index]);
      count += 1;
    }
  });

  return [messages, emoji];
}
