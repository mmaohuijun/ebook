<template>
  <div class="layout">
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
  </div>
</template>

<script>
// import SideBar from './SideBar'
import SideBar from './SideBar2'
import HeadBar from './HeadBar'
import Breadcrumb from './Breadcrumb'

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
    Breadcrumb
  }
}
</script>

<style lang="less" scoped>
 .full-height {
  min-height: 100%
}

.layout{
  height: 100%;
  background: #f5f7f9;
  position: relative;
}
.layout-breadcrumb{
  padding: 10px 15px 0;
}
.layout-content{
  min-height: 200px; 
  margin: 15px;
  padding: 24px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main{
  padding: 10px;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left{
  background: #464c5b;
}
.layout-header{
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
} 
</style>
