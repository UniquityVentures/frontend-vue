<template>
	<v-btn
		@click="dialogOpen = true"
		variant="outlined"
		prepend-icon="mdi-delete"
		:loading="isSubmitting"
		:disabled="isSubmitting"
		:append-icon="isSuccess ? 'mdi-check' : (error ? 'mdi-alert' : '')"
		:color="error ? 'error' : 'primary'"
		color="error">
		{{ isSuccess ? 'Deleted!' : (error ? 'Failed!' : label) }}
	</v-btn>

	<v-dialog max-width="500" v-model='dialogOpen'>
		<v-card title="Dialog">
			<v-card-text>
				<p>Are you sure you want to delete {{name ? name : "this item"}}?</p>	
				<p>This action is irreversible</p>	
				<v-alert
					v-if="error"
					type="error"
					class="mt-2"
					density="compact"
				>
					{{ error }}
				</v-alert>
			</v-card-text>

			<v-card-actions>
				<v-btn
					text="Confirm Delete"
					@click="deleteItem"
				></v-btn>
				<v-btn
					text="Cancel"
					@click="dialogOpen = false"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { formatErrorMessage } from "@/services/utils";

const props = defineProps({
	action: Function,
	name: String,
	label: {
		type: String,
		default: "Delete"
	}
});
const router = useRouter();

const dialogOpen = ref(false);
const error = ref(null);
const isSubmitting = ref(false);
const isSuccess = ref(false);

const emit = defineEmits(["deleted"]);

const deleteItem = async () => {
	isSubmitting.value = true;
	isSuccess.value = false;
	error.value = null;

	try {
		const result = await props.action();
		if (!result.error) {
			isSuccess.value = true;
			dialogOpen.value = false;
			emit("deleted");
			router.back();
		} else {
			error.value = formatErrorMessage(result.error);
		}
		isSubmitting.value = false;
	} catch (err) {
		console.log(err);
		error.value = formatErrorMessage({ success: false, err });
	}
};
</script>
