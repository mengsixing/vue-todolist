const path = require('path');
const Router = require('koa-router');
const fs = require('fs');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');
const serverConfig = require('../../build/webpack.config.server.js');



const handleSSR = async (ctx) => {
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  );

  let bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf-8'));
  console.log('new bundle generated');

  if (!bundle) {
    ctx.body = '你等一会，别着急。';
    return;
  }

  const clientManifestResp = fs.readFileSync(path.join(__dirname,'../../public/vue-ssr-client-manifest.json'), 'utf-8')

  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  );

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  });

  await serverRender(ctx, renderer, template);
}

const router = new Router();
router.get('*', handleSSR);

module.exports = router;
