<template>
  <div>
    <div class="order" v-if="islist">
        <Tabs v-model="tvalue">
            <TabPane label="全部订单" >
                <section class="content">
                    <p><span>会员ID</span><span>订单编号</span>
                      <span>商品信息</span><span>单价</span><span>数量</span><span>实付款</span><span>交易状态</span><span>操作</span> 
                    </p>
                    <div  v-show="isredin" class="active" v-for="(items,i) in orderList" :key="i">
                        <Checkbox style="vertical-align: top; margin-top: 26px;"  v-model="isCheck[i]"></Checkbox>
                        <span class="idspan">{{items.user_mid}}</span><span class="bspan">{{items.order_no}}</span>
                         <div class="goodslist">
                            <div v-for="(item,j) in items.list" :key="j">
                                <img :src="item.photo">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>分类：{{item.color}}</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>￥{{item.sprice}}</p>
                                     <p v-show="item.mprice">￥{{item.mprice}}</p>
                                </div>
                                <span class="number">{{item.quantity}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.realamount}}</span>
                        <div class="stutas">{{items.status_content}}</div>
                        <div class="operate">
                           <p v-show="items.status=='2'"><Button size="small" @click="show(i)" type="primary" class="btn4">确认发货</Button></p>
                           <p v-show="items.status=='3'">发货中</p>
                            <a @click="getparticulars(i)">订单详情</a>
                        </div>  
                    </div>
     
                </section>
            </TabPane>
            <TabPane label="待处理" >
                <section class="content">
                    <p><span>会员ID</span><span>订单编号</span>
                      <span>商品信息</span><span>单价</span><span>数量</span><span>实付款</span><span>交易状态</span><span>操作</span> 
                    </p>
                    <div  v-show="isredin" class="active" v-for="(items,i) in orderList" :key="i">
                        <Checkbox style="vertical-align: top;margin-top: 26px;"  v-model="isCheck[i]"></Checkbox>
                          <span class="idspan">{{items.user_mid}}</span><span class="bspan">{{items.order_no}}</span>
                        <div class="goodslist">
                            <div v-for="(item,j) in items.list" :key="j">
                                <img :src="item.photo">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>分类：{{item.color}}</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>￥{{item.sprice}}</p>
                                     <p v-show="item.mprice">￥{{item.mprice}}</p>
                                </div>
                                <span class="number">{{item.quantity}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.realamount}}</span>
                        <div class="stutas">{{items.status_content}} <p v-show="items.remindshiptime">买家已提醒发货</p><p v-show="items.remindshiptime">{{items.remindshiptime}}</p>  </div>
                        <div class="operate">
                           <p><Button size="small" @click="show(i)" type="primary" class="btn4">确认发货</Button></p>
                            <a @click="getparticulars(i)">订单详情</a>
                        </div>  
                    </div>

                </section>
            </TabPane>
            <TabPane label="发货中" >
                <section class="content">
                    <p><span>会员ID</span><span>订单编号</span>
                      <span>商品信息</span><span>单价</span><span>数量</span><span>实付款</span><span>交易状态</span><span>操作</span> 
                    </p>
                    <div  v-show="isredin" class="active" v-for="(items,i) in orderList" :key="i">
                        <Checkbox style="vertical-align: top;margin-top: 26px;"  v-model="isCheck[i]"></Checkbox>
                          <span class="idspan">{{items.user_mid}}</span><span class="bspan">{{items.order_no}}</span>
                         <div class="goodslist">
                            <div v-for="(item,j) in items.list" :key="j">
                                <img :src="item.photo">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>分类：{{item.color}}</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>￥{{item.sprice}}</p>
                                     <p v-show="item.mprice">￥{{item.mprice}}</p>
                                </div>
                                <span class="number">{{item.quantity}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.realamount}}</span>
                        <div class="stutas">{{items.status_content}}</div>
                        <div class="operate">
                           <p>发货中</p>
                            <a @click="getparticulars(i)">订单详情</a>
                        </div>  
                    </div>
                </section>
            </TabPane>
            <TabPane label="交易完成" >
                    <section class="content">
                    <p><span>会员ID</span><span>订单编号</span>
                      <span>商品信息</span><span>单价</span><span>数量</span><span>实付款</span><span>交易状态</span><span>操作</span> 
                    </p>
                    <div  v-show="isredin" class="active" v-for="(items,i) in orderList" :key="i">
                        <Checkbox style="vertical-align: top;margin-top: 26px;"  v-model="isCheck[i]"></Checkbox>
                        <span class="idspan">{{items.user_mid}}</span><span class="bspan">{{items.order_no}}</span>
                        <div class="goodslist">
                            <div v-for="(item,j) in items.list" :key="j">
                                <img :src="item.photo">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>分类：{{item.color}}</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>￥{{item.sprice}}</p>
                                     <p v-show="item.mprice">￥{{item.mprice}}</p>
                                </div>
                                <span class="number">{{item.quantity}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.realamount}}</span>
                        <div class="stutas">{{items.status_content}}</div>
                        <div class="operate">
            
                           <p>已完成</p>
                           <a @click="getparticulars(i)" >订单详情</a>
                        </div>  
                    </div>
                </section>
            </TabPane>
        </Tabs>
        <div class="foot">
            <div>
                <p style="color:#8c8c8c" @click="removelist"><Icon style="vertical-align: top;" size="18" type="ios-trash" />删除选中订单</p>
            </div>
            <div ><Page :total="total" style="float: right;padding-top: 20px;" prev-text="上一页" next-text="下一页" @on-change="getlist" /></div>
        </div>
        <Modal width="380" footer-hide v-model="xModal1" :styles="{top: '200px'}">
            <p class="stitle">填写运单号</p>
            <Input style="width:250px;margin-left: 45px;"  v-model="value" placeholder="请输入运单号" />
            <Button type="primary" class="samintbtn" @click="isok1" style="width:80px;margin-left: 130px;margin-bottom: 30px;">提交</Button>
        </Modal>
    </div>
    <div class="order2" v-else>
       <p><span></span>我的订单 > <span style="cursor: pointer;" @click="islist=true">全部订单</span> >  订单详情</p>
       <div class="content">
         <div class="msg">
           
           <p>订单状态：<span style="color:#c69c6d;"> {{orderList[tindex].status_content}}</span></p>
           <div>订单详情</div>
         </div>
         <main>
           <div style="font-size: 16px;">订单信息</div>
           <p>会员ID:  {{orderList[tindex].user_mid}}</p>
           <p>订单编号:  {{orderList[tindex].order_no}}</p>
           <p>支付交易号:  {{orderList[tindex].paynumber}}</p>
           <p>创建时间：{{orderList[tindex].newdate}}</p>
           <p>付款时间：{{orderList[tindex].paymenttime}}</p>
           <p>确认时间：{{orderList[tindex].confirmtime}}</p>
           <div class="orderList">
                    <div class="title">
                            <span>商品信息</span><span>单价</span><span>数量</span><span>金额小计</span>
                    </div>
                    <div class="main2" v-for="(item,i) in orderList[tindex].list" :key="i">
                        <div class="items"><img   style="margin: 26px 20px;width: 96px;height: 96px;" :src="item.photo" alt=""></div>
                        <div class="items item1">
                            <p  style="cursor: pointer;">{{item.title}}</p>
                            <span>分类：{{item.color}}</span><br><span>尺码：{{item.size}}</span>
                        </div>
                        <div class="items item2">
                             <p>￥{{item.sprice}}</p>
                             <p v-show="item.mprice">￥{{item.mprice}}</p>
                        </div>
                        <span class="items number">{{item.quantity}}</span>
                        <div v-show="i==0" class="mach1">￥{{orderList[tindex].payableamount}}</div>
                    </div>
            </div>
             <div class="footer">
                 <p class="point">返还{{orderList[tindex].point}}积分</p>
                 <p v-show="orderList[tindex].coupon">优惠券：{{orderList[tindex].coupon}}元</p>
                 <p>商品优惠：-￥{{orderList[tindex].discountamount}}</p>
                 <p class="machnum">实付款：<span>￥</span><span>{{orderList[tindex].realamount}}</span> </p>
             </div>
        </main>
        <main>
           <div style="font-size: 16px;">物流信息</div>
           <p>收件人：   {{orderList[tindex].name}}</p>
           <p>收货地址：{{orderList[tindex].province}}{{orderList[tindex].city}}{{orderList[tindex].area}}{{orderList[tindex].address}}</p>
           <p>邮政编码：{{orderList[tindex].zcode}}</p>
           <p>运单号：{{orderList[tindex].expressname}}</p>
        </main>
        <Button  @click="xModal2=true"   class=" btn3" >修改</Button>
      </div>
      <p><Button type="primary"  @click="islist=true"   class=" btn5" >返回</Button></p>
        <Modal v-model="xModal2" width="422"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">物流信息</div>
              <p><span>收件人</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[1]"  clearable placeholder=""> </i-input>
              </p>
              <p><span>地址信息</span> 
               <Cascader class="sinput"  style="display: inline-block;z-index: 9;" placeholder="请选择省/市/区" v-model="logistics[0]" :data="addressdata" change-on-select></Cascader></p>
              <p><span>详细地址</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[2]"  clearable placeholder=""> </i-input>
              </p>
              <p><span>邮政编码</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[3]"  clearable placeholder=""> </i-input>
              </p>
                <p><span>运单号</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[4]"  clearable placeholder=""> </i-input>
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">保存</Button>
            </div>     
        </Modal>
    </div>
  </div>
</template>

<script>
 import addressData from '../address.json';
export default {
    name: 'order',
    data(){
        return{
        tvalue: 0,
        tindex: 0,
        value:"",
        single:false,
        orderList:[],
        stuta:[],
        page: 1,
        pageSize:10,
        addressdata:addressData.list, 
        isredin: false,
        isCheck: [],
        xModal1:false,
        xModal2:false,
        islist:true,
        logistics:[[]],
        total:0,
        usmid : ''
        }
    },
    methods:{
        getgoodslist(){
            let id 
            if (this.$route.query.id) {
                id = this.$route.query.id
            }
           let url = "http://sfstyling.bogole.com/common/order.ashx"
          let params={pageindex:this.page,pageSize:this.pageSize,status:this.tvalue?this.tvalue+1:0,type:10,usmid:this.usmid}
          this.isredin = false
           this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
           if (res.status>0) {
            this.orderList = res.list
             this.orderList.forEach((items)=>{
                        items.list.forEach((item)=>{
                            if(item.photo){ 
                            item.photo = item.photo.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,30}\.jpg/)[0]  
                                }
                        })     
                    })     
           if (this.page===1) {
              this.total = res.totalCount
           } 
            setTimeout(()=>{
           this.isredin = true
            },200)
         }else{
           this.$Message.warning(res.content); 
         } 
       }).catch(()=>{
              
         } )
        },
    show(i){
      this.value = ''
       this.xModal1=true
       this.tindex = i
    },
    isok1(){
      if (this.value) {
         this.$axios.post("http://sfstyling.bogole.com/common/order.ashx",this.$qs.stringify({mark:this.orderList[this.tindex].oguid,expressname:this.value,type:11})).then(res=>{
           if (res.status>0) {
            this.xModal1=false
            this.getgoodslist()

         }else{
           this.$Message.warning(res.content); 
           this.xModal1=false
         } 
       }).catch(()=>{
              
         } ) 
      }else{this.$Message.warning("运单号不能为空")}
    },
    removelist(){
        if (this.isCheck.length) {
            let arr = []
            this.isCheck.forEach((item,i)=>{
                if (item) {
                  arr.push(this.orderList[i].oguid)  
                }
            })
        this.$axios.post("http://sfstyling.bogole.com/common/order.ashx",this.$qs.stringify({mark:arr.join(","),type:15})).then(res=>{
           if (res.status>0) {
            this.getgoodslist()
          }else{
           this.$Message.warning(res.content); 
          } 
           }).catch(()=>{     
          } ) 
        }
    },
    getparticulars(i){
      this.islist = false
      this.tindex = i
        this.logistics[0][0]=this.orderList[i].province
        this.logistics[0][1]=this.orderList[i].city
        this.logistics[0][2]=this.orderList[i].area
        this.logistics[1]=this.orderList[i].name
         this.logistics[2]=this.orderList[i].address
        this.logistics[3]=this.orderList[i].zcode
         this.logistics[4]=this.orderList[i].expressname
    },
    isok2(){
      if (this.logistics[0]&&this.logistics[1]&&this.logistics[2]&&this.logistics[3]&&this.logistics[4]) {
         this.$axios.post("http://sfstyling.bogole.com/common/order.ashx",this.$qs.stringify({mark:this.orderList[this.tindex].oguid,country:"中国大陆",province:this.logistics[0][0],city:this.logistics[0][1],area:this.logistics[0][2],
         name:this.logistics[1],address:this.logistics[2],zcode:this.logistics[3],expressname:this.logistics[4],type:12})).then(res=>{
           if (res.status>0) {
            this.xModal2 = false
             this.getgoodslist()
         }else{
           this.$Message.warning(res.content); 
           this.xModal2 = false
         } 
       }).catch(()=>{
              
         } ) 
      }else{this.$Message.warning("数据不能为空")}
    },
     getlist(index) {
       this.page = index
      this.getgoodslist()
    },
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
       vm.getgoodslist()
     })
    },
    mounted(){ 
      // this.getgoodslist()
      if (this.$route.query.id) {
        this.usmid = this.$route.query.id
      }
       this.addressdata.forEach(i=>{
         i.value = i.label
         i.children.forEach(j=>{
            j.value = j.label 
             j.children.forEach(k=>{
            k.value = k.label   
         })
         })
     })
    },
    watch : {
      tvalue : function(){
      this.isCheck = []
      this.page = 1
      this.isredin = false
      this.getgoodslist()
    }
  }
}
</script>
<style >
.order  .ivu-tabs-nav{margin: 10px  10px 0;}
.order  .ivu-tabs-nav .ivu-tabs-tab{font-size: 16px;padding: 8px 16px 16px;}
</style>
<style scoped>
.order{
    background-color: #fff;
    margin: 15px 10px;
    padding: 10px 15px 100px;
}
.content{border: 1px solid #f0f0f0;width: 1270px;margin-left: 10px}
.content>div{padding: 0 16px;border-bottom: 1px solid #f0f0f0}
.content .foot{border-bottom: none}
.content>p{background: #f6f6f6;font-size: 14px;line-height: 16px;padding: 20px 46px 20px 26px;}
.content>div>span{vertical-align: top;}
.content>div .mach{width: 100px;text-align: center;display: inline-block;margin-right: 87px;}
.allnum{font-size: 28px;color: #191919;margin-right: 20px;font-family:  Microsoft YaHei;vertical-align: bottom;}
.foot>div{width: 1270px;margin: 10px;}
.foot>div p {display: inline-block;cursor: pointer;}
.content>p>span:first-child{margin-right: 84px;margin-left: 24px;}
.content>p>span:nth-child(2){margin-right: 240px;}
.content>p>span:nth-child(3){margin-right: 248px;}
.content>p>span:nth-child(4){margin-right: 70px;}
.content>p>span:nth-child(5){margin-right: 44px;}
.content>p>span:nth-child(6){margin-right: 57px;}
.content>p>span:nth-child(7){margin-right: 80px;}
.number{width: 70px;text-align: center;display: inline-block;padding: 26px  0;vertical-align: top;height: 100%;}
.mach{ position: absolute;top: 0;left: 920px;width: 130px;text-align: center;padding: 26px  0;padding-right: 5px; border-right: 1px solid #f0f0f0;height: 100%;color: #c69c6d;font-family: Microsoft YaHei}
.stutas{position: absolute;top: 0;left: 1052px;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 100%;width: 80px;}
.stutas p{font-size: 12px;color: #c69c6d;text-align: center;}
.operate{position: absolute;top: 0;left:  1140px;text-align: center;width:116px;padding: 26px  0;}
.operate a{margin-top: 5px;display: inline-block;color: #c69c6d;text-decoration: underline}
.operate2 p:last-child{color: #8c8c8c;font-size: 12px;margin-top: 5px;display: inline-block}
.items{display: inline-block;vertical-align: top;}
.items.item1{width: 302px;padding: 26px 20px 40px 0;border-right: 1px solid #f0f0f0;height:149px;}
.items.item1>span{font-size: 12px;color: #8d8d8d;}
.items.item1>p{margin-bottom: 10px;}
.items.item2{width: 121px; text-align: center;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 149px;font-family: Microsoft YaHei}
.goodslist{display: inline-block;vertical-align: top;margin-left: 184px;}
.goodslist>div{border-top: 1px solid #f0f0f0;border-left: 1px solid #f0f0f0;border-right: 1px solid #f0f0f0;}
.goodslist>div:nth-child(1){border-top: none;}
.goodslist img{margin: 26px;margin-bottom: 0;margin-right: 20px;width: 96px;height: 96px;}
.bspan{display: inline-block;margin-left: 20px;padding: 26px 26px;height: 400px;border-left: 1px solid #f0f0f0;position: absolute;top: 0;width: 164px;text-align: center;}
.content .active>span{padding-top: 26px;display: inline-block;}
.content .active .idspan{width: 60px;text-align: center;display: inline-block}
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

.order2 .content>div{border: none}
.order2 .content{background: #fff;display: inline-block;border: 1px solid #f9f6f1;padding: 20px 0px;font-size: 14px;color: #191919;margin-bottom: 20px;margin-left: 10px;width: 98.5%;}
.order2 .msg>p:nth-child(2){font-size: 16px;margin-top: 16px;}
.order2 .msg{margin-bottom: 15px;padding-left: 18px;}
.order2>p{margin: 10px 20px 20px 20px ;}
.order2>p>span:nth-child(1){width: 10px;height: 10px;background-color: #c69c6d;margin-right: 8px;display: inline-block}
.order2 .msg>div{font-size: 18px;color: #191919;margin-top: 20px;}
.order2 main{border-top: 1px solid #f0f0f0;padding: 15px 40px;}
.order2 main>p{font-size: 12px;font-family: Microsoft YaHei;margin-top: 5px;}
.order2 .orderList{position: relative;overflow: hidden;border: 1px solid #f9f6f1;margin-top: 18px;width: 778px;}
.order2 .title{background: #f6f6f6;padding: 6px 30px;font-size: 12px;}
.order2 .title>span{margin-left: 76px;}
.order2 .title>span:first-child{margin-left: 100px;}
.order2 .title>span:nth-child(2){margin-left: 310px;}
.order2 .main2{height: 150px;}
.order2 .items{display: inline-block;vertical-align: top;border-top: 1px solid #f0f0f0;}
.order2 .items.item1{width: 308px;padding: 26px 16px 26px 0;border-right: 1px solid #f0f0f0;height: 100%;}
.order2 .items.item1>span{font-size: 12px;color: #8d8d8d;}
.order2 .items.item1>p{margin-bottom: 10px;}
.order2 .items.item2{width: 119px; text-align: center;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 100%;font-family: Microsoft YaHei}
 .items.item2>p:last-child{font-size: 12px;color: #8d8d8d;text-decoration: line-through;margin-top: 6px;font-family: Microsoft YaHei}
.order2 .number{width:78px;text-align: center;display: inline-block;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 100%;}
.order2 .mach1{ position: absolute;top: 30px;left: 637px;width: 140px;text-align: center;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 100%;font-family: Microsoft YaHei}
.order2 .stutas1{position: absolute;top: 30px;left: 809px;padding: 26px  0;height: 100%;width:93px;}
.order2 .btn4{width:80px;border-radius: 4;font-size: 14px;line-height: 22px;}
.order2 .operate1 p a{color: #575552;margin-top: 5px;display: inline-block}
.order2 .operate2 p:last-child{color: #8c8c8c;font-size: 12px;margin-top: 5px;display: inline-block}
.order2 .footer{width: 778px;}
.order2 .footer p{text-align: right;font-size: 12px;font-family: Microsoft YaHei;color: #575552;}
.order2 .footer .point{vertical-align: top;text-align: left;transform: translateY(12px)}
.order2 .footer .point img{margin-left: 10px;transform: translateY(2px)}
.order2 .footer .machnum{font-size: 14px;color: #8d8d8d;}
.order2 .machnum span:nth-child(1){font-size: 16px;color: #191919;font-weight: 500}
.order2 .machnum span:nth-child(2){font-size: 30px;color: #191919;font-weight: 500}
.order2 .btn3{border-radius: 4;font-size: 14px;line-height:14px;height: 28px;color: #c69c6d;border: 1px solid #c69c6d;margin: 0 40px 40px;width: 70px;}
.btn5{margin: 0 0 100px 10px;width: 90px;}
.modalmain{padding: 20px 30px;}
.modalmain>p{font-size: 14px;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;}
.btn2{width: 80px;margin-left: 70px;border-radius:4;font-size: 14px;line-height: 22px;margin-top: 10px;}
.mtitle{font-size: 20px;font-weight: 500;margin-bottom: 10px;}
.modalmain>p>span{width: 60px;display: inline-block;}
 .modalmain>p .sinput {
  width: 250px;
  margin: 10px 0 10px 10px;
}

</style>