<template>
  <div id="custInfo">
    <span style="font: 20px bold; color: blue">客户信息</span>
    <el-form
      :model="custInfo"
      label-width="120px"
      class="demo-ruleForm"
      size="default"
    >
      <div class="formclass">
        <el-row>
          <el-col :span="24">
            <el-form-item label="序号:">
              <el-input class="custinput" v-model="custInfo.linenum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="客户编号:">
              <el-input
                class="custinput"
                v-model="custInfo.customer"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="客户名称:">
              <el-input
                class="custinput"
                v-model="custInfo.custname"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="客户地址:">
              <el-input
                class="custinput"
                v-model="custInfo.custaddress"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, getCurrentInstance} from "vue";
import pbdata from "../views/pubdata"; //从公共数据文件引入客户数据

const initdata = pbdata.custInfo; //某一个客户的完整数据
const custInfo = reactive(initdata);
const { proxy } = getCurrentInstance(); //获取实例对象后解构出proxy
const props = defineProps({  
  customerNo: String,//vue3.2 定义props
});

//const { proxy } = getCurrentInstance(); //获取实例对象后解构出proxy
//const emit = defineEmits(['isselected'])  //关键代码，自定义事件名称'isselected'
onMounted(() => {
    findbyId()
});
const showCustomers = (custobj) => {
    //zling
    custInfo.linenum=custobj.linenum
    custInfo.customer=custobj.customer
    custInfo.custname=custobj.custname
    custInfo.custaddress=custobj.custaddress
    
};
//zling 根据
const findbyId = () => {
  const custid = props.customerNo;
  if(!custid) {      
      alert("缺少客户编号，请检查!")
      return
  }
  //ajax从后台获取指定编号的客户
  proxy.axios
    .get("https://localhost:5001/api/customer/"+custid)
    .then(function (response) {
      //zling 处理成功情况,调用函数，返回指定编号客户信息
      showCustomers(response.data);
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
};
</script>
<style>
#custInfo {
  width: 100%;
  height: 300px;
  border: red solid 1px;
  margin: auto;
}
.formclass {
  width: 90%;
}
.custinput {
  width: 300px;
}
</style>
