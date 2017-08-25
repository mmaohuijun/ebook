<template>
<div>
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
</div>
</template>
<script>
export default {
  name: 'CaseProject',
  data() {
    return {
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
      ],
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
      ]
    }
  }
}
</script>
<style lang="css" scoped>
</style>
