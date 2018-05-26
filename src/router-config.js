import nav from './nav-config'
import auth from './auth'

// const loginSuccess = (to, from, next) => {
//   if (auth.loggedIn()) {
//     next({
//       path: '/'
//     })
//   } else {
//     next()
//   }
// };
const getComponent = name => require(`./components/${name}.vue`);

const routers = [
  { path: '/subjectPool', name: 'subjectPool', component: require('./views/subjectPool')},
]

// nav.forEach((mod) => {
//   const subMenus = mod.children
//   subMenus.forEach((subMenu) => {
//     routers.push({
//       path: subMenu.path,
//       name: subMenu.name,
//       component: getComponent(subMenu.name)
//     })
//   })
// })

routers.push({ path: '/', redirect: '/subjectPool' });

export default routers
