<template>
    <v-card v-if="batch">
        <v-img :src="getBatchImage()" class="custom-img"></v-img>
        <v-card-title>
            {{ batch.name }}
        </v-card-title>
        <v-card-text>
            <span class="text-accent">Head Teacher:</span><br>
            <TeacherChip :teacher="batch.main_teacher_details" />
        </v-card-text>
        <v-card-text v-if="otherTeachers.length">
            <span class="text-accent">Other Teachers:</span><br>
            <TeacherChip v-for="teacher in otherTeachers" :key="teacher.id" :teacher="teacher"/>
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
import { getTeacher } from "@/apps/teachers/api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { onMounted, ref } from "vue";

const props = defineProps({ batchId: [Number, String], batch: Object });
const otherTeachers = ref([]);

const fetchOtherTeachers = async () => {
	if (!batch.value) {
		return
	}
	for (const teacherId of batch.value.other_teachers) {
		const teacher = await getTeacher(teacherId);
		otherTeachers.value.push(teacher);
	}
};

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
