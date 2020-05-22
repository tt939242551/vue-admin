<template>
  <div class="single">
    <div v-show="isadds">
     <!--  <div id="topbar">
        <p class="title">单品管理</p>
        <Input search v-model="searchvalue" @on-search="getSingleList(1)" class="topsearch" size="small" enter-button="搜索" placeholder="搜索" />
      </div> -->
      <div class="tabbox" id="tabbox">
            <div class="addbtn">
               <Button @click="addList"  type="primary" class="btn1"><Icon size="16" style="transform: translateY(-1px)" type="md-add" />新增</Button>
            </div>
            <Table
              stripe
              :ref="'selection'+ i"
              :columns="columns1"
              :data="data1.item"
              @on-selection-change="selectionChange"
            >
             <template slot-scope="{ row, index }" slot="goodsimg">
                  <div style="height:78px;padding-top:4px">
                    <img style="width:125px;height:70px"  :src="data1.item[index].picture" alt="">
                  </div>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                 <span class="acbtn" style="margin-right: 20px" @click="show(index)">修改</span><span class="acbtn" @click="movelistindex(index)" >删除</span>
                
              </template>
             <template slot-scope="{ row, index }" slot="isbanner">
                  <Checkbox @on-change="settop(index)" v-model="data1.item[index].isbanner"></Checkbox>
              </template> 
            </Table>
            <span class="acbtn2" @click="xModal5=isCheck.length===0?false:true" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选择新闻</span>
        <div class="foot">
          <Page :total="total" :current="page" prev-text="上一页" next-text="下一页" @on-change="getlist" />
        </div>
      </div>
         <Modal footer-hide v-model="xModal4" width="380" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除该新闻？</p>
              <p>删除后数据将不可恢复。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -6px;">
              <Button style="width:80px" type="primary" @click="movelist">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal4=false">取消</Button>
          </div>
        </Modal>
        <Modal footer-hide v-model="xModal5" width="380" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除选中新闻？</p>
              <p>删除后数据将不可恢复。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -6px;">
              <Button style="width:80px" type="primary"  @click="removeList">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
          </div>
        </Modal>
    </div>
    <div v-show="!isadds">
     
      <p v-if="data1.item" class="title">生活美学 > {{tindex===data1.item.length?"新增":"修改"}}</p>
      
      <div class="main">
          <h6>标题</h6>
           <Input style="width:420px;border-radius: 4px;font-size: 14px"  v-model="mtitle1" placeholder="请输入标题"/>
           <h6>摘要</h6>
           <Input :rows="2" type="textarea" style="width:420px;border-radius: 4px;font-size: 14px"  v-model="mtitle2" placeholder="请输入摘要"/>
       <!--    <h6>发布时间</h6>
         <DatePicker type="date" :value="timeval1" placeholder="设置日期" @on-change="gettimeval1" style="width: 218px;margin-right: 34px"></DatePicker>
          <TimePicker type="time" :value="timeval2"  @on-change="gettimeval2" placeholder="设置时间" style="width: 168px"></TimePicker> -->
         <h6>图片</h6>
         <div style="width:375px;height:210px;background: #000;border-radius: 4px;"><img style="width:375px;height:210px" :src="imgUrl" alt=""></div>
         <p>图片大小  375*210</p> 
         <Button v-if="imgUrl" class="acbtn" size="small" style="width:80px" @click="addimg()">修改图片</Button>
          <Button v-else class="acbtn" size="small" style="width:80px;" @click="addimg()">添加图片</Button>
           <h6 style="margin: 50px 0 20px;font-size: 14px;">新闻详情</h6>
          <Uediter :catchData="catchData" :content="content" ref="ue"></Uediter>
       
         <Button type="primary" class="samintbtn" @click="postSpecial">确定</Button><Button class="samintbtn" @click="isadds=true">取消</Button> 
         <input type="file" ref="uploadfiles" class="inputer" @change="fileChange" multiple="multiple"/>
      </div>
        
    </div>
  </div>
</template>

<script>
import Uediter from "@/components/ue.vue";
export default {
  name: "LifeStyle",
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "图片",
          slot: "goodsimg",
          align: "center",
          width: 200,
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "生成时间",
          key: "adddate",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 200,
          align: "center"
        },
         {
          title: "Banner展示",
          slot: "isbanner",
          width: 160,
          align: "center"
         } 
      ],
      data1: {},
      xModal4: false,
      xModal5: false,
      tvalue: 0,
      tindex: 0,
      isCheck: [],
      value: "",
      searchvalue:'',
      isadds: true,
      mtitle1: "",
      mtitle2: "",  
      timeval1:"",
      timeval2:"",
      page:1,
      pageSize:10,
      total:1,
      content: " ",
      imgUrl:""
    };
  },
   components: { Uediter },
   beforeRouteEnter (to, from, next) {
      next(vm => {
       vm.page =1;
      vm.isadds = true;
      vm.getInit();
     })
    },
  methods: {
     //初始化
    getInit(n){
       if (n) {
         this.page = n
       }else{ this.page = 1}
      this.$axios.post("/admin/common/Aestheticslife.ashx?action=selectlist",this.$qs.stringify({page:this.page,pageSize:this.pageSize,where:this.searchvalue})).then(res=>{
         if (res.status>=0) {
             this.data1 = res.item[0];
              this.data1.item.forEach(i=>{
               i.setdate =  i.adddate.split(" ")
            }); 
             this.total = res.totalCount
         }else{
           this.$Message.warning(res.content); 
         } 
       }).catch(()=>{        
         } )
    },
    //编辑单品初始化
    show(index) {
      this.tindex = index;
      this.mtitle1 = this.data1.item[index].title;
      this.timeval1 = this.data1.item[index].setdate[0];
      this.timeval2 = this.data1.item[index].setdate[1];
       this.imgUrl = this.data1.item[index].picture;
      let id = this.data1.item[index].id;
       this.$axios.post("/admin/common/Aestheticslife.ashx?action=selectdetails",this.$qs.stringify({id:id})).then(res=>{
         if (res.status>=0) {
            this.mtitle2 = res.item[0].parenttitle;
             this.isadds = false;
            this.content = decodeURIComponent(res.item[0].details);
         }else{
           this.$Message.warning(res.content); 
         }
    
       }).catch(()=>{
              
         } )

    },
    // 分页
    getlist(index) {
      this.page = index;
      this.getInit(index)
    },
    //单品多选
    selectionChange(a) {
      this.isCheck = [];
      a.forEach(item => {
        if (this.isCheck.indexOf(item.id) < 0) {
          this.isCheck.push(item.id);
        }
      });
    },
  /*   //设置日期
    gettimeval1(t){
      this.timeval1 = t
    },
    //设置时间
    gettimeval2(t){
      this.timeval2 = t
    }, */
    //新增单品初始化
    addList() {
      this.tindex = this.data1.item.length;
      this.isadds = false;
       this.mtitle1 = "";
       this.mtitle2 = "";
       this.content = ' '
       this.timeval1 = ''
       this.timeval2 = ''
       this.imgUrl = ''
    },
    //批量删除
    removeList() {
       this.$axios.post("/admin/common/Aestheticslife.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(this.isCheck)})).then(res=>{
         if (res.status>=0) {
            this.xModal5 = false;
            this.getInit()
         }else if (res.status===-1)  {
           this.xModal5 = false;
         }else{this.$Message.warning(res.content); }
       }).catch(()=>{      
         } )
    },
    movelistindex(i){
          this.tindex = i;
          this.xModal4 = true
    },
    //删除
    movelist(){
      let url = "/admin/common/Aestheticslife.ashx?action=delete";
      let arr = [this.data1.item[this.tindex].id];
       this.$axios.post(url,this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
             this.xModal4 = false;
             this.getInit()
         }else if (res.status===-1)  {
           this.xModal4 = false;
         }else{this.$Message.warning(res.content); }
       }).catch(()=>{
         } )
    },
   //设置banner展示
    settop(i){
       this.$axios.post(
            "/admin/common/Aestheticslife.ashx?action=editisbanner",
            this.$qs.stringify({ id:this.data1.item[i].id ,isbanner: this.data1.item[i].isbanner})
          )
          .then(res => {
            if (res.status > 0) {
             let str = this.data1.item[i].isbanner ? "已开启" : "已关闭"
             this.$Message.success(str + "Banner展示")
            } else {
               this.getInit()
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});   
    },
  //设置商品描述
    catchData(html) {
      this.content = html;
    },
    //新增,编辑单品
    postSpecial(){
     if (this.mtitle1==="") {
       this.$Message.warning("标题必须填写");
       return
     }
     if (!this.imgUrl) {
       this.$Message.warning("必须上传图片");
       return
     }
    if (!this.content) {
       this.$Message.warning("未填写新闻详情");
       return
     }
   
       let url = "/admin/common/Aestheticslife.ashx?action=add"
       let pamls;

    if (this.tindex === this.data1.item.length) {
       pamls = {title:this.mtitle1,
       parentid:this.data1.id,
       parenttitle:this.mtitle2,
       picture:this.imgUrl,
       details:encodeURIComponent(this.content),
       }
     }else{
        let  id = this.data1.item[this.tindex].id;
        pamls = {title:this.mtitle1,
         parentid:this.data1.id,
       parenttitle:this.mtitle2,
       picture:this.imgUrl,
       details:encodeURIComponent(this.content),
       id:id}
     }
      this.$axios.post(url,this.$qs.stringify(pamls)).then(res=>{
         if (res.status>=0) {
           this.isadds = true
          this.getInit()
         }else{
           this.$Message.warning(res.content); 
         }
        }).catch(()=>{
              
         });
       
    },
   //上传图片
    addimg(index) {
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
        this.$axios
          ({
           url: "/admin/common/upload_ajax.ashx?action=UpLoadFiles",
           data: formData, method: 'post',
           headers: { 
          'Content-Type': 'multipart/form-data'
         }})
          .then(res => {
            if (res.status > 0) {
               this.imgUrl = res.data[0]
            } else {
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
  
    },
  },
};
</script>
<style>
.btnbox .ivu-btn.ivu-btn-small {
  color: #787878;
  width: 86px;
  border-radius: 4px;
}
.single .ivu-tag:not(.ivu-tag-border):not(.ivu-tag-dot):not(.ivu-tag-checked){border: 1px solid #c69c6d}
.single .ivu-tag-error, .ivu-tag-primary,.single .ivu-tag-success, .ivu-tag-warning{border: 1px solid #c69c6d}
/* #tabbox.tabbox .ivu-table-wrapper{border: none}
#tabbox.tabbox .ivu-table:before{height: 0;} */
</style>
<style scoped>
.single{margin-bottom: 50px;}

.title {
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
   padding: 10px 30px 20px ;
}
.ftitle{
  font-size: 14px;margin: 30px 0 10px;
}
.tabbox {
  background: #fff;
  padding: 30px 15px 80px 15px;
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
.foot {
  float: right;
  padding-top: 20px;
  padding-right: 30px;
}

.samintbtn {
  margin:  10px ;
  border-radius: 4px;
}
.main .samintbtn {
  margin:  20px 10px 60px ;
  width: 120px;
}
.postimg {
  display: flex;
  padding: 60px 0 20px 0;
}
.postimg p {
  margin: 0 15px;
  font-size: 15px;
  line-height: 36px;
}
.stitle {
  font-size: 18px;
  text-align: center;
  margin: 25px 0;
}
 .sinput {
  width: 240px;
  margin: 10px 0 40px 58px;
}
.inputer {
  width: 100px;
  height: 100px;
  display: none;
}
.addbtn {
  margin: 10px 0 30px;
}
.main{background: #fff;padding: 1px 30px;margin-bottom: 20px;box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);}
.main>p{margin: 10px 0;color: #999999;font-family: Microsoft YaHei;}
h6{font-size: 15px;margin-top: 50px;margin-bottom: 15px;font-weight: normal;}
.design{margin-bottom: 30px;}
.btn1{height: 32px;width: 100px;font-size: 14px;line-height: 16px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
</style>
