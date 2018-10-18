// vue.config.js
module.exports = {
  // 修改publicPath
  baseUrl: process.env.NODE_ENV === 'production' ? '/project/index/' : '/'
}
