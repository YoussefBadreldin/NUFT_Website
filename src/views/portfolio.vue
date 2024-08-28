<template>
  <div class="pdf-container" ref="pdfContainer">
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
    const pdfContainer = ref(null);
    const pdfDocument = ref(null);
    const loadedPages = ref(new Set()); // Keep track of loaded pages

    onMounted(() => {
      if (!pdfViewer.value) return;

      const loadPDF = async () => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
        script.onload = () => {
          const pdfjsLib = window.pdfjsLib;
          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

          const loadingTask = pdfjsLib.getDocument(pdfUrl);
          loadingTask.promise.then(
            pdf => {
              pdfDocument.value = pdf;
              renderPagesInView(); // Initially render pages in view
              observePages(); // Start observing page visibility
            },
            reason => {
              console.error(reason);
              error.value = true;
            }
          );
        };
        document.head.appendChild(script);
      };

      const renderPage = (pageNumber) => {
        if (loadedPages.value.has(pageNumber)) return; // Avoid reloading the same page
        loadedPages.value.add(pageNumber);

        pdfDocument.value.getPage(pageNumber).then(page => {
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
          });
        });
      };

      const observePages = () => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const pageNumber = parseInt(entry.target.dataset.pageNumber, 10);
              renderPage(pageNumber);
            }
          });
        }, { root: pdfContainer.value });

        for (let i = 1; i <= pdfDocument.value.numPages; i++) {
          const div = document.createElement('div');
          div.dataset.pageNumber = i;
          div.style.height = '100vh'; // Set a large enough height to represent the page
          pdfViewer.value.appendChild(div);
          observer.observe(div);
        }
      };

      const renderPagesInView = () => {
        const containerHeight = pdfContainer.value.clientHeight;
        const pageHeight = containerHeight / pdfDocument.value.numPages;
        for (let i = 1; i <= pdfDocument.value.numPages; i++) {
          const pageDiv = pdfViewer.value.children[i - 1];
          const pageTop = pageDiv.offsetTop;
          const pageBottom = pageTop + pageHeight;
          if (pageTop <= containerHeight && pageBottom >= 0) {
            renderPage(i);
          }
        }
      };

      loadPDF();
    });

    return {
      pdfViewer,
      error,
      pdfContainer,
    };
  },
};
</script>

<style scoped>
.pdf-container {
  height: 100vh;
  overflow-y: auto; /* Enable vertical scrolling */
}

.pdf-viewer {
  display: flex;
  flex-direction: column;
  width: 100%;
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
