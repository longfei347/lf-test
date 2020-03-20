const koa =require('koa')
const Router =require('koa-router')
// 实例化
const app=new koa();
const router =new Router();

router.get('/', async ctx=> {
  ctx.body={msg: 'hello koa!'}
})

app.use(router.routes()).use(router.allowedMethods());

const port =process.env.PORT|| 5000
app.listen(port, ()=>{
  console.log(`server started on ${port}`)
})
