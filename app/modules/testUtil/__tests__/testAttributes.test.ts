import assert from 'power-assert';
import {
  createQAAttributeSelector,
  getQASelectorByPosition,
} from '../testAttributes';

describe('createQAAttribute', () => {
  test('[属性名=値]のセレクタが取得できる', () => {
    const selector = createQAAttributeSelector('LOGIN');
    assert.strictEqual(selector, '[data-qa=Login]');
  });
});

describe('getQAAttributeByPosition', () => {
  test('[属性名=値]のセレクタが取得できる', () => {
    const selector = getQASelectorByPosition('left', 'top');
    assert.strictEqual(selector, '[data-qa=GridMessageTopLeft]');
  });
});
