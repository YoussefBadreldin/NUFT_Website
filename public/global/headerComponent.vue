<template>
  <div>
    <head>
      <!-- Meta and CSS Preload Links -->
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NUFT</title>

      <!-- Favicon and Touch Icons -->
      <link rel="apple-touch-icon" sizes="180x180" href="/images/Fav/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/images/Fav/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/images/Fav/favicon-16x16.png">
      <link rel="manifest" href="/images/Fav/site.webmanifest">
      <link rel="mask-icon" href="/images/Fav/safari-pinned-tab.svg" color="#5bbad5">
      <meta name="msapplication-TileColor" content="#da532c">
      <meta name="theme-color" content="#ffffff">

      <!-- SEO Meta Tags -->
      <meta name="description" content="Your website description here">
      <meta name="keywords" content="keyword1, keyword2, keyword3">

      <!-- Open Graph Meta Tags for Social Sharing -->
      <meta property="og:title" content="NUFT">
      <meta property="og:description" content="Your website description here">
      <meta property="og:image" content="URL to image">
      <meta property="og:url" content="URL to website">
      <meta property="og:type" content="website">

      <!-- Twitter Card Meta Tags -->
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="NUFT">
      <meta name="twitter:description" content="Your website description here">
      <meta name="twitter:image" content="URL to image">

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
    <div class="header-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-7 col-md-12 left-item">
            <ul></ul>
          </div>
            <ul>
             <li><a><strong>بث تجريبي</strong></a></li>
            </ul>
        </div>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/Home">
            <img src="../../images/logo.png" alt="Logo" class="d-inline-block align-top" />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
          <li class="nav-item" v-if="!name">
            <a class="nav-link signup-button" href="/user">تسجيل الدخول</a>
          </li>
          <li class="nav-item" v-if="name">
            <button class="btn btn-primary btn-sm" @click="logout">تسجيل الخروج</button>
          </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Contact">تواصل معنا</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/News">الأخبار</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Calculator">معادلة الشهادات</a>
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
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('name');
      this.name = '';
    },
  },
  created() {
    this.name = localStorage.getItem('name');
  },
};
</script>

<style scoped>
  body {
    direction: rtl;
  }
  .navbar-nav {
    flex-direction: row-reverse;
  }
.navbar {
  background-color: #001d3d !important;
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
    .navbar-nav {
      flex-direction: column-reverse;
    }
    .header-top {
  margin-top: -10px;
  margin-bottom: -20px;
}
  }
</style>
