<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <router-link to="/login">login</router-link>
    <router-link to="/app">todo</router-link>
    <div>数字：{{number}}</div>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      text: "123"
    };
  },
  mounted(){
    setInterval(()=>{
      this.$store.commit('increment');
    },1000);
  },
  computed:{
    number(){
      return this.$store.state.count;
    }
  },
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
