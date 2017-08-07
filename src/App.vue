<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      msg: null
    }
  },
  computed: {
    ...mapState({
      ifShowLoading: state => state.loading,
      ifLogin: state => state.ifLogin
    })
  },
  watch: {
    ifShowLoading (flag) {
      if (flag) {
        this.$Message.loading({
          content: '正在加载中...',
          duration: 0
        })
      } else {
        this.$Message.destroy()
      }
    },
    ifLogin (flag) {
      if (flag) return
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    console.log('APP mounted', this.ifLogin)
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
