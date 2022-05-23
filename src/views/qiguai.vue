<template>
  <div id="testdatagrid">
    <h1>表格测试</h1>
    <div id="tbtools" style="text-align: left">
      <plus
        @click="insertEvent(-1)"
        style="width: 20px; height: 20px; margin: 0 8px 0 0; color: #409efc"
      />
      <minus
        @click="removeChecked()"
        style="width: 20px; height: 20px; margin: 0 8px 0 0; color: #409efc"
      />
    </div>

    <vxe-table
      ref="xTable"
      size="mini"
      border
      height="260"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :checkbox-config="{ labelField: 'linenum', highlight: true, range: true }"
      :column-config="{ resizable: true }"
      :edit-config="{ trigger: 'click', mode: 'cell' }"
      :data="tableData2"
    >
      <!-- <vxe-column type="seq" title="序号" width="60"></vxe-column> -->
      <!-- 此处由table提供的自动序号"seq" 在相关业务处理时控制不便，比如按某列的数据排序，序号不会跟行一起变动，改由业务数据提供 -->
      <!-- <vxe-column type="checkbox" title="" width="70"></vxe-column> -->
      <vxe-column type="checkbox" title="序号" width="70"></vxe-column>
      <vxe-column field="code" title="物料编号" :edit-render="{}" sortable>
        <template #edit="{ row }">
          <vxe-input
            v-model="row.code"
            type="text"
            placeholder="请选择物料"
          ></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="name" title="物料名称" sortable></vxe-column>
      <vxe-column field="specs" title="规格型号"></vxe-column>
      <vxe-column field="unitof" title="计量单位"></vxe-column>
      <vxe-column field="quantities" title="数量" :edit-render="{}">
        <template #edit="{ row }">
          <vxe-input
            v-model="row.quantities"
            type="number"
            placeholder="0"
          ></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="unitprice" title="单价" :edit-render="{}" sortable>
        <template #edit="{ row }">
          <vxe-input
            v-model="row.unitprice"
            type="number"
            placeholder="0"
          ></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="amounts" title="金额" :edit-render="{}" sortable>
        <template #edit="{ row }">
          <vxe-input
            v-model="row.amounts"
            type="number"
            placeholder="0"
          ></vxe-input>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>
<script setup>
import { ref } from "vue";
import pbdata from "./pubdata";
import { VXETable } from "vxe-table";
const tableData2 = ref(pbdata.billdt.details);
const xTable = ref(null); 
const insertEvent = (row) => {
  const $table = xTable.value; 
  const rownum = $table.getTableData().fullData.length; 
  const record = {
    linenum: rownum + 1,
    code: "esa01",
    name: "Iguana",
    specs: "EST-13",
    unitof: "P",
    quantities: 10.0,
    unitprice: 35.5,
    amounts: 355.0,
  };
  const { row: newRow } = $table.insertAt(record, row)
  $table.setActiveCell(newRow, "sex")
}
function removeChecked(){
  areyouok(()=>{
    xTable.value.removeCheckboxRow() //vtx提供删除选中行
  //对于剩下的记录，重新排号。linenum非vtx表格自动提供的序号，有业务要求
  let residueRecords =xTable.value.getTableData()
  let counts=1 
  residueRecords.fullData.forEach(element => {
    element.linenum=counts++
    console.log(element.linenum)
  });
  })
  

}
//====================================
//
//执行确认，fn为回调函数，‘确认’后将被执行
const areyouok=(fn)=>{
  ElMessageBox.confirm(
    '确实删除选中行?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      center: true,
    }
  )
    .then(() => {
      fn()
      ElMessage({
        type: 'success',
        message: '删除完成',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
</script>
<style>
#testdatagrid {
  width: 760px;
  height: 400px;
  border: red solid 1px;
  margin: auto;
}
</style>
