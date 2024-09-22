import { theRoutes } from './routes.js';
import { createMemoryHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: theRoutes,
})

