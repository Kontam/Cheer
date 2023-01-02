export function removeMention(text: string) {
  return text.replace(/<@.*?>/g, '');
}

export function removeInlineCode(text: string) {
  return text.replace(/`/g, '');
}

export function removeUnusedExpression(text: string) {
  return removeInlineCode(removeMention(text));
}

export default function removeSlackExpression(text: string) {
  const unusedExpressionRemoved = removeUnusedExpression(text);
  return unusedExpressionRemoved;
}
