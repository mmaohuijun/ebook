<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">组织</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="组织" v-model="searchText" @on-click="goSearch"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="addOrganization"></Button>
    </div>
  </div>
  <div class="layout__body">
    Organization
     <Tree :data="baseData"></Tree> 
    <div class="ebook-tree">
      <ul class="ebook-tree-children">
        <li class="ebook-tree-open" @click="onClickTreeItem">
          <span class="ebook-tree-title">华东区</span>
          <ul class="ebook-tree-children">
            <li>
              <span class="ebook-tree-title">南京市</span>
            </li>
            <li class="ebook-tree-open">
              <span class="ebook-tree-title">上海市</span>
              <ul class="ebook-tree-children">
                <li class="ebook-tree-open">
                  <span class="ebook-tree-title">上海东</span>
                  <ul class="ebook-tree-children">
                    <li>
                      <span class="ebook-tree-title">金地艺境1</span>
                    </li>
                    <li>
                      <span class="ebook-tree-title">金地艺境2</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span class="ebook-tree-title">上海西</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <span class="ebook-tree-title">华南区</span>
        </li>
      </ul>
    </div>

    <div class="ebook-tree">
      <ul class="ebook-tree-children">
        <ebook-tree v-for="(item, index) in treeData" :key="index" :tree-data="item"></ebook-tree>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import EbookTree from 'components/EbookTree'

export default {
  name: 'Organization',
  data() {
    return {
      treeData: [
        {
          title: '华东区2',
          children: [
            { title: '南京市' },
            { title: '上海市',
              children: [
                { title: '上海东',
                  children: [
                    { title: '金地艺境1', ifCase: true },
                    { title: '金地艺境2', ifCase: true }
                  ] },
                { title: '上海西' }
              ] }
          ]
        },
        {
          title: '华南区2'
        }
      ],
      searchText: '',
      baseData: [{
        expand: true,
        title: 'parent 1',
        children: [{
          title: 'parent 1-0',
          expand: true,
          disabled: true,
          children: [{
            title: 'leaf',
            disableCheckbox: true
          }, {
            title: 'leaf'
          }]
        }, {
          title: 'parent 1-1',
          expand: true,
          checked: true,
          children: [{
            title: '<span style="color: red">leaf</span> <span class="org_add_btn">+</span>'
          }]
        }]
      }]
    }
  },
  methods: {
    onClickTreeItem(event) {
      console.log('onClickTreeItem', event)
    },
    goSearch() {
      console.log('goSearch')
    },
    addOrganization() {
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
