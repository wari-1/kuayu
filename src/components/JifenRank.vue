<template>
  <div class="main" style="paddingTop:15px">
    <div class="e_container mt30">
      <div class="main_content_l">
        <div class="block">
          <h2 class="title">积分排行榜</h2>
          <ul class="list_article listArticle">
            <li v-for="(topic,index) in topics" :key="topic.id">
              <div style="margin: 16px auto;">
                <div>
                  <p
                    style="font-size: 14px;"
                  >{{index + 1 + ($route.params.page - 1) * 30}}.{{topic.username}}, 积分：{{topic.coinCount}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="fenye" style="margin: 16px auto;">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="30"
              :total="total"
              :current-page="Number($route.params.page)||1"
              @current-change="changePage"
            ></el-pagination>
            <span style="margin:0 5px">
              共
              <span style="color:skyblue">{{length}}</span>页
            </span>
            <span class="demonstration">
              共
              <span style="color:skyblue">{{total}}</span>条记录
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "jifenlist",
  data() {
    return {
      topics: [],
      total: 0
    };
  },
  computed: {
    length() {
      return Math.ceil(this.total / 30);
    }
  },

  watch: {
    "$route.fullPath": {
      immediate: true,
      handler() {
        console.log(this.$route);
        axios
          .get(`/api/coin/rank/${this.$route.params.page}/json`)
          .then(res => {
            console.log(res.data);
            this.topics = res.data.data.datas;
            this.total = res.data.data.total;
          });
      }
    }
  },
  methods: {
    changePage(page) {
      this.$router.push(`/coin/rank/${page}`);
      console.log(this.$route);
    }
  },
  created() {}
};
</script>
<style lang='scss'>
.fenye {
  display: flex;
  align-items: center;
  > span {
    font-size: 14px;
  }
}
</style>