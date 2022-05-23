
<template>
  <div id="content">
    <router-link to="/order">订单</router-link> |
    <router-link to="/order2">静态订单</router-link> |
    <router-link to="/ordervxe">vxe版</router-link> |
    <router-link to="/custlist">客户列表</router-link> |
    <router-link to="/customer">客户详情</router-link> |
  </div>
  <!-- <button type="button" @click="count++">count is: {{ count }}</button> -->
  <router-view></router-view>
</template>
<script setup>
import { ref } from 'vue'
//const count = ref(0)

</script>

<style scoped>
a {
  color: #42b983;
}
#content{
  width: 600px;
  height: 50px;
  border-top: red solid 1px;
  margin: auto;
  }
</style>