<template>
  <div class="project">
    <div class="e_container mt30">
      <div class="block">
        <div class="navi_content" style="display:flex">
          <div class="area_l" style="marginRight:30px">
            <ul class="tab_list area" style="width:120px">
              <li v-for="navi in navis" :key="navi.id">
                <router-link
                  :to="`/project/list/1?cid=${navi.id}`"
                  :class="$route.query.cid==navi.id?'active':''"
                >{{navi.name}}</router-link>
              </li>
            </ul>
          </div>
          <div class="area_r">
            <div class="project_list listArticle">
              <ul v-if="boxs.length">
                <li
                  v-for="(box,index) in boxs"
                  :key="index"
                  :class="left<=index&&right>=index?'area':'none area'"
                >
                  <div class="project_elem">
                    <div class="project_elem_img">
                      <a :href="box.link">
                        <img :src="box.envelopePic" alt />
                      </a>
                    </div>
                    <div class="project_elem_info" style="marginLeft:5px">
                      <h3>
                        <a :href="box.projectLink">{{box.title}}</a>
                      </h3>
                      <div class="desc">
                        <p>{{box.desc}}</p>
                      </div>
                      <p class="note">
                        <span>{{box.niceDate}}</span>
                        <span style="marginLeft:10px">{{box.author}}</span>
                        <span class="collect" artid="8537" title="收藏" @click="collect(box)">
                          <i :class="box.collect?'fa fa-heart collect':'fa fa-heart'"></i>
                        </span>
                        <!-- <el-tooltip
                          class="item"
                          effect="dark"
                          content="Right Bottom 提示文字"
                          placement="right-end"
                        >
                          <el-button>{{box.collect?'取消收藏':'收藏'}}</el-button>
                        </el-tooltip>-->
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-else class="nothing">
                <img src="../assets/no.png" alt />
                <p>赞无项目~~</p>
              </div>
            </div>
            <div class="pag">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="6"
                :total="totalNum"
                :current-page="Number($route.params.page)||1"
                @current-change="changePage"
              ></el-pagination>
              <span>
                共
                <span>{{totalNum}}</span>条记录
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
  name: "project",
  data() {
    return {
      navis: [],
      boxs: [],
      cids: [],
      axiosNum: 1,
      newArr: [],
      total: [
        156,
        45,
        24,
        20,
        16,
        76,
        11,
        7,
        2,
        2,
        3,
        6,
        6,
        2,
        45,
        8,
        9,
        0,
        3,
        29,
        7,
        1,
        3,
        5,
        7,
        1
      ],
      totalNum: 0
    };
  },
  computed: {
    // axiosNum() {
    //   const cid = this.$route.query.cid ? this.$route.query.cid : 294;
    //   if (
    //     axios
    //       .get(`/api/project/list/1/json?cid=${cid}&page=${axiosNum + 1}`)
    //       .then(res => {})
    //   ) {
    //   }
    // }
    // totalNum() {
    //   const cid = this.$route.query.cid ? this.$route.query.cid : 294;
    //   return this.navis.find(item => item.cid === cid).total;
    // }
    left() {
      return (Number(this.$route.params.page) - 1) * 6;
    },
    right() {
      return Number(this.$route.params.page) * 6 - 1;
    }
  },
  watch: {
    "$route.query.cid": {
      immediate: true,
      handler() {
        axios.get("/api/project/tree/json").then(res => {
          this.navis = res.data.data;
          // console.log(res.data.data);
          this.cids = res.data.data.map(item => item.id);
          for (let i = 0; i < this.navis.length; i++) {
            this.navis[i] = { ...this.navis[i], total: this.total[i] };
          }
          const cid = this.$route.query.cid ? this.$route.query.cid : 294;
          // console.log(this.navis.find(item => item.id == cid));
          // const page = this.$route.params.page ? this.$route.params.page : 1;

          this.totalNum =
            this.navis.find(item => item.id == cid).total && this.navis.length
              ? this.navis.find(item => item.id == cid).total
              : 0;
          const cishu = Math.ceil(this.totalNum / 15);

          const tasks = [];
          console.log(cishu);
          for (let i = 0; i < cishu; i++) {
            const promise = axios.get(`/api/project/list/${i}/json?cid=${cid}`);
            // .then(res => {
            //   this.boxs = this.boxs.concat(res.data.data.datas);
            // });
            tasks.push(promise);
          }
          Promise.all(tasks).then(res => {
            console.log(res);
            const result = res.reduce(
              (res1, item) => [...res1, ...item.data.data.datas],
              []
            );
            console.log(result);
            this.boxs = result.map(ele => {
              return { ...ele, collect: false };
            });
          });
        });
      }
    }
  },
  created() {
    // axios.get("/api/project/tree/json").then(res => {
    //   this.navis = res.data.data;
    //   // console.log(res.data.data);
    //   this.cids = res.data.data.map(item => item.id);
    //   for (let i = 0; i < this.navis.length; i++) {
    //     this.navis[i] = { ...this.navis[i], total: this.total[i] };
    //   }
    // const cid = this.$route.query.cid ? this.$route.query.cid : 294;
    // // console.log(this.navis.find(item => item.id == cid));
    // // const page = this.$route.params.page ? this.$route.params.page : 1;
    // this.totalNum = this.navis.find(item => item.id == cid).total;
    // const cishu = Math.ceil(this.totalNum / 15);

    // const tasks = [];
    // console.log(cishu);
    // for (let i = 0; i < cishu; i++) {
    //   const promise = axios.get(`/api/project/list/${i}/json?cid=${cid}`);
    //   // .then(res => {
    //   //   this.boxs = this.boxs.concat(res.data.data.datas);
    //   // });
    //   tasks.push(promise);
    // }
    // Promise.all(tasks).then(res => {
    //   console.log(res);
    //   const result = res.reduce(
    //     (res1, item) => [...res1, ...item.data.data.datas],
    //     []
    //   );
    //   console.log(result);
    //   this.boxs = result;
    // });

    // const arr = tasks.map(item =>
    //   axios.get(`/api/project/list/${item}/json?cid=${cid}`).then(res => {
    //     this.boxs = this.boxs.concat(res.data.data.datas);
    //   })
    // );
    // Promise.all(arr).then(res => {
    //   console.log(res);
    // });
    // console.log(this.navis);

    console.log(this.left);
    console.log(this.right);
  },
  methods: {
    collect(ele) {
      if (!ele.collect) {
        axios.post(`/api/lg/collect/${ele.id}/json`).then(res => {
          this.boxs.find(item => item.id == ele.id).collect = true;
        });
      } else {
        axios.post(`/api/lg/uncollect_originId/${ele.id}/json`).then(res => {
          this.boxs.find(item => item.id == ele.id).collect = false;
        });
      }
    },
    changePage(page) {
      this.$router.push(`/project/list/${page}?cid=${this.$route.query.cid}`);
      console.log(this.$route);
    }
  }
};
</script>

<style lang='scss'>
.pag {
  display: flex;
  > span {
    display: flex;
    align-items: center;
    margin: 0 5px;
    span {
      color: #2782ef;
    }
  }
}
.fa-heart:hover,
.fa-heart.collect {
  color: skyblue;
}
.nothing {
  width: 100%;
  height: 150px;
  padding: 40px 0px;
  text-align: center;
  img {
    height: 100%;
    margin: 0 auto;
  }
}

.project_list ul {
  width: 100%;
  overflow: hidden;
}
.tab_list li:hover a,
.tab_list a.active {
  color: #2782ef;
}
.area_r .project_list ul li {
  height: 190px;
  float: left;
  width: 48%;
  margin-right: 2%;
  padding: 5px;
}
.area_r .area.none {
  display: none;
}
.area_r .project_elem {
  height: 170px;
}
.project_elem .project_elem_img {
  float: left;
  width: 30%;
  height: 100%;
  margin-left: 5px;
}
.project_elem .project_elem_img img {
  width: 100%;
  height: 100%;
}
.project_elem .project_elem_info {
  width: 65%;
  float: right;
  height: 100%;
  color: #767676;
  position: relative;
}
.project_elem .project_elem_info h3 {
  width: 100%;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.project_elem .project_elem_info h3 a {
  color: #333;
  cursor: pointer;
}
.project .project_elem .project_elem_info .desc {
  width: 100%;
  height: 80px;
  line-height: 20px;
  font-size: 14px;
  overflow: hidden;
}
.project_elem .project_elem_info .note {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: absolute;
  left: 0;
  bottom: 0;
}
.project_elem .project_elem_info .note span {
  font-size: 14px;
  color: #767676;
}
.note .collect {
  display: block;
  height: 20px;
  width: 20px;
  cursor: pointer;
  float: right;
  margin-top: 5px;
  margin-right: 10px;
  i {
    color: #ccc;
  }
  i:hover,
  i.collect {
    color: skyblue;
  }
}
</style>
