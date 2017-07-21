<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="layout">
        <div class="layout-menu">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <div class="layout-logo-left"></div>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="android-home"></Icon>
                        案场
                    </template>
                    <Menu-item name="1-1">案场管理</Menu-item>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="android-people"></Icon>
                        组织
                    </template>
                    <Menu-item name="2-1">组织管理</Menu-item>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="android-person"></Icon>
                        用户
                    </template>
                    <Menu-item name="3-1">内部用户</Menu-item>
                    <Menu-item name="3-2">外部用户</Menu-item>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="locked"></Icon>
                        权限
                    </template>
                    <Menu-item name="4-1">权限管理</Menu-item>
                </Submenu>
                <Submenu name="5">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        客户数据
                    </template>
                    <Menu-item name="5-1">来电数据</Menu-item>
                    <Menu-item name="5-2">到访数据</Menu-item>
                    <Menu-item name="5-3">成交数据</Menu-item>
                    <Menu-item name="5-4">未分配客户</Menu-item>
                    <Menu-item name="5-5">新建客户</Menu-item>
                </Submenu>
                <Submenu name="6">
                    <template slot="title">
                        <Icon type="code"></Icon>
                        硬件
                    </template>
                    <Menu-item name="6-1">硬件列表</Menu-item>
                </Submenu>
            </Menu>
        </div>
        <div class="layout-main">
            <div class="layout-header">
                <Dropdown placement="bottom-end" class="float-right" trigger="click">
                    <a href="javascript:void(0)">
                        <div class="user-avatar"><img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""></div>
                        <span class="user-name">张三四</span>
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <Dropdown-menu slot="list" style="width: 190px;">
                        <ul class="user-dropdown-list">
                            <li>帐号：2736273<Tooltip placement="top" content="修改"><a href="#" class="edit-button"><Icon type="edit"></Icon></a></Tooltip></li>
                            <li>手机号码：1709807234<Tooltip placement="top" content="修改"><a href="#" class="edit-button"><Icon type="edit"></Icon></a></Tooltip></li>
                        </ul>
                        <div style="padding:8px 16px;">
                            <Button size="small" long type="primary" icon="power">退出登录</Button>
                        </div>
                    </Dropdown-menu>
                </Dropdown>
            </div>
            <div class="layout-breadcrumb">
                <Breadcrumb>
                    <Breadcrumb-item href="#">案场</Breadcrumb-item>
                    <Breadcrumb-item>案场管理</Breadcrumb-item>
                </Breadcrumb>
            </div>
            <router-view></router-view>
            <div class="layout-copy">
                2017-2018 &copy; 金地电子台账
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
