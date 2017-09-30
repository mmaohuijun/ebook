<template>
<aside class="layout__aside">
  <div class="layout__aside_scroll">
    <div class="layout__aside-header">
      <div class="layout__aside-avatar"><img :src="`${BASE_PATH}static/img/avatar.png`" alt=""><div class="logout" @click="logout">注销</div></div>
      <p class="layout__aside-name">{{name}}</p>
      <ul class="layout__aside-info">
        <li>
          <p>工号：{{no}}</p>
           <router-link :to="`${BASE_PATH}setting/modpsw`">修改密码</router-link> 
        </li>
        <li>
          <p>联系方式：{{mobile}}</p>
          <!-- <router-link to="/">修改</router-link> -->
        </li>
      </ul>
    </div>
    <ul class="laylout__aside-menu" v-if="sideBarMenu.length !== 0">
      <li class="menu__item" v-for="(ele, index) in sideBarMenu" :key="index">
        <ul>
          <li @click="ele.children.length === 0 ? onClickMenu(ele.name) : ''">
            <a href="javascript:;" v-if="ele.children.length === 0" :class="sideBarSelect === ele.name ? 'menu__link menu__link--current' : 'menu__link'">{{ele.title}}</a>
            <p v-else :class="sideBarSelect === ele.name ? 'menu__link menu__link--current' : 'menu__link'">{{ele.title}}</p>
          </li>
          <li class="menu__child" v-for="(item, index) in ele.children" :key="index" @click="onClickMenu(item.name)">
            <a href="javascript:;" :class="sideBarSelect === item.name ? 'menu__link menu__link--current' : 'menu__link'">{{item.title}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</aside>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'SideBar2',
  data() {
    return {
      sideBarMenu: []
    }
  },
  computed: {
    ...mapState({
      // sideBarMenu: state => state.app.sideBarMenu,
      sideBarSelect: state => state.app.sideBarSelect
    }),
    ...mapGetters([
      'hasUserInfo',
      'name',
      'mobile',
      'no',
      'auth',
      'loginName',
      'sideBarMenuMap',
      // 'sideBarMenu',
      // 'sideBarSelect',
      'BASE_PATH'
    ])
  },
  methods: {
    onClickMenu(name) {
      console.log('onClickMenu', name)
      this.$router.push({ name })
    },
    logout() {
      this.$axios.post('/logout').then(response => {
        if (response === null) return
        this.$store.dispatch('toggleLoginStatus', false)
        this.$store.dispatch('clearUserInfo')
        this.$router.replace('/')
      })
    },
    setSideBarMenu() {
      console.log('setSideBarMenu', this.sideBarMenu)
      this.sideBarMenu = []
      let hasSameMenu = false
      _.each(this.auth, key => {
        hasSameMenu = false
        if (!_.isEmpty(this.sideBarMenu)) {
          _.each(this.sideBarMenu, menuItem => {
            if (menuItem.name === this.sideBarMenuMap[key].name) {
              _.mergeWith(menuItem, this.sideBarMenuMap[key], (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                  return _.uniq(objValue.concat(srcValue))
                }
              })
              hasSameMenu = true
            }
          })
        }
        if (hasSameMenu) return
        this.sideBarMenu.push(this.sideBarMenuMap[key])
      })
    }
  },
  mounted() {
    console.log('侧边栏', this.sideBarMenu)
    this.setSideBarMenu()
    // this.$store.dispatch('setSideBarMenu')
    setTimeout(() => {
      console.log('2s侧边栏', this.sideBarMenu)
    }, 2000)
  },
  destroyed() {
    this.$router.go(0)
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
      position: relative;
      width: 116px;
      height: 116px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 116px;
        height: 116px;
        border-radius: 50%;
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

  .logout {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background:rgba(0,0,0,.7);
    text-align: center;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
</style>
