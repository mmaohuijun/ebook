<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">权限</h2>
    <div class="layout__header-tool">
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus"></Button>
    </div>
  </div>
  <div class="layout__body">
    <table class="authority" cellspacing="0" cellpadding="0" border="0">

      <tr>
        <td class="authority-row-title">权限一</td>
        <td>
          <div class="authority-check-all"><Checkbox>案场</Checkbox></div>
        </td>
        <td>
          <div class="authority-check-all"><Checkbox>组织</Checkbox></div>
        </td>
        <td>
          <div class="authority-check-all"><Checkbox>内部用户</Checkbox></div>
          <div class="authority-check-items">
            <div class="authority-check-item"><Checkbox>内部用户</Checkbox></div>
            <div class="authority-check-item"><Checkbox>外部用户</Checkbox></div>
            <div class="authority-check-item"><Checkbox>禁用用户</Checkbox></div>
          </div>
        </td>
        <td>
          <div class="authority-check-all"><Checkbox>权限</Checkbox></div>
        </td>
        <td>
          <div class="authority-check-all"><Checkbox>客户数据</Checkbox></div>
          <div class="authority-check-items">
            <div class="authority-check-item"><Checkbox>来电客户</Checkbox></div>
            <div class="authority-check-item"><Checkbox>到访客户</Checkbox></div>
            <div class="authority-check-item"><Checkbox>成交客户</Checkbox></div>
            <div class="authority-check-item"><Checkbox>未分配客户</Checkbox></div>
            <div class="authority-check-item"><Checkbox>新建客户</Checkbox></div>
          </div>
        </td>
      </tr>

      <tr class="authority-row-current" v-for="(auth, index) in authData" :key="index"> 
        <td class="authority-row-title">{{auth.name}}</td>
        <td v-for="(item, indexNum) in auth.menus" :key="indexNum">
          <div class="authority-check-all">
            <Checkbox :indeterminate="item.checked === 2" :value="item.checked !== 2">{{item.name}}</Checkbox>
          </div>
          <div class="authority-check-items" v-if="item.hasSubMenus">
            <div class="authority-check-item" v-for="(subItem, subIndex) in item.subMenus" :key="subIndex">
              <Checkbox :value="subItem.checked === 1">{{subItem.name}}</Checkbox>
            </div>
          </div>
        </td>
      </tr>

      <tr class="authority-row-current" v-for="(auth, index) in authData" :key="index"> 
        <td class="authority-row-title">{{auth.name}}</td>
        <ebook-authority-item
          v-for="(item, indexNum) in auth.menus"
          :key="indexNum"
          :auth-data="item"
          @checkAllAuth="checkAllAuth"></ebook-authority-item>
      </tr>



    </table>
  </div>
</div>
</template>
<script>
import EbookAuthorityItem from 'components/EbookAuthorityItem'

export default {
  name: 'Authority',
  components: {
    EbookAuthorityItem
  },
  data() {
    return {
      atuhMenus: [],
      authData: [
        {
          name: '权限1',
          id: '100',
          menus: [
            {
              name: '案场',
              id: '11',
              hasSubMenus: false,
              checked: 1, // 整个菜单（包括子菜单）权限都有
              subMenus: []
            },
            {
              name: '组织',
              id: '22',
              hasSubMenus: false,
              checked: 0, // 整个菜单（包括子菜单）权限全都没有
              subMenus: []
            },
            {
              name: '用户',
              id: '33',
              hasSubMenus: true,
              checked: 1, // 有菜单部分子菜单的权限
              subMenus: [
                {
                  name: '内部用户',
                  id: '3301',
                  checked: 1
                },
                {
                  name: '外部用户',
                  id: '3302',
                  checked: 1
                }
              ]
            },
            {
              name: '权限',
              id: '44',
              hasSubMenus: false,
              checked: 0, // 整个菜单（包括子菜单）权限全都没有
              subMenus: []
            },
            {
              name: '客户数据',
              id: '55',
              hasSubMenus: true,
              checked: 2, // 有菜单部分子菜单的权限
              subMenus: [
                {
                  name: '来电客户',
                  id: '5501',
                  checked: 1
                },
                {
                  name: '到访客户',
                  id: '5502',
                  checked: 0
                },
                {
                  name: '成交客户',
                  id: '5503',
                  checked: 1
                },
                {
                  name: '未分配客户',
                  id: '5504',
                  checked: 0
                },
                {
                  name: '新建客户',
                  id: '5505',
                  checked: 0
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    checkAllAuth(authId, subAuthId) {
      console.log('checkAllAuth', authId, subAuthId)
    },
    checkAllChange(data) {
      console.log('checkAllChange', data)
    }
  }
}
</script>
<style lang="less">
  .authority {
    width: 100%;
    background: #fff;

    tr:nth-child(even) {
      background: #f8f8f8;
    }

    td {
      min-height: 70px;
      vertical-align: top;
      padding: 10px;
    }
  }

  .authority-check-all,
  .authority-check-item {
    display: block;
    padding: 10px 0;
    &.ivu-checkbox-wrapper,
    .ivu-checkbox-wrapper {
      font-size: 18px;
    }
  }

  .authority-check-items {
    display: none;
    padding-left: 24px;
  }

  .authority-row-current {
    background:#fff !important;
    box-shadow:0 3px 3px 0 #94d2ff;
    border-radius: 0 0 5px 5px;
    > td {
      border-top: 1px solid #94d2ff;
      border-bottom: 1px solid #94d2ff;
    }
    > td:first-child {
      border-left: 1px solid #94d2ff;
      border-radius: 0 0 0 5px;
    }
    > td:last-child {
      border-right: 1px solid #94d2ff;
      border-radius: 0 0 5px 0;
    }

    .authority-check-items {
      display: block;
    }
  }

  .authority-row-title {
    font-size: 20px;
    padding: 18px 18px 18px 38px !important;
  }
</style>
