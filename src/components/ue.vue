<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;max-width:1000px;">
  
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: ''
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ['catchData',"content"], // 接收父组件的方法
  mounted() {
 
    this.editor = new E(this.$refs.editorElem);
    let  _tant = this
    //this.editor.customConfig.uploadImgServer = 'http://sfstyling.bogole.com/admin/common/upload_ajax.ashx?action=UpLoadFile'
    setTimeout(()=>{
      this.$refs.editorElem.children[1].style["min-height"]="300px"
      this.$refs.editorElem.children[1].style.height="auto"
       this.editor.txt.html(this.content) 
    },1000)
    this.editor.customConfig.customUploadImg = function (files, insert) {
       let reader = new FileReader();
       let imgUrl = ""
        let imglist = []
      // 调用reader.readAsDataURL()方法，把图片转成base64
      reader.readAsDataURL(files[0]);
      // 监听reader对象的onload事件，当图片加载完成时，把base64编码賦值给预览图片
      reader.onload = function() {
        imglist.push(this.result);
        _tant.$axios
          .post(
            "upload_ajax.ashx?action=UpLoadFile",
            _tant.$qs.stringify({ imglist: JSON.stringify(imglist) })
          )
          .then(res => {
            if (res.status >= 0) {
              imgUrl = res.data[0];
               insert(imgUrl)
            } else {
              _tant.$Message.warning("图片上传失败");
            }
          })
          .catch(() => {_tant.$Message.warning("图片上传失败");});
        // console.log(this); 这里的this是FileReader对象
        // 再把file对象添加到imgList数组
         console.log(imgUrl)
      };
    // files 是 input 中选中的文件列表
    // insert 是获取图片 url 后，插入到编辑器的方法
    // 上传代码返回结果之后，将图片插入到编辑器中
    }
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ];
    this.editor.create(); // 创建富文本实例
  }
}
</script>