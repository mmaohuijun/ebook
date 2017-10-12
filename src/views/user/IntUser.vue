<style lang="less">
  .modal-form {
    margin: 30px 70px;
  }
</style>
<template>
<div class="layout__content">
   <!-- <div class="layout__header">
    <h2 class="layout__header-title">用户 - 内部用户</h2>
    <div class="layout__header-tool">
      <span style="font-size:16px; color:#fff; padding: 0 10px;">时间</span>
      <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="startDateOk" @on-change="startDate=$event" v-model="startDate" placeholder="开始日期" :clearable="false" style="width: 95px"></Date-picker>
      <span style="font-size:16px; color:#fff; padding: 0 10px;">-</span>
      <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="endDateOk" @on-change="endDate=$event" v-model="endDate" placeholder="结束日期" :clearable="false" style="width: 95px; margin-right: 30px;"></Date-picker>
      <Input class="custom__search" icon="search" placeholder="姓名／手机号" v-model="name" @on-click="textSearch"></Input>

      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-if="isTrash" @click="removeUser(selectedId)"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addModal"></Button>
    </div>
  </div>  -->

  <ebook-header
    header-title="用户 - 内部用户"
    :dateSearch="true"
    :textSearch="true"
    placeholder="姓名／手机号"
    :addBtn="true"
    :deleteBtn="true"
    @onDateSearch="dateSearch"
    @onTextSearch="textSearch"
    @onAdd="addModal"
    @onDelete="removeUser(selectedId)"></ebook-header>


  <div class="layout__body">
    <Table ref="userListTable" class="custom__table" :columns="userListTitle" :data="userListData" @on-selection-change="onSelect"></Table>
    <Spin size="large" fix v-if="false"></Spin>
    <Page style="margin-top: 14px;" class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>
  </div>
  <Modal
    on-cancel="resetFields('userInfo')"
    v-model="modal.show"
    :closable="false"
    width="560">
    <p slot="header">
      {{modal.title}}
    </p>
    <Form ref="userInfo" :model="userInfo" :rules="ruleValidate" :label-width="120" class="modal-form">
      <Form-item label="姓名：" prop="name">
        <Input v-model="userInfo.name" placeholder="请您输入..." :maxlength="8"></Input>
      </Form-item>
      <Form-item label="电话号码：" prop="mobile">
        <Input v-model="userInfo.mobile" placeholder="请您输入..." :maxlength="11"></Input>
      </Form-item>
      <Form-item label="密码：" prop="password">
        <Input v-model="userInfo.password" type="password" disabled :maxlength="12"></Input>
        <!-- <Input v-model="userInfo.password" placeholder="123456（或随机生成）"></Input> -->
      </Form-item>
      <Form-item label="E-mail：" prop="email">
        <Input v-model="userInfo.email" placeholder="请您输入" :maxlength="64"></Input>
      </Form-item>
      <Form-item label="权限：" prop="roleGroupId">
        <Select placeholder="请选择权限" v-model="userInfo.roleGroupId">
          <Option v-for="(item, index) in authList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
      </Form-item>
      <Form-item label="工号：" prop="no">
        <Input v-model="userInfo.no" placeholder="请您输入" :maxlength="5"></Input>
      </Form-item>
      <Form-item label="禁用：" prop="loginFlag">
        <i-switch v-model="userInfo.loginFlag"></i-switch>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show = false">取消</Button>
      <Button type="primary" size="large" :loading="modal.saveLoading" @click="saveUser('userInfo')">完成</Button>
    </div>
  </Modal>

  <Modal
    v-model="confirmModal.show"
    :closable="false"
    @on-ok="sendDeleteRequest"
    width="500">
    <p class="modal-style">{{confirmModal.title}}</p>
  </Modal>
</div>
</template>
<script>
import EbookHeader from 'components/EbookHeader'

export default {
  data() {
    // const validateNumber = (rule, value, callback) => {
    //   if (!_.isFinite(parseInt(value))) {
    //     callback(new Error('请输入数字'))
    //   } else {
    //     callback()
    //   }
    // }
    const MobileVaild = (rule, value, callback) => {
      if (!/^1(?:3|5|7|8)\d{9}$/.test(value)) {
        callback(new Error('电话号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      modal: {
        show: false,        // 是否显示编辑和查看modal
        saveLoading: false, // 是否正在保存用户中
        title: ''           // modal的标题
      },
      confirmModal: {
        show: false,
        title: '是否确定删除该用户?'
      },
      startDate: '',    // 开始时间
      endDate: '',      // 结束时间
      name: '',         // 搜索关键字
      isSearch: false,  // 是否开始条件筛选
      afterSearch: false,  // 点击搜索后
      selectedId: '',   // 选中的用户Id
      pageNo: 1,        // 页码
      total: 20,        // 数据总条数
      pageSize: 20,     // 每页条数
      userInfo: {
        id: '',           // id
        name: '',         // 姓名
        gender: '',       // 性别
        mobile: '',       // 电话
        email: '',        // 邮箱
        password: '123456',     // 密码
        roleGroupId: '',    // 权限
        loginFlag: false,  // 是否禁用, 返回的data里 true表示可以登录, false表示禁止登录
        no: 0            // 工号
      },
      authList: {},      // 权限列表
      ruleValidate: {
        name: [
          {
            required: true,
            message: '姓名不能为空',
            transform(value) {
              return value.trim()
            }
          }
        ],
        mobile: [
          { required: true, message: '电话号码不能为空' },
          { validator: MobileVaild, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          // { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        roleGroupId: [
          { required: true, message: '请选择权限' }
        ],
        no: [
          { required: true, message: '工号不能为空', trigger: 'blur' },
          {
            type: 'number',
            message: '请输入数字',
            trigger: 'blur',
            transform(value) {
              return parseInt(value, 10)
            }
          }
          // { validator: validateNumber, trigger: 'blur' }
        ]
      },
      userListTitle: [
        {
          type: 'selection',
          width: 70,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true
        },
        {
          title: 'E-mail',
          key: 'email',
          ellipsis: true
        },
        {
          title: '电话号码',
          key: 'mobile',
          ellipsis: true
        },
        {
          title: '生成时间',
          key: 'createTime',
          ellipsis: true
        },
        {
          title: ' ',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const that = this
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'edit',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#999',
                  fontSize: '22px'
                },
                on: {
                  click() {
                    that.editModal(params.row.id)
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'text',
                  icon: 'trash-a',
                  size: 'small'
                },
                style: {
                  color: '#999',
                  fontSize: '22px'
                },
                on: {
                  click() {
                    that.removeUser(params.row.id)
                  }
                }
              })
            ])
          }
        }
      ],
      userListData: []
    }
  },
  methods: {
    // 删除用户
    removeUser(selectedId) {
      console.log('removeUser', selectedId)
      if (!selectedId) {
        this.$store.dispatch('showErrorMsg', '请先选择用户!')
        return
      }
      // this.userListData.splice(index, 1)
      this.selectedId = selectedId
      this.confirmModal.show = true
    },
    sendDeleteRequest() {
      this.$axios.get('int-user/del', { params: { id: this.selectedId } }).then(response => {
        if (response === null) return
        this.$Message.success('删除成功')
        this.initUserList()
      })
    },
    // 新增用户modal
    addModal() {
      for (const item in this.userInfo) {
        this.userInfo[item] = ''
      }
      this.userInfo.password = '123456'
      this.userInfo.id = 0
      this.userInfo.loginFlag = false
      this.modal.title = '新建用户'
      this.modal.show = true
    },
    // 获取权限列表
    getAuthList() {
      this.$axios.post('role/shortlist').then(response => {
        const responseData = response.data
        this.authList = responseData
      })
    },
    // 修改用户modal
    editModal(userId) {
      this.$axios.get('int-user/detail', { params: { id: userId } }).then(response => {
        if (response === null) return
        console.log('修改用户', response)
        for (const items in response.data) {
          // 将数字类型强制转换为字符串类型
          if (_.isNumber(response.data[items])) {
            this.userInfo[items] = String(response.data[items])
          } else {
            this.userInfo[items] = response.data[items]
          }
        }
        this.userInfo.loginFlag = !response.data.loginFlag
        this.userInfo.password = '123456'
      })
      this.modal.title = '修改用户'
      this.modal.show = true
    },

    // 点击用户完成按钮
    saveUser(name) {
      console.log(typeof this.userInfo.no, this.userInfo.no)
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal.saveLoading = true
          if (this.userInfo.id === 0) {
            this.saveUserInfo('新建用户成功')
            this.pageNo = 1
          } else {
            this.saveUserInfo('修改用户成功')
          }
        } else {
          this.modal.saveLoading = false
        }
      })
    },
    saveUserInfo(successText) {
      const data = {
        id: this.userInfo.id,
        name: this.userInfo.name,
        mobile: this.userInfo.mobile,
        password: this.userInfo.password,
        email: this.userInfo.email,
        no: this.userInfo.no,
        roleGroupId: this.userInfo.roleGroupId,
        loginFlag: !this.userInfo.loginFlag
      }
      this.$axios.post('int-user/save', data).then(response => {
        if (response === null) return
        this.$Message.success(successText)
        this.name = ''
        this.initUserList()
      })
      this.modal.show = false
      this.modal.saveLoading = false
    },
    // 清空用户信息
    resetFields(name) {
      this.$refs[name].resetFields()
    },
    // 监听选中用户
    onSelect(selection) {
      const idList = []
      this.selectedId = ''

      for (let i = selection.length - 1; i >= 0; i--) {
        idList.push(selection[i].id)
      }

      this.selectedId = idList.join(',')
    },
    // 时间段搜索
    dateSearch(starDate, endDate) {
      // 如果没有传参数, 说明要清空搜索条件
      if (_.isUndefined(starDate)) {
        this.afterSearch = false
      } else {
        this.afterSearch = true
      }
      this.startDate = starDate || ''
      this.endDate = endDate || ''
      this.name = ''
      this.isSearch = true
      this.pageNo = 1
      this.initUserList()
    },
    // 文本搜索
    textSearch(seachText) {
      this.name = seachText
      // 判断是否有搜索词
      if (_.isEmpty(this.name.trim())) {
        if (this.afterSearch) { // 搜索后清空搜索词, 初始化列表
          this.pageNo = 1
          this.initUserList()
          this.afterSearch = false
        } else {
          this.$Message.error('请输入姓名/手机号!')
        }
        this.name = ''
        return
      }
      this.afterSearch = true
      this.startDate = ''
      this.endDate = ''
      this.isSearch = true
      this.pageNo = 1
      this.initUserList()
    },
    // 改变分页
    pageChange(currentPage) {
      this.pageNo = currentPage
      this.initUserList()
    },
    // 获取并渲染用户列表
    initUserList() {
      const data = {
        name: this.name || '',
        startDate: this.startDate || '',
        endDate: this.endDate || '',
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize
      }
      if (!this.isSearch) {
        this.name = ''
        this.startDate = ''
        this.endDate = ''
      }
      this.$axios.post('int-user/list', data).then(response => {
        if (response === null) return
        this.userListData = []
        for (const items in response.data.list) {
          this.userListData.push(response.data.list[items])
        }
        this.total = response.data.total
        this.deselectedAll()
      })
    },
    // 取消所有选中
    deselectedAll() {
      this.$refs.userListTable.selectAll(false)
    }
  },
  mounted() {
    this.initUserList()
    this.getAuthList()
  },
  watch: {
    'modal.show'(val, oldVal) {
      if (!val) {
        this.resetFields('userInfo')
      }
    }
  },
  components: {
    EbookHeader
  }
}
</script>
