<template>
  <div class="ebook-tree">
    <ul class="ebook-tree__children">
      <div class="ebook-tree__root">
        <Checkbox v-model="firstLevelChecked">{{treeData.name}}</Checkbox>
        <i class="ebook-tree__item--expand iconfont icon-jianshao"></i>
      </div>
      <ebook-tree-node
        ref="ebTree"
        tree-type="orgModal"
        v-for="(item, index) in treeData.children"
        :key="index"
        :tree-data="item"
        ></ebook-tree-node>
        <!-- @handleCheck="onhandleCheck" -->
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
      firstLevelChecked: false
    }
  },
  watch: {
    firstLevelChecked(flag) {
      // 自身取消选中, 所有子选项取消选中
      this.$emit('firstLevelSelected', this.id, flag)
      if (flag) return
      _.each(this.$refs.ebTree, item => {
        item.deselected()
      })
    }
  },
  computed: {
    id() {
      return this.treeData.id
    }
  },
  props: {
    treeData: Object
  },
  methods: {
    /**
     * id : 被选项id
     * flag: 是否点击了自身
     */
    // onhandleCheck(id, flag) {
    //   console.log('onhandleCheck IN TREE', '被选项id', id, flag)
    //   this.$emit('onCheckedTreeNode', id, flag)
    //   // // 单选效果
    //   // _.each(this.$refs.ebTree, item => {
    //   //   // 如果点击的不是自己则选中, 并让同级的其他选项取消选中
    //   //   if (!flag && item.id === id) {
    //   //     item.onselected()
    //   //     this.$emit('onCheckedTreeNode', id)
    //   //   } else {
    //   //     item.deselected()
    //   //   }
    //   // })

    //   // // 子选项取消选中, 上级也取消选中
    //   // if (flag) {
    //   //   this.unCheckedFirstLevel()
    //   // } else {
    //   //   this.onCheckedFirstLevel()
    //   // }
    // },
    onCheckedFirstLevel() {
      this.firstLevelChecked = true
    },
    unCheckedFirstLevel() {
      this.firstLevelChecked = false
    }
  },
  mounted() {
    this.$on('onhandleCheck', () => {
      console.log('监听到checked')
      // this.$emit('on-check-change')
    })
  }
}
</script>
<style lang="less">
</style>
