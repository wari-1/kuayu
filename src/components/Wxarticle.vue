<template>
  <div>
    <div class="wxarticle">
      <div class="e_container mt30">
        <div class="block">
          <div class="wx-top">
            <div class="navi_search">
              <div class="area_r">
                <div class="explain">
                  <blockquote>
                    为保障号主利益，更新文章有一定的延迟（仅录入技术类），且所有数据都对外提供了
                    <a
                      href="https://www.wanandroid.com/blog/show/2"
                    >开放 API</a>
                    ，方便大家做app，小程序等。
                  </blockquote>
                </div>

                <div class="navi_module">
                  <div class="search_tab">
                    <input type="text" class="normal_input" />
                    <span class="btn">搜索</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="navi-content">
            <div class="area_l">
              <ul class="tab_list_wx tabListWX">
                <li v-for="wxlist in wxlists" :key="wxlist.id">
                  <i class="fa fa-star-o"></i>
                  <a
                    :href="`/wxarticle/list/${wxlist.id}`"
                    :class="$route.path===`/wxarticle/list/${wxlist.id}`?'active':''"
                  >{{wxlist.name}}</a>
                </li>
              </ul>
            </div>
            <div class="area_r">
              <div class="scroll-list-wrap">
                <cube-scroll
                  ref="scroll"
                  :data="articles"
                  :options="{pullUpLoad:true}"
                  @pulling-up="onPullingUp"
                >
                  <ul class="list_article">
                    <li v-for="article in articles" :key="article.id">
                      <div>
                        <div class="info_opt">
                          <span class="collect" artid="8537" title="收藏" @click="collect(article)">
                            <i :class="article.collect?'fa fa-heart collect':'fa fa-heart'"></i>
                          </span>
                        </div>
                        <div class="info_art">
                          <a :href="article.link">{{article.title}}</a>
                          <div class="bottom">
                            <span class="aniceDate">时间：{{article.niceDate}}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </cube-scroll>
              </div>
              <ul class="list_article listArticle"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "wxarticle",
  data() {
    return {
      wxlists: [],
      articles: [],
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "Load more",
      pullUpLoadNoMoreTxt: "No more data",
      a: 1,
      newPage: []
    };
  },
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        const path = this.$route.path.replace("/wxarticle/list/", "");
        const fullPath = path.slice(0, 3);
        axios.get(`/wxarticle/list/${fullPath}/1/json`).then(res => {
          this.articles = res.data.data.datas.map(item => {
            return { ...item, curPage: res.data.data.curPage, collect: false };
          });
        });
      }
    }
  },
  created() {
    axios.get("/wxarticle/chapters/json").then(res => {
      this.wxlists = res.data.data;
      console.log(this.$route);
    });
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj
      };
    }
  },
  methods: {
    collect(ele) {
      if (!ele.collect) {
        axios.post(`/lg/collect/${ele.id}/json`).then(res => {
          this.articles.find(item => item.id == ele.id).collect = true;
        });
      } else {
        axios.post(`/lg/uncollect_originId/${ele.id}/json`).then(res => {
          this.articles.find(item => item.id == ele.id).collect = false;
        });
      }
    },
    onPullingUp() {
      const path = this.$route.path.replace("/wxarticle/list/", "");
      const fullPath = path.slice(0, 3);
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.a++;
          axios.get(`/wxarticle/list/${fullPath}/${this.a}/json`).then(res => {
            this.newPage = res.data.data.datas.map(item => {
              return {
                ...item,
                curPage: res.data.data.curPage - 1,
                collect: false
              };
            });
          });
          this.articles = this.articles.concat(this.newPage);
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.wxarticle,
.navi {
  background-color: #ccc;
  padding: 10px;
}
.block {
  background-color: #fff;
  overflow: hidden;

  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  .navi_search {
    padding: 30px 30px 40px 30px;
  }
}
.area_r {
  width: 70%;
  float: right;
}
.explain {
  overflow: hidden;
  clear: both;

  margin: 0;
  margin-bottom: 30px;
}
.explain blockquote {
  width: 90%;
  float: left;
  clear: both;
}
.explain blockquote {
  font-size: 14px;
  color: #767676;
  border-left: 3px solid #cdcdcd;
  background-color: #f8f8f8;
  padding: 10px 1% 10px 1%;
}
.explain blockquote a {
  color: #3482df;
}
.navi_search .navi_module {
  width: 90%;
  margin: 0;
}
.search_tab {
  float: left;
  position: relative;
}
.navi_module .normal_input {
  float: left;
  width: 380px;
  height: 33px;
  line-height: 33px;
  border-radius: 0px;
  padding: 0 3px;
  border: 1px solid #adadad;
}
.navi_module .btn {
  float: right;
  width: 100px;
  margin-left: -1px;
  background-color: #3498db;
  border-radius: 0px;
  letter-spacing: 2px;
  display: inline-block;
  line-height: 33px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}
.navi-content {
  overflow: hidden;
  padding: 0 30px;
  padding-top: 30px;
  clear: both;
  display: flex;
  .area_l {
    width: 22%;
    li {
      display: flex;
      padding-left: 20px;
      align-items: center;
      i {
        margin-right: 20px;
        color: #dbe2e8;
      }
    }
  }
}
.tab_list_wx a {
  width: 120px;
  height: 40px;
  line-height: 40px;
  color: #484848;
  font-size: 16px;
  border-bottom: 1px solid #dbe2e8;
  cursor: pointer;
  padding: 0 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tab_list_wx a:hover,
.tab_list_wx a.active {
  border-bottom: 1px solid #2782ef;
  color: #2782ef;
}
</style>
