<template>
    <v-card v-if="classroom">
        <!-- Classroom Image -->
        <v-img :src="getClassroomImage()" class="custom-img"></v-img>

        <!-- Classroom Title -->
        <v-card-title class="text-h5">
            {{ classroom.name }}
        </v-card-title>

        <!-- Classroom Info -->
        <v-card-text>
            <!-- Class Teacher -->
            <div class="mb-2">
                <span class="text-primary mr-2">Class Teacher:</span>
                <div class="d-flex flex-wrap mt-1">
                    <TeacherChip :teacher="classroom.class_teacher_details" />
                </div>
            </div>

            <!-- Other Teachers -->
            <div v-if="classroom.other_teachers.length" class="mb-2">
                <span class="text-primary">Other Teachers:</span>
                <div class="d-flex flex-wrap mt-1">
                    <TeacherChip v-for="teacher in otherTeachers" :key="teacher.id" :teacher="teacher" class="mr-2"/>
                </div>
            </div>



            <v-divider class="my-2" color="dark"></v-divider>

            <!-- Grade -->
            <v-chip
                color="primary"
                size="small"
                label
                class="mr-2"
            >
                Grade: {{ classroom.standard }}
            </v-chip>

            <!-- Number of Students -->
            <v-chip
                color="primary"
                size="small"
                variant="outlined"
                label
            >
                Number of Students: {{ classroom.students.length }}
            </v-chip>

            <!-- Join Code -->
            <v-chip
                class="mt-2 mr-2"
                color="success"
                size="small"
                label
                variant="outlined"
            >
                Join Code: {{ classroom.join_code }}
            </v-chip>

            <!-- Is Active Status -->
            <v-chip
                :color="classroom.is_active ? 'success' : 'error'"
                size="small"
                label
                class="mt-2 mr-2"
            >
                Status: {{ classroom.is_active ? 'Active' : 'Inactive' }}
            </v-chip>
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
