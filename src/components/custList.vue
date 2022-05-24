<template>
    <div id="custlist">
    <vxe-table
      ref="xCustTable"
      show-header-overflow
      show-overflow
      :row-config="{ isHover: true }"
      :radio-config="{labelField: 'linenum'}"
      :data="customerData"
    >
      <vxe-column type="radio" title="序号" width="100"></vxe-column>
      <vxe-column field="customer" title="客户编号"></vxe-column>
      <vxe-column field="custname" title="客户名称"></vxe-column>
      <vxe-column field="custaddress" title="客户地址"></vxe-column>
    </vxe-table>    
    <vxe-button @click="clickup2p" size="small" icon="vxe-icon--eye" >取回</vxe-button>
    <el-button @click="clickup2p" type="primary" round style="margin-top:8px">取回</el-button>
    <!--//按钮点击时，在clickup2p函数中调用事件发射emit-->
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted,getCurrentInstance ,defineEmits} from "vue"
    //const {mouont} = app
    //import { VxeTableInstance } from "vxe-table";
    const customerData = ref([{"linenum":3,"customer":"c03","custname":"张小飞","custaddress":"株洲"}]);
    const xCustTable = ref({}); //返回响应式代理对象
    const { proxy } = getCurrentInstance(); //获取实例对象后解构出proxy
    //const custdt = reactive({"linenum":3,"customer":"c03","custname":"张小飞","custaddress":"株洲"})
    const emit = defineEmits(['isselected'])  //关键代码，自定义事件名称'isselected'
    onMounted(()=>{
          proxy.axios
            .get("https://172.16.3.43:5001/api/Customer")
            .then(function (response) {
            //zling 处理成功情况,调用函数，返回数据的填充表格
            fillCustomers(response.data);
            })
            .catch(function (error) {
            // 处理错误情况
            console.log(error);
            })
            .then(function () {
            // 总是会执行
            });
    })
    const fillCustomers=(custlist)=>{
        //zling
        customerData.value=custlist
        const tmp = xCustTable.value
        //console.log(tmp)
    }
    const clickup2p = ()=>{
        const custtab = xCustTable.value //得到当前vxe表格实例
        const isseld=custtab.getRadioRecord() //获取被选中的值
        if(!isseld) {
            alert('没有选中，请重新选择')
            return
        }   
        //console.log(isseld)
        emit("isselected",isseld)  //发射事件，传递被选中的值到父组件
    }
</script>
<style>
#custlist {
  width: 90%;
  height: 380px;
  border: red solid 1px;
  margin: auto;
}
</style>
