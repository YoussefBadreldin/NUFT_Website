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
    const pdfUrl = '/images/guide2023-2024.pdf'; // Path to your PDF file

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
                const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale for performance
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const devicePixelRatio = window.devicePixelRatio || 1;

                // Set canvas dimensions
                canvas.width = viewport.width * devicePixelRatio;
                canvas.height = viewport.height * devicePixelRatio;
                context.scale(devicePixelRatio, devicePixelRatio);

                // Append canvas to viewer
                canvas.dataset.page = pageNumber; // Store page number for caching
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

            // Render pages on demand
            const renderVisiblePages = () => {
              if (!pdfViewer.value) return;

              const viewer = pdfViewer.value;
              const scrollTop = viewer.scrollTop;
              const clientHeight = viewer.clientHeight;

              // Calculate the range of visible pages
              const startPage = Math.floor(scrollTop / clientHeight) + 1;
              const endPage = Math.ceil((scrollTop + clientHeight) / clientHeight);

              // Render visible pages
              for (let i = startPage; i <= endPage; i++) {
                if (!pdfViewer.value.querySelector(`[data-page="${i}"]`)) {
                  renderPage(i);
                }
              }
            };

            // Initial rendering of visible pages
            renderVisiblePages();

            // Scroll event listener for lazy loading
            const onScroll = () => {
              renderVisiblePages();
            };

            pdfViewer.value.addEventListener('scroll', onScroll);
          },
          reason => {
            console.error('Error loading PDF:', reason);
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
