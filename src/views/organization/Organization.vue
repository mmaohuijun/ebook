<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">组织</h2>
    <div class="layout__header-tool">
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addOrganization" ></Button>
    </div>
  </div>
  <div class="layout__body">
    <div class="ebook-tree" v-for="(item, index) in treeData" :key="index" :tree-data="item" >
      <div class="ebook-tree__root">
      <h2 class="ebook-tree__root--title" >{{item.name}}</h2>
      <i class="iconfont icon-tianjia ebook-tree__root--add" @click="addNewChild(index)" ></i>
      </div>
      <ul v-if="item.children" class="ebook-tree__children">
        <ebook-tree v-for="(item, index) in item.children" :key="index" :tree-data="item" @openModal="addNewOrg"></ebook-tree>
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
        <Input v-model="orgForm.name" placeholder="请您输入..." ></Input>
      </Form-item>
      <Form-item prop="responsable" label="负责人：">
        <Input v-model="orgForm.responsable" placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item prop="mobile" label="联系方式：">
        <Input v-model="orgForm.mobile" placeholder="请您输入..."></Input>
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
import EbookTree from 'components/EbookTree'
export default {
  name: 'Organization',
  data() {
    return {
      orgForm: {
        name: '',
        responsable: '',
        mobile: '',
        remark: ''
      },
      orgRule: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      },
      modal: {
        show: false,
        saveLoading: false,
        title: ''
      },
      modalShow: false, // 弹框隐藏显示
      treeData: [
        // {
        //   level: 1,
        //   name: '华东区2',
        //   children: [
        //     { level: 2, name: '南京市' },
        //     { level: 2,
        //       name: '上海市',
        //       children: [
        //         { level: 3,
        //           name: '上海东',
        //           children: [
        //             { level: 4, name: '金地艺境1', ifCase: true },
        //             { level: 4, name: '金地艺境2', ifCase: true }
        //           ] },
        //         { level: 3, name: '上海西' }
        //       ] }
        //   ]
        // },
        // {
        //   level: 1,
        //   name: '华南区2'
        // }
      ],
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
      this.parentId = this.treeData[index].id
      this.modal.title = this.treeData[index].name + ' -- 新建组织'
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
      if (this.orgForm.name === '' || this.parentId === '') {
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
        if (valid) {
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
      if (this.verifyEdit()) {
        this.$axios.post('office/save', requestData).then(
        response => {
          if (_.isNull(response)) return
          this.showOrgList()
        })
        this.hideModal()
      }
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
    EbookTree
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
