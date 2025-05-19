<template>
    <div>
        <!-- Smart Assistant Button -->
        <button 
            class="smart-assistant-button"
            @click="navigateToSmartAssistant"
            :class="{ 'button-hover': isHovered, 'icon-only': isIconOnly }"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
            @dblclick="toggleView"
        >
            <div class="button-content">
            <i class="fas fa-robot"></i>
                <div class="button-text" v-show="!isIconOnly">
                    <span>المساعد</span>
                    <span>الذكي</span>
                </div>
            </div>
        </button>

        <!-- Modal for Smart Assistant -->
        <Transition name="modal">
            <div v-if="showModal" class="modal-overlay" @click="closeModal">
                <div class="modal-container" @click.stop>
                    <div class="modal-header">
                        <h5 class="modal-title">Smart Assistant Chat</h5>
                        <button class="close-button" @click="closeModal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Add your chat interface here -->
                    </div>
                    <div class="modal-footer">
                        <button class="close-btn" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isHovered = ref(false);
const showModal = ref(false);
const isIconOnly = ref(false);

const navigateToSmartAssistant = () => {
    router.push('/smartAssistant/');
};

const closeModal = () => {
    showModal.value = false;
};

const toggleView = () => {
    isIconOnly.value = !isIconOnly.value;
};
</script>

<style scoped>
.smart-assistant-button {
    position: fixed;
    left: 20px;
    bottom: 20px;
    background: linear-gradient(135deg, #2B32B2, #1488CC);
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(43, 50, 178, 0.2);
    z-index: 1000;
    backdrop-filter: blur(5px);
}

.button-content {
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    flex-direction: row-reverse;
    width: 100%;
}

.button-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 14px;
    line-height: 1.2;
    transition: all 0.3s ease;
    flex: 1;
    text-align: left;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.button-hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(43, 50, 178, 0.3);
    background: linear-gradient(135deg, #1488CC, #2B32B2);
}

.icon-only {
    padding: 12px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6B48FF, #1CB5E0);
    box-shadow: 0 4px 15px rgba(107, 72, 255, 0.2);
}

.icon-only:hover {
    background: linear-gradient(135deg, #1CB5E0, #6B48FF);
    box-shadow: 0 8px 20px rgba(107, 72, 255, 0.3);
}

.icon-only .button-content {
    justify-content: center;
}

.icon-only i {
    font-size: 24px;
    margin: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;
}

.modal-container {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #6B48FF, #1CB5E0);
    color: white;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 4px 15px rgba(107, 72, 255, 0.2);
}

.modal-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.close-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    transition: all 0.2s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.close-button:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
}

.modal-body {
    padding: 20px;
    background: rgba(255, 255, 255, 0.98);
}

.modal-footer {
    padding: 20px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    justify-content: flex-end;
    background: rgba(255, 255, 255, 0.98);
}

.close-btn {
    background: linear-gradient(135deg, #6B48FF, #1CB5E0);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(107, 72, 255, 0.2);
}

.close-btn:hover {
    background: linear-gradient(135deg, #1CB5E0, #6B48FF);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(107, 72, 255, 0.3);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
    transition: all 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    transform: scale(0.95) translateY(20px);
}
</style>
