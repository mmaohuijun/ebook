<template>
<div>
  CaseDetails
  <router-link to="/web-admin/case/caseInfo">案场信息</router-link>
  <router-link to="/web-admin/case/caseProject">项目信息</router-link>
  <router-link to="/web-admin/case/caseAttrs">维度信息</router-link>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  name: 'CaseDetails',
  data() {
    return {
    }
  }
}
</script>
<style lang="css" scoped>
</style>
