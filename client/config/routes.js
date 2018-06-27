// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

var routes = [{
  path: '/app',
  component: () => import('../views/todo/todo.vue')
}, {
  path: '/login',
  component: () => import('../views/login/login.vue')
},{
  path: '/',
  component: () => import('../views/todo/todo.vue')
}];

export default routes;
