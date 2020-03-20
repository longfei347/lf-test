import axios from 'axios'
import VueAxios from 'vue-axios'
// 在vue中使用axios和vue-axios
// vue异步组件, 为何require的第一个参数是数组? 这是webpack里的方法还是nodejs里的?
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  // () => import('./my-async-component')
})

// 在main.js中引入fastClick和初始化
import FastClick from 'fastclick'; // 引入插件
FastClick.attach(document.body); // 使用 fastclick

Vue.use(VueAxios,axios);
// 配置axios基础地址
axios.defaults.baseURL = '地址'
// 配置axios基础请求头
axios.defaults.headers.post['Content-Type'] = Content-Type: 'application/json; charset=UTF-8'
// 在进行请求的时候直接使用即可
this.axios.post("请求地址", {para: "参数"}, {}).then(res => {
    // res即为请求结果
})
// 请求响应拦截
// 请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // 在发起请求前，给所有请求的头部添加token
    config.headers.common['token'] = JSON.parse(token).token;
  }
  return config;
}, error => {
  // 对请求失败做处理
  return Promise.reject(error);
})
// 响应拦截
axios.interceptors.response.use(res => {
  // 对响应数据做处理
  // console.log("对响应数据做处理")
  const code = res.data.code;
  if (code === 401) {
    // 判断res.data.res_code 是否是401 如果是则跳转到登录，如果不是则正常返回
    ElementUI.Message({
      message: '请登录',
      type: 'warning'
    });
    router.push('/login')
    // 删除token以及user
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    return false;
  } else if (code === -104) {
    ElementUI.Message({
      message: '系统异常',
      type: 'warning'
    });
    return false;
  }
  return res;
}, error => {
  // 对响应错误做处理
  return Promise.reject(error);
})
