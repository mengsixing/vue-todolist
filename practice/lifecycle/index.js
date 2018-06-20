import Vue from 'vue';

const app = new Vue({
  beforeCreate(){}, // 组件创建 事件绑定完成
  created(){}, // 组件创建完成 响应式完成
  beforeMount(){}, // 准备挂载到dom，能this.$el 有初始值
  mounted(){}, // 已挂载到dom，this.$el 有挂载好的值
  beforeDestroy(){},
  destroyed(){},
  render(h){
    //beforemount和mount之间执行
    return h('div',{},'123');
  },
  renderError(h,error){
    // 只能捕获当前组件渲染错误，正式环境不可用
    console.log(error.stack);
  },
  errorCaptured(){
    // 会向上冒泡，正式环境可用
  },
  template:'<div>123</div>',

});

app.$mount('#root');
