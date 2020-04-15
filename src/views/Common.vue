<template>
  <div id="general">
      <div id="topbar">
        <p class="title">通用属性</p>
        <Input search  v-model="searchvalue" @on-search="getselectlist(1)" class="topsearch" size="small" enter-button="搜索" placeholder="搜索" />
      </div>
    <div class="tabbox">
      <Tabs v-model="tvalue" >
        <TabPane v-for="(tab,i) in tabs" :key="i" :label="tab.title" icon="md-radio-button-on">
          <div class="addbtn">
            <Button v-show="tabs[0]" @click="addList"  type="primary"  size="small" class="btn1"><Icon size="16" style="transform: translateY(-1px)" type="md-add" />新增{{tab.title}}</Button>
          </div>
          <Table stripe  :ref="'selection'+i" :columns="columns1" v-show="isredin" :data="data1" @on-selection-change = "selectionChange">
            <template slot-scope="{ row, index }" slot="action">
              <span class="acbtn" style="margin-right: 20px" @click="show(index)">修改</span><span class="acbtn" @click="movelist(index)" >删除</span>
            </template>
          </Table>
          <span class="acbtn2" @click="removelist" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选择{{tab.title}}</span>
        </TabPane>
        
      </Tabs>
      <div class="btnbox">
        <Button style="color:#c69c6d;border: none;margin-top: 5px;" @click="handleTabsAdd" size="small"><Icon  style="transform: translateY(-2px)" size="16" type="md-add" />新增属性</Button>
          <Button v-show="tvalue!==0" style="color:#c69c6d;border: none;margin-top: 5px;" @click="xModal3 = true" size="small" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除</Button>
        
      </div>

      <div class="foot">
        <Page :total="total" :current="page" prev-text="上一页" next-text="下一页" @on-change="getlist" />
      </div>
    </div>
    <Modal width="360" footer-hide v-model="xModal2" :styles="{top: '200px'}">
        <p class="stitle">新增通用属性</p>
        <Input class="sinput" v-model="value" placeholder="请输入通用属性名称" />
        <Button type="primary" class="samintbtn" @click="isok2" style="width:120px;margin-left: 102px;margin-bottom: 30px;">提交</Button>
    </Modal>
     <Modal footer-hide v-model="xModal3" width="360" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 20px 0;">
              <p>请确认是否删除通用属性的名称？</p>
              <p>删除后数据不可恢复。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -12px;">
              <Button style="width:80px" type="primary"  @click="removeTabs">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn2" @click="xModal3=false">取消</Button>
          </div>
      </Modal>
    <Modal  footer-hide v-model="xModal" :styles="{top: isshow?'40px':'200px',width:'500px'}">
         <p slot="header" class="headtext">
            编辑{{text1}}
        </p>
      <label class="x_label">
        <p>{{text1}}</p>
        <Input v-model="value1" style="width:200px;margin-left:5px;"  :placeholder="'请输入'+text1+'名称'" />
      </label>
      <label class="x_label">
        <p>设置日期</p> 
        <DatePicker type="date" placeholder="设置时间" transfer :value="value2" @on-change="gettimeval" style="width: 200px;margin-left:5px;"></DatePicker>
      </label>
      <div class="postimg" v-show="isshow">
          <p>{{text1}}图</p>
          <upload :limit="1" :imgsrc="imgval1" :size="size1" style="margin: 0  150px 20px 0"
         @imgs="getImgUrl1"></upload> <br>
          <p style="margin-left:15px">LOGO</p>
       <upload :limit="1" :imgsrc="imgval2" :size="size2" class="imgupload"
         @imgs="getImgUrl2"></upload>
      </div>
        
      <Button style="width: 80px;margin-right:20px;margin-left: 102px;" type="primary" class="samintbtn" @click="isok1">提交</Button>
      <Button style="width: 80px;" @click="xModal=false">返回</Button>
    </Modal>
  </div>
</template>

<script>
import Upload from "../components/Upload"
export default {
  name: "msg",
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "名称",
          key: "title",
          align: "center"
        },
        {
          title: "生成时间",
          key: "setdate",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      tabs:[],
      data1:[],
      xModal: false,
      xModal2: false,
      xModal3: false,
      tvalue: 0,
      tindex: 0,
      isCheck:[],
      value: '',
      value1: '',
      value2: '',
      searchvalue: '',
      titles:[],
      text1:"",
      imgval1: "",
      imgval2: "",
      page:1,
      pageSize:10,
      total:1,
      isredin: false,
      size1: "278px*374px",
      size2: "220px*88px",
      isshow:false,
    };
  },
  components :{Upload},
  created(){this.gettlist()},
  computed:{

  },
  methods: {
    //通用属性初始化
    //获取通用属性分类
    gettlist(){
       let url = "/admin/common/generalattribute.ashx?action=selectlist"
       let params={page:'0',pageSize:'0',parentid:"0",}
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>=0) {
            this.tabs = res.item
            this.titles = []
            if (this.tabs[0].ispicture==='1') {
              this.isshow = true
            }
            this.tabs.forEach(i=>{
              this.titles.push(i.title)
            })
            this.getselectlist()
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
    //获取选中通用属性下数据
    getselectlist(n){
        if (n) {
         this.page = n
       }else{ this.page = 1}
       let url = "/admin/common/generalattribute.ashx?action=selectlist"
       let params={page:this.page,pageSize:this.pageSize,parentid:this.tabs[this.tvalue].id,title:this.searchvalue}
       this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
         if (res.status>=0) {
            this.data1 = res.item
            this.data1.forEach(i=>{
             i.setdate = i.setdate.match(/20\d{2}\/\d{1,2}\/\d{1,2}/)[0]
            })
            this.total = res.totalCount
               setTimeout(()=>{
           this.isredin = true
          },200)
         }else{
           this.$Message.warning(res.content); 
         }
        
       }).catch(()=>{
              
         } )
    },
    //删除通用属性
     removeTabs(){
      let arr = []
      arr.push(this.tabs[this.tvalue].id)
       this.$axios.post("/admin/common/generalattribute.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
           this.xModal3 = false
            this.gettlist()
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
              
         } )
    },
  //新增通用属性弹窗
   handleTabsAdd() {
      this.value = ""
      this.xModal2 = true;
    },
    //删除多条选中数据
    removelist(){
      let url = "/admin/common/generalattribute.ashx?action=delete"
       this.$axios.post(url,this.$qs.stringify({ids: JSON.stringify(this.isCheck)})).then(res=>{
         if (res.status>=0) {
            this.getselectlist()
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
         } )
    },
    //删除单条数据
    movelist(i){
      let url = "/admin/common/generalattribute.ashx?action=delete"
      let arr = [this.data1[i].id]
       this.$axios.post(url,this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
            this.getselectlist()
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
         } )
    },
    gettimeval(t){this.value2=t},
    //修改单条数据初始化
    show(index) {
      this.tindex = index;
      let i = this.tvalue
      this.text1 = this.titles[i]
      this.imgval1 = ""
      this.imgval2 = ""
      this.xModal = true
      if(index!==this.data1.length){
      this.$axios.post("/admin/common/generalattribute.ashx?action=selectdetails",this.$qs.stringify({id:this.data1[index].id})).then(res=>{
         if (res.status>=0) {
            this.imgval1 = res.item[0].picture.replace(/,$/,"")
            this.imgval2 = res.item[0].logo.replace(/,$/,"")
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{     
         } )
      this.value1 = this.data1[index].title 
      this.value2 = this.data1[index].setdate 
      }else{
        this.value1=''
        this.value2=''
      }
    },
    //分页
    getlist(index) {
       this.page = index
      this.getselectlist(index)
    },
    //多选框
    selectionChange(a){
      this.isCheck = []
     a.forEach((item)=>{
       if(this.isCheck.indexOf(item.id)<0){
         this.isCheck.push(item.id)
       }
     })
    },
    //新增单条数据
    addList(){
    let i = this.data1.length
    this.show(i)
    },
     //新增,修改单条数据
    isok1(){
        let url = ""
        let pamel ={}
        if ( this.tindex === this.data1.length) {
            url = "/admin/common/generalattribute.ashx?action=add"
            pamel = {title:this.value1,parentid:this.tabs[this.tvalue].id,setdate:this.value2,picture:this.imgval1,logo:this.imgval2}
        }else {
            url = "/admin/common/generalattribute.ashx?action=edit"
            pamel = {id:this.data1[this.tindex].id,title:this.value1,setdate:this.value2,picture:this.imgval1,logo:this.imgval2}
        }
        if(this.value1 && this.value2){
         this.$axios.post(url,
         this.$qs.stringify(pamel)).then(res=>{
         if (res.status>=0) {
         this.getselectlist()
         this.xModal=false
         
         }else{
           this.$Message.warning(res.content); 
         }
       }) 
        }else{this.$Message.warning('输入数据不能为空');}
    },
     //新增通用属性
    isok2() {
      if (this.value) {
        this.$axios.post("/admin/common/generalattribute.ashx?action=add",this.$qs.stringify({title:this.value, parentid:0,setdate:"",
        })).then(res=>{
         if (res.status>=0) {
         this.gettlist()
         }else{
           this.$Message.warning(res.content); 
         }
        }).catch(()=>{
              
         })
        this.xModal2 = false;
      } else {
        this.$Message.warning("输入数据不能为空");
      }
    },
    //上传品牌图
   getImgUrl1(file) {  
    this.UpLoadimg(file,'imgval1') 
    },
    //上传logo图
   getImgUrl2(file) { 
     this.UpLoadimg(file,'imgval2')  

    },
    //上传图片
    UpLoadimg(file,t){
        if (file) {
         let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
        let that = this;
      // 监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
        reader.onload = function() {
          let imgarr =  [this.result]
         that.$axios.post("/admin/common/upload_ajax.ashx?action=UpLoadFile",that.$qs.stringify({imglist: JSON.stringify(imgarr)})).then(res=>{
         if (res.status>=0) {
           that[t] = res.data[0]
         }else{
           that.$Message.warning(res.content); 
         }
       }).catch(()=>{
        })};
      }else{
        this[t] = ''
      }
     
    },
/*     getImgUrl2(file) {
      if (file) {
             let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
        reader.readAsDataURL(file);
        let that = this;
      // 监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
         reader.onload = function() {
        let imgarr =  [this.result]
         that.$axios.post("/admin/common/upload_ajax.ashx?action=UpLoadFile",that.$qs.stringify({imglist: JSON.stringify(imgarr)})).then(res=>{
         if (res.status>=0) {
           that.imgval2 = res.data[0]
         }else{
           that.$Message.warning(res.content); 
         }
       }).catch(()=>{
        }) 
      }
      }else{
        this.imgval2 = ""
      }

    } */
  },
  watch : {
      tvalue : function(){
      this.isCheck = []
      this.page = 1
       this.searchvalue = ''
      this.isshow = false
      if (this.tabs[this.tvalue].ispicture==='1') {
              this.isshow = true
            }
      this.getselectlist()
      this.isredin = false
    }
  }
};
</script>
<style>
/*  #general .ivu-tabs-ink-bar{background-color: #c69c6d ;}
  #general .ivu-tabs-nav .ivu-tabs-tab-active{color: #c69c6d ;} */
.btnbox .ivu-btn.ivu-btn-small {
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
.imgupload{transform: scale(.89) translate(-16px,-7px)}
#topbar {
  padding: 10px 15px 20px;
}
.title {
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
}
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
  top: 65px;
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
  padding-top: 20px;
}
.x_label{width: 310px;display: inline-block;font-size: 16px;margin: 20px 100px 10px 20px;}
.x_label p {width: 76px;line-height: 32px;display: inline-block;text-align: center;}
.samintbtn{margin: 30px 10px 30px 32px;}
.postimg{display: flex;padding: 10px 0 20px 20px;flex-wrap: wrap}
.postimg p {margin: 0 23px 0 15px; font-size: 15px;line-height: 36px;}
.headtext{font-size: 20px;color: #282a3c;}
.btn1{height: 32px;font-size: 14px;line-height: 16px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
</style>
