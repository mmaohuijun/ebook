<style lang="less" scoped>
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
      <Date-picker class="custom__input--white" type="date" :options="maxData" format="yyyy-MM-dd" @on-change="startDateChange" placeholder="开始日期" style="width: 120px"></Date-picker>
      <span style="font-size:16px; color:#fff; padding: 0 10px;">-</span>
      <Date-picker class="custom__input--white" type="date" :option="minData" format="yyyy-MM-dd" @on-change="endDateChange" placeholder="结束日期" style="width: 120px; margin-right: 30px;"></Date-picker>
      <Input class="custom__search" icon="search" placeholder="姓名／手机号"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-if="isTrash" @click="trashSelect"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addModal"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="userListTitle" :data="userListData" @on-selection-change="onSelect"></Table>
    <Spin size="large" fix v-if="false"></Spin>
    <Page style="margin-top: 14px;" class="custom__page" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>
  </div>
  <Modal
    title="修改用户"
    v-model="modal"
    :closable="false"
    width="560">
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
  </Modal>
</div>
</template>
<script>
export default {
  data () {
    return {
      maxData: {        // 开始时间的最大时间
        disabledDate (date) {
        }
      },
      minData: {        // 结束时间的最小时间
        disabledDate (date) {
        }
      },
      startDate: '',    // 开始时间
      endDate: '2017-10-21',      // 结束时间
      name: '',         // 搜索关键字
      selectedUser: '', // 选中的用户
      isTrash: false,   // 是否显示删除按钮
      modal: false,     // 是否显示编辑和查看弹出框
      pageNo: 1,        // 页码
      pageSize: 20,     // 每页条数
      total: 1000,      // 数据总条数
      formValidate: {
        id: '',           // id
        name: '',         // 姓名
        gender: '',       // 性别
        mobile: '',       // 电话
        email: '',        // 邮箱
        password: '',     // 密码
        no: '',           // 工号
        // power: '1',    // 权限
        caseId: '',       // 案场ID
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
            let that = this
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
                  click () {
                    that.editModal(params.index)
                  }
                }
              }),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确认删除此用户吗？',
                  width: 160,
                  placement: 'top'
                },
                on: {
                  'on-ok' () {
                    that.removeUser(params.index, 1)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'text',
                    icon: 'trash-a',
                    size: 'small'
                  },
                  style: {
                    color: '#999',
                    fontSize: '22px'
                  }
                })
              ])
            ])
          }
        }
      ],
      userListData: [
        {
          id: 1,
          name: '张磊1',
          mobile: '15811110000',
          email: '213sdga@163.com',
          no: 'XXXXX', // 工号
          createTime: '2017-06-06'
        },
        {
          id: 2,
          name: '张磊2',
          mobile: '15811110000',
          email: '213sdga@163.com',
          no: 'XXXXX',
          createTime: '2017-06-06'
        },
        {
          id: 3,
          name: '张磊2',
          mobile: '15811110000',
          email: '213sdga@163.com',
          no: 'XXXXX',
          createTime: '2017-06-06'
        }
      ]
    }
  },
  methods: {
    removeUser (index) {
      this.userListData.splice(index, 1)
    },
    addModal () {
      this.modal = true
    },
    editModal (index) {
      this.formValidate = this.userListData[index]
      this.modal = true
    },
    onSelect (selection) {
      const that = this
      let idList = []

      selection.length > 0 ? this.isTrash = true : this.isTrash = false
      that.selectedUser = ''

      for (let i = selection.length - 1; i >= 0; i--) {
        idList.push(selection[i].id)
      }

      that.selectedUser = idList.join(',')
    },
    trashSelect (id) {
      // let user = ''
    },
    startDateChange (data) {
      this.startDate = data
      console.log(this.startDate)
    },
    endDateChange (data) {
      this.endDate = data
      console.log(this.endDate)
    },
    pageChange (currentPage) {
      console.log(currentPage)
    }
  }
}
</script>
