let portConfig = require('./config/server.config');
let app = require('./app')

app.listen(portConfig.PORT, () => {
  console.log('Your Server is Running... (on 8002)');
  // init();
});
