<template>
<!-- <div class="layout-menu"> -->
  <Menu theme="dark" width="auto" active-name="caseManage" :open-names="['1']" @on-select="selectMenu">
    <div class="layout-logo-left"></div>
    <Submenu name="1">
      <template slot="title">
        <Icon type="android-home"></Icon>
        案场
      </template>
      <Menu-item name="caseManage">案场管理</Menu-item>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="android-people"></Icon>
        组织
      </template>
      <Menu-item name="2-1">组织管理</Menu-item>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="android-person"></Icon>
        用户
      </template>
      <Menu-item name="3-1">内部用户</Menu-item>
      <Menu-item name="3-2">外部用户</Menu-item>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
        <Icon type="locked"></Icon>
        权限
      </template>
      <Menu-item name="4-1">权限管理</Menu-item>
    </Submenu>
    <Submenu name="5">
      <template slot="title">
        <Icon type="stats-bars"></Icon>
        客户数据
      </template>
      <Menu-item name="5-1">来电数据</Menu-item>
      <Menu-item name="5-2">到访数据</Menu-item>
      <Menu-item name="5-3">成交数据</Menu-item>
      <Menu-item name="5-4">未分配客户</Menu-item>
      <Menu-item name="5-5">新建客户</Menu-item>
    </Submenu>
    <Submenu name="6">
      <template slot="title">
        <Icon type="code"></Icon>
        硬件
      </template>
      <Menu-item name="6-1">硬件列表</Menu-item>
    </Submenu>
  </Menu>
<!-- </div> -->
</template>
<script>
export default {
  name: 'sideBar',
  data() {
    return {
    }
  },
  methods: {
    selectMenu(val) {
      console.log('selectMenu', val)
      this.$router.push('/caseManage')
    }
  }
}
</script>
<style lang="css" scoped>
</style>
