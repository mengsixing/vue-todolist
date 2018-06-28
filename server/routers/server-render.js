const ejs = require('ejs');


module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html';

  let context = {
    url: ctx.path
  };


  try {
    const appString = await renderer.renderToString(context);

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
    });

    ctx.body = html;
  } catch (err) {
    console.log('render err', err);
    throw err;
  }
}
