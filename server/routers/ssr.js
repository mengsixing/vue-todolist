const path = require('path');
const Router = require('koa-router');
const fs = require('fs');
const VueServerRenderer = require('vue-server-renderer');

const serverRender = require('./server-render');

const handleSSR = async (ctx) => {

  const clientManifest = require('../../public/vue-ssr-client-manifest.json')

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  );

  const renderer = VueServerRenderer.createBundleRenderer(path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'), {
    inject: false,
    clientManifest
  });

  await serverRender(ctx, renderer, template);
}

const router = new Router();
router.get('*', handleSSR);

module.exports = router;
