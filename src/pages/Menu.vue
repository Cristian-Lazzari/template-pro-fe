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
          id: "",
          name: "",
          price: 0,
          image: "",
          description: "",
          ingredients: [],
          allergiens: [],
          allergiens_top: [],
          category_name: '',
        },
      };
    },
    methods:{
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
      },

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
      
      async getProduct(c_Id){
        this.openCategory = false
        this.products = []
        const products = await axios.get(state.baseUrl + "api/products", {
					params: {
						category: c_Id,
					}})
        this.products = products.data.results
        this.products.forEach(e => {
          let oldallergiens = JSON.parse(e.allergiens, true)
          console.log(oldallergiens)
          console.log('ciao')
          const newallergiens = oldallergiens.map(p => this.allergiens[p])
          e.allergiens = newallergiens
        });
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
      }
    },
    async mounted() {
      const products = await axios.get(state.baseUrl + "api/products", {})
      this.products = products.data.results

      const categories = await axios.get(state.baseUrl + "api/categories", {})
      this.categories = categories.data.results
      this.categories.shift()

      this.allergiens = products.data.allergiens
      this.products.forEach(e => {
        let oldallergiens = JSON.parse(e.allergiens, true)
        const newallergiens = oldallergiens.map(p => this.allergiens[p])
        e.allergiens = newallergiens
      });
    },
  };
</script>

<template>
  <div class="container" :class="openCategory ? 'container-over' : ''" :style="openCategory ? 'overflow: hidden !important' : ''">
    <div class="top-c" v-if="!state.navMobile && !selectedItem.opened">
      <h1 v-if="!openCategory" >Menu</h1>
      <div class="category"  :class="openCategory ? 'category-on' : ''">
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
            <img  v-for="a in p.allergiens" :key="a.name" :src="a.img" alt="">
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
            <img  v-for="a in selectedItem.allergiens" :key="a.name" :src="a.img" alt="">
          </div>
          <span>{{ selectedItem.category_name }}</span>
        </div>
      </div>
      <div class="sect">
        <div @click="open_x(1)" :class="selectedItem.x_ing ? 'closer' : ''" class="head">
          <div class="name">Ingredienti</div>
          <div class="opener"></div>
        </div>
        <div v-if="selectedItem.x_ing ? 'body-on' : ''" class="body">
          <p>{{ fixtag(selectedItem.ingredients) }}</p>
        </div>
      </div>
      <div class="sect">
        <div @click="open_x(2)" :class="selectedItem.x_desc ? 'closer' : ''" class="head">
          <div class="name">Descrizione</div>
          <div class="opener"></div>
        </div>
        <div v-if="selectedItem.x_desc ? 'body-on' : ''" class="body">
          <p>{{ selectedItem.description }} descrizione del prodotto</p>
        </div>
      </div>
      <div class="sect">
        <div @click="open_x(3)" :class="selectedItem.x_al ? 'closer' : ''" class="head">
          <div class="name">Allergieni</div>
          <div class="opener"></div>
        </div>
        <div v-if="selectedItem.x_al ? 'body-on' : ''" class="body allergiens">
          <img  v-for="a in selectedItem.allergiens" :key="a.name" :src="a.img" alt="">
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
.show-p{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0vh ;
  opacity: 0;
  width: 100%;
  background-color: $cCard;
  z-index: 300;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.624);
  transition: opacity .1s ease-in , height .3s ease-in;
  .show-close{
    display: none;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    color: black;
    width: 100%;
    position: absolute;
    top: -37px;
    height: 37px;
    background-image: url('../../public/img/top-pop.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0px -3px 10px rgba(0, 0, 0, 0.617));
  }
  .image-c{
    display: none;
    background-image: url('../../public/img/pizza-1.png') !important;
    
    }
  .sect{
    display: none;

  }
  .allergiens{
    display: flex;
    gap: 3px;
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
.show-p-active{
  //border-top: 3px solid white;
  padding:  .8rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 1;
  height: 71vh;
  transition: opacity .1s ease-in , height .3s ease-in;
  .show-close, .image-c, .sect{
    display: flex;
  }
  .image-c{
    height: 35%;
    background-size:  cover ;
    background-position: center;
    border-radius: 20px;
    // border-bottom-left-radius: 15px;
    // border-bottom-right-radius: 15px;
    position: relative;
    z-index: 300;
    padding: .7rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
    .bottom{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    h3, .allergiens, span{
      position: relative;
      z-index: 300;
    }
    h3{
      width: 100%;
      font-size: $fs_lg;
    }
    span{
      font-size: $fs_sm;

    }
  }
  .image-c::before{
    background: linear-gradient( #000000ce , #f7f7f700 );
    position: absolute;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    border-radius: 20px;
  }
  .sect{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .head{
      display: flex;
      width: 95%;
      margin: 0 auto;
      justify-content: space-between; 
      opacity: .6;
      font-size: $fs_md;   
      .opener{
        background-image: url('../../public/img/o-c.png');
        background-position: center;
        background-size: cover;
        height: 12px;
        aspect-ratio: 1.8;
        transition: all .3s ease-in-out;
      }
    }
    .closer{
      opacity: 1;
      .opener{
        transform: rotateX(180deg);
      }
    }
    .body{
      padding: 1rem;
      border-radius: 15px;
      background-color: $cbgText;
      p{
        margin: 0 auto;
        font-size: $fs_lg;
        font-family: $fm_2 !important;
        animation: comparsatesto1 .3s ease-in-out;
      }
      //animation: comparsatesto .3s ease-in-out;
    }
  
  }
  .bottom-bar{
    padding: 1rem;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    left: 0;
    width: 100%;
    color: black;
    background-color: rgba(255, 255, 255, 0.333);
    .price{
      font-size: $fs_lg;
    }
    .btn-add{
      background-color: white;
      color: black;
      padding: .4rem 1.2rem;
      border-radius: 30px;
    }
  }
  
 
    
}
.container-over::after{
  content: '';
  display: block;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.439);
  z-index: 4;
}
.container{
  .top-c{
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 1%;
    right: 3%;
    z-index: 12;
    h1{
      text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.506);
    }
    .category{
      width: fit-content;
      padding: .5rem 1.4rem;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $c4;
      font-size: $fs_md;
      //animation: bodycat2 0.6s ease;
  
      
      span{
        font-family: $fm_1;
      }
      
    .body{
      display: flex;
      justify-content: space-around;
      align-items: center;
      animation: bodycat2 0.6s ease;
      
      
    }
    .cont{
      display: none;
  
    }
  }
  .category-on{
    margin: 0 auto;
    padding: 2rem;
    width: 90%;
    overflow: hidden;
    animation: bodycat1 0.5s ease;
    
  .body{
    display: none;
    animation: bodycat1 .3s ease-in-out;
    }
    .cont{
      max-height: 70vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      .head{
        display: flex;
        justify-content: space-between;
        align-items: center;

        img{
          width: 15px;
        }
      }
      .cat-cont{
        overflow: auto;
        width: 100%;
        
        .tutti{
          margin-top: 20px;
        }
        div{
          margin-bottom: 3px;
          padding: 5px 10px;
          text-align: center;
          border: 1px solid white;
          border-radius: 10px;
          width: 100% !important;
          font-family: $fm_1;
        }
      }
      
    }
  }
  }
 
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
      background-color: $cCard;
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
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.324);
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
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.346);
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
      gap: 6px !important;
      .product-card{
        width: 100% !important;
        flex-direction: row-reverse !important;
        justify-content: space-between;
        flex-wrap: wrap;
        text-align: right;
        padding: .6rem;
        gap: 4px !important;
        .image-cont{
          height: 70px !important;
          width: 60px;
        }
        .allergiens{
          position: absolute;
          bottom: -5px;
          left: 10px;
          justify-content: flex-start !important;
          max-width: 60%;
          overflow: auto;
          flex-wrap: nowrap !important;
          gap: 4px !important;
          padding: 10px 0;
          img{
            border-radius: 9px !important;
            width: 22px !important;
          }
          
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
