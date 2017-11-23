<template>
  <div class="layout__content">
 <!--    <div class="layout__header">
      <h2 class="layout__header-title">客户 - 到访客户</h2>
      <div class="layout__header-tool">
        <span style="font-size:16px; color:#fff; padding:0 10px;">时间</span>
        <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="startDateOk" @on-change="startDate=$event" v-model="startDate" placeholder="开始日期" style="width:95px;"></Date-picker>
        <span style="font-size:16px; color:#fff; padding:0 10px;">-</span>
        <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" @on-ok="endDateOk" @on-change="endDate=$event" v-model="endDate" placeholder="结束日期" style="width:95px; margin-right:30px;"></Date-picker>
        <Input class="custom__search" icon="search" placeholder="姓名/手机号" v-model="name" @on-click="textSearch"></Input>
        <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="link"></Button>
        <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a"></Button>
      </div>
    </div> -->
    <ebook-header
      header-title="客户管理 - 未分配客户"
      :dateSearch="true"
      :textSearch="true"
      :disBtn="true"
      :delBtn="true" 
      placeholder="姓名/手机号"
      @onDateSearch="dateSearch"
      @onTextSearch="textSearch"
      @onDistributeClient="distributeClient(caseId)"
      @onDeleteClient="deleteClient(id)">
      </ebook-header>
    <div class="layout__body">
      <Table ref="unAssignedTable" class="custom__table" :columns="clientListTitle" :data="clientListData" @on-sort-change="clientSort" @on-selection-change="onSelect"></Table>
      <Spin size="large" fix v-if="false"></Spin>
      <Page style="margin-top: 14px;" class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" @on-change="pageChange" ></Page>
    </div>
    <Modal
      v-model="modal.show"
      :closable="false"
      @on-ok="saveEdit"
      @on-cancle="resetFields"
      width="500">
      <p slot="header" v-if="!isDelete">{{modal.title}}</p>
      <!-- <div slot="header" v-if="!isDelete">{{modal.title}}</div> -->
      <Form :inline="true" style="height:360px" :label-width="180" v-if="!isDelete" >
<!--         <Form-item label="案场：" v-if="!isEUser"></Form-item>
        <Select v-model='s1' style="width:200px" @on-change="CaseSelectChange" v-if="!isEUser">
          <Option v-for="item in caseList" :value="item.id" :key="item.id">{{item.label}}</Option>
        </Select> -->
        <Form-item label="指派顾问："></Form-item>
        <Select v-model='s2' style="width:200px" @on-change="ConSelectChange">
          <Option v-for="item in extUserList" :value="item.id" :key="item.id">{{item.name}}</Option>
        </Select> 
      </Form>
      <p class="modal-style" v-if="isDelete">{{modal.title}}</p>       
      </Modal>
      <Modal
        v-model="disModal.show"
        :closable="false"
        width="500">
        <p class="modal-style">{{disModal.title}}</p>
      </Modal>
      <Modal
        v-model="delModal.show"
        :closable="false"
        @on-ok="saveEdit"
        width="500">
        <p class="modal-style">{{delModal.title}}</p>
      </Modal>
  </div>
</template>
<script>
import EbookHeader from 'components/EbookHeader'
export default {
  name: 'UnassignedClient',
  data() {
    return {
      id: '',  // 被选中客户的id
      consultant: '',  // 被选中置业顾问id
      caseId: '', // 被选中案场id
      caseIdList: [], // 多项选择时 案场id数组
      status: '', // 客户状态：来电、到访、成交
      scType: 'desc',
      tmType: '',
      modal: {
        show: false,
        title: ''
      },
      disModal: {
        show: false, // 批量选择 案场id不唯一时 弹框
        title: '不能跨案场分配'
      },
      delModal: {
        show: false,
        title: ''
      },
      isDelete: false,
      isEUser: false,
      s1: '',
      s2: '',
      // isShow: false, // 图标显示
      singleLine: false,  // 点击单行 解除关系
      startDate: '',
      endDate: '',
      name: '', //  搜索关键字
      isSearch: false, // 是否开始条件筛选
      pageNo: 1,
      total: 20,
      pageSize: 20,
      rowInfo: {},
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
          sortable: true,
          ellipsis: true
        },
        {
          title: '状态',
          key: 'status',
          ellipsis: true,
          filters: [
            {
              label: '来电',
              value: '来电'
            },
            {
              label: '到访',
              value: '到访'
            },
            {
              label: '成交',
              value: '成交'
            }
          ],
          filterMultiple: false,
          filterRemote: value => {
            console.log('filterRemote', value)
            this.status = value[0]
            // this.showClientList()
            this.pageChange()
          }
        },
        {
          title: '生成时间',
          key: 'createTime',
          sortable: true,
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
                  icon: 'arrow-swap',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#999',
                  fontSize: '22px'
                },
                on: {
                  click() {
                    that.singleLine = true
                    that.distributeClient(params.row.caseId)
                    that.id = params.row.id
                    that.caseId = params.row.caseId
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
                    that.deleteClient(params.row.id)
                    that.id = params.row.id
                  }
                }
              })
            ])
          }
        }
      ],
      extUserList: [
        // {
        //   id: 123,
        //   label: '123张三'
        // },
        // {
        //   id: 222,
        //   label: '222小二'
        // }
      ],
      clientListData: []
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
    //  获取未分配客户列表
    showClientList() {
      console.log('issearch', this.isSearch)
      const data = {
        status: this.status,
        name: this.name || '',
        startDate: this.startDate || '',
        endDate: this.endDate || '',
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize,
        dateOrder: this.scType,
        timeOrder: this.tmType
      }
      console.log('name', data)
      if (!this.isSearch) {
        console.log('此时清空搜索栏')
        data.name = ''
        data.startDate = ''
        data.endDate = ''
        data.pageNo = this.pageNo
      }
      this.$axios.post('case-cust/unassigned-list', data).then(response => {
        if (response === null) return
        this.clientListData = []
        for (const items in response.data.list) {
          this.clientListData.push(response.data.list[items])
        }
        this.total = response.data.total
        console.log('total', this.total)
        this.deselectedAll()
      })
    },
    // 点击顾问下拉框选项 获取外部用户id
    ConSelectChange(consultant) {
      this.consultant = consultant
    },
    // 选择表格项 获取客户id
    onSelect(selection) {
      console.log(selection)
      const idList = []
      this.caseIdList = []
      for (let i = 0; i < selection.length; i++) {
        idList.push(selection[i].id)
        this.caseIdList.push(selection[i].caseId)
      }
      if (idList.length > 0) {
        // this.isShow = true
      } else {
        // this.isShow = false
      }
      this.id = idList.join(',')
      // this.caseId = this.caseIdList.join(',')
      console.log(this.id)
      console.log(this.caseId)
    },
    // 分配客户
    distributeClient(caseId) {
      if (!this.singleLine) {
        for (let i = 0; i < this.caseIdList.length; i++) {
          if (this.caseIdList[i] === this.caseIdList[0]) {
            this.disModal.show = false
            this.caseId = this.caseIdList[0]
            console.log('完全一样')
            console.log('singleLine为false', 'caseId', this.caseId)
          } else {
            console.log('不完全一样')
            this.disModal.show = true
            return
          }
        }
        console.log('this.caseId', this.caseId)
      } else {
        this.caseId = caseId
      }
      if (!this.caseId) {
        this.$store.dispatch('showErrorMsg', '请选择客户')
        return
      }
      console.log('singleLine为true', 'caseId', this.caseId)
      this.isDelete = false
      this.modal.show = true
      this.modal.title = '分配客户'
      console.log('是否为外部用户', this.isEUser)
      if (this.isEUser) {
        this.$axios.post('/ext-user/worker-list').then(response => {
          if (response === null) return
          this.extUserList = []
          for (const items in response.data) {
            this.extUserList.push(response.data[items])
          }
          console.log('extuserlist', this.extUserList)
        })
      } else {
        this.$axios.post('/ext-user/worker-list', { caseId: this.caseId }).then(response => {
          if (response === null) return
          this.extUserList = []
          for (const items in response.data) {
            this.extUserList.push(response.data[items])
          }
          console.log('extuserlist', this.extUserList)
        })
      }
    },
    // 删除客户
    deleteClient(id) {
      console.log('id', id)
      this.id = id
      if (!id) {
        this.$store.dispatch('showErrorMsg', '请选择客户')
        return
      }
      this.isDelete = true
      this.delModal.show = true
      this.delModal.title = '是否确认删除客户'
    },
    // 确认保存
    saveEdit() {
      if (this.isDelete) {
        console.log('点击删除按钮')
        this.delete()
      } else {
        const data = {
          id: this.id,
          consultant: this.consultant
        }
        if (!this.isEUser) {
          console.log('内部用户通道 顾问', 'id', this.id, 'consultant', this.consultant)
          data.caseId = this.caseId
        }
        console.log(data)
        this.distribute(data)
      }
      this.resetFields()
    },
    // 判断 内部、外部用户
    justifyIdentity() {
      if (this.getLoginInfo === 'case-worker') {
        this.isEUser = true
        console.log('外部用户')
      } else {
        this.isEUser = false
        console.log('内部用户')
      }
    },
    // 删除操作
    delete() {
      this.$axios.post('/case-cust/del', { id: this.id }).then(response => {
        if (response === null) return
        this.isSearch = false
        this.pageChange()
        // this.showClientList()
        // this.isShow = false
      })
    },
    // 分配操作
    distribute(data) {
      this.$axios.post('/case-cust/assign', data).then(response => {
        if (response === null) return
        this.isSearch = false
        this.pageChange()
        // this.showClientList()
        // this.isShow = false
      })
    },
    resetFields() {
      this.s1 = ''
      this.s2 = ''
      this.singleLine = false
      this.id = ''
      this.caseId = ''
    },
    // 取消所有选中
    deselectedAll() {
      console.log('deselectedAll')
      this.$refs.unAssignedTable.selectAll(false)
      this.selection = []
      this.id = ''
      this.caseId = ''
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
    }
  },
  computed: {
    getLoginInfo() {  // 用户类型
      return this.$store.state.user.type
    }
  },
  mounted() {
    this.showClientList()
    this.justifyIdentity()
    console.log(this.getLoginInfo)
  },
  watch: {
    'modal.show'(val, oldVal) {
      if (!val) {
        this.resetFields()
      }
    }
  },
  components: {
    EbookHeader
  }
}
</script>
<style lang="css">
</style>