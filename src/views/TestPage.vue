<template>
	<h1>
		Area for testing and fixing components
	</h1>
	<StudentSelect/>

</template>

<script setup>
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
const batchesOrCourses = ref("batches");
import { ref } from "vue";

// Initialize form data with default values
const formData = ref({
	title: "",
	description: "",
	priority: "low",
	is_active: true,
	is_universal: false,
	signed_by: null,
	release_at: null,
	expiry_at: null,
	batches: ["2354", "2"],
	courses: [],
	attachments: null,
});
</script>
