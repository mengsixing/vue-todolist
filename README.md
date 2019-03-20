# vue-todolist

[![Greenkeeper badge](https://badges.greenkeeper.io/yhlben/vue-todolist.svg)](https://greenkeeper.io/)

## vue-ssr 总结

服务端渲染两种方式：

- createRenderer
- createBundleRenderer

### createBundleRenderer方式

1、客户端使用VueClientPlugin

2、服务端使用VueServerPlugin

3、定义入口文件 client/server-entry.js 返回app对象，给服务端使用。

  3.1、创建create-app.js文件，用于每次生成新的Vue实例

4、创建node服务器，server.js

5、捕获get(*)路由，用于服务器端渲染，dev-ssr.js。

  5.1、获取 VueServerPlugin 创建的 vue-ssr-server-bundle.json 文件，并创建 bundle。

    - bundle 文件就是将 vue 代码打包后的文件，包含了页面上所有的内容。

  5.2、获取 VueClientPlugin 创建的 vue-ssr-client-manifest.json 文件，生成clientManifest。

    - 此对象包含了 webpack 整个构建过程的信息，从而可以让 bundle renderer 自动推导需要在 HTML 模板中注入的内容。

  5.3、使用 vue-server-renderer 库的 createBundleRenderer 方法组合 client 和 server 生成的文件，并输出。

6、抽离具体渲染过程，新建server-render.js，调用renderToStinrg方法生成渲染字符串。

#### 核心代码

```js
// bundle: vue-ssr-server-bundle.json 生成
// clientMani fest:vue-ssr-client-manifest.json 生成
const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  });

// 得到渲染完成后的html字符串
const html = await renderer.renderToString(context);
```

#### 采坑

1、服务端没有dom，不能使用style-loader处理css，官网文档采用extract-text-webpack-plugin分离css

2、extract-text-webpack-plugin在webpack4已经废弃，推荐使用的mini-css-extract-plugin 实现分离机制和VueServerPlugin不兼容。

3、未完（待续）。
