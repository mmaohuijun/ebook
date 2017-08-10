<template>
<div class="login">
  <div class="login-content">
    <h1>金地电子台账</h1>
    <Form label-position="top" class="login-form">
      <Form-item label="账号">
        <div href="#" class="login-link">
          <Checkbox class="login-checkbox" v-model="ifRemember">记住账号</Checkbox>
        </div>
        <Input placeholder="请输入您的账号" v-model="loginName"></Input>
      </Form-item>
      <Form-item label="密码">
        <a href="#" class="login-link" @click="modalForgetPWD = true">忘记密码？</a>
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
    <p style="font-size:20px; color:#555555; padding: 38px 10px; text-align: center;">忘记密码，请联系管理员协助找回，谢谢！</p>
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
  methods: {
    goLogin() {
      console.log('goLogin', this.loginName, this.password, this.ifRemember)
      this.loading = true
      this.$axios.post('login', {
        loginName: this.loginName,
        password: this.password
      }).then(response => {
        this.loading = false
        if (response === null) return
        console.log('login', response)
        // 登录成功后登记一下login状态
        this.$store.commit('hasLogin')
        const reData = response.data
        const loginInfo = {
          loginName: reData.loginName,
          name: reData.name,
          mobile: reData.mobile,
          no: reData.no
        }
        this.$store.commit('initInfo', loginInfo)
        this.$router.push('/')
      })
    }
  }
}
</script>
<style lang="less">
.custom{
  .login {
    width: 100%;
    height: 100%;
    background: url('../../../static/img/login_bg.jpg');
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
      font-size: 14px;

      .ivu-checkbox-inner {
        border-color: #1c93ea;
        background: none;
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
      color: #fff;
      font-size: 16px;
    }

    .ivu-input {
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
