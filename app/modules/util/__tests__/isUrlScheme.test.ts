import assert from 'power-assert';
import { isUrlScheme } from '../isUrlScheme';

describe('urlからtokenを抽出する関数のテスト', () => {
  test('本アプリの起動用urlSchemeが渡されたときはtrueを返す', () => {
    const mockToken =
      'xoxb-83338121364-11123074122145-quz6s2DmYS1XddOkjXiwESrC';
    const mockUrl = `cheer-kontam://${mockToken}/`;
    assert.ok(isUrlScheme(mockUrl));
  });

  test('本アプリの起動用urlSchemeでは無い文字列が渡されたときはfalseを返す', () => {
    const input = 'wrong str';
    assert.ok(!isUrlScheme(input));
  });
});
