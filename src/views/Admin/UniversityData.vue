<template>
  <div class="university-admin-container" dir="rtl">
    <div class="header">
      <h1>إدارة الجامعات</h1>
      <p class="subtitle">إضافة وتعديل بيانات الجامعات</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'manage' }"
        @click="activeTab = 'manage'"
      >
        <i class="fas fa-university"></i>
        متابعة وتعديل الجامعات
      </button>
      <button 
        class="nav-tab" 
        :class="{ active: activeTab === 'add' }"
        @click="activeTab = 'add'"
      >
        <i class="fas fa-plus"></i>
        إضافة جامعة جديدة
      </button>
    </div>

    <!-- Universities List Section -->
    <div v-if="activeTab === 'manage'" class="universities-list-section">
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

      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>جاري التحميل...</p>
      </div>

      <div v-else-if="filteredUniversities.length === 0" class="no-results">
        <i class="fas fa-university"></i>
        <p>لا توجد جامعات</p>
      </div>

      <div v-else class="universities-grid">
        <!-- Private Universities -->
        <div v-if="privateUniversities.length" class="university-section">
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
                <button class="action-btn edit" @click="editUniversity(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="confirmDelete(university.id)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- National Universities -->
        <div v-if="nationalUniversities.length" class="university-section">
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
                <button class="action-btn edit" @click="editUniversity(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="confirmDelete(university.id)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Special Universities -->
        <div v-if="specialUniversities.length" class="university-section">
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
                <button class="action-btn edit" @click="editUniversity(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="confirmDelete(university.id)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- International Universities -->
        <div v-if="internationalUniversities.length" class="university-section">
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
                <button class="action-btn edit" @click="editUniversity(university)">
                  <i class="fas fa-edit"></i>
                  تعديل
                </button>
                <button class="action-btn delete" @click="confirmDelete(university.id)">
                  <i class="fas fa-trash"></i>
                  حذف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit University Form -->
    <div v-if="activeTab === 'add' || isEditing" class="form-section">
      <div class="form-card">
        <h2 class="section-title">{{ isEditing ? 'تعديل الجامعة' : 'إضافة جامعة جديدة' }}</h2>
        <form @submit.prevent="isEditing ? updateUniversity() : addUniversity()">
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
                  v-model="formData.university_code" 
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
                  v-model="formData.university_Arabic_Name" 
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
                    v-model="formData.university_Logo" 
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
                <select v-model="formData.type" id="type" required>
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
                  v-model="formData.Uni_Bio" 
                  id="Uni_Bio" 
                  rows="4"
                  placeholder="أدخل نبذة مختصرة عن الجامعة"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="location">
                  <i class="fas fa-map-marker-alt"></i>
                  الموقع
                </label>
                <input 
                  type="text" 
                  v-model="formData.location" 
                  id="location"
                  placeholder="أدخل موقع الجامعة"
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
                  v-model="formData.website" 
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
                  v-model="formData.phone" 
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
                  v-model="formData.email" 
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
                  v-model="formData.facebook" 
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
                  v-model="formData.instagram" 
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
                  v-model="formData.youtube" 
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
                  v-model="formData.linkedin" 
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
              <div v-for="(faculty, index) in formData.faculties" :key="index" class="faculty-item">
                <div class="faculty-header">
                  <h4>
                    <i class="fas fa-graduation-cap"></i>
                    كلية {{ index + 1 }}
                  </h4>
                  <button type="button" class="remove-btn" @click="removeFaculty(index)">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="form-grid">
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
              <button type="button" class="add-btn" @click="addFaculty">
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
              <label for="international_programs">معلومات البرامج الدولية</label>
              <textarea 
                v-model="formData.international_programs" 
                id="international_programs" 
                rows="4"
                placeholder="أدخل معلومات البرامج الدولية"
              ></textarea>
            </div>
          </div>

          <!-- Dorms -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-home"></i>
              السكن الجامعي
            </h3>
            <div class="dorms-list">
              <div v-for="(dorm, index) in formData.dorms" :key="index" class="dorm-item">
                <div class="dorm-header">
                  <h4>
                    <i class="fas fa-building"></i>
                    سكن {{ index + 1 }}
                  </h4>
                  <button type="button" class="remove-btn" @click="removeDorm(index)">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label :for="'dorm_name_' + index">اسم السكن</label>
                    <input 
                      type="text" 
                      v-model="dorm.name" 
                      :id="'dorm_name_' + index"
                      placeholder="أدخل اسم السكن"
                    >
                  </div>
                  <div class="form-group full-width">
                    <label :for="'dorm_description_' + index">الوصف</label>
                    <textarea 
                      v-model="dorm.description" 
                      :id="'dorm_description_' + index" 
                      rows="3"
                      placeholder="أدخل وصف السكن"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label :for="'dorm_price_' + index">السعر</label>
                    <input 
                      type="text" 
                      v-model="dorm.price" 
                      :id="'dorm_price_' + index"
                      placeholder="أدخل سعر السكن"
                    >
                  </div>
                  <div class="form-group">
                    <label :for="'dorm_location_' + index">الموقع</label>
                    <input 
                      type="text" 
                      v-model="dorm.location" 
                      :id="'dorm_location_' + index"
                      placeholder="أدخل موقع السكن"
                    >
                  </div>
                </div>
              </div>
              <button type="button" class="add-btn" @click="addDorm">
                <i class="fas fa-plus"></i>
                إضافة سكن
              </button>
            </div>
            <div class="form-group">
              <label for="dorms_link">
                <i class="fas fa-link"></i>
                رابط المزيد عن السكن
              </label>
              <input 
                type="url" 
                v-model="formData.dorms_link" 
                id="dorms_link"
                placeholder="https://example.com/dorms"
              >
            </div>
          </div>

          <!-- Transportation -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-bus"></i>
              وسائل المواصلات
            </h3>
            <div class="transportation-list">
              <div v-for="(trans, index) in formData.transportation" :key="index" class="transportation-item">
                <div class="transportation-header">
                  <h4>
                    <i class="fas fa-route"></i>
                    وسيلة نقل {{ index + 1 }}
                  </h4>
                  <button type="button" class="remove-btn" @click="removeTransportation(index)">
                    <i class="fas fa-trash"></i>
                    حذف
                  </button>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label :for="'trans_name_' + index">اسم وسيلة النقل</label>
                    <input 
                      type="text" 
                      v-model="trans.name" 
                      :id="'trans_name_' + index"
                      placeholder="أدخل اسم وسيلة النقل"
                    >
                  </div>
                  <div class="form-group full-width">
                    <label :for="'trans_description_' + index">الوصف</label>
                    <textarea 
                      v-model="trans.description" 
                      :id="'trans_description_' + index" 
                      rows="3"
                      placeholder="أدخل وصف وسيلة النقل"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label :for="'trans_price_' + index">السعر</label>
                    <input 
                      type="text" 
                      v-model="trans.price" 
                      :id="'trans_price_' + index"
                      placeholder="أدخل سعر وسيلة النقل"
                    >
                  </div>
                  <div class="form-group">
                    <label :for="'trans_route_' + index">المسار</label>
                    <input 
                      type="text" 
                      v-model="trans.route" 
                      :id="'trans_route_' + index"
                      placeholder="أدخل مسار وسيلة النقل"
                    >
                  </div>
                </div>
              </div>
              <button type="button" class="add-btn" @click="addTransportation">
                <i class="fas fa-plus"></i>
                إضافة وسيلة نقل
              </button>
            </div>
            <div class="form-group">
              <label for="transportation_link">
                <i class="fas fa-link"></i>
                رابط المزيد عن المواصلات
              </label>
              <input 
                type="url" 
                v-model="formData.transportation_link" 
                id="transportation_link"
                placeholder="https://example.com/transportation"
              >
            </div>
          </div>

          <!-- Scholarships -->
          <div class="form-category">
            <h3 class="category-title">
              <i class="fas fa-award"></i>
              المنح الدراسية
            </h3>
            <div class="form-group">
              <label for="scholarship_link">رابط المنح الدراسية</label>
              <input 
                type="url" 
                v-model="formData.scholarship_link" 
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
                  v-model="formData.Egyptian_Admission_link" 
                  id="Egyptian_Admission_link"
                  placeholder="https://example.com/egyptian-admission"
                >
              </div>
              <div class="form-group">
                <label for="Egyptian_Transfer_link">رابط التحويل للطلاب المصريين</label>
                <input 
                  type="url" 
                  v-model="formData.Egyptian_Transfer_link" 
                  id="Egyptian_Transfer_link"
                  placeholder="https://example.com/egyptian-transfer"
                >
              </div>
              <div class="form-group">
                <label for="Wafdeen_Admission_link">رابط التقديم للطلاب الوافدين</label>
                <input 
                  type="url" 
                  v-model="formData.Wafdeen_Admission_link" 
                  id="Wafdeen_Admission_link"
                  placeholder="https://example.com/wafdeen-admission"
                >
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="submit-btn">
              <i :class="isEditing ? 'fas fa-save' : 'fas fa-plus'"></i>
              {{ isEditing ? 'حفظ التعديلات' : 'إضافة الجامعة' }}
            </button>
            <button v-if="isEditing" type="button" class="cancel-btn" @click="cancelEdit">
              <i class="fas fa-times"></i>
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UniversityAdmin',
  data() {
    return {
      // Form fields
      formData: {
        university_code: '', // Added university short name
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
      },

      // State management
      universitiesData: [],
      loading: true,
      searchQuery: '',
      filteredUniversities: [],
      isEditing: false,
      editingId: null,
      activeTab: 'manage',

      // Hardcoded universities data
      hardcodedUniversities: {
        private: [
          { id: 'AHUC', university_Arabic_Name: 'جامعة الحياة بالقاهرة', university_Logo: '/images/Logos/Universites/Private/AHUC.png', type: 'private' },
          { id: 'ACU', university_Arabic_Name: 'جامعة الأهرام الكندية', university_Logo: '/images/Logos/Universites/Private/ACU.png', type: 'private' },
          { id: 'ASU', university_Arabic_Name: 'جامعة السلام', university_Logo: '/images/Logos/Universites/Private/ASU.png', type: 'private' },
          { id: 'GUC', university_Arabic_Name: 'الجامعة الألمانية بالقاهرة', university_Logo: '/images/Logos/Universites/Private/GUC.png', type: 'private' },
          { id: 'BADYA', university_Arabic_Name: 'جامعة باديا', university_Logo: '/images/Logos/Universites/Private/BADYA.png', type: 'private' },
          { id: 'BUC', university_Arabic_Name: 'جامعة بدر بالقاهرة', university_Logo: '/images/Logos/Universites/Private/BUC.png', type: 'private' },
          { id: 'BUA', university_Arabic_Name: 'جامعة بدر بأسيوط', university_Logo: '/images/Logos/Universites/Private/BUA.png', type: 'private' },
          { id: 'BUE', university_Arabic_Name: 'الجامعة البريطانية في مصر', university_Logo: '/images/Logos/Universites/Private/BUE.png', type: 'private' },
          { id: 'CUC', university_Arabic_Name: 'جامعة المدينة بالقاهرة', university_Logo: '/images/Logos/Universites/Private/CUC.png', type: 'private' },
          { id: 'DU', university_Arabic_Name: 'جامعة الدلتا للعلوم والتكنولوجيا', university_Logo: '/images/Logos/Universites/Private/DU.png', type: 'private' },
          { id: 'ERU', university_Arabic_Name: 'الجامعة المصرية الروسية', university_Logo: '/images/Logos/Universites/Private/ERU.png', type: 'private' },
          { id: 'ECU', university_Arabic_Name: 'الجامعة المصرية الصينية', university_Logo: '/images/Logos/Universites/Private/ECU.png', type: 'private' },
          { id: 'FUE', university_Arabic_Name: 'جامعة المستقبل', university_Logo: '/images/Logos/Universites/Private/FUE.png', type: 'private' },
          { id: 'NGU', university_Arabic_Name: 'جامعة الجيزة الجديدة', university_Logo: '/images/Logos/Universites/Private/NGU.png', type: 'private' },
          { id: 'HU', university_Arabic_Name: 'جامعة هيليوبليس', university_Logo: '/images/Logos/Universites/Private/HU.png', type: 'private' },
          { id: 'HUE', university_Arabic_Name: 'جامعة حورس', university_Logo: '/images/Logos/Universites/Private/HUE.png', type: 'private' },
          { id: 'IU', university_Arabic_Name: 'جامعة الابتكار', university_Logo: '/images/Logos/Universites/Private/IU.png', type: 'private' },
          { id: 'DerayaU', university_Arabic_Name: 'جامعة دراية', university_Logo: '/images/Logos/Universites/Private/DerayaU.png', type: 'private' },
          { id: 'LUM', university_Arabic_Name: 'جامعة اللوتس', university_Logo: '/images/Logos/Universites/Private/LOTUS.png', type: 'private' },
          { id: 'MSA', university_Arabic_Name: 'جامعة أكتوبر للعلوم الحديثة والآداب', university_Logo: '/images/Logos/Universites/Private/MSA.png', type: 'private' },
          { id: 'MUC', university_Arabic_Name: 'جامعة مايو بالقاهرة', university_Logo: '/images/Logos/Universites/Private/MUC.png', type: 'private' },
          { id: 'MUE', university_Arabic_Name: 'جامعة ميريت', university_Logo: '/images/Logos/Universites/Private/MUE.png', type: 'private' },
          { id: 'MIU', university_Arabic_Name: 'جامعة مصر الدولية', university_Logo: '/images/Logos/Universites/Private/MIU.png', type: 'private' },
          { id: 'MUST', university_Arabic_Name: 'جامعة مصر للعلوم والتكنولوجيا', university_Logo: '/images/Logos/Universites/Private/MUST.png', type: 'private' },
          { id: 'MTI', university_Arabic_Name: 'الجامعة الحديثة للتكنولوجيا والمعلومات', university_Logo: '/images/Logos/Universites/Private/MTI.png', type: 'private' },
          { id: 'NUB', university_Arabic_Name: 'جامعة النهضة ببني سويف', university_Logo: '/images/Logos/Universites/Private/NUB.png', type: 'private' },
          { id: 'NVU', university_Arabic_Name: 'جامعة وادي النيل', university_Logo: '/images/Logos/Universites/Private/NVU.png', type: 'private' },
          { id: 'O6U', university_Arabic_Name: 'جامعة 6 اكتوبر', university_Logo: '/images/Logos/Universites/Private/O6U.png', type: 'private' },
          { id: 'PUA', university_Arabic_Name: 'جامعة فاروس بالإسكندرية', university_Logo: '/images/Logos/Universites/Private/PUA.png', type: 'private' },
          { id: 'RU', university_Arabic_Name: 'جامعة رشيد', university_Logo: '/images/Logos/Universites/Private/RU.png', type: 'private' },
          { id: 'RST', university_Arabic_Name: 'جامعة الريادة للعلوم والتكنولوجيا', university_Logo: '/images/Logos/Universites/Private/RST.png', type: 'private' },
          { id: 'SUT', university_Arabic_Name: 'جامعة السويدي للتكنولوجيا', university_Logo: '/images/Logos/Universites/Private/SUT.png', type: 'private' },
          { id: 'SGU', university_Arabic_Name: 'جامعة الصالحية الجديدة', university_Logo: '/images/Logos/Universites/Private/SGU.png', type: 'private' },
          { id: 'SU', university_Arabic_Name: 'جامعة سيناء', university_Logo: '/images/Logos/Universites/Private/SU.png', type: 'private' },
          { id: 'SphinxU', university_Arabic_Name: 'جامعة سفنكس', university_Logo: '/images/Logos/Universites/Private/SphinxU.png', type: 'private' },
          { id: 'SEU', university_Arabic_Name: 'جامعة ساكسوني مصر للعلوم التطبيقية والتكنولوجيا', university_Logo: '/images/Logos/Universites/Private/SEU.png', type: 'private' }
        ],
        national: [
          { id: 'AlexNU', university_Arabic_Name: 'جامعة الاسكندرية الاهلية', university_Logo: '/images/Logos/Universites/National/AlexNU.png', type: 'national' },
          { id: 'AssuitNU', university_Arabic_Name: 'جامعة اسيوط الاهلية', university_Logo: '/images/Logos/Universites/National/AssuitNU.png', type: 'national' },
          { id: 'BNU', university_Arabic_Name: 'جامعة بنها الاهلية', university_Logo: '/images/Logos/Universites/National/BNU.png', type: 'national' },
          { id: 'BSNU', university_Arabic_Name: 'جامعة بني سويف الاهلية', university_Logo: '/images/Logos/Universites/National/BSNU.png', type: 'national' },
          { id: 'HNU', university_Arabic_Name: 'جامعة حلوان الاهلية', university_Logo: '/images/Logos/Universites/National/HNU.png', type: 'national' },
          { id: 'SVNU', university_Arabic_Name: 'جامعة جنوب الوادي الاهلية', university_Logo: '/images/Logos/Universites/National/SVNU.png', type: 'national' },
          { id: 'NINU', university_Arabic_Name: 'جامعة الإسماعيلية الجديدة الاهلية', university_Logo: '/images/Logos/Universites/National/NINU.png', type: 'national' },
          { id: 'MiniaNU', university_Arabic_Name: 'جامعة المنيا الاهلية', university_Logo: '/images/Logos/Universites/National/MiniaNU.png', type: 'national' },
          { id: 'MansNU', university_Arabic_Name: 'جامعة المنصورة الاهلية', university_Logo: '/images/Logos/Universites/National/MansNU.png', type: 'national' },
          { id: 'MenofiaNU', university_Arabic_Name: 'جامعة المنوفية الاهلية', university_Logo: '/images/Logos/Universites/National/MenofiaNU.png', type: 'national' },
          { id: 'EPNU', university_Arabic_Name: 'جامعة شرق بورسعيد الاهلية', university_Logo: '/images/Logos/Universites/National/EPNU.png', type: 'national' },
          { id: 'ZNU', university_Arabic_Name: 'جامعة الزقازيق الاهلية', university_Logo: '/images/Logos/Universites/National/ZNU.png', type: 'national' },
          { id: 'GU', university_Arabic_Name: 'جامعة الجلالة', university_Logo: '/images/Logos/Universites/National/GU.png', type: 'national' },
          { id: 'AIU', university_Arabic_Name: 'جامعة العلمين الدولية', university_Logo: '/images/Logos/Universites/National/AIU.png', type: 'national' },
          { id: 'KSIU', university_Arabic_Name: 'جامعة الملك سلمان الدولية', university_Logo: '/images/Logos/Universites/National/KSIU.png', type: 'national' },
          { id: 'NMU', university_Arabic_Name: 'جامعة المنصورة الجديدة', university_Logo: '/images/Logos/Universites/National/NMU.png', type: 'national' },
          { id: 'UFE', university_Arabic_Name: 'الجامعة الفرنسية بمصر', university_Logo: '/images/Logos/Universites/National/UFE.png', type: 'national' },
          { id: 'EELU', university_Arabic_Name: 'الجامعة المصرية للتعليم الالكتروني', university_Logo: '/images/Logos/Universites/National/EELU.png', type: 'national' },
          { id: 'EUI', university_Arabic_Name: 'جامعة مصر للمعلوماتية', university_Logo: '/images/Logos/Universites/National/EUI.png', type: 'national' },
          { id: 'NU', university_Arabic_Name: 'جامعة النيل الاهلية', university_Logo: '/images/Logos/Universites/National/NU.png', type: 'national' }
        ],
        special: [
          { id: 'AASTMT', university_Arabic_Name: 'الأكاديمية البحرية للعلوم والتكنولوجيا والنقل البحري', university_Logo: '/images/Logos/Universites/Special/AASTMT.png', type: 'special' },
          { id: 'AOU', university_Arabic_Name: 'الجامعة العربية المفتوحة', university_Logo: '/images/Logos/Universites/Special/AOU.png', type: 'special' },
          { id: 'EslscaU', university_Arabic_Name: 'جامعة اسلسكا', university_Logo: '/images/Logos/Universites/Special/EslscaU.png', type: 'special' },
          { id: 'AUC', university_Arabic_Name: 'الجامعة الأمريكية بالقاهرة', university_Logo: '/images/Logos/Universites/Special/AUC.png', type: 'special' },
          { id: 'EJUST', university_Arabic_Name: 'الجامعة المصرية اليابانية', university_Logo: '/images/Logos/Universites/Special/EJUST.png', type: 'special' },
          { id: 'GIU', university_Arabic_Name: 'الجامعة الألمانية الدولية', university_Logo: '/images/Logos/Universites/Special/GIU.png', type: 'special' },
          { id: 'UST', university_Arabic_Name: 'جامعة العلوم والتكنولوجيا بمدينة زويل', university_Logo: '/images/Logos/Universites/Special/UST.png', type: 'special' }
        ],
        international: [
          { id: 'UEL', university_Arabic_Name: 'جامعة ايست لندن', university_Logo: '/images/Logos/Universites/International/UEL.png', type: 'international' },
          { id: 'UPEI', university_Arabic_Name: 'جامعة جزيرة الأمير إدوارد', university_Logo: '/images/Logos/Universites/International/UPEI.png', type: 'international' },
          { id: 'KPFU', university_Arabic_Name: 'جامعة كازان الفيدرالية الروسية', university_Logo: '/images/Logos/Universites/International/KPFU.png', type: 'international' },
          { id: 'Coventry', university_Arabic_Name: 'جامعة كوفنتري البريطانية', university_Logo: '/images/Logos/Universites/International/COVENTRY.png', type: 'international' },
          { id: 'NOVA', university_Arabic_Name: 'جامعة نوفا ليشبونا البرتغالية', university_Logo: '/images/Logos/Universites/International/NOVA.png', type: 'international' },
          { id: 'SPBU', university_Arabic_Name: 'جامعة سان بطرسبرج الروسية', university_Logo: '/images/Logos/Universites/International/SPBU.png', type: 'international' },
          { id: 'UH', university_Arabic_Name: 'جامعة هيرتفوردشاير البريطانية', university_Logo: '/images/Logos/Universites/International/UH.png', type: 'international' },
          { id: 'UCLAN', university_Arabic_Name: 'جامعة وسط لانكشاير', university_Logo: '/images/Logos/Universites/International/UCLan.png', type: 'international' },
          { id: 'UOL', university_Arabic_Name: 'جامعة لندن', university_Logo: '/images/Logos/Universites/International/UOL.png', type: 'international' }
        ]
      }
    };
  },
  computed: {
    privateUniversities() {
      return this.filteredUniversities.filter(uni => uni.type === 'private');
    },
    nationalUniversities() {
      return this.filteredUniversities.filter(uni => uni.type === 'national');
    },
    specialUniversities() {
      return this.filteredUniversities.filter(uni => uni.type === 'special');
    },
    internationalUniversities() {
      return this.filteredUniversities.filter(uni => uni.type === 'international');
    }
  },
  methods: {
    async fetchUniversities() {
      try {
        // Try to fetch from API first
        const [privateResponse, nationalResponse, specialResponse, internationalResponse] = await Promise.allSettled([
          axios.get('https://nuft-website-backend.vercel.app/privatefaculty/getprivate'),
          axios.get('https://nuft-website-backend.vercel.app/nationalfaculty/getnational'),
          axios.get('https://nuft-website-backend.vercel.app/specialfaculty/getspecial'),
          axios.get('https://nuft-website-backend.vercel.app/internationalfaculty/getinternational')
        ]);

        // Process private universities
        if (privateResponse.status === 'fulfilled' && privateResponse.value.data && Array.isArray(privateResponse.value.data)) {
          const privateUnis = privateResponse.value.data.map(uni => ({
            id: uni.university_code,
            university_Arabic_Name: uni.university_name,
            university_Logo: uni.university_logo || '/images/default-university.png',
            type: 'private'
          }));
          this.universitiesData = [...this.universitiesData, ...privateUnis];
        } else {
          this.universitiesData = [...this.universitiesData, ...this.hardcodedUniversities.private];
        }

        // Process national universities
        if (nationalResponse.status === 'fulfilled' && nationalResponse.value.data && Array.isArray(nationalResponse.value.data)) {
          const nationalUnis = nationalResponse.value.data.map(uni => ({
            id: uni.university_code,
            university_Arabic_Name: uni.university_name,
            university_Logo: uni.university_logo || '/images/default-university.png',
            type: 'national'
          }));
          this.universitiesData = [...this.universitiesData, ...nationalUnis];
        } else {
          this.universitiesData = [...this.universitiesData, ...this.hardcodedUniversities.national];
        }

        // Process special universities
        if (specialResponse.status === 'fulfilled' && specialResponse.value.data && Array.isArray(specialResponse.value.data)) {
          const specialUnis = specialResponse.value.data.map(uni => ({
            id: uni.university_code,
            university_Arabic_Name: uni.university_name,
            university_Logo: uni.university_logo || '/images/default-university.png',
            type: 'special'
          }));
          this.universitiesData = [...this.universitiesData, ...specialUnis];
        } else {
          this.universitiesData = [...this.universitiesData, ...this.hardcodedUniversities.special];
        }

        // Process international universities
        if (internationalResponse.status === 'fulfilled' && internationalResponse.value.data && Array.isArray(internationalResponse.value.data)) {
          const internationalUnis = internationalResponse.value.data.map(uni => ({
            id: uni.university_code,
            university_Arabic_Name: uni.university_name,
            university_Logo: uni.university_logo || '/images/default-university.png',
            type: 'international'
          }));
          this.universitiesData = [...this.universitiesData, ...internationalUnis];
        } else {
          this.universitiesData = [...this.universitiesData, ...this.hardcodedUniversities.international];
        }

        this.filteredUniversities = this.universitiesData;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching universities:', error);
        // Use hardcoded data as fallback
        this.universitiesData = [
          ...this.hardcodedUniversities.private,
          ...this.hardcodedUniversities.national,
          ...this.hardcodedUniversities.special,
          ...this.hardcodedUniversities.international
        ];
        this.filteredUniversities = this.universitiesData;
        this.loading = false;
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
    addFaculty() {
      this.formData.faculties.push({
        faculty: '',
        section: '',
        programs: '',
        feesNatives: '',
        feesEgyption: '',
        thanwyaa_secondYear_score: '',
        thanwyaa_firstYear_score: '',
        azhar_secondYear_score: '',
        azhar_firstYear_score: '',
        Arabenglish_secondYear_score: '',
        Arabenglish_firstYear_score: '',
        wafdeen_score: ''
      });
    },
    removeFaculty(index) {
      this.formData.faculties.splice(index, 1);
    },
    addDorm() {
      this.formData.dorms.push({
        name: '',
        description: '',
        price: '',
        location: ''
      });
    },
    removeDorm(index) {
      this.formData.dorms.splice(index, 1);
    },
    addTransportation() {
      this.formData.transportation.push({
        name: '',
        description: '',
        price: '',
        route: ''
      });
    },
    removeTransportation(index) {
      this.formData.transportation.splice(index, 1);
    },
    editUniversity(university) {
      this.isEditing = true;
      this.editingId = university.id;
      this.formData = {
        ...this.formData,
        ...university,
        faculties: university.faculties || [],
        dorms: university.dorms || [],
        transportation: university.transportation || []
      };
      this.activeTab = 'add';
    },
    async addUniversity() {
      try {
        let endpoint;
        switch (this.formData.type) {
          case 'national':
            endpoint = 'https://nuft-website-backend.vercel.app/nationallinks/add_nationallinks';
            break;
          case 'private':
            endpoint = 'https://nuft-website-backend.vercel.app/privatelinks/add_privatelinks';
            break;
          case 'special':
            endpoint = 'https://nuft-website-backend.vercel.app/speciallinks/add_speciallinks';
            break;
          case 'international':
            endpoint = 'https://nuft-website-backend.vercel.app/internationallinks/add_internationallinks';
            break;
        }

        // Add university info and links
        await axios.post(endpoint, {
          ...this.formData,
          university_code: this.formData.university_code.toUpperCase() // Ensure uppercase
        });

        // Add faculties
        if (this.formData.faculties && this.formData.faculties.length > 0) {
          const facultyEndpoint = this.formData.type === 'national' 
            ? 'https://nuft-website-backend.vercel.app/nationalfaculty/addnational'
            : this.formData.type === 'private'
            ? 'https://nuft-website-backend.vercel.app/privatefaculty/addprivate'
            : this.formData.type === 'special'
            ? 'https://nuft-website-backend.vercel.app/specialfaculty/addspecial'
            : 'https://nuft-website-backend.vercel.app/internationalfaculty/addinternational';

          for (const faculty of this.formData.faculties) {
            await axios.post(facultyEndpoint, {
              ...faculty,
              university: this.formData.university_Arabic_Name,
              university_code: this.formData.university_code.toUpperCase()
            });
          }
        }

        // Add dorms
        if (this.formData.dorms && this.formData.dorms.length > 0) {
          const dormEndpoint = this.formData.type === 'national'
            ? 'https://nuft-website-backend.vercel.app/nationaldorms/addnationaldorms'
            : this.formData.type === 'private'
            ? 'https://nuft-website-backend.vercel.app/privatedorms/addprivatedorms'
            : this.formData.type === 'special'
            ? 'https://nuft-website-backend.vercel.app/specialdorms/addspecialdorms'
            : 'https://nuft-website-backend.vercel.app/internationaldorms/addinternationaldorms';

          for (const dorm of this.formData.dorms) {
            await axios.post(dormEndpoint, {
              ...dorm,
              spec: this.formData.university_Arabic_Name,
              university_code: this.formData.university_code.toUpperCase()
            });
          }
        }

        // Add transportation
        if (this.formData.transportation && this.formData.transportation.length > 0) {
          const transEndpoint = this.formData.type === 'national'
            ? 'https://nuft-website-backend.vercel.app/nationaltrans/addnationaltrans'
            : this.formData.type === 'private'
            ? 'https://nuft-website-backend.vercel.app/privatetrans/addprivatetrans'
            : this.formData.type === 'special'
            ? 'https://nuft-website-backend.vercel.app/specialtrans/addspecialtrans'
            : 'https://nuft-website-backend.vercel.app/internationaltrans/addinternationaltrans';

          for (const trans of this.formData.transportation) {
            await axios.post(transEndpoint, {
              ...trans,
              spec: this.formData.university_Arabic_Name,
              university_code: this.formData.university_code.toUpperCase()
            });
          }
        }

        // Add admission status
        const admissionEndpoint = this.formData.type === 'national'
          ? 'https://nuft-website-backend.vercel.app/nationaladmission/add'
          : this.formData.type === 'private'
          ? 'https://nuft-website-backend.vercel.app/privateadmission/add'
          : this.formData.type === 'special'
          ? 'https://nuft-website-backend.vercel.app/specialadmission/add'
          : 'https://nuft-website-backend.vercel.app/internationaladmission/add';

        await axios.post(admissionEndpoint, {
          university: this.formData.university_Arabic_Name,
          university_Arabic_Name: this.formData.university_Arabic_Name,
          university_code: this.formData.university_code.toUpperCase(),
          transfer_status: '',
          thanwyaa_firstYear_status: '',
          thanwyaa_secondYear_status: '',
          azhar_firstYear_status: '',
          azhar_secondYear_status: '',
          Arabenglish_firstYear_status: '',
          Arabenglish_secondYear_status: '',
          wafdeen_status: '',
          guide_Url: `/guide/UGRAD/${this.formData.type}/`
        });

        alert('تم إضافة الجامعة بنجاح');
        this.resetForm();
        this.fetchUniversities();
        this.activeTab = 'manage';
      } catch (error) {
        console.error('Error adding university:', error);
        alert('حدث خطأ أثناء إضافة الجامعة');
      }
    },
    async updateUniversity() {
      try {
        let endpoint;
        switch (this.formData.type) {
          case 'national':
            endpoint = `https://nuft-website-backend.vercel.app/nationallinks/update/${this.editingId}`;
            break;
          case 'private':
            endpoint = `https://nuft-website-backend.vercel.app/privatelinks/update/${this.editingId}`;
            break;
          case 'special':
            endpoint = `https://nuft-website-backend.vercel.app/speciallinks/update/${this.editingId}`;
            break;
          case 'international':
            endpoint = `https://nuft-website-backend.vercel.app/internationallinks/update/${this.editingId}`;
            break;
        }

        // Update university info and links
        await axios.put(endpoint, {
          ...this.formData,
          university_code: this.formData.university_code.toUpperCase()
        });

        // Update faculties
        if (this.formData.faculties && this.formData.faculties.length > 0) {
          const facultyEndpoint = this.formData.type === 'national' 
            ? `https://nuft-website-backend.vercel.app/nationalfaculty/update/${this.editingId}`
            : this.formData.type === 'private'
            ? `https://nuft-website-backend.vercel.app/privatefaculty/update/${this.editingId}`
            : this.formData.type === 'special'
            ? `https://nuft-website-backend.vercel.app/specialfaculty/update/${this.editingId}`
            : `https://nuft-website-backend.vercel.app/internationalfaculty/update/${this.editingId}`;

          for (const faculty of this.formData.faculties) {
            await axios.put(facultyEndpoint, {
              ...faculty,
              university: this.formData.university_Arabic_Name,
              university_code: this.formData.university_code.toUpperCase()
            });
          }
        }

        // Update dorms
        if (this.formData.dorms && this.formData.dorms.length > 0) {
          const dormEndpoint = this.formData.type === 'national'
            ? `https://nuft-website-backend.vercel.app/nationaldorms/update/${this.editingId}`
            : this.formData.type === 'private'
            ? `https://nuft-website-backend.vercel.app/privatedorms/update/${this.editingId}`
            : this.formData.type === 'special'
            ? `https://nuft-website-backend.vercel.app/specialdorms/update/${this.editingId}`
            : `https://nuft-website-backend.vercel.app/internationaldorms/update/${this.editingId}`;

          for (const dorm of this.formData.dorms) {
            await axios.put(dormEndpoint, {
              ...dorm,
              spec: this.formData.university_Arabic_Name,
              university_code: this.formData.university_code.toUpperCase()
            });
          }
        }

        // Update transportation
        if (this.formData.transportation && this.formData.transportation.length > 0) {
          const transEndpoint = this.formData.type === 'national'
            ? `https://nuft-website-backend.vercel.app/nationaltrans/update/${this.editingId}`
            : this.formData.type === 'private'
            ? `https://nuft-website-backend.vercel.app/privatetrans/update/${this.editingId}`
            : this.formData.type === 'special'
            ? `https://nuft-website-backend.vercel.app/specialtrans/update/${this.editingId}`
            : `https://nuft-website-backend.vercel.app/internationaltrans/update/${this.editingId}`;

          for (const trans of this.formData.transportation) {
            await axios.put(transEndpoint, {
              ...trans,
              spec: this.formData.university_Arabic_Name,
              university_code: this.formData.university_code.toUpperCase()
            });
          }
        }

        // Update admission status
        const admissionEndpoint = this.formData.type === 'national'
          ? `https://nuft-website-backend.vercel.app/nationaladmission/update/${this.editingId}`
          : this.formData.type === 'private'
          ? `https://nuft-website-backend.vercel.app/privateadmission/update/${this.editingId}`
          : this.formData.type === 'special'
          ? `https://nuft-website-backend.vercel.app/specialadmission/update/${this.editingId}`
          : `https://nuft-website-backend.vercel.app/internationaladmission/update/${this.editingId}`;

        await axios.put(admissionEndpoint, {
          university: this.formData.university_Arabic_Name,
          university_Arabic_Name: this.formData.university_Arabic_Name,
          university_code: this.formData.university_code.toUpperCase(),
          transfer_status: '',
          thanwyaa_firstYear_status: '',
          thanwyaa_secondYear_status: '',
          azhar_firstYear_status: '',
          azhar_secondYear_status: '',
          Arabenglish_firstYear_status: '',
          Arabenglish_secondYear_status: '',
          wafdeen_status: '',
          guide_Url: `/guide/UGRAD/${this.formData.type}/`
        });

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
        let endpoint;
        switch (university.type) {
          case 'national':
            endpoint = `https://nuft-website-backend.vercel.app/nationallinks/delete/${id}`;
            break;
          case 'private':
            endpoint = `https://nuft-website-backend.vercel.app/privatelinks/delete/${id}`;
            break;
          case 'special':
            endpoint = `https://nuft-website-backend.vercel.app/speciallinks/delete/${id}`;
            break;
          case 'international':
            endpoint = `https://nuft-website-backend.vercel.app/internationallinks/delete/${id}`;
            break;
        }

        await axios.delete(endpoint);
        alert('تم حذف الجامعة بنجاح');
        this.fetchUniversities();
      } catch (error) {
        console.error('Error deleting university:', error);
        alert('حدث خطأ أثناء حذف الجامعة');
      }
    },
    confirmDelete(id) {
      if (confirm('هل أنت متأكد من حذف هذه الجامعة؟')) {
        this.deleteUniversity(id);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editingId = null;
      this.resetForm();
      this.activeTab = 'manage';
    },
    resetForm() {
      this.formData = {
        university_code: '', // Added university short name
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
    }
  },
  created() {
    this.fetchUniversities();
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
  font-size: 1.1rem;
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
</style> 