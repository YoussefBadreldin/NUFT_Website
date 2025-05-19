<template>
    <div>
        <HeaderComponent />
        
        <div class="search-assistant-content" dir="rtl">
            <div class="search-container">
                <div class="welcome-content">
                    <div class="assistant-illustration">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="welcome-text">
                        <h1 class="welcome-title">أهلا بيك!</h1>
                        <p class="assistant-intro"><strong>أنا مساعدك الشخصي الذكي</strong></p>
                         <p class="search-instruction">أنا هنا لمساعدتك للبحث عن معلومات تفصيلية عن الجامعة التي تهمك <br> يرجى إدخال اسم الجامعة لنبدء</p>
                    </div>
                </div>

                <div class="search-box">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input 
                            type="text" 
                            id="universityName" 
                            v-model="universityName"
                            placeholder="اكتب اسم الجامعة هنا..."
                            @keyup.enter="search"
                        >
                    </div>
                    <button class="search-button" @click="search">
                        <i class="fas fa-search"></i>
                        <span>بحث</span>
                    </button>
                </div>

                <div v-if="result" class="result-container" :class="{ 'error': !showDetails }">
                    <div class="result-content">
                        <i :class="showDetails ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                        <p>{{ result }}</p>
                    </div>
                </div>
            </div>
        </div>

        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';

export default {
    name: 'MainComponent',
    components: {
        HeaderComponent,
        FooterComponent
    },
    data() {
        return {
            universityName: '',      // Holds the university name input
            result: '',             // Holds the result message
            showDetails: false     // Controls the visibility of details
        };
    },
    methods: {
        search() {
            // Mapping university names to routes
            const universityRoutes = {
                'جامعة 6 اكتوبر': '/Guide/UGRAD/Private/O6U',
                'O6U': '/Guide/UGRAD/Private/O6U',
                'جامعة أكتوبر للعلوم الحديثة والآداب': '/Guide/UGRAD/Private/MSA',
                'MSA': '/Guide/UGRAD/Private/MSA',
                'جامعة مصر للعلوم والتكنولوجيا': '/Guide/UGRAD/Private/MUST',
                'MUST': '/Guide/UGRAD/Private/MUST',
                'جامعة مصر الدولية': '/Guide/UGRAD/Private/MIU',
                'MIU': '/Guide/UGRAD/Private/MIU',
                'الجامعة الألمانية بالقاهرة': '/Guide/UGRAD/Private/GUC',
                'GUC': '/Guide/UGRAD/Private/GUC',
                'جامعة الأهرام الكندية': '/Guide/UGRAD/Private/ACU',
                'ACU': '/Guide/UGRAD/Private/ACU',
                'الجامعة البريطانية في مصر': '/Guide/UGRAD/Private/BUE',
                'BUE': '/Guide/UGRAD/Private/BUE',
                'الجامعة الحديثة للتكنولوجيا والمعلومات': '/Guide/UGRAD/Private/MTI',
                'MTI': '/Guide/UGRAD/Private/MTI',
                'جامعة سيناء': '/Guide/UGRAD/Private/SU',
                'SU': '/Guide/UGRAD/Private/SU',
                'جامعة فاروس بالإسكندرية': '/Guide/UGRAD/Private/PUA',
                'PUA': '/Guide/UGRAD/Private/PUA',
                'جامعة المستقبل': '/Guide/UGRAD/Private/FUE',
                'FUE': '/Guide/UGRAD/Private/FUE',
                'الجامعة المصرية الروسية': '/Guide/UGRAD/Private/ERU',
                'ERU': '/Guide/UGRAD/Private/ERU',
                'جامعة النهضة ببني سويف': '/Guide/UGRAD/Private/NUB',
                'NUB': '/Guide/UGRAD/Private/NUB',
                'جامعة الدلتا للعلوم والتكنولوجيا': '/Guide/UGRAD/Private/DU',
                'DU': '/Guide/UGRAD/Private/DU',
                'جامعة هيليوبليس': '/Guide/UGRAD/Private/HU',
                'HU': '/Guide/UGRAD/Private/HU',
                'جامعة دراية': '/Guide/UGRAD/Private/DerayaU',
                'DerayaU': '/Guide/UGRAD/Private/DerayaU',
                'جامعة الجيزة الجديدة': '/Guide/UGRAD/Private/NGU',
                'NGU': '/Guide/UGRAD/Private/NGU',
                'جامعة بدر بالقاهرة': '/Guide/UGRAD/Private/BUC',
                'BUC': '/Guide/UGRAD/Private/BUC',
                'الجامعة المصرية الصينية': '/Guide/UGRAD/Private/ECU',
                'ECU': '/Guide/UGRAD/Private/ECU',
                'جامعة حورس': '/Guide/UGRAD/Private/HUE',
                'HUE': '/Guide/UGRAD/Private/HUE',
                'جامعة ميريت': '/Guide/UGRAD/Private/MUE',
                'MUE': '/Guide/UGRAD/Private/MUE',
                'جامعة السلام': '/Guide/UGRAD/Private/ASU',
                'ASU': '/Guide/UGRAD/Private/ASU',
                'جامعة سفنكس': '/Guide/UGRAD/Private/SphinxU',
                'SphinxU': '/Guide/UGRAD/Private/SphinxU',
                'جامعة مايو بالقاهرة': '/Guide/UGRAD/Private/MUC',
                'MUC': '/Guide/UGRAD/Private/MUC',
                'جامعة الحياة بالقاهرة': '/Guide/UGRAD/Private/AHUC',
                'AHUC': '/Guide/UGRAD/Private/AHUC',
                'جامعة الصالحية الجديدة': '/Guide/UGRAD/Private/SGU',
                'SGU': '/Guide/UGRAD/Private/SGU',
                'جامعة بدر بأسيوط': '/Guide/UGRAD/Private/BUA',
                'BUA': '/Guide/UGRAD/Private/BUA',
                'جامعة الريادة للعلوم والتكنولوجيا': '/Guide/UGRAD/Private/RST',
                'RST': '/Guide/UGRAD/Private/RST',
                'جامعة المدينة بالقاهرة': '/Guide/UGRAD/Private/CUC',
                'CUC': '/Guide/UGRAD/Private/CUC',
                'جامعة السويدي للتكنولوجيا': '/Guide/UGRAD/Private/SUT',
                'SUT': '/Guide/UGRAD/Private/SUT',
                'جامعة الابتكار': '/Guide/UGRAD/Private/IU',
                'IU': '/Guide/UGRAD/Private/IU',
                'جامعة رشيد': '/Guide/UGRAD/Private/RU',
                'RU': '/Guide/UGRAD/Private/RU',
                'جامعة باديا': '/Guide/UGRAD/Private/BADYA',
                'BADYA': '/Guide/UGRAD/Private/BADYA',
                'جامعة وادي النيل': '/Guide/UGRAD/Private/NVU',
                'NVU': '/Guide/UGRAD/Private/NVU',
                'جامعة القاهرة ساكسوني للعلوم التطبيقية والتكنولوجيا': '/Guide/UGRAD/Private/SEU',
                'SEU': '/Guide/UGRAD/Private/SEU',
                'جامعة اللوتس': '/Guide/UGRAD/Private/LUM',
                'LUM': '/Guide/UGRAD/Private/LUM',

                'جامعة الاسكندرية الاهلية': '/Guide/UGRAD/National/AlexNU',
                'AlexNU': '/Guide/UGRAD/National/AlexNU',
                'جامعة اسيوط الاهلية': '/Guide/UGRAD/National/AssuitNU',
                'AssuitNU': '/Guide/UGRAD/National/AssuitNU',
                'جامعة بنها الاهلية': '/Guide/UGRAD/National/BNU',
                'BNU': '/Guide/UGRAD/National/BNU',
                'جامعة بني سويف الاهلية': '/Guide/UGRAD/National/BSNU',
                'BSNU': '/Guide/UGRAD/National/BSNU',
                'جامعة حلوان الاهلية': '/Guide/UGRAD/National/HNU',
                'HNU': '/Guide/UGRAD/National/HNU',
                'جامعة جنوب الوادي الاهلية': '/Guide/UGRAD/National/SVNU',
                'SVNU': '/Guide/UGRAD/National/SVNU',
                'جامعة الإسماعيلية الجديدة الاهلية': '/Guide/UGRAD/National/NINU',
                'NINU': '/Guide/UGRAD/National/NINU',
                'جامعة المنيا الاهلية': '/Guide/UGRAD/National/MiniaNU',
                'MiniaNU': '/Guide/UGRAD/National/MiniaNU',
                'جامعة المنصورة الاهلية': '/Guide/UGRAD/National/MansNU',
                'MansNU': '/Guide/UGRAD/National/MansNU',
                'جامعة المنوفية الاهلية': '/Guide/UGRAD/National/MenofiaNU',
                'MenofiaNU': '/Guide/UGRAD/National/MenofiaNU',
                'جامعة شرق بورسعيد الاهلية': '/Guide/UGRAD/National/EPNU',
                'EPNU': '/Guide/UGRAD/National/EPNU',
                'جامعة الزقازيق الاهلية': '/Guide/UGRAD/National/ZNU',
                'ZNU': '/Guide/UGRAD/National/ZNU',
                'جامعة الجلالة': '/Guide/UGRAD/National/GU',
                'GU': '/Guide/UGRAD/National/GU',
                'جامعة العلمين الدولية': '/Guide/UGRAD/National/AIU',
                'AIU': '/Guide/UGRAD/National/AIU',
                'جامعة الملك سلمان الدولية': '/Guide/UGRAD/National/KSIU',
                'KSIU': '/Guide/UGRAD/National/KSIU',
                'جامعة المنصورة الجديدة': '/Guide/UGRAD/National/NMU',
                'NMU': '/Guide/UGRAD/National/NMU',
                'الجامعة الفرنسية بمصر': '/Guide/UGRAD/National/UFE',
                'UFE': '/Guide/UGRAD/National/UFE',
                'الجامعة المصرية للتعليم الالكتروني': '/Guide/UGRAD/National/EELU',
                'EELU': '/Guide/UGRAD/National/EELU',
                'جامعة مصر للمعلوماتية': '/Guide/UGRAD/National/EUI',
                'EUI': '/Guide/UGRAD/National/EUI',
                'جامعة النيل الاهلية': '/Guide/UGRAD/National/NU',
                'NU': '/Guide/UGRAD/National/NU',

                'جامعة ايست لندن': '/Guide/UGRAD/International/UEL',
                'UEL': '/Guide/UGRAD/International/UEL',
                'جامعة جزيرة الأمير إدوارد': '/Guide/UGRAD/International/UPEI',
                'UPEI': '/Guide/UGRAD/International/UPEI',
                'جامعة كازان الفيدرالية الروسية': '/Guide/UGRAD/International/KPFU',
                'KPFU': '/Guide/UGRAD/International/KPFU',
                'جامعة كوفنتري البريطانية': '/Guide/UGRAD/International/Coventry',
                'Coventry': '/Guide/UGRAD/International/Coventry',
                'جامعة نوفا ليشبونا البرتغالية': '/Guide/UGRAD/International/NOVA',
                'NOVA': '/Guide/UGRAD/International/NOVA',
                'جامعة سان بطرسبرج الروسية': '/Guide/UGRAD/International/SPBU',
                'SPBU': '/Guide/UGRAD/International/SPBU',
                'جامعة هيرتفوردشاير البريطانية': '/Guide/UGRAD/International/UH',
                'UH': '/Guide/UGRAD/International/UH',
                'جامعة وسط لانكشاير': '/Guide/UGRAD/International/UCLan',
                'UCLan': '/Guide/UGRAD/International/UCLan',
                'جامعة لندن': '/Guide/UGRAD/International/UOL',
                'UOL': '/Guide/UGRAD/International/UOL',

                'الأكاديمية البحرية للعلوم والتكنولوجيا والنقل البحري': '/Guide/UGRAD/Special/AASTMT',
                'AASTMT': '/Guide/UGRAD/Special/AASTMT',
                'الجامعة العربية المفتوحة': '/Guide/UGRAD/Special/AOU',
                'AOU': '/Guide/UGRAD/Special/AOU',
                'جامعة اسلسكا': '/Guide/UGRAD/Special/EslscaU',
                'EslscaU': '/Guide/UGRAD/Special/EslscaU',
                'الجامعة الأمريكية بالقاهرة': '/Guide/UGRAD/Special/AUC',
                'AUC': '/Guide/UGRAD/Special/AUC',
                'الجامعة المصرية اليابانية': '/Guide/UGRAD/Special/EJUST',
                'EJUST': '/Guide/UGRAD/Special/EJUST',
                'الجامعة الألمانية الدولية': '/Guide/UGRAD/Special/GIU',
                'GIU': '/Guide/UGRAD/Special/GIU',
                'جامعة العلوم والتكنولوجيا بمدينة زويل': '/Guide/UGRAD/Special/UST',
                'UST': '/Guide/UGRAD/Special/UST'
            };

            // Normalize the input
            const normalizedInput = this.universityName.trim().toLowerCase();
            let normalizedRoute = null;

            // Find the exact match or similar names
            for (const [key, value] of Object.entries(universityRoutes)) {
                if (normalizedInput === key.toLowerCase()) {
                    normalizedRoute = value;
                    break;
                }
            }

            if (normalizedRoute) {
                // Redirect to the route
                this.$router.push(normalizedRoute);
            } else {
                // Check for partial matches
                let found = false;
                for (const [key, value] of Object.entries(universityRoutes)) {
                    if (key.toLowerCase().includes(normalizedInput)) {
                        this.result = `لم أتمكن من العثور على الجامعة بناءً على الاسم الكامل، لكن قد يكون هذا هو الرابط المطلوب: ${value}`;
                        this.showDetails = true;
                        found = true;
                        this.$router.push(value);
                        break;
                    }
                }
                
                if (!found) {
                    // Check for search without "جامعة" keyword
                    const noKeywordInput = normalizedInput.replace('جامعة', '').trim();
                    for (const [key, value] of Object.entries(universityRoutes)) {
                        if (key.toLowerCase().includes(noKeywordInput)) {
                            this.result = `لم أتمكن من العثور على الجامعة بناءً على الاسم الكامل، لكن قد يكون هذا هو الرابط المطلوب: ${value}`;
                            this.showDetails = true;
                            this.$router.push(value);
                            found = true;
                            break;
                        }
                    }
                    
                    if (!found) {
                        this.result = 'عذرًا، لم أتمكن من العثور على الجامعة المطلوبة. يرجى التحقق من تهجئة الاسم.';
                        this.showDetails = false;
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.search-assistant-content {
    min-height: calc(100vh - 200px); /* Adjust based on your header/footer height */
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 40px 20px;
}

.search-container {
    max-width: 800px;
    margin: 0 auto;
}

.welcome-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    background: linear-gradient(135deg, #2B32B2, #1488CC);
    padding: 40px;
    border-radius: 20px;
    color: white;
    box-shadow: 0 10px 30px rgba(43, 50, 178, 0.2);
}

.welcome-text {
    flex: 1;
    padding-right: 40px;
}

.welcome-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.assistant-intro {
    font-size: 1.5rem;
    margin-bottom: 15px;
    opacity: 0.9;
}

.search-instruction {
    font-size: 1.2rem;
    opacity: 0.8;
}

.assistant-illustration {
    font-size: 5rem;
    opacity: 0.9;
    animation: float 3s ease-in-out infinite;
}

.search-box {
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.search-input-wrapper {
    position: relative;
    margin-bottom: 20px;
}

.search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #6B48FF;
    font-size: 1.2rem;
}

input {
    width: 100%;
    padding: 15px 45px 15px 15px;
    border: 2px solid #e9ecef;
    border-radius: 10px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
    border-color: #6B48FF;
    box-shadow: 0 0 0 3px rgba(107, 72, 255, 0.1);
}

.search-button {
    background: linear-gradient(135deg, #6B48FF, #1CB5E0);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.search-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(107, 72, 255, 0.2);
}

.search-button i {
    font-size: 1.2rem;
}

.result-container {
    background: white;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    transition: all 0.3s ease;
}

.result-container.error {
    background: #fff5f5;
    border-left: 4px solid #ff4d4d;
}

.result-content {
    display: flex;
    align-items: center;
    gap: 15px;
}

.result-content i {
    font-size: 1.5rem;
    color: #6B48FF;
}

.result-container.error i {
    color: #ff4d4d;
}

.result-content p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.5;
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0px);
    }
}

/* Responsive Styles */
@media (max-width: 768px) {
    .search-assistant-content {
        padding: 20px;
    }

    .welcome-content {
        flex-direction: column;
        text-align: center;
        padding: 30px;
    }

    .welcome-text {
        padding-right: 0;
        margin-bottom: 30px;
    }

    .welcome-title {
        font-size: 2rem;
    }

    .assistant-intro {
        font-size: 1.2rem;
    }

    .search-instruction {
        font-size: 1rem;
    }

    .assistant-illustration {
        font-size: 4rem;
    }

    .search-box {
        padding: 20px;
    }

    input {
        font-size: 1rem;
    }

    .search-button {
        width: 100%;
        justify-content: center;
    }
}
</style>
