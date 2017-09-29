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
    v-model="attrsGroupModal"
    :closable="false"
    :mask-closable="false"
    :loading="ifShowLoading"
    width="560"
    class-name="case-attrs">
      <p slot="header">{{modalTitle}}</p>
      <Form ref="attrsGroup" :model="attrsGroup" :rules="attrsGroupRules" :label-width="120" class="modal-form">
        <Form-item label="栏目名称：" prop="label">
          <Input v-model="attrsGroup.label" placeholder="请输入栏目名称" :maxlength="64"></Input>
        </Form-item>
        <Form-item label="名称序号：" prop="sort">
          <Input v-model="attrsGroup.sort" placeholder="请输入名称序号(数字)" :maxlength="5"></Input>
        </Form-item>
        <Form-item label="是否隐藏：" prop="ifHide">
          <i-switch v-model="attrsGroup.ifHide"></i-switch>
        </Form-item>
      </Form>
     <div slot="footer">
      <Button type="text" size="large" @click.stop="hideModal">取消</Button>
      <Button type="primary" size="large" @click.stop="saveAttrsData('attrsGroup')">完成</Button>
    </div>
  </Modal>

    <Modal
    v-model="attrsDetailsModal"
    :closable="false"
    :mask-closable="false"
    :loading="ifShowLoading"
    width="560"
    class-name="case-attrs">
      <p slot="header">{{modalTitle}}</p>
      <Form ref="attrsDetails" :model="attrsDetails" :rules="attrsDetailsRules" :label-width="120" class="modal-form">
        <Form-item label="维度名称：" prop="label">
          <Input placeholder="请输入维度名称" v-model="attrsDetails.label" :readonly="!attrsEditable" :maxlength="64"></Input>
        </Form-item>
        <Form-item label="名称序号：" prop="sort">
          <Input placeholder="请输入维度序号" v-model="attrsDetails.sort" :readonly="!attrsEditable" :maxlength="5"></Input>
        </Form-item>
        <Form-item label="填写要求：" prop="require">
          <Select placeholder="请选择填写要求" v-model="attrsDetails.require" :disabled="!attrsEditable">
            <Option value="0">选填</Option>
            <Option value="1">必填</Option>
          </Select>
        </Form-item>
        <Form-item label="类型：" prop="type">
          <Select placeholder="请选择类型" v-model="attrsDetails.type" :disabled="!attrsEditable">
            <Option v-if="!attrsEditable" value="text">单行文本框</Option>
            <Option v-if="!attrsEditable" value="textarea">多行文本框</Option>
            <Option value="select">单选</Option>
            <Option value="selectbox">多选</Option>
          </Select>
        </Form-item>
        <Form-item label="文本类型：" v-if="attrsDetails.type.indexOf('text') !== -1" prop="textType">
          <Select placeholder="请选择文本类型" v-model="attrsDetails.textType" :disabled="!attrsEditable">
            <Option value="00">文字</Option>
            <Option value="01">数字</Option>
          </Select>
        </Form-item>
        <div v-if="attrsDetails.type.indexOf('select') !== -1">
          <Form-item v-for="(item, index) in attrsDetails.options" :key="index" :label="index === 0 ? '详细维度：' : ''">
            <Input placeholder="文本不能超过20个字符" :value="item" :readonly="true" :maxlength="20"></Input>
            <i class="add-detail-attrs ivu-icon ivu-icon-minus-circled" v-if="attrsEditable" @click.stop="attrsEditable ? deleteAttrsOptions(index) : ''"></i>
          </Form-item>
          <Form-item :label="attrsDetails.options.length === 0 ? '详细维度：' : ''" v-show="attrsEditable" prop="optionsText">
            <Input placeholder="文本不能超过20个字符" v-model="attrsDetails.optionsText" :maxlength="20"></Input>
            <i class="add-detail-attrs ivu-icon ivu-icon-plus-circled" @click.stop="attrsEditable ? addAttrsOptions() : ''"></i>
          </Form-item>
        </div>
      </Form>
     <div slot="footer">
      <Button type="text" size="large" @click.stop="hideModal">取消</Button>
      <Button type="primary" size="large" @click.stop="saveAttrsData('attrsDetails')">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
export default {
  name: 'CaseAttrs',
  data() {
    const validateNumber = (rule, value, callback) => {
      if (!_.isFinite(parseInt(value))) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    const validateOptions = (rule, value, callback) => {
      if (_.isEmpty(this.attrsDetails.options)) {
        callback(new Error('请填写详细维度'))
      } else {
        callback()
      }
    }
    return {
      attrsDetailsModal: false,
      attrsGroupModal: false,
      attrListData: [], // 数据列表
      hoverAttrId: '',
      ifShowLoading: false,
      attrsEditable: true,
      modalTitle: '',
      attrsGroup: {
        id: '', // 维度分栏id
        label: '', // 维度分栏名称
        sort: 0, // 维度分栏序号
        ifHide: false // 维度分栏是否隐藏
      },
      attrsDetails: {
        id: '', // 详细维度id
        label: '', // 详细维度名称
        sort: 0, // 详细维度序号
        require: '', // 详细维度是否必填
        type: '', // 详细维度类型(文本, 选择)
        textType: '', // 详细维度文本类型
        config: {}, // 详细维度文本config
        options: [], // 详细维度选择项
        optionsText: '' // 详细维度新建选择项
      },
      ifNew: false, // 新建还是编辑
      backupData: {},
      attrsGroupRules: {
        label: [{ required: true, message: '请输入栏目名称', trigger: 'blur' }],
        sort: [
          { required: true, message: '请输入栏目序号', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ]
      },
      attrsDetailsRules: {
        label: [{ required: true, message: '请输入维度名称', trigger: 'blur' }],
        sort: [
          { required: true, message: '请输入维度序号', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        require: [{ required: true, message: '请选择填写要求', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        textType: [{ required: true, message: '请选择文本类型', trigger: 'blur' }],
        optionsText: [{ validator: validateOptions, trigger: 'blur' }]
      }
    }
  },
  computed: {
    caseId() {
      return this.$store.getters.caseId
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
      this.showAttrsGroupModal()
      this.clearAttrsGroupData()
      this.ifNew = true
      this.modalTitle = '新建栏目'
    },
    // 保存分栏/保存维度更改
    saveAttrsData(name) {
      if (!this.attrsEditable) { // 不可编辑的详细维度
        this.hideModal()
        return
      }
      console.log('this.attrsGroup.index', typeof this.attrsGroup.sort, this.attrsGroup.sort)
      this.ifShowLoading = true
      if (name === 'attrsGroup') {
        this.saveAttrsGroup()
      } else if (name === 'attrsDetails') {
        this.saveAttrsDetails()
      }
    },
    // 验证维度分栏的data
    verifyAttrsGroupData() {
      const requestData = {
        caseId: this.caseId,
        id: this.attrsGroup.id,
        label: this.attrsGroup.label,
        sort: this.attrsGroup.sort,
        hidden: this.attrsGroup.ifHide
      }

      // 验证标识
      let vFlag = false

      this.$refs.attrsGroup.validate(flag => {
        console.log('attrsGroup validate', flag, this.attrsGroup.sort)
        vFlag = flag
      })

      // 编辑状态下点击'完成', 没有更改则隐藏modal
      if (vFlag && !this.ifNew) {
        this.hideModal()
      }
      // 和备份数据做比较, 如果一样则表示没有改动, 返回false
      return _.isMatch(requestData, this.backupData) || !vFlag ? false : requestData
    },
    // 栏目信息保存（新建、修改）
    saveAttrsGroup() {
      const requestData = this.verifyAttrsGroupData()
      if (!requestData) return

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
      this.attrsGroup.id = item.id
      /** 发送 栏目隐藏与显现 请求 */
      this.$axios.post('case-attr/group-hidden', { id: this.attrsGroup.id }).then(response => {
        if (_.isNull(response)) return
        console.log('栏目隐藏与显现', response)
        item.hidden = !item.hidden
      })
    },
    // 点击'编辑栏目'
    editAttrsGroup(item) {
      console.log('editAttrsGroup', item)
      this.showAttrsGroupModal()
      this.ifNew = false
      this.modalTitle = `${item.label} - 编辑栏目`
      this.attrsGroup.id = item.id
      this.attrsGroup.label = item.label
      this.attrsGroup.sort = String(item.sort)
      this.attrsGroup.ifHide = item.hidden
      console.log('typeof item.sort', typeof item.sort)
      console.log('typeof this.attrsGroup.sort', typeof this.attrsGroup.sort)
      // 备份数据
      this.backupData = {
        id: item.id,
        label: item.label,
        sort: String(item.sort),
        hidden: item.hidden
      }
    },
    // 删除维度分栏
    deleteAttrsGroup(item) {
      console.log('deleteAttrsGroup', item)
      this.attrsGroup.id = item.id
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除分栏？',
        onOk: this.sendDeleteAttrsGroupRequest
      })
    },
    sendDeleteAttrsGroupRequest() {
      console.log('sendDeleteAttrsGroupRequest')
      this.$axios.post('case-attr/group-del', { id: this.attrsGroup.id }).then(response => {
        if (_.isNull(response)) return
        console.log('删除栏目', response)
        this.$Message.success({
          content: response.retMsg,
          duration: 3
        })
        this.refreshData()
      })
    },

    /** 详细维度(AttrsDetails) */

    // 点击'新建维度'
    addAttrsDetails(group) {
      console.log('addAttrsDetails', 'groupLabel:', group.label, 'groupId:', group.id)
      this.ifNew = true
      this.attrsEditable = true
      this.modalTitle = `${group.label} - 新建维度`
      this.attrsGroup.id = group.id
      this.clearAttrsDetailsData()
      this.showAttrsDetailsModal()
    },
    // 验证维度详情的data
    verifyAttrsDetailsData() {
      const requestData = {
        id: this.attrsDetails.id,
        groupId: this.attrsGroup.id,
        label: this.attrsDetails.label,
        sort: this.attrsDetails.sort,
        required: this.attrsDetails.require,
        type: this.attrsDetails.type
      }

      if (this.attrsDetails.type.indexOf('text') !== -1) { // 维度类型为文本
        if (this.attrsDetails.textType !== '') {
          requestData['config.textType'] = this.attrsDetails.textType
        }
      } else { // 维度类型为选择
        if (!_.isEmpty(this.attrsDetails.options)) {
          _.each(this.attrsDetails.options, (ele, index) => {
            requestData[`options[${index}]`] = ele
          })
        }
      }

      let vFlag = false
      this.$refs.attrsDetails.validate(flag => {
        vFlag = flag
      })

      // 编辑状态下点击'完成', 没有更改则隐藏modal
      if (vFlag && !this.ifNew) {
        this.hideModal()
      }

      // 和备份数据做比较, 如果一样则表示没有改动, 返回false
      return _.isMatch(requestData, this.backupData) || !vFlag ? false : requestData
    },
    // 详细维度保存（新建、修改）
    saveAttrsDetails() {
      const requestData = this.verifyAttrsDetailsData()
      console.log('详细维度保存（新建、修改）requestData', requestData)

      if (!requestData) return

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
      this.showAttrsDetailsModal()
      this.ifNew = false
      this.modalTitle = `${groupLabel} - ${ele.label}`
      this.attrsEditable = flag
      this.clearAttrsDetailsData()
      this.getAttrsDetailsInfo(ele)
    },
    // 查看获取详细维度数据
    getAttrsDetailsInfo(ele) {
      this.attrsGroup.id = ele.groupId
      this.attrsDetails.id = ele.id
      this.attrsDetails.label = ele.label
      this.attrsDetails.sort = String(ele.sort)
      this.attrsDetails.require = ele.required ? '1' : '0'
      this.attrsDetails.type = ele.type

      if (ele.type.indexOf('text') !== -1) {
        if (ele.config) {
          this.attrsDetails.config = ele.config
          this.attrsDetails.textType = ele.config.textType
          this.backupData['config.textType'] = ele.config.textType
        }
      } else {
        if (ele.options) {
          this.attrsDetails.options = ele.options
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
        sort: String(ele.sort),
        required: ele.required ? '1' : '0',
        type: ele.type
      }
      this.backupData = _.merge(this.backupData, backupData)
    },
    // 添加详细维度options
    addAttrsOptions() {
      console.log('addAttrsOptions')
      if (_.trim(this.attrsDetails.optionsText) === '') return
      this.attrsDetails.options.push(this.attrsDetails.optionsText)
      this.attrsDetails.optionsText = ''
    },
    // 删除详细维度
    deleteAttrsDetails(id) {
      console.log('deleteAttrsDetails', id)
      this.attrsDetails.id = id
      this.$Modal.confirm({
        content: '此操作不可恢复，确认删除？',
        onOk: this.sendDeleteAttrsDetailsRequest
      })
    },
    sendDeleteAttrsDetailsRequest() {
      console.log('CFM deleteAttrsDetails', this.attrsDetails.id)
      this.$axios.post('case-attr/del', { id: this.attrsDetails.id }).then(response => {
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
          this.attrsDetails.options.splice(index, 1)
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
      this.attrsGroup.id = ''
      this.attrsGroup.label = ''
      this.attrsGroup.sort = 0
      this.attrsGroup.ifHide = false
      this.backupData = {}
    },
    // 清空详细维度数据
    clearAttrsDetailsData() {
      this.attrsDetails.id = ''
      this.attrsDetails.label = ''
      this.attrsDetails.sort = ''
      this.attrsDetails.require = ''
      this.attrsDetails.type = ''
      this.attrsDetails.config = {}
      this.attrsDetails.textType = ''
      this.attrsDetails.options = []
      this.attrsDetails.optionsText = ''
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
    showAttrsGroupModal() {
      this.attrsGroupModal = true
    },
    showAttrsDetailsModal() {
      this.attrsDetailsModal = true
    },
    hideModal() {
      this.ifShowLoading = false
      this.attrsDetailsModal = false
      this.attrsGroupModal = false
      // 清空规则提示
      this.$refs.attrsGroup.resetFields()
      this.$refs.attrsDetails.resetFields()
    }
  }
}
</script>
<style lang="css">
.case-attrs .ivu-modal-body {
    min-height: 400px;
}
</style>
