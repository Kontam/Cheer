import { UserMessage } from '../util/requests/webClient';

export function createMockUserMessages(amount: number) {
  const messages: UserMessage[] = [];
  for (let i = 0; i < amount; i += 1) {
    const str = i.toString();
    messages.push({
      blocks: `blocks${str}`,
      client_msg_id: `client_msg_id${str}`,
      team: `team${str}`,
      text: `text${str}`,
      ts: `ts${str}`,
      type: `message`,
      user: `USER_${str}`,
    });
  }
  return messages;
}
