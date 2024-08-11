import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/home.vue";
import signUp from "../views/signup/signUp.vue";
import adminPanel from "../views/adminpanel/adminPanel.vue";
import adminPanelnational from "../views/adminpanel/national adminPanel.vue";
import adminPanelprivate from "../views/adminpanel/private adminPanel.vue";
import getUsers from "../views/adminpanel/users";
import ContactList from "../views/adminpanel/getContact.vue";
import NationalStatus from "../views/AdmissionStatus/nationaladmissionstatus.vue";
import PrivateStatus from "../views/AdmissionStatus/privateadmissionstatus.vue";
import AdmissionStatus from "../views/AdmissionStatus/AdmissionStatus.vue";
import Ugrad_AdmissionStatus from "../views/AdmissionStatus/Ugrad_AdmissionStatus.vue";
import CertificatesCalculator from "../views/certificateCalc/certificateCalc.vue";
import americanView from '../views/certificateCalc/American.vue';
import IGCSECalculator from "../views/certificateCalc/IGCSE.vue";
import ScholarShips from "../views/scholarship/scolarship.vue";
import ScholarshipsUGRAD from "../views/scholarship/UGRAD_scolarship.vue";
import UniversitiesGuide from "../views/UniversitiesGuide/UniversitesGuide.vue";
import UGRAD_UniversitiesGuide from "../views/UniversitiesGuide/UGRAD_UniversitesGuide.vue";
import National from "../views/Universites/National/NationalView.vue";
import Normal from '../views/Universites/National/Normal/Normal.vue';
import UFE from '../views/Universites/National/Normal/UFE.vue';
import NU from '../views/Universites/National/Normal/NU.vue';
import EELU from '../views/Universites/National/Normal/EELU.vue';
import EUI from '../views/Universites/National/Normal/EUI.vue';
import International from '../views/Universites/National/International/International.vue';
import AIU from '../views/Universites/National/International/AIU.vue';
import KSIU from "../views/Universites/National/International/KSIU.vue";
import GU from "../views/Universites/National/International/GU.vue";
import NMU from "../views/Universites/National/International/NMU.vue";
import affiliated from '../views/Universites/National/Affiliated/Affiliated.vue';
import MansNU from '../views/Universites/National/Affiliated/MansNU.vue';
import HNU from '../views/Universites/National/Affiliated/HNU.vue';
import BNU from '../views/Universites/National/Affiliated/BNU.vue';
import BSNU from '../views/Universites/National/Affiliated/BSNU.vue';
import SVNU from '../views/Universites/National/Affiliated/SVNU.vue';
import ZNU from '../views/Universites/National/Affiliated/ZNU.vue';
import MiniaNU from '../views/Universites/National/Affiliated/MiniaNU.vue';
import MenofiaNU from'../views/Universites/National/Affiliated/MenofiaNU.vue';
import EPNU from '../views/Universites/National/Affiliated/EPNU.vue';
import AlexNU from '../views/Universites/National/Affiliated/AlexNU.vue';
import AssuitNU from '../views/Universites/National/Affiliated/AssuitNU.vue';
import NINU from '../views/Universites/National/Affiliated/NINU.vue';
import Private from "../views/Universites/Private/Private.vue";
import ContactUs from "../views/contactUs.vue";
import NewsPage from "../views/News.vue";


const routes = [
  {
    path:'/',
    name:'home',
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
    path:'/Noureldin-3la-Zeby',
    name:'adminpanel',
    component: adminPanel
  },
  {
    path:'/Noureldin-3la-Zeby-national',
    name:'adminPanelnational',
    component: adminPanelnational
  },
  {
    path:'/Noureldin-3la-Zeby-private',
    name:'adminPanelprivate',
    component: adminPanelprivate
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
    path:"/Scholarships/UGRAD",
    name:"ScholarshipsUGRAD",
    component:ScholarshipsUGRAD
  },
  {
    path:'/Guide',
    name:'Guide',
    component:UniversitiesGuide
  },
  {
    path:'/Guide/UGRAD',
    name:"Guide/UGRAD",
    component:UGRAD_UniversitiesGuide,
  },
  {
    path:'/Guide/UGRAD/national',
    name:"National",
    component:National
  },
  {
    path:'/Guide/UGRAD/National/Normal',
    name:'Normal',
    component:Normal,
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
    path:'/Guide/UGRAD/National/International',
    name:'International',
    component:International,
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
    path:'/Guide/UGRAD/National/affiliated',
    name:'affiliated',
    component:affiliated,
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
    path:'/Guide/UGRAD/Private',
    name:"Private",
    component:Private
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
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
