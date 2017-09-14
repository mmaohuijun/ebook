<template>
  <router-view></router-view>
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
      'loadingStatus',
      'ifShowErrorMsg',
      'errorMsgText'
    ])
  },
  watch: {
    loadingStatus(flag) {
      if (!flag) return
      this.msg = this.$Message.loading({
        content: '正在加载中...',
        duration: 0
      })
      _.delay(this.msg, 500)
    },
    ifShowErrorMsg(flag) {
      if (!flag) return
      this.$Message.error({
        content: this.errorMsgText,
        duration: 3
      })
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
