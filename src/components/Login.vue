<template>
  <div class="login-vue">
    <div class="container">
      <p class="title">
        FASHIONOCTOPUS
        <br />后台管理
      </p>
      <div class="input-c">
        <Input
          prefix="ios-contact"
          v-model="account"
          placeholder="用户名"
          clearable
          @on-blur="verifyAccount"
        />
        <p class="error">{{accountError}}</p>
      </div>
      <div class="input-c">
        <Input
          type="password"
          v-model="pwd"
          prefix="md-lock"
          placeholder="请输入密码"
          clearable
          @on-blur="verifyPwd"
        />
        <p class="error">{{pwdError}}</p>
      </div>
      <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登录</Button>
      <p class="account">
        <Checkbox class="inputvu" v-model="single" >记住账号</Checkbox>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      account: "",
      pwd: "",
      accountError: "",
      pwdError: "",
      isShowLoading: false,
      single: false,
      redirect: "",
    };
  },
  created() {},
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    verifyAccount(e) {
      if (this.account == "") {
        this.accountError = "账号不能为空";
      } else {
        this.accountError = "";
      }
    },
    verifyPwd(e) {
      if (this.pwd == "") {
        this.pwdError = "密码不能为空";
      }
    },
    submit() {
      this.$axios.post('/admin/common/login.ashx',this.$qs.stringify({userName:this.account,userPwd:this.pwd})).then(res=>{
        if (res.status > 0) {
        this.isShowLoading = true;
        // 登陆成功 设置用户信息头像
       window.console.log(res)
        localStorage.setItem("userName",this.account);
         localStorage.setItem("token","token"); 
         if (res.role_id==2) {
            window.location.href = "http://sfstyling.bogole.com/business/index.html";
         }else{
            this.$router.push({ path: this.redirect || "/statistics" });
         }
        
        // location.reload() 
       if (this.single) {
         localStorage.setItem("userPwd", this.pwd);
       }
      
      } else {
       this.pwdError = res.content;
      }
      }).catch()
    }
  }
};
</script>

<style>
.login-vue {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: url(../assets/imgs/bg00.jpg);
}
.login-vue .container {
  background: #fff;
  width: 470px;
  height: 510px;
  text-align: center;
  border-radius: 10px;
  padding: 0 30px;
}
.login-vue .ivu-input {
  height: 44px;
  line-height: 44px;
  background-color: transparent;
  outline: #fff;
  font-size: 15px;
  border-radius: 5px;
}
.login-vue .title {
  font-size: 26px;
  margin: 70px 30px;
  color: #282a3c;
}
.login-vue .input-c {
  margin: auto;
  width: 330px;
}
.login-vue .error {
  color: red;
  text-align: left;
  margin: 5px auto;
  font-size: 12px;
  padding-left: 30px;
  height: 20px;
}
.login-vue .submit {
  width: 330px;
  height: 44px;
  background: #c69c6d;
  border: transparent;
  font-size: 15px;
  border-radius: 5px;
}
.login-vue .account {
  margin-top: 10px;
  color: #8c8c8c;
  font-size: 14px;
  line-height: 30px;
  text-align: left;
}
.login-vue .account .inputvu {
  margin: 0 0 0 40px;
}
.login-vue .ivu-icon {
  color: #aaa;
  line-height: 44px;
}
.login-vue .ivu-icon-ios-close-circle {
  color: #777;
}
</style>


