<template>
  <div>
    <div class="background">
    <img :src="imgSrc" width="100%" height="100%" alt="" />
</div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录个人日记网站</h3>
      <el-form-item label="账号" prop="UsersPhone">
        <el-input prefix-icon="el-icon-user" type="text" placeholder="请输入注册的电话号码" v-model="form.UsersPhone"/>
      </el-form-item>
      <el-form-item label="密码" prop="UsersPwd">
        <el-input prefix-icon="el-icon-lock" type="password"  placeholder="请输入密码" v-model="form.UsersPwd"/>
      </el-form-item>
      <el-form-item >
        <el-button  style="float:left" v-on:click="regist">注册</el-button>
        <el-button type="primary"  v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      imgSrc: require('../assets/bg.jpg'),
      form: {
        UsersPhone: '',
        UsersPwd: ''
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        UsersPhone: [
          { required: true, message: '账号不可为空', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确格式的电话号码' }
        ],
        UsersPwd: [
          { required: true, message: '密码不可为空', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6-20位之间' }
        ]
      }
    }
  },
  methods: {
    onSubmit (formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          this.$axios.post('Login', this.form).then(resp => {
            if (resp.data.code === 200) {
              this.$message({
                message: resp.data.msg,
                type: 'success'
              })
              this.$message.success('登录成功')
              window.sessionStorage.setItem('token', resp.data.data.token)
              window.sessionStorage.setItem('UserName', resp.data.data.username)
              window.sessionStorage.setItem('UserId', resp.data.data.userid)
              this.$router.push('/index')
            } else {
              return this.$message.error(resp.data.msg)
            }
          }).catch(err => {
            this.$message({
              message: err.response.data.msg,
              type: 'error'
            })
          })
        } else {
          return this.$message.error('请输入用户名或密码')
        }
      })
    },
    regist () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
*{
margin:0px;
padding: 0px;
}
.background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
}
  .login-box {
    z-index:1;
    position: absolute;
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 5% 60%;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
    background-color: white;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
  .btn{
    text-align: center
  }
</style>
