<template>
  <div class="pdf-container">
    <div ref="pdfViewer" class="pdf-viewer"></div>
    <div v-if="error" class="error-message">Unable to load the PDF. Please check the file path or the PDF itself.</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const pdfViewer = ref(null);
    const error = ref(false);
    const pdfUrl = '/images/guide2023-2024.pdf';

    onMounted(() => {
      if (!pdfViewer.value) return;

      // Load PDF.js
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise.then(
          pdf => {
            pdf.getPage(1).then(page => {
              const viewport = page.getViewport({ scale: 1 });
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              pdfViewer.value.appendChild(canvas);

              const renderContext = {
                canvasContext: context,
                viewport: viewport,
              };
              page.render(renderContext);
            });
          },
          reason => {
            console.error(reason);
            error.value = true;
          }
        );
      };
      document.head.appendChild(script);
    });

    return {
      pdfViewer,
      error
    };
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

.pdf-viewer {
  width: 100%;
  height: 100%;
  overflow: auto;
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
