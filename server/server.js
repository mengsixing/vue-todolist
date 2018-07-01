const Koa = require('koa');
const send = require('koa-send');
const path = require('path');

const app = new Koa();

const pageRouter = require('./routers/dev-ssr');


const isDev = process.env.NODE_ENV === 'development'

// 处理favicon.ico 图标
app.use(async (ctx,next) => {
  if ('/favicon.ico' == ctx.path) {
    await send(ctx, path.join(ctx.path,'../'));
  }else{
     await next();
  }

})

app.use(async (ctx, next) => {
  try {
    console.log(`request is path ${ctx.path}`);
    await next();
  } catch (err) {
    console.log(err);
    if (isDev) {
      ctx.body = err.message;
    } else {
      ctx.body = 'please try again laster.'
    }
  }
});

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.use(pageRouter.routes()).use(pageRouter.allowedMethods);

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}`);
});
