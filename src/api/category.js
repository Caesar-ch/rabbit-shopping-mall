// 定义分类相关的api
import request from "@/utils/request";

// 获取所有分类  //在app-header-nav里使用这里的数据进行渲染
export const findAllCategory = () => {
  return request("/home/category/head", "get");
};

// 顶级类目信息
export const findTopCategory = (id) => {
  //这个函数是单个一级类别的所有详细信息，因为上面的api里请求到的data.children里的每一项的goods为空，不全，这个api请求到这个数据的children的goods是全的
  return request("/category", "get", { id });
};

// 获取二级类目的筛选条件数据
export const findSubCategoryFilter = (id) => {
  return request("/category/sub/filter", "get", { id });
};

// 获取更多分类下的商品 (带筛选条件)
export const findSubCategoryGoods = (params) => {
  return request("/category/goods/temporary", "post", params);
};
