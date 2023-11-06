import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import MainLayout from '../views/MainLayout.vue'
import ReportListView from '../views/ReportListView.vue'
import ReportDetailView from '../views/ReportDetailView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
 
// 路由类型:RouteRecordRaw
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        component: ReportListView,
      },
      {
        path: "/users",
        component: UserView,
      },
      {
        path: "/chart-show/:id",
        component: ReportDetailView,
      },
    ]
  },
  {
    path: "/login",
    component: LoginView,
  },
];
 
const router = createRouter({
  // 路由模式
  history: createWebHistory(),
  routes,
});
 
export default router;