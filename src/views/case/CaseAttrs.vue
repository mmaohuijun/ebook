<template>
<div class="case-attrs">
  <a href="javascript:;" class="case-add-btn" @click="addAttrsGroup">新建分栏</a>
  <div class="attrsinfo">
    <div class="attrsinfo__card"
      v-for="item in attrListData"
      :key="item.id"
      :class="[item.editable ? '' : 'attrsinf__card-hiden-tool', item.id === hoverAttrId && item.editable ? 'attrsinfo__card-active' : '']"
      @mouseenter="onEnterAttrs(item)"
      @mouseleave="onLeaveAttrs()">
      <div class="attrsinfo__card__item">
        <label>栏目名称：</label>
        <div class="attrsinfo__card__info">{{item.label}}</div>
      </div>
      <div class="attrsinfo__card__item">
        <label>详细维度：</label>
        <div class="attrsinfo__card__info">
          <div class="attr__item"v-for="(ele, index) in item.attrs" :key="ele.id" @click.stop="editAttrs(ele)">
            <span class="attr__item_rank" :class="ele.required ? 'attr__item_rank-red' : ''">{{index + 1}}</span>
            {{ele.label}}
            <!-- <Icon type="close-round"></Icon> -->
            <i class="ivu-icon ivu-icon-close-round" @click.stop="deleteAttrs(ele.id)"></i>
          </div>
          <div class="attr__item attr__item-add" v-show="item.id === hoverAttrId && item.editable" @click.stop="addAttrs">
            <Icon type="plus-circled"></Icon>
          </div>
        </div>
      </div>
      <div class="attrsinfo__card__tool">
        <i class="iconfont icon-xiugai" @click.stop="editAttrsGroup(item)"></i>
        <i class="iconfont icon-shanchu1" @click.stop="deleteAttrsGroup(item)"></i>
        <i class="iconfont" :class="item.hidden ? 'icon-xiugai' : 'icon-yincang'" @click.stop="displayAttrsGroup(item)"></i>
      </div>
    </div>
  </div>
  <Modal
    v-model="ifShowModal"
    :closable="false"
    :mask-closable="false"
    :loading="ifShowLoading"
    width="560"
    class-name="case-attrs">
    <p slot="header">{{modalTitle}}</p>
    <Form :label-width="120" class="modal-form" v-if="isAttrsGroup">
      <Form-item label="栏目名称：">
        <Input placeholder="请输入..." v-model="attrsGroupLabel"></Input>
      </Form-item>
      <Form-item label="名称序号：">
        <Input placeholder="请输入..." v-model="attrsGroupIndex"></Input>
      </Form-item>
      <Form-item label="是否隐藏：">
        <i-switch v-model="attrsGroupIfHide"></i-switch>
      </Form-item>
    </Form>
    <Form :label-width="120" class="modal-form" v-else>
      <Form-item label="维度名称：">
        <Input placeholder="请输入..." v-model="attrsLabel"></Input>
      </Form-item>
      <Form-item label="名称序号：">
        <Input placeholder="请输入..." v-model="attrsSort"></Input>
      </Form-item>
      <Form-item label="填写要求：">
        <Select placeholder="请选择" v-model="attrsRequire">
          <Option value="0">选填</Option>
          <Option value="1">必填</Option>
        </Select>
      </Form-item>
      <Form-item label="类型：">
        <Select placeholder="请选择" v-model="attrsType" @on-change="onChange">
          <Option value="text">单行文本框</Option>
          <Option value="textarea">多行文本框</Option>
          <Option value="select">单选</Option>
          <Option value="selectbox">多选</Option>
        </Select>
      </Form-item>
      <Form-item label="文本类型：" v-if="attrsType.indexOf('text') !== -1">
        <Select placeholder="请选择" v-model="attrsTextType">
          <Option value="textOnly">纯文字</Option>
          <Option value="numberOnly">纯数字</Option>
        </Select>
      </Form-item>
      <div v-if="attrsType.indexOf('select') !== -1">
        <Form-item v-for="(item, index) in attrsDetailsOptions" :key="index" :label="index === 0 ? '详细维度：' : ''" >
          <Input placeholder="文本不能超过20个字符" :value="item"></Input>
          <!-- <Icon type="minus-circled" class="add-detail-attrs"></Icon> -->
          <i class="add-detail-attrs ivu-icon ivu-icon-minus-circled" @click.stop="deleteAttrsOptions(index)"></i>
        </Form-item>
        <Form-item>
          <Input placeholder="文本不能超过20个字符"></Input>
          <Icon type="plus-circled" class="add-detail-attrs"></Icon>
        </Form-item>
      </div>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click.stop="hideModal">取消</Button>
      <Button type="primary" size="large" @click.stop="saveAttrsData">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'CaseAttrs',
  data() {
    return {
      hoverAttrId: '',
      attrListData: [
        {
          id: '12',
          name: 'XXXX',
          label: '核心因素',
          sort: 77,
          editable: false, // 不可编辑的分栏，不允许隐藏操作
          hidden: false, // 隐藏状态
          attrs: [
            {
              id: '21',
              label: '姓名',
              sort: 10,
              required: true,
              type: 'text', // text， textarea， select， selectbox
              config: { // text， textarea
                textType: '纯文字',
                textTip: '请输入姓名'
              },
              options: ['工程师', '项目经理'] // select， selectbox
            },
            {
              id: '22',
              name: 'XXXX',
              label: '性别',
              sort: 10,
              required: true,
              type: 'select',
              options: ['男', '女']
            },
            {
              id: '23',
              name: 'XXXX',
              label: '年龄段',
              sort: 10,
              required: true,
              type: 'select',
              options: ['未知', '20~30岁', '30~40岁', '40~50岁']
            },
            {
              id: '24',
              name: 'XXXX',
              label: '联系方式',
              sort: 10,
              required: true,
              type: 'text',
              config: { // text， textarea
                textType: '纯数字',
                textTip: '请输入电话号码'
              }
            },
            {
              id: '25',
              name: 'XXXX',
              label: '意向楼盘',
              sort: 10,
              required: true,
              type: 'select',
              options: ['金地艺境1', '金地艺境2', '金地艺境3']
            }
          ]
        },
        {
          id: '13',
          name: 'XXXX',
          label: '意向因素',
          sort: 88,
          editable: false, // 不可编辑的分栏，不允许隐藏操作
          hidden: false, // 隐藏状态
          attrs: [
            {
              id: '31',
              name: 'XXXX',
              label: '购房用途',
              sort: 10,
              required: true,
              type: 'select',
              options: ['婚房', '投资', '养老']
            },
            {
              id: '32',
              name: 'XXXX',
              label: '关注因素',
              sort: 10,
              required: true,
              type: 'selectbox',
              options: ['价格', '户型', '面积', '朝向']
            },
            {
              id: '33',
              name: 'XXXX',
              label: '购房预算',
              sort: 10,
              required: false,
              type: 'select',
              options: ['100~200万', '200~300万', '300~400万', '400~500万']
            }
          ]
        },
        {
          id: '14',
          name: 'XXXX',
          label: '特征因素',
          sort: 99,
          editable: true,
          hidden: false,
          attrs: [
            {
              id: '41',
              name: 'XXXX',
              label: '职业',
              sort: 10,
              required: true,
              type: 'select',
              options: ['职员', '医生', '律师', '警察']
            },
            {
              id: '42',
              name: 'XXXX',
              label: '行业',
              sort: 10,
              required: true,
              type: 'select',
              options: ['建筑业', '互联网行业', '政府部门', '物流']
            },
            {
              id: '43',
              name: 'XXXX',
              label: '收入',
              sort: 10,
              required: false,
              type: 'text',
              config: { // text， textarea
                textType: '纯数字',
                textTip: '请输入'
              }
            }
          ]
        },
        {
          id: '15',
          name: 'XXXX',
          label: '家庭因素',
          sort: 66,
          editable: true,
          hidden: true,
          attrs: [
            {
              id: '51',
              name: 'XXXX',
              label: '家庭结构',
              sort: 10,
              required: false,
              type: 'select',
              options: ['3口人', '2口人', '4口人']
            },
            {
              id: '52',
              name: 'XXXX',
              label: '家庭描述',
              sort: 10,
              required: false,
              type: 'textarea',
              config: { // text， textarea
                textType: '纯文字',
                textTip: '请输入'
              }
            }
          ]
        }
      ],
      ifShowModal: false,
      ifShowLoading: false,
      isAttrsGroup: false, // 是否打开维度分栏Modal
      modalTitle: '',
      attrsGroupId: '', // 维度分栏id
      attrsGroupLabel: '', // 维度分栏名称
      attrsGroupIndex: '', // 维度分栏序号
      attrsGroupIfHide: false, // 维度分栏是否隐藏
      attrsLabel: '',
      attrsSort: '',
      attrsRequire: '',
      attrsType: '',
      attrsTextType: '',
      attrsConfig: {},
      attrsDetailsOptions: []
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  methods: {
    onChange(v1) {
      console.log('onChange', v1)
    },
    // 点击编辑详细维度
    editAttrs(ele) {
      console.log('editAttrs', ele)
      this.showModal()
      this.modalTitle = `${ele.label} - 维度编辑`
      this.getAttrsDetailsInfo(ele)
    },
    getAttrsDetailsInfo(ele) {
      this.attrsLabel = ele.label
      this.attrsSort = ele.sort
      this.attrsRequire = ele.required ? '1' : '0'
      this.attrsType = ele.type
      if (ele.config) {
        this.attrsConfig = ele.config
        this.attrsTextType = ele.config.textType
      }
      if (ele.options) this.attrsDetailsOptions = ele.options
    },
    // 删除详细维度options
    deleteAttrsOptions(index) {
      console.log('deleteAttrsOptions', index)
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除？',
        onOk: () => {
          console.log('CFM deleteAttrsOptions')
          this.attrsDetailsOptions.splice(index, 1)
        }
      })
    },
    deleteAttrs(id) {
      console.log('deleteAttrs', id)
    },
    // 点击'新建栏目'
    addAttrsGroup() {
      this.showModal()
      this.clearAttrsGroupData()
      this.isAttrsGroup = true
      this.modalTitle = '新建栏目'
    },
    // 清空分栏数据
    clearAttrsGroupData() {
      this.attrsGroupId = ''
      this.attrsGroupLabel = ''
      this.attrsGroupIndex = ''
      this.attrsGroupIfHide = false
    },
    // 点击'编辑栏目'
    editAttrsGroup(item) {
      console.log('editAttrsGroup', item)
      this.showModal()
      this.isAttrsGroup = true
      this.modalTitle = '编辑栏目'
      this.attrsGroupLabel = item.label
      this.attrsGroupIndex = item.sort
      this.attrsGroupIfHide = item.hidden
    },
    // 维度分栏隐藏与显现
    displayAttrsGroup(item) {
      console.log('displayAttrsGroup', item)
      this.attrsGroupId = item.id
      /** 发送 栏目隐藏与显现 请求 */
      this.$axios.post('case-attr/group-hidden', { id: this.attrsGroupId }).then(response => {
        if (_.isNull(response)) return
        console.log('栏目隐藏与显现', response)
        // item.hidden = !item.hidden
      })
      item.hidden = !item.hidden
    },
    // 删除维度分栏
    deleteAttrsGroup(item) {
      console.log('deleteAttrsGroup', item)
      this.attrsGroupId = item.id
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除分栏？',
        onOk: this.sendDelateAttrsGroupRequest
      })
    },
    sendDelateAttrsGroupRequest() {
      console.log('sendDelateAttrsGroupRequest')
      this.$axios.post('case-attr/group-del', { id: this.attrsGroupId }).then(response => {
        if (_.isNull(response)) return
        console.log('删除栏目', response)
      })
    },
    // 初始化维度分栏列表
    initAttrsGroupList() {
      console.log('initAttrsGroupList')
      this.$axios.post('case-attr/list', { caseId: this.caseId }).then(response => {
        if (_.isNull(response)) return
        console.log('初始化维度分栏列表', response)
        /** 赋值给 attrListData */
      })
    },
    // 新建维度
    addAttrs() {
      console.log('addAttrs')
      this.isAttrsGroup = false
      this.modalTitle = '新建维度'
      this.showModal()
    },
    // 保存分栏/保存维度更改
    saveAttrsData() {
      this.ifShowLoading = true
      if (this.isAttrsGroup) {
        this.saveAttrsGroup()
      } else {
        this.saveAttrs()
      }
    },
    // 栏目信息保存（新建、修改）
    saveAttrsGroup() {
      const data = {
        id: this.attrsGroupId,
        label: this.attrsGroupLabel,
        sort: this.attrsGroupIndex,
        hidden: this.attrsGroupIfHide
      }
      console.log('saveAttrsGroup', data)
      this.$axios.post('case-attr/group-save', data).then(response => {
        if (_.isNull(response)) return
        console.log('栏目信息保存（新建、修改）', response)
        /** 刷新List */
        this.hideModal()
      })
    },
    saveAttrs() {
      console.log('saveAttrs')
    },
    // 鼠标移入分栏高亮显示编辑
    onEnterAttrs(item) {
      this.hoverAttrId = item.id
    },
    // 鼠标移出分栏取消高亮隐藏编辑
    onLeaveAttrs() {
      this.hoverAttrId = ''
    },
    showModal() {
      this.ifShowModal = true
    },
    hideModal() {
      this.ifShowLoading = false
      this.ifShowModal = false
      _.delay(() => {
        this.isAttrsGroup = false
      }, 500)
    }
  },
  mounted() {
    // this.initAttrsGroupList()
  }
}
</script>
<style lang="css">
.case-attrs .ivu-modal-body {
  min-height: 400px;
}
</style>
