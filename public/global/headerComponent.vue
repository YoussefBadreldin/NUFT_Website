<template>
  <div>
  <head>
  <!-- Meta and CSS Preload Links -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NUFT - Your Guide to Egyptian Universities</title>

  <!-- Favicon and Touch Icons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/images/Fav/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/images/Fav/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/images/Fav/favicon-16x16.png">
  <link rel="manifest" href="/images/Fav/site.webmanifest">
  <link rel="mask-icon" href="/images/Fav/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">

  <!-- SEO Meta Tags -->
<meta name="description" content="يقدم NUFT إرشادات شاملة للطلاب الراغبين في الدراسة بالجامعات المصرية، بما في ذلك الجامعات الاهلية، الجامعات الخاصة، والجامعات الدولية. اكتشف فرص المنح الدراسية وحالة التقديمات ودليل الجامعات. تعرف على القبول بالجامعة، التخصصات الجامعية، الرسوم الدراسية، السكن الجامعي، والحياة الجامعية.">
<meta name="keywords" content="الجامعات المصرية، الدراسة في مصر، دليل الجامعات المصرية، الجامعات الاهلية، الجامعات الخاصة، الجامعات الدولية، المنح الدراسية في مصر، التقديمات الطلابية في مصر، ادرس في مصر، تنسيق الجامعات، الحد الادني للجامعات، وزارة التعليم العالي والبحث العلمي، المجلس الاعلي للجامعات، التحويل للجامعات، study in Egypt wafdeen، وافدين، الثانوية العامة، الذكاء الاصطناعي، نتيجة الثانوية العامة، حاسبات ومعلومات، طب، دليل الجامعات الاهلية، دليل الجامعات في مصر، دليل الجامعات الخاصة، دليل الجامعات المصرية، جامعة الملك سلمان الدولية، جامعة الجلالة، جامعة العلمين الدولية، الجامعات الاهلية المنبثقة، جامعة المنصورة الجديدة، جامعة النيل الاهلية، جامعة مصر للمعلوماتية، Edugate، noureldin for universities، سفير الجامعات، Safiruni، EDUHUB، طالب، جامعة الابتكار، جامعة السويدي للتكنولوجيا، الجامعة، القبول بالجامعة، التخصصات الجامعية، الرسوم الدراسية، السكن الجامعي، المنح الدراسية، الحياة الجامعية، فرص العمل بعد التخرج، أفضل جامعة في [city]، جامعات [city]، دراسة في [city]، تخصص [program]، جامعة تقدم تخصص [program]، أفضل جامعة لـ [program]، كلية الطب، كلية الهندسة، كلية الحقوق، الدراسات العليا، التعليم عن بعد، رسوم الدراسة بكلية الطب جامعة القاهرة، أفضل تخصصات الهندسة في مصر">

<!-- Open Graph Meta Tags for Social Sharing -->
<meta property="og:title" content="NUFT - دليلك إلى الجامعات المصرية">
<meta property="og:description" content="اكتشف مستقبلك في الجامعات المصرية مع NUFT. احصل على معلومات حول الجامعات الاهلية، الجامعات الخاصة، الجامعات الدولية، المنح الدراسية، والتقديمات والمزيد. تعرف على القبول بالجامعة، التخصصات الجامعية، الرسوم الدراسية، السكن الجامعي، والحياة الجامعية.">
<meta property="og:image" content="https://nufteg.com/images/og-image.jpg"> <!-- Ensure this is the correct image path -->
<meta property="og:url" content="https://nufteg.com">
<meta property="og:type" content="website">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="NUFT - دليلك إلى الجامعات المصرية">
<meta name="twitter:description" content="اكتشف الجامعات المصرية مع NUFT. دليلك الكامل للجامعات الاهلية، الجامعات الخاصة، الجامعات الدولية، المنح الدراسية، التقديمات، والحياة الجامعية. تعرف على القبول بالجامعة، التخصصات الجامعية، الرسوم الدراسية، السكن الجامعي، وفرص العمل بعد التخرج.">
<meta name="twitter:image" content="https://nufteg.com/images/twitter-card.jpg"> <!-- Ensure this is the correct image path -->

  <!-- CSS Preloading for Critical CSS -->
  <link rel="preload" href="/css/bootstrap.min.css" as="style">
  <link rel="preload" href="/css/fontawsom-all.min.css" as="style">
  <link rel="preload" href="/plugins/slider/css/owl.carousel.min.css" as="style">
  <link rel="preload" href="/plugins/slider/css/owl.theme.default.css" as="style">
  <link rel="preload" href="/css/style.css" as="style">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/fontawsom-all.min.css">
  <link rel="stylesheet" href="/plugins/slider/css/owl.carousel.min.css">
  <link rel="stylesheet" href="/plugins/slider/css/owl.theme.default.css">
  <link rel="stylesheet" href="/css/style.css">
</head>


    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/Home">
        <img src="/images/logo.png" alt="شعار NUFT - دليلك إلى الجامعات المصرية" class="d-inline-block align-top" />
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!name">
            <a class="nav-link signup-button" href="/Login">تسجيل الدخول</a>
          </li>
          <li class="nav-item dropdown" v-if="name">
            <div class="account-dropdown">
              <button class="account-btn" @click="handleAccountClick">
                <i class="fas fa-user-circle"></i>
              </button>
              <div class="dropdown-menu" v-show="isDropdownOpen">
                <a v-if="isAdmin" href="/admin" class="dropdown-item">
                  <i class="fas fa-cog"></i>
                  لوحة التحكم
                </a>
                <a v-else href="/account" class="dropdown-item">
                  <i class="fas fa-user"></i>
                  حسابي
                </a>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item" @click="logout">
                  <i class="fas fa-sign-out-alt"></i>
                  تسجيل الخروج
                </a>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/join-us">انضم إلينا</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Contact">تواصل معنا</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/News">الأخبار</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/articles">المقالات</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Equivalency">معادلة الشهادات</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Scholarships">المنح</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Status">حالة التقديمات</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Guide">دليل الجامعات</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Home">الرئيسية</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      name: '',
      isDropdownOpen: false,
      isAdmin: false
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('isAdmin');
      this.name = '';
      this.isAdmin = false;
      this.isDropdownOpen = false;
      this.$router.push('/Login');
    },
    handleAccountClick() {
      if (this.isAdmin) {
        this.$router.push('/admin');
      } else {
        this.$router.push('/account');
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown(event) {
      if (!event.target.closest('.account-dropdown')) {
        this.isDropdownOpen = false;
      }
    }
  },
  created() {
    this.name = localStorage.getItem('name');
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    document.addEventListener('click', this.closeDropdown);

    // Redirect if trying to access login while logged in
    if (this.name && this.$route.path === '/Login') {
      if (this.isAdmin) {
        this.$router.push('/admin');
      } else {
        this.$router.push('/account');
      }
    }
  },
  watch: {
    '$route'(to) {
      // Prevent access to login page when logged in
      if (to.path === '/Login' && this.name) {
        if (this.isAdmin) {
          this.$router.push('/admin');
        } else {
          this.$router.push('/account');
        }
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style scoped>
  body {
    direction: rtl;
  }
  .navbar {
    background-color: #001d3d !important;
  }

  /* Desktop and larger screens */
  @media (min-width: 992px) {
    .navbar-nav {
      margin-left: 250px;
      flex-direction: row-reverse;
    }

    .navbar-nav .nav-item {
      margin-left: 10px;
    }

    .navbar-brand {
      order: 1;
      margin-right: 0;
      margin-right: 250px;
    }
  }

  /* Mobile view */
  @media (max-width: 991px) {
    .navbar-nav {
      flex-direction: column-reverse;
    }

    .navbar-brand {
      margin-right: 0;
      margin-left: 0;
    }

    .navbar-nav .nav-item {
      margin-left: 0;
    }
  }

  .signup-button, .btn-primary {
    background-color: #ffbf00;
    color: #001d3d !important;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
  }

  .header-top {
    background-color: #C70039;
    padding: 1px 0; /* Reduced top and bottom padding */
    margin-bottom: -15px;
    color: white;
    text-align: center;
  }

  .header-top .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-top .row {
    width: 100%;
  }

  .header-top .left-item,
  .header-top .right-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-top .left-item ul,
  .header-top .right-item ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .header-top .right-item ul {
    justify-content: center;
  }

  .header-top li {
    margin-top: -20px;
    padding: 0; /* Ensure no padding in list items */
  }

  .header-top .right-item a {
    margin: 0; /* Ensure no margin around the link */
    padding: 0; /* Ensure no padding around the link */
    line-height: 1.5; /* Adjust line height if needed */
  }

  @media (max-width: 992px) {
    .header-top {
      margin-top: -10px;
      margin-bottom: -20px;
    }
  }

  .account-dropdown {
    position: relative;
  }

  .account-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  .account-btn:hover {
    color: #ffbf00;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    z-index: 1000;
    margin-top: 0.5rem;
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
    color: #2c3e50;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .dropdown-item:hover {
    background-color: #f8f9fa;
    color: #001d3d;
  }

  .dropdown-divider {
    height: 1px;
    background-color: #dee2e6;
    margin: 0.5rem 0;
  }

  .dropdown-item i {
    width: 20px;
    text-align: center;
  }

  @media (max-width: 991px) {
    .dropdown-menu {
      position: static;
      box-shadow: none;
      border: 1px solid #dee2e6;
      margin-top: 0.5rem;
    }
    
    .account-btn {
      font-size: 1.2rem;
    }
  }
</style>