<script setup>
import { onMounted, ref } from "vue";
import { getBatch, deleteBatch } from "../api";

import DeleteButton from "@/components/DeleteButton.vue";

const props = defineProps({
	batch: {
		type: [Object],
	},
	batchId: {
		type: [String, Number],
	},
});

const batch = ref(null);

// Fetch batch data when component mounts
onMounted(async () => {
	if (props.batchId) {
		batch.value = await getBatch(props.batchId);
	} else {
		batch.value = props.batch;
	}
});
</script>

<template>
    <v-card v-if="batch" link :to="{ name: 'Batch', params: { batchId: batch.id }}" variant="flat" class="border">
        <v-card-title class="text-subtitle-1">{{ batch.name }}</v-card-title>
        <v-card-subtitle>{{ batch.main_teacher_details?.user_details?.full_name || "Loading..." }}</v-card-subtitle>
        <v-card-text>
            <v-chip prepend-icon="mdi-account-group" color="primary">
                No of Students: {{ batch.students.length }}
            </v-chip>
            <v-chip prepend-icon="mdi-book-open-variant" color="blue">
                No. of Courses: {{ batch.courses.length }}
            </v-chip>
        </v-card-text>
		<v-card-actions>
				<DeleteButton :action="() => deleteBatch(batch?.id)" :name="'batch ' + batch?.name" />
		</v-card-actions>
    </v-card>
</template>
