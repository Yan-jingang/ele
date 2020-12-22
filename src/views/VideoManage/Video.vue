<template>
  <div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-row class="row">
        <el-col :span="6">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="dynamicValidateForm.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            :label="'域名' + index"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')"
            >提交</el-button
          >
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-row>
    </el-form>

    <el-button :disabled="isDis" @click="dianji">点我</el-button>

    <el-button @click="ok">让按钮可以点击</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ],
        email: ""
      },
      isDis: true
    };
  },
  methods: {
    ok() {
      this.isDis = false;
    },
    daioyong() {
      this.isDis = true;
    },
    dianji() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.daioyong();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          console.log(this.dynamicValidateForm, "ppppppppppppppppppp");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>

<style scoped>
.row {
  height: 200px;
  z-index: 999;
}
</style>
