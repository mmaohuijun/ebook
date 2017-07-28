<template>
  <div class="layout">
    <side-bar></side-bar>
    <case-manage></case-manage>
    <router-view></router-view>
  </div>
  <!-- <div class="layout">
    <Row type="flex" class-name="full-height">
      <i-col span="5" class="layout-menu-left">
        <side-bar></side-bar>
      </i-col>
      <i-col span="19">
        <div class="layout-header">
          <head-bar></head-bar>
        </div>
        <div class="layout-breadcrumb">
          <breadcrumb></breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">内容区域
            <router-view></router-view>
          </div>
        </div>
      </i-col>
    </Row>
  </div> -->
</template>

<script>
// import SideBar from './SideBar'
import SideBar from './SideBar2'
import HeadBar from './HeadBar'
import Breadcrumb from './Breadcrumb'
import CaseManage from '../case/CaseManage'

export default {
  name: 'layout',
  data () {
    return {
    }
  },
  mounted () {
    console.log('Layout mounted')
  },
  components: {
    SideBar,
    HeadBar,
    Breadcrumb,
    CaseManage
  }
}
</script>

<style lang="less">
  .float-left {float: left;}
  .float-right {float: right;}
  .clearfix {
    &:before,
    &:after {
      content: '';
      display: table;
    }

    &:after {
      clear: both;
    }
  }

  html,
  body {
    height: 100%;
    background: #f3f3f3;
  }

  .layout {
    height: 100%;
  }

  .layout-header {
    height: 60px;
    background:#8189bb;
  }
</style>
