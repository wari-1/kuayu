<template>
  <div>
    <div class="navi">
      <div class="e_container mt30">
        <div class="block">
          <div class="navi_search">
            <div class="navi_module">
              <div class="search_tab searchTab">
                <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
                <div class="search_tab">
                  <input type="text" placeholder="请输入搜索内容" class="normal_input" />
                  <span class="btn">搜索</span>
                </div>
              </div>
            </div>
          </div>
          <div class="navi_content" style="display:flex">
            <div class="area_l" style="marginRight:30px">
              <ul class="tab_list area">
                <li v-for="navi in navis" :key="navi.cid">
                  <a
                    :href="navi.cid===navis[0].cid?'/navi/#10086':`/navi/#${navi.cid}`"
                    :class="navi.cid===navis[0].cid&&$route.fullPath==='/navi/#10086'?'active1':$route.fullPath===`/navi/#${navi.cid}`?'active':navi.cid===navis[0].cid&&$route.fullPath==='/navi'?'active2':''"
                  >{{navi.name}}</a>
                </li>
              </ul>
            </div>
            <div class="area_r">
              <div class="area navi_div" v-for="navi in navis" :key="navi.cid">
                <h3 :id="`${navi.cid}`">{{navi.name}}</h3>
                <ul class="list_navi listNavi">
                  <li v-for="article in navi.articles" :key="article.id">
                    <a :href="`${article.link}`">{{article.title}}</a>
                  </li>
                </ul>
              </div>
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
  name: "navi",
  data() {
    return {
      navis: []
    };
  },
  created() {
    axios.get("/navi/json").then(res => {
      this.navis = res.data.data;
    });
  }
};
</script>

<style lang="scss">
.navi_div h3 {
  width: 96%;
  height: 40px;
  line-height: 40px;
  margin: 0px auto;
  color: rgb(230, 76, 59);
}
.list_navi {
  overflow: hidden;
  margin: 10px 0;
}
.list_navi li {
  float: left;
  width: 20%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 5px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list_navi li a {
  color: #3482df;
  cursor: pointer;
  font-size: 15px;
}
.list_navi li a:hover {
  text-decoration: underline;
}
.tab_list {
  overflow: hidden;
  margin: 0px auto;
  display: block;
  width: 100px;
}
.area {
  border: 1px solid #dbe2e8;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(46, 61, 73, 0.08);
  margin: 0 0 20px;
}
.tab_list li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-bottom: 1px solid #dbe2e8;
}
.navi_content {
  overflow: hidden;
  padding: 0 30px;
  padding-top: 30px;
  clear: both;
}
.tab_list li a {
  color: #333;
  cursor: pointer;
  font-size: 15px;
}
.tab_list li a.active {
  color: #2782ef;
}
.tab_list li a.active1 {
  color: #2782ef;
}
.tab_list li a.active2 {
  color: #2782ef;
}
.tab_list li a:hover {
  color: #2782ef;
}
.navi {
  .searchTab {
    margin-left: 200px;
    align-items: center;
    display: flex;
  }
  .search_tab {
    align-items: center;
    display: flex;
  }
  .navi_search {
    img {
      width: 100px;
      height: 33px;
      margin-right: 10px;
    }
  }
}
</style>
