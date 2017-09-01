<template>
<div>
  <Form :label-width="120" label-position="left">
    <div style="overflow: hidden; margin-bottom: 30px;">
      <div class="field-logo">
        <img v-if="logoUrl !== ''" :src="logoUrl"> 
        <img v-else src="/static/img/field_logo.png"> 
        <Button type="primary" class="custom-btn" @click="toggleUploadShow('logo')">更换logo</Button>
        <!-- url="http://172.18.84.75:88/admin/case/img-upload"  -->
         <img-upload field="file"
          v-model="logoUploadShow"
          @crop-upload-success="imgUploadSuccess"
          @crop-upload-fail="imgUploadFail"
          url="http://172.18.84.75:88/admin/case/img-upload"
          :width="156"
          :height="156"
          img-format="png"></img-upload>
      </div>
      <div style="float: left; padding-left: 21px;">
        <Form-item label="案场名称：">
          <Input placeholder="请输入" v-model="name"></Input>
        </Form-item>
        <Form-item label="公众号ID：">
          <Input placeholder="请输入" v-model="appID"></Input>
        </Form-item>
        <Form-item label="公众号名称：">
          <Input placeholder="请输入" v-model="appName"></Input>
        </Form-item>
        <!-- <Form-item label="Secretkey：">
          <Input placeholder="请输入" v-model="appSecret"></Input>
        </Form-item> -->
        <Form-item label="短信验证：">
          <i-switch v-model="checkCust">
            <span slot="open"></span>
            <span slot="close"></span>
          </i-switch>
        </Form-item>
      </div>
      <div class="field-bg">
        <img v-if="bgImgUrl !== ''" :src="bgImgUrl" alt="">
        <img v-else src="/static/img/field_bg.png" alt="">
        <Button type="ghost" class="btn-upload-field-bg" @click="toggleUploadShow('bg')">上传图片</Button>
        <img-upload field="file"
          v-model="bgUploadShow"
          @crop-upload-success="imgUploadSuccess"
          @crop-upload-fail="imgUploadFail"
          url="http://172.18.84.75:88/admin/case/img-upload"
          :width="450"
          :height="228"
          img-format="png"></img-upload>
      </div>
    </div>
    <div style="width: 540px; height: 43px;">
      <Form-item label="案场位置：" style="width: 440px; float: left;">
        <Input placeholder="请输入" v-model="address"></Input>
      </Form-item>
      <!-- <Button type="primary" class="custom-btn" style="float: right; margin-top: -2px;">确定</Button> -->
    </div>
    <div class="field-map" style="width: 100%; height:430px;">
      <case-map v-if="caseDataSource.length !== 0 || caseId === '0'" :location="location" @changeMarkerPoint="changeCaseLocation"></case-map>
    </div>
    <div class="field-bottom-btn">
      <Button type="primary" class="custom-btn" @click="saveCaseInfo">保存</Button>
    </div>
</Form>
</div>
</template>
<script>
import CaseMap from 'components/CaseMap'
import imgUpload from 'vue-image-crop-upload'

export default {
  data() {
    return {
      caseDataSource: [],
      name: '', // 案场名
      address: '', // 案场地址
      location: { lng: 121.4806, lat: 31.2408 }, // 案场的经纬度
      logoUrl: '', // 案场logo
      bgImgUrl: '', // 案场背景图
      checkCust: false, // 是否开启短信验证
      remark: '', // 描述
      appName: '', // 公众号名称
      appID: '', // 公众号id
      appSecret: '', // 公众号密码
      initialized: 0,
      displayPane: 'caseInfo', // 选项栏显示栏
      logoUploadShow: false,
      bgUploadShow: false
    }
  },
  computed: {
    caseId() {
      return this.$store.state.CASE_ID
    }
  },
  methods: {
    initCaseInfo() {
      this.$axios.get('case/detail', { params: { id: this.caseId } }).then(response => {
        if (response === null) return
        console.log('案场详情 response', response)
        const reData = response.data
        this.caseDataSource = reData
        for (const key in reData) {
          this[key] = reData[key]
        }
        // 全局设置案场名称
        this.$store.commit('initCaseName', this.name)
      })
    },
    // 改变地图坐标点
    changeCaseLocation(point) {
      console.log('changeCaseLocation', point)
      this.location = point
    },
    getCaseInfoData() {
      const data = {
        id: this.caseId,
        name: this.name,
        address: this.address,
        logoUrl: this.logoUrl,
        bgImgUrl: this.bgImgUrl,
        checkCust: this.checkCust,
        remark: this.remark,
        appName: this.appName,
        appID: this.appID,
        appSecret: this.appSecret,
        'location.lng': this.location.lng,
        'location.lat': this.location.lat
      }
      return data
    },
    // 案场信息 - 点击保存
    saveCaseInfo() {
      const data = this.getCaseInfoData()
      console.log('saveCaseInfo', data)
      this.$axios.get('case/save', { params: data }).then(response => {
        if (response === null) return
        console.log('案场详情保存 response', response)
        this.$Message.success({
          content: '保存成功',
          duration: 3
        })
      })
    },
    clearAllData() {
      this.name = ''
      this.address = ''
      this.logoUrl = ''
      this.bgImgUrl = ''
      this.checkCust = false
      this.remark = ''
      this.appName = ''
      this.appID = ''
      this.appSecret = ''
      this.location = { lng: 121.4806, lat: 31.2408 }
    },
    toggleUploadShow(key) {
      if (key === 'logo') {
        this.logoUploadShow = !this.logoUploadShow
      } else if (key === 'bg') {
        this.bgUploadShow = !this.bgUploadShow
      }
    },
    hideUpload() {
      this.logoUploadShow = false
      this.bgUploadShow = false
    },
    imgUploadSuccess(response) {
      console.log('--------imgUploadSuccess 上传成功 --------', response)
      if (this.logoUploadShow) {
        this.logoUrl = response.data
      } else if (this.bgUploadShow) {
        this.bgImgUrl = response.data
      }
      this.hideUpload()
    },
    imgUploadFail(status) {
      console.log('--------imgUploadFail 上传失败 --------', status)
    }
  },
  mounted() {
    if (this.caseId === '0') {
      // 新建案场
      this.clearAllData()
      return
    }
    this.initCaseInfo()
  },
  components: {
    CaseMap,
    imgUpload
  }
}
</script>
<style lang="less">
</style>
