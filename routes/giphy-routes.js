const express = require('express')

const { giphyController } = require('../controllers')

const giphyRoutes = express.Router()

giphyRoutes.get('/trending', giphyController.listTrending)
giphyRoutes.post('/search', giphyController.search)

module.exports = {
  giphyRoutes
}