<template>
	<NoticeBoard :filters="filters" :title="title" :subtitle="subtitle"/>
</template>

<script setup>
import { ref, onMounted } from "vue";
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const filters = ref({});
const title = ref("Notice Board");
const subtitle = ref("");
const role = authStore.getRole;
if (role === "Admin") {
	filters.value = { is_active: true, is_school_wide: true };
	subtitle.value = "School-Wide Announcements";
} else {
	filters.value = { is_active: true };
	subtitle.value = "Announcements shown here";
}

</script>
