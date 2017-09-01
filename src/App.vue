<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      msg: null
    }
  },
  computed: {
    ...mapState({
      ifShowLoading: state => state.loading,
      ifShowErrorMsg: state => state.ifShowErrorMsg,
      msgText: state => state.msgText
    })
  },
  watch: {
    ifShowLoading(flag) {
      if (flag) {
        this.msg = this.$Message.loading({
          content: '正在加载中...',
          duration: 0
        })
      } else {
        this.msg()
      }
    },
    ifShowErrorMsg(flag) {
      if (!flag) return
      this.$Message.error({
        content: this.msgText,
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
