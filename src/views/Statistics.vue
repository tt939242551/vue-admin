<template>
    <div id="statistics">
        <header>
            <div>
                <div class="headitem">
                    <img src="../assets/imgs/st-1.png" alt="">
                   
                    <p style="color:#c69c6d"><span style="font-size: 20px;">￥</span>{{data1.tlr}}</p>
                    <div></div>
                    <div class="bgbox" :style="{width:data1.jrlrbfb,background:'#c69c6d'}" ref="box1"></div>
                    <p class="foots">今日百分比<span>{{data1.jrlrbfb}}%</span></p>
                </div>
            </div>
            <div>
                 <div class="headitem">
                    <img src="../assets/imgs/st-2.png" alt="">
                    <p style="color:#36a3f7">{{data1.tfw}}</p>
                    <div></div>
                    <div class="bgbox" :style="{width:data1.jtfwbfb,background:'#36a3f7'}" ref="box2"></div>
                    <p class="foots">今日百分比<span>{{data1.jrfwbfb}}%</span></p>
                </div>
            </div>
            <div>
                <div class="headitem">
                     <img src="../assets/imgs/st-3.png" alt="">
                    <p style="color:#f4516c">{{data1.tdd}}</p>
                    <div></div>
                    <div class="bgbox" :style="{width:data1.jrddbfb,background:'#f4516c'}" ref="box3"></div>
                    <p class="foots">今日百分比<span>{{data1.jrdd}}%</span></p>
                </div>
            </div>
            <div>
                <div class="headitem">
                     <img src="../assets/imgs/st-4.png" alt="">
                    <p style="color:#34bfa3">{{data1.tyh}}</p>
                    <div></div>
                    <div class="bgbox" :style="{width:data1.jryhbfb,background:'#34bfa3'}" ref="box4"></div>
                    <p class="foots">今日百分比<span>{{data1.jryhbfb}}%</span></p>
                </div>
            </div>
        </header>
        <div class="echarts">
            <p class="echarthead"><!-- <img src="../assets/imgs/st-5.png" alt=""> --><span @click="changeline(0)" :class="{'diabs': navstatus0,}"><span style="background:#c69c6d"></span>总的利益</span><span @click="changeline(1)" :class="{'diabs': navstatus1,}"><span  style="background:#36a3f7"></span>访问量</span>
            <span @click="changeline(2)" :class="{'diabs': navstatus2}"><span  style="background:#f4516c"></span>新订单</span><span @click="changeline(3)" :class="{'diabs': navstatus3,}"><span  style="background:#34bfa3"></span>新用户</span>
                 <Select  @on-change="getdays" size="small" placeholder="请选择天数" v-model="days" style="float: right;width:140px;margin-right: 58px;">
                    <Option  :value="7">最近7天</Option>
                    <Option  :value="30">最近30天</Option>
                    <Option  :value="91">最近3个月</Option>
                    <Option  :value="182">最近半年</Option>
                    <Option  :value="365">最近一年</Option>
                 </Select>
            </p>
             <p><span @click="getLine(1)"></span><span @click="getLine(2)"></span><span @click="getLine(3)"></span><span @click="getLine(4)"></span></p>
            
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
           data1:[] ,
           days:7,
           tvalue:0,
           date:[],
           navstatus0:false,
           navstatus1:false,
           navstatus2:false,
           navstatus3:false,
           sdata:[
            {
                name:'总的利润',
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
    mounted(){this.init()
     this.getdays();
     
    },
    methods:{
        init(){
         this.$axios
          .post(
            "datastatistics.ashx?action=selectlist",
            this.$qs.stringify({ daycoun: 1})
          )
          .then(res => {
            if (res.status >= 0) {
              this.data1 = res.item[0];
              
            } else {
              if (res.status==-1008) {
                  localStorage.setItem("userName", '');
                 localStorage.setItem("token",""); 
                  this.$router.push({ path: this.redirect || "/statistics" });
              }
            }
          })
          .catch(() => {});
        },
        getdays(){
             let days = this.days
            let base = +new Date();
            let oneDay = 24 * 3600 * 1000;
                for (let i = 1; i <= days; i++) {
                    let now = new Date(base -= oneDay);
                     this.date.unshift([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')); 
                }
             this.$axios
          .post(
            "datastatistics.ashx?action=selectlist",
            this.$qs.stringify({ daycoun: this.days})
          )
          .then(res => {
            if (res.status >= 0) {
                for (let i = 0; i < days; i++) {
                    if(res.lrlist.length){
                       res.lrlist.forEach(e => {
                           if (e.newdate===this.date[i]) {
                               this.sdata[0].data[i]=e.counts
                           }else{ this.sdata[0].data[i]=0}
                       }); 
                    }else{ this.sdata[0].data[i]=0} 
                }
                for (let i = 0; i < days; i++) {
                    if(res.fwllist.length){
                       res.fwllist.forEach(e => {
                           if (e.newdate===this.date[i]) {
                               this.sdata[1].data[i]=e.counts
                           }else{ this.sdata[1].data[i]=0}
                       }); 
                    }else{ this.sdata[1].data[i]=0} 
                }
                 for (let i = 0; i < days; i++) {
                    if(res.ddlist.length){
                       res.ddlist.forEach(e => {
                           if (e.newdate===this.date[i]) {
                               this.sdata[2].data[i]=e.counts
                           }else{ this.sdata[2].data[i]=0}
                       }); 
                    }else{ this.sdata[2].data[i]=0} 
                }
                 for (let i = 0; i < days; i++) {
                    if(res.yhlist.length){
                       res.yhlist.forEach(e => {
                           if (e.newdate===this.date[i]) {
                               this.sdata[3].data[i]=e.counts
                           }else{ this.sdata[3].data[i]=0}
                       }); 
                    }else{ this.sdata[3].data[i]=0} 
                }
               this.getLine()
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
    getLine(index) {
      let that = this;
      let myChart = echarts.init(this.$refs.myEchartLine);
        if (index) {
           sdata.slice(index,index+1) 
        }
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
        series: this.sdata
        }
      myChart.setOption(this.msg);
    },
    changeline(i){
      let   t= "navstatus" + i
      this[t]=!this[t]
      let arr0 = this.navstatus0? '': this.sdata[0] 
       let arr1 = this.navstatus1? '': this.sdata[1] 
       let arr2 = this.navstatus1? "": this.sdata[2] 
       let arr3 = this.navstatus1? "": this.sdata[3] 
       let data = []
       data.push(arr0)
       data.push(arr1)
       data.push(arr2)
       data.push(arr3)
       this.msg.series = date
        let myChart = echarts.init(this.$refs.myEchartLine);
         myChart.setOption(this.msg);
    }
    }
}
</script>

<style scoped>
  header{background: #fff;margin: 15px 10px;}
  header>div{display: inline-block;width: 25%;border-right: 1px solid #f0f0f0;text-align: center;}
  header>div .headitem{max-width: 270px;display: inline-block;text-align: left;padding-top: 25px;padding-bottom: 5px;}
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
 .echarthead>span.diabs>span{opacity: 0.4;}
</style>