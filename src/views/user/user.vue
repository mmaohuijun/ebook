<style lang="less">
  .modal-form {
    margin: 30px 70px;
  }
</style>
<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">用户 - 外部用户</h2>
    <div class="layout__header-tool">
      <span style="font-size:16px; color:#fff; padding: 0 10px;">时间</span>
      <Date-picker confirm :editable="false" class="custom__input--white" type="date" :options="maxData" format="yyyy-MM-dd" @on-ok="startDateOk" @on-change="startDateChange" placeholder="开始日期" style="width: 120px"></Date-picker>
      <span style="font-size:16px; color:#fff; padding: 0 10px;">-</span>
      <Date-picker confirm :editable="false" class="custom__input--white" type="date" :option="minData" format="yyyy-MM-dd" @on-ok="endDateOk" @on-change="endDateChange" placeholder="结束日期" style="width: 120px; margin-right: 30px;"></Date-picker>
      <Input class="custom__search" icon="search" placeholder="姓名／手机号" v-model="postData.name" @on-click="textSearch"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-if="isTrash" @click="trashSelect"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addModal"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="userListTitle" :data="userListData" @on-selection-change="onSelect"></Table>
    <Spin size="large" fix v-if="false"></Spin>
    <Page style="margin-top: 14px;" class="custom__page" :total="total" :page-size="postData.pageSize" @on-change="pageChange"></Page>
  </div>
  <Modal
    on-cancel="resetFields('formValidate')"
    v-model="modal.show"
    :closable="false"
    width="560">
    <p slot="header">
      {{modal.title}}
    </p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" class="modal-form">
      <Form-item label="姓名：" prop="name">
        <Input v-model="formValidate.name" placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="电话号码：" prop="mobile">
        <Input v-model="formValidate.mobile" placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="密码：" prop="password">
        <Input v-model="formValidate.password" placeholder="123456（或随机生成）"></Input>
      </Form-item>
      <Form-item label="E-mail：" prop="email">
        <Input v-model="formValidate.email" placeholder="请您输入"></Input>
      </Form-item>
      <!-- <Form-item label="权限：" prop="power">
        <Select v-model="formValidate.power" placeholder="请您选择...">
          <Option value="beijing">全选1</Option>
          <Option value="shanghai">全选2</Option>
          <Option value="shenzhen">全选3</Option>
        </Select>
      </Form-item> -->
      <Form-item label="禁用：">
        <i-switch>
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show = false">取消</Button>
      <Button type="primary" size="large" :loading="modal.saveLoading" @click="saveUser('formValidate')">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  data() {
    return {
      maxData: {        // 开始时间的最大时间
        disabledDate(date) {
          // console.log(date)
        }
      },
      minData: {        // 结束时间的最小时间
        disabledDate(date) {
          // console.log(date)
        }
      },
      modal: {
        show: false,        // 是否显示编辑和查看modal
        saveLoading: false, // 是否正在保存用户中
        title: ''           // modal的标题
      },
      postData: {          // 用户列表发送请求所需要的对象
        startDate: '',     // 开始时间
        endDate: '',       // 结束时间
        name: '',          // 搜索关键字
        selectedId: '',    // 选中的用户Id
        pageNo: 1,         // 页码
        pageSize: 20       // 每页条数
      },
      isTrash: false,    // 是否显示删除按钮
      total: 20,         // 数据总条数
      formValidate: {
        id: '',           // id
        name: '',         // 姓名
        gender: '',       // 性别
        mobile: '',       // 电话
        email: '',        // 邮箱
        password: '',     // 密码
        no: ''           // 工号
        // power: '1',    // 权限
        // caseId: '',       // 案场ID
        // adminFlag: false  // 是否案场管理员
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
        ]
        // power: [
        //   { required: true, message: '权限不能为空', trigger: 'change' }
        // ],
        // caseId: [
        //   { required: true, message: '案场不能为空', trigger: 'change' }
        // ]
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
                    that.$Modal.confirm({
                      content: '此操作不可恢复，确认删除用户？',
                      onOk: () => {
                        that.removeUser(params.index)
                        that.$Message.success('删除成功')
                      }
                    })
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
    removeUser(index) {
      this.userListData.splice(index, 1)
    },
    addModal() {
      for (const item in this.formValidate) {
        this.formValidate[item] = ''
      }
      this.formValidate.id = 0
      this.modal.title = '新建用户'
      this.modal.show = true
    },
    editModal(userId) {
      this.$axios.get('/int-user/detail', { params: { id: userId } }).then(response => {
        if (response === null) return
        for (const items in response.data) {
          this.formValidate[items] = response.data[items]
        }
      })
      this.modal.title = '修改用户'
      this.modal.show = true
    },
    saveUser(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal.saveLoading = true
          if (this.formValidate.id === 0) {
            // setTimeout(() => {
            this.saveUserInfo('新建用户成功')
            // }, 2000)
          } else {
            // setTimeout(() => {
            this.saveUserInfo('修改用户成功')
            // }, 2000)
          }
        } else {
          this.modal.saveLoading = false
        }
      })
    },
    saveUserInfo(successText) {
      console.log('1:' + this.formValidate.name)
      const data = {
        email: this.formValidate.email,
        name: this.formValidate.name
      }
      this.$axios.get('/int-user/save', { params: data }).then(response => {
        if (response === null) return
        this.$Message.success(successText)
      })
      console.log('2:' + this.formValidate.name)
      this.modal.show = false
      this.modal.saveLoading = false
    },
    resetFields(name) {
      this.$refs[name].resetFields()
    },
    onSelect(selection) {
      const that = this
      const idList = []

      this.isTrash = selection.length > 0
      that.postData.selectedId = ''

      for (let i = selection.length - 1; i >= 0; i--) {
        idList.push(selection[i].id)
      }

      that.postData.selectedId = idList.join(',')
    },
    trashSelect(id) {
      console.log(this.postData.selectedId)
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除用户？',
        onOk: () => {
          this.$Message.success('删除成功')
        }
      })
    },
    startDateChange(date) {
      this.postData.startDate = date
    },
    endDateChange(date) {
      this.postData.endDate = date
    },
    startDateOk(data) {
      if (this.postData.endDate) {
        this.dateSearch()
      }
    },
    endDateOk(data) {
      if (this.postData.startDate) {
        this.dateSearch()
      }
    },
    dateSearch() {
      this.$_.assign(this.postData, { name: '', startDate: this.postData.startDate, endDate: this.postData.endDate, pageNo: this.postData.pageNo, pageSize: this.postData.pageSize })
      this.getData()
    },
    textSearch() {
      this.$_.assign(this.postData, { name: this.postData.name, startDate: '', endDate: '', pageNo: this.postData.pageNo, pageSize: this.postData.pageSize })
      this.getData()
    },
    pageChange(currentPage) {
      this.$_.assign(this.postData, { name: this.postData.name, startDate: this.postData.startDate, endDate: this.postData.endDate, pageNo: currentPage, pageSize: this.postData.pageSize })
      this.getData()
    },
    getData() {
      const that = this
      this.$axios.get('/int-user/list', { params: that.postData }).then(response => {
        console.log(response)
        if (response === null) return
        for (const items in response.data.list) {
          that.userListData.push(response.data.list[items])
        }
        // that.userListData.push(response.list)
      })
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    'modal.show'(val, oldVal) {
      if (!val) {
        this.resetFields('formValidate')
      }
    }
  }
}
</script>
