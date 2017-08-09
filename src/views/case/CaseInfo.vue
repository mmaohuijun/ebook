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
    }

    &.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
      font-size: 20px !important;
      height: 50px;
      line-height: 50px;
      border-color: #ddd;
      color: #111;
    }
  }
</style>
<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理 - {{this.caseId === '0' ? '新建客户' : caseDataSource.name}}</h2>
  </div>
  <div class="layout__body">
    <div class="field-box">
    <Tabs :value="displayPane" type="card" class="custom-tabs">
      <Tab-pane label="案场信息" name="caseInfo">
          <Form :model="formItem" :label-width="120" label-position="left">
              <div style="overflow: hidden; margin-bottom: 30px;">
                <div class="field-logo">
                    <img src="../../assets/field_logo.jpg">
                    <!-- <Button type="primary" class="custom-btn">更换logo</Button> -->
                </div>
                <div style="float: left; padding-left: 21px;">
                  <Form-item label="案场名称：">
                    <Input placeholder="请输入" v-model="name"></Input>
                  </Form-item>
                  <Form-item label="所属组织：">
                    <Input placeholder="请输入"></Input>
                  </Form-item>
                  <Form-item label="公众号名称：">
                    <Input placeholder="请输入" v-model="appName"></Input>
                  </Form-item>
                  <Form-item label="公众号ID：">
                    <Input placeholder="请输入" v-model="appID"></Input>
                  </Form-item>
                  <Form-item label="Secretkey：">
                    <Input placeholder="请输入" v-model="appSecret"></Input>
                  </Form-item>
                  <Form-item label="短信验证：">
                    <i-switch v-model="checkCust">
                      <span slot="open"></span>
                      <span slot="close"></span>
                    </i-switch>
                  </Form-item>
                </div>
                <div class="field-bg">
                  <img src="../../assets/field_bg.jpg" alt="">
                  <!-- <Button type="ghost" class="btn-upload-field-bg">上传图片</Button> -->
                </div>
              </div>
              <div style="width: 540px; height: 43px;">
                <Form-item label="案场位置：" style="width: 440px; float: left;">
                  <Input placeholder="请输入" v-model="address"></Input>
                </Form-item>
                <!-- <Button type="primary" class="custom-btn" style="float: right; margin-top: -2px;">确定</Button> -->
              </div>
              <div class="field-map" style="width: 100%; height:430px;">
                <case-map :location="location" @changeMarkerPoint="changeCaseLocation"></case-map>
              </div>
              <div class="field-bottom-btn">
                <Button type="primary" class="custom-btn" @click="saveCaseInfo">保存</Button>
              </div>
          </Form>
      </Tab-pane>
      <Tab-pane label="项目信息" name="projectInfo" disabled>
          <!-- 敬请期待 -->
          <Row :gutter="16">
              <Col :md="24" :lg="8" style="margin-bottom: 16px;">
                  <Button type="dashed" icon="plus-round" long style="height: 230px; font-size: 30px;">添加项目</Button>
              </Col>
              <Col :md="24" :lg="8" style="margin-bottom: 16px;">
                  <Card>
                      <p class="field_name">金地意境一期</p>
                      <p class="house_type">别墅、公寓、洋房</p>
                      <p class="field_tool">
                          <a href="#">
                              <Tooltip placement="top" content="修改">
                                  <Icon type="ios-compose-outline"></Icon>
                              </Tooltip>
                          </a>
                          <a href="#">
                              <Tooltip placement="top" content="删除">
                                  <Icon type="ios-trash-outline"></Icon>
                              </Tooltip>
                          </a>
                      </p>
                      <ul>
                        <li v-for="(item, index) in houseTypeList" :key="index">
                            <Tag>{{ item.type + ' '}}</Tag>
                            {{item.name + ' ' + item.area }}
                        </li>
                      </ul>
                  </Card>
              </Col>
              <Col :md="24" :lg="8" style="margin-bottom: 16px;">
                  <Card>
                      <p slot="title">
                          金地意境一期
                      </p>
                      <a href="#" slot="extra" style="font-size: 16px; margin-right: 8px">
                          <Icon type="ios-compose-outline"></Icon>
                      </a>
                      <a href="#" slot="extra" style="font-size: 16px;">
                          <Icon type="ios-trash-outline"></Icon>
                      </a>

                      <p class="house_type">别墅、公寓、洋房</p>
                      <ul>
                          <li v-for="(item, index) in houseTypeList" :key="index">
                              <Tag>{{ item.type + ' '}}</Tag>
                              {{item.name + ' ' + item.area }}
                          </li>
                      </ul>
                  </Card>
              </Col>
          </Row>
          <Row>
              <Col :sm="21">
                  <Form :model="formItem" :label-width="100" style="padding-top: 8px;">
                      <Form-item label="项目名称：">
                          <Input placeholder="请输入" value="金地意境一期"></Input>
                      </Form-item>
                      <Form-item label="户型列表：" class="house_type_list">
                          <div style="margin-bottom: 8px">
                              <Select v-model="houseTypeModel1" style="width:80px">
                                  <Option v-for="item in houseTypeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Select v-model="houseTypeModel2" style="width:80px">
                                  <Option v-for="item in houseTypeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>室</span>
                              <Select v-model="houseTypeModel3" style="width:80px">
                                  <Option v-for="item in houseTypeList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>厅</span>
                              <Select v-model="houseTypeModel4" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>
                              <span>-</span>
                              <Select v-model="houseTypeModel5" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>

                              <Button-group>
                                  <Button type="ghost" icon="arrow-up-c"></Button>
                                  <Button type="ghost" icon="arrow-down-c"></Button>
                                  <Button type="ghost" icon="trash-b"></Button>
                              </Button-group>
                          </div>
                          <div style="margin-bottom: 8px">
                              <Select v-model="houseTypeModel1" style="width:80px">
                                  <Option v-for="item in houseTypeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Select v-model="houseTypeModel2" style="width:80px">
                                  <Option v-for="item in houseTypeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>室</span>
                              <Select v-model="houseTypeModel3" style="width:80px">
                                  <Option v-for="item in houseTypeList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>厅</span>
                              <Select v-model="houseTypeModel4" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>
                              <span>-</span>
                              <Select v-model="houseTypeModel5" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>

                              <Button-group>
                                  <Button type="ghost" icon="arrow-up-c"></Button>
                                  <Button type="ghost" icon="arrow-down-c"></Button>
                                  <Button type="ghost" icon="trash-b"></Button>
                              </Button-group>
                          </div>
                          <div>
                              <Select v-model="houseTypeModel1" style="width:80px">
                                  <Option v-for="item in houseTypeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Select v-model="houseTypeModel2" style="width:80px">
                                  <Option v-for="item in houseTypeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>室</span>
                              <Select v-model="houseTypeModel3" style="width:80px">
                                  <Option v-for="item in houseTypeList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>厅</span>
                              <Select v-model="houseTypeModel4" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>
                              <span>-</span>
                              <Select v-model="houseTypeModel5" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>

                              <Button-group>
                                  <Button type="ghost" icon="arrow-up-c"></Button>
                                  <Button type="ghost" icon="arrow-down-c"></Button>
                                  <Button type="ghost" icon="trash-b"></Button>
                              </Button-group>
                          </div>
                      </Form-item>
                      <Form-item>
                          <Button type="dashed" long icon="plus-round">新增</Button>
                      </Form-item>
                  </Form>
              </Col>
          </Row>
          <Row>
              <Col :sm="21">
                  <Form :model="formItem" :label-width="100" style="padding-top: 8px;">
                      <Form-item label="项目名称：">
                          <Input placeholder="请输入" value="金地意境一期"></Input>
                      </Form-item>
                      <Form-item label="户型列表：" class="house_type_list">
                          <div style="margin-bottom: 16px">
                              <Select v-model="houseTypeModel1" style="width:80px">
                                  <Option v-for="item in houseTypeList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Select v-model="houseTypeModel2" style="width:80px">
                                  <Option v-for="item in houseTypeList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>室</span>
                              <Select v-model="houseTypeModel3" style="width:80px">
                                  <Option v-for="item in houseTypeList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <span>厅</span>
                              <Select v-model="houseTypeModel4" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>
                              <span>-</span>
                              <Select v-model="houseTypeModel5" style="width:80px">
                                  <Option v-for="item in houseTypeList4" :value="item.value" :key="item.value">{{ item.label }}㎡</Option>
                              </Select>
                              <Button type="info">确认添加</Button>
                          </div>
                          <div v-for="item in houseTypeList" class="house_type_list_2">
                              <Tag>{{ item.type + ' '}}</Tag>
                              {{item.name + ' ' + item.area }}
                              <Button-group>
                                  <Tooltip placement="top" content="向上移动">
                                      <Button type="text" icon="arrow-up-c" size="small"></Button>
                                  </Tooltip>
                                  <Tooltip placement="top" content="向下移动">
                                      <Button type="text" icon="arrow-down-c" size="small"></Button>
                                  </Tooltip>
                                  <Tooltip placement="top" content="修改">
                                      <Button type="text" icon="edit" size="small"></Button>
                                  </Tooltip>
                                  <Tooltip placement="top" content="删除">
                                      <Button type="text" icon="trash-b" size="small"></Button>
                                  </Tooltip>
                              </Button-group>
                          </div>
                      </Form-item>
                  </Form>
              </Col>
          </Row>
      </Tab-pane>
      <Tab-pane label="维度信息" name="attrsInfo" disabled>敬请期待</Tab-pane>
    </Tabs>
    </div>
  </div>
</div>
</template>
<script>
import CaseMap from 'components/CaseMap'

export default {
  data() {
    return {
      caseDataSource: [],
      name: '', // 案场名
      address: '', // 案场地址
      location: {}, // 案场的经纬度
      logoUrl: '', // 案场logo
      bgImgUrl: '', // 案场背景图
      checkCust: false, // 是否开启短信验证
      remark: '', // 描述
      appName: '', // 公众号名称
      appID: '', // 公众号id
      appSecret: '', // 公众号密码
      initialized: 0,
      displayPane: 'caseInfo', // 选项栏显示栏
      houseTypeModel1: '',
      houseTypeModel2: '',
      houseTypeModel3: '',
      houseTypeModel4: '',
      houseTypeModel5: '',
      houseTypeList1: [
        {
          value: 1,
          label: '别墅'
        },
        {
          value: 2,
          label: '公寓'
        },
        {
          value: 3,
          label: '洋房'
        }
      ],
      houseTypeList2: [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        }
      ],
      houseTypeList3: [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 3,
          label: '3'
        },
        {
          value: 4,
          label: '4'
        }
      ],
      houseTypeList4: [
        {
          value: 1,
          label: '100'
        },
        {
          value: 2,
          label: '200'
        },
        {
          value: 3,
          label: '300'
        },
        {
          value: 4,
          label: '400'
        }
      ],
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      houseTypeList: [
        {
          type: '别墅',
          name: '4室3厅',
          area: '100㎡-200㎡'
        },
        {
          type: '公寓',
          name: '4室3厅',
          area: '100㎡-200㎡'
        },
        {
          type: '洋房',
          name: '4室3厅',
          area: '100㎡-200㎡'
        },
        {
          type: '洋房',
          name: '4室3厅',
          area: '100㎡-200㎡'
        },
        {
          type: '洋房',
          name: '4室3厅',
          area: '100㎡-200㎡'
        }
      ]
    }
  },
  computed: {
    caseHeaderTitle() {
      if (this.caseId === '0') {
        return '新建客户'
      } else {
        return this.name
      }
    },
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
        for (const key in reData) {
          this[key] = reData[key]
        }
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
      this.location = { lng: 121.480652, lat: 31.2408 }
    }
  },
  mounted() {
    if (this.caseId === '0') {
      this.clearAllData()
      return
    }
    this.initCaseInfo()
  },
  components: {
    CaseMap
  }
}
</script>
