<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h6 class="text-h5">{{ classroom.name }} Members</h6>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6">
                    <GenericList :items="allTeachers" :config="teacherListConfig"
                        loading-text="Loading teachers..." title="Teachers" />
                </v-col>

                <!-- Join Code Section -->
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>Join Code: <v-chip color="primary" class="ml-2" label variant="outlined">{{ classroom.join_code }}</v-chip>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn color="primary" variant="outlined" @click="copyJoinCode">Copy</v-btn>
                            <v-btn color="primary" variant="outlined" @click="generateNewJoinCode">Generate New</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <!-- Students Section -->
            <v-row>
                <v-col cols="12">
                    <v-card>
                        <v-card-title>Students</v-card-title>
                        <v-card-text>
                            <ResponsiveDataTable :headers="studentHeaders" :fetch="fetchStudents"
                                :getToFunction="getStudentRoute" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ResponsiveDataTable from '@/components/ResponsiveDataTable.vue';
import GenericList from '@/components/GenericList.vue';
import { getClassroom } from '@/apps/classrooms/api';
import { getStudents } from '@/apps/students/api';
import { getTeachers, getTeacher } from '@/apps/teachers/api';

const route = useRoute();
const classroomId = computed(() => route.params.classroomId);
const classroom = ref({});
const loading = ref(true);
const allTeachers = ref([]);

// Student table headers
const studentHeaders = [
    { title: 'Name', key: 'user_details.full_name' },
    { title: 'ID', key: 'identifier' },
    { title: 'Email', key: 'user_details.email' },
    { title: 'Status', key: 'user_details.is_active', type: 'status' },
    { key: 'actions' }
];

// Configuration for teacher list
const teacherListConfig = {
    listItemTitle: 'user_details.full_name',
    listItemSubtitle: 'identifier',
    listItemChips: [
        { type: 'chip', label: 'Phone', key: 'phone', color: 'info' },
        { type: 'chip', label: 'Email', key: 'user_details.email', color: 'secondary' },
    ],
    lines: 'two',
    emptyMessage: 'No teachers assigned'
};

// Fetch classroom data
const fetchClassroomData = async () => {
    try {
        loading.value = true;
        classroom.value = await getClassroom(classroomId.value);
        await buildAllTeachers(); // Call this only after classroom data is loaded
    } catch (error) {
        console.error('Error fetching classroom data:', error);
    } finally {
        loading.value = false;
    }
};

// Build the list of all teachers
const buildAllTeachers = async () => {
    try {
        allTeachers.value = []; // Clear existing data first
        if (classroom.value.class_teacher_details) {
            allTeachers.value.push(classroom.value.class_teacher_details);
        }
        
        // Fetch other teachers if available
        if (classroom.value.other_teachers?.length > 0) {
            const teacherRequests = classroom.value.other_teachers.map((teacherId) => getTeacher(teacherId));
            const otherTeachers = await Promise.all(teacherRequests);
            allTeachers.value.push(...otherTeachers);
        }
    } catch (error) {
        console.error('Error building teacher list:', error);
    }
};

// Fetch students for the data table
const fetchStudents = async (params) => {
    try {
        const queryParams = { ...params, classroom: classroomId.value };
        return await getStudents(queryParams);
    } catch (error) {
        console.error('Error fetching students:', error);
        return { results: [], total_records: 0 };
    }
};

// Navigation function for student rows
const getStudentRoute = (student) => ({
    name: 'StudentDetail',
    params: { studentId: student.id }
});

// Ensure proper data fetching sequence
onMounted(fetchClassroomData);
</script>
