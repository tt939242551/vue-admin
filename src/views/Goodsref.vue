<template>
    <div id="goodsref">
      <div :class="{tabbar:true,shows:tabs.length}">
        <span v-show="tabs.length===0" class="tabspan">暂无数据</span>
        <span @click="xModal=true"  style="cursor: pointer;float: right;color: #c69c6d;font-size: 14px;"><Icon class="icons" size="18" type="ios-trash-outline" />删除</span>  
        <span @click="xModal1 = true" style="margin-right: 10px;cursor: pointer;float: right;color: #c69c6d;font-size: 14px;"><Icon class="icons" size="18" type="md-add" />新增</span>
      </div>
      <div class="tabsbox">
        <Tabs v-model="tvalue" v-if="tabs.length">
            <TabPane :label="items.title.trim()" v-for="(items,i) in tabs" :key="i">
                <div class="imglistbox1" v-if="items.item.length===5">
                 <div class="imgbox1" v-for="(item,j) in items.item" :key="j">
                   <div class="itembox">
                     <img   alt="">
                     <p>{{item.commodityname}}【GUCCL】der/吉尔·桑达Ji绗缝 单肩包绗缝单肩包</p>
                     <span class="itemnum">￥2198</span>
                  </div>
                   <p class="footer"> 
                     <span @click="showModal(j)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span>
                  </p>
                 </div>
               </div>
               <div class="imglistbox1" v-else>
                 <div :class="{imgbox1:true,farstimg:j===0}" v-for="(item,j) in items.item" :key="j">
                   <div class="itembox itembox2">
                     <img v-if="item.commoditypictures1" :src="item.commoditypictures1" alt="">
                     <img v-else src="../assets/imgs/g-bg.png" alt="">
                     <p class="logop">【GUCCL】</p>
                     <p>{{item.commodityname}}der/吉尔·桑达Ji绗缝 单肩包绗缝单肩包</p>
                  </div>
                   <p class="footer"> 
                     <span @click="showModal(j)" style="cursor: pointer;"><Icon class="icons" size="18" type="ios-create-outline" />编辑</span>
                  </p>
                 </div>
               </div>
            </TabPane>
        </Tabs>
      </div>
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
              <p>清空后数据将不可回复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="removebrandall">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
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
           tabs:[],
           Modal:[],
           styles:1,
        }
    },
    mounted(){this.getgoodsinit()},
    methods:{
        getgoodsinit(){
          this.$axios
          .post("recommendationcommodity.ashx?action=selectlist")
          .then(res => {
            if (res.status >= 0) {
             this.tabs = res.recommendationcommodity

            } else {
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
            .post("recommendationcommodity.ashx?action=add",this.$qs.stringify({ title: this.Modal[0] ,item: JSON.stringify(arr)}))
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
        removebrandall(){
            let arr = []
            arr.push(this.tabs[this.tvalue].id)
          this.$axios
          .post("recommendationcommodity.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(arr)}))
          .then(res => {
            if (res.status >= 0) {
            this.xModal = false
             this.getgoodsinit()
            } else {
              this.$Message.warning(res.content);
              this.xModal = false
            }
          })
          .catch(() => {});
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
.imgbox1{display: inline-block;margin-right: 30px;margin-bottom: 30px;border: 1px solid #f0f0f0}
.imgbox1 p{padding: 6px 12px 6px;font-size: 14px;color: #191919;}
.imgbox1>.footer>span{float: right;color: #c69c6d;margin-bottom: 10px;}
.imgbox1>.footer{padding: 10px 10px;border-top: 1px solid #f0f0f0;}
.imgbox1 p .icons{transform: translateY(-2px);margin-left: 18px;margin-right: 2px;}
.itembox{width: 220px;}
.itembox>img{width: 220px;height: 230px;border:none;}
.farstimg .itembox.itembox2>img{width: 260px;height: 420px;border:none;margin-bottom: -146px;position: relative;z-index: 9}
.itemnum{border-top: 1px solid #c69c6d;padding-top: 4px;margin: 10px 10px;display: inline-block;padding-right: 5px;}
.itembox.itembox2{text-align: center;width: 260px;}
.itembox.itembox2>img{width: 260px;height: 274px;border:none;}
.itembox2 .logop{text-align: center;color: #c69c6d;padding: 10px  0 0;margin: 0 5px;border-top: 1px solid #c69c6d;}
.itembox2>p:nth-child(3){padding-top: 0;height: 108px;}
</style>