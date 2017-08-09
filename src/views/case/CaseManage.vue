<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="案场／组织" v-model="searchText" @on-click="goSearch"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-show="selectId.length !== 0" @click="deleteItem"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addCase"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="caseTable" :data="caseList" @on-row-click="onClickCaseItem" @on-selection-change="onSelectCaseItem"></Table>
    <Page style="margin-top: 14px;" class="custom__page" :total="total" @on-change="changePage"></Page>
  </div>

</div>
</template>
<script>
export default {
  data() {
    return {
      caseId: '',
      pageNo: 1, // 页码
      pageSize: 20, // 页面大小
      total: 100,
      selectId: [], // 已选择项
      searchText: '', // 案场名(查询)
      caseTable: [
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
          key: 'appName',
          ellipsis: true
        },
        {
          title: ' ',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => h('div', [
            // h('Button', {
            //   props: {
            //     type: 'text',
            //     icon: 'edit',
            //     size: 'small'
            //   },
            //   style: {
            //     marginRight: '5px',
            //     color: '#999',
            //     fontSize: '22px'
            //   }
            // }),
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
                click: event => {
                  event.cancelBubble = true
                  this.deleteItem(params.row)
                }
              }
            })
          ])
        }
      ],
      caseList: [
        // {
        //   id: 2017,
        //   name: '中南售楼处',
        //   address: '青浦区大街1号',
        //   officeId: 2352,
        //   officeName: 'XXXXXXXX',
        //   remark: '描述',
        //   appName: '中南招商世城' // 公众号名称
        // },
        {
          id: '002',
          field: '金地艺境2',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          appName: '金地艺境'
        },
        {
          id: '003',
          field: '金地艺境3',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          appName: '金地艺境'
        },
        {
          id: '004',
          field: '金地艺境4',
          name: '上海东区事业部',
          projectName: '金地艺境一期',
          appName: '金地艺境'
        }
      ]
    }
  },
  methods: {
    initCaseList() {
      // 每次获取caseList要先清空
      // this.caseList = []
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (!this.$_.isEmpty(this.searchText.trim())) {
        console.log('notEmpty', this.searchText)
        data.name = this.searchText
      }
      this.$axios.get('case/list', { params: data }).then(response => {
        if (response === null) return
        console.log('案场列表', response)
      })
    },
    // 查询
    goSearch() {
      console.log('goSearch', this.searchText)
      if (this.$_.isEmpty(this.searchText.trim())) {
        this.$Message.error('请输入案场名!')
        this.searchText = ''
        return
      }
      this.initCaseList()
    },
    // 新建案场
    addCase() {
      console.log('addCase')
      this.$router.push('caseInfo/0')
    },
    // 点击分页
    changePage(pageNo) {
      console.log('changePage', pageNo)
      this.pageNo = pageNo
      this.initCaseList()
    },
    // 点击案场跳转详情页
    onClickCaseItem(item) {
      console.log('onClickCaseItem', item)
      this.caseId = item.id
      this.$router.push(`caseInfo/${this.caseId}`)
    },
    // 选中列表
    onSelectCaseItem(item) {
      console.log('onSelectCaseItem', item)
      const select = []
      for (const ele of item) {
        select.push(ele.id)
      }
      this.selectId = select.toString()
      console.log(this.selectId)
    },
    deleteItem(item) {
      console.log('deleteItem', item)
      this.caseId = item.id
      this.$Modal.confirm({
        title: '温馨提示',
        content: '此操作不可恢复，确认删除？',
        loading: true,
        onOk: this.confirmDelete
      })
    },
    confirmDelete() {
      console.log('confirmDelete', this.caseId)
      this.sendDeleteRequest(this.caseId)
    },
    // 发送删除请求
    sendDeleteRequest(id) {
      this.$axios.post('case/del', { id }).then(response => {
        if (response === null) return
        console.log('案场列表', response)
      })
      setTimeout(() => {
        this.$Modal.remove()
        this.$Message.success('删除成功')
      }, 3000)
    }
  },
  mounted() {
    console.log('案场管理 mounted')
    this.initCaseList()
  }
}
</script>
<style lang="less" scoped>
</style>
