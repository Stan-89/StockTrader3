<template>
    <div class="col-md-6 zeroLeftPadding">
      <div class="panel panel-success">
        <div class="panel-heading"><span class="stockHeading">{{ props.theStock.theName }}</span><span class="stockPrice">(Price: {{ props.theStock.thePrice }})</span></div>
        <div class="panel-body row">
            <div class="col-xs-7">
              <input type="text" class="form-control" placeholder="Quantity"
              onkeypress="return event.charCode >= 48 && event.charCode <= 57"
              v-model="enteredQuantity">
            </div>
            <div class="col-xs-3 col-xs-offset-2 col-xs-offset-2 col-md-2 col-md-offset-3">
              <button type="button" class="btn btn-success" :class="{'disabled': buttonDisabling}" @click='buyingStock'>Buy</button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  //Composition API start here
  import { ref, computed } from 'vue';
  import { stockStore } from '@/store'

  //Data
  const enteredQuantity = ref('');

  //Props
  const props = defineProps({
    theStock: {
        type: Object,
        required: true
      },
      availableFunds:
        {
          type: Number,
          required:true
        }
    });

    //Computed
    const buttonDisabling = computed(()=>{
      if(enteredQuantity.value == "" || enteredQuantity.value == 0 || (enteredQuantity.value*props.theStock.thePrice > props.availableFunds) ||
          (props.theStock.thePrice > props.availableFunds)){
          return true;
        }
        else{
          return false;
        }
    });

  //Functions (methods)
  const store = stockStore();

  function buyingStock(){
    if(!buttonDisabling.value){
      store.buyStock({theID: props.theStock.theID,  theQuantity: enteredQuantity.value, thePrice: props.theStock.thePrice, theName: props.theStock.theName});
          enteredQuantity.value = "";
        }
  }




  </script>
  