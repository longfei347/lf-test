
前端other
http://tw93.github.io/2015-03-01/shen-ru-qian-chu-nodejs-reading-mind-map.html

大公司里怎样开发和部署前端代码？
http://www.zhihu.com/question/20790576

吉祥腾达科技有限公司 2011.04-2014.04
店连店科技股份有限公司 2014.04-2016.03
软通动力信息技术有限公司 2016.03-2017.05
马上消费金融有限公司 2017.05-2020.03
北京外企德科人力资源服务上海有限公司 2020.05-至今

个人特长：
 精通 WEB 前端开发各种技术,js 语法,原生接口方法,熟练运用 es6,html5,CSS3,vuejs,jQuery 等；
 熟练基于 nodejs 开发的,常用开发框架(vuejs,reactjs,anguluarjs,nuxt.js,express,koa),打包工具(webpack,gulp,grunt,parcel),UI 框架(mint-ui,element-ui,ionic,vuetify,anted),模板(ejs,jade,pug),js 库(vue,reactjs,angularjs,underscore,lodash,requirejs,seajs,zepto 等)；
 熟悉前端常见性能优化,安全问题,统一规范代码,编写可扩展,易维护,可移植通用组件；
 熟悉项目开发流程,能独力完成前端开发任务,包含技术选型,框架搭建,页面布局,网页设计,代码打包压缩,优化,上线部署,nginx 配置;；
 熟悉各浏览器间差异,解决常见兼容性问题,提升用户体验,各种开发工具(sublime,webstorm,vscode)与插件使用以及断点调试,问题追踪；
 熟悉前端各种设计模式,开发新技术 PWA,WebAssembly,预加载,异步请求等,关注常用技术博客,github 流行趋势,热门开源代码；
 熟悉 SQL,mySQL,mongoDB 等数据库操作,熟悉 PHP 环境搭建常用框架 thinkPHP, Yii, wordpress,ecshop,ecmall,discuz,shopnc 等；
 熟练其他编程语言 PHP,C,C++,java 等,深入理解面向对象编程思想。

devtool: 'cheap-module-eval-source-map', //开发环境
devtool: 'cheap-module-source-map', //生产环境

path.join([...paths])
path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
path.resolve([from....],to)
path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。

-/_node_modules/_
rd /s /q node_modules
rd /s /q style

\.hasOwnProperty\(('\w+')\)
[$1]

process.argv.splice(2) node aa.js a1 a2 a3 // ['a1','a2','a3']

vscode 跳转到匹配括号 ctrl+shift+
dir /b >1.txt 导出文件名到指定文件
dir \*.html /b >1.txt
chrome console 可通过过滤后,右键保存 log

乔布斯说,IE 必须死,页面错乱是你活该!

proxy:
'/api': {

- target : `<url string to be parsed with the url module>`
- forward: `<url string to be parsed with the url module>`
- agent : <object to be passed to http(s).request>
- ssl : <object to be passed to https.createServer()>
- ws : <true/false, if you want to proxy websockets>
- xfwd : <true/false, adds x-forward headers>
- secure : <true/false, verify SSL certificate>
- toProxy: <true/false, explicitly specify if we are proxying to another proxy>
- prependPath: <true/false, Default: true - specify whether you want to prepend the target's path to the proxy path>
- ignorePath: <true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request>
- localAddress : `<Local interface string to bind for outgoing connections>`
- changeOrigin: <true/false, Default: false - changes the origin of the host header to the target URL>
- preserveHeaderKeyCase: <true/false, Default: false - specify whether you want to keep letter case of response header key >
- auth : Basic authentication i.e. 'user:password' to compute an Authorization header.
- hostRewrite: rewrites the location hostname on (201/301/302/307/308) redirects, Default: null.
- autoRewrite: rewrites the location host/port on (201/301/302/307/308) redirects based on requested host/port. Default: false.
- protocolRewrite: rewrites the location protocol on (201/301/302/307/308) redirects to 'http' or 'https'. Default: null.
- }

tortoisegit git pull 勾选变基后命令
git fetch -v --progress origin
不勾选
git pull --progress -v --no-rebase origin

git remote add caijinyuan ssh://git@isource-dg.huawei.com:2222/cWX814577/NetCarePortalService.git
git fetch caijinyuan
git cherry-pick 8206a818

performance.getEntries() 返回一个 PerformanceEntry 列表，这些请求的时间统计信息

jquery get 是 application/x-www-form-urlencoded
HTTP 会将请求参数用 key1=val1&key2=val2 的方式进行组织，并放到请求实体里面，注意如果是中文或特殊字符如"/"、","、“:" 等会自动进行 URL 转码

application/json;charset=utf-8 axios 默认请求头 content-type
去掉空行, 用正则替换:
ctrl+h: \b\n\n ->\n

运算符优先级
var a = {n:1};
a.x = a = {n:2}
a 指向{n:2}返回{n:2} a.x 指向{n:2}

4 个 cdn
http://code.jquery.com/ 只有 jquery
https://unpkg.com/jquery
https://www.bootcdn.cn/
仓库安装 github,等

"vetur.format.defaultFormatterOptions": {
"js-beautify-html": {
"wrap_attributes": "force" // 可以换成上面任意一种 value
}
}
// Wrap attributes to new lines [auto|force|force-aligned|force-expand-multiline] ["auto"]

1.打印文件夹下文件名输出到 00.txt 中
dir _._ /b> 00.txt 2.文件夹下以及子孙文件夹下的文件名以树形式打印
tree /f > 00.txt

获取 dom 元素上绑定的事件:
getEventListeners($0).click[0].listerner

Sublime Text 查找时排除指定的文件夹或文件
Ctrl + Shift + F
这组快捷键可以调出 Sublime Text 的查找替换窗口，里边有一栏 Where，可以做一些高级设置：
d:\dir\ , -.css, -/debug/ , -.cache

git remote set-url origin `<new-forked-repo-addr>`
git remote set-url upstream `<new-centeral-repo-addr>`

git.exe fetch -v --progress "main" master
git pull -r，就会使用 rebase 的方式将远端修改拉到本地。

remote: HTTP Basic: Access denied
fatal: Authentication failed for 时:运行下面命令可重新输入密码
git config --system --unset credential.helper
或 git config --global --unset credential.helper

insertAdjacentHTML

<!-- beforebegin -->

<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->

target.removeEventListener(type, listener[, useCapture]);
获取绑定事件: getEventListeners
取消 el-table 绑定的 row-click: XXX.$off('row-click') 可取消绑定

npm init vite-app `<project-name>`
cd `<project-name>`
npm install
npm run dev
如果使用 yarn，则依次执行下面的命令：

yarn create vite-app `<project-name>`
cd `<project-name>`
yarn
yarn dev

Vue2 到 Vue3 生命周期映射直接来自 Vue3 Composition API 文档
beforeCreate -> use setup()
created -> use setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
在 window.onload 事件里执行 new Date() - performance.timing.navigationStart 即可获取首屏时间

前序(根左右),中序(左根右),后序(左右根)
usercenter,传参数数组在 invoke.js 中 new URLSearchParams(data).toString()会转成逗号分隔字符串

生成 ssh 秘钥，打开终端，执行 ssh-keygen -t rsa -C "你公司内部邮箱地址"，如果执行成功，切换到 ~/.ssh 目录下，此时目录应该如下所示。复制 id_rsa.pub 的内容, 放在 github 中 settings -> SSH and GPG keys ; 复制 id_rsa.pub 的内容，点击 add ssh key

WFM 即 WorkForce Management 排版管理

npm list --depth=2 查看版本信息

vscode:
文件目录范围: ./app/ies/application/NetCareCloud/src
alt+鼠标 //点选或拖动, 变行位置多列选择
alt+shift+鼠标 //拖动, 同行位置多列选择

excel 技巧: 数据->删除重复项 可快速去重
数据->筛选, 高级筛选, 选择方式 1,列表区域, 条件区域再将要筛选的数据包含表头加进去,可含多列

v-charts 是饿了么团队开源的一款基于 Vue 和 Echarts 的图表工具，在使用 echarts 生成图表时，经常需要做繁琐的数据类型转化、修改复杂的配置项，v-charts 的出现正是为了解决这个痛点。基于 Vue2.0 和 echarts 封装的 v-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表。

Prettier 的配置文件可以用 4 种文件格式编写
JavaScript .prettierrc.js 或 prettier.config.js
JSON .prettierrc.json
YAML .prettierrc.yaml 或.prettierrc.yml
TOML .prettierrc.toml

v-charts 的中文社区文档（https://v-charts.js.org/#/）
// 安装 axios 并将 axios 添加至 devDependencies
pnpm install axios -D
// 安装 axios 并将 axios 添加至 dependencies
pnpm install axios -S
Prettier 的配置文件可以用 4 种文件格式编写：

JavaScript .prettierrc.js 或 prettier.config.js
JSON .prettierrc.json
YAML .prettierrc.yaml 或.prettierrc.yml
TOML .prettierrc.toml

2.读取顺序
当同一个目录下有多个不同格式的配置文件时，Prettier 只会使用一个。Prettier 会按照以下优先级（从高到低）读取：

1.package.json
2..prettierrc YAML 或 JSON 格式
3..prettierrc.json
4..prettierrc.yaml
5..prettierrc.yml
6..prettierrc.js
7..prettier.config.js
8..prettierrc.toml

"prettier.singleQuote": true

vue 使用 jsx:
npm i @vitejs/plugin-vue-jsx

在 vite.config.js 加入 jsx 配置

// vite.config.js
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
plugins: [vue(), vueJsx()],
})

location.hash 当路径是 hash 路径#后面的参数也属于 hash
#/e?network_number=
location.search: '' 返回参数为空

https://login.huawei.com/login/?redirect=http://ilearning.huawei.com/edx/after_login?redirect_to=2f6564782f6e6578742f

https://login.huawei.com/login/?redirect=https%3A%2F%2Fnetcare.huawei.com%2Fp%2Fnetcare%2Findex.html

bugfree redmine jira dts MS SharePoint IBM RTC Trello CQ QC

node .\build\script\getLintErrorXlsx.js "npm run lint-fe-e"
[].forEach.call($$("_"),function(a){a.style.outline="1px solid #"+(~~(Math.random()_(1<<24))).toString(16)})

自评
http://w3.huawei.com/lsms/#!lsms/caAccept/evaluate/editEvaluateSelf.html?applyType=EvaluateTask&id=66463

长安奔奔 eStar，5 万元以下没有能打的，305 公里的续航里程绝对是第一

可以通过 nbtstat -a X.X.X.X 来查找用户

/_ 基于 UI width=750px DPR=2 的页面 _/
html {
font-size: calc(100vw / 7.5);
}

阅读源码 vue.config.js-->webpack-->webpack-dev-server-->http-proxy-middleware-->http-proxy 发现 vue 配置 proxy 代理最后实现是采用的 http-proxy 来实现代理转发

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security
--user-data-dir=C:\MyChromeDevUserData --profile-directory="Profile 1"

// 查看全局安装路径
npm root -g
// 查看 npm 的基础设置
npm config ls
// 查看安装目录路径
npm config get prefix

$ npm init ssr-app my-ssr-project
$ cd my-ssr-project
$ npm install # 可以使用 yarn 不要使用 cnpm
$ npm start
$ open http://localhost:3000 # 访问应用
$ npm run build # 资源构建，等价于 npx ssr build
$ npm run start:vite # 以 vite 模式启动，等价于 npx ssr start --vite
$ npm run start:vite # 以 vite 模式启动，等价于 npx ssr start --vite

# .yarnrc 文件

# 使用 CBU 维护的黄绿区通用源

registry "http://npm.inhuawei.com/"

# 禁用更新检测（若不禁用，安装后会一直报无法联网的问题）

disable-self-update-check true

# 设置 @cloud 的源

npm config set @cloud:registry http://npm.inhuawei.com/
安装：

npm install --save-dev eslint babel-eslint @cloud/eslint-config-cbc #相关依赖参考
如果 eslint 运行有问题，建议使用如下依赖：

- eslint 7.16.0
- babel-eslint 10.1.0
- eslint-plugin-react 7.21.5
- vue-eslint-parser 7.3.0
- eslint-plugin-vue 7.3.0
- @typescript-eslint/parser 4.11.0
- @typescript-eslint/eslint-plugin 4.11.0
- eslint-plugin-rxjs 3.3.5

npm i typescript eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

npm i eslint-config-standard eslint-plugin-import eslint-plugin-promise eslint-plugin-node eslint -D

[] == ![] // -> true ，下面是这个表达式为何为 true 的步骤
// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true

node --inspect-brk app.js

npm install electron@17.0.0

实现瀑布流
.masonry {
display: grid; gap: 20px;
grid: masonry / repeat(auto-fill, minmax(250px, 1fr));
}

Roboto 只显示英文, 无需安装

svelte 模板: https://github.com/sveltejs/template
svelte-navigator:Svelte 的简单易用路由
svelte-store-router：Svelte 的基于商店的路由器
svelte-routing:精巧的路由
svelte-router:易于使用的 Svelte SPA 路由器
svelte-spa-router:使用 Svelte 3 的 SPA 路由器

corepack 包管理工具: (npm, yarn, pnpm, cnpm)

undici4, got, r2 替代 request
其他: node-fetch, ky, superagent, axios

01、BootstrapVue
地址：https://bootstrap-vue.org/
一个用于 Vue.js 构建引导接口的开源库。

02、Vuex
地址：https://vuex.vuejs.org/
Vue.js 应用程序的状态管理库。

03、Vue Devtools
地址：https://devtools.vuejs.org/
一个调试 Vue.js 项目的简单工具。

04、Vue CLI
地址：https://cli.vuejs.org/
Vue.js 开发人员更简单的标准工具。

05、Vue Router
地址：https://router.vuejs.org/
直观而强大的语法定义静态和动态路由。

06、Vuetifyjs
地址：https://vuetifyjs.com/en/
帮助构建 Vue.js 的 Material Design 接口的开源库。

07、Nuxt
地址：https://nuxtjs.org/
一个开源框架，使 Web 开发变得简单而强大。

08、Vue Element Admin
地址：https://github.com/PanJiaChen/vue-element-admin
帮助构建具有管理网站所需的许多功能的简单管理界面。

09、Vue Apollo
地址：https://vue-apollo.netlify.app/
它可以帮助我们的 Vue.js 项目设置 GraphQL 变得更容易。

10、Element UI
地址：https://element.eleme.io/#/en-US
用于 Vue 项目界面开发的 UI 库。

11、Quasar
地址：https://quasar.dev/
Quasar 是一个开源的 Vue.js 框架，可帮助构建 SPA（单页应用）、SSR（服务器端渲染应用）、PWA（渐进式 Web 应用）。

12、Language Vue
地址：https://atom.io/packages/language-vue
支持 Atom 的 Vue.js 开发的实用程序。

13、VuePress
地址：https://v2.vuepress.vuejs.org/
VuePress 是一个以降价为中心的静态站点生成器。

14、Vue.js Guide
地址：https://vuejs.org/guide/introduction.html
Vue.js 开发人员最完整、最详细的指南。

15、Vue Select
地址：https://vue-select.org/
帮助我们构建具有对 Vue.js 开发人员有用的功能的组件。

16、Vueuse
地址：https://vueuse.org/
Vue 2 和 Vue 3 组件的必要实用程序集合。

17、VeeValidate
地址：https://vee-validate.logaretm.com/v4/
Vue.js 中的表单验证工具。

18、Vant
地址：https://vant-contrib.gitee.io/vant/#/en-US
移动 UI 的界面构建器库。

19、Vue Native
地址：https://vue-native.io/
帮助构建跨平台原生移动应用的 JavaScript 框架。

20、Vue-meta
地址：https://vue-meta.nuxtjs.org/
Vue.js 项目的 Cmeta 标签管理器。

21、Vue I18n
地址：https://kazupon.github.io/vue-i18n/
插件有助于为项目添加国际功能。

22、Vue Infinite Loading
地址：https://peachscript.github.io/vue-infinite-loading/
为网站创建无限滚动功能。

23、Gridsome
地址：https://gridsome.org/
该工具可以快速轻松地构建静态网站和应用程序。

24、Vite
地址：https://vitejs.dev/
Vite 是一个构建工具，旨在为现代 Web 项目提供更快、更精简的开发体验。

25、Vue-multiselect
地址：https://vue-multiselect.js.org/
帮助为网站构建多选功能的开源库。

26、Vetur
地址：https://marketplace.visualstudio.com/items?itemName=octref.vetur
用于在 VSCode 中更好地进行 Vue.js 开发和调试的扩展。

27、Vue.js Examples
地址：https://vuejsexamples.com/
Vue.js 接口开发中的示例集合。

npm install vue@next //最新版 vue v3.x
npm install vue-router@4 //最新版 vue-router v4.x
npm install vuex@next --save //最新版 vuex v4.x
npm install axios //基于 promise 的 HTTP 库
npm install element-plus //基于最新版 Vue 3.x 的 PC 端 UI 框架
npm install ant-design-vue@next //基于最新版 Vue 3.x 的 PC 端 UI 框架
npm install vant@3 //基于最新版 Vue 3.x 的移动端 UI 框架
npm install loadsh //JavaScript 的实用工具库
npm install immutable //数据处理工具
npm install dayjs //时间日期库
npm install qrcode //二维码生成器
npm install echarts //可视化图表库
npm install gsap //动画库
npm install xlsx file-saver //导出表格
npm install mockjs //生成随机数据，拦截 Ajax 请求
npm install eslint --save-dev //可组装的 JavaScript 和 JSX 检查工具
npm install sass sass-loader //CSS 扩展语言
npm install vuedraggable //基于 Sortable.js 实现的 vue 拖拽插件
npm install sortablejs //拖拽库
npm install screenfull //实现全屏功能
npm install nprogress //加载进度条
npm install jszip //创建、读取和编辑 .zip 文件
npm install js-cookie //cookie 存取
npm install fuse.js //模糊搜索
npm install dropzone //提供文件拖拽上传并且提供图片预览的开源类库
npm install driver.js //页面分步引导
npm install core-js //JavaScript 标准库的 polyfill（垫片/补丁）
npm install codemirror //浏览器实现的多功能文本编辑器
npm install clipboard //文本复制到剪贴板

// Component 组件的创建
// 注意 template 中的容器 只能有一个父元素，不能包含两个 你可以用一个 div 包裹
// 第一种创建全局组件
// extend 是注册组件函数，他返回一个对象
var comobj= Vue.extend({
template:"`<h1>`我是全局组件 `</h1>`"
})
// component 函数提交组件，第一个参数为组件的名称，第二个参数是一个注册组件的对象
Vue.component("login",comobj)

// 第二种创建方式
// component 中直接写上一个模板对象
Vue.component('login2',{template:'`<h1>`我是第二种 v 创建出来的组件 `</h1>`'});

// 第三种创建的方式 首先在元素中创建一个 template 模板
Vue.component('login3',{template:'#login3'})

var vm=new Vue({
el:'.app',
data:{},
// 定义私有组件 和全局差不多 组件名称和对象，也可以使用 template 模板来创建
components:{
login6:{template:'#login3'}
}
})
axios 实例方法:
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])

el-row :gutter="20" 间距 20px
:span="4" 占 4/24

点锁定 状态变 评审中 加一个 补丁评审
点解锁 变 登记中

评审中 汇总 解锁 编辑 补丁评审
登记中 汇总 锁定 编辑 新增登记

document.cookie='name=val' 设置的 cookie 生命周期跟 sessionStorage 一样,仅在会话期间

Python 的测试框架。
1）Robot Framework，主要用于测试驱动类型的开发与验收中。
2）Pytest，特点是开源、易学。
3）PyUnit，针对单元测试的 Python 类自动化测试框架，收到 Junit 的启发。
4）Behave，允许团队执行 BDD（行为驱动开发，behavior-driven development） 测试。
5）Lettuce，专注于具有行为驱动开发特征的普通任务。

开发域怎么查模型的真实表名:
// SELECT TABLE_NAME FROM t_bm_model WHERE MODEL_NAME = 'qualification_check_item_v2' LIMIT 1
select table_name,model_name from sys_basemodel where model_name='ncuc_nc_wx_uniportal_qualification_relation'

阻止默认事件;
e.preventDefault();或 return false;

网页一键置灰:html{filter: grayscale(1);}

npm i electron vite-plugin-electron -D
tsc --init // 创建 tsconfig.json
npm init -y
pnpm add webpack webpack-dev-server html-webpack-plugin
webpack 3 以上需安装 webpack-cli

rollup-plugin-visualizer 查看打包体积

npm init vue@latest 较全的选择项

chrome element 控制台,可以右键, 复制->复制样式, 再进行粘贴

可以使用 npm create vite-pretty-lint 一键生成 (貌似添加的东西有点多,建议可根据自己需要手动添加)
会添加,.eslintignore, .eslintrc.json, .prettierrc.json 三个文件, 会安装 84 个包, 原有 180 多个
还要安装扩展的包, eslint-config-standard
package.json 添加
// eslint 相关的包
"eslint": "^8.17.0",
"eslint-plugin-vue": "^9.1.0",
"vue-eslint-parser": "^9.0.2",
"vite-plugin-eslint": "^1.6.1",

// prettier 相关的包
"prettier": "^2.6.2",
"eslint-config-prettier": "^8.5.0",
"eslint-plugin-prettier": "^4.0.0",

css 优化渲染
content-visibility, contain-intrinsic-size
hidden: 与 display: none 类似
visible：默认值
auto：该元素打开布局包含、样式包含和绘制包含
/_ Keyword values _/
contain-intrinsic-width: none;

/_ `<length>` values _/
contain-intrinsic-size: 1000px;
contain-intrinsic-size: 10rem;

/_ width | height _/
contain-intrinsic-size: 1000px 1.5em;

/_ auto `<length>` _/
contain-intrinsic-size: auto 300px;

/_ auto width | auto height _/
contain-intrinsic-size: auto 300px auto 4rem;

npm i -g @nestjs/cli
nest new demo

npm i ts-node -g
npm init -y
npm i @types/node @types/express -D
npm i express axios -S

location / {
root html;
index index.html index.htm;
try_files $uri $uri/ /index.html
}

1.Jeecg-boot
2.renren-fast
3.vue-manager-system
// 安装 mysql
docker run -e MYSQL_ROOT_PASSWORD= -p 3306:3306 -dmysql:8

全局注册
Vue.component('my-component-name', {/_..._/})
1,方式 1
const childComponent = Vue.extend({
data: {},
created() {},
methods: {},
})
Vue.component('child', childComponent)
2, 方式 2
Vue.component('child', {
name: 'child-component',
data: {},
created() {},
methods: {},
})

局部注册
var ComponentA = { /_...._/ }
new Vue({
el: '#app',
components: {
'component-a': ComponentA
}
})
accept 类型:
`<input type="file" id="docpicker" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />`

`<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">`

let hd='houdunren2010.不断加油，进步'
hd.match(/\p{L}/gu) // 匹配字母
hd.match(/\p{P}/gu) // 匹配标点
hd.match(/\p{sc=Han}/gu) // 匹配中文

clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: ellipse(50px 60px at 0 10% 20%);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');

mysql 学习

select date_sub(now(), interval dayofmonth(now())-1 day);
-- select date_sub(now(), interval dayofmonth(now())-1 day);
-- select DATE_FORMAT(date_sub(now(),INTERVAL 3 month), "%Y-%m-01");
-- select LAST_DAY(DATE_SUB(now(),INTERVAL 1 month))
-- select LAST_DAY(now())
-- SELECT DATE_ADD(LAST_DAY(now()),INTERVAL 1 day)
-- 小于20岁
-- select * from stu where birthday <= DATE_SUB(now(),INTERVAL 20 year)

-- select date_add(now(), interval 1-dayofweek(now()) day);
-- set @week =date_sub(now(), interval 1 week);
-- -- select @week;
-- select date_add(@week,interval 0-weekday(@week) day)
-- select time(now()), now(), dayofmonth(now())-1, date_sub(now(), interval dayofmonth(now())-1 day)
-- select weekday(now()), dayofweek(date_sub(now(), interval 13 day)), date(date_add(now(), interval 6-weekday(now()) day))
-- select MID('longfei', 3,2), LEFT('hello',2)
-- set sql_mode=(select replace(@@sql_mode,'ONLY_FULL_GROUP_BY', ''));
-- select min(click), id from article
--truncate tab

create table t(
[constraint] [外键名] foreign key (外键字段名) references 主表(主表列名)
)
alter table 表名 add constraint 外键名 foreign key (外键字段名) references 主表(主表列名)
alter table 表名 drop foreign key 外键名;
// 命令行使用命令查看表结构
ibd2sdi tablename.idb
innoDB存储结构
tableSpece表空间->segment段->extent区1M(64page)->page页16K->row行

ASC (ascend) 表示升序排列 (从小到大) ，DESC (descend) 表示降序

前端other
深入浅出 Nodejs 读书笔记
http://tw93.github.io/2015-03-01/shen-ru-qian-chu-nodejs-reading-mind-map.html

大公司里怎样开发和部署前端代码？
http://www.zhihu.com/question/20790576

吉祥腾达科技有限公司 2011.04-2014.04
店连店科技股份有限公司 2014.04-2016.03
软通动力信息技术有限公司 2016.03-2017.05
马上消费金融有限公司 2017.05-2020.03
北京外企德科人力资源服务上海有限公司 2020.05-至今

个人特长：
 精通 WEB 前端开发各种技术,js 语法,原生接口方法,熟练运用 es6,html5,CSS3,vuejs,jQuery 等；
 熟练基于 nodejs 开发的,常用开发框架(vuejs,reactjs,anguluarjs,nuxt.js,express,koa),打包工具(webpack,gulp,grunt,parcel),UI 框架(mint-ui,element-ui,ionic,vuetify,anted),模板(ejs,jade,pug),js 库(vue,reactjs,angularjs,underscore,lodash,requirejs,seajs,zepto 等)；
 熟悉前端常见性能优化,安全问题,统一规范代码,编写可扩展,易维护,可移植通用组件；
 熟悉项目开发流程,能独力完成前端开发任务,包含技术选型,框架搭建,页面布局,网页设计,代码打包压缩,优化,上线部署,nginx 配置;；
 熟悉各浏览器间差异,解决常见兼容性问题,提升用户体验,各种开发工具(sublime,webstorm,vscode)与插件使用以及断点调试,问题追踪；
 熟悉前端各种设计模式,开发新技术 PWA,WebAssembly,预加载,异步请求等,关注常用技术博客,github 流行趋势,热门开源代码；
 熟悉 SQL,mySQL,mongoDB 等数据库操作,熟悉 PHP 环境搭建常用框架 thinkPHP, Yii, wordpress,ecshop,ecmall,discuz,shopnc 等；
 熟练其他编程语言 PHP,C,C++,java 等,深入理解面向对象编程思想。

devtool: 'cheap-module-eval-source-map', //开发环境
devtool: 'cheap-module-source-map', //生产环境

path.join([...paths])
path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
path.resolve([from....],to)
path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。

-/_node_modules/_
rd /s /q node_modules
rd /s /q style

\.hasOwnProperty\(('\w+')\)
[$1]

process.argv.splice(2) node aa.js a1 a2 a3 // ['a1','a2','a3']

vscode 跳转到匹配括号 ctrl+shift+
dir /b >1.txt 导出文件名到指定文件
dir \*.html /b >1.txt
chrome console 可通过过滤后,右键保存 log

乔布斯说,IE 必须死,页面错乱是你活该!

proxy:
'/api': {

- target : `<url string to be parsed with the url module>`
- forward: `<url string to be parsed with the url module>`
- agent : <object to be passed to http(s).request>
- ssl : <object to be passed to https.createServer()>
- ws : <true/false, if you want to proxy websockets>
- xfwd : <true/false, adds x-forward headers>
- secure : <true/false, verify SSL certificate>
- toProxy: <true/false, explicitly specify if we are proxying to another proxy>
- prependPath: <true/false, Default: true - specify whether you want to prepend the target's path to the proxy path>
- ignorePath: <true/false, Default: false - specify whether you want to ignore the proxy path of the incoming request>
- localAddress : `<Local interface string to bind for outgoing connections>`
- changeOrigin: <true/false, Default: false - changes the origin of the host header to the target URL>
- preserveHeaderKeyCase: <true/false, Default: false - specify whether you want to keep letter case of response header key >
- auth : Basic authentication i.e. 'user:password' to compute an Authorization header.
- hostRewrite: rewrites the location hostname on (201/301/302/307/308) redirects, Default: null.
- autoRewrite: rewrites the location host/port on (201/301/302/307/308) redirects based on requested host/port. Default: false.
- protocolRewrite: rewrites the location protocol on (201/301/302/307/308) redirects to 'http' or 'https'. Default: null.
- }

tortoisegit git pull 勾选变基后命令
git fetch -v --progress origin
不勾选
git pull --progress -v --no-rebase origin

git remote add caijinyuan ssh://git@isource-dg.huawei.com:2222/cWX814577/NetCarePortalService.git
git fetch caijinyuan
git cherry-pick 8206a818

performance.getEntries() 返回一个 PerformanceEntry 列表，这些请求的时间统计信息

jquery get 是 application/x-www-form-urlencoded
HTTP 会将请求参数用 key1=val1&key2=val2 的方式进行组织，并放到请求实体里面，注意如果是中文或特殊字符如"/"、","、“:" 等会自动进行 URL 转码

application/json;charset=utf-8 axios 默认请求头 content-type
去掉空行, 用正则替换:
ctrl+h: \b\n\n ->\n

运算符优先级
var a = {n:1};
a.x = a = {n:2}
a 指向{n:2}返回{n:2} a.x 指向{n:2}

4 个 cdn
http://code.jquery.com/ 只有 jquery
https://unpkg.com/jquery
https://www.bootcdn.cn/
仓库安装 github,等

"vetur.format.defaultFormatterOptions": {
"js-beautify-html": {
"wrap_attributes": "force" // 可以换成上面任意一种 value
}
}
// Wrap attributes to new lines [auto|force|force-aligned|force-expand-multiline] ["auto"]

1.打印文件夹下文件名输出到 00.txt 中
dir _._ /b> 00.txt 2.文件夹下以及子孙文件夹下的文件名以树形式打印
tree /f > 00.txt

获取 dom 元素上绑定的事件:
getEventListeners($0).click[0].listerner

Sublime Text 查找时排除指定的文件夹或文件
Ctrl + Shift + F
这组快捷键可以调出 Sublime Text 的查找替换窗口，里边有一栏 Where，可以做一些高级设置：
d:\dir\ , -.css, -/debug/ , -.cache

git remote set-url origin `<new-forked-repo-addr>`
git remote set-url upstream `<new-centeral-repo-addr>`

git.exe fetch -v --progress "main" master
git pull -r，就会使用 rebase 的方式将远端修改拉到本地。

remote: HTTP Basic: Access denied
fatal: Authentication failed for 时:运行下面命令可重新输入密码
git config --system --unset credential.helper
或 git config --global --unset credential.helper

insertAdjacentHTML

<!-- beforebegin -->

<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->

target.removeEventListener(type, listener[, useCapture]);
获取绑定事件: getEventListeners
取消 el-table 绑定的 row-click: XXX.$off('row-click') 可取消绑定

npm init vite-app `<project-name>`
cd `<project-name>`
npm install
npm run dev
如果使用 yarn，则依次执行下面的命令：

yarn create vite-app `<project-name>`
cd `<project-name>`
yarn
yarn dev

Vue2 到 Vue3 生命周期映射直接来自 Vue3 Composition API 文档
beforeCreate -> use setup()
created -> use setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
在 window.onload 事件里执行 new Date() - performance.timing.navigationStart 即可获取首屏时间

前序(根左右),中序(左根右),后序(左右根)
usercenter,传参数数组在 invoke.js 中 new URLSearchParams(data).toString()会转成逗号分隔字符串

生成 ssh 秘钥，打开终端，执行 ssh-keygen -t rsa -C "你公司内部邮箱地址"，如果执行成功，切换到 ~/.ssh 目录下，此时目录应该如下所示。复制 id_rsa.pub 的内容, 放在 github 中 settings -> SSH and GPG keys ; 复制 id_rsa.pub 的内容，点击 add ssh key

WFM 即 WorkForce Management 排版管理

npm list --depth=2 查看版本信息

vscode:
文件目录范围: ./app/ies/application/NetCareCloud/src
alt+鼠标 //点选或拖动, 变行位置多列选择
alt+shift+鼠标 //拖动, 同行位置多列选择

excel 技巧: 数据->删除重复项 可快速去重
数据->筛选, 高级筛选, 选择方式 1,列表区域, 条件区域再将要筛选的数据包含表头加进去,可含多列

v-charts 是饿了么团队开源的一款基于 Vue 和 Echarts 的图表工具，在使用 echarts 生成图表时，经常需要做繁琐的数据类型转化、修改复杂的配置项，v-charts 的出现正是为了解决这个痛点。基于 Vue2.0 和 echarts 封装的 v-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表。

Prettier 的配置文件可以用 4 种文件格式编写
JavaScript .prettierrc.js 或 prettier.config.js
JSON .prettierrc.json
YAML .prettierrc.yaml 或.prettierrc.yml
TOML .prettierrc.toml

v-charts 的中文社区文档（https://v-charts.js.org/#/）
// 安装 axios 并将 axios 添加至 devDependencies
pnpm install axios -D
// 安装 axios 并将 axios 添加至 dependencies
pnpm install axios -S
Prettier 的配置文件可以用 4 种文件格式编写：

JavaScript .prettierrc.js 或 prettier.config.js
JSON .prettierrc.json
YAML .prettierrc.yaml 或.prettierrc.yml
TOML .prettierrc.toml

2.读取顺序
当同一个目录下有多个不同格式的配置文件时，Prettier 只会使用一个。Prettier 会按照以下优先级（从高到低）读取：

1.package.json
2..prettierrc YAML 或 JSON 格式
3..prettierrc.json
4..prettierrc.yaml
5..prettierrc.yml
6..prettierrc.js
7..prettier.config.js
8..prettierrc.toml

"prettier.singleQuote": true

vue 使用 jsx:
npm i @vitejs/plugin-vue-jsx

在 vite.config.js 加入 jsx 配置

// vite.config.js
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
plugins: [vue(), vueJsx()],
})

location.hash 当路径是 hash 路径#后面的参数也属于 hash
#/e?network_number=
location.search: '' 返回参数为空

https://login.huawei.com/login/?redirect=http://ilearning.huawei.com/edx/after_login?redirect_to=2f6564782f6e6578742f

https://login.huawei.com/login/?redirect=https%3A%2F%2Fnetcare.huawei.com%2Fp%2Fnetcare%2Findex.html

bugfree redmine jira dts MS SharePoint IBM RTC Trello CQ QC

node .\build\script\getLintErrorXlsx.js "npm run lint-fe-e"
[].forEach.call($$("_"),function(a){a.style.outline="1px solid #"+(~~(Math.random()_(1<<24))).toString(16)})

自评
http://w3.huawei.com/lsms/#!lsms/caAccept/evaluate/editEvaluateSelf.html?applyType=EvaluateTask&id=66463

长安奔奔 eStar，5 万元以下没有能打的，305 公里的续航里程绝对是第一

可以通过 nbtstat -a X.X.X.X 来查找用户

/_ 基于 UI width=750px DPR=2 的页面 _/
html {
font-size: calc(100vw / 7.5);
}

阅读源码 vue.config.js-->webpack-->webpack-dev-server-->http-proxy-middleware-->http-proxy 发现 vue 配置 proxy 代理最后实现是采用的 http-proxy 来实现代理转发

"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security
--user-data-dir=C:\MyChromeDevUserData --profile-directory="Profile 1"

// 查看全局安装路径
npm root -g
// 查看 npm 的基础设置
npm config ls
// 查看安装目录路径
npm config get prefix

$ npm init ssr-app my-ssr-project
$ cd my-ssr-project
$ npm install # 可以使用 yarn 不要使用 cnpm
$ npm start
$ open http://localhost:3000 # 访问应用
$ npm run build # 资源构建，等价于 npx ssr build
$ npm run start:vite # 以 vite 模式启动，等价于 npx ssr start --vite
$ npm run start:vite # 以 vite 模式启动，等价于 npx ssr start --vite

# .yarnrc 文件

# 使用 CBU 维护的黄绿区通用源

registry "http://npm.inhuawei.com/"

# 禁用更新检测（若不禁用，安装后会一直报无法联网的问题）

disable-self-update-check true

# 设置 @cloud 的源

npm config set @cloud:registry http://npm.inhuawei.com/
安装：

npm install --save-dev eslint babel-eslint @cloud/eslint-config-cbc #相关依赖参考
如果 eslint 运行有问题，建议使用如下依赖：

- eslint 7.16.0
- babel-eslint 10.1.0
- eslint-plugin-react 7.21.5
- vue-eslint-parser 7.3.0
- eslint-plugin-vue 7.3.0
- @typescript-eslint/parser 4.11.0
- @typescript-eslint/eslint-plugin 4.11.0
- eslint-plugin-rxjs 3.3.5

npm i typescript eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D

npm i eslint-config-standard eslint-plugin-import eslint-plugin-promise eslint-plugin-node eslint -D

[] == ![] // -> true ，下面是这个表达式为何为 true 的步骤
// [] 转成 true，然后取反变成 false
[] == false
// 根据第 8 条得出
[] == ToNumber(false)
[] == 0
// 根据第 10 条得出
ToPrimitive([]) == 0
// [].toString() -> ''
'' == 0
// 根据第 6 条得出
0 == 0 // -> true

node --inspect-brk app.js

npm install electron@17.0.0

实现瀑布流
.masonry {
display: grid; gap: 20px;
grid: masonry / repeat(auto-fill, minmax(250px, 1fr));
}

Roboto 只显示英文, 无需安装

svelte 模板: https://github.com/sveltejs/template
svelte-navigator:Svelte 的简单易用路由
svelte-store-router：Svelte 的基于商店的路由器
svelte-routing:精巧的路由
svelte-router:易于使用的 Svelte SPA 路由器
svelte-spa-router:使用 Svelte 3 的 SPA 路由器

corepack 包管理工具: (npm, yarn, pnpm, cnpm)

undici4, got, r2 替代 request
其他: node-fetch, ky, superagent, axios

01、BootstrapVue
地址：https://bootstrap-vue.org/
一个用于 Vue.js 构建引导接口的开源库。

02、Vuex
地址：https://vuex.vuejs.org/
Vue.js 应用程序的状态管理库。

03、Vue Devtools
地址：https://devtools.vuejs.org/
一个调试 Vue.js 项目的简单工具。

04、Vue CLI
地址：https://cli.vuejs.org/
Vue.js 开发人员更简单的标准工具。

05、Vue Router
地址：https://router.vuejs.org/
直观而强大的语法定义静态和动态路由。

06、Vuetifyjs
地址：https://vuetifyjs.com/en/
帮助构建 Vue.js 的 Material Design 接口的开源库。

07、Nuxt
地址：https://nuxtjs.org/
一个开源框架，使 Web 开发变得简单而强大。

08、Vue Element Admin
地址：https://github.com/PanJiaChen/vue-element-admin
帮助构建具有管理网站所需的许多功能的简单管理界面。

09、Vue Apollo
地址：https://vue-apollo.netlify.app/
它可以帮助我们的 Vue.js 项目设置 GraphQL 变得更容易。

10、Element UI
地址：https://element.eleme.io/#/en-US
用于 Vue 项目界面开发的 UI 库。

11、Quasar
地址：https://quasar.dev/
Quasar 是一个开源的 Vue.js 框架，可帮助构建 SPA（单页应用）、SSR（服务器端渲染应用）、PWA（渐进式 Web 应用）。

12、Language Vue
地址：https://atom.io/packages/language-vue
支持 Atom 的 Vue.js 开发的实用程序。

13、VuePress
地址：https://v2.vuepress.vuejs.org/
VuePress 是一个以降价为中心的静态站点生成器。

14、Vue.js Guide
地址：https://vuejs.org/guide/introduction.html
Vue.js 开发人员最完整、最详细的指南。

15、Vue Select
地址：https://vue-select.org/
帮助我们构建具有对 Vue.js 开发人员有用的功能的组件。

16、Vueuse
地址：https://vueuse.org/
Vue 2 和 Vue 3 组件的必要实用程序集合。

17、VeeValidate
地址：https://vee-validate.logaretm.com/v4/
Vue.js 中的表单验证工具。

18、Vant
地址：https://vant-contrib.gitee.io/vant/#/en-US
移动 UI 的界面构建器库。

19、Vue Native
地址：https://vue-native.io/
帮助构建跨平台原生移动应用的 JavaScript 框架。

20、Vue-meta
地址：https://vue-meta.nuxtjs.org/
Vue.js 项目的 Cmeta 标签管理器。

21、Vue I18n
地址：https://kazupon.github.io/vue-i18n/
插件有助于为项目添加国际功能。

22、Vue Infinite Loading
地址：https://peachscript.github.io/vue-infinite-loading/
为网站创建无限滚动功能。

23、Gridsome
地址：https://gridsome.org/
该工具可以快速轻松地构建静态网站和应用程序。

24、Vite
地址：https://vitejs.dev/
Vite 是一个构建工具，旨在为现代 Web 项目提供更快、更精简的开发体验。

25、Vue-multiselect
地址：https://vue-multiselect.js.org/
帮助为网站构建多选功能的开源库。

26、Vetur
地址：https://marketplace.visualstudio.com/items?itemName=octref.vetur
用于在 VSCode 中更好地进行 Vue.js 开发和调试的扩展。

27、Vue.js Examples
地址：https://vuejsexamples.com/
Vue.js 接口开发中的示例集合。

npm install vue@next //最新版 vue v3.x
npm install vue-router@4 //最新版 vue-router v4.x
npm install vuex@next --save //最新版 vuex v4.x
npm install axios //基于 promise 的 HTTP 库
npm install element-plus //基于最新版 Vue 3.x 的 PC 端 UI 框架
npm install ant-design-vue@next //基于最新版 Vue 3.x 的 PC 端 UI 框架
npm install vant@3 //基于最新版 Vue 3.x 的移动端 UI 框架
npm install loadsh //JavaScript 的实用工具库
npm install immutable //数据处理工具
npm install dayjs //时间日期库
npm install qrcode //二维码生成器
npm install echarts //可视化图表库
npm install gsap //动画库
npm install xlsx file-saver //导出表格
npm install mockjs //生成随机数据，拦截 Ajax 请求
npm install eslint --save-dev //可组装的 JavaScript 和 JSX 检查工具
npm install sass sass-loader //CSS 扩展语言
npm install vuedraggable //基于 Sortable.js 实现的 vue 拖拽插件
npm install sortablejs //拖拽库
npm install screenfull //实现全屏功能
npm install nprogress //加载进度条
npm install jszip //创建、读取和编辑 .zip 文件
npm install js-cookie //cookie 存取
npm install fuse.js //模糊搜索
npm install dropzone //提供文件拖拽上传并且提供图片预览的开源类库
npm install driver.js //页面分步引导
npm install core-js //JavaScript 标准库的 polyfill（垫片/补丁）
npm install codemirror //浏览器实现的多功能文本编辑器
npm install clipboard //文本复制到剪贴板

// Component 组件的创建
// 注意 template 中的容器 只能有一个父元素，不能包含两个 你可以用一个 div 包裹
// 第一种创建全局组件
// extend 是注册组件函数，他返回一个对象
var comobj= Vue.extend({
template:"`<h1>`我是全局组件 `</h1>`"
})
// component 函数提交组件，第一个参数为组件的名称，第二个参数是一个注册组件的对象
Vue.component("login",comobj)

// 第二种创建方式
// component 中直接写上一个模板对象
Vue.component('login2',{template:'`<h1>`我是第二种 v 创建出来的组件 `</h1>`'});

// 第三种创建的方式 首先在元素中创建一个 template 模板
Vue.component('login3',{template:'#login3'})

var vm=new Vue({
el:'.app',
data:{},
// 定义私有组件 和全局差不多 组件名称和对象，也可以使用 template 模板来创建
components:{
login6:{template:'#login3'}
}
})
axios 实例方法:
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])

el-row :gutter="20" 间距 20px
:span="4" 占 4/24

点锁定 状态变 评审中 加一个 补丁评审
点解锁 变 登记中

评审中 汇总 解锁 编辑 补丁评审
登记中 汇总 锁定 编辑 新增登记

document.cookie='name=val' 设置的 cookie 生命周期跟 sessionStorage 一样,仅在会话期间

Python 的测试框架。
1）Robot Framework，主要用于测试驱动类型的开发与验收中。
2）Pytest，特点是开源、易学。
3）PyUnit，针对单元测试的 Python 类自动化测试框架，收到 Junit 的启发。
4）Behave，允许团队执行 BDD（行为驱动开发，behavior-driven development） 测试。
5）Lettuce，专注于具有行为驱动开发特征的普通任务。

开发域怎么查模型的真实表名:
// SELECT TABLE_NAME FROM t_bm_model WHERE MODEL_NAME = 'qualification_check_item_v2' LIMIT 1
select table_name,model_name from sys_basemodel where model_name='ncuc_nc_wx_uniportal_qualification_relation'

阻止默认事件;
e.preventDefault();或 return false;

网页一键置灰:html{filter: grayscale(1);}

npm i electron vite-plugin-electron -D
tsc --init // 创建 tsconfig.json
npm init -y
pnpm add webpack webpack-dev-server html-webpack-plugin
webpack 3 以上需安装 webpack-cli

rollup-plugin-visualizer 查看打包体积

npm init vue@latest 较全的选择项

chrome element 控制台,可以右键, 复制->复制样式, 再进行粘贴

可以使用 npm create vite-pretty-lint 一键生成 (貌似添加的东西有点多,建议可根据自己需要手动添加)
会添加,.eslintignore, .eslintrc.json, .prettierrc.json 三个文件, 会安装 84 个包, 原有 180 多个
还要安装扩展的包, eslint-config-standard
package.json 添加
// eslint 相关的包
"eslint": "^8.17.0",
"eslint-plugin-vue": "^9.1.0",
"vue-eslint-parser": "^9.0.2",
"vite-plugin-eslint": "^1.6.1",

// prettier 相关的包
"prettier": "^2.6.2",
"eslint-config-prettier": "^8.5.0",
"eslint-plugin-prettier": "^4.0.0",

css 优化渲染
content-visibility, contain-intrinsic-size
hidden: 与 display: none 类似
visible：默认值
auto：该元素打开布局包含、样式包含和绘制包含
/_ Keyword values _/
contain-intrinsic-width: none;

/_ `<length>` values _/
contain-intrinsic-size: 1000px;
contain-intrinsic-size: 10rem;

/_ width | height _/
contain-intrinsic-size: 1000px 1.5em;

/_ auto `<length>` _/
contain-intrinsic-size: auto 300px;

/_ auto width | auto height _/
contain-intrinsic-size: auto 300px auto 4rem;

npm i -g @nestjs/cli
nest new demo

npm i ts-node -g
npm init -y
npm i @types/node @types/express -D
npm i express axios -S

location / {
root html;
index index.html index.htm;
try_files $uri $uri/ /index.html
}

1.Jeecg-boot
2.renren-fast
3.vue-manager-system
// 安装 mysql
docker run -e MYSQL_ROOT_PASSWORD= -p 3306:3306 -dmysql:8

全局注册
Vue.component('my-component-name', {/_..._/})
1,方式 1
const childComponent = Vue.extend({
data: {},
created() {},
methods: {},
})
Vue.component('child', childComponent)
2, 方式 2
Vue.component('child', {
name: 'child-component',
data: {},
created() {},
methods: {},
})

局部注册
var ComponentA = { /_...._/ }
new Vue({
el: '#app',
components: {
'component-a': ComponentA
}
})
accept 类型:
`<input type="file" id="docpicker" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />`

`<input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg">`

let hd='houdunren2010.不断加油，进步'
hd.match(/\p{L}/gu) // 匹配字母
hd.match(/\p{P}/gu) // 匹配标点
hd.match(/\p{sc=Han}/gu) // 匹配中文

clip-path: inset(100px 50px);
clip-path: circle(50px at 0 100px);
clip-path: ellipse(50px 60px at 0 10% 20%);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
clip-path: path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z');

mysql 学习

select date_sub(now(), interval dayofmonth(now())-1 day);
-- select date_sub(now(), interval dayofmonth(now())-1 day);
-- select DATE_FORMAT(date_sub(now(),INTERVAL 3 month), "%Y-%m-01");
-- select LAST_DAY(DATE_SUB(now(),INTERVAL 1 month))
-- select LAST_DAY(now())
-- SELECT DATE_ADD(LAST_DAY(now()),INTERVAL 1 day)
-- 小于20岁
-- select * from stu where birthday <= DATE_SUB(now(),INTERVAL 20 year)

-- select date_add(now(), interval 1-dayofweek(now()) day);
-- set @week =date_sub(now(), interval 1 week);
-- -- select @week;
-- select date_add(@week,interval 0-weekday(@week) day)
-- select time(now()), now(), dayofmonth(now())-1, date_sub(now(), interval dayofmonth(now())-1 day)
-- select weekday(now()), dayofweek(date_sub(now(), interval 13 day)), date(date_add(now(), interval 6-weekday(now()) day))
-- select MID('longfei', 3,2), LEFT('hello',2)
-- set sql_mode=(select replace(@@sql_mode,'ONLY_FULL_GROUP_BY', ''));
-- select min(click), id from article
--truncate tab

create table t(
[constraint] [外键名] foreign key (外键字段名) references 主表(主表列名)
)
alter table 表名 add constraint 外键名 foreign key (外键字段名) references 主表(主表列名)
alter table 表名 drop foreign key 外键名;
// 命令行使用命令查看表结构
ibd2sdi tablename.idb
innoDB存储结构
tableSpece表空间->segment段->extent区1M(64page)->page页16K->row行

ASC (ascend) 表示升序排列 (从小到大) ，DESC (descend) 表示降序
