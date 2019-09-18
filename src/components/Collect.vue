<template>
  <div class="collect">
    <div class="main">
      <div class="e_container mt30">
        <div class="main_content_l">
          <div class="block">
            <h2 class="title">收藏博文</h2>
            <ul class="list_article listArticle">
              <li v-for="article in articles" :key="article.id">
                <div>
                  <div class="info_art">
                    <p>
                      <a :href="article.link">{{article.title}}</a>
                    </p>
                    <div class="aauthor">
                      <span>作者：{{article.author}}</span>
                      <span>分类：{{article.chapterName}}</span>
                      <span>收藏时间：{{article.niceDate}}</span>
                    </div>
                  </div>
                  <div class="info_opt">
                    <span class="uncollect" @click="cancelCollect(article.id)">取消收藏</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="pag">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="20"
                :total="31"
                :current-page="page||1"
                @current-change="changePage"
              ></el-pagination>
              <span>
                共
                <span>31</span>条记录
              </span>
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
  name: "collect",
  data() {
    return {
      articles: [],
      page: 0
    };
  },

  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        const path =
          this.$route.fullPath === "/lg/collect"
            ? 0
            : Number(this.$route.fullPath.replace("/lg/collect/", "")) - 1;

        axios.get(`/api/lg/collect/list/${path}/json`).then(res => {
          console.log(res.data);
          this.articles = res.data.data.datas;
          this.page = res.data.data.curPage;
          console.log(this.$route);
        });
      }
    }
  },
  created() {},
  methods: {
    changePage(page) {
      this.$router.push(`/lg/collect/${page}`);
      console.log(Number(this.$route.fullPath.replace("/lg/collect/", "")) - 1);
    },
    cancelCollect(id) {
      axios.post(`/api/lg/uncollect/${id}/json`);
      this.articles = this.articles.filter(item => item.id != id);
    }
  }
};
</script>

<style lang='scss'>
.main {
  padding: 15px 0;
}
.pag {
  margin: 10px 0;
}

span.uncollect:hover {
  cursor: pointer;
}
.collect .list_article .info_opt {
  float: right;
  width: 10%;
  text-align: right;
  display: none;
}
.list_article .info_opt span.uncollect {
  display: inline-block;
  font-size: 13px;
  margin-top: 15px;
  cursor: pointer;
  color: #767676;
  &:hover {
    color: skyblue;
  }
}
.collect .list_article li:hover .info_opt {
  display: block;
}
.collect .aauthor {
  display: flex;
}
.collect .list_article .info_opt {
  float: right;
  width: 10%;
  text-align: right;
  display: none;
}
.list_article .info_opt span.uncollect {
  display: inline-block;
  font-size: 13px;
  margin-top: 15px;
  cursor: pointer;
  color: #767676;
}
</style>
