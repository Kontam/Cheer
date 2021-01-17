import assert from 'power-assert';
import removeSlackExpression, {
  removeMention,
  removeInlineCode,
  removeEmojiCode,
} from '../removeSlackExpression';

const mention = '<@ABCDE3F3F>';
const mention2 = '<@ABCDE3F3F>';
const mention3 = '<@ABCDE3F3F>';

describe('メンション削除関数のテスト', () => {
  test('メンションが含まれたテキストが渡されたとき、メンション部分を取り除いたテキストを返却する', () => {
    const body = 'こんにちは';
    const text = `${mention}${body}`;
    assert.equal(removeMention(text), body);
  });

  test('メンションが複数含まれたテキストが渡されたとき、メンションを全て取り除いたテキストを返却する', () => {
    const body = `こんにちは`;
    const text = `${mention}${mention2}${mention3}${body}`;
    assert.equal(removeMention(text), body);
  });
});

describe('コードブロック削除関数のテスト', () => {
  test('コードブロックが含まれたテキストが渡されたとき、コードブロック記号を取り除いたテキストを返却する', () => {
    const body = 'こんにちは';
    const text = `\`${body}\``;
    assert.equal(removeInlineCode(text), body);
  });

  test('コードブロックが複数含まれたテキストが渡されたとき、コードブロック記号を全て取り除いたテキストを返却する', () => {
    const body = `こんにちは`;
    const text = `\`${body}\`\`${body}\``;
    assert.equal(removeInlineCode(text), body + body);
  });
});

describe('絵文字が含まれたテキストが渡された時、絵文字を消去する', () => {
  test('絵文字が１つ含まれたテキストが渡された時、絵文字コードを消去した文字列を返す', () => {
    const body = `こんにちは`;
    const text = `${body}:sunny:`;
    assert.equal(removeEmojiCode(text), body);
  });

  test('絵文字が２つ含まれたテキストが渡された時、全ての絵文字を消去した文字列を返す', () => {
    const body = `こんにちは`;
    const text = `${body}:sunny::no_good:`;
    assert.equal(removeEmojiCode(text), body);
  });

  test('::の間にスペースが入っている文字列は絵文字ではないので消去しない', () => {
    const body = `こんにちは`;
    const text = `${body}:sunny day:`;
    assert.equal(removeEmojiCode(text), text);
  });

  test('::の間に改行が入っている文字列は絵文字ではないので消去しない', () => {
    const body = `こんにちは`;
    const text = `${body}:sunny\nday:`;
    assert.equal(removeEmojiCode(text), text);
  });
});

describe('Slack表現削除関数のテスト', () => {
  test('Slackの表現が含まれたテキストが渡されたとき、Slack表現用の記号が全て取り除かれたテキストを返却する', () => {
    const body = 'こんにちは';
    const text = `${mention}\`${body}\``;
    assert.equal(removeSlackExpression(text), body);
  });
});
