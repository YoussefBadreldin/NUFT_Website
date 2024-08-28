<template>
  <div class="pdf-container" ref="scrollContainer">
    <div ref="pdfViewer" class="pdf-viewer"></div>
    <div v-if="error" class="error-message">Unable to load the PDF. Please check the file path or the PDF itself.</div>
    <div v-if="loading" class="loading-message">Loading PDF...</div>
    <div v-if="totalPages > 0" class="page-count">Total Pages: {{ totalPages }}</div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const pdfViewer = ref(null);
    const scrollContainer = ref(null);
    const error = ref(false);
    const loading = ref(true);
    const totalPages = ref(0);
    const pdfUrl = '/images/guide2023-2024.pdf';
    let pdf = null;
    let renderedPages = new Set();
    
    let observer = null;

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
            totalPages.value = pdf.numPages;
            console.log(`Total Pages: ${totalPages.value}`);
            loading.value = false;
            initializeObserver(); // Start lazy loading
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
      if (!pdf || renderedPages.has(pageNumber)) return;

      pdf.getPage(pageNumber).then(page => {
        const viewport = page.getViewport({ scale: 1.5 }); // Reduced scale to balance quality and performance
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const devicePixelRatio = window.devicePixelRatio || 1;

        // Set canvas dimensions for high quality
        canvas.width = viewport.width * devicePixelRatio;
        canvas.height = viewport.height * devicePixelRatio;
        context.scale(devicePixelRatio, devicePixelRatio);

        pdfViewer.value.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        page.render(renderContext).promise.then(() => {
          console.log(`Page ${pageNumber} rendered`);
          renderedPages.add(pageNumber); // Mark page as rendered
        }).catch(renderError => {
          console.error(`Error rendering page ${pageNumber}:`, renderError);
          error.value = true;
        });
      }).catch(pageError => {
        console.error(`Error fetching page ${pageNumber}:`, pageError);
        error.value = true;
      });
    };

    const initializeObserver = () => {
      observer = new IntersectionObserver(handleIntersection, {
        root: scrollContainer.value,
        rootMargin: '0px',
        threshold: 0.1, // Adjust this threshold to balance rendering performance and user experience
      });

      // Add observer to every page placeholder (initially invisible)
      for (let i = 1; i <= totalPages.value; i++) {
        const pagePlaceholder = document.createElement('div');
        pagePlaceholder.setAttribute('data-page-number', i);
        pagePlaceholder.style.height = '800px'; // Adjust height as per your typical page height
        pagePlaceholder.style.width = '100%';
        pdfViewer.value.appendChild(pagePlaceholder);
        observer.observe(pagePlaceholder); // Observe each placeholder
      }
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pageNumber = parseInt(entry.target.getAttribute('data-page-number'));
          renderPage(pageNumber); // Render page only when it is in view
          observer.unobserve(entry.target); // Stop observing once the page is rendered
          entry.target.remove(); // Remove the placeholder after rendering
        }
      });
    };

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect(); // Clean up the observer when the component is destroyed
      }
    });

    return {
      pdfViewer,
      scrollContainer,
      error,
      loading,
      totalPages,
    };
  },
};
</script>

<style scoped>
.pdf-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow: auto;
}

.pdf-viewer {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.error-message, .loading-message, .page-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: blue;
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
}

.page-count {
  top: 10px; /* Move to the top for a page count display */
  left: auto;
  right: 10px;
  transform: none;
}
</style>
