<template>
  <div  class="home">
     <div  v-show="isadds" id="topbar">
         <p class="title">
            <span>优惠券类型</span>
              <Select
               size="small"
              v-model="models[0]"
              @on-change="getselectlist(1)"
              style="width:160px;margin-right: 30px;"
              placeholder="请选择优惠券类型"
            >
              <Option value="">不限</Option>
              <Option v-for="(item,index) in itemrole" :value="index" :key="item">{{ item }}</Option>
            </Select>
            <span>生成时间</span>
            <DatePicker size="small" type="daterange"  @on-change="gettime"  :value="models[1]" split-panels placeholder="请选择时间" style="width: 200px"></DatePicker>
         </p>
         <span @click="tableToExcel" class="outup">导出<img src="../assets/imgs/bg06.png" alt=""></span> 
        <div class="inputbox"><Input size="small" @on-search="getselectlist(1)"  search class="topsearch"  v-model="models[2]"  enter-button="搜索" placeholder="搜索" /></div>
         
      </div>
   
    <div  v-show="isadds" class="tabbox">
        <Button type="primary" class="btn1" @click="show('add')" ><Icon size="16" style="transform: translateY(-2px)" type="md-add" />新增</Button>
        <Table stripe   :columns="columns1" :data="data1"  @on-selection-change="selectionChange" >
            <template slot-scope="{ row, index }" slot="action">
              <span class="acbtn" style="margin-right: 20px" @click="show(index)">修改</span><span class="acbtn" @click="moveuser(index)" >删除</span>
            </template>
        </Table>
        <p> <span class="acbtn2" @click="modal1=true" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选中优惠券</span></p>
      <div class="foot">
        <Page :total="total" :current="page" prev-text="上一页" next-text="下一页" @on-change="getlist" />
      </div>
    </div>
       <Modal footer-hide v-model="modal0" width="360" :styles="{top: '200px'}">
          <div  style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除该优惠券？</p>
              <p>删除后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary"  @click="movelist">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" @click="modal0=false">取消</Button>
          </div>
        </Modal>
         <Modal footer-hide v-model="modal1" width="360" :styles="{top: '200px'}">
          <div  style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除选中优惠券？</p>
              <p>删除后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary"  @click="removeList">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;"  @click="modal1=false">取消</Button>
          </div>
        </Modal>
    <div style="padding: 0 8px" v-show="!isadds">
       <p  class="title">优惠券 > {{index==='add'?"新增":"修改"}}</p>
       <h5>基本信息
          <span class="switch1">{{isopen?'已开启线下使用':'已开启线上使用'}}
            <template>
                  <i-switch :disabled="index!=='add'" @on-change="switchcoupon" style="transform: translateY(-2px);margin-left: 8px;" v-model="isopen" size="small"  />
            </template>
         </span>
       </h5>
      <div class="main">
          <span>优惠券名称：</span>
                 <i-input  style="width:160px;margin-right: 40px;"
                        type="text" v-model="formDate[0]"    clearable placeholder="请输入优惠券名称"> </i-input>
            
            <span>优惠券价格或折扣：</span>
                  <i-input  style="width:160px;margin-right: 40px;" 
                      :number="true"   type="text" v-model="formDate[1]"  clearable placeholder="请输入价格或折扣"> </i-input>
             <span>优惠券数量：</span>
                  <i-input  style="width:160px;margin-right: 40px;" 
                      :number="true"   type="text" v-model="formDate[2]"  clearable placeholder="请输入数量"> </i-input>          
          
           <p><span>数量限制：</span>
                  <i-input  style="width:160px;margin-right: 40px;" 
                     :number="true"   type="text" v-model="formDate[3]"  clearable placeholder="请输入限领次数"> </i-input></p>
            <p><span>满减设置：</span>
                  <i-input  style="width:160px" 
                     :number="true"   type="text" v-model="formDate[7]"  clearable placeholder="请输入满减价格"> </i-input></p>        
      </div>
       <h5>优惠券设置</h5>
      <div class="main">
         <span>券有效期：</span>
                 <DatePicker  type="daterange"  @on-change="gettimes"  :value="formDate[4]" split-panels placeholder="请选择时间" style="width: 200px;margin-right: 50px;margin-bottom: 15px;"></DatePicker>
          <span>优惠券类型：</span> 
               <Select v-model="formDate[5]" :disabled="index!=='add'" style="width:160px;margin-right: 15px;" @on-change="initcategory" placeholder="请选择类型">
                    <Option v-for="(item,index) in itemrole" :value="index" :key="item">{{ item }}</Option>
                </Select>
                 <Select v-show="formDate[5]&&formDate[5]>0" :disabled="index!=='add'" v-model="formDate[6]" @on-change="getBrand" filterable style="width:160px;margin-right: 15px;" placeholder="请选择品牌">
                    <Option v-for="item in brand" :value="item.guid" :key="item.guid">{{ item.title }}</Option>
                </Select>
                 <Select v-show="formDate[6]&&formDate[5]>0&&formDate[5]!==2" multiple :disabled="index!=='add'" v-model="categorylist" style="width:304px" placeholder="请选择类别">
                    <Option v-for="item in category" :value="item.guid" :key="item.guid">{{ item.title }}</Option>
                </Select>
                <Select v-show="formDate[6]&&formDate[5]==2" :disabled="index!=='add'" v-model="categoryguid" @on-change="getGoods" style="width:160px;margin-right: 15px;" placeholder="请选择类别">
                    <Option v-for="item in category" :value="item.guid" :key="item.guid">{{ item.title }}</Option>
                </Select>
                 <Select v-show="formDate[6]&&formDate[5]==2" multiple filterable :disabled="index!=='add'" v-model="goodsguidlist" @on-change="getGoods" style="width:304px" placeholder="请选择商品">
                    <Option v-for="item in goodslist" :value="item.guid" :key="item.guid">{{ item.title }}</Option>
                </Select>
         <h6>图片</h6>
         <div style="width:375px;height:210px;background: #000;border-radius: 4px;"><img style="width:375px;height:210px" :src="imgmodels" alt=""></div>
         <p>图片大小  375*210</p><br>
         <Button v-if="imgmodels" class="acbtn" size="small" style="width:80px" @click="addimg()">修改图片</Button>
          <Button v-else class="acbtn" size="small" style="width:80px;" @click="addimg()">添加图片</Button>
        
      </div>
        <Button type="primary" class="samintbtn" @click="postSpecial">确定</Button><Button class="samintbtn" style="margin-left: 16px;" @click="isadds=true">取消</Button>  
    </div>
      <input type="file" ref="uploadfiles" style="display:none" @change="fileChange"  multiple="multiple" />   
 </div>
</template>

<script>
export default {
    name: 'coupon',
    data(){
        return{
           index: 0, 
           models:[],
           data1:[],
           page:1,
           isCheck: [],
           isChecks: [],
          formDate:[],
          brand:[],
          category:[],
          categorylist:[],
          categoryguid:"",
          goodslist:[],
          goodsguidlist:[],
          itemrole:['全场通用','品牌通用','商品通用','折扣券'],
          imgmodels : "",
          pageSize:10,
          total:1,
          modal0:false,
          modal1:false,
          isadds: true,
          isopen:false,
          columns1: [
       {
          type: "selection",
          width: 60,
          align: "center"
        },
         {
          title: "优惠券名称",
          key: "title", 
          align: "center"
        },
        {
          title: "发券数量",
          key: "count",
          align: "center"
        },
       
        {
          title: "领券数量",
          key: "receivecount",
          align: "center"
        },
      
        {
          title: "生成时间",
          key: "adddate",
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

    beforeRouteEnter (to, from, next) {
      next(vm => {
         vm.isadds = true;
         vm.isCheck = [];
         vm.isChecks = [];
         vm.getselectlist();
        // vm.getitemrole()
     })
    },
    methods:{
      //初始化
     getselectlist(n){
       if (n) {
         this.page = n
       }else{ this.page = 1}
       let url = "/admin/common/coupon.ashx?action=selectlist";
      let arr = [];
       if (this.models[1]) {
           arr = this.models[1]
       }
       let params={page:this.page,pageSize:this.pageSize,coupontype:this.models[0],stardate:arr[0],enddate:arr[1],title:this.models[2]};
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>=0) {
            this.data1 = res.item;
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
     //时间段搜索订单
    gettime(t){
     this.models[1] = t;
     this.getselectlist()
    },
     gettimes(t){
     this.formDate[4] = t
    },
    //分页
    getlist(index) {
      this.page = index;
      this.getselectlist(index)
    },
    //新增,编辑优惠券初始化
    show(i){
      this.imgmodels = ''
      this.index = i;
      this.formDate = []
      this.categorylist = []
      this.goodsguidlist = []
      this.goodslist = []
      this.isopen = false
      if (i==='add') {
        this.category = []
        this.getBrand()
      }else{
         this.$axios.post('/admin/common/coupon.ashx?action=selectdetails',this.$qs.stringify({id:this.data1[i].id})).then(res=>{     
                    if (res.status === 1) {
                      this.formDate[4] = []
                      let msg = res.coupon[0];
                      this.brand = msg.brand
                      this.category = msg.category
                      this.goodslist = msg.commodity
                      this.$set(this.formDate,0,msg.title);
                      this.$set(this.formDate,1,msg.Price);
                      this.$set(this.formDate,2,msg.count);
                      this.$set(this.formDate,3,msg.limitcount);   
                      this.$set(this.formDate[4],0,msg.stardate.split(" ")[0]);
                      this.$set(this.formDate[4],1,msg.enddate.split(" ")[0]);
                      this.$set(this.formDate,5,msg.coupontype-0);
                      this.$set(this.formDate,7,msg.FullPrice); 
                      this.brand.forEach((item,i)=>{
                        if (item.isselect) {
                          this.$set(this.formDate,6,item.guid);
                        }
                      })
                      this.category.forEach((item,i)=>{
                        if (item.isselect) {
                          this.categoryguid = item.guid
                          this.categorylist.push(item.guid);
                        }
                      })
                       this.goodslist.forEach((item,i)=>{
                        if (item.isselect) {
                          this.goodsguidlist.push(item.guid);
                        }
                      })
                      this.imgmodels =  msg.picture
                      this.isopen = msg.isopenutl
                        } else {
                    this.$Message.error(res.content);
                        }
                    }).catch()
      }
       this.isadds = false;
    },
    //获取品牌列表
    getBrand(){
       if (this.index!=='add') {
         return
       } 
       this.$axios.post('/admin/common/coupon.ashx?action=brand',this.$qs.stringify({generalattributeguid:this.formDate[6]})).then(res=>{
          if (res.status>=0) {
            this.brand = res.brand
            this.category = res.category
            this.categorylist = []
            this.goodsguidlist = []
            this.categoryguid = ''
          }
       })
    },
    //初始化分类数据
    initcategory(){
      if (this.formDate[6]) {
         this.formDate[6] = ''
      }
      this.category = []
      this.categorylist = [] 
      this.goodsguidlist = []
      this.categoryguid = ''
    },
    //获取商品列表
    getGoods(){
       if (this.index!=='add') {
         return
       } 
        this.$axios
          .post(
            "/admin/common/commodity.ashx?action=selectbyid",
            this.$qs.stringify({ generalattributeid: this.formDate[6],parentcategoryid:this.categoryguid})
          )
          .then(res => {
            if (res.status >= 0) {
              this.goodslist = res.item;
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    //开启线下使用
    switchcoupon(){},
    //新增,编辑优惠券
    postSpecial(){
           if (this.formDate[5]>0&&this.formDate[5]!=2&& this.categorylist.length ==0 ) {
             this.$Message.error("分类必须选择")
             return
           }
           if (this.formDate[5]==2&& this.goodsguidlist.length ==0 ) {
             this.$Message.error("商品必须选择")
             return
           }
           if (this.formDate[5]==3  ) {
             if(this.formDate[1]<=0||this.formDate[1]>=1){
                this.$Message.error("折扣要设置在0到1之间")
                return
             } 
           }
           if (this.formDate[5]==3&&this.formDate[7]  ) {
                this.$Message.error("折扣优惠券不能设置满减")
                this.$set(this.formDate,7,0); 
                return  
           }
           if (this.formDate[0]&&this.formDate[1]&&this.formDate[2]&&this.formDate[3]&&this.formDate[4]&&this.imgmodels) {
              let addparme = null;
              let url = '';
              let brandtitle = ''
              let categoryname = []
              this.brand.forEach((item,i)=>{
                        if (item.guid == this.formDate[6]) {
                          brandtitle = item.title
                        }
                      })
              this.category.forEach((item,i)=>{
                     if (this.categorylist.indexOf(item.guid) >=0 ) {
                          categoryname.push(item.title);
                       }
                    })
              if(this.index==="add"){
                url = '/admin/common/coupon.ashx?action=add';
                addparme = {title:this.formDate[0],Price:this.formDate[1],count:this.formDate[2],limitcount:this.formDate[3],stardate:this.formDate[4][0],enddate:this.formDate[4][1],coupontype:this.formDate[5],brandguid:this.formDate[6]?this.formDate[6]:'',
                FullPrice:this.formDate[7],brandtitle,categoryname:JSON.stringify(categoryname),categoryguid:JSON.stringify(this.categorylist),commodityguid:JSON.stringify(this.goodsguidlist),picture:this.imgmodels,isopenutl:this.isopen}
              } else{
                  url = '/admin/common/coupon.ashx?action=edit';
                  addparme = {id:this.data1[this.index].id,title:this.formDate[0],Price:this.formDate[1],count:this.formDate[2],limitcount:this.formDate[3],stardate:this.formDate[4][0],enddate:this.formDate[4][1],picture:this.imgmodels, FullPrice:this.formDate[7],}
              }  
               this.$axios.post(url,this.$qs.stringify(addparme)).then(res=>{     
                    if (res.status >= 0) {
                         this.isadds = true
                        this.getselectlist();
                        } else {
                    this.$Message.error(res.content);
                        }
                    }).catch()
           }else{this.$Message.error("请填写所有必填信息")}
      },
    //删除优惠券弹窗
      moveuser(i){
        this.index = i;
        this.modal0 = true
      },
    //删除优惠券 
     movelist(){
      let url = "/admin/common/coupon.ashx?action=delete";
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
          "/admin/common/coupon.ashx?action=delete",
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

    //用户多选
    selectionChange(a) {
      this.isCheck = [];
      this.isChecks = [];
      a.forEach(item => {
        if (this.isCheck.indexOf(item.id) < 0) {
          this.isCheck.push(item.id);
          if (item.isopenutl==1) {
             this.isChecks.push(item.id)
          }
        }
      });
    },
     // 图片上传
    addimg() {
      this.$refs.uploadfiles.click();
      this.$refs.uploadfiles.value = ''
    },
    //文件流上传图片
     fileChange(event) {
      if (!event.target.files[0].size) return;
      let files = event.target.files;
      // 批量上传
       let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        // 单张上传
        formData.append("file"+i,files[i])
      } 
       this.$Loading.start();
        this.$axios
          ({
           url: "/admin/common/upload_ajax.ashx?action=UpLoadFiles",
           data: formData, method: 'post',
           headers: { 
          'Content-Type': 'multipart/form-data'
         }})
          
          .then(res => {
            if (res.status > 0) {
               this.$Loading.finish();
              this.imgmodels = res.data[0];
            } else {
               this.$Loading.error();
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
  
    },
 tableToExcel(){
      //要导出的json数据
      if (this.isCheck.length==0) {
         this.$Message.warning("请选择要导出的优惠券");
         return
      }
       if (this.isChecks.length<this.isCheck.length) {
         this.$Message.warning("线上使用优惠券不能导出");
         return
      }
       let url = "/admin/common/coupon.ashx?action=exportlist"
       let jsonData = []
       let params={ids: JSON.stringify(this.isCheck)}
       let str = '<tr><td>优惠券名称</td><td>优惠券码</td><td>生成时间</td></tr>';
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>=0) {
            jsonData = res.coupon
            jsonData.forEach(item=>{
            str+=`<tr><td>${item.coupontitle + '\t'}</td><td>${item.couponcode + '\t'}</td><td>${item.adddate + '\t'}</td></tr>`;     
            })
                  //Worksheet名
          let worksheet = '优惠券信息'
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
  padding-top: 80px;
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
.switch1{
  font-size: 12px;
  float: right;
  margin-right: 10px;
  margin-top: 5px;
}
.addbtn {
  margin: 10px 0 30px;
}
.foot {
  float: right;
  padding: 20px;
}
.btn1{color: #fff;font-size: 14px;height: 28px;line-height: 14px;position: absolute;top:105px;left: 20px;width: 100px;}
.inputbox{vertical-align: middle;float: right;margin: 5px 20px;}
.x_label{width: 310px;display: inline-block;font-size: 16px;margin: 20px 100px 10px 20px;}
.x_label p {width: 100px;line-height: 32px;display: inline-block;}
.postimg{display: flex;padding: 10px 0 20px 20px;flex-wrap: wrap}
.postimg p {margin: 0 15px; font-size: 15px;line-height: 36px;}
.headtext{font-size: 20px;color: #282a3c;}
.main{background: #fff;padding: 30px 30px;margin-bottom: 20px;}
.main>p{margin: 10px 0;color: #999999;font-family: Microsoft YaHei;display: inline-block;}
.main>p>span{margin: 10px 0;color: #515a6e;font-family: Microsoft YaHei;}
h6{font-size: 15px;margin-top: 50px;margin-bottom: 15px;font-weight: normal;}
h5{font-size: 15px;font-weight: normal;border-bottom:1px solid #dcdee2;background: #fff;padding: 16px 12px;}
.design{margin-bottom: 30px;}
.btn1{height: 32px;width: 100px;font-size: 14px;line-height: 16px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
.samintbtn {
  margin:  20px 10px 40px 30px;
  width: 100px;
}
</style>