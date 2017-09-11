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
          <div class="attr__item"v-for="(ele, index) in item.attrs" :key="ele.id" @click.stop="editAttrsDetails(ele, item.label, item.editable)">
            <span class="attr__item_rank" :class="ele.required ? 'attr__item_rank-red' : ''">{{index + 1}}</span>
            {{ele.label}}
            <i class="ivu-icon ivu-icon-close-round" @click.stop="deleteAttrsDetails(ele.id)"></i>
          </div>
          <div class="attr__item attr__item-add" style="display: block;" v-show="item.id === hoverAttrId && item.editable" @click.stop="addAttrsDetails(item)">
            <Icon type="plus-circled"></Icon>
          </div>
        </div>
      </div>
      <div class="attrsinfo__card__tool">
        <i class="iconfont icon-xiugai" @click.stop="editAttrsGroup(item)"></i>
        <i class="iconfont icon-shanchu1" @click.stop="deleteAttrsGroup(item)"></i>
        <i class="iconfont" :class="item.hidden ? 'icon-yincang' : 'icon-keshi'" @click.stop="displayAttrsGroup(item)"></i>
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
        <Input placeholder="请输入" v-model="attrsGroupLabel" :maxlength="64"></Input>
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
        <Input placeholder="请输入" v-model="attrsDetailsLabel" :readonly="!attrsEditable"></Input>
      </Form-item>
      <Form-item label="名称序号：">
        <Input placeholder="请输入" v-model="attrsDetailsSort" :readonly="!attrsEditable"></Input>
      </Form-item>
      <Form-item label="填写要求：">
        <Select placeholder="请选择" v-model="attrsDetailsRequire" :disabled="!attrsEditable">
          <Option value="0">选填</Option>
          <Option value="1">必填</Option>
        </Select>
      </Form-item>
      <Form-item label="类型：">
        <Select placeholder="请选择" v-model="attrsDetailsType" :disabled="!attrsEditable">
          <!-- <Option value="text">单行文本框</Option> -->
          <!-- <Option value="textarea">多行文本框</Option> -->
          <Option value="select">单选</Option>
          <Option value="selectbox">多选</Option>
        </Select>
      </Form-item>
      <Form-item label="文本类型：" v-if="attrsDetailsType.indexOf('text') !== -1">
        <Select placeholder="请选择" v-model="attrsDetailsTextType" :disabled="!attrsEditable">
          <Option value="00">文字</Option>
          <Option value="01">数字</Option>
        </Select>
      </Form-item>
      <div v-if="attrsDetailsType.indexOf('select') !== -1">
        <Form-item v-for="(item, index) in attrsDetailsOptions" :key="index" :label="index === 0 ? '详细维度：' : ''">
          <Input placeholder="文本不能超过20个字符" :value="item" :readonly="true" :maxlength="20"></Input>
          <i class="add-detail-attrs ivu-icon ivu-icon-minus-circled" @click.stop="attrsEditable ? deleteAttrsOptions(index) : ''"></i>
        </Form-item>
        <Form-item :label="attrsDetailsOptions.length === 0 ? '详细维度：' : ''" v-show="attrsEditable">
          <Input placeholder="文本不能超过20个字符" v-model="attrsDetailsOptionsText" :maxlength="20"></Input>
          <i class="add-detail-attrs ivu-icon ivu-icon-plus-circled" @click.stop="attrsEditable ? addAttrsOptions() : ''"></i>
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
      attrsDetailsId: '', // 详细维度id
      attrsDetailsLabel: '', // 详细维度名称
      attrsDetailsSort: '', // 详细维度序号
      attrsDetailsRequire: '', // 详细维度是否必填
      attrsDetailsType: '', // 详细维度类型(文本, 选择)
      attrsDetailsTextType: '', // 详细维度文本类型
      attrsDetailsConfig: {}, // 详细维度文本config
      attrsDetailsOptions: [], // 详细维度选择项
      attrsDetailsOptionsText: '', // 详细维度新建选择项
      ifNew: false, // 新建还是编辑
      backupData: {}
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  mounted() {
    this.refreshData()
  },
  methods: {
    /** 维度分栏(AttrsGroup) */

    // 初始化维度分栏列表
    initAttrsGroupList() {
      // console.log('initAttrsGroupList')
      this.$axios.post('case-attr/list', { caseId: this.caseId }).then(response => {
        if (_.isNull(response)) return
        // console.log('初始化维度分栏列表', response)
        const responseData = response.data
        this.attrListData = responseData
      })
    },
    // 点击'新建栏目'
    addAttrsGroup() {
      this.showModal()
      this.clearAttrsGroupData()
      this.isAttrsGroup = true
      this.ifNew = true
      this.modalTitle = '新建栏目'
    },
    // 保存分栏/保存维度更改
    saveAttrsData() {
      if (!this.attrsEditable) { // 不可编辑的详细维度
        this.hideModal()
        return
      }
      this.ifShowLoading = true
      if (this.isAttrsGroup) {
        this.saveAttrsGroup()
      } else {
        this.saveAttrsDetails()
      }
    },
    // 验证维度分栏的data
    verifyAttrsGroupData() {
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

      const requestData = {
        caseId: this.caseId,
        id: this.attrsGroupId,
        label: this.attrsGroupLabel,
        sort: this.attrsGroupIndex,
        hidden: this.attrsGroupIfHide
      }

      // 判断是新建还是编辑
      if (this.ifNew) {
        return requestData
      } else {
        // 和备份数据做比较, 如果一样则表示没有改动, 返回false
        return _.isMatch(requestData, this.backupData) ? false : requestData
      }
    },
    // 栏目信息保存（新建、修改）
    saveAttrsGroup() {
      const requestData = this.verifyAttrsGroupData()
      if (!requestData) {
        this.hideModal()
        return
      }
      console.log('saveAttrsGroup', requestData)
      this.$axios.post('case-attr/group-save', requestData).then(response => {
        if (_.isNull(response)) return
        console.log('栏目信息保存（新建、修改）', response)
        // 刷新List
        this.refreshData()
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
        item.hidden = !item.hidden
      })
    },
    // 点击'编辑栏目'
    editAttrsGroup(item) {
      console.log('editAttrsGroup', item)
      this.showModal()
      this.isAttrsGroup = true
      this.ifNew = false
      this.modalTitle = `${item.label} - 编辑栏目`
      this.attrsGroupId = item.id
      this.attrsGroupLabel = item.label
      this.attrsGroupIndex = item.sort
      this.attrsGroupIfHide = item.hidden

      // 备份数据
      this.backupData = {
        id: item.id,
        label: item.label,
        sort: item.sort,
        hidden: item.hidden
      }
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
        this.refreshData()
      })
    },

    /** 详细维度(AttrsDetails) */

    // 点击'新建维度'
    addAttrsDetails(group) {
      console.log('addAttrsDetails', 'groupLabel:', group.label, 'groupId:', group.id)
      this.isAttrsGroup = false
      this.ifNew = true
      this.attrsEditable = true
      this.modalTitle = `${group.label} - 新建维度`
      this.attrsGroupId = group.id
      this.clearAttrsDetailsData()
      this.showModal()
    },
    // 验证维度详情的data
    verifyAttrsDetailsData() {
      if (this.attrsDetailsLabel === '') {
        this.$store.commit('showErrorMsg', '请输入维度名称')
        return
      } else if (this.attrsDetailsSort === '') {
        this.$store.commit('showErrorMsg', '请输入名称序号')
        return
      } else if (!_.isFinite(parseInt(this.attrsDetailsSort))) {
        this.$store.commit('showErrorMsg', '名称序号请输入数字')
        return
      } else if (this.attrsDetailsRequire === '') {
        this.$store.commit('showErrorMsg', '请选择填写要求')
        return
      } else if (this.attrsDetailsType === '') {
        this.$store.commit('showErrorMsg', '请选择类型')
        return
      }
      if (this.attrsDetailsType.indexOf('text') !== -1) {
        if (this.attrsDetailsTextType === '') {
          this.$store.commit('showErrorMsg', '请选择文本类型')
          return
        }
      } else {
        if (_.isEmpty(this.attrsDetailsOptions)) {
          this.$store.commit('showErrorMsg', '请填写详细维度')
          return
        }
      }
      const requestData = {
        id: this.attrsDetailsId,
        groupId: this.attrsGroupId,
        label: this.attrsDetailsLabel,
        sort: this.attrsDetailsSort,
        required: this.attrsDetailsRequire,
        type: this.attrsDetailsType
      }

      if (this.attrsDetailsType.indexOf('text') !== -1) { // 维度类型为文本
        if (this.attrsDetailsTextType !== '') {
          requestData['config.textType'] = this.attrsDetailsTextType
        }
      } else { // 维度类型为选择
        if (!_.isEmpty(this.attrsDetailsOptions)) {
          _.each(this.attrsDetailsOptions, (ele, index) => {
            requestData[`options[${index}]`] = ele
          })
        }
      }
      console.log('详细维度保存', requestData)

      // 判断是新建还是编辑
      if (this.ifNew) {
        return requestData
      } else {
        // 和备份数据做比较, 如果一样则表示没有改动, 返回false
        return _.isEqual(this.backupData, requestData) ? false : requestData
      }
    },
    // 详细维度保存（新建、修改）
    saveAttrsDetails() {
      const requestData = this.verifyAttrsDetailsData()
      console.log('详细维度保存（新建、修改）requestData', requestData)

      if (!requestData) {
        // 编辑状态下点击'完成', 没有更改则隐藏modal
        if (this.ifNew) return
        // if (!this.ifNew) {
        // }
        this.hideModal()
        return
      }

      this.$axios.post('case-attr/save', requestData).then(response => {
        if (_.isNull(response)) return
        // console.log('详细维度保存（新建、修改）', response)
        // 刷新List
        this.refreshData()
        this.hideModal()
      })
    },
    // 点击编辑详细维度
    editAttrsDetails(ele, groupLabel, flag) {
      console.log('editAttrsDetails', ele)
      this.showModal()
      this.ifNew = false
      this.modalTitle = `${groupLabel} - ${ele.label}`
      this.attrsEditable = flag
      this.clearAttrsDetailsData()
      this.getAttrsDetailsInfo(ele)
    },
    // 查看获取详细维度数据
    getAttrsDetailsInfo(ele) {
      this.attrsGroupId = ele.groupId
      this.attrsDetailsId = ele.id
      this.attrsDetailsLabel = ele.label
      this.attrsDetailsSort = ele.sort
      this.attrsDetailsRequire = ele.required ? '1' : '0'
      this.attrsDetailsType = ele.type

      if (ele.type.indexOf('text') !== -1) {
        if (ele.config) {
          this.attrsDetailsConfig = ele.config
          this.attrsDetailsTextType = ele.config.textType
          this.backupData['config.textType'] = ele.config.textType
        }
      } else {
        if (ele.options) {
          this.attrsDetailsOptions = ele.options
          _.each(ele.options, (ele, index) => {
            this.backupData[`options[${index}]`] = ele
          })
        }
      }

      // 备份数据
      const backupData = {
        id: ele.id,
        groupId: ele.groupId,
        label: ele.label,
        sort: ele.sort,
        required: ele.required ? '1' : '0',
        type: ele.type
      }
      this.backupData = _.merge(this.backupData, backupData)
    },
    // 添加详细维度options
    addAttrsOptions() {
      console.log('addAttrsOptions')
      if (this.attrsDetailsOptionsText === '') return
      this.attrsDetailsOptions.push(this.attrsDetailsOptionsText)
      this.attrsDetailsOptionsText = ''
    },
    // 删除详细维度
    deleteAttrsDetails(id) {
      console.log('deleteAttrsDetails', id)
      this.attrsDetailsId = id
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除？',
        onOk: this.sendDeleteAttrsDetailsRequest
      })
    },
    sendDeleteAttrsDetailsRequest() {
      console.log('CFM deleteAttrsDetails', this.attrsDetailsId)
      this.$axios.post('case-attr/del', { id: this.attrsDetailsId }).then(response => {
        if (_.isNull(response)) return
        console.log('删除详细维度', response)
        this.refreshData()
      })
    },
    // 删除详细维度的options
    deleteAttrsOptions(index) {
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除？',
        onOk: () => {
          console.log('CFM deleteAttrsOptions', index)
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
      this.backupData = {}
    },
    // 清空详细维度数据
    clearAttrsDetailsData() {
      this.attrsDetailsId = ''
      this.attrsDetailsLabel = ''
      this.attrsDetailsSort = ''
      this.attrsDetailsRequire = ''
      this.attrsDetailsType = ''
      this.attrsDetailsConfig = {}
      this.attrsDetailsTextType = ''
      this.attrsDetailsOptions = []
      this.attrsDetailsOptionsText = ''
      this.backupData = {}
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
  }
}
</script>
<style lang="css">
.case-attrs .ivu-modal-body {
    min-height: 400px;
}
</style>
