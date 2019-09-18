<template>
  <div class="main">
    <div class="inner" style="height:80vh">
      <div class="main_content_l" style="width:70%">
        <div class="block" style="marginTop:30px">
          <h2 class="title" style="color:red">
            <span>积分获取列表</span>
          </h2>
          <ul class="list_article listArticle">
            <li v-for="list in jifenList" :key="list.id">
              <div>
                <p>{{list.desc}}</p>
              </div>
            </li>
          </ul>
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
      jifenList: []
    };
  },
  created() {
    axios.get("/api//lg/coin/list/1/json").then(res => {
      this.jifenList = res.data.data.datas;
    });
  }
};
</script>
<style >
.list_article li {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #e2e2e2;
}
.list_article li > div {
  width: 94%;
  margin: 22px auto;
  overflow: hidden;
}
</style>