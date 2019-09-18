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
          <li v-for="article in articles" :key="article.id">
            <img :src="article.envelopePic" :alt="article.title" class="full_img" />
            <div class="project_elem">
              <div class="info_opt">
                <span class="collect" artid="8537" title="收藏" @click="collect(article)">
                  <i :class="article.collect?'fa fa-heart collect':'fa fa-heart'"></i>
                </span>
              </div>
              <div class="project_elem_info">
                <a :href="article.link">{{article.title}}</a>
                <p class="desc">{{article.desc}}</p>
                <div class="bottom">
                  <span class="fresh" v-if="article.fresh">新</span>
                  <span class="aniceDate">{{article.niceDate}}</span>
                  <span class="aauthor">
                    <a
                      :href="`/article/listproject/${article.curPage}?author=${article.author}`"
                    >{{article.author}}</a>
                  </span>
                  <a :href="`/project/list/${article.curPage}?cid=${article.chapterId}`">查看同类项目</a>
                </div>
              </div>
              <a :href="article.link" class="project_elem_img projectEleImg">
                <img :src="article.envelopePic" :alt="article.title" />
              </a>
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
  name: "pindex",
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
    axios.get("/api/article/listproject/0/json").then(res => {
      // console.log(this.$router);
      console.log(res.data.data.datas);
      this.articles = res.data.data.datas.map(item => {
        return { ...item, curPage: res.data.data.curPage - 1, collect: false };
      });
    });
    axios.get("/api/article/top/json").then(res => {
      // console.log(this.$router);
      // console.log(res.data);
      this.toparticles = res.data.data;
    });
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
          axios.get(`/api/article/listproject/${this.a}/json`).then(res => {
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
.list_article .project_elem_img {
  position: absolute;
  width: 27%;
  top: 50%;
  height: 78px;
  right: 0;
  overflow: hidden;
  margin-top: -39px;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
  z-index: 5;
  img {
    width: 100%;
  }
}
.list_article li .full_img {
  display: none;
  width: 27%;
  position: absolute;
  right: 0;
  margin-right: 20px;
  z-index: 9999;
  border: 1px solid #dedede;
  border-radius: 3px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.list_article li .full_img:hover {
  display: inline;
}
// .list_article .project_elem_img img {
//   width: 100%;
//   border: none;
//   position: absolute;
//   top: 0;
//   left: 0;
// }
.scroll-list-wrap {
  height: 500px;
}
.list {
  width: 100%;
  display: block;
}
h4 {
  font-size: 18px;
}
.list_article li:hover {
  background-color: rgba(0, 0, 0, 0.01);
}
.list_article li {
  width: 100%;
  position: relative;
  border-bottom: 1px solid #e2e2e2;
}
.list_article li > .project_elem {
  width: 94%;
  margin: 22px auto;

  display: flex;
  position: relative;
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
.list_article .project_elem_info {
  width: 66%;
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
  }
  .desc {
    font-size: 14px;
    color: #545c63;
    line-height: 20px;
    margin: 10px 0;
    word-wrap: break-word;
    word-break: break-all;
    display: block;
  }
  .bottom > a:hover {
    color: rgb(57, 57, 236);
    text-decoration: underline;
  }
}
.list_article .project_elem_info span.istop {
  color: #e24234;
  border: 1px solid #e24234;
}
.list_article .project_elem_info > a:hover {
  color: rgb(57, 57, 236);
  text-decoration: underline;
}
.list_article .project_elem_info span a,
.list_article .project_elem_info .bottom > a {
  color: #484848;
  cursor: pointer;
  font-size: 12px;
  font-weight: normal;
}
.list_article .project_elem_info p {
  margin: 0;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
.list_article .project_elem_info > a {
  cursor: pointer;
  display: block;
  color: #2e3135;
  font-weight: bold;
  font-size: 16px;
}
.list_article .project_elem_info span {
  color: #999;
  font-size: 12px;
  margin-right: 6px;
}
.list_article .project_elem_info span.fresh {
  color: red;
  border: 1px solid red;
}
.list_article .project_elem_info span.tag-ask a {
  color: #009a61;
  border: 1px solid #009a61;
}
</style>


