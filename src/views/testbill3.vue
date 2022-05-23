<template>
  <div id="testdatagrid">
    <h1>表格测试</h1>
    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent(-1)">在第1行插入</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      ref="xTable"
      border
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :data="tableData2"
    >
      <vxe-column type="seq" title="序号" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="address" title="Address"></vxe-column>
    </vxe-table>
  </div>
</template>
<script setup>
import { ref,reactive } from "vue";
//import { VxeTableInstance } from "vxe-table";
const tableData2 = ref([
  {
    id: 10001,
    name: "Test1",
    role: "Develop",
    sex: "Man",
    age: 28,
    address: "test abc",
  },
  {
    id: 10002,
    name: "Test2",
    role: "Test",
    sex: "Women",
    age: 22,
    address: "Guangzhou",
  },
  {
    id: 10003,
    name: "Test3",
    role: "PM",
    sex: "Man",
    age: 32,
    address: "Shanghai",
  },
  {
    id: 10004,
    name: "Test4",
    role: "Designer",
    sex: "Women",
    age: 24,
    address: "Shanghai",
  },
]);
const xTable = ref({});//返回响应式代理对象，需要了解js的Proxy对象，及vue3‘ref()’简单原理
const insertEvent = async (row) => {//async 修饰的方法返回一个Promise，需要了解Promise
  const $table = xTable.value
  const record = {
    sex: "1",
  };
  const { row: newRow } = await $table.insertAt(record, row)
  await $table.setActiveCell(newRow, "sex")
};
//如果对JS异步概念及Promise对象不属性，修改为下面方式代码，也可以正确执行
// const insertEvent = (row) => {
//   const $table = xTable.value;
//   const record = {
//     sex: "1",
//   };
//   const { row: newRow } = $table.insertAt(record, row);
//   $table.setActiveCell(newRow, "sex");
// }
</script>
<style>
#testdatagrid {
  width: 760px;
  height: 400px;
  border: red solid 1px;
  margin: auto;
}
</style>