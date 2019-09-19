<template>
  <div>
    <div class="header">
      <div class="inner">
        <div class="logo">
          <img src="./assets/logo1.png" alt />
        </div>
        <div class="nav">
          <ul>
            <li :class="$route.path==='/'?'active':''">
              <router-link to="/">首页</router-link>
            </li>
            <li :class="$route.path==='/projectindex'?'active':''">
              <router-link to="projectindex">项目</router-link>
            </li>
            <li :class="$route.path==='/tree'||$route.path==='/article/list/:page'?'active':''">
              <router-link to="/article/list/0?cid=60">体系</router-link>
            </li>
            <li :class="$route.path==='/wxarticle/list/:fullPath'?'active':''">
              <router-link to="/wxarticle/list/408">公众号</router-link>
            </li>
            <li :class="$route.path==='/navi'?'active':''">
              <router-link to="/navi">导航</router-link>
            </li>
            <li :class="$route.path==='/project'?'active':''">
              <router-link to="/project">项目分类</router-link>
            </li>

            <li :class="$route.path==='/lg/collect'?'active':''">
              <router-link to="/lg/collect">收藏</router-link>
            </li>
          </ul>
        </div>
        <div class="right" style="display:flex;align-items:center">
          <form action class="search_global">
            <input type="text" placeholder="搜索关键词以空格形式隔开" :v-model="value" @keyup.enter="search()" />
            <span class="search">
              <i class="fa fa-search"></i>
            </span>
          </form>
          <div class="nav_login">
            <ul v-if="usernameLogin===''">
              <li>
                <el-button type="text" @click="dialogVisible = true">登录</el-button>

                <el-dialog
                  title="登录"
                  :visible.sync="dialogVisible"
                  width="30%"
                  @click="dialogVisible = false"
                >
                  <input type="text" placeholder="请输入用户名" value="username" />
                  <input type="password" placeholder="请输入密码" value="password" />
                  <button @click="login">登录</button>
                </el-dialog>
              </li>
              <li>.</li>
              <li>
                <el-button type="text" @click="dialogVisible = true">注册</el-button>
              </li>
            </ul>
            <ul v-else>
              <li>
                <span class="account">{{usernameLogin}}</span>
              </li>
            </ul>
          </div>
          <!-- <div class="tooltip" v-if="tooltip">
            <span @click="tuichu">退出登录</span>
          </div>-->
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="footer">
      <div class="inn">
        <div>
          <p class="mt10">
            ©2017 · wanandroid.com · All Rights Reserved.
            <a href>皖ICP备17022096号</a>
          </p>
        </div>
        <div>
          <p>
            关于我们· 本站CDN/存储服务由
            <a href="https://www.upyun.com/">
              <img
                src="http://wanandroid.com/resources/image/sponsors/youpaiyun_logo.png"
                alt
                style="height:40px"
              />
            </a> 提供
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      dialogVisible: false,
      username: "15033539702",
      password: "wmdlxg0904984805",
      usernameLogin: "",
      value: "",
      tooltip: true
    };
  },
  methods: {
    login() {
      axios
        .post("/user/login?username=15033539702&password=wmdlxg0904984805")
        .then(res => {
          console.log(res);
          this.usernameLogin = res.data.data.username;
        });
    },
    search() {
      if (this.value.trim()) {
        console.log(111);
        axios.get(`/article/query/0/json?k=${value}`).then(res => {
          console.log(222);
          console.log(res.data);
        });
      }
    },
    tuichu() {
      axios.get("/user/logout/json").then(res => {
        console.log(res);
      });
    }
  },
  created() {
    axios
      .post("/user/login?username=15033539702&password=wmdlxg0904984805")
      .then(res => {
        // console.log(res);
        this.usernameLogin = res.data.data.username;
      });
  }
};
</script>

<style lang="scss" >
.footer a {
  font-size: 14px;
  color: #767676;
  text-decoration: underline;
}
.footer {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.01), 0 1px 5px 0 rgba(0, 0, 0, 0.01),
    0 3px 1px -2px rgba(0, 0, 0, 0.1);
}
.footer a img {
  vertical-align: middle;
}
.footer a {
  // flex-direction: row;
  // display: flex;
  // align-items: center;
}
.tooltip {
  margin: 5px;

  span {
    color: #767676;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
}
.footer p {
  font-size: 14px;

  color: #767676;
  text-align: center;
  line-height: 40px;
}
.mt10 {
  padding-top: 10px;
}
span.account {
  display: block;
  max-width: 100px;
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #276692;
}
.el-dialog input {
  display: block;
  width: 100%;
  height: 35px;
  line-height: 35px;
  margin-top: 15px;
  border: none;
  text-indent: 3px;
  outline: none;
  padding: 2px;
  border: 1px solid #adadad;
  border-radius: 4px;
  background-color: #fff;
}
input:focus {
  outline: none;
}
.header {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.01), 0 1px 5px 0 rgba(0, 0, 0, 0.01),
    0 3px 1px -2px rgba(0, 0, 0, 0.1);
  width: 100%;
  .inner {
    justify-content: space-around;
    .right {
      display: flex;
      .search_global {
        width: 220px;
        overflow: hidden;
        background-color: #fff;
        border-radius: 5px;
        margin: 14px 20px 14px 0;
        border: 1px solid #dadada;
        background-color: #fafafa;
        display: flex;
        flex-direction: row;
        input {
          display: block;
          width: 178px;
          line-height: 32px;
          border: none;
          text-indent: 5px;
          font-size: 15px;
          background-color: transparent;
        }
        span.search {
          display: block;
          width: 40px;
          cursor: pointer;
          text-align: center;
        }
        .fa {
          font-size: 15px;
          line-height: 32px;
        }
      }
    }
  }
}
.nav_login {
  margin-right: 15px;
  ul {
    display: flex;
  }
}
.nav_login > ul > li {
  line-height: 60px;
  color: #276692;
  padding: 0px 2px;
  cursor: pointer;
  font-size: 15px;
}
.inner {
  background-color: #fff;
  max-width: 1260px;
  margin: 0px auto;
  display: flex;
  .logo {
    margin: 0 20px;
    img {
      display: block;
      margin: 5px auto;
      width: 68px;
      height: 50px;
    }
  }
  .nav > ul {
    display: flex;
    li {
      a {
        display: block;
        height: 60px;
        line-height: 60px;
        padding: 0px 15px;
        cursor: pointer;
        color: #276692;
        font-size: 14px;
        text-align: center;
      }
    }
    a:hover:after,
    li.active > a:after {
      content: " ";
      display: block;
      position: relative;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 3px;
      background: #276692;
      border-radius: 10px;
    }
    a.active:after {
      background: #276692;
    }
  }
}
</style>
