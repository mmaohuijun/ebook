<template>
<div class="layout__content">
  <div class="layout__header">
      <h2 class="layout__header-title">新建客户</h2>
    </div>
  <div class="layout__body">
   <div class="addClient">
    <h1>新建客户</h1>
     <Form ref="addForm" :model="addForm" :rules="ruleForm" :label-width="120" style="width:350px;margin: 0 auto">
       <Form-item label="性别：" prop="gender">
         <Radio-group v-model="addForm.gender">
           <Radio label="2">女</Radio>
           <Radio label="1">男</Radio>
         </Radio-group>
         <span><i class="iconfont icon-kehu"></i></span>
         <span><i class="iconfont icon-male"></i></span>
         <span><i class="iconfont icon-female"></i></span>
         <span><i class="iconfont icon-male-copy" style="color: #1296db"></i></span>
         <span><i class="iconfont icon-female-copy" style="color: #d4237a"></i></span>
       </Form-item>
       <Form-item label="姓名：" prop="name">
           <Input v-model="addForm.name"></Input>
         </Form-item>
         <Form-item label="电话号码：" prop="mobile">
           <Input v-model="addForm.mobile"></Input>
         </Form-item>
         <Form-item label="案场：" v-if="caseShow" prop="case">
           <Select v-model="addForm.case" @on-change="caseChange">
             <Option v-for="item in caseList" :value="item.id" :key="item.id">{{item.name}}</Option>
           </Select>
         </Form-item>
         <!-- <Form-item label="顾问：" v-if="conShow" prop="consultant"> -->
         <Form-item label="顾问：" v-if="userAdminFlag" prop="consultant">
           <Select v-model="addForm.consultant" @on-change="consultChange">
             <Option v-for="item in extUserList" :value="item.id" :key="item.id">{{item.name}}</Option>
           </Select>
         </Form-item>
         <Form-item>
           <Button type="primary" class="custom-secondary-btn" @click="cancel" >取消</Button>
           <Button type="primary" class="custom-btn" @click="saveAdd('addForm')" style="float: right">完成</Button>
         </Form-item>
     </Form>
   </div> 
  </div>
</div>
</template>
<script>
export default {
  name: 'AddClient',
  data() {
    const vgender = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('性别不能为空'))
      } else {
        callback()
      }
    }
    const vname = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
    const vmobile = (rule, value, callback) => {
      const reg = /^1[34578]\d{9}$/
      if (value === '') {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        if (!reg.test(value)) {
          callback(new Error('请输入正确的电话号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    const vcase = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('案场不能为空'))
      } else {
        callback()
      }
    }
    const vconsultant = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('顾问不能为空'))
      } else {
        callback()
      }
    }
    return {
      addForm: {
        gender: '',
        name: '',
        mobile: '',
        consultant: '',
        case: ''
      },
      ruleForm: {
        gender: [
          { validator: vgender, trigger: 'change' }
        ],
        name: [
          { validator: vname, trigger: 'blur' }
        ],
        mobile: [
          { validator: vmobile, trigger: 'blur' }
        ],
        case: [
          { validator: vcase, trigger: 'change' }
        ],
        consultant: [
          { validator: vconsultant, trigger: 'change' }
        ]
      },
      pageNo: 1,
      pageSize: 20,
      extUserList: [],
      caseList: [],
      conShow: false,
      caseShow: false,
      consultant: '', // 被选中的顾问id
      caseId: '' // 被选中的案场id
    }
  },
  methods: {
    // 获取案场列表： 案场id+案场名
    getCaseList() {
      this.$axios.post('case/shortlist').then(response => {
        if (response === null) return
        this.caseList = []
        for (const items in response.data) {
          this.caseList.push(response.data[items])
        }
        console.log('caseList', this.caseList)
      })
    },
    // 置业顾问列表改变 获取顾问id
    consultChange(consultant) {
      this.consultant = consultant
      console.log('consultant', this.consultant)
    },
    // 案场列表改变 获取案场id 根据案场id获取顾问列表
    caseChange(caseId) {
      if (!caseId) return
      this.caseId = caseId
      console.log('caseid', this.caseId)
      this.$axios.post('/ext-user/worker-list', { caseId: this.caseId }).then(response => {
        if (response === null) return
        this.extUserList = []
        for (const items in response.data) {
          this.extUserList.push(response.data[items])
        }
      })
    },
    // 判断身份 控制显示
    judgeIdentity() {
      console.log('judge', this.$store.state.user)
      if (this.getLoginInfo === 'case-worker') {
        if (this.userAdminFlag === true) {
          // 外部用户 管理员权限
          this.conShow = true
          this.caseShow = false
        } else {
          // 外部用户 普通用户权限
          this.conShow = false
          this.caseShow = false
        }
        // 直接调用list-worker
        this.$axios.post('/ext-user/worker-list').then(response => {
          if (response === null) return
          for (const items in response.data) {
            this.extUserList.push(response.data[items])
          }
        })
      } else {
        // 内部用户
        this.conShow = true
        this.caseShow = true
      }
    },
    // 点击确定按钮 添加
    saveAdd(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.add()
          this.$Message.success('提交成功！')
          this.resetFields('addForm')
        } else {
          this.$Message.error('表单验证失败')
        }
      })
    },
    add() {
      const data = {
        name: this.addForm.name,
        gender: this.addForm.gender,
        mobile: this.addForm.mobile
      }
      if (this.conShow === true && this.caseShow === false) {
        data.consultant = this.consultant
      } else if (this.conShow === true && this.caseShow === true) {
        data.consultant = this.consultant
        data.caseId = this.caseId
      }
      console.log('result data', data)
      this.$axios.post('case-cust/add', data).then(response => {
        if (response === null) return
        // this.$Message.success('提交成功！')
        // this.resetFields('addForm')
      })
    },
    // 重置表单
    resetFields(name) {
      console.log('resetFields')
      this.$refs[name].resetFields()
    },
    // 取消
    cancel() {
      console.log('cancel')
      this.$router.go(-1)
    }
  },
  computed: {
    getLoginInfo() {
      return this.$store.state.user.type
    },
    userAdminFlag() {
      return this.$store.getters.adminFlag
    }
  },
  mounted() {
    // this.getExtUserList()
    this.getCaseList()
    console.log(this.getLoginInfo, this.userAdminFlag)
    this.judgeIdentity()
  }
}
</script>
<style lang="css">
  h1{
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    padding:20px 0 25px 0
  }
  .addClient{
    width: 600px;
    height: 480px;
    border: 1px solid #979797;
    border-radius: 4px;
    margin: 40px auto 0;
    background: #fff;
    box-sizing: border-box;
  }
  .btnWrapper{
    width: 270px;
    margin-left: 40px;
    padding-top:25px;
  }
</style>
