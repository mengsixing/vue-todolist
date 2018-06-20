import Vue from 'vue';

const app = new Vue({
  // el:'#root',
  //  如果引用vue源码中的，runtime-only版本 不能写templete
  template:'<div>123</div>'
});

app.$mount('#root');


// vue基础


// 属性
// app.$data
// app.$props
// app.#el html节点
// app.$options 传入的参数和本身默认参数

// app.$options.render=(h)=>{
//   return h('div',{},'new render function');
// }

// app.$root 组件的根节点 vue的实例对象
// app.children 和react的children相似
// app.$slots
// app.$scopedSlots
// app.$refs
// app.$isServer 是否是服务端渲染

// 方法

// app.watch('text',(newText,oldText)=>{...}) 组件销毁，watch 不会被销毁
// 可以写在组件内部，销毁时自动销毁

// 监听和触发事件
// app.$on('xxx'()=>{})
// app.$emit('xxx')


// app.forceUpDate() 强制更新组件，可以重新加上没有响应的属性
// app.$set(app.obj,'xxx',123) 可以绑定初始时，没有定义的属性对象

// app.$nextTick(); 延迟到下次DOM更新循环之后执行。
