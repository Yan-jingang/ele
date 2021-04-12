<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "kiu"
    };
  },
  methods: {
    add() {
      return 1 + 1;
    }
  },
  beforeCreate() {
    console.log(this.name);
    console.log(this.add);
  },
  created() {
    console.log(this.name);
    console.log(this.add);
  },
  beforeMount() {
    let div = document.getElementById("app");
    console.log(div);
  },
  mounted() {
    let div = document.getElementById("app");
    console.log(div);
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
