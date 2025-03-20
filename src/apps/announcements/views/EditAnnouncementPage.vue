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
import { apiToFormDateTime } from "@/services/utils";

const props = defineProps({
	announcementId: {
		type: Number,
		required: true,
	},
});

const announcement = ref(null);

const formFields = ref([
    { label: "Title", type: "string", key: "title", required: true },
    { label: "Description", type: "longstring", key: "description", required: true },
    { label: "Priority", type: "string", key: "priority", defaultValue: "low" },
    { label: "Is Active", type: "boolean", key: "is_active", defaultValue: true },
    { label: "Is School Wide", type: "boolean", key: "is_school_wide", defaultValue: false },
    { label: "Signed By", type: "teacher", key: "signed_by", required: true },
    { label: "Release Date", type: "datetime", key: "release_at", required: true },
    { label: "Expiry Date", type: "datetime", key: "expiry_at", required: true },
    { label: "Batches", type: "batch", key: "batches", multiple: true, defaultValue: [] },
    { label: "Attach Files", type: "attachment_list", key: "attachments", defaultValue: null },
]);

onMounted(async () => {
	announcement.value = await getAnnouncement(props.announcementId);
	// Update model with default values from the existing announcement
	formFields.value = formFields.value.map((field) => ({
		...field,
		defaultValue:
			field.key === "release_at" || field.key === "expiry_at"
				? apiToFormDateTime(announcement.value[field.key])
				: announcement.value[field.key],
	}));
});
</script>
