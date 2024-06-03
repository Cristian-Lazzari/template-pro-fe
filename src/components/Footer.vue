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
  <footer>
    <div class="legal">
      <h4>informazioni legali</h4>
      <a href="">Privacy Policy</a>
      <a href="">Cookie Policy</a>
      <a href="">Creato da Future plus</a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
footer{
  background-color: $c1;
  padding: 2em;
  color: $c3;
  a{
    color: $c3;
  }
}
</style>
