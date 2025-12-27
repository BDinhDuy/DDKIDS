<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="chat-backdrop"
        @click="closeChat"
      ></div>
    </Transition>

    <!-- Chat Popup -->
    <Transition name="slide-up">
      <div v-if="isOpen" :class="['chat-popup-container', { 'mobile': isMobile }]">
        <div class="chat-popup-wrapper">
          <!-- Chat Container -->
          <div class="chat-container">
            <!-- Header -->
            <div class="chat-header">
              <div class="header-content">
                <div class="agent-info">
                  <div class="agent-avatar-wrapper">
                    <div class="agent-avatar">
                      <img
                        :src="agentAvatar"
                        alt="Support Agent Avatar"
                        class="avatar-image"
                      />
                    </div>
                    <div class="online-indicator"></div>
                  </div>
                  <div class="agent-details">
                    <h2 class="agent-name">CSKH ToyStore</h2>
                    <p class="agent-status">
                      <span class="status-dot"></span>
                      Đang trực tuyến
                    </p>
                  </div>
                </div>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  class="close-btn"
                  @click="closeChat"
                >
                  <v-icon size="20" color="white">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>

            <!-- Working Hours Card -->
            <div class="working-hours-wrapper">
              <div class="working-hours-card">
                <div class="hours-icon">
                  <v-icon size="18" color="#ee9d2b">mdi-clock-outline</v-icon>
                </div>
                <div class="hours-text">
                  <span class="hours-label">THỜI GIAN LÀM VIỆC</span>
                  <span class="hours-value">Thứ 2 - Thứ 7 (7h - 20h)</span>
                </div>
              </div>
            </div>

            <!-- Messages Area -->
            <div class="messages-area" ref="messagesContainer">
              <!-- Timestamp -->
              <div class="timestamp-wrapper">
                <span class="timestamp">{{ currentTime }}</span>
              </div>

              <!-- Messages -->
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="['message-wrapper', message.type]"
              >
                <div v-if="message.type === 'received'" class="message-avatar">
                  <img :src="agentAvatar" alt="Admin" class="avatar-img" />
                </div>
                <div class="message-content-wrapper">
                  <div :class="['message-bubble', message.type]">
                    {{ message.text }}
                  </div>
                  <span class="message-time">
                    {{ message.type === 'received' ? 'Admin' : 'Bạn' }} • {{ message.time }}
                  </span>
                </div>
              </div>

              <!-- Typing Indicator -->
              <div v-if="isTyping" class="message-wrapper received typing-indicator">
                <div class="message-avatar">
                  <img :src="agentAvatar" alt="Admin" class="avatar-img" />
                </div>
                <div class="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            <!-- Input Area -->
            <div class="input-area">
              <div class="input-wrapper">
                <div class="input-container">
                  <div class="input-actions">
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      class="action-btn"
                      title="Đính kèm tệp"
                    >
                      <v-icon size="20" color="#9ca3af">mdi-paperclip</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      class="action-btn"
                      title="Biểu tượng cảm xúc"
                    >
                      <v-icon size="20" color="#9ca3af">mdi-emoticon-outline</v-icon>
                    </v-btn>
                  </div>
                  <input
                    v-model="messageInput"
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    class="message-input"
                    @keyup.enter="sendMessage"
                  />
                  <v-btn
                    icon
                    size="small"
                    color="#ee9d2b"
                    class="send-btn"
                    @click="sendMessage"
                    :disabled="!messageInput.trim()"
                  >
                    <v-icon size="18" color="white">mdi-send</v-icon>
                  </v-btn>
                </div>
              </div>
              <div class="security-badge">
                <v-icon size="12" color="#9ca3af">mdi-lock</v-icon>
                <p class="security-text">Được bảo mật bởi {{DDKIDS}} LiveChat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useDisplay } from 'vuetify'
import {DDKIDS} from '@/utils/constants'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const agentAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmSGfy_psZrX3L9wIH2KXIcQRVffomUEZTmJ_JbqiPsFqg_or3RehlzxKUSGGmt3TFQwqO3OgfMxn_9Y5S5aathsAVFc5bxnOsPW7tysRSnGZ_5TgdY7FnzYGiX-OUFPAoY_H-k3oB5N1-H39Rctv4KSr1lk19G_cvblDYlGw4qC7kzbOLhvr95Ekl8VvURXt0POIu3URhz_JfSMsIyNP9NBIWB5Hr1CaQAGmTW-29La1glWJL0n-6dd90DrTD72QRXf7XcsktO3En'

const messagesContainer = ref(null)
const messageInput = ref('')
const isTyping = ref(false)

const messages = ref([
  {
    type: 'received',
    text: 'Xin chào! Bố mẹ cần tìm đồ chơi gì cho bé hôm nay? 🧸',
    time: '14:02'
  },
  {
    type: 'sent',
    text: 'Cho mình hỏi bộ lego này còn hàng không ạ?',
    time: '14:05'
  },
  {
    type: 'received',
    text: 'Dạ shop còn hàng ạ! Mẹ gửi shop xin hình ảnh sản phẩm để shop kiểm tra kỹ hơn nhé?',
    time: '14:06'
  }
])

const currentTime = computed(() => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  return `Hôm nay, ${hours}:${minutes}`
})

const closeChat = () => {
  isOpen.value = false
}

const sendMessage = async () => {
  if (!messageInput.value.trim()) return

  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

  messages.value.push({
    type: 'sent',
    text: messageInput.value,
    time: time
  })

  messageInput.value = ''

  await nextTick()
  scrollToBottom()

  // Simulate typing indicator
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    // Simulate auto-reply
    messages.value.push({
      type: 'received',
      text: 'Cảm ơn bạn đã liên hệ! Nhân viên sẽ phản hồi trong giây lát.',
      time: `${now.getHours().toString().padStart(2, '0')}:${(now.getMinutes() + 1).toString().padStart(2, '0')}`
    })
    nextTick(() => scrollToBottom())
  }, 1500)
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Watch for dialog open to scroll to bottom
watch(isOpen, (newVal) => {
  if (newVal) {
    nextTick(() => scrollToBottom())
  }
})
</script>

<style scoped>
/* Backdrop */
.chat-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  z-index: 9998;
}

/* Chat Popup Container - Positioned at bottom right */
.chat-popup-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

.chat-popup-container.mobile {
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
}

.chat-popup-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.chat-container {
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 640px;
  max-height: 85vh;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.chat-popup-container.mobile .chat-container {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  border-radius: 24px 24px 0 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-up-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

/* Header */
.chat-header {
  background: linear-gradient(135deg, #ee9d2b 0%, #d68b22 100%);
  padding: 24px;
  padding-bottom: 40px;
  position: relative;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.agent-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.agent-avatar-wrapper {
  position: relative;
  cursor: pointer;
}

.agent-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #4ade80;
  border: 2px solid #ee9d2b;
  border-radius: 50%;
}

.agent-details {
  display: flex;
  flex-direction: column;
}

.agent-name {
  color: white;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.agent-status {
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  font-weight: 500;
  margin: 2px 0 0 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
}

.close-btn {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s;
}

.close-btn:hover {
  color: white;
  background: rgba(255, 255, 255, 0.2) !important;
}

/* Working Hours */
.working-hours-wrapper {
  padding: 0 20px;
  margin-top: -24px;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}

.working-hours-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.hours-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(238, 157, 43, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hours-text {
  display: flex;
  flex-direction: column;
}

.hours-label {
  font-size: 10px;
  font-weight: 700;
  color: #9ca3af;
  letter-spacing: 0.05em;
}

.hours-value {
  font-size: 12px;
  font-weight: 700;
  color: #181511;
}

/* Messages Area */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.messages-area::-webkit-scrollbar {
  width: 5px;
}

.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background-color: rgba(238, 157, 43, 0.3);
  border-radius: 20px;
}

.timestamp-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.timestamp {
  font-size: 10px;
  font-weight: 600;
  color: #9ca3af;
  background: #f9fafb;
  padding: 4px 12px;
  border-radius: 9999px;
  border: 1px solid #f3f4f6;
}

.message-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-wrapper.received {
  align-self: flex-start;
  max-width: 90%;
}

.message-wrapper.sent {
  align-self: flex-end;
  max-width: 90%;
  justify-content: flex-end;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid #f3f4f6;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-wrapper.sent .message-content-wrapper {
  align-items: flex-end;
}

.message-wrapper.received .message-content-wrapper {
  align-items: flex-start;
}

.message-bubble {
  padding: 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-bubble.received {
  background: #f4f6f8;
  color: #181511;
  border-top-left-radius: 4px;
}

.message-bubble.sent {
  background: #ee9d2b;
  color: white;
  border-top-right-radius: 4px;
}

.message-time {
  font-size: 10px;
  font-weight: 500;
  color: #9ca3af;
  margin: 0 4px;
}

/* Typing Indicator */
.typing-indicator {
  animation: fadeIn 0.3s ease;
}

.typing-dots {
  background: #f4f6f8;
  padding: 14px 18px;
  border-radius: 16px;
  border-top-left-radius: 4px;
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #9ca3af;
  animation: typing 1.4s infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

/* Input Area */
.input-area {
  padding: 16px;
  background: white;
  border-top: 1px solid #f3f4f6;
  flex-shrink: 0;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  background: #f9fafb;
  padding: 8px;
  border-radius: 20px;
  border: 1px solid #f3f4f6;
  transition: all 0.2s;
}

.input-container:focus-within {
  border-color: #ee9d2b;
  box-shadow: 0 0 0 2px rgba(238, 157, 43, 0.1);
}

.input-actions {
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  padding-left: 4px;
}

.action-btn {
  transition: all 0.2s;
}

.action-btn:hover {
  background: white !important;
}

.action-btn:hover :deep(.v-icon) {
  color: #ee9d2b !important;
}

.message-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #181511;
  font-size: 14px;
  padding: 10px 8px;
  max-height: 96px;
  resize: none;
}

.message-input::placeholder {
  color: #9ca3af;
}

.send-btn {
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(238, 157, 43, 0.3) !important;
  transition: all 0.2s;
  margin-bottom: 2px;
}

.send-btn:hover {
  background-color: #d68b22 !important;
  transform: scale(0.95);
}

.send-btn:active {
  transform: scale(0.9);
}

.security-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.security-badge:hover {
  opacity: 1;
}

.security-text {
  font-size: 10px;
  color: #9ca3af;
  font-weight: 500;
  margin: 0;
}

/* Remove button focus outline */
:deep(.v-btn .v-btn__focus-ring) {
  display: none !important;
}

:deep(.v-btn) {
  outline: none !important;
}
</style>
