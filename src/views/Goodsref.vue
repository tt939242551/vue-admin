<template>
    <div id="goodsref">
      <div :class="{tabbar:true,shows:tabs.length}">
        <span v-show="tabs.length===0" class="tabspan">暂无数据</span>
        <span @click="xModal=true"  style="cursor: pointer;float: right;color: #c69c6d;font-size: 14px;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span>  
        <span @click="addgoodst" style="margin-right: 10px;cursor: pointer;float: right;color: #c69c6d;font-size: 14px;"><Icon class="icons" size="18" type="md-add" />新增</span>
      </div>
      <div class="tabsbox">
        <Tabs v-model="tvalue" v-if="tabs.length">
            <TabPane :label="items.title.trim()" v-for="(items,i) in tabs" :key="i">
                <div class="imglistbox1" v-if="items.item.length===5">
                 <div class="imgbox1" v-for="(item,j) in items.item" :key="j">
                   <div class="itembox">
                      <span style="width: 220px;height: 220px;display:inline-block;vertical-align: top;text-align: center;"><img v-if="item.commoditypictures1" style="max-width: 220px;max-height: 220px;border:none;" :src="item.commoditypictures1" alt=""> <img v-else  src="../assets/imgs/g2-bg.png" alt=""></span>
        
                      <p v-if="item.commodityname">{{item.commodityname}}</p><p v-else>商品名称</p>
                     <span  v-if="item.Price" class="itemnum">￥{{item.Price}}</span> <span v-else class="itemnum">  价格</span>
                  </div>
                   <p class="footer"> 
                     <span @click="showModal(j)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span>
                  </p>
                 </div>
               </div>
               <div class="imglistbox1" v-else>
                 <div :class="{imgbox1:true,farstimg:j===0}" v-for="(item,j) in items.item" :key="j">
                   <div v-if="j" class="itembox itembox2">
                      <span v-if="item.commoditypictures1"  style="width: 260px;height: 260px;display:inline-block;vertical-align: top;text-align: center;"><img  style="max-width: 260px;max-height: 260px;border:none;" :src="item.commoditypictures1" alt=""></span>
                     <img v-if="!item.commoditypictures1"  src="../assets/imgs/g2-bg.png" alt="">
                     <p v-if="item.generalattributename" class="logop">{{item.generalattributename}}</p><p class="logop" v-else>品牌</p>
                     <p v-if="item.commodityname">{{item.commodityname}}</p><p v-else>商品名称</p>
                  </div>
                  <div v-else class="itembox itembox2">
                     <img v-if="item.picture" :src="item.picture" alt="">
                     <img v-if="!item.picture"  src="../assets/imgs/g-bg.png" alt="">
                  </div>
                   <p class="footer"> 
                     <span @click="showModal(j)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span>
                  </p>
                 </div>
               </div>
               <p>
                 <template>
                    <i-switch @on-change="switchsth(i)" style="margin-left: 20px;margin-right: 8px;" v-model="items.isopen" size="small"  /> <span v-if="items.isopen">关闭展示</span><span v-else>开启展示</span>
                  </template>
               </p>
              
            </TabPane>
        </Tabs>
      </div>
       <input type="file" ref="uploadfiles" style="display:none" @change="fileChange"  multiple="multiple" />
         <Modal v-model="xModal1" width="490"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">新增商品推荐</div>
              <p><span style="">推荐标题</span>
              <i-input class="sinput" style="width:250px;margin-left: 10px;"
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入推荐标题"> </i-input>
              </p>
              <p><span style="vertical-align: top;margin-right: 10px;">推荐样式</span>
                 <RadioGroup v-model="styles">
                    <Radio :label="1">
                        <span style="padding-top:18px"  :class="{raspan:true,active:styles}"><img style="transform: translateY(24px)" src="../assets/imgs/g-1-1.png" alt=""></span>
                    </Radio>
                    <Radio :label="0">
                        <span  :class="{raspan:true,active:styles===0}"><img style="transform: translateY(35px)" src="../assets/imgs/g-1-2.png" alt=""></span>
                    </Radio>
                </RadioGroup>
              </p>
              <Button size="small" @click="isok1" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal footer-hide v-model="xModal" width="360">
          <div  v-if="tabs.length" style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否清空{{tabs[tvalue].title}}？</p>
              <p>清空后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="removebrandall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
          </div>
        </Modal>
         <Modal v-model="xModal2" width="420"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">编辑商品</div>
              <p><span>品 牌</span>
                <Select  @on-change="getcommodityList" placeholder="请选择品牌" v-model="Modal[0]" style="width:250px;margin-left: 10px;">
                        <Option value="" >不限</Option>
                        <Option v-for="(item,j) in generalattribute" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>类 别</span>
                <Select  placeholder="请选择类别" v-model="Modal[1]" style="width:250px;margin-left: 10px;"  @on-change="getCategory">
                        <Option value="" >不限</Option>
                        <Option v-for="(item,j) in parentcategory" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>单品名称</span>
                <Select  placeholder="请选择单品名称"  @on-change="getcommodityList" v-model="Modal[2]" style="width:250px;margin-left: 10px;">
                        <Option value="" >不限</Option>
                        <Option v-for="(item,j) in category" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>商品名称</span>
                <Select  placeholder="请选择商品名称" v-model="Modal[3]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in commodity" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal v-model="xModal3" width="480"  footer-hide :styles="{top: '100px'}">
            <div class="modalmain">
              <div class="mtitle">修改图片</div>
              <p><span>URL链接</span>
              <i-input class="sinput" 
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p style="position: relative;"><span style="vertical-align: top;">分类图片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/g-bg2.png" alt="">
                 <img @click="addimg()" class="bannerimg2" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok3" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'goodsref',
    data(){
        return{
           tvalue: 0,
           xModal:false,
           xModal1:false,
           xModal2:false,
           xModal3:false,
           parentcategory:[],
           generalattribute:[],
           commodity:[],
           category:[],
           tabs:[],
           Modal:[],
           imgmodels:"",
           goodsindex:0,
           styles:1,
           imgData: {accept: "image/gif, image/jpeg, image/png, image/jpg"},
        }
    },
     beforeRouteEnter (to, from, next) {
      next(vm => {
       vm.tvalue = 0
     })
    },
    mounted(){this.getgoodsinit()},
    methods:{
        getgoodsinit(){
          this.$axios
          .post("/admin/common/recommendationcommodity.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
             this.tabs = res.recommendationcommodity
             this.tabs.forEach(i=>{
                i.item.forEach((itmes)=>{ 
                if(itmes.commoditypictures1){ 
                     itmes.commoditypictures1 = itmes.commoditypictures1.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,20}\.[a-z]{3,4}/g)[0]  
                 }
              })
             })
             
            } else {
               if (res.status==-1008) {
                  localStorage.setItem("userName", '');
                 localStorage.setItem("token",""); 
                  this.$router.push({ path: this.redirect || "/statistics" });
              }
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
        isok1(){
            let arr = []
            if (this.styles===0) {
                 arr = [{},{},{},{}]
            }else{arr = [{},{},{},{},{}]}
           if (this.Modal[0]) {
            this.$axios
            .post("/admin/common/recommendationcommodity.ashx?action=add",this.$qs.stringify({ title: this.Modal[0] ,item: JSON.stringify(arr)}))
            .then(res => {
                if (res.status > 0) {
                 this.xModal1 = false
                  this.getgoodsinit()   
                this.$Message.success("新增商品推荐成功");
                } else {
                this.$Message.warning(res.content);
                }
            })
            .catch(() => {});
           }else{
               this.$Message.warning("推荐标题不能为空");
           }
        },
      isok2(){
      if (this.Modal[3]) {
          let  url = "/admin/common/recommendationcommodity.ashx?action=edit"
          let parem ={ id: this.tabs[this.tvalue].item[this.goodsindex].id,typeid:2 ,commodityguid:this.Modal[3]}
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >0) {
              this.getgoodsinit()
              this.xModal2 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
         }else{this.$Message.warning("商品不能为空");} 
       },
      isok3(){
      if (this.imgmodels) {
          let url =""
          let parem ={}
           url = "/admin/common/recommendationcommodity.ashx?action=edit"
           parem =  { picture: this.imgmodels, id: this.tabs[this.tvalue].item[this.goodsindex].id,typeid:1,urllink:this.Modal[0] }
          
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status > 0) {
              this.getgoodsinit()
              this.xModal3 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("图片必须上传");} 
    },
        removebrandall(){
            let arr = []
            arr.push(this.tabs[this.tvalue].id)
          this.$axios
          .post("/admin/common/recommendationcommodity.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(arr)}))
          .then(res => {
            if (res.status >= 0) {
            this.tvalue = 0
            this.xModal = false
             this.getgoodsinit()
            } else {
              this.$Message.warning(res.content);
              this.xModal = false
            }
          })
          .catch(() => {});
        },
     switchsth(i){   
            this.$axios.post("/admin/common/recommendationcommodity.ashx?action=editisopen",this.$qs.stringify({id:this.tabs[i].id}))
              .then(res => {
                if (res.status > 0) {
                } else {
                  this.$Message.warning(res.content); 
                }
              })
              .catch(() => {});  
    },   
    showModal(i){
      this.goodsindex = i
      this.Modal[0] = ""
      this.Modal[1] = ''
      this.Modal[2] = ''
      this.Modal[3] = ''
      this.editgoodsinit()
     
    },
      editgoodsinit(){
        let typeid = 2
       if (this.goodsindex==0&&this.tabs[this.tvalue].item.length==4) {
             typeid = 1      
                }
        this.$axios
          .post("/admin/common/recommendationcommodity.ashx?action=editinit",this.$qs.stringify({ id: this.tabs[this.tvalue].item[this.goodsindex].id ,typeid:typeid }))
          .then(res => {
            if (res.status > 0) {
              if (typeid == 1) {
                  this.imgmodels = res.recommendationcommodity[0].picture
                    this.Modal[0] = res.recommendationcommodity[0].urllink
                    this.xModal3 = true
              }else{
                  this.generalattribute = res.generalattribute[0].item
              this.generalattribute.forEach(i=>{
                if (i.isselect) {
                  this.Modal[0] = i.guid
                }
              })
             this.parentcategory = res.parentcategory
              this.parentcategory.forEach(item=>{
                if (item.isselect) {
                  this.Modal[1] = item.guid
                }
              })
              this.category = res.category
              this.category.forEach(item=>{
                if (item.isselect) {
                  this.Modal[2] = item.guid
                }
              })
              this.commodity = res.commodity
              this.commodity.forEach(item=>{
                if (item.isselect) {
                  this.Modal[3] = item.guid
                }
              })
                this.xModal2 = true
              
              }
            
     
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
     getCategory(guid) {
      this.Modal[2] = "";
      this.getcommodityList()
       if (guid) {
          let id 
         this.parentcategory.forEach(item=>{
           if (item.guid === guid) {
             id = item.id
           }
         })
        this.$axios
          .post(
            "/admin/common/category.ashx?action=selectby_parentid",
            this.$qs.stringify({ parentid: id })
          )
          .then(res => {
            if (res.status >= 0) {
              this.category = res.item;
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }

    },
    getcommodityList(){
      if (this.goodsindex!==0 || this.tabs[this.tvalue].item.length!==4) {
          this.Modal[3] = "";
         if (this.xModal2) {
        this.$axios
          .post(
            "/admin/common/commodity.ashx?action=selectbyid",
            this.$qs.stringify({ generalattributeid: this.Modal[0],parentcategoryid:this.Modal[1],categoryid:this.Modal[2]})
          )
          .then(res => {
            if (res.status >= 0) {
              this.commodity = res.item;
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        }
      }
     
    },
    addgoodst(){
        this.Modal[0] = ""
        this.xModal1 = true
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
       let formData = new FormData()
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
    //base64上传图片
    fileChanges(event) {
      if (!event.target.files[0].size) return;
      let file = event.target.files[0];
      this.imgmodel = [];
      this.fileAdd(file);
      setTimeout(() => {
        this.$Loading.start();
        this.$axios
          .post(
            "/admin/common/upload_ajax.ashx?action=UpLoadFile",
            this.$qs.stringify({ imglist: JSON.stringify(this.imgmodel) })
          )
          .then(res => {
            if (res.status >= 0) {
               this.$Loading.finish();
              this.imgmodels = res.data[0];
              
            } else {
               this.$Loading.error();
              this.$Message.warning("图片上传失败");
            }
          })
          .catch(() => {
             this.$Loading.error();
            this.$Message.warning("图片上传失败");
            });
      }, 100);
    },
        // 单张上传
    fileAdd(file) {
      // console.log(file);
      let type = file.type; //文件的类型，判断是否是图片
      let size = file.size; //文件的大小，判断图片的大小
      if (this.imgData.accept.indexOf(type) === -1) {
        this.$Message.warning("请选择我们支持的图片格式！");
        return false;
      }
      if (size > 3145728) {
        this.$Message.warning("请选择3M以内的图片！");
        return false;
      }
      let that = this;
      // 总大小
      this.size = this.size + file.size;
      let reader = new FileReader();
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(file);
      // 监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.onload = function() {
        file.src = this.result;
        // console.log(this); 这里的this是FileReader对象
        // 再把file对象添加到imgList数组
        that.imgmodel.push(this.result) ;
      };
    },
    },
}
</script>
<style >
 #goodsref .ivu-tabs-nav .ivu-tabs-tab{font-size: 16px;padding: 18px 18px;padding-top: 0;}
 .ivu-modal-body .ivu-radio-group{width: 320px;}
</style>
<style scoped>
   .tabsbox{background: #fff;padding: 40px 20px 20px;}
   .tabbar{position: absolute; background: #fff;padding: 0 20px;font-size: 14px;width: 100%;top: 10px;}
   .tabbar.shows{position: absolute;top: 42px;z-index: 100;width: 150px;right: 10px;}
   .raspan{background: #f2f3f8;display: inline-block;width: 280px;height: 150px;text-align: center;margin-bottom: 10px;border: 1px solid #fff}
   .raspan.active{border: 1px solid #c69c6d}

.modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;margin-top: 10px;}
.btn2{width: 100px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 20px;height: 32px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 20px;}
.modalmain>p>span{width: 60px;display: inline-block;}
.modalmain>p .sinput { width: 300px; margin: 10px 0 10px 10px;}


.imglistbox1{display: inline-block;margin-top: 10px;}
.imgbox1{display: inline-block;margin-right: 30px;margin-bottom: 30px;border: 1px solid #f0f0f0;vertical-align: top;}
.imgbox1 p{padding: 6px 12px 6px;font-size: 14px;color: #191919;}
.imgbox1>.footer>span{float: right;color: #c69c6d;margin-bottom: 10px;}
.imgbox1>.footer{padding: 10px 10px;border-top: 1px solid #f0f0f0;}
.imgbox1 p .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
.itembox{width: 220px;}
.itembox>p{height: 42px;overflow: hidden;padding: 0 10px;}
.farstimg .itembox.itembox2>img{border:none;margin-bottom: -146px;position: relative;z-index: 9}
.itemnum{border-top: 1px solid #c69c6d;padding-top: 4px;margin: 10px 10px;display: inline-block;padding-right: 5px;}
.itembox.itembox2{text-align: center;width: 260px;height: 420px;}
.itembox.itembox2>img{max-width: 260px;max-height: 420px;border:none;}
.itembox2 .logop{text-align: center;color: #c69c6d;padding: 10px  0 2px;margin: 0 5px;border-top: 1px solid #c69c6d;}
.itembox2>p:nth-child(3){padding-top: 0;height: 100px;}
.modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;margin-top: 10px;}
.btn2{width: 100px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 20px;height: 32px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 20px;}
.modalmain>p>span{width: 60px;display: inline-block;}
.modalmain>p .sinput { width: 300px; margin: 10px 0 10px 10px;}
.bannerbgimg{margin-left: 10px;}
.bannerimg2{position: absolute;width: 248px;height: 400px;top: 0;left: 70px;}
.itemp{height: 54px;}
.icons{transform: translateY(-1px);}
</style>