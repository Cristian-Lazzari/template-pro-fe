<script >
  
  import AppNav from './components/Nav.vue'
  import AppFooter from './components/Footer.vue'


  export default {
  components:{  AppNav,  AppFooter }
  }
</script>

<template>

  <div class="c">

    <AppNav class="nav" />

    <div class="sub-page">
      <router-view class="page"></router-view>
      <AppFooter />
    </div>

  </div>
 

  
</template>

<style lang="scss" >
@use './assets/styles/general.scss' as *;

.c{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .nav{
    overflow: hidden;
    //flex-grow: 1;
  }
  .sub-page{
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    flex-grow: 1;
    flex-shrink: 1;
  }

}
</style>
