<template>
  <li :class="open ? 'ebook-tree-open' : ''">
    <span v-show="!treeData.ifCase" class="ebook-tree-icon" @click="toggle"></span>
    <a href="#" v-if="treeData.ifCase">{{treeData.title}}</a> 
    <span class="ebook-tree-title" v-else>{{treeData.title}}</span>
    <span class="ebook-tree-new-btn"></span>
    <ul v-if="treeData.children" class="ebook-tree-children">
      <ebook-tree v-show="open" v-for="(item, index) in treeData.children" :key="index" :tree-data="item"></ebook-tree>
    </ul>
  </li>
</template>
<script>
import EbookTree from 'components/EbookTree'

export default {
  name: 'EbookTree',
  data() {
    return {
      isCase: false,
      open: false
    }
  },
  props: {
    treeData: Object
  },
  components: {
    EbookTree
  },
  methods: {
    toggle() {
      if (!this.isCase) {
        this.open = !this.open
      }
    }
  },
  mounted() {
    console.log('mounted', this.treeData)
  }
}
</script>
<style lang="less">
.ebook-tree {
  margin-bottom: 100px;
  font-size: 20px;
}

.ebook-tree li ul {
  margin: 0;
  padding: 0 0 0 40px;
}

.ebook-tree-title {
  display: inline-block;
  // background: url('/static/img/tree_add.png') no-repeat left center;
  // padding-left: 25px;
}

.ebook-tree-icon {
  display: inline-block;
  width: 21px;
  height: 21px;
  background: url('/static/img/tree_add.png') no-repeat left center;
  cursor: pointer;
}

.ebook-tree-open {
  &>.ebook-tree-icon {
    background: url('/static/img/tree_min.png') no-repeat left center;
  }
}

.ebook-tree-new-btn {
  display: block;
  float: right;
  width: 21px;
  height: 21px;
  background: url('/static/img/tree_new.png') no-repeat center;
}
</style>
