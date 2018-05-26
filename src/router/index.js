import Vue from 'vue'
import Router from 'vue-router'


import handout from '../views/handout'
import kledgetree from '../views/kledgeTree'
import navtop from '../components/navTop'

Vue.use(Router)


export default new Router({
	 routes: [
       {
      name:'navTop',
      path:'/',
      redirect:'/kledgetree',
      component: navtop,
      children: [
		      {
		      	path: '/kledgetree',
                component: kledgetree,
		        name: 'kledgeTree',//kledgeTree
		      },{
		        component: handout,
		        name: 'handout',//handout
		        path: '/handout'
		      }
		    ]
		  }
	 ]
})


