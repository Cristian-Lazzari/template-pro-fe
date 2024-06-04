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
      movep(npage){ //1 asporto 2 tavoli 3 menu 4 contatti 5 story 6 news 
        if(npage == 1 ){
          this.$router.replace("/ordina")
          
        }else if(npage == 2){
          
          this.$router.replace("/prenota")
          
        }else if(npage == 3){
          
          this.$router.replace("/menu")
        }else if(npage == 4){
          
          this.$router.replace("/contatti")
        }else if(npage == 5){
          
          this.$router.replace("/story")
        }else if(npage == 6){
          
          this.$router.replace("/news")
        }else if(npage == 7){
          
          this.$router.replace("/")
        }
      },
    },
  };
</script>

<template>
  <nav>
    <div class="left">
      <h1 v-if="true">Nome del locale</h1>
      <img v-else src="../../public/img/logoblack.png" alt="">
    </div>
    <div class="right">  
      
      <!--  1 asporto 2 tavoli 3 menu 4 contatti 5 story 6 news 7 home -->
      <span @click="movep(7)">Home</span>
      <span @click="movep(3)">Menu</span>
      <span @click="movep(1)">Ordina Asporto</span>
      <span @click="movep(2)">Prenota Tavolo</span>
      <span @click="movep(6)">News</span>
      <span @click="movep(5)">Chi siamo</span>
      <span @click="movep(4)">Contatti</span>

      <div class="icon-menu" :class="!state.navMobile ? '' : 'im-actvive' " @click="state.navMobile = !state.navMobile">
        <div class="l l1"></div>
        <div class="l l2"></div>
        <div class="l l3"></div>
      </div>
    </div>
    <div :class="!state.navMobile ? 'menu-tendina' : 'menu-tendina-on menu-tendina' " >
      <span @click="movep(7)">Home</span>
      <span @click="movep(3)">Menu</span>
      <span @click="movep(1)">Ordina Asporto</span>
      <span @click="movep(2)">Prenota Tavolo</span>
      <span @click="movep(6)">News</span>
      <span @click="movep(5)">Chi siamo</span>
      <span @click="movep(4)">Contatti</span>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.nav{
  background-color: $c4;
  padding: 1.2rem;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  .left, .right{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    padding-inline: 1rem;
    color: $ctext;
    span{
      font-size: clamp(17px, 2.4vw, 20px);
      font-family: "Jomhuria", serif;
    }
  }
  .left{
    justify-content: flex-start;
    gap: 20px;
    h1{
      font-size: clamp(20px, 3.4vw, 30px);
      font-family: "lemon";
    }

  }
  img{
    display: block;
    height: 90px;
  }
  .icon-menu{
    position: relative;
    z-index: 1500;
    display: none;
    height: 33px;
    width: 37px;
    flex-direction: column;
    justify-content: space-between;
    .l{
      background-color: $ctext;
      width: 100%;
      border-radius: 10px;
      height: 4px;
    }
    .l2{
      width: 70% !important;
      align-self: flex-end;
    }
  }
  .im-actvive{
    transform: translate(-50%, 50%);
    position: relative;
    .l2{
      opacity: 0;
    }
    .l1{
      transform: rotateZ(45deg);
      position: absolute;
    }
    .l3{
      transform: rotateZ(-45deg);
      position: absolute;
    }
  }
  
}
.menu-tendina{
  background-color: $c2;
  height: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  span{
    display: none;
    font-size: clamp(25px, 3.3vw, 32px);
    text-transform: uppercase;
  }
  transition: all .3s ease-in-out;
}
.menu-tendina-on{
  span{
    display: block;
  }
  height: 100% !important;
  transition: all .3s ease-in-out;
}
@media (max-width: $bp_md) {
  .right{
    justify-content: flex-end !important;
    span{
      display: none;
    }
    .icon-menu{
      display: flex !important;;
    }
  }
}
@media (max-width: $bp_sm) {
  nav{
    padding: .8rem;
    img{
      height: 60px !important;
    }
  }
}


</style>
