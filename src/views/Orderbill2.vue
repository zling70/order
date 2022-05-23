<template>
    <div id="maincontent">
        <span style="font:20px bold;color:blue">销售订单</span>
        <el-form :model="bill" label-width="120px" class="demo-ruleForm" size="small">
            <div class="formclass">
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="单据编号:">
                        <el-input v-model="bill.obj.billno"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="单据日期:">
                        <el-date-picker type="date" v-model="bill.obj.billdate" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="客    户:">
                        <el-input v-model="bill.obj.customer"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="送货地址:">
                        <el-input v-model="bill.obj.customeraddress"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="单价是否含税:">
                        <el-input v-model="bill.obj.priceofoftax"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="单况:">
                        <el-input v-model="bill.obj.billstatus"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="订单类型:">
                        <el-input v-model="bill.obj.billstylename"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="币别:">
                        <el-input v-model="bill.obj.currid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </div>
            <el-tabs type="card" style="width:700px;height:360px;margin:0 auto">
                <el-tab-pane label="明细">
                    <el-table :data="bill.obj.details" style="height:260px;overflow:auto;border:1px solid red" border>
                        <el-table-column prop="linenum" label="序号" width="60"></el-table-column>
                        <el-table-column prop="code" label="物料编号" width="110" sortable></el-table-column>
                        <el-table-column prop="name" label="物料名称" width="110"></el-table-column>
                        <el-table-column prop="specs" label="规格型号"></el-table-column>
                        <el-table-column prop="unitof" label="计量单位"></el-table-column>
                        <el-table-column prop="quantities" label="数量" width="70"></el-table-column>
                        <el-table-column prop="unitprice" label="单价"></el-table-column>
                        <el-table-column prop="amounts" label="金额"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="备注">
                    <el-input v-model="bill.obj.remark" rows="10" type="textarea"></el-input>
                </el-tab-pane>
            </el-tabs>
            <div class="formclass">
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="业务人员:">
                        <el-input v-model="bill.obj.salesid"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="所属部门:">
                        <el-input v-model="bill.obj.departid"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="制单人员:">
                        <el-input v-model="bill.obj.maker"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="审核人员:">
                        <el-input v-model="bill.obj.permitter"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </div>
        </el-form>
        <circle-plus style="width: 20px; height: 20px; margin: 8px;color:#409EFC" @click="loadbill" />
        <edit style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
        <search style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
        <DocumentAdd style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
        <delete style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
        <check style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
        <d-arrow-left style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
        <arrow-left-bold style="width: 20px; height: 20px; margin: 8px;color:#409EFC" @click="toPrebill"/>
        <arrow-right-bold style="width: 20px; height: 20px; margin: 8px;color:#409EFC" @click="toNextbill" />
        <d-arrow-right style="width: 20px; height: 20px; margin: 8px;color:#409EFC" />
    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import pbdata from './pubdata'  //从公共数据文件引入数据

const initdata = pbdata.billdt  
let bill = reactive({ "obj": initdata })  //转为响应式数据
//const instance =getCurrentInstance()  //获取完整的vue对象实例
const { proxy } = getCurrentInstance()     //获取实例对象后解构出proxy,实例对象的一个属性
//事件方法===========================================
//1.加载最新一张单据 (1,2,3方法可以精简，抽取相同部分组成一个公共方法，不同部分仅限于URL)
const loadbill = function () {
    alert('hello')
    //instance.proxy.axios.get('https://localhost:5001/api/Orderbill/GetEnd')
    proxy.axios.get('https://localhost:5001/api/Orderbill/GetEnd')
        .then(function (response) {
            // 处理成功情况
            //console.log(response)            
            filldata(response.data)
        })
        .catch(function (error) {
            // 处理错误情况
            console.log(error);
        })
        .then(function () {
            // 总是会执行
        });

}
//2.朝前分页，加载比当前单据更小的（单据号码）一张单据
const toPrebill = function(){
    alert('当前的单据号是：'+bill.obj.billno)
    proxy.axios.get('https://localhost:5001/api/Orderbill/Prebill?billno=' + bill.obj.billno)
        .then(function (response) {
            filldata(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // 总是会执行
        });
}
//3.朝后分页，加载比当前单据更小的（单据号码）一张单据
const toNextbill = function(){
    proxy.axios.get('https://localhost:5001/api/Orderbill/Nextbill?billno=' + bill.obj.billno)
        .then(function (response) {
            filldata(response.data)
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // 总是会执行
        });
}
//4.数据清空方法
//5.数据保存方法
//6.数据删除方法
//7.开窗选择客户
//8.开窗穿透查询客户信息
//9.开窗选择物料
//通用方法==================================
//更新数据，当服务端加载单据、分页查询时需要调用,入参为一张单据的整体数据
function filldata(billobj){
    bill.obj = billobj
    bill.obj.customer = billobj.cust.custname
    //页面中的客户显示的是客户名称，但从后端传过来的参数是整个客户信息‘cust’
    //"cust":{"linenum":3,"customer":"c03","custname":"张小飞","custaddress":"株洲"}
    //需要从中提取客户名称，和客户编号，客户编号作为隐藏表单
}
</script>
<style>
#maincontent {
    border: 1px solid blue;
    width: 720px;
    height: 680px;
    margin: 0 auto;
    padding-right: 10px;
    padding-left: 10px
}
.formclass {
    width:700px;
}
</style>
