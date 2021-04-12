<template>
  <div class="manage">
    <!-- dialog -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
      ></CommonForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表格相关 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <CommonForm inline :formLabel="formLabel" :form="searchFrom">
        <div class="search">
          <el-input v-model="search" placeholder="请输入姓名"></el-input>
          <el-button type="primary" @click="findUser">搜索</el-button>
        </div>
      </CommonForm>
    </div>
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList(config.page)"
      @edit="editUser"
      @delete="deleteUser"
    ></CommonTable>
  </div>
</template>

<script>
import CommonTable from "../../components/Table";
import CommonForm from "../../components/Form";
import {
  getList,
  deleteUser,
  editUser,
  addUser,
  findUser
} from "@/request/api";
export default {
  data() {
    return {
      search: "",
      isShow: false,
      searchFrom: {
        keyword: ""
      },
      //   dialog form
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: 1
      },
      // dialog  formlabel
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input"
        },
        {
          model: "age",
          label: "年龄",
          type: "input"
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date"
        },
        {
          model: "addr",
          label: "地址",
          type: "input"
        }
      ],
      formLabel: [
        {
          model: "keyword",
          label: "",
          options: []
        }
      ],
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexLabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 250
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 20,
        loading: false
      },
      operateType: "add"
    };
  },
  components: {
    CommonForm,
    CommonTable
  },
  created() {
    this.getList(this.config.page);
  },
  methods: {
    //   获取表格数据
    getList(page) {
      this.config.loading = true;
      getList({ params: { page } }).then(res => {
        // 处理性别问题
        this.tableData = res.data.list.map(item => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      });
    },
    // 编辑用户
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      //   将表单中的赋值  展现出来
      this.operateForm = row;
    },
    // 新增用户
    addUser() {
      this.operateForm = {};
      this.operateType = "add";
      this.isShow = true;
    },
    // 点击dialog确认后
    confirm() {
      if (this.operateType === "edit") {
        editUser(this.operateForm).then(() => {
          this.isShow = false;
          this.getList();
        });
      } else if (this.operateType === "add") {
        addUser(this.operateForm).then(() => {
          this.isShow = false;
          this.getList();
        });
      }
    },
    // 删除用户
    deleteUser(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          deleteUser({
            params: {
              id
            }
          }).then(res => {
            console.log(res.data);
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //查询用户
    findUser() {
      findUser(this.search).then(res => {
        this.tableData = res.data.list;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  .el-button {
    margin-left: 20px;
  }
}
</style>
