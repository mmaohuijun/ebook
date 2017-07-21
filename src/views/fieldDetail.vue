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
</style>
<template>
    <div class="layout-content">
        <Tabs value="name1">
            <Tab-pane label="案场信息" icon="map" name="name1">
                <Form :model="formItem" :label-width="100" style="padding-top: 8px;">
                    <Row>
                        <Col :md="24" :lg="12">
                            <Form-item label="案场logo" class="field_avatar_row">
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
                            <Form-item label="案场背景图">
                                <Upload action="//jsonplaceholder.typicode.com/posts/">
                                    <Button type="ghost" icon="ios-cloud-upload-outline" long>上传文件</Button>
                                </Upload>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="案场名称">
                                <Input placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="案场位置">
                                <Input placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="所属组织">
                                <Input placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="公众号名称">
                                <Input placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="公众号ID">
                                <Input placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="Selectkey">
                                <Input placeholder="请输入"></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="短信验证">
                                <i-switch>
                                    <span slot="open">开</span>
                                    <span slot="close">关</span>
                                </i-switch>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="24">
                            <Form-item label="地图坐标">
                                <div class="field_location_map" style="margin-bottom: 16px;">

                                </div>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="24">
                            <Form-item>
                                <Button type="primary">提交</Button>
                                <Button type="ghost" style="margin-left: 8px">取消</Button>
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
            </Tab-pane>
            <Tab-pane label="项目信息" icon="ios-paper" name="name2">敬请期待</Tab-pane>
            <Tab-pane label="维度信息" icon="ios-body" name="name3">敬请期待</Tab-pane>
        </Tabs>
    </div>
</template>
<script>
    export default {
        data () {
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
                }
            }
        }
    }
</script>
