<template>
<td>
  <div class="authority-check-all">
    <Checkbox v-if="!hasSubMenus" :value="authData.checked === 1" @on-change="checkAllAuth">{{authData.name}}</Checkbox>
    <Checkbox v-else :indeterminate="selfIndeterminate" :value="selfIfCheckAll" @click.prevent.native="handleCheckAll">{{authData.name}}</Checkbox>
  </div>
  <CheckboxGroup class="authority-check-items" v-if="hasSubMenus" v-model="selfSubAuthCheckedId" @on-change="subAuthCheckedIdChange">
    <Checkbox class="authority-check-item"
      v-for="(subAuth, subAuthIndex) in authData.subMenus"
      :key="subAuthIndex"
      :label="subAuth.id">{{subAuth.name}}</Checkbox>
  </CheckboxGroup>
</td>
</template>
<script>
export default {
  name: 'EbookAuthorityItem',
  data() {
    return {
      selfIndeterminate: this.indeterminate,
      selfIfCheckAll: this.ifCheckAll,
      selfSubAuthCheckedId: this.subAuthCheckedId
    }
  },
  props: {
    authData: Object
  },
  computed: {
    authId() {
      return this.authData.id
    },
    hasSubMenus() {
      return !_.isEmpty(this.authData.subMenus)
    },
    subMenusLength() {
      return this.authData.subMenus.length
    },
    // 权限所有子菜单的id
    subAuthAllId() {
      const arr = []
      _.each(this.authData.subMenus, ele => {
        arr.push(ele.id)
      })
      return arr
    },
    subAuthCheckedId() {
      const arr = []
      _.each(this.authData.subMenus, ele => {
        if (ele.checked) {
          arr.push(ele.id)
        }
      })
      return arr
    },
    indeterminate() {
      return this.subAuthCheckedId.length > 0
    },
    ifCheckAll() {
      return this.selfSubAuthCheckedId.length === this.subMenusLength
    }
  },
  mounted() {
    console.log('EbookAuthorityItem', this.selfSubAuthCheckedId, this.subAuthCheckedId)
  },
  methods: {
    checkAllAuth(flag) {
      this.$emit('checkAllAuth', this.authId, flag)
    },
    handleCheckAll() {
      console.log('handleCheckAll')
      if (this.selfIndeterminate) {
        this.selfIfCheckAll = false
      } else {
        this.selfIfCheckAll = !this.selfIfCheckAll
      }
      this.selfIndeterminate = false

      if (this.selfIfCheckAll) {
        this.selfSubAuthCheckedId = this.subAuthAllId
      } else {
        this.selfSubAuthCheckedId = []
      }
      this.$emit('checkAllAuth', this.authId, this.selfSubAuthCheckedId)
    },
    subAuthCheckedIdChange(data) {
      // console.log('authGroupChange', data)
      this.selfSubAuthCheckedId = data
      this.$emit('checkAllAuth', this.authId, this.selfSubAuthCheckedId)
    }
  }
}
</script>
<style lang="less">
</style>
