<script setup>
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { onMounted, ref } from "vue";
import { getAnnouncement } from "../api";
import ActiveChip from "@/components/ActiveChip.vue";
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
	console.log(announcement.value)
});
</script>

<template>
    <v-card v-if="announcement" link :to="{ name: 'Announcement', params: { announcementId: announcement.id }}" variant="flat" class="border">
        <v-card-title class="text-subtitle-1">{{ announcement.title }}</v-card-title>
        <v-card-subtitle class="text-wrap">{{ announcement.description.slice(0, 100) }}...</v-card-subtitle>
        <v-card-text>
            <TeacherChip label="Signed by" :teacher="announcement.signed_by_details" v-if="announcement.signed_by_details" />
			<ActiveChip :isActive="announcement.is_active" />
        </v-card-text>
    </v-card>
</template>
