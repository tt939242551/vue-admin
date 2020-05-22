<template>
  <div class="goods">
    <div class="tabbox" v-if="isadds">
      <div id="topbar">
         <p class="title">
            <span>品牌</span>
              <Select
               @on-change="getDatalist"
              v-model="smodels[0]"
              size="small"
              style="width:120px;margin-right: 30px;"
              placeholder="请选择品牌"
            >
              <Option value="" >不限</Option>
              <Option v-for="(item,index) in generalattribute" :value="item.title" :key="index">{{ item.title }}</Option>
            </Select>
            <span>类别</span>
              <Select
              @on-change="getSingleList"
              v-model="smodels[1]"
              size="small"
              style="width:120px;margin-right: 30px;"
              placeholder="请选择类别"
            ><Option value="" >不限</Option>
              <Option v-for="item in parentcategory" :value="item.title" :key="item.title">{{ item.title }}</Option>
            </Select>
            <span>单品</span>
            <Select
              @on-change="getDatalist"
              v-model="smodels[2]"
              size="small"
              style="width:120px"
              placeholder="请先选择类别"
            ><Option value="" >不限</Option>
              <Option
                v-for="(item,index) in SingleList"
                :value="item.title"
                :key="index"
              >{{ item.title }}</Option>
            </Select>
            <Button type="primary" size="small" style="width:60px;margin-left: 30px;"  @click="initsmodels" >重置</Button>
         </p>
        <Input search class="topsearch" size="small" v-model="smodels[3]" @on-blur="getDatalist" @on-search="getDatalist" enter-button="搜索" placeholder="搜索" />
      </div>
      <div class="btnbox">
        <Button type="primary" class="btn1" @click="addList" ><Icon size="16" style="transform: translateY(-2px)" type="md-add" />新增</Button>
        <div class="tabtop"><span>操作</span> 热销置顶</div>
      </div>
      <Table
        stripe
        ref="selection"
        :columns="columns1"
        :data="data1"
        @on-selection-change="selectionChange"
      >
       <template slot-scope="{ row, index }" slot="goodsimg">
         <div class="goodstitle">
           <div>
             <img style="width:100px;height:100px"  :src="data1[index].commoditypictures1" alt="">
           </div>
           <div class="goodstext">
             <p>{{data1[index].title}}</p>
            <!--  <p>编码：{{data1[index].Code}}</p> -->
             <p>类别：{{data1[index].parentcategoryname}}</p>
             <p>单品：{{data1[index].categoryname}}</p>
             <p v-if="data1[index].isUppershelf==0">未出售</p>
             <p v-else>出售中</p>
           </div>
         </div>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <span class="acbtn" style="margin-right: 12px" @click="show(index)">修改</span><span style="margin-right: 12px" class="acbtn" @click="movelist(index)" >删除 </span>
          <span v-if="data1[index].isUppershelf==0" style="margin-right: 53px" class="acbtn" @click="Uppershelf(index)"  >立即上架 </span><span v-else style="margin-right: 53px" class="acbtn" @click="Uppershelf(index)" >立即下架 </span><span style="padding-right: 20px">
             <Checkbox @on-change="settop(index)" v-model="data1[index].isoverhead"></Checkbox> </span>
          
        </template>
      </Table>
       <span class="acbtn2" @click="modal6 = true" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选中商品</span>
      <div class="foot">
        <Page :total="total" :current="page" prev-text="上一页" next-text="下一页" @on-change="getlist" />
      </div>
    </div>
    <div id="goodsfrom" class="goodsfrom" v-else>
       <div id="topbar2">
         <p class="title2"><span style="cursor: pointer;" @click="closegoods"> 商品管理</span> > {{tindex===data1.length ? "新增商品":"编辑商品"}}</p>
       </div>
          <p class="titl1"> <span>宝贝标题</span><br>
            <Input id="focusinput" 
              v-model="models[2]"
              placeholder="请输入宝贝名称"
              style="width: 300px;margin: 15px 0 8px 12px"
            /></p>
          <div class="titl1">
            <p>分类</p>
            <div class="sction">
              <Select
                @on-change="getCategory"
                v-model="models[0]"
                filterable
                size="small"
                style="width:200px;margin-right: 30px;margin-bottom: 30px;"
                placeholder="请选择类别"
              >
                <Option v-for="item in category" :value="item.id" :key="item.id">{{ item.title }}</Option>
              </Select>
              <Select
                @on-change="getSingle"
                v-model="models[1]"
                size="small"
                style="width:200px;margin-bottom: 30px;"
                placeholder="请先选择类别"
              >
                <Option
                  v-for="(item,index) in categoryItem"
                  :value="item.guid"
                  :key="index"
                >{{ item.title }}</Option>
              </Select>
            </div>
          </div>  
        <div class="titl1">
          <p>通用属性</p>
          <div class="sction">
             <div class="sctions" v-for="(items,i) in generalattribute" :key="i">
               <span>{{items.title}}</span>
               <Select
                v-model="bmodels[i]"
                size="small"
                style="width:200px;margin-right: 30px"
                placeholder="请选择"
              > <Option value="" >不限</Option>
                <Option v-for="(item,index) in items.item" :value="item.guid" :key="index">{{ item.title }}</Option>
              </Select>
             </div>
          </div>

      <p>特殊属性</p>
      <div class="sction">
        <div class="special" v-for="(i,index) in specialList" :key="index">
          <span>{{i.ms}}</span>
          <Select
            v-model="specialmodels[index]"
            size="small"
            style="width:200px;margin-right: 2px;"
            :placeholder="'请选择'+ i.ms "
          >
             <Option value="" >不限</Option>
            <Option v-for="(items,j) in i.item" :value="items.guid" :key="j">{{ items.ls }}</Option>
          </Select>
        </div>
      </div>
      <p>基本信息</p>
      <div class="sction">
        <span>分类</span>
        <div class="colorbox">
          <div class="colorsction" v-for="(item,i) in colorList" :key="i">
            <Button
              :disabled="!item.color&&!item.remark"
              @click="removeColorList(i)"
              shape="circle"
              icon="md-close"
              style="margin-right: 5px;width:18px;height:18px;"
              size="small"
            ></Button>
            <Input
              v-model="item.color"
              size="small"
              @on-blur="createList(i)"
              placeholder="请输入分类"
              style="width: 200px;margin-right: 2px;"
            />
            <span>备注</span>
            <Input
              v-model="item.remark"
              @on-blur="creatmainList"
              size="small"
              placeholder="如偏深色偏浅色"
              style="width: 200px;margin-right: 30px;"
            />
            <div class="colorimgbox" v-if="item.colorpictures">
              <img  :src="item.colorpictures">
              <Button  size="small" style="width:80px;transform: translateY(-6px)" @click="addimg(i)">修改图片</Button>
            </div>
            <Button v-else type="primary" size="small" style="width:80px;margin-left: 5px" @click="addimg(i)">上传</Button>
          </div>
        </div>
        <input
          type="file"
          ref="uploadfiles"
          class="inputer"
          @change="fileChanges"
          multiple="multiple"
        />
        <span>尺码</span>
        <Tabs class="colorbox" type="card" v-model="tvalue2">
          <TabPane icon="md-checkbox" label="通用">
            <Input
              v-model="value1"
              size="small"
              placeholder="请输入自定义"
              style="width: 200px;margin-right: 30px;"
            />
            <Button
              type="primary"
              size="small"
              style="width:80px;margin-right: 20px;"
              icon="md-add"
              @click="if(value1&&disabledGrouplist1.indexOf(value2)===-1)disabledGrouplist1.push(value1)"
            >添加</Button>
             <Button  size="small" style="width:80px" icon="ios-trash" @click="removeSize(1)"
            >删除</Button>
            <CheckboxGroup class="checkboxs" v-model="disabledGroup1" @on-change="creatmainList">
              <Checkbox
                v-for="itme in  disabledGrouplist1"
                :label="itme"
                :key="itme"
                style="margin-right: 20px;width:100px"
              ></Checkbox>
            </CheckboxGroup>
          </TabPane>
          <TabPane icon="md-checkbox" label="中国尺码">
            <Input
              v-model="value2"
              size="small"
              placeholder="请输入自定义"
              style="width: 200px;margin-right: 30px;"
            />
            <Button
              type="primary"
              size="small"
              style="width:80px;margin-right: 20px;"
              icon="md-add"
              @click="if(value2&&disabledGrouplist2.indexOf(value2)===-1)disabledGrouplist2.push(value2)"
            >添加</Button>
             <Button type="primary" size="small" style="width:80px" icon="ios-trash" @click="removeSize(2)"
            >删除</Button>
            <CheckboxGroup class="checkboxs" v-model="disabledGroup2" @on-change="creatmainList">
              <Checkbox
                v-for="itme in  disabledGrouplist2"
                :label="itme"
                :key="itme"
                 style="margin-right: 20px;width:100px"
              ></Checkbox>
            </CheckboxGroup>
          </TabPane>
          <TabPane icon="md-checkbox" label="均码">
            <Input
              v-model="value3"
              size="small"
              placeholder="请输入自定义"
              style="width: 200px;margin-right: 30px;"
            />
            <Button
              type="primary"
              size="small"
              style="width:80px;margin-right: 20px;"
              icon="md-add"
              @click="if(value3&&disabledGrouplist3.indexOf(value2)===-1)disabledGrouplist3.push(value3)"
            >添加</Button>
             <Button type="primary" size="small" style="width:80px" icon="ios-trash" @click="removeSize(3)"
            >删除</Button>
            <CheckboxGroup class="checkboxs" v-model="disabledGroup3" @on-change="creatmainList">
              <Checkbox
                v-for="itme in  disabledGrouplist3"
                :label="itme"
                :key="itme"
                style="margin-right: 20px;width:100px"
              ></Checkbox>
            </CheckboxGroup>
          </TabPane>
        </Tabs>
        <span>销售规格</span>
        <table class="colorbox" style="margin-top: -20px">
          <thead>
            <tr>
              <th class="feasttd" style="margin-left: 0px;border: 1px solid #ccc;">分类</th>
              <th>尺码</th>
              <th>价格 (元)</th>
              <th>数量 (件)</th>
              <th>商家编码</th>
              <th>商品条形码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in mainList" :key="i">
              <td :ref="'color'+i" class="feasttd" >{{item.colors}}</td>
              <td>{{item.size}}</td>
              <td style="padding: 0;">
                <Input class="tabinput" @on-blur="getTotal(i)" v-model="item.Price" />
              </td>
              <td style="padding: 0;">
                <Input class="tabinput" @on-blur="getTotal(i)" v-model="item.number" />
              </td>
              <td style="padding: 0;">
                <Input class="tabinput" v-model="item.merchantcode" />
              </td>
              <td style="padding: 0;">
                <Input class="tabinput" v-model="item.merchantbarcode" />
              </td>
            </tr>
          </tbody>
        </table>
        <span style="margin-right: 20px;">一口价</span>
        <Input
          v-model="models[8]"
          size="small"
          style="width: 200px;margin-right: 25px;"
        />
        <span>总数量</span>
           <Input v-model="models[9]" :disabled="mainList.length!==0" size="small" style="width: 200px;margin-right: 30px;" />
        <div style="margin-top:40px">
          <span>设置日期</span>
          <DatePicker
            type="date"
            placeholder="设置时间"
            :value="setdate"
            @on-change="gettimeval"
            style="width: 200px;margin-left:8px;"
          ></DatePicker> 
         
        </div>
       <!--  <div style="margin-top:40px">
            <span>商品编码</span><Input v-model="Code"  style="width: 200px;margin-left: 8px;" />
         </div> -->
      </div>
      <p>图文概述</p>
      <div class="sction">
        <span style="width:88px">电脑端宝贝图</span>
        <Button type="primary" size="small" @click="fileClick" style="width:100px" icon="md-add">
          批量上传

        </Button>
         <input
            type="file"
            ref="uploadfile"
            class="inputer"
            @change="fileChange"
            multiple="multiple"
          />
        <div height="10px"></div>
        <div v-for="(item,i) in imgLists" :key="i" class="imgbox">
          <img :src="item" />
          <div class="removei" @click="fileDel(i)">
            <Icon size="26" color="#fff" type="ios-trash-outline" />
          </div>
        </div>
        <p style="margin: 30px 0 20px 5px;font-size: 14px;">宝贝详情</p>
        <Uediter :catchData="catchData" :content="content" ref="ue"></Uediter>
       </div>
      </div>
      <Button type="primary" @click="getgoods" style="width:150px;margin: 30px 0 30px 25px;">提交</Button>
      <Button  @click="closegoods" style="width:150px;margin: 30px 0 30px 20px;border-color: #c69c6d;color: #c69c6d;">取消</Button>
    </div>
    <Modal transfer v-model="modal1" @on-ok="ok" @on-cancel="cancel">
      <p class="modal_p">切换了之后, 之前选择的尺码将被清空 !</p>
    </Modal>
    <Modal transfer :value="modal2" @on-ok="ok2" @on-cancel="cancel2">
      <p class="modal_p">切换了之后, 之前选择的分类信息将被清空 !</p>
    </Modal>
     <Modal footer-hide v-model="xModal4" width="360" :styles="{top: '200px'}">
            <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
                <p>热销置顶最多选择 10 个。</p>
                <p>请关闭其它热销置顶再进行开启</p>
            </div>
            <div style="text-align:center;margin: 20px 0 ;">
                <Button style="width:80px" type="primary" class="samintbtn" @click="getInit">确定</Button>
            </div>
        </Modal> 
     <Modal footer-hide v-model="modal5" width="360" :styles="{top: '200px'}">
          <div  style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除该商品？</p>
              <p>删除后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="moveGoods(1)">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="modal5=false">取消</Button>
          </div>
        </Modal>
         <Modal footer-hide v-model="modal6" width="360" :styles="{top: '200px'}">
          <div  style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除选中商品？</p>
              <p>删除后数据将不可恢复</p>
          </div>
          <div style="text-align:center;margin: 20px 0 ;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="moveGoods(2)">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="modal6=false">取消</Button>
          </div>
        </Modal>    
  </div>
</template>

<script>
import Uediter from "@/components/ue.vue";
export default {
  name: "goods",
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "宝贝标题",
          slot: "goodsimg",
          align: "center",
          width: 300,
        },
        {
          title: "品牌",
          key: "generalattributenames",
          align: "center"
        },
        {
          title: "分类",
          key: "parentcategoryname",
          align: "center"
        },
        {
          title: "销量",
          key: "Salesnumber",
          align: "center"
        },
         {
          title: "库存",
          key: "number",
          align: "center"
        },
        {
          title: "提交时间",
          key: "setdate",
          align: "center"
        },
        {
          title: ".",
          slot: "action",
          width: 255,
          align: "right"
        }
      ],
      data1: [],
      isCheck: [],
      parentcategory:[], // 类别
      generalattribute:[],// 品牌
      SingleList:[],
      lasttvalue1:0,
      tvalue1: 0,
      tvalue2: 0,
      value1: "",
      value2: "",
      value3: "",
      setdate: "",
      xModal4:false,
      tindex: 0,
      smodels:[],
      bmodels:[],
      models: ["", "", "", "", "", "", "", "", "", ""],
      tabs: [],
      isadds: true,
      fromValues: {},
      disabledGroup1: [],
      disabledGroup2: [],
      disabledGroup3: [],
      disabledGrouplist1: [
        "145/52A",
        "150/56A",
        "155/60A",
        "160/64A",
        "165/68A",
        "170/72A",
        "175/76A",
        "175/80A",
        "180/84A",
        "180/88A",
        "185/92A"
      ],
      disabledGrouplist2: [
        "XXS",
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL"
      ],
      disabledGrouplist3: ["均码"],
      img: require("../assets/imgs/bg04.jpg"),
      imgList: [],
      imgLists: [],
      size: 0,
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      },
      colorindex: 0,
      colorList: [
        {
          color: "",
          remark: "",
          colorpictures: ""
        }
      ],
      mainList: [],
      specialList: [],
      specialListItem: [],
      specialmodels: [],
      isoverheadcount: 0,
      page: 1,
      pageSize: 10,
      total: 1,
      allStatu: true,
      content: "",
      category: [],
      categoryItem: [],
      modal1: false,
      modal2: false,
      modal5: false,
      modal6: false,
      tabsisok: true,
      Code:"",
      sizearr:[],
      colorarr:[],
    };
  },
  components: { Uediter },
  beforeRouteEnter (to, from, next) {
      next(vm => {
       vm.page =1;
      vm.closegoods();
      vm.getInit();
      vm.getBasicslist()
     })
    },
  created() {
   // this.getInit();
   // this.getBasicslist()
  },
  methods: {

    //初始化
    getInit() {
      this.smodels=[];
      this.xModal4 = false;
      this.$axios
        .post(
          "/admin/common/commodity.ashx?action=selectlist",
          this.$qs.stringify({ page: this.page, pageSize: this.pageSize })
        )
        .then(res => {
          if (res.status >= 0) {
            this.data1 = res.item;
            this.isoverheadcount = res.isoverheadcount;
            this.data1.forEach(i=>{
             i.setdate = i.setdate.match(/20\d{2}\/\d{1,2}\/\d{1,2}/)[0];
              if(i.commoditypictures1){ 
                   i.commoditypictures1 = i.commoditypictures1.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,30}\.[a-z]{3,4}/)[0] 
                 }
            });
            this.total = res.totalCount;
          } else {
             if (res.status==-1008) {
                  localStorage.setItem("userName", '');
                 localStorage.setItem("token",""); 
                  this.$router.push({ path: this.redirect || "/statistics" });
              }
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
     //搜索下拉数据初始化
    getBasicslist(){
      this.$axios
        .post(
          "/admin/common/commodity.ashx?action=selectBasicslist",
         )
        .then(res => {
          if (res.status >= 0) {
            this.parentcategory = res.parentcategory;
            this.generalattribute = res.generalattribute[0].item
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
      //选择类别查询单品
    getSingleList(t){
      this.smodels[2] = "";
      this.getDatalist();
       if (t) {
         let id ;
         this.parentcategory.forEach(i=>{
           if (i.title ===t) {
             id = i.id
             
           }
         });
        this.$axios
          .post(
            "/admin/common/category.ashx?action=selectby_parentid",
            this.$qs.stringify({ parentid: id })
          )
          .then(res => {
            if (res.status >= 0) {
              this.SingleList = res.item;
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    }
    }, 
   //选择品牌,类别,单品查询商品
    getDatalist(){
      this.page = 1;
      this.$axios
        .post(
          "/admin/common/commodity.ashx?action=selectlist",
          this.$qs.stringify({ page: this.page, pageSize: this.pageSize ,where:this.smodels[3],categoryname:this.smodels[2],parentcategoryname:this.smodels[1],generalattributename:this.smodels[0]})
        )
        .then(res => {
          if (res.status >= 0) {
            this.data1 = res.item;
            this.data1.forEach(i=>{
             i.setdate = i.setdate.match(/20\d{2}\/\d{1,2}\/\d{1,2}/)[0];
              if(i.commoditypictures1){ 
                   i.commoditypictures1 = i.commoditypictures1.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,30}\.[a-z]{3,4}/)[0] 
                 }
            });
            this.total = res.totalCount;
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
     //选择分页查询商品
      getDatalistindex(){
      this.$axios
        .post(
          "/admin/common/commodity.ashx?action=selectlist",
          this.$qs.stringify({ page: this.page, pageSize: this.pageSize ,where:this.smodels[3],categoryname:this.smodels[2],parentcategoryname:this.smodels[1],generalattributename:this.smodels[0]})
        )
        .then(res => {
          if (res.status >= 0) {
            this.data1 = res.item;
            this.data1.forEach(i=>{
             i.setdate = i.setdate.match(/20\d{2}\/\d{1,2}\/\d{1,2}/)[0];
              if(i.commoditypictures1){ 
                   i.commoditypictures1 = i.commoditypictures1.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,30}\.[a-z]{3,4}/)[0] 
                 }
            });
            this.total = res.totalCount;
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    }, 
  //重置搜索条件
    initsmodels(){
      this.page = 1;
      this.smodels =[];
      this.SingleList =[]
    },
    //商品多选
    selectionChange(a) {
      this.isCheck = [];
      a.forEach(item => {
        if (this.isCheck.indexOf(item.id) < 0) {
          this.isCheck.push(item.id);
        }
      });
    },
   //删除商品弹窗
    movelist(i){
      this.tindex = i;
      this.modal5 = true
    },
    //删除商品
    moveGoods(i) {
      let arr = [];
      if (i==1) {
         arr = [this.data1[this.tindex].id];
         this.modal5 = false
      }else{
         arr = this.isCheck;
          this.modal6 = false
      }
      this.$axios
        .post(
          "/admin/common/commodity.ashx?action=delete",
          this.$qs.stringify({ ids: JSON.stringify(arr) })
        )
        .then(res => {
          if (res.status >= 0) {
            this.getInit();
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
    //上下架
    Uppershelf(index){
       this.$axios
        .post("/admin/common/commodity.ashx?action=Get_Uppershelf",this.$qs.stringify({ id: this.data1[index].id }))
        .then(res => {
          if (res.status >= 0) {
           if (this.data1[index].isUppershelf==0) {
             this.data1[index].isUppershelf=1
           }else{ this.data1[index].isUppershelf=0} 
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
    //设置热销置顶
    settop(i){
       if (this.isoverheadcount>=10&&this.data1[i].isoverhead) {
         this.xModal4 = true
       }else{
           this.$axios.post(
            "/admin/common/commodity.ashx?action=editisoverhead",
            this.$qs.stringify({ id:this.data1[i].id ,isoverhead: this.data1[i].isoverhead})
          )
          .then(res => {
            if (res.status >= 0) {
               if (this.data1[i].isoverhead) {
                 this.isoverheadcount++
               }else{ this.isoverheadcount--}
            } else {
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
       }
        
    },
  //分页
    getlist(index) {
      this.page = index;
      if (this.smodels[0]||this.smodels[1]||this.smodels[2]||this.smodels[3]) {
        this.getDatalistindex()
      }else{this.getInit();}
    
    },
 //商品编辑页
     //商品编辑初始化
    show(index) {
      this.tindex = index;
      this.isadds = false;
      let id = this.data1[index].id;
      this.$axios
        .post(
          "/admin/common/commodity.ashx?action=selectdetails",
          this.$qs.stringify({ id: id })
        )
        .then(res => {
          if (res.status >= 0) {
            this.models[2] = res.item[0].title;
            this.models[9] = res.item[0].number;
           
            if (res.item[0].commoditypictures1) {
              this.imgLists =  res.item[0].commoditypictures1.match(/https:\/\/oss.bogole.com\/project\/code\/public\/e19102801\/upfile\/20\d{6,30}\.[a-z]{3,4}/g)
            }    
            this.mainList = res.parentcategory;
            this.$nextTick(()=>{
                this.movecolor()
            });
            this.category = res.category;
            this.generalattribute = res.generalattribute;
            this.setdate = res.item[0].setdate;
            this.Code = res.item[0].Code;
            this.specialList = res.specialattributes;
            if (this.specialList.length>0) {
                 this.specialList.forEach(i => {
                 i.item.forEach(j => {
                  if (j.isselect) {
                  this.specialmodels.push(j.guid);
                }
              });
            });
            }
          
            this.category.forEach(i => {
              if (i.isselect) {
                this.models[0] = i.id;
                this.categoryItem = i.item;
              }
            });
            this.categoryItem.forEach(i => {
              if (i.isselect) {
                this.models[1] = i.guid;
              }
            });
             this.generalattribute.forEach((i,index) => {
                 i.item.forEach(j => {
                  if (j.isselect) { 
                  this.bmodels[index] = j.guid
                  
                } });
            });
            this.colorarr = [];
            this.sizearr = [];

            this.colorList =  [{ color: "", remark: "", colorpictures: ""}];
            this.mainList.forEach(i => {
              let obj = {};
              if (this.colorarr.indexOf(i.colors) < 0 && i.colors) {
                this.colorarr.push(i.colors);
                if (i.colors.indexOf("(")>0) {
                  let arr = i.colors.replace(/\)$/,'').split("(");
                   obj.color = arr[0];
                  obj.remark = arr[1]
                }else{
                  obj.color = i.colors;
                  obj.remark = "";
                }
                obj.colorpictures = i.colorpictures;
                this.colorList.unshift(obj);
              }
              if (this.sizearr.indexOf(i.size) < 0 && i.size) {
                this.sizearr.push(i.size);
                if (i.size.slice(0, 1) === "1") {
                  this.tvalue2 = 0;
                  if (this.disabledGrouplist1.indexOf(i.size)===-1) {
                    this.disabledGrouplist1.push(i.size)
                  }
                  this.disabledGroup1.push(i.size);
                
                } else if ("XSML23456789".indexOf(i.size.slice(0, 1)) >= 0) {
                  if (this.disabledGrouplist2.indexOf(i.size)===-1) {
                    this.disabledGrouplist2.push(i.size)
                  }
                  this.tvalue2 = 1;
                  this.disabledGroup2.push(i.size);
                } else {
                  if (this.disabledGrouplist3.indexOf(i.size)===-1) {
                    this.disabledGrouplist3.push(i.size)
                  }
                  this.tvalue2 = 2;
                  this.disabledGroup3.push(i.size);
                }
              }
            });
            this.getgoodsTotal();
            this.models[8] = res.item[0].Price;
              setTimeout(function(){
                document.querySelector("#focusinput input").focus();
              console.log(document.querySelector("#focusinput input"))
                },1000);
             this.content = decodeURIComponent(res.item[0].commoditydetails);  
         } else {
            this.$Message.warning(res.content);
          }
        });
    },
    //设置商品描述
    catchData(html) {
      this.content = html;
    },
    //设置时间
    gettimeval(t) {
      this.setdate = t;
    },
  //合并商品详情列表中相同颜色项
    movecolor(){  
      for(let i=0; i<this.mainList.length; i++ ){
        let t1 = 'color' + i;
        let t2 = 'color' + (i+1);
         this.$refs[t1][0].style["border-bottom"] = "1px solid #ccc";
         if (this.$refs[t2]&&this.$refs[t2][0]) {
           this.$refs[t2][0].style.color = "#000"
         } 
        if (this.$refs[t2]&&this.$refs[t2][0]&&this.$refs[t1][0].innerText===this.$refs[t2][0].innerText) {
             this.$refs[t2][0].style.color = "#fff";
             this.$refs[t1][0].style["border-bottom"] = "none"
        }
      }
    },
      //商品新增初始化
      addList: function () {
          this.parentcategory = []; // 类别
          this.generalattribute = [];// 品牌
          this.smodels = [];
          this.bmodels = [];
          this.models = ["", "", "", "", "", "", "", "", "", ""];
          this.imgList = [];
          this.imgLists = [];
          this.size = 0;
          this.colorindex = 0;
          this.colorList = [
              {
                  color: "",
                  remark: "",
                  colorpictures: ""
              }
          ];
          this.mainList = [];
          this.specialList = [];
          this.specialListItem = [];
          this.specialmodels = [];
          this.category = [];
          this.categoryItem = [];
          this.sizearr = [];
          this.colorarr = [];
          this.tindex = this.data1.length;
          this.isadds = false;
          this.content = '';
          this.disabledGroup1 = [];
          this.disabledGroup2 = [];
          this.disabledGroup3 = [];
          this.Code = '';
          this.setdate = '';
          this.$axios
              .post("/admin/common/commodity.ashx?action=InitializationAdd")
              .then(res => {
                  if (res.status >= 0) {
                      this.tabs = res.style;
                      this.category = res.category;
                      setTimeout(function () {
                          document.querySelector("#focusinput input").focus();
                          console.log(document.querySelector("#focusinput input"))
                      }, 1000)
                  } else {
                      this.$Message.warning(res.content);
                  }
              })
              .catch(() => {
              });
      },
    //选择分类获取单品
    getCategory(id) {
      this.categoryItem = [];
      this.specialmodels = [];
      this.models[1] = "";
      this.models[3] = "";
      this.models[4] = "";
       if (id) {
        this.$axios
          .post(
            "/admin/common/category.ashx?action=selectby_parentid",
            this.$qs.stringify({ parentid: id })
          )
          .then(res => {
            if (res.status >= 0) {
              this.categoryItem = res.item;
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }
    },
    //选择单品获取品牌,通用属性
    getSingle(id) {
      if (id) {
        this.$axios
          .post(
            "/admin/common/category.ashx?action=categorybyid",
            this.$qs.stringify({ categoryid: id })
          )
          .then(res => {
            if (res.status >= 0) {
              this.generalattribute = res.generalattribute;
              this.specialList = res.specialattributes;
              this.bmodels=[];
              this.generalattribute.forEach((i,index) => {
              i.item.forEach(j=>{
                if (j.isselect) {
                this.bmodels[index] = i.guid;
               }
              })
            });
              
            } else {
              this.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }
    },
   //删除尺码
    removeSize(i){
      if (this['disabledGroup'+i].length) {
        let arr = JSON.parse(JSON.stringify(this['disabledGrouplist'+i]));
           arr.forEach((item,index)=>{
          if (this['disabledGroup'+i][0]===item) {
            this['disabledGrouplist'+i].splice(index,1);
            this['disabledGroup'+i].shift()
          } 
        });
        console.log(this['disabledGroup'+i].length);
        this.removeSize(i)
      }else{ this.creatmainList();}
    },
    //编辑颜色列表
    createList(i) {
      if (this.colorList[i].color) {
         if (this.colorarr.indexOf(this.colorList[i].color) === -1) {
        this.colorarr.push(this.colorList[i].color);
        this.creatmainList();
        if (i === this.colorList.length - 1&&this.colorList[i].color) {
          let obj = { color: "", remark: "", colorpictures: "" };
          this.colorList.push(obj);
        }
      }else if (this.colorarr.indexOf(this.colorList[i].color) !== i) {
         this.colorList[i].color = "";
         this.$Message.warning("该颜色已经存在");
      }
   
      }
    },
    //删除颜色
    removeColorList(i) {
      if (this.colorList[i].color) {
       let index = this.colorarr.indexOf(this.colorList[i].color);
        this.colorList.splice(i, 1);
        this.colorarr.splice(index, 1);
          this.creatmainList();
      }
    },
     //根据颜色尺码生成商品列表
    creatmainList() {
      let copymainList = [];
      let t = "disabledGroup" + (this.tvalue2 + 1);
      let arr = this[t];
      arr.sort()
      if (this.tvalue2 === 0) {
        arr.sort((a, b) => {
          return a.slice(0, 3) - b.slice(0, 3);
        });
      }
      this.colorList.forEach(i => {
        if (i.color) {
          arr.forEach(j => {
            let obj = {};
            let str = i.remark ? "(" + i.remark + ")" : "";
            obj.colors = i.color + str;
            obj.size = j;
            obj.Price = 0;
            obj.number = 0;
            obj.merchantcode = "";
            obj.merchantbarcode = "";
            obj.id = "";
            obj.colorpictures = i.colorpictures;
            copymainList.push(obj);
          });
        }
      });
       copymainList.forEach(i => {
           this.mainList.forEach(j => {
            if (i.colors === j.colors&&i.size === j.size) {
             Object.assign(j,i)
            }
          });
      });
      this.mainList = copymainList;
      console.log(this.mainList);
      this.$nextTick(()=>{
        this.movecolor()
      })   
    },
    //处理输入数量和价格
    getTotal(i) {
      if (this.mainList[i].Price<0) this.mainList[i].Price = 0;
       if (this.mainList[i].number>0) {
         this.mainList[i].number = Math.floor(this.mainList[i].number)
      }else{
        this.mainList[i].number = 0
      }
       this.getgoodsTotal()
    },
  //自动生成一口价和数量
    getgoodsTotal(){
         let arr1 = [];
         let arr2 = [];
        this.mainList.forEach(a => {
          arr1.push(+a.number);
          arr2.push(a.Price);
        });
        let num1 = arr1.reduce((a, b) => {
          return a + b;
        });
        let num2 = arr2.sort((a, b) => {
          return a - b;
        });
        this.$set(this.models, 9, num1);
        this.$set(this.models, 8, num2[0]);
    },
   // 新增,编辑商品
    getgoods() {
      if (this.content &&this.setdate&& this.imgLists&& this.imgLists.length &&this.mainList.length) {
      let brandname,
        parentcategoryname,
        categoryname,
        specialattributesname,
        categoryid,
        id,
        url,
        parentcategoryid,
        parms;
      specialattributesname = [];
      brandname = [];
      this.generalattribute.forEach((i,index) => {
        i.item.forEach(j=>{
          if (j.guid === this.bmodels[index]) {
              brandname.push(j.title) ;
           }
        })
      });
      this.category.forEach(item => {
        if (item.id === this.models[0]) {
          parentcategoryname = item.title;
          parentcategoryid = item.guid;
        }
      });
      this.categoryItem.forEach(item => {
        if (item.guid === this.models[1]) {
          categoryname = item.title;
        }
      });
      this.specialList.forEach(i => {
        if (i.item) {
          i.item.forEach(j => {
            if (this.specialmodels.indexOf(j.guid) > 0) {
              specialattributesname.push(j.ls);
            }
          });
        }
      });
      if (this.tindex === this.data1.length) {
        url = "/admin/common/commodity.ashx?action=add";
        parms = {
          title: this.models[2],
          generalattributename: brandname.join(","),
          generalattributeid: this.bmodels.join(","),
          parentcategoryname,
          parentcategoryid,
          categoryname,
          categoryid: this.models[1],
          commoditypictures1: JSON.stringify(this.imgLists).replace(/"/g,"'"),
          commoditydetails: encodeURIComponent(this.content),
          specialattributesname: JSON.stringify(specialattributesname),
          specialattributesid: JSON.stringify(this.specialmodels),
          specifications: JSON.stringify(this.mainList),
          setdate: this.setdate,
          Price: this.models[8],
          number: this.models[9],
          Code:this.Code
        };
      } else {
        url = "/admin/common/commodity.ashx?action=edit";
        id = this.data1[this.tindex].id;
        parms = {
          title: this.models[2],
          id,
          generalattributename: brandname.join(","),
          generalattributeid: this.bmodels.join(","),
          parentcategoryname,
          parentcategoryid,
          categoryname,
          categoryid: this.models[1],
          commoditypictures1: JSON.stringify(this.imgLists).replace(/"/g,"'"),
          commoditydetails: encodeURIComponent(this.content),
          specialattributesname: JSON.stringify(specialattributesname),
          specialattributesid: JSON.stringify(this.specialmodels),
          specifications: JSON.stringify(this.mainList),
          setdate: this.setdate,
          Price: this.models[8],
          number: this.models[9],
          Code:this.Code
        };
      }
      this.$axios
        .post(url, this.$qs.stringify(parms))
        .then(res => {
          if (res.status >= 0) {
            this.isadds = true;
            this.content = ''
            this.getInit();
            this.getBasicslist()
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
      }else{    this.$Message.warning("请填写所有必填数据");}
    },
     //关闭商品编辑
    closegoods(){
      this.isadds = true;
      this.content = '' 
      this.colorList = [
        {
          color: "",
          remark: "",
          colorpictures: ""
        }
      ];
      this.disabledGroup1 = [];
      this.disabledGroup2 = [];
      this.disabledGroup3 = [];
      this.getBasicslist()
    },
     //上传颜色图片
    addimg(index) {
      this.colorindex = index;
      this.$refs.uploadfiles.click();
      this.$refs.uploadfiles.value = ''  
    },
     //上传图片
    fileClick() {
      this.$refs.uploadfile.click();
      this.$refs.uploadfile.value = ''
    },
/*     chickvalue(e){
      	if(this.models[2] == ""){
          return;
        }	
        if(!this.models[2].match("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")){
        this.$Message.warning("请不要输入特殊字符!");
       
         this.$set(this.models,2,"")
        }
    }, */
    // base64上传图片
    fileChanges(event) {
   
      if (!event.target.files[0].size) return;
      let file = event.target.files[0];
      this.imgList = [];
      this.fileAdd(file);
      setTimeout(() => {
         this.$Loading.start();
        this.$axios
          .post(
            "/admin/common/upload_ajax.ashx?action=UpLoadFile",
            this.$qs.stringify({ imglist: JSON.stringify(this.imgList) })
          )
          .then(res => {
            if (res.status >= 0) {
               this.$Loading.finish();
              this.colorList[this.colorindex].colorpictures = res.data[0];
              console.log(this.colorList);
               this.creatmainList();
            } else {
               this.$Loading.error();
              that.$Message.warning(res.content);
            }
          })
          .catch(() => { this.$Loading.error();});
      }, 100);
    },
     //文件流上传图片
    fileChange(event) {
      if (!event.target.files[0].size) return;
      let files = event.target.files;
      // 批量上传
       let formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        // 单张上传
        formData.append("file"+i,files[i])
      } 
        this.$axios
          ({
           url: "/admin/common/upload_ajax.ashx?action=UpLoadFiles",
           data: formData, method: 'post',
           headers: { 
          'Content-Type': 'multipart/form-data'
         }})
          
          .then(res => {
            if (res.status > 0) {
              res.data.forEach(i=>{
               this.imgLists.push(i) 
              })
            } else {
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
  
    },
    // 图片转base64
    fileAdd(file) {
       
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
        that.imgList.push(this.result);
      };
    },
    // 计算转换图片大小
    bytesToSize(bytes) {
      if (bytes === 0) return "0 B";
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    // 删除
    fileDel(index) {
      this.imgLists.splice(index, 1);
      this.img = require("../assets/imgs/bg04.jpg");
    },
    ok() {
      this.disabledGroup1 = [];
      this.disabledGroup2 = [];
      this.disabledGroup3 = [];
      this.mainList = [];
    },
    cancel() {
      if (this.disabledGroup1.length) {
        this.tvalue2 = 0;
      }
      if (this.disabledGroup2.length) {
        this.tvalue2 = 1;
      }
      if (this.disabledGroup3.length) {
        this.tvalue2 = 2;
      }
    },
     ok2() {
          this.$set(this.models,0,"");
      //this.models[0] = "";
      this.modal2 = false;
      this.lasttvalue1 = this.tvalue1    
    },
    cancel2() {
      this.tvalue1 = this.lasttvalue1;
      this.modal2 = false;
      this.tabsisok= false
    } 
  },

  watch: {
    // 监听imgList数据变化,不能超过9张图片
    imgList: function() {
      if (this.imgList.length > 9) {
        this.imgList.length = 9;
        // 超过9张后重新计算图片大小
        this.size = 0;
        for (let i = 0; i < 9; i++) {
          this.size = this.size + this.imgList[i].file.size;
        }
        // console.log(this.imgList);
      }
    },
    tvalue1: function() {
      if (this.models[0]&&this.tabsisok) {
        this.modal2 = true;
      }
       this.tabsisok = true 
    },
    tvalue2: function() {
      let t = "disabledGroup" + (this.tvalue2 + 1);
      if (this[t].length === 0 && this.mainList.length !== 0) {
        this.modal1 = true;
      }
    }
  }
};
</script>
<style >
.colorsction .ivu-icon.ivu-icon-md-close {
  transform: translateY(-2px);
}
#goodsfrom tbody .ivu-input.ivu-input-default {
  border: none;
  width: 111px;
  margin-left: 5px;
  margin-top: 2px;
  height: 30px;
  font-size: 14px;
}
.goods .ivu-tabs{overflow: visible}
.sction .ivu-tabs-nav{margin: 0;}
/* .goods .ivu-tabs-bar{margin-bottom: 0;} */
</style>
<style scoped>
#topbar,
.goodsfrom {
  padding: 10px 0;
  margin: 0 0 20px;
}
.goodstitle>div:first-child{display: inline-block;width: 100px;height: 100px;margin: 8px 8px 8px 0;background: #fff;vertical-align: top;}
.goodstitle .goodstext{width: 150px;text-align: left;display: inline-block;padding-top: 8px;}
.goodstext>p{font-size: 12px;color: #999999;}
.goodstitle .goodstext>p:first-child{font-size: 14px;color: #4c4c4c;}
.goodstitle .goodstext>p:last-child{font-size: 14px;color: #ff6f37;margin-top: 8px;}
.title {
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
  margin: 8px 0 6px;
}
.title>span{margin-left: 0;margin-right: 8px;}
.tabbox {
  margin: 15px 10px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 10px 15px 90px;
}
.topsearch {
  float: right;
  width: 280px;
  margin-right: 20px;
  margin-top: 8px;
}
.btnbox {
  top: 116px;
  left: 15px;
}
.foot {
  float: right;
  padding-top: 56px;
}
/* .line{
  width: 100%;height: 20px;background: #f2f3f8;transform: scaleX(1.1)
} */
.goodsfrom p {
  font-size: 18px;
  padding: 16px 15px;
  color: #4c4c4c;
  border-bottom: 1px solid #dcdee2;
}
p.titl1,div.titl1{background: #fff;margin-left: 10px;margin-bottom: 20px;}

.sction {
  padding: 10px 25px;
  margin: 20px 0;
}
.sction span {
  font-size: 14px;
  margin-right: 12px;
  line-height: 20px;
  width: 60px;
  display: inline-block;
  text-align: right;
  color: #808080;
}
.colorsction {
  margin: 10px 0;
}
.colorbox {
  display: block;
  margin-left: 80px;
  margin-top: -30px;
  margin-bottom: 40px;
}
.checkboxs {
  margin: 20px 0;
  background: #f9f9f9;
  padding: 10px;
}
.colorbox tr th,
.colorbox tr td {
  width: 120px;
  height: 35px;
  border: 1px solid #ccc;
  margin-left: -2px;
  display: inline-block;
  border-left: none;
  padding: 6px;
  font-size: 14px;
}
.colorbox tr td {
  border-top: none;
  margin-top: -2px;
}
.inputer {
  width: 100px;
  height: 100px;
  display: none;
}
.imgbox {
  width: 150px;
  height: 150px;
  display: inline-block;
  position: relative;
  margin-top: 30px;
  margin-right: 20px;
  text-align: center;
  vertical-align: top;
  border: 1px solid #f6f6f6;
}
.imgbox img {
  max-height: 150px;
  max-width: 150px;
}
.imgbox .removei {
  width: 150px;
  height: 42px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  padding-top: 8px;
  display: none;
  
}
.imgbox:hover .removei {
  display: block;
}
.special {
  display: inline-block;
  margin: 20px 30px 20px 0;
}
.modal_p {
  text-align: center;
  font-size: 18px;
  margin: 50px 0 30px;
}
#topbar2 {
  padding: 10px 25px 30px;
}
#topbar2 .title2 {
  font-size: 14px;
  line-height: 20px;
  border: none;
  display: inline-block;
  padding: 0;
}
.sctions{display: inline-block;margin-bottom: 20px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.btn1{color: #fff;margin: 8px 0 30px;font-size: 14px;height: 32px;line-height: 18px;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
.colorimgbox{width: 120px;height: 22px;display: inline-block;vertical-align: top }
.colorimgbox img{width:22px ;height: 22px;margin-left: -10px;margin-right: 10px;transform: translateY(1px)}
.tabtop{width: 180px;font-weight: 600;position: absolute;top: 171px;right: 42px;z-index: 999;background-color: #f8f8f9;}
.tabtop span{margin-right: 88px;}
.colorbox tr .feasttd{margin-left: 0;border-left: 1px solid #ccc;width: 180px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
</style>