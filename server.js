const express = require('express');
const path = require('path');

(async () => {
  const prefix = process.env.NODE_ENV === 'development' ? './build/' : './build/';
  const app = express();
  app.set('port', process.env.PORT || 3000);
  app.set('env', process.env.NODE_ENV || 'production');

  // if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(`${prefix}`)));
    app.get('*', (req, res) => {
      res.sendFile(path.join(path.resolve(`${prefix}`), 'index.html'));
    });
  // }

  // Start Express server.
  app.listen(app.get('port'), () => {
    console.log('  App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
})().catch(err => console.log(err));
