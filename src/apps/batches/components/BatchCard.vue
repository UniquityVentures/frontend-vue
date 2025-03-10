<template>
    <v-card v-if="batch">
        <!-- Batch Image -->
        <v-img :src="getBatchImage()" class="custom-img"></v-img>

        <!-- Batch Title -->
        <v-card-title>
            {{ batch.name }}
        </v-card-title>

        <!-- Batch Info -->
        <v-card-text>
            <span class="text-primary">Class Teacher:</span><br>
            <TeacherChip :teacher="batch.class_teacher_details" />
        </v-card-text>

        <v-card-text v-if="otherTeachers.length">
            <span class="text-primary">Other Teachers:</span><br>
            <TeacherChip v-for="teacher in otherTeachers" :key="teacher.id" :teacher="teacher"/>
        </v-card-text>

        <v-card-text>
            <!-- Grade -->
            <!-- Grade -->
            <v-chip color="primary" size="small" label>Grade: {{ batch.standard }}</v-chip>
            <!-- Number of Students -->
            <v-chip color="primary" size="small" variant="outlined" label>Number of Students: {{ batch.students.length }}</v-chip>
            <!-- Is Active Status -->
            <v-chip :color="batch.is_active ? 'success' : 'error'" size="small" label>Status: {{ batch.is_active ? 'Active' : 'Inactive' }}</v-chip>
            <!-- Join Code -->
            <v-chip color="success" label variant="outlined">Join Code: {{ batch.join_code }}</v-chip>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { getBatch, getBatchImage } from "@/apps/batches/api";
import { onMounted, ref } from "vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { getTeacher } from "@/apps/teachers/api";

const batch = ref(null);
const props = defineProps({ batchId: Number });
const otherTeachers = ref([]);

const fetchOtherTeachers = async () => {
    for (const teacherId of batch.value.other_teachers) {
        const teacher = await getTeacher(teacherId);
        otherTeachers.value.push(teacher);
    }
}

onMounted(async () => {
    batch.value = await getBatch(props.batchId);
    await fetchOtherTeachers();
});
</script>

<style scoped>
.custom-img {
    object-fit: cover;
}
</style>
