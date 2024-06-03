<script>
  import { state } from "../state.js";
  import axios from "axios";
  export default {
    components: {  },

    data() {
      return {
        state,
        content: [
          {
            'title' : 'Titolo Paragrafo',
            'img' : '/public/img/pizza-1.png',
            'p' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic obcaecati blanditiis iste quos facilis nemo alias! Obcaecati aut omnis cupiditate asperiores eos, dolor ipsum, debitis exercitationem excepturi ab quibusdam hic!',
            'cta' : 'Prenota Asporto',
            'cta_destination' : 1,  //1 asporto 2 tavoli 3 menu 4 contatti 5 about us
          },
          {
            'title' : 'Titolo Paragrafo 2',
            'img' : '/public/img/pizza-2.png',
            'p' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic obcaecati blanditiis iste quos facilis nemo alias! Obcaecati aut omnis cupiditate asperiores eos, dolor ipsum, debitis exercitationem excepturi ab quibusdam hic!',
            'cta' : 'Prenota tavolo',
            'cta_destination' : 2,  //1 asporto 2 tavoli 3 menu 4 contatti 5 about us
          },
          {
            'title' : 'Titolo Paragrafo 3',
            'img' : '/public/img/pizza-3.png',
            'p' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic obcaecati blanditiis iste quos facilis nemo alias! Obcaecati aut omnis cupiditate asperiores eos, dolor ipsum, debitis exercitationem excepturi ab quibusdam hic!',
            'cta' : 'vedi menu',
            'cta_destination' : 3,  //1 asporto 2 tavoli 3 menu 4 contatti 5 about us
          },
        ]
      };
    },
    methods:{

    },
  };
</script>

<template>
  <div class="container">
    <section v-for="par in content" :key="par.title">
      <div class="img-sect">
        <img :src="par.img" alt="">
        <div class="promo"></div>
      </div>
      <div class="text">
        <h2>{{par.title}}</h2>
        <p></p>
        <div @click="state.movep(par.cta_destination)" class="btn">{{ par.cta }}</div>
      </div>

    </section>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

.container{
  height: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  section{
    margin-bottom: 100px ;
    scroll-snap-align: start;
    background-color: $c2;
    color: $c3;
    display: flex;
    width: 100%;
    height: 100% !important;
    .img-sect{
      width: 50%;
    }
    img{
      object-fit: cover;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
  }
}

</style>
