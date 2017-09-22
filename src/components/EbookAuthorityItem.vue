<template>
<td>
  <div class="authority-check-all">
    <Checkbox v-if="!hasSubMenus" :value="authData.checked === 1" @on-change="checkAllAuth">{{authData.name}}</Checkbox>
    <Checkbox v-else :indeterminate="indeterminate" :value="ifCheckAll" @click.prevent.native="handleCheckAll">{{authData.name}}</Checkbox>
  </div>
  <CheckboxGroup class="authority-check-items" v-if="hasSubMenus" v-model="subAuthCheckedId" @on-change="subAuthCheckedIdChange">
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
      selfAuthData: _.cloneDeep(this.authData),
      subAuthCheckedId: []
    }
  },
  props: {
    authData: Object
  },
  computed: {
    authId() {
      return this.selfAuthData.id
    },
    hasSubMenus() {
      return !_.isEmpty(this.selfAuthData.subMenus)
    },
    subMenusLength() {
      return this.selfAuthData.subMenus.length
    },
    // 权限所有子菜单的id
    subAuthAllId() {
      const arr = []
      _.each(this.selfAuthData.subMenus, ele => {
        arr.push(ele.id)
      })
      return arr
    },
    indeterminate() {
      return this.subAuthCheckedId.length > 0
    },
    ifCheckAll: {
      get() {
        return this.subAuthCheckedId.length === this.subMenusLength
      },
      set(value) {
        if (value) {
          this.subAuthCheckedId = this.subAuthAllId
        } else {
          this.subAuthCheckedId = []
        }
      }
    }
  },
  mounted() {
    _.each(this.selfAuthData.subMenus, ele => {
      if (ele.checked) {
        this.subAuthCheckedId.push(ele.id)
      }
    })
  },
  methods: {
    checkAllAuth(flag) {
      this.$emit('checkAllAuth', this.authId, flag)
    },
    handleCheckAll(flag) {
      // console.log('handleCheckAll', this.ifCheckAll)
      this.ifCheckAll = !this.ifCheckAll
      this.$emit('checkAllAuth', this.authId, this.subAuthCheckedId)
    },
    subAuthCheckedIdChange(data) {
      // console.log('authGroupChange', data)
      this.subAuthCheckedId = data
      this.$emit('checkAllAuth', this.authId, this.subAuthCheckedId)
    }
  }
}
</script>
<style lang="less">
</style>
