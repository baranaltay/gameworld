import Vue from 'vue'
import Router from 'vue-router'
import DataTable from '@/components/DataTable'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'DataTable',
			component: DataTable
		}
	]
})
