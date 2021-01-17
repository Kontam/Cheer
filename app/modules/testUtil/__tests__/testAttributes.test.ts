import assert from 'power-assert';
import { createQAAttributeSelector } from '../testAttributes';

describe('createQAAttribute', () => {
  test('[属性名=値]', () => {
    const selector = createQAAttributeSelector('LOGIN');
    assert.strictEqual(selector, '[data-qa=Login]');
  });
});
