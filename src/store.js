import { defineStore } from "pinia";
import { ref, computed } from 'vue';

//The pinia version
export const stockStore = defineStore('stocks', ()=>{
  //state
  const availableFunds = ref(10000);
  const ownerStocks = ref([]);
  const availableStocks = ref([]);

  //Getters as computed
  const getAvailableFundsFormatted = computed(() => '$' + availableFunds.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
  const getOwnerStocksInfo = computed(() => {
    let theOwnerArray = [];

    //For each owner stock, get the price + quantity
    for(let i=0; i<ownerStocks.value.length; i++){
      let theIndex =  availableStocks.value.findIndex(val => val.theID == ownerStocks.value[i].theID);
      theOwnerArray.push({
        theID: availableStocks.value[theIndex].theID,
        thePrice: availableStocks.value[theIndex].thePrice,
        theName: availableStocks.value[theIndex].theName,
        theQuantity: ownerStocks.value[i].theQuantity,
      });
    }
    console.log('owner stocks?');
    return theOwnerArray;
  });

  //Actions
  function loadSavedData(payload)
  {
    ownerStocks.value = payload.ownerStocks;
    availableFunds.value = payload.availableFunds;
    availableStocks.value = payload.availableStocks;
  };

  function initializeStocks(payload)
  {
    availableStocks.value = payload;
  };

  function changeStockPrice(payload)
  {
    let theIndex = availableStocks.value.findIndex(val => val.theID == payload.theID);
    availableStocks.value[theIndex].thePrice = payload.thePrice;
  };

  function buyStock(payload)
  {
    let theIndex = ownerStocks.value.findIndex(val => val.theID == payload.theID);
    //Found it, so add to existing
    if(theIndex > -1)
    {
      ownerStocks.value[theIndex].theQuantity += parseInt(theQuantity);
    }
    //Not found, so insert it
    else
    {
      ownerStocks.value.push({theID: payload.theID, theQuantity: parseInt(payload.theQuantity)});
    }

    //Now subtract the money
    let amount = payload.theQuantity*availableStocks.value[availableStocks.value.findIndex(val => val.theID == payload.theID)].thePrice;
    availableFunds.value -= amount;
  };

  function sellStock(payload)
  {
    let theIndex = ownerStocks.value.findIndex(val => val.theID == payload.theID);

    ownerStocks.value[theIndex].theQuantity -= parseInt(payload.theQuantity);
    //If quantity is now 0, remove it altogether.
    if(ownerStocks.value[theIndex].theQuantity == 0)
    {
      ownerStocks.value.splice(theIndex,1);
    }

    let amount = payload.theQuantity*availableStocks.value[availableStocks.value.findIndex(val => val.theID == payload.theID)].thePrice;
    availableFunds.value += amount;
  };

  return {
            availableFunds, getAvailableFundsFormatted, ownerStocks, getOwnerStocksInfo, availableStocks,
            buyStock, sellStock, initializeStocks, changeStockPrice, loadSavedData
          };
});
