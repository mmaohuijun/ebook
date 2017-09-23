<template>
<td>
  <div class="authority-check-all">
    <Checkbox v-if="!hasSubMenus" :value="selfAuthData.checked === 1" @on-change="checkAuth" :disabled="!display">{{selfAuthData.name}}</Checkbox>
    <Checkbox v-else :indeterminate="indeterminate" :value="ifCheckAll" @click.prevent.native="handleCheckAll" :disabled="!display">{{selfAuthData.name}}</Checkbox>
  </div>
  <CheckboxGroup class="authority-check-items" v-if="hasSubMenus" v-model="subAuthCheckedId" @on-change="subAuthCheckedIdChange">
    <Checkbox class="authority-check-item"
      v-for="(subAuth, subAuthIndex) in selfAuthData.subMenus"
      :key="subAuthIndex"
      :label="subAuth.id"
      :disabled="!display">{{subAuth.name}}</Checkbox>
  </CheckboxGroup>
</td>
</template>
<script>
export default {
  name: 'EbookAuthorityItem',
  data() {
    return {
      selfAuthData: _.cloneDeep(this.authData),
      subAuthCheckedId: [],
      subAuthUncheckedId: [],
      subAuthCheckedIdBackup: []
    }
  },
  props: {
    authData: Object,
    display: false
  },
  computed: {
    authId() {
      return this.selfAuthData.id
    },
    // 是否有子权限菜单
    hasSubMenus() {
      return this.selfAuthData.hasSubMenus
    },
    // 子权限菜单长度
    subMenusLength() {
      return this.selfAuthData.subMenus.length
    },
    // 子权限菜单所有的id
    subAuthAllId() {
      const arr = []
      _.each(this.selfAuthData.subMenus, ele => {
        arr.push(ele.id)
      })
      return arr
    },
    // 是否有子权限被选中
    indeterminate() {
      return this.subAuthCheckedId.length > 0
    },
    // 是否全选
    ifCheckAll: {
      get() {
        return this.subAuthCheckedId.length === this.subMenusLength
      },
      set(value) {
        if (value) { // 全选
          this.subAuthCheckedId = this.subAuthAllId
        } else { // 全不选
          this.subAuthCheckedId = []
        }
      }
    }
  },
  mounted() {
    console.log('MOUNT', this.display)
    this.initCheckedList()
  },
  methods: {
    // 初始化CheckedList, 把已选的权限id放入数组
    initCheckedList() {
      _.each(this.selfAuthData.subMenus, ele => {
        if (ele.checked) {
          this.subAuthCheckedId.push(ele.id)
        }
      })
      this.subAuthCheckedIdBackup = _.cloneDeep(this.subAuthCheckedId)
    },
    // 点击一级菜单
    checkAuth(flag) {
      this.$emit('authChange', flag, [this.authId])
    },
    // 点击一级菜单(有子权限)
    handleCheckAll() {
      this.ifCheckAll = !this.ifCheckAll
      this.$emit('authChange', this.ifCheckAll, this.subAuthAllId)
    },
    // 子权限菜单改变
    subAuthCheckedIdChange(data) {
      // 判断是增加还是减少
      const flag = this.subAuthCheckedId.length > this.subAuthCheckedIdBackup.length
      // 没有选中的选项
      const uncheck = _.difference(this.subAuthAllId, data)
      const change = flag ? data : uncheck
      // 如果是增加则把选中的传出去, 如果是减少则把没有选中的传出去
      this.$emit('authChange', flag, change)
    }
  }
}
</script>
<style lang="less">
</style>
