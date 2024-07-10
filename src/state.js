import { reactive } from "vue";

export const state = reactive({
  baseUrl: "http://127.0.0.1:8000/",
  link_review: "http://127.0.0.1:8000/",
  //baseUrl:"https://dpf.future-plus.it/",
  //domain: "https://dpf.future-plus.it/",
  domain: "https://visionary-centaur-1b3d7b.netlify.app/",
  getImageUrl(image) {
    return this.baseUrl + "public/storage/" + image;
  },
  getImgshow(img){
    return 'background-image:url("' + this.baseUrl + "public/storage/" + img + '")';
  },
  //---1-Gestione interfaccia grafica
  
  navMobile: false,
  checkOut_t: 1,
  message : {
    title : '',
    text : ''
  },
  success_res: '',
  success_del: '',
  success_or: '',
  
  //---2-Gestione order

  cart:{
    'totprice' : 0,
    'products' : [],
  },
  npezzi_c1 : 0,
  npezzi_c2 : 0,
  
  //---3-Gestione interfaccia date
  mesi :['', 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
  days_weeks :[' ','lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'],
  giorniPerMese : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  //---4-Gestione interfaccia setting
  settings : [
    {
      'name' : 'tavoli',
      'status' : 0,
      'property' : null,
    },
    {
      'name' : 'asporto',
      'status' : 0,
      'property' : null,
    },
    {
      'name' : 'ferie',
      'status' : 0,
      'property' : {
        'from': '--/--/---',
        'to': '--/--/---'
      },
    },
    {
      'name' : 'domicilio',
      'status' : 0,
      'property' : null,
    },
    {
      'name' : 'comuni per il domicilio',
      'status' : 0,
      'property' : [],
    },

  ],
  //-----4-a-Dati
  contact : {
    'email' : 'email',
    'phone' : 'phone',
  },
  //---5-Funzioni 
  validation(ct, too, us, error){
    let check = false;
    if(ct == 3 && too){
      if(!us.comune){
        error.comune = 'Il campo "comune" è necessario';
        check = true;
      }
      if(!us.via){
        error.via = 'Il campo "via" è necessario';
        check = true;
      }
      if(!us.cv){
        error.cv = 'Il campo "civico" è necessario';
        check = true;
      }  
    }
    
    if(!us.tc){
      error.tc = 'Per ordinare e necessariio accettare i termini e le condizioni';
      check = true;
    }
    //nome
    if(!us.name){
      error.name = 'Il campo "nome" è necessario';
      check = true;
    }
    //cognome
    if(!us.surname){
      error.surname = 'Il campo "cognome" è necessario';
      check = true;
    }
    // Email
    if (!us.email) {
      error.email='Il campo "email" è richiesto!';
      check = true;
    } else if (!us.email.includes('@')) {
      error.email='Il campo "email" deve includere "@"';
      check = true;
    } else if (!(us.email.endsWith('.com') || us.email.endsWith('.it'))) {
      error.email='Il campo "email" deve terminare con ".com" o ".it"';
      check = true;
    } else if (us.email.length < 5) {
      error.email='Il campo "email" deve contenere almeno 5 caratteri';
      check = true;
    }
    us.phone = us.phone.toString()
    if(!us.phone){
      error.phone = 'Il campo "telefono" è richiesto';
      check = true;
      phone
    } else if(us.phone.length < 10){
      error.phone = 'Il campo "email" deve contenere almeno 10 caratteri';
      check = true;
    }
    if(!check){
      return true;
    }else {
      return false;
    }
  },
  getServerCart(){
    let newcart = []
    this.cart.products.forEach(prod => {
      let newo = []
      prod.options.forEach(o => {
        newo.push(o.name)
      });
      let newr = []
      prod.removed.forEach(o => {
        newr.push(o.name)
      });
      let newa = []
      prod.add.forEach(o => {
        newa.push(o.name)
      });
      let product = {
        id : prod.id,
        name : prod.name,
        add : newa,
        removed : newr,
        options : newo,
        price : prod.price,
        counter : prod.counter,
      }
      newcart.push(product)
      
    });
    return newcart
  }

  //---3-Dati Prenotazioni








  //---4-Dati Ordini






  //---5-Gestione Carrello

  //-----5-a-Dati Carrello

  //-----5-b-Funzioni Carrello



});
