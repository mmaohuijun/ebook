<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="案场" v-model="searchText" @on-click="goSearch"></Input>
      <!-- <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" v-show="selectId.length !== 0" @click="deleteItem('select')"></Button> -->
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addCase"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Table class="custom__table" :columns="caseTable" :data="caseList" @on-row-click="onClickCaseItem"></Table>
    <Page style="margin-top: 14px;" class="custom__page" :total="total" :page-size="pageSize" @on-change="changePage" :current="pageNo"></Page>
  </div>

</div>
</template>
<script>
export default {
  data() {
    return {
      pageNo: 1, // 页码
      pageSize: 20, // 页面大小
      total: 0,
      ifClickIcon: false, // 是否点击'维度信息'
      selectId: [], // 已选择项
      searchText: '', // 搜索关键词(显示)
      searchTextCfm: '', // 搜索关键词(查询)
      caseTable: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center',
        //   ellipsis: true
        // },
        {
          title: 'ID',
          key: 'id',
          ellipsis: false
          // sortable: true // 开启排序
        },
        {
          title: '案场',
          key: 'name',
          ellipsis: true
          // sortable: true // 开启排序
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
            h('i', {
              class: 'iconfont icon-weidu',
              style: {
                cursor: 'pointer'
              },
              on: {
                click: event => {
                  console.log('进入维度')
                  this.ifClickIcon = true
                  // event.cancelBubble = true
                  // this.$router.push({ name: 'CaseAttrs', params: { caseId: this.caseId } })
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
  computed: {
    caseId() {
      return this.$store.state.cases.caseId
    }
  },
  mounted() {
    console.log('案场管理', this.caseId)
    this.initCaseList()
  },
  methods: {
    initCaseList(searchText) {
      this.$axios.get('case/list', { params: {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: searchText || ''
      } }).then(response => {
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
        if (this.afterSearch) { // 搜索后清空搜索词, 初始化列表
          this.pageNo = 1
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
      this.searchTextCfm = this.searchText
      this.initCaseList(this.searchTextCfm)
    },
    // 新建案场
    addCase() {
      console.log('addCase')
      // 设置案场id为0
      this.$store.dispatch('setCaseId', '0')
      this.gotoCaseInfo()
    },
    // 点击分页
    changePage(pageNo) {
      console.log('changePage', pageNo, this.selectId)
      this.pageNo = pageNo
      this.selectId = []
      if (this.afterSearch) {
        this.initCaseList(this.searchTextCfm)
      } else {
        this.initCaseList()
      }
    },
    // 点击案场跳转详情页
    onClickCaseItem(item) {
      console.log('onClickCaseItem', item)
      this.$store.dispatch('setCaseId', item.id)
      this.$store.dispatch('setCaseName', item.projectName)

      // 判断是否点击'查看维度'按钮
      if (this.ifClickIcon) {
        this.gotoCaseAttrs()
      } else {
        this.gotoCaseInfo()
      }
    },
    gotoCaseInfo() {
      this.$router.push({ name: 'CaseInfo', params: { caseId: this.caseId } })
    },
    gotoCaseAttrs() {
      this.$router.push({ name: 'CaseAttrs', params: { caseId: this.caseId } })
    }
    // deleteItem(item) {
    //   console.log('deleteItem', item)
    //   let id = ''
    //   if (item === 'select') { // 头部的多选'删除'按钮
    //     id = this.selectId
    //   } else { // 列表右边的'删除'按钮
    //     this.caseId = item.id
    //     id = item.id
    //   }
    //   this.$Modal.confirm({
    //     // title: '温馨提示',
    //     content: '此操作不可恢复，确认删除案场？',
    //     loading: true,
    //     onOk: () => {
    //       this.sendDeleteRequest(id)
    //     }
    //   })
    // },
    // // 发送删除请求
    // sendDeleteRequest(id) {
    //   this.$axios.get('case/del', { params: { id } }).then(response => {
    //     if (response === null) return
    //     console.log('案场列表', response)
    //     this.$Modal.remove()
    //     this.$Message.success('删除成功')
    //     this.initCaseList()
    //   })
    // }
  }
}
</script>
<style lang="less">
</style>
