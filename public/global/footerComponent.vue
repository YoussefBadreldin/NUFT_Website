<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-4 order-md-1 glink" style="margin-top: 20px; text-align: center;">
          <h2>روابط سريعة</h2>
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6 col-6">
                  <ul dir="rtl" style="display: inline-block; text-align: right; margin-left: -40px; margin-right: -60px;">
                    <li><a href="#"><i class="fas fa-angle-double-left"></i> حالة تقديمات الجامعات الخاصة <strong>(قريباً)</strong></a></li>                  
                    <li><a href="#"><i class="fas fa-angle-double-left"></i> دليل الجامعات ذات طبيعة خاصة <strong>(قريباً)</strong></a></li>                          
                    <li><a href="#"><i class="fas fa-angle-double-left"></i> حالة تقديمات الجامعات ذات طبيعة خاصة <strong>(قريباً)</strong></a></li>                    
                    <li><a href="#"><i class="fas fa-angle-double-left"></i> دليل الجامعات الدولية <strong>(قريباً)</strong></a></li>
                    <li><a href="#"><i class="fas fa-angle-double-left"></i> حالة تقديمات الجامعات الدولية <strong>(قريباً)</strong></a></li>
                  </ul>
                </div>
                <div class="col-md-6 col-6">
                 <ul dir="rtl" style="display: inline-block; text-align: right; margin-right: 10px;">
                    <li><a href="/Guide/UGRAD/National/Normal"><i class="fas fa-angle-double-left"></i> دليل الجامعات الأهلية</a></li>
                    <li><a href="/Guide/UGRAD/National/International"><i class="fas fa-angle-double-left"></i> دليل الجامعات الأهلية الدولية</a></li>
                    <li><a href="/Guide/UGRAD/National/Affiliated"><i class="fas fa-angle-double-left"></i> دليل الجامعات الأهلية المنبثقة</a></li>
                    <li><a href="/Status/UGRAD/National"><i class="fas fa-angle-double-left"></i> حالة تقديمات الجامعات الأهلية</a></li>                    
                    <li><a href="#"><i class="fas fa-angle-double-left"></i> دليل الجامعات الخاصة <strong>(قريباً)</strong></a></li>


                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 order-md-2">
          <!-- Empty space -->
        </div>
        <div class="col-md-4 order-md-3 about" style="text-align: center;">
          <div class="foot-address">
            <div class="icon">
              <i class="fas fa-envelope-square"></i>
            </div>
            <div class="addet">
              <a href="mailto:info@nufteg.com">info@nufteg.com</a>
            </div>
            <div class="icon">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div class="addet">
              <a href="http://wa.me/201285012807">+20 128 5012807</a>
            </div>
          </div>
          <div class="social-icons" style="margin-top: 20px; display: flex; justify-content: center;">
            <a href="https://www.facebook.com/NUFT.EG" target="_blank" style="margin: 0 10px;">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/nuft.eg" target="_blank" style="margin: 0 10px;">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@NUFT.EG" target="_blank" style="margin: 0 10px;">
              <i class="fab fa-tiktok"></i>
            </a>
            <a href="https://www.linkedin.com/company/nufteg/" target="_blank" style="margin: 0 10px;">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.youtube.com/@nuft_eg" target="_blank" style="margin: 0 10px;">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://t.me/NUFT_EG" target="_blank" style="margin: 0 10px;">
              <i class="fab fa-telegram"></i>
            </a>
          </div>
          <div class="visitor-counter">
            <p>عدد الزوار: <span id="visitor-count">Loading...</span></p>
          </div>
          <br>
          <br>
          <p>تم اطلاق الموقع يوم 9 أغسطس 2024 </p>
        </div>
      </div>
    </div>
  </footer>
  <div class="copy" style="text-align: center;">
    <div class="CopyRights">
      <p> 2024© جميع الحقوق محفوظة
        <br>
        <a href="https://pill-network.com" target="_blank" rel="noopener noreferrer">Pill Network </a> تصميم وتطوير بواسطة</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
  mounted() {
    this.updateVisitorCount();
  },
methods: {
  async updateVisitorCount() {
    try {
      const response = await fetch('https://nuft-website-backend.vercel.app/api/visitor-count');
      const data = await response.json();
      const formattedCount = data.count.toLocaleString();
      document.getElementById('visitor-count').innerText = formattedCount;
    } catch (error) {
      console.error('Error fetching visitor count:', error);
    }
  }
}
}
</script>

<style scoped>
footer {
  color: #fff;
}

footer a {
  color: #fff;
}

footer i {
  color: #fff;
}

footer .icon {
  color: #fff;
}

footer .copy {
  color: #fff;
}

ul[dir="rtl"] {
  text-align: right;
}

ul[dir="rtl"] i {
  margin-left: 10px;
  margin-right: 0;
}

.social-icons a {
  margin: 0 10px;
}

.foot-address, .social-icons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.foot-address .icon, .foot-address .addet {
  margin: 0 10px;
}

.visitor-counter {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffbf00;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 18px;
  color: #001d3d;
  display: inline-block;
}

.visitor-counter p {
  margin: 0;
}
</style>
