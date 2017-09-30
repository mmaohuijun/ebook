<template>
  <div class="layout">
    <side-bar></side-bar>
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
import SideBar from './SideBar2'
import HeadBar from './HeadBar'

export default {
  name: 'layout',
  data() {
    return {
    }
  },
  components: {
    SideBar,
    HeadBar
  }
}
</script>

<style lang="less">
.custom{
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

  .layout {
    height: 100%;
  }

  .layout__content {
    height: 100%;
    margin-left: 260px;
  }

  .layout__header {
    height: 60px;
    background:#8189bb;

    &-title {
      float: left;
      line-height: 60px;
      padding-left: 18px;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
    }

    &-tool {
      float: right;
      padding-top: 16px;
      padding-right: 29px;
    }
  }

  .layout__body {
    position: relative;
    padding: 20px 31px 20px 20px;
    height: ~'calc(100% - 60px)';
    overflow-y: auto;
    background: #f3f3f3;
  }

  .custom__search {
    width: 180px !important;
    .ivu-input {
      height: 28px;
      border-color: transparent;
      border-radius: 14px;
      font-size: 14px;
      &:hover {
        border-color: transparent;
      }
      &:focus {
        border-color: transparent;
        outline: 0;
        box-shadow: none;
      }
    }

    .ivu-icon {
      width: 28px;
      height: 28px;
      line-height: 28px;
    }
  }

  .custom__input--white {
    .ivu-input {
      height: 28px;
      border-color: transparent;
      font-size: 14px;
      &:hover {
        border-color: transparent;
      }
      &:focus {
        border-color: transparent;
        outline: 0;
        box-shadow: none;
      }
    }

    .ivu-icon {
      width: 28px;
      height: 28px;
      line-height: 28px;
    }
  }

  .custom__circle-btn--white.ivu-btn-circle {
    width: 28px;
    height: 28px;
    line-height: 28px;
    margin-left: 20px;
    background: #fff;
    border-color: transparent;
    color: #8189bb;
  }

  .custom__table {
    border: none;
    .ivu-table {
      &:before,
      &:after {
        display: none;
      }
      th,
      td {
        border:none;
        text-align: center;
      }
    }

    .ivu-table th {
      height: 60px;
      background: #fff;
      font-size: 18px;
      font-weight: 700;
      color: #4f546d;
    }

    .ivu-table-body {
      tr {
        td {
          height: 50px;
          font-size: 16px;
          color: #555;
        }

        &:nth-child(2n+1) td {
          background: #f8f8f8;
        }
      }
    }
  }

  .ivu-checkbox,
  .auth .authority .ivu-checkbox {
    &-inner {
      width: 18px;
      height: 18px;
      background: #d2e9fb;
      border-radius: 4px;
      border: none;

      &:after {
        display: none;
      }
    }

    &-checked {
      .ivu-checkbox-inner {
        width: 18px;
        heigth: 18px;
        background: #1c93ea;
        &:after{
          display: none;
        }
      }
    }
  }

  .custom__page {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    &,
    a,
    a:hover {
      color: #999;
    }
    .ivu-page-item-jump-prev,
    .ivu-page-item-jump-next,
    .ivu-page-item,
    .ivu-page-next,
    .ivu-page-prev {
      float: left;
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      margin: 0;
      border-radius: 0;
      margin-left: -1px;
      border-color: #ddd;
      color: #999;
      &:hover {
        border-color: #ddd;
      }
    }

    .ivu-page-prev,
    .ivu-page-next {
      a {
        font-size: 30px;
      }
    }

    .ivu-page-prev {
      border-radius: 4px 0 0 4px;
    }

    .ivu-page-next {
      border-radius: 0 4px 4px 0;
    }

    .ivu-page-item-active {
      background: #fff;
      border-color: #ddd;
      a {
        color: #111;
        font-weight: 700;
      }
    }

    .ivu-page-disabled {
      a {
        color: #ddd;

        &:hover {
          color: #ddd;
        }
      }
    }
  }

  .custom-btn {
    height: 32px;
    font-size: 18px;
    padding: 0 22px;
    background: #1c93ea;

    &:hover,
    &:focus {
      background: #1c93ea;
    }
  }

  .custom-secondary-btn {
    height: 32px;
    font-size: 18px;
    padding: 0 22px;
    background: #d8d8d8;
    border-color: #d8d8d8;
    color: #555;

    &:hover,
    &:focus {
      background: #d8d8d8;
      color: #555;
    }
  }

  .ivu-form .ivu-form-item-label {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .ivu-form-item {
    margin-bottom: 24px;
  }

  .ivu-form-item-content {
    line-height: 28px;
  }

  .ivu-input {
    height: 28px;
    font-size: 16px;
    border-color: #979797;

    &:focus {
      box-shadow: none;
      border-color: #979797;
    }

    &:hover {
      border-color: #979797;
    }
  }

  .ivu-switch-checked {
    background-color: #1cea35;
    border-color: #1cea35;
  }

  .ivu-modal-header {
    border-color: #8189bb;
    p,
    .ivu-modal-header-inner {
      text-align: center;
      font-size:20px;
      color:#4e546c;
      font-weight: 400;
    }
  }

  .ivu-modal-footer {
    padding: 30px 0;
    border-top: none;
    text-align: center;

    .ivu-btn {
      height: 32px;
      line-height: 32px;
      padding: 0 22px;
      font-size: 18px;

      &.ivu-btn-primary {
        background: #1c93ea;

        &:hover,
        &:active {
          background: #1c93ea;
        }
      }
    }

    .ivu-btn:first-child {
      margin-right: 70px;
      background: #d8d8d8;
      color: #555;
    }
  }

  .modal-form {
    .ivu-form-item {
      margin-bottom: 22px;
    }
  }

  .ivu-select-selection {
    height: 28px;
    font-size: 16px;
    border-color: #979797;

    &:hover,
    &:focus,
    &:active {
      box-shadow: none;
      border-color: #979797;
    }

    > .ivu-select-placeholder,
    > .ivu-select-selected-value {
      font-size: 16px !important;
    }
  }

  .ivu-select-item {
    font-size: 16px !important;
  }

  .ivu-select-arrow {
    font-size: 24px;
    margin-top: -12px;
  }

  .ivu-select-visible .ivu-select-selection {
    box-shadow: none;
    border-color: #979797;
  }

  .ivu-select-dropdown {
    margin: -1px 0 0;
    box-shadow: none;
    border: 1px solid #979797;
  }

  .custom__date-picker {
    .ivu-input {
      padding-right: 7px;
    }
    i[class*="calendar"] {
      display: none;
    }
  }

  .ivu-modal .ivu-select-dropdown {
    position: fixed!important;
  }
  
  .ivu-table-sort {
  top: -2px;
  width: 14px;
  height: 16px;

  i {
    height: 7px;
  }
}

}



.ivu-checkbox-indeterminate .ivu-checkbox-inner {

  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 9px;
    width: 18px;
    border-radius: 0 0 4px 4px;
    background: #1c93ea;
  }
}

.modal-style{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding-top: 15px;
  color: #4E546C;
}
</style>
