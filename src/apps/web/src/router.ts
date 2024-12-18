import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("./pages/home.vue")},
  // { path: "/page-one", component: () => import("./pages/page-one.vue") },
  // { path: "/page-two", component: () => import("./pages/page-two.vue") },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
