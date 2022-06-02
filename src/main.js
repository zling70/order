import { createApp } from 'vue'
import App from './App.vue'
//zling 全局导入，但因在vite.config.js中配置了自动导入，故此处被注释掉了
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
import router from './routers/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'  //zling 查询axios的官网使用介绍
import VueAxios from 'vue-axios'
import VXETable from "vxe-table";//支持vxe-table的全局导入，也可以在具体页面中导入使用
import "vxe-table/lib/style.css";
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {      //导入elementplus中的图标
  app.component(key, component)
}//zling 你可以暂时不用关注element图标的使用,内部是如何通过app.componet()注册的,能使用就好，都是官方文档提供的
app.use(router)
app.use(VueAxios,axios)
app.use(VXETable) //使用vxe-table组件
app.mount('#app')
