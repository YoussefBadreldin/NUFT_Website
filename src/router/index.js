import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/User/Home.vue";
import Login from "../views/User/Login.vue";
import adminPanel from "../views/Admin/adminPanel.vue";
import UniversityData from "../views/Admin/UniversityData.vue";
import adminPanelnews from "../views/Admin/news.vue";
import adminPanelSchoralships from "../views/Admin/SchoralshipsData.vue";
import getUsers from "../views/Admin/users";
import ContactList from "../views/Admin/messages.vue";
import AdmissionStatus from "../views/User/AdmissionStatus.vue";
import Equivalency from "../views/User/Equivalency.vue";
import ScholarShips from "../views/User/Scholarships.vue";
import Universities from "../views/User/Universities.vue";
import UniversityTemplate from "../views/User/UniversityTemplate.vue";
import ContactUs from "../views/User/Contact.vue";
import Portfolio from "../views/User/Portfolio.vue";
import NewsPage from "../views/User/News.vue";
import smartAssistant from "../views/User/SmartAssistant/SmartAssistant.vue";
import searchsmartAssistant from "../views/User/SmartAssistant/UniSearch.vue";
import scoresmartAssistant from "../views/User/SmartAssistant/ScoreMatch.vue";
import facultiessmartAssistant from "../views/User/SmartAssistant/Faculties.vue";
import FacultyTemplate from "../views/User/SmartAssistant/FacultyTemplate.vue";
import StatusData from "../views/Admin/StatusData.vue";
import Account from "../views/User/Account.vue";
import SmartAssistantAdmin from "../views/Admin/SmartAssistantAdmin.vue";
import ArticleManagement from '../views/Admin/ArticleManagement.vue';
import JoinUsAdmin from '../views/Admin/JoinUsAdmin.vue';
import Articles from '../views/User/Articles.vue';
import JoinUs from '../views/User/JoinUs.vue';


const routes = [
  {
    path:'/',
    name:'Home',
    component:MainComponent
  },
  {
    path:"/Home",
    name:"MainComponent",
    component:MainComponent
  },
  {
    path:'/Login',
    name:'Login',
    component: Login
  },
  {
    path:'/account',
    name:'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/users',
    name: "getUsers",
    component: getUsers
  },
  {
    path: '/admin/messages',
    name: "ContactList",
    component: ContactList,
  },
  {
    path:'/admin',
    name:'adminpanel',
    component: adminPanel
  },
  {
    path:'/admin/universities-data',
    name:'UniversityData',
    component: UniversityData
  },
  {
    path:'/admin/news',
    name:'adminPanelnews',
    component: adminPanelnews
  },
  {
    path:'/admin/scholarships',
    name:'adminPanelSchoralships',
    component: adminPanelSchoralships
  },
  {
    path:"/Status",
    name:"Status",
    component:AdmissionStatus
  },
  {
    path:"/Equivalency",
    name:"Equivalency",
    component:Equivalency,
  },
  {
    path:"/Scholarships",
    name:"ScholarShips",
    component:ScholarShips
  },
  {
    path:'/Guide',
    name:'Guide',
    component:Universities
  },
  {
    path: '/Guide/UGRAD/:type/:id',
    name: 'UniversityTemplate',
    component: UniversityTemplate,
    props: true
  },
  {
    path:"/Contact",
    name:"Contact",
    component:ContactUs
  },
  {
    path:"/News",
    name:"NewsPage",
    component:NewsPage
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles
  },
  {
    path:"/Portfolio",
    name:"Portfolio",
    component:Portfolio
  },
  {
    path:'/join-us',
    name:'JoinUs',
    component: JoinUs
  },
  {
    path:"/smartAssistant",
    name:"smartAssistant",
    component:smartAssistant
  },
  {
    path:"/smartAssistant/search",
    name:"searchsmartAssistant",
    component:searchsmartAssistant
  },
  {
    path:"/smartAssistant/score",
    name:"scoresmartAssistant",
    component:scoresmartAssistant
  },
  {
    path:"/smartAssistant/faculties",
    name:"facultiessmartAssistant",
    component:facultiessmartAssistant
  },
  {
    path:"/smartAssistant/faculties/:faculty",
    name:"FacultyTemplate",
    component:FacultyTemplate,
    props: true
  },
  {
    path: '/admin/admission-status',
    name: 'StatusData',
    component: StatusData,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/smart-assistant',
    name: 'SmartAssistantAdmin',
    component: SmartAssistantAdmin,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/articles',
    name: 'ArticleManagement',
    component: ArticleManagement,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/join-us',
    name: 'JoinUsAdmin',
    component: JoinUsAdmin,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('name');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/user');
  } else if (to.path === '/user' && isAuthenticated) {
    if (isAdmin) {
      next('/admin');
    } else {
      next('/account');
    }
  } else {
    next();
  }
});

export default router;
