const img = new Image();

export function preloadImage(src: string) {
  img.src = src;
  return new Promise((resolve) => {
    img.onload = () => {
      resolve(true);
    };
  });
}
