<template>
  <div class="pdf-container">
    <iframe
      :src="pdfSrc"
      width="100%"
      height="100%"
      style="border: none;"
      @error="handleError"
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
  position: relative;
}
.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
}
</style>
