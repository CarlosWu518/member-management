<template>
  <div class="login-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // console.log(valid)
        if (valid) {
          // 提交表单给后台进行验证是否正确
          /** 
          login(this.form.username, this.form.password).then((response) => {
            const resp = response.data;
            console.log(resp, resp.flag, resp.data.token, resp.message);
            if (resp.flag) {
              // 验证成功, 通过token去获取用户信息
              getUserInfo(resp.data.token).then((response) => {
                const respUser = response.data;
                if (respUser.flag) {
                  // 获取到了用户的数据
                  console.log("userInfo", respUser.data);
                  // 1. 保存 token ，用户信息
                  localStorage.setItem(
                    "mxg-msm-user",
                    JSON.stringify(respUser.data)
                  );
                  localStorage.setItem("mxg-msm-token", resp.data.token);
                  // 前往首页
                  this.$router.push("/");
                } else {
                  this.$message({
                    message: respUser.message,
                    type: "warning",
                  });
                }
              });
            } else {
              // 未通过，弹出警告
              // alert(resp.message)
              this.$message({
                message: resp.message,
                type: "warning",
              });
            }
          });
        */
          const pro = this.$store
            .dispatch("Login", this.form)
            .then((response) => {
              if (response.flag) {
                this.$router.push("/");
              } else {
                this.$message({
                  message: response.message,
                  type: "waring",
                });
              }
            })
            .catch((error) => {});
          console.log("pro", pro);
        } else {
          console.log("验证失败");
          return false;
        }
      });
    },
  },
};
</script>


<style scoped>
.login-form {
  width: 350px;

  padding: 30px;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("../../assets/login.jpg");
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>