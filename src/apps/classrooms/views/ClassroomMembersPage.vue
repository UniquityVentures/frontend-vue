<template>
    <v-container>
    <v-card v-if="classroom">
        <v-card-title>
            Teachers
        </v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item class="ma-2 border" link prepend-icon="mdi-account">
                    <v-list-item-title>{{ classroom.teacher_details.user_details.full_name }}</v-list-item-title>
                    <v-list-item-subtitle>Class Teacher</v-list-item-subtitle>
                </v-list-item>
                <v-divider class="my-4"></v-divider>
                <v-list-item v-for="subject in subjects" :key="subject.id" class="ma-2 border" link prepend-icon="mdi-account"
                    :to="{ name: 'Teacher', params: { teacherId: subject.teacher_details?.id } }"
                >
                    <v-list-item-title>{{ subject.teacher_details?.user_details?.full_name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ subject.name }}</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
    </v-container>
    <v-container>
        <v-card v-if="classroom">
            <v-card-title>
                Students
        </v-card-title>
        <v-card-text>
            <ResponsiveDataTable
                :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id }})"
                :headers="studentHeaders"
                :fetch="getStudents"
                v-model="studentFilters"
            />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStudents, studentHeaders } from "@/apps/students/api";
import { getClassroom } from "@/apps/classrooms/api";
import { getSubject } from "@/apps/subjects/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

const props = defineProps({
    classroomId: Number,
});

const classroom = ref(null);
const subjects = ref([]);

const studentFilters = ref({
    classroom: props.classroomId,
});

onMounted(async () => {
    classroom.value = await getClassroom(props.classroomId);
    for (const subject of classroom.value.subjects) {
        subjects.value.push(await getSubject(subject));
    }
});
</script>