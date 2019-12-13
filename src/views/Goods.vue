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
              <Option v-for="(item,index) in generalattribute" :value="item.title" :key="index">{{ item.title }}</Option>
            </Select>
            <span>类别</span>
              <Select
              @on-change="getSingleList"
              v-model="smodels[1]"
              size="small"
              style="width:120px;margin-right: 30px;"
              placeholder="请选择类别"
            >
              <Option v-for="item in parentcategory" :value="item.title" :key="item.title">{{ item.title }}</Option>
            </Select>
            <span>单品</span>
            <Select
              @on-change="getDatalist"
              v-model="smodels[2]"
              size="small"
              style="width:120px"
              placeholder="请选择单品"
            >
              <Option
                v-for="(item,index) in SingleList"
                :value="item.title"
                :key="index"
              >{{ item.title }}</Option>
            </Select>
         </p>
        <Input search class="topsearch" size="small" v-model="smodels[3]" @on-search="getDatalist" enter-button="搜索" placeholder="搜索" />
      </div>
      <div class="btnbox">
        <Button type="primary" class="btn1" @click="addList" ><Icon size="16" style="transform: translateY(-1px)" type="md-add" />新增</Button>
        <div class="tabtop"><span>操作</span> 热销置顶</div>
      </div>
      <Table
        stripe
        ref="selection"
        :columns="columns1"
        :data="data1"
        @on-selection-change="selectionChange"
      >
        <template slot-scope="{ row, index }" slot="action">
          <span class="acbtn" style="margin-right: 20px" @click="show(index)">修改</span><span style="margin-right: 90px" class="acbtn" @click="movelist(index)" >删除 </span><span style="padding-right: 20px"> <Checkbox @on-change="settop(index)" v-model="data1[index].isoverhead"></Checkbox> </span>
          
        </template>
      </Table>
       <span class="acbtn2" @click="removeList" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选中单品</span>
      <div class="foot">
        <Page :total="total" prev-text="上一页" next-text="下一页" @on-change="getlist" />
      </div>
    </div>
    <div id="goodsfrom" class="goodsfrom" v-else>
       <div id="topbar2">
         <p class="title2"><span style="cursor: pointer;" @click="closegoods"> 商品管理</span> > {{tindex===data1.length ? "新增商品":"编辑商品"}}</p>
       </div>
          <p class="titl1"> <span>宝贝标题</span>
            <Input
              v-model="models[2]"
              placeholder="请输入宝贝名称"
              style="width: 300px;margin-left: 20px;"
            /></p>
          <div class="titl1">
            <p>分类</p>
            <div class="sction">
              <Select
                @on-change="getCategory"
                v-model="models[0]"
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
                placeholder="请选择单品"
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
                style="width:200px;margin-right: 30px;"
                placeholder="请选择品牌"
              >
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
            <Option v-for="(items,j) in i.item" :value="items.guid" :key="j">{{ items.ls }}</Option>
          </Select>
        </div>
      </div>
      <p>基本信息</p>
      <div class="sction">
        <span>颜色分类</span>
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
              placeholder="请输入颜色"
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
          @input="fileChanges"
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
              style="width:80px"
              icon="md-add"
              @click="if(value1&&disabledGrouplist1.indexOf(value2)===-1)disabledGrouplist1.push(value1)"
            >添加</Button>
            <CheckboxGroup class="checkboxs" v-model="disabledGroup1" @on-change="creatmainList">
              <Checkbox
                v-for="itme in  disabledGrouplist1"
                :label="itme"
                :key="itme"
                style="margin: 10px 130px 10px 0;"
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
              style="width:100px"
              icon="md-add"
              @click="if(value2&&disabledGrouplist2.indexOf(value2)===-1)disabledGrouplist2.push(value2)"
            >添加</Button>
            <CheckboxGroup class="checkboxs" v-model="disabledGroup2" @on-change="creatmainList">
              <Checkbox
                v-for="itme in  disabledGrouplist2"
                :label="itme"
                :key="itme"
                style="margin-right: 50px;"
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
              style="width:100px"
              icon="md-add"
              @click="if(value3&&disabledGrouplist3.indexOf(value2)===-1)disabledGrouplist3.push(value3)"
            >添加</Button>
            <CheckboxGroup class="checkboxs" v-model="disabledGroup3" @on-change="creatmainList">
              <Checkbox
                v-for="itme in  disabledGrouplist3"
                :label="itme"
                :key="itme"
                style="margin-right: 50px;"
              ></Checkbox>
            </CheckboxGroup>
          </TabPane>
        </Tabs>
        <span>销售规格</span>
        <table class="colorbox" style="margin-top: -20px">
          <thead>
            <tr>
              <th style="margin-left: 0px;border: 1px solid #ccc;">颜色</th>
              <th>尺码</th>
              <th>价格 (元)</th>
              <th>数量 (件)</th>
              <th>商家编码</th>
              <th>商品条形码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in mainList" :key="i">
              <td :ref="'color'+i" style="margin-left: 0px;border-left: 1px solid #ccc;">{{item.colors}}</td>
              <td>{{item.size}}</td>
              <td style="padding: 0;">
                <Input class="tabinput" @on-blur="getTotal" v-model="item.Price" />
              </td>
              <td style="padding: 0;">
                <Input class="tabinput" @on-blur="getTotal" v-model="item.number" />
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
      </div>
      <p>图文概述</p>
      <div class="sction">
        <span style="width:88px">电脑端宝贝图</span>
        <Button type="primary" size="small" @click="fileClick" style="width:100px" icon="md-add">
          批量上传
          <input
            type="file"
            ref="uploadfile"
            class="inputer"
            @input="fileChange"
            multiple="multiple"
          />
        </Button>
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
          key: "title",
          align: "center"
        },
        {
          title: "品牌",
          key: "brandname",
          align: "center"
        },
        {
          title: "类别",
          key: "parentcategoryname",
          align: "center"
        },
        {
          title: "单品",
          key: "categoryname",
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
          width: 250,
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
      page: 1,
      pageSize: 10,
      total: 1,
      allStatu: true,
      content: "",
      category: [],
      categoryItem: [],
      modal1: false,
      modal2: false,
      tabsisok: true,
      sizearr:[],
      colorarr:[],
    };
  },
  components: { Uediter },
  created() {
    this.getInit();
    this.getBasicslist()
  },
  methods: {
    catchData(html) {
      this.content = html;
    },
    gettimeval(t) {
      this.setdate = t;
    },
    getBasicslist(){
      this.$axios
        .post(
          "commodity.ashx?action=selectBasicslist",
         )
        .then(res => {
          if (res.status >= 0) {
            this.parentcategory = res.parentcategory
            this.generalattribute = res.generalattribute[0].item
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
    getInit() {
      this.$axios
        .post(
          "commodity.ashx?action=selectlist",
          this.$qs.stringify({ page: this.page, pageSize: this.pageSize })
        )
        .then(res => {
          if (res.status >= 0) {
            this.data1 = res.item;
            this.data1.forEach(i=>{
             i.setdate = i.setdate.slice(0,10)
            })
            this.total = res.totalCount;
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },

    handleSelectAll() {
      this.$refs.selection.selectAll(this.allStatu);
      this.allStatu = !this.allStatu;
    },
    movecolor(){  
      for(var i=0;i<this.mainList.length;i++ ){
        let t1 = 'color' + i
        let t2 = 'color' + (i+1)
         this.$refs[t1][0].style["border-bottom"] = "1px solid #ccc"
         if (this.$refs[t2]) {
           this.$refs[t2][0].style.color = "#000"
         } 
        if (this.$refs[t2]&&this.$refs[t1][0].innerText===this.$refs[t2][0].innerText) {
             this.$refs[t2][0].style.color = "#fff"
             this.$refs[t1][0].style["border-bottom"] = "none"
        }
      }
    },
    show(index) {
 
      this.tindex = index;
      this.isadds = false;
      let id = this.data1[index].id;

      this.$axios
        .post(
          "commodity.ashx?action=selectdetails",
          this.$qs.stringify({ id: id })
        )
        .then(res => {
          if (res.status >= 0) {
            this.models[2] = res.item[0].title;
            this.content = decodeURIComponent(res.item[0].commoditydetails);
            this.imgLists = JSON.parse(
              res.item[0].commoditypictures1.replace(/\\/g, "")
            );
            this.mainList = res.parentcategory;
            this.$nextTick(()=>{
                this.movecolor()
            })
            this.category = res.category;
            this.generalattribute = res.generalattribute;
            this.setdate = res.item[0].setdate;
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
                console.log(i.isselect)
                this.models[0] = i.id;
                this.categoryItem = i.item;
              }
            });
            this.categoryItem.forEach(i => {
              if (i.isselect) {
                this.models[1] = i.guid;
                 this.getSingle(i.guid)
              }
            });
           
            this.colorarr = [];
            this.sizearr = [];
            this.colorList =  [{ color: "", remark: "", colorpictures: ""}]
            this.mainList.forEach(i => {
              let obj = {};
              if (this.colorarr.indexOf(i.colors) < 0 && i.colors) {
                this.colorarr.push(i.colors);
                if (i.colors.indexOf("(")>0) {
                  let arr = i.colors.replace(/\)$/,'').split("(")
                   obj.color = arr[0];
                  obj.remark = arr[1]
                }else{
                  obj.color = i.colors
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
            this.getTotal();
            this.models[8] = res.item[0].Price;
          } else {
            this.$Message.warning(res.content);
          }
        });
    },
    getlist(index) {
      this.page = index;
      this.getInit();
    },
    selectionChange(a) {
      this.isCheck = [];
      a.forEach(item => {
        if (this.isCheck.indexOf(item.id) < 0) {
          this.isCheck.push(item.id);
        }
      });
    },
    addList() {
      this.parentcategory = [] // 类别
      this.generalattribute = []// 品牌
      this.smodels=[]
       this.bmodels=[]
       this.models= ["", "", "", "", "", "", "", "", "", ""]
       this.imgList= []
       this.imgLists= []
       this.size= 0
       this.colorindex= 0
       this.colorList= [
        {
          color: "",
          remark: "",
          colorpictures: ""
        }
      ]
       this.mainList= []
       this.specialList= []
       this.specialListItem= []
       this.specialmodels= []
      this.category=[]
      this.categoryItem= []
      this.sizearr=[]
      this.colorarr=[]
      this.tindex = this.data1.length;
      this.isadds = false;
      this.$axios
        .post("commodity.ashx?action=InitializationAdd")
        .then(res => {
          if (res.status >= 0) {
            this.tabs = res.style;
            this.category = res.category;
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
    getCategory(id) {
      this.categoryItem = [];
      this.specialmodels = []
      this.models[1] = "";
      this.models[3] = "";
      this.models[4] = "";
       if (id) {
        this.$axios
          .post(
            "category.ashx?action=selectby_parentid",
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
    getSingleList(t){
      this.smodels[2] = ""
      this.getDatalist()
       if (t) {
         let id ;
         this.parentcategory.forEach(i=>{
           if (i.title ===t) {
             id = i.id
             
           }
         })
        this.$axios
          .post(
            "category.ashx?action=selectby_parentid",
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
    getSingle(id) {
      if (id) {
        this.$axios
          .post(
            "category.ashx?action=categorybyid",
            this.$qs.stringify({ categoryid: id })
          )
          .then(res => {
            if (res.status >= 0) {
              this.generalattribute = res.generalattribute;
              this.specialList = res.specialattributes;
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
    getDatalist(){
      this.page = 1
      this.$axios
        .post(
          "commodity.ashx?action=selectlist",
          this.$qs.stringify({ page: this.page, pageSize: this.pageSize ,where:this.smodels[3],categoryname:this.smodels[2],parentcategoryname:this.smodels[1],generalattributename:this.smodels[0]})
        )
        .then(res => {
          if (res.status >= 0) {
            this.data1 = res.item;
            this.data1.forEach(i=>{
             i.setdate = i.setdate.slice(0,10)
            })
            this.total = res.totalCount;
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
    removeList() {
      this.$axios
        .post(
          "commodity.ashx?action=delete",
          this.$qs.stringify({ ids: JSON.stringify(this.isCheck) })
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
    movelist(i){
      let url = "commodity.ashx?action=delete"
      let arr = [this.data1[i].id]
       this.$axios.post(url,this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
            this.getInit();
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
         } )
    },
    createList(i) {
      if (this.colorList[i].color) {
         if (this.colorarr.indexOf(this.colorList[i].color) === -1) {
        this.colorarr.push(this.colorList[i].color)
        this.creatmainList();
        if (i === this.colorList.length - 1&&this.colorList[i].color) {
          let obj = { color: "", remark: "", colorpictures: "" };
          this.colorList.push(obj);
        }
      }else{
         this.colorList[i].color = ""
         this.$Message.warning("该颜色已经存在");
      }
      }
     
 
    },
    removeColorList(i) {
      if (this.colorList[i].color) {
       let index = this.colorarr.indexOf(this.colorList[i].color)
        this.colorList.splice(i, 1);
        this.colorarr.splice(index, 1);
      }
    },
    creatmainList() {
 
      this.mainList = [];
      let t = "disabledGroup" + (this.tvalue2 + 1);
      let arr = this[t];
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
            obj.colorpictures = i.colorpictures;
            this.mainList.push(obj);
          });
        }
      });
      this.$nextTick(()=>{
        this.movecolor()
      })
     
       
    },
    getTotal() {
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
    isok() {
      if (this.value) {
        this.isadds = true;
      } else {
        this.$Message.warning("输入数据不能为空");
      }
    },
    settop(i){
       console.log(i)
        this.$axios.post(
            "commodity.ashx?action=editisoverhead",
            this.$qs.stringify({ id:this.data1[i].id ,isoverhead: this.data1[i].isoverhead})
          )
          .then(res => {
            if (res.status >= 0) {
            } else {
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
    },
    getgoods() {
      if (!this.content && !this.setdate && !this.imgLists.length) {
        this.$Message.warning("输入数据不能为空");
        return false;
      }
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
      brandname = []
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
        url = "commodity.ashx?action=add";
        parms = {
          title: this.models[2],
          generalattributename: brandname.join(","),
          generalattributeid: this.bmodels.join(","),
          parentcategoryname,
          parentcategoryid,
          categoryname,
          categoryid: this.models[1],
          commoditypictures1: JSON.stringify(this.imgLists),
          commoditydetails: encodeURIComponent(this.content),
          specialattributesname: JSON.stringify(specialattributesname),
          specialattributesid: JSON.stringify(this.specialmodels),
          specifications: JSON.stringify(this.mainList),
          setdate: this.setdate,
          Price: this.models[8]
        };
      } else {
        url = "commodity.ashx?action=edit";
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
          commoditypictures1: JSON.stringify(this.imgLists),
          commoditydetails: encodeURIComponent(this.content),
          specialattributesname: JSON.stringify(specialattributesname),
          specialattributesid: JSON.stringify(this.specialmodels),
          specifications: JSON.stringify(this.mainList),
          setdate: this.setdate,
          Price: this.models[8]
        };
      }
      this.$axios
        .post(url, this.$qs.stringify(parms))
        .then(res => {
          if (res.status >= 0) {
            this.isadds = true;
            this.getInit();
          } else {
            this.$Message.warning(res.content);
          }
        })
        .catch(() => {});
    },
    closegoods(){
      this.isadds = true
      this.colorList = [
        {
          color: "",
          remark: "",
          colorpictures: ""
        }
      ]
      this.disabledGroup1 = [];
      this.disabledGroup2 = [];
      this.disabledGroup3 = [];
    },
    addimg(index) {
      this.colorindex = index;
      this.$refs.uploadfiles.click();
    },
    fileClick() {
      this.$refs.uploadfile.click();
    },
    // 上传图片
    fileChanges(event) {
      if (!event.target.files[0].size) return;
      let file = event.target.files[0];
      this.imgList = [];
      this.fileAdd(file);
      setTimeout(() => {
        this.$axios
          .post(
            "upload_ajax.ashx?action=UpLoadFile",
            this.$qs.stringify({ imglist: JSON.stringify(this.imgList) })
          )
          .then(res => {
            if (res.status >= 0) {
              this.colorList[this.colorindex].colorpictures = res.data[0];
            } else {
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
      }, 100);
    },
    fileChange(event) {
      if (!event.target.files[0].size) return;
      let files = event.target.files;
      // 批量上传
      this.imgList = [];
      for (let i = 0; i < files.length; i++) {
        // 单张上传
        this.fileAdd(files[i]);
      }
      setTimeout(() => {
        this.$axios
          .post(
            "upload_ajax.ashx?action=UpLoadFile",
            this.$qs.stringify({ imglist: JSON.stringify(this.imgList) })
          )
          .then(res => {
            if (res.status >= 0) {
              res.data.forEach(i=>{
               this.imgLists.push(i) 
              })
            } else {
              that.$Message.warning(res.content);
            }
          })
          .catch(() => {});
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
      this.imgList.splice(index, 1);
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
          this.$set(this.models,0,"")
      //this.models[0] = "";
      this.modal2 = false;
      this.lasttvalue1 = this.tvalue1    
    },
    cancel2() {
      this.tvalue1 = this.lasttvalue1
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
  font-size: 14px;
}
.ivu-tabs{overflow: visible}
.sction .ivu-tabs-nav{margin: 0;}
/* .goods .ivu-tabs-bar{margin-bottom: 0;} */
</style>
<style scoped>
#topbar,
.goodsfrom {
  padding: 10px 0;
  margin: 0 0 20px;
}

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
  height: 200px;
  display: inline-block;
  position: relative;
  margin-top: 30px;
  margin-right: 20px;
  text-align: center;
  vertical-align: top;
}
.imgbox img {
  height: 200px;
  width: 150px;
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
.sctions{display: inline-block}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.btn1{color: #fff;margin: 8px 0 30px;font-size: 14px;height: 32px;line-height: 18px;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
.colorimgbox{width: 120px;height: 22px;display: inline-block;vertical-align: top }
.colorimgbox img{width:22px ;height: 22px;margin-left: -10px;margin-right: 10px;transform: translateY(1px)}
.tabtop{width: 180px;font-weight: 600;position: absolute;top: 171px;right: 42px;z-index: 999;background-color: #f8f8f9;}
.tabtop span{margin-right: 88px;}
</style>