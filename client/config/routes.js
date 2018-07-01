var routes = [{
  path: '/app',
  component: () =>
    import ('../views/todo/todo.vue')
}, {
  path: '/login',
  component: () =>
    import ('../views/login/login.vue')
}, {
  path: '/',
  redirect: '/app'
}];

export default routes;
