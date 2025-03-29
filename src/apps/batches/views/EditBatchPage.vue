<template>
	<v-container v-if="batch">
		<v-card>
			<v-card-title>Basic Details</v-card-title>
			<v-card-subtitle>Edit basic details of the batch</v-card-subtitle>
			<v-card-text>
				<v-form>
					<v-text-field label="Name" v-model="batch.name" />
					<v-text-field label="Standard" v-model="batch.standard" />
					<v-checkbox label="Is Active" v-model="batch.is_active" />
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-btn color="primary" @click="handleUpdateBatch">Update</v-btn>
				<v-btn color="warning">Discard Changes</v-btn>
			</v-card-actions>
		</v-card>
		<!-- <v-card class="column-item">
			<v-card-title>Teachers</v-card-title>
			<v-card-subtitle>Assign or remove teachers</v-card-subtitle>
			<v-card-text>
				<TeacherSelect v-model="batch.main_teacher" label="Main Teacher" />
				<TeacherSelect v-model="batch.other_teachers" label="Assisting Teachers" :multiple="true"/>
			</v-card-text>
		</v-card> -->
	</v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getBatch, updateBatch } from "../api";
import TeacherSelect from "../../teachers/components/TeacherSelect.vue";

const props = defineProps({
	batchId: {
		type: [Number, String],
		required: true,
	},
});

const batch = ref(null);

const handleUpdateBatch = async () => {
	try {
		await updateBatch(batch.value);
		return { success: true };
	} catch (error) {
		console.error("Failed to update batch:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	try {
		batch.value = await getBatch(props.batchId);
	} catch (error) {
		console.error("Failed to load batch on mount in EditBatchPage:", error);
	}
});
</script>
