<template>
  <div
    style="display:flex;justify-content:center;align-items: center;height: 700px;"
  >
    <el-form :model="form" label-width="120" style="width:400px">
      <el-form-item label="用户名" class="hhh">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/request/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      login(this.form).then(res => {
        res = res.data;
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
    register() {
      this.$router.push({
        path: "/register"
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
