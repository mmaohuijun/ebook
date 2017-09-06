<template>
  <li>
    <p class="ebook-tree__item" >
      <span class="ebook-tree__item--expand-wrapper" v-show="!treeData.ifCase" :style="{paddingLeft: pval + 'px'}"><i class="ebook-tree__item--expand iconfont" :class="open ? 'icon-jianshao' : 'icon-zengjia'" @click="toggle"></i></span>
      <a href="#" v-if="treeData.ifCase" class="ebook-tree__item--title" :style="{paddingLeft: pval + 'px', marginLeft: mval + 'px'}">{{treeData.title}}</a>
      <span class="ebook-tree__item--title" v-else>{{treeData.title}}</span>
      <span class="ebook-tree__item--add iconfont icon-tianjia"></span>
    </p>
    <ul v-if="treeData.children" class="ebook-tree__item--children">
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
      open: false,
      pval: 0,
      mval: 0
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
  computed: {
    // getLevel(obj) {
    //   const box = []
    //   for (const i in obj) {
    //     if (typeof obj[i] == 'number') {
    //       this.getLevel = getLevel
    //       box.push(i + ':' + obj[i])
    //     } else if (typeof obj[i] == 'object') {
    //       this.getLevel(obj[i])
    //     }
    //   }
    //   console.log(box)
    // }
  },
  mounted() {
    console.log('mounted', this.treeData)
    // this.getLevel(this.treeData)
    for (const i in this.treeData) {
      if (typeof this.treeData[i] == 'number') {
        console.log(this.treeData[i])
        this.mval = 35
        this.pval = 33 * this.treeData[i]
        console.log(this.pval)
      }
    }
  }
}
</script>
<style lang="less">
.ebook-tree {
  border:1px solid #bdbdbd;
  background: #fff;
z
  &:last-child {
    border-top: none;
  }
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

.ebook-tree__item {
  position: relative;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #ddd;
}

.ebook-tree__item--title {
  display: inline-block;
  vertical-align: top;
  height: 44px;
  line-height: 44px;
  font-size: 18px;
}

.ebook-tree__item--expand-wrapper {
  display: inline-block;
  height: 44px;
  line-height: 44px;
  // padding-left: 33px;
  padding-right: 6px;
  border-bottom: 1px dashed #fff;
}

.ebook-tree__item--expand {
  font-size: 20px;
  color: #8e8e8e;
}

.ebook-tree__item--add {
  float: right;
  margin-right: 29px;
  font-size: 21px;
  color: #bbb;;
  cursor: pointer;
}

.ebook-tree__children {
  > li:last-child {
    > .ebook-tree__item{
      border-bottom: none;
    }
  }
}

</style>
