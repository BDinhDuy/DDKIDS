<template>
	<div class="home-page">
		<!-- Hero Section -->
		<section class="hero-section">
			<v-container>
				<v-card class="hero-card" elevation="2" rounded="xl">
					<div class="hero-content">
						<v-chip color="#ee9d2b" label class="hero-badge mb-4" size="small">
							<span class="text-uppercase font-weight-bold">Bộ sưu tập mới</span>
						</v-chip>
						<h1 class="hero-title mb-4">
							Khám phá thế giới<br />đồ chơi kỳ diệu
						</h1>
						<h2 class="hero-subtitle mb-8">
							Giúp bé phát triển tư duy và sáng tạo với hàng ngàn mẫu đồ chơi an toàn, chính hãng từ các thương hiệu hàng đầu.
						</h2>
						<v-btn color="#ee9d2b" size="large" class="text-none font-weight-bold hero-btn" elevation="2" @click="goToShop">
							Mua ngay
							<v-icon end>mdi-arrow-right</v-icon>
						</v-btn>
					</div>
				</v-card>
			</v-container>
		</section>

		<!-- Features Section -->
		<section class="features-section">
			<v-container>
				<v-row>
					<v-col v-for="feature in features" :key="feature.title" cols="6" md="3">
						<v-card class="feature-card text-center" elevation="1" rounded="xl">
							<v-avatar :color="feature.color" size="40" class="mb-2">
								<v-icon :color="feature.iconColor">{{ feature.icon }}</v-icon>
							</v-avatar>
							<h3 class="feature-title">{{ feature.title }}</h3>
							<p class="feature-desc">{{ feature.desc }}</p>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<!-- Categories Section -->
		<section class="categories-section">
			<v-container>
				<h2 class="section-title mb-6">Mua sắm theo danh mục</h2>
				<v-row>
					<v-col v-for="category in categories" :key="category.name" cols="6" sm="4" md="2">
						<div class="category-item" @click="navigateToCategory(category.id)">
							<v-card class="category-card" elevation="1" rounded="xl">
								<v-img :src="category.image" :alt="category.name" aspect-ratio="1" cover></v-img>
							</v-card>
							<p class="category-name">{{ category.name }}</p>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<!-- Special Deals Section -->
		<section class="deals-section">
			<v-container>
				<div class="d-flex justify-space-between align-center mb-6">
					<h2 class="section-title">Ưu đãi đặc biệt hôm nay</h2>
					<a href="#" class="deal-link">
						<span>Xem tất cả deal</span>
						<v-icon color="red" size="small">mdi-fire</v-icon>
					</a>
				</div>
				<v-row>
					<v-col v-for="deal in deals" :key="deal.id" cols="12" md="6">
						<v-card :color="deal.bgColor" class="deal-card" rounded="xl" elevation="1">
							<div class="deal-content">
								<v-chip :color="deal.badgeColor" label size="small" class="mb-2 font-weight-bold">
									{{ deal.badge }}
								</v-chip>
								<h3 class="deal-title">{{ deal.title }}</h3>
								<p class="deal-text">{{ deal.text }}</p>
								<v-btn color="#181511" variant="flat" class="text-none font-weight-bold deal-btn" elevation="2">
									{{ deal.btnText }}
								</v-btn>
							</div>
							<div class="deal-image" :style="{ backgroundImage: `url(${deal.image})` }"></div>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<!-- Featured Products Section -->
		<section class="products-section">
			<v-container>
				<div class="d-flex justify-space-between align-center mb-6">
					<h2 class="section-title">Sản phẩm nổi bật</h2>
					<a href="#" class="view-all-link">
						<span @click="goToShop">Xem tất cả</span>
						<v-icon size="small">mdi-arrow-right</v-icon>
					</a>
				</div>
				<v-row>
					<v-col v-for="product in featuredProducts" :key="product.id" cols="6" md="3">
						<v-card class="product-card" elevation="1" rounded="xl" @click="viewProduct(product.id)">
							<div class="product-image-wrapper">
								<v-chip v-if="product.badge" :color="product.badgeColor" label size="small" class="product-badge">
									{{ product.badge }}
								</v-chip>
								<v-btn
									icon
									size="small"
									variant="flat"
									color="white"
									class="favorite-btn"
									@click.stop="toggleFavorite(product)"
								>
									<v-icon :color="isFavorite(product.id) ? 'red' : 'grey-lighten-1'">
										{{ isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
									</v-icon>
								</v-btn>
								<v-img :src="product.image" :alt="product.name" aspect-ratio="1" cover class="product-image"></v-img>
							</div>
							<v-card-text class="product-info">
								<p class="product-category">{{ product.category }}</p>
								<h3 class="product-name">{{ product.name }}</h3>
								<div class="product-rating mb-2">
									<v-icon v-for="i in 5" :key="i" size="small" :color="i <= product.rating ? 'yellow-darken-2' : 'grey-lighten-1'">
										{{ i <= product.rating ? 'mdi-star' : 'mdi-star-outline' }}
									</v-icon>
									<span class="rating-count">({{ product.reviews }})</span>
								</div>
								<div class="d-flex justify-space-between align-center">
									<div>
										<p v-if="product.oldPrice" class="old-price">{{ formatPrice(product.oldPrice) }}</p>
										<p class="product-price">{{ formatPrice(product.price) }}</p>
									</div>
									<v-btn icon size="small" color="#ee9d2b" elevation="1" @click.stop="addToCart(product, $event)">
										<v-icon>mdi-cart-plus</v-icon>
									</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<!-- New Products Section -->
		<section class="products-section">
			<v-container>
				<div class="d-flex justify-space-between align-center mb-6">
					<h2 class="section-title">Đồ chơi mới nhất</h2>
					<a href="#" class="view-all-link">
						<span @click="goToShop">Xem toàn bộ</span>
						<v-icon size="small">mdi-arrow-right</v-icon>
					</a>
				</div>
				<v-row>
					<v-col v-for="product in newProducts" :key="product.id" cols="6" md="3">
						<v-card class="product-card" elevation="1" rounded="xl" @click="viewProduct(product.id)">
							<div class="product-image-wrapper">
								<v-chip v-if="product.badge" color="green" label size="small" class="product-badge">
									{{ product.badge }}
								</v-chip>
								<v-btn
									icon
									size="small"
									variant="flat"
									color="white"
									class="favorite-btn"
									@click.stop="toggleFavorite(product)"
								>
									<v-icon :color="isFavorite(product.id) ? 'red' : 'grey-lighten-1'">
										{{ isFavorite(product.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
									</v-icon>
								</v-btn>
								<v-img :src="product.image" :alt="product.name" aspect-ratio="1" cover class="product-image"></v-img>
							</div>
							<v-card-text class="product-info">
								<p class="product-category">{{ product.category }}</p>
								<h3 class="product-name">{{ product.name }}</h3>
								<div class="product-rating mb-2">
									<v-icon v-for="i in 5" :key="i" size="small" :color="i <= product.rating ? 'yellow-darken-2' : 'grey-lighten-1'">
										{{ i <= product.rating ? 'mdi-star' : 'mdi-star-outline' }}
									</v-icon>
									<span class="rating-count">({{ product.reviews }})</span>
								</div>
								<div class="d-flex justify-space-between align-center">
									<p class="product-price">{{ formatPrice(product.price) }}</p>
									<v-btn icon size="small" color="#ee9d2b" elevation="1" @click.stop="addToCart(product, $event)">
										<v-icon>mdi-cart-plus</v-icon>
									</v-btn>
								</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</section>

		<!-- Birthday Sale Banner -->
		<section class="banner-section">
			<v-container>
				<v-card class="birthday-banner" elevation="2" rounded="xl">
					<div class="banner-content">
						<h2 class="banner-title">
							Đại tiệc sinh nhật<br />
							<span class="banner-highlight">Giảm đến 50%</span>
						</h2>
						<p class="banner-text">
							Dành tặng bé những món quà ý nghĩa nhất. Chương trình áp dụng cho tất cả sản phẩm Lego và Búp bê.
						</p>
						<v-btn color="#181511" size="large" class="text-none font-weight-bold" elevation="2">
							Xem chi tiết
						</v-btn>
					</div>
					<div class="banner-bg"></div>
				</v-card>
			</v-container>
		</section>

		<!-- Newsletter Section -->
		<section class="newsletter-section">
			<v-container>
				<div class="newsletter-content text-center">
					<v-avatar color="rgba(238, 157, 43, 0.2)" size="64" class="mb-4">
						<v-icon color="#ee9d2b" size="32">mdi-email-outline</v-icon>
					</v-avatar>
					<h2 class="newsletter-title">Đăng ký nhận tin</h2>
					<p class="newsletter-text">
						Nhận thông báo về các chương trình khuyến mãi và sản phẩm mới nhất từ {{ APP_INFO.NAME }}.
					</p>
					<v-row justify="center" class="mt-6">
						<v-col cols="12" sm="8" md="10">
							<div class="d-flex flex-column flex-sm-row ga-3">
								<v-text-field
									v-model="email"
									placeholder="Nhập email của bạn"
									variant="solo"
									density="comfortable"
									hide-details
									rounded="lg"
									class="flex-grow-1"
								></v-text-field>
								<v-btn color="#ee9d2b" size="large" class="text-none font-weight-bold" elevation="2" @click="handleSubscribe">
									Đăng ký
								</v-btn>
							</div>
						</v-col>
					</v-row>
				</div>
			</v-container>
		</section>

		<!-- Newsletter Success Dialog -->
		<v-dialog v-model="showNewsletterDialog" max-width="480" persistent>
			<v-card rounded="xl" class="newsletter-dialog">
				<div class="gradient-top"></div>
				
				<v-btn
					icon
					variant="text"
					class="close-btn"
					size="small"
					@click="showNewsletterDialog = false"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>

				<v-card-text class="text-center pa-8">
					<v-avatar color="green-lighten-4" size="64" class="mb-4">
						<v-icon color="green" size="40" class="bounce-icon">mdi-email-check</v-icon>
					</v-avatar>
					
					<h3 class="text-h5 font-weight-black mb-3">
						Đăng ký nhận tin thành công!
					</h3>
					
					<p class="text-body-2 text-grey-darken-1 mb-6">
						Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được các thông tin khuyến mãi và tin tức mới nhất từ chúng tôi qua email <strong>{{ email }}</strong>.
					</p>

					<v-btn
						block
						color="#ee9d2b"
						size="large"
						class="text-none font-weight-bold mb-3"
						@click="goHome"
					>
						Quay về trang chủ
					</v-btn>
					
					<v-btn
						block
						variant="outlined"
						size="large"
						class="text-none"
						@click="showNewsletterDialog = false"
					>
						Đóng
					</v-btn>
				</v-card-text>
			</v-card>
		</v-dialog>

		<!-- Add to Cart Snackbar -->
		<v-snackbar
			v-model="showAddToCartSnackbar"
			:timeout="3000"
			color="green"
			location="top"
			rounded="pill"
		>
			<div class="d-flex align-center">
				<v-icon class="mr-2">mdi-check-circle</v-icon>
				<span><strong>{{ addedProductName }}</strong> đã được thêm vào giỏ hàng!</span>
			</div>
			<template v-slot:actions>
				<v-btn variant="text" @click="showAddToCartSnackbar = false">
					Đóng
				</v-btn>
			</template>
		</v-snackbar>

		<!-- Favorite Snackbar -->
		<v-snackbar
			v-model="showFavoriteSnackbar"
			:timeout="3000"
			color="pink-darken-1"
			location="top"
		>
			<v-icon start>mdi-heart</v-icon>
			{{ favoriteMessage }}
			<template v-slot:actions>
				<v-btn color="white" variant="text" @click="showFavoriteSnackbar = false">
					Đóng
				</v-btn>
			</template>
		</v-snackbar>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '@/utils/helpers'
import { APP_INFO } from '@/utils/constants'

const router = useRouter()
const cartStore = useCartStore()
const email = ref('')
const showNewsletterDialog = ref(false)
const showAddToCartSnackbar = ref(false)
const addedProductName = ref('')

// Favorite state
const favorites = ref([])
const showFavoriteSnackbar = ref(false)
const favoriteMessage = ref('')

// Features data
const features = ref([
	{ title: 'Miễn phí vận chuyển', desc: 'Cho đơn hàng từ 500k', icon: 'mdi-truck-fast', color: 'green-lighten-5', iconColor: 'green' },
	{ title: 'An toàn cho bé', desc: '100% Chính hãng', icon: 'mdi-baby-carriage', color: 'blue-lighten-5', iconColor: 'blue' },
	{ title: 'Đổi trả dễ dàng', desc: 'Trong vòng 7 ngày', icon: 'mdi-sync', color: 'orange-lighten-5', iconColor: 'orange' },
	{ title: 'Hỗ trợ 24/7', desc: 'Hotline miễn phí', icon: 'mdi-headset', color: 'purple-lighten-5', iconColor: 'purple' }
])

// Categories data
const categories = ref([
	{ id: 1, name: 'Lắp ráp', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTGS_R7gsJscs3K4MYBIYtZw738Kx6hHJ5G2sD22HFb4AAbBclIsoK3E6vJjLbJWpcxmia-xUXQKC0usLStZwyn3XEJhk1UPGEpTKbnl_rTSG1_tjemDZcPrdf7pkLdozUyMYOD0i5om_DLrGjtD6xKA-B4QDYs_LrEv8F7Omd5YffzJakonHKMQHSiZrfL40zHHeUUOTWlm9GymeKXlpbhNHDQ3SMNdHxQTnbyc1QRe81WByKRybUmnB0zveTP61T-CQHG2-S7iY' },
	{ id: 2, name: 'Búp bê', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh_1xkCtSQxAE8sGaED9lNVio9XaOpvRNZau9oar55YLHKxVjsLKjP4bQrA3e_mkXq4tk4cvstRlin3qHFNeCfWUo6ZRGKWTvVM8H534dXcJSF2_FQj0e7XCopXHgg4A4aKmh40lApmR1d4CKEJ6W9Rnw5WJrbRSiIGj2w8TqTCCw_M4nnHMBHJ5CXqfiiJqzfIR8PftvzO9FzoukHpKwAOrAucnIBcVICv01qEwkNFOuDaAPZoVbIYIV9j2WQFrc2XCrtO-7nQn7_' },
	{ id: 3, name: 'Xe mô hình', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkOldi7jVCcs4oyyWq7ivrHO-wcPFIdMM-kSLKxYTlum3E-qK2OikPn1lBnmIgHaWLIx3DSKptjghe8e5pO00d0aggjo-xCPcVKDEWGZnLTFQLcW-4gdzudkGF9e-PgbgVcKB62xrtc_u-_Db3nv3dY3AESSKpfZD7ooBIlYDLZD14dxmKGs-nr8AVFDYV407FP4PAaRs99wOdLTxseeGkZ9dIxx8Mv8lda2TtUMcufmYfiU9hmKd8JmGbQWoOjufCZwJyUHLaVfdq' },
	{ id: 4, name: 'Gỗ & Puzzle', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuRZ2f1572nK834XF26nxH_tFPqLVB0x4ref1t7WCfCPEPGjmlssD7KcEkbVd7Q56YNUnXOQxHu2AE90L-1XnQPxQLuGdw9YHvoRa_W0SbowftDzkl4o810FglkO02hEXM2iqy3AHzWTdVhuHaBYDDL4-Ozu0ECwGx7EDG55EaYa414G8lBucNlZNIlooHeISjwt6b8TXYSpkD-42GxCpsL7R_66ExWOUET0RXPvKwL2_ncCG2AVsv5kbMsx0kzCHF61INpMTjQCJr' },
	{ id: 5, name: 'Vận động', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV7GD5phGyO7l0aoMqcrmrycP2xJBNFMvM4NTRh6USGNzARJAT2f6-pJhYH5UZdfb-ij1dBbZqWIkWEuvg_Qkklp-EEBFw6L7szPZaqUNFvXhloSqeTspYGZ-t5o7XghcRkinFJWHAwzSuqbRXoGhJPK0FPY7Wqr4EqKO9hOx7-ha9oov2x6KsCTrs25aCDCQwunQugj3SG3pViJiKO7HPCF9ZzqSGZ33s0z9iXq9boc74N58EOUwsxTE2mUtIGKChP1K64Q1kaD2Q' },
	{ id: 6, name: 'Học tập', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzb-j6vudxmIo0l02y-mRueTXPPpe9fpjTAleRZl4jfQnvI_bPvEHkm46sM8cKyvZVjWNXk5wxKH9-PoCAaXVHJtIuQA5AIgN-pffYKHEd7GzmrB_IgWJxsJRpbzfAYnvknOYEL8W-f_WZeovCeBVhYfn1LOq5ZNnvVCLCrNIiLrUutGe-xfjQgHOsagbVo6Vde35tVtEnXFtBtWqdYrF8lQcEvSdzGCWP8KQfMLxWaZPThsjr61Ffo58dwb8vqTXM2yCdKRAZ1vx2' }
])

// Deals data
const deals = ref([
	{
		id: 1,
		badge: 'Flash Sale -40%',
		badgeColor: 'red',
		title: 'Siêu xe tốc độ cao',
		text: 'Dành cho các tay đua tí hon đam mê tốc độ.',
		btnText: 'Mua ngay 299k',
		bgColor: '#fef2f2',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkOldi7jVCcs4oyyWq7ivrHO-wcPFIdMM-kSLKxYTlum3E-qK2OikPn1lBnmIgHaWLIx3DSKptjghe8e5pO00d0aggjo-xCPcVKDEWGZnLTFQLcW-4gdzudkGF9e-PgbgVcKB62xrtc_u-_Db3nv3dY3AESSKpfZD7ooBIlYDLZD14dxmKGs-nr8AVFDYV407FP4PAaRs99wOdLTxseeGkZ9dIxx8Mv8lda2TtUMcufmYfiU9hmKd8JmGbQWoOjufCZwJyUHLaVfdq'
	},
	{
		id: 2,
		badge: 'Combo Hot',
		badgeColor: 'blue',
		title: 'Bộ sưu tập Robot',
		text: 'Mua 1 tặng 1 phụ kiện chiến đấu cực ngầu.',
		btnText: 'Xem chi tiết',
		bgColor: '#eff6ff',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuTGS_R7gsJscs3K4MYBIYtZw738Kx6hHJ5G2sD22HFb4AAbBclIsoK3E6vJjLbJWpcxmia-xUXQKC0usLStZwyn3XEJhk1UPGEpTKbnl_rTSG1_tjemDZcPrdf7pkLdozUyMYOD0i5om_DLrGjtD6xKA-B4QDYs_LrEv8F7Omd5YffzJakonHKMQHSiZrfL40zHHeUUOTWlm9GymeKXlpbhNHDQ3SMNdHxQTnbyc1QRe81WByKRybUmnB0zveTP61T-CQHG2-S7iY'
	}
])

// Featured products data
const featuredProducts = ref([
	{ id: 1, name: 'Trạm cảnh sát thành phố', category: 'Lego City', price: 1200000, oldPrice: 1500000, rating: 4.5, reviews: 128, badge: '-20%', badgeColor: 'red', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHKdH0NTWZSXYms0sKz1yeGcRyd2WihpReYhg0-zx3viFDMIN0co5b0_gpOvKf-2oWiEydd3dBnqQAvLug37Q7w2O3gCYTXOCOXQ8H_x8Qa7X3MzRT7hfucAeIT1_KD5quiO57FoX3SDM66CPPV8ug6Hbj1DKYgUJ_gOmRn2VnC3bu7zPrIUNCiJqG1ZPVkZm6hwiZQDu9K38KW4bDzFoNzQ5GQQkC0gWCGVTerulnxEXOc7es8oCtG6ao1HfF_mkvM-naDQzTfiO-' },
	{ id: 2, name: 'Gấu bông Teddy Premium', category: 'Thú bông', price: 350000, rating: 5, reviews: 56, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX_Tj2y2mOfaDNlZwKZIcCBQxWJRW_ecLGZ3jQXz0yGaxH4nSPchD_AcFmDOUhTmg1MyQRoEWAiGb9oqvFhXMCsME5voAitshAwJjN4uBcPih1STuYSWwN_sndLa9qQcDmAeo6Ntss8ZcC5Zirz240XVgb4bnn5WhDw36xL1O2iX0J6MP_GW5gOPdTVh9MWbJWEa2HQMYK6CQImX_NfVEJ_aZW44wJOsXV_ClbnD-Yr6S9G8wm3j0y2voQik9BBOyCEVx2AgpsTWZn' },
	{ id: 3, name: 'Xe đua điều khiển từ xa', category: 'RC Car', price: 590000, rating: 4, reviews: 42, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_unHne53W9QO_poQHOK0i2emXJJLHwVjV5THzKxrlAXjn0w3Xks1XclI7cSEq1MBoT7lrKX-UUvZ0lk-zP7clXea0NNjCsBCI2s4YkAOA-0RnKkAt6MdgciOkheliCygzswtpDOo61J1aG79R15DpdoG0ItwiJ1dNjrciUiGi7qcasw0oMEYenEK8eIBepyvRxkVC44WU6JmSr9Ddx1cHkRJHf2ExHGbeZhz4b8SkMEe1aVhHus6ltVZtBMlQ82rQJ5v-0ALV0XMW' },
	{ id: 4, name: 'Bộ bếp gỗ cao cấp', category: 'Nhập vai', price: 2100000, rating: 5, reviews: 12, badge: 'Mới', badgeColor: 'blue', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGX9A2FbDK_njERv74SDt2w0IiQY57GIROY63aEGaY9lncavjrE9NLMoej6Ml1-CPMzf6rbX3w4BYAGE2DoUwgXQqXSGgNEIabOuSGZcMsm2dnIrUulBZhh5E3xx4ZHXW3fAYdwb2UYqS8EMdtm1AeGmUE9QZw6zMHIxj_A9m34fRCq8K2kpQ8ufJFBpo4BDzd5qu9cvame0wjU0fTmWpEVSnriZNVdtSKKPN0hQTV7_nWCC3a1UNWnc5pjM8Orv3xtUrfLOyT8fEx' }
])

// New products data
const newProducts = ref([
	{ id: 5, name: 'Bộ thí nghiệm khoa học', category: 'Khoa học', price: 300000, rating: 4, reviews: 8, badge: 'New', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzb-j6vudxmIo0l02y-mRueTXPPpe9fpjTAleRZl4jfQnvI_bPvEHkm46sM8cKyvZVjWNXk5wxKH9-PoCAaXVHJtIuQA5AIgN-pffYKHEd7GzmrB_IgWJxsJRpbzfAYnvknOYEL8W-f_WZeovCeBVhYfn1LOq5ZNnvVCLCrNIiLrUutGe-xfjQgHOsagbVo6Vde35tVtEnXFtBtWqdYrF8lQcEvSdzGCWP8KQfMLxWaZPThsjr61Ffo58dwb8vqTXM2yCdKRAZ1vx2' },
	{ id: 6, name: 'Búp bê thời trang Elsa', category: 'Búp bê', price: 450000, rating: 4.5, reviews: 24, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh_1xkCtSQxAE8sGaED9lNVio9XaOpvRNZau9oar55YLHKxVjsLKjP4bQrA3e_mkXq4tk4cvstRlin3qHFNeCfWUo6ZRGKWTvVM8H534dXcJSF2_FQj0e7XCopXHgg4A4aKmh40lApmR1d4CKEJ6W9Rnw5WJrbRSiIGj2w8TqTCCw_M4nnHMBHJ5CXqfiiJqzfIR8PftvzO9FzoukHpKwAOrAucnIBcVICv01qEwkNFOuDaAPZoVbIYIV9j2WQFrc2XCrtO-7nQn7_' },
	{ id: 7, name: 'Xếp hình gỗ thông minh', category: 'Gỗ & Puzzle', price: 180000, rating: 5, reviews: 15, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuRZ2f1572nK834XF26nxH_tFPqLVB0x4ref1t7WCfCPEPGjmlssD7KcEkbVd7Q56YNUnXOQxHu2AE90L-1XnQPxQLuGdw9YHvoRa_W0SbowftDzkl4o810FglkO02hEXM2iqy3AHzWTdVhuHaBYDDL4-Ozu0ECwGx7EDG55EaYa414G8lBucNlZNIlooHeISjwt6b8TXYSpkD-42GxCpsL7R_66ExWOUET0RXPvKwL2_ncCG2AVsv5kbMsx0kzCHF61INpMTjQCJr' },
	{ id: 8, name: 'Xe trượt Scooter', category: 'Vận động', price: 650000, rating: 4, reviews: 30, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV7GD5phGyO7l0aoMqcrmrycP2xJBNFMvM4NTRh6USGNzARJAT2f6-pJhYH5UZdfb-ij1dBbZqWIkWEuvg_Qkklp-EEBFw6L7szPZaqUNFvXhloSqeTspYGZ-t5o7XghcRkinFJWHAwzSuqbRXoGhJPK0FPY7Wqr4EqKO9hOx7-ha9oov2x6KsCTrs25aCDCQwunQugj3SG3pViJiKO7HPCF9ZzqSGZ33s0z9iXq9boc74N58EOUwsxTE2mUtIGKChP1K64Q1kaD2Q' }
])

// Methods
const isFavorite = (productId) => {
	return favorites.value.includes(productId)
}

const toggleFavorite = (product) => {
	const index = favorites.value.indexOf(product.id)
	if (index > -1) {
		favorites.value.splice(index, 1)
		favoriteMessage.value = 'Đã xóa khỏi danh sách yêu thích'
	} else {
		favorites.value.push(product.id)
		favoriteMessage.value = `Đã thêm "${product.name}" vào danh sách yêu thích`
	}
	showFavoriteSnackbar.value = true
}

const navigateToCategory = (id) => {
	console.log('Navigate to category:', id)
	// router.push(`/category/${id}`)
}

const viewProduct = (id) => {
	router.push(`/product/${id}`)
}

const addToCart = (product, event) => {
	// Create flying animation with dynamic element
	const button = event.currentTarget
	const productCard = button.closest('.product-card')
	const productImg = productCard?.querySelector('.product-image img') || productCard?.querySelector('.v-img img')
	
	if (productImg) {
		const imgRect = productImg.getBoundingClientRect()
		
		// Find cart icon - try multiple selectors
		const cartIcon = document.querySelector('.v-badge') || 
		                 document.querySelector('[class*="mdi-cart"]')?.closest('button') ||
		                 document.querySelector('.header-bar')
		
		if (cartIcon) {
			const cartRect = cartIcon.getBoundingClientRect()
			
			// Create a new flying image element dynamically
			const flyImg = document.createElement('img')
			flyImg.src = product.image
			flyImg.className = 'flying-product-img'
			flyImg.style.cssText = `
				position: fixed;
				left: ${imgRect.left}px;
				top: ${imgRect.top}px;
				width: ${imgRect.width}px;
				height: ${imgRect.height}px;
				object-fit: cover;
				border-radius: 8px;
				z-index: 9999;
				pointer-events: none;
				opacity: 1;
				transition: all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
				box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
			`
			
			// Add to document
			document.body.appendChild(flyImg)
			
			// Force reflow to ensure transition works
			flyImg.offsetHeight
			
			// Trigger animation
			requestAnimationFrame(() => {
				flyImg.style.left = cartRect.left + cartRect.width / 2 + 'px'
				flyImg.style.top = cartRect.top + cartRect.height / 2 + 'px'
				flyImg.style.width = '20px'
				flyImg.style.height = '20px'
				flyImg.style.opacity = '0'
			})
			
			// Remove element after animation
			setTimeout(() => {
				if (flyImg && flyImg.parentNode) {
					document.body.removeChild(flyImg)
				}
			}, 2500)
		}
	}
	
	// Add to cart
	cartStore.addToCart(product)
	addedProductName.value = product.name
	showAddToCartSnackbar.value = true
}

const handleSubscribe = () => {
	if (!email.value) {
		alert('Vui lòng nhập email')
		return
	}
	showNewsletterDialog.value = true
}

const goHome = () => {
	showNewsletterDialog.value = false
	email.value = ''
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

const goToShop = () => {
	router.push('/products')
}
</script>

<style scoped>
.home-page {
	background-color: #f8f7f6;
	min-height: 100vh;
}

/* Hero Section */
.hero-section {
	padding: 24px 0 40px;
}

.hero-card {
	min-height: 480px;
	background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%),
		url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvM4BPRGik846_t-6WTQSEIIngfrgDQdLNAuKHa36YD5WRvk_0Xow582j18aIz9WDSXZAvDiYwLJXI-9TryD0qg-MOGDneiotZGCsPUs55pPTRTs71uJvW0zumG6QzpIOEaL6Q1q7Jj7vqch0klpcCFWx_yVUqRhNtZJIz2bidaYgTq_ZN-ThMI-FjOZJoApL8vzPo6nT1io0bnkfD8fL-Z9dKTwb-k_Lu2ekFHs6nR_NQJ5G-0nfZ3ZbiD0jTcS1aTZCy0DzHOrdf');
	background-size: cover;
	background-position: center;
	position: relative;
	overflow: hidden;
}

.hero-content {
	position: relative;
	z-index: 2;
	padding: 48px;
	max-width: 600px;
}

.hero-badge {
	text-transform: uppercase;
	font-size: 11px;
	letter-spacing: 1px;
}

.hero-title {
	font-size: 48px;
	font-weight: 900;
	line-height: 1.2;
	color: white;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
	font-size: 18px;
	font-weight: 500;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.95);
	max-width: 500px;
	text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.hero-btn {
	box-shadow: 0 4px 12px rgba(238, 157, 43, 0.4) !important;
}

.hero-btn:hover {
	transform: scale(1.05);
	transition: transform 0.2s;
}

/* Features Section */
.features-section {
	padding: 0 0 48px;
}

.feature-card {
	padding: 20px;
	transition: transform 0.2s;
	border: 1px solid #f4f3f0;
}

.feature-card:hover {
	transform: translateY(-4px);
}

.feature-title {
	font-size: 14px;
	font-weight: 700;
	color: #181511;
	margin-bottom: 4px;
}

.feature-desc {
	font-size: 12px;
	color: #666;
	margin: 0;
}

/* Categories Section */
.categories-section {
	padding: 0 0 48px;
}

.section-title {
	font-size: 28px;
	font-weight: 700;
	color: #181511;
}

.category-item {
	cursor: pointer;
	text-align: center;
}

.category-card {
	transition: transform 0.3s;
	border: 1px solid #f4f3f0;
}

.category-card:hover {
	transform: translateY(-8px);
}

.category-name {
	font-size: 14px;
	font-weight: 600;
	color: #181511;
	margin-top: 12px;
	transition: color 0.2s;
}

.category-item:hover .category-name {
	color: #ee9d2b;
}

/* Deals Section */
.deals-section {
	padding: 0 0 48px;
}

.deal-link {
	color: #ef4444;
	font-size: 14px;
	font-weight: 700;
	text-decoration: none;
	display: flex;
	align-items: center;
	gap: 4px;
}

.deal-link:hover {
	color: #dc2626;
}

.deal-card {
	min-height: 220px;
	position: relative;
	overflow: hidden;
	padding: 32px;
	display: flex;
	align-items: center;
	border: 1px solid rgba(0, 0, 0, 0.05);
}

.deal-content {
	position: relative;
	z-index: 2;
	max-width: 60%;
}

.deal-title {
	font-size: 24px;
	font-weight: 700;
	color: #181511;
	margin-bottom: 8px;
}

.deal-text {
	font-size: 14px;
	color: #666;
	margin-bottom: 16px;
}

.deal-image {
	position: absolute;
	right: 0;
	bottom: 0;
	width: 50%;
	height: 100%;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: right bottom;
	opacity: 0.2;
	z-index: 1;
}

/* Products Section */
.products-section {
	padding: 0 0 48px;
}

.view-all-link {
	color: #ee9d2b;
	font-size: 14px;
	font-weight: 700;
	text-decoration: none;
	display: flex;
	align-items: center;
	gap: 4px;
}

.view-all-link:hover {
	color: #d88c22;
}

.product-card {
	cursor: pointer;
	transition: all 0.3s;
	border: 1px solid #f4f3f0;
}

.product-card:hover {
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
	transform: translateY(-4px);
}

.product-image-wrapper {
	position: relative;
	background-color: #f8f7f6;
}

.product-badge {
	position: absolute;
	top: 8px;
	left: 8px;
	z-index: 2;
	font-weight: 700;
}

.favorite-btn {
	position: absolute;
	top: 8px;
	right: 8px;
	z-index: 2;
}

.product-image {
	transition: transform 0.5s;
}

.product-card:hover .product-image {
	transform: scale(1.1);
}

.product-info {
	padding: 12px !important;
}

.product-category {
	font-size: 12px;
	color: #666;
	margin: 0 0 4px 0;
}

.product-name {
	font-size: 16px;
	font-weight: 700;
	color: #181511;
	line-height: 1.3;
	min-height: 42px;
	margin-bottom: 8px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.product-rating {
	display: flex;
	align-items: center;
	gap: 2px;
}

.rating-count {
	font-size: 12px;
	color: #999;
	margin-left: 4px;
}

.old-price {
	font-size: 12px;
	color: #999;
	text-decoration: line-through;
	margin: 0;
}

.product-price {
	font-size: 18px;
	font-weight: 700;
	color: #ee9d2b;
	margin: 0;
}

/* Birthday Banner */
.banner-section {
	padding: 0 0 64px;
}

.birthday-banner {
	min-height: 300px;
	background: linear-gradient(135deg, rgba(238, 157, 43, 0.1) 0%, rgba(238, 157, 43, 0.05) 100%);
	position: relative;
	overflow: hidden;
	padding: 48px;
}

.banner-content {
	position: relative;
	z-index: 2;
	max-width: 500px;
}

.banner-title {
	font-size: 36px;
	font-weight: 900;
	color: #181511;
	margin-bottom: 16px;
}

.banner-highlight {
	color: #ee9d2b;
}

.banner-text {
	font-size: 18px;
	color: #666;
	margin-bottom: 32px;
	line-height: 1.6;
}

.banner-bg {
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;
	background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDLUghlYcLS6lnYr6ul0A3p2f703V8pmI1EjJu_QzQWbY0fEn92CESFsnSxnPlHL-BnKmz7sh8UyQKxIbgbgEMZfohEBFNGMDsg3OMEqE_3XV6w5sLqySvZqS5WRFcDkCLVOLBe_TQyV6ypGd6fT8TVKzMZBOmxUBFvfyZj3RN7WWUKKvTg5WiBUAX3IRjcuYwdTmw1A7uwHLzguaeHBkkgTOR5pbHOVX9qaWuHpPiLBROfA-zh2vKgRkiI1XYaveG7RnRHOXi8fWN');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: right bottom;
	opacity: 0.2;
	z-index: 1;
}

/* Newsletter Section */
.newsletter-section {
	background-color: #181511;
	padding: 64px 0;
	margin-top: 0;
}

.newsletter-content {
	max-width: 600px;
	margin: 0 auto;
}

.newsletter-title {
	font-size: 32px;
	font-weight: 700;
	color: white;
	margin-bottom: 16px;
}

.newsletter-text {
	font-size: 16px;
	color: #999;
	margin-bottom: 0;
}

/* Newsletter Dialog */
.newsletter-dialog {
	position: relative;
	overflow: hidden;
}

.gradient-top {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 4px;
	background: linear-gradient(90deg, #ee9d2b 0%, #f5b95f 50%, #ee9d2b 100%);
}

.close-btn {
	position: absolute;
	top: 12px;
	right: 12px;
	z-index: 1;
}

.bounce-icon {
	animation: bounce 1s ease-in-out infinite;
}

@keyframes bounce {
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

/* Flying Product Animation */
.flying-product-img {
	position: fixed;
	width: 80px;
	height: 80px;
	object-fit: cover;
	border-radius: 8px;
	z-index: 9999;
	pointer-events: none;
	transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Mobile responsive */
@media (max-width: 960px) {
	.hero-content {
		padding: 32px 24px;
	}

	.hero-title {
		font-size: 32px;
	}

	.hero-subtitle {
		font-size: 16px;
	}

	.section-title {
		font-size: 24px;
	}

	.banner-title {
		font-size: 28px;
	}

	.banner-bg {
		display: none;
	}
}
</style>
