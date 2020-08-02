<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollage"
  >
    <el-menu-item @click="changeMenu(item)" index="2" v-for="item in noChildren" :key="item.path">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    //   计算是否有children
    noChildren() {
      return this.menu.filter(item => !item.children);
    },
    hasChildren() {
      return this.menu.filter(item => item.children);
    },
    isCollage() {
      return this.$store.state.tab.isCollapse;
    },
    menu() {
      return this.$store.state.tab.menu;
    }
  },
  methods: {
    changeMenu(item) {
      this.$router.push({
        path: item.path
      });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang='scss' scoped>
.el-menu {
  border: none;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
