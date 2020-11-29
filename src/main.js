import Vue from 'vue'
import App from './App.vue'
import router from './router'
import XEUtils from 'xe-utils'

import enUS from 'vxe-table/lib/locale/lang/en-US';
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)
VXETable.setup({
  i18n: (key) => XEUtils.get(enUS, key)
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
