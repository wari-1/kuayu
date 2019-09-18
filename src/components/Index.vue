<template>
  <div class="list" v-if="articles.length&&toparticles.length">
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :data="articles"
        :options="{pullUpLoad:true}"
        @pulling-up="onPullingUp"
      >
        <ul class="list_article">
          <li v-for="article in toparticles" :key="article.id">
            <div>
              <div class="info_opt">
                <span class="collect" artid="8537" title="收藏" @click="collect(article)">
                  <i :class="article.collect?'fa fa-heart collect':'fa fa-heart'"></i>
                </span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Right Bottom 提示文字"
                  placement="right-end"
                ></el-tooltip>
              </div>
              <div class="info_art">
                <a :href="article.link">{{article.title}}</a>
                <div class="bottom">
                  <span class="istop">置顶</span>
                  <span class="fresh" v-if="article.fresh">新</span>
                  <span class="tag-ask" v-if="article.superChapterName==='问答'">
                    <a :href="`/article/list/${article.curPage}?cid=440`">问答</a>
                  </span>
                  <span class="aauthor">
                    作者：
                    <a
                      :href="`/article/list/${article.curPage}?author=${article.author}`"
                    >{{article.author}}</a>
                  </span>
                  <span class="achapter">
                    分类：
                    <a
                      :href="`/article/list/${article.curPage}?cid=${article.chapterId}`"
                    >{{article.superChapterName}}</a>
                    /
                    <a
                      :href="`/article/list/${article.curPage}?cid=${article.chapterId}`"
                    >{{article.chapterName}}</a>
                  </span>
                  <span class="aniceDate">{{article.niceDate}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul class="list_article">
          <li v-for="article in articles" :key="article.id">
            <div>
              <div class="info_opt">
                <span class="collect" artid="8537" title="收藏" @click="collect(article)">
                  <i :class="article.collect?'fa fa-heart collect':'fa fa-heart'"></i>
                </span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Right Bottom 提示文字"
                  placement="right-end"
                ></el-tooltip>
              </div>
              <div class="info_art">
                <a :href="article.link">{{article.title}}</a>
                <div class="bottom">
                  <span class="fresh" v-if="article.fresh">新</span>
                  <span class="tag-ask" v-if="article.superChapterName==='问答'">
                    <a :href="`/article/list/${article.curPage}?cid=440`">问答</a>
                  </span>
                  <span class="aauthor">
                    作者：
                    <a
                      :href="`/article/list/${article.curPage}?author=${article.author}`"
                    >{{article.author}}</a>
                  </span>
                  <span class="achapter">
                    分类：
                    <a
                      :href="`/article/list/${article.curPage}?cid=${article.chapterId}`"
                    >{{article.superChapterName}}</a>
                    /
                    <a
                      :href="`/article/list/${article.curPage}?cid=${article.chapterId}`"
                    >{{article.chapterName}}</a>
                  </span>
                  <span class="aniceDate">{{article.niceDate}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "index",
  data() {
    return {
      articles: [],
      toparticles: [],
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "Load more",
      pullUpLoadNoMoreTxt: "No more data",
      a: 0,
      newPage: []
    };
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj
      };
    }
  },
  created() {
    axios.get("/api/article/list/0/json").then(res => {
      // console.log(this.$router);
      // console.log(res.data.data.datas);
      this.articles = res.data.data.datas.map(item => {
        return { ...item, curPage: res.data.data.curPage - 1, collect: false };
      });
    });
    axios.get("/api/article/top/json").then(res => {
      // console.log(this.$router);
      // console.log(res.data);
      this.toparticles = res.data.data.map(item => {
        return { ...item, collect: false };
      });
    });
  },
  methods: {
    collect(ele) {
      if (!ele.collect && this.toparticles.find(item => item.id == ele.id)) {
        axios.post(`/api/lg/collect/${ele.id}/json`).then(res => {
          this.toparticles.find(item => item.id == ele.id).collect = true;
        });
      } else if (
        !ele.collect &&
        this.articles.find(item => item.id == ele.id)
      ) {
        axios.post(`/api/lg/collect/${ele.id}/json`).then(res => {
          this.articles.find(item => item.id == ele.id).collect = true;
        });
      } else if (
        ele.collect &&
        this.toparticles.find(item => item.id == ele.id)
      ) {
        axios.post(`/api/lg/uncollect_originId/${ele.id}/json`).then(res => {
          this.toparticles.find(item => item.id == ele.id).collect = false;
        });
      } else {
        axios.post(`/api/lg/uncollect_originId/${ele.id}/json`).then(res => {
          this.articles.find(item => item.id == ele.id).collect = false;
        });
      }
    },
    onPullingUp() {
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.a++;
          axios.get(`/api/article/list/${this.a}/json`).then(res => {
            // this.newPage = res.data.data.datas;
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
.scroll-list-wrap {
  height: 500px;
}
.list {
  width: 100%;
  display: block;
}
h4 {
  color: #000;
}
.list_article li:hover {
  background-color: rgba(0, 0, 0, 0.01);
}
.list_article li {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #e2e2e2;
}
.list_article li > div {
  width: 94%;
  margin: 22px auto;
  overflow: hidden;
  display: flex;
}
.fa-heart:hover,
.fa-heart.collect {
  color: skyblue;
}
.list_article .info_opt {
  width: 3%;
  height: 46px;
  border: 0px solid #ececec;
}
.list_article .info_opt span.collect {
  display: block;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin: 14px auto;
  font-size: 14px;
  color: darkgrey;
  // background-image: url(../../../resources/image/pc/collect_icon.svg);
  // background-image: url(../../../resources/image/pc/collect_icon.png)\9;
}
.list_article .info_art {
  width: 95%;
  display: flex;
  flex-direction: column;
  margin-left: 2%;
  .bottom {
    flex-shrink: 0;
    margin-top: 10px;
    display: flex;
    span {
      display: block;
      display: flex;
    }
    span.aauthor {
    }
  }
}
.list_article .info_art span.istop {
  color: #e24234;
  border: 1px solid #e24234;
}
.list_article .info_art > a:hover {
  color: rgb(57, 57, 236);
  text-decoration: underline;
}
.list_article .info_art span a {
  color: #484848;
  cursor: pointer;
  font-size: 12px;
  font-weight: normal;
}
.list_article .info_art p {
  margin: 0;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
.list_article .info_art a {
  cursor: pointer;
  display: block;
  color: #2e3135;
  font-weight: bold;
  font-size: 14px;
}
.list_article .info_art span {
  color: #999;
  font-size: 12px;
  margin-right: 6px;
}
.list_article .info_art span.fresh {
  color: red;
  border: 1px solid red;
}
.list_article .info_art span.tag-ask a {
  color: #009a61;
  border: 1px solid #009a61;
}
</style>
