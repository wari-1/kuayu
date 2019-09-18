module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-kuayu/" : "/",
  //配置代理服务器
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.wanandroid.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  }
};
