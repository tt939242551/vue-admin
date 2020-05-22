<template>
  <div class="home">
       <div id="topbar">
              <Button type="primary" class="btn1" @click="show('add')" ><Icon size="16" style="transform: translateY(-2px)" type="md-add" />新增</Button>
                <div class="inputbox"><Input size="small" @on-search="getselectlist(1)"  search class="topsearch"  v-model="models"  enter-button="搜索" placeholder="搜索" /></div>
      </div> 
    <div class="tabbox">
        <Table stripe   :columns="columns1" :data="data1"  @on-selection-change="selectionChange" >
            <template slot-scope="{ row, index }" slot="action">
              <span class="acbtn" style="margin-right: 20px" @click="show(index)">修改信息</span><span class="acbtn" @click="moveuser(index)" >删除用户</span>
            </template>
        </Table>
        <p> <span class="acbtn2" @click="modal1=true" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选中用户</span><span style="float: right;">后台用户：{{total}}位</span></p>
      <div class="foot">
        <Page :total="total" :current="page" prev-text="上一页" next-text="下一页" @on-change="getlist" />
      </div>
    </div>
       <Modal footer-hide v-model="modal0" width="360" :styles="{top: '200px'}">
          <div  style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除该用户？</p>
              <p>删除后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="movelist">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="modal0=false">取消</Button>
          </div>
        </Modal>
         <Modal footer-hide v-model="modal1" width="360" :styles="{top: '200px'}">
          <div  style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除选中用户？</p>
              <p>删除后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="removeList">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="modal1=false">取消</Button>
          </div>
        </Modal>
      <Modal v-model="modal2" :title="index==='add'?'新增用户':'修改用户信息'" width="580"  footer-hide :styles="{top: '120px'}">
            <div class="modalmain">
              <p style="color:#c69c6d;"><i> * </i>为必填内容</p>
    
              <p><span><i> * </i>用户类型：</span> 
               <Select v-model="formDate[0]" style="width:300px">
                    <Option v-for="item in itemrole" :value="item.id" :key="item.id">{{ item.role_name }}</Option>
                </Select></p>
              <p><span><i> * </i>用户名：</span>
                 <i-input  style="width:300px"
                        type="text" v-model="formDate[1]"    clearable placeholder="请输入用户名"> </i-input>
              </p>
               <p v-if="index!=='add'&&!isedit"><span><i> * </i>密码：</span>
                  <i-input  style="width:200px" disabled
                        type="password" v-model="formDate[2]"  clearable placeholder="请填写密码"> </i-input><span  @click="editpassword" style="color:#c69c6d;cursor: pointer; font-size: 12px;">修改密码</span>
              </p>
              <p v-else><span><i> * </i>密码：</span>
                  <i-input  style="width:300px" 
                        type="password" v-model="formDate[2]"  clearable placeholder="请填写密码"> </i-input>
              </p>
               <p v-show="index==='add'||isedit"><span><i> * </i>确认密码：</span>
                  <i-input  style="width:300px"  @on-blur="chackpassword" 
                        type="password" v-model="formDate[3]" password  clearable placeholder="请确认密码"> </i-input>
              </p>
              <p><span>姓名：</span>
                <i-input  style="width:300px"
                        type="text" v-model="formDate[4]" :maxlength="25"  clearable placeholder="长度不超过25个字符"> </i-input>
              </p>
              <p><span>手机号码：</span>
              
                <i-input  style="width:300px"
                        type="text" v-model="formDate[5]" :maxlength="11"  clearable placeholder="请输入电话号码"> </i-input>
              </p>
                <p><span>邮箱：</span>
              
                <i-input  style="width:300px"
                        type="text" v-model="formDate[6]"  clearable placeholder="请输入邮箱"> </i-input>
              </p>
              <Button size="small" @click="adduser" type="primary" class="btn4">保存</Button><Button size="small" style="margin-left: 40px;" @click="modal2=false"  class="btn4">取消</Button>
            </div>     
        </Modal>
 </div>
</template>

<script>
export default {
    name: 'userAdmin',
    data(){
        return{
           index: 0, 
           models:'',
           data1:[],
           page:1,
           isCheck: [],
          formDate:[],
          itemrole:[],
          isedit:false,
          isok1:false,
          pageSize:10,
          total:1,
          modal0:false,
          modal1:false,
          modal2:false,
          columns1: [
       {
          type: "selection",
          width: 60,
          align: "center"
        },
         {
          title: "用户类型",
          key: "rolename", 
          align: "center"
        },
        {
          title: "用户登录名",
          key: "user_name",
          align: "center"
        },
       
                {
          title: "用户名",
          key: "real_name",
          align: "center"
        },
        {
          title: "电话",
          key: "telephone",
          width: 100,
          align: "center"
        },
        {
          title: "邮箱",
          key: "email",
          width: 180,
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
    created(){//this.getselectlist()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.modal2 = false;
      vm.getselectlist();
      vm.getitemrole()
     })
    },
    methods:{
      //初始化
     getselectlist(n){
       if (n) {
         this.page = n
       }else{ this.page = 1}
       let url = "/admin/common/user.ashx?action=selectlist_user";
       let params={page:this.page,pageSize:this.pageSize,user_name:this.models};
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>=0) {
            this.data1 = res.item;
            this.data1.forEach((item,i)=>{
              if (item.user_name==="admin") {
                this.data1.splice(i,1)
              }
            })
             this.data1.forEach((item,i)=>{
              if (item.user_name==="admins") {
                this.data1.splice(i,1)
              }
            })
            this.total = res.totalCount
 
         }else{
            if (res.status==-1008) {
                  localStorage.setItem("userName", '');
                 localStorage.setItem("token",""); 
                  this.$router.push({ path: this.redirect || "/login" });
              }
           this.$Message.warning(res.content); 
         }
        
       }).catch(()=>{
              
         } )
    },
    //获取用户类型下拉数据
    getitemrole(){
       this.$axios.post('/admin/common/user.ashx?action=selectmanager_role').then(res=>{   
                    if (res.status == 1) {
                   
                      this.itemrole = res.itemrole
                    
                        } else {
                    this.$Message.error(res.content);
                        }
                    }).catch()
    },
    //分页
    getlist(index) {
      this.page = index;
      this.getselectlist(index)
    },
    //修改密码
    editpassword(){
      this.isedit = true;
       this.$set(this.formDate,2,'');
        this.$set(this.formDate,3,'')
    },
    //新增,编辑用户初始化
    show(i){

      this.isedit = false;
      this.index = i;
      if (i==='add') {
        this.formDate = []
      }else{
         this.$axios.post('/admin/common/user.ashx?action=select_details',this.$qs.stringify({id:this.data1[i].id})).then(res=>{     
                    if (res.status === 1) {
                      let msg = res.item[0];
                      msg.itemrole.forEach(item=>{
                        if (item.isselect) {
                          this.$set(this.formDate,0,item.id)
                        }
                      });
                        this.$set(this.formDate,1,msg.user_name);
                        this.$set(this.formDate,2,msg.password);   
                       this.$set(this.formDate,4,msg.real_name);
                       this.$set(this.formDate,5,msg.telephone);
                       this.$set(this.formDate,6,msg.email)
                        } else {
                    this.$Message.error(res.content);
                        }
                    }).catch()
      }
       this.modal2 = true  
    },
    //新增,编辑用户初
      adduser(){
           if (this.index==='add'||this.isedit) {
              if (!this.isok1) {
                 this.$Message.error("两次输入密码不一致");
                 return false
              }
           }
           if (this.formDate[0]&&this.formDate[1]&&this.formDate[2]) {
              let addparme = null;
              let url = '';
              if(this.index==="add"){
                url = '/admin/common/user.ashx?action=insert_user';
                addparme = {user_name:this.formDate[1],role_id:this.formDate[0],password:this.formDate[2],password2:this.formDate[3],real_name:this.formDate[4],telephone:this.formDate[5],email:this.formDate[6]}
              } else{
                  url = '/admin/common/user.ashx?action=edit_user';
                  addparme = {id:this.data1[this.index].id,user_name:this.formDate[1],role_id:this.formDate[0],newPassword1:this.formDate[3],newPassword2:this.formDate[3],RealName:this.formDate[4],Telephone:this.formDate[5],Email:this.formDate[6]}
              }  
               this.$axios.post(url,this.$qs.stringify(addparme)).then(res=>{     
                    if (res.status === 1) {
                        this.models = '';
                        this.getselectlist();
                        this.modal2 = false
                        } else {
                    this.$Message.error(res.content);
                        }
                    }).catch()
           }else{this.$Message.error("请填写所有必填信息")}
      },
      //删除用户弹窗
      moveuser(i){
        this.index = i;
        this.modal0 = true
      },
      //删除用户 
     movelist(){
      let url = "/admin/common/user.ashx?action=delete_user";
      let arr = [this.data1[this.index].id];
       this.$axios.post(url,this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
            this.getselectlist(this.page);
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
         } );
      this.modal0 = false
    },
    //批量删除用户
      removeList() {
      this.$axios
        .post(
          "/admin/common/user.ashx?action=delete_user",
          this.$qs.stringify({ ids: JSON.stringify(this.isCheck) })
        )
        .then(res => {
          if (res.status >= 0) {
            this.getselectlist(this.page);
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
         this.modal1 = false
    },
    //密码检查
    chackpassword(){
      this.isok1 = this.formDate[2] === this.formDate[3];
    },
    //用户多选
    selectionChange(a) {
      this.isCheck = [];
      a.forEach(item => {
        if (this.isCheck.indexOf(item.id) < 0) {
          this.isCheck.push(item.id);
        }
      });
    },
/* tableToExcel(){
      //要导出的json数据
      let url = "/admin/common/tb_user.ashx?action=export"
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
     base64 (s) { return window.btoa(unescape(encodeURIComponent(s))) } */
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
.tabbox p{margin: 10px 20px;}
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
.btn1{color: #fff;font-size: 14px;height: 32px;line-height: 18px;}
.inputbox{vertical-align: middle;float: right;margin: 5px 20px;}
.x_label{width: 310px;display: inline-block;font-size: 16px;margin: 20px 100px 10px 20px;}
.x_label p {width: 100px;line-height: 32px;display: inline-block;}
.postimg{display: flex;padding: 10px 0 20px 20px;flex-wrap: wrap}
.postimg p {margin: 0 15px; font-size: 15px;line-height: 36px;}
.headtext{font-size: 20px;color: #282a3c;}

.modalmain{padding: 20px 60px 40px;}
.modalmain>p{margin-bottom: 20px;font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;}
.modalmain>p>span{font-size: 14px;color: #191919;width: 90px;display: inline-block;text-align: right;margin-right: 10px;}
.modalmain>p.last{margin: -10px 0 40px;}
.btn4{width: 74px;margin-left: 110px;border-radius: 0;font-size: 14px;line-height: 22px;}
.addlist{background: #f6f6f6;margin-left: 10px;padding: 6px 0 6px 16px;width: 450px;transform: translateY(-10px);margin-bottom: 10px;}
.addlist span{color: #8c8c8c;margin-right: 20px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;}
</style>