<template>
<div class="layout__content auth">
  <div class="layout__header">
    <h2 class="layout__header-title">权限</h2>
    <div class="layout__header-tool">
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click.stop="addAuth"></Button>
    </div>
  </div>
  <div class="layout__body" @click="onClickTable">
    <table class="authority" cellspacing="0" cellpadding="0" border="0" v-if="authData.length !== 0">
      <tr :class="auth.id === currentAuthId ? 'authority-row-current' : ''" v-for="(auth, index) in authData" :key="index" @click.stop="toggleAuthCfm(auth)"> 
        <td class="authority-row-title">{{auth.name}}</td>
        <ebook-authority-item
          v-for="(item, indexNum) in auth.menus"
          :key="indexNum"
          :auth-data="item"
          :display="auth.id === currentAuthId"
          @authChange="authChange"></ebook-authority-item>
      </tr>
    </table>
  </div>
  <Modal
    v-model="confirmAuthChangeModal"
    :closable="false"
    :mask-closable="false"
    :styles="{top: '200px'}"
    @on-ok="confirmSaveAuth">
    <p class="auth-alert-text">是否保存已更改的操作</p>
  </Modal>

  <Modal
    on-cancel="resetFields('authForm')"
    v-model="addAuthModal.show"
    :styles="{top: '200px'}"
    :closable="false"
    :mask-closable="false"
    width="560">
    <p slot="header">新建权限</p>
    <Form ref="authForm" :model="authForm" :rules="authRule" :label-width="120" style="width: 380px; padding-top: 20px; margin: 0 auto;">
      <Form-item prop="name" label="权限名称：">
        <Input v-model="authForm.name" placeholder="文本不能超过8个字符" :maxlength="16"></Input>
        <p class="auth-modal-text">详细内容请在权限界面点击编辑按钮进行编辑</p>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click.stop="hideModal">取消</Button>
      <Button type="primary" size="large" @click="confirmAddAuth('authForm')" :loading="addAuthModal.saveLoading">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
import EbookAuthorityItem from 'components/EbookAuthorityItem'

export default {
  name: 'Authority',
  components: {
    EbookAuthorityItem
  },
  data() {
    return {
      ifNew: false, // 是否为新建
      authMenus: [], // 所选权限菜单的已选择项
      authMenusBackup: [], // 备份
      currentAuth: {}, // 现在展示的权限
      backupAuth: {}, // 将要展示的权限
      confirmAuthChangeModal: false,
      addAuthModal: {
        show: false,
        saveLoading: false
      },
      authForm: {
        name: '' // 权限名，新建时必须
      },
      authRule: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      },
      authData: []
    }
  },
  computed: {
    authHasChange() { // 权限是否有变更
      return this.$store.state.app.authHasChange
    },
    showAuthAlert() {
      return this.$store.state.app.showAuthAlert
    },
    currentAuthId() {
      return this.currentAuth.id
    },
    currentAuthName() {
      return this.currentAuth.name
    },
    currentAuthMenus() {
      if (_.isEmpty(this.currentAuth)) return
      const menus = []
      _.each(this.currentAuth.menus, authItem => {
        if (authItem.hasSubMenus) {
          _.each(authItem.subMenus, subAuthItem => {
            if (subAuthItem.checked === 1) {
              menus.push(subAuthItem.id)
            }
          })
        } else {
          if (authItem.checked === 1) {
            menus.push(authItem.id)
          }
        }
      })
      return menus
    }
  },
  watch: {
    showAuthAlert(flag) {
      if (flag) {
        this.confirmAuthChangeModal = true
      }
    }
  },
  mounted() {
    console.log('authHasChange', this.$store.state.app.authHasChange)
    this.initAuthList().then(() => {
      // 初始化后默认展开第一个权限
      this.toggleAuth(this.authData[0])
    })
  },
  methods: {
    onClickTable() {
      if (this.authHasChange) {
        // 弹出提示框是否保存
        this.confirmAuthChangeModal = true
      }
    },
    initAuthList() {
      return new Promise(resolve => {
        this.$axios.post('role/list').then(response => {
          if (response === null) return
          console.log('权限列表', response)
          const reData = response.data
          this.authData = reData
          resolve()
        })
      })
    },
    addAuth() {
      this.ifNew = true
      this.addAuthModal.show = true
    },
    // 响应子组件改变的事件
    authChange(flag, changeId) {
      console.log('authChange', flag, changeId)
      // 标记为有更改
      this.$store.dispatch('authHasChange', true)

      if (flag) { // 增加
        this.authMenus = _.uniq(_.concat(this.authMenus, changeId))
      } else {
        this.authMenus = _.pull(this.authMenus, ...changeId)
      }
    },
    toggleAuthCfm(auth) {
      if (this.currentAuthId === auth.id) return

      // 备份点击的权限, 判断之前的权限是否有编辑
      this.backupAuth = _.cloneDeep(auth)

      if (this.authHasChange) {
        // 弹出提示框是否保存
        this.confirmAuthChangeModal = true
      } else {
        this.toggleAuth(this.backupAuth)
      }
    },
    // 更新权限checked菜单
    updateAuthMenus() {
      this.authMenus = _.cloneDeep(this.currentAuthMenus)
    },
    // 切换权限
    toggleAuth(auth) {
      this.currentAuth = _.cloneDeep(auth)
      this.updateAuthMenus()
    },
    getAuthSaveData() {
      const data = {
        id: this.ifNew ? '' : this.currentAuthId,
        name: this.ifNew ? this.authForm.name : this.currentAuthName
      }
      if (this.ifNew) {
        // 验证标识
        let flagV = false

        this.$refs.authForm.validate(flag => {
          flagV = flag
        })
        return flagV ? data : false
      } else {
        _.each(this.authMenus, (authItem, index) => {
          data[`menus[${index}].id`] = authItem
        })
        return data
      }
    },
    // 权限保存/新建
    sendSaveRequest() {
      return new Promise(resolve => {
        const requestData = this.getAuthSaveData()
        if (!requestData) return
        this.addAuthModal.saveLoading = true
        this.$axios.post('role/save', requestData).then(response => {
          this.addAuthModal.saveLoading = false
          if (response === null) return
          this.$Message.success('保存成功')
          console.log('权限保存/新建', response)
          this.initAuthList()
          this.hideModal()
          this.$store.dispatch('authHasChange', false)
          resolve()
        })
      })
    },
    // toggle权限时确认
    confirmSaveAuth() {
      console.log('confirmSaveAuth')
      this.sendSaveRequest().then(() => {
        if (!_.isEmpty(this.backupAuth)) {
          this.toggleAuth(this.backupAuth)
        }
      })
    },
    // 新建权限时确认
    confirmAddAuth() {
      console.log('confirmAddAuth')
      this.sendSaveRequest().then(() => {
        this.toggleAuth(this.authData[0])
      })
    },
    hideModal() {
      console.log('hideModal', _.isEmpty(this.backupAuth))
      if (!_.isEmpty(this.backupAuth)) {
        this.toggleAuth(this.backupAuth)
      }
      this.addAuthModal.show = false
      this.authForm.name = ''
      this.ifNew = false
      // 清空规则
      this.$refs.authForm.resetFields()
    }
  }
}
</script>
<style lang="less">
  .authority {
    width: 100%;
    background: #fff;

    tr:nth-child(even) {
      background: #f8f8f8;
    }

    td {
      min-height: 70px;
      vertical-align: top;
      padding: 10px;
    }
  }

  .authority-check-all,
  .authority-check-item {
    display: block;
    padding: 10px 0;
    &.ivu-checkbox-wrapper,
    .ivu-checkbox-wrapper {
      font-size: 18px;
    }
  }

  .authority-check-items {
    display: none;
    padding-left: 24px;
  }

  .authority-row-current {
    background:#fff !important;
    box-shadow:0 3px 3px 0 #94d2ff;
    border-radius: 0 0 5px 5px;
    > td {
      border-top: 1px solid #94d2ff;
      border-bottom: 1px solid #94d2ff;
    }
    > td:first-child {
      border-left: 1px solid #94d2ff;
      border-radius: 0 0 0 5px;
    }
    > td:last-child {
      border-right: 1px solid #94d2ff;
      border-radius: 0 0 5px 0;
    }

    .authority-check-items {
      display: block;
    }
  }

  .authority-row-title {
    font-size: 20px;
    padding: 18px 18px 18px 38px !important;
  }

  .ivu-modal-body {
    .auth-alert-text {
      margin-top: 30px;
      text-align: center;
      font-size: 24px;
      color: #4e546c;
    }
  }
  .auth-modal-text {
    font-size: 14px;
    color: #888;
  }

</style>
