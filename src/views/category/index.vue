<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem :to="{ path: '/' }">首页</XtxBreadItem>
        <!-- <XtxBreadItem :to="{ path: 'category/1005000' }">电器</XtxBreadItem> -->
        <Transition name="fade-right">
          <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in topCategory.children" :key="i.id">
            <a href="javascript:;">
              <img :src="i.picture">
              <p>{{ i.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import GoodsItem from './components/goods-item'
export default {
  name: 'TopCategory',
  components: { GoodsItem },
  setup() {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })

    // 面包屑 + 子分类
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => { //根据路由的id，在category的list里找到当前项
      let cate = {}
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      if (item) cate = item
      return cate
    })

    // 获取各个子类目下的推荐商品
    const subList = ref([])
    const getSubList = () => {//拿着当前项去找二级类目的商品goods，
      findTopCategory(route.params.id).then(data => {//这个函数是单个一级类别的所有详细信息
        subList.value = data.result.children
      })
    }
    console.log(subList.value);
    // 监听路由变化
    watch(() => route.params.id, (newValue) => {
      // newValue && getSubList()
      // console.log('123123');//写成这个样子的话当路由变化到二级路由，即/category/sub/:id时也会触发一次，造成额外额资源请求，所以加上等于所要求的路径匹配才发送请求
      if (newValue && `/category/${newValue}` === route.path) getSubList()
    }, { immediate: true })
    return { sliders, subList, topCategory }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}

.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;

  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }

  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
