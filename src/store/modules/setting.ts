import { defineStore } from "pinia";
import { ref } from "vue"

const useLayoutSettingStore = defineStore("settingStore", () => {
  //菜单是否展开
  let isCollapse = ref<boolean>(false)
  //页面刷新
  let refresh = ref<boolean>(false)
  return {isCollapse, refresh}
});
export default useLayoutSettingStore
