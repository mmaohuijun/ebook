<template>
  <div class="layout__content">
<!--     <div class="layout__header">
      <h2 class="layout__header-title">客户管理 - 来电客户</h2>
      <div class="layout__header-tool">
        <span style="font-size:16px; color:#fff; padding:0 10px;">时间</span>
        <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="startDateOk" @on-change="startDate=$event" v-model="startDate" placeholder="开始日期" style="width:95px;"></Date-picker>
        <span style="font-size:16px; color:#fff; padding:0 10px;">-</span>
        <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="endDateOk" @on-change="endDate=$event" v-model="endDate" placeholder="结束日期" style="width:95px; margin-right:30px;"></Date-picker>
        <Input class="custom__search" icon="search" placeholder="姓名/手机号" v-model="name" @on-click="textSearch"></Input>
        <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="link" @click="cutRelation(id)"></Button>
        <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" @click="deleteClient(id)"></Button>
      </div>
    </div> -->
    <ebook-header
      header-title="客户管理 - 来电客户"
      :dateSearch="true"
      :textSearch="true"
      :cutBtn="true"
      :delBtn="true"
      placeholder="姓名/手机号"
      @onDateSearch="dateSearch"
      @onTextSearch="textSearch"
      @onCutRelation="cutRelation(id)"
      @onDeleteClient="deleteClient(id)">
      </ebook-header>

    <div class="layout__body">
      <Table ref="clientListTable" class="custom__table" :columns="clientListTitle" :data="clientListData" @on-sort-change="clientSort" @on-selection-change="onSelect" ></Table>
      <Spin size="large" fix v-if="false"></Spin>
      <Page style="margin-top: 14px" class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>
    </div>
    <Modal
      v-model="modal1.show"
      :closable="false"
      width="500">
      <p class="modal-style">{{modal1.content}}</p>
      <div slot="footer">
        <Button type="text" size="large" @click="hideModal">取消</Button>
        <Button type="primary" size="large" v-model="clicked1" @click="saveRelation(id)" >完成</Button>
      </div>
    </Modal>
    <Modal
      v-model="modal2.show"
      :closable="false"
      width="500">
      <p class="modal-style">{{modal2.content}}</p>
      <div slot="footer">
        <Button type="text" size="large" @click="hideModal">取消</Button>
        <Button type="primary" size="large" v-model="clicked2" @click="saveDelete" >完成</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import EbookHeader from 'components/EbookHeader'
export default {
  name: 'CallClient',
  data() {
    return {
      id: '',  //  被选中的客户id
      startDate: '',
      endDate: '',
      name: '', //  搜索关键字
      isSearch: false, // 是否开始条件筛选
      pageNo: 1,  //  当前页码
      total: 20,  //  总页数
      pageSize: 20,  //  每页显示信息数
      scType: 'desc',
      tmType: '',
      // clicked: false,
      // confirmed: false,
      modal1: {  //  模态框对象
        show: false,
        content: ''
      },
      modal2: {
        show: false,
        content: ''
      },
      clicked1: false,
      clicked2: false,
      // isShow: false,
      clientListTitle: [  //  表头
        {
          title: '全选',
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
          title: '电话号码',
          key: 'mobile',
          ellipsis: true
        },
        {
          title: '案场',
          key: 'caseName',
          ellipsis: true
        },
        {
          title: '置业顾问',
          key: 'consultantName',
          ellipsis: true
        },
        {
          title: '来电时间',
          key: 'lastRecordDate',
          sortable: 'custom', // 开启排序
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
                  icon: 'link',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#999',
                  fontSize: '22px'
                },
                on: {
                  click() {
                    // that.modal1.content = '是否解除顾问与客户的关联'
                    // that.modal1.show = true
                    console.log(params)
                    that.cutRelation(params.row.id)
                    that.id = params.row.id
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
                    // that.modal2.content = '是否确认删除'
                    // that.modal2.show = true
                    that.deleteClient(params.row.id)
                    that.id = params.row.id
                  }
                }
              })
            ])
          }
        }
      ],
      clientListData: [] //  客户信息
    }
  },
  methods: {
    hideModal() {
      this.modal1.show = false
      this.modal2.show = false
    },
    // 点击确认开始时间按钮
    startDateOk(data) {
      if (this.endDate) {
        this.dateSearch()
      }
    },
    // 点击确认结束时间按钮
    endDateOk(data) {
      if (this.startDate) {
        this.dateSearch()
      }
    },
    // 时间段搜索
    dateSearch(starDate, endDate) {
      this.startDate = starDate
      this.endDate = endDate
      this.name = ''
      this.isSearch = true
      this.pageNo = 1
      this.showClientList()
    },
    // 文本搜索
    textSearch(seachText) {
      this.name = seachText
      // this.startDate = ''
      // this.endDate = ''
      this.isSearch = true
      this.pageNo = 1
      if (this.endDate && this.startDate && this.name === null) {
        return
      } else {
        this.showClientList()
      }
    },
    pageChange(currentPage) {
      this.pageNo = currentPage
      this.showClientList()
    },
    //  渲染来电客户列表
    showClientList() {
      const data = {
        name: this.name || '',
        startDate: this.startDate || '',
        endDate: this.endDate || '',
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize,
        dateOrder: this.scType,
        timeOrder: this.tmType
      }
      console.log(data)
      // if (!this.isSearch) {
      //   this.name = ''
      //   this.startDate = ''
      //   this.endDate = ''
      // }
      if (!this.isSearch) {
        data.name = ''
        data.startDate = ''
        data.endDate = ''
      }
      this.$axios.post('/case-cust/caller-list', data).then(response => {
        if (response === null) return
        this.clientListData = []
        for (const items in response.data.list) {
          console.log(response.data.list[items].consultantName)
          this.clientListData.push(response.data.list[items])
        }
        this.total = response.data.total
        console.log('clientListData', this.clientListData)
      })
      this.deselectedAll()
    },
    //  解除置业顾问 关系
    cutRelation(id) {
      if (!id) {
        this.$store.dispatch('showErrorMsg', '请先选择客户')
        return
      }
      this.modal1.content = '是否解除顾问与客户的关联'
      this.modal1.show = true
      console.log(id)
    },
    saveRelation() {
      this.clicked1 = !this.clicked1
      // console.log('点击确定后', this.clicked)
      console.log('id', this.id)
      if (this.clicked1) {
        console.log('点击确定后做的事情')
        this.$axios.post('/case-cust/assign-cancel', { id: this.id }).then(response => {
          console.log(response)
          if (response === null) return
          // this.clientListData.splice(index, 1)
          this.modal1.show = false
          this.clicked1 = false
          this.isSearch = false
          // this.showClientList()
          this.pageChange()
        })
      }
      this.clicked1 = false
      // this.cutRelation(id)
    },
    //  删除客户
    deleteClient(id) {
      if (!id) {
        this.$store.dispatch('showErrorMsg', '请先选择客户')
        return
      }
      this.modal2.content = '是否确认删除'
      this.modal2.show = true
    },
    saveDelete() {
      this.clicked2 = !this.clicked2
      console.log('clicked2', this.clicked2)
      console.log('deleted id', this.id)
      if (this.clicked2) {
        this.$axios.post('/case-cust/del', { id: this.id }).then(response => {
          if (response === null) return
          this.modal2.show = false
          this.clicked2 = false
          this.isSearch = false
          // this.showClientList()
          this.pageChange()
        })
      }
    },
    onSelect(selection) {
      console.log(selection)
      const idList = []
      for (let i = 0; i < selection.length; i++) {
        idList.push(selection[i].id)
      }
      if (idList.length === 0) {
        // this.isShow = true
        // this.$store.dispatch('showErrorMsg', '请先选择客户')
      }
      this.id = idList.join(',')
    },
    // 取消所有选中
    deselectedAll() {
      console.log('deselectedAll')
      this.$refs.clientListTable.selectAll(false)
      this.selection = []
      this.id = ''
    },
    clientSort(val) {
      if (val.key === 'lastRecordDate') {
        if (val.order === 'desc') {
          this.scType = 'desc'
        } else if (val.order === 'asc') {
          this.scType = 'asc'
        } else {
          this.scType = 'desc'
        }
      }
      this.showClientList()
    }
  },
  mounted() {
    this.showClientList()
  },
  components: {
    EbookHeader
  }
}
</script>
<style lang="css">
</style>