<template>
  <li>
    <div v-if="treeType === 'org'">
      <p class="ebook-tree__item">
        <span class="ebook-tree__item--expand-wrapper" v-show="!treeData.isCase" :style="{paddingLeft: pval + 'px'}">
          <i class="ebook-tree__item--expand iconfont" :class="showSubMenus ? 'icon-jianshao' : 'icon-zengjia'" @click="toggleTreeChildren"></i>
        </span>
        <a href="#" v-if="treeData.isCase" class="ebook-tree__item--title" :style="{paddingLeft: pval + 'px', marginLeft: mval + 'px'}" @click="jumpToCase">
          {{treeData.name}}
        </a>
        <span class="ebook-tree__item--title" @click="eidtNewChild" v-model="isEdit"  v-else>{{treeData.name}}</span>
        <span class="ebook-tree__item--add iconfont icon-tianjia" v-if="!treeData.isCase" @click="addNewChild" v-model="isEdit"></span>
      </p>
      <ul v-if="treeData.children" class="ebook-tree__item--children">

        <ebook-tree-node
          v-show="showSubMenus"
          v-for="(item, index) in treeData.children"
          :key="index"
          :tree-data="item"
          @openModal="addNewOrg">
        </ebook-tree-node>

      </ul>
    </div>

    <div v-else>
      <div class="ebook-tree__item">
        <Checkbox v-model="selected" @click.native.prevent="handleCheck(id)" :disabled="ifHasChildren">{{treeData.name}}</Checkbox>
        <i v-if="treeData.children"
          class="ebook-tree__item--expand iconfont"
          :class="showSubMenus ? 'icon-jianshao' : 'icon-zengjia'"
          @click="toggleTreeChildren">
        </i>
      </div>

      <ul v-if="treeData.children" class="ebook-tree__children">
        <ebook-tree-node
          ref="ebTree"
          v-show="showSubMenus"
          v-for="(item, index) in treeData.children"
          :key="index"
          tree-type="orgModal"
          :tree-data="item"
          :level="item.level">
        </ebook-tree-node>
      </ul>
    </div>
  </li>
</template>
<script>
import EbookTreeNode from 'components/EbookTreeNode'

export default {
  name: 'EbookTreeNode',
  components: {
    EbookTreeNode
  },
  data() {
    return {
      isCase: false, // 是否为案场
      open: false,
      showSubMenus: false,
      mval: 20, //  案场 增加缩进
      isEdit: false, //  状态  编辑/添加
      selected: false
    }
  },
  props: {
    treeData: Object,
    treeType: {
      type: String,
      default: 'org'
    }
  },
  computed: {
    // 如果有子组织则禁止选择
    ifHasChildren() {
      return !!this.treeData.children
    },
    // 层级
    level() {
      return this.treeData.level
    },
    // 缩进
    pval() {
      return 33 * (this.level - 1)
    },
    id() {
      return this.treeData.id
    }
  },
  methods: {
    handleCheck(id) {
      console.log('handleCheck', id)
      if (this.ifHasChildren) return
      // this.$emit('handleCheck', id, this.selected)
      this.$emit('onhandleCheck')
    },
    /**
     * id : 被选项id
     * flag: 是否点击了自身
     */
    // onhandleCheck(id, flag) {
    //   console.log('onhandleCheck IN NODE', '被选项id', id, flag)
    //   this.$emit('handleCheck', id, flag)
    // },
    deselected() {
      this.selected = false
    },
    onselected() {
      this.selected = true
    },
    addNewOrg(ele, edit) {  // 触发自定义方法的事件
      this.$emit('openModal', ele, edit)
    },
    toggleTreeChildren() {
      if (!this.isCase) {
        this.showSubMenus = !this.showSubMenus
      }
    },
    addNewChild() {  // 定义点击事件 自定义方法 并传递参数
      console.log('here to create a new child')
      this.isEdit = false
      this.$emit('openModal', this.treeData, this.isEdit)
    },
    eidtNewChild() {  // 编辑 与 修改 区分
      console.log('here to edit an old child')
      this.isEdit = true
      this.$emit('openModal', this.treeData, this.isEdit)
    },
    jumpToCase() {
      this.$store.dispatch('setCaseId', this.id)
      this.$router.push({ name: 'CaseInfo', params: { caseId: this.id } })
    }
  },
  mounted() { //  按层级 缩进
    // for (const i in this.treeData) {
    //   if (i === 'level') {
    //     // console.log('level', this.treeData[i])
    //     this.pval = 33 * (this.treeData[i] - 1)
    //     this.mval = 20
    //   }
    // }
  }
}
</script>
<style lang="less">
// .ebook-tree {
//   border:1px solid #bdbdbd;
//   background: #fff;

//   &:last-child {
//     border-top: none;
//   }
// }

// .ebook-tree__root {
//   height: 44px;
//   line-height: 44px;
//   background: #66c5d0;
// }

// .ebook-tree__root--title {
//   display: inline-block;
//   padding-left: 15px;
//   font-weight: 400;
//   font-size: 20px;
//   color: #fff;
// }

// .ebook-tree__root--add {
//   float: right;
//   font-size: 21px;
//   margin-right: 29px;
//   color: #fff;
//   cursor: pointer;
// }

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
  padding-left: 33px;
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
