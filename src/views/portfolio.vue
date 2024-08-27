<template>
  <div class="pdf-container">
    <div ref="pdfViewer" class="pdf-viewer"></div>
    <div v-if="error" class="error-message">Unable to load the PDF. Please check the file path or the PDF itself.</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'PortfolioView',
  setup() {
    const pdfViewer = ref(null);
    const error = ref(false);
    const pdfUrl = '/images/portfolio.pdf'; // Path to your PDF file

    onMounted(() => {
      if (!pdfViewer.value) return;

      // Load PDF.js from CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        const pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise.then(
          pdf => {
            const renderPage = (pageNumber) => {
              pdf.getPage(pageNumber).then(page => {
                const viewport = page.getViewport({ scale: 2 }); // Adjust scale for better quality
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const devicePixelRatio = window.devicePixelRatio || 1;

                // Set canvas dimensions
                canvas.width = viewport.width * devicePixelRatio;
                canvas.height = viewport.height * devicePixelRatio;
                context.scale(devicePixelRatio, devicePixelRatio);

                // Append canvas to viewer
                pdfViewer.value.appendChild(canvas);

                const renderContext = {
                  canvasContext: context,
                  viewport: viewport,
                };
                page.render(renderContext).promise.then(() => {
                  console.log(`Page ${pageNumber} rendered`);
                });
              });
            };

            // Render all pages
            const renderAllPages = () => {
              for (let i = 1; i <= pdf.numPages; i++) {
                renderPage(i);
              }
            };

            // Render pages with a delay to ensure previous pages are processed
            setTimeout(renderAllPages, 500);
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
  height: 100vh; /* Full height to take up the screen */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to start to allow scrolling */
  position: relative;
  overflow: auto; /* Allow scrolling if content exceeds viewport */
}

.pdf-viewer {
  display: flex;
  flex-direction: column; /* Stack pages vertically */
  width: 100%;
  height: auto;
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
