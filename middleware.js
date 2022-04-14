let express = require('express');
let app = express()
let { createProxyMiddleware } = require('http-proxy-middleware');
const options = {
    target: 'https://gdedev.icta138.huawei.com:38443/',
    changeOrigin: true,
    ws: true,
    secure: true,
    
};
let proxy = {
    '/sit': {
        target: 'https://gdesit.icta138.huawei.com:38443',
        changeOrigin: true,
        secure: true,
        ws: true,
        pathRewrite: { '/sit': '' }
    },
    '/uat': {
        target: 'https://netcare-uat.huawei.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '/uat': '' }
    },
    '/dev': {
        target: 'https://gdedev.icta138.huawei.com:38443',
        changeOrigin: true,
        pathRewrite: { '/dev': '' }
    }
}
app.use('/', express.static('jq-project'))
app.use('/login', createProxyMiddleware({
    target: 'https://login-beta.huawei.com/',
    // changeOrigin: true,
    ws: true,
    secure: true,
    pathRewrite: { '/login': '/login', },
}));
app.use('/servicecreator', createProxyMiddleware(options));
app.use('/app', createProxyMiddleware(options));
Object.keys(proxy).forEach(itm => {
    app.use(itm, createProxyMiddleware(proxy[itm]))
})

app.listen(3001,()=>{
    console.log("server running at http://localhost:3001'")
})
