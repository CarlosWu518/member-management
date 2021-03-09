<template>
  <div class="header">
    <a href="#/">
      <img src="../../assets/logo.png" width="30px" class="logo" />
      <span class="header-title">会员管理系统</span>
    </a>
    <el-dropdown id="el-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-switch-button" command="b"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "../../api/login";

export default {
  methods: {
    handleCommand(command) {
      this.$message("click on item " + command);
      switch (command) {
        case "a":
          //修改密码
          this.$message(`修改密码`);
          break;
        case "b":
          //推出系统
          const token = localStorage.getItem("mxg-msm-token");
          logout(token).then((response) => {
            const resp = response.data;
            if (resp.flag) {
              //退出成功
              //清除本地数据
              localStorage.removeItem("mxg-msm-token");
              localStorage.removeItem("mxg-msm-user");
              //回到页面
              this.$router.push("/login");
            } else {
              this.$message({
                message: resp.message,
                type: "warning",
                duration: 444,
              });
            }
          });
          break;
      }
    },
  },
};
</script>

<style scope>
header {
  position: relative;
}
.logo {
  vertical-align: middle;
  padding-left: 40px;
  padding-right: 10px;
}
.header-title {
  position: absolute;
  color: #fff;
}

#el-dropdown {
  position: absolute;
  cursor: pointer;
  color: #fff;
  top: 0;
  right: 40px;
}
</style>