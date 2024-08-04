<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-6 order-md-1 glink" style="margin-top: 20px;">
          <h2>روابط سريعة</h2>
          <div class="row">
            <div class="col-md-6">
              <ul dir="rtl">
                <li><a href="/AdmissionStatus"><i class="fas fa-angle-double-left"></i>حالة تقديمات الجامعات الاهلية</a></li>
                <li><a href="/AdmissionStatus"><i class="fas fa-angle-double-left"></i>حالة تقديمات الجامعات الحكومية</a></li>
                <li><a href="/AdmissionStatus"><i class="fas fa-angle-double-left"></i>حالة تقديمات الجامعات الخاصة</a></li>
                <li><a href="/AdmissionStatus"><i class="fas fa-angle-double-left"></i>حالة تقديمات الجامعات الدولية</a></li>
                <li><a href="/AdmissionStatus"><i class="fas fa-angle-double-left"></i>حالة تقديمات الجامعات التكنولوجية</a></li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul dir="rtl">
                <li><a href="/UniversitiesGuide"><i class="fas fa-angle-double-left"></i>دليل الجامعات الاهلية </a></li>
                <li><a href="/UniversitiesGuide"><i class="fas fa-angle-double-left"></i>دليل الجامعات الحكومية </a></li>
                <li><a href="/UniversitiesGuide"><i class="fas fa-angle-double-left"></i>دليل الجامعات الخاصة</a></li>
                <li><a href="/UniversitiesGuide"><i class="fas fa-angle-double-left"></i>دليل الجامعات الدولية </a></li>
                <li><a href="/UniversitiesGuide"><i class="fas fa-angle-double-left"></i>دليل الجامعات التكنولوجية </a></li>
              </ul>
            </div>
            
          </div>
        </div>
        <div class="col-md-6 order-md-2 about">
          <div class="foot-address">
            <div class="icon">
              <i class="fas fa-envelope-square"></i>
            </div>
            <div class="addet">
              <a href="mailto:info@nufteg.com">info@nufteg.com</a>
            </div>
          </div>
          <div class="foot-address">
            <div class="icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div class="addet">
              <a href="http://wa.me/201285012807">+20 128 5012807</a>
            </div>
          </div>
          <div class="social-icons" style="margin-top: 20px;">
            <a href="https://www.facebook.com/NUFT.EG" target="_blank" style="margin-left: 13px; margin-right: 20px;">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/nuft.eg" target="_blank" style="margin-left: 10px; margin-right: 20px;">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@NUFT.EG" target="_blank" style="margin-left: 10px; margin-right: 20px;">
              <i class="fab fa-tiktok"></i>
            </a>
            <br><br>
            <a href="https://www.linkedin.com/company/nufteg/" target="_blank" style="margin-left: 8px; margin-right: 20px;">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.youtube.com/@nuft_eg" target="_blank" style="margin-left: 8px; margin-right: 20px;">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://t.me/NUFT_EG" target="_blank" style="margin-left: 10px; margin-right: 20px;">
              <i class="fab fa-telegram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div class="copy" style="text-align: center;">
<div class="CopyRights">
  <p><a href="https://pill-network.com" target="_blank" rel="noopener noreferrer">Pill Network</a> ع2024 جميع الحقوق محفوظة | تصميم وتطوير بواسطة©</p>
</div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
footer {
  color: #fff; /* White text */
}

footer a {
  color: #fff; /* White links */
}

footer i {
  color: #fff; /* White icons */
}

footer .icon {
  color: #fff; /* White icons inside .icon class */
}

footer .copy {
  color: #fff; /* White text for copyright section */
}

ul[dir="rtl"] {
  text-align: right;
}

ul[dir="rtl"] i {
  margin-left: 10px; /* Adjust this value to control the space */
  margin-right: 0;
}

</style>
