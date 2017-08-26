<template>
<div>
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
          <div class="attr__item"v-for="(ele, index) in item.attrs" :key="ele.id">
            <span class="attr__item_rank" :class="ele.required ? 'attr__item_rank-red' : ''">{{index + 1}}</span>{{ele.label}}
            <Icon type="close-round"></Icon>
          </div>
          <div class="attr__item attr__item-add" v-show="item.id === hoverAttrId && item.editable"><Icon type="plus-circled"></Icon></div>
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
    width="560">
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
        <Input placeholder="请输入..."></Input>
      </Form-item>
      <Form-item label="名称序号：">
        <Input placeholder="请输入..."></Input>
      </Form-item>
      <Form-item label="填写要求：">
        <Select placeholder="请选择">
          <Option value="beijing">选填</Option>
          <Option value="shanghai">必填</Option>
        </Select>
      </Form-item>
      <Form-item label="类型：">
        <Select placeholder="请选择">
          <Option value="beijing">文本框</Option>
          <Option value="shanghai">下拉框</Option>
        </Select>
      </Form-item>
      <Form-item label="文本类型：">
        <Select placeholder="请选择">
          <Option value="beijing">纯文字</Option>
          <Option value="shanghai">纯数字</Option>
        </Select>
      </Form-item>
      <Form-item label="详细维度：">
        <Input placeholder="文本不能超过20个字符"></Input>
        <Icon type="minus-circled" class="add-detail-attrs"></Icon>
      </Form-item>
      <Form-item>
        <Input placeholder="文本不能超过20个字符"></Input>
        <Icon type="minus-circled" class="add-detail-attrs"></Icon>
      </Form-item>
      <Form-item>
        <Input placeholder="文本不能超过20个字符"></Input>
        <Icon type="plus-circled" class="add-detail-attrs"></Icon>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="hideModal">取消</Button>
      <Button type="primary" size="large">完成</Button>
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
              name: 'XXXX',
              label: '姓名',
              required: true
            },
            {
              id: '22',
              name: 'XXXX',
              label: '性别',
              required: true
            },
            {
              id: '23',
              name: 'XXXX',
              label: '年龄段',
              required: true
            },
            {
              id: '24',
              name: 'XXXX',
              label: '联系方式',
              required: true
            },
            {
              id: '25',
              name: 'XXXX',
              label: '意向楼盘',
              required: true
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
              required: true
            },
            {
              id: '32',
              name: 'XXXX',
              label: '关注因素',
              required: false
            },
            {
              id: '33',
              name: 'XXXX',
              label: '购房预算',
              required: false
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
              required: true
            },
            {
              id: '42',
              name: 'XXXX',
              label: '行业',
              required: true
            },
            {
              id: '43',
              name: 'XXXX',
              label: '收入',
              required: false
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
              required: true
            },
            {
              id: '52',
              name: 'XXXX',
              label: '家庭总收入',
              required: false
            }
          ]
        }
      ],
      isAttrsGroup: false, // 是否打开维度分栏Modal
      ifShowModal: false,
      modalTitle: '',
      attrsGroupId: '', // 维度分栏id
      attrsGroupLabel: '', // 维度分栏名称
      attrsGroupIndex: '', // 维度分栏序号
      attrsGroupIfHide: false // 维度分栏是否隐藏
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  methods: {
    // 点击'新建栏目'
    addAttrsGroup() {
      this.showModal()
      this.isAttrsGroup = true
      this.modalTitle = '新建栏目'
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
    deleteAttrsGroup(item) {
      console.log('deleteAttrsGroup', item)
      this.attrsGroupId = item.id
      this.$Modal.confirm({
        // title: '温馨提示',
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
      this.$axios.post('case-attr/list', { caseId: this.caseId }).then(response => {
        if (_.isNull(response)) return
        console.log('初始化维度分栏列表', response)
        /** 赋值给 attrListData */
      })
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
      this.ifShowModal = false
      _.delay(() => {
        this.isAttrsGroup = false
      }, 500)
    }
  },
  mounted() {
    console.log('caseId', this.caseId)
    this.initAttrsGroupList()
  }
}
</script>
<style lang="css">
</style>
