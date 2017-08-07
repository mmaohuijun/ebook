<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="案场／组织"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="columns7" :data="data6" @on-row-click="onClickCaseItem"></Table>
    <Page style="margin-top: 14px;" class="custom__page" :total="100"></Page>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      caseId: '',
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
          render: (h, params) => h('div', [
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
      ],
      data6: [
        {
          id: '001',
          field: '金地艺境1',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          id: '002',
          field: '金地艺境2',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          id: '003',
          field: '金地艺境3',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        },
        {
          id: '004',
          field: '金地艺境4',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          WXname: '金地艺境'
        }
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // },
        // {
        //   field: '金地艺境',
        //   name: '上海东区事业部',
        //   projectName: '金地艺境一期',
        //   WXname: '金地艺境'
        // }
      ]
    }
  },
  methods: {
    onClickCaseItem(item) {
      console.log('onClickCaseItem', item)
      this.caseId = item.id
      this.$router.push(`caseInfo/${this.caseId}`)
    },
    remove(index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
