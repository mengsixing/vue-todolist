export default {
  incrementAsync (context) {
    setInterval(()=>{
      context.commit('increment')
    },1000)
  }
}
