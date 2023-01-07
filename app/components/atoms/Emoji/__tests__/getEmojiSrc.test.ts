import { getEmojiSrc } from '../getEmojiSrc';

describe('Slack APIから返されるemojiのリストから表示する絵文字のソースを取得する', () => {
  const emoji = {
    bowtie: 'https://my.slack.com/emoji/bowtie/46ec6f2bb0.png',
    squirrel: 'https://my.slack.com/emoji/squirrel/f35f40c0e0.png',
    shipit: 'alias:squirrel',
  };
  let emojiExpression: string;
  describe('Slack APIのEmojiリストに含まれる絵文字表現が渡された時', () => {
    describe('エイリアスの時', () => {
      beforeEach(() => {
        emojiExpression = ':shipit:';
      });
      test('エイリアスの参照先のemojiの画像URLが返却される', () => {
        expect(getEmojiSrc(emoji, emojiExpression)).toStrictEqual(
          emoji.squirrel
        );
      });
    });
    describe('エイリアスでは無い時', () => {
      beforeEach(() => {
        emojiExpression = ':bowtie:';
      });
      test('絵文字表現に対応するの画像URLが返却される', () => {
        expect(getEmojiSrc(emoji, emojiExpression)).toStrictEqual(emoji.bowtie);
      });
    });
  });
  describe('Slack APIのEmojiリストに含まれない絵文字表現が渡された時', () => {
    beforeEach(() => {
      emojiExpression = ':unknown:';
    });
    test('undefinedが返却される', () => {
      expect(getEmojiSrc(emoji, emojiExpression)).toStrictEqual(undefined);
    });
  });
});
