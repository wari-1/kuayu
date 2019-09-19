module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-kuayu/" : "/",
  runtimeCompiler: true,
  // publicPath: "/vue-kuayu/",
  //配置代理服务器
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "https://www.wanandroid.com", //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "https://www.wanandroid.com",
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/api": ""
  //       }
  //     }
  //   }
  // },

  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: []
      }
    }
  },

  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: false
    }
  }
};
