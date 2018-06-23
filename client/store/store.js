import Vuex from 'vuex'
import state from './states/state.js';
import getters from './getters/getter.js';
import actions from './actions/action.js';
import mutations from './mutations/mutation.js';

export default () => {
  const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept(['./mutations/mutation', './actions/action','./getters/getter','./states/state'], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newMutations = require('./mutations/mutation').default
      const newActions = require('./actions/action').default
      const newGetters = require('./getters/getter').default
      const newStates = require('./states/state').default
      // 加载新模块
      store.hotUpdate({
        mutations: newMutations,
        states:newStates,
        actions:newActions,
        getters:newGetters
      })
    })
  }
  return store;
}
