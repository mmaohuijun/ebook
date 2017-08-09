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
        this.$Message.loading({
          content: '正在加载中...',
          duration: 0
        })
      } else {
        this.$Message.destroy()
      }
    },
    ifShowErrorMsg(flag) {
      if (!flag) return
      this.$Message.error({
        content: this.msgText,
        duration: 3
      })
    }
  },
  mounted() {
    console.log('APP mounted')
  }
}
</script>

<style lang="css">
#app {
  height: 100%;
  overflow: hidden;
}
@import 'assets/css/common.css';  
</style>
