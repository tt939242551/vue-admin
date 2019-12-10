module.exports = {
    publicPath:"/admins/",
    devServer: {
        proxy: {
            '/api': {
                target: '/admins/', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': '/admins/'
                }
            }
        }
    },

  }