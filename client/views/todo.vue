<template>
  <div class="todo">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="addTodo"
    >
    <Items 
      v-for="item in todoFilter" 
      :todoitem="item" 
      :key="item.id" 
      @deleteTodo="deleteTodo" />
    <Tabs 
      :filter-type="filterType" 
      :todo="todo" 
      :filter="filter" 
      @clearAllCompleted="clearAllCompleted" 
      @changeFilter="changeFilter" />
  </div>
</template>

<script>
import Items from './item.vue';
import Tabs from './tabs.vue';

const filterType = {
	all: 'all',
	completed: 'completed',
	uncompleted: 'uncompleted'
};
export default {
	components: {
		Items,
		Tabs
	},
	data () {

		return {
			todo: [],
			filter: filterType.all,
			filterType
		};

	},
	computed: {
		todoFilter () {

			if (this.filter === this.filterType.all) {

				return this.todo;

			}
			const isCompleted = this.filter === this.filterType.completed;

			return this.todo.filter((item) => item.completed === isCompleted);

		}
	},
	methods: {
		addTodo (e) {

			this.todo.unshift({
				id: Math.random(),
				completed: false,
				content: e.target.value
			});
			e.target.value = '';

		},
		deleteTodo (id) {

			this.todo = this.todo.filter((item) => item.id !== id);

		},
		filterTodo (filter) {

			this.filter = filter;

		},
		changeFilter (type) {

			this.filter = type;

		},
		clearAllCompleted () {

			const result = this.todo.filter((item) => !item.completed);
			this.todo = result;

		}
	}
};
</script>

<style lang="less" scoped>
.todo {
  padding: 20px;
}
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>

