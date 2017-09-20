<template>
<div class="layout__content">
  <!-- <div class="layout__header">
    <h2 class="layout__header-title">客户数据 - 成交客户</h2>
    <div class="layout__header-tool">
      <span style="font-size:16px; color:#fff; padding: 0 10px;">时间</span>
      <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" v-model="startDate" placeholder="开始日期" :clearable="false" style="width: 95px"></Date-picker>
      <span style="font-size:16px; color:#fff; padding: 0 10px;">-</span>
      <Date-picker confirm :editable="false" class="custom__input--white custom__date-picker" type="date" format="yyyy-MM-dd" v-model="endDate" placeholder="结束日期" :clearable="false" style="width: 95px; margin-right: 30px;"></Date-picker>
      <Input class="custom__search" icon="search" placeholder="姓名／手机号"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus"></Button>
    </div>
  </div> -->

  <ebook-header
    header-title="客户数据 - 成交客户"
    :dateSearch="true"
    :textSearch="true"
    placeholder="姓名／手机号"
    :deleteBtn="true"
    :addBtn="true"
    @onTextSearch="onTextSearch"
    @onDateSearch="onDateSearch"></ebook-header>

  <!-- <div class="layout__body">
    <Table class="custom__table" :columns="userListTitle" :data="userListData" @on-selection-change="onSelect"></Table>
    <Spin size="large" fix v-if="false"></Spin>
    <Page style="margin-top: 14px;" class="custom__page" :current="pageNo" :total="total" :page-size="pageSize" @on-change="pageChange"></Page>
  </div> -->
</div>
</template>
<script>
import EbookHeader from 'components/EbookHeader'

export default {
  name: 'DealClient',
  data() {
    return {
      startDate: '',
      endDate: '',
      searchText: ''
    }
  },
  methods: {
    onDateSearch(starDate, endDate) {
      console.log('onDateSearch!!!!', starDate, endDate)
      this.startDate = starDate
      this.endDate = endDate
      /** 搜索方法 */
    },
    onTextSearch(searchText) {
      this.searchText = searchText
      /** 搜索方法 */
    }
  },
  components: {
    EbookHeader
  }
}
</script>
<style lang="css">
</style>
