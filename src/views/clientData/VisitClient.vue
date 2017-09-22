<template>
  <div class="layout__content">
    <div class="layout__header">
      <h2 class="layout__header-title">客户 - 到访客户</h2>
      <div class="layout__header-tool">
        <span style="font-size:16px; color:#fff; padding:0 10px;">时间</span>
        <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="startDateOk" @on-change="startDate=$event" v-model="startDate" placeholder="开始日期" style="width:95px;"></Date-picker>
        <span style="font-size:16px; color:#fff; padding:0 10px;">-</span>
        <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="endDateOk" @on-change="endDate=$event" v-model="endDate" placeholder="结束日期" style="width:95px; margin-right:30px;"></Date-picker>
        <Input class="custom__search" icon="search" placeholder="姓名/手机号" v-model="name" @on-click="textSearch"></Input>
        <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="link" @click="cutRelation(selectedId)"></Button>
        <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" @click="deleteClient(selectedId)"></Button>
      </div>
    </div>
    <div class="layout__body">
      <Table class="custom__table" :columns="clientListTitle" :data="clientListData" ></Table>
      <Spin size="large" fix v-if="false"></Spin>
      <Page class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" ></Page>
    </div>
    <Modal
      v-model="modal.show"
      :closable="false"
      width="500">
      <p class="modal-style">{{modal.title}}</p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'VisitClient',
  data() {
    return {
      startDate: '',
      endDate: '',
      name: '', //  搜索关键字
      isSearch: false, // 是否开始条件筛选
      pageNo: 1,
      total: 20,
      pageSize: 20,
      modal: {
        show: false,
        title: ''
      },
      clientListTitle: [
        {
          title: '全选',
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '电话号码',
          key: 'mobile'
        },
        {
          title: '案场',
          key: 'caseName'
        },
        {
          title: '置业顾问',
          key: 'consultantName'
        },
        {
          title: '次数',
          key: 'visits',
          sortable: true
        },
        {
          title: '到访时间',
          key: 'createTime'
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
                    that.modal.title = '是否解除顾问与客户的关联'
                    that.modal.show = true
                    that.cutRelation(params.row.id)
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
                    that.modal.title = '是否确认删除客户'
                    that.modal.show = true
                    that.deleteClient(params.row.id)
                  }
                }
              })
            ])
          }
        }
      ],
      clientListData: [
        {
          id: 1,
          name: '张磊',
          mobile: '1234567',
          caseName: '金地精益',
          consultantName: '小丽',
          visits: 2,
          createTime: '2017-1-1'
        },
        {
          id: 2,
          name: '张磊',
          mobile: '1234567',
          caseName: '金地精益',
          consultantName: '小丽',
          visits: 1,
          createTime: '2017-1-1'
        },
        {
          id: 3,
          name: '张磊',
          mobile: '1234567',
          caseName: '金地精益',
          consultantName: '小丽',
          visits: 5,
          createTime: '2017-1-1'
        },
        {
          id: 101,
          name: '张磊',
          mobile: '1234567',
          caseName: '金地精益',
          consultantName: '小丽',
          visits: 3,
          createTime: '2017-1-1'
        },
        {
          id: 22,
          name: '张磊',
          mobile: '1234567',
          caseName: '金地精益',
          consultantName: '小丽',
          visits: 3,
          createTime: '2017-1-1'
        }
      ]
    }
  },
  methods: {
    //  点击确认开始时间按钮
    startDateOk(data) {
      if (this.endDate) {
        this.dateSearch()
      }
    },
    //  点击确认结束时间按钮
    endDateOk(data) {
      if (this.startDate) {
        this.dateSearch()
      }
    },
    dateSearch() {
      this.name = ''
      this.isSearch = true
      this.pageNo = 1
      this.showClientList()
    },
    //  文本搜索
    textSearch() {
      // this.startDate = '',
      // this.endDate = '',
      // this.isSearch = true,
      // this.pageNo = 1,
      // this.showClientList()
    },
    //  渲染来电客户列表
    showClientList() {
      const data = {
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize
      }
      console.log(data)
      if (!this.isSearch) {
        this.name = ''
        this.startDate = ''
        this.endDate = ''
      }
      // this.$axios.post('/case-cust/visitor-list', { params:data }).then(response => {
      //   if (response === null) return
      //   this.clientListData = []
      //   for(const items in response.data.list) {
      //     this.clientListData.push(response.data.list[item])
      //   }
      //   this.total = response.data.total
      // })
    },
    //  解除关系
    cutRelation(selectedId) {
      console.log(selectedId)
      // this.$axios.post('/case-cust/assign-cancel', { params: { id: selectedId } }).then(response => {
      //   if (response === null) return
      // })
    },
    //  删除客户
    deleteClient(selectedId) {
      console.log(selectedId)
      // this.$axios.post('/case-cust/del', { params: { id: selectedId } }).then(response => {
      //   if (response === null) return
      // })
    }
  },
  mounted() {
    this.showClientList()
  }
}
</script>
<style lang="css">
  .modal-style{
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding-top: 15px;
    color: #4E546C;
  }
</style>