import { DividedMessageEmoji } from '../divideMessageIntoEmoji';
import { sliceDividedMessageEmoji } from '../sliceDividedMessageEmoji';

describe('文とemojiに分けられたmessageを一定文字数で...に省略する', () => {
  let limit: number;
  let dividedMessageEmoji: DividedMessageEmoji;
  describe('文字数上限がmessageの文字数よりも小さい時', () => {
    describe('最後の文字が文の時', () => {
      beforeEach(() => {
        limit = 10;
        dividedMessageEmoji = [['1234', '567890'], [':bow:']];
      });
      test('上限に達した時点で文が切り捨てられ、最後の文字に...が付加される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual([['1234', '56789...'], [':bow:']]);
      });
    });
    describe('絵文字の連続で超過する時', () => {
      beforeEach(() => {
        limit = 2;
        dividedMessageEmoji = [
          ['', '', '', ''],
          [':first:', ':second:', 'third'],
        ];
      });
      test('最後の絵文字が切り捨てられ、最後の文に...が付加される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual([
          ['', '', '...'],
          [':first:', ':second:'],
        ]);
      });
    });
    describe('最後の文字が絵文字の時', () => {
      beforeEach(() => {
        limit = 10;
        dividedMessageEmoji = [
          ['1234', '56789'],
          [':bow:', ':final:'],
        ];
      });
      test('最後の絵文字が切り捨てられ、最後の文に...が付加される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual([['1234', '56789...'], [':bow:']]);
      });
    });

    describe('多数の文字、絵文字を残した状態で超過する時', () => {
      beforeEach(() => {
        limit = 10;
        dividedMessageEmoji = [
          ['1234', '567890', 'aaaaa', 'bbbbb'],
          [':bow:', ':bow:', ':bow:'],
        ];
      });
      test('上限に達した時点で文が切り捨てられ、最後の文字に...が付加される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual([['1234', '56789...'], [':bow:']]);
      });
    });
  });
  describe('文字数上限がmessageの文字数よりも大きい時', () => {
    describe('文字と絵文字が交互に出現する時', () => {
      beforeEach(() => {
        limit = 100;
        dividedMessageEmoji = [
          ['1234', '56789'],
          [':bow:', ':second:'],
        ];
      });
      test('メッセージが加工されずに返される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual(dividedMessageEmoji);
      });
    });

    describe('絵文字のみが連続で出現する時', () => {
      beforeEach(() => {
        limit = 100;
        dividedMessageEmoji = [
          ['', '', ''],
          [':bow:', ':second:'],
        ];
      });
      test('メッセージが加工されずに返される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual(dividedMessageEmoji);
      });
    });
  });

  describe('文字数上限がmessageの文字数と同じ時', () => {
    describe('最後の文字が文の時', () => {
      beforeEach(() => {
        limit = 10;
        dividedMessageEmoji = [['1234', '56789'], [':bow:']];
      });
      test('メッセージが加工されずに返される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual(dividedMessageEmoji);
      });
    });
    describe('最後の文字が絵文字の時', () => {
      beforeEach(() => {
        limit = 10;
        dividedMessageEmoji = [
          ['1234', '5678'],
          [':bow:', ':final:'],
        ];
      });
      test('メッセージが加工されずに返される', () => {
        expect(
          sliceDividedMessageEmoji(dividedMessageEmoji, limit)
        ).toStrictEqual(dividedMessageEmoji);
      });
    });
  });
});
