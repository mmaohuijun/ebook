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
      <Input class="custom__input--white" style="width: 90px;"></Input>
      <span style="font-size:16px; color:#fff; padding: 0 10px;">-</span>
      <Input class="custom__input--white" style="width: 90px; margin-right: 30px;"></Input>
      <Input class="custom__search" icon="search" placeholder="姓名／手机号"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="columns7" :data="data6"></Table>
    <Page style="margin-top: 14px;" class="custom__page" :total="100"></Page>
  </div>
  <Modal
    v-model="modal"
    :closable="false"
    width="560"
  >
    <p slot="header">
      修改用户
    </p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" class="modal-form">
        <Form-item label="姓名：" prop="name">
            <Input v-model="formValidate.name" placeholder="请您输入..."></Input>
        </Form-item>
        <Form-item label="电话号码：" prop="name">
            <Input v-model="formValidate.name" placeholder="请您输入..."></Input>
        </Form-item>
        <Form-item label="密码：" prop="name">
            <Input v-model="formValidate.name" placeholder="123456（或随机生成）"></Input>
        </Form-item>
        <Form-item label="E-mail：" prop="mail">
            <Input v-model="formValidate.mail" placeholder="请您输入"></Input>
        </Form-item>
        <Form-item label="权限：" prop="city">
            <Select v-model="formValidate.city" placeholder="请您选择...">
                <Option value="beijing">全选1</Option>
                <Option value="shanghai">全选2</Option>
                <Option value="shenzhen">全选3</Option>
            </Select>
        </Form-item>
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
      modal: false,
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请选择...', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
          { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入个人介绍', trigger: 'blur' },
          { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
        ]
      },
      columns7: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          ellipsis: true
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
          key: 'telephone',
          ellipsis: true
        },
        {
          title: '生成时间',
          key: 'time',
          ellipsis: true
        },
        {
          title: ' ',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
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
                  click: () => {
                    this.modal = true
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
                  click: () => {
                    this.remove(params.index)
                  }
                }
              })
            ])
          }
        }
      ],
      data6: [
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        },
        {
          name: '张磊',
          email: '213sdga@163.com',
          telephone: '12345678998',
          time: '2017-06-06'
        }
      ]
    }
  },
  methods: {
    remove (index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>
