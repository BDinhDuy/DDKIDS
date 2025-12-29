<template>
	<footer class="footer">
		<v-container class="py-16">
			<v-row>
				<!-- Column 1: Brand -->
				<v-col cols="12" md="6" lg="3">
					<div class="footer-brand">
						<div class="d-flex align-center gap-2 mb-4">
							<img :src="ASSETS.LOGO" alt="" class="footer-logo-icon" />
							<h2 class="footer-logo-text">{{ APP_INFO.NAME }}</h2>
						</div>
						<p class="footer-desc">Cửa hàng đồ chơi trẻ em uy tín hàng đầu. Mang đến niềm vui và sự phát triển toàn diện cho bé yêu của bạn.</p>
						<div class="d-flex gap-4 mt-4">
							<a href="#" class="social-link">
								<v-icon>mdi-web</v-icon>
							</a>
							<a href="#" class="social-link">
								<v-icon>mdi-facebook</v-icon>
							</a>
							<a href="#" class="social-link">
								<v-icon>mdi-instagram</v-icon>
							</a>
						</div>
					</div>
				</v-col>

				<!-- Column 2: About Us -->
				<v-col cols="6" md="6" lg="3">
					<div class="footer-column">
						<h3 class="footer-heading">Về chúng tôi</h3>
						<ul class="footer-links">
							<li>Câu hỏi thường gặp</li>
							<li>Hướng dẫn mua hàng</li>
							<li @click="handleContact">Liên hệ</li>
						</ul>
					</div>
				</v-col>

				<!-- Column 3: Support -->
				<v-col cols="6" md="6" lg="3">
					<div class="footer-column">
						<h3 class="footer-heading">Hỗ trợ khách hàng</h3>
						<ul class="footer-links">
							<li>Chính sách đổi trả</li>
							<li>Chính sách bảo mật</li>
							<li>Điều khoản sử dụng</li>
						</ul>
					</div>
				</v-col>

				<!-- Column 4: Contact -->
				<v-col cols="12" md="6" lg="3">
					<div class="footer-column">
						<h3 class="footer-heading">Liên hệ</h3>
						<ul class="footer-contact">
							<li class="d-flex align-start gap-2">
								<v-icon size="small" class="pr-2">mdi-map-marker</v-icon>
								<span>{{ APP_INFO.ADDRESS }}</span>
							</li>
							<li class="d-flex align-center gap-2">
								<v-icon size="small" class="pr-2">mdi-phone</v-icon>
								<span>{{ APP_INFO.HOTLINE }}</span>
							</li>
							<li class="d-flex align-center gap-2">
								<v-icon size="small" class="pr-2">mdi-email</v-icon>
								<span>{{ APP_INFO.EMAIL }}</span>
							</li>
						</ul>
					</div>
				</v-col>
			</v-row>

			<!-- Bottom Bar -->
			<v-divider class="my-8"></v-divider>
			<div class="footer-bottom">
				<p class="footer-copyright">© 2025 {{ APP_INFO.NAME }}. All rights reserved.</p>
				<div class="payment-icons">
					<div class="payment-placeholder"></div>
					<div class="payment-placeholder"></div>
					<div class="payment-placeholder"></div>
				</div>
			</div>
		</v-container>
	</footer>
</template>

<script setup>
import { APP_INFO, ASSETS } from '@/utils/constants'
import router from '../router';

const handleContact = () => {
	router.push('/shop/contact');
}
</script>

<style scoped>
.footer {
	background: white;
	border-top: 1px solid #f4f3f0;
}

.footer-brand {
	margin-bottom: 24px;
}

.footer-logo-icon {
	width: 24px;
	height: 24px;
	color: #ee9d2b;
}

.logo-svg {
	width: 100%;
	height: 100%;
}

.footer-logo-text {
	font-size: 18px;
	font-weight: 700;
	color: #181511;
	margin: 0;
}

.footer-desc {
	font-size: 14px;
	color: #666;
	line-height: 1.6;
	margin: 0;
}

.social-link {
	color: #999;
	transition: color 0.2s;
}

.social-link:hover {
	color: #ee9d2b;
}

.footer-column {
	margin-bottom: 24px;
}

.footer-heading {
	font-size: 16px;
	font-weight: 700;
	color: #181511;
	margin-bottom: 16px;
}

.footer-links {
	list-style: none;
	padding: 0;
	margin: 0;
	cursor: pointer;
}

.footer-links li {
	margin-bottom: 12px;
	font-size: 14px;
	color: #666;
}

.footer-links li:hover {
	color: #ee9d2b;
}

.footer-contact {
	list-style: none;
	padding: 0;
	margin: 0;
}

.footer-contact li {
	font-size: 14px;
	color: #666;
	margin-bottom: 12px;
}

.footer-bottom {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 16px;
}

.footer-copyright {
	font-size: 14px;
	color: #999;
	margin: 0;
}

.payment-icons {
	display: flex;
	gap: 16px;
}

.payment-placeholder {
	width: 40px;
	height: 24px;
	background: #f4f3f0;
	border-radius: 4px;
}

@media (max-width: 960px) {
	.footer-bottom {
		flex-direction: column;
		text-align: center;
	}
}
</style>