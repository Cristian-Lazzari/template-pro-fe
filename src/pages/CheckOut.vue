<script>
  import { state } from "../state.js";
  import axios from "axios";
  export default {
    components: {  },

    data() {
      return {
        state,
        day : '',
        days : [],
        month : '',
        time : '',
        year : [],
      };
    },
    methods:{
      fillDay(){
        let arr = []
        let max = this.days[0].day
        let dw = this.days[0].day_w
        if(max !== 1){
          for (let i = 1; i < max ; i++) {
            arr.push(i)  
          }
        }
        if(dw !== 1){
          for (let i = 1; i < dw; i++) {
            arr.push(i)  
          }
        }
        //console.log(arr)
        return arr
      },
      adjustC(month) {
        let maxdaymese = state.giorniPerMese[month - 1];
        if (this.days.length === 0) {
            return; // Non fare nulla se non ci sono giorni in this.days
        }
        let newDays = [];
        newDays.push(this.days[0]);
        for (let i = 1; i < this.days.length; i++) {
            let prevDay = this.days[i - 1].day;
            let currentDay = this.days[i].day;

            for (let j = prevDay + 1; j < currentDay; j++) {
                if (j > maxdaymese) break;
                newDays.push({ day: j });
            }
            
            newDays.push(this.days[i]);
        }
        // Se necessario, aggiungi giorni fino al massimo giorno del mese
        let lastDay = newDays[newDays.length - 1].day;
        for (let k = lastDay + 1; k <= maxdaymese; k++) {
            newDays.push({ day: k });
        }
        this.days = newDays;
      },

      async getDay(filter){
        let year = await axios.get(state.baseUrl + "api/getDays", {
					params: {
						filter : filter,
				  }})
        for (let i = 1; i <= year.data.count; i++) {
          const element = year.data.results[i]
          this.year.push(element)  
        }
        this.month = this.year[0].month
        this.days = this.year[0].days
        this.adjustC(this.month)
      },
      modMonth(a_r){
        let n_mesi = this.year.length 
        
        let f_mese = this.year[0].month
        let l_mese = this.year[n_mesi - 1].month
        if(a_r == 'add'){
          if(this.month == l_mese){
            this.month = f_mese
          }else if(this.month == 12 && this.month !== l_mese ){
            this.month = 1
          }else{
            this.month ++
          }
        }else if(a_r == 'rem'){
          if(this.month == f_mese){
            this.month = l_mese
          }else if(this.month == 1){
            this.month = 12
          }else{
            this.month --
          }
        }else{
          this.month = a_r
        }
        console.log(this.month)
        this.year.forEach(m => {
          if(m.month == this.month){
            this.days = m.days
            this.adjustC(this.month)
          }
        });
      },
    },

    async created(){
      await this.getDay(state.checkOut_t)
    },
    
  };
</script>

<template>
  <div class="container">
    <section>
      <h3>Scegli come vuoi ordinare</h3>
      <div class="card choice">
        <span @click="state.checkOut_t = 2" :class="state.checkOut_t == 2 ? 'active' :''">Asporto</span>
        <span @click="state.checkOut_t = 3" :class="state.checkOut_t == 3 ? 'active' :''">Domicilio</span>
      </div>
    </section>
    <section>
      <h3>Scegli il giorno</h3>
      <div class="card calendar">
        <div class="months">
          <h4 
            v-for="m in year" :key="m.month" 
            @click="month = m.month; days = m.days" 
            :class="m.month == month ? 'active' : ''">
            {{ state.mesi[m.month] }}
          </h4>
        </div>
        <div class="day_week">
          <span>L</span>
          <span>M</span>
          <span>M</span>
          <span>G</span>
          <span>V</span>
          <span>S</span>
          <span>D</span>
        </div>
        <div class="days">
          <!-- <div class="day" v-for="d in days[0].day_w" :key="d" ></div> -->
          <div 
          v-for="d in days"
          :key="d.day" 
          :class="d.day == day ? 'active day' : 'day'"
          @click="day = d"
          >
            <span>{{ d.day }}</span>
          </div>
        </div>
        <div @click="modMonth('add')" class="next">-></div>
        <div @click="modMonth('rem')" class="previus">-</div>
      </div>
    </section>
    <section v-if="day" >
      <h3>Scegli orario per il ritiro</h3>
      <div class="card">
        <div class="back"></div>
        <h3>{{ day.day_week }} {{ day.day }} {{ day.month }}</h3>
        <div class="time-cont">
          <div v-for="t in day.times" :key="t.time" class="time">
            <h4>{{ t.time }}</h4>
            <span v-if="state.checkOut_t == 1" >{{ t.av.tavoli }} posti disponibili</span>
            <span v-if="state.checkOut_t == 2 || state.checkOut_t == 3" >{{ t.av.cucina_1 }} pezzi al taglio disponibili, 
              {{ t.av.cucina_2 }} pizze al piatto disponibili
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.container{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
section{
  h3{
    font-size: $fs_md;
    text-align: center;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: $c5;
  width: 100%;
  max-width: 900px;
  .card{
    display: flex;
    background-color: $c4;
    padding: 1rem;
    border-radius: 15px;
  }
  .choice{
    justify-content: space-between;
    gap: 5px;
    span{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $fs_xsm;
      flex-grow: .4;
      padding: 10px ;
      border-radius: 10px;
    }
    .active{
      flex-grow: 1;
      font-size: $fs_md;
      background-color: $c3;
      padding: 15px ;
      background-color: $c3;
    }
  }
  .calendar{
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    .months{
      width: 70%;
      display: flex;
      justify-content: space-around;
      font-size: $fs_sm;
      text-transform: capitalize;
      padding: 1rem;
      h4{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: .4;
        text-align: center;
      }
      .active{
        flex-grow: 1;
        font-size: $fs_lg;
      }
    }
    .days, .day_week{
      width: 80%;
      text-align: center;
      display: grid;
      justify-content: center;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      gap: 6px;
      row-gap: 6px;
      column-gap: 6px;
      align-content: center;
      
    }
    .day{
      display: flex;
      justify-content: center;
      align-content: center;
      border-radius: 6px;
      background-color: $c6;
      width: 100%;
      aspect-ratio: 1;
      flex-wrap: wrap;
      span{
        height: auto;
      }

    }
    .next, .previus{
      position: absolute;
      top: 50%;
      height: 30px;
      width: 30px;
      background-color: $c6;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $fs_sm;
      border-radius: 6px;
    }
    .next{
      transform: translate(-50%,-50%);
      right: 10px;
    }
    .previus{
      transform: translate(50%,-50%);
      left: 10px;
    }

    
  }
  
}


</style>
