import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/homeView.vue";
import UniversitiesGuide from "../views/universityView.vue";
import UgardView from "../views/UGRAD.vue";
import soonView from "../views/soonView.vue";
import NationalUniversities from "../views/nationalView.vue";
import Private from "../views/Private.vue";
import AdmissionStatus from "../views/AdmissionStatus/guideMain.vue";
import AdmissionStatusUGRAD from "../views/AdmissionStatus/UgradAdmission.vue";
import NationalUniversitiesAdmissionsStatus from "../views/AdmissionStatus/nationalView.vue";
import PrivateStatus from "../views/AdmissionStatus/PrivateView.vue";
import ScholarShips from "../views/scholarship/scolarshipView.vue";
import ScholarshipsUGRAD from "../views/scholarship/scolarUgrad.vue";
import CertificatesCalculator from "../views/certificateCalc/certificateCalc.vue";
import americanView from '../views/certificateCalc/americanView.vue';
import IGCSECalculator from "../views/certificateCalc/ICG.vue";
import NewsPage from "../views/News.vue";
import ContactUs from "../views/contactUs.vue";
import signUp from "../views/signup/signUp.vue";
import Normal from '../views/Normal.vue';
import interNational from '../views/interNational.vue';
import affiliated from '../views/affiliated.vue';
import adminPanel from "../views/adminPanel.vue/adminPanel.vue";
import UFE from '../views/Normal/UFE.vue';
import NU from '../views/Normal/NU.vue';
import EELU from '../views/Normal/EELU.vue';
import EUI from '../views/Normal/EUI.vue';
import AIU from '../views/internaionalUniversities.vue/AIU.vue';
import KSIU from "../views/internaionalUniversities.vue/KSIU.vue";
import GU from "../views/internaionalUniversities.vue/GU.vue";
import NMU from "../views/internaionalUniversities.vue/NMU.vue";
import MansNU from "../views/affiliated/MansNU.vue";
import HNU from "../views/affiliated/HNU.vue";
import BNU from "../views/affiliated/BNU.vue";
import BSNU from "../views/affiliated/BSNU.vue";
import SVNU from "../views/affiliated/SVNU.vue";
import ZNU from "../views/affiliated/ZNU.vue";
import MiniaNU from "../views/affiliated/MiniaNU.vue";
import MenofiaNU from "../views/affiliated/MenofiaNU.vue";
import EPNU from "../views/affiliated/EPNU.vue";
import AlexNU from "../views/affiliated/AlexNU.vue";
import AssuitNU from "../views/affiliated/AssuitNU.vue";
import NINU from "../views/affiliated/NINU.vue";
import getUsers from "../views/adminPanel.vue/users.vue";
import ContactList from "../views/adminPanel.vue/getContact.vue";

const routes = [
  {
    path: '/getContact',
    name: "ContactList",
    component: ContactList,
  },
  {
    path:"/Home",
    name:"MainComponent",
    component:MainComponent
  },
  {
    path:'/',
    name:'home',
    component:MainComponent
  },
  {
    path:'/Guide',
    name:'Guide',
    component:UniversitiesGuide
  },
  {
    path:'/Guide/UGRAD',
    name:"Guide/UGRAD",
    component:UgardView,
  },
  {
    path:'/Guide/UGRAD/soon',
    name:'Guide/UGRAD/soon',
    component:soonView,
  },
  {
    path:'/Guide/PGRAD',
    name:'Guide/PGRAD',
    component:soonView,
  },
  {
    path:'/Guide/UGRAD/national',
    name:"NationalUniversities",
    component:NationalUniversities
  },
  {
    path:'/Guide/UGRAD/Private',
    name:"Private",
    component:Private
  },
  {
    path:"/Status",
    name:"Status",
    component:AdmissionStatus
  },
  {
    path:"/Status/PGRAD",
    name:"AdmissionStatusPGRAD",
    component:soonView,
  },
  {
    path:"/Status/UGRAD",
    name:"Status/UGRAD",
    component:AdmissionStatusUGRAD
  },
  {
    path:"/Status/UGRAD/National",
    name:"Status/UGRAD/National",
    component:NationalUniversitiesAdmissionsStatus,
  },
  {
    path:"/Status/UGRAD/Private",
    name:"PrivateStatus",
    component:PrivateStatus,
  },
  {
    path:"/Scholarships",
    name:"ScholarShips",
    component:ScholarShips
  },
  {
    path:"/Scholarships/UGRAD",
    name:"ScholarshipsUGRAD",
    component:ScholarshipsUGRAD
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
    path:"/News",
    name:"NewsPage",
    component:NewsPage
  },
  {
    path:"/Contact",
    name:"Contact",
    component:ContactUs
  },
  {
    path:'/user',
    name:'user',
    component: signUp
  },
  {
    path:'/Guide/UGRAD/National/Normal',
    name:'Normal',
    component:Normal,
  },
  {
    path:'/Guide/UGRAD/National/International',
    name:'interNational',
    component:interNational,
  },
  {
    path:'/Guide/UGRAD/National/affiliated',
    name:'affiliated',
    component:affiliated,
  },
  {
    path:'/Noureldin-3la-Zeby',
    name:'adminpanel',
    component: adminPanel
  },
  {
    path:'/Guide/UGRAD/National/UFE',
    name:'UFE',
    component:UFE,
  },
  {
    path:'/Guide/UGRAD/National/NU',
    name:'NU',
    component:NU,
  },
  {
    path:'/Guide/UGRAD/National/EELU',
    name:'EELU',
    component:EELU,
  },
  {
    path:'/Guide/UGRAD/National/EUI',
    name:'EUI',
    component:EUI,
  },
  {
    path:'/Guide/UGRAD/National/AIU',
    name:'AIU',
    component:AIU,
  },
  {
    path: '/Guide/UGRAD/National/KSIU',
    name: 'kSIU',
    component: KSIU,
  },
  {
    path: '/Guide/UGRAD/National/GU',
    name: 'GU',
    component: GU,
  },
  {
    path: '/Guide/UGRAD/National/NMU',
    name: 'NMU',
    component: NMU,
  },
  {
    path: '/Guide/UGRAD/National/MansNU',
    name: 'MansNU',
    component: MansNU,
  },
  {
    path: '/Guide/UGRAD/National/HNU',
    name: 'HNU',
    component: HNU,
  },
  {
    path: '/Guide/UGRAD/National/BNU',
    name: 'BNU',
    component: BNU,
  },
  {
    path: '/Guide/UGRAD/National/BSNU',
    name: 'BSNU',
    component: BSNU,
  },
  {
    path: '/Guide/UGRAD/National/SVNU',
    name: 'SVNU',
    component: SVNU,
  },
  {
    path: '/Guide/UGRAD/National/ZNU',
    name: 'ZNU',
    component: ZNU,
  },
  {
    path: '/Guide/UGRAD/National/MiniaNU',
    name: 'MiniaNU',
    component: MiniaNU,
  },
  {
    path: '/Guide/UGRAD/National/MenofiaNU',
    name: 'MenofiaNU',
    component: MenofiaNU,
  },
  {
    path: '/Guide/UGRAD/National/EPNU',
    name: 'EPNU',
    component: EPNU,
  },
  {
    path: '/Guide/UGRAD/National/AlexNU',
    name: 'AlexNU',
    component: AlexNU,
  },
  {
    path: '/Guide/UGRAD/National/AssuitNU',
    name: 'AssuitNU',
    component: AssuitNU,
  },
  {
    path: '/Guide/UGRAD/National/NINU',
    name: 'NINU',
    component: NINU,
  },
  {
    path: '/users',
    name: "getUsers",
    component: getUsers
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
