<template>
    <div class="container zeroLeftPadding">
      <div class="row">
      <template v-for="(aStock, theIndex) in store.availableStocks">
          <theBuyingStock :theStock='aStock' :availableFunds='store.availableFunds'></theBuyingStock>
      </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import theBuyingStock from './BuyingStock.vue';
  import { stockStore } from '@/store'

  //Functions (methods)
  const store = stockStore();
  </script>
  