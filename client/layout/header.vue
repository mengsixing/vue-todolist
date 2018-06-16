<template>
  <header class="main-header">
    <h2>{{ text }}</h2>
  </header>
</template>

<script>
export default {
	data () {

		return {
			text: 'header'
		};
	}
};
</script>


<style lang="less" scoped>
.main-header {
  text-align: center;
  h2 {
    font-size: 28px;
    color: rgba(175, 47, 47, 0.4);
    font-weight: 100;
    margin: 20px;
  }
}
</style>
