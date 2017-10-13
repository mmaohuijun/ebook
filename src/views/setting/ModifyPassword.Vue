<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">修改密码</h2>
  </div>
  <div class="layout__body">
    <div class="forget-pwd">
      <div class="forget-pwd__title">修改密码</div>
      <Form ref="modifyPwd" :model="modifyPwd" :label-width="120" :rules="modiRule" label-position="right" style="width: 350px; margin: 0 auto;">
        <Form-item label="旧密码" prop="oldPwd">
          <Input type="password" placeholder="" v-model="modifyPwd.oldPwd"></Input>
        </Form-item>
        <Form-item label="新密码" prop="newPwd">
          <Input type="password" placeholder="" v-model="modifyPwd.newPwd"></Input>
        </Form-item>
        <Form-item label="确认密码" prop="confirmPwd">
          <Input type="password" placeholder="" v-model="modifyPwd.confirmPwd"></Input>
        </Form-item>
        <Form-item label="">
          <Button type="primary" class="custom-secondary-btn" @click="cancel">取消</Button>
          <Button type="primary" class="custom-btn" @click="save('modifyPwd')" style="float: right;">保存</Button>
        </Form-item>
      </Form>
    </div>
  </div>
  <Modal
    v-model="confirmModal.show"
    :closable="false"
    @on-ok="ok"
    width="500">
    <p class="modal-style">{{confirmModal.title}}</p>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    const vOldPwd = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    const vNewPwd = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入新密码'))
      } else if (value === this.modifyPwd.oldPwd) {
        return callback(new Error('新密码设置不得与原密码重复'))
      } else {
        callback()
      }
    }
    const vConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入新密码'))
      } else if (value !== this.modifyPwd.newPwd) {
        return callback(new Error('请确保两次密码输入一致'))
      } else {
        callback()
      }
    }
    return {
      modifyPwd: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: ''
      },
      modiRule: {
        oldPwd: [
          { validator: vOldPwd, trigger: 'blur' }
        ],
        newPwd: [
          { validator: vNewPwd, trigger: 'blur' }
        ],
        confirmPwd: [
          { validator: vConfirmPwd, trigger: 'blur' }
        ]
      },
      confirmModal: {
        show: false,
        title: '密码已修改成功，请重新登录。'
      }
    }
  },
  methods: {
    save(name) {
      // if (this.newPwd !== this.confirmPwd) {
      //   this.$Message.error('两次密码不相同')
      //   return
      // }

      // if (this.newPwd === null || this.confirmPwd === null) {
      //   this.$Message.error('密码不能为空')
      //   return
      // }
      this.$refs[name].validate(valid => {
        console.log(valid)
        if (valid) {
          this.$axios.post('/chg-passwd', { password: this.modifyPwd.oldPwd, newPassword: this.modifyPwd.newPwd }).then(response => {
            if (response === null) return
            this.confirmModal.show = true
          })
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    ok() {
      this.$router.push({ name: 'login' })
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
