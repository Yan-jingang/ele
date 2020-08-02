<template>
  <header>
    <div class="left">
      <el-button type="primary" icon="el-icon-edit" size="mini" @click="scoll"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if='current'>
          {{current.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState({
      current:state=>state.tab.currentMenu
    })
  },
  data() {
    return {
      userImg: ""
    };
  },
  methods: {
    scoll() {
      this.$store.commit('changescoll')
    },
    logOut(){
      this.$store.commit('clearToken');
      location.reload()
    }
  },
};
</script>

<style lang='scss' scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left{
  .el-button{
    margin-right: 10px;
  }
  display: flex;
  align-items: center;
}
.right {
  .userImg {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }
}
</style>