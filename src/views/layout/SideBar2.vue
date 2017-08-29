<template>
<aside class="layout__aside">
  <div class="layout__aside_scroll">
    <div class="layout__aside-header">
      <div class="layout__aside-avatar"><img src="/static/img/avatar.png" alt=""></div>
      <p class="layout__aside-name">{{name}}</p>
      <ul class="layout__aside-info">
        <li>
          <p>工号：{{number}}</p>
          <!-- <router-link to="/">修改密码</router-link> -->
        </li>
        <li>
          <p>联系方式：{{mobile}}</p>
          <!-- <router-link to="/">修改</router-link> -->
        </li>
      </ul>
    </div>
    <!-- <div class="laylout__aside-menu">
      <div class="menu__item" v-for="(ele, index) in menuDataSource" :key="index">
        <router-link :to="ele.path" class="menu__link" :tag="ele.subMenu.length === 0 ? 'a' : 'div'" @click="onClickMenu(ele.key)">{{ele.title}}</router-link>
        <p class="menu__child" v-for="(item, index) in ele.subMenu" :key="index" @click="onClickMenu(item.key)">
          <router-link :to="item.path" :class="selectMenu === item.key ? 'menu__link menu__link--current' : 'menu__link'">{{item.title}}</router-link>
        </p>
      </div>
    </div> -->
    <ul class="laylout__aside-menu">
      <li class="menu__item" v-for="(ele, index) in menuDataSource" :key="index">
        <ul>
          <li @click="ele.subMenu.length === 0 ? onClickMenu(ele.key) : ''"><router-link :to="ele.path" :tag="ele.subMenu.length === 0 ? 'a' : 'p'" :class="selectMenu === ele.key ? 'menu__link menu__link--current' : 'menu__link'">{{ele.title}}</router-link></li>
          <!-- <router-link :to="ele.path" class="menu__link" :tag="ele.subMenu.length === 0 ? 'a' : 'li'">{{ele.title}}</router-link> -->
          <li class="menu__child" v-for="(item, index) in ele.subMenu" :key="index" @click="onClickMenu(item.key)">
            <router-link :to="item.path" :class="selectMenu === item.key ? 'menu__link menu__link--current' : 'menu__link'">{{item.title}}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</aside>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'SideBar2',
  data() {
    return {
      menuDataSource: [
        // { title: '案场', path: '', key: 'case', subMenu: [{ title: '案场管理', path: '/web-admin', key: 'CaseManage' }] },
        { title: '案场', path: '/web-admin', key: 'CaseManage', subMenu: [] },
        { title: '组织', path: '/web-admin/organization', key: 'org', subMenu: [] },
        { title: '用户', path: '', key: 'user', subMenu: [{ title: '内部用户', path: '/web-admin/intUser', key: 'IntUser' }, { title: '外部用户', path: '/web-admin/extUser', key: 'ExtUser' }] }
        // { title: '权限', path: '', key: 'auth', subMenu: [] },
        // { title: '客户数据', path: '', key: 'cdata', subMenu: [{ title: '来电记录', path: '/', key: 'call' }, { title: '到访记录', path: '/', key: 'visit' }, { title: '成交记录', path: '/', key: 'deal' }, { title: '未分配客户', path: '/', key: 'unasign' }, { title: '新建客户', path: '/', key: 'newclient' }] },
        // { title: '硬件列表', path: '', key: 'hardw', subMenu: [] }
      ]
    }
  },
  computed: {
    ...mapState({
      loginName: state => state.LOGIN_NAME,
      name: state => state.NAME,
      mobile: state => state.MOBILE,
      number: state => state.NUMBER,
      selectMenu: state => state.SIDEBAR_SELECT
    }) },
  methods: {
    onClickMenu(key) {
      console.log('onClickMenu', key)
      this.$store.commit('initSideBar', key)
    }
  },
  beforeCreate() {
    // 获取localStorage中的用户信息
    this.$store.dispatch('getUserInfo')
  }
}
</script>
<style lang="less">
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
