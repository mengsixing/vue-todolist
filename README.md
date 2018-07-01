# vue-todolist

## vue-ssr 总结

服务端渲染两种方式：
* createRenderer
* createBundleRenderer

### createBundleRenderer方式

1、客户端使用VueClientPlugin

2、服务端使用VueServerPlugin

3、定义入口文件 client/server-entry.js 返回app对象，给服务端使用。

  3.1、创建create-app.js文件，用于每次生成新的Vue实例

4、创建node服务器，server.js

5、捕获get(*)路由，用于服务器端渲染，dev-ssr.js。

  5.1、获取 VueServerPlugin 创建的 vue-ssr-server-bundle.json 文件，并创建 bundle。

  5.2、获取 VueClientPlugin 创建的 vue-ssr-client-manifest.json 文件，生成clientManifest。

  5.3、使用 vue-server-renderer 库的 createBundleRenderer 方法。

6、抽离具体渲染过程，新建server-render.js，调用renderToStinrg方法生成渲染字符串。




