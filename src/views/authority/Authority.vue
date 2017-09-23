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
      <tr class="authority-row-current" v-for="(ele, index) in authData" :key="index">
        <td class="authority-row-title">{{ele.title}}</td>
        <td v-for="(item, indexNum) in ele.children" :key="indexNum">
          <div class="authority-check-all">
            <Checkbox :indeterminate="item.indeterminate" :value="item.checked">{{item.label}}</Checkbox>
          </div>
          <div class="authority-check-items" v-if="item.children.length !== 0">
            <div class="authority-check-item" v-for="(subItem, subIndex) in item.children" :key="subIndex">
              <Checkbox :value="subItem.checked">{{subItem.label}}</Checkbox>
            </div>
          </div>
        </td>
      </tr>

      <tr class="authority-row-current">
        <td class="authority-row-title">权限一</td>
        <td>
          <div class="authority-check-all"><Checkbox>案场</Checkbox></div>
        </td>
        <td>
          <div class="authority-check-all"><Checkbox>组织</Checkbox></div>
        </td>
        <td>
          <div class="authority-check-all"><Checkbox :indeterminate="true" :value="true">用户</Checkbox><div class="triangle-right"></div></div>
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
    </table>
  </div>
</div>
</template>
<script>
export default {
  name: 'Authority',
  data() {
    return {
      authData: [
        {
          title: '权限1',
          id: '100',
          children: [
            {
              label: '案场',
              key: '01',
              indeterminate: false, // 是否有选中的子选项
              checked: true,
              children: []
            },
            {
              label: '组织',
              key: '02',
              indeterminate: false, // 是否有选中的子选项
              checked: false,
              children: []
            },
            {
              label: '用户',
              key: '03',
              indeterminate: true, // 是否有选中的子选项
              checked: false,
              children: [
                {
                  label: '内部用户',
                  key: '04',
                  checked: true
                },
                {
                  label: '外部用户',
                  key: '05',
                  checked: false
                },
                {
                  label: '禁用用户',
                  key: '06',
                  checked: false
                }
              ]
            }
          ]
        }
      ]
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
    padding: 10px 0;
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
