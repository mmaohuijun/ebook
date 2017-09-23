# 电子台账后台管理系统H5库

>安装运行环境  请仔细阅读

===================================
### 1.全局安装 [node](https://nodejs.org/en/)

---

### 2.下载代码
先用git 把项目从git 服务器克隆下来

`$ git clone http://172.18.84.240:3000/Ebook/Admin-H5-pc.git -b dev`

---

### 3.安装 node modules

整个项目是需要依赖一些第三方 node 模块才能运行起来的，所以在运行前需要先安装这些模块，安装方法如下：

// 进入项目根目录

`$ cd Admin-H5-pc`

// 开始安装

`$ npm install`

---

### 4.运行开发环境
本地开发测试环境

`$ npm run dev`

生产环境

`$ npm run build`

### 5.页面

- 设置
  - 登录 -- `Login.Vue`
  - 修改密码 -- `ModifyPassword.Vue`

- 案场
  - 案场管理 -- `CaseManage.vue`
  - 案场信息 -- `CaseInfo.vue`
  - 项目信息 -- `CaseProject.vue`
  - 维度信息 -- `CaseAttrs.vue`

- 用户
  - 内部用户 -- `IntUser.vue`
  - 外部用户 -- `ExtUser.vue`

- 客户
  - 来电客户 -- `CallClient.vue`
  - 到访客户 -- `VisitClient.vue`
  - 成交客户 -- `DealClient.vue`
  - 未分配客户 -- `UnassignedClient.vue`
  - 新建客户 -- `AddClient.vue`

/* 案场 */
CaseManage

/* 组织 */
Organization

/* 用户 */
IntUser // 内部用户
ExtUser // 外部用户

/* 权限 */
Authority

/* 客户 */
CallClient // 来电客户
VisitClient // 到访客户
DealClient // 成交客户
UnassignedClient // 未分配客户
AddClient // 新建客户