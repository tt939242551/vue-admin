<template>
    <div id="discountgoods">
      <div id="topbar">
        <p class="title"><span></span>折扣商品</p>
        <div class="switch1">开启折扣商品 
         <template>
              <i-switch style="transform: translateY(-2px);margin-left: 8px;" v-model="isopen" size="small"  />
         </template>
         </div>
      </div>
      <div class="tabbox">
         <Tabs v-model="tvalue">
            <TabPane  label="折扣商品">
                <div class="main1" >
                     <p v-for="(item,i) in categoryList" :key="i"><span style="cursor: pointer;" :class="{activ:i===categoryvalue}"  @click="categoryvalue=i">{{item.title}}</span>
                          <Button type="primary"  @click="eaitcategory(i)" shape="circle" icon="ios-create-outline" style="width:24px;height:24px;" size="small"><Icon type="ios-create-outline" /></Button>
                          <Button   @click="removecategory(i)" shape="circle" icon="md-remove" style="margin-left: 8px;width:24px;height:24px;" size="small"></Button>
                    </p>
                      <Button  type="primary" :disabled="categoryList.length>=4"  style="height: 28px;margin: 0 20px 20px;width:100px;border-radius: 4px; border:none" @click="eaitcategory('add')" ><Icon size="18" style="transform: translateY(-2px)" type="md-add" /></Button> 
                    <p><span>MORE+</span></p>
                </div>
                <div class="main2" v-if="categoryList.length">
                    <img @click="eaitgoods('add')" style="vertical-align: top;margin: 10px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
                    <div class="imglistbox1 imglistbox2" >
                        <div class="imgbox1" v-for="(item,i) in categoryList[categoryvalue].item" :key="i">
                            <div class="itembox itembox1">
                                 <img v-if="item.commoditypictures1" style="width: 220px;height: 264px;border:none;" :src="item.commoditypictures1" alt="">  <span v-else class="bgtext">暂无图片</span>
                                 <p v-if="item.commodityname">{{item.commodityname}}</p><p v-else>商品名称</p>
                                 <span  v-if="item.Price" class="itemnum">￥{{Math.round(item.Price*item.discount*100)/100}}</span> <span v-else class="itemnum"> 价格</span><span class="lastnum">￥{{item.Price}}</span>
                                <span class="itemtab" >折扣商品</span>
                            
                            </div>
                            <p class="footerp"> 
                                <template>
                                    <i-switch @on-change="switchsth(i)" style="transform: translateY(-2px);margin-left: 8px;" v-model="item.isselect" size="small"  />
                                </template>
                                <span class="floutspan"><span @click="eaitgoods(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removegoods(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                            </p>
                        </div>
                        <p><span  @click="xModal3=true"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />清空</span></p>
                    </div>
                </div>
            </TabPane>
            <TabPane  label="折扣设置">
               <img @click="eaitdiscount('add')" style="vertical-align: top;margin: 25px 40px 10px 0;" src="../assets/imgs/add-1.png" alt="">
               <div class="imglistbox1 imglistbox3">
                 <div class="imgbox1" v-for="(item,i) in discountlist" :key="i">
                   <img src="../assets/imgs/d-bg.png" alt="">
                   <span class="disnumber">{{item.discount.length===4?item.discount:item.discount+"0"}}</span>
                   <p> 
                     <span><span @click="eaitdiscount(i)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />修改</span><span @click="removediscount(i)"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span></span>
                  </p>
                 </div>
                 <p><span @click="xModal5=true"  style="cursor: pointer;"><Icon class="icons" size="18" type="ios-trash-outline" />清空</span></p>
               </div>
            </TabPane>
        </Tabs>
     </div> 
      <Modal v-model="xModal1" width="480"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">{{categoryindex==="add"?"新增":"编辑"}}类别</div>
              <p><span>类别</span>
                 <i-input class="sinput" 
                     placeholder="请填写类别"   type="text" v-model="Modal[0]"  clearable> </i-input>
              </p>
              <Button size="small" @click="isok1" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal v-model="xModal2" width="420"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">{{goodsindex === "add"?"新增": "修改"}}折扣商品</div>
              <p><span>折扣优惠</span>
                <Select  placeholder="请选择折扣优惠" v-model="Modal[4]" style="width:250px;margin-left: 10px;">
                        <Option v-for="(item,j) in discountsettings" :value="item.guid" :key="j">{{item.discount}}</Option>
                </Select>
              </p>
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
                        <Option value="" >不限</Option>
                        <Option v-for="(item,j) in commodity" :value="item.guid" :key="j">{{item.title}}</Option>
                </Select>
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">提交</Button>
            </div>     
        </Modal>
        <Modal footer-hide v-model="xModal3" width="360" :styles="{top: '200px'}">
            <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
                <p>请确认是否清空商品？</p>
                <p>清空后数据将不可恢复</p>
            </div>
            <div style="text-align:center;margin: 20px 0 ;">
                <Button style="width:80px" type="primary" class="samintbtn" @click="removegoodslist">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal3=false">取消</Button>
            </div>
        </Modal>
        
        <Modal width="380" footer-hide v-model="xModal4" :styles="{top: '200px'}">
            <p class="stitle">{{discountindex === "add"?"新增": "修改"}}折扣</p>
            <Input class="sinput" :maxlength="4" v-model="Modal[0]" placeholder="请输入折扣" />
            <p class="dtext">*数字范围为 0.01-0.99，且有效小数点为2位；</p>
            <Button type="primary" class="samintbtn" @click="isok3" style="width:80px;margin-left: 135px;margin-bottom: 30px;">提交</Button>
        </Modal>
        <Modal footer-hide v-model="xModal5" width="360" :styles="{top: '200px'}">
            <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
                <p>请确认是否清空设置？</p>
                <p>清空后数据将不可恢复</p>
            </div>
            <div style="text-align:center;margin: 20px 0 ;">
                <Button style="width:80px" type="primary" class="samintbtn" @click="removediscountall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
            </div>
        </Modal>
         <Modal footer-hide v-model="xModal6" width="360" :styles="{top: '200px'}">
            <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
                <p>首页展示位商品已满。</p>
                <p>请关闭其中展示位再进行开启</p>
            </div>
            <div style="text-align:center;margin: 20px 0 ;">
                <Button style="width:80px" type="primary" class="samintbtn" @click="xModal6=false">确定</Button>
            </div>
        </Modal>
    
    </div>
</template>

<script>
export default {
    name: 'discountgoods',
    data(){
        return{
           tvalue: 0,
           isopen: true,
           xModal1: false,
           xModal2:false,
           xModal3:false,
           xModal4:false,
           xModal5:false,
           xModal6:false,
           Modal:[],
           categoryList: [], 
           categoryindex:0,
           categoryvalue:0,
           goodsindex:0,
           discountsettings:[],
           parentcategory:[],
           generalattribute:[],
           commodity:[],
           category:[],
           discountlist:[],
           discountindex:0,
        }
    },
    mounted(){this.getinit()
      this.getdiscountlist()
    },
    methods:{
        getinit(){
           this.$axios.post("discount.ashx?action=selectlist")
          .then(res => {
            if (res.status > 0) {
              this.categoryList = res.discounts
              if (this.categoryList.length) {
                  this.categoryList.forEach(item=>{
                  item.item.forEach((itmes)=>{ 
                   if(itmes.commoditypictures1){ 
                    itmes.commoditypictures1 = itmes.commoditypictures1.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,30}\.jpg/)[0] 
                 }
              })
               })
              }
             
              
            } else {
              this.$Message.warning(res.content); 
            }
          })
          .catch(() => {});   
        },
        eaitcategory(i){
            this.categoryindex = i
            if (i==="add") {
               this.Modal[0]=""
               this.Modal[1]=""
            }else{
               this.Modal[0]=this.categoryList[i].title
               this.Modal[1]=this.categoryList[i].discounturl
            }
             this.xModal1 = true
        },
        isok1(){
        if (this.Modal[0]) {
          let url =""
          let parem ={}
          if (this.categoryindex === "add") {
            url = "discount.ashx?action=add"
            parem = {title: this.Modal[0],typeid:1,parentid:0}
          }else{url = "discount.ashx?action=edit"
           parem =  { title: this.Modal[0],id:this.categoryList[this.categoryindex].id,}
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status > 0) {
              this.getinit()
              this.xModal1 = false
            } else {
              this.$Message.warning(res.content);
              this.xModal1 = false
            }
          })
          .catch(() => {});
          }else{this.$Message.warning("数据不能为空");} 
        },
        removecategory(i){
           let arr = []
            arr.push(this.categoryList[i].id)
          this.$axios
          .post("discount.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(arr)}))
          .then(res => {
            if (res.status >= 0) {
             this.getinit()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
       //折扣商品
        eaitgoods(i){
            this.goodsindex = i
            if (i==="add") {
               this.Modal[0]=""
               this.Modal[1]=""
               this.Modal[2]=""
               this.Modal[3]=""
               this.Modal[4]=""
               this.getaddgoods()
            }else{
              this.editgoodsinit()
            }
             this.xModal2 = true
        },
        getaddgoods(){
         this.$axios
          .post("discount.ashx?action=addinit")
          .then(res => {
            if (res.status >= 0) {
             this.discountsettings = res.discountsettings
             this.generalattribute = res.generalattribute[0].item
             this.parentcategory = res.parentcategory
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
        editgoodsinit(){
        this.$axios
          .post("discount.ashx?action=editinit",this.$qs.stringify({ id: this.categoryList[this.categoryvalue].item[this.goodsindex].id }))
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
             this.discountsettings = res.discountsettings
              this.discountsettings.forEach(item=>{
                if (item.isselect) {
                  this.Modal[4] = item.guid
                }
              })
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
       },
    isok2(){
      if (this.Modal[4]) {
        if (this.Modal[0]||this.Modal[1]) {
            let url =""
          let parem ={}
          if (this.goodsindex === "add") {
            url = "discount.ashx?action=add"
            parem = { generalattributeid: this.Modal[0],parentcategoryid:this.Modal[1],categoryid:this.Modal[2],typeid: 2 ,commodityid:this.Modal[3],dsid:this.Modal[4],title:this.categoryList[this.categoryvalue].title,parentid:this.categoryList[this.categoryvalue].id}
          }else{url = "discount.ashx?action=edit"
           parem =  { commodityid: this.Modal[3],dsguid:this.Modal[4],id:this.categoryList[this.categoryvalue].item[this.goodsindex].id,title:this.categoryList[this.categoryvalue].title,parentid:this.categoryList[this.categoryvalue].id}
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status >= 0) {
              this.getinit()
              this.xModal2 = false
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        }else{this.$Message.warning("品牌或类别必须选择一个");} 
        
         }else{this.$Message.warning("折扣必须选择");} 
       },
        removegoods(i){
           let arr = []
            arr.push(this.categoryList[this.categoryvalue].item[i].id)
          this.$axios
          .post("discount.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(arr),parentid:this.categoryList[this.categoryvalue].id}))
          .then(res => {
            if (res.status >= 0) {
             this.getinit()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
        removegoodslist(){
         this.$axios
          .post(
            "discount.ashx?action=delete",
            this.$qs.stringify({ emptys: "清空" ,parentid:this.categoryList[this.categoryvalue].id})
          )
          .then(res => {
            if (res.status >= 0) {
              this.getinit()
              this.xModal3 = false
            } else {
               this.xModal3 = false
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
        if (this.xModal2) {
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
            } 
        }
      
    },
    switchsth(i){  
         let n = 0
         let goodsList =  this.categoryList[this.categoryvalue].item
         goodsList.forEach(item=>{
           if (item.isselect) {
             n++
           }
         })
         if (n>4) {
          this.getinit()
          this.xModal6 = true
         }else{
              let parme = {}
              parme.id =  goodsList[i].id
              parme.isselect = goodsList[i].isselect
            this.$axios.post("discount.ashx?action=editisselect",this.$qs.stringify(parme))
              .then(res => {
                if (res.status > 0) {
                } else {
                  this.$Message.warning(res.content); 
                }
              })
              .catch(() => {}); 
         }
      
    },
    //折扣设置
    getdiscountlist(){
         this.$axios
          .post("discount.ashx?action=selectlistseting")
          .then(res => {
            if (res.status >= 0) {
             this.discountlist = res.discountsettings
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    eaitdiscount(i){
      this.discountindex = i
      if (i==="add") {
        this.Modal[0]=""
            }else{
              this.Modal[0] = this.discountlist[i].discount
            }
        this.xModal4 = true
        },
     isok3(){
        if (this.Modal[0]>=0.01&&this.Modal[0]<=0.99) {
          let url =""
          let parem ={}
          if (this.discountindex === "add") {
            url = "discount.ashx?action=addseting"
            parem = {discount: this.Modal[0]}
          }else{url = "discount.ashx?action=editseting"
           parem =  { discount: this.Modal[0], id:this.discountlist[this.discountindex].id}
          }
         this.$axios.post(url,this.$qs.stringify(parem))
          .then(res => {
            if (res.status > 0) {
               this.getdiscountlist()
              this.xModal4 = false
            } else {
              this.$Message.warning(res.content);
              this.xModal4 = false
            }
          })
          .catch(() => {});
          }else{this.$Message.warning("折扣格式不正确");} 
        },
      removediscount(i){
           let arr = []
            arr.push(this.discountlist[i].id)
          this.$axios
          .post("discount.ashx?action=deleteseting",this.$qs.stringify({ids: JSON.stringify(arr)}))
          .then(res => {
            if (res.status >= 0) {
             this.getdiscountlist()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
     removediscountall(){
          this.$axios
          .post("discount.ashx?action=deleteseting",this.$qs.stringify({emptys: "清空"}))
          .then(res => {
            if (res.status >= 0) {
             this.xModal5=false
             this.getdiscountlist()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
    }
}
</script>
<style>
   #discountgoods .ivu-tabs-nav .ivu-tabs-tab{font-size: 16px;padding: 14px 12px;}
  #discountgoods .ivu-tabs-bar{margin-bottom: 0;}
 #discountgoods .ivu-icon.ivu-icon-md-remove{transform: translateY(-2px);font-size: 18px;color: #c69c6d;}
 #discountgoods .ivu-icon.ivu-icon-ios-create-outline{transform: translate(-4px,-3px);font-size: 16px}
</style>
<style scoped>
  .switch1{color: #c69c6d;vertical-align: middle;line-height: 32px;position: absolute;top: 12px;right: 20px;}
  .switch2{color: #c69c6d;vertical-align: middle;line-height: 22px;position: absolute;top: 216px;right: 20px;z-index: 99;}
  #topbar { padding: 10px 15px 20px;}
  .title {font-size: 18px;line-height: 20px;display: inline-block;color: #282a3c;}
  .title>span{width: 10px;height: 10px;background: #c69c6d;display: inline-block;margin-right: 6px;}

  .tabbox {background: #fff;padding: 20px;padding-bottom:0px;padding-top: 6px;margin-top: 10px;}
  .modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;margin-top: 20px;}
.btn2{width: 100px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 30px;height: 32px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 20px;}
.modalmain>p>span{width: 60px;display: inline-block;}
.modalmain>p .sinput { width: 300px; margin: 10px 0 10px 10px;}
.main1>p>span{width: 140px;height: 34px;background: #f9f5f0;display: inline-block;text-align: center;color: #c69c6d;font-size: 14px;padding-top: 6px;margin-right: 10px;border-radius: 4px}
.main1>p{margin-bottom: 20px;}
.main1{padding-top: 20px;width: 270px;height: 100%;display: inline-block;vertical-align: top;}
.main2{display: inline-block;width: calc(100% - 280px);padding-top: 10px;border-left: 1px solid #e6e6e6;padding-left: 50px;padding-bottom: 40px;}
.activ{border: 1px solid #c69c6d}
 /* 折扣商品 */
.imglistbox1>p{margin-top: -10px;}
.imglistbox1>p .icons{transform: translateY(-2px);}
.imgbox1{display: inline-block;margin-right: 30px;margin-bottom: 30px;border: 1px solid #f0f0f0}
.imgbox1 p{padding: 8px;}
.imgbox1 p>.floutspan{float: right;color: #c69c6d;}
.imgbox1 p .icons{transform: translateY(-2px);margin-left: 18px;}
.imglistbox1.imglistbox2{display: inline-block;min-width: 520px;margin-top: 10px;}
.itembox{width: 220px;height: 360px;position: relative;display: inline-block;margin-right: 16px}
.itembox img{width: 100%;}
.itembox p{font-size: 14px;color: #2f2f2f;padding: 0 10px;height: 42px;overflow: hidden;}
.itemtab{position: absolute;top: 0;left: 0;background: #191919;color: #fff;padding: 3px 12px;border-bottom-right-radius: 10px }
.itemnum{border-top: 1px solid #c69c6d;padding-top: 4px;margin: 10px 10px;display: inline-block;padding-right: 5px;}
.itembox1{border:none;margin-top: 10px;margin: 0 auto;}
.itembox.itembox1 .lastnum{color: #9c9c9c;font-weight: 500;text-decoration:line-through;font-family: Microsoft YaHei}
 /* 折扣设置 */
.stitle {font-size: 18px;text-align: center; margin: 25px 0;}
 .sinput {width: 240px; margin: 10px 0 40px 58px;font-size: 14px}
.imglistbox1.imglistbox3{width: 800px;display: inline-block;margin-top: 25px;padding-bottom: 40px;}
.imglistbox1.imglistbox3 .imgbox1{text-align: center;position: relative;width: 160px;height: 150px;}
.imglistbox1.imglistbox3 .imgbox1 .disnumber{color: #c69c6d;width: 100%;text-align: center;position: absolute;left: 0;top: 48px;font-size: 36px;font-family: Microsoft YaHei}
.imglistbox1.imglistbox3 .imgbox1>p{border-top: 1px solid #f0f0f0;margin-top: 40px;padding: 0; padding-top: 12px;color: #c69c6d;padding-left: 20px;}
.imglistbox1.imglistbox3 .imgbox1>p .icons{transform: translateY(-2px);margin: 0;}
.imglistbox1.imglistbox3 .imgbox1>p span:first-child{margin: 0 35px 0 0;}
.dtext{text-align: center;font-size: 12px;color: #c69c6d;transform: translate(6px,-32px)}

</style>