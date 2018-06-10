<template>
  <div class="div">
    {{text}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      text:'123'
    }
  }
}
</script>

<style>
.div{
  color:red;
  background-image:url('../assets/test-image.png'); 
  display:flex;
  border-radius:50%;
}
</style>




