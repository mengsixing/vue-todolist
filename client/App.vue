<template>
  <div id="app">
    hello world.2
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
// import Header from "./layout/header.vue";
// import Footer from "./layout/footer.jsx";
export default {
  // components: {
  //   Header,
  //   Footer
  // },
  data() {
    return {
      text: "123"
    };
  },
  methods: {
    ...mapMutations(["increment"]),
    ...mapActions(["incrementAsync"])
  },

  mounted() {
    this.incrementAsync();
  },
  computed: {
    number() {
      return this.$store.state.count;
    },
    ...mapGetters({
      count: "countAdd5"
    })
  }
};
</script>

<style lang="less">
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
#cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>
