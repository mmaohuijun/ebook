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
</div>
</template>
<script>
export default {
  data () {
    return {
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
                  icon: 'trash-a',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#999',
                  fontSize: '22px'
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
<style lang="less" scoped>
</style>
