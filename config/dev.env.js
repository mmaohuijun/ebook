var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_PATH: '"/"',
  BASE_URL: '"http://172.18.84.61:88/admin/"' 
})
