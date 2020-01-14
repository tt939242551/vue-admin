<template>
    <div id="statistics">

       <div class="tabbox">
        <Tabs v-model="tvalue" >
            <TabPane  label="今日数据">
                <div class="header">
                    <div>
                        <div class="headitem">
                            <img src="../assets/imgs/st-1.png" alt="">
                        
                            <p style="color:#c69c6d"><span style="font-size: 20px;">￥</span>{{data1.profits}}</p>
                            <div></div>
                            <div class="bgbox" :style="{width:data1.profits_percentage,background:'#c69c6d'}" ref="box1"></div>
                            <p class="foots">今日百分比<span>{{data1.profits_type }} {{ data1.profits_percentage}}</span></p>
                        </div>
                    </div>
                    <div>
                        <div class="headitem">
                            <img src="../assets/imgs/st-2.png" alt="">
                            <p style="color:#36a3f7">{{data1.pv}}</p>
                            <div></div>
                            <div class="bgbox" :style="{width:data1.pv_percentage,background:'#36a3f7'}" ref="box2"></div>
                            <p class="foots">今日百分比<span>{{data1.pv_type }} {{data1.pv_percentage}}</span></p>
                        </div>
                    </div>
                    <div>
                        <div class="headitem">
                            <img src="../assets/imgs/st-3.png" alt="">
                            <p style="color:#f4516c">{{data1.orders}}</p>
                            <div></div>
                            <div class="bgbox" :style="{width:data1.orders_percentage,background:'#f4516c'}" ref="box3"></div>
                            <p class="foots">今日百分比<span>{{data1.orders_type }} {{data1.orders_percentage}}</span></p>
                        </div>
                    </div>
                    <div>
                        <div class="headitem">
                            <img src="../assets/imgs/st-4.png" alt="">
                            <p style="color:#34bfa3">{{data1.users}}</p>
                            <div></div>
                            <div class="bgbox" :style="{width:data1.users_percentage,background:'#34bfa3'}" ref="box4"></div>
                            <p class="foots">今日百分比<span>{{data1.users_type}} {{data1.users_percentage}}</span></p>
                        </div>
                    </div>
                </div>
            </TabPane>
            <TabPane  label="总的统计">
                <div class="header">
                    <div>
                        <div class="headitem headitem1">
                            <img src="../assets/imgs/sum-1.png" alt="">
                            <p style="color:#c69c6d"><span style="font-size: 20px;">￥</span>{{sumdata.profits_sums/1000}}K</p>
                        </div>
                    </div>
                    <div>
                        <div class="headitem headitem1">
                            <img src="../assets/imgs/sum-2.png" alt="">
                            <p style="color:#36a3f7">{{sumdata.pv_sums}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="headitem headitem1">
                            <img src="../assets/imgs/sum-3.png" alt="">
                            <p style="color:#f4516c">{{sumdata.orders_sums}}</p>
                        </div>
                    </div>
                    <div>
                        <div class="headitem headitem1">
                            <img src="../assets/imgs/sum-4.png" alt="">
                            <p style="color:#34bfa3">{{sumdata.users_sums}}</p>
                        </div>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        <DatePicker v-show="tvalue==1" @on-change="setvalue2" confirm :options="options" @on-ok="getsmu" :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期" size="small" style="width: 200px;position: absolute;top: 16px;right:30px;"></DatePicker>
     </div>  
        <div class="echarts">
            <p class="echarthead"><!-- <img src="../assets/imgs/st-5.png" alt=""> --><span @click="changeline(0)" :class="{'diabs': navstatus}"><span style="background:#c69c6d"></span>总的利润</span><span @click="changeline(1)" :class="{'diabs':  navstatus!==1}"><span  style="background:#36a3f7"></span>访问量</span>
            <span @click="changeline(2)" :class="{'diabs': navstatus!==2}"><span  style="background:#f4516c"></span>新订单</span><span @click="changeline(3)" :class="{'diabs':  navstatus!==3}"><span  style="background:#34bfa3"></span>新用户</span>
                <span style="float: right;margin-right: 58px;">  <Button size="small" @click="setdays(7)"  style="margin-right: 10px;width: 46px" :type="days==7?'primary':'default'">7天</Button><Button size="small" :type="days==14?'primary':'default'" style="margin-right: 10px;width: 46px" @click="setdays(14)">14天</Button><Button size="small" style="margin-right: 10px;width: 46px" @click="setdays(30)" :type="days==30?'primary':'default'">30天</Button>
                <DatePicker @on-change="setvalue" confirm :options="options" @on-ok="setdate" :value="value1" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期" size="small" style="width: 200px"></DatePicker></span>
            </p>
             <p><span></span><span></span><span></span><span></span></p>
            
            <div class="chart" :style="{width: '100%', height: '300px'}" ref="myEchartLine" >
            </div>
        </div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
// 引入折线图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


export default {
    name: 'statistics',
    data(){
        return{
           data1:{} ,
           sumdata:{},
           value1:[],
           value2:["2020-01-10",""],
           days:7,
           tvalue:0,
           date:[],
           options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
                },
           navstatus:0,
           sdata:[
            {
                name:'利润',
                type:'line',
                color:["#c69c6d"],
                data:[]
            },
            {
                name:'访问量',
                type:'line',
                color:"#36a3f7",
                data:[]
            },
            {
                name:'新订单',
                type:'line',
                color:"#f4516c",
                data:[]
            },
            {
                name:'新用户',
                type:'line',
                color:"#34bfa3",
                data:[]
            },
        ],
            msg:{},
        }
    },
    mounted(){
     let base = new Date();
     this.$set(this.value2,1,[base.getFullYear(), base.getMonth() + 1, base.getDate()].join('-'))
     this.setvalue1()
     this.getdays();
     this.getsmu();
   
    },
    methods:{
        setdays(i){
           this.days = i 
           this.setvalue1()
           this.init();
        },
        setvalue1(){
          let base = new Date();
          this.$set(this.value1,1,[base.getFullYear(), base.getMonth() + 1, base.getDate()].join('-'))
          let nowday = base.setDate(base.getDate() - this.days);
          let now = new Date(nowday)
          this.$set(this.value1,0,[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'))
        },
        setvalue(a){
           this.value1 = a
        },
        setvalue2(a){
           this.value2 = a
        },
        setdate(){
           let daystime = new Date(this.value1[1]) - new Date(this.value1[0])
         this.days = Math.ceil(daystime/(24 * 3600 * 1000))
         this.getdays();
        },
       init(){
            let days = this.days
           this.date = []
            let base = new Date(this.value1[1]);
            let oneDay = 24 * 3600 * 1000;
                for (let i = 0; i < days; i++) {
                    let now = new Date(base - oneDay*i);
                     this.date.unshift([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')); 
                } 
        this.$axios
          .post(
            "/common/statistics.ashx",
            this.$qs.stringify({ start_date: this.value1[0],end_date: this.value1[1],type:10})
          )
          .then(res => {
            if (res.status > 0) {
               this.data1 = res 
               for(let i=0;i<this.days;i++){
                   if (res.list[this.days-i-1]) {
                       this.sdata[0].data[i]=res.list[this.days-i-1].profits
                       this.sdata[1].data[i]=res.list[this.days-i-1].pv 
                        this.sdata[2].data[i]=res.list[this.days-i-1].orders 
                         this.sdata[3].data[i]=res.list[this.days-i-1].users  
                   }else{
                        this.sdata[0].data[i]=0 
                       this.sdata[1].data[i]=0
                        this.sdata[2].data[i]=0 
                         this.sdata[3].data[i]=0 
                   }   
               } 
               this.getLine()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
        getdays(){
            let days = this.days
           this.date = []
            let base = new Date(this.value1[1]);
            let oneDay = 24 * 3600 * 1000;
                for (let i = 0; i < days; i++) {
                    let now = new Date(base - oneDay*i);
                     this.date.unshift([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')); 
                } 
        this.$axios
          .post(
            "/common/statistics.ashx",
            this.$qs.stringify({ start_date: this.value1[0],end_date: this.value1[1],type:10,sort: 1})
          )
          .then(res => {
            if (res.status > 0) {
               for(let i=0;i<this.days;i++){
                   if (res.list[this.days-i-1]) {
                       this.sdata[0].data[i]=res.list[this.days-i-1].profits
                       this.sdata[1].data[i]=res.list[this.days-i-1].pv 
                        this.sdata[2].data[i]=res.list[this.days-i-1].orders 
                         this.sdata[3].data[i]=res.list[this.days-i-1].users  
                   }else{
                        this.sdata[0].data[i]=0 
                       this.sdata[1].data[i]=0
                        this.sdata[2].data[i]=0 
                         this.sdata[3].data[i]=0 
                   }   
               } 
               this.getLine()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
    getsmu(){
         this.$axios
          .post(
            "/common/statistics.ashx",
            this.$qs.stringify({ start_date: this.value2[0],end_date: this.value2[1],type:10,sort: "2"})
          )
          .then(res => {
            if (res.status > 0) {
               this.sumdata = res 
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
    getLine() {
      let that = this;
      let myChart = echarts.init(this.$refs.myEchartLine);
        this.msg = {
        title: {
            text: '数据统计折线图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            show: true
           }
        },
        legend: {
            data:['总的利润','访问量','新订单','新用户']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {  
                }
            },
            show : true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:this.date
        },
        yAxis: {
            type: 'value'
        },
        series: this.sdata[this.navstatus]
        }
      myChart.setOption(this.msg);
    },
    changeline(i){
      this.navstatus = i
       this.getLine()
    }
    }
}
</script>
<style>
  #statistics .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 14px;font-size: 14px}
 #statistics .ivu-tabs-nav .ivu-tabs-tab{padding-bottom: 12px;}
  #statistics .ivu-tabs-bar{margin-bottom: 0;}
</style>
<style scoped>
  .tabbox{background: #fff;margin: 15px 10px;padding: 12px 10px 0 10px ;min-width: 1280px;}
  .header>div{display: inline-block;width: 25%;border-right: 1px solid #f0f0f0;text-align: center;}
  .header>div:last-child{border: none}
  .header>div .headitem{max-width: 270px;display: inline-block;text-align: left;padding-top: 25px;padding-bottom: 5px;}
  .headitem>p{font-size: 28px;font-family: Arial;margin: 5px 0 16px;}
  .headitem>div{height: 8px;background: #f2f3f8;border-radius:4px}
  .headitem .foots{font-size: 14px;color: #8c8c8c;}
  .headitem .foots span{float: right;}
  .headitem>.bgbox{transform: translateY(-8px)}
  .echarts{background: #fff;margin: 10px ;padding: 40px 30px;}
  .echarts p{text-align: center;}
  .echarthead>span{font-size: 14px;font-weight: 600;margin-right: 20px;cursor: pointer;display: inline-block}
  .echarthead>span>span{display: inline-block;height: 10px;width: 20px;margin-right: 10px;border-radius: 4px}
 .echarthead > .diabs{color: #8c8c8c;font-weight: 500;}
 .echarthead>span.diabs>span{background: #ccc !important}
 .headitem1 img{margin-top: 20px;margin-left: -5px;}
 .headitem1 p{margin-left: -5px;transform: translateY(-24px);margin-top: -18px;}

</style>