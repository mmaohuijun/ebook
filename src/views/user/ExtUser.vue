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

  .ivu-modal-body {
    min-height: 500px;
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
    &_success {
      font-size: 18px;
      color: #1cea35;
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
    ref="ebookHeader"
    header-title="用户 - 外部用户"
    :dateSearch="true"
    :textSearch="true"
    :caseSearch="isCaseSearch"
    :caseList="caseList"
    placeholder="姓名／手机号"
    :uploadBtn="true"
    :addBtn="true"
    :lockBtn="lockBtn"
    :keyBtn="unlockBtn"
    @onCaseChange="selectCase"
    @onDateSearch="dateSearch"
    @onTextSearch="textSearch"
    @onUpload="showUploadModal"
    @onAdd="showAddUserModal"
    @onKey="unlockUser(selectedId)"
    @onLock="lockUser(selectedId)">
  </ebook-header>

  <div class="layout__body">
    <Table ref="userListTable" class="custom__table" :columns="userListTitle" :data="userListData" @on-sort-change="customSort" @on-selection-change="onSelect"></Table>
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
        <Select placeholder="请选择权限" v-model="userInfo.roleGroupId" @on-change="onChangeRoleGroupId">
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
    :mask-closable="false"
    :closable="false"
    width="560">
    <p slot="header">批量导入外部用户</p>
    <Form class="modal-form" ref="upload" :model="upload" :rules="ruleValidate">
      <p class="custom__uploadmodal_text">您可以先下载模板，填写完成后，上传文件。</p>
      <Form-item>
        <span class="custom__uploadmodal_btn" @click.stop.prevent="downloadDemo">下载模板</span>
      </Form-item>
      <Form-item prop="caseId" style="width: 320px" v-if="!ifCaseWorker">
        <Select v-model="upload.caseId" placeholder="请先选择案场" @on-change="onChangeCaseId">
          <Option v-for="items in caseList" :value="items.id" :key="items.id" :label="items.name">{{items.name}}</Option>
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
    
    <div class="custom__uploadmodal_preview">
      <p class="custom__uploadmodal_preview_success" v-if="upload.success">您的文件已上传完成，请点击完成按钮进行保存。</p>
      <p class="custom__uploadmodal_preview_error" v-if="upload.previewHasError">以下文件出现错误，请修改后重新上传。</p>
      <div class="custom__uploadmodal_preview_table" v-if="upload.previewList.length !== 0">
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
      <Button type="text" size="large" @click="hideModal">取消</Button>
      <Button type="primary" size="large" :loading="upload.saveLoading" @click="saveUpload">完成</Button>
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
      isCaseSearch: true,
      caseList: [],
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
        previewHasError: false,
        success: false
      },
      lockBtn: true,
      unlockBtn: true,
      startDate: '',    // 开始时间
      endDate: '',      // 结束时间
      name: '',         // 搜索关键字
      isLocked: false,  // 是否点击了禁用
      selectedId: '',   // 选中的用户Id
      pageNo: 1,        // 页码
      total: 20,        // 数据总条数
      pageSize: 20,     // 每页条数
      selection: [],    // 选中的用户列表
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
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
            transform(value) {
              return value.trim()
            }
          }
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
          { required: true, message: '请选择权限' }
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
          ellipsis: true,
          sortable: 'custom'
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
      userListData: [], // 用户列表
      dateOrder: ''
    }
  },
  computed: {
    // userAdminFlag() {
    //   return this.$store.getters.adminFlag
    // },
    // 是否为案场置业顾问
    ifCaseWorker() {
      return this.$store.getters.ifCaseWorker
    },
    uploadAction() {
      return `${process.env.BASE_URL}ext-user/batch-import`
    }
  },
  mounted() {
    this.initUserList()
    this.getAuthList()
    this.getCaseList()
    this.justifyUser()
  },
  methods: {
    // 获取并渲染用户列表
    initUserList() {
      const data = {
        dateOrder: this.dateOrder,
        caseName: this.caseName,
        name: this.name,
        startDate: this.startDate,
        endDate: this.endDate,
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize
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
      this.selection = []
      this.selectedId = ''
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
    // 点击用户'完成'按钮
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

      this.$axios.get('ext-user/save', { params: data }).then(response => {
        this.userModal.saveLoading = false
        if (response === null) return
        this.$store.dispatch('showSuccessMsg', successText)
        if (this.userModal.title === '新建用户') {
          // 清空所有搜索条件
          this.$refs.ebookHeader.clearSearchTerms()
          this.clearSearchTerms()
        }
        this.initUserList()
        _.delay(this.hideModal, 500)
      })
    },
    // 清空搜索条件
    clearSearchTerms() {
      this.name = ''
      this.startDate = ''
      this.endDate = ''
    },
    handleUpload(file) {
      this.upload.file = file
    },
    // 下载模板
    downloadDemo() {
      window.open(`${process.env.BASE_URL}ext-user/download-demo`)
    },
    // 校验上传的data
    validateUploadData() {
      let flagV = true
      if (!this.ifCaseWorker) { // 如果是内部用户则要验证是否有选择案场
        this.$refs.upload.validate(valid => {
          flagV = valid
        })
      }
      if (!flagV) return
      const formData = new FormData()
      formData.append('file', this.upload.file)
      formData.append('caseId', this.upload.caseId)
      return formData
    },
    // 点击'上传'
    goUpload() {
      const requestData = this.validateUploadData()
      if (!requestData) return

      this.upload.previewList = []
      this.upload.previewHasError = false
      this.upload.success = false
      this.$axios.post('ext-user/batch-import', requestData).then(response => {
        if (response === null) return
        console.log('上传文件!', response)
        if (response.data) {
          this.upload.previewList = response.data
          this.upload.previewHasError = true
          return
        }
        this.upload.success = true
        this.$store.dispatch('showSuccessMsg', response.retMsg)
      })
    },
    // 上传成功点击'完成'
    saveUpload() {
      console.log('saveUpload')
      if (this.upload.previewHasError) {
        this.$store.dispatch('showErrorMsg', '请先修改错误!')
        return
      }
      if (!this.upload.success) {
        this.$store.dispatch('showErrorMsg', '请先上传文件!')
        return
      }
      this.upload.saveLoading = true
      this.$axios.post('ext-user/batch-save').then(response => {
        this.upload.saveLoading = false
        if (response === null) return
        console.log('批量导入保存', response)
        this.$store.dispatch('showSuccessMsg', '上传成功!')
        _.delay(this.hideModal, 500)
        // 清空所有搜索条件
        this.$refs.ebookHeader.clearSearchTerms()
        this.clearSearchTerms()
        this.initUserList()
      })
    },
    showUploadModal() {
      this.upload.modalShow = true
      this.getCaseList()
    },
    showConfirmModal(title) {
      console.log('showConfirmModal')
      this.confirmModal.title = title
      this.confirmModal.show = true
    },
    // 点击'锁'按钮的'确认'
    saveEdit() {
      if (this.isLocked) { // 禁用该用户
        console.log('点击确定Modal 禁用该用户', this.selectedId)
        this.$axios.post('ext-user/lock', { id: this.selectedId }).then(response => {
          if (response === null) return
          this.$store.dispatch('showSuccessMsg', response.retMsg)
          console.log('禁用该用户', response)
          this.initUserList()
        })
      } else { // 解锁该用户
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
    // 编辑用户改变权限
    onChangeRoleGroupId(id) {
      this.userInfo.roleGroupId = id
    },
    lockUser(id) {
      if (!id) {
        this.$store.dispatch('showErrorMsg', '请先选择用户!')
        return
      }
      console.log('锁定用户', id)
      this.selectedId = id
      this.isLocked = true
      this.showConfirmModal('是否确定禁用该用户?')
    },
    unlockUser(id) {
      if (!id) {
        this.$store.dispatch('showErrorMsg', '请先选择用户!')
        return
      }
      console.log('解锁用户', id)
      this.selectedId = id
      this.isLocked = false
      this.showConfirmModal('是否确定解锁该用户?')
    },
    // 案场列表
    getCaseList() {
      this.$axios.post('case/shortlist').then(response => {
        if (response === null) return
        console.log('案场列表（供外部用户、内部用户操作客户模块数据时的案场选择）', response)
        this.caseList = response.data
      })
    },
    // 获取权限列表
    getAuthList() {
      this.$axios.post('role/shortlist').then(response => {
        const responseData = response.data
        this.authList = responseData
      })
    },
    hideModal() {
      this.userModal.saveLoading = false
      this.userModal.show = false
      this.resetFields('userInfo')
      this.upload.saveLoading = false
      this.upload.modalShow = false
      this.upload.file = null
      this.upload.previewList = []
      this.upload.previewHasError = false
      this.upload.success = false
      this.resetFields('upload')
    },
    // 清空用户信息
    resetFields(name) {
      this.$refs[name].resetFields()
    },
    // 监听选中用户
    onSelect(selection) {
      this.selection = selection
      const idList = []
      const selectionLength = selection.length
      let lockCount = 0
      let unlockCount = 0
      this.selectedId = ''

      _.each(this.selection, (item, index) => {
        idList.push(item.id)
        if (item.loginFlag) {
          lockCount++
        } else {
          unlockCount++
        }
      })
      // 判断选中的用户状态, 根据状态显示头部的操作按钮
      this.lockBtn = selectionLength === 0 || lockCount === selectionLength
      this.unlockBtn = selectionLength === 0 || unlockCount === selectionLength

      this.selectedId = idList.join(',')
    },
    // 时间段搜索
    dateSearch(starDate, endDate) {
      console.log('dateSearch', starDate, endDate)
      this.startDate = starDate || ''
      this.endDate = endDate || ''
      this.pageNo = 1
      this.initUserList()
    },
    // 文本搜索
    textSearch(searchText) {
      this.name = searchText
      this.pageNo = 1
      this.initUserList()
    },
    // 案场搜索
    selectCase(value) {
      console.log('selectCase', value)
      this.caseName = value
      this.pageNo = 1
      this.initUserList()
    },
    // 改变分页
    pageChange(currentPage) {
      this.pageNo = currentPage
      this.initUserList()
    },
    // 判断是否为外部用户
    justifyUser() {
      if (this.ifCaseWorker) {
        console.log('外部用户')
        this.isCaseSearch = false
      } else {
        console.log('内部用户')
        this.isCaseSearch = true
      }
    },
    customSort(val) {
      if (val.order === 'desc') {
        this.dateOrder = 'desc'
      } else {
        this.dateOrder = 'asc'
      }
      this.initUserList()
    }
  },
  components: {
    EbookHeader
  }
}
</script>