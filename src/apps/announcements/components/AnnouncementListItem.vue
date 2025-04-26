<script setup>
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { onMounted, ref } from "vue";
import { getAnnouncement } from "../api";

import { accountRoute } from "@/services/api";

const props = defineProps({
	announcementId: [Number, String],
	announcement: Object,
});

const announcement = ref(null);

onMounted(async () => {
	if (props.announcementId) {
		announcement.value = await getAnnouncement(props.announcementId);
	} else {
		announcement.value = props.announcement;
	}
});
</script>

<template>
<v-list-item link :to="accountRoute('Announcement', {params: { announcementId: announcement.id }})" class="border" v-if="announcement">
        <v-list-item-title>{{ announcement.title }}</v-list-item-title>
        <v-list-item-subtitle class="text-wrap">{{ announcement.description }}</v-list-item-subtitle>
		<TeacherChip label="Signed by" :teacher="announcement.signed_by_details" v-if="announcement.signed_by_details" />
    </v-list-item>
</template>
