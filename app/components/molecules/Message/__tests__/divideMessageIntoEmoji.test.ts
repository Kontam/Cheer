import assert from 'power-assert';
import { divideMessageIntoEmoji } from '../divideMessageIntoEmoji';

describe('SlackのメッセージからEmoji表現を抽出し、登場ごとにメッセージを分割する。', () => {
  let message: string;
  describe('メッセージ内にEmoji表現が存在しない時', () => {
    beforeEach(() => {
      message = 'Emojiを持たないメッセージ';
    });
    test('メッセージをそのまま返し、Emojiリストは空を返す', () => {
      assert.deepStrictEqual(divideMessageIntoEmoji(message), [[message], []]);
    });
  });
  describe('メッセージ内にEmoji表現1つ存在する時', () => {
    describe('文中にEmoji表現が存在する時', () => {
      beforeEach(() => {
        message = 'Emojiを含んだ:emoji:メッセージ';
      });
      test('Emoji前、Emoji後に分割したメッセージリストと、文中のEmojiが入ったリストを返す', () => {
        assert.deepStrictEqual(divideMessageIntoEmoji(message), [
          ['Emojiを含んだ', 'メッセージ'],
          [':emoji:'],
        ]);
      });
    });
    describe('文頭にEmoji表現が存在する時', () => {
      beforeEach(() => {
        message = ':emoji:先頭にEmojiを含んだメッセージ';
      });
      test('Emoji前として空文字列、Emoji後に分割したメッセージリストと、文中のEmojiが入ったリストを返す', () => {
        assert.deepStrictEqual(divideMessageIntoEmoji(message), [
          ['', '先頭にEmojiを含んだメッセージ'],
          [':emoji:'],
        ]);
      });
    });
  });
  describe('メッセージ内にEmoji表現2つ存在する時', () => {
    describe('文と絵文字が交互に出現する時', () => {
      beforeEach(() => {
        message = 'Emojiを:first:複数:second:含んだメッセージ';
      });
      test('Emoji登場ごとに分割したメッセージリストと、文中のEmojiが入ったリストを返す', () => {
        assert.deepStrictEqual(divideMessageIntoEmoji(message), [
          ['Emojiを', '複数', '含んだメッセージ'],
          [':first:', ':second:'],
        ]);
      });
    });
    describe('Emojiのみが連続で出現する時', () => {
      beforeEach(() => {
        message = ':bow::bow:';
      });
      test('Emoji登場ごとに分割したメッセージリストと、文中のEmojiが入ったリストを返す', () => {
        assert.deepStrictEqual(divideMessageIntoEmoji(message), [
          ['', '', ''],
          [':bow:', ':bow:'],
        ]);
      });
    });

    describe('Emojiが連続で出現する時', () => {
      beforeEach(() => {
        message = 'Emojiを:first::second:連続で含んだメッセージ';
      });
      test('Emoji登場ごとに分割したメッセージリストと、文中のEmojiが入ったリストを返す', () => {
        assert.deepStrictEqual(divideMessageIntoEmoji(message), [
          ['Emojiを', '', '連続で含んだメッセージ'],
          [':first:', ':second:'],
        ]);
      });
    });
  });
});
