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
        category: {
          'id' : '0',
          'name': 'Tutti',
          'icon' : ''                                                                                 
        },
      };
    },
    methods:{
      fixtag(arr){
        let arrtag='';
        arr.forEach((element, i) => {
          
          if(i+1==arr.length){
            
            arrtag = arrtag + element.name + '.'
          }else{
            arrtag = arrtag + element.name + ', '
            
          }
        });
        return arrtag
      },
    },
    async mounted() {
      const products = await axios.get(state.baseUrl + "api/products", {})
      this.products = products.data.results

      const categories = await axios.get(state.baseUrl + "api/categories", {})
      this.categories = categories.data.results

      this.allergiens = products.data.allergiens
      this.products.forEach(e => {
        let oldallergiens = JSON.parse(e.allergiens, true)
        console.log(oldallergiens)
        console.log('ciao')
        const newallergiens = oldallergiens.map(p => this.allergiens[p])
        e.allergiens = newallergiens
      });
    },
  };
</script>

<template>
  <div class="container">
    <h1>Menu</h1>
    <div class="category">
      <div class="body">
        <span class="cat_active">{{ category.name }}</span>
      </div>
      <div class="cont">
        <span>Tutti</span>
        <span v-for="c in categories" :key="c.id">{{ c.name }}</span>
      </div>
    </div>
    <div class="cont-p">
      <div class="product-card" v-for="p in products" :key="p.id">
        <div class="image-cont" :style="'background-image:' + state.getImageUrl(p.img)">
          <div class="allergiens">
            <img  v-for="a in p.allergiens" :key="a.name" :src="a.img" alt="">
          </div>
        </div>
        <div class="text">
          <h3>{{ p.name }}</h3>
          <p class="description">
            {{ fixtag(p.ingredients) }}
          </p>
          <p class="description">
            {{ p.description }}
          </p>
        </div>
        <p class="price">€ {{ p.price / 100 }}</p>
      </div>

    </div>
  </div>
  
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

.container{
  .cont-p{
    width: 100%;
    display: flex;
    justify-content: space-between;
    //align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    .product-card{
      flex-grow: 1;
      width: calc((100% - 2rem) / 2);
      background-color: $card;
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 10px;
      position: relative;
      .image-cont{
        background-image: url('../../public/img/pizza-2.png');
        height: 150px;
        background-size: cover;
        background-position: center;
        border-radius: 9px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 3px;
        .allergiens{
          width: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          img{
            padding: 3px;
            aspect-ratio: 1;
            border-radius: 100%;
            background-color: rgba(255, 255, 255, 0.658);
            width: 30px;
            box-shadow: 2px 2px 4px black;
          }
        }
      }
      .text{
        text-align: right;
        display: flex;
        flex-direction: column;
        gap: 7px;
        font-size: $fs_xsm;
        h3{

          font-size: $fs_md
        }
      }
      .price{
        font-size: $fs_lg
      }
    }
  }
  @media (max-width: $bp_md) {
    .cont-p{
      gap: 15px !important;
      .product-card{
        width: 100% !important;
        flex-direction: row-reverse !important;
        justify-content: space-between;
        flex-wrap: wrap;
        text-align: right;
        padding: .6rem;
        gap: 7px !important;
        .image-cont{
          height: 70px !important;
          width: 60px;
        }
        .allergiens{
          position: absolute;
          bottom: -5px;
          left: 10px;
          justify-content: flex-start !important;
          
        }
        .text{
          flex-shrink: 1;
          text-align: left;
          width: calc(100% - 70px);
          
        }
        .price{
          width: 100%;
        }
      }
    }
  }
}
</style>
