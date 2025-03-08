<template>
	<v-container>
		<FormCard
			v-if="subject"
			title="Subject"
			actionName="Update"
			:model="model"
			:action="handleUpdate"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getSubject, updateSubject } from "../api";
import { subjectDefaultFormFields } from "@/apps/subjects/config";

const props = defineProps({
	subjectId: {
		type: Number,
		required: true,
	},
});

const subject = ref(null);
const model = ref([]);

const handleUpdate = async (formData) => {
	try {
		await updateSubject(props.subjectId, formData);
		return { success: true };
	} catch (error) {
		console.error("Failed to update subject:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	subject.value = await getSubject(props.subjectId);
	
	// Use the default form fields from config but add default values from the existing subject
	model.value = subjectDefaultFormFields.map((field) => ({
		...field,
		defaultValue: subject.value[field.key],
	}));
});
</script>
