import App from './App.vue';

import '../assets/test.less';

import '../assets/test-image.png';

const root = document.createElement('div');
document.body.appendChild(root);


new Vue({
  render:(h) => h(App)
}).$mount(root);
