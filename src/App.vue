<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from './components/Index.vue';

export default {
  name: 'app',
  components: {
    Index
  },
};
</script>

<style lang="scss">

html {
  background: #f85032;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #e73827, #f85032);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #e73827, #f85032); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#app {
  font-family: 'Luckiest Guy', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
}
</style>
