<template>
  <div class="ebook-tree">
    <ul class="ebook-tree__children">
      <ebook-tree-node
        tree-type="orgModal"
        v-for="(item, index) in treeData"
        :key="index"
        :tree-data="item">
      </ebook-tree-node>
    </ul>
  </div>
</template>
<script>
import EbookTreeNode from 'components/EbookTreeNode'

export default {
  name: 'EbookTree',
  components: {
    EbookTreeNode
  },
  data() {
    return {
    }
  },
  props: {
    treeData: Array
  },
  methods: {
    // 寻找子组件
    findComponentsDownward(context, componentName, components = []) {
      const childrens = context.$children

      if (childrens.length) {
        childrens.forEach(child => {
          const name = child.$options.name
          const childs = child.$children

          if (name === componentName) components.push(child)
          if (childs.length) {
            const findChilds = this.findComponentsDownward(child, componentName, components)
            if (findChilds) components.concat(findChilds)
          }
        })
      }
      return components
    },
    handleChecked(id) {
      console.log('处理选中', id)
      // 获取所有的树形节点
      const allEbookTreeNode = this.findComponentsDownward(this, 'EbookTreeNode')
      _.each(allEbookTreeNode, item => {
        if (_.parseInt(item.id) === _.parseInt(id)) { // id相同则选中, 否则取消选中
          item.checked = true
          this.$emit('checked', id, item.name)
        } else {
          item.checked = false
        }
      })
    }
  },
  mounted() {
    // 监听on-checked事件
    this.$on('on-checked', id => {
      // console.log('监听到checked', id)
      this.handleChecked(id)
    })
  }
}
</script>
<style lang="less">
</style>
