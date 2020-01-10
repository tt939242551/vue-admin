<template>
  <div class="home">
      <div id="topbar">
         <p class="title">
            <span>性别</span>
              <Select
               size="small"
              v-model="models[0]"
              @on-change="getselectlist()"
              style="width:120px;margin-right: 30px;"
              placeholder="请选择性别"
            >
              <Option value="男">男</Option>
              <Option value="女">女</Option>
              <Option value="">不限</Option>
            </Select>
            <span>注册时间</span>
            <DatePicker size="small" type="daterange"  @on-change="gettime"  :value="models[1]" split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
         </p>
        <div class="inputbox"><Input size="small" @on-search="getselectlist"  search class="topsearch"  v-model="models[3]"  enter-button="搜索" placeholder="搜索" /></div>
        <span @click="tableToExcel" class="outup">导出<img src="../assets/imgs/bg06.png" alt=""></span>
      </div>
    <div class="tabbox">
        <Table stripe   :columns="columns1" :data="data1" >
            <template slot-scope="{ row, index }" slot="action">
              <span class="acbtn" style="margin-right: 20px" @click="show(index)">订单信息</span><span class="acbtn" @click="movelist(index)" >退换管理</span>
            </template>
        </Table>
        <p>会员：{{total}}位</p>
      <div class="foot">
        <Page :total="total" prev-text="上一页" next-text="下一页" @on-change="getlist" />
      </div>
    </div>
 </div>
</template>

<script>
export default {
    name: 'home',
    data(){
        return{
           tvalue: 0, 
           models:[],
           data1:[],
           page:1,
          pageSize:10,
          total:1,
          columns1: [
        {
          title: "注册时间",
          key: "newdate",
          align: "center"
        },
        {
          title: "会员ID",
          key: "vipid",
          width: 100,
          align: "center"
        },
                {
          title: "昵称",
          key: "username",
          align: "center"
        },
        {
          title: "性别",
          key: "sex",
          width: 80,
          align: "center"
        },
                {
          title: "生日",
          key: "birthday",
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          width: 200,
          align: "center"
        },
        {
          title: "手机号",
          key: "tel",
          align: "center"
        },
        {
          title: "优惠券",
          key: ".",
          align: "center"
        },
        {
          title: "积分",
          key: "shoppingcount",
          width: 80,
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
        }
    },
    created(){this.getselectlist()},
    methods:{
     getselectlist(){
       let url = "tb_user.ashx?action=selectlist"
       let arr = [];
       if (this.models[1]) {
           arr = this.models[1]
       }
       let params={page:this.page,pageSize:this.pageSize,sex:this.models[0],stardate:arr[0],enddate:arr[1],username:this.models[3]}
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>=0) {
            this.data1 = res.item
            this.data1.forEach(i=>{
              i.newdate = i.newdate.match(/20\d{2}\/\d{1,2}\/\d{1,2}/)[0]
            })
            this.total = res.totalCount
 
         }else{
            if (res.status==-1008) {
                  localStorage.setItem("userName", '');
                 localStorage.setItem("token",""); 
                  this.$router.push({ path: this.redirect || "/statistics" });
              }
           this.$Message.warning(res.content); 
         }
        
       }).catch(()=>{
              
         } )
    },
    getlist(index) {
      this.page = index
      this.getselectlist()
    },
    gettime(t){
     this.models[1] = t
     console.log(t)
     this.getselectlist()
    },
    show(i){
      let id = this.data1[i].vipid
      this.$router.push({ path: 'order', query: { id:id, }})
    },
     tableToExcel(){
      //要导出的json数据
      let url = "tb_user.ashx?action=export"
       let arr = [];
       let jsonData = []
       if (this.models[1]) {
           arr = this.models[1]
       }
       let params={sex:this.models[0],stardate:arr[0],enddate:arr[1]}
       let str = '<tr><td>注册时间</td><td>会员ID</td><td>昵称</td><td>性别</td><td>生日</td><td>邮箱</td><td>手机号</td><td>优惠券</td><td>积分</td></tr>';
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>0) {
            jsonData = res.item
            jsonData.forEach(item=>{
            str+=`<tr><td>${item.newdate + '\t'}</td><td>${item.vipid + '\t'}</td><td>${item.username.trim() + '\t'}</td><td>${item.sex + '\t'}</td><td>${item.birthday + '\t'}</td><td>${item.email + '\t'}</td><td>${item.tel + '\t'}</td><td></td><td>${item.shoppingcount + '\t'}</td></tr>`;     
            })
                  //Worksheet名
          let worksheet = '用户信息'
          let uri = 'data:application/vnd.ms-excel;base64,';
 
      //下载的表格模板数据
          let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
          xmlns:x="urn:schemas-microsoft-com:office:excel" 
          xmlns="http://www.w3.org/TR/REC-html40">
          <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>${worksheet}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            </head><body><table>${str}</table></body></html>`;
      //下载模板
           window.location.href = uri + this.base64(template)
   
    //输出base64编码
      
         }else{
           this.$Message.warning(res.content); 
         }
        
       }).catch(()=>{
              
         } )
      
     },
     base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) }
       
      
    



    }
}
</script>

<style>
/*  #general .ivu-tabs-ink-bar{background-color: #c69c6d ;}
  #general .ivu-tabs-nav .ivu-tabs-tab-active{color: #c69c6d ;} */
.btnbox .ivu-btn.ivu-btn-small {
  margin-right: 18px;
  color: #787878;
  width: 86px;
  border-radius: 4px;
}
.btnbox .ivu-icon {
  font-size: 15px;
  line-height: 24px;
}
.btnbox .ivu-btn > .ivu-icon + span,
.btnbox .ivu-btn > span + .ivu-icon {
  margin-left: 0;
}
.x_label .ivu-input.ivu-input-default{width: 200px;}
.ivu-modal-header p, .ivu-modal-header-inner{font-size: 18px;font-weight:500}
.ivu-modal-header{border-bottom: none;margin: 0 12px;padding: 40px 15px  0 15px ;}
.imgupload .control-form > p{font-size: 14px}
</style>

<style scoped>
#topbar{
  padding: 20px 15px;
  margin: 20px 0 0;
 background: #fff;
 border-bottom: 1px solid #dcdee2;
}
.outup{color: #c69c6d;float: right;vertical-align: middle;line-height: 40px;cursor: pointer;}
.outup img {transform: translateY(4px);margin-left: 8px;}
.tabbox p{margin: 10px 35px 0;}
.title {
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
  margin: 8px 0 6px;
}
.title>span{margin-left: 0;margin-right: 8px;}
.tabbox {
  background: #fff;
  padding: 15px;
  padding-bottom: 80px;
  padding-top: 50px;
}
.topsearch {
  float: right;
  width: 280px;
}
.btnbox {
  position: absolute;
  top: 95px;
  right: 10px;
}
.stitle {
  font-size: 18px;
  text-align: center;
  margin: 25px 0;
  margin-right: 8px;
}
 .sinput {
  width: 240px;
  margin: 10px 0 40px 40px;
}
.addbtn {
  margin: 10px 0 30px;
}
.foot {
  float: right;
  padding: 20px;
}
.inputbox{display: inline-block;vertical-align: middle;margin-left: 50px;transform: translateY(-2px)}
.x_label{width: 310px;display: inline-block;font-size: 16px;margin: 20px 100px 10px 20px;}
.x_label p {width: 100px;line-height: 32px;display: inline-block;}
.samintbtn{margin: 30px 10px 30px 32px;}
.postimg{display: flex;padding: 10px 0 20px 20px;flex-wrap: wrap}
.postimg p {margin: 0 15px; font-size: 15px;line-height: 36px;}
.headtext{font-size: 20px;color: #282a3c;}
.btn1{height: 32px;width: 100px;font-size: 14px;line-height: 16px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
</style>