<template>
	<v-container>
		<FormCard
			title="Announcement"
			actionName="Create"
			:formFields="formFields"
			:action="createAnnouncement"
		/>
	</v-container>
</template>

<script setup>
import { ref } from "vue";
import FormCard from "@/components/FormCard.vue";
import { createAnnouncement } from "@/apps/announcements/api";

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
    { label: "Courses", type: "course", key: "courses", multiple: true, defaultValue: [] },
    { label: "Attach Files", type: "attachment_list", key: "attachments", defaultValue: null },
]);

</script>
