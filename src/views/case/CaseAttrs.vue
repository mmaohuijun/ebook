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
          <div class="attr__item"v-for="(ele, index) in item.attrs" :key="ele.id" @click.stop="editAttrsDetails(ele, item.editable)">
            <span class="attr__item_rank" :class="ele.required ? 'attr__item_rank-red' : ''">{{index + 1}}</span>
            {{ele.label}}
            <!-- <Icon type="close-round"></Icon> -->
            <i class="ivu-icon ivu-icon-close-round" @click.stop="deleteAttrsDetails(ele.id)"></i>
          </div>
          <div class="attr__item attr__item-add" v-show="item.id === hoverAttrId && item.editable" @click.stop="addAttrsDetails(item)">
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
        <Input placeholder="请输入" v-model="attrsGroupLabel"></Input>
      </Form-item>
      <Form-item label="名称序号：">
        <Input placeholder="请输入(数字)" v-model="attrsGroupIndex"></Input>
      </Form-item>
      <Form-item label="是否隐藏：">
        <i-switch v-model="attrsGroupIfHide"></i-switch>
      </Form-item>
    </Form>
    <Form :label-width="120" class="modal-form" v-else>
      <Form-item label="维度名称：">
        <Input placeholder="请输入" v-model="attrsLabel"></Input>
      </Form-item>
      <Form-item label="名称序号：">
        <Input placeholder="请输入" v-model="attrsSort"></Input>
      </Form-item>
      <Form-item label="填写要求：">
        <Select placeholder="请选择" v-model="attrsRequire">
          <Option value="0">选填</Option>
          <Option value="1">必填</Option>
        </Select>
      </Form-item>
      <Form-item label="类型：">
        <Select placeholder="请选择" v-model="attrsType">
          <Option value="text">单行文本框</Option>
          <Option value="textarea">多行文本框</Option>
          <Option value="select">单选</Option>
          <Option value="selectbox">多选</Option>
        </Select>
      </Form-item>
      <Form-item label="文本类型：" v-if="attrsType.indexOf('text') !== -1">
        <Select placeholder="请选择" v-model="attrsTextType">
          <Option value="纯文字">纯文字</Option>
          <Option value="纯数字">纯数字</Option>
        </Select>
      </Form-item>
      <div v-if="attrsType.indexOf('select') !== -1">
        <Form-item v-for="(item, index) in attrsDetailsOptions" :key="index" :label="index === 0 ? '详细维度：' : ''">
          <Input placeholder="文本不能超过20个字符" :value="item"></Input>
          <i class="add-detail-attrs ivu-icon ivu-icon-minus-circled" @click.stop="deleteAttrsOptions(index)"></i>
        </Form-item>
        <Form-item :label="attrsDetailsOptions.length === 0 ? '详细维度：' : ''" v-show="attrsEditable">
          <Input placeholder="文本不能超过20个字符" v-model="attrsOptionsText"></Input>
          <i class="add-detail-attrs ivu-icon ivu-icon-plus-circled" @click.stop="addAttrsOptions()"></i> 
        </Form-item>
      </div>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click.stop="hideModal">取消</Button>
      <Button type="primary" size="large" @click.stop="saveAttrsData" :disabled="!attrsEditable">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'CaseAttrs',
  data() {
    return {
      attrListData: [], // 数据列表
      hoverAttrId: '',
      ifShowModal: false,
      ifShowLoading: false,
      isAttrsGroup: false, // 是否打开维度分栏(AttrsGroup)
      attrsEditable: true,
      modalTitle: '',
      attrsGroupId: '', // 维度分栏id
      attrsGroupLabel: '', // 维度分栏名称
      attrsGroupIndex: '', // 维度分栏序号
      attrsGroupIfHide: false, // 维度分栏是否隐藏
      attrsId: '', // 详细维度id
      attrsLabel: '', // 详细维度名称
      attrsSort: '', // 详细维度序号
      attrsRequire: '', // 详细维度是否必填
      attrsType: '', // 详细维度类型(文本, 选择)
      attrsTextType: '', // 详细维度文本类型
      attrsConfig: {}, // 详细维度文本config
      attrsDetailsOptions: [], // 详细维度选择项
      attrsOptionsText: '' // 详细维度新建选择项
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  methods: {
    /** 维度分栏(AttrsGroup) */

    // 初始化维度分栏列表
    initAttrsGroupList() {
      console.log('initAttrsGroupList')
      this.$axios.post('case-attr/list', { caseId: this.caseId }).then(response => {
        if (_.isNull(response)) return
        console.log('初始化维度分栏列表', response)
        const responseData = response.data
        this.attrListData = responseData
      })
    },
    // 点击'新建栏目'
    addAttrsGroup() {
      this.showModal()
      this.clearAttrsGroupData()
      this.isAttrsGroup = true
      this.modalTitle = '新建栏目'
    },
    // 保存分栏/保存维度更改
    saveAttrsData() {
      this.ifShowLoading = true
      if (this.isAttrsGroup) {
        this.saveAttrsGroup()
      } else {
        this.saveAttrsDetails()
      }
    },
    // 栏目信息保存（新建、修改）
    saveAttrsGroup() {
      if (this.attrsGroupLabel === '') {
        this.$store.commit('showErrorMsg', '请输入栏目名称')
        return
      } else if (this.attrsGroupIndex === '') {
        this.$store.commit('showErrorMsg', '请输入名称序号')
        return
      } else if (!_.isFinite(parseInt(this.attrsGroupIndex))) {
        this.$store.commit('showErrorMsg', '名称序号请输入数字')
        return
      }
      const data = {
        caseId: this.caseId,
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
    // 点击'编辑栏目'
    editAttrsGroup(item) {
      console.log('editAttrsGroup', item)
      this.showModal()
      this.isAttrsGroup = true
      this.modalTitle = `${item.label} - 编辑栏目`
      this.attrsGroupLabel = item.label
      this.attrsGroupIndex = item.sort
      this.attrsGroupIfHide = item.hidden
    },
    // 删除维度分栏
    deleteAttrsGroup(item) {
      console.log('deleteAttrsGroup', item)
      this.attrsGroupId = item.id
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除分栏？',
        onOk: this.sendDeleteAttrsGroupRequest
      })
    },
    sendDeleteAttrsGroupRequest() {
      console.log('sendDeleteAttrsGroupRequest')
      this.$axios.post('case-attr/group-del', { id: this.attrsGroupId }).then(response => {
        if (_.isNull(response)) return
        console.log('删除栏目', response)
      })
    },

    /** 详细维度(AttrsDetails) */

    // 点击'新建维度'
    addAttrsDetails(item) {
      console.log('addAttrsDetails')
      this.isAttrsGroup = false
      this.attrsEditable = true
      this.modalTitle = `${item.label} - 新建维度`
      this.attrsGroupId = item.id
      this.clearAttrsDetailsData()
      this.showModal()
    },
    // 详细维度保存（新建、修改）
    saveAttrsDetails() {
      const data = {
        id: this.attrsId,
        groupId: this.attrsGroupId,
        label: this.attrsLabel,
        sort: this.attrsSort,
        required: this.attrsRequire,
        type: this.attrsType
      }
      if (this.attrsTextType !== '') {
        data['config.textType'] = this.attrsTextType
      }
      if (!_.isEmpty(this.attrsDetailsOptions)) {
        _.each(this.attrsDetailsOptions, (ele, index) => {
          data[`options[${index}]`] = ele
        })
      }
      console.log('saveAttrs', data)
    },
    // 点击编辑详细维度
    editAttrsDetails(ele, flag) {
      console.log('editAttrsDetails', ele)
      this.showModal()
      this.modalTitle = `${ele.label} - 维度编辑`
      this.attrsEditable = flag
      console.log('attrsEditable', this.attrsEditable)
      this.clearAttrsDetailsData()
      this.getAttrsDetailsInfo(ele)
    },
    // 查看获取详细维度数据
    getAttrsDetailsInfo(ele) {
      this.attrsId = ele.id
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
    // 添加详细维度options
    addAttrsOptions() {
      console.log('addAttrsOptions')
      if (this.attrsOptionsText === '') return
      this.attrsDetailsOptions.push(this.attrsOptionsText)
      this.attrsOptionsText = ''
    },
    // 删除详细维度
    deleteAttrsDetails(id) {
      console.log('deleteAttrsDetails', id)
      this.attrsId = id
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除？',
        onOk: this.sendDeleteAttrsDetailsRequest
      })
    },
    sendDeleteAttrsDetailsRequest() {
      console.log('CFM deleteAttrsDetails', this.attrsId)
      this.$axios.post('case-attr/del', { id: this.attrsId }).then(response => {
        if (_.isNull(response)) return
        console.log('删除详细维度', response)
        this.refreshData()
      })
    },
    // 删除详细维度的options
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
    refreshData() {
      this.clearAttrsGroupData()
      this.clearAttrsDetailsData()
      this.initAttrsGroupList()
    },
    // 清空分栏数据
    clearAttrsGroupData() {
      this.attrsEditable = true
      this.attrsGroupId = ''
      this.attrsGroupLabel = ''
      this.attrsGroupIndex = ''
      this.attrsGroupIfHide = false
    },
    // 清空详细维度数据
    clearAttrsDetailsData() {
      this.attrsLabel = ''
      this.attrsSort = ''
      this.attrsRequire = ''
      this.attrsType = ''
      this.attrsConfig = {}
      this.attrsTextType = ''
      this.attrsDetailsOptions = []
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
    this.initAttrsGroupList()
  }
}
</script>
<style lang="css">
.case-attrs .ivu-modal-body {
    min-height: 400px; 
}
</style>
