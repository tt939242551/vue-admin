<template>
    <div id="activity">
      <div id="topbar">
        <p class="title"><span></span>活动推荐</p>
        <div class="switch1">开启活动推荐 
         <template>
              <i-switch style="transform: translateY(-2px);margin-left: 8px;" v-model="isopens" size="small"  />
          </template>
       </div>
      </div>
      <div class="tabbar">
        <span v-show="tabs.length===0" class="tabspan">暂无数据</span>
        <span @click="getactivityls(i)" :class="{tabspan: true,active:tvalue1===i}" v-for="(itme,i) in tabs" :key="i">{{itme.activityname}}</span>
        <span @click="xModal=true"  style="cursor: pointer;float: right;color: #c69c6d;font-size: 14px;margin-top: 16px;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span>  
        <span @click="xModal1 = true" style="cursor: pointer;float: right;color: #c69c6d;font-size: 14px;margin-top: 16px;"><Icon class="icons" size="18" type="md-add" />新增</span>
      </div>
      <div v-show="tvalue2>1" class="switch2">开启{{tabs2[tvalue2]}}
         <template>
              <i-switch style="transform: translateY(-2px);margin-left: 8px;" v-model="isopen" size="small"  />
          </template>
      </div>
      <Modal footer-hide v-model="xModal" width="360">
        <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
            <p>请确认是否删除{{tabs[tvalue1].activityname}}？</p>
            <p>删除后数据将不可回复</p>
        </div>
        <div style="text-align:center;margin: 20px 0 ;">
             <Button style="width:80px" type="primary" class="samintbtn" @click="removeactivity">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal=false">取消</Button>
        </div>
    </Modal>
       <Modal width="380" footer-hide v-model="xModal1" :styles="{top: '200px'}">
        <p class="stitle">新增活动</p>
        <Input class="sinput" v-model="Modal[0]" placeholder="请输入活动名称" />
        <Button type="primary" class="samintbtn" @click="isok1" style="width:80px;margin-left: 135px;margin-bottom: 30px;">提交</Button>
      </Modal>
       <Modal v-model="xModal2" width="680"  footer-hide :styles="{top: '100px'}">
            <div class="modalmain">
              <div class="mtitle">编辑活动信息</div>
              <p><span>URL链接</span>
                 <i-input class="sinput" 
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p><span>主  标  题</span>
                 <i-input class="sinput" 
                        type="text" v-model="Modal[1]"  clearable placeholder="请输入主标题"> </i-input>
              </p>
              <p><span>活动介绍</span>
                 <i-input class="sinput" 
                      :rows="3"  type="textarea" v-model="Modal[2]"  clearable placeholder="请输入副标题"> </i-input>
              </p>
              <p style="position: relative;margin-top: 20px;"><span style="vertical-align: top;">活动图片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/a-1-bg2.png" alt="">
                 <img @click="addimg()" class="bannerimg3" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">提交</Button>
              <img class="mslimg" src="../assets/imgs/a-1-s.png" alt="">
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
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/b-2.png" alt="">
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
              <div class="mtitle">{{goodsindex === goodsList.length?"新增": "修改"}}活动商品</div>
              <p><span>品 牌</span>
                <Select  @on-change="getcommodityList" placeholder="请选择品牌" v-model="Modal[0]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in generalattribute" :value="item.guid" :key="j">{{item.title}}</Option>
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
        <Modal footer-hide v-model="xModal5" width="360">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否清空品牌推荐？</p>
              <p>清空后数据将不可回复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="removebrandall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
          </div>
         </Modal>
          <Modal footer-hide v-model="xModal7" width="360">
            <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
                <p>请确认是否清空活动商品？</p>
                <p>清空后数据将不可回复</p>
            </div>
            <div style="text-align:center;margin: 20px 0 ;">
                <Button style="width:80px" type="primary" class="samintbtn" @click="removegoodsall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal7=false">取消</Button>
            </div>
         </Modal>
          <Modal v-model="xModal8" width="760"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">修改广告位1</div>
              <p><span>URL链接</span>
              <i-input class="sinput" 
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p style="position: relative;"><span style="vertical-align: top;">图        片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/a-2-bg1.png" alt="">
                 <img @click="addimg()" class="bannerimg2" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok6" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
         <Modal v-model="xModal9" width="560"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">修改广告位2</div>
              <p><span>URL链接</span>
                 <i-input class="sinput" 
                        type="text" v-model="Modal[0]"  clearable placeholder="请输入链接"> </i-input>
              </p>
              <p><span>主  标  题</span>
                 <i-input class="sinput" 
                        type="text" v-model="Modal[1]"  clearable placeholder="请输入主标题"> </i-input>
              </p>
              <p><span>副 标 题</span>
                 <i-input class="sinput" 
                        type="text" v-model="Modal[2]"  clearable placeholder="请输入副标题"> </i-input>
              </p>
              <p style="position: relative;margin-top: 20px;"><span style="vertical-align: top;">图        片</span>
                 <img @click="addimg()" class="bannerbgimg" src="../assets/imgs/a-3-bg.png" alt="">
                 <img @click="addimg()" class="bannerimg4" v-show="imgmodels" :src="imgmodels" alt="">
              </p>
              <Button size="small" @click="isok7" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
         <input type="file" ref="uploadfiles" style="display:none" @input="fileChanges"  multiple="multiple" />
      <div class="tabbox">
        <Tabs v-model="tvalue2" >
            <TabPane  label="活动信息" icon="md-radio-button-on">
                <div class="main1">
                    <div class="m1_text" v-if="tabs[tvalue1]">
                        <p class="numtext">{{"0"+(tvalue1+1)}}</p>
                        <span >{{tabs[tvalue1].activitytitle}}</span>
                        <p>{{tabs[tvalue1].activityinformation}}</p>
                        <div class="footbtn"><span></span></div>
                    </div>
                    <div class="imgbox s1imgbox">
                       <img v-if="tabs[tvalue1]" :src="tabs[tvalue1].activitypicture" alt="">
                    </div> 
                </div>
                <div class="bgbox"></div>
                <p class="t1foot"><span @click="eitactivity" style="cursor: pointer;float: right;color: #fff;font-size: 14px;margin-top: 13px;"><Icon style="color: #fff;" class="icons" size="18" type="ios-create-outline" />编辑</span></p>
            </TabPane>
            <TabPane  label="Banner" icon="md-radio-button-on">
               <img @click="showModal('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox">
                 <div class="imgbox" v-for="(items,i) in bannerList" :key="i">
                   <img style="width: 542px;height: 174px;" :src="items.bannerpicture" alt="">
                   <p> 
                     <Select @on-change="setsort(i)" size="small" placeholder="" v-model="xmodel[i]" style="width:48px;">
                        <Option v-for="(item,j) in items.sort" :value="item.id" :key="j+1">{{item.sort}}</Option>
                     </Select>
                     <span><span @click="showModal(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removebanner(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
               </div>
            </TabPane>
             <TabPane  label="品牌推荐" icon="md-radio-button-on">
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
             <TabPane  label="活动商品" icon="md-radio-button-on">
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
            <TabPane  label="折扣商品" icon="md-radio-button-on"></TabPane>
             <TabPane label="广告位1" icon="md-radio-button-on">
                <img style="float: right;margin: 20px 10px 20px 0" src="../assets/imgs/a-2-s.png" alt="">
                <div class="s3imgbox1">
                  <div class="imgbox3" v-if="advertisingList1[0]">
                     <img style="width: 588px;height: 148px;" :src="advertisingList1[0].picture" alt=""> 
                  </div>
                  <p class="footp"><span @click="showModal3(0)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
                <div class="s3imgbox1">
                  <div class="imgbox3" v-if="advertisingList1[1]">
                     <img style="width: 588px;height: 148px;" :src="advertisingList1[1].picture" alt=""> 
                  </div>
                  <p class="footp"><span @click="showModal3(1)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
            </TabPane> 
              <TabPane label="广告位2" icon="md-radio-button-on">
                <img style="float: right;margin: 20px 10px 20px 0" src="../assets/imgs/a-3-s.png" alt="">
                <div class="s3imgbox1 s3imgbox10">
                  <div class="imgbox4" v-if="advertisingList2[0]">
                    <img  :src="advertisingList2[0].picture" alt=""> 
                    <div class="hovbox">
                        <span>{{advertisingList2[0].maintitle}}</span>
                         <p>{{advertisingList2[0].vicetitle}}</p>
                      </div>
                  </div>
                  <p class="footp"><span @click="showModal4(0)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
                <div class="s3imgbox1 s3imgbox10">
                  <div class="imgbox4" v-if="advertisingList2[1]">
                     <img  :src="advertisingList2[1].picture" alt=""> 
                      <div class="hovbox">
                         <span>{{advertisingList2[1].maintitle}}</span>
                         <p>{{advertisingList2[1].vicetitle}}</p>
                       </div>
                  </div>
                  <p class="footp"><span @click="showModal4(1)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
                <div class="s3imgbox1 s3imgbox10">
                  <div class="imgbox4" v-if="advertisingList2[2]">
                     <img  :src="advertisingList2[1].picture" alt=""> 
                       <div class="hovbox">
                         <span>{{advertisingList2[2].maintitle}}</span>
                         <p>{{advertisingList2[2].vicetitle}}</p>
                       </div>
                  </div>
                  <p class="footp"><span @click="showModal4(2)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span></p>
                </div>
            </TabPane>               
        </Tabs>
     </div>  
    </div>
</template>

<script>
export default {
    name: 'activity',
    data(){
        return{
           switch1:true,
           isopen:false,
           isopens:true,
           tvalue1: 0,
           tvalue2: 0,
           xModal:false,
           xModal1: false,
           xModal2:false,
           xModal3:false,
           xModal4:false,
           xModal5:false,
           xModal6:false,
           xModal7:false,
           xModal8:false,
           xModal9:false,
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
           advertisingList1:[],
           advertisingindex1: 0,
           advertisingList2:[],
           advertisingindex2: 0,
           xmodel:[],
           Modal:[],
           tabs:[],
           imgmodels:"",
           tabs2:["活动信息","Banner","品牌推荐","活动商品","折扣商品","广告位1","广告位2"],
           imgData: {accept: "image/gif, image/jpeg, image/png, image/jpg"},
        }
    },
    mounted(){this.activityinit()},
    methods:{
      activityinit(){
           this.$axios.post("activity.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
              this.tabs = res.item
              if (this.tabs[this.tvalue1].isopenid==='1') {
                
                  this.isopen = true
              }else{ this.isopen = false}  
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {}); 
      },
      isok1(){
          if (this.Modal[0]) {
        this.$axios.post("activity.ashx?action=add",this.$qs.stringify({ activityname: this.Modal[0] }))
          .then(res => {
            if (res.status > 0) {
              this.xModal1 = false
              this.activityinit() 
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {}); 
          }else{this.$Message.warning("活动名不能为空");}
      },
     isok2(){
        if (this.Modal[0]&&this.Modal[1]&&this.Modal[2]) {
        this.$axios.post("activity.ashx?action=addinformation",this.$qs.stringify({ activitytitle: this.Modal[1],activityinformation: this.Modal[2],activityurl: this.Modal[0],activitypicture: this.imgmodels,id: this.tabs[this.tvalue1].id}))
          .then(res => {
            if (res.status > 0) {
              this.xModal2 = false
              this.activityinit() 
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {}); 
          }else{this.$Message.warning("数据不能为空");}
      },
  
      removeactivity(){
          xModal=false
      },
      eitactivity(){
          this.xModal2 = true
          this.Modal[0] = this.tabs[this.tvalue1].activityurl
          this.Modal[1] = this.tabs[this.tvalue1].activitytitle
          this.Modal[2] = this.tabs[this.tvalue1].activityinformation
      },
      getactivityls(i){this.tvalue1=i
       this.tvalue2 = 0
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
            parem = { bannerpicture: this.imgmodels,urllink:this.Modal[0],typeguid: this.tabs[this.tvalue1].guid }
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
          .post("banner.ashx?action=selectlist",this.$qs.stringify({ typeguid: this.tabs[this.tvalue1].guid }))
          .then(res => {
            if (res.status >= 0) {
              this.bannerList = res.item;
              this.bannerList.forEach((itmes,i)=>{
                   itmes.sort.forEach((item,j)=>{
                     if (item.isselect) {
                       this.$set(this.xmodel,i,item.id)
                          //this.xmodel[i] = item.id
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
        this.$axios.post("banner.ashx?action=delete",this.$qs.stringify({ id: this.bannerList[i].id ,typeguid: this.tabs[this.tvalue1].guid}))
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
    // 品牌推荐
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
            parem = { generalattributeid: this.Modal[0],brandurl:this.Modal[1],typeguid: this.tabs[this.tvalue1].guid }
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
          .post("activity.ashx?action=selectlistbrandrecommend",this.$qs.stringify({ typeguid: this.tabs[this.tvalue1].guid }))
          .then(res => {
            if (res.status >= 0) {
              this.brandList = res.item;
              this.brandList.forEach((itmes,i)=>{
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
    removebrand(i){
        this.$axios.post("activity.ashx?action=deletebrandrecommend",this.$qs.stringify({ id: this.brandList[i].id ,typeguid: this.tabs[this.tvalue1].guid}))
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
        this.$axios.post("activity.ashx?action=deletebrandrecommend",this.$qs.stringify({ emptys: "清空" ,typeguid: this.tabs[this.tvalue1].guid}))
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
      if (this.tvalue2===2) {
         this.$axios.post("banner.ashx?action=editsortbrandrecommend",this.$qs.stringify({ id: this.brandList[i].id,xgid:this.xmodel[i] }))
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
   // 活动商品
    showModal2(i){
      if (i==="add") {
         this.goodsindex = this.goodsList.length?this.goodsList.length: 0
         this.Modal[0] = ""
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
      if (this.Modal[3]) {
          let url =""
          let parem ={}
          if (this.goodsindex === this.goodsList.length) {
            url = "activity.ashx?action=addactivecommodities"
            parem = { generalattributeid: this.Modal[1],categoryid:this.Modal[2],typeguid: this.tabs[this.tvalue1].guid ,commodityguid:this.Modal[3]}
          }else{url = "activity.ashx?action=editactivecommodities"
           parem =  { commodityguid: this.Modal[3]}
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getgoodsList()
              this.xModal6 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("数据不能为空");} 
    },
    editgoodsinit(){
        this.$axios
          .post("activity.ashx?action=editactivecommoditiesinit",this.$qs.stringify({ id: this.goodsList[this.goodsindex].id }))
          .then(res => {
            if (res.status >= 0) {
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
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    getgoodsListall(){
         this.$axios
          .post("activity.ashx?action=addactivecommoditiesinit")
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
          .post("activity.ashx?action=selectlistactivecommodities",this.$qs.stringify({ typeguid: this.tabs[this.tvalue1].guid }))
          .then(res => {
            if (res.status >= 0) {
              this.goodsList = res.item;
              this.goodsList.forEach((itmes,i)=>{ 
                  itmes.sort.forEach((item,j)=>{
                     if (item.isselect) {
                       this.$set(this.xmodel,i,item.id)
                          //this.xmodel[i] = item.id
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
        this.$axios.post("activity.ashx?action=deleteactivecommodities",this.$qs.stringify({ id: this.goodsList[i].id ,typeguid: this.tabs[this.tvalue1].guid}))
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
        this.$axios.post("activity.ashx?action=deletebrandrecommend",this.$qs.stringify({ id: "清空" ,typeguid: this.tabs[this.tvalue1].guid}))
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
      if (this.tvalue2===3) {
         this.$axios.post("activity.ashx?action=editsortactivecommodities",this.$qs.stringify({ id: this.goodsList[i].id,xgid:this.xmodel[i] }))
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
      if (this.xModal6) {
         this.Modal[3] = "";
        if (this.Modal[0]) {
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
        }else{ this.$Message.warning("品牌必须选择");}
      }
      
    },
   //广告位1
    showModal3(i){
       this.advertisingindex1 = i
       this.imgmodels = this.advertisingList1[this.advertisingindex1].picture
       this.Modal[0] = this.advertisingList1[this.advertisingindex1].urllink
      
      this.xModal8 = true
    },
    getadvertisingList1(){
         this.$axios
          .post("activity.ashx?action=selectlistadvertisingposition",this.$qs.stringify({ typeguid: this.tabs[this.tvalue1].guid ,position: 1}))
          .then(res => {
            if (res.status >= 0) {
             this.advertisingList1 = res.item
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
           parem =  { picture: this.imgmodels,urllink:this.Modal[0],id: this.advertisingList1[this.advertisingindex1].id }
          
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getadvertisingList1()
              this.xModal8 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }else{this.$Message.warning("图片必须上传");} 
    },
   //广告位2
    showModal4(i){
       this.advertisingindex2 = i
       if (this.advertisingList2.length) {
          this.imgmodels = this.advertisingList2[this.advertisingindex2].picture
       this.Modal[0] = this.advertisingList2[this.advertisingindex2].urllink
        this.Modal[1] = this.advertisingList2[this.advertisingindex2].maintitle
        this.Modal[2] = this.advertisingList2[this.advertisingindex2].vicetitle
       }else{
         this.Modal[0] = ""
         this.Modal[1] = ""
         this.Modal[2] = ""
         this.imgmodels = ""
       }
      
      this.xModal9 = true
    },
    getadvertisingList2(){
         this.$axios
          .post("activity.ashx?action=selectlistadvertisingposition",this.$qs.stringify({ typeguid: this.tabs[this.tvalue1].guid ,position: 2}))
          .then(res => {
            if (res.status >= 0) {
             this.advertisingList2 = res.item
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      },
     isok7(){
      if (this.imgmodels) {
          let url =""
          let parem ={}
           let id = ""
          if (this.advertisingList2[this.advertisingindex2]) {
            id = this.advertisingList2[this.advertisingindex2].id
          }
           url = "activity.ashx?action=editadvertisingposition"
           parem =  { picture: this.imgmodels,urllink:this.Modal[0],id,maintitle:this.Modal[1],vicetitle:this.Modal[2], }
          
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getadvertisingList2()
              this.xModal9 = false
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
       this.activityinit()
     }else if (this.tvalue2===1) {
        this.getbannerList()
     }else if (this.tvalue2===2) {
       this.getbrandList()
     }else if (this.tvalue2===3) {
      this.getgoodsList()
     }else if (this.tvalue2===4) {
      
     }else if (this.tvalue2===5) {
      this.getadvertisingList1()
     }else if (this.tvalue2===6) {
      this.getadvertisingList2()
     }
    },

  }

}
</script>
<style >
 #activity .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 14px;font-size: 14px}
 #activity .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 12px;}
.imglistbox .ivu-select-small.ivu-select-single .ivu-select-selection{border-radius: 18px;border-color: #c69c6d;color: #c69c6d;height: 20px;}
 .imglistbox1 .ivu-select-small.ivu-select-single .ivu-select-selection{border-radius: 18px;border-color: #c69c6d;color: #c69c6d;height: 20px;}
 #activity .ivu-select-arrow{color: #c69c6d}
 #activity .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value{line-height: 18px;}
</style>
<style scoped>
.switch1{color: #c69c6d;vertical-align: middle;line-height: 32px;position: absolute;top: 12px;right: 20px;}
.switch2{color: #c69c6d;vertical-align: middle;line-height: 22px;position: absolute;top: 134px;right: 20px;z-index: 99;}
#topbar { padding: 10px 15px 20px;}
.title {font-size: 18px;line-height: 20px;display: inline-block;color: #282a3c;}
.title>span{width: 10px;height: 10px;background: #c69c6d;display: inline-block;margin-right: 6px;}
.icons{transform: translateY(-1px);margin-left: 18px;margin-right: 2px;}
.tabbar{background: #fff;padding: 0 16px;}
.tabbar .tabspan{font-size: 18px;padding: 16px 8px 10px;display: inline-block;margin-right: 40px;vertical-align: middle;border-bottom: 2px solid #fff;cursor: pointer;}
.tabbar .tabspan.active{color: #c69c6d;border-bottom: 2px solid #c69c6d;vertical-align: middle;}
.tabbox {background: #fff;padding: 15px;padding-bottom: 80px;padding-top: 10px;margin-top: 10px;}
.stitle {font-size: 18px;text-align: center; margin: 25px 0;}
 .sinput {width: 240px; margin: 10px 0 40px 58px;}
  /* 活动推荐 */
.tabbox .m1_text{display: inline-block;width: 590px;vertical-align: top;padding: 20px 30px;}
.tabbox .m1_text p{font-size: 16px;color: #191919;line-height: 34px;}
.tabbox  .m1_text .numtext{text-align: right;font-size: 60px;color: rgba(25, 25, 25, 0.1);line-height: 88px;font-weight: 600}
.tabbox  .m1_text>span{font-size: 30px;color: #191919;font-family: Microsoft YaHei;border-bottom: 2px solid #c69c6d;padding: 10px 30px;margin-bottom: 40px;display: inline-block;font-weight: 700}
.tabbox  .footbtn{text-align: right;}
.tabbox  .footbtn span{margin-left: 10px;width: 30px;height: 30px;background: #c69c6d;display: inline-block;margin-top: 50px;cursor: pointer;}
.t1foot   {background: #c69c6d;height: 50px;padding: 0 20px;margin-top: 30px;}
 .tabbox .bgbox{background:#f6f6f6 ;height: 310px;width: 1800px;position: absolute;top: 68px;left: 0;z-index: -1;}
.tabbox  .s1imgbox{width: 600px;height: 460px;display: inline-block;background: url(../assets/imgs/a-1-bg.png);}
.s1imgbox img{width: 580px;height: 430px;margin: 19px 10px;}
.modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;margin-top: 10px;}
.btn2{width: 100px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 20px;height: 32px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 20px;}
.modalmain>p>span{width: 60px;display: inline-block;}
.modalmain>p .sinput { width: 300px; margin: 10px 0 10px 10px;}
.bannerbgimg{margin-left: 10px;}
.bannerimg{position: absolute;width: 750px;height: 220px;top: 0;right: 8px;}
.bannerimg2{position: absolute;width: 588px;height: 148px;top: 0;left: 70px;}
.bannerimg3{position: absolute;width: 300px;height: 223px;top: 0;left: 70px;}
.bannerimg4{position: absolute;width: 380px;height: 164px;top: 0;left: 70px;}
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
.s3imgbox1{width:590px;margin-top: 20px;margin-right: 10px;border: 1px solid #f0f0f0}
.s3imgbox1.s3imgbox10{width:382px;margin-top: 20px;margin-right: 20px;border: 1px solid #f0f0f0;display: inline-block}
.s3imgbox1 img{width: 100%;height: 100%;}
.s3imgbox1 .imgbox4{width: 380px;height: 164px;position: relative;}
.s3imgbox1 .imgbox4 img{width: 380px;height: 164px;}
.footp{text-align: right;color: #c69c6d;padding: 12px 20px;font-size: 14px}
.footp .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
.hovbox{position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 230px;height: 100px;background: #c69c6d;color: #fff;text-align: center;padding: 10px;display: none}
.hovbox span{font-size: 28px;border-bottom: 2px solid #fff;display: inline-block;padding: 0 5px 2px;}
.hovbox p {font-size: 16px;margin-top: 6px;}
.imgbox4:hover >.hovbox,.imgbox4:hover .hovbox{display: inline-block}
</style>