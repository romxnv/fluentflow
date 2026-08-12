import { AnalyticPage } from "@/pages/analytic";
import ArticlePage from "@/pages/article/ui/article-page.vue";
import HomePage from "@/pages/home/ui/home-page.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/articles/:id",
    name: "article",
    component: ArticlePage,
    props: true,
  },
  {
    path: "/analytic",
    name: "analytic",
    component: AnalyticPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
