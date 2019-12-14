<template>
  <div class="home">
     <div class="order">
       <div v-show="tvalue<3" class="switch1">开启{{tabs[tvalue]}} 
         <template>
              <i-switch @on-change="switchsth" style="transform: translateY(-2px);margin-left: 8px;" v-model="isopen" size="small"  />
          </template>
       </div>
        <Tabs v-model="tvalue">
            <TabPane label="Banner" >
               <img @click="showModal('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox">
                 <div class="imgbox" v-for="(items,i) in bannerList" :key="i">
                   <img style="width: 542px;height: 174px;" :src="items.bannerpicture" alt="">
                   <p> 
                     <Select @on-change="setsort(i)" size="small" placeholder="" v-model="model[i]" style="width:48px;">
                        <Option v-for="(item,j) in items.sort" :value="item.id" :key="j+1">{{item.sort}}</Option>
                     </Select>
                     <span><span @click="showModal(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removebanner(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
               </div>
              <input type="file" ref="uploadfiles" style="display:none" @input="fileChanges"  multiple="multiple" />
            </TabPane>
            <TabPane label="商品分类" >
              <img style="float: right; margin: 20px 10px 20px 0" src="../assets/imgs/b-3.png" alt="">
              <div class="main2">
                <div class="s2imgbox1">
                  <div class="imgbox1" v-if="goodsList[0]">
                    <img :src="goodsList[0].Picture" alt="">
                    <div class="hovbox">
                      <span>{{goodsList[0].maintitle}}</span>
                      <p>{{goodsList[0].vicetitle}}</p>
                    </div>
                  </div>
                  <p class="footp"><span @click="showModal2(0)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span></p>
                </div>
                <div class="s2imgbox2"  >
                  <div  v-for="(item,i) in  goodsList" :key="i" v-show="i">
                    <div class="imgbox2" style="margin-right: 15px;">
                      <img :src="item.Picture" alt="">
                      <div class="hovbox">
                         <span>{{item.maintitle}}</span>
                         <p>{{item.vicetitle}}</p>
                       </div>
                    </div>
                    <p class="footp"><span @click="showModal2(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span></p>
                  </div> 
                </div>
              </div>
              
            </TabPane>
            <TabPane label="广告位" >
                <img style="float: right;margin: 20px 10px 20px 0" src="../assets/imgs/b-6-1.png" alt="">
                <div class="s3imgbox1">
                  <div class="imgbox3" v-if="advertising">
                    <img :src="advertising.picture" alt="">
                  </div>
                  <p class="footp"><span @click="showModal3" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
            </TabPane>
            <TabPane label="其他" >
                 <img style="float: right;margin: 0 10px 20px 0" src="../assets/imgs/b-7.png" alt="">
                 <section>
                   <p :class="{active:editindex===1}">顶部<span v-show="!isedit" @click="editindexs(1)"  style="cursor: pointer;float: right;font-size: 14px;"><Icon class="icons" size="20" type="ios-create-outline" />修改</span></p>
                   <div v-if="editindex !== 1">
                     <p><span>欢  迎  语:</span>{{otherList.welcomespeech}}</p>
                     <p><span>贵宾专线:</span>{{otherList.VIPline}}</p>
                   </div>
                   <div v-else>
                     <p><span>欢  迎  语:</span> <i-input class="sinput" 
                        type="text" v-model="otherList.welcomespeech"  clearable > </i-input>
                      </p>
                     <p><span>贵宾专线:</span> <i-input class="sinput" 
                        type="text" v-model="otherList.VIPline"  clearable > </i-input>
                     </p>
                      <Button type="primary" @click="getotheredit" style="width:80px;margin: 10px 0 15px 72px;">提交</Button>
                      <Button  @click="closeotheredit" style="width:80px;margin: 10px 0 15px 20px;border-color: #c69c6d;color: #c69c6d;">取消</Button>
                   </div>
                 </section>
                 <section>
                   <p :class="{active:editindex===2}">底部<span v-show="!isedit" @click="editindexs(2)"  style="cursor: pointer;float: right;font-size: 14px;"><Icon class="icons" size="20" type="ios-create-outline" />修改</span></p>
                   <div v-if="editindex !== 2">
                     <p><span>联系方式:</span>{{otherList.Telephone}}</p>
                     <p><span>电子邮箱:</span>{{otherList.email}}</p>
                   </div>
                   <div v-else>
                     <p><span>联系方式:</span> <i-input class="sinput" 
                        type="text" v-model="otherList.Telephone"  clearable > </i-input>
                      </p>
                     <p><span>电子邮箱:</span> <i-input class="sinput" 
                        type="text" v-model="otherList.email"  clearable > </i-input>
                     </p>
                      <Button type="primary" @click="getotheredit" style="width:80px;margin: 10px 0 15px 72px;">提交</Button>
                      <Button  @click="closeotheredit" style="width:80px;margin: 10px 0 15px 20px;border-color: #c69c6d;color: #c69c6d;">取消</Button>
                   </div>
                 </section>
                 <section>
                   <p :class="{active:editindex===3}">搜索<span v-show="!isedit" @click="editindexs(3)"  style="cursor: pointer;float: right;font-size: 14px;"><Icon class="icons" size="20" type="ios-create-outline" />修改</span></p>
                   <div v-if="editindex !== 3">
                     <p><span>搜索广告:</span>{{otherList.advertisement}}</p>
                     <p><span>提示标签:</span><span class="switchurl" v-for="item in otherList.tipsLabel" :key="item.id">{{item.title}}<Icon v-show="item.urllink" class="urlicon" size="15" type="ios-link" /></span></p>
                   </div>
                   <div v-else>
                     <p><span>搜索广告:</span> <i-input class="sinput" type="text" v-model="otherList.advertisement"  clearable > </i-input>
                      </p>
                     <p><span>提示标签:</span><Button @click="otherList.tipsLabel.push({})" size="small" type="primary" style="width:80px;margin: 10px 0 15px 0;"><Icon size="18" type="md-add" /></Button>
                         <span style="display:block;margin-left: 70px;" v-for="(item,i) in otherList.tipsLabel" :key="item.id">
                           <i-input class="sinput"  type="text"  v-model="item.title"  clearable > </i-input><i-input class="sinput" type="text" placeholder="设置对应URL" v-model="item.urllink"  clearable > </i-input><Icon @click="otherList.tipsLabel.splice(i,1)" class="urlicons" size="16" type="md-remove" />
                         </span>
                     </p>
                      <Button type="primary" @click="getotheredit" style="width:80px;margin: 10px 0 15px 72px;">提交</Button>
                      <Button  @click="closeotheredit" style="width:80px;margin: 10px 0 15px 20px;border-color: #c69c6d;color: #c69c6d;">取消</Button>
                   </div>
                  </section> 
            </TabPane>
        </Tabs>
        <div class="foot">
            <div>
               
            </div>
        </div>
        <Modal v-model="xModal1" width="940"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">新建Banner</div>
              <p><span>URL链接</span>
                 <i-input class="sinput" 
                        type="text" v-model="xmodel[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p style="position: relative;"><span style="vertical-align: top;">图        片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/b-2.png" alt="">
                 <img @click="addimg()" class="bannerimg" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok1" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
         <Modal v-model="xModal2" width="560"  footer-hide :styles="{top: '100px'}">
            <div class="modalmain">
              <div class="mtitle">编辑分类</div>
              <p><span>URL链接</span>
                 <i-input class="sinput" 
                        type="text" v-model="xmodel[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p><span>主  标  题</span>
                 <i-input class="sinput" 
                        type="text" v-model="xmodel[1]"  clearable placeholder="请输入主标题"> </i-input>
              </p>
              <p><span>副  标  题</span>
                 <i-input class="sinput" 
                        type="text" v-model="xmodel[2]"  clearable placeholder="请输入副标题"> </i-input>
              </p>
              <p v-if="goodsindex===0" style="position: relative;margin-top: 20px;"><span style="vertical-align: top;">分类图片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/b-5.png" alt="">
                 <img @click="addimg()" class="bannerimg2" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <p v-else style="position: relative;margin-top: 20px;"><span style="vertical-align: top;">分类图片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/b-5-1.png" alt="">
                 <img @click="addimg()" class="bannerimg3" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">提交</Button>
              <img class="mslimg" src="../assets/imgs/b-4.png" alt="">
            </div>     
        </Modal>
        <Modal v-model="xModal3" width="920"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">编辑广告位</div>
              <p><span>URL链接</span>
                 <i-input class="sinput" 
                        type="text" v-model="xmodel[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p style="position: relative;"><span style="vertical-align: top;">图        片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/b-6.png" alt="">
                 <img @click="addimg()" class="bannerimg4" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok3" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>

    </div>
 </div>
</template>

<script>
export default {
    name: 'home',
    data(){
        return{
         tvalue: 0,
         isopen: true,
         bannerindex: 0,
         bannerList:[],
         goodsList:[],
         goodsindex: 0,
         advertising:"",
         model:[],
         xmodel:[],
         otherList:{},
         xModal1:false,
         xModal2:false,
         xModal3:false,
         banners:["","../assets/imgs/b-1.png"],
         imgmodel:"",
         imgmodels: "",
         imgData: {accept: "image/gif, image/jpeg, image/png, image/jpg"},
         tabs:["Banner","商品分类","广告位","其他"],
         isedit:false,
         editindex: 0,
        }
    },
    mounted(){this.getbannerList()
               this.getgoodsList()
               this.getother()
              },
    methods:{
       switchsth(i){
            let url = ""
            let parme = {}
            parme.id =  this.otherList.id
            if (this.tvalue2===0) {
               url = "banner.ashx?action=editisbanner" 
               parme.isbanner = i
            }else if (this.tvalue2===1) {
              url = "banner.ashx?action=editiscommoditytype"
               parme.iscommoditytype = i
            }else if (this.tvalue2===2) {
              url = "banner.ashx?action=editisadvertisingposition"
               parme.isadvertisingposition = i
            }
        this.$axios.post(url,this.$qs.stringify(parme))
          .then(res => {
            if (res.status > 0) {
              let str = i?"已开启":"已关闭"
              this.$Message.success(str+this.tabs2[this.tvalue2]); 
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
        },
      getbannerList(){
         this.$axios
          .post("banner.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
              this.bannerList = res.item;
              this.bannerList.forEach((itmes,i)=>{
                   itmes.sort.forEach((item,j)=>{
                     if (item.isselect) {
                          this.model[i] = item.id
                        }
                  })
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
      getlist(index) {
       this.page = index
      //this.getselectlist()
    },
    showModal(i){
      if (i==="add") {
         this.bannerindex = this.bannerList.length
        this.imgmodels = ""
        this.xmodel[0] = ""
         }else{
         this.bannerindex = i
         this.imgmodels = this.bannerList[i].bannerpicture
         this.xmodel[0] = this.bannerList[i].urllink
         }
      this.xModal1 = true
    },
    removebanner(i){
        this.$axios.post("banner.ashx?action=delete",this.$qs.stringify({ id: this.bannerList[i].id }))
          .then(res => {
            if (res.status >= 0) {
              this.getbannerList()
            } else {
              this.$Message.warning(res.content);
              
            }
          })
          .catch(() => {}); 
    },
    setsort(i){
      this.$axios.post("banner.ashx?action=editsort",this.$qs.stringify({ id: this.bannerList[i].id,xgid:this.model[i] }))
          .then(res => {
            if (res.status >= 0) {
              this.getbannerList()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
    },
    isok1(){
      if (this.imgmodels) {
          let url =""
          let parse 
          if (this.bannerindex === this.bannerList.length) {
            url = "banner.ashx?action=add"
            parse = { bannerpicture: this.imgmodels,urllink:this.xmodel[0],id: "", }
          }else{url = "banner.ashx?action=edit"
           parse = { bannerpicture: this.imgmodels,urllink:this.xmodel[0],id: this.bannerList[this.bannerindex].id, }
          }
         this.$axios.post(url,this.$qs.stringify(parse))
          .then(res => {
            if (res.status >= 0) {
              this.getbannerList()
              this.xModal1 = false
            } else {
              this.$Message.warning(res.content);
              this.xModal1 = false
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("图片必须上传");} 
    },
    isok2(){
      if (this.imgmodels&&this.xmodel[0]&&this.xmodel[1]&&this.xmodel[2]) {
          let url ="commoditytype.ashx?action=edit"
         this.$axios.post(url,this.$qs.stringify({maintitle:this.xmodel[1],vicetitle:this.xmodel[2], Picture: this.imgmodels,urllink:this.xmodel[0],id: this.goodsList[this.goodsindex].id, }))
          .then(res => {
            if (res.status >= 0) {
              this.getgoodsList()
              this.xModal2 = false
            } else {
              this.$Message.warning(res.content);
              this.xModal2 = false
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("数据不能为空");} 
    },
    isok3(){
      if (this.imgmodels) {
          let url ="advertisingposition.ashx?action=edit"
         this.$axios.post(url,this.$qs.stringify({ picture: this.imgmodels,urllink:this.xmodel[0],id: this.advertising.id, }))
          .then(res => {
            if (res.status >= 0) {
              this.getadvertising()
              this.xModal3 = false
            } else {
              this.$Message.warning(res.content);
              this.xModal3 = false
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("图片必须上传");} 
    },
    getotheredit(){
       if (this.otherList.welcomespeech&&this.otherList.VIPline&&this.otherList.Telephone&&this.otherList.email&&this.otherList.advertisement) {
          let url ="Other.ashx?action=edit"
          let prima = this.otherList
          prima.tipsLabel = JSON.stringify(prima.tipsLabel)
         this.$axios.post(url,this.$qs.stringify(prima))
          .then(res => {
            if (res.status >= 0) {
              this.getother()
              this.isedit=false
              this.editindex= 0
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("数据不能为空");} 
    },
    closeotheredit(){
      this.getother()
      this.isedit=false
      this.editindex= 0
    },
    editindexs(i){
      this.editindex = i
       this.isedit=true
    },
    addimg() {
      this.$refs.uploadfiles.click();
    },
    fileChanges(event) {
      if (!event.target.files[0].size) return;
      let file = event.target.files[0];
      this.imgmodel = [];
      this.fileAdd(file);
      setTimeout(() => {
        this.$axios
          .post(
            "upload_ajax.ashx?action=UpLoadFile",
            this.$qs.stringify({ imglist: JSON.stringify(this.imgmodel) })
          )
          .then(res => {
            if (res.status >= 0) {
              this.imgmodels = res.data[0];
            } else {
              this.$Message.warning("图片上传失败");
            }
          })
          .catch(() => {this.$Message.warning("图片上传失败");});
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
    getgoodsList(){
        this.$axios
          .post("commoditytype.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
              res.item.forEach((item,i)=>{
                this.$set(this.goodsList,i,item)
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    getadvertising(){
        this.$axios
          .post("advertisingposition.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
              this.advertising = res.item[0];
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    getother(){
        this.$axios
          .post("Other.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
              this.otherList = res.item[0];
              this.isopen = this.otherList.isbanner
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    showModal2(i){
      this.goodsindex = i
      this.xModal2 = true
      this.imgmodels = ""
      this.xmodel = []
       this.$axios.post("commoditytype.ashx?action=selectdetails",this.$qs.stringify({ id: this.goodsList[i].id }))
          .then(res => {
            if (res.status >= 0) {
              this.xmodel[0]  = res.item[0].urllink
              this.xmodel[1]  = res.item[0].maintitle
              this.xmodel[2]  = res.item[0].vicetitle
              this.imgmodels = res.item[0].Picture
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
    },
    showModal3(){
      this.xModal3 = true
      this.imgmodels = this.advertising.picture
      this.xmodel[0] = this.advertising.urllink
    },
    },
    watch: {
    tvalue: function() {
     if (this.tvalue===0) {
       this.getbannerList()
       this.isopen = this.otherList.isbanner
     }else if (this.tvalue===1) {
       this.getgoodsList()
       this.isopen = this.otherList.iscommoditytype
     }else if (this.tvalue===2) {
       this.getadvertising()
       this.isopen = this.otherList.isadvertisingposition
     }else if (this.tvalue===3) {
       this.getother()
     }
    },

  }
}
</script>
<style >
.ivu-tabs{
  overflow: hidden
}
.order .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 12px;}
.imglistbox .ivu-select-small.ivu-select-single .ivu-select-selection{border-radius: 18px;border-color: #c69c6d;color: #c69c6d;height: 20px;}
.order .ivu-select-arrow{color: #c69c6d}
.order .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder,.order .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height: 18px;}
</style>
<style  scoped>
.imglistbox{display: inline-block;width: 1150px;margin-top: 10px;margin-bottom: 100px;}
.imgbox{display: inline-block;margin-right: 30px;margin-bottom: 30px;border: 1px solid #f0f0f0}
.imgbox p{padding: 6px 18px 12px;}
.imgbox p>span{float: right;color: #c69c6d;}
.imgbox p .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
.order{ background-color: #fff;margin: 20px 10px;padding: 10px 20px 100px;position: relative;}
.allnum{font-size: 28px;color: #191919;margin-right: 20px;font-family:  Microsoft YaHei;vertical-align: bottom;}
.foot>div{width: 1270px;margin: 10px;}
.foot>div p {display: inline-block;cursor: pointer;}
.active{overflow: hidden;position: relative;}
.samintbtn{margin: 30px 10px 30px 32px;}
.stitle {
  font-size: 18px;
  text-align: center;
  margin: 25px 0;
  margin-right: 8px;
}
 .sinput {
  width: 230px;
  margin: 20px 0 30px 40px;
}
.btn5{margin: 0 0 100px 10px;width: 90px;}
.modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;margin-top: 10px;}
.btn2{width: 100px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 20px;height: 32px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 20px;}
.modalmain>p>span{width: 60px;display: inline-block;}
.modalmain>p .sinput {
  width: 250px;
  margin: 10px 0 10px 10px;
}
.bannerbgimg{margin-left: 10px;}
.bannerimg{position: absolute;width: 750px;height: 220px;top: 0;left: 70px;}
.bannerimg2{position: absolute;width: 208px;height: 330px;top: 0;left: 70px;}
.bannerimg3{position: absolute;width: 314px;height: 244px;top: 0;left: 70px;}
.bannerimg4{position: absolute;width: 732px;height: 112px;top: 0;left: 70px;}
.switch1{color: #c69c6d;vertical-align: middle;line-height: 32px;position: absolute;top: 12px;right: 20px;}
.mslimg{position: absolute;top: 95px;right: 55px;}
/* 商品分类 */
.s2imgbox1{display: inline-block;width: 354px;margin-right: 30px;border: 1px solid #f0f0f0;margin-top: 20px;}
.s2imgbox2{width: 690px;display: inline-block;vertical-align: top;margin-top: 20px;}
.s2imgbox2>div{display: inline-block;border: 1px solid #f0f0f0;margin-right: 30px;width: 314px;margin-bottom: 30px;}
.bgbox2{background:#f6f6f6 ;height: 530px;width: 2200px;position: absolute;top: 270px;left: -500px;z-index: -1;position: relative;}
.imgbox1{background: no-repeat url(../assets/imgs/b-4-1.png);background-size: cover;width: 352px;height: 559px;position: relative;}
.imgbox2{background-image: url(../assets/imgs/b-bg2.png);background-size: cover;width: 312px;height: 240px;position: relative;}
.imgbox3,.imgbox3 img{width: 750px;height: 115px;}
.s3imgbox1{width:752px;margin-top: 20px;margin-right: 10px;border: 1px solid #f0f0f0}
.main2 img{width: 100%;height: 100%;}
.footp{text-align: right;color: #c69c6d;padding: 12px 20px;font-size: 14px}
.footp .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
.hovbox{position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 230px;height: 136px;background: #c69c6d;color: #fff;text-align: center;padding: 20px;display: none}
.hovbox span{font-size: 28px;border-bottom: 2px solid #fff;display: inline-block;padding: 0 5px 6px;}
.hovbox p {font-size: 16px;margin-top: 10px;}
.imgbox1:hover >.hovbox,.imgbox2:hover .hovbox{display: inline-block}
/* 其它 */
section{border: 1px solid #f0f0f0;margin-right: 200px;margin-bottom: 20px;}
section>p{font-size: 16px;color: #c69c6d;padding: 10px 11px;border-bottom: 1px solid #f0f0f0;}
section>p.active{background: #c69c6d;color: #fff;}
section>p .icons{transform: translateY(-1px);margin-right: 4px;}
section>div{padding:  10px 3px;}
section>div>p{margin: 10px 0;}
section>div>p>span:first-child{width: 60px;display: inline-block;text-align: right;margin-right: 12px;}
section>div .sinput{margin: 5px 20px 5px 0;}
.switchurl{background: #f9f5f0;color:#c69c6d;display: inline-block;padding: 6px 20px;margin-right: 30px; border-radius: 4px}
.urlicon{margin-left: 6px;}
.urlicons{border-radius: 50%;background: #c69c6d;color:#fff;padding: 3px;}
</style>