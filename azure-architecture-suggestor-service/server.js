const app = require('express')();
const routes = require('./routes/index.js') 

app.use('/', routes);

app.listen(3003)
console.log('server is running at ' + 3001)
