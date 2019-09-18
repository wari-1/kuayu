<template>
  <div class="tree">
    <div class="e_container_full bg1F77BB shadow mt3">
      <div class="e_container">
        <div class="sort_info">
          <label for>一级分类:</label>
          <div class="list_sort">
            <ul>
              <li v-for="grade1 in grades1" :key="grade1.id">
                <a :href="`/article/list/0?cid=${grade1.children[0].id}`">{{grade1.name}}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="sort_info last">
          <label for>二级分类：</label>
          <div class="list_sort">
            <ul>
              <li v-for="grade3 in grades3" :key="grade3.id">
                <a :href="`/article/list/0?cid=${grade3.id}`">{{grade3.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="main-tree">
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
                    <span class="aauthor">
                      作者：
                      <a
                        :href="`/article/list/${article.curPage}?author=${article.author}`"
                      >{{article.author}}</a>
                    </span>
                    <span class="aniceDate">时间：{{article.niceDate}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "tree",
  data() {
    return {
      grades1: [],
      grades2: [],
      grades3: [],
      articles: [],
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
  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        const query = this.$route.query;
        const cid = query.cid ? query.cid : 60;
        axios.get("/api/tree/json").then(res => {
          this.grades1 = res.data.data;
          this.grades2 = this.grades1.map(item => {
            return {
              children: item.children
            };
          });
          console.log(this.grades2);
          this.grades3 = this.grades2.find(
            item => item.children[0].id == query.cid
          ).children;
          console.log(this.grades3);
        });
        axios.get(`/api/article/list/0/json?cid=${cid}`).then(res => {
          this.articles = res.data.data.datas.map(item => {
            return {
              ...item,
              curPage: res.data.data.curPage - 1,
              collect: false
            };
          });
        });
      }
    }
  },
  methods: {
    collect(ele) {
      if (!ele.collect) {
        axios.post(`/api/lg/collect/${ele.id}/json`).then(res => {
          this.articles.find(item => item.id == ele.id).collect = true;
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
.main-tree {
  background-color: #fff;
  padding: 10px;
}
.mt3 {
  margin-top: 3px;
}
.bg1F77BB {
  background-color: #1f77bb;
}
.shadow {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 5px 0 rgba(0, 0, 0, 0.03),
    0 3px 1px -2px rgba(0, 0, 0, 0.03);
}
.e_container_full {
  width: 100%;
  overflow: hidden;
  clear: both;
}
.e_container {
  width: 96%;
  max-width: 1200px;
  margin: 0px auto 30px;
  overflow: hidden;
  clear: both;
  margin: 5px auto;
}
.sort_info,
.sort_select_info {
  padding: 5px 10px;
  border-bottom: 1px solid #4488bb;
  display: flex;
}
.sort_info label,
.sort_select_info label {
  line-height: 28px;
  display: block;
  width: 70px;
  flex-shrink: 0;
  margin: 5px;
  color: #fff;
  font-size: 14px;
}
.sort_info .list_sort,
.sort_select_info .list_sort {
  margin-left: 80px;
  overflow: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
  }
}
.sort_info .list_sort li {
  margin: 5px;
  // height: 28px;
  display: block;
  padding: 0;
  float: left;
  line-height: 28px;

  display: list-item;
  text-align: -webkit-match-parent;
}

.sort_info .list_sort li a {
  color: #fafafa;
  cursor: pointer;
  display: block;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #1f77bb;
}
.sort_info .list_sort li a:hover {
  text-decoration: underline;
  // cursor: pointer;
  // color: #fafafa;
  // border: 1px solid #fafafa;
  // border-radius: 3px;
  // text-decoration: none;
  // margin-bottom: 1px;
}
.sort_info .list_sort li a {
  color: #fafafa;
  cursor: pointer;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #1f77bb;
}
</style>
