<template>
	<v-btn @click="handleSubmit" :loading="isSubmitting" :disabled="isSubmitting"
		:append-icon="isSuccess ? 'mdi-check' : (error ? 'mdi-alert' : '')" :color="error ? 'error' : color">
		{{ isSuccess ? successText : (error ? 'Failed!' : submitText) }}
	</v-btn>
	<v-alert v-if="error" type="error" class="align-center" density="compact">
		<span v-if="typeof error === 'string'">
			{{ error }}
		</span>
		<span v-else>
			<ul>
				<li v-for="err in error" :key="err" >{{ err }}</li>
			</ul>
		</span>
	</v-alert>
</template>

<script setup>
import { formatErrorMessage } from "@/services/utils";
import { ref } from "vue";

const props = defineProps({
	submitText: {
		type: String,
		default: "Update",
	},
	onSubmit: {
		type: Function,
		required: true,
	},
	color: {
		type: String,
		default: "primary",
	},
	successText: {
		type: String,
		default: "Updated!"
	}
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
				isSuccess.value = false;
				error.value = formatErrorMessage(response.error);
				console.error(error.value);
				isSubmitting.value = false;
				return
			}
			isSubmitting.value = false;
			isSuccess.value = true;
			setTimeout(() => {
				isSuccess.value = false;
				error.value = false;
			}, 2000);
		})
		.catch((err) => {
			console.error(err);
			error.value = formatErrorMessage(err);
			isSubmitting.value = false;
			isSuccess.value = false;
		});
};
</script>
