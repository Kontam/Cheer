import { getRandomColor } from '../../../../modules/util/getRandomColor';
import { removeUnusedExpression } from '../../../../modules/util/removeSlackExpression';
import { getMessageLengthWithEmoji } from '../getMessageLengthWithEmoji';

export type MessageProps = {
  text: string;
  color?: 'random' | string;
  fadeIn?: boolean;
  name?: string;
  iconUrl?: string;
  exAttributes?: any;
};

export function useMessage(props: MessageProps) {
  const containerColor =
    props.color === 'random' ? getRandomColor() : props.color || 'random';
  const removedText = removeUnusedExpression(props.text);
  const messageLengthWithEmoji = getMessageLengthWithEmoji(removedText);
  const formattedText = removedText;

  return {
    values: {
      containerColor,
      displayMessage: formattedText,
      messageLength: messageLengthWithEmoji,
    },
  };
}
