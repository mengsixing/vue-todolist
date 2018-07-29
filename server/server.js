const Koa = require("koa");
const send = require("koa-send");
const path = require("path");
const staticRouter = require('./routers/static')

const app = new Koa();

let pageRouter;

console.log('查看环境：', process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  pageRouter = require("./routers/dev-ssr");
} else {
  pageRouter = require("./routers/ssr");
}

const isDev = process.env.NODE_ENV === "development";

// 处理favicon.ico 图标
app.use(async (ctx, next) => {
  if ("/favicon.ico" == ctx.path) {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next();
  }
});

app.use(async (ctx, next) => {
  try {
    console.log(`request is path ${ctx.path}`);
    await next();
  } catch (err) {
    console.log(err);
    if (isDev) {
      ctx.body = err.message;
    } else {
      ctx.body = "please try again laster.";
    }
  }
});

// 让外部可以访问您的服务器，0.0.0.0，https://webpack.js.org/configuration/dev-server/#devserver-host
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 3333;

app.use(staticRouter.routes())
app.use(pageRouter.routes())
app.use(pageRouter.allowedMethods);


app.listen(PORT, HOST, () => {
  console.log(`server is listening on port ${PORT}`);
});
