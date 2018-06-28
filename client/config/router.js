import Router from 'vue-router';
import routes from './routes';

export default () => {
  return new Router({
    mode: 'history',
    routes: routes,
  });
}
