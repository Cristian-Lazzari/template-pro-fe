<script>
  import { state } from "../state.js";
  import axios from "axios";
  export default {
    components: {  },

    data() {
      return {
        state,
        products: [],
        allergiens: [],
        ingredients: [],
        categories: [],
        openCategory: false,
        category: {
          id : '0',
          name : 'Tutti',
          icon : ''                                                                                 
        },
        selectedItem: {
          opened: false,
          x_al: false,
          x_desc: false,
          x_ing: false,
          id: '',
          name: '',
          price: 0,
          image: '',
          description: '',
          category_name: '',
          ingredients: [],
          allergiens: [],
          special: [],
        },
      };
    },
    methods:{
      //gestione show prodotto
      open_x(n){
        if(n == 1){
          this.selectedItem.x_ing = !this.selectedItem.x_ing 
          this.selectedItem.x_desc = false 
          this.selectedItem.x_al = false 
        } else if(n==2){
          this.selectedItem.x_desc = !this.selectedItem.x_desc 
          this.selectedItem.x_al = false 
          this.selectedItem.x_ing = false                       
        } else if(n==3){
          this.selectedItem.x_al = !this.selectedItem.x_al 
          this.selectedItem.x_ing = false 
          this.selectedItem.x_desc = false 
        }

      },
      openShow(p, si){
        si.opened = true
        si.name = p.name
        si.image = p.image
        si.description = p.description
        si.price = p.price
        si.id = p.id
        si.special = p.special
        si.ingredients = p.ingredients
        si.allergiens = p.allergiens
        si.category_name = p.category.name
      },
      closeShow(si){
        si.opened = false
        si.name = ''
        si.image = ''
        si.description = ''
        si.price = ''
        si.id = ''
        si.ingredients = []
        si.allergiens = []
        si.special = []
      },
      //funzioni per testo ingredienti
      capitalizeFirstLetter(string) {
        if (typeof string !== 'string' || string.length === 0) {
          return string; // Gestisce il caso in cui l'input non è una stringa o è una stringa vuota
        }
        
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      },
      fixtag(arr){
        let arrtag='';
        arr.forEach((element, i) => {
          if( i+1 ==arr.length){  
            arrtag = arrtag + element.name + '.'
          }else{
            arrtag = arrtag + element.name + ', '
            if(i == 0){
              arrtag = this.capitalizeFirstLetter(arrtag)
            }
            
          }
        });
        return arrtag
      },
      //filtraggio ingredienti
      async getProduct(c_Id){
        this.openCategory = false
        this.products = []
        this.allergiens = []
        if(c_Id !== 0){
          let products = await axios.get(state.baseUrl + "api/products", {
					params: {
						category: c_Id,
					}})
          this.products = products.data.results
          this.allergiens = products.data.allergiens
          this.categories.forEach(c => {
            if(c.id == c_Id){
              this.category = c
            }else if(c_Id == null){
              this.category= {
                'id' : '0',
                'name': 'Tutti',
                'icon' : ''                                                                                 
              }
            }
          });

          this.products.forEach(e => {
            let oldallergiens = JSON.parse(e.allergiens, true)
            const newallergiens = oldallergiens.map(p => this.allergiens[p])
            e.allergiens = newallergiens
          });

        }else{
          let products = await axios.get(state.baseUrl + "api/products", {})
          this.products = products.data.results
          this.allergiens = products.data.allergiens

          this.products.forEach(e => {
            e.special = []
            let oldallergiens = JSON.parse(e.allergiens, true)
            e.allergiens = []
            let newallergiens = oldallergiens.map(p => this.allergiens[p])
            for (let i = 0; i < newallergiens.length; i++) {
              let el = newallergiens[i];
              if(el.special == 0){
                e.allergiens.push(el)
              }else{
                e.special.push(el)
              }       
            }
          });

        }     
      }
    },
    async mounted() {
      
      const categories = await axios.get(state.baseUrl + "api/categories", {})
      this.categories = categories.data.results
      this.categories.shift()

      this.getProduct(0);
     
    },
  };
</script>

<template>
  <div class="container-m" :class="openCategory ? 'container-m-over' : ''" :style="openCategory ? 'overflow: hidden !important' : ''">
    <div class="top-c" v-if="!state.navMobile && !selectedItem.opened">
      <h1 v-if="!openCategory" >Menu</h1>
      <div class=""  :class="openCategory ? 'category-on' : 'category'">
        <div class="body" @click="openCategory = !openCategory">
          <p class="cat_active"><span>{{ category.name }}</span> - Scegli la categoria</p>
        </div>
        <div class="cont">
          <div class="head">
            <h3>Scegli una categoria</h3>
            <img class="close" @click="openCategory = false" src="../../public/img/close-x.png" >
          </div>
          <div class="cat-cont">
            <div @click="getProduct(null)" class="tutti">Tutti</div>
            <div @click="getProduct(c.id)" v-for="c in categories" :key="c.id" >{{ c.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <h2>Categoria : {{category.name}}</h2>
    <div class="cont-p" >
      <div class="product-card" v-for="p in products" :key="p.id" @click="openShow(p, selectedItem)">
        <div class="image-cont" :style="'background-image:' + state.getImageUrl(p.img)">
          <!-- <div class="image-cont" :style="state.getImgshow(p.img)"> -->
          <div class="allergiens">
            <img  v-for="a in p.special" :key="a.name" :src="a.img" alt="">
          </div>
        </div>
        <div class="text">
          <h3>{{ p.name }}</h3>
          <p class="description">
            {{ fixtag(p.ingredients) }}
          </p>
          
        </div>
        <p class="price">€ {{ p.price / 100 }}</p>
      </div>

    </div>
    <div :class="!selectedItem.opened ? 'show-p' : 'show-p show-p-active'">
      <div class="show-close" @click="closeShow(selectedItem)">close x</div>
      <div class="image-c" :style="state.getImgshow(selectedItem.img)">
        <h3>{{ selectedItem.name }}</h3>
        <div class="bottom">
          <div class="allergiens">
            <img v-for="a in selectedItem.special" :key="a.name" :src="a.img" alt="">
          </div>
          <span>{{ selectedItem.category_name }}</span>
        </div>
      </div>
      <div class="sect" v-if="selectedItem.ingredients.length !== 0" >
        <div @click="open_x(1)" :class="selectedItem.x_ing ? 'closer' : ''" class="head">
          <div class="name">Ingredienti</div>
          <div class="opener"></div>
        </div>
        <div v-if="selectedItem.x_ing" class="body">
          <p>{{ fixtag(selectedItem.ingredients) }}</p>
        </div>
      </div>
      <div class="sect" v-if="selectedItem.description !== null">
        <div @click="open_x(2)" :class="selectedItem.x_desc ? 'closer' : ''" class="head">
          <div class="name">Descrizione</div>
          <div class="opener"></div>
        </div>
        <div v-if="selectedItem.x_desc" class="body">
          <p>{{ selectedItem.description }}</p>
        </div>
      </div>
      <div class="sect">
        <div @click="open_x(3)" :class="selectedItem.x_al ? 'closer' : ''" class="head">
          <div class="name">Allergieni</div>
          <div class="opener"></div>
        </div>
        <div v-if="selectedItem.x_al" class="body allergiens">
          <img  v-for="a in selectedItem.allergiens" :key="a.name" :src="a.img" alt="">
          <p v-if="selectedItem.allergiens.length == 0" >Nessun allergiene presente</p>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="btn-add">Aggiungi al carrello</div>
        <div class="price">€{{ selectedItem.price / 100 }}</div>
      </div>
      
    </div>
  </div>
  
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;


</style>
