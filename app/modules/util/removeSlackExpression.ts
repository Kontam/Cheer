export function removeMention(text: string) {
  return text.replace(/<@.*?>/g, '');
}

export function removeInlineCode(text: string) {
  return text.replace(/`/g, '');
}

// '<img width="5" height="5" src="https://emoji.slack-edge.com/TS8NZP5AQ/squirrel/465f40c0e0.png" />'
export function removeEmojiCode(text: string) {
  return text.replace(/:\S*?:/g, '');
}

export function removeUnusedExpression(text: string) {
  return removeInlineCode(removeMention(text));
}

export default function removeSlackExpression(text: string) {
  const unusedExpressionRemoved = removeUnusedExpression(text);
  return unusedExpressionRemoved;
}
