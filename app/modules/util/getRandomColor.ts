import { chooseRandomly } from './chooseRandomly';

export const colorPattern = [
  '#B9CEF3',
  '#FFC1CF',
  '#87D4FA',
  '#FACC7F',
  '#F0DDB0',
  '#9DDEDF',
  '#C3ECC2',
  '#BAE8F8',
  '#E4CEFA',
];

export function getRandomColor() {
  return chooseRandomly<string>(colorPattern);
}

export function* generateColor() {
  let counter = 0;
  while (true) {
    yield colorPattern[counter % colorPattern.length];
    counter += 1;
  }
}

let gen: null | Generator = null;

export function getColorRotatoly() {
  if (!gen) {
    gen = generateColor();
  }
  return gen.next().value;
}
