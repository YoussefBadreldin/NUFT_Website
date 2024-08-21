<template>
    <div>
        <HeaderComponent />
        <br>
        <h2>!أهلا بيك</h2>
        <p><strong>أنا مساعدك الشخصي</strong></p>
        <p>يرجى إدخال البيانات التالية بدقة للبحث عن الجامعة</p>
        <br>
        <div class="form-group">
            <label for="universityName">اسم الجامعة (باللغة العربية)</label>
            <input type="text" id="universityName" v-model="universityName">
        </div>

        <div>
            <button @click="search">بحث</button>
        </div>

        <div v-if="result" class="result">
            <p>{{ result }}</p>
        </div>
        <br>
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
/* Form Group Styles */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

/* Button Styles */
button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    margin-right: 10px; /* Add space between buttons */
}

button:hover {
    background-color: #0056b3;
}

/* Result Styles */
.result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
}

/* Details Styles */
.details {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f0f0f0;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .carousel-item img {
        height: 40vh; /* Set height as a percentage of the viewport height */
        object-fit: cover; /* Ensure image covers the area without distortion */
    }
}
</style>
