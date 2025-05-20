<template>
  <div class="university-admin-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة الجامعات</h1>
      <p class="subtitle">إضافة وتعديل وحذف بيانات الجامعات</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'add' }"
        @click="activeTab = 'add'"
      >
        <i class="fas fa-plus"></i>
        اضافة جامعة جديدة
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'manage' }"
        @click="activeTab = 'manage'"
      >
        <i class="fas fa-university"></i>
        الجامعات الحالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'edit' }"
        @click="switchToEdit"
      >
        <i class="fas fa-edit"></i>
        تحديث جامعة حالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'delete' }"
        @click="switchToDelete"
      >
        <i class="fas fa-trash"></i>
        حذف جامعة حالية
      </button>
    </div>

    <!-- Category Tabs -->
    <div v-if="activeTab !== 'add'" class="type-tabs">
      <button 
        v-for="type in universityTypes" 
        :key="type.value"
        :class="['type-tab', { active: selectedType === type.value }]"
        @click="selectedType = type.value"
      >
        {{ type.label }}
      </button>
    </div>

    <!-- Add New University Section -->
    <div v-if="activeTab === 'add'" class="section-container">
      <div class="section-header">
        <h2>إضافة جامعة جديدة</h2>
      </div>
      <div class="form-section">
        <div class="form-card">
          <form @submit.prevent="addUniversity()">
            <!-- Basic University Information -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-university"></i>
                بيانات الجامعة الأساسية
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="university_code">
                    <i class="fas fa-hashtag"></i>
                    الرمز المختصر للجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.university_code" 
                    id="university_code" 
                    required
                    placeholder="مثال: ACU, BUE, etc."
                  >
                </div>

                <div class="form-group">
                  <label for="university_Arabic_Name">
                    <i class="fas fa-graduation-cap"></i>
                    اسم الجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.university_Arabic_Name" 
                    id="university_Arabic_Name" 
                    required
                    placeholder="أدخل اسم الجامعة"
                  >
                </div>

                <div class="form-group">
                  <label for="university_Logo">
                    <i class="fas fa-image"></i>
                    رابط الشعار
                  </label>
                  <div class="input-with-hint">
                    <input 
                      type="text" 
                      v-model="addFormData.university_Logo" 
                      id="university_Logo"
                      placeholder="أدخل رابط الشعار"
                    >
                    <span class="hint">/images/Logos/Universities/.png</span>
                  </div>
                </div>

                <div class="form-group">
                  <label for="type">
                    <i class="fas fa-tag"></i>
                    نوع الجامعة
                  </label>
                  <select v-model="addFormData.type" id="type" required>
                    <option value="national">أهلية</option>
                    <option value="private">خاصة</option>
                    <option value="special">ذات طبيعة خاصة</option>
                    <option value="international">دولية</option>
                  </select>
                </div>

                <div class="form-group full-width">
                  <label for="Uni_Bio">
                    <i class="fas fa-info-circle"></i>
                    نبذة عن الجامعة
                  </label>
                  <textarea 
                    v-model="addFormData.Uni_Bio" 
                    id="Uni_Bio" 
                    rows="4"
                    placeholder="أدخل نبذة مختصرة عن الجامعة"
                  ></textarea>
                </div>

                <div class="form-group">
                  <label for="location">
                    <i class="fas fa-map-marker-alt"></i>
                    الموقع علي الخرائط
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.location" 
                    id="location"
                    placeholder="أدخل موقع الجامعة"
                  >
                </div>

                <div class="form-group">
                  <label for="first_year">
                    <i class="fas fa-calendar"></i>
                    السنة الأولى
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.first_year" 
                    id="first_year"
                    placeholder="أدخل السنة الأولى"
                  >
                </div>

                <div class="form-group">
                  <label for="second_year">
                    <i class="fas fa-calendar"></i>
                    السنة الثانية
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.second_year" 
                    id="second_year"
                    placeholder="أدخل السنة الثانية"
                  >
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-address-book"></i>
                معلومات الاتصال
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="website">
                    <i class="fas fa-globe"></i>
                    الموقع الإلكتروني
                  </label>
                  <input 
                    type="url" 
                    v-model="addFormData.website" 
                    id="website"
                    placeholder="https://example.com"
                  >
                </div>

                <div class="form-group">
                  <label for="phone">
                    <i class="fas fa-phone"></i>
                    رقم الهاتف
                  </label>
                  <input 
                    type="tel" 
                    v-model="addFormData.phone" 
                    id="phone"
                    placeholder="+20 XXX XXX XXXX"
                  >
                </div>

                <div class="form-group">
                  <label for="email">
                    <i class="fas fa-envelope"></i>
                    البريد الإلكتروني
                  </label>
                  <input 
                    type="email" 
                    v-model="addFormData.email" 
                    id="email"
                    placeholder="example@university.edu"
                  >
                </div>
              </div>
            </div>

            <!-- Social Media Links -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-share-alt"></i>
                روابط التواصل الاجتماعي
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="facebook">
                    <i class="fab fa-facebook"></i>
                    فيسبوك
                  </label>
                  <input 
                    type="url" 
                    v-model="addFormData.facebook" 
                    id="facebook"
                    placeholder="https://facebook.com/..."
                  >
                </div>

                <div class="form-group">
                  <label for="instagram">
                    <i class="fab fa-instagram"></i>
                    انستجرام
                  </label>
                  <input 
                    type="url" 
                    v-model="addFormData.instagram" 
                    id="instagram"
                    placeholder="https://instagram.com/..."
                  >
                </div>

                <div class="form-group">
                  <label for="youtube">
                    <i class="fab fa-youtube"></i>
                    يوتيوب
                  </label>
                  <input 
                    type="url" 
                    v-model="addFormData.youtube" 
                    id="youtube"
                    placeholder="https://youtube.com/..."
                  >
                </div>

                <div class="form-group">
                  <label for="linkedin">
                    <i class="fab fa-linkedin"></i>
                    لينكد إن
                  </label>
                  <input 
                    type="url" 
                    v-model="addFormData.linkedin" 
                    id="linkedin"
                    placeholder="https://linkedin.com/..."
                  >
                </div>
              </div>
            </div>

            <!-- Programs -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-book"></i>
                البرامج الدراسية
              </h3>
              <div class="programs-list">
                <div v-for="(faculty, index) in addFormData.faculties" :key="index" class="faculty-item">
                  <div class="faculty-header">
                    <h4>
                      <i class="fas fa-graduation-cap"></i>
                      {{ faculty.faculty || `كلية ${index + 1}` }}
                    </h4>
                    <div class="faculty-actions">
                      <template v-if="!collapsedSections.faculties[index]">
                        <button type="button" class="save-btn" @click="saveFaculty(index, 'add')">
                          <i class="fas fa-save"></i>
                          حفظ
                        </button>
                      </template>
                      <template v-else>
                        <button type="button" class="toggle-btn" @click="toggleSection('faculties', index)">
                          <i class="fas fa-edit"></i>
                          تعديل
                        </button>
                      </template>
                      <button type="button" class="remove-btn" @click="removeFaculty(index, 'add')">
                        <i class="fas fa-trash"></i>
                        حذف
                      </button>
                    </div>
                  </div>
                  <div class="form-grid" v-show="!collapsedSections.faculties[index]">
                    <div class="form-group">
                      <label :for="'faculty_' + index">اسم الكلية</label>
                      <input 
                        type="text" 
                        v-model="faculty.faculty" 
                        :id="'faculty_' + index"
                        placeholder="أدخل اسم الكلية"
                      >
                    </div>
                    <div class="form-group">
                      <label :for="'section_' + index">الشعبة</label>
                      <input 
                        type="text" 
                        v-model="faculty.section" 
                        :id="'section_' + index"
                        placeholder="أدخل اسم الشعبة"
                      >
                    </div>
                    <div class="form-group">
                      <label :for="'normal_or_Dual_' + index">نوع البرنامج</label>
                      <select v-model="faculty.normal_or_Dual" :id="'normal_or_Dual_' + index">
                        <option value="normal">عادي</option>
                        <option value="dual">مزدوج</option>
                      </select>
                    </div>
                    <div class="form-group full-width">
                      <label :for="'programs_' + index">البرامج</label>
                      <textarea 
                        v-model="faculty.programs" 
                        :id="'programs_' + index" 
                        rows="3" 
                        placeholder="أدخل البرامج مفصولة بفواصل"
                      ></textarea>
                    </div>

                    <!-- Fees Section -->
                    <div class="form-group">
                      <label>رسوم الوافدين</label>
                      <div class="fees-grid">
                        <input 
                          type="number" 
                          v-model="faculty.feesNatives" 
                          placeholder="السنة الأولى"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.feesNatives2" 
                          placeholder="السنة الثانية"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.feesNatives3" 
                          placeholder="السنة الثالثة"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.feesNatives4" 
                          placeholder="السنة الرابعة"
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label>رسوم المصريين</label>
                      <div class="fees-grid">
                        <input 
                          type="number" 
                          v-model="faculty.feesEgyption" 
                          placeholder="السنة الأولى"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.feesEgyption2" 
                          placeholder="السنة الثانية"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.feesEgyption3" 
                          placeholder="السنة الثالثة"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.feesEgyption4" 
                          placeholder="السنة الرابعة"
                        >
                      </div>
                    </div>

                    <!-- Admission Scores Section -->
                    <div class="form-group">
                      <label>الحدود الدنيا - ثانوية عامة</label>
                      <div class="scores-grid">
                        <input 
                          type="number" 
                          v-model="faculty.thanwyaa_firstYear_score" 
                          placeholder="السنة الأولى"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.thanwyaa_secondYear_score" 
                          placeholder="السنة الثانية"
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label>الحدود الدنيا - أزهر</label>
                      <div class="scores-grid">
                        <input 
                          type="number" 
                          v-model="faculty.azhar_firstYear_score" 
                          placeholder="السنة الأولى"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.azhar_secondYear_score" 
                          placeholder="السنة الثانية"
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label>الحدود الدنيا - عربي/انجليزي</label>
                      <div class="scores-grid">
                        <input 
                          type="number" 
                          v-model="faculty.Arabenglish_firstYear_score" 
                          placeholder="السنة الأولى"
                        >
                        <input 
                          type="number" 
                          v-model="faculty.Arabenglish_secondYear_score" 
                          placeholder="السنة الثانية"
                        >
                      </div>
                    </div>

                    <div class="form-group">
                      <label>الحدود الدنيا - وافدين</label>
                      <input 
                        type="number" 
                        v-model="faculty.wafdeen_score" 
                        placeholder="الحد الأدنى للوافدين"
                        class="full-width-input"
                      >
                    </div>
                  </div>
                </div>
                <button type="button" class="add-btn" @click="addFaculty('add')">
                  <i class="fas fa-plus"></i>
                  إضافة كلية
                </button>
              </div>
            </div>

            <!-- International Programs -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-globe-americas"></i>
                البرامج الدولية
              </h3>
              <div class="form-group">
                <label for="international_programs">رابط معلومات البرامج الدولية</label>
                <input 
                  type="url" 
                  v-model="addFormData.international_programs" 
                  id="international_programs"
                  placeholder="https://example.com/international-programs"
                >
              </div>
            </div>

            <!-- Dorms -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-home"></i>
                السكن الجامعي
              </h3>
              <div class="form-group">
                <label for="dorms_link">رابط معلومات السكن</label>
                <input 
                  type="url" 
                  v-model="addFormData.dorms_link" 
                  id="dorms_link"
                  placeholder="https://example.com/dorms"
                >
              </div>
              <div class="dorms-list">
                <div v-for="(dorm, index) in addFormData.dorms" :key="index" class="dorm-item">
                  <div class="dorm-header">
                    <h4>
                      <i class="fas fa-building"></i>
                      {{ dorm.type || `سكن ${index + 1}` }}
                    </h4>
                    <div class="dorm-actions">
                      <template v-if="!collapsedSections.dorms[index]">
                        <button type="button" class="save-btn" @click="saveDorm(index, 'add')">
                          <i class="fas fa-save"></i>
                          حفظ
                        </button>
                      </template>
                      <template v-else>
                        <button type="button" class="toggle-btn" @click="toggleSection('dorms', index)">
                          <i class="fas fa-edit"></i>
                          تعديل
                        </button>
                      </template>
                      <button type="button" class="remove-btn" @click="removeDorm(index, 'add')">
                        <i class="fas fa-trash"></i>
                        حذف
                      </button>
                    </div>
                  </div>
                  <div class="form-grid" v-show="!collapsedSections.dorms[index]">
                    <div class="form-group">
                      <label :for="'dorm_type_' + index">نوع السكن</label>
                      <input 
                        type="text" 
                        v-model="dorm.type" 
                        :id="'dorm_type_' + index"
                        placeholder="أدخل نوع السكن"
                      >
                    </div>
                    <div class="form-group">
                      <label :for="'dorm_price_' + index">السعر</label>
                      <input 
                        type="number" 
                        v-model="dorm.price" 
                        :id="'dorm_price_' + index"
                        placeholder="أدخل سعر السكن"
                        class="full-width-input"
                      >
                    </div>
                  </div>
                </div>
                <button type="button" class="add-btn" @click="addDorm('add')">
                  <i class="fas fa-plus"></i>
                  إضافة سكن
                </button>
              </div>
            </div>

            <!-- Transportation -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-bus"></i>
                الأنتقالات
              </h3>
              <div class="form-group">
                <label for="transportation_link">رابط الأنتقالات</label>
                <input 
                  type="url" 
                  v-model="addFormData.transportation_link" 
                  id="transportation_link"
                  placeholder="https://example.com/transportation"
                >
              </div>
              <div class="transportation-list">
                <div v-for="(trans, index) in addFormData.transportation" :key="index" class="transportation-item">
                  <div class="transportation-header">
                    <h4>
                      <i class="fas fa-route"></i>
                      {{ trans.type || `وسيلة نقل ${index + 1}` }}
                    </h4>
                    <div class="transportation-actions">
                      <template v-if="!collapsedSections.transportation[index]">
                        <button type="button" class="save-btn" @click="saveTransportation(index, 'add')">
                          <i class="fas fa-save"></i>
                          حفظ
                        </button>
                      </template>
                      <template v-else>
                        <button type="button" class="toggle-btn" @click="toggleSection('transportation', index)">
                          <i class="fas fa-edit"></i>
                          تعديل
                        </button>
                      </template>
                      <button type="button" class="remove-btn" @click="removeTransportation(index, 'add')">
                        <i class="fas fa-trash"></i>
                        حذف
                      </button>
                    </div>
                  </div>
                  <div class="form-grid" v-show="!collapsedSections.transportation[index]">
                    <div class="form-group">
                      <label :for="'trans_type_' + index">نوع الوسيلة</label>
                      <input 
                        type="text" 
                        v-model="trans.type" 
                        :id="'trans_type_' + index"
                        placeholder="أدخل نوع وسيلة النقل"
                      >
                    </div>
                    <div class="form-group">
                      <label :for="'trans_price_' + index">السعر</label>
                      <input 
                        type="number" 
                        v-model="trans.price" 
                        :id="'trans_price_' + index"
                        placeholder="أدخل سعر وسيلة النقل"
                        class="full-width-input"
                      >
                    </div>
                  </div>
                </div>
                <button type="button" class="add-btn" @click="addTransportation('add')">
                  <i class="fas fa-plus"></i>
                  إضافة وسيلة نقل
                </button>
              </div>
            </div>

            <!-- Scholarships -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-award"></i>
                المنح الدراسية
              </h3>
              <div class="form-group">
                <label for="scholarship_link">رابط تفاصيل المنح</label>
                <input 
                  type="url" 
                  v-model="addFormData.scholarship_link" 
                  id="scholarship_link"
                  placeholder="https://example.com/scholarships"
                >
              </div>
            </div>

            <!-- Admission Links -->
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-user-graduate"></i>
                روابط التقديم
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="Egyptian_Admission_link">رابط التقديم للطلاب المصريين</label>
                  <input 
                    type="url" 
                    v-model="addFormData.Egyptian_Admission_link" 
                    id="Egyptian_Admission_link"
                    placeholder="https://example.com/egyptian-admission"
                  >
                </div>
                <div class="form-group">
                  <label for="Egyptian_Admission_link2">رابط التقديم للطلاب المصريين (البرامج الدولية)</label>
                  <input 
                    type="url" 
                    v-model="addFormData.Egyptian_Admission_link2" 
                    id="Egyptian_Admission_link2"
                    placeholder="https://example.com/egyptian-admission-international"
                  >
                </div>
                <div class="form-group">
                  <label for="Egyptian_Transfer_link">رابط التحويل للطلاب المصريين</label>
                  <input 
                    type="url" 
                    v-model="addFormData.Egyptian_Transfer_link" 
                    id="Egyptian_Transfer_link"
                    placeholder="https://example.com/egyptian-transfer"
                  >
                </div>
                <div class="form-group">
                  <label for="Wafdeen_Admission_link">رابط التقديم للطلاب الوافدين</label>
                  <input 
                    type="url" 
                    v-model="addFormData.Wafdeen_Admission_link" 
                    id="Wafdeen_Admission_link"
                    placeholder="https://example.com/wafdeen-admission"
                  >
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <i :class="activeTab === 'edit' ? 'fas fa-save' : 'fas fa-plus'"></i>
                {{ activeTab === 'edit' ? 'حفظ التعديلات' : 'إضافة الجامعة' }}
              </button>
              <button v-if="activeTab === 'edit'" type="button" class="cancel-btn" @click="cancelEdit">
                <i class="fas fa-times"></i>
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Current Universities Section -->
    <div v-if="activeTab === 'manage'" class="section-container">
      <div class="section-header">
        <h2>الجامعات الحالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterUniversities"
          >
        </div>
      </div>
      <div v-if="loading.all" class="loading-container">
        <div class="spinner"></div>
        <p>جاري تحميل الجامعات...</p>
      </div>
      <div v-else class="universities-grid">
        <!-- Private Universities -->
        <div v-if="loading.private" class="loading-section">
          <div class="spinner"></div>
          <p>جاري تحميل الجامعات الخاصة...</p>
        </div>
        <div v-else-if="privateUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات الخاصة</h2>
          <div class="universities-list">
            <div v-for="university in privateUniversities" :key="university.id" class="university-card">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
              <div class="university-actions">
                <button class="action-btn edit" @click="handleEditFromList(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="handleDeleteFromList(university)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- National Universities -->
        <div v-if="loading.national" class="loading-section">
          <div class="spinner"></div>
          <p>جاري تحميل الجامعات الأهلية...</p>
        </div>
        <div v-else-if="nationalUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات الأهلية</h2>
          <div class="universities-list">
            <div v-for="university in nationalUniversities" :key="university.id" class="university-card">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
              <div class="university-actions">
                <button class="action-btn edit" @click="handleEditFromList(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="handleDeleteFromList(university)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Special Universities -->
        <div v-if="loading.special" class="loading-section">
          <div class="spinner"></div>
          <p>جاري تحميل الجامعات ذات طبيعة خاصة...</p>
        </div>
        <div v-else-if="specialUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات ذات طبيعة خاصة</h2>
          <div class="universities-list">
            <div v-for="university in specialUniversities" :key="university.id" class="university-card">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
              <div class="university-actions">
                <button class="action-btn edit" @click="handleEditFromList(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="handleDeleteFromList(university)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- International Universities -->
        <div v-if="loading.international" class="loading-section">
          <div class="spinner"></div>
          <p>جاري تحميل الجامعات الدولية...</p>
        </div>
        <div v-else-if="internationalUniversities.length" class="university-section">
          <h2 class="section-title">الجامعات الدولية</h2>
          <div class="universities-list">
            <div v-for="university in internationalUniversities" :key="university.id" class="university-card">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
              <div class="university-actions">
                <button class="action-btn edit" @click="handleEditFromList(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="handleDeleteFromList(university)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit University Section -->
    <div v-if="activeTab === 'edit'" class="section-container">
      <div class="section-header">
        <h2>تحديث جامعة حالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="editSearchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterEditUniversities"
          >
        </div>
      </div>
      <div v-if="!selectedUniversityForEdit" class="universities-grid">
        <!-- Private Universities -->
        <div v-if="filteredEditUniversities.filter(uni => uni.type === 'private').length" class="university-section">
          <h2 class="section-title">الجامعات الخاصة</h2>
          <div class="universities-list">
            <div v-for="university in filteredEditUniversities.filter(uni => uni.type === 'private')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForEdit(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>

        <!-- National Universities -->
        <div v-if="filteredEditUniversities.filter(uni => uni.type === 'national').length" class="university-section">
          <h2 class="section-title">الجامعات الأهلية</h2>
          <div class="universities-list">
            <div v-for="university in filteredEditUniversities.filter(uni => uni.type === 'national')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForEdit(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>

        <!-- Special Universities -->
        <div v-if="filteredEditUniversities.filter(uni => uni.type === 'special').length" class="university-section">
          <h2 class="section-title">الجامعات ذات طبيعة خاصة</h2>
          <div class="universities-list">
            <div v-for="university in filteredEditUniversities.filter(uni => uni.type === 'special')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForEdit(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>

        <!-- International Universities -->
        <div v-if="filteredEditUniversities.filter(uni => uni.type === 'international').length" class="university-section">
          <h2 class="section-title">الجامعات الدولية</h2>
          <div class="universities-list">
            <div v-for="university in filteredEditUniversities.filter(uni => uni.type === 'international')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForEdit(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="form-section">
      <div class="form-card">
          <div class="form-header">
            <h2 class="section-title">تعديل بيانات الجامعة</h2>
            <button class="back-btn" @click="selectedUniversityForEdit = null">
              <i class="fas fa-arrow-right"></i>
              العودة للقائمة
            </button>
          </div>
          <form @submit.prevent="updateUniversity()">
          <!-- Basic University Information -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-university"></i>
              بيانات الجامعة الأساسية
            </h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="university_code">
                  <i class="fas fa-hashtag"></i>
                  الرمز المختصر للجامعة
                </label>
                <input 
                  type="text" 
                  v-model="editFormData.university_code" 
                  id="university_code" 
                  required
                  placeholder="مثال: ACU, BUE, etc."
                >
              </div>

              <div class="form-group">
                <label for="university_Arabic_Name">
                  <i class="fas fa-graduation-cap"></i>
                  اسم الجامعة
                </label>
                <input 
                  type="text" 
                  v-model="editFormData.university_Arabic_Name" 
                  id="university_Arabic_Name" 
                  required
                  placeholder="أدخل اسم الجامعة"
                >
              </div>

              <div class="form-group">
                <label for="university_Logo">
                  <i class="fas fa-image"></i>
                  رابط الشعار
                </label>
                <div class="input-with-hint">
                  <input 
                    type="text" 
                    v-model="editFormData.university_Logo" 
                    id="university_Logo"
                    placeholder="أدخل رابط الشعار"
                  >
                  <span class="hint">/images/Logos/Universities/.png</span>
                </div>
              </div>

              <div class="form-group">
                <label for="type">
                  <i class="fas fa-tag"></i>
                  نوع الجامعة
                </label>
                <select v-model="editFormData.type" id="type" required>
                  <option value="national">أهلية</option>
                  <option value="private">خاصة</option>
                  <option value="special">ذات طبيعة خاصة</option>
                  <option value="international">دولية</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label for="Uni_Bio">
                  <i class="fas fa-info-circle"></i>
                  نبذة عن الجامعة
                </label>
                <textarea 
                  v-model="editFormData.Uni_Bio" 
                  id="Uni_Bio" 
                  rows="4"
                  placeholder="أدخل نبذة مختصرة عن الجامعة"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="location">
                  <i class="fas fa-map-marker-alt"></i>
                  الموقع علي الخرائط
                </label>
                <input 
                  type="text" 
                  v-model="editFormData.location" 
                  id="location"
                  placeholder="أدخل موقع الجامعة"
                >
              </div>

              <div class="form-group">
                <label for="first_year">
                  <i class="fas fa-calendar"></i>
                  السنة الأولى
                </label>
                <input 
                  type="text" 
                  v-model="editFormData.first_year" 
                  id="first_year"
                  placeholder="أدخل السنة الأولى"
                >
              </div>

              <div class="form-group">
                <label for="second_year">
                  <i class="fas fa-calendar"></i>
                  السنة الثانية
                </label>
                <input 
                  type="text" 
                  v-model="editFormData.second_year" 
                  id="second_year"
                  placeholder="أدخل السنة الثانية"
                >
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-address-book"></i>
              معلومات الاتصال
            </h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="website">
                  <i class="fas fa-globe"></i>
                  الموقع الإلكتروني
                </label>
                <input 
                  type="url" 
                  v-model="editFormData.website" 
                  id="website"
                  placeholder="https://example.com"
                >
              </div>

              <div class="form-group">
                <label for="phone">
                  <i class="fas fa-phone"></i>
                  رقم الهاتف
                </label>
                <input 
                  type="tel" 
                  v-model="editFormData.phone" 
                  id="phone"
                  placeholder="+20 XXX XXX XXXX"
                >
              </div>

              <div class="form-group">
                <label for="email">
                  <i class="fas fa-envelope"></i>
                  البريد الإلكتروني
                </label>
                <input 
                  type="email" 
                  v-model="editFormData.email" 
                  id="email"
                  placeholder="example@university.edu"
                >
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-share-alt"></i>
              روابط التواصل الاجتماعي
            </h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="facebook">
                  <i class="fab fa-facebook"></i>
                  فيسبوك
                </label>
                <input 
                  type="url" 
                  v-model="editFormData.facebook" 
                  id="facebook"
                  placeholder="https://facebook.com/..."
                >
              </div>

              <div class="form-group">
                <label for="instagram">
                  <i class="fab fa-instagram"></i>
                  انستجرام
                </label>
                <input 
                  type="url" 
                  v-model="editFormData.instagram" 
                  id="instagram"
                  placeholder="https://instagram.com/..."
                >
              </div>

              <div class="form-group">
                <label for="youtube">
                  <i class="fab fa-youtube"></i>
                  يوتيوب
                </label>
                <input 
                  type="url" 
                  v-model="editFormData.youtube" 
                  id="youtube"
                  placeholder="https://youtube.com/..."
                >
              </div>

              <div class="form-group">
                <label for="linkedin">
                  <i class="fab fa-linkedin"></i>
                  لينكد إن
                </label>
                <input 
                  type="url" 
                  v-model="editFormData.linkedin" 
                  id="linkedin"
                  placeholder="https://linkedin.com/..."
                >
              </div>
            </div>
          </div>

          <!-- Programs -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-book"></i>
              البرامج الدراسية
            </h3>
            <div class="programs-list">
              <div v-for="(faculty, index) in editFormData.faculties" :key="index" class="faculty-item">
                <div class="form-header">
                  <h4>{{ faculty.faculty || 'كلية جديدة' }}</h4>
                  <button type="button" class="toggle-btn" @click="toggleSection('faculties', index)">
                    <i class="fas" :class="collapsedSections.faculties[index] ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                    {{ collapsedSections.faculties[index] ? 'عرض' : 'إخفاء' }}
                  </button>
                </div>
                <div class="form-grid" v-show="!collapsedSections.faculties[index]">
                  <div class="form-group">
                    <label :for="'faculty_' + index">اسم الكلية</label>
                    <input 
                      type="text" 
                      v-model="faculty.faculty" 
                      :id="'faculty_' + index"
                      placeholder="أدخل اسم الكلية"
                    >
                  </div>
                  <div class="form-group">
                    <label :for="'section_' + index">الشعبة</label>
                    <input 
                      type="text" 
                      v-model="faculty.section" 
                      :id="'section_' + index"
                      placeholder="أدخل اسم الشعبة"
                    >
                  </div>
                  <div class="form-group">
                    <label :for="'normal_or_Dual_' + index">نوع البرنامج</label>
                    <select v-model="faculty.normal_or_Dual" :id="'normal_or_Dual_' + index">
                      <option value="normal">عادي</option>
                      <option value="dual">مزدوج</option>
                    </select>
                  </div>
                  <div class="form-group full-width">
                    <label :for="'programs_' + index">البرامج</label>
                    <textarea 
                      v-model="faculty.programs" 
                      :id="'programs_' + index" 
                      rows="3" 
                      placeholder="أدخل البرامج مفصولة بفواصل"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- Remove the add faculty button -->
            </div>
          </div>

          <!-- International Programs -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-globe-americas"></i>
              البرامج الدولية
            </h3>
            <div class="form-group">
              <label for="international_programs">رابط معلومات البرامج الدولية</label>
              <input 
                type="url" 
                v-model="editFormData.international_programs" 
                id="international_programs"
                placeholder="https://example.com/international-programs"
              >
            </div>
          </div>

          <!-- Dorms -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-home"></i>
              السكن الجامعي
            </h3>
            <div class="form-group">
              <label for="dorms_link">رابط معلومات السكن</label>
              <input 
                type="url" 
                v-model="editFormData.dorms_link" 
                id="dorms_link"
                placeholder="https://example.com/dorms"
              >
            </div>
            <div v-for="(dorm, index) in editFormData.dorms" :key="index" class="dorm-item">
              <div class="form-header">
                <h4>{{ dorm.type || 'سكن جديد' }}</h4>
                <button type="button" class="toggle-btn" @click="toggleSection('dorms', index)">
                  <i class="fas" :class="collapsedSections.dorms[index] ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                  {{ collapsedSections.dorms[index] ? 'عرض' : 'إخفاء' }}
                </button>
              </div>
              <div class="form-grid" v-show="!collapsedSections.dorms[index]">
                <div class="form-group">
                  <label :for="'dorm_type_' + index">نوع السكن</label>
                  <input 
                    type="text" 
                    v-model="dorm.type" 
                    :id="'dorm_type_' + index"
                    placeholder="أدخل نوع السكن"
                  >
                </div>
                <div class="form-group">
                  <label :for="'dorm_price_' + index">السعر</label>
                  <input 
                    type="text" 
                    v-model="dorm.price" 
                    :id="'dorm_price_' + index"
                    placeholder="أدخل السعر"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Transportation -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-bus"></i>
              الأنتقالات
            </h3>
            <div class="form-group">
              <label for="transportation_link">رابط الأنتقالات</label>
              <input 
                type="url" 
                v-model="editFormData.transportation_link" 
                id="transportation_link"
                placeholder="https://example.com/transportation"
              >
            </div>
            <div v-for="(trans, index) in editFormData.transportation" :key="index" class="transportation-item">
              <div class="form-header">
                <h4>{{ trans.type || 'مواصلات جديدة' }}</h4>
                <button type="button" class="toggle-btn" @click="toggleSection('transportation', index)">
                  <i class="fas" :class="collapsedSections.transportation[index] ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
                  {{ collapsedSections.transportation[index] ? 'عرض' : 'إخفاء' }}
                </button>
              </div>
              <div class="form-grid" v-show="!collapsedSections.transportation[index]">
                <div class="form-group">
                  <label :for="'trans_type_' + index">نوع الأنتقالات</label>
                  <input 
                    type="text" 
                    v-model="trans.type" 
                    :id="'trans_type_' + index"
                    placeholder="أدخل نوع الأنتقالات"
                  >
                </div>
                <div class="form-group">
                  <label :for="'trans_price_' + index">السعر</label>
                  <input 
                    type="text" 
                    v-model="trans.price" 
                    :id="'trans_price_' + index"
                    placeholder="أدخل السعر"
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Scholarships -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-award"></i>
              المنح الدراسية
            </h3>
            <div class="form-group">
              <label for="scholarship_link">رابط تفاصيل المنح</label>
              <input 
                type="url" 
                v-model="editFormData.scholarship_link" 
                id="scholarship_link"
                placeholder="https://example.com/scholarships"
              >
            </div>
          </div>

          <!-- Admission Links -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-user-graduate"></i>
              روابط التقديم
            </h3>
            <div class="form-grid">
              <div class="form-group">
                <label for="Egyptian_Admission_link">رابط التقديم للطلاب المصريين</label>
                <input 
                  type="url" 
                  v-model="editFormData.Egyptian_Admission_link" 
                  id="Egyptian_Admission_link"
                  placeholder="https://example.com/egyptian-admission"
                >
              </div>
              <div class="form-group">
                <label for="Egyptian_Admission_link2">رابط التقديم للطلاب المصريين (البرامج الدولية)</label>
                <input 
                  type="url" 
                  v-model="editFormData.Egyptian_Admission_link2" 
                  id="Egyptian_Admission_link2"
                  placeholder="https://example.com/egyptian-admission-international"
                >
              </div>
              <div class="form-group">
                <label for="Egyptian_Transfer_link">رابط التحويل للطلاب المصريين</label>
                <input 
                  type="url" 
                  v-model="editFormData.Egyptian_Transfer_link" 
                  id="Egyptian_Transfer_link"
                  placeholder="https://example.com/egyptian-transfer"
                >
              </div>
              <div class="form-group">
                <label for="Wafdeen_Admission_link">رابط التقديم للطلاب الوافدين</label>
                <input 
                  type="url" 
                  v-model="editFormData.Wafdeen_Admission_link" 
                  id="Wafdeen_Admission_link"
                  placeholder="https://example.com/wafdeen-admission"
                >
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">
                <i :class="activeTab === 'edit' ? 'fas fa-save' : 'fas fa-plus'"></i>
                {{ activeTab === 'edit' ? 'حفظ التعديلات' : 'إضافة الجامعة' }}
            </button>
              <button v-if="activeTab === 'edit'" type="button" class="cancel-btn" @click="cancelEdit">
              <i class="fas fa-times"></i>
              إلغاء
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>

    <!-- Delete University Section -->
    <div v-if="activeTab === 'delete'" class="section-container">
      <div class="section-header">
        <h2>حذف بيانات الجامعة</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="deleteSearchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterDeleteUniversities"
          >
        </div>
      </div>
      <div v-if="!selectedUniversityForDelete" class="universities-grid">
        <!-- Private Universities -->
        <div v-if="filteredDeleteUniversities.filter(uni => uni.type === 'private').length" class="university-section">
          <h2 class="section-title">الجامعات الخاصة</h2>
          <div class="universities-list">
            <div v-for="university in filteredDeleteUniversities.filter(uni => uni.type === 'private')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForDelete(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>

        <!-- National Universities -->
        <div v-if="filteredDeleteUniversities.filter(uni => uni.type === 'national').length" class="university-section">
          <h2 class="section-title">الجامعات الأهلية</h2>
          <div class="universities-list">
            <div v-for="university in filteredDeleteUniversities.filter(uni => uni.type === 'national')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForDelete(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>

        <!-- Special Universities -->
        <div v-if="filteredDeleteUniversities.filter(uni => uni.type === 'special').length" class="university-section">
          <h2 class="section-title">الجامعات ذات طبيعة خاصة</h2>
          <div class="universities-list">
            <div v-for="university in filteredDeleteUniversities.filter(uni => uni.type === 'special')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForDelete(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>

        <!-- International Universities -->
        <div v-if="filteredDeleteUniversities.filter(uni => uni.type === 'international').length" class="university-section">
          <h2 class="section-title">الجامعات الدولية</h2>
          <div class="universities-list">
            <div v-for="university in filteredDeleteUniversities.filter(uni => uni.type === 'international')" 
                 :key="university.id" 
                 class="university-card"
                 @click="selectUniversityForDelete(university)">
              <div class="university-image">
                <img 
                  :src="university.university_Logo" 
                  :alt="university.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3 class="university-name">{{ university.university_Arabic_Name }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="form-section">
        <div class="form-card">
          <div class="form-header">
            <h2 class="section-title">حذف بيانات الجامعة</h2>
            <button class="back-btn" @click="selectedUniversityForDelete = null">
              <i class="fas fa-arrow-right"></i>
              العودة للقائمة
            </button>
          </div>
          <div class="delete-content">
            <div class="university-info">
              <div class="university-image">
                <img 
                  :src="selectedUniversityForDelete?.university_Logo" 
                  :alt="selectedUniversityForDelete?.university_Arabic_Name"
                  @error="handleImageError"
                >
              </div>
              <h3>{{ selectedUniversityForDelete?.university_Arabic_Name }}</h3>
              <p class="university-type">{{ getUniversityTypeName(selectedUniversityForDelete?.type) }}</p>
            </div>

            <!-- Delete Whole University Option -->
            <div class="delete-section warning-section">
              <h3 class="delete-section-title">
                <i class="fas fa-exclamation-triangle"></i>
                حذف الجامعة بالكامل
              </h3>
              <div class="warning-message">
                <p>سيتم حذف جميع البيانات المرتبطة بالجامعة بما في ذلك الكليات والسكن والأنتقالات.</p>
                <button class="delete-university-btn" @click="confirmDeleteUniversity">
                  <i class="fas fa-trash"></i>
                  حذف الجامعة بالكامل
                </button>
              </div>
            </div>

            <!-- Delete Sections -->
            <div class="delete-sections-nav">
              <button 
                v-for="section in deleteSections" 
                :key="section.id"
                :class="['section-nav-btn', { active: activeDeleteSection === section.id }]"
                @click="activeDeleteSection = section.id"
              >
                <i :class="section.icon"></i>
                {{ section.label }}
              </button>
            </div>

            <!-- Basic Information Section -->
            <div v-if="activeDeleteSection === 'basic'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-university"></i>
                بيانات الجامعة الأساسية
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>الرمز المختصر</h4>
                    <p>{{ selectedUniversityForDelete?.university_code }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteBasicInfo('university_code')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>اسم الجامعة</h4>
                    <p>{{ selectedUniversityForDelete?.university_Arabic_Name }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteBasicInfo('university_Arabic_Name')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>نوع الجامعة</h4>
                    <p>{{ getUniversityTypeName(selectedUniversityForDelete?.type) }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteBasicInfo('type')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>نبذة عن الجامعة</h4>
                    <p>{{ selectedUniversityForDelete?.Uni_Bio }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteBasicInfo('Uni_Bio')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- Contact Information Section -->
            <div v-if="activeDeleteSection === 'contact'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-address-book"></i>
                معلومات الاتصال
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>الموقع الإلكتروني</h4>
                    <p>{{ selectedUniversityForDelete?.website }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteContactInfo('website')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رقم الهاتف</h4>
                    <p>{{ selectedUniversityForDelete?.phone }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteContactInfo('phone')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>البريد الإلكتروني</h4>
                    <p>{{ selectedUniversityForDelete?.email }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteContactInfo('email')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- Social Media Section -->
            <div v-if="activeDeleteSection === 'social'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-share-alt"></i>
                روابط التواصل الاجتماعي
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>فيسبوك</h4>
                    <p>{{ selectedUniversityForDelete?.facebook }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteSocialMedia('facebook')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>انستجرام</h4>
                    <p>{{ selectedUniversityForDelete?.instagram }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteSocialMedia('instagram')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>يوتيوب</h4>
                    <p>{{ selectedUniversityForDelete?.youtube }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteSocialMedia('youtube')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>لينكد إن</h4>
                    <p>{{ selectedUniversityForDelete?.linkedin }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteSocialMedia('linkedin')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- Faculties Section -->
            <div v-if="activeDeleteSection === 'faculties'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-graduation-cap"></i>
                الكليات
              </h3>
              <div class="delete-items-list">
                <div v-for="(faculty, index) in selectedUniversityForDelete?.faculties" 
                     :key="index" 
                     class="delete-item">
                  <div class="item-info">
                    <h4>{{ faculty.faculty }}</h4>
                    <p>الشعبة: {{ faculty.section }}</p>
                    <p>نوع البرنامج: {{ faculty.normal_or_Dual === 'normal' ? 'عادي' : 'مزدوج' }}</p>
                    <p class="programs">البرامج: {{ faculty.programs }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteFaculty(faculty)">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- Dorms Section -->
            <div v-if="activeDeleteSection === 'dorms'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-home"></i>
                السكن الجامعي
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط معلومات السكن</h4>
                    <p>{{ selectedUniversityForDelete?.dorms_link }}</p>
                  </div>
                </div>
                <div v-for="(dorm, index) in selectedUniversityForDelete?.dorms" 
                     :key="index" 
                     class="delete-item">
                  <div class="item-info">
                    <h4>{{ dorm.type }}</h4>
                    <p class="price">السعر: {{ dorm.price }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteDorm(dorm)">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- Transportation Section -->
            <div v-if="activeDeleteSection === 'transportation'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-bus"></i>
                الأنتقالات
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط الأنتقالات</h4>
                    <p>{{ selectedUniversityForDelete?.transportation_link }}</p>
                  </div>
                </div>
                <div v-for="(trans, index) in selectedUniversityForDelete?.transportation" 
                     :key="index" 
                     class="delete-item">
                  <div class="item-info">
                    <h4>{{ trans.type }}</h4>
                    <p class="price">السعر: {{ trans.price }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteTransportation(trans)">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- International Programs Section -->
            <div v-if="activeDeleteSection === 'international'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-globe-americas"></i>
                البرامج الدولية
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط البرامج الدولية</h4>
                    <p>{{ selectedUniversityForDelete?.international_programs }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteInternationalPrograms">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>

            <!-- Admission Links Section -->
            <div v-if="activeDeleteSection === 'admission'" class="delete-section">
              <h3 class="delete-section-title">
                <i class="fas fa-user-graduate"></i>
                روابط التقديم
              </h3>
              <div class="delete-items-list">
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط التقديم للطلاب المصريين</h4>
                    <p>{{ selectedUniversityForDelete?.Egyptian_Admission_link }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteAdmissionLink('Egyptian_Admission_link')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط التقديم للطلاب المصريين (البرامج الدولية)</h4>
                    <p>{{ selectedUniversityForDelete?.Egyptian_Admission_link2 }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteAdmissionLink('Egyptian_Admission_link2')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط التحويل للطلاب المصريين</h4>
                    <p>{{ selectedUniversityForDelete?.Egyptian_Transfer_link }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteAdmissionLink('Egyptian_Transfer_link')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="delete-item">
                  <div class="item-info">
                    <h4>رابط التقديم للطلاب الوافدين</h4>
                    <p>{{ selectedUniversityForDelete?.Wafdeen_Admission_link }}</p>
                  </div>
                  <button class="delete-item-btn" @click="deleteAdmissionLink('Wafdeen_Admission_link')">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// API Configuration
const API_CONFIG = {
  BASE_URL: 'https://nuft-website-backend.vercel.app',
  ENDPOINTS: {
    NATIONAL: {
      LINKS: '/national/links',
      FACULTY: {
        ADD: '/national/faculty/add',
        GET: (code) => `/national/faculty/${code}`,
        UPDATE: (code) => `/national/faculty/${code}`
      },
      DORMS: {
        ADD: '/national/dorms/add',
        GET: (code) => `/national/dorms/${code}`,
        UPDATE: (code) => `/national/dorms/${code}`
      },
      TRANSPORTATION: {
        ADD: '/national/transportation/add',
        GET: (code) => `/national/transportation/${code}`,
        UPDATE: (code) => `/national/transportation/${code}`
      },
      DELETE: (code) => `/national/${code}`
    },
    PRIVATE: {
      LINKS: '/private/links',
      FACULTY: {
        ADD: '/private/faculty/add',
        GET: (code) => `/private/faculty/${code}`,
        UPDATE: (code) => `/private/faculty/${code}`
      },
      DORMS: {
        ADD: '/private/dorms/add',
        GET: (code) => `/private/dorms/${code}`,
        UPDATE: (code) => `/private/dorms/${code}`
      },
      TRANSPORTATION: {
        ADD: '/private/transportation/add',
        GET: (code) => `/private/transportation/${code}`,
        UPDATE: (code) => `/private/transportation/${code}`
      },
      DELETE: (code) => `/private/${code}`
    },
    SPECIAL: {
      LINKS: '/special/links',
      FACULTY: {
        ADD: '/special/faculty/add',
        GET: (code) => `/special/faculty/${code}`,
        UPDATE: (code) => `/special/faculty/${code}`
      },
      DORMS: {
        ADD: '/special/dorms/add',
        GET: (code) => `/special/dorms/${code}`,
        UPDATE: (code) => `/special/dorms/${code}`
      },
      TRANSPORTATION: {
        ADD: '/special/transportation/add',
        GET: (code) => `/special/transportation/${code}`,
        UPDATE: (code) => `/special/transportation/${code}`
      },
      DELETE: (code) => `/special/${code}`
    },
    INTERNATIONAL: {
      LINKS: '/international/links',
      FACULTY: {
        ADD: '/international/faculty/add',
        GET: (code) => `/international/faculty/${code}`,
        UPDATE: (code) => `/international/faculty/${code}`
      },
      DORMS: {
        ADD: '/international/dorms/add',
        GET: (code) => `/international/dorms/${code}`,
        UPDATE: (code) => `/international/dorms/${code}`
      },
      TRANSPORTATION: {
        ADD: '/international/transportation/add',
        GET: (code) => `/international/transportation/${code}`,
        UPDATE: (code) => `/international/transportation/${code}`
      },
      DELETE: (code) => `/international/${code}`
    }
  }
};

export default {
  name: 'UniversityAdmin',
  data() {
    return {
      // Form fields
      addFormData: {
        university_code: '',
        university_Arabic_Name: '',
        university_Logo: '',
        type: 'national',
        Uni_Bio: '',
        location: '',
        first_year: '',
        second_year: '',
        website: '',
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        faculties: [],
        international_programs: '',
        dorms: [],
        transportation: [],
        dorms_link: '',
        transportation_link: '',
        scholarship_link: '',
        Egyptian_Admission_link: '',
        Egyptian_Admission_link2: '',
        Egyptian_Transfer_link: '',
        Wafdeen_Admission_link: ''
      },
      editFormData: {
        university_code: '',
        university_Arabic_Name: '',
        university_Logo: '',
        type: 'national',
        Uni_Bio: '',
        location: '',
        first_year: '',
        second_year: '',
        website: '',
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        faculties: [],
        international_programs: '',
        dorms: [],
        transportation: [],
        dorms_link: '',
        transportation_link: '',
        scholarship_link: '',
        Egyptian_Admission_link: '',
        Egyptian_Transfer_link: '',
        Wafdeen_Admission_link: ''
      },

      // Updated state management
      universitiesData: [],
      loading: {
        private: false,
        national: false,
        special: false,
        international: false,
        all: false,
        details: {} // Add loading state for individual university details
      },
      error: {
        private: null,
        national: null,
        special: null,
        international: null
      },
      searchQuery: '',
      filteredUniversities: [],
      isEditing: false,
      editingId: null,
      isDeleting: false,
      selectedUniversity: null,
      activeTab: 'manage',
      editSearchQuery: '',
      deleteSearchQuery: '',
      filteredEditUniversities: [],
      filteredDeleteUniversities: [],
      selectedType: 'all',
      universityTypes: [
        { label: 'الكل', value: 'all' },
        { label: 'الجامعات الخاصة', value: 'private' },
        { label: 'الجامعات الأهلية', value: 'national' },
        { label: 'الجامعات ذات طبيعة خاصة', value: 'special' },
        { label: 'الجامعات الدولية', value: 'international' }
      ],
      selectedUniversityForEdit: null,
      selectedUniversityForDelete: null,
      activeDeleteSection: 'faculties',
      deleteSections: [
        { id: 'basic', label: 'البيانات الأساسية', icon: 'fas fa-university' },
        { id: 'contact', label: 'معلومات الاتصال', icon: 'fas fa-address-book' },
        { id: 'social', label: 'التواصل الاجتماعي', icon: 'fas fa-share-alt' },
        { id: 'faculties', label: 'الكليات', icon: 'fas fa-graduation-cap' },
        { id: 'dorms', label: 'السكن الجامعي', icon: 'fas fa-home' },
        { id: 'transportation', label: 'الأنتقالات', icon: 'fas fa-bus' },
        { id: 'international', label: 'البرامج الدولية', icon: 'fas fa-globe-americas' },
        { id: 'admission', label: 'روابط التقديم', icon: 'fas fa-user-graduate' }
      ],
      universityLinks: {
        website: { label: 'الموقع الإلكتروني' },
        facebook: { label: 'فيسبوك' },
        instagram: { label: 'انستجرام' },
        youtube: { label: 'يوتيوب' },
        linkedin: { label: 'لينكد إن' },
        dorms_link: { label: 'رابط السكن' },
        transportation_link: { label: 'رابط الأنتقالات' },
        scholarship_link: { label: 'رابط المنح' },
        Egyptian_Admission_link: { label: 'رابط التقديم للطلاب المصريين' },
        Egyptian_Transfer_link: { label: 'رابط التحويل للطلاب المصريين' },
        Wafdeen_Admission_link: { label: 'رابط التقديم للطلاب الوافدين' }
      },
      collapsedSections: {
        faculties: {},
        dorms: {},
        transportation: {}
      },
      // Add pagination state
      pagination: {
        page: 1,
        limit: 10,
        total: 0
      },
      expandedUniversities: new Set() // Track which universities are expanded
    };
  },
  computed: {
    privateUniversities() {
      if (this.selectedType !== 'all' && this.selectedType !== 'private') return [];
      return this.filteredUniversities.filter(uni => uni.type === 'private');
    },
    nationalUniversities() {
      if (this.selectedType !== 'all' && this.selectedType !== 'national') return [];
      return this.filteredUniversities.filter(uni => uni.type === 'national');
    },
    specialUniversities() {
      if (this.selectedType !== 'all' && this.selectedType !== 'special') return [];
      return this.filteredUniversities.filter(uni => uni.type === 'special');
    },
    internationalUniversities() {
      if (this.selectedType !== 'all' && this.selectedType !== 'international') return [];
      return this.filteredUniversities.filter(uni => uni.type === 'international');
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchUniversities() {
      this.loading.all = true;
      try {
        // Fetch universities in parallel based on selected type
        const typesToFetch = this.selectedType === 'all' 
          ? ['private', 'national', 'special', 'international']
          : [this.selectedType];

        const fetchPromises = typesToFetch.map(type => this.fetchUniversityType(type));
        await Promise.all(fetchPromises);

        // No longer fetch all details upfront
        this.filteredUniversities = this.universitiesData;
        this.filteredEditUniversities = this.universitiesData;
        this.filteredDeleteUniversities = this.universitiesData;
      } catch (error) {
        console.error('Error fetching universities:', error);
        this.universitiesData = [];
        this.filteredUniversities = [];
      } finally {
        this.loading.all = false;
      }
    },

    async fetchUniversityType(type) {
      this.loading[type] = true;
      this.error[type] = null;

      try {
        const endpoint = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS[type.toUpperCase()].LINKS}`;
        const response = await axios.get(endpoint);
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error(`Invalid data format for ${type} universities`);
        }

        // Add basic university data without details
        const universities = response.data.map(uni => ({
          id: uni.university || uni.university_code,
          university_Arabic_Name: uni.university_Arabic_Name,
          university_Logo: uni.university_Logo || '/images/default-university.png',
          type: type,
          dorms: [],
          transportation: [],
          faculties: [],
          ...uni
        }));

        this.universitiesData = [
          ...this.universitiesData.filter(u => u.type !== type),
          ...universities
        ];

      } catch (error) {
        console.error(`Error fetching ${type} universities:`, error);
        this.error[type] = `Failed to load ${type} universities`;
      } finally {
        this.loading[type] = false;
      }
    },

    // Add new method to toggle university expansion
    async toggleUniversityExpansion(university) {
      const universityId = university.id;
      
      if (this.expandedUniversities.has(universityId)) {
        // If already expanded, collapse
        this.expandedUniversities.delete(universityId);
      } else {
        // If not expanded, expand and load details
        this.expandedUniversities.add(universityId);
        await this.loadUniversityDetails(university);
      }
    },

    // New method to load university details
    async loadUniversityDetails(university) {
      const universityId = university.id;
      this.loading.details[universityId] = true;

      try {
        await this.fetchUniversityDetails(university, university.type);
      } catch (error) {
        console.error(`Error loading details for ${university.university_Arabic_Name}:`, error);
      } finally {
        this.loading.details[universityId] = false;
      }
    },

    // Modify the existing fetchUniversityDetails method
    async fetchUniversityDetails(university, type) {
      try {
        const universityCode = university.university || university.university_code;
        const typeConfig = API_CONFIG.ENDPOINTS[type.toUpperCase()];

        const [dorms, transportation, faculty] = await Promise.allSettled([
          axios.get(`${API_CONFIG.BASE_URL}${typeConfig.DORMS.GET(universityCode)}`),
          axios.get(`${API_CONFIG.BASE_URL}${typeConfig.TRANSPORTATION.GET(universityCode)}`),
          axios.get(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.GET(universityCode)}`)
        ]);

        // Update the university in the data array
        const index = this.universitiesData.findIndex(u => u.id === university.id);
        if (index !== -1) {
          this.universitiesData[index] = {
            ...this.universitiesData[index],
            dorms: dorms.status === 'fulfilled' ? dorms.value.data : [],
            transportation: transportation.status === 'fulfilled' ? transportation.value.data : [],
            faculties: faculty.status === 'fulfilled' ? faculty.value.data : []
          };
        }
      } catch (error) {
        console.error(`Error fetching details for ${university.university_Arabic_Name}:`, error);
        throw error; // Re-throw to handle in the calling method
      }
    },

    filterUniversities() {
      if (!this.searchQuery) {
        this.filteredUniversities = this.universitiesData;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredUniversities = this.universitiesData.filter(university => 
        university.university_Arabic_Name.toLowerCase().includes(query)
      );
    },
    handleImageError(event) {
      event.target.src = '/images/default-university.png';
    },
    addFaculty(formType) {
      const faculty = {
        faculty: '',
        section: '',
        normal_or_Dual: 'normal',
        programs: '',
        feesNatives: '',
        feesNatives2: '',
        feesNatives3: '',
        feesNatives4: '',
        feesEgyption: '',
        feesEgyption2: '',
        feesEgyption3: '',
        feesEgyption4: '',
        thanwyaa_firstYear_score: '',
        thanwyaa_secondYear_score: '',
        azhar_firstYear_score: '',
        azhar_secondYear_score: '',
        Arabenglish_firstYear_score: '',
        Arabenglish_secondYear_score: '',
        wafdeen_score: ''
      };
      
      if (formType === 'add') {
        this.addFormData.faculties.push(faculty);
      } else {
        this.editFormData.faculties.push(faculty);
      }
    },

    removeFaculty(index, formType) {
      if (formType === 'add') {
        this.addFormData.faculties.splice(index, 1);
      } else {
        this.editFormData.faculties.splice(index, 1);
      }
    },

    addDorm(formType) {
      const dorm = {
        type: '',
        price: ''
      };
      
      if (formType === 'add') {
        this.addFormData.dorms.push(dorm);
      } else {
        this.editFormData.dorms.push(dorm);
      }
    },

    removeDorm(index, formType) {
      if (formType === 'add') {
        this.addFormData.dorms.splice(index, 1);
      } else {
        this.editFormData.dorms.splice(index, 1);
      }
    },

    addTransportation(formType) {
      const trans = {
        type: '',
        price: ''
      };
      
      if (formType === 'add') {
        this.addFormData.transportation.push(trans);
      } else {
        this.editFormData.transportation.push(trans);
      }
    },

    removeTransportation(index, formType) {
      if (formType === 'add') {
        this.addFormData.transportation.splice(index, 1);
      } else {
        this.editFormData.transportation.splice(index, 1);
      }
    },

    editUniversity(university) {
      this.selectedUniversity = university;
      this.isEditing = true;
      this.editingId = university.id;
      this.editFormData = {
        ...this.editFormData,
        ...university,
        faculties: university.faculties || [],
        dorms: university.dorms || [],
        transportation: university.transportation || []
      };
      this.activeTab = 'edit';
      this.selectedType = 'all';
      this.filterEditUniversities();
    },
    async addUniversity() {
      try {
        const type = this.addFormData.type.toUpperCase();
        const typeConfig = API_CONFIG.ENDPOINTS[type];
        const universityCode = this.addFormData.university_code.toUpperCase();

        // Add university info and links
        await axios.post(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.ADD}`, {
          ...this.addFormData,
          university_code: universityCode
        });

        // Add faculties
        if (this.addFormData.faculties && this.addFormData.faculties.length > 0) {
          for (const faculty of this.addFormData.faculties) {
            await axios.post(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.ADD}`, {
              ...faculty,
              university: this.addFormData.university_Arabic_Name,
              university_code: universityCode
            });
          }
        }

        // Add dorms
        if (this.addFormData.dorms && this.addFormData.dorms.length > 0) {
          for (const dorm of this.addFormData.dorms) {
            await axios.post(`${API_CONFIG.BASE_URL}${typeConfig.DORMS.ADD}`, {
              ...dorm,
              spec: this.addFormData.university_Arabic_Name,
              university_code: universityCode
            });
          }
        }

        // Add transportation
        if (this.addFormData.transportation && this.addFormData.transportation.length > 0) {
          for (const trans of this.addFormData.transportation) {
            await axios.post(`${API_CONFIG.BASE_URL}${typeConfig.TRANSPORTATION.ADD}`, {
              ...trans,
              spec: this.addFormData.university_Arabic_Name,
              university_code: universityCode
            });
          }
        }

        alert('تم إضافة الجامعة بنجاح');
        this.resetAddForm();
        this.fetchUniversities();
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error adding university:', error);
        alert('حدث خطأ أثناء إضافة الجامعة');
      }
    },
    async updateUniversity() {
      try {
        const type = this.editFormData.type.toUpperCase();
        const typeConfig = API_CONFIG.ENDPOINTS[type];
        const universityCode = this.editFormData.university_code.toUpperCase();

        // Update university basic information
        await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
          university_code: universityCode,
          university_Arabic_Name: this.editFormData.university_Arabic_Name,
          university_Logo: this.editFormData.university_Logo,
          type: this.editFormData.type,
          Uni_Bio: this.editFormData.Uni_Bio,
          location: this.editFormData.location,
          website: this.editFormData.website,
          phone: this.editFormData.phone,
          email: this.editFormData.email,
          facebook: this.editFormData.facebook,
          instagram: this.editFormData.instagram,
          youtube: this.editFormData.youtube,
          linkedin: this.editFormData.linkedin,
          international_programs: this.editFormData.international_programs,
          dorms_link: this.editFormData.dorms_link,
          transportation_link: this.editFormData.transportation_link,
          scholarship_link: this.editFormData.scholarship_link,
          Egyptian_Admission_link: this.editFormData.Egyptian_Admission_link,
          Egyptian_Transfer_link: this.editFormData.Egyptian_Transfer_link,
          Wafdeen_Admission_link: this.editFormData.Wafdeen_Admission_link
        });

        // Update faculties
        if (this.editFormData.faculties && this.editFormData.faculties.length > 0) {
          for (const faculty of this.editFormData.faculties) {
            await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
              ...faculty,
              university_code: universityCode,
              university: this.editFormData.university_Arabic_Name
            });
          }
        }

        // Update dorms
        if (this.editFormData.dorms && this.editFormData.dorms.length > 0) {
          for (const dorm of this.editFormData.dorms) {
            await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.DORMS.UPDATE(universityCode)}`, {
              ...dorm,
              university_code: universityCode,
              spec: this.editFormData.university_Arabic_Name
            });
          }
        }

        // Update transportation
        if (this.editFormData.transportation && this.editFormData.transportation.length > 0) {
          for (const trans of this.editFormData.transportation) {
            await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.TRANSPORTATION.UPDATE(universityCode)}`, {
              ...trans,
              university_code: universityCode,
              spec: this.editFormData.university_Arabic_Name
            });
          }
        }

        alert('تم تحديث الجامعة بنجاح');
        this.cancelEdit();
        this.fetchUniversities();
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error updating university:', error);
        alert('حدث خطأ أثناء تحديث الجامعة');
      }
    },
    async deleteUniversity(id) {
      try {
        const university = this.universitiesData.find(u => u.id === id);
        if (!university) {
          throw new Error('University not found');
        }

        const universityCode = university.university_code || id;
        const type = university.type.toUpperCase();
        const typeConfig = API_CONFIG.ENDPOINTS[type];

        // Delete the university and all associated data
        await axios.delete(`${API_CONFIG.BASE_URL}${typeConfig.DELETE(universityCode)}`);

        // Remove the university from the local state
        this.universitiesData = this.universitiesData.filter(u => u.id !== id);
        this.filteredUniversities = this.filteredUniversities.filter(u => u.id !== id);
        this.filteredEditUniversities = this.filteredEditUniversities.filter(u => u.id !== id);
        this.filteredDeleteUniversities = this.filteredDeleteUniversities.filter(u => u.id !== id);

        alert('تم حذف الجامعة بنجاح');
        this.selectedUniversityForDelete = null;
        this.fetchUniversities();
      } catch (error) {
        console.error('Error deleting university:', error);
        alert('حدث خطأ أثناء حذف الجامعة');
      }
    },
    confirmDelete(id) {
      const university = this.universitiesData.find(u => u.id === id);
      if (university) {
        this.selectedUniversity = university;
        this.isDeleting = true;
        this.activeTab = 'delete';
      }
    },
    cancelDelete() {
      this.isDeleting = false;
      this.selectedUniversity = null;
      this.activeTab = 'manage';
    },
    getUniversityTypeName(type) {
      const types = {
        'national': 'جامعة أهلية',
        'private': 'جامعة خاصة',
        'special': 'جامعة ذات طبيعة خاصة',
        'international': 'جامعة دولية'
      };
      return types[type] || type;
    },
    resetAddForm() {
      this.addFormData = {
        university_code: '',
        university_Arabic_Name: '',
        university_Logo: '',
        type: 'national',
        Uni_Bio: '',
        location: '',
        first_year: '',
        second_year: '',
        website: '',
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        faculties: [],
        international_programs: '',
        dorms: [],
        transportation: [],
        dorms_link: '',
        transportation_link: '',
        scholarship_link: '',
        Egyptian_Admission_link: '',
        Egyptian_Admission_link2: '',
        Egyptian_Transfer_link: '',
        Wafdeen_Admission_link: ''
      };
    },
    resetEditForm() {
      this.editFormData = {
        university_code: '',
        university_Arabic_Name: '',
        university_Logo: '',
        type: 'national',
        Uni_Bio: '',
        location: '',
        website: '',
        phone: '',
        email: '',
        facebook: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        faculties: [],
        international_programs: '',
        dorms: [],
        transportation: [],
        dorms_link: '',
        transportation_link: '',
        scholarship_link: '',
        Egyptian_Admission_link: '',
        Egyptian_Transfer_link: '',
        Wafdeen_Admission_link: ''
      };
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingId = null;
      this.selectedUniversityForEdit = null;
      this.resetEditForm();
      this.activeTab = 'manage';
    },
    selectUniversityForEdit(university) {
      this.selectedUniversityForEdit = university;
      this.isEditing = true;
      this.editingId = university.id;
      this.editFormData = {
        ...this.editFormData,
        university_code: university.university_code || university.id,
        university_Arabic_Name: university.university_Arabic_Name,
        university_Logo: university.university_Logo,
        type: university.type,
        Uni_Bio: university.Uni_Bio || '',
        location: university.location || '',
        first_year: university.first_year || '',
        second_year: university.second_year || '',
        website: university.website || '',
        phone: university.phone || '',
        email: university.email || '',
        facebook: university.facebook || '',
        instagram: university.instagram || '',
        youtube: university.youtube || '',
        linkedin: university.linkedin || '',
        faculties: university.faculties || [],
        international_programs: university.international_programs || '',
        dorms: university.dorms || [],
        transportation: university.transportation || [],
        dorms_link: university.dorms_link || '',
        transportation_link: university.transportation_link || '',
        scholarship_link: university.scholarship_link || '',
        Egyptian_Admission_link: university.Egyptian_Admission_link || '',
        Egyptian_Admission_link2: university.Egyptian_Admission_link2 || '',
        Egyptian_Transfer_link: university.Egyptian_Transfer_link || '',
        Wafdeen_Admission_link: university.Wafdeen_Admission_link || ''
      };
    },
    selectUniversityForDelete(university) {
      this.selectedUniversityForDelete = university;
    },
    filterEditUniversities() {
      if (!this.editSearchQuery) {
        this.filteredEditUniversities = this.universitiesData.filter(uni => 
          this.selectedType === 'all' || uni.type === this.selectedType
        );
        return;
      }
      const query = this.editSearchQuery.toLowerCase();
      this.filteredEditUniversities = this.universitiesData.filter(university => 
        university.university_Arabic_Name.toLowerCase().includes(query) &&
        (this.selectedType === 'all' || university.type === this.selectedType)
      );
    },
    filterDeleteUniversities() {
      if (!this.deleteSearchQuery) {
        this.filteredDeleteUniversities = this.universitiesData.filter(uni => 
          this.selectedType === 'all' || uni.type === this.selectedType
        );
        return;
      }
      const query = this.deleteSearchQuery.toLowerCase();
      this.filteredDeleteUniversities = this.universitiesData.filter(university => 
        university.university_Arabic_Name.toLowerCase().includes(query) &&
        (this.selectedType === 'all' || university.type === this.selectedType)
      );
    },
    switchToEdit() {
      this.activeTab = 'edit';
      this.selectedType = 'all';
      this.filterEditUniversities();
    },
    switchToDelete() {
      this.activeTab = 'delete';
      this.selectedType = 'all';
      this.filterDeleteUniversities();
    },
    handleEditFromList(university) {
      this.activeTab = 'edit';
      this.selectedType = 'all';
      this.selectUniversityForEdit(university);
      this.filterEditUniversities();
    },
    handleDeleteFromList(university) {
      this.activeTab = 'delete';
      this.selectedType = 'all';
      this.selectUniversityForDelete(university);
      this.filterDeleteUniversities();
    },
    async confirmDeleteUniversity() {
      if (confirm('هل أنت متأكد من حذف الجامعة بالكامل؟ سيتم حذف جميع البيانات المرتبطة بها.')) {
        await this.deleteUniversity(this.selectedUniversityForDelete.id);
      }
    },

    saveFaculty(index, mode = 'edit') {
      const faculty = mode === 'add' ? this.addFormData.faculties[index] : this.editFormData.faculties[index];
      if (!faculty.faculty) {
        alert('الرجاء إدخال اسم الكلية');
        return;
      }
      // Set the section as collapsed
      this.collapsedSections.faculties[index] = true;
    },

    saveDorm(index, mode = 'edit') {
      const dorm = mode === 'add' ? this.addFormData.dorms[index] : this.editFormData.dorms[index];
      if (!dorm.type) {
        alert('الرجاء إدخال نوع السكن');
        return;
      }
      // Set the section as collapsed
      this.collapsedSections.dorms[index] = true;
    },

    saveTransportation(index, mode = 'edit') {
      const transport = mode === 'add' ? this.addFormData.transportation[index] : this.editFormData.transportation[index];
      if (!transport.type) {
        alert('الرجاء إدخال نوع وسيلة النقل');
        return;
      }
      // Set the section as collapsed
      this.collapsedSections.transportation[index] = true;
    },

    toggleSection(section, index) {
      if (!this.collapsedSections[section]) {
        this.$set(this.collapsedSections, section, {});
      }
      this.$set(this.collapsedSections[section], index, !this.collapsedSections[section][index]);
    },

    async deleteBasicInfo(field) {
      if (confirm(`هل أنت متأكد من حذف ${field}؟`)) {
        try {
          const type = this.selectedUniversityForDelete.type.toUpperCase();
          const typeConfig = API_CONFIG.ENDPOINTS[type];
          const universityCode = this.selectedUniversityForDelete.university_code;

          await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
            ...this.selectedUniversityForDelete,
            [field]: ''
          });

          this.selectedUniversityForDelete[field] = '';
          alert('تم الحذف بنجاح');
        } catch (error) {
          console.error('Error deleting basic info:', error);
          alert('حدث خطأ أثناء الحذف');
        }
      }
    },

    async deleteContactInfo(field) {
      if (confirm(`هل أنت متأكد من حذف ${field}؟`)) {
        try {
          const type = this.selectedUniversityForDelete.type.toUpperCase();
          const typeConfig = API_CONFIG.ENDPOINTS[type];
          const universityCode = this.selectedUniversityForDelete.university_code;

          await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
            ...this.selectedUniversityForDelete,
            [field]: ''
          });

          this.selectedUniversityForDelete[field] = '';
          alert('تم الحذف بنجاح');
        } catch (error) {
          console.error('Error deleting contact info:', error);
          alert('حدث خطأ أثناء الحذف');
        }
      }
    },

    async deleteSocialMedia(field) {
      if (confirm(`هل أنت متأكد من حذف ${field}؟`)) {
        try {
          const type = this.selectedUniversityForDelete.type.toUpperCase();
          const typeConfig = API_CONFIG.ENDPOINTS[type];
          const universityCode = this.selectedUniversityForDelete.university_code;

          await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
            ...this.selectedUniversityForDelete,
            [field]: ''
          });

          this.selectedUniversityForDelete[field] = '';
          alert('تم الحذف بنجاح');
        } catch (error) {
          console.error('Error deleting social media:', error);
          alert('حدث خطأ أثناء الحذف');
        }
      }
    },

    async deleteInternationalPrograms() {
      if (confirm('هل أنت متأكد من حذف رابط البرامج الدولية؟')) {
        try {
          const type = this.selectedUniversityForDelete.type.toUpperCase();
          const typeConfig = API_CONFIG.ENDPOINTS[type];
          const universityCode = this.selectedUniversityForDelete.university_code;

          await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
            ...this.selectedUniversityForDelete,
            international_programs: ''
          });

          this.selectedUniversityForDelete.international_programs = '';
          alert('تم الحذف بنجاح');
        } catch (error) {
          console.error('Error deleting international programs:', error);
          alert('حدث خطأ أثناء الحذف');
        }
      }
    },

    async deleteAdmissionLink(field) {
      if (confirm(`هل أنت متأكد من حذف ${field}؟`)) {
        try {
          const type = this.selectedUniversityForDelete.type.toUpperCase();
          const typeConfig = API_CONFIG.ENDPOINTS[type];
          const universityCode = this.selectedUniversityForDelete.university_code;

          await axios.put(`${API_CONFIG.BASE_URL}${typeConfig.FACULTY.UPDATE(universityCode)}`, {
            ...this.selectedUniversityForDelete,
            [field]: ''
          });

          this.selectedUniversityForDelete[field] = '';
          alert('تم الحذف بنجاح');
        } catch (error) {
          console.error('Error deleting admission link:', error);
          alert('حدث خطأ أثناء الحذف');
        }
      }
    },
  },
  created() {
    this.fetchUniversities();
  },
  watch: {
    selectedType() {
      this.fetchUniversities();
    },
    editSearchQuery() {
      this.filterEditUniversities();
    },
    deleteSearchQuery() {
      this.filterDeleteUniversities();
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Tajawal', sans-serif;
}

.university-admin-container {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.header h1 {
  color: #001d3d;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6c757d;
  font-size: 1.1rem;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
}

.nav-tab {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  background: white;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex: 1;
  justify-content: center;
}

.nav-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.nav-tab.active {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.nav-tab i {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .nav-tabs {
    flex-direction: column;
    padding: 0 1rem;
  }

  .nav-tab {
    width: 100%;
  }
}

.universities-list-section {
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  color: #001d3d;
  font-size: 1.5rem;
  font-weight: 700;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  width: 300px;
  font-size: 1rem;
}

.university-section {
  margin-bottom: 3rem;
}

.section-title {
  color: #1a237e;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 2px solid #1a237e;
  padding-bottom: 0.5rem;
  font-weight: 700;
}

.universities-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.university-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.university-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.university-image {
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
}

.university-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.university-name {
  color: #1a237e;
  font-size: 1.2rem;
  margin: 0 0 1rem;
  font-weight: 600;
}

.university-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.action-btn.edit {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn.delete {
  background: #fde7e7;
  color: #d32f2f;
}

.action-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4158d0;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.no-results i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.form-section {
  max-width: 1200px;
  margin: 0 auto;
}

.form-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-category {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e9ecef;
}

.category-title {
  color: #1a237e;
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-title i {
  color: #4158d0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #495057;
  font-weight: 500;
}

label i {
  color: #4158d0;
}

input[type="text"],
input[type="url"],
input[type="tel"],
input[type="email"],
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

input[type="text"]:focus,
input[type="url"]:focus,
input[type="tel"]:focus,
input[type="email"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4158d0;
  box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
}

.input-with-hint {
  position: relative;
}

.hint {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  font-size: 0.875rem;
  pointer-events: none;
}

.faculty-item,
.dorm-item,
.transportation-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e9ecef;
}

.faculty-header,
.dorm-header,
.transportation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e9ecef;
}

.faculty-header h4,
.dorm-header h4,
.transportation-header h4 {
  color: #1a237e;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #fde7e7;
  color: #d32f2f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #ffebee;
  transform: translateY(-2px);
}

.add-btn {
  width: 100%;
  padding: 0.75rem;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  background: transparent;
  color: #4158d0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.add-btn:hover {
  border-color: #4158d0;
  background: #f8f9fa;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.submit-btn {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.cancel-btn {
  background: #e9ecef;
  color: #495057;
}

.submit-btn:hover,
.cancel-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .university-admin-container {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .form-card {
    padding: 1.5rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .universities-list {
    grid-template-columns: 1fr;
  }
}

.back-button {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #bbdefb;
  transform: translateX(-2px);
}

.delete-section {
  max-width: 800px;
  margin: 0 auto;
}

.delete-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.delete-content {
  text-align: center;
  padding: 2rem 0;
}

.university-info {
  margin-bottom: 2rem;
}

.university-info .university-image {
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
}

.university-info .university-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.university-info h3 {
  color: #1a237e;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.university-type {
  color: #6c757d;
  font-size: 1.1rem;
}

.warning-message {
  background: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
}

.warning-message i {
  color: #856404;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.warning-message p {
  color: #856404;
  margin: 0.5rem 0;
}

.warning-details {
  font-size: 0.9rem;
  opacity: 0.8;
}

.delete-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.confirm-delete-btn,
.cancel-delete-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.confirm-delete-btn {
  background: #dc3545;
  color: white;
}

.cancel-delete-btn {
  background: #6c757d;
  color: white;
}

.confirm-delete-btn:hover,
.cancel-delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.back-btn {
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #bbdefb;
  transform: translateX(-2px);
}

.university-card {
  cursor: pointer;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.section-header h2 {
  color: #1a237e;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.search-bar {
  flex: 0 0 300px;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #4158d0;
  box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
}

.universities-grid {
  display: grid;
  gap: 2rem;
}

.university-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.section-title {
  color: #1a237e;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1a237e;
}

.universities-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.university-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.university-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.back-btn {
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #bbdefb;
  transform: translateX(-2px);
}

@media (max-width: 768px) {
  .section-container {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar {
    flex: 0 0 100%;
  }

  .universities-list {
    grid-template-columns: 1fr;
  }
}

.type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 2rem;
  flex-wrap: wrap;
}

.type-tab {
  padding: 0.75rem 1.5rem;
  border: 2px solid #1a237e;
  border-radius: 8px;
  background: white;
  color: #1a237e;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-tab:hover {
  background: #e8eaf6;
}

.type-tab.active {
  background: #1a237e;
  color: white;
}

@media (max-width: 768px) {
  .type-tabs {
    gap: 0.5rem;
  }

  .type-tab {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

.delete-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.delete-section-title {
  color: #1a237e;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.delete-section-title i {
  color: #4158d0;
}

.delete-items-list {
  display: grid;
  gap: 1rem;
}

.delete-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.item-info h4 {
  color: #1a237e;
  margin-bottom: 0.25rem;
}

.item-info p {
  color: #6c757d;
  font-size: 0.9rem;
}

.delete-item-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: #fde7e7;
  color: #d32f2f;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.delete-item-btn:hover {
  background: #ffebee;
  transform: translateY(-2px);
}

.delete-sections-nav {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.section-nav-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #1a237e;
  border-radius: 8px;
  background: white;
  color: #1a237e;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.section-nav-btn:hover {
  background: #e8eaf6;
}

.section-nav-btn.active {
  background: #1a237e;
  color: white;
}

.warning-section {
  background: #fff3cd;
  border: 1px solid #ffeeba;
}

.warning-message {
  text-align: center;
  padding: 1rem;
}

.warning-message p {
  color: #856404;
  margin-bottom: 1rem;
}

.delete-university-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  background: #dc3545;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.delete-university-btn:hover {
  background: #c82333;
  transform: translateY(-2px);
}

.programs, .price, .description {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.description {
  font-style: italic;
}

.fees-grid,
.scores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.fees-grid input,
.scores-grid input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.9rem;
}

.fees-grid input:focus,
.scores-grid input:focus {
  outline: none;
  border-color: #4158d0;
  box-shadow: 0 0 0 2px rgba(65, 88, 208, 0.1);
}

.faculty-actions,
.dorm-actions,
.transportation-actions {
  display: flex;
  gap: 0.5rem;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.save-btn:hover {
  background-color: #45a049;
}

.save-btn i {
  font-size: 0.9rem;
}

.faculty-item,
.dorm-item,
.transportation-item {
  position: relative;
}

.faculty-item .form-grid,
.dorm-item .form-grid,
.transportation-item .form-grid {
  transition: all 0.3s ease;
}

.toggle-btn {
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #bbdefb;
  transform: translateY(-2px);
}

.toggle-btn i {
  font-size: 0.9rem;
}

.toggle-btn.expanded i {
  transform: rotate(180deg);
}

.full-width-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.full-width-input:focus {
  outline: none;
  border-color: #4158d0;
  box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
}

.loading-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 2rem;
}

.loading-container p,
.loading-section p {
  margin-top: 1rem;
  color: #6c757d;
  font-size: 1.1rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4158d0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 