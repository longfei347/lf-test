// vue3 自动路由,依赖webpack的require
import { createRouter, createWebHashHistory } from 'vue-router';

// 自动注入路由
const modules = require.context('../views', true, /.vue/);
const autoRoutes = modules.keys().map((item) => {
  const viewName = item.slice(2);
  const path = item.slice(1).replace('.vue', '').replace('index', '');
  const viewModule = () => import(`../views/${viewName}`);
  return {
    path,
    component: viewModule,
  };
});
const routes = autoRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
