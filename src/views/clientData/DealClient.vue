<template>
  <div class="layout__content">
    <!-- <div class="layout__header">
      <h2 class="layout__header-title">客户 - 成交客户</h2>
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
      header-title="客户管理 - 成交客户"
      :dateSearch="true"
      :textSearch="true"
      :cutBtn="isShow"
      :delBtn="isShow"
      placeholder="姓名/手机号"
      @onDateSearch="dateSearch"
      @onTextSearch="textSearch"
      @onCutRelation="cutRelation(id)"
      @onDeleteClient="deleteClient(id)">
      </ebook-header>

    <div class="layout__body">
      <Table class="custom__table" :columns="clientListTitle" :data="clientListData" @on-selection-change="onSelect" ></Table>
      <Spin size="large" fix v-if="false"></Spin>
      <Page style="margin-top: 14px" class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" @on-change="pageChange" ></Page>
    </div>
    <Modal
      v-model="modal.show"
      :closable="false"
      @on-ok="saveEdit"
      width="500">
      <p class="modal-style">{{modal.title}}</p>
    </Modal>
  </div>
</template>
<script>
import EbookHeader from 'components/EbookHeader'
export default {
  name: 'DealClient',
  data() {
    return {
      id: '', // 被选中客户的id号
      startDate: '',
      endDate: '',
      name: '', //  搜索关键字
      isSearch: false, // 是否开始条件筛选
      pageNo: 1,
      total: 20,
      pageSize: 20,
      modal: {
        show: false,
        title: '',
        isDelete: false
      },
      isShow: false,
      clientListTitle: [
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
          title: '次数',
          key: 'deals',
          sortable: true,
          ellipsis: true
        },
        {
          title: '成交时间',
          key: 'lastRecordDate',
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
                    // that.modal.title = '是否解除顾问与客户的关联'
                    // that.modal.show = true
                    // that.cutRelation(params.row.id)
                    // that.modal.isDelete = false
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
                    // that.modal.title = '是否确认删除客户'
                    // that.modal.show = true
                    // console.log(params)
                    // that.deleteClient(params.row.id)
                    // that.modal.isDelete = true
                    that.deleteClient(params.row.id)
                    that.id = params.row.id
                  }
                }
              })
            ])
          }
        }
      ],
      clientListData: [
        // {
        //   id: 1,
        //   name: '张磊',
        //   mobile: '1234567',
        //   caseName: '金地精益',
        //   consultantName: '小丽',
        //   status: '成交',
        //   createTime: '2017-1-1'
        // },
        // {
        //   id: 3,
        //   name: '张磊',
        //   mobile: '1234567',
        //   caseName: '金地精益',
        //   consultantName: '小丽',
        //   status: '成交',
        //   createTime: '2017-1-1'
        // },
        // {
        //   id: 4,
        //   name: '张磊',
        //   mobile: '1234567',
        //   caseName: '金地精益',
        //   consultantName: '小丽',
        //   status: '成交',
        //   createTime: '2017-1-1'
        // },
        // {
        //   id: 10,
        //   name: '张磊',
        //   mobile: '1234567',
        //   caseName: '金地精益',
        //   consultantName: '小丽',
        //   status: '成交',
        //   createTime: '2017-1-1'
        // },
        // {
        //   id: 11,
        //   name: '张磊',
        //   mobile: '1234567',
        //   caseName: '金地精益',
        //   consultantName: '小丽',
        //   status: '成交',
        //   createTime: '2017-1-1'
        // }
      ]
    }
  },
  methods: {
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
      this.startDate = ''
      this.endDate = ''
      this.isSearch = true
      this.pageNo = 1
      this.showClientList()
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
        pageSize: this.pageSize
      }
      console.log(data)
      if (!this.isSearch) {
        this.name = ''
        this.startDate = ''
        this.endDate = ''
      }
      this.$axios.post('/case-cust/deal-list', data).then(response => {
        if (response === null) return
        this.clientListData = []
        for (const items in response.data.list) {
          this.clientListData.push(response.data.list[items])
        }
        this.total = response.data.total
        console.log('clientListData', this.clientListData)
      })
    },
    cutRelation(id) {
      this.modal.show = true
      this.modal.isDelete = false
      this.modal.title = '是否确认解除关系'
    },
    deleteClient(id) {
      this.modal.show = true
      this.modal.isDelete = true
      this.modal.title = '是否确认删除'
    },
    onSelect(selection) {
      console.log(selection)
      const idList = []
      for (let i = 0; i < selection.length; i++) {
        idList.push(selection[i].id)
      }
      if (idList.length > 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      console.log(idList)
      this.id = idList.join(',')
    },
    saveEdit() {
      console.log('saveEdit', this.id)
      console.log('isDelete', this.modal.isDelete)
      if (this.modal.isDelete) {
        this.$axios.post('/case-cust/del', { id: this.id }).then(response => {
          if (response === null) return
          this.showClientList()
        })
      } else {
        this.$axios.post('/case-cust/assign-cancel', { id: this.id }).then(response => {
          if (response == null) return
          this.showClientList()
        })
      }
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