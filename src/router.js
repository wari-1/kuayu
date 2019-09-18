import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Home.vue";
import Project from "./components/Project.vue";
import Navi from "./components/Navi.vue";
import Projectindex from "./components/Projectindex.vue";
import Wxarticle from "./components/Wxarticle.vue";
import Tree from "./components/Tree.vue";
import Collect from "./components/Collect.vue";
import Index from "./components/Index.vue";
import Pindex from "./components/Pindex.vue";
import JifenList from "./components/JifenList.vue";
import JifenRank from "./components/JifenRank.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      component: Home,
      path: "/",
      children: [
        {
          component: Index,
          path: "/index"
        },
        {
          component: Index,
          path: "/"
        },
        {
          component: Pindex,
          path: "/pindex"
        }
      ]
    },
    {
      component: Projectindex,
      path: "/projectindex"
    },
    {
      component: Tree,
      path: "/tree"
    },
    {
      component: Tree,
      path: "/article/list/:curPage"
    },
    {
      component: Wxarticle,
      path: "/wxarticle/list/:fullPath"
    },
    {
      component: Navi,
      path: "/navi"
    },
    {
      component: Project,
      path: "/project"
    },
    {
      component: Project,
      path: "/project/list/:page"
    },

    {
      component: Collect,
      path: "/lg/collect"
    },
    {
      component: Collect,
      path: "/lg/collect/:path"
    },
    {
      component: JifenList,
      path: "/lg/coin/list/1"
    },
    {
      component: JifenRank,
      path: "/coin/rank/:page"
    }
  ],
  mode: "hash"
});
export default router;
