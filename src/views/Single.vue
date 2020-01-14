<template>
  <div class="single">
    <div v-if="isadds">
      <div id="topbar">
        <p class="title">单品管理</p>
        <Input search class="topsearch" size="small" enter-button="搜索" placeholder="搜索" />
      </div>
      <div class="tabbox" id="tabbox">
        <div v-if="!tabs.length" style="height:10px"></div>
        <Tabs v-model="tvalue">
          <TabPane v-for="(tab,i) in tabs" :key="i" :label="tab.title" icon="md-radio-button-on">
            <div class="addbtn">
               <Button v-show="tabs[0]" @click="addList"  type="primary" class="btn1"><Icon size="16" style="transform: translateY(-1px)" type="md-add" />新增单品</Button>
            </div>
            <Table
              stripe
              :ref="'selection'+ i"
              :columns="columns1"
              :data="data1"
              @on-selection-change="selectionChange"
            >
              <template slot-scope="{ row, index }" slot="action">
                 <span class="acbtn" style="margin-right: 20px" @click="show(index)">修改</span><span class="acbtn" @click="movelistindex(index)" >删除</span>
              </template>
            </Table>
            <span class="acbtn2" @click="xModal5=isCheck.length===0?false:true" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除选择单品</span>
          </TabPane>
        </Tabs>
        <div class="btnbox">
          <Button style="color:#c69c6d;border: none;margin-top: 5px;" @click="handleTabsAdd" size="small"><Icon  style="transform: translateY(-2px)" size="16" type="md-add" />新增类别</Button>
          <Button style="color:#c69c6d;border: none;margin-top: 5px;" @click="xModal3 = true" size="small" ><Icon  style="transform: translateY(-2px)" size="16" type="ios-trash" />删除</Button>
        </div>

        <div class="foot">
          <Page :total="total" prev-text="上一页" next-text="下一页" @on-change="getlist" />
        </div>
      </div>
      <Modal width="380" footer-hide v-model="xModal2" :styles="{top: '200px'}">
        <p class="stitle">类别添加</p>
        <Input class="sinput" v-model="value" placeholder="请输入类别名称" />
        <Button type="primary" class="samintbtn" @click="isok" style="width:120px;margin-left: 115px;margin-bottom: 30px;">提交</Button>
      </Modal>
        <Modal footer-hide v-model="xModal3" width="380" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除该类别？</p>
              <p>删除后数据将不可恢复。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -6px;">
              <Button style="width:80px" type="primary"  @click="removeTabs">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal3=false">取消</Button>
          </div>
        </Modal>
         <Modal footer-hide v-model="xModal4" width="380" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除该单品？</p>
              <p>删除后数据将不可恢复。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -6px;">
              <Button style="width:80px" type="primary" @click="movelist">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal4=false">取消</Button>
          </div>
        </Modal>
        <Modal footer-hide v-model="xModal5" width="380" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>请确认是否删除选中单品？</p>
              <p>删除后数据将不可恢复。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -6px;">
              <Button style="width:80px" type="primary"  @click="removeList">确定</Button><Button  style="width:80px;margin-left: 30px;display: inline-block;" class="samintbtn" @click="xModal5=false">取消</Button>
          </div>
        </Modal>
        <Modal footer-hide v-model="xModal6" width="380" :styles="{top: '200px'}">
          <div style="text-align:center;font-size: 20px;margin: 20px 0 ;">
              <p>该类别单品属性已绑定商品，</p>
              <p>请调整相关商品属性再进行删除。</p>
          </div>
          <div style="text-align:center;margin: 20px 0 20px -6px;">
              <Button style="width:80px" type="primary" class="samintbtn" @click="xModal6=false">确定</Button>
          </div>
        </Modal>
    </div>
    <div v-else>
      <div id="topbar">
        <p class="title">{{tabs[tvalue].title}} > 新增单品</p>
      </div>
      <main>
        <div class="mtop">单品名称<Input style="width:220px;border-radius: 4px;margin-left:20px;font-size: 14px"  v-model="mtitle" placeholder="请输入类别名称"/></div>
        <h5>通用属性</h5>
        <div v-for="(items,i) in generalattribute"  :key="i">
            <p class="ftitle">{{items.title}}</p>
            <div class="brand" >
              <Button v-for="(item,j) in items.item" :key="j" size="small" style="margin-right: 15px;margin-bottom: 15px;border-radius: 4px;min-width:80px" @click="changeBrand(i,j)" :type="item.isselect ? 'primary' : 'default'">{{item.title}}</Button>
            </div>
        </div>
       
      </main>
      <footer>
        <h6>特殊属性</h6>
        <Button size="small" type="primary" icon="md-add" style="margin-right: 15px;width:80px;border-radius: 4px;" @click="eaitSpecial('add')" ></Button>
        <Dropdown v-for="(lists,i) in specialList" :key="i" trigger="click" style="margin: 10px 20px 10px 0" >
          <Button size="small"  style="min-width:148px">
            {{lists.ms}}
            <Icon style="margin-left: 10px;" type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(list,index) in lists.ls" :key="index">{{list}}</DropdownItem>
          </DropdownMenu>
           <Button type="primary"  @click="eaitSpecial(i)" shape="circle" icon="ios-create-outline" style="margin-left: 5px;width:16px;height:16px;" size="small"><Icon type="ios-create-outline" /></Button>
          <Button   @click="removeSpecial(i)" shape="circle" icon="md-remove" style="margin-left: 5px;width:16px;height:16px;" size="small"></Button>
         
        </Dropdown>
        
        <h6>设置时间</h6>
        <DatePicker type="date" :value="timeval" placeholder="设置时间" @on-change="gettimeval" style="width: 216px;margin: 10px 0 50px;"></DatePicker>
      </footer>
        <Button type="primary" class="samintbtn" @click="postSpecial">确定</Button><Button class="samintbtn" @click="isadds=true">取消</Button>
      <Modal width="380" footer-hide v-model="xModal1" class="x_model" :styles="{top: '200px'}">
        <p class="stitle">特殊属性</p>
        <Input class="minput" v-model="ms" placeholder="请输入主属性"/>
        <div v-for="(list,n) in ls" :key="n">
          <Input class="minput" v-model="ls[n]" placeholder="请输入副属性"/><Icon @click="ls.splice(n,1)" style="font-size: 18px;transform: translateY(9px)"  type="md-remove" />
        </div>
        <Button @click="ls.push('')"  class="samintbtn" size="small">添加副属性<Icon type="md-add" style="font-size: 16px;line-height: 15px;" /></Button>
        <Button type="primary" class="samintbtn" style="width:120px;margin-left: 116px;margin-bottom: 30px;" @click="getSpecial">提交</Button>
      </Modal>
     
    </div>
  </div>
</template>

<script>
export default {
  name: "single",
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "单品名称",
          key: "title",
          align: "center"
        },
        {
          title: "生成时间",
          key: "setdate",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data1: [],
      tabs: [],
      xModal1: false,
      xModal2: false,
      xModal3: false,
      xModal4: false,
      xModal5: false,
      xModal6: false,
      tvalue: 0,
      tindex: 0,
      isCheck: [],
      value: "",
      isadds: true,
      generalattribute: [],
      specialList:[],
      mtitle: "", 
      ms:"",
      ls:[],
      timeval:"",
      page:1,
      pageSize:10,
      total:1,
      specialindex: null
    };
  },
  created(){this.getInit()},
  methods: {
    getInit(){
      this.$axios.post("/admin/common/category.ashx?action=selectlist",this.$qs.stringify({page:0,pageSize:0,parentid:0})).then(res=>{
         if (res.status>=0) {
           this.tabs = res.item
           this.getSingleList()
         }else{
            if (res.status==-1008) {
                  localStorage.setItem("userName", '');
                 localStorage.setItem("token",""); 
                  this.$router.push({ path: this.redirect || "/statistics" });
              }
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
              
         })
    },
    getSingleList(){
      this.$axios.post("/admin/common/category.ashx?action=selectlist",this.$qs.stringify({page:this.page,pageSize:this.pageSize,parentid:this.tabs[this.tvalue].id})).then(res=>{
         if (res.status>=0) {
             this.data1 = res.item
             this.data1.forEach(i=>{
           i.setdate =  i.setdate.match(/20\d{2}\/\d{1,2}\/\d{1,2}/)[0]
            })
             this.total = res.totalCount
         }else{
           this.$Message.warning(res.content); 
         }
        
       }).catch(()=>{
              
         } )
    },
    removeTabs(){
      let arr = []
      arr.push(this.tabs[this.tvalue].id)
       this.$axios.post("/admin/common/category.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
           this.xModal3 = false
      
            this.getInit()
         }else if (res.status===-1)  {
           this.xModal3 = false
           this.xModal6 = true
         }else{this.$Message.warning(res.content); }
       }).catch(()=>{
              
         } )
    },
    show(index) {
      this.isadds = false;
      this.tindex = index
      this.mtitle = this.data1[index].title
      let id = this.data1[index].id
      this.timeval = this.data1[index].setdate
       this.$axios.post("/admin/common/category.ashx?action=selectdetails",this.$qs.stringify({id:id})).then(res=>{
         if (res.status>=0) {
             this.generalattribute = res.item[0].generalattribute
             this.specialList = res.specialattributes   
         }else{
           this.$Message.warning(res.content); 
         }
    
       }).catch(()=>{
              
         } )

    },
    getlist(index) {
      this.page = index
      this.getSingleList()
    },
    selectionChange(a) {
      this.isCheck = [];
      a.forEach(item => {
        if (this.isCheck.indexOf(item.id) < 0) {
          this.isCheck.push(item.id);
        }
      });
    },
    gettimeval(t){
      this.timeval = t
    },
    handleTabsAdd() {
      this.value = ""
      this.xModal2 = true;
    },
    addList() {
      this.tindex = this.data1.length
      this.isadds = false
      this.specialList = []
       this.mtitle = ""
       this.$axios.post("/admin/common/category.ashx?action=InitializationAdd").then(res=>{
         if (res.status>=0) {
             this.generalattribute = res.generalattribute
         }else{
           this.$Message.warning(res.content); 
         }
       }).catch(()=>{
              
         } )
    },
    removeList() {
       this.$axios.post("/admin/common/category.ashx?action=delete",this.$qs.stringify({ids: JSON.stringify(this.isCheck)})).then(res=>{
         if (res.status>=0) {
            this.xModal5 = false
            this.getSingleList()
         }else if (res.status===-1)  {
           this.xModal5 = false
           this.xModal6 = true
         }else{this.$Message.warning(res.content); }
       }).catch(()=>{
              
         } )
    },
    movelistindex(i){
          this.tindex = i
          this.xModal4 = true
    },
    movelist(){
      let url = "/admin/common/category.ashx?action=delete"
      let arr = [this.data1[this.tindex].id]
       this.$axios.post(url,this.$qs.stringify({ids: JSON.stringify(arr)})).then(res=>{
         if (res.status>=0) {
             this.xModal4 = false
             this.getSingleList()
         }else if (res.status===-1)  {
           this.xModal4 = false
           this.xModal6 = true
         }else{this.$Message.warning(res.content); }
       }).catch(()=>{
         } )
    },
    isok() {
      if (this.value) {
        this.$axios.post("/admin/common/category.ashx?action=add",this.$qs.stringify({title:this.value, parentId:0,brandname:"",brandid:"",Seasonname:"",Seasonid:"",
        stylename:"",styleid:"",specialattributes:"",setdate:"",})).then(res=>{
         if (res.status>=0) {
         this.getInit()
         }else{
           this.$Message.warning(res.content); 
         }
        }).catch(()=>{
              
         })
        this.xModal2 = false;
      } else {
        this.$Message.warning("输入数据不能为空");
      }
    },
    changeBrand(i,j) {
      if (this.generalattribute[i].item[j].isselect) {
        this.$set(this.generalattribute[i].item[j],"isselect",false) 
      }else{this.$set(this.generalattribute[i].item[j],"isselect",true) }
      
    },

    eaitSpecial(i){
      this.xModal1 = true
      
      if (i !== 'add') {
        this.specialindex = i
        this.ms = this.specialList[i].ms
        this.ls = this.specialList[i].ls
      }else{
       this.ms = ""
       this.ls = []
      }
    },
    removeSpecial(i){
      this.specialList.splice(i,1)
      this.specialindex = null
    },
    getSpecial(){
      this.xModal1 = false
        let obj = {
        ms: this.ms,
        ls: this.ls
      }
      if (this.specialindex === null) {
        this.specialList.push(obj)
      }else{
        this.specialList[this.specialindex].ms =this.ms
        this.specialList[this.specialindex].ls =this.ls
        } 
    },
    postSpecial(){
    
      let brandname=[];
      let brandid=[];
       let url,pamls;
     this.generalattribute.forEach(i=>{
        i.item.forEach(j=>{
          if (j.isselect) {
          brandname.push(j.title)
          brandid.push(j.guid)
          }
        })

     })
    if (this.tindex === this.data1.length) {
       url = "/admin/common/category.ashx?action=add"
       pamls = {title:this.mtitle, parentId:this.tabs[this.tvalue].id,generalattributename:brandname.join(","),generalattributeid:brandid.join(","),
        specialattributes: JSON.stringify(this.specialList),setdate:this.timeval}
     }else{
        url = "/admin/common/category.ashx?action=edit"
        let  id = this.data1[this.tindex].id
        pamls = {title:this.mtitle,generalattributename:brandname.join(","),generalattributeid:brandid.join(","),
        specialattributes: JSON.stringify(this.specialList),setdate:this.timeval,parentId:0,id:id}
     }
      this.$axios.post(url,this.$qs.stringify(pamls)).then(res=>{
         if (res.status>=0) {
         this.getInit()
         }else{
           this.$Message.warning(res.content); 
         }
        }).catch(()=>{
              
         })
         this.isadds=true
    },
  },
  watch : {
      tvalue : function(){
      this.page = 1
      setTimeout(()=>{
         this.getSingleList()
      },500)
    }
  }

};
</script>
<style>
.btnbox .ivu-btn.ivu-btn-small {
  color: #787878;
  width: 86px;
  border-radius: 4px;
}
footer .ivu-icon.ivu-icon-md-remove{transform: translateY(-4px);font-size: 12px}
footer .ivu-icon.ivu-icon-ios-create-outline{transform: translate(-6px,-4px);font-size: 12px}
.single .ivu-tag:not(.ivu-tag-border):not(.ivu-tag-dot):not(.ivu-tag-checked){border: 1px solid #c69c6d}
.single .ivu-tag-error, .ivu-tag-primary,.single .ivu-tag-success, .ivu-tag-warning{border: 1px solid #c69c6d}
/* #tabbox.tabbox .ivu-table-wrapper{border: none}
#tabbox.tabbox .ivu-table:before{height: 0;} */
</style>
<style scoped>
.single{margin-bottom: 50px;}
#topbar {
  padding: 10px 15px 20px;
}
.title {
  font-size: 14px;
  line-height: 20px;
  display: inline-block;
}
.ftitle{
  font-size: 14px;margin: 30px 0 10px;
}
.tabbox {
  background: #fff;
  padding: 50px 15px 80px 15px;
}
.topsearch {
  float: right;
  width: 280px;
}
.btnbox {
  position: absolute;
  top: 65px;
  right: 10px;
}
.foot {
  float: right;
  padding-top: 20px;
}

.samintbtn {
  margin:  10px ;
  border-radius: 4px;
  width: 120px;
}
.x_model .samintbtn{margin: 20px 124px ; width: 100px;}
.x_model .minput{width: 220px;margin-left: 68px;margin-top: 20px;margin-right: 4px;}
.postimg {
  display: flex;
  padding: 60px 0 20px 0;
}
.postimg p {
  margin: 0 15px;
  font-size: 15px;
  line-height: 36px;
}
.stitle {
  font-size: 18px;
  text-align: center;
  margin: 25px 0;
}
 .sinput {
  width: 240px;
  margin: 10px 0 40px 58px;
}
footer .sinput {
  width: 240px;
  margin: 10px 0 40px;
}
.addbtn {
  margin: 10px 0 30px;
}
main,footer{background: #fff;padding: 10px 15px;margin-bottom: 20px;box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);}
.mtop{font-size: 18px;padding: 20px 0;border-bottom: 1px solid #cfcfcf}
h5{font-size: 16px;margin-top: 20px;}
h6{font-size: 15px;margin-top: 15px;margin-bottom: 5px;}
.design{margin-bottom: 30px;}
.btn1{height: 32px;width: 100px;font-size: 14px;line-height: 16px;}
.acbtn{display: inline-block;color: #c69c6d;cursor: pointer;}
.acbtn2{display: inline-block;cursor: pointer;color: #787878;margin-top: 20px;}
</style>
