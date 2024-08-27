<template>
  <div class="pdf-container">
    <iframe
      :src="pdfSrc"
      class="pdf-iframe"
      @error="handleError"
      allow="fullscreen"
    ></iframe>
    <div v-if="error" class="error-message">Unable to load the PDF. Please check the file path or the PDF itself.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pdfSrc: '/images/guide2023-2024.pdf',
      error: false,
    };
  },
  methods: {
    handleError() {
      this.error = true;
    },
  },
};
</script>

<style scoped>
.pdf-container {
  height: 100vh; /* Full height to take up the screen */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden; /* Prevent scrollbars */
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  max-width: 1000px; /* Limit max width for larger screens */
  max-height: 90vh; /* Ensure iframe doesn't exceed viewport height */
  min-width: 320px; /* Ensure iframe is not too small on small screens */
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8); /* Slight background to improve readability */
  border-radius: 5px; /* Optional: add rounded corners for better look */
}
</style>
