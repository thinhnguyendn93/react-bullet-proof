/* eslint-disable */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import htmlMinifier from 'vite-plugin-html-minifier';
// import gzipPlugin from 'rollup-plugin-gzip';
import AutoImport from 'unplugin-auto-import/vite';
import eslintPlugin from 'vite-plugin-eslint';
import stylelintPlugin from 'vite-plugin-stylelint';
import pwaPlugin from './vite/pwa';
import imageMinPlugin from './vite/image-min';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    build: {
      target: 'es2015',
      outDir: 'public',
      emptyOutDir: true,
      manifest: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          entryFileNames: 'app.[hash].js',
          chunkFileNames: 'app.[hash].chunk.js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]';
            }

            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';
            }

            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
    css: {
      postcss: path.resolve(__dirname, 'postcss.config.ts'),
    },
    assetsInclude: ['src/assets/images/**.svg'],
    mode: env.NODE_ENV,
    server: {
      host: '0.0.0.0',
      port: env.PORT || 8001,
    },
    define: {
      API_URL: JSON.stringify(env.API_URL),
      AUTH_API_URL: JSON.stringify(env.AUTH_API_URL),
      APP_URL: JSON.stringify(env.APP_URL),
      NODE_ENV: JSON.stringify(env.NODE_ENV),
      PORT: JSON.stringify(env.PORT),
      SERVICE_WORKER_PWA: JSON.stringify(env.SERVICE_WORKER_PWA),
      SOCKET_URL: JSON.stringify(env.SOCKET_URL),
    },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        directives: path.resolve(__dirname, 'src/directives'),
        containers: path.resolve(__dirname, 'src/containers'),
        config: path.resolve(__dirname, 'src/config'),
        api: path.resolve(__dirname, 'src/api'),
        store: path.resolve(__dirname, 'src/store'),
        types: path.resolve(__dirname, 'src/types'),
        styles: path.resolve(__dirname, 'src/styles'),
        pages: path.resolve(__dirname, 'src/pages'),
        i18n: path.resolve(__dirname, 'i18n'),
        utils: path.resolve(__dirname, 'src/utils'),
        assets: path.resolve(__dirname, 'assets'),
        src: path.resolve(__dirname, 'src'),
        modals: path.resolve(__dirname, 'src/modals'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        enums: path.resolve(__dirname, 'src/enums'),
        mixins: path.resolve(__dirname, 'src/mixins'),
        routers: path.resolve(__dirname, 'src/routers'),
        contexts: path.resolve(__dirname, 'src/contexts'),
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    optimizeDeps: {
      include: ['react/jsx-runtime'],
    },
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      eslintPlugin(),
      stylelintPlugin(),
      imageMinPlugin,
      pwaPlugin,
      AutoImport({
        dts: path.resolve(__dirname, 'src/types/auto-imports.d.ts'),
      }),
      // gzipPlugin({
      //   filter: /\.(js|css)$/i,
      //   fileName: '',
      // }),
      copy({
        verbose: true,
        hook: 'writeBundle',
        targets: [
          {
            src: 'assets/fonts',
            dest: 'public/assets',
          },
          {
            src: 'assets/config/*',
            dest: 'public',
          },
        ],
      }),
      htmlMinifier({
        minify: true,
      }),
    ],
  };
});
