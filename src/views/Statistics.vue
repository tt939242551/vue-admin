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
            <p><img src="../assets/imgs/st-5.png" alt=""></p>
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
           data1:[] 
        }
    },
    mounted(){this.init()
     this.getLine();},
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
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
        },
    getLine() {
      let that = this;
      let myChart = echarts.init(this.$refs.myEchartLine);
      var base = +new Date();
        var oneDay = 24 * 3600 * 1000;
        var date = [];
        for (var i = 1; i <8; i++) {
            var now = new Date(base -= oneDay);
            date.unshift([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
         
       }
      myChart.setOption({
        title: {
            text: '数据统计折线图'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['总的利润','访问量','新订单','新用户',]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data:date
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'总的利润',
                type:'line',
                color:["#c69c6d"],
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'访问量',
                type:'line',
                color:"#36a3f7",
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'新订单',
                type:'line',
                color:"#f4516c",
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'新用户',
                type:'line',
                color:"#34bfa3",
                data:[320, 332, 301, 334, 390, 330, 320]
            },
        ]
        });
    },
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
</style>