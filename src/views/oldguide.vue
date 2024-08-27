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
    const pdfjsLib = window.pdfjsLib;
    let pdfDoc = null;
    let pageCache = new Map(); // Cache for pages to avoid re-rendering

    onMounted(() => {
      if (!pdfViewer.value) return;

      // Load PDF.js from CDN
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
      script.onload = () => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        loadingTask.promise.then(
          pdf => {
            pdfDoc = pdf;
            renderVisiblePages();
          },
          reason => {
            console.error(reason);
            error.value = true;
          }
        );

        // Scroll event listener for lazy loading
        const onScroll = () => {
          const viewer = pdfViewer.value;
          const scrollTop = viewer.scrollTop;
          const clientHeight = viewer.clientHeight;
          const scrollHeight = viewer.scrollHeight;

          // Calculate the range of visible pages
          const startPage = Math.floor(scrollTop / clientHeight) + 1;
          const endPage = Math.ceil((scrollTop + clientHeight) / clientHeight);

          // Render visible pages
          for (let i = startPage; i <= endPage; i++) {
            if (!pageCache.has(i)) {
              renderPage(i);
            }
          }
        };

        pdfViewer.value.addEventListener('scroll', onScroll);
      };
      document.head.appendChild(script);
    });

    const renderPage = (pageNumber) => {
      if (!pdfDoc) return;

      pdfDoc.getPage(pageNumber).then(page => {
        const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale for performance
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
          pageCache.set(pageNumber, canvas); // Cache the rendered page
        });
      });
    };

    const renderVisiblePages = () => {
      if (!pdfDoc || !pdfViewer.value) return;

      const viewer = pdfViewer.value;
      const scrollTop = viewer.scrollTop;
      const clientHeight = viewer.clientHeight;

      // Calculate the range of visible pages
      const startPage = Math.floor(scrollTop / clientHeight) + 1;
      const endPage = Math.ceil((scrollTop + clientHeight) / clientHeight);

      // Render visible pages
      for (let i = startPage; i <= endPage; i++) {
        if (!pageCache.has(i)) {
          renderPage(i);
        }
      }
    };

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
