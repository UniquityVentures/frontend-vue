<template>
	<v-btn
		@click.prevent="dialogOpen = true"
		variant="outlined"
		prepend-icon="mdi-delete"
		:loading="isSubmitting"
		:disabled="isSubmitting"
		:append-icon="isSuccess ? 'mdi-check' : (error ? 'mdi-alert' : '')"
		:color="error ? 'error' : 'red'"
		>
		{{ isSuccess ? 'Deleted!' : (error ? 'Failed!' : label) }}
	</v-btn>

	<v-dialog max-width="500" v-model='dialogOpen'>
		<v-card :title="'Deleting ' + name">
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
					@click="deleteItem"
					prepend-icon="mdi-delete"
					:loading="isSubmitting"
					:disabled="isSubmitting"
					:append-icon="isSuccess ? 'mdi-check' : (error ? 'mdi-alert' : '')"
					:color="error ? 'error' : 'red'"
				>
					{{ isSuccess ? 'Deleted!' : (error ? 'Failed!' : 'Confirm Delete') }}
				</v-btn>
				<v-btn
					text="Cancel"
					@click="dialogOpen = false"
				></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { formatErrorMessage } from "@/services/utils";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
	action: Function,
	name: String,
	label: {
		type: String,
		default: "Delete",
	},
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
		} else {
			error.value = formatErrorMessage(result.error);
		}
		isSubmitting.value = false;
	} catch (err) {
		console.error(err);
		error.value = formatErrorMessage({ success: false, err });
	}
};
</script>
