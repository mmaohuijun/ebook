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
                  <div v-for="(item, index) in tabsList" :key="index" class="ivu-tabs-tab" :class="item.pathName === currentTabsName ? 'ivu-tabs-tab-active' : ''" @click="onClickTabs(item.pathName)">{{item.title}}</div>
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
      tabsList: [
        { title: '案场信息', pathName: 'CaseInfo' },
        { title: '项目信息', pathName: 'CaseProject' },
        { title: '维度信息', pathName: 'CaseAttrs' }
      ],
      currentTabsName: 'CaseInfo'
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  methods: {
    onClickTabs(pathName) {
      console.log('onClickTabs', pathName)
      this.currentTabsName = pathName
      this.$router.push({ name: pathName, params: { caseId: this.caseId } })
    }
  }
}
</script>
<style lang="less">
  .field-box {
    border:1px solid #979797;
    background: #fff;
    padding: 16px 33px;
  }
  .field-logo {
    float: left;
    width: 156px;
    height: 156px;
    background: #eee;
    border-radius: 4px;
    text-align: center;

    img {
      display: block;
      width: 156px;
      height: 156px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
  }

  .field-bottom-btn {
    text-align: right;
    padding: 30px 24px 0 0;
  }

  .field-bg {
    position: relative;
    float: right;
    background: #eee;

    img {
      display: block;
      width:450px;
      height:228px;
    }

    .btn-upload-field-bg {
      position: absolute;
      top: 16px;
      right: 19px;
      opacity:0.3;
      background:#000000;
      border-radius:4px;
      width:100px;
      height:32px;
      text-align: center;
      font-size:18px;
      color:#ffffff;
      border: none;
      padding: 0;

      span {
        line-height:32px;
      }
    }
  }

  .field-map {
    width: 100%;
    height: 430px;
  }

  .custom-tabs {
    overflow: visible;
    &.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
      height: 50px;
    }
    &.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
      font-size: 20px !important;
      height: 49px;
      line-height: 50px;
      padding: 0 28px;
      background-color: #fff;
      border-color: #fff;

      a {
        color: #888;
      }
    }

    &.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
      font-size: 20px !important;
      height: 50px;
      line-height: 50px;
      border-color: #ddd;

      a {
        color: #111;
      }
    }
  }

  .field-add-btn {
    display: block;
    margin-top: 14px;
    font-size: 15px;
  }
  .attrsinfo__card {
    position: relative;
    padding: 20px 20px 0;
    margin-bottom: 28px;
    background: #f8f8f8;
    border-radius: 5px;
    box-shadow:0 1px 1px 0 rgba(133,133,133,0.50);

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      .attrsinfo__card__tool {
        display: none !important;
      }

      .attr__item {
        i {
          display: none !important;
        }
      }
      .attr__item-add {
        display: none !important;
      }
    }

    &:last-child {
      margin-bottom: 10px;
    }

    &:hover {
      .attrsinfo__card__tool {
        display: block;
      }
    }

    &-active {
      box-shadow:0 1px 3px 0 #94d2ff;
      background: #fff;
      border:1px solid #94d2ff;
    }
  }

  .attrsinfo__card__info {
    overflow: hidden;
  }


  .attrsinfo__card__item {
    font-size: 17px;
    padding-bottom: 16px;

    > label {
      float: left;
    }

    &:nth-child(2) {
      padding-bottom: 0 !important;
    }
  }

  .attr__item {
    float: left;
    position: relative;
    height: 30px;
    line-height: 30px;
    padding: 0 24px 0 5px;
    margin: 0 16px 20px 0;
    border-radius: 15px;
    color: #fff;
    background: #5e6479;

    .attr__item_rank {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 8px;
      text-align: center;
      border-radius: 50%;
      background: #fff;
      color: #555;
      font-size: 14px;
    }

    > i.ivu-icon {
      display: none;
      position: absolute;
      top: 8px;
      right: 10px;
      font-size: 14px;
      color: #fff;
    }

    &:hover {
      > i.ivu-icon {
        display: block;
      }
    }
  }

  .attr__item_rank-red {
    color: #fa7b7b !important;
  }

  .attrsinfo__card__tool {
    display: none;
    position: absolute;
    top: 15px;
    right: 15px;
    > i {
      margin-left: 10px;
      font-size: 20px;
      color: #818181;
      cursor: pointer;
    }
  }

  .attr__item-add {
    text-align: center;
    width:140px;
    padding: 0;
    background:#b8bbc4;
    cursor: pointer;

    i {
      display: block !important;
      top: 3px !important;
      right: 55px !important;
      font-size: 24px !important;
      margin: 0 auto;
    }
  }

  .add-detail-attrs {
    display: inline;
    position: absolute;
    right: -30px;
    top: 2px;
    font-size: 24px;
    cursor: pointer;
  }
</style>
