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
		class="align-center"
		density="compact"
	>
		<span v-if="typeof error === 'string'">
			{{ error }}
		</span>
		<span v-else>
			<ul>
				<li v-for="err in error">{{ err }}</li>
			</ul>
		</span>
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

	props
		.onSubmit()
		.then((response) => {
			if (
				(typeof response.success === "boolean" && !response.success) |
				response.error |
				response.errors
			) {
				isSuccess.value = response.false;
				error.value = formatErrorMessage(response.error);
				console.log(error.value);
			}
			isSubmitting.value = false;
		})
		.catch((err) => {
			error.value = formatErrorMessage(err);
			isSubmitting.value = false;
		});
};
</script>
