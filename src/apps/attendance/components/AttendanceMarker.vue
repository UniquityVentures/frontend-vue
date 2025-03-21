<template>
    <v-card class="mb-4">
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>

        <!-- Date Selection -->
        <v-card-text>
            <v-text-field v-model="attendanceDate" label="Attendance Date" type="date" variant="outlined"
                :rules="[v => !!v || 'Date is required']"></v-text-field>
        </v-card-text>

        <!-- Selected Students Section -->
        <v-card-text>
            <v-card variant="flat" class="border">
                <v-card-title>
                    Selected Students
                </v-card-title>
                <v-card-subtitle>
                    {{ selectedStudents.length }} students selected
                </v-card-subtitle>
                <v-card-text>
                    <div class="d-flex flex-wrap">
                        <v-chip v-for="student in selectedStudents" :key="student.id" closable
                            @click:close="removeStudent(student)">
                            {{ student.name || student.user_details?.full_name }}
                        </v-chip>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="error" @click="clearSelection">Clear Selection</v-btn>
                    <SubmitButton submitText="Mark Absent" :onSubmit="submitAttendance"
                        :disabled="selectedStudents.length === 0 || !attendanceDate" />
                </v-card-actions>
            </v-card>
        </v-card-text>
    </v-card>

    <v-card>
        <v-card-title>
            Select Absentees
        </v-card-title>
        <v-card-subtitle>
            Select students who are absent
        </v-card-subtitle>

        <!-- Filters -->
        <v-card-text>
            <FilterCard :fields="fields" :exportFunction="exportStudents" v-model:filters="filters" />
        </v-card-text>

        <!-- Student List -->
        <v-card-text>
            <ResponsiveDataTable :getToFunction="getToFunction" :headers="defaultHeaders" :fetch="getStudents"
                v-model:filters="filters" desktopTemplate="card" mobileTemplate="card">
                <template #card-item-slot="{ item }">
                    <v-card height="100%" :variant="isStudentSelected(item) ? 'tonal' : 'flat'"
                        :class="['border', { 'selected-student': isStudentSelected(item) }]"
                        @click="toggleStudentSelection(item)" style="cursor: pointer">
                        <v-card-title class="text-subtitle-1">
                            {{ item.name || item.user_details?.full_name }}
                        </v-card-title>
                        <v-card-subtitle>
                            Student No: {{ item.student_no }}
                        </v-card-subtitle>
                        <v-card-text>
                            <BatchChip v-if="item.batch || item.batch_details"
                                :batch="item.batch || item.batch_details" />
                        </v-card-text>
                    </v-card>
                </template>
            </ResponsiveDataTable>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStudents, exportStudents } from "@/apps/students/api";
import { getCourses } from "@/apps/courses/api";
import { bulkUpdateAttendance } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
    title: {
        type: String,
        default: "Attendance Marker",
    },
    subtitle: {
        type: String,
        default: "Select Date for marking attendance",
    },
    overrideFields: {
        type: Array,
        default: null,
    },
    getToFunction: {
        type: Function,
        default: () => ({}),
    }
});

// Data for date and course selection
const attendanceDate = ref(new Date().toISOString().substr(0, 10));
const courses = ref([]);
const selectedCourse = ref(null);

// Default student headers
const defaultHeaders = [
    { label: "Name", key: "user_details.full_name" },
    { label: "Roll Number", key: "roll_no", type: "string" },
    { label: "Batch", key: "batch_details", type: "batch" },
];

// Default filter fields
const defaultFilterFields = [
    { label: "Search by name", type: FIELD_TYPES.STRING, key: "name", value: "", defaultValue: "" },
    { label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batch", value: null },
    {
        label: "Filter by grade level", type: FIELD_TYPES.N_NARY, key: "grade_level", value: null,
        fetchOptions: () => [
            { title: "All Grades", value: null },
            { title: "Grade 1", value: "1" },
            { title: "Grade 2", value: "2" },
            { title: "Grade 3", value: "3" },
            { title: "Grade 4", value: "4" },
            { title: "Grade 5", value: "5" },
            { title: "Grade 6", value: "6" },
            { title: "Grade 7", value: "7" },
            { title: "Grade 8", value: "8" },
            { title: "Grade 9", value: "9" },
            { title: "Grade 10", value: "10" },
            { title: "Grade 11", value: "11" },
            { title: "Grade 12", value: "12" },
        ]
    },
    {
        label: "Filter by status", type: FIELD_TYPES.N_NARY, key: "status", value: null,
        fetchOptions: () => [
            { title: "All Students", value: null },
            { title: "Active", value: "active" },
            { title: "Inactive", value: "inactive" },
            { title: "Pending", value: "pending" },
        ]
    },
];

// Initialize fields with proper reactivity handling
const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});
const selectedStudents = ref([]);

// Methods
const isStudentSelected = (student) => {
    return selectedStudents.value.some(s => s.id === student.id);
};

const toggleStudentSelection = (student) => {
    if (isStudentSelected(student)) {
        removeStudent(student);
    } else {
        selectedStudents.value.push(student);
    }
};

const removeStudent = (student) => {
    selectedStudents.value = selectedStudents.value.filter(s => s.id !== student.id);
};

const clearSelection = () => {
    selectedStudents.value = [];
};

const fetchCourses = async () => {
    try {
        const response = await getCourses();
        courses.value = response.results;
    } catch (error) {
        console.error('Failed to fetch courses:', error);
    }
};

const submitAttendance = async () => {
    try {
        if (!attendanceDate.value) {
            return { success: false, error: 'Please select a date' };
        }

        if (selectedStudents.value.length === 0) {
            return { success: false, error: 'Please select at least one student' };
        }

        // Get selected student IDs
        const selectedStudentIds = selectedStudents.value.map(student => student.id);

        // Build attendance data payload
        const attendanceData = selectedStudentIds.map(id => ({
            student: id,
            status: 'absent',
            reason: ''
        }));

        // API request payload
        const payload = {
            date: attendanceDate.value,
            course: selectedCourse.value,
            attendance_data: attendanceData,
            mark_others_present: true  // Tell backend to mark others as present
        };

        await bulkUpdateAttendance(payload);
        clearSelection();

        return { success: true, message: 'Attendance marked successfully' };
    } catch (error) {
        console.error('Error submitting attendance:', error);
        return {
            success: false,
            error: error.message || 'Failed to submit attendance'
        };
    }
};

// Initialize
onMounted(() => {
    fetchCourses();
});
</script>
