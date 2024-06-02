import { reactive } from "vue";

export const state = reactive({
  baseUrl: "http://127.0.0.1:8000/",
  getImageUrl(image) {
    return this.baseUrl + "public/storage/" + image;
  },

  //---1-Gestione interfaccia grafica





  //---2-Gestione interfaccia setting


  //-----2-a-Dati


  //-----2-b-Funzioni 



  
  


  //---3-Dati Prenotazioni








  //---4-Dati Ordini






  //---5-Gestione Carrello

  //-----5-a-Dati Carrello

  //-----5-b-Funzioni Carrello



});
