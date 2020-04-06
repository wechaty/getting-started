const isCodeSandbox = () => Object.keys(process.env).includes('KUBERNETES')

if (isCodeSandbox()) {
  /**
   * A quick webserver
   */
  const path = require('path')

  const connect     = require('connect')
  const serveStatic = require('serve-static')

  const webRoot = path.join(
    __dirname,
    '..',
    '..',
  )

  console.log(webRoot)
  connect()
    .use(serveStatic(webRoot, { 'index': ['README.md'] }))
    .listen(8080, function() {
      console.info('Web Server running on 8080...')
    })
}

