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
                        <span class="idspan">{{items.vipid}}</span><span class="bspan">{{items.ordernumber}}</span>
                         <div class="goodslist">
                            <div v-for="(item,j) in items.item" :key="j">
                                <img :src="item.commoditypicture">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>颜色：红色</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>{{item.Price}}</p>
                                </div>
                                <span class="number">{{item.count}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.actuapayment}}</span>
                        <div class="stutas">{{items.tradingstatus}}</div>
                        <div class="operate">
                           <p v-if="items.tradingstatus==='代发货'"><Button size="small" @click="show(i)" type="primary" class="btn4">确认发货</Button></p>
                           <p v-else>发货中</p>
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
                        <span>{{items.vipid}}</span><span class="bspan">{{items.ordernumber}}</span>
                         <div class="goodslist">
                            <div v-for="(item,j) in items.item" :key="j">
                                <img :src="item.commoditypicture">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>颜色：红色</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>{{item.Price}}</p>
                                </div>
                                <span class="number">{{item.count}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.actuapayment}}</span>
                        <div class="stutas">{{items.tradingstatus}}</div>
                        <div class="operate">
                           <p v-if="items.tradingstatus==='代发货'"><Button size="small" @click="xModal1=true" type="primary" class="btn4">确认发货</Button></p>
                           <p v-else>发货中</p>
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
                        <span>{{items.vipid}}</span><span class="bspan">{{items.ordernumber}}</span>
                         <div class="goodslist">
                            <div v-for="(item,j) in items.item" :key="j">
                                <img :src="item.commoditypicture">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>颜色：红色</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>{{item.Price}}</p>
                                </div>
                                <span class="number">{{item.count}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.actuapayment}}</span>
                        <div class="stutas">{{items.tradingstatus}}</div>
                        <div class="operate">
                           <p>发货中</p>
                            <a @click="getparticulars(i)">订单详情</a>
                        </div>  
                    </div>
                </section>
            </TabPane>
            <TabPane label="已完成" >
                    <section class="content">
                    <p><span>会员ID</span><span>订单编号</span>
                      <span>商品信息</span><span>单价</span><span>数量</span><span>实付款</span><span>交易状态</span><span>操作</span> 
                    </p>
                    <div  v-show="isredin" class="active" v-for="(items,i) in orderList" :key="i">
                        <Checkbox style="vertical-align: top;margin-top: 26px;"  v-model="isCheck[i]"></Checkbox>
                        <span>{{items.vipid}}</span><span class="bspan">{{items.ordernumber}}</span>
                         <div class="goodslist">
                            <div v-for="(item,j) in items.item" :key="j">
                                <img :src="item.commoditypicture">
                                <div class="items item1">
                                    <p >{{item.commodityname}}</p>
                                    <span>颜色：红色</span><br><span>尺码：{{item.size}}</span>
                                </div>
                                <div class="items item2">
                                    <p>{{item.Price}}</p>
                                </div>
                                <span class="number">{{item.count}}</span>
                            </div>
                         </div>   
                        <span class="mach">{{items.actuapayment}}</span>
                        <div class="stutas">{{items.tradingstatus}}</div>
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
                <p style="color:#8c8c8c" @click="removelist"><Icon style="vertical-align: top;" size="18" type="ios-trash" />删除选中商品</p>
            </div>
            <div ><Page :total="total" style="float: right;padding-top: 20px;" prev-text="上一页" next-text="下一页" @on-change="getlist" /></div>
        </div>
        <Modal width="380" footer-hide v-model="xModal1" :styles="{top: '200px'}">
            <p class="stitle">填写运单号</p>
            <Input class="sinput" v-model="value" placeholder="请输入运单号" />
            <Button type="primary" class="samintbtn" @click="isok1" style="width:80px;margin-left: 123px;margin-bottom: 30px;">提交</Button>
        </Modal>
    </div>
    <div class="order2" v-else>
       <p><span></span>我的订单 > <span style="cursor: pointer;" @click="islist=true">全部订单</span> >  订单详情</p>
       <div class="content">
         <div class="msg">
           
           <p>订单状态：<span style="color:#c69c6d;"> {{Orderlist[0].tradingstatus}}</span></p>
           <div>订单详情</div>
         </div>
         <main>
           <div style="font-size: 16px;">订单信息</div>
           <p>会员ID:  {{Orderlist[0].vipid}}</p>
           <p>订单编号:  {{Orderlist[0].ordernumber}}</p>
           <p>支付宝交易号:  {{Orderlist[0].vipid}}</p>
           <p>创建时间：{{Orderlist[0].adddate}}</p>
           <p>付款时间：{{Orderlist[0].paymentdate}}</p>
           <p>确认时间：{{Orderlist[0].confirmdate}}</p>
           <div class="orderlist">
                    <div class="title">
                            <span>商品信息</span><span>单价</span><span>数量</span><span>金额小计</span><span>交易状态</span>
                    </div>
                    <div class="main2" v-for="(item,i) in Orderlist[0].item" :key="i">
                        <div class="items"><img   style="margin: 26px 20px;width: 96px;height: 96px;" :src="item.commoditypicture" alt=""></div>
                        <div class="items item1">
                            <p  style="cursor: pointer;">{{item.commodityname}}</p>
                            <span>颜色：红色</span><br><span>尺码：{{item.size}}</span>
                        </div>
                        <div class="items item2">
                            <p>{{item.Price}}</p>
                            <p>￥1,456.00</p>
                        </div>
                        <span class="items number">{{item.count}}</span>
                        <div class="mach1">￥1,456.00</div>
                        <div class="stutas1">交易成功 </div>
                    </div>
            </div>
             <div class="footer">
                 <p class="point">返还{{Orderlist[0].integral}}积分</p>
                 <p>优惠券：300元</p>
                 <p>商品优惠：-￥2312</p>
                 <p class="machnum">实付款：<span>￥</span><span>{{Orderlist[0].actuapayment}}</span> </p>
             </div>
        </main>
        <main>
           <div style="font-size: 16px;">物流信息</div>
           <p>收件人：   {{logistics[0]}}</p>
           <p>收货地址：{{logistics[1]}}</p>
           <p>邮政编码：{{logistics[2]}}</p>
           <p>运单号：{{logistics[3]}}</p>
        </main>
        <Button  @click="xModal2=true"   class=" btn3" >修改</Button>
      </div>
      <p><Button type="primary"  @click="islist=true"   class=" btn5" >返回</Button></p>
        <Modal v-model="xModal2" width="422"  footer-hide :styles="{top: '200px'}">
            <div class="modalmain">
              <div class="mtitle">物流信息</div>
              <p><span>收件人</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[0]"  clearable placeholder=""> </i-input>
              </p>
              <p><span>收货地址</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[1]"  clearable placeholder=""> </i-input>
              </p>
              <p><span>邮政编码</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[2]"  clearable placeholder=""> </i-input>
              </p>
                <p><span>运单号</span>
                 <i-input class="sinput" 
                        type="text" v-model="logistics[3]"  clearable placeholder=""> </i-input>
              </p>
              <Button size="small" @click="isok2" type="primary" class="btn2">保存</Button>
            </div>     
        </Modal>
    </div>
  </div>
</template>

<script>
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
        isredin: false,
        isCheck: [],
        xModal1:false,
        xModal2:false,
        islist:true,
        Orderlist:["",{c:3}],
        logistics:[],
        total:0,
        }
    },
    methods:{
        getgoodslist(num){
            let id 
            if (this.$route.query.id) {
                id = this.$route.query.id
            }
           let url = "order_management.ashx?action=selectlist"
          let params={page:this.page,pageSize:this.pageSize,vipid:id,typeid:this.tvalue?this.tvalue:null,ordernumber:num}
          this.isredin = false
           this.$axios.post(url,this.$qs.stringify(params)).then(res=>{
           if (res.status>=0) {
            this.orderList = res.item
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
     selectionChange(a){
      this.isCheck = []
     a.forEach((item)=>{
       if(this.isCheck.indexOf(item.id)<0){
         this.isCheck.push(item.id)
       }
     })
    },
    show(i){
       this.xModal1=true
       this.tindex = i
    },
    isok1(){
      if (this.value) {
         this.$axios.post("order_management.ashx?action=FAH",this.$qs.stringify({id:this.orderList[this.tindex].id,express:this.value})).then(res=>{
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
                  arr.push(this.orderList[i].id)  
                }
            })
        this.$axios.post("order_management.ashx?action=delete",this.$qs.stringify({ids:JSON.stringify(arr)})).then(res=>{
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
        this.$axios.post("order_management.ashx?action=selectdetails",this.$qs.stringify({id:this.orderList[i].id})).then(res=>{
           if (res.status>0) {
            this.islist=false
            this.Orderlist = res.item
            this.logistics[0]=res.item[0].consignee
            this.logistics[1]=res.item[0].receivingaddress
            this.logistics[2]=res.item[0].postalcode
            this.logistics[3]=res.item[0].express
         }else{
           this.$Message.warning(res.content); 
         } 
       }).catch(()=>{
              
         } ) 
    },
    isok2(){
      if (this.logistics[0]&&this.logistics[1]&&this.logistics[2]&&this.logistics[3]) {
         this.$axios.post("order_management.ashx?action=editinformation",this.$qs.stringify({id:this.orderList[this.tindex].id,consignee:this.logistics[0],receivingaddress:this.logistics[1],postalcode:this.logistics[2],express:this.logistics[3]})).then(res=>{
           if (res.status>0) {
            this.xModal2 = false
      
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
       this.getgoodslist()
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
.order2 .orderlist{position: relative;overflow: hidden;border: 1px solid #f9f6f1;margin-top: 18px;width: 906px;}
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
.order2 .items.item2>p:last-child{font-size: 12px;color: #8d8d8d;text-decoration: line-through;margin-top: 6px;font-family: Microsoft YaHei}
.order2 .number{width:78px;text-align: center;display: inline-block;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 100%;}
.order2 .mach1{ position: absolute;top: 30px;left: 637px;width: 140px;text-align: center;padding: 26px  0;border-right: 1px solid #f0f0f0;height: 100%;font-family: Microsoft YaHei}
.order2 .stutas1{position: absolute;top: 30px;left: 809px;padding: 26px  0;height: 100%;width:93px;}
.order2 .btn4{width:80px;border-radius: 4;font-size: 14px;line-height: 22px;}
.order2 .operate1 p a{color: #575552;margin-top: 5px;display: inline-block}
.order2 .operate2 p:last-child{color: #8c8c8c;font-size: 12px;margin-top: 5px;display: inline-block}
.order2 .footer{width: 906px;}
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