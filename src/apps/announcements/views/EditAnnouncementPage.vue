<template>
	<v-container>
		<AnnouncementForm
			v-if="announcement"
			actionName="Update"
			:action="updateAnnouncement"
			:announcement="announcement"
		/>
	</v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAnnouncement, updateAnnouncement } from "../api";
import AnnouncementForm from "../components/AnnouncementForm.vue";

const props = defineProps({
	announcementId: {
		type: Number,
		required: true,
	},
});

const announcement = ref(null);

onMounted(async () => {
	announcement.value = await getAnnouncement(props.announcementId);
});
</script>
