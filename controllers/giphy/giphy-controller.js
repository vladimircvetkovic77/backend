const {apiService} = require('../../services')
const config = require('../../config/config.json')


/**
 * Lists Trending Giphy images
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const listTrending = async (req, res) => {
  const trendingUrl = `${config.giphyApiTrendingBaseUrl}api_key=${config.giphyApiKey}`
  const response = await apiService.get(trendingUrl)
  res.send(response.data)
}

/**
 *  Searches Giphy images based on:
 *  =======================================
 *  query: Search query term or phrase. Adding @<username> anywhere in the q parameter effectively changes the search query to be a search for a specific user’s GIFs
 *  ---------------------------------------
 *  limit: The maximum number of objects to return.
 *  ---------------------------------------
 *  offset: Specifies the starting position of the results.
 *  ---------------------------------------
 *  rating: Filters results by specified rating.
 *  ---------------------------------------
 *  lang: Specify default language for regional content; use a 2-letter ISO 639-1 language code.
 *  ---------------------------------------
 *  random_id: An ID/proxy for a specific user.
 *  ---------------------------------------
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const search = async (req, res) => {

  const {query, limit, offset, rating, lang, random_id} = req.body
  const searchUrl = getSearchUrl(query, limit, config.defaultGiphySearchLimit, offset, rating, lang, random_id)
  const response = await apiService.get(searchUrl)
  res.send(response.data)
}

/**
 * Generates search url string based on request object
 * @param query
 * @param limit
 * @param defaultLimit
 * @param offset
 * @param rating
 * @param lang
 * @param random_id
 * @returns {string}
 */
const getSearchUrl = (query, limit, defaultLimit, offset, rating, lang, random_id) => {
  const queryString = `&q=${query}&limit=${limit ? limit : defaultLimit}&offset=${offset ?? ''}&rating=${rating ?? ''}&lang=${lang ?? ''}&random_id=${random_id ?? ''}`
  return `${config.giphyApiSearchBaseUrl}api_key=${config.giphyApiKey}${queryString}`
}

module.exports = {
  listTrending,
  search
}