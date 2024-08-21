import { createRouter, createWebHistory } from "vue-router";
import MainComponent from "../views/home.vue";
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
import O6U from "../views/Universites/Private/O6U.vue";
import MSA from "../views/Universites/Private/MSA.vue";
import MUST from "../views/Universites/Private/MUST.vue";
import MIU from "../views/Universites/Private/MIU.vue";
import GUC from "../views/Universites/Private/GUC.vue";
import ACU from "../views/Universites/Private/ACU.vue";
import BUE from "../views/Universites/Private/BUE.vue";
import MTI from "../views/Universites/Private/MTI.vue";
import SU from "../views/Universites/Private/SU.vue";
import PUA from "../views/Universites/Private/PUA.vue";
import FUE from "../views/Universites/Private/FUE.vue";
import ERU from "../views/Universites/Private/ERU.vue";
import NUB from "../views/Universites/Private/NUB.vue";
import DU from "../views/Universites/Private/DU.vue";
import HU from "../views/Universites/Private/HU.vue";
import DerayaU from "../views/Universites/Private/DerayaU.vue";
import NGU from "../views/Universites/Private/NGU.vue";
import BUC from "../views/Universites/Private/BUC.vue";
import ECU from "../views/Universites/Private/ECU.vue";
import HUE from "../views/Universites/Private/HUE.vue";
import MUE from "../views/Universites/Private/MUE.vue";
import ASU from "../views/Universites/Private/ASU.vue";
import SphinxU from "../views/Universites/Private/SphinxU.vue";
import MUC from "../views/Universites/Private/MUC.vue";
import AHUC from "../views/Universites/Private/AHUC.vue";
import SGU from "../views/Universites/Private/SGU.vue";
import BUA from "../views/Universites/Private/BUA.vue";
import RST from "../views/Universites/Private/RST.vue";
import CUC from "../views/Universites/Private/CUC.vue";
import SUT from "../views/Universites/Private/SUT.vue";
import IU from "../views/Universites/Private/IU.vue";
import RU from "../views/Universites/Private/RU.vue";
import BADYA from "../views/Universites/Private/BADYA.vue";
import NVU from "../views/Universites/Private/NVU.vue";
import SEU from "../views/Universites/Private/SEU.vue";
import LUM from "../views/Universites/Private/LUM.vue";
import special from "../views/Universites/Special/SpecialView.vue";
import InternationalAgreements from "../views/Universites/Special/InternationalAgreement/InternationalAgreement.vue";
import AUC from "../views/Universites/Special/InternationalAgreement/AUC.vue";
import EJUST from "../views/Universites/Special/InternationalAgreement/EJUST.vue";
import GIU from "../views/Universites/Special/InternationalAgreement/GIU.vue";
import EslscaU from "../views/Universites/Special/InternationalAgreement/EslscaU.vue";
import FrameworkAgreements from "../views/Universites/Special/FrameworkAgreement/FrameworkAgreement.vue";
import AASTMT from "../views/Universites/Special/FrameworkAgreement/AASTMT.vue";
import AOU from "../views/Universites/Special/FrameworkAgreement/AOU.vue";
import SpecialLaw from "../views/Universites/Special/SpecialLaws/SpecialLaws.vue";
import UST from "../views/Universites/Special/SpecialLaws/UST.vue";
import international from "../views/Universites/International/International.vue";
import UPEI from "../views/Universites/International/UPEI.vue";
import UH from "../views/Universites/International/UH.vue";
import UOL from "../views/Universites/International/UOL.vue";
import Coventry from "../views/Universites/International/Coventry.vue";
import UEL from "../views/Universites/International/UEL.vue";
import UCLAN from "../views/Universites/International/UCLAN.vue";
import KPFU from "../views/Universites/International/KPFU.vue";
import SPBU from "../views/Universites/International/SPBU.vue";
import NOVA from "../views/Universites/International/NOVA.vue";
import ContactUs from "../views/contactUs.vue";
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
    path: '/Guide/UGRAD/private/O6U',
    name: "O6U",
    component: O6U
  },
  {
    path: '/Guide/UGRAD/private/MSA',
    name: "MSA",
    component: MSA
  },
  {
    path: '/Guide/UGRAD/private/MUST',
    name: "MUST",
    component: MUST
  },
  {
    path: '/Guide/UGRAD/private/MIU',
    name: "MIU",
    component: MIU
  },
  {
    path: '/Guide/UGRAD/private/GUC',
    name: "GUC",
    component: GUC
  },
  {
    path: '/Guide/UGRAD/private/ACU',
    name: "ACU",
    component: ACU
  },
  {
    path: '/Guide/UGRAD/private/BUE',
    name: "BUE",
    component: BUE
  },
  {
    path: '/Guide/UGRAD/private/MTI',
    name: "MTI",
    component: MTI
  },
  {
    path: '/Guide/UGRAD/private/SU',
    name: "SU",
    component: SU
  },
  {
    path: '/Guide/UGRAD/private/PUA',
    name: "PUA",
    component: PUA
  },
  {
    path: '/Guide/UGRAD/private/FUE',
    name: "FUE",
    component: FUE
  },
  {
    path: '/Guide/UGRAD/private/ERU',
    name: "ERU",
    component: ERU
  },
  {
    path: '/Guide/UGRAD/private/NUB',
    name: "NUB",
    component: NUB
  },
  {
    path: '/Guide/UGRAD/private/DU',
    name: "DU",
    component: DU
  },
  {
    path: '/Guide/UGRAD/private/HU',
    name: "HU",
    component: HU
  },
  {
    path: '/Guide/UGRAD/private/DerayaU',
    name: "DerayaU",
    component: DerayaU
  },
  {
    path: '/Guide/UGRAD/private/NGU',
    name: "NGU",
    component: NGU
  },
  {
    path: '/Guide/UGRAD/private/BUC',
    name: "BUC",
    component: BUC
  },
  {
    path: '/Guide/UGRAD/private/ECU',
    name: "ECU",
    component: ECU
  },
  {
    path: '/Guide/UGRAD/private/HUE',
    name: "HUE",
    component: HUE
  },
  {
    path: '/Guide/UGRAD/private/MUE',
    name: "MUE",
    component: MUE
  },
  {
    path: '/Guide/UGRAD/private/ASU',
    name: "ASU",
    component: ASU
  },
  {
    path: '/Guide/UGRAD/private/SphinxU',
    name: "SphinxU",
    component: SphinxU
  },
  {
    path: '/Guide/UGRAD/private/MUC',
    name: "MUC",
    component: MUC
  },
  {
    path: '/Guide/UGRAD/private/AHUC',
    name: "AHUC",
    component: AHUC
  },
  {
    path: '/Guide/UGRAD/private/SGU',
    name: "SGU",
    component: SGU
  },
  {
    path: '/Guide/UGRAD/private/BUA',
    name: "BUA",
    component: BUA
  },
  {
    path: '/Guide/UGRAD/private/RST',
    name: "RST",
    component: RST
  },
  {
    path: '/Guide/UGRAD/private/CUC',
    name: "CUC",
    component: CUC
  },
  {
    path: '/Guide/UGRAD/private/SUT',
    name: "SUT",
    component: SUT
  },
  {
    path: '/Guide/UGRAD/private/IU',
    name: "IU",
    component: IU
  },
  {
    path: '/Guide/UGRAD/private/RU',
    name: "RU",
    component: RU
  },
  {
    path: '/Guide/UGRAD/private/BADYA',
    name: "BADYA",
    component: BADYA
  },
  {
    path: '/Guide/UGRAD/private/NVU',
    name: "NVU",
    component: NVU
  },
  {
    path: '/Guide/UGRAD/private/SEU',
    name: "SEU",
    component: SEU
  },
  {
    path: '/Guide/UGRAD/private/LUM',
    name: "LUM",
    component: LUM
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
  },  
  {
    path:'/Guide/UGRAD/special',
    name:'special',
    component:special,
  },
  {
    path:"/Guide/UGRAD/special/InternationalAgreements",
    name:"InternationalAgreements",
    component:InternationalAgreements,
  },
  {
    path: '/Guide/UGRAD/special/AUC',
    name: "AUC",
    component: AUC
  },  
  {
    path: '/Guide/UGRAD/special/EJUST',
    name: "EJUST",
    component: EJUST
  },  
  {
    path: '/Guide/UGRAD/special/GIU',
    name: "GIU",
    component: GIU
  },  
  {
    path: '/Guide/UGRAD/special/EslscaU',
    name: "EslscaU",
    component: EslscaU
  },  
  {
    path:"/Guide/UGRAD/special/FrameworkAgreements",
    name:"FrameworkAgreements",
    component:FrameworkAgreements,
  },
  {
    path: '/Guide/UGRAD/special/AASTMT',
    name: "AASTMT",
    component: AASTMT
  },  
  {
    path: '/Guide/UGRAD/special/AOU',
    name: "AOU",
    component: AOU
  }, 
  {
    path:"/Guide/UGRAD/special/SpecialLaw",
    name:"SpecialLaw",
    component:SpecialLaw,
  },
  {
    path: '/Guide/UGRAD/special/UST',
    name: "UST",
    component: UST
  }, 
  {
    path:'/Guide/UGRAD/international',
    name:'international',
    component:international,
  },
  {
    path:'/Guide/UGRAD/international/UH',
    name:'UH',
    component:UH,
  },
  {
    path:'/Guide/UGRAD/international/UPEI',
    name:'UPEI',
    component:UPEI,
  },
  {
    path:'/Guide/UGRAD/international/UOL',
    name:'UOL',
    component:UOL,
  },
  {
    path:'/Guide/UGRAD/international/Coventry',
    name:'Coventry',
    component:Coventry,
  },
  {
    path:'/Guide/UGRAD/international/UEL',
    name:'UEL',
    component:UEL,
  },
  {
    path:'/Guide/UGRAD/international/UCLAN',
    name:'UCLAN',
    component:UCLAN,
  },
  {
    path:'/Guide/UGRAD/international/KPFU',
    name:'KPFU',
    component:KPFU,
  },
  {
    path:'/Guide/UGRAD/international/SPBU',
    name:'SPBU',
    component:SPBU,
  },
  {
    path:'/Guide/UGRAD/international/NOVA',
    name:'NOVA',
    component:NOVA,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
