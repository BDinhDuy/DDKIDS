<template>
	<footer class="footer">
		<v-container class="py-16">
			<v-row>
				<!-- Column 1: Brand -->
				<v-col cols="12" md="6" lg="3">
					<div class="footer-brand">
						<div class="d-flex align-center gap-2 mb-4">
							<div class="footer-logo-icon">
								<svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
									<path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
								</svg>
							</div>
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
							<li><a href="#">Câu hỏi thường gặp</a></li>
							<li><a href="#">Hướng dẫn mua hàng</a></li>
							<li @click="handleContact">Liên hệ</li>
						</ul>
					</div>
				</v-col>

				<!-- Column 3: Support -->
				<v-col cols="6" md="6" lg="3">
					<div class="footer-column">
						<h3 class="footer-heading">Hỗ trợ khách hàng</h3>
						<ul class="footer-links">
							<li><a href="#">Chính sách đổi trả</a></li>
							<li><a href="#">Chính sách bảo mật</a></li>
							<li><a href="#">Điều khoản sử dụng</a></li>
						</ul>
					</div>
				</v-col>

				<!-- Column 4: Contact -->
				<v-col cols="12" md="6" lg="3">
					<div class="footer-column">
						<h3 class="footer-heading">Liên hệ</h3>
						<ul class="footer-contact">
							<li class="d-flex align-start gap-2">
								<v-icon size="small">mdi-map-marker</v-icon>
								<span>1/1 đường 26 phường Phước Long Tp.Hồ Chí Minh</span>
							</li>
							<li class="d-flex align-center gap-2">
								<v-icon size="small">mdi-phone</v-icon>
								<span>0345466755</span>
							</li>
							<li class="d-flex align-center gap-2">
								<v-icon size="small">mdi-email</v-icon>
								<span>support@gmail.com</span>
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
import { APP_INFO } from '@/utils/constants'
import router from '../router';

const handleContact = () => {
	router.push('/contact');
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
}

.footer-links a {
	font-size: 14px;
	color: #666;
	text-decoration: none;
	transition: color 0.2s;
}

.footer-links a:hover {
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