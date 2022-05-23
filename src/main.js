import { createApp } from 'vue'
import App from './App.vue'
//全局导入，因在vite.config.js中配置了自动导入，被注释掉了
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
import router from './routers/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";//支持vxe-table的全局导入，也可以在具体页面中导入使用
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {      //导入elementplus中的图标
  app.component(key, component)
}
app.use(router)
app.use(VueAxios,axios)
//app.config.globalProperties.$axios=axios
app.use(VXETable) //使用vxe-table组件
app.mount('#app')
