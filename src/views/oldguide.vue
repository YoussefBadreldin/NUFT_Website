<template>
  <div class="pdf-container">
    <div ref="pdfViewer" class="pdf-viewer"></div>
    <div v-if="error" class="error-message">Unable to load the PDF. Please check the file path or the PDF itself.</div>
    <div v-if="loading" class="loading-message">Loading PDF...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const pdfViewer = ref(null);
    const error = ref(false);
    const loading = ref(true);
    const pdfUrl = '/images/guide2023-2024.pdf'; // Ensure this URL is correct
    let pdf = null;
    const currentPage = ref(1);

    onMounted(() => {
      if (!pdfViewer.value) return;

      // Load PDF.js from CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        const pdfjsLib = window.pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise.then(
          loadedPdf => {
            pdf = loadedPdf;
            console.log(`PDF loaded successfully: ${pdfUrl}`);
            loading.value = false;
            renderPage(currentPage.value); // Render the first page initially
          },
          reason => {
            console.error('Error loading PDF:', reason);
            error.value = true;
            loading.value = false;
          }
        );
      };
      script.onerror = () => {
        console.error('Failed to load PDF.js script');
        error.value = true;
        loading.value = false;
      };
      document.head.appendChild(script);
    });

    const renderPage = (pageNumber) => {
      if (!pdf) return;

      pdf.getPage(pageNumber).then(page => {
        const viewport = page.getViewport({ scale: 1.0 }); // Adjust scale for better fit
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

        // Render the page
        page.render(renderContext).promise.then(() => {
          console.log(`Page ${pageNumber} rendered`);
          // Pre-render the next page if necessary
          if (pageNumber < pdf.numPages) {
            requestAnimationFrame(() => renderPage(pageNumber + 1));
          }
        }).catch(renderError => {
          console.error(`Error rendering page ${pageNumber}:`, renderError);
          error.value = true;
        });
      }).catch(pageError => {
        console.error(`Error fetching page ${pageNumber}:`, pageError);
        error.value = true;
      });
    };

    return {
      pdfViewer,
      error,
      loading,
    };
  },
};
</script>

<style scoped>
.pdf-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to start for scrolling */
  position: relative;
  overflow: auto; /* Allow scrolling */
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
}

.loading-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: blue;
  text-align: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
}
</style>
