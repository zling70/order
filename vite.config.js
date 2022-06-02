import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'//zling 在通过@vitejs/plugin-vue这个插件来⽀持Vue。

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/   官网参考
// https://cn.vitejs.dev/guide/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({//zling 两行配置，element plus的全局自动引入
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({//zling vxe table的引入，后面组件可以按需import
      resolves: [
        VxeTableResolve()
      ],
    })
  ]
})
