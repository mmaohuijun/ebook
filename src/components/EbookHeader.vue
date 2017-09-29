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

    <span v-if="uploadBtn" class="custom__circle-btn--white ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-icon-only" @click="onUpload">
      <i class="iconfont icon-piliangshangchuan"></i>
    </span>
    
    <!-- <Button v-if="uploadBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="upload" @click="onUpload"></Button> -->
    <Button v-if="linkBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="link" @click="onLink"></Button>
    <Button v-if="keyBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="key" @click="onKey"></Button>
    <!-- <Button v-if="lockBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="locked" @click="onLock"></Button> -->
    <span v-if="lockBtn" class="custom__circle-btn--white ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-icon-only" @click="onLock">
      <i class="iconfont icon-suoding"></i>
    </span>
    <Button v-if="deleteBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" @click="onDelete"></Button>
    <!-- <Button v-if="addBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="plus" @click="onAdd"></Button> -->
    <span v-if="addBtn" class="custom__circle-btn--white ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-icon-only" @click="onAdd">
      <i class="iconfont icon-tianjia1"></i>
    </span>
    <Button v-if="cutBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="link" @click="onCutRelation"></Button>
    <Button v-if="disBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="link" @click="onDistributeClient"></Button>
    <Button v-if="delBtn" class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a" @click="onDeleteClient"></Button>
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
    // 上传按钮
    uploadBtn: {
      type: Boolean,
      default: false
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
    },
    // 分配按钮
    linkBtn: {
      type: Boolean,
      default: false
    },
    // 禁用按钮
    lockBtn: {
      type: Boolean,
      default: false
    },
    // 解锁按钮
    keyBtn: {
      type: Boolean,
      default: false
    },
    // 解除关系按钮
    cutBtn: {
      type: Boolean,
      default: false
    },
    // 删除客户按钮
    delBtn: {
      type: Boolean,
      default: false
    },
    // 分配客户
    disBtn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 选择了时间范围, 返回daterange是一个数组[开始日期, 结束日期]
    onDateChange(daterange) {
      console.log('onDateChange', daterange)
      this.startDate = daterange[0]
      this.endDate = daterange[1]
    },
    // 点击'确认'进行日期搜索
    onDateSearch() {
      this.$emit('onDateSearch', this.startDate, this.endDate)
    },
    // 点击'搜索'
    onTextSearch() {
      // 把搜索词传出去
      this.$emit('onTextSearch', this.seachText)
    },
    // 点击'上传'
    onUpload() {
      this.$emit('onUpload')
    },
    // 点击'删除'
    onDelete() {
      this.$emit('onDelete')
    },
    // 点击'新增'
    onAdd() {
      this.$emit('onAdd')
    },
    // 点击'分配'
    onLink() {
      this.$emit('onLink')
    },
    // 点击'禁用'
    onLock() {
      this.$emit('onLock')
    },
    // 点击'解锁'
    onKey() {
      this.$emit('onKey')
    },
    // 点击'解除关系'
    onCutRelation() {
      this.$emit('onCutRelation')
    },
    // 点击'删除客户'
    onDeleteClient() {
      this.$emit('onDeleteClient')
    },
    // 点击'分配客户'
    onDistributeClient() {
      this.$emit('onDistributeClient')
    }
  }
}
</script>
<style lang="less">
</style>
