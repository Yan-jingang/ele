<template>
  <div class="tab">
    <el-tag
      size="small"
      :key="tag.path"
      v-for="tag in tags"
      :closable="tag.path!=='/'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="changeMenu(tag)"
    >{{tag.name}}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tags
    })
  },
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    ...mapMutations({
      close: "closetag"
    }),
    handleClose(tag) {
      this.close(tag)
    },
    changeMenu(tag){
      this.$router.push({
        path:tag.path
      })
      this.$store.commit('selectMenu',tag)
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
  }
}
</style>