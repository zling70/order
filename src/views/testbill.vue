<template>
    <div id="testcontent">
        <h1>表单测试</h1>
        <el-form style="width:600px;margin:auto">
            <el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="单据编号:">
                            <el-input v-model="bill.obj.billno"></el-input>

                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="单据日期:">
                            <el-date-picker type="date" v-model="bill.obj.billdate" style="width:260px"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-row>
        </el-form>
        <el-icon :size="20" color="#409EFC">
            <edit @click="modyfydata"/>
        </el-icon>
        <loading  style="width: 20px; height: 20px; margin-right: 8px" />
        <edit style="width: 20px; height: 20px; margin-right: 8px" />
        <search style="width: 20px; height: 20px; margin-right: 8px" />
        <delete style="width: 20px; height: 20px; margin-right: 8px" />
        
        <check  style="width: 20px; height: 20px; margin-right: 8px" />
        <d-arrow-left style="width: 20px; height: 20px; margin-right: 8px" />
        <arrow-left-bold  style="width: 20px; height: 20px; margin-right: 8px" />
        <arrow-right-bold  style="width: 20px; height: 20px; margin-right: 8px" />
        <d-arrow-right style="width: 20px; height: 20px; margin-right: 8px" />
        <delete-filled   style="wwidth: 20px; height: 20px; margin-right: 8px" />
        <el-icon  :size="20" color="#409EFC"><edit /></el-icon>
        <loading  style="width: 20px; height: 20px; margin-right: 8px" />
    </div>
</template>
<script setup>
import { ref, reactive,toRefs } from 'vue'
import Menu from './menu.vue';
let billdata = {
    billno: '2022050901', //单据编号
    billdate: new Date(), //单据日期
    customer: '健坤科技', //客户
    customeraddress: '株洲', //送货地址
    billstatus: '未结案', //单况
    remark: '写入备注:你是一条汉子！', //备注
    currid: 'RMB', //币别
    billstylename: '打折销售',//订单类型
    maker: '', //制单人员
    permitter: '刘经理', //复合人员
    priceofoftax: '是', //单价是否含税
    salesid: '小花', //业务人员
    departid: '销售部', //所属部门
    details: []
}
let bill = reactive({"obj":billdata})  //变为响应数据
const modyfydata = function (...args) {
    alert('修改数据')
    //bill.billno = '2033'
    bill.obj={billno:'a001',billdate:'2022-05-11'}
}
</script>
<style>
#testcontent {
    width: 760px;
    height: 400px;
    border: red solid 1px;
    margin: auto;
}
</style>
