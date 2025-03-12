<template>
	<v-container>
		<FormCard
			v-if="announcement"
			title="Announcement"
			actionName="Update"
			:formFields="formFields"
			:action="updateAnnouncement"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getAnnouncement, updateAnnouncement } from "../api";
import { announcementDefaultFormFields } from "../config";
import { apiToFormDateTime } from "@/services/utils";

const props = defineProps({
	announcementId: {
		type: Number,
		required: true,
	},
});

const announcement = ref(null);
const formFields = ref([]);

onMounted(async () => {
	announcement.value = await getAnnouncement(props.announcementId);
	// Update model with default values from the existing announcement
	formFields.value = announcementDefaultFormFields.map((field) => ({
		...field,
		defaultValue:
			field.key === "release_at" || field.key === "expiry_at"
				? apiToFormDateTime(announcement.value[field.key])
				: announcement.value[field.key],
	}));
});
</script>
