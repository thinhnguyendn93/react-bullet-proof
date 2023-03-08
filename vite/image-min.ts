import viteImagemin from 'vite-plugin-imagemin';

export default viteImagemin({
  gifsicle: {
    optimizationLevel: 7,
    interlaced: true,
  },
  optipng: {
    optimizationLevel: 7,
  },
  mozjpeg: {
    quality: 80,
  },
  pngquant: {
    quality: [0.8, 0.9],
    speed: 4,
  },
  svgo: {
    plugins: [
      {
        name: 'removeViewBox',
      },
      {
        name: 'removeEmptyAttrs',
        active: false,
      },
    ],
  },
});
