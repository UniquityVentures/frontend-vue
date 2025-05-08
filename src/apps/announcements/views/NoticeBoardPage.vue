<template>
	<v-container>
		<AnnouncementsLookup :filters="filters" :title="title" :subtitle="subtitle" :hideFilters="true"/>
	</v-container>
	<!-- <NoticeBoard :filters="filters" :title="title" :subtitle="subtitle"/> -->
</template>

<script setup>
import { ref, onMounted } from "vue";
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";
import AnnouncementsLookup from "@/apps/announcements/components/AnnouncementsLookup.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const filters = ref({});
const title = ref("Notice Board");
const subtitle = ref("");
const role = authStore.getRole;
if (role === "Admin") {
	filters.value = { is_active: true, is_universal: true };
	subtitle.value = "Universal Announcements";
} else {
	filters.value = { is_active: true };
	subtitle.value = "Announcements shown here";
}

</script>
