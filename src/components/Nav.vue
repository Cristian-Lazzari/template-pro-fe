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
          
          if (this.$route.path === '/check-out') {
            window.location.reload()
            console.log('Sei già sulla pagina di check-out');
          } else {
            this.state.checkOut_t = 1
            this.$router.replace("/check-out")
          }
        }else if(npage == 3){
          
          this.$router.replace("/menu")
        }else if(npage == 4){
          
          this.$router.replace("/contatti")
        }else if(npage == 5){
          
          this.state.post_p = 2
          this.$router.replace("/story")
        }else if(npage == 6){
          
          this.state.post_p = 1
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
      <span v-if="state.settings[1].status == 2"  @click="movep(1)">Ordina Asporto</span>
      <span v-if="state.settings[0].status == 2" @click="movep(2)">Prenota Tavolo</span>
      <a :href="'tel:' + state.contact.phone" v-if="state.settings[1].status == 1">Ordina Asporto</a>
      <a :href="'tel:' + state.contact.phone" v-if="state.settings[0].status == 1">Prenota Tavolo</a>
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
      <span @click="movep(7); state.navMobile = !state.navMobile">Home</span>
      <span @click="movep(3); state.navMobile = !state.navMobile">Menu</span>
      <span v-if="state.settings[1].status == 2" @click="movep(1); state.navMobile = !state.navMobile">Ordina Asporto</span>
      <span v-if="state.settings[0].status == 2" @click="movep(2); state.navMobile = !state.navMobile">Prenota Tavolo</span>
      <a :href="'tel:' + state.contact.phone" v-if="state.settings[1].status == 1">Ordina Asporto</a>
      <a :href="'tel:' + state.contact.phone" v-if="state.settings[0].status == 1">Prenota Tavolo</a>
      <span @click="movep(6); state.navMobile = !state.navMobile">News</span>
      <span @click="movep(5); state.navMobile = !state.navMobile">Chi siamo</span>
      <span @click="movep(4); state.navMobile = !state.navMobile">Contatti</span>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.nav{
  a{
    text-decoration: none;
  }
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
    color: $cText;
    span, a{
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
      background-color: $cText;
      width: 100%;
      border-radius: 10px;
      height: 4px;
      transition: all .3s ease-in-out;
    }
    .l2{
      width: 70% !important;
      align-self: flex-end;
      transition: all .3s ease-in-out;
    }
  }
  .im-actvive{
    transform: translate(20%, 50%);
    position: relative;
    .l2{
      opacity: 0;
      transition: all .3s ease-in-out;
    }
    .l1{
      transform: rotateZ(225deg);
      position: absolute;
      transition: all .3s ease-in-out;
    }
    .l3{
      transition: all .3s ease-in-out;
      transform: rotateZ(-225deg);
      position: absolute;
    }
    transition: all .3s ease-in-out;
  }
  
}
.menu-tendina{
  opacity: 0.3;
  background-color: $c2;
  height: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  span, a{
    display: none;
    opacity: 0;
    font-size: clamp(25px, 3.3vw, 32px);
    text-transform: uppercase;
    transition: opacity .1s ease-in-out;
  }
  transition: all .3s ease-in-out;
}
.menu-tendina-on{
  opacity: 1;
  span, a{
    display: block;
    opacity: 1;
  }
  height: 100% !important;
  transition: all .3s ease-in-out;
}
@media (max-width: $bp_md) {
  .menu-tendina{
    display: flex;
  }
  .right{
    justify-content: flex-end !important;
    span, a{
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
