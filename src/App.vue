<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      msg: null
    }
  },
  computed: {
    ...mapGetters([
      'ifShowErrorMsg',
      'errorMsgText',
      'ifShowSuccessMsg',
      'successMsgText'
    ])
  },
  watch: {
    ifShowErrorMsg(flag) {
      if (!flag) return
      this.$Message.error({
        content: this.errorMsgText,
        duration: 3
      })
    },
    ifShowSuccessMsg(flag) {
      if (!flag) return
      this.$Message.success(this.successMsgText)
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
  overflow: hidden;
}

.modal-form {
  margin: 30px 70px;
}
.ivu-modal-body {
  max-height: 500px;
  overflow-y: auto;
}
@import 'assets/css/common.css';
</style>
