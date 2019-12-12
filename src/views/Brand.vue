<template>
    <div id="brand">
      <div id="topbar">
        <p class="title"><span></span>品牌推荐</p>
        <div class="switch1">开启品牌推荐 
         <template>
              <i-switch style="transform: translateY(-2px);margin-left: 8px;" v-model="isopens" size="small"  />
          </template>
         </div>
      </div>
      <div class="tabbar1">
        <span @click="activityinit"  class="tabspan" style="margin-right: 50px;">所有品牌</span>
        <span @click="getnavls(i)" :class="{tabspan: true,active:navValue===i}" v-for="(itme,i) in navlist" :key="i">{{itme}}</span>
         <Input search v-model="searchvalue" class="topsearch" size="small" enter-button="搜索" placeholder="在当前条件下搜索" />
      </div>
      <div :class="{tabbar2:true,isall:isall}">
        <span v-if="!tabs[0]" class="tabspan">暂无数据</span>
        <span  @click="getactivityls(i)" :class="{tabspan: true,active:tvalue1===i}" v-for="(itme,i) in tabs" :key="i">{{itme.title}}</span>
        <span v-if="!isall" @click="isall=true" class="showall">更多<Icon class="icons" style="margin-left: 4px;" size="18" type="ios-arrow-down" /></span><span v-else @click="isall=false" class="showall">收起<Icon style="margin-left: 4px;" class="icons" size="18" type="ios-arrow-up" /></span>
      </div>
      <div class="switch2">开启{{tabs2[tvalue2]}}
         <template>
              <i-switch @on-change="switchsth" style="transform: translateY(-2px);margin-left: 8px;" v-model="isopen" size="small"  />
          </template>
      </div>
    <!--   <Modal footer-hide v-model="xModal" width="360">
        <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
            <p>请确认是否删除{{tabs[tvalue1].activityname}}？</p>
            <p>删除后数据将不可回复</p>
        </div>
        <div style="text-align:center;margin: 20px 0 ;">
             <Button style="width:80px" type="primary" class="samintbtn" @click="removeactivity">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal=false">取消</Button>
        </div>
    </Modal> -->
     <!--   <Modal width="380" footer-hide v-model="xModal1" :styles="{top: '200px'}">
        <p class="stitle">新增活动</p>
        <Input class="sinput" v-model="Modal[0]" placeholder="请输入活动名称" />
        <Button type="primary" class="samintbtn" @click="isok1" style="width:80px;margin-left: 135px;margin-bottom: 30px;">提交</Button>
      </Modal> -->
       <Modal v-model="xModal2" width="480"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">品牌信息</div>
              <p><span>品牌</span>
                 <i-input class="sinput" 
                     disabled   type="text" v-model="Modal[0]"  clearable> </i-input>
              </p>
              <p><span style="vertical-align: top;transform: translateY(15px)">品牌介绍</span>
                 <i-input class="sinput" 
                     :rows="3"   type="textarea" v-model="Modal[1]"  clearable placeholder="70个字以内"> </i-input>
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal v-model="xModal3" width="920"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">新建Banner</div>
              <p><span>URL链接</span>
              <i-input class="sinput" 
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p style="position: relative;"><span style="vertical-align: top;">图        片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/br-2-bg.png" alt="">
                 <img @click="addimg()" class="bannerimg" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok3" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal v-model="xModal4" width="420"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">{{brandindex === brandList.length?"新增": "修改"}}品牌</div>
              <p><span>品 牌</span>
                <Select  placeholder="请选择品牌" v-model="Modal[0]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in brandallList" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>URL链接</span>
              <i-input class="sinput" style="width:250px;margin-left: 10px;"
                        type="text" v-model="Modal[1]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <Button size="small" @click="isok4" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal v-model="xModal6" width="420"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">{{goodsindex === goodsList.length?"新增": "修改"}}品牌商品</div>
              <p><span>品 牌</span>
                <Select disabled   placeholder="请选择品牌" v-model="Modal[0]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in tabs" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>类 别</span>
                <Select  placeholder="请选择类别" v-model="Modal[1]" style="width:250px;margin-left: 10px;"  @on-change="getCategory">
                        <Option v-for="(item,j) in parentcategory" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>单品名称</span>
                <Select  placeholder="请选择单品名称"  @on-change="getcommodityList" v-model="Modal[2]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in category" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <p><span>商品名称</span>
                <Select  placeholder="请选择商品名称" v-model="Modal[3]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in commodity" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <Button size="small" @click="isok5" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal footer-hide v-model="xModal5" width="360"  :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否清空其他品牌？</p>
              <p>清空后数据将不可回复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="removebrandall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
          </div>
         </Modal>
          <Modal footer-hide v-model="xModal7" width="360" :styles="{top: '200px'}">
            <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
                <p>请确认是否清空{{typeid===1?"品牌上新":"品牌系列"}}商品？</p>
                <p>清空后数据将不可回复</p>
            </div>
            <div style="text-align:center;margin: 20px 0 ;">
                <Button style="width:80px" type="primary" class="samintbtn" @click="removegoodsall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal7=false">取消</Button>
            </div>
         </Modal>
        <Modal v-model="xModal8" width="760"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">编辑广告位</div>
              <p><span>URL链接</span>
                 <i-input class="sinput" 
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p style="position: relative;"><span style="vertical-align: top;">图        片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/br-3-bg.png" alt="">
                 <img @click="addimg()" class="bannerimg4" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok6" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
         <input type="file" ref="uploadfiles" style="display:none" @input="fileChanges"  multiple="multiple" />
      <div class="tabbox">
        <Tabs v-model="tvalue2" >
            <TabPane  label="品牌信息" icon="md-radio-button-on">
                <div class="main1">
                    <div class="m1_text">
                        <img  src="../assets/imgs/br-1-1.png" alt="">
                       <img :src="brand.logo" alt="">
                        <p><img class="limg1" src="../assets/imgs/br-1-2.png" alt=""><img class="limg2" src="../assets/imgs/br-1-2.png" alt="">
                            <span v-if="brand.brandintroduction">{{brand.brandintroduction}}</span>
                            <span v-else>暂无介绍</span>
                        </p>
                    </div>
                </div>
                <p class="t1foot"><span @click="eitactivity" style="cursor: pointer;float: right;color: #fff;font-size: 14px;margin-top: 13px;"><Icon style="color: #fff;" class="icons" size="18" type="ios-create-outline" />编辑</span></p>
            </TabPane>
            <TabPane  label="Banner" icon="md-radio-button-on">
               <img @click="showModal('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox">
                 <div class="imgbox" v-for="(items,i) in bannerList" :key="i">
                   <img style="width: 542px;height: 155px;" :src="items.bannerpicture" alt="">
                   <p> 
                     <Select @on-change="setsort(i)" size="small" placeholder="" v-model="xmodel[i]" style="width:48px;">
                        <Option v-for="(item,j) in items.sort" :value="item.id" :key="j+1">{{item.sort}}</Option>
                     </Select>
                     <span><span @click="showModal(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removebanner(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
               </div>
            </TabPane>
             <TabPane  label="品牌上新" icon="md-radio-button-on">
               <img @click="showModal2('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox1 imglistbox2">
                 <div class="imgbox1" v-for="(items,i) in goodsList" :key="i">
                   <div class="itembox itembox1">
                     <img style="width: 220px;height: 264px;border:none;"  alt="">
          
                    <p>【GUCCL】der/吉尔·桑达Ji绗缝 单肩包绗缝单肩包</p>
                    <span class="itemnum">￥2198</span><span class="lastnum">￥3298</span>
                    <span class="itemtab" >活动商品</span>
                  
                  </div>
                   
                   <p> 
                     <Select @on-change="setsort2(i)" size="small" placeholder="" v-model="xmodel[i]" style="width:48px;">
                        <Option v-for="(item,j) in items.sort" :value="item.id" :key="j+1">{{item.sort}}</Option>
                     </Select>
                     <span><span @click="showModal2(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removebrand(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
                 <p><span @click="xModal7=true"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />清空</span></p>
               </div>
            </TabPane> 
            <TabPane label="广告位" icon="md-radio-button-on">
                 <img style="float: right;margin: 20px 10px 20px 0" src="../assets/imgs/br-3-s.png" alt="">
                <div class="s3imgbox1">
                  <div class="imgbox3" v-if="advertising">
                    <img :src="advertising.picture" alt="">
                  </div>
                  <p class="footp"><span @click="showModal3" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
            </TabPane> 
            <TabPane  label="品牌系列" icon="md-radio-button-on">
               <img @click="showModal2('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox1 imglistbox2">
                 <div class="imgbox1" v-for="(items,i) in goodsList" :key="i">
                   <div class="itembox itembox1">
                     <img style="width: 220px;height: 264px;border:none;"  alt="">
          
                    <p>【GUCCL】der/吉尔·桑达Ji绗缝 单肩包绗缝单肩包</p>
                    <span class="itemnum">￥2198</span><span class="lastnum">￥3298</span>
                    <span class="itemtab" >活动商品</span>
                  
                  </div>
                   
                   <p> 
                     <Select @on-change="setsort2(i)" size="small" placeholder="" v-model="xmodel[i]" style="width:48px;">
                        <Option v-for="(item,j) in items.sort" :value="item.id" :key="j+1">{{item.sort}}</Option>
                     </Select>
                     <span><span @click="showModal2(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removebrand(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
                 <p><span @click="xModal7=true"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />清空</span></p>
               </div>
            </TabPane> 
    
              <TabPane  label="其他品牌" icon="md-radio-button-on">
               <img @click="showModal1('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox1">
                 <div class="imgbox1" v-for="(items,i) in brandList" :key="i">
                   <img style="width: 220px;height: 80px;" :src="items.logo" alt="">
                   <p> 
                     <Select @on-change="setsort1(i)" size="small" placeholder="" v-model="xmodel[i]" style="width:48px;">
                        <Option v-for="(item,j) in items.sort" :value="item.id" :key="j+1">{{item.sort}}</Option>
                     </Select>
                     <span><span @click="showModal1(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removebrand(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
                 <p><span @click="xModal5=true"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />清空</span></p>
               </div>
            </TabPane>
        </Tabs>
     </div>  
    </div>
</template>

<script>
export default {
    name: 'brand',
    data(){
        return{
           searchvalue:"",
           switch1:true,
           isopens:true,
           isopen:false,
           navValue: -1,
           tvalue1: 0,
           tvalue2: 0,
           typeid: 1,
           xModal:false,
           xModal1: false,
           xModal2:false,
           xModal3:false,
           xModal4:false,
           xModal5:false,
           xModal6:false,
           xModal7:false,
           xModal8:false,
           isall:false,
           brand:{},
           bannerindex: 0,
           bannerList:[],
           brandallList:[],
           brandindex: 0,
           brandList:[],
           goodsindex: 0,
           goodsList:[],
           parentcategory:[],
           generalattribute:[],
           commodity:[],
           category:[],
           advertising:"",
           xmodel:[],
           Modal:[],
           navlist:["首页展示","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
           tabs:[],
           imgmodels:"",
           tabs2:["首页展示","Banner","品牌上新","广告位","品牌系列","其他品牌"],
           imgData: {accept: "image/gif, image/jpeg, image/png, image/jpg"},
        }
    },
    mounted(){this.activityinit()},
    methods:{
        switchsth(i){
            let url = ""
            let parme = {}
            console.log(i)
            parme.id =  this.brand.id
            if (this.tvalue2===0) {
               url = "brandrecommendation.ashx?action=editishome" 
               parme.ishome = i
            }else if (this.tvalue2===1) {
              url = "brandrecommendation.ashx?action=editisbanner"
               parme.isbanner = i
            }else if (this.tvalue2===2) {
              url = "brandrecommendation.ashx?action=editisbrandup"
               parme.isbrandup = i
            }else if (this.tvalue2===3) {
              url = "brandrecommendation.ashx?action=editisadvertisingposition"
               parme.isadvertisingposition = i
            }else if (this.tvalue2===4) {
              url = "brandrecommendation.ashx?action=editisbrandseries"
               parme.isbrandseries = i
            }else if (this.tvalue2===5) {
              url = "brandrecommendation.ashx?action=editisotherbrand"
               parme.isotherbrand = i
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
      activityinit(){
           this.navValue = -1
           this.$axios.post("brandrecommendation.ashx?action=generalattributeselectlist",this.$qs.stringify({ ishome: false }))
          .then(res => {
            if (res.status >= 0) {
              this.tabs = res.item
              this.getbrandinit()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
      },
      getbrandinit(){
          this.$axios.post("brandrecommendation.ashx?action=selectlist",this.$qs.stringify({ brandid: this.tabs[this.tvalue1].guid }))
          .then(res => {
            if (res.status > 0) {
             this.brand = res.item[0]
             this.isopen =  this.brand.ishome
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {}); 
      },
      getnavlist(){
          this.$axios.post("brandrecommendation.ashx?action=generalattributeselectlist",this.$qs.stringify({ ishome:  this.navValue===0,Letter: this.navValue===0?"":this.navlist[ this.navValue],title:this.searchvalue }))
          .then(res => {
            if (res.status >= 0) {
              if ( res.item.length>0) {
                this.tabs = res.item  
              }else{
                  for(let i = 0;i<this.tabs.length;i++){ this.$set(this.tabs,i,"") }
                  }
              
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
      },
      getnavls(i){
          this.navValue = i
          this.getnavlist() 
      },
     isok2(){
        if (this.Modal[0]&&this.Modal[1]) {
        this.$axios.post("brandrecommendation.ashx?action=edit",this.$qs.stringify({ brandintroduction: this.Modal[1],id: this.brand.id}))
          .then(res => {
            if (res.status > 0) {
              this.xModal2 = false
               this.getbrandinit()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {}); 
          }else{this.$Message.warning("介绍不能为空");}
      },
  
      removeactivity(){
          xModal=false
      },
      eitactivity(){
          this.xModal2 = true
          this.Modal[0] = this.tabs[this.tvalue1].title
          this.Modal[1] = this.brand.brandintroduction
      },
      getactivityls(i){
         this.tvalue1=i 
         this.tvalue2 = 0
         this.getbrandinit()
         }, 
      //Banner
     showModal(i){
      if (i==="add") {
         this.bannerindex = this.bannerList.length
         this.imgmodels = ""
         this.Modal[0] = ""
         }else{
         this.bannerindex = i
         this.imgmodels = this.bannerList[i].bannerpicture
         this.Modal[0] = this.bannerList[i].urllink?this.bannerList[i].urllink:""
         }
      this.xModal3 = true
    },
    isok3(){
      if (this.imgmodels) {
          let url =""
          let parem ={}
          if (this.bannerindex === this.bannerList.length) {
            url = "banner.ashx?action=add"
            parem = { bannerpicture: this.imgmodels,urllink:this.Modal[0],typeguid: this.brand.guid }
          }else{url = "banner.ashx?action=edit"
           parem =  { bannerpicture: this.imgmodels,urllink:this.Modal[0],id: this.bannerList[this.bannerindex].id }
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getbannerList()
              this.xModal3 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("图片必须上传");} 
    },
    getbannerList(){
         this.$axios
          .post("banner.ashx?action=selectlist",this.$qs.stringify({ typeguid: this.brand.guid }))
          .then(res => {
            if (res.status >= 0) {
              this.bannerList = res.item;
              this.bannerList.forEach((itmes,i)=>{
                   itmes.sort.forEach((item,j)=>{
                     if (item.isselect) {
                         this.$set(this.xmodel,i,item.id)
                         // this.xmodel[i] = item.id
                        }
                  })
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
    removebanner(i){
        this.$axios.post("banner.ashx?action=delete",this.$qs.stringify({ id: this.bannerList[i].id ,typeguid: this.brand.guid}))
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
      if (this.tvalue2===1) {
        this.$axios.post("banner.ashx?action=editsort",this.$qs.stringify({ id: this.bannerList[i].id,xgid:this.xmodel[i] }))
          .then(res => {
            if (res.status >= 0) {
              this.getbannerList()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
      }
      
    },
    // 其他品牌
     showModal1(i){
      if (i==="add") {
         this.brandindex = this.brandList.length?this.brandList.length: 0
         this.Modal[0] = ""
         this.Modal[1] = ""
         this.getbrandListall()
         }else{
         this.brandindex = i
         this.editbrandinit()
        
         }
      this.xModal4 = true
    },
    isok4(){
      if (this.Modal[0]&&this.Modal[1]) {
          let url =""
          let parem ={}
          if (this.brandindex === this.brandList.length) {
            url = "activity.ashx?action=addbrandrecommend"
            parem = { generalattributeid: this.Modal[0],brandurl:this.Modal[1],typeguid: this.brand.guid }
          }else{url = "activity.ashx?action=editbrandrecommend"
           parem =  { generalattributeid: this.Modal[0],brandurl:this.Modal[1],id: this.brandList[this.brandindex].id }
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getbrandList()
              this.xModal4 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("数据不能为空");} 
    },
    editbrandinit(){
        this.$axios
          .post("activity.ashx?action=editbrandrecommendinit",this.$qs.stringify({ id: this.brandList[this.brandindex].id }))
          .then(res => {
            if (res.status >= 0) {
              this.brandallList = res.item[0].item[0].item;
              this.Modal[1] = res.item[0].brandurl
              this.brandallList.forEach(item=>{
                if (item.isselect) {
                  this.Modal[0] = item.guid
                }
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    getbrandListall(){
         this.$axios
          .post("activity.ashx?action=addbrandrecommendinit")
          .then(res => {
            if (res.status >= 0) {
              this.brandallList = res.item[0].item;
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
    getbrandList(){
         this.$axios
          .post("activity.ashx?action=selectlistbrandrecommend",this.$qs.stringify({ typeguid: this.brand.guid }))
          .then(res => {
            if (res.status >= 0) {
              this.brandList = res.item;
              this.brandList.forEach((itmes,i)=>{
                   itmes.sort.forEach((item,j)=>{
                     if (item.isselect) {
                          //this.$set(this.xmodel,i,item.id)
                          this.xmodel[i] = item.id
                        }
                  })
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
    removebrand(i){
        this.$axios.post("activity.ashx?action=deletebrandrecommend",this.$qs.stringify({ id: this.brandList[i].id ,typeguid: this.brand.guid}))
          .then(res => {
            if (res.status >= 0) {
              this.getbrandList()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
    },
     removebrandall(){
        this.$axios.post("activity.ashx?action=deletebrandrecommend",this.$qs.stringify({ emptys: "清空" ,typeguid: this.brand.guid}))
          .then(res => {
            if (res.status >= 0) {
              this.getbrandList()
              this.xModal5 = false
            } else {
              this.$Message.warning(res.content);
              
            }
          })
          .catch(() => {}); 
    }, 
    setsort1(i){
      if (this.tvalue2===5) {
         this.$axios.post("activity.ashx?action=editsortbrandrecommend",this.$qs.stringify({ id: this.brandList[i].id,xgid:this.xmodel[i] }))
          .then(res => {
            if (res.status >= 0) {
              this.getbrandList()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
      }
     
    },
   // 品牌上新
    showModal2(i){
      if (i==="add") {
         this.goodsindex = this.goodsList.length?this.goodsList.length: 0
         this.Modal[0] = this.tabs[this.tvalue1].guid
         this.Modal[1] = ""
         this.Modal[2] = ""
         this.Modal[3] = ""
         this.getgoodsListall()
         }else{
         this.goodsindex = i
         this.editgoodsinit()
        
         }
      this.xModal6 = true
    },
    isok5(){
      if (this.Modal[1]) {
          let url =""
          let parem ={}
          if (this.goodsindex === this.goodsList.length) {
            url = "brandrecommendation.ashx?action=addbrandrecommendcommodity"
            parem = {generalattributeid:this.tabs[this.tvalue1].guid, parentcategoryid: this.Modal[1],categoryid:this.Modal[2],typeguid: this.brand.guid ,commodityguid:this.Modal[3],typeid:this.typeid}
          }else{url = "brandrecommendation.ashx?action=editbrandrecommendcommodity"
           parem =  { commodityguid: this.Modal[3],id:this.brand.id}
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status > 0) {
              this.getgoodsList()
              this.xModal6 = false
            } else {
              this.$Message.warning(res.content);
              this.xModal6 = false
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("类别不能为空");} 
    },
    editgoodsinit(){
        this.$axios
          .post("brandrecommendation.ashx?action=editbrandrecommendcommodityinit",this.$qs.stringify({ id: this.goodsList[this.goodsindex].id }))
          .then(res => {
            if (res.status >= 0) {
              this.generalattribute = res.generalattribute[0].item
              this.Modal[0] = this.brand.guid
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
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    getgoodsListall(){
         this.$axios
          .post("brandrecommendation.ashx?action=addactivecommoditiesinit",this.$qs.stringify({ brandid: this.brand.guid}))
          .then(res => {
            if (res.status >= 0) {
             this.generalattribute = res.generalattribute[0].item
             this.parentcategory = res.parentcategory
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
    getgoodsList(){
         this.$axios
          .post("brandrecommendation.ashx?action=selectlistbrandrecommendcommodity",this.$qs.stringify({ typeguid: this.brand.guid ,typeid:this.typeid}))
          .then(res => {
            if (res.status >= 0) {
              this.goodsList = res.item;
              this.goodsList.forEach((itmes,i)=>{ 
                  itmes.sort.forEach((item,j)=>{
                     if (item.isselect) {
                         // this.$set(this.xmodel,i,item.id)
                         this.xmodel[i] = item.id
                        }
                  })
              if(itmes.commoditypictures1 ){ itmes.commoditypictures1 = JSON.parse(items.commoditypictures1).replace(/\[/,"").replace(/\]/,"").split(",")[0]}
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
    removegoods(i){
        this.$axios.post("brandrecommendation.ashx?action=deletebrandrecommendcommodity",this.$qs.stringify({ id: this.goodsList[i].id ,typeguid: this.brand.guid,typeid:this.typeid}))
          .then(res => {
            if (res.status >= 0) {
              this.getgoodsList()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
    },
     removegoodsall(){
        this.$axios.post("brandrecommendation.ashx?action=deletebrandrecommendcommodity",this.$qs.stringify({ id: "清空" ,typeguid: this.brand.guid,typeid:this.typeid}))
          .then(res => {
            if (res.status >= 0) {
              this.getgoodsList()
              this.xModal7 = false
            } else {
              this.$Message.warning(res.content);
              
            }
          })
          .catch(() => {}); 
    }, 
    setsort2(i){
      if (this.tvalue2===2||this.tvalue2===4) {
        this.$axios.post("brandrecommendation.ashx?action=brandrecommendcommodity",this.$qs.stringify({ id: this.goodsList[i].id,xgid:this.xmodel[i] }))
          .then(res => {
            if (res.status >= 0) {
              this.getgoodsList()
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
      }
      
    },
    getCategory(id) {
      this.Modal[2] = "";
      this.getcommodityList()
       if (id) {
        this.$axios
          .post(
            "category.ashx?action=selectby_parentid",
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
       this.Modal[3] = "";
        this.$axios
          .post(
            "commodity.ashx?action=selectbyid",
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
    },
   //广告位1
    showModal3(){
        if (this.advertising) {
           this.imgmodels = this.advertising.picture
           this.$set(this.Modal,0,this.advertising.urllink) 
        }else{
          this.imgmodels =""
          this.Modal[0] = ""
        }
      this.xModal8 = true
    },
    getadvertising(){
         this.$axios
          .post("brandrecommendation.ashx?action=selectlistadvertisingposition",this.$qs.stringify({ typeguid: this.brand.guid }))
          .then(res => {
            if (res.status >= 0) {
             this.advertising = res.item[0]
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
     isok6(){
      if (this.imgmodels) {
          let url =""
          let parem ={}
           url = "activity.ashx?action=editadvertisingposition"
           parem =  { picture: this.imgmodels,urllink:this.Modal[0],id: this.advertising.id }
          
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getadvertising()
              this.xModal8 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("图片必须上传");} 
    },


     // 图片上传
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
    },
    watch: {
    tvalue2: function() {
      this.xmodel = []
     if (this.tvalue2===0) {
        this.getbrandinit()
        this.isopen = this.brand.ishome
     }else if (this.tvalue2===1) {
        this.getbannerList()
        this.isopen = this.brand.isbanner
     }else if (this.tvalue2===2) {
         this.getgoodsList()
         this.isopen = this.brand.isbrandup
          this.typeid = 1
     }else if (this.tvalue2===3) {
        this.getadvertising()
        this.isopen = this.brand.isadvertisingposition
     }else if (this.tvalue2===4) {
       this.getgoodsList() 
       this.isopen = this.brand.isbrandseries 
      this.typeid = 2
     }else if (this.tvalue2===5) {
      this.getbrandList()
      this.isopen = this.brand.isotherbrand
     }
    },

  }

}
</script>
<style >
 #brand .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 14px;font-size: 14px}
 #brand .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 12px;}
.imglistbox .ivu-select-small.ivu-select-single .ivu-select-selection{border-radius: 18px;border-color: #c69c6d;color: #c69c6d;height: 20px;}
 .imglistbox1 .ivu-select-small.ivu-select-single .ivu-select-selection{border-radius: 18px;border-color: #c69c6d;color: #c69c6d;height: 20px;}
 #brand .ivu-select-arrow{color: #c69c6d}
 #brand .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height: 18px;}
</style>
<style scoped>
.switch1{color: #c69c6d;vertical-align: middle;line-height: 32px;position: absolute;top: 12px;right: 20px;}
 .switch2{color: #c69c6d;vertical-align: middle;line-height: 22px;position: absolute;top: 216px;right: 20px;z-index: 99;}
#topbar { padding: 10px 15px 20px;}
.title {font-size: 18px;line-height: 20px;display: inline-block;color: #282a3c;}
.title>span{width: 10px;height: 10px;background: #c69c6d;display: inline-block;margin-right: 6px;}
.icons{transform: translateY(-1px);margin-left: 18px;margin-right: 2px;}
.topsearch {float: right; width: 280px;margin-top: 10px;margin-left: 6px;}
.tabbar1{background: #fff;padding: 0 16px;border-bottom: 1px solid #f0f0f0}
.tabbar1 .tabspan{font-size: 16px;padding:12px 20px 12px 0 ;display: inline-block;vertical-align: middle;cursor: pointer;font-family: Microsoft YaHei}
.tabbar1 .tabspan.active{color: #c69c6d;vertical-align: middle;text-decoration: underline}
.tabbar2{background: #fff;padding: 0 16px;padding-left: 150px;position: relative; font-family: Microsoft YaHei;height: 88px;overflow: hidden;}
.tabbar2.isall{height: auto;overflow: visible;}
.showall{position: absolute;top: 12px;right: 10px;color: #c69c6d;cursor: pointer;}
.tabbar2 .tabspan{font-size: 16px;margin-right: 20px;padding:10px 20px 10px 0 ;display: inline-block;vertical-align: middle;cursor: pointer;}
.tabbar2 .tabspan.active{color: #c69c6d;vertical-align: middle;text-decoration: underline}
.tabbox {background: #fff;padding: 15px;padding-bottom: 80px;padding-top: 10px;margin-top: 10px;}
.stitle {font-size: 18px;text-align: center; margin: 25px 0;}
 .sinput {width: 240px; margin: 10px 0 40px 58px;}
  /* 活动推荐 */
.tabbox .m1_text{vertical-align: top;padding: 20px 30px;position: relative;text-align: center;}
.tabbox .m1_text p{font-size: 16px;color: #191919;line-height: 34px;width: 86%;margin: 30px auto;position: relative;padding: 10px;}
.tabbox .m1_text p .limg1{position: absolute;top: 0;left: 0;}
.tabbox .m1_text p .limg2{position: absolute;bottom: 0;right: 0;}
 #brand .tabbox .m1_text>img:nth-child(2){position: absolute;width: 132px;height: 76px;top: 63px;left: 50%;transform: translateX(-50%);border: none ;}
.tabbox  .footbtn{text-align: right;}
.tabbox  .footbtn span{margin-left: 10px;width: 30px;height: 30px;background: #c69c6d;display: inline-block;margin-top: 50px;cursor: pointer;}
.t1foot   {background: #c69c6d;height: 50px;padding: 0 20px;margin-top: 60px;}
.tabbox  .s1imgbox{width: 600px;height: 460px;display: inline-block;background: url(../assets/imgs/a-1-bg.png);}
.s1imgbox img{width: 580px;height: 430px;margin: 19px 10px;}
.modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;margin-top: 10px;}
.btn2{width: 100px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 20px;height: 32px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 20px;}
.modalmain>p>span{width: 60px;display: inline-block;}
.modalmain>p .sinput { width: 300px; margin: 10px 0 10px 10px;}
.bannerbgimg{margin-left: 10px;}
.bannerimg{position: absolute;width: 680px;height: 195px;top: 0;left: 70px;}
.bannerimg2{position: absolute;width: 588px;height: 148px;top: 0;left: 70px;}
.bannerimg3{position: absolute;width: 300px;height: 223px;top: 0;left: 70px;}
.bannerimg4{position: absolute;width: 588px;height: 72px;top: 0;left: 70px;}
.mslimg{position: absolute;top: 95px;right: 50px;}
 /* Banner */
.imglistbox{display: inline-block;width: 1150px;margin-top: 10px;margin-bottom: 100px;}
.imgbox{display: inline-block;margin-right: 30px;margin-bottom: 30px;border: 1px solid #f0f0f0}
.imgbox p{padding: 6px 18px 12px;}
.imgbox p>span{float: right;color: #c69c6d;}
.imgbox p .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
 /* 品牌推荐 */
.imglistbox1{display: inline-block;margin-top: 10px;width:978px;}
.imglistbox1>p  .icons{margin: 0;}
.imglistbox1>p{margin-top: -10px;}
.imgbox1{display: inline-block;margin-right: 30px;margin-bottom: 30px;border: 1px solid #f0f0f0}
.imgbox1 p{padding: 6px 18px 12px;}
.imgbox1 p>span{float: right;color: #c69c6d;}
.imgbox1 p .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
 /* 活动推荐 */
.imglistbox1.imglistbox2{display: inline-block;width: 1010px;}
.itembox{width: 220px;height: 360px;background:#f6f6f6;position: relative;display: inline-block;margin-right: 16px}
.itembox img{width: 100%;}
.itembox p{font-size: 14px;color: #2f2f2f;padding: 0 10px;}
.itemtab{position: absolute;top: 0;left: 0;background: #191919;color: #fff;padding: 3px 12px;border-bottom-right-radius: 10px }
.itemnum{border-top: 1px solid #c69c6d;padding-top: 4px;margin: 10px 10px;display: inline-block;padding-right: 5px;}
.itembox1{border:none;margin-top: 10px;margin: 0 auto;}
.itembox.itembox1 .lastnum{color: #9c9c9c;font-weight: 500;text-decoration:line-through;font-family: Microsoft YaHei}
 /* 广告位 */
.imgbox3,.imgbox3 img{width: 800px;height: 99px;}
.s3imgbox1{width:802px;border: 1px solid #f0f0f0;margin: 20px auto;transform: translateX(-100px)}
.footp{text-align: right;color: #c69c6d;padding: 12px 20px;font-size: 14px}
.footp .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}

</style>