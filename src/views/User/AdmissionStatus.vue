<template>
    <div>
        <HeaderComponent />

        <div class="container" dir="rtl">
            <div class="page-header">
                <h2>حالة التقديمات</h2>
            </div>

            <div class="status-tabs">
                <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    :class="['type-tab', { active: activeTab === tab.id }]"
                    @click="activeTab = tab.id"
                >
                    {{ tab.name }}
                </button>
            </div>

            <!-- Search Input -->
            <div class="search-container">
                <input 
                    type="text" 
                    v-model="searchQuery" 
                    :placeholder="'ابحث عن ' + getCurrentTabName()"
                    class="search-input"
                >
                <i class="fas fa-search search-icon"></i>
            </div>

            <div class="universities-grid" v-if="!isLoading">
                <template v-if="activeTab === 'all' || activeTab === 'private'">
                    <div v-if="filteredUniversities.filter(uni => uni.type === 'private').length" class="university-section">
                        <h2 class="section-title">الجامعات الخاصة</h2>
                        <div v-for="(pair, index) in filteredPairedUniversities.filter(pair => pair[0].type === 'private')" :key="index" class="university-pair-card">
                            <div class="pair-header">
                                <h3>
                                    <a :href="`/guide/${pair[0].type}/${pair[0].university}`" target="_blank" class="university-link">
                                        {{ pair[0].university_Arabic_Name }}
                                    </a>
                                </h3>
                                <button class="toggle-btn" @click="toggleSection('private-' + index)">
                                    <i class="fas" :class="isSectionOpen('private-' + index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                    {{ isSectionOpen('private-' + index) ? 'إغلاق' : 'فتح' }}
                                </button>
                            </div>
                            
                            <div class="status-container" v-show="isSectionOpen('private-' + index)">
                                <div class="status-section">
                                    <div class="status-item">
                                        <span class="status-label">التحويل</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].transfer_status)">
                                                {{ pair[0].transfer_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.transfer_status)">
                                                آخر موعد: {{ pair[0].deadline.transfer_status }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية العامة وستيم والنيل</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_firstYear_status)">
                                                    {{ pair[0].thanwyaa_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_secondYear_status)">
                                                    {{ pair[0].thanwyaa_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية الأزهرية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_firstYear_status)">
                                                    {{ pair[0].azhar_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_secondYear_status)">
                                                    {{ pair[0].azhar_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الشهادات العربية والإجنبية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_firstYear_status)">
                                                    {{ pair[0].Arabenglish_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_secondYear_status)">
                                                    {{ pair[0].Arabenglish_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الوافدين</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].wafdeen_status)">
                                                {{ pair[0].wafdeen_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.wafdeen_status)">
                                                آخر موعد: {{ pair[0].deadline.wafdeen_status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="activeTab === 'all' || activeTab === 'national'">
                    <div v-if="filteredUniversities.filter(uni => uni.type === 'national').length" class="university-section">
                        <h2 class="section-title">الجامعات الأهلية</h2>
                        <div v-for="(pair, index) in filteredPairedUniversities.filter(pair => pair[0].type === 'national')" :key="index" class="university-pair-card">
                            <div class="pair-header">
                                <h3>
                                    <a :href="`/guide/${pair[0].type}/${pair[0].university}`" target="_blank" class="university-link">
                                        {{ pair[0].university_Arabic_Name }}
                                    </a>
                                </h3>
                                <button class="toggle-btn" @click="toggleSection('national-' + index)">
                                    <i class="fas" :class="isSectionOpen('national-' + index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                    {{ isSectionOpen('national-' + index) ? 'إغلاق' : 'فتح' }}
                                </button>
                            </div>
                            
                            <div class="status-container" v-show="isSectionOpen('national-' + index)">
                                <div class="status-section">
                                    <div class="status-item">
                                        <span class="status-label">التحويل</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].transfer_status)">
                                                {{ pair[0].transfer_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.transfer_status)">
                                                آخر موعد: {{ pair[0].deadline.transfer_status }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية العامة وستيم والنيل</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_firstYear_status)">
                                                    {{ pair[0].thanwyaa_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_secondYear_status)">
                                                    {{ pair[0].thanwyaa_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية الأزهرية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_firstYear_status)">
                                                    {{ pair[0].azhar_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_secondYear_status)">
                                                    {{ pair[0].azhar_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الشهادات العربية والإجنبية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_firstYear_status)">
                                                    {{ pair[0].Arabenglish_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_secondYear_status)">
                                                    {{ pair[0].Arabenglish_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الوافدين</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].wafdeen_status)">
                                                {{ pair[0].wafdeen_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.wafdeen_status)">
                                                آخر موعد: {{ pair[0].deadline.wafdeen_status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="activeTab === 'all' || activeTab === 'special'">
                    <div v-if="filteredUniversities.filter(uni => uni.type === 'special').length" class="university-section">
                        <h2 class="section-title">الجامعات ذات طبيعة خاصة</h2>
                        <div v-for="(pair, index) in filteredPairedUniversities.filter(pair => pair[0].type === 'special')" :key="index" class="university-pair-card">
                            <div class="pair-header">
                                <h3>
                                    <a :href="`/guide/${pair[0].type}/${pair[0].university}`" target="_blank" class="university-link">
                                        {{ pair[0].university_Arabic_Name }}
                                    </a>
                                </h3>
                                <button class="toggle-btn" @click="toggleSection('special-' + index)">
                                    <i class="fas" :class="isSectionOpen('special-' + index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                    {{ isSectionOpen('special-' + index) ? 'إغلاق' : 'فتح' }}
                                </button>
                            </div>
                            
                            <div class="status-container" v-show="isSectionOpen('special-' + index)">
                                <div class="status-section">
                                    <div class="status-item">
                                        <span class="status-label">التحويل</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].transfer_status)">
                                                {{ pair[0].transfer_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.transfer_status)">
                                                آخر موعد: {{ pair[0].deadline.transfer_status }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية العامة وستيم والنيل</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_firstYear_status)">
                                                    {{ pair[0].thanwyaa_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_secondYear_status)">
                                                    {{ pair[0].thanwyaa_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية الأزهرية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_firstYear_status)">
                                                    {{ pair[0].azhar_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_secondYear_status)">
                                                    {{ pair[0].azhar_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الشهادات العربية والإجنبية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_firstYear_status)">
                                                    {{ pair[0].Arabenglish_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_secondYear_status)">
                                                    {{ pair[0].Arabenglish_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الوافدين</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].wafdeen_status)">
                                                {{ pair[0].wafdeen_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.wafdeen_status)">
                                                آخر موعد: {{ pair[0].deadline.wafdeen_status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template v-if="activeTab === 'all' || activeTab === 'international'">
                    <div v-if="filteredUniversities.filter(uni => uni.type === 'international').length" class="university-section">
                        <h2 class="section-title">الجامعات الدولية</h2>
                        <div v-for="(pair, index) in filteredPairedUniversities.filter(pair => pair[0].type === 'international')" :key="index" class="university-pair-card">
                            <div class="pair-header">
                                <h3>
                                    <a :href="`/guide/${pair[0].type}/${pair[0].university}`" target="_blank" class="university-link">
                                        {{ pair[0].university_Arabic_Name }}
                                    </a>
                                </h3>
                                <button class="toggle-btn" @click="toggleSection('international-' + index)">
                                    <i class="fas" :class="isSectionOpen('international-' + index) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                                    {{ isSectionOpen('international-' + index) ? 'إغلاق' : 'فتح' }}
                                </button>
                            </div>
                            
                            <div class="status-container" v-show="isSectionOpen('international-' + index)">
                                <div class="status-section">
                                    <div class="status-item">
                                        <span class="status-label">التحويل</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].transfer_status)">
                                                {{ pair[0].transfer_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.transfer_status)">
                                                آخر موعد: {{ pair[0].deadline.transfer_status }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية العامة وستيم والنيل</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_firstYear_status)">
                                                    {{ pair[0].thanwyaa_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].thanwyaa_secondYear_status)">
                                                    {{ pair[0].thanwyaa_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.thanwyaa_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.thanwyaa_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الثانوية الأزهرية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_firstYear_status)">
                                                    {{ pair[0].azhar_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].azhar_secondYear_status)">
                                                    {{ pair[0].azhar_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.azhar_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.azhar_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الشهادات العربية والإجنبية</span>
                                        <div class="status-values">
                                            <div class="year-column">
                                                <span class="year-label">{{ firstYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_firstYear_status)">
                                                    {{ pair[0].Arabenglish_firstYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_firstYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_firstYear_status }}
                                                </span>
                                            </div>
                                            <div class="year-column">
                                                <span class="year-label">{{ secondYear }}</span>
                                                <span class="status-value" :class="getStatusClass(pair[0].Arabenglish_secondYear_status)">
                                                    {{ pair[0].Arabenglish_secondYear_status }}
                                                </span>
                                                <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.Arabenglish_secondYear_status)">
                                                    آخر موعد: {{ pair[0].deadline.Arabenglish_secondYear_status }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="status-item">
                                        <span class="status-label">الوافدين</span>
                                        <div class="status-values single-column">
                                            <span class="status-value" :class="getStatusClass(pair[0].wafdeen_status)">
                                                {{ pair[0].wafdeen_status }}
                                            </span>
                                            <span v-if="pair[0].deadline" class="status-value deadline" :class="getStatusClass(pair[0].deadline.wafdeen_status)">
                                                آخر موعد: {{ pair[0].deadline.wafdeen_status }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div v-else class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">جاري التحميل...</p>
            </div>

            <!-- No Results Message -->
            <div v-if="!isLoading && !hasResults" class="no-results">
                <p>لا توجد نتائج للبحث</p>
            </div>

            <p class="update-notice">يتم تحديث حالة تقديم الجامعات بشكل دوري●</p>
        </div>

        <FooterComponent />
        <smartAssistantComponent />
    </div>
</template>

<script>
import axios from 'axios';
import HeaderComponent from '../../../public/global/headerComponent.vue';
import FooterComponent from '../../../public/global/footerComponent.vue';
import smartAssistantComponent from '../../../public/global/smartAssistantComponent.vue';

export default {
    name: "AdmissionStatus",
    components: {
        HeaderComponent,
        FooterComponent,
        smartAssistantComponent
    },
    data() {
        return {
            activeTab: 'all',
            firstYear: '',
            secondYear: '',
            universities: [],
            all_data: [],
            isLoading: false,
            openSection: null,
            searchQuery: '',
            tabs: [
                { id: 'all', name: 'الكل' },
                { id: 'national', name: 'الجامعات الأهلية' },
                { id: 'private', name: 'الجامعات الخاصة' },
                { id: 'special', name: 'الجامعات ذات طبيعة خاصة' },
                { id: 'international', name: 'الجامعات الأجنبية' }
            ]
        }
    },
    computed: {
        filteredUniversities() {
            let filtered = this.universities;
            
            // Filter by search query
            if (this.searchQuery) {
                filtered = filtered.filter(uni => 
                    uni.university_Arabic_Name.toLowerCase().includes(this.searchQuery.toLowerCase())
                );
            }

            // Filter by tab if not 'all'
            if (this.activeTab !== 'all') {
                filtered = filtered.filter(uni => uni.type === this.activeTab);
            }

            return filtered;
        },
        filteredPairedUniversities() {
            // Group universities by their university field
            const groupedUniversities = {};
            this.filteredUniversities.forEach(uni => {
                if (!groupedUniversities[uni.university]) {
                    groupedUniversities[uni.university] = {
                        current: null,
                        deadline: null
                    };
                }
                
                // If it's the main university entry (contains the name)
                if (uni.university_Arabic_Name !== 'اخر موعد للتقديم') {
                    groupedUniversities[uni.university].current = uni;
                } else {
                    // If it's the deadline entry
                    groupedUniversities[uni.university].deadline = uni;
                }
            });

            // Convert grouped data to array format
            return Object.values(groupedUniversities)
                .filter(group => group.current) // Only include if we have current data
                .map(group => [group.current]); // Return as array to maintain compatibility
        },
        hasResults() {
            return this.filteredUniversities.length > 0;
        }
    },
    methods: {
        getCurrentTabName() {
            const currentTab = this.tabs.find(tab => tab.id === this.activeTab);
            return currentTab ? currentTab.name : '';
        },
        getStatusClass(status) {
            if (status.includes('انتهي')) {
                return 'status-ended';
            } else if (status.includes('متاح')) {
                return 'status-available';
            } else if (status.includes('لم يبدأ')) {
                return 'status-not-started';
            }
            return '';
        },
        async getAdmission() {
            this.isLoading = true;
            const endpoints = {
                national: 'https://nuft-website-backend.vercel.app/nationaladmission/get',
                private: 'https://nuft-website-backend.vercel.app/privateadmission/get',
                special: 'https://nuft-website-backend.vercel.app/specialadmission/get',
                international: 'https://nuft-website-backend.vercel.app/internationaladmission/get'
            };

            try {
                // Always fetch all types of universities
                const responses = await Promise.all([
                    axios.get(endpoints.national),
                    axios.get(endpoints.private),
                    axios.get(endpoints.special),
                    axios.get(endpoints.international)
                ]);

                // Process all responses regardless of active tab
                const allUniversities = responses.flatMap((response, index) => {
                    const type = ['national', 'private', 'special', 'international'][index];
                    const universities = response.data;
                    
                    // Group universities by their university field
                    const groupedUniversities = {};
                    universities.forEach(uni => {
                        if (!groupedUniversities[uni.university]) {
                            groupedUniversities[uni.university] = {
                                current: null,
                                deadline: null
                            };
                        }
                        
                        // If it's the main university entry (contains the name)
                        if (uni.university_Arabic_Name !== 'اخر موعد للتقديم') {
                            groupedUniversities[uni.university].current = {
                                ...uni,
                                type
                            };
                        } else {
                            // If it's the deadline entry
                            groupedUniversities[uni.university].deadline = uni;
                        }
                    });

                    // Convert grouped data to array format
                    return Object.values(groupedUniversities)
                        .filter(group => group.current) // Only include if we have current data
                        .map(group => ({
                            ...group.current,
                            deadline: group.deadline
                        }));
                });

                // Filter based on active tab if not 'all'
                this.universities = this.activeTab === 'all' 
                    ? allUniversities 
                    : allUniversities.filter(uni => uni.type === this.activeTab);

            } catch (error) {
                console.error('Error fetching admission data:', error);
            } finally {
                this.isLoading = false;
            }
        },
        async getYears() {
            const endpoints = {
                national: 'https://nuft-website-backend.vercel.app/nationallinks/get_nationallinks',
                private: 'https://nuft-website-backend.vercel.app/privatelinks/get_privatelinks',
                special: 'https://nuft-website-backend.vercel.app/speciallinks/get_speciallinks',
                international: 'https://nuft-website-backend.vercel.app/internationallinks/get_internationallinks'
            };

            try {
                if (this.activeTab === 'all') {
                    // Get years from national universities as default
                    const response = await axios.get(endpoints.national);
                    this.all_data = response.data;
                } else {
                    const response = await axios.get(endpoints[this.activeTab]);
                    this.all_data = response.data;
                }
                
                if (this.all_data.length > 0) {
                    this.firstYear = this.all_data[0].first_year;
                    this.secondYear = this.all_data[0].second_year;
                }
            } catch (error) {
                console.error('Error fetching years:', error);
            }
        },
        toggleSection(sectionId) {
            if (this.openSection === sectionId) {
                this.openSection = null;
            } else {
                this.openSection = sectionId;
            }
        },
        isSectionOpen(sectionId) {
            return this.openSection === sectionId;
        }
    },
    watch: {
        activeTab() {
            this.getAdmission();
            this.getYears();
        }
    },
    created() {
        this.getAdmission();
        this.getYears();
    }
};
</script>

<style scoped>
.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Cairo', sans-serif;
}

.page-header {
    text-align: center;
    margin-bottom: 2rem;
}

.page-header h2 {
    color: #1a237e;
    font-size: 2rem;
    margin: 0;
    font-weight: 700;
}

.status-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
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
    font-family: 'Cairo', sans-serif;
}

.type-tab:hover {
    background: #e8eaf6;
}

.type-tab.active {
    background: #1a237e;
    color: white;
}

.universities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.university-section {
    margin-bottom: 3rem;
    grid-column: 1 / -1;
}

.section-title {
    color: #1a237e;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    border-bottom: 2px solid #1a237e;
    padding-bottom: 0.5rem;
    font-weight: 700;
}

.university-pair-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 2rem;
}

.pair-header {
    background-color: #1a237e;
    padding: 1rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pair-header h3 {
    margin: 0;
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    flex: 1;
}

.university-link {
    color: white;
    text-decoration: none;
    transition: color 0.2s ease;
}

.university-link:hover {
    color: #e8eaf6;
}

.toggle-btn {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    margin-right: 1rem;
}

.toggle-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.toggle-btn i {
    transition: transform 0.3s ease;
}

.status-container {
    padding: 1.5rem;
    transition: all 0.3s ease;
    overflow: hidden;
}

.status-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.status-item {
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
}

.status-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.status-label {
    display: block;
    font-weight: bold;
    color: #1a237e;
    margin-bottom: 0.75rem;
    font-size: 1rem;
}

.status-values {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.year-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.year-label {
    font-weight: bold;
    color: #1a237e;
    text-align: center;
    padding: 0.25rem;
    border-radius: 4px;
}

.status-value {
    padding: 0.5rem;
    border-radius: 8px;
    font-size: 0.9rem;
    text-align: center;
}

.status-ended {
    background-color: #ffebee;
    color: #c62828;
}

.status-available {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.status-not-started {
    background-color: #e8eaf6;
    color: #1a237e;
}

.status-value.deadline {
    color: #e65100;
    font-size: 0.85rem;
    margin-top: 0.25rem;
}

.status-value.deadline.status-ended {
    color: #c62828;
}

.status-value.deadline.status-available {
    color: #2e7d32;
}

.status-value.deadline.status-not-started {
    color: #1a237e;
}

.update-notice {
    text-align: center;
    color: #666;
    font-style: italic;
    margin-top: 2rem;
}

.status-values.single-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
    margin: 0 auto;
}

@media (max-width: 1200px) {
    .universities-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .status-values {
        grid-template-columns: 1fr;
    }
    
    .page-header h2 {
        font-size: 1.5rem;
    }

    .status-tabs {
        gap: 0.5rem;
    }

    .type-tab {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
    }

    .search-container {
        padding: 0 0.5rem;
    }
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 1rem;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #1a237e;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    color: #1a237e;
    font-size: 1.2rem;
    font-weight: 500;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.search-container {
    position: relative;
    max-width: 600px;
    margin: 0 auto 2rem;
    padding: 0 1rem;
}

.search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1rem;
    font-family: 'Cairo', sans-serif;
    transition: all 0.3s ease;
}

.search-icon {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    font-size: 1.2rem;
}

.search-input:focus {
    outline: none;
    border-color: #1a237e;
    box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.1);
}

.search-input::placeholder {
    color: #9e9e9e;
}

.no-results {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
}
</style>