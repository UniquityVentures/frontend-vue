<template>
    <v-card v-if="classroom">
        <!-- Classroom Image -->
        <v-img :src="getClassroomImage()" class="custom-img"></v-img>

        <!-- Classroom Title -->
        <v-card-title>
            {{ classroom.name }}
        </v-card-title>

        <!-- Classroom Info -->
        <v-card-text>
            <span class="text-primary">Class Teacher:</span><br>
            <TeacherChip :teacher="classroom.class_teacher_details" />
        </v-card-text>

        <v-card-text v-if="otherTeachers.length">
            <span class="text-primary">Other Teachers:</span><br>
            <TeacherChip v-for="teacher in otherTeachers" :key="teacher.id" :teacher="teacher"/>
        </v-card-text>

        <v-card-text>
            <!-- Grade -->
            <!-- Grade -->
            <v-chip color="primary" size="small" label>Grade: {{ classroom.standard }}</v-chip>
            <!-- Number of Students -->
            <v-chip color="primary" size="small" variant="outlined" label>Number of Students: {{ classroom.students.length }}</v-chip>
            <!-- Is Active Status -->
            <v-chip :color="classroom.is_active ? 'success' : 'error'" size="small" label>Status: {{ classroom.is_active ? 'Active' : 'Inactive' }}</v-chip>
            <!-- Join Code -->
            <v-chip color="success" label variant="outlined">Join Code: {{ classroom.join_code }}</v-chip>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { getClassroom, getClassroomImage } from "@/apps/classrooms/api";
import { onMounted, ref } from "vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import { getTeacher } from "@/apps/teachers/api";

const classroom = ref(null);
const props = defineProps({ classroomId: Number });
const otherTeachers = ref([]);

const fetchOtherTeachers = async () => {
    for (const teacherId of classroom.value.other_teachers) {
        const teacher = await getTeacher(teacherId);
        otherTeachers.value.push(teacher);
    }
}

onMounted(async () => {
    classroom.value = await getClassroom(props.classroomId);
    await fetchOtherTeachers();
});
</script>

<style scoped>
.custom-img {
    object-fit: cover;
}
</style>
