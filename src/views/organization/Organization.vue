<template>
<div class="layout__content">
  <ebook-header
    header-title="组织"
    :addBtn="true"
    @onAdd="addOrganization">
  </ebook-header>

  <div class="layout__body">
    <div class="ebook-tree" v-for="(item, index) in treeData" :key="index" :tree-data="item" >
      <ul class="ebook-tree__children">
        <div class="ebook-tree__root">
          <h2 class="ebook-tree__root--title" @click="editChild(index)">{{item.name}}</h2>
          <i class="iconfont icon-tianjia ebook-tree__root--add" @click="addNewChild(index)"></i>
        </div>
        <ebook-tree-node v-for="(item, index) in item.children" :key="index" :tree-data="item" @openModal="addNewOrg"></ebook-tree-node>
      </ul>
    </div>

  </div>
  <Modal
    on-cancel="resetFields('orgForm')"
    v-model="modal.show"
    :closable="false"
    :mask-closable="false"
    width="560">
    <p slot="header">{{modal.title}}</p>
    <Form ref="orgForm" :model="orgForm" :rules="orgRule" :label-width="120" style="width: 380px; padding-top: 20px; margin: 0 auto;">
      <Form-item prop="name" label="组织名称：">
        <Input v-model="orgForm.name" placeholder="请您输入..." :maxlength="16"></Input>
      </Form-item>
      <Form-item prop="responsable" label="负责人：">
        <Input v-model="orgForm.responsable" placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item prop="mobile" label="联系方式：">
        <Input v-model="orgForm.mobile" placeholder="请您输入..." :maxlength="11"></Input>
      </Form-item>
      <Form-item prop="remark" label="描述：">
        <Input v-model="orgForm.remark" placeholder="请您输入..." type="textarea" :autosize="{minRows: 2, maxRows: 5}"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modal.show = false">取消</Button>
      <Button type="primary" size="large" @click="editSaveModal('orgForm')" :loading="modal.saveLoading">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
// import EbookTree from 'components/EbookTree'
import EbookTreeNode from 'components/EbookTreeNode'
import EbookHeader from 'components/EbookHeader'

export default {
  name: 'Organization',
  data() {
    const vmobile = (rule, value, callback) => {
      if (value) {
        const reg = /^1[34578]\d{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      } else callback()
    }
    return {
      orgForm: {
        name: '',
        responsable: '',
        mobile: '',
        remark: ''
      },
      orgRule: {
        name: [
          { required: true, message: '组织名不能为空', trigger: 'blur' }
        ],
        mobile: [
          { validator: vmobile, trigger: 'blur' }
        ]
      },
      modal: {
        show: false,
        saveLoading: false,
        title: ''
      },
      modalShow: false, // 弹框隐藏显示
      treeData: [],
      id: 0 || null, //  组织id 空或0表示新建保存 其他为修改保存
      name: '', //  组织名称 必填
      parentId: 0, // 上级组织 0表示自己为第一级
      responsable: '', // 负责人
      mobile: '', //  联系方式
      remark: ''
    }
  },
  methods: {
    addNewChild(index) {
      this.id = null || 0
      this.parentId = this.treeData[index].id
      console.log(this.treeData[index].id)
      this.modal.title = this.treeData[index].name + ' -- 新建组织'
      this.modal.show = true
    },
    editChild(index) {
      const treeData = this.treeData[index]
      console.log(treeData)
      this.id = treeData.id
      this.orgForm.name = treeData.name
      this.orgForm.responsable = treeData.responsable
      this.orgForm.mobile = treeData.mobile
      this.orgForm.remark = treeData.remark
      this.modal.title = treeData.name
      this.parentId = treeData.parentId
      this.modal.show = true
    },
    addNewOrg(ele, edit) {  //  触发自定义事件的方法
      this.modal.show = true
      this.judgeEdit(ele, edit)
      console.log(ele)
      console.log(this.parentId)
    },
    judgeEdit(ele, edit) {  //  判断添加/编辑状态 并相应赋予不同的值
      if (!edit) {
        this.parentId = ele.id
        this.id = 0 || null
        this.modal.title = ele.name + ' -- 新建组织'
      } else {
        this.id = ele.id
        this.orgForm.name = ele.name
        this.orgForm.responsable = ele.responsable
        this.orgForm.mobile = ele.mobile
        this.orgForm.remark = ele.remark
        this.modal.title = ele.name
        this.parentId = ele.parentId
      }
    },
    addOrganization() {  // 新建组织
      this.id = null || 0
      this.modal.show = true
      this.parentId = 0
      this.modal.title = '新建组织'
    },
    showOrgList() {  // 显示组织列表
      this.$axios.get('office/list').then(response => {
        if (response === null) return
        // this.parentId = response.data.parentId
        // this.treeData = _.cloneDeep(response.data)
        this.treeData = []
        for (const items in response.data) {
          this.treeData.push(response.data[items])
        }
        console.log('treeData', this.treeData)
      })
    },
    hideModal() {  // 隐藏模态框
      this.modal.show = false
    },
    verifyEdit() { // 验证编辑
      if (_.trim(this.orgForm.name) === '' || this.parentId === '') {
        return false
      } else {
        return true
      }
    },
    resetFields(name) {  // 重置表单
      this.$refs[name].resetFields()
    },
    editSaveModal(name) { //  保存修改
      this.$refs[name].validate(valid => {
        if (valid && this.verifyEdit()) {
          this.saveLoading = true
          this.$Message.success('提交成功！')
          this.editSave()
        } else {
          this.$Message.error('表单验证失败')
          this.saveLoading = false
        }
      })
    },
    editSave() {  //  新建内容保存
      const requestData = {
        id: this.id,
        name: this.orgForm.name,
        parentId: this.parentId,
        responsable: this.orgForm.responsable,
        mobile: this.orgForm.mobile,
        remark: this.orgForm.remark
      }
      console.log(requestData)
      this.$axios.post('office/save', requestData).then(
      response => {
        if (_.isNull(response)) return
        this.showOrgList()
      })
      this.hideModal()
    // window.location.reload()  //  重载页面..有待改善
    }
  },
  mounted() { //  挂载成功时 显示组织列表
    this.showOrgList()
  },
  watch: {
    'modal.show'(val, oldVal) {  //  监听到模态框显示状态改变 即清空列表项
      if (!val) {
        this.resetFields('orgForm')
      }
    }
  },
  components: {
    EbookTreeNode,
    EbookHeader
  }
}

</script>
<style lang="less">
.ebook-tree {
  border:1px solid #bdbdbd;
  background: #fff;
}
.ebook-tree__root {
  height: 44px;
  line-height: 44px;
  background: #66c5d0;
}

.ebook-tree__root--title {
  display: inline-block;
  padding-left: 15px;
  font-weight: 400;
  font-size: 20px;
  color: #fff;
}

.ebook-tree__root--add {
  float: right;
  font-size: 21px;
  margin-right: 29px;
  color: #fff;
  cursor: pointer;
}
</style>
