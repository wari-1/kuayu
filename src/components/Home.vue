<template>
  <div class="main">
    <div class="inner" style="display:flex">
      <div class="main_content_l">
        <div class="main1">
          <div class="inner">
            <div class="swiper" v-if="banners.length">
              <!-- swiper -->
              <swiper
                :options="swiperOption1"
                class="mySwiper-1"
                style="margin-right:220px;margin-bottom:20px"
              >
                <swiper-slide>
                  <a :href="banners[0].url">
                    <img :src="banners[0].imagePath" alt />
                    <p class="stitle">{{banners[0].title}}</p>
                  </a>
                </swiper-slide>
                <swiper-slide>
                  <a :href="banners[0].url">
                    <img :src="banners[0].imagePath" alt />
                    <p class="stitle">{{banners[0].title}}</p>
                  </a>
                </swiper-slide>
                <swiper-slide>
                  <a :href="banners[0].url">
                    <img :src="banners[0].imagePath" alt />
                    <p class="stitle">{{banners[0].title}}</p>
                  </a>
                </swiper-slide>
                <swiper-slide>
                  <a :href="banners[0].url">
                    <img :src="banners[0].imagePath" alt />
                    <p class="stitle">{{banners[0].title}}</p>
                  </a>
                </swiper-slide>

                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>

              <!-- swiper -->
              <!-- <swiper :options="swiperOption2" class="mySwiper-2">
                <swiper-slide>
                  <a :href="banners[1].url">
                    <img :src="banners[1].imagePath" alt />
                    
                  </a>
                </swiper-slide>
                <swiper-slide>
                  <a :href="banners[2].url">
                    <img :src="banners[2].imagePath" alt />
                    
                  </a>
                </swiper-slide>
                <swiper-slide>
                  <a :href="banners[3].url">
                    <img :src="banners[3].imagePath" alt />
                    
                  </a>
                </swiper-slide>

                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>-->
            </div>
          </div>
        </div>
        <div class="main2">
          <div class="inner">
            <div class="title">
              <ul class="childnav">
                <li>
                  <router-link
                    to="/index"
                    :class="$route.fullPath==='/'||$route.fullPath==='/index'?'active':''"
                    :exact="true"
                  >最新博文</router-link>
                </li>
                <li>
                  <router-link to="/pindex" active-class="active" :exact="true">最新项目</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="main3">
          <div class="inner">
            <router-view></router-view>
          </div>
        </div>
      </div>
      <div class="fixed_content_r fixedBlock">
        <div class="block mt20">
          <h2 class="title">
            <span>个人信息</span>
          </h2>
          <ul class="lead_list">
            <li>
              <router-link to="/lg/coin/list/1">
                本站积分：
                <span style="color: red;">{{coinCount}}</span>
                <span
                  style="color: white;background-color:#009a61;margin-left: 8px;padding-left: 3px;padding-right: 3px;"
                >LV1</span>
                <span
                  style="color: white;background-color:#1b93fb;margin-left: 8px;padding-left: 3px;padding-right: 3px;"
                >排名{{rank}}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/coin/rank/1">积分排行榜</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../swiper/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import axios from "axios";
export default {
  name: "home",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      banners: [],
      swiperOption1: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        width: 578,
        height: 280,
        direction: "horizontal", // 水平切换选项
        loop: true
      },

      coinCount: 0,
      rank: 0
    };
  },

  created() {
    axios.get("/api/banner/json").then(res => {
      // console.log(res.data.data);
      this.banners = res.data.data;
    });
    axios.get("/api/lg/coin/userinfo/json").then(res => {
      this.coinCount = res.data.data.coinCount;
      this.rank = res.data.data.rank;
    });
  }
};
</script>

<style lang="scss">
.lead_list {
  padding: 10px;
  overflow: hidden;
}
.lead_list li:before {
  content: "";
  float: left;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  margin-top: 12px;
  background-color: rgb(52, 152, 219);
  border-radius: 50%;
}
.lead_list li {
  display: block;
  margin: 0px 8px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lead_list li a {
  color: #767676;
  cursor: pointer;
  font-size: 14px;
  display: flex;
}

.main {
  background-color: #f0f0f0;
  > .inner {
    width: 94%;
    margin: 0 auto;
    background-color: #f4f4f4;
  }
}
.main_content_l {
  box-sizing: border-box;
  flex-shrink: 0;
}
.fixed_content_r {
  margin-left: 30px;
  float: right;
  width: 300px;
  margin: 0px auto;
}

.main2 {
  margin-top: 30px;
}
.main1 {
  margin-top: 30px;
}
.main1,
.main2,
.main3 {
  > .inner {
    width: 100%;
    max-width: 1200px;
    margin: 0px auto 30px;
    overflow: hidden;
    padding-top: 30px;
    border-radius: 5px;
    background-color: #fff;
  }
}
.main2,
.main3 {
  > .inner {
    padding-top: 0;
    margin-bottom: 0;
  }
}
.title {
  border-bottom: 2px solid #8db5d0;
  font-size: 16px;
  font-weight: normal;
  color: #333;
  text-indent: 10px;
  height: 40px;
  line-height: 40px;
  text-overflow: ellipsis;
  width: 100% !important;
  ul.childnav {
    width: 100%;
    display: flex;

    a {
      line-height: 40px;
      font-size: 16px;
    }
  }
}
.title a.active {
  color: #276692;
}
.title a {
  color: #333;
  font-weight: normal;
  text-decoration: none;
}

.swiper {
  display: flex;
  margin-left: 30px;
}
.swiper-container {
  margin: 0 auto;
  width: 578.547px;
  position: relative;
  overflow: hidden;
  direction: ltr;
}
.swiper-wrapper {
  width: 1735.64px;
  height: 280px;
  transform: translate3d(-578.547px, 0px, 0px);
  transition-duration: 0s;
  position: relative;
  display: flex;
}
.main .block {
  background-color: #fff;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.main .mt20 {
  margin-top: 30px;
}
.swiper-slide {
  width: 578px;
  height: 280px;
  a {
    display: block;
  }
  .stitle {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    color: #fff;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  img {
    width: 100%;
  }
}
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 40%;
  color: #fff;
  font-size: 30px;
  z-index: 5;
  font-size: 30px;

  cursor: pointer;
}

.mySwiper-2 {
  width: 200px;
  .swiper-wrapper {
    width: 200px;
  }
  img {
    width: 200px;
    height: 1.4px;
  }
  .swiper-button-prev {
    transform: rotate(-90deg);

    top: 5px;
    left: 40%;
  }
  .swiper-button-next {
    transform: rotate(-90deg);
    bottom: 5px;

    left: 40%;
  }
}
</style>
