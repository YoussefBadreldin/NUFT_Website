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
                    type="text" 
                    v-model="addFormData.guide_Url" 
                    id="guide_url" 
                    required
                    pattern="^/guide/(private|national|special|international)/[A-Z]+$"
                    placeholder="مثال: /guide/private/ACU"
                  >
                  <small class="form-text text-muted">يجب أن يكون الرابط بالصيغة: /guide/نوع-الجامعة/رمز-الجامعة</small>
                </div>                
<br>
                <!-- Transfer Section -->
                <div class="form-group">
                  <label for="transfer_status">
                    <i class="fas fa-exchange-alt"></i>
                    حالة التحويل
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.transfer_status" 
                    id="transfer_status" 
                    required
                    placeholder="أدخل حالة التحويل"
                  >
                </div>

                <div class="form-group">
                  <label for="transfer_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للتحويل
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.transfer_deadline" 
                    id="transfer_deadline"
                    required
                    placeholder="أدخل آخر موعد للتحويل"
                  >
                </div>

                <!-- Thanawya First Year Section -->
                <div class="form-group">
                  <label for="thanwyaa_first_year_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.thanwyaa_firstYear_status" 
                    id="thanwyaa_first_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية العامة (السنة الأولي)"
                  >
                </div>

                <div class="form-group">
                  <label for="thanwyaa_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.thanwyaa_firstYear_deadline" 
                    id="thanwyaa_first_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية العامة (السنة الأولي)"
                  >
                </div>

                <!-- Thanawya Second Year Section -->
                <div class="form-group">
                  <label for="thanwyaa_second_year_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة (السنة الثاني)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.thanwyaa_secondYear_status" 
                    id="thanwyaa_second_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية العامة (السنة الثاني)"
                  >
                </div>

                <div class="form-group">
                  <label for="thanwyaa_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة (السنة الثاني)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.thanwyaa_secondYear_deadline" 
                    id="thanwyaa_second_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية العامة (السنة الثاني)"
                  >
                </div>

                <!-- Azhar First Year Section -->
                <div class="form-group">
                  <label for="azhar_first_year_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.azhar_firstYear_status" 
                    id="azhar_first_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية الأزهرية (السنة الأولي)"
                  >
                </div>

                <div class="form-group">
                  <label for="azhar_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.azhar_firstYear_deadline" 
                    id="azhar_first_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية الأزهرية (السنة الأولي)"
                  >
                </div>

                <!-- Azhar Second Year Section -->
                <div class="form-group">
                  <label for="azhar_second_year_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.azhar_secondYear_status" 
                    id="azhar_second_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية الأزهرية (السنة الثانية)"
                  >
                </div>

                <div class="form-group">
                  <label for="azhar_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.azhar_secondYear_deadline" 
                    id="azhar_second_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية الأزهرية (السنة الثانية)"
                  >
                </div>

                <!-- Arab/English First Year Section -->
                <div class="form-group">
                  <label for="arab_english_first_year_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.Arabenglish_firstYear_status" 
                    id="arab_english_first_year_status" 
                    required
                    placeholder="أدخل حالة الشهادات العربية والإجنبية (السنة الأولي)"
                  >
                </div>

                <div class="form-group">
                  <label for="arab_english_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.Arabenglish_firstYear_deadline" 
                    id="arab_english_first_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للشهادات العربية والإجنبية (السنة الأولي)"
                  >
                </div>

                <!-- Arab/English Second Year Section -->
                <div class="form-group">
                  <label for="arab_english_second_year_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.Arabenglish_secondYear_status" 
                    id="arab_english_second_year_status" 
                    required
                    placeholder="أدخل حالة الشهادات العربية والإجنبية (السنة الثانية)"
                  >
                </div>

                <div class="form-group">
                  <label for="arab_english_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.Arabenglish_secondYear_deadline" 
                    id="arab_english_second_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للشهادات العربية والإجنبية (السنة الثانية)"
                  >
                </div>

                <!-- Wafdeen Section -->
                <div class="form-group">
                  <label for="wafdeen_status">
                    <i class="fas fa-user-plus"></i>
                    حالة الوافدين
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.wafdeen_status" 
                    id="wafdeen_status" 
                    required
                    placeholder="أدخل حالة الوافدين"
                  >
                </div>

                <div class="form-group">
                  <label for="wafdeen_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للوافدين
                  </label>
                  <input 
                    type="text" 
                    v-model="addFormData.wafdeen_deadline" 
                    id="wafdeen_deadline"
                    required
                    placeholder="أدخل آخر موعد للوافدين"
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
            <div class="university-info">
              <div class="university-title">
                <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                  <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
                </div>
                <h3 @click="toggleUniversity(university.id)" class="university-name-toggle">
                  {{ university.university_Arabic_Name }}
                </h3>
              </div>
              <div class="header-actions">
                <button class="edit-btn" @click="editUniversity(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="delete-btn" @click="confirmDelete(university)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
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
                    <p>الحالة: <span :class="getStatusClass(university.transfer_status)">{{ university.transfer_status }}</span></p>
                    <p>آخر موعد: {{ formatDate(university.transfer_deadline) }}</p>
                  </div>
                </div>
              </div>

              <!-- Thanawya Status -->
              <div class="status-box">
                <h4>الثانوية العامة</h4>
                <div class="status-row">
                  <div class="status-item">
                    <h5>السنة الأولي</h5>
                    <p><span>الحالة: <br> <span :class="getStatusClass(university.thanwyaa_firstYear_status)">{{ university.thanwyaa_firstYear_status }}</span></span></p>
                    <p><span>آخر موعد: <br> {{ formatDate(university.thanwyaa_firstYear_deadline) }}</span></p>
                  </div>
                  <div class="status-item">
                    <h5>السنة الثانية</h5>
                    <p><span>الحالة: <br> <span :class="getStatusClass(university.thanwyaa_secondYear_status)">{{ university.thanwyaa_secondYear_status }}</span></span></p>
                    <p><span>آخر موعد: <br> {{ formatDate(university.thanwyaa_secondYear_deadline) }}</span></p>
                  </div>
                </div>
              </div>

              <!-- Azhar Status -->
              <div class="status-box">
                <h4>الثانوية الأزهرية</h4>
                <div class="status-row">
                  <div class="status-item">
                    <h5>السنة الأولي</h5>
                    <p><span>الحالة: <br> <span :class="getStatusClass(university.azhar_firstYear_status)">{{ university.azhar_firstYear_status }}</span></span></p>
                    <p><span>آخر موعد: <br> {{ formatDate(university.azhar_firstYear_deadline) }}</span></p>
                  </div>
                  <div class="status-item">
                    <h5>السنة الثانية</h5>
                    <p><span>الحالة: <br> <span :class="getStatusClass(university.azhar_secondYear_status)">{{ university.azhar_secondYear_status }}</span></span></p>
                    <p><span>آخر موعد: <br> {{ formatDate(university.azhar_secondYear_deadline) }}</span></p>
                  </div>
                </div>
              </div>

              <!-- Arab/English Status -->
              <div class="status-box">
                <h4>الشهادات العربية والإجنبية</h4>
                <div class="status-row">
                  <div class="status-item">
                    <h5>السنة الأولي</h5>
                    <p><span>الحالة: <br> <span :class="getStatusClass(university.Arabenglish_firstYear_status)">{{ university.Arabenglish_firstYear_status }}</span></span></p>
                    <p><span>آخر موعد: <br> {{ formatDate(university.Arabenglish_firstYear_deadline) }}</span></p>
                  </div>
                  <div class="status-item">
                    <h5>السنة الثانية</h5>
                    <p><span>الحالة: <br> <span :class="getStatusClass(university.Arabenglish_secondYear_status)">{{ university.Arabenglish_secondYear_status }}</span></span></p>
                    <p><span>آخر موعد: <br> {{ formatDate(university.Arabenglish_secondYear_deadline) }}</span></p>
                  </div>
                </div>
              </div>

              <!-- Wafdeen Status -->
              <div class="status-box">
                <h4>الوافدين</h4>
                <div class="status-row">
                  <div class="status-item">
                    <p>الحالة: <span :class="getStatusClass(university.wafdeen_status)">{{ university.wafdeen_status }}</span></p>
                    <p>آخر موعد: {{ formatDate(university.wafdeen_deadline) }}</p>
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

      <div v-else-if="!selectedUniversity" class="universities-grid">
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <div class="university-info">
              <div class="university-title">
                <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                  <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
                </div>
                <h3 @click="selectUniversityForEdit(university)" class="university-name-toggle">
                  {{ university.university_Arabic_Name }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="form-section">
        <div class="form-card">
          <div class="form-header">
            <h3>تعديل حالة {{ selectedUniversity.university_Arabic_Name }}</h3>
            <button class="back-btn" @click="selectedUniversity = null">
              <i class="fas fa-arrow-right"></i>
              رجوع
            </button>
          </div>
          <form @submit.prevent="saveUniversity(selectedUniversity)">
            <div class="form-category">
              <h3 class="category-title">
                <i class="fas fa-university"></i>
                بيانات حالة الجامعة
              </h3>
              <div class="form-grid">
                <div class="form-group">
                  <label for="edit_university_code">
                    <i class="fas fa-hashtag"></i>
                    الرمز المختصر للجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.university" 
                    id="edit_university_code" 
                    required
                    placeholder="أدخل الرمز المختصر للجامعة"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_university_name">
                    <i class="fas fa-graduation-cap"></i>
                    اسم الجامعة
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.university_Arabic_Name" 
                    id="edit_university_name" 
                    required
                    placeholder="أدخل اسم الجامعة"
                  >
                </div>

                <!-- Guide URL -->
                <div class="form-group">
                  <label for="edit_guide_url">
                    <i class="fas fa-link"></i>
                    رابط الجامعة في الدليل
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.guide_Url" 
                    id="edit_guide_url" 
                    required
                    pattern="^/guide/(private|national|special|international)/[A-Z]+$"
                    placeholder="مثال: /guide/private/ACU"
                  >
                  <small class="form-text text-muted">يجب أن يكون الرابط بالصيغة: /guide/نوع-الجامعة/رمز-الجامعة</small>
                </div>

                <!-- Transfer Section -->
                <div class="form-group">
                  <label for="edit_transfer_status">
                    <i class="fas fa-exchange-alt"></i>
                    حالة التحويل
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.transfer_status" 
                    id="edit_transfer_status" 
                    required
                    placeholder="أدخل حالة التحويل"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_transfer_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للتحويل
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.transfer_deadline" 
                    id="edit_transfer_deadline"
                    required
                    placeholder="أدخل آخر موعد للتحويل"
                  >
                </div>

                <!-- Thanawya First Year Section -->
                <div class="form-group">
                  <label for="edit_thanwyaa_first_year_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.thanwyaa_firstYear_status" 
                    id="edit_thanwyaa_first_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية العامة (السنة الأولي)"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_thanwyaa_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.thanwyaa_firstYear_deadline" 
                    id="edit_thanwyaa_first_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية العامة (السنة الأولي)"
                  >
                </div>

                <!-- Thanawya Second Year Section -->
                <div class="form-group">
                  <label for="edit_thanwyaa_second_year_status">
                    <i class="fas fa-book"></i>
                    حالة الثانوية العامة (السنة الثاني)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.thanwyaa_secondYear_status" 
                    id="edit_thanwyaa_second_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية العامة (السنة الثاني)"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_thanwyaa_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية العامة (السنة الثاني)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.thanwyaa_secondYear_deadline" 
                    id="edit_thanwyaa_second_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية العامة (السنة الثاني)"
                  >
                </div>

                <!-- Azhar First Year Section -->
                <div class="form-group">
                  <label for="edit_azhar_first_year_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.azhar_firstYear_status" 
                    id="edit_azhar_first_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية الأزهرية (السنة الأولي)"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_azhar_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.azhar_firstYear_deadline" 
                    id="edit_azhar_first_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية الأزهرية (السنة الأولي)"
                  >
                </div>

                <!-- Azhar Second Year Section -->
                <div class="form-group">
                  <label for="edit_azhar_second_year_status">
                    <i class="fas fa-mosque"></i>
                    حالة الثانوية الأزهرية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.azhar_secondYear_status" 
                    id="edit_azhar_second_year_status" 
                    required
                    placeholder="أدخل حالة الثانوية الأزهرية (السنة الثانية)"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_azhar_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للثانوية الأزهرية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.azhar_secondYear_deadline" 
                    id="edit_azhar_second_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للثانوية الأزهرية (السنة الثانية)"
                  >
                </div>

                <!-- Arab/English First Year Section -->
                <div class="form-group">
                  <label for="edit_arab_english_first_year_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.Arabenglish_firstYear_status" 
                    id="edit_arab_english_first_year_status" 
                    required
                    placeholder="أدخل حالة الشهادات العربية والإجنبية (السنة الأولي)"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_arab_english_first_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية (السنة الأولي)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.Arabenglish_firstYear_deadline" 
                    id="edit_arab_english_first_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للشهادات العربية والإجنبية (السنة الأولي)"
                  >
                </div>

                <!-- Arab/English Second Year Section -->
                <div class="form-group">
                  <label for="edit_arab_english_second_year_status">
                    <i class="fas fa-language"></i>
                    حالة الشهادات العربية والإجنبية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.Arabenglish_secondYear_status" 
                    id="edit_arab_english_second_year_status" 
                    required
                    placeholder="أدخل حالة الشهادات العربية والإجنبية (السنة الثانية)"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_arab_english_second_year_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للشهادات العربية والإجنبية (السنة الثانية)
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.Arabenglish_secondYear_deadline" 
                    id="edit_arab_english_second_year_deadline"
                    required
                    placeholder="أدخل آخر موعد للشهادات العربية والإجنبية (السنة الثانية)"
                  >
                </div>

                <!-- Wafdeen Section -->
                <div class="form-group">
                  <label for="edit_wafdeen_status">
                    <i class="fas fa-user-plus"></i>
                    حالة الوافدين
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.wafdeen_status" 
                    id="edit_wafdeen_status" 
                    required
                    placeholder="أدخل حالة الوافدين"
                  >
                </div>

                <div class="form-group">
                  <label for="edit_wafdeen_deadline">
                    <i class="fas fa-calendar"></i>
                    آخر موعد للوافدين
                  </label>
                  <input 
                    type="text" 
                    v-model="selectedUniversity.wafdeen_deadline" 
                    id="edit_wafdeen_deadline"
                    required
                    placeholder="أدخل آخر موعد للوافدين"
                  >
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <i class="fas fa-save"></i>
                حفظ التغييرات
              </button>
            </div>
          </form>
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

      <div v-else-if="!universityToDelete" class="universities-grid">
        <div v-for="university in filteredUniversities" :key="university.id" class="university-card">
          <div class="university-header">
            <div class="university-info">
              <div class="university-title">
                <div class="university-logo" v-if="universityLinks[university.university]?.university_Logo">
                  <img :src="universityLinks[university.university].university_Logo" :alt="university.university_Arabic_Name">
                </div>
                <h3 @click="confirmDelete(university)" class="university-name-toggle">
                  {{ university.university_Arabic_Name }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="delete-confirmation">
        <div class="confirmation-content">
          <div class="university-info-delete">
            <div class="university-logo-delete" v-if="universityLinks[universityToDelete.university]?.university_Logo">
              <img :src="universityLinks[universityToDelete.university].university_Logo" :alt="universityToDelete.university_Arabic_Name">
            </div>
            <div class="university-details">
              <h3>{{ universityToDelete.university_Arabic_Name }}</h3>
              <p class="university-type">{{ getUniversityTypeLabel(selectedType) }}</p>
            </div>
          </div>
          <i class="fas fa-exclamation-triangle"></i>
          <h3>هل أنت متأكد من حذف حالة الجامعة {{ universityToDelete?.university_Arabic_Name }}؟</h3>
          <p>سيتم حذف جميع بيانات حالة الجامعة بشكل نهائي</p>
          <div class="confirmation-actions">
            <button class="cancel-btn" @click="cancelDelete">
              <i class="fas fa-times"></i>
              إلغاء
            </button>
            <button class="confirm-delete-btn" @click="confirmDeleteAction">
              <i class="fas fa-trash"></i>
              تأكيد الحذف
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
      universityStatuses: [],
      universityDeadlines: [],
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
        transfer_status: '',
        thanwyaa_firstYear_status: '',
        thanwyaa_secondYear_status: '',
        azhar_firstYear_status: '',
        azhar_secondYear_status: '',
        Arabenglish_firstYear_status: '',
        Arabenglish_secondYear_status: '',
        wafdeen_status: '',
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
      },
      selectedUniversity: null,
      universityToDelete: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async fetchData() {
      this.loading = true;
      const statusEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      const deadlineEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/deadline',
        private: 'https://nuft-website-backend.vercel.app/private/deadline',
        special: 'https://nuft-website-backend.vercel.app/special/deadline',
        international: 'https://nuft-website-backend.vercel.app/international/deadline'
      };

      const linkEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/links',
        private: 'https://nuft-website-backend.vercel.app/private/links',
        special: 'https://nuft-website-backend.vercel.app/special/links',
        international: 'https://nuft-website-backend.vercel.app/international/links'
      };

      try {
        const [statusResponse, deadlineResponse, linksResponse] = await Promise.all([
          axios.get(statusEndpoints[this.selectedType]),
          axios.get(deadlineEndpoints[this.selectedType]),
          axios.get(linkEndpoints[this.selectedType])
        ]);
        
        this.universityStatuses = statusResponse.data;
        this.universityDeadlines = deadlineResponse.data;
        
        // Merge status and deadline data
        this.universities = this.universityStatuses.map(status => {
          const deadline = this.universityDeadlines.find(d => d.university === status.university) || {};
          return {
            ...status,
            transfer_deadline: deadline.transfer_deadline,
            thanwyaa_firstYear_deadline: deadline.thanwyaa_firstYear_deadline,
            thanwyaa_secondYear_deadline: deadline.thanwyaa_secondYear_deadline,
            azhar_firstYear_deadline: deadline.azhar_firstYear_deadline,
            azhar_secondYear_deadline: deadline.azhar_secondYear_deadline,
            Arabenglish_firstYear_deadline: deadline.Arabenglish_firstYear_deadline,
            Arabenglish_secondYear_deadline: deadline.Arabenglish_secondYear_deadline,
            wafdeen_deadline: deadline.wafdeen_deadline
          };
        });
        
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
      const statusEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      const deadlineEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/deadline',
        private: 'https://nuft-website-backend.vercel.app/private/deadline',
        special: 'https://nuft-website-backend.vercel.app/special/deadline',
        international: 'https://nuft-website-backend.vercel.app/international/deadline'
      };

      this.saving = true;
      try {
        console.log('Saving university:', university);
        console.log('Selected type:', this.selectedType);
        console.log('Status endpoint:', statusEndpoints[this.selectedType]);
        console.log('Deadline endpoint:', deadlineEndpoints[this.selectedType]);

        // Save status data
        const statusData = {
          university: university.university,
          university_Arabic_Name: university.university_Arabic_Name,
          transfer_status: university.transfer_status,
          thanwyaa_firstYear_status: university.thanwyaa_firstYear_status,
          thanwyaa_secondYear_status: university.thanwyaa_secondYear_status,
          azhar_firstYear_status: university.azhar_firstYear_status,
          azhar_secondYear_status: university.azhar_secondYear_status,
          Arabenglish_firstYear_status: university.Arabenglish_firstYear_status,
          Arabenglish_secondYear_status: university.Arabenglish_secondYear_status,
          wafdeen_status: university.wafdeen_status,
          guide_Url: university.guide_Url
        };

        const deadlineData = {
          university: university.university,
          transfer_deadline: university.transfer_deadline,
          thanwyaa_firstYear_deadline: university.thanwyaa_firstYear_deadline,
          thanwyaa_secondYear_deadline: university.thanwyaa_secondYear_deadline,
          azhar_firstYear_deadline: university.azhar_firstYear_deadline,
          azhar_secondYear_deadline: university.azhar_secondYear_deadline,
          Arabenglish_firstYear_deadline: university.Arabenglish_firstYear_deadline,
          Arabenglish_secondYear_deadline: university.Arabenglish_secondYear_deadline,
          wafdeen_deadline: university.wafdeen_deadline
        };

        console.log('Status data to send:', statusData);
        console.log('Deadline data to send:', deadlineData);

        // Save status data
        const statusResponse = await axios.put(`${statusEndpoints[this.selectedType]}/${university._id}`, statusData);
        console.log('Status response:', statusResponse.data);

        // Save deadline data
        const deadlineResponse = await axios.put(`${deadlineEndpoints[this.selectedType]}/${university._id}`, deadlineData);
        console.log('Deadline response:', deadlineResponse.data);

        if (statusResponse.data && deadlineResponse.data) {
          // Update the local state with the new data
          const updatedUniversity = {
            ...university,
            ...statusResponse.data,
            ...deadlineResponse.data
          };

          // Update the universities array
          const index = this.universities.findIndex(u => u._id === university._id);
          if (index !== -1) {
            this.universities[index] = updatedUniversity;
          }

          // Update filtered universities
          this.filteredUniversities = [...this.universities];

          alert('تم حفظ التغييرات بنجاح');
          this.selectedUniversity = null;
          this.activeTab = 'manage';
        }
      } catch (error) {
        console.error('Error saving university:', error);
        console.error('Error response:', error.response);
        console.error('Error message:', error.message);
        console.error('Error config:', error.config);
        
        let errorMessage = 'حدث خطأ أثناء حفظ التغييرات';
        if (error.response) {
          errorMessage = error.response.data?.message || errorMessage;
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
        }
        alert(errorMessage);
      } finally {
        this.saving = false;
      }
    },

    async addUniversityStatus() {
      const statusEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission/add',
        private: 'https://nuft-website-backend.vercel.app/private/admission/add',
        special: 'https://nuft-website-backend.vercel.app/special/admission/add',
        international: 'https://nuft-website-backend.vercel.app/international/admission/add'
      };

      const deadlineEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/deadline/add',
        private: 'https://nuft-website-backend.vercel.app/private/deadline/add',
        special: 'https://nuft-website-backend.vercel.app/special/deadline/add',
        international: 'https://nuft-website-backend.vercel.app/international/deadline/add'
      };

      try {
        // Add status data
        await axios.post(statusEndpoints[this.addFormData.type], {
          university: this.addFormData.university,
          university_Arabic_Name: this.addFormData.university_Arabic_Name,
          transfer_status: this.addFormData.transfer_status,
          thanwyaa_firstYear_status: this.addFormData.thanwyaa_firstYear_status,
          thanwyaa_secondYear_status: this.addFormData.thanwyaa_secondYear_status,
          azhar_firstYear_status: this.addFormData.azhar_firstYear_status,
          azhar_secondYear_status: this.addFormData.azhar_secondYear_status,
          Arabenglish_firstYear_status: this.addFormData.Arabenglish_firstYear_status,
          Arabenglish_secondYear_status: this.addFormData.Arabenglish_secondYear_status,
          wafdeen_status: this.addFormData.wafdeen_status,
          guide_Url: this.addFormData.guide_Url
        });

        // Add deadline data
        await axios.post(deadlineEndpoints[this.addFormData.type], {
          university: this.addFormData.university,
          transfer_deadline: this.addFormData.transfer_deadline,
          thanwyaa_firstYear_deadline: this.addFormData.thanwyaa_firstYear_deadline,
          thanwyaa_secondYear_deadline: this.addFormData.thanwyaa_secondYear_deadline,
          azhar_firstYear_deadline: this.addFormData.azhar_firstYear_deadline,
          azhar_secondYear_deadline: this.addFormData.azhar_secondYear_deadline,
          Arabenglish_firstYear_deadline: this.addFormData.Arabenglish_firstYear_deadline,
          Arabenglish_secondYear_deadline: this.addFormData.Arabenglish_secondYear_deadline,
          wafdeen_deadline: this.addFormData.wafdeen_deadline
        });

        alert('تم إضافة الجامعة بنجاح');
        this.resetAddForm();
        this.fetchData();
      } catch (error) {
        console.error('Error adding university:', error);
        alert('حدث خطأ أثناء إضافة الجامعة');
      }
    },

    async deleteUniversity(university) {
      const statusEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/admission',
        private: 'https://nuft-website-backend.vercel.app/private/admission',
        special: 'https://nuft-website-backend.vercel.app/special/admission',
        international: 'https://nuft-website-backend.vercel.app/international/admission'
      };

      const deadlineEndpoints = {
        national: 'https://nuft-website-backend.vercel.app/national/deadline',
        private: 'https://nuft-website-backend.vercel.app/private/deadline',
        special: 'https://nuft-website-backend.vercel.app/special/deadline',
        international: 'https://nuft-website-backend.vercel.app/international/deadline'
      };

      this.deleting = true;
      try {
        // Delete both status and deadline data
        await Promise.all([
          axios.delete(`${statusEndpoints[this.selectedType]}/${university._id}`),
          axios.delete(`${deadlineEndpoints[this.selectedType]}/${university._id}`)
        ]);
        
        // Remove from local state
        this.universities = this.universities.filter(u => u._id !== university._id);
        this.filteredUniversities = this.filteredUniversities.filter(u => u._id !== university._id);
        
        alert('تم حذف الجامعة بنجاح');
        this.universityToDelete = null;
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error deleting university:', error);
        alert(error.response?.data?.message || 'حدث خطأ أثناء حذف الجامعة');
      } finally {
        this.deleting = false;
      }
    },

    resetAddForm() {
      this.addFormData = {
        university: '',
        university_Arabic_Name: '',
        transfer_status: '',
        thanwyaa_firstYear_status: '',
        thanwyaa_secondYear_status: '',
        azhar_firstYear_status: '',
        azhar_secondYear_status: '',
        Arabenglish_firstYear_status: '',
        Arabenglish_secondYear_status: '',
        wafdeen_status: '',
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
      this.activeTab = 'delete';
      this.universityToDelete = { ...university };
    },

    cancelDelete() {
      this.universityToDelete = null;
      this.activeTab = 'manage';
    },

    async confirmDeleteAction() {
      if (!this.universityToDelete) return;
      
      try {
        await this.deleteUniversity(this.universityToDelete);
        this.universityToDelete = null;
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error deleting university:', error);
      }
    },

    toggleUniversity(universityId) {
      if (this.expandedUniversityId === universityId) {
        this.expandedUniversityId = null;
      } else {
        this.expandedUniversityId = universityId;
      }
    },

    formatDate(dateString) {
      if (!dateString) return 'غير محدد';
      return dateString;
    },

    formatDateForInput(dateString) {
      if (!dateString) return '';
      return dateString;
    },

    getStatusClass(status) {
      if (!status) return '';
      if (status.includes('انتهي')) return 'status-ended';
      if (status.includes('متاح')) return 'status-available';
      if (status.includes('لم يبداء')) return 'status-not-started';
      return '';
    },

    editUniversity(university) {
      this.activeTab = 'edit';
      this.selectedUniversity = { ...university };
      // Scroll to the edit section
      this.$nextTick(() => {
        const editSection = document.querySelector('.section-container');
        if (editSection) {
          editSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    },

    selectUniversityForEdit(university) {
      this.selectedUniversity = { ...university };
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

.university-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
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
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.35rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.35rem;
}

.status-info p:before {
  content: "•";
  color: #4158d0;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.status-info p span {
  flex: 1;
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
  background: #ffebee;
  color: #d32f2f;
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
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.35rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  margin-bottom: 0.35rem;
}

.status-item p:before {
  content: "•";
  color: #4158d0;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.status-item p span {
  flex: 1;
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
  padding: 0.5rem;
  border-radius: 6px;
}

.university-name-toggle:hover {
  color: #4158d0;
  background: #e3f2fd;
}

.status-ended {
    color: #dc3545;
    font-weight: 500;
}

.status-available {
    color: #28a745;
    font-weight: 500;
}

.status-not-started {
    color: #6f42c1;
    font-weight: 500;
}

.header-actions {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
}

.edit-btn,
.delete-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    flex: 1;
    justify-content: center;
}

.edit-btn {
    background: #e3f2fd;
    color: #1976d2;
}

.edit-btn:hover {
    background: #bbdefb;
    transform: translateY(-2px);
}

.delete-btn {
    background: #ffebee;
    color: #d32f2f;
}

.delete-btn:hover {
    background: #ffcdd2;
    transform: translateY(-2px);
}

.form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #e9ecef;
}

.form-header h3 {
    color: #001d3d;
    font-size: 1.5rem;
    margin: 0;
}

.back-btn {
    padding: 0.5rem 1rem;
    background: #e3f2fd;
    color: #1976d2;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.back-btn:hover {
    background: #bbdefb;
    transform: translateX(-2px);
}

.delete-confirmation {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.confirmation-content {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 100%;
}

.confirmation-content i {
    font-size: 3rem;
    color: #dc3545;
    margin-bottom: 1rem;
}

.confirmation-content h3 {
    color: #001d3d;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.confirmation-content p {
    color: #6c757d;
    margin-bottom: 2rem;
}

.confirmation-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.cancel-btn,
.confirm-delete-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.cancel-btn {
    background: #e9ecef;
    color: #495057;
}

.cancel-btn:hover {
    background: #dee2e6;
    transform: translateY(-2px);
}

.confirm-delete-btn {
    background: #dc3545;
    color: white;
}

.confirm-delete-btn:hover {
    background: #c82333;
    transform: translateY(-2px);
}

.university-info-delete {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.university-logo-delete {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e9ecef;
  flex-shrink: 0;
}

.university-logo-delete img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.university-details {
  flex: 1;
}

.university-details h3 {
  color: #001d3d;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.university-type {
  color: #6c757d;
  margin: 0;
  font-size: 1rem;
}
</style> 