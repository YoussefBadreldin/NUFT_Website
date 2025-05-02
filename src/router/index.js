import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/Home.vue";
import signUp from "../views/signup/signUp.vue";
import adminPanel from "../views/adminpanel/adminPanel.vue";
import adminPanelnational from "../views/adminpanel/national adminPanel.vue";
import adminPanelprivate from "../views/adminpanel/private adminPanel.vue";
import adminPanelspecial from "../views/adminpanel/special adminPanel.vue";
import adminPanelinternational from "../views/adminpanel/international adminPanel.vue";
import adminPanelnews from "../views/adminpanel/news adminPanel.vue";
import adminPanelSchoralships from "../views/adminpanel/Schoralships adminPanel.vue";
import getUsers from "../views/adminpanel/users";
import ContactList from "../views/adminpanel/getContact.vue";
import AdmissionStatus from "../views/AdmissionStatus/AdmissionStatus.vue";
import Ugrad_AdmissionStatus from "../views/AdmissionStatus/Ugrad_AdmissionStatus.vue";
import NationalStatus from "../views/AdmissionStatus/nationaladmissionstatus.vue";
import PrivateStatus from "../views/AdmissionStatus/privateadmissionstatus.vue";
import specialStatus from "../views/AdmissionStatus/specialadmissionstatus.vue";
import internationalStatus from "../views/AdmissionStatus/internationaladmissionstatus.vue";
import CertificatesCalculator from "../views/certificateCalc/certificateCalc.vue";
import americanView from '../views/certificateCalc/American.vue';
import IGCSECalculator from "../views/certificateCalc/IGCSE.vue";
import ScholarShips from "../views/Scholarships.vue";
import Universities from "../views/Universities.vue";
import UniversityTemplate from "../views/UniversityTemplate.vue";
import ContactUs from "../views/ContactUs.vue";
import Portfolio from "../views/Portfolio.vue";
import NewsPage from "../views/News.vue";
import smartAssistant from "../views/smartAssistant/smartAssistant.vue";
import searchsmartAssistant from "../views/smartAssistant/search-smartAssistant.vue";
import scoresmartAssistant from "../views/smartAssistant/score-smartAssistant.vue";
import facultiessmartAssistant from "../views/smartAssistant/faculties-smartAssistant.vue";
import MED from "../views/smartAssistant/MED.vue";
import DENT from "../views/smartAssistant/DENT.vue";
import PT from "../views/smartAssistant/PT.vue";
import PHARM from "../views/smartAssistant/PHARM.vue";
import ENG from "../views/smartAssistant/ENG.vue";
import VET from "../views/smartAssistant/VET.vue";
import CS from "../views/smartAssistant/CS.vue";
import POLY from "../views/smartAssistant/POLY.vue";
import NURS from "../views/smartAssistant/NURS.vue";
import HS from "../views/smartAssistant/HS.vue";
import ART from "../views/smartAssistant/ART.vue";
import MEDIA from "../views/smartAssistant/MEDIA.vue";
import ARCH from "../views/smartAssistant/ARCH.vue";
import LAW from "../views/smartAssistant/LAW.vue";
import TOUR from "../views/smartAssistant/TOUR.vue";
import ECON from "../views/smartAssistant/ECON.vue";
import CINE from "../views/smartAssistant/CINE.vue";
import SCI from "../views/smartAssistant/SCI.vue";
import BIOTECH from "../views/smartAssistant/BIOTECH.vue";
import EDU from "../views/smartAssistant/EDU.vue";
import LANG from "../views/smartAssistant/LANG.vue";
import SOCSCI from "../views/smartAssistant/SOCSCI.vue";

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
    path:'/user',
    name:'user',
    component: signUp
  },
  {
    path: '/users',
    name: "getUsers",
    component: getUsers
  },
  {
    path: '/getContact',
    name: "ContactList",
    component: ContactList,
  },
  {
    path:'/NUFTawyNumber1',
    name:'adminpanel',
    component: adminPanel
  },
  {
    path:'/NUFTawyNumber1-national',
    name:'adminPanelnational',
    component: adminPanelnational
  },
  {
    path:'/NUFTawyNumber1-private',
    name:'adminPanelprivate',
    component: adminPanelprivate
  },
  {
    path:'/NUFTawyNumber1-special',
    name:'adminPanelspecial',
    component: adminPanelspecial
  },
  {
    path:'/NUFTawyNumber1-international',
    name:'adminPanelinternational',
    component: adminPanelinternational
  },
  {
    path:'/NUFTawyNumber1-news',
    name:'adminPanelnews',
    component: adminPanelnews
  },
  {
    path:'/NUFTawyNumber1-Scholarships',
    name:'adminPanelSchoralships',
    component: adminPanelSchoralships
  },
  {
    path:"/Status",
    name:"Status",
    component:AdmissionStatus
  },
  {
    path:"/Status/UGRAD",
    name:"Status/UGRAD",
    component:Ugrad_AdmissionStatus
  },
  {
    path:"/Status/UGRAD/National",
    name:"Status/UGRAD/National",
    component:NationalStatus,
  },
  {
    path:"/Status/UGRAD/Private",
    name:"PrivateStatus",
    component:PrivateStatus,
  },
  {
    path:"/Status/UGRAD/special",
    name:"specialStatus",
    component:specialStatus,
  },
  {
    path:"/Status/UGRAD/international",
    name:"internationalStatus",
    component:internationalStatus,
  },
  {
    path:"/Calculator",
    name:"Calculator",
    component:CertificatesCalculator,
  },
  {
    path:"/Calculator/American",
    name:"americanView",
    component:americanView,
  },
  {
    path:'/Calculator/IGCSE',
    name:"IGCSECalculator",
    component:IGCSECalculator
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
    path:"/Portfolio",
    name:"Portfolio",
    component:Portfolio
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
    path:"/smartAssistant/faculties/MED",
    name:"MED",
    component:MED
  },
  {
    path: "/smartAssistant/faculties/DENT",
    name: "DENT",
    component: DENT
  },
  {
    path: "/smartAssistant/faculties/PT",
    name: "PT",
    component: PT
  },
  {
    path: "/smartAssistant/faculties/PHARM",
    name: "PHARM",
    component: PHARM
  },
  {
    path: "/smartAssistant/faculties/ENG",
    name: "ENG",
    component: ENG
  },
  {
    path: "/smartAssistant/faculties/VET",
    name: "VET",
    component: VET
  },
  {
    path: "/smartAssistant/faculties/CS",
    name: "CS",
    component: CS
  },
  {
    path: "/smartAssistant/faculties/POLY",
    name: "POLY",
    component: POLY
  },
  {
    path: "/smartAssistant/faculties/NURS",
    name: "NURS",
    component: NURS
  },
  {
    path: "/smartAssistant/faculties/HS",
    name: "HS",
    component: HS
  },
  {
    path: "/smartAssistant/faculties/ART",
    name: "ART",
    component: ART
  },
  {
    path: "/smartAssistant/faculties/MEDIA",
    name: "MEDIA",
    component: MEDIA
  },
  {
    path: "/smartAssistant/faculties/ARCH",
    name: "ARCH",
    component: ARCH
  },
  {
    path: "/smartAssistant/faculties/LAW",
    name: "LAW",
    component: LAW
  },
  {
    path: "/smartAssistant/faculties/TOUR",
    name: "TOUR",
    component: TOUR
  },
  {
    path: "/smartAssistant/faculties/ECON",
    name: "ECON",
    component: ECON
  },
  {
    path: "/smartAssistant/faculties/CINE",
    name: "CINE",
    component: CINE
  },
  {
    path: "/smartAssistant/faculties/SCI",
    name: "SCI",
    component: SCI
  },
  {
    path: "/smartAssistant/faculties/BIOTECH",
    name: "BIOTECH",
    component: BIOTECH
  },
  {
    path: "/smartAssistant/faculties/EDU",
    name: "EDU",
    component: EDU
  },
  {
    path: "/smartAssistant/faculties/LANG",
    name: "LANG",
    component: LANG
  },
  {
    path: "/smartAssistant/faculties/SOCSCI",
    name: "SOCSCI",
    component: SOCSCI
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
