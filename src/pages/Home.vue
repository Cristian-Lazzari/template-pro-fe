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
            'img' : state.domain + '/img/pizza-1.png',
            'p' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic obcaecati blanditiis iste quos facilis nemo alias! Obcaecati aut omnis cupiditate asperiores eos, dolor ipsum, debitis exercitationem excepturi ab quibusdam hic!',
            'cta' : 'Prenota Asporto',
            'cta_destination' : 1,  //1 asporto 2 tavoli 3 menu 4 contatti 5 about us
          },
          {
            'title' : 'Titolo Paragrafo 2',
            'img' : state.domain + '/img/pizza-2.png',
            'p' : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic obcaecati blanditiis iste quos facilis nemo alias! Obcaecati aut omnis cupiditate asperiores eos, dolor ipsum, debitis exercitationem excepturi ab quibusdam hic!',
            'cta' : 'Prenota tavolo',
            'cta_destination' : 2,  //1 asporto 2 tavoli 3 menu 4 contatti 5 about us
          },
          {
            'title' : 'Titolo Paragrafo 3',
            'img' : state.domain + '/img/pizza-3.png',
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
        <p>{{ par.p }}</p>
        <div @click="state.movep(par.cta_destination)" class="cta">{{ par.cta }}</div>
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
    scroll-snap-align: start;
    background-color: $c2;
    color: $ctext;
    display: flex;
    width: 100%;
    height: 100% ;
    .img-sect{
      flex-shrink: 0;
      width: 64%;
      img{
        object-fit: cover;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
    }
    .text{
      flex-shrink: 1;
      padding: 10%;
      display: flex;
      flex-direction: column;
      gap: 2em;
      text-align: right;
      align-items: flex-end;
    }
  }
  section:nth-child(even){
    flex-flow: row-reverse;
    background-color: $c1;
    .text{
      align-items: flex-start;
      text-align: left;
    }
  }
}

@media (max-width: $bp_sm) {
  .container{
  }
  section{
    margin-bottom: 500px;
    height: 90% !important;
    flex-direction: column;
    .img-sect{
      height: clamp(180px, 34%, 320px);
      flex-grow: 1;
      flex-shrink: 1;
      width: 100%!important;
    }
    .text{
      flex-grow: 1;
      padding: 1.2rem !important;
      gap: 1rem !important;
      
    }
  }
  section:nth-child(even){
    flex-flow: column !important;
  }
  
}

</style>
