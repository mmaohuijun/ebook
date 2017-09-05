<template>
<div class="login" v-bind:style="bgImg">
  <div class="login-content">
    <h1>金地电子台账</h1>
    <Form label-position="top" class="login-form">
      <Form-item label="账号">
        <div class="login-link">
          <Checkbox class="login-checkbox" v-model="ifRemember">记住账号</Checkbox>
        </div>
        <Input placeholder="请输入您的账号" v-model="loginName"></Input>
      </Form-item>
      <Form-item label="密码">
        <a href="javascript:;" class="login-link" @click="modalForgetPWD = true">忘记密码？</a>
        <Input placeholder="请输入您的密码" type="password" v-model="password"></Input>
      </Form-item>
      <Button class="login-btn" long :loading="loading" @click="goLogin">登录</Button>
    </Form>
  </div>
  <Modal
    class="forget-modal"
    width="600"
    :closable="false"
    v-model="modalForgetPWD"
    class-name="vertical-center-modal">
    <p style="font-size:20px; color:#555555; padding: 38px 10px; text-align: center;">忘记密码，请您到电子台账微信公众号的<br>个人中心里重置密码</p>
    <Button type="primary" size="large" class="modal-center-btn" @click="modalForgetPWD = false">返回</Button>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    return {
      loginName: '', // 账号
      password: '', // 密码
      ifRemember: false,
      loading: false,
      modalForgetPWD: false
    }
  },
  computed: {
    NODE_PATH() {
      return this.$store.state.NODE_PATH
    },
    bgImg() {
      return {
        background: `url(${this.NODE_PATH}static/img/login_bg.jpg)`
      }
    }
  },
  methods: {
    goLogin() {
      console.log('goLogin', this.loginName, this.password, this.ifRemember)
      this.loading = true

      this.$axios.post('login', {
        loginName: this.loginName,
        password: this.password
      }).then(response => {
        this.loading = false

        if (_.isNull(response)) return
        console.log('login', response)

        this.$store.commit('hasLogin')
        const reData = response.data
        const loginInfo = {
          loginName: reData.loginName,
          name: reData.name,
          mobile: reData.mobile,
          no: reData.no
        }
        // 保存用户信息到全局
        this.$store.dispatch('initUserInfo', loginInfo)

        // 是否记住账号
        if (this.ifRemember) {
          this.$store.dispatch('remeberLoginName', reData.loginName)
        } else {
          this.$store.dispatch('clearLoginName')
        }

        /** 应该根据用户权限跳转对应的菜单 */
        this.$router.push({ name: 'CaseManage' })
      })
    },
    checkIfHadRemeber() {
      this.loginName = this.$store.getters.getLoginName
      this.ifRemember = this.$store.getters.getLoginName !== undefined
    },
    enterLogin(event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        console.log('按了回车', event)
        this.goLogin()
      }
    }
  },
  created() {
    // 绑定按键enter登录
    document.addEventListener('keyup', this.enterLogin)
  },
  mounted() {
    this.checkIfHadRemeber()
  },
  destroyed() {
    document.removeEventListener('keyup', this.enterLogin)
  }
}
</script>
<style lang="less">
.custom{
  .login {
    width: 100%;
    height: 100%;
    // background: url('/test/web-admin/static/img/login_bg.jpg');
    background-size: cover;
  }

  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }

  .forget-modal {
    .ivu-modal-footer {
      display: none;
    }
  }

  .modal-center-btn {
    display: block;
    margin: 30px auto 30px;
  }

  .login-link {
    position: absolute;
    right: 0;
    top: -34px;
    font-size:14px;
    color:#1c93ea;

    &:hover,
    &:active {
      color:#1c93ea;
    }

    .login-checkbox {
      font-size: 14px !important;

      .ivu-checkbox-inner {
        border: 1px solid #1c93ea !important;
        background: none !important;
      }
      .ivu-checkbox-checked .ivu-checkbox-inner::after {
        display: block;
      }
    }
  }

  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -160px;
    margin-left: -190px;
    width:380px;
    height:320px;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-image:linear-gradient(-180deg, #ffffff 29%, rgba(255,255,255,0.00) 95%);
      border-radius:6px;
      opacity:0.6;
    }

    h1 {
      position: relative;
      z-index: 2;
      height: 77px;
      line-height: 70px;
      font-size:26px;
      color:#4e546c;
      text-align:center;
      font-weight: 400;
    }
  }

  .ivu-form.login-form {
    position: relative;
    z-index: 2;
    margin: 0 60px;
    .ivu-form-item-label {
      padding: 0 0 10px;
      color: #fff;
      font-size: 16px;
    }

    .ivu-input {
      height: 32px;
      border: none;
      font-size: 14px;

      &:focus {
        box-shadow: none;
      }
    }
  }

  .ivu-btn.login-btn {
    background:#4e546c;
    border-radius:4px;
    width:260px;
    height:36px;
    border: none;
    color: #fff;
    font-size: 16px;
    margin-top: 12px;

    &:hover,
    &:active {
      background:#4e546c;
      color: #fff;
    }

    &[disabled] {
      background:#4e546c;
      opacity: .8;

      &:hover,
      &:active {
        background:#4e546c;
        opacity: .8;
        color: #fff;
      }
    }
  }
}
</style>
