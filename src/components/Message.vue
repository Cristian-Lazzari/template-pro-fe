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
        this.state.ferie.status =false
      }
    },
  };
</script>

<template>
  <div class="overlay" v-if="state.message.title || state.ferie.status">

    <div  v-if="state.message.title" class="message">
      <img class="close" @click="closemessage" src="../../public/img/close-x.png" >
      <h1>{{ state.message.title }}</h1>
      <p>{{ state.message.text }}</p>
      <p>Se sei soddidfatto <a :href="state.link_review">lascia una recensione!</a> </p>
    </div>
    <div  v-if="state.ferie.status" class="message">
      <img class="close" @click="closemessage" src="../../public/img/close-x.png" >
      <h1>SIAMO IN FERIE DAL {{ state.ferie.from }} AL {{ state.ferie.to }} </h1>
      <p>Anche per noi e arrivato il momento di prenderci un po di riposo, nel frattempo sfoglia il menu e scopri le sfiziosita del nostro locale </p>
      
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
      overflow: auto;
      p{
        flex-grow: 1;
      }
    }
  }
  @media (max-width:$bp_md) {
    .message{
     max-width: 70% !important;
    }
  }

</style>
