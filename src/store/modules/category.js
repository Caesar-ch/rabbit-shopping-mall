// 分类
import { topCategory } from "@/api/constants";
import { findAllCategory } from "@/api/category";
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息，默认数据依赖于topCategory(默认数据是为了加载时数据不为空白)
      list: topCategory.map((item) => ({ name: item })),
    };
  },
  // 修改分类函数
  mutations: {
    setList(state, payload) {
      state.list = payload;
    },
    // show与hide的函数，控制当前分类的二级分类显示隐藏//弹层，app-header-nav里的弹层展示。点击时也应该关闭
    show(state, id) {
      const currCategory = state.list.find((item) => item.id === id);
      currCategory.open = true;
    },
    hide(state, id) {
      const currCategory = state.list.find((item) => item.id === id);
      currCategory.open = false;
    },
  },
  // 获取分类函数
  actions: {
    async getList({ commit }) {
      const data = await findAllCategory();
      //拿到数据后进行添加属性open用于点击时，改变这个属性控制显隐
      data.result.forEach((item) => {
        item.open = false;
      });
      //保存数据
      commit("setList", data.result);
    },
  },
};
