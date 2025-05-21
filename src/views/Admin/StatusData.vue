<template>
  <div class="admission-admin-container" dir="rtl">
    <div class="header">
      <button class="back-button" @click="goBack">
        <i class="fas fa-arrow-right"></i>
        رجوع
      </button>
      <h1>إدارة حالة التقديمات</h1>
      <p class="subtitle">إدارة وتعديل وحذف حالة التقديمات للجامعات</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'add' }"
        @click="activeTab = 'add'"
      >
        <i class="fas fa-plus"></i>
        اضافة حالة جامعة جديدة
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'manage' }"
        @click="activeTab = 'manage'"
      >
        <i class="fas fa-university"></i>
        حالة الجامعات الحالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'edit' }"
        @click="switchToEdit"
      >
        <i class="fas fa-edit"></i>
        تعديل حالة جامعة حالية
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'delete' }"
        @click="switchToDelete"
      >
        <i class="fas fa-trash"></i>
        حذف حالة جامعة حالية
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

    <!-- Add New Status Section -->
    <div v-if="activeTab === 'add'" class="section-container">
      <div class="section-header">
        <h2>إضافة حالة جامعة جديدة</h2>
      </div>
      <div class="form-section">
        <div class="form-card">
          <form @submit.prevent="addUniversityStatus()">
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-university"></i>
                بيانات حالة الجامعة
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="university_code">
                    <i class="fas fa-hashtag"></i>
                    الرمز المختصر للجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.university" 
                    id="university_code" 
                    required
                    placeholder="أدخل الرمز المختصر للجامعة"
                  >
                </div>

                <div class="form-group">
                  <label for="university_name">
                    <i class="fas fa-graduation-cap"></i>
                    اسم الجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.university_Arabic_Name" 
                    id="university_name" 
                    required
                    placeholder="أدخل اسم الجامعة"
                  >
                </div>

                <!-- Guide URL -->
                <div class="form-group">
                  <label for="guide_url">
                    <i class="fas fa-link"></i>
                    رابط الجامعة في الدليل
                  </label>
                  <input 
                    type="url" 
                    v-model="addFormData.guide_Url" 
                    id="guide_url" 
                    required
                    placeholder="أدخل رابط الجامعة في الدليل"
                  >
                </div>                
<br>
                <!-- Transfer Section -->
                <div class="form-group">
                  <label for="transfer_status">
                    <i class="fas fa-exchange-alt"></i>
                    حالة التحويل
                  </label>
                  <select v-model="addFormData.transfer_status" id="transfer_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="transfer_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للتحويل
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.transfer_deadline" 
                    id="transfer_deadline"
                    required
                  >
                </div>

                <!-- Thanawya First Year Section -->
                <div class="form-group">
                  <label for="thanwyaa_first_year_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة (السنة الأولي)
                  </label>
                  <select v-model="addFormData.thanwyaa_firstYear_status" id="thanwyaa_first_year_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="thanwyaa_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة (السنة الأولي)
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.thanwyaa_firstYear_deadline" 
                    id="thanwyaa_first_year_deadline"
                    required
                  >
                </div>

                <!-- Thanawya Second Year Section -->
                <div class="form-group">
                  <label for="thanwyaa_second_year_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة (السنة الثاني)
                  </label>
                  <select v-model="addFormData.thanwyaa_secondYear_status" id="thanwyaa_second_year_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="thanwyaa_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة (السنة الثاني)
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.thanwyaa_secondYear_deadline" 
                    id="thanwyaa_second_year_deadline"
                    required
                  >
                </div>

                <!-- Azhar First Year Section -->
                <div class="form-group">
                  <label for="azhar_first_year_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية (السنة الأولي)
                  </label>
                  <select v-model="addFormData.azhar_firstYear_status" id="azhar_first_year_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="azhar_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية (السنة الأولي)
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.azhar_firstYear_deadline" 
                    id="azhar_first_year_deadline"
                    required
                  >
                </div>

                <!-- Azhar Second Year Section -->
                <div class="form-group">
                  <label for="azhar_second_year_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية (السنة الثانية)
                  </label>
                  <select v-model="addFormData.azhar_secondYear_status" id="azhar_second_year_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="azhar_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية (السنة الثانية)
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.azhar_secondYear_deadline" 
                    id="azhar_second_year_deadline"
                    required
                  >
                </div>

                <!-- Arab/English First Year Section -->
                <div class="form-group">
                  <label for="arab_english_first_year_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية (السنة الأولي)
                  </label>
                  <select v-model="addFormData.Arabenglish_firstYear_status" id="arab_english_first_year_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="arab_english_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية (السنة الأولي)
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.Arabenglish_firstYear_deadline" 
                    id="arab_english_first_year_deadline"
                    required
                  >
                </div>

                <!-- Arab/English Second Year Section -->
                <div class="form-group">
                  <label for="arab_english_second_year_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية (السنة الثانية)
                  </label>
                  <select v-model="addFormData.Arabenglish_secondYear_status" id="arab_english_second_year_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="arab_english_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية (السنة الثانية)
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.Arabenglish_secondYear_deadline" 
                    id="arab_english_second_year_deadline"
                    required
                  >
                </div>

                <!-- Wafdeen Section -->
                <div class="form-group">
                  <label for="wafdeen_status">
                    <i class="fas fa-user-plus"></i>
                    حالة الوافدين
                  </label>
                  <select v-model="addFormData.wafdeen_status" id="wafdeen_status" required>
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="wafdeen_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للوافدين
                  </label>
                  <input 
                    type="date" 
                    v-model="addFormData.wafdeen_deadline" 
                    id="wafdeen_deadline"
                    required
                  >
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i>
                حفظ الحالة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Manage Current Status Section -->
    <div v-if="activeTab === 'manage'" class="section-container">
      <div class="section-header">
        <h2>حالة الجامعات الحالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterUniversities"
          >
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredUniversities.length === 0" class="no-results">
        <i class="fas fa-university"></i>
        <p>لا توجد جامعات</p>
      </div>

      <div v-else class="universities-grid">
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <div class="university-title">
              <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
              </div>
              <h3 @click="toggleUniversity(university.id)" class="university-name-toggle">
                {{ university.university_Arabic_Name }}
              </h3>
            </div>
            <div class="dropdown-icon" :class="{ 'expanded': expandedUniversityId === university.id }">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <div class="university-content" v-show="expandedUniversityId === university.id">
            <div class="status-sections">
            <!-- Transfer Status -->
              <div class="status-box">
              <h4>التحويل</h4>
                <div class="status-row">
                  <div class="status-item">
                    <p>الحالة: {{ university.transfer_status }}</p>
                    <p>آخر موعد: {{ university.transfer_deadline }}</p>
                  </div>
                </div>
              </div>

              <!-- Thanawya Status -->
              <div class="status-box">
                <h4>الثانوية العامة</h4>
                <div class="status-row">
                  <div class="status-item">
                    <h5>السنة الأولي</h5>
                    <p>الحالة: {{ university.thanwyaa_firstYear_status }}</p>
                    <p>آخر موعد: {{ university.thanwyaa_firstYear_deadline }}</p>
                  </div>
                  <div class="status-item">
                    <h5>السنة الثانية</h5>
                    <p>الحالة: {{ university.thanwyaa_secondYear_status }}</p>
                    <p>آخر موعد: {{ university.thanwyaa_secondYear_deadline }}</p>
                  </div>
                </div>
              </div>

              <!-- Azhar Status -->
              <div class="status-box">
                <h4>الثانوية الأزهرية</h4>
                <div class="status-row">
                  <div class="status-item">
                    <h5>السنة الأولي</h5>
                    <p>الحالة: {{ university.azhar_firstYear_status }}</p>
                    <p>آخر موعد: {{ university.azhar_firstYear_deadline }}</p>
                  </div>
                  <div class="status-item">
                    <h5>السنة الثانية</h5>
                    <p>الحالة: {{ university.azhar_secondYear_status }}</p>
                    <p>آخر موعد: {{ university.azhar_secondYear_deadline }}</p>
                  </div>
                </div>
              </div>

              <!-- Arab/English Status -->
              <div class="status-box">
                <h4>الشهادات العربية والإجنبية</h4>
                <div class="status-row">
                  <div class="status-item">
                    <h5>السنة الأولي</h5>
                    <p>الحالة: {{ university.Arabenglish_firstYear_status }}</p>
                    <p>آخر موعد: {{ university.Arabenglish_firstYear_deadline }}</p>
                  </div>
                  <div class="status-item">
                    <h5>السنة الثانية</h5>
                    <p>الحالة: {{ university.Arabenglish_secondYear_status }}</p>
                    <p>آخر موعد: {{ university.Arabenglish_secondYear_deadline }}</p>
                  </div>
                </div>
              </div>

              <!-- Wafdeen Status -->
              <div class="status-box">
                <h4>الوافدين</h4>
                <div class="status-row">
                  <div class="status-item">
                    <p>الحالة: {{ university.wafdeen_status }}</p>
                    <p>آخر موعد: {{ university.wafdeen_deadline }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Status Section -->
    <div v-if="activeTab === 'edit'" class="section-container">
      <div class="section-header">
        <h2>تعديل حالة جامعة حالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterUniversities"
          >
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredUniversities.length === 0" class="no-results">
        <i class="fas fa-university"></i>
        <p>لا توجد جامعات</p>
      </div>

      <div v-else class="universities-grid">
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <div class="university-title">
              <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
              </div>
              <h3 @click="toggleUniversity(university.id)" class="university-name-toggle">
                {{ university.university_Arabic_Name }}
              </h3>
            </div>
            <div class="dropdown-icon" :class="{ 'expanded': expandedUniversityId === university.id }">
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>

          <div class="university-content" v-show="expandedUniversityId === university.id">
            <div class="status-sections">
              <!-- Basic Information -->
              <div class="status-section">
                <h4>معلومات الجامعة</h4>
              <div class="status-inputs">
                <div class="status-input">
                    <label>الرمز المختصر</label>
                    <input type="text" v-model="university.university">
                </div>
                <div class="status-input">
                    <label>اسم الجامعة</label>
                    <input type="text" v-model="university.university_Arabic_Name">
                </div>
                </div>
              </div>

              <!-- Transfer Section -->
              <div class="status-section">
                <h4>التحويل</h4>
                <div class="status-inputs">
                <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.transfer_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.transfer_deadline">
                </div>
              </div>
            </div>

              <!-- Thanawya First Year Section -->
            <div class="status-section">
                <h4>الثانوية العامة (السنة الأولي)</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.thanwyaa_firstYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.thanwyaa_firstYear_deadline">
                  </div>
                </div>
              </div>

              <!-- Thanawya Second Year Section -->
              <div class="status-section">
                <h4>الثانوية العامة (السنة الثاني)</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.thanwyaa_secondYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.thanwyaa_secondYear_deadline">
                </div>
              </div>
            </div>

              <!-- Azhar First Year Section -->
            <div class="status-section">
                <h4>الثانوية الأزهرية (السنة الأولي)</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.azhar_firstYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.azhar_firstYear_deadline">
                  </div>
                </div>
              </div>

              <!-- Azhar Second Year Section -->
              <div class="status-section">
                <h4>الثانوية الأزهرية (السنة الثانية)</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.azhar_secondYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.azhar_secondYear_deadline">
                </div>
              </div>
            </div>

              <!-- Arab/English First Year Section -->
            <div class="status-section">
                <h4>الشهادات العربية والإجنبية (السنة الأولي)</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.Arabenglish_firstYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.Arabenglish_firstYear_deadline">
                  </div>
                </div>
              </div>

              <!-- Arab/English Second Year Section -->
              <div class="status-section">
                <h4>الشهادات العربية والإجنبية (السنة الثانية)</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.Arabenglish_secondYear_status">
                      <option value="متاح">متاح</option>
                      <option value="انتهي">انتهي</option>
                      <option value="لم يبدأ">لم يبدأ</option>
                    </select>
                  </div>
                  <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.Arabenglish_secondYear_deadline">
                </div>
              </div>
            </div>

              <!-- Wafdeen Section -->
            <div class="status-section">
              <h4>الوافدين</h4>
              <div class="status-inputs">
                <div class="status-input">
                    <label>الحالة</label>
                    <select v-model="university.wafdeen_status">
                    <option value="متاح">متاح</option>
                    <option value="انتهي">انتهي</option>
                    <option value="لم يبدأ">لم يبدأ</option>
                  </select>
                </div>
                <div class="status-input">
                    <label>آخر موعد</label>
                    <input type="date" v-model="university.wafdeen_deadline">
                  </div>
                </div>
              </div>

              <!-- Guide URL -->
              <div class="status-section">
                <h4>رابط الجامعة في الدليل</h4>
                <div class="status-inputs">
                  <div class="status-input">
                    <label>رابط الدليل</label>
                    <input type="url" v-model="university.guide_Url">
                </div>
              </div>
            </div>
          </div>

          <div class="card-actions">
              <button class="save-btn" @click="saveUniversity(university)">
              <i class="fas fa-save"></i>
              حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Status Section -->
    <div v-if="activeTab === 'delete'" class="section-container">
      <div class="section-header">
        <h2>حذف حالة جامعة حالية</h2>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ابحث عن جامعة..."
            @input="filterUniversities"
          >
        </div>
      </div>

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredUniversities.length === 0" class="no-results">
        <i class="fas fa-university"></i>
        <p>لا توجد جامعات</p>
      </div>

      <div v-else class="universities-grid">
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <div class="university-title">
              <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
              </div>
              <h3 @click="toggleUniversity(university.id)" class="university-name-toggle">
                {{ university.university_Arabic_Name }}
              </h3>
            </div>
          </div>

          <div class="status-sections">
            <div class="status-section">
              <h4>معلومات الحالة</h4>
              <div class="status-info">
                <p>نوع الجامعة: {{ getUniversityTypeLabel(university.type) }}</p>
                <p>آخر تحديث: {{ university.updatedAt }}</p>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="delete-btn" @click="confirmDelete(university)">
              <i class="fas fa-trash"></i>
              حذف الحالة
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdmissionStatusAdmin',
  data() {
    return {
      activeTab: 'manage',
      selectedType: 'private',
      universities: [],
      universityLinks: {},
      loading: true,
      searchQuery: '',
      filteredUniversities: [],
      expandedUniversityId: null,
      universityTypes: [
        { label: 'الجامعات الخاصة', value: 'private' },
        { label: 'الجامعات الأهلية', value: 'national' },
        { label: 'الجامعات الدولية', value: 'international' },
        { label: 'الجامعات ذات طبيعة خاصة', value: 'special' }
      ],
      addFormData: {
        university: '',
        university_Arabic_Name: '',
        transfer_status: 'متاح',
        thanwyaa_firstYear_status: 'متاح',
        thanwyaa_secondYear_status: 'متاح',
        azhar_firstYear_status: 'متاح',
        azhar_secondYear_status: 'متاح',
        Arabenglish_firstYear_status: 'متاح',
        Arabenglish_secondYear_status: 'متاح',
        wafdeen_status: 'متاح',
        guide_Url: '',
        transfer_deadline: '',
        thanwyaa_firstYear_deadline: '',
        thanwyaa_secondYear_deadline: '',
        azhar_firstYear_deadline: '',
        azhar_secondYear_deadline: '',
        Arabenglish_firstYear_deadline: '',
        Arabenglish_secondYear_deadline: '',
        wafdeen_deadline: '',
        type: 'national'
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchData() {
      this.loading = true;
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      const linkEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/links',
        private: 'https://nuft-website-backend.vercel.app/private/links',
        special: 'https://nuft-website-backend.vercel.app/special/links',
        international: 'https://nuft-website-backend.vercel.app/international/links'
      };

      try {
        const [admissionResponse, linksResponse] = await Promise.all([
          axios.get(endpoints[this.selectedType]),
          axios.get(linkEndpoints[this.selectedType])
        ]);
        
        this.universities = admissionResponse.data;
        this.filteredUniversities = this.universities;
        
        // Create a map of university links using university code as key
        this.universityLinks = linksResponse.data.reduce((acc, link) => {
          acc[link.university] = link;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('حدث خطأ أثناء جلب البيانات');
      } finally {
        this.loading = false;
      }
    },

    filterUniversities() {
      if (!this.searchQuery) {
        this.filteredUniversities = this.universities;
        return;
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredUniversities = this.universities.filter(university => 
        university.university_Arabic_Name.toLowerCase().includes(query)
      );
    },

    async saveUniversity(university) {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      try {
        await axios.put(`${endpoints[this.selectedType]}/${university.id}`, university);
        alert('تم حفظ التغييرات بنجاح');
        this.fetchData();
      } catch (error) {
        console.error('Error saving university:', error);
        alert('حدث خطأ أثناء حفظ التغييرات');
      }
    },

    async addUniversityStatus() {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission/add',
        private: 'https://nuft-website-backend.vercel.app/private/admission/add',
        special: 'https://nuft-website-backend.vercel.app/special/admission/add',
        international: 'https://nuft-website-backend.vercel.app/international/admission/add'
      };

      try {
        await axios.post(endpoints[this.addFormData.type], this.addFormData);
        alert('تم إضافة حالة الجامعة بنجاح');
        this.resetAddForm();
        this.fetchData();
      } catch (error) {
        console.error('Error adding university status:', error);
        alert('حدث خطأ أثناء إضافة حالة الجامعة');
      }
    },

    async deleteUniversity(university) {
      const endpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      try {
        await axios.delete(`${endpoints[this.selectedType]}/${university.id}`);
        alert('تم حذف حالة الجامعة بنجاح');
        this.fetchData();
      } catch (error) {
        console.error('Error deleting university status:', error);
        alert('حدث خطأ أثناء حذف حالة الجامعة');
      }
    },

    resetAddForm() {
      this.addFormData = {
        university: '',
        university_Arabic_Name: '',
        transfer_status: 'متاح',
        thanwyaa_firstYear_status: 'متاح',
        thanwyaa_secondYear_status: 'متاح',
        azhar_firstYear_status: 'متاح',
        azhar_secondYear_status: 'متاح',
        Arabenglish_firstYear_status: 'متاح',
        Arabenglish_secondYear_status: 'متاح',
        wafdeen_status: 'متاح',
        guide_Url: '',
        transfer_deadline: '',
        thanwyaa_firstYear_deadline: '',
        thanwyaa_secondYear_deadline: '',
        azhar_firstYear_deadline: '',
        azhar_secondYear_deadline: '',
        Arabenglish_firstYear_deadline: '',
        Arabenglish_secondYear_deadline: '',
        wafdeen_deadline: '',
        type: 'national'
      };
    },

    switchToEdit() {
      this.activeTab = 'edit';
      this.fetchData();
    },

    switchToDelete() {
      this.activeTab = 'delete';
      this.fetchData();
    },

    getUniversityTypeLabel(type) {
      const universityType = this.universityTypes.find(t => t.value === type);
      return universityType ? universityType.label : 'غير معروف';
    },

    confirmDelete(university) {
      if (confirm(`هل أنت متأكد من حذف حالة الجامعة ${university.university_Arabic_Name}؟`)) {
        this.deleteUniversity(university);
      }
    },

    toggleUniversity(universityId) {
      if (this.expandedUniversityId === universityId) {
        this.expandedUniversityId = null;
      } else {
        this.expandedUniversityId = universityId;
      }
    },
  },
  watch: {
    selectedType() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.admission-admin-container {
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
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.nav-tab {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: white;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  justify-content: center;
}

.nav-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
}

.nav-tab.active {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.type-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.type-tab {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #495057;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  min-width: 150px;
  text-align: center;
}

.type-tab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
}

.type-tab.active {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
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

.form-section {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-category {
  margin-bottom: 2rem;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.category-title {
  color: #001d3d;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
}

.category-title i {
  color: #4158d0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #495057;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.universities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.university-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.university-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  cursor: default;
}

.university-header:hover {
  background-color: #f8f9fa;
}

.university-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.university-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e9ecef;
  flex-shrink: 0;
}

.university-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.university-header h3 {
  margin: 0;
  color: #001d3d;
  font-size: 1.3rem;
}

.dropdown-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.dropdown-icon.expanded {
  transform: rotate(180deg);
}

.dropdown-icon i {
  color: #001d3d;
  font-size: 1rem;
}

.university-content {
  transition: all 0.3s ease;
  overflow: hidden;
}

/* Add animation for smooth expansion/collapse */
.university-content {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-sections {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-section {
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 8px;
  margin-top: 0.5rem;
}

.status-section h4 {
  color: #001d3d;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.status-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-info p {
  color: #495057;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-info p:before {
  content: "•";
  color: #4158d0;
  font-weight: bold;
}

.status-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.status-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-input label {
  color: #495057;
  font-size: 0.9rem;
}

.status-input select,
.status-input input {
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.9rem;
}

.card-actions {
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.save-btn,
.delete-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.save-btn {
  background: linear-gradient(135deg, #001d3d, #4158d0);
  color: white;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.save-btn:hover,
.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

@media (max-width: 768px) {
  .admission-admin-container {
    padding: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .nav-tabs {
    flex-direction: column;
    width: 100%;
  }

  .nav-tab {
    width: 100%;
  }

  .type-tabs {
    flex-direction: column;
    width: 100%;
  }

  .type-tab {
    width: 100%;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .status-inputs {
    grid-template-columns: 1fr;
  }

  .card-actions {
    flex-direction: column;
  }

  .save-btn,
  .delete-btn {
    width: 100%;
  }
}

.status-box {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.status-box h4 {
  color: #001d3d;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  text-align: center;
}

.status-row {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.status-item {
  flex: 1;
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.status-item h5 {
  color: #001d3d;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
}

.status-item p {
  color: #495057;
  font-size: 0.9rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.35rem;
}

.status-item p:last-child {
  margin-bottom: 0;
}

.status-item p:before {
  content: "•";
  color: #4158d0;
  font-weight: bold;
}

@media (max-width: 768px) {
  .status-row {
    flex-direction: column;
  }
}

.university-name-toggle {
  cursor: pointer;
  transition: color 0.2s;
}
.university-name-toggle:hover {
  color: #4158d0;
}
</style> 