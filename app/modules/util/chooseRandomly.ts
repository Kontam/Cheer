/**
 * ランダムな数値を取得する
 * @param {number} min 最小値
 * @param {number} max 最大値
 */
export function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * 配列の中からランダムに１要素を選出して返す
 * @param options 選ばれる候補となるデータの配列
 */
export function chooseRandomly<T = any>(options: T[]) {
  return options[getRandomNumber(0, options.length - 1)];
}
