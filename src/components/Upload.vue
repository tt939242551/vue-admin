<template>
     <div class="form-group">
      <div class="control-form">
        <ul class="upload-imgs">
          <li :style="{width: wsize1}" v-if="imgLen>=4 ? false : true">
            <input type="file" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <a class="add"><i class="iconfont icon-plus"></i><p style="margin-top: 11px">点击上传</p></a> 
          </li>
          <li class="liimg" v-show="imgsrc">
            <p class="img" :style="{width: wsize2}"><img :style="{width: wsize2}" :src="imgsrc"><a class="close" @click="delImg">×</a></p>
          </li>
        </ul>
        <p style="margin-top: 1px"><Icon size="16" type="md-add" style="transform: translateY(-2px)" />图片尺寸 ( {{size}} )</p>
      </div>
    </div>
</template>
<script>
import { nfcall } from 'q';
export default {
  name: "upload",
   data() {
      return {
        formData:new FormData(),
        imgs: {},
        imgLen:0,
      }
    },
    props:["imgsrc","size"],
     computed: {
     wsize1: function () {
      return parseInt(this.size.split('*')[0])*94/parseInt(this.size.split('*')[1]) + 24 + "px"
    },
    wsize2: function () {
      return parseInt(this.size.split('*')[0])*94/parseInt(this.size.split('*')[1]) + "px"
    },
    },
    methods: {
      addImg(event){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>4){
          alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.$set(this.imgs,"img"+i,this.fil[i]);
          this.$emit("imgs",this.imgs.img0)
        }
      },

      delImg(){
        console.log(this.imgs)
        this.imgs.img0 = ''
        this.$emit("imgs",this.imgs.img0)

      


      },
      submit(){
        for(let key in this.imgs){
          let name=key.split('?')[0];
          this.formData.append('multipartFiles',this.imgs[key],name);
        }
        this.$http.post('/opinion/feedback', this.formData,{
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          this.alertShow=true;
        });
      },
    }
  }
</script>
<style scoped>

.upload-imgs{margin: 10px 0 10px 0;overflow: hidden;font-size: 0;position: relative;}
.upload-imgs li{position: relative;height: 118px;font-size: 14px;display: inline-block;padding: 10px;margin-right: 25px;border: 2px dashed #ccc;text-align: center;vertical-align: middle;}
.upload-imgs .add{display: block;background-color: #ccc;color: #ffffff;height: 94px;padding: 8px 0;}
.upload-imgs .add .iconfont{padding: 10px 0;font-size: 40px;}
.upload-imgs .liimg {position: absolute;top: 0;left: 0;}
.upload-imgs li .upload{position: absolute;top: 0;bottom: 0;left: 0;right: 0;height: 118px;opacity: 0;}
.upload-imgs .img{position: relative;height: 94px;line-height: 94px;}
.upload-imgs .img img{vertical-align: middle;height: 94px;}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -6px;top: -10px;line-height: 1;font-size: 22px;color: #aaa;}

</style>
 