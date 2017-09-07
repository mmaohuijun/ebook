<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">修改密码</h2>
  </div>
  <div class="layout__body">
    <div class="forget-pwd">
      <div class="forget-pwd__title">修改密码</div>
      <Form :label-width="120" label-position="right" style="width: 350px; margin: 0 auto;">
        <Form-item label="旧密码">
          <Input type="password" placeholder="" v-model="oldPwd"></Input>
        </Form-item>
        <Form-item label="新密码">
          <Input type="password" placeholder="" v-model="newPwd"></Input>
        </Form-item>
        <Form-item label="确认密码">
          <Input type="password" placeholder="" v-model="confirmPwd"></Input>
        </Form-item>
        <Form-item label="">
          <Button type="primary" class="custom-secondary-btn" @click="cancel">取消</Button>
          <Button type="primary" class="custom-btn" @click="save" style="float: right;">保存</Button>
        </Form-item>
      </Form>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      confirmPwd: ''
    }
  },
  methods: {
    save() {
      if (this.newPwd !== this.confirmPwd) {
        this.$Message.error('两次密码不相同')
        return
      }

      if (this.newPwd === null || this.confirmPwd === null) {
        this.$Message.error('密码不能为空')
        return
      }
      this.$axios.post('/chg-passwd', { password: this.oldPwd, newPassword: this.newPwd }).then(response => {
        if (response === null) return
        this.$router.push({ name: 'Login' })
      })
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
  .forget-pwd {
    background:#ffffff;
    border:1px solid #979797;
    border-radius:4px;
    width:698px;
    height:298px;
    margin: 10px auto 0;
  }

  .forget-pwd__title {
    font-size:20px;
    color:#555555;
    padding: 20px 0 25px;
    text-align: center;
  }
</style>
