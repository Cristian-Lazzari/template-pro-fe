<script >
  import { state } from "./state.js";

  import axios from "axios";
  import AppNav from './components/Nav.vue'
  import AppFooter from './components/Footer.vue'


  export default {
    components:{  AppNav,  AppFooter },

    data() {
      return {
        state,
      };
    },
    methods:{

    },
    async mounted() {
      const settings = await axios.get(state.baseUrl + "api/setting", {});
      this.state.settings = settings.data.results;
    },
  }
</script>

<template>

  <div class="c">

    <AppNav class="nav" />

    <div class="sub-page">
      <router-view id="page" class="page"></router-view>
      <AppFooter />
    </div>

  </div>
 

  
</template>

<style lang="scss" >
@use './assets/styles/general.scss' as *;
body{
  overflow: hidden;
  }
.c{
  background-color: $c2;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  .nav{
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.56);
    z-index: 10;
  }
  .sub-page{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-x: auto;
    flex-grow: 1;
    flex-shrink: 1;
      .page{
        h1{
          width: fit-content;
          font-size: $fs_xlg;
        } h2{
          margin-bottom: 1.3vh;
          font-size: $fs_lg;
        }
        
        padding: 1.5rem 1.5rem 50vh;
      }
      }
      
      }
@media (max-width: $bp_sm) {
        
  #page{
    padding: .5rem .5rem 50vh;
    
  }

  
}
</style>
