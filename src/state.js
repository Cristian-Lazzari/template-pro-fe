import { reactive } from "vue";

export const state = reactive({
  baseUrl: "http://127.0.0.1:8000/",
  domain: "http://dpf.future-plus.it/",
  getImageUrl(image) {
    return this.baseUrl + "public/storage/" + image;
  },

  //---1-Gestione interfaccia grafica

  navMobile: false,



  //---2-Gestione interfaccia setting


  //-----2-a-Dati
  contact : {
    'email' : 'email',
    'phone' : 'phone',
  },

  //-----2-b-Funzioni 
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


  



  //---3-Dati Prenotazioni








  //---4-Dati Ordini






  //---5-Gestione Carrello

  //-----5-a-Dati Carrello

  //-----5-b-Funzioni Carrello



});
