export function removeMention(text: string) {
  return text.replace(/<@.*?>/g, '');
}

export function removeInlineCode(text: string) {
  return text.replace(/`/g, '');
}

export function removeEmojiCode(text: string) {
  return text.replace(/:\S*?:/g, '');
}

export default function removeSlackExpression(text: string) {
  return removeEmojiCode(removeInlineCode(removeMention(text)));
}
