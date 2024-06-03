<script>
  import { state } from "../state.js";
  import axios from "axios";
  export default {
    components: {  },

    data() {
      return {
        state,
      };
    },
    methods:{

    },
  };
</script>

<template>
  <nav>
    <div class="left">
      <img src="" alt="" class="logo">
      <h1>Nome del Locale</h1>
    </div>
    <div class="right">
      <span @click="state.movep()"></span>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.nav{
  background-color: $c4;
  padding: 2rem;
}


</style>
