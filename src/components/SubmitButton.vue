<template>
	<v-btn 
		@click="handleSubmit" 
		color="primary"
		:loading="isSubmitting"
		:disabled="isSubmitting"
		:append-icon="isSuccess ? 'mdi-check' : (error ? 'mdi-alert' : '')"
		:color="error ? 'error' : 'primary'"
	>
		{{ isSuccess ? 'Updated!' : (error ? 'Failed!' : submitText) }}
	</v-btn>
	<v-alert
		v-if="error"
		type="error"
		class="mt-2"
		density="compact"
	>
		{{ error }}
	</v-alert>
</template>

<script setup>
import { ref } from "vue";
import { formatErrorMessage } from "@/services/utils";

const props = defineProps({
	submitText: {
		type: String,
		default: "Update",
	},
	onSubmit: {
		type: Function,
		required: true,
	},
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const error = ref(null);


const handleSubmit = async () => {
	isSubmitting.value = true;
	isSuccess.value = false;
	error.value = null;

	try {
		const result = await props.onSubmit();
		if (result.success) {
			isSuccess.value = true;
		} else {
			error.value = formatErrorMessage(result.error);
		}
		isSubmitting.value = false;
	} catch (err) {
		error.value = formatErrorMessage({ success: false, err });
	}
};
</script>
