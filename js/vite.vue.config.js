// vue.config.js的配置
module.exports = {
  devServer: {
    host: '',
    hot: true,
    port: 8086,
    disableHostCheck: true, //新版的webpack-dev-server出于安全考虑，默认检查hostname，
    //如果hostname不是配置内的，将中断访问。
    https: false, //如果是https代理的话，这个要打开的
    open: true, // 是否在开启服务器后自动打开浏览器访问该服务器
    proxy: {
      '/prod-api': {
        target: 'http://10.20.1.158', //要跨域的地址
        changeOrigin: true //是否开启跨域
      },
      '/api': {
        target: 'http://192.168.2.28:8106',
        changeOrigin: true
        // pathRewrite: {'^/get': ''} //路径重写
      },
      headers: {
        Referer: 'https://127.0.0.1:8443'
      } //使用https代理
    }
  },
  lintOnSave: false, // lint语法检测关闭语法检查，主要针对ESlint里面定义却没有使用出现的报错
  outputDir: 'dist', // build打包输出目录
  assetsDir: 'static', // 静态文件输出目录，基于dist
  indexPath: 'index.html', // 输出html文件名
  productionSourceMap: false, // 取消.map文件的打包，加快打包速度
  publicPath: './', //部署应用包时的基本 URL,//这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，
  //这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
  configureWebpack: config => {
    // process.env为环境变量，分别对应.env.development文件和.env.production文件 此处表示加快开发环境打包速度
    if (process.env.NODE_ENV !== 'production') return;
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true; //生产环境去掉console.log
    return {
      // 此处配置webpack.config.js的相关配置
      plugins: [],
      performance: {}
    };
  }
};
// vite.config.js的相关配置和注解
// vite.config.js

import { defineConfig } from 'vite'; // 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path');
import { viteMockServe } from 'vite-plugin-mock';

const localEnabled = process.env.USE_MOCK || false;
const prodEnabled = process.env.USE_CHUNK_MOCK || false;

// https://vitejs.dev/config/
export default () =>
  defineConfig({
    plugins: [
      //配置需要使用的插件列表
      vue(),
      viteMockServe({
        mockPath: './src/server/mock',
        localEnabled: localEnabled, // 开发打包开关 true时打开mock  false关闭mock
        prodEnabled: prodEnabled, //prodEnabled, // 生产打包开关
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
        `,
        logger: false, //是否在控制台显示请求日志
        supportTs: false //打开后，可以读取 ts 文件模块 打开后将无法监视 .js 文件
      })
    ],
    // 强制预构建插件包
    optimizeDeps: {
      //检测需要预构建的依赖项
      entries: [],
      //默认情况下，不在 node_modules 中的，链接的包不会预构建
      include: ['axios'],
      exclude: ['your-package-name'] //排除在优化之外
    },
    //静态资源服务的文件夹
    publicDir: 'public',
    base: './',
    //静态资源处理
    assetsInclude: '',
    //控制台输出的级别 info 、warn、error、silent
    logLevel: 'info',
    // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    clearScreen: true,
    resolve: {
      alias: [
        //配置别名
        { find: '@', replacement: resolve(__dirname, 'src') }
      ],
      // 情景导出 package.json 配置中的exports字段
      conditions: [],
      // 导入时想要省略的扩展名列表
      // 不建议使用 .vue 影响IDE和类型支持
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    // css
    css: {
      // 配置 css modules 的行为
      modules: {},
      // postCss 配置
      postcss: {},
      //指定传递给 css 预处理器的选项
      preprocessorOptions: {
        scss: {
          additionalData: `$injectedColor:orange;`
        }
      }
    },
    json: {
      //是否支持从 .json 文件中进行按名导入
      namedExports: true,
      //若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
      stringify: false
    },
    //继承自 esbuild 转换选项，最常见的用例是自定义 JSX
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import Vue from 'vue'`
    },
    //本地运行配置，以及反向代理配置
    server: {
      host: 'localhost',
      https: false, //是否启用 http 2
      cors: true, //为开发服务器配置 CORS , 默认启用并允许任何源
      open: true, //服务启动时自动在浏览器中打开应用
      port: '9000',
      strictPort: false, //设为true时端口被占用则直接退出，不会尝试下一个可用端口
      force: true, //是否强制依赖预构建
      hmr: false, //禁用或配置 HMR 连接
      // 传递给 chockidar 的文件系统监视器选项
      watch: {
        ignored: ['!**/node_modules/your-package-name/**']
      },
      // 反向代理配置
      proxy: {
        '/api': {
          target: 'https://xxxx.com/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    //打包配置
    build: {
      //浏览器兼容性  "esnext"|"modules"
      target: 'modules',
      //指定输出路径
      outDir: 'dist',
      //生成静态资源的存放路径
      assetsDir: 'assets',
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      //启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      //构建后是否生成 source map 文件
      sourcemap: false,
      //自定义底层的 Rollup 打包配置
      rollupOptions: {},
      //@rollup/plugin-commonjs 插件的选项
      commonjsOptions: {},
      //构建的库
      lib: {},
      //当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
      // 设置为 false 可以禁用最小化混淆，
      // 或是用来指定使用哪种混淆器
      // boolean | 'terser' | 'esbuild'
      minify: 'terser', //terser 构建后文件体积更小
      //传递给 Terser 的更多 minify 选项。
      terserOptions: {},
      //设置为 false 来禁用将构建后的文件写入磁盘
      write: true,
      //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
      //启用/禁用 brotli 压缩大小报告
      brotliSize: true,
      //chunk 大小警告的限制
      chunkSizeWarningLimit: 500
    },
    ssr: {
      // 列出的是要为 SSR 强制外部化的依赖
      external: [],
      //列出的是防止被 SSR 外部化依赖项
      noExternal: []
    }
  });
