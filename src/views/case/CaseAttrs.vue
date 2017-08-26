<template>
<div>
  <a href="javascript:;" class="case-add-btn" @click="addAttrs">新建分栏</a>
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
        <i class="iconfont icon-xiugai" @click="showModal(item)"></i>
        <i class="iconfont icon-shanchu1"></i>
        <i class="iconfont icon-yincang"></i>
      </div>
    </div>
  </div>
  <Modal
    v-model="ifShowModal"
    :closable="false"
    :mask-closable="false"
    width="560">
    <p slot="header">{{modalTitle}}</p>
    <Form :label-width="120" class="modal-form" v-if="ifAddAttrs">
      <Form-item label="栏目名称：">
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
        }
      ],
      ifAddAttrs: false,
      ifShowModal: false,
      modalTitle: ''
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  methods: {
    // 点击'新建栏目'
    addAttrs() {
      this.showModal()
      this.ifAddAttrs = true
      this.modalTitle = '新建栏目'
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
        this.ifAddAttrs = false
      }, 500)
    }
  },
  mounted() {
    console.log('caseId', this.caseId)
  }
}
</script>
<style lang="css">
</style>
