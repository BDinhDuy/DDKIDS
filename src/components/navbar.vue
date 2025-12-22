<template>
	<nav class="navbar">
		<v-container class="nav-container">
			<div class="nav-tabs-wrapper">
				<div class="nav-tabs">
					<a
						v-for="tab in tabs"
						:key="tab.id"
						:class="['nav-tab', { active: activeTab === tab.id, promo: tab.isPromo }]"
						@click="handleTabClick(tab.id)"
					>
						<v-icon v-if="tab.icon" size="small" class="mr-1">{{ tab.icon }}</v-icon>
						<span>{{ tab.label }}</span>
					</a>
				</div>
			</div>
		</v-container>
	</nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref('home')

const tabs = ref([
	{ id: 'home', label: 'Trang chủ', path: '/' },
	{ id: 'girls', label: 'Bé gái', path: '/category/girls' },
	{ id: 'boys', label: 'Bé trai', path: '/category/boys' },
	{ id: 'lego', label: 'Lego & Lắp ráp', path: '/category/lego' },
	{ id: 'education', label: 'Học tập & Sách', path: '/category/education' },
	{ id: 'educational-toys', label: 'Đồ chơi giáo dục', path: '/category/educational' },
	{ id: 'promo', label: 'Khuyến mãi', path: '/promotions', icon: 'mdi-fire', isPromo: true }
])

const handleTabClick = (tabId) => {
	activeTab.value = tabId
	const tab = tabs.value.find(t => t.id === tabId)
	if (tab) {
		router.push(tab.path)
	}
}
</script>

<style scoped>
.navbar {
	background: white;
	border-top: 1px solid #f4f3f0;
	border-bottom: 1px solid #f4f3f0;
	position: relative;
	z-index: 40;
	margin-top: 65px;
}

.nav-container {
	padding-left: 40px !important;
	padding-right: 40px !important;
}

@media (max-width: 959px) {
	.nav-container {
		padding-left: 16px !important;
		padding-right: 16px !important;
	}
}

.nav-tabs-wrapper {
	overflow-x: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.nav-tabs-wrapper::-webkit-scrollbar {
	display: none;
}

.nav-tabs {
	display: flex;
	gap: 32px;
	min-width: max-content;
}

.nav-tab {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px 8px;
	border-bottom: 3px solid transparent;
	color: #897961;
	font-size: 14px;
	font-weight: 700;
	white-space: nowrap;
	cursor: pointer;
	transition: all 0.2s;
	text-decoration: none;
}

.nav-tab:hover {
	color: #ee9d2b;
	border-bottom-color: rgba(238, 157, 43, 0.3);
}

.nav-tab.active {
	color: #ee9d2b;
	border-bottom-color: #ee9d2b;
}

.nav-tab.promo {
	color: #ef4444;
}

.nav-tab.promo:hover {
	color: #dc2626;
}
</style>