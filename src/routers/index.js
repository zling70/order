import { createRouter, createWebHistory} from 'vue-router'
import app from '../App.vue'

import Orderbill from '../views/Orderbill.vue'
import Orderbill2 from '../views/Orderbill2.vue'
import Orderbill_vxe from '../views/Orderbill_vxe.vue'
import CustomerList from '../components/custList.vue'
import Customer from '../components/customer.vue'

const routes = [
    {path:"/",component:Orderbill},

    {path:"/order",component:Orderbill},
    {path:"/order2",component:Orderbill2},
    {path:"/ordervxe",component:Orderbill_vxe},
    {path:"/custlist",component:CustomerList},
    {path:"/customer",component:Customer},
  ]
const router = createRouter(
    {
        history:createWebHistory(),
        routes,
    }
)
export default router

