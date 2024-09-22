<template>
    <!-- Static navbar -->
    <nav class="navbar navbar-default row">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" :to="{name: 'theIndex'}" tag="a">Stock trader</router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><router-link :to="{name: 'thePortfolio'}" active-class="active">Portfolio</router-link></li>
            <li><router-link :to="{name: 'theStocks'}" active-class="active">Stocks</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#" @click="endDay">End day</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Save & Load<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#" @click="saveStatus">Save Data</a></li>
                <li><a href="#" @click="loadStatus">Load Data</a></li>
              </ul>
            </li>
            <li id="fundsSpot"><a href="#">Funds: <b>{{ store.getAvailableFundsFormatted }}</b></a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div><!--/.container-fluid -->
    </nav>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref,onMounted } from 'vue';
  //We need to get the funds
  import { stockStore } from '@/store'

  const store = stockStore();
  const theToken = ref("");


  //Functions
  function saveStatus()
  {
        axios.post('https://new-project-3daa6.firebaseio.com/data.json',
        {availableFunds: store.availableFunds, ownerStocks: store.ownerStocks, availableStocks: store.availableStocks})
        .then(
          response =>
          {
            theToken.value = response.body.name;
          },
          error =>
          {
            console.log(error);
            alert("Firebase is disabled right now.");
          }
        );
  };

  function loadStatus()
  {
        if(theToken.value != ""){
          let theURL = 'https://new-project-3daa6.firebaseio.com/data/'+theToken.value+'.json';
          this.$http.get(theURL)
          .then(
            response =>
            {
              return response.json();
            },
            error =>
            {
              console.log(error);
              alert("Firebase is disabled right now");
            }
          ).then(
            response =>
            {
              store.loadSavedData(response);
            }
          );
        }
        else{
          alert("You have no saved data!");
        }
  };

      //End the day: 1. Regenerate prices; 2. Send to index
  function endDay()
  {
    //Give them all current value + [-10, 10]
    for(let i=0; i < store.availableStocks.length; i++){
        store.changeStockPrice({theID: store.availableStocks[i].theID, thePrice: generateRandomPrice(store.availableStocks[i].thePrice)})
    }
  
  };

  //Will generate a random number [-10,10] and add it to the arg
  function generateRandomPrice(givenNumber)
  {
    let theTotal = givenNumber + Math.floor(Math.random()*(21)-10);

    if(theTotal <= 0){
      theTotal = 1;
    }

    return theTotal;
  };


  onMounted(()=>
  {
    store.initializeStocks([
      {
        theID: 1,
        theName: "BMW",
        thePrice:75
      },
      {
        theID: 2,
        theName: "Lada",
        thePrice:65
      },
      {
        theID: 3,
        theName: "Renault",
        thePrice:115
      },
      {
        theID: 4,
        theName: "Chevrolet",
        thePrice:500
      },
      {
        theID: 5,
        theName: "Polaris",
        thePrice:40
      },
      {
        theID: 6,
        theName: "Arctic Cat",
        thePrice:65
      },
    ]);
  });


  </script>
  
  <style>
  li#fundsSpot
  {
    min-width:150px;
  }
  </style>
  