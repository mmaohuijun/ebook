<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="案场" v-model="searchText" @on-click="goSearch"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-show="selectId.length !== 0" @click="deleteItem('select')"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addCase"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="caseTable" :data="caseList" @on-row-click="onClickCaseItem" @on-selection-change="onSelectCaseItem"></Table>
    <Page style="margin-top: 14px;" class="custom__page" :total="total" :page-size="pageSize" @on-change="changePage" :current="pageNo"></Page>
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
      total: 0,
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
          key: 'name',
          ellipsis: true
        },
        // {
        //   title: '所属组织',
        //   key: 'name',
        //   ellipsis: true
        // },
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
      caseList: [],
      afterSearch: false // 点击搜索后
    }
  },
  methods: {
    initCaseList() {
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      if (this.afterSearch && !this.$_.isEmpty(this.searchText.trim())) {
        console.log('notEmpty', this.searchText)
        data.name = this.searchText
      }
      this.$axios.get('case/list', { params: data }).then(response => {
        if (response === null) return
        console.log('案场列表', response)
        const reData = response.data
        this.caseList = reData.list
        this.total = reData.total
      })
    },
    // 查询
    goSearch() {
      console.log('goSearch', this.searchText)
      // 判断是否有搜索词
      if (this.$_.isEmpty(this.searchText.trim())) {
        if (this.afterSearch) { // 搜索后
          this.initCaseList()
          this.afterSearch = false
        } else {
          this.$Message.error('请输入案场名!')
        }
        this.searchText = ''
        return
      }
      this.afterSearch = true
      this.pageNo = 1
      this.initCaseList()
    },
    // 新建案场
    addCase() {
      console.log('addCase')
      this.$router.push('web-admin/caseInfo/0')
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
      this.$router.push(`web-admin/caseInfo/${this.caseId}`)
    },
    // 选中列表
    onSelectCaseItem(item) {
      console.log('onSelectCaseItem', item)
      const select = []
      for (const ele of item) {
        select.push(ele.id)
      }
      this.selectId = select.toString()
    },
    deleteItem(item) {
      console.log('deleteItem', item)
      let id = ''
      if (item === 'select') { // 头部的多选'删除'按钮
        id = this.selectId
      } else { // 列表右边的'删除'按钮
        this.caseId = item.id
        id = item.id
      }
      this.$Modal.confirm({
        // title: '温馨提示',
        content: '此操作不可恢复，确认删除案场？',
        loading: true,
        onOk: () => {
          this.sendDeleteRequest(id)
        }
      })
    },
    // 发送删除请求
    sendDeleteRequest(id) {
      this.$axios.get('case/del', { params: { id } }).then(response => {
        if (response === null) return
        console.log('案场列表', response)
        this.$Modal.remove()
        this.$Message.success('删除成功')
        this.initCaseList()
      })
    }
  },
  mounted() {
    this.initCaseList()
  }
}
</script>
<style lang="less" scoped>
</style>
