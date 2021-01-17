import { MessageFromSlack, UserMessage } from './requests/webClient';
import removeSlackExpression from './removeSlackExpression';

/**
 * Slackメッセージ絞り込み関数
 * @param messages SlackのHistryAPIから取得できるメッセージの配列
 * @return ユーザーの発言に絞り込まれたメッセージの配列
 */
export default function filterSlackMessages(
  messages: MessageFromSlack[]
): UserMessage[] {
  return messages.filter(
    (message) =>
      !('bot_id' in message) &&
      !('subtype' in message) &&
      removeSlackExpression(message.text).length !== 0
  ) as UserMessage[];
}
