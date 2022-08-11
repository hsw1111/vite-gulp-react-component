import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import svgr from 'vite-plugin-svgr'
const path = require("path");

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    vitePluginImp({
      //  按需加载
      libList: [
        {
          libName: 'antd',
          style: name => `antd/es/${name}/style`,
        },
        {
          libName: 'my-components',
          style: name => `my-components/es/${name}/style`,
          camel2DashComponentName: false
        },
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    }
  },
  //  vite库模式
  build: {
    lib: {
      entry: resolvePath("packages/index.ts"),
      name: "my-components",
      formats: ["umd"],
      fileName: format => `my-components.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "antd"],
      output: {
        globals: {
          react: "react",
          "react-dom": "react-dom",
          antd: "antd",
        },
      }
    },
  },
})
