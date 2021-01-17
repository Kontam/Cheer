import assert from 'power-assert';
import { getTokenFromURL, getBotTokenFromURL } from '../getTokenFromURL';

describe('URLスキームからの情報取得処理', () => {
  const mockToken = 'xoxb-83338121364-11123074122145-quz6s2DmYS1XddOkjXiwESrC';
  const mockBotToken =
    'xoxc-83338121364-11123074122145-quz6s2DmYjashfuie@qwE2x';
  describe('getTokenFromURL', () => {
    describe('user tokenとbot tokenの両方が入ったURLを受け取ったとき', () => {
      describe('urlを引数として渡した時', () => {
        const mockUrl = `cheer-kontam://user=${mockToken}&bot=${mockBotToken}`;

        test('user token部分だけの文字列が返却される', () => {
          assert.strictEqual(getTokenFromURL(mockUrl), mockToken);
        });
      });

      describe('末尾に/があるurlを引数として渡した時', () => {
        const mockUrl = `cheer-kontam://user=${mockToken}&bot=${mockBotToken}`;

        test('token部分だけの文字列が返却される', () => {
          assert.strictEqual(getTokenFromURL(mockUrl), mockToken);
        });
      });

      test('url以外を引数として渡した時、nullが返却される', () => {
        const input = 'wrong usage';
        assert.strictEqual(getTokenFromURL(input), null);
      });
    });
  });

  describe('getBotTokenFromURL', () => {
    describe('user tokenとbot tokenの両方が入ったURLを受け取ったとき', () => {
      describe('urlを引数として渡した時', () => {
        const mockUrl = `cheer-kontam://user=${mockToken}&bot=${mockBotToken}`;

        test('user token部分だけの文字列が返却される', () => {
          assert.strictEqual(getBotTokenFromURL(mockUrl), mockBotToken);
        });
      });

      describe('末尾に/があるurlを引数として渡した時', () => {
        const mockUrl = `cheer-kontam://user=${mockToken}&bot=${mockBotToken}`;

        test('token部分だけの文字列が返却される', () => {
          assert.strictEqual(getBotTokenFromURL(mockUrl), mockBotToken);
        });
      });

      test('url以外を引数として渡した時、nullが返却される', () => {
        const input = 'wrong usage';
        assert.strictEqual(getBotTokenFromURL(input), null);
      });
    });
  });
});
