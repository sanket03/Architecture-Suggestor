const app = require('express')();
const cors = require('cors');
const routes = require('./routes/index.js');
app.use(cors());
app.options('*', cors());
app.use('/', routes);

app.listen(3003)
console.log('server is running at ' + 3001)
