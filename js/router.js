// 1. vue3 自动路由,依赖webpack的require
import { createRouter, createWebHashHistory } from 'vue-router';

// 自动注入路由
const modules = require.context('../views', true, /.vue/);
const autoRoutes = modules.keys().map(item => {
  const viewName = item.slice(2);
  const path = item.slice(1).replace('.vue', '').replace('index', '');
  const viewModule = () => import(`../views/${viewName}`);
  return {
    path,
    component: viewModule
  };
});
const routes = autoRoutes;

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

// 2. 引入 router
import { createRouter, createWebHashHistory } from 'vue-router';
// 引入路由各页面配置
let routeArr = [];
const modules = import.meta.glob('../page/**/*.vue');
console.log('object', modules);
// 循环进入路由
for (let i in modules) {
  let item = modules[i];
  let path = item.name.slice(7, -4);
  let name = path.substring(path.lastIndexOf('/') + 1);
  // const routePath = item.name.replace(/(.*\/)*([^.]+).*/gi, '$2')
  routeArr.push({
    path: '/' + name,
    name,
    title: name,
    component: modules[i] //() => import(item.name), //.vue不能省略
  });
}
// console.log('arr:', routeArr)
export const routes = routeArr;
// 配置router对象
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeArr
});

// 3. 引入 router
import { createRouter, createWebHashHistory } from 'vue-router';
// 引入路由各页面配置
let routeArr = [];
const modules = import.meta.globEager('../page/**/*.vue');
// console.log('object', modules)
// 循环进入路由
Object.keys(modules).forEach(i => {
  let path = i.slice(7, -4);
  let name = path.substring(path.lastIndexOf('/') + 1);
  routeArr.push({
    path: '/' + name,
    name,
    title: name,
    component: modules[i].default //() => import(item.name), //.vue不能省略
  });
});
export const routes = routeArr;
// 配置router对象
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routeArr
});
