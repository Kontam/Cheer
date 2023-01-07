import assert from 'power-assert';
import removeSlackExpression, {
  removeMention,
  removeInlineCode,
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

describe('Slack表現削除関数のテスト', () => {
  test('Slackの表現が含まれたテキストが渡されたとき、Slack表現用の記号が全て取り除かれたテキストを返却する', () => {
    const body = 'こんにちは';
    const text = `${mention}\`${body}\``;
    assert.equal(removeSlackExpression(text), body);
  });
});
