import { getMessageLengthWithEmoji } from '../getMessageLengthWithEmoji';

describe('Slackメッセージ分から絵文字を含めた文字数を取得する', () => {
  let message: string;
  describe('絵文字が複数含まれる時', () => {
    describe('絵文字が挟まれている時', () => {
      beforeEach(() => {
        message = '１:thumbsup:２:bow:';
      });
      test('通常の文字の数+絵文字の数の数値が返却される', () => {
        expect(getMessageLengthWithEmoji(message)).toBe(4);
      });
    });
    describe('絵文字連続している時', () => {
      beforeEach(() => {
        message = '１:thumbsup::bow:';
      });
      test('通常の文字の数+絵文字の数の数値が返却される', () => {
        expect(getMessageLengthWithEmoji(message)).toBe(3);
      });
    });
  });
  describe('絵文字が１つだけ含まれる時', () => {
    describe('絵文字が挟まれている時', () => {
      beforeEach(() => {
        message = '１:thumbsup:２';
      });
      test('通常の文字の数+絵文字の数の数値が返却される', () => {
        expect(getMessageLengthWithEmoji(message)).toBe(3);
      });
    });
    describe('絵文字が先頭にある時', () => {
      beforeEach(() => {
        message = ':thumbsup:１';
      });
      test('通常の文字の数+絵文字の数の数値が返却される', () => {
        expect(getMessageLengthWithEmoji(message)).toBe(2);
      });
    });
    describe('絵文字が末尾にある時', () => {
      beforeEach(() => {
        message = '１:thumbsup:';
      });
      test('通常の文字の数+絵文字の数の数値が返却される', () => {
        expect(getMessageLengthWithEmoji(message)).toBe(2);
      });
    });
  });
  describe('絵文字が含まれない時', () => {
    describe('絵文字が挟まれている時', () => {
      beforeEach(() => {
        message = '１２';
      });
      test('通常の文字の数が返却される', () => {
        expect(getMessageLengthWithEmoji(message)).toBe(2);
      });
    });
  });
});
