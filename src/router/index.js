import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/homeView.vue";
import UniversitiesGuide from "../views/universityView.vue";
import UgardView from "../views/UGRAD.vue";
import soonView from "../views/soonView.vue";
import NationalUniversities from "../views/nationalView.vue"
import AdmissionStatus from "../views/AdmissionStatus/guideMain.vue";
import AdmissionStatusUGRAD from "../views/AdmissionStatus/UgradAdmission.vue";
import NationalUniversitiesAdmissionsStatus from "../views/AdmissionStatus/nationalView.vue";
import ScholarShips from "../views/scholarship/scolarshipView.vue";
import ScholarshipsUGRAD from "../views/scholarship/scolarUgrad.vue";
import CertificatesCalculator from "../views/certificateCalc/certificateCalc.vue";
import americanView from '../views/certificateCalc/americanView.vue';
import IGCSECalculator from "../views/certificateCalc/ICG.vue";
import NewsPage from "../views/News.vue";
import ContactUs from "../views/contactUs.vue";
import signUp from "../views/signup/signUp.vue";
import interNational from '../views/interNational.vue';
import AIU from '../views/internaionalUniversities.vue/AIU.vue';
import adminPanel from "../views/adminPanel.vue/adminPanel.vue";
import kingSalman from "../views/internaionalUniversities.vue/kingSalman.vue";
import galalaUniversity from "../views/internaionalUniversities.vue/galalaView";
import newMansoura from "../views/internaionalUniversities.vue/newMansoura";
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
    path:'/universitiesGuide',
    name:'universitiesGuide',
    component:UniversitiesGuide
  },
  {
    path:'/universitiesGuide/UGRAD',
    name:"UniversitiesGuide/UGRAD",
    component:UgardView,
  },
  {
    path:'/UniversitiesGuide/UGRAD/soon',
    name:'UniversitiesGuide/UGRAD/soon',
    component:soonView,
  },
  {
    path:'/UniversitiesGuide/PGRAD',
    name:'UniversitiesGuide/PGRAD',
    component:soonView,
  },
  {
    path:'/UniversitiesGuide/UGRAD/national',
    name:"NationalUniversities",
    component:NationalUniversities
  },
  {
    path:"/AdmissionStatus",
    name:"AdmissionStatus",
    component:AdmissionStatus
  },
  {
    path:"/AdmissionStatus/PGRAD",
    name:"AdmissionStatusPGRAD",
    component:soonView,
  },
  {
    path:"/AdmissionStatus/UGRAD",
    name:"AdmissionStatus/UGRAD",
    component:AdmissionStatusUGRAD
  },
  {
    path:"/AdmissionStatus/UGRAD/National",
    name:"AdmissionStatus/UGRAD/National",
    component:NationalUniversitiesAdmissionsStatus,
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
    path:"/CertificatesCalculator",
    name:"CertificatesCalculator",
    component:CertificatesCalculator,
  },
  {
    path:"/CertificatesCalculator/American",
    name:"americanView",
    component:americanView,
  },
  {
    path:'/CertificatesCalculator/IGCSE',
    name:"IGCSECalculator",
    component:IGCSECalculator
  },
  {
    path:"/News",
    name:"NewsPage",
    component:NewsPage
  },
  {
    path:"/ContactUs",
    name:"ContactUs",
    component:ContactUs
  },
  {
    path:'/signup',
    name:'signUp',
    component: signUp
  },
  {
    path:'/UniversitiesGuide/UGRAD/National/International',
    name:'interNational',
    component:interNational,
  },
  {
    path:'/UniversitiesGuide/UGRAD/National/International/AIU',
    name:'AIU',
    component:AIU,
  },
  {
    path:'/adminPanel',
    name:'adminpanel',
    component: adminPanel
  },
  {
    path: '/UniversitiesGuide/UGRAD/National/International/KSIU',
    name: 'kingSalman',
    component: kingSalman,
  },
  {
    path: '/UniversitiesGuide/UGRAD/National/International/GU',
    name: 'galalaUniversity',
    component: galalaUniversity,
  },
  {
    path: '/UniversitiesGuide/UGRAD/National/International/NMU',
    name: 'newMansoura',
    component: newMansoura,
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
