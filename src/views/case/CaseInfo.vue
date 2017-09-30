<template>
<div>
  <Form :label-width="120" label-position="left">
    <div style="overflow: hidden; margin-bottom: 30px;">
      <div class="field-logo">
        <img v-if="logoUrl !== ''" :src="logoUrl">
        <img v-else :src="`${BASE_PATH}static/img/field_logo.png`">
        <Button type="primary" class="custom-btn" @click="toggleUploadShow('logo')">更换LOGO</Button>
        <!-- url="http://172.18.84.75:88/admin/case/img-upload"  -->
         <img-upload field="file"
          v-model="logoUploadShow"
          @crop-success="imgCropSuccess"
          :width="156"
          :height="156"
          img-format="png"></img-upload>
      </div>
      <div style="float: left; padding-left: 21px;">
        <Form-item label="案场名称：">
          <Input placeholder="请输入" v-model="name"></Input>
        </Form-item>
        <Form-item label="所属组织：">
          <Input placeholder="请输入" v-model="officeName" icon="plus-circled" @on-click="showOrgSelection"></Input>
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
        <div class="field-bg__title">案场图片：</div>
        <div class="field-bg__img">
          <img v-if="bgImgUrl !== ''" :src="bgImgUrl" alt="">
          <img v-else :src="`${BASE_PATH}static/img/field_bg.png`" alt="">
          <Button type="ghost" class="btn-upload-field-bg" @click="toggleUploadShow('bg')">上传图片</Button>
          <img-upload field="file"
            v-model="bgUploadShow"
            @crop-success="imgCropSuccess"
            :width="450"
            :height="228"
            img-format="png"></img-upload>
        </div>
      </div>
    </div>
    <div style="width: 540px; height: 43px;">
      <Form-item label="案场位置：" style="width: 440px; float: left;">
        <Input placeholder="请输入" v-model="address"></Input>
      </Form-item>
      <!-- <Button type="primary" class="custom-btn" style="float: right; margin-top: -2px;">确定</Button> -->
    </div>
    <div class="field-map" style="width: 100%; height:430px;">
      <div class="field-location">北纬N{{location.lat}}<br>东经E{{location.lng}}</div>
      <case-map v-if="caseDataSource.length !== 0 || caseId === '0'" :location="location" @changeMarkerPoint="changeCaseLocation"></case-map>
    </div>
    <div class="field-bottom-btn">
      <Button type="primary" class="custom-btn" @click="saveCaseInfo">保存</Button>
    </div>
  </Form>

  <Modal
    v-model="orgModal"
    :closable="false"
    :mask-closable="false"
    width="840">
    <p slot="header">组织选择</p>
    <div id="org-modal-wrap">
      <ebook-tree ref="ebTree" :tree-data="orgTreeData" @checked="onSelectedOrg"></ebook-tree>
    </div>
    <div slot="footer">
      <Button type="text" size="large" @click.stop="orgModalCancel">取消</Button>
      <Button type="primary" size="large" @click.stop="orgModalDone">完成</Button>
    </div>
  </Modal>
</div>
</template>
<script>
import CaseMap from 'components/CaseMap'
import imgUpload from 'vue-image-crop-upload'
import { mapGetters } from 'vuex'
import EbookTree from 'components/EbookTree'

export default {
  name: 'CaseInfo',
  components: {
    CaseMap,
    imgUpload,
    EbookTree
  },
  data() {
    return {
      caseDataSource: [],
      caseInfo: {
        name: '', // 案场名
        officeId: ''  // 所属组织id
      },
      name: '', // 案场名
      address: '', // 案场地址
      officeId: '',  // 所属组织id
      officeIdBackup: '',
      officeName: '',  // 所属组织名称
      location: { lng: 121.4806, lat: 31.2408 }, // 案场的经纬度
      logoUrl: '', // 案场logo
      bgImgUrl: '', // 案场背景图
      checkCust: false, // 是否开启短信验证
      remark: '', // 描述
      appName: '', // 公众号名称
      appID: '', // 公众号id
      appSecret: '', // 公众号密码
      uploadMode: '', // 上传标识 logo或者bg
      logoUploadShow: false,
      bgUploadShow: false,
      orgModal: false,
      orgTreeData: []
    }
  },
  computed: {
    ...mapGetters([
      'caseId',
      'BASE_PATH'
    ])
  },
  mounted() {
    this.initOrg()
    if (this.caseId === '0') {
      // 新建案场
      this.clearAllData()
      return
    }
    this.initCaseInfo()
  },
  methods: {
    // 点击'+'弹出组织选择
    showOrgSelection() {
      // 选中现在的组织
      this.$refs.ebTree.handleChecked(this.officeId)
      this.officeIdBackup = this.officeId
      this.orgModal = true
    },
    // 初始化组织
    initOrg() {
      this.$axios.get('office/tree').then(response => {
        if (response === null) return
        console.log('组织 response', response)
        const reData = response.data
        this.orgTreeData = reData
      })
    },
    // 点击组织选择
    onSelectedOrg(id, orgName) {
      console.log('onSelectedOrg', id, orgName)
      this.officeId = id
      this.officeName = orgName
    },
    orgModalDone() {
      console.log('orgModalDone')
      this.orgModal = false
    },
    orgModalCancel() {
      this.officeId = this.officeIdBackup
      this.$refs.ebTree.handleChecked(this.officeId)
      this.orgModal = false
    },
    // 初始化案场详情
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
        this.$store.dispatch('setCaseName', this.name)
      })
    },
    // 改变地图坐标点
    changeCaseLocation(point) {
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
        'location.lat': this.location.lat,
        officeId: Number(this.officeId) || 0
      }
      return data
    },
    // 案场信息 - 点击保存
    saveCaseInfo() {
      const requestData = this.getCaseInfoData()
      console.log('saveCaseInfo', requestData)
      this.$axios.get('case/save', { params: requestData }).then(response => {
        if (response === null) return
        console.log('案场详情保存 response', response)
        this.$Message.success({
          content: '保存成功',
          duration: 3
        })
        // 新建成功后返回新案场caseId
        this.$store.dispatch('setCaseId', response.data)
        this.initCaseInfo()
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
      this.officeId = ''
      this.officeName = ''
      this.location = { lng: 121.4806, lat: 31.2408 }
    },
    toggleUploadShow(key) {
      this.uploadMode = key
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
    /**
     * database64文件格式转换为2进制
     *
     * @param  {[String]} data dataURL 的格式为 “data:image/png;base64,****”,逗号之前都是一些说明性的文字，我们只需要逗号之后的就行了
     * @return {[blob]}      [description]
     */
    data2blob(data) {
      data = data.split(',')[1]
      data = window.atob(data)
      const ia = new Uint8Array(data.length)
      for (let i = 0; i < data.length; i++) {
        ia[i] = data.charCodeAt(i)
      }
      // canvas.toDataURL 返回的默认格式就是 image/png
      return new Blob([ia], {
        type: 'image/png'
      })
    },
    imgCropSuccess(imgDataUrl, field) {
      const fmData = new FormData()
      fmData.append('file', this.data2blob(imgDataUrl), `${field}.png`)
      this.imgUpload(fmData)
    },
    // 图片上传
    imgUpload(data) {
      this.$axios.post('case/img-upload', data).then(response => {
        if (response === null) return
        console.log('图片上传 response', response)
        if (this.uploadMode === 'logo') {
          this.logoUrl = response.data
        } else if (this.uploadMode === 'bg') {
          this.bgImgUrl = response.data
        }
      })
    }
  }
}
</script>
<style lang="less">
.ivu-input-icon {
  width: 29px;
  height: 29px;
  line-height: 29px;
  cursor: pointer;
}

#org-modal-wrap {
  width: 750px;
  margin: 11px 29px 0;
  border-radius: 5px;
  background-color: #ffffff;
  border: solid 1px #dfdfdf;
  overflow: hidden;
  font-size: 16px;

  .ebook-tree {
    border: none;
    border-radius: 5px;
    overflow: hidden;
  }

  .ebook-tree__root {
    display: flex;
    height: 30px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #dbdce1;
  }

  .ebook-tree__children > li .ebook-tree__children {
    padding-left: 23px;
  }

  .ivu-checkbox {
    vertical-align: baseline;
    &-checked,
    &-inner {
      width: 14px;
      height: 14px;
    }
  }

  .ebook-tree__item{
    display: flex;
    height: 30px;
    line-height: 30px;
    border: none;
  }

  .ivu-checkbox-wrapper {
    height: 30px;
    margin-left: 14px;
    line-height: 30px;
    color: #111;
    font-size: 16px;
  }

  .ebook-tree__item--expand {
    cursor: pointer;
    line-height: 30px;
    font-size: 16px;
  }

}
</style>
