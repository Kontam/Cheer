import { replaceSlackExpression } from '../replaceSlackExpression';

describe('&gt;を<に置き換えるようなSlack表現置換を行う関数', () => {
  describe('置き換え表現を１つ含む時', () => {
    test.each([
      ['&lt;', '<'],
      ['&gt;', '>'],
      ['&amp;', '&'],
    ])('%sが%sに置換される', (before, after) => {
      expect(replaceSlackExpression(`${before}メッセージ`)).toStrictEqual(
        `${after}メッセージ`
      );
    });
  });
  describe('置き換え表現を複数含む時', () => {
    test('全ての置き換え対象表現が痴漢される', () => {
      expect(replaceSlackExpression('&lt;A&amp;B&gt;')).toStrictEqual('<A&B>');
    });
  });
});
