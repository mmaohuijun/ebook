<template>
<div class="layout__content">
  <div class="layout__header">
    <h2 class="layout__header-title">案场管理Info</h2>
    <div class="layout__header-tool">
      <Input class="custom__search" icon="search" placeholder="案场／组织"></Input>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="trash-a"></Button>
      <Button class="custom__circle-btn--white" type="primary" shape="circle" icon="plus"></Button>
    </div>
  </div>
  <div class="layout__body">
    <Tabs value="name1" type="card">
        <Tab-pane label="案场信息" name="name1">
            <Form :model="formItem" :label-width="120" style="padding-top: 8px;">
                <Row>
                    <Col :md="24" :lg="12">
                        <Form-item label="案场logo：">
                            <div class="field_upload_img" style="width: 80px; height:80px; line-height: 80px;">
                                <!-- <img width="80" height="80" src="../images/field_logo.jpg"> -->
                                <div class="field_upload_tool">
                                    <Icon type="ios-upload-outline"></Icon>
                                    <Icon type="ios-trash-outline"></Icon>
                                </div>
                            </div>
                            <p style="color: #999; line-height: 1;">建议：图片尺寸为160*160px</p>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="24">
                        <Form-item label="案场背景图：">
                            <div class="field_upload_img" style="width: 435px; height: 200px; line-height: 200px; border-radius:0;">
                                <!-- <img width="435" height="200" src="../images/field_bg.jpg"> -->
                                <div class="field_upload_tool" style="border-radius:0 !important;">
                                    <Icon type="ios-upload-outline"></Icon>
                                    <Icon type="ios-trash-outline"></Icon>
                                </div>
                            </div>
                            <p style="color: #999; line-height: 1;">建议：图片尺寸为160*160px</p>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="案场名称：">
                            <Input placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="案场位置：">
                            <Input placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="所属组织：">
                            <Input placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="公众号名称：">
                            <Input placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="公众号ID：">
                            <Input placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="Selectkey：">
                            <Input placeholder="请输入"></Input>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Form-item label="短信验证：">
                            <i-switch>
                                <span slot="open">开</span>
                                <span slot="close">关</span>
                            </i-switch>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="24">
                        <Form-item label="地图坐标：">
                            <div class="field_location_map" style="margin-bottom: 16px;">

                            </div>
                        </Form-item>
                    </Col>
                    <Col :md="24" :lg="24">
                        <Form-item>
                            <Button type="primary">确定</Button>
                            <Button type="ghost" style="margin-left: 8px">取消</Button>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Tab-pane>
        <Tab-pane label="项目信息" name="name2">
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
                            <li v-for="item in houseTypeList">
                                <Tag>{{ item.type + ' '}}</Tag>
                                {{item.name + ' ' + item.area }}
                            </li>
                        </ul>
                    </Card>
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
                            <li v-for="item in houseTypeList">
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
                            <li v-for="item in houseTypeList">
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
                            <li v-for="item in houseTypeList">
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
                            <li v-for="item in houseTypeList">
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
        <Tab-pane label="维度信息" name="name3">敬请期待</Tab-pane>
    </Tabs>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
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
  methods: {
    custom () {
      this.$Modal.confirm({
        title: '确认对话框标题',
        content: '<Card>一些对话框内容</p><p>一些对话框内容</Card>',
        okText: 'OK',
        cancelText: 'Cancel'
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
