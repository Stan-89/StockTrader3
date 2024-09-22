  //Import the components
  import theMainComponent from './../components/Main.vue';
  import buyingStocks from './../components/Stocks/Stocks.vue';
  import portfolio from './../components/Portfolio/Portfolio.vue';

  //Create the routes
  export const theRoutes = [
  {
    path: '/Home',
    component: theMainComponent,
    name: 'theIndex'
  },
  {
    path: '/stocks',
    component: buyingStocks,
    name: 'theStocks'
  },
  {
    path: '/portfolio',
    component: portfolio,
    name: 'thePortfolio'
  },
  //Redirect all others to main (so no 404)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/Home'
  }
]
