const isCodeSandbox = () => Object.keys(process.env).includes('KUBERNETES')

if (isCodeSandbox()) {
  /**
   * A quick webserver
   */
  const path = require('path')
  const fs   = require('fs')

  const connect = require('connect')
  const marked   = require('marked')

  const readme = path.join(
    __dirname,
    '..',
    '..',
    'README.md',
  )

  connect()
    .use((_, res) => res.end(marked(fs.readFileSync(readme).toString())))
    .listen(8080, function() {
      console.info('Web Server running on 8080...')
    })
}

