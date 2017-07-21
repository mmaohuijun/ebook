<style lang="less">

</style>
<template>
<div class="layout-content">
    <div class="clearfix" style="margin-bottom: 16px;">
        <Button type="primary" shape="circle" icon="plus-round" class="float-left">新增案场</Button>
        <Input icon="search" placeholder="请输入..." class="input-circle float-right" style="width: 200px; margin-left: 16px;"></Input>
        <Button type="secondary" shape="circle" icon="trash-b" class="float-right">删除</Button>
    </div>
    <Table border :columns="columns1" :data="data1"></Table>
    <Page :total="100" style="margin: 16px auto 0; display:inline-block; transform: translateX(-50%); position:relative; left: 50%;"></Page>
</div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '案场',
                        key: 'field'
                    },
                    {
                        title: '所属组织',
                        key: 'group'
                    },
                    {
                        title: '项目名称',
                        key: 'project_name'
                    },
                    {
                        title: '公众号',
                        key: 'wx_number'
                    },
                    {
                        title: '操作',
                        key: 'tool',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            location.href='/fieldDetail';
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    },
                    {
                        field: '金地意境',
                        group: '上海东区事业部',
                        project_name: '金地意境一期',
                        wx_number: '微信公众号名称'
                    }
                ]
            }
        },
            methods: {
                remove (index) {
                    this.data1.splice(index, 1);
                }
            }
    }
</script>
