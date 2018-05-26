import Vue from 'vue'
import Router from 'vue-router'



import subjectPool from './views/subjectPool'
import kledgeTree from './components/kledgeTree'
import handout from './components/handout'

Vue.use(Router)

export default new Router({
     routes: [
        {
      name:'',
      text:'学科池',
      path:'/',
      components:'subjectPool',
      redirect:'/kledgeTree',
      children: [
		      {
		        name: 'kledgeTree',//kledgeTree
		        text: '题库',
		        icon: '',
		        path: '/kledgeTree'
		      },{
		        name: 'handout',//handout
		        text: '讲义',
		        icon: '',
		        path: '/handout'
		      }
    ]
  }
     ]
})

// const nav=[
  //   {
  //     name:'',
  //     text:'学科池',
  //     path:'/subjectPool',
  //     children: [
		//       {
		//         name: 'kledgeTree',//kledgeTree
		//         text: '题库',
		//         icon: '',
		//         path: '/kledgeTree'
		//       },{
		//         name: 'handout',//handout
		//         text: '讲义',
		//         icon: '',
		//         path: '/handout'
		//       }
  //   ]
  // }
// ]



// const nav = [
//   {
//     name: 'platformData',
//     text: '内容管理',
//     icon: 'life-ring',
//     path: '/marketData',
//     children: [
//       {
//         name: 'matePool',//Pool
//         text: '素材库',
//         icon: 'edit',
//         path: '/matePool'
//       },{
//         name: 'weiboPool',//Pool
//         text: '微博抓取文章池',
//         icon: 'weibo',
//         path: '/weiboPool'
//       },{
//         name: 'alternatePool',//Pool
//         text: '待审核（客户端）',
//         icon: 'edit',
//         path: '/alternatePool'
//       },{
//         name: 'unpublishPool',//Pool
//         text: '已审核（客户端）',
//         icon: 'edit',
//         path: '/unpublishPool'
//       },{
//         name: 'latestPool',//Pool
//         text: '最新列表',
//         icon: 'edit',
//         path: '/latestPool'
//       },{
//         name: 'publishedPool',//published
//         text: '最热列表',
//         icon: 'file',
//         path: '/publishedPool'
//       },{
//         name: 'userInfoAudit',//published
//         text: '用户信息审核',
//         icon: 'edit',
//         path: '/userInfoAudit'
//       },
//       {
//         name: 'topicNewsPool',//published
//         text: '专题文章',
//         icon: 'edit',
//         path: '/topicNewsPool'
//       }
//     ]
//   }
// ]

