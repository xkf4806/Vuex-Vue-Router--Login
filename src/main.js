import Vue from 'vue'
import store from './vuex/store'
import Login from './components/Login'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './router/routes'
import App from './App'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
	routes
})
// 全局导航钩子，用于拦截路由变化
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		// console.log(isEmptyObject(store.state.user)) 
		if (!isEmptyObject(store.state.user)) {
			next();
		}
		else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	}
	else {
		next();
	}
})

//判断object是否为空
function isEmptyObject(obj) {
	for (var key in obj) {
		return false;
	}
	return true;
}

new Vue({
	store,
	router,
	el: '#app',
	render: h => h(App)
})
