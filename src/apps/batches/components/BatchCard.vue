<template>
    <v-card v-if="batch">
        <v-img :src="getBatchImage()" class="custom-img"></v-img>
        <v-card-title>
            {{ batch.name }}
        </v-card-title>
        <v-card-text>
            <span class="text-accent">Teachers:</span><br>
            <TeacherChip :teacher="batch.teachers_details" />
        </v-card-text>
        <v-card-text>
            <v-chip color="accent" >Grade: {{ batch.standard }}</v-chip>
            <v-chip color="accent" >Number of Students: {{ batch.students.length }}</v-chip>
            <v-chip color="accent" >Number of Courses: {{ batch.courses.length }}</v-chip>
            <v-chip :color="batch.is_active ? 'success' : 'error'" >Status: {{ batch.is_active ? 'Active' : 'Inactive' }}</v-chip>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { getBatch, getBatchImage } from "@/apps/batches/api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { onMounted, ref } from "vue";

const props = defineProps({ batchId: [Number, String], batch: Object });
const batch = ref(null);

onMounted(async () => {
	if (props.batchId) {
		batch.value = await getBatch(props.batchId);
	} else {
		batch.value = props.batch;
	}
});
</script>

<style scoped>
.custom-img {
    object-fit: cover;
}
</style>
