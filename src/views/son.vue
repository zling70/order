<template>
  <div>
    <slot name="header"></slot><!--命名插槽-->
    <slot :dat="objdt"></slot><!--默认插槽，动态值，将传递到父组件-->
    <!--循环-->
    <!-- <div>
      <div v-for:="item in 10">
        <slot :dat="item"></slot>
      </div>
    </div> -->

    <slot name="footer"></slot>
  </div>
</template>
<script setup>
import {reactive} from 'vue'
const objdt=reactive({"linenum":3,"customer":"c03","custname":"张小飞","custaddress":"株洲"})
</script>