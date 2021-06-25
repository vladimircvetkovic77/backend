const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const config = require('./config/config.json')
const { giphyRoutes }  = require('./routes')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * CORS
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/**
 * Test route
 */
app.get('/', (req, res) => res.send('It works!'))

/**
 * Giphy routes
 */
app.use('/api/giphy', giphyRoutes)

/**
 * Not Found page route
 */
app.use((req, res) => {
  res.status(404).send({
    error: {
      message: "Sorry can't find that!",
    }
  })
})

app.listen(config.applicationPort, () => console.log(`App is listening on port ${config.applicationPort}!`))

module.exports = {
  app
}