import { getRandomColor } from '../../../../modules/util/getRandomColor';
import { removeUnusedExpression } from '../../../../modules/util/removeSlackExpression';
import { SlackEmoji } from '../../../../modules/util/requests/webClient';
import { divideMessageIntoEmoji } from '../divideMessageIntoEmoji';
import { getMessageLengthWithEmoji } from '../getMessageLengthWithEmoji';

export type MessageProps = {
  text: string;
  color?: 'random' | string;
  fadeIn?: boolean;
  name?: string;
  iconUrl?: string;
  exAttributes?: any;
  emoji: SlackEmoji;
};

export function useMessage(props: MessageProps) {
  const containerColor =
    props.color === 'random' ? getRandomColor() : props.color || 'random';
  const removedText = removeUnusedExpression(props.text);
  const messageLengthWithEmoji = getMessageLengthWithEmoji(removedText);
  const dividedMessageEmoji = divideMessageIntoEmoji(removedText);

  return {
    values: {
      containerColor,
      dividedMessageEmoji,
      messageLength: messageLengthWithEmoji,
    },
  };
}
