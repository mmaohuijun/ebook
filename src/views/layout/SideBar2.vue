<template>
<aside class="layout__aside">
  <div class="layout__aside_scroll">
    <div class="layout__aside-header">
      <div class="layout__aside-avatar"><img src="../../assets/logo.png" alt=""></div>
      <p class="layout__aside-name">王某某</p>
      <ul class="layout__aside-info">
        <li><p>账号：2736273</p><router-link to="/">修改密码</router-link></li>
        <li><p>联系方式：1672829763</p><router-link to="/">修改</router-link></li>
      </ul>
    </div>
    <div class="laylout__aside-menu">
      <div class="menu__item">
        <div class="menu__link">案场</div>
        <p class="menu__child"><router-link to="/" class="menu__link menu__link--current">案场管理</router-link></p>
      </div>
      <div class="menu__item">
        <a href="#" class="menu__link">组织</a>
      </div>
      <div class="menu__item">
        <div class="menu__link">用户</div>
        <p class="menu__child"><router-link to="/user" class="menu__link">内部用户</router-link></p>
        <p class="menu__child"><router-link to="/user" class="menu__link">外部用户</router-link></p>
      </div>
      <div class="menu__item">
        <a href="#" class="menu__link">权限</a>
      </div>
      <div class="menu__item">
        <div class="menu__link">客户数据</div>
        <p class="menu__child"><router-link to="/" class="menu__link">来电记录</router-link></p>
        <p class="menu__child"><router-link to="/" class="menu__link">到访记录</router-link></p>
        <p class="menu__child"><router-link to="/" class="menu__link">成交记录</router-link></p>
        <p class="menu__child"><router-link to="/" class="menu__link">未分配客户</router-link></p>
        <p class="menu__child"><router-link to="/" class="menu__link">新建客户</router-link></p>
      </div>
      <div class="menu__item">
        <router-link to="/" class="menu__link">硬件列表</router-link>
      </div>
    </div>
  </div>
</aside>
</template>
<script>
export default {
  name: 'SideBar2',
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
  .layout__aside{
    float: left;
    width: 260px;
    height: 100%;
    background:#4e546c;
    overflow-x: hidden;

    &,
    a {
      color:#bfcfea;
    }

    &-header {
      padding-top: 20px;
      border-bottom:1px solid #bfcfea;
    }

    &-avatar {
      width: 116px;
      height: 116px;
      margin: 0 auto;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;

      img {
        width: 116px;
        height: 116px;
      }
    }

    &-name {
      padding-top: 10px;
      font-size: 20px;
      color: #fff;
      text-align: center;
    }

    &-info {
      padding: 17px 17px 5px 21px;
      font-size:16px;

      li {
        overflow: hidden;
        margin-bottom: 15px;

        p {
          float: left;
        }

        a {
          float: right;
        }
      }
    }
  }

  .layout__aside_scroll {
    height: 100%;
    width: 280px;
    margin-right: -17px;
    overflow-y: scroll;
  }

  .laylout__aside-menu {
    padding: 20px 0 0 0;
    font-size: 18px;
    line-height: 35px;
  }

  .menu__child {
    padding-left: 17px;

    .menu__link {
      font-size: 18px;
    }
  }

  .menu__link {
    display: block;
    position: relative;
    padding-left: 73px;
    font-size: 20px;

    &--current {
      color: #fff !important;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        border-color: transparent;
        border-width: 14px;
        border-style: solid;
        border-right-color: #fff;
        width: 0;
        height: 25px;
      }
    }
  }
</style>
