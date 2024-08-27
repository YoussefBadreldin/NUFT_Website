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
    const pdfUrl = '/images/guide2023-2024.pdf'; // Ensure this URL is correct

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
          pdf => {
            console.log(`PDF loaded successfully: ${pdfUrl}`);
            
            // Render each page
            const renderPage = (pageNumber) => {
              pdf.getPage(pageNumber).then(page => {
                const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale for better quality
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
                }).catch(renderError => {
                  console.error(`Error rendering page ${pageNumber}:`, renderError);
                  error.value = true;
                });
              }).catch(pageError => {
                console.error(`Error fetching page ${pageNumber}:`, pageError);
                error.value = true;
              });
            };

            // Render all pages
            const renderAllPages = () => {
              for (let i = 1; i <= pdf.numPages; i++) {
                renderPage(i);
              }
            };

            renderAllPages();
          },
          reason => {
            console.error('Error loading PDF:', reason);
            error.value = true;
          }
        );
      };
      script.onerror = () => {
        console.error('Failed to load PDF.js script');
        error.value = true;
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
</style>
