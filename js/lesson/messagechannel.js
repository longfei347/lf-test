// quicklink 使用 requestIdleCallback 在空闲时间查询页面 a 标签并挂载观察者
// prefetch 预加载
function prefetchJs(url) {
  const link = document.createElement('link');
  (link.relList || {}).supports && link.relList.supports('prefetch');
  link.rel = `prefetch`;
  link.href = url;
  document.head.appendChild(link);
}
// IntersectionObserver 会创建一个观察者，专门用来观察与通知元素进出视口的情况
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // console.log(entry)
    if (entry.isIntersecting) {
      const link = entry.target;
      // 预加载链接
    }
  });
});

// 对所有 a 标签添加观察者
Array.from(document.querySelectorAll('a'), link => {
  observer.observe(link);
});
/*Array.from(document.querySelectorAll('a')).forEach(link => {
  observer.observe(link);
});*/
// 当不支持prefetch可使用ajax预加载
function xhrPrefetchStrategy(url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(`GET`, url, req.withCredentials=true);
    req.onload = () => {
      (req.status === 200) ? resolve() : reject();
    };

    req.send();
  });
}

/*var channel = new MessageChannel();
var port1 = channel.port1;
var port2 = channel.port2;
port1.onmessage = function(event) {
  console.log("port1收到来自port2的数据：" + event.data);
}
port2.onmessage = function(event) {
  console.log("port2收到来自port1的数据：" + event.data);
}

port1.postMessage("发送给port2");
port2.postMessage("发送给port1");*/
/*
MessageChannel还可以用于深拷贝，我们都知道深拷贝一般用JSON.parse(JSON.stringify(object))就可以解决了，
也知道这种方法的局限性：
会忽略 undefined
不能序列化函数
不能解决循环引用的对象
undefined和函数会被忽略，而尝试拷贝循环引用的对象则会报错：
 */
// // 有undefined + 循环引用
/*let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  f: undefined
}
obj.c = obj.b;
obj.e = obj.a
obj.b.c = obj.c
obj.b.d = obj.b
obj.b.e = obj.b.c

function deepCopy(obj) {
  return new Promise((resolve) => {
    const {
      port1,
      port2
    } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = ev => resolve(ev.data);
  });
}

deepCopy(obj).then((copy) => { // 请记住`MessageChannel`是异步的这个前提！
  let copyObj = copy;
  console.log(copyObj, obj)
  console.log(copyObj == obj)
});
*/
/*var worker1 = new Worker("worker1.js");
var worker2 = new Worker("worker2.js");
var channel = new MessageChannel();
w1.postMessage("port1", [ch.port1]);
w2.postMessage("port2", [ch.port2]);
worker2.onmessage = function(event) {
  console.log(event.data);
}
// worker1.js
onmessage = function(e) {
  const port = e.ports[0];
  port.postMessage("this is from worker1")
}
// worker2.js
onmessage = function(e) {
  const port = e.ports[0];
  port.onmessage = function(e) {
    postMessage(e.data)
  }
}
*/
