<template>
<div class="layout__header">
  <h2 class="layout__header-title">{{headerTitle}}</h2>
  <div class="layout__header-tool">

    <span v-if="dateSearch" style="font-size:16px; color:#fff; padding: 0 10px;">时间</span>

    <Date-picker
      class="custom__input--white custom__date-picker"
      v-if="dateSearch"
      type="daterange"
      confirm
      :editable="false"
      format="yyyy-MM-dd"
      :value="date" 
      placement="bottom-end"
      placeholder="选择日期"
      style="width: 190px; margin-right: 30px"
      @on-change="onDateChange"
      @on-ok="onDateSearch"></Date-picker>

    <Input v-if="textSearch" class="custom__search" icon="search" v-model="seachText" :placeholder="placeholder" @on-click="onTextSearch"></Input>

    <Button v-if="deleteBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" @click="onDelete"></Button>
    <Button v-if="addBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="onAdd"></Button>
  </div>
</div>
</template>
<script>
export default {
  name: 'EbookHeader',
  data() {
    return {
      date: '',
      startDate: '',
      endDate: '',
      seachText: ''
    }
  },
  props: {
    // 头部标题
    headerTitle: {
      type: String,
      default: ''
    },
    // 日期搜索
    dateSearch: {
      type: Boolean,
      default: false
    },
    // 文字搜索
    textSearch: {
      type: Boolean,
      default: false
    },
    // 文字搜索框的占位文字
    placeholder: {
      type: String,
      default: ''
    },
    // 删除按钮
    deleteBtn: {
      type: Boolean,
      default: false
    },
    // 添加按钮
    addBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onDateChange(daterange) {
      console.log('onDateChange', daterange)
      this.startDate = daterange[0]
      this.endDate = daterange[1]
    },
    // 点击'确认'进行日期搜索
    onDateSearch() {
      console.log('onDateSearch')
      this.$emit('onDateSearch', this.startDate, this.endDate)
    },
    // 点击'搜索'
    onTextSearch() {
      this.$emit('onTextSearch', this.seachText)
    },
    // 点击'删除'
    onDelete() {
      console.log('onDelete!!!!')
      this.$emit('onDelete')
    },
    // 点击'新增'
    onAdd() {
      this.$emit('onAdd')
    }
  }
}
</script>
<style lang="less">
</style>
