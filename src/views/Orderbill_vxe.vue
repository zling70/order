<template>
  <div id="maincontent">
    <span style="font: 20px bold; color: blue">销售订单</span>
    <el-form
      ref="orderform"
      :model="bill"
      label-width="120px"
      class="demo-ruleForm"
      size="small"
    >
      <div class="formclass">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据编号:">
              <el-input v-model="bill.obj.billno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单据日期:">
              <el-date-picker
                
                value-format="YYYY-MM-DD"
                type="date"
                v-model="bill.obj.billdate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="客    户:">
              <el-input v-model="bill.obj.customer" @keydown="chooseorwatchCust"></el-input>
              <!--隐藏表单之客户编号-->
              <el-input type="hidden" v-model="bill.obj.customerno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送货地址:">
              <el-input v-model="bill.obj.customeraddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单价是否含税:">
              <el-input v-model="bill.obj.priceofoftax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单况:">
              <el-input v-model="bill.obj.billstatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单类型:">
              <el-input v-model="bill.obj.billstylename"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币别:">
              <el-input v-model="bill.obj.currid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-tabs type="card" style="width: 700px; height: 360px; margin: 0 auto">
        <el-tab-pane label="明细">
          <div id="tbtools" style="text-align: left">
            <plus
              @click="insertEvent(-1)"
              style="
                width: 20px;
                height: 20px;
                margin: 0 8px 0 0;
                color: #409efc;
              "
            />
            <minus
              @click="removeChecked()"
              style="
                width: 20px;
                height: 20px;
                margin: 0 8px 0 0;
                color: #409efc;
              "
            />
          </div>
          <vxe-table
            ref="xTable"
            size="mini"
            border
            keep-source
            height="260"
            show-header-overflow
            show-overflow
            :row-config="{ isHover: true }"
            :checkbox-config="{
              labelField: 'linenum',
              highlight: true,
              range: true,
            }"
            :column-config="{ resizable: true }"
            :edit-config="{ trigger: 'click', mode: 'cell' }"
            :data="bill.obj.details"
          >
            <!-- <vxe-column type="seq" title="序号" width="60"></vxe-column> -->
            <!-- 此处由table提供的自动序号"seq" 在相关业务处理时控制不便，比如按某列的数据排序，序号不会跟行一起变动，改由业务数据提供 -->
            <!-- <vxe-column type="checkbox" title="" width="70"></vxe-column> -->
            <vxe-column type="checkbox" title="序号" width="70"></vxe-column>
            <vxe-column
              field="code"
              title="物料编号"
              :edit-render="{}"
              sortable
            >
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
            <vxe-column
              field="unitprice"
              title="单价"
              :edit-render="{}"
              sortable
            >
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
        </el-tab-pane>
        <el-tab-pane label="备注">
          <el-input
            v-model="bill.obj.remark"
            rows="10"
            type="textarea"
            style="margin-top: 24px;"
          ></el-input>
        </el-tab-pane>
      </el-tabs>
      <div class="formclass">
        <el-row>
          <el-col :span="12">
            <el-form-item label="业务人员:">
              <el-input v-model="bill.obj.salesid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属部门:">
              <el-input v-model="bill.obj.departid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="制单人员:">
              <el-input v-model="bill.obj.maker"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="审核人员:">
              <el-input v-model="bill.obj.permitter"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <vxe-modal ref="vmodal" v-model="openwinShow.showlist" width="540" showFooter resize :before-hide-method="closeModal">
        <customerlist @isselected="handleselected"> 
        <!--子组件的自定义事件名'isselected'，由'handleselected'回调函数处理-->       
        </customerlist>
    </vxe-modal>
    <vxe-modal ref="vcdetail" v-model="openwinShow.showCustInfo" width="540" showFooter resize :before-hide-method="closeModal">
        <customerdetail :customerNo="bill.obj.customerno"  :key="bill.obj.customerno"></customerdetail>
    </vxe-modal><!--key的作用主要是为了高效的更新虚拟DOM,这里当key值变化时会重新mouont,onMouont钩子方法中才会重新查询数据集-->

    <circle-plus
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="loadbill"
    />
    <Scissor
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="cleandata"
    />
    <edit
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="savebill"
    />
    <search @click="isidle" style="width: 20px; height: 20px; margin: 8px; color: #409efc" />

    <delete @click="delbill" style="width: 20px; height: 20px; margin: 8px; color: #409efc" />
    <check @click="isidle" style="width: 20px; height: 20px; margin: 8px; color: #409efc" />
    <d-arrow-left
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="isidle"
    />
    <arrow-left-bold
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="toPrebill"
    />
    <arrow-right-bold
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="toNextbill"
    />
    <d-arrow-right
      style="width: 20px; height: 20px; margin: 8px; color: #409efc"
      @click="isidle"
    />
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { VXETable, Header, Column } from "vxe-table";
import pbdata from "./pubdata"; //从公共数据文件引入数据，测试用，非ajax的动态数据
import customerlist from '../components/custList.vue'  //用于开窗选择客户并返回所选的组件
import customerdetail from '../components/customer.vue'  //用于开窗显示客户详情
const initdata = pbdata.billdt; //一张单据的完整数据，初始化的死数据

const xTable = ref(null) //与vxe-table之ref="xTable"关联，此处变量名必须与ref属性一致
const orderform = ref(null) //表单实例 ,(没有使用该变量)
let bill = reactive({ obj: initdata }); //转为响应式数据
const vmodal = ref(null) //选择客户的弹窗
const vcdetail = ref(null) //查看客户详情的弹窗

//const instance =getCurrentInstance()  //获取完整的vue对象实例
const { proxy } = getCurrentInstance() //获取实例对象后解构出proxy
const openwinShow = reactive({          //控制弹窗是否显示，在<vxe-modal>组件中使用
    showlist:false,
    showCustInfo:false
})
//功能方法,根据需求有：===========================================
//1.在行尾新增行
//2.选中多行删除（只限于页面列表删除）
//3.加载最新一张单据 
//4.朝前分页，加载比当前单据更小的（单据号码）一张单据
//5.朝后分页，加载比当前单据更小的（单据号码）一张单据
//6.数据清空方法
//7.开窗选择客户
//8.开窗穿透查询客户信息
//9.开窗选择物料
//10.数据保存方法
//11.数据删除方法
//=========================
//1在行尾新增行
const insertEvent =async (row) => {
  const $table = xTable.value;
  const rownum = $table.getTableData().fullData.length;//得到当前表格中的记录数
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
  const { row: newRow } = await $table.insertAt(record, row);
  //bill.obj.details.push(record)
  $table.setActiveCell(newRow, "code");
  
};
//2选中多行删除
const removeChecked = () => {
  areyouok(() => {
    xTable.value.removeCheckboxRow(); //vtx提供删除选中行
    //对于剩下的记录，重新排号。linenum非vtx表格自动提供的序号，有业务要求
    let residueRecords = xTable.value.getTableData();
    let counts = 1;
    residueRecords.fullData.forEach((element) => {
      element.linenum = counts++;
      console.log(element.linenum);
    });
  });
};

//3加载最新一张单据
const loadbill = function () {
  //instance.proxy.axios.get('https://172.16.3.43:5001/api/Orderbill/GetEnd')
  proxy.axios
    .get("https://172.16.3.43:5001/api/Orderbill/GetEnd")
    .then(function (response) {
      // 处理成功情况
      //console.log(response)
      filldata(response.data);
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
};
//4.朝前分页，加载比当前单据更小的（单据号码）一张单据
const toPrebill = function () {
  //alert("当前的单据号是：" + bill.obj.billno);
  proxy.axios
    .get(
      "https://172.16.3.43:5001/api/Orderbill/Prebill?billno=" + bill.obj.billno
    )
    .then(function (response) {
      filldata(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
};
//5.朝后分页，加载比当前单据更小的（单据号码）一张单据
const toNextbill = function () {
  proxy.axios
    .get(
      "https://172.16.3.43:5001/api/Orderbill/Nextbill?billno=" + bill.obj.billno
    )
    .then(function (response) {
      filldata(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
};
//6.数据清空方法
const cleandata = () => {
  clean();
};
//7.开窗选择客户，实现比较复杂，界面引入<vxe-modal>子组件，子向父传值使用emit机制
//8.开窗穿透查询客户信息,两个功能都是键盘事件触发，一个函数中实现
//从‘客户’文本框按'F4'开窗选择客户，文本框按'F2'开窗检查客户详情
const chooseorwatchCust = (...args)=>{
    if (args[0].keyCode == "115") {//判断是不是"f4"键被按下
        openwinShow.showlist = true  //设为'true'后，弹窗就被打开
    }else if(args[0].keyCode == "113"){
        openwinShow.showCustInfo = true
        
    }else return
}
//9.开窗选择物料，留给学员实现，ajax版本，从后台获取物料列表
const chooseMatorials = ()=>{
  //
}
//10.数据保存方法
const savebill = () => {
  const $table = xTable.value
  //alert("保存数据")
  //let orderMaster = bill.obj
  //let orderDetails = bill.obj.details
  //下面的代码有些费解，原因是vxe-table会记录被删除的、被修改的、被新增的数据
  //此时进行单据保存，应该保存的是删除后剩下的+新插入的记录，所以这里需要进行处理：
  //const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
  //VXETable.modal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length} residueRecords=${residueRecords.length}`)
  //以上三行，测试各种记录及记录数量，最终要保存到数据库的是‘residueRecords’,如下：
  const residueRecords = xTable.value.getTableData().fullData;  //明细表格的数据
  bill.obj.details=residueRecords
  proxy.axios
  .post(
    "https://172.16.3.43:5001/api/Orderbill/PostOrder" , bill.obj)
  .then(function (response) {
    alert('保存成功'+response)
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // 总是会执行
  });
};
//11.数据删除方法
const delbill = ()=>{
  console.log(bill.obj.billno)
  areyouok(()=>{
    proxy.axios
    .delete(
      "https://172.16.3.43:5001/api/Orderbill/delOrder" , {data:bill.obj})
      //axios 的delete 方法与post、put不一样，要用data包裹一层，
      //原理是delete第二个参数是config的data不是单纯的data
    .then(function (response) {
      alert('删除成功'+response)
      toNextbill()//删除成功后，重新加载当前单据号后面的一张单据
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
  })
}
//const dat=ref({})
//const sonobjRef=ref(null)
//弹窗被关闭时执行，目的是从关闭的窗口取值
const closeModal=(...args)=>{
    // console.log(dat.linenum)
    // sonobjRef.value.custtd
    //alert('关闭了')
}
//捕捉从子组件传过来的事件
const handleselected = (obj)=>{
    //alert('选择事件被触发')
    console.log(obj)
    changeCust(obj)
}
//从子组件选择客户信息后，修改到页面中的客户字段
const changeCust=(custobj)=>{
    
    bill.obj.customer = custobj.custname;//客户名
    bill.obj.customerno = custobj.customer;//客户编号
    bill.obj.customeraddress = custobj.custaddress
    bill.obj.cust = custobj
    console.log(bill)
    vmodal.value.close() //关闭弹窗,vmodal是一个Proxy
}

const submitEvent = () => {
  demo1.submitLoading = true;
  setTimeout(() => {
    const $table = xTable.value;
    demo1.submitLoading = false;
    demo1.showEdit = false;
    if (demo1.selectRow) {
      VXETable.modal.message({ content: "保存成功", status: "success" });
      Object.assign(demo1.selectRow, demo1.formData);
    } else {
      VXETable.modal.message({ content: "新增成功", status: "success" });
      $table.insert(demo1.formData);
    }
  }, 500);
};
const isidle = ()=>{
  alert('空闲按钮！')
}
//通用、公共方法==================================
//单据的数据渲染，填充更新的数据，当服务端加载单据、分页查询时需要调用,入参为一张单据的整体数据
function filldata(billobj) {
  bill.obj = billobj;
  bill.obj.customer = billobj.cust.custname;//客户名
  bill.obj.customerno = billobj.cust.customer;//客户编号
  //页面中的客户显示的是客户名称，但从后端传过来的参数是整个客户信息‘cust’
  //"cust":{"linenum":3,"customer":"c03","custname":"张小飞","custaddress":"株洲"}
  //需要从中提取客户名称，和客户编号，客户编号作为隐藏表单
}
//整体页面数据清除工作，为新增单据做准备
function clean() {
  //let tmp = { billno: "20220515001", billdate: new Date() }; //仅仅赋值单据编号和日期，其它为空
  const tmp = getBillnoAndDate()
  bill.obj = tmp; //响应式的好处就是数据变化会及时响应到页面的渲染
}
//明细表格修改，删除选中的某些行数据时，执行确认，fn为回调函数，‘确认’后将被执行
const areyouok = (fn) => {
  ElMessageBox.confirm("确实删除选中行?", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  })
    .then(() => {
      fn();//zling，执行回调
      ElMessage({
        type: "success",
        message: "删除完成",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
//清空数据后，准备新增的单据，首先就是填充默认的日期和单据号码
const getBillnoAndDate=()=>{
  let bdt = new Date()
  let year = '' + bdt.getFullYear()
  let mth = (bdt.getMonth() + 1) >= 10 ? (bdt.getMonth() + 1) : '0' + (bdt.getMonth() + 1)
  let dd = bdt.getDate() >= 10 ? bdt.getDate() : '0' + bdt.getDate()
  //newbillno=seachBillno()
  let bno = year + mth + dd + '001'
  return {billno:bno,billdate:`${year}-${mth}-${dd}`}
}
//根据日期查询单号，以此生成参数日期所指定的单据编号=日期+流水号
const seachBillno=(mdate)=>{//本方法由学员自己去完成
  //根据日期查询最大的单号 比如‘20220518003’
  //返回最大单号,序列号+1
}
</script>
<style>
#maincontent {
  border: 1px solid blue;
  width: 720px;
  height: 680px;
  margin: 0 auto;
  padding-right: 10px;
  padding-left: 10px;
}
.formclass {
  width: 700px;}
</style>
