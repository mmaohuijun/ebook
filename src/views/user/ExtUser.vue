<style lang="less">
</style>
<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">用户 - 外部用户</h2>
    <div class="layout__header-tool">
      <span style="font-size:16px; color:#fff; padding: 0 10px;">时间</span>
      <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="startDateOk" @on-change="startDate=$event" v-model="startDate" placeholder="开始日期" :clearable="false" style="width: 95px"></Date-picker>
      <span style="font-size:16px; color:#fff; padding: 0 10px;">-</span>
      <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="endDateOk" @on-change="endDate=$event" v-model="endDate" placeholder="结束日期" :clearable="false" style="width: 95px; margin-right: 30px;"></Date-picker>
      <Input class="custom__search" icon="search" placeholder="姓名／手机号" v-model="name" @on-click="textSearch"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-if="isTrash" @click="removeUser(selectedId)"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addModal"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="userListTitle" :data="userListData" @on-selection-change="onSelect"></Table>
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
        <Input v-model="userInfo.name" placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="电话号码：" prop="mobile">
        <Input v-model="userInfo.mobile" placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="密码：" prop="password">
        <Input v-model="userInfo.password" type="password" disabled></Input>
        <!-- <Input v-model="userInfo.password" placeholder="123456（或随机生成）"></Input> -->
      </Form-item>
      <Form-item label="E-mail：" prop="email">
        <Input v-model="userInfo.email" placeholder="请您输入"></Input>
      </Form-item>
      <Form-item label="工号：" prop="no">
        <Input v-model="userInfo.no" placeholder="请您输入"></Input>
      </Form-item>
      <Form-item label="案场：" prop="caseId">
        <Select v-model="userInfo.caseId" placeholder="请您选择..." @on-change="onChangeCaseId">
          <Option v-for="items in caseList" :value="items.id" :key="items.id" :label="items.name">{{items.name}}</Option>
        </Select>
      </Form-item>
      <Form-item label="管理员：">
        <i-switch v-model="userInfo.adminFlag">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </Form-item>
      <!-- <Form-item label="权限：" prop="power">
        <Select v-model="userInfo.power" placeholder="请您选择...">
          <Option value="beijing">全选1</Option>
          <Option value="shanghai">全选2</Option>
          <Option value="shenzhen">全选3</Option>
        </Select>
      </Form-item> -->
      <!-- <Form-item label="禁用：">
        <i-switch>
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </Form-item> -->
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show = false">取消</Button>
      <Button type="primary" size="large" :loading="modal.saveLoading" @click="saveUser('userInfo')">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    return {
      modal: {
        show: false,        // 是否显示编辑和查看modal
        saveLoading: false, // 是否正在保存用户中
        title: ''           // modal的标题
      },
      startDate: '',    // 开始时间
      endDate: '',      // 结束时间
      name: '',         // 搜索关键字
      isSearch: false,  // 是否开始条件筛选
      isTrash: false,   // 是否显示删除按钮
      selectedId: '',   // 选中的用户Id
      pageNo: 1,        // 页码
      total: 20,        // 数据总条数
      pageSize: 20,     // 每页条数
      caseList: [],     // 案场列表
      userInfo: {
        id: '',           // id
        name: '',         // 姓名
        gender: '',       // 性别
        mobile: '',       // 电话
        email: '',        // 邮箱
        password: '123456',     // 密码
        no: '',           // 工号
        caseId: '',       // 案场ID
        caseName: '',     // 案场名称
        // power: '1',    // 权限
        adminFlag: false  // 是否案场管理员
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        no: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        // power: [
        //   { required: true, message: '权限不能为空', trigger: 'change' }
        // ],
        caseId: [
          { required: true, message: '案场不能为空', trigger: 'change' }
        ]
      },
      userListTitle: [
        {
          type: 'selection',
          width: 60,
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
      userListData: [
        // {
        //   id: 1,
        //   name: '张磊1',
        //   mobile: '15811110000',
        //   email: '213sdga@163.com',
        //   no: 'XXXXX', // 工号
        //   createTime: '2017-06-06'
        // }
      ]
    }
  },
  methods: {
    // 编辑用户改变案场
    onChangeCaseId(id) {
      this.userInfo.caseId = id
    },
    // 删除用户
    removeUser(selectedId) {
      // this.userListData.splice(index, 1)
      const that = this
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除用户？',
        onOk: () => {
          that.$axios.get('/ext-user/del', { params: { id: selectedId } }).then(response => {
            if (response === null) return
            that.$Message.success('删除成功')
            this.userList()
            this.isTrash = false
          })
        }
      })
    },
    // 案场列表
    getCaseList() {
      this.$axios.get('/case/list', { params: { pageNo: 1, pageSize: 1000 } }).then(response => {
        if (response === null) return
        this.caseList = response.data.list
      })
    },
    // 新增用户
    addModal() {
      for (const item in this.userInfo) {
        this.userInfo[item] = ''
      }
      this.userInfo.adminFlag = false
      this.getCaseList()
      this.userInfo.id = 0
      this.modal.title = '新建用户'
      this.modal.show = true
    },
    // 修改用户
    editModal(userId) {
      this.$axios.get('/ext-user/detail', { params: { id: userId } }).then(response => {
        if (response === null) return
        for (const items in response.data) {
          this.userInfo[items] = response.data[items]
        }
        if (this.userInfo.caseId !== 0 && this.userInfo.caseId !== '0') {
          this.userInfo.caseId = String(this.userInfo.caseId)
        }
      })
      this.getCaseList()
      this.modal.title = '修改用户'
      this.modal.show = true
    },

    // 点击用户完成按钮
    saveUser(name) {
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
        adminFlag: this.userInfo.adminFlag,
        caseId: this.userInfo.caseId
      }
      this.$axios.get('/ext-user/save', { params: data }).then(response => {
        if (response === null) return
        this.$Message.success(successText)
        this.userList()
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
      this.isTrash = selection.length > 0
      this.selectedId = ''

      for (let i = selection.length - 1; i >= 0; i--) {
        idList.push(selection[i].id)
      }

      this.selectedId = idList.join(',')
    },
    // 点击确认开始时间按钮
    startDateOk(data) {
      if (this.endDate) {
        this.dateSearch()
      }
    },
    // 点击确认结束时间按钮
    endDateOk(data) {
      if (this.startDate) {
        this.dateSearch()
      }
    },
    // 时间段搜索
    dateSearch() {
      this.name = ''
      this.isSearch = true
      this.pageNo = 1
      this.userList()
    },
    // 文本搜索
    textSearch() {
      this.startDate = ''
      this.endDate = ''
      this.isSearch = true
      this.pageNo = 1
      this.userList()
    },
    // 改变分页
    pageChange(currentPage) {
      this.pageNo = currentPage
      this.userList()
    },
    // 获取并渲染用户列表
    userList() {
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
      this.$axios.get('/ext-user/list', { params: data }).then(response => {
        if (response === null) return
        this.userListData = []
        for (const items in response.data.list) {
          this.userListData.push(response.data.list[items])
        }
        this.total = response.data.total
      })
    }
  },
  mounted() {
    this.userList()
  },
  watch: {
    'modal.show'(val, oldVal) {
      if (!val) {
        this.resetFields('userInfo')
      }
    }
  }
}
</script>
