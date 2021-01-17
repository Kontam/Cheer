import assert from 'power-assert';
import { getColorRotatoly, colorPattern } from '../getRandomColor';

describe('カラー巡回生成関数のテスト', () => {
  test('１回目の呼び出しでカラー配列の先頭の値が返される', () => {
    const color = getColorRotatoly();
    assert.strictEqual(color, colorPattern[0]);
  });

  test('２回目の呼び出してカラー配列の２番目の値が返される', () => {
    const color = getColorRotatoly();
    assert.strictEqual(color, colorPattern[1]);
  });

  test('カラー配列の長さ分の実行後、次の実行でカラー配列先頭の値が返される', () => {
    // 直前のテストで実行している回数分、実行回数を減らす
    for (let i = 0; i < colorPattern.length - 2; i += 1) {
      getColorRotatoly();
    }
    const color = getColorRotatoly();
    assert.strictEqual(color, colorPattern[0]);
  });
});
