<style lang="less" scoped>
.login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translate(-50%, -50%); */
    width: 360px;
    padding: 32px;
    border-radius: 3px;
    background: rgba(255, 255, 255, .5);
}
.login-title {
    padding: 0 0 24px;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
}

</style>
<template>
<div class="login">
    <div class="login-content">
        <h1 class="login-title">金地电子台账</h1>
        <Form ref="form" :model="form" :rules="rules">
            <Form-item prop="user">
                <Input size="large" type="text" v-model="form.user" placeholder="请输入用户名">
                    <Icon type="ios-person-outline" slot="prepend" style="font-size: 20px; margin: 0 4px;"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password" style="margin-bottom:16px;">
                <Input size="large" type="password" v-model="form.password" placeholder="请输入密码">
                    <Icon type="ios-locked-outline" slot="prepend" style="font-size: 18px; margin: 0 4px;"></Icon>
                </Input>
            </Form-item>
            <Form-item style="margin-bottom:10px;">
                <Checkbox style="float: left;">记住帐号</Checkbox>
                <a href="#" style="float: right;">忘记密码</a>
            </Form-item>
            <Form-item>
                <Button size="large" type="primary" @click="handleSubmit('form')" long>登 录</Button>
            </Form-item>
        </Form>
    </div>
</div>
</template>
<script>
    export default {
        data () {
            return {
                form: {
                    user: '',
                    password: ''
                },
                rules: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
