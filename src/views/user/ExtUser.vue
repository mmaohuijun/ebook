<style lang="less">
.custom__circle-btn--upload{
  width: 33px;
  height: 33px;
  border-color: #4e546c;
}

.custom__uploadmodal {
  &_text {
    width: 320px;
    height: 22px;
    margin-bottom: 24px;
    font-family: PingFangSC;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    color: #4e546c;
  }
  &_btn {
    display: block;
    float: left;
    width: 120px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
    background-color: #4e546c;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }

  .ivu-btn {
    height: 32px;
    line-height: 20px;
    font-size: 16px;
    &>.ivu-icon+span {
      color: #111;
    }
  }

  .ivu-btn:hover {
    &>.ivu-icon+span {
      color: #57a3f3;
    }
  }

  .ivu-upload {
    float: left;
    height: 32px;
    margin-right: 10px;
  }

  &_preview {
    width: 400px;
    margin-left: 70px;
    overflow: hidden;
    
    &_table {
      height: 300px;
      padding: 10px 15px;
      border: solid 1px #979797;
      overflow-y: scroll;
    }

    &_error {
      font-size: 18px;
      color: #ff5454;
    }

    table {
      width: 100%;
      text-align: center;
      border-collapse: collapse;

      th {
        font-size: 16px;
        font-weight: 500;
        color: #6f7387;
      }

      tr {
        height: 30px;
        line-height: 30px;
        border-bottom: solid 1px #d7d7d7
      }

      td {
        font-size: 14px;
        color: #898989;
      }
      td.error_text {
        color: #ea1c1c;
      }
    }
  }
}
</style>
<template>
<div class="layout__content">

  <ebook-header
    header-title="用户 - 外部用户"
    :dateSearch="true"
    :textSearch="true"
    placeholder="姓名／手机号"
    :uploadBtn="true"
    :addBtn="true"
    :lockBtn="true"
    :keyBtn="true"
    @onDateSearch="dateSearch"
    @onTextSearch="textSearch"
    @onUpload="showUploadModal"
    @onAdd="showAddUserModal"
    @onKey="unlockUser(selectedId)"
    @onLock="lockUser(selectedId)">
  </ebook-header>

  <div class="layout__body">
    <Table ref="userListTable" class="custom__table" :columns="userListTitle" :data="userListData" @on-selection-change="onSelect"></Table>
    <Spin size="large" fix v-if="false"></Spin>
    <Page style="margin-top: 14px;" class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>
  </div>
  <Modal
    on-cancel="resetFields('userInfo')"
    v-model="userModal.show"
    :closable="false"
    width="560">
    <p slot="header">
      {{userModal.title}}
    </p>
    <Form ref="userInfo" :model="userInfo" :rules="ruleValidate" :label-width="120" class="modal-form">
      <Form-item label="姓名：" prop="name">
        <Input v-model="userInfo.name" placeholder="请您输入..." :maxlength="64"></Input>
      </Form-item>
      <Form-item label="电话号码：" prop="mobile">
        <Input v-model="userInfo.mobile" placeholder="请您输入..." :maxlength="11"></Input>
      </Form-item>
      <!-- <Form-item label="密码：" prop="password">
        <Input v-model="userInfo.password" type="password" disabled></Input>
        <Input v-model="userInfo.password" placeholder="123456（或随机生成）"></Input>
      </Form-item> -->
      <!-- <Form-item label="E-mail：" prop="email">
        <Input v-model="userInfo.email" placeholder="请您输入" :maxlength="64"></Input>
      </Form-item> -->
      <Form-item label="权限：" prop="roleGroupId">
        <Select placeholder="请选择权限" v-model="userInfo.roleGroupId">
          <Option v-for="(item, index) in authList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
      </Form-item>
      <!-- <Form-item label="工号：" prop="no">
        <Input v-model="userInfo.no" placeholder="请您输入" :maxlength="10"></Input>
      </Form-item> -->
      <Form-item label="案场：" prop="caseId">
        <Select v-model="userInfo.caseId" placeholder="请您选择..." @on-change="onChangeCaseId">
          <Option v-for="items in caseList" :value="items.id" :key="items.id" :label="items.name">{{items.name}}</Option>
        </Select>
      </Form-item>
      <Form-item label="管理员：" prop="adminFlag">
        <i-switch v-model="userInfo.adminFlag"></i-switch>
      </Form-item>
      <Form-item label="禁用：" prop="loginFlag">
        <i-switch v-model="userInfo.loginFlag"></i-switch>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="userModal.show = false">取消</Button>
      <Button type="primary" size="large" :loading="userModal.saveLoading" @click="saveUser('userInfo')">完成</Button>
    </div>
  </Modal>

  <Modal
    class="custom__uploadmodal"
    on-cancel="resetFields('uploadInfo')"
    v-model="upload.modalShow"
    :closable="false"
    width="560">
    <p slot="header">批量导入外部用户</p>
    <Form class="modal-form" ref="uploadInfo" :model="upload" :rules="ruleValidate">
      <p class="custom__uploadmodal_text">您可以先下载模板，填写完成后，上传文件。</p>
      <Form-item>
        <span class="custom__uploadmodal_btn" @click.stop.prevent="downloadDemo">下载模板</span>
      </Form-item>
      <Form-item prop="caseId" style="width: 320px">
        <Select v-model="upload.caseId" placeholder="请先选择案场" @on-change="onChangeCaseId">
          <Option v-for="items in upload.caseList" :value="items.id" :key="items.id" :label="items.name">{{items.name}}</Option>
        </Select>
      </Form-item>
      <Form-item>
        <div style="overflow: hidden;">
          <Upload 
            :before-upload="handleUpload"
            :action="uploadAction">
            <Button type="ghost" icon="ios-cloud-upload-outline">选择要上传的文件</Button>
          </Upload>
          <span type="text" class="custom__uploadmodal_btn" v-if="upload.file !== null" @click="goUpload" :loading="upload.saveLoading">{{ upload.saveLoading ? '上传中' : '点击上传' }}</span>
        </div>
        
        <p v-if="upload.file !== null">待上传文件：{{ upload.file.name }}
        </p>
      </Form-item>
    </Form>
    
    <div class="custom__uploadmodal_preview" v-if="upload.previewList.length !== 0">
      <p class="custom__uploadmodal_preview_error" v-if="upload.previewHasError">以下文件出现错误，请修改后重新上传。</p>
      <div class="custom__uploadmodal_preview_table">
        <table>
          <tr>
            <th>姓名</th>
            <th>电话</th>
          </tr>
          <tr v-for="(item, index) in upload.previewList" :key="index">
            <td :class="item.nameHasError ? 'error_text' : ''">{{item.name}}</td>
            <td :class="item.mobileHasError ? 'error_text' : ''">{{item.mobile}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click="upload.modalShow = false">取消</Button>
      <Button type="primary" size="large" :loading="upload.saveLoading" @click="saveUser()">完成</Button>
    </div>
  </Modal>

  <Modal
    v-model="confirmModal.show"
    :closable="false"
    @on-ok="saveEdit"
    width="500">
    <p class="modal-style">{{confirmModal.title}}</p>
  </Modal>
</div>
</template>
<script>
import EbookHeader from 'components/EbookHeader'

export default {
  data() {
    const MobileVaild = (rule, value, callback) => {
      if (!/^1(?:3|5|7|8)\d{9}$/.test(value)) {
        callback(new Error('电话号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      confirmModal: {
        show: false,
        title: ''
      },
      userModal: {
        show: false,        // 是否显示编辑和查看userModal
        saveLoading: false, // 是否正在保存用户中
        title: ''           // userModal的标题
      },
      upload: {
        modalShow: false,        // 是否显示编辑和查看modal
        saveLoading: false, // 是否正在保存用户中
        title: '',           // modal的标题
        caseId: '',
        caseList: [],
        file: null,
        name: '',
        previewList: [],
        previewHasError: false
      },
      startDate: '',    // 开始时间
      endDate: '',      // 结束时间
      name: '',         // 搜索关键字
      isSearch: false,  // 是否开始条件筛选
      isLocked: false,  // 是否点击了禁用
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
        roleGroupId: '',    // 权限
        adminFlag: false,  // 是否案场管理员
        loginFlag: false   // 是否禁用, 返回的data里 true表示可以登录, false表示禁止登录
      },
      authList: {},   // 权限列表
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '电话号码不能为空', trigger: 'blur' },
          { validator: MobileVaild, trigger: 'blur' }
        ],
        // email: [
        //   { validator: EmailVaild, trigger: 'blur' }
        // ],
        password: [
          // { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        roleGroupId: [
          { required: true, message: '请选择权限', trigger: 'blur' }
        ],
        // no: [
        //   { required: true, message: '工号不能为空', trigger: 'blur' }
        // ],
        caseId: [
          { required: true, message: '案场不能为空', trigger: 'change' }
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
          title: '案场',
          key: 'caseName',
          ellipsis: true
        },
        {
          title: '工号',
          key: 'no',
          ellipsis: true
        },
        {
          title: '权限',
          key: 'roleGroupName',
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
          title: '状态',
          key: 'loginFlagDesc',
          ellipsis: true
        },
        {
          title: ' ',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            const that = this
            let button = null
            if (params.row.loginFlag) {
              button = h('Button', {
                props: {
                  type: 'text',
                  icon: 'locked',
                  size: 'small'
                },
                style: {
                  color: '#999',
                  fontSize: '22px'
                },
                on: {
                  click() {
                    that.lockUser(params.row.id)
                  }
                }
              })
            } else {
              button = h('Button', {
                props: {
                  type: 'text',
                  icon: 'key',
                  size: 'small'
                },
                style: {
                  color: '#999',
                  fontSize: '22px'
                },
                on: {
                  click() {
                    that.unlockUser(params.row.id)
                  }
                }
              })
            }
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
              button
            ])
          }
        }
      ],
      userListData: [] // 用户列表
    }
  },
  computed: {
    uploadAction() {
      return `${process.env.BASE_URL}ext-user/batch-import`
    }
  },
  methods: {
    handleUpload(file) {
      console.log('handleUpload', file)
      this.upload.file = file
      return false
    },
    // 下载模板
    downloadDemo() {
      console.log('downloadDemo')
      this.$axios.post('ext-user/download-demo').then(response => {
        if (response === null) return
        this.$store.dispatch('showSuccessMsg', response.retMsg)
      })
    },
    goUpload() {
      const formData = new FormData()
      formData.append('file', this.upload.file)
      formData.append('caseId', '1')
      console.log('goUpload', formData)
      this.$axios.post('ext-user/batch-import', formData).then(response => {
        if (response === null) return
        console.log('上传文件!', response)
        this.upload.previewList = response.data
        _.each(response.data, item => {
          if (item.mobileHasError || item.nameHasError) {
            this.upload.previewHasError = true
            return
          }
        })
        // this.$store.dispatch('showSuccessMsg', response.retMsg)
      })
    },
    showUploadModal() {
      this.upload.modalShow = true
      this.$axios.post('case/shortlist').then(response => {
        if (response === null) return
        console.log('案场列表（供外部用户、内部用户操作客户模块数据时的案场选择）', response)
        this.upload.caseList = response.data
      })
    },
    showConfirmModal(title) {
      console.log('showConfirmModal')
      this.confirmModal.title = title
      this.confirmModal.show = true
    },
    saveEdit() {
      if (this.isLocked) {
        console.log('点击确定Modal 禁用该用户', this.selectedId)
        this.$axios.post('ext-user/lock', { id: this.selectedId }).then(response => {
          if (response === null) return
          this.$store.dispatch('showSuccessMsg', response.retMsg)
          console.log('禁用该用户', response)
          this.initUserList()
        })
      } else {
        console.log('点击确定Modal 解锁该用户', this.selectedId)
        this.$axios.post('ext-user/unlock', { id: this.selectedId }).then(response => {
          if (response === null) return
          this.$store.dispatch('showSuccessMsg', response.retMsg)
          console.log('解锁该用户', response)
          this.initUserList()
        })
      }
    },
    // 编辑用户改变案场
    onChangeCaseId(id) {
      this.userInfo.caseId = id
    },
    lockUser(id) {
      console.log('锁定用户', id)
      this.selectedId = id
      this.isLocked = true
      this.showConfirmModal('是否确定禁用该用户?')
    },
    unlockUser(id) {
      console.log('解锁用户', this.selectedId)
      this.selectedId = id
      this.isLocked = false
      this.showConfirmModal('是否确定解锁该用户?')
    },
    // 案场列表
    getCaseList() {
      this.$axios.get('case/list', { params: { pageNo: 1, pageSize: 1000 } }).then(response => {
        if (response === null) return
        this.caseList = response.data.list
      })
    },
    // 获取权限列表
    getAuthList() {
      this.$axios.post('role/shortlist').then(response => {
        const responseData = response.data
        this.authList = responseData
      })
    },
    // 新增用户
    showAddUserModal() {
      for (const item in this.userInfo) {
        this.userInfo[item] = ''
      }
      this.userInfo.password = '123456'
      this.userInfo.adminFlag = false
      this.userInfo.loginFlag = false
      this.getCaseList()
      this.userInfo.id = 0
      this.userModal.title = '新建用户'
      this.userModal.show = true
    },
    // 修改用户
    editModal(userId) {
      this.$axios.get('/ext-user/detail', { params: { id: userId } }).then(response => {
        if (response === null) return
        console.log('editModal', response)
        for (const items in response.data) {
          // 将数字类型强制转换为字符串类型
          if (_.isNumber(response.data[items])) {
            this.userInfo[items] = String(response.data[items])
          } else {
            this.userInfo[items] = response.data[items]
          }
        }
        if (this.userInfo.caseId !== 0 && this.userInfo.caseId !== '0') {
          this.userInfo.caseId = String(this.userInfo.caseId)
        }
        this.userInfo.loginFlag = !response.data.loginFlag
        this.userInfo.password = '123456'
      })
      this.getCaseList()
      this.userModal.title = '修改用户'
      this.userModal.show = true
    },
    // 点击用户完成按钮
    saveUser(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.userModal.saveLoading = true
          if (this.userInfo.id === 0) {
            this.saveUserInfo('新建用户成功')
            this.pageNo = 1
          } else {
            this.saveUserInfo('修改用户成功')
          }
        } else {
          this.userModal.saveLoading = false
        }
      })
    },
    saveUserInfo(successText) {
      const data = {
        id: this.userInfo.id,
        name: this.userInfo.name,
        mobile: this.userInfo.mobile,
        password: this.userInfo.password,
        // email: this.userInfo.email,
        // no: this.userInfo.no,
        adminFlag: this.userInfo.adminFlag,
        caseId: this.userInfo.caseId,
        roleGroupId: this.userInfo.roleGroupId,
        loginFlag: !this.userInfo.loginFlag
      }
      this.$axios.get('/ext-user/save', { params: data }).then(response => {
        if (response === null) return
        this.$Message.success(successText)
        this.name = ''
        this.initUserList()
      })
      this.userModal.show = false
      this.userModal.saveLoading = false
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
    dateSearch(starDate, endDate) {
      this.startDate = starDate
      this.endDate = endDate
      this.name = ''
      this.isSearch = true
      this.pageNo = 1
      this.initUserList()
    },
    // 文本搜索
    textSearch(searchText) {
      this.name = searchText
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
      this.$axios.get('ext-user/list', { params: data }).then(response => {
        if (response === null) return
        console.log('用户列表', response.data)
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
    'userModal.show'(val, oldVal) {
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