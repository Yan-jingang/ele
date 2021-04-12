<template>
  <el-container style="height:100%">
    <el-aside width="auto"><commonasider /></el-aside>
    <el-container>
      <el-header><commonheader /></el-header>
      <tab />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import commonasider from "@/components/CommonAside.vue";
import commonheader from "@/components/CommonHeader.vue";
import tab from "@/components/Tab.vue";
export default {
  components: {
    commonasider,
    commonheader,
    tab
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background: black;
}
</style>
