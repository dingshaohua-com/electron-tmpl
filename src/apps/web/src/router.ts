import Layout from "@/components/layout/index.vue";
import { createWebHashHistory, createRouter } from "vue-router";
// import PageView from "@/components/page-view.vue";

const routes = [
  {
    path: "/", // 使用动态导入来实现懒加载
    component: Layout,
    redirect: { path: "/welcome" },
    children: [
      {
        path: "/welcome",
        component: () => import("@/pages/welcom.vue"),
      },
      // {
      //   path: "/about",
      //   component: PageView,
      //   children: [
      //     {
      //       path: "/about/index",
      //       component: () => import("@/pages/about.vue"),
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   path: '/login',
  //   component: () => import('@/pages/login.vue'),
  // },
];
export default createRouter({
  history: createWebHashHistory(), // 如果与electron集成，用history会白屏
  routes,
});
