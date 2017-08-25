<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理</h2>
  </div>
  <div class="layout__body">
    <div class="field-box">
      <div class="custom-tabs ivu-tabs ivu-tabs-card ivu-tabs-no-animation">
        <div class="ivu-tabs-bar">
          <div class="ivu-tabs-nav-container">
            <div class="ivu-tabs-nav-wrap">
              <div class="ivu-tabs-nav-scroll">
                <div class="ivu-tabs-nav">
                  <div class="ivu-tabs-ink-bar" style="display: none; width: 138px; left: 0px;"></div>
                  <div class="ivu-tabs-tab ivu-tabs-tab-active"><router-link to="/web-admin/case/caseInfo">案场信息</router-link></div>
                  <div class="ivu-tabs-tab"><router-link to="/web-admin/case/caseProject">项目信息</router-link></div>
                  <div class="ivu-tabs-tab"><router-link to="/web-admin/case/caseAttrs">维度信息</router-link></div>
                </div>
                <div class="ivu-tabs-nav-right"><a href="javascript:;" class="field-add-btn">新建分栏</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="ivu-tabs-content" style="transform: translateX(0%) translateZ(0px);">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
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
