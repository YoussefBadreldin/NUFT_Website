<template>
    <div>
        <!-- Smart Assistant Button -->
        <button id="smart-assistant-icon" @click="toggleModal">
            <i class="fas fa-robot"></i>
            <span><br />SMART</span>
            <span>ASSISTANT</span>
        </button>

        <!-- Modal for Smart Assistant -->
        <div class="modal fade" id="smartAssistantModal" tabindex="-1" role="dialog"
            aria-labelledby="smartAssistantModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="smartAssistantModalLabel">Smart Assistant Chat</h5>
                        <button type="button" class="close" @click="closeModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>This is where your chat interface would go.</p>
                        <iframe src="https://example.com/chatbot"
                            style="width: 100%; height: 400px; border: none;"></iframe>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Chat Window -->
        <div class="chat-window" v-show="isChatWindowVisible">
            <iframe src="https://example.com/chatbot" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default {
    data() {
        return {
            isChatWindowVisible: false,
        };
    },
    methods: {
        toggleModal() {
            $('#smartAssistantModal').modal('show');
        },
        closeModal() {
            $('#smartAssistantModal').modal('hide');
        },
        toggleChatWindow() {
            this.isChatWindowVisible = !this.isChatWindowVisible;
        },
    },
};
</script>

<style scoped>
.chat-window {
    display: none;
    /* Add any additional styles for the chat window */
}
</style>
