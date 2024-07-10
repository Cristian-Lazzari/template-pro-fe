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
      closemessage(){
        this.state.message.title = ''
        this.state.message.message = ''
      }
    },
  };
</script>

<template>
  <div class="overlay" v-if="state.message.title">

    <div class="message">
      <img class="close" @click="closemessage" src="../../public/img/close-x.png" >
      <h1>{{ state.message.title }}</h1>
      <p>{{ state.message.text }}</p>
      <p>Se sei soddidfatto <a :href="state.link_review">lascia una recensione!</a> </p>
    </div>
  </div>
  
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
  .overlay{
    background-color: rgba(0, 0, 0, 0.373);
    backdrop-filter: blur(4px);
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .close{
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .message{
      border: 3px solid $c5;
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 2.5rem 2.5rem;
      gap: 1.3rem;
      align-items: center;
      border-radius: 15px;
      box-shadow: 0 0 60px black;
      text-align: center;
      max-width: 50%;
      max-height: 50%;
      background-color: $c3;
      p{
        flex-grow: 1;
      }
    }
  }

</style>
