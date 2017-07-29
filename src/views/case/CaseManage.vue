<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="案场／组织"></Input>
      <a href="/caseInfo">13424</a>
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
          title: '案场',
          key: 'field',
          ellipsis: true
        },
        {
          title: '所属组织',
          key: 'name',
          ellipsis: true
        },
        {
          title: '项目名称',
          key: 'projectName',
          ellipsis: true
        },
        {
          title: '公众号名称',
          key: 'WXname',
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
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          field: '金地艺境',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
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
