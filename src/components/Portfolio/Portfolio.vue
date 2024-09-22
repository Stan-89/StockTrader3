<template>
    <div class="container zeroLeftPadding">
      <div class="row">
      <template v-for="aStock in store.getOwnerStocksInfo">
          <theSellingStock :theStock='aStock'></theSellingStock>
      </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import { stockStore } from '@/store'
  import theSellingStock from './SellingStock.vue';
  
  const store = stockStore();
  </script>
  