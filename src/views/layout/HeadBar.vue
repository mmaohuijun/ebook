<template>
  <Dropdown placement="bottom-end" class="float-right" trigger="click">
    <a href="javascript:void(0)">
      <div class="user-avatar"><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""></div>
      <span class="user-name">张三四</span>
      <Icon type="ios-arrow-down"></Icon>
    </a>
    <Dropdown-menu slot="list" style="width: 190px;">
      <ul class="user-dropdown-list">
          <li>帐号：2736273<Tooltip placement="top" content="修改"><a href="#" class="edit-button"><Icon type="edit"></Icon></a></Tooltip></li>
          <li>手机号码：1709807234<Tooltip placement="top" content="修改"><a href="#" class="edit-button"><Icon type="edit"></Icon></a></Tooltip></li>
      </ul>
      <div style="padding:8px 16px;">
          <Button size="small" long type="primary" icon="power">退出登录</Button>
      </div>
    </Dropdown-menu>
  </Dropdown>
</template>
<script>
export default {
  name: 'headBar',
  data() {
    return {
    }
  }
}
</script>

<style lang="css" scoped>
</style>
