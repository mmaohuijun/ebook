<style lang="less">
    .field_avatar_row .ivu-form-item-label {
        height: 80px !important;
        line-height: 80px !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    .field_avatar {
        position: relative;
        width: 80px;
        height: 80px;
        line-height: 80px;
        border-radius: 50%;
        overflow: hidden;
        background: #eee;

        img {
            width: 80px;
            height: 80px;
        }

        .field_avatar_tool {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, .6);
            text-align: center;
            opacity: 0;
            border-radius: 50%;
            transition: opacity .3s;

            i {
                margin: 0 4px;
                font-size: 22px;
                vertical-align: middle;
                color: #fff;
                cursor: pointer;
            }
        }

        &:hover {
            .field_avatar_tool {
                opacity: 1;
            }
        }
    }

    .field_location_map {
        background: #ddd;
        width: 100%;
        height: 327px;
    }

    .field_name {
        font-size: 20px;
    }

    .house_type {
        font-size: 12px;
        color: gray;
        padding: 8px 0 10px;
        font-weight: 400 !important;
    }

    .field_tool {
        opacity: 0;
        position: absolute;
        right: 16px;
        top: 20px;
        transition: all .3s;
    }

    .field_tool .ivu-tooltip {
        margin-right: 8px;
        font-size: 16px;
        cursor: pointer;
    }

    .ivu-card-body:hover .field_tool {
        opacity: 1;
    }

    .house_type_list {
        .ivu-select {
            margin-right: 8px;
        }

        .ivu-select + span {
            margin-right: 8px;
        }
    }

    .house_type_list_2 {
        padding-left: 8px;
        margin-left: -8px;
        border-radius: 3px;
        .ivu-tooltip:first-of-type {
            margin-left: 20px;
        }
        .ivu-btn-group {
            opacity: 0;
        }
        &:hover {
            background: #eee;
            .ivu-btn-group {
                opacity: 1;
            }
        }
    }
</style>
<template>
    <div class="layout-content">
        <Tabs value="name1">
            <Tab-pane label="案场信息" icon="map" name="name1">
                <Form :model="formItem" :label-width="100" style="padding-top: 8px;">
                    <Row>
                        <Col :md="24" :lg="12">
                            <Form-item label="案场logo：" class="field_avatar_row">
                                <div class="field_avatar">
                                    <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png">
                                    <div class="field_avatar_tool">
                                        <Icon type="ios-upload-outline"></Icon>
                                        <Icon type="ios-trash-outline"></Icon>
                                    </div>
                                </div>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="24">
                            <Form-item label="案场背景图：">
                                <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="ghost" icon="ios-cloud-upload-outline" long>上传文件</Button>
                                </Upload>
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
            <Tab-pane label="项目信息" icon="ios-paper" name="name2">
                <!-- 敬请期待 -->
                <Row :gutter="16">
                    <Col :md="24" :lg="8" style="margin-bottom: 16px;">
                        <Card>
                            <p class="field_name">金地意境一期</p>
                            <p class="house_type">别墅、公寓、洋房</p>
                            <p class="field_tool">
                                <a href="#" @click="custom">
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
                                <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
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
                                    <Button-group size="small">
                                        <Tooltip placement="top" content="向上移动">
                                            <Button type="text" icon="arrow-up-c"></Button>
                                        </Tooltip>
                                        <Tooltip placement="top" content="向下移动">
                                            <Button type="text" icon="arrow-down-c"></Button>
                                        </Tooltip>
                                        <Tooltip placement="top" content="修改">
                                            <Button type="text" icon="edit"></Button>
                                        </Tooltip>
                                        <Tooltip placement="top" content="删除">
                                            <Button type="text" icon="trash-b"></Button>
                                        </Tooltip>
                                    </Button-group>
                                </div>
                            </Form-item>
                        </Form>
                    </Col>
                </Row>
            </Tab-pane>
            <Tab-pane label="维度信息" icon="ios-body" name="name3">敬请期待</Tab-pane>
        </Tabs>
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
                });
            }
        }
    }
</script>
