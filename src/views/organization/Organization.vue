<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">组织</h2>
    <div class="layout__header-tool">
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addOrganization"></Button>
    </div>
  </div>
  <div class="layout__body">
    <div class="ebook-tree">
      <div class="ebook-tree__root"><h2 class="ebook-tree__root--title">金地集团</h2><i class="iconfont icon-tianjia ebook-tree__root--add"></i></div>
      <ul class="ebook-tree__children">
        <ebook-tree v-for="(item, index) in treeData" :key="index" :tree-data="item" @openModal="addNewOrg"></ebook-tree>
      </ul>
    </div>
    <div class="ebook-tree">
      <div class="ebook-tree__root"><h2 class="ebook-tree__root--title">金地集团</h2><i class="iconfont icon-tianjia ebook-tree__root--add"></i></div>
      <ul class="ebook-tree__children">
        <ebook-tree v-for="(item, index) in treeData" :key="index" :tree-data="item" @openModal="addNewOrg"></ebook-tree>
      </ul>
    </div>
  </div>
  <Modal
    v-model="modalShow"
    :closable="false"
    :mask-closable="false"
    width="560">
    <p slot="header">上海西-新建组织</p>
    <Form :label-width="120" style="width: 380px; padding-top: 20px; margin: 0 auto;">
      <Form-item label="组织名称：">
        <Input placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="负责人：">
        <Input placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="联系方式：">
        <Input placeholder="请您输入..."></Input>
      </Form-item>
      <Form-item label="描述：">
        <Input placeholder="请您输入..." type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
      </Form-item>
    </Form>
    <div slot="footer">
      <Button type="text" size="large" @click="modalShow = false">取消</Button>
      <Button type="primary" size="large" @click="saveProject">完成</Button>
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
      modalShow: false, // 弹框隐藏显示
      treeData: [
        {
          level: 1,
          title: '华东区2',
          children: [
            { level: 2, title: '南京市' },
            { level: 2,
              title: '上海市',
              children: [
                { level: 3,
                  title: '上海东',
                  children: [
                    { level: 4, title: '金地艺境1', ifCase: true },
                    { level: 4, title: '金地艺境2', ifCase: true }
                  ] },
                { level: 3, title: '上海西' }
              ] }
          ]
        },
        {
          level: 1,
          title: '华南区2'
        }
      ]
    }
  },
  methods: {
    addNewOrg() {
      console.log('addNewOrg')
      this.modalShow = true
    },
    onClickTreeItem(event) {
      console.log('onClickTreeItem', event)
    },
    goSearch() {
      console.log('goSearch')
    },
    addOrganization() {
      this.modalShow = true
      console.log('addOrganization')
    }
  },
  components: {
    EbookTree
  }
}
</script>
<style lang="less">
</style>
