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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
  max-width: 100%;
  max-height: 100%;
  min-width: 320px;
  min-height: 320px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Optional: add a shadow for better visual separation */
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
}
</style>
