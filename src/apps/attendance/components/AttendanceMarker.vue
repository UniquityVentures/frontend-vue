<template>
    <ResponsiveDataTable :fetch="getStudents" class="column-item"
        v-model:filters="filters" title="Select Absentees" subtitle="Select students who are absent"
        :templates="{ desktop: 'card', mobile: 'card' }">
        <template #filters-slot>
            <v-text-field label="Search" v-model="filters.name" />
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" sm="6" md="4" lg="3" v-for="item in items" :key="item.id">
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
                                :batchId="item.batch || item.batch_details" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
    <v-card>
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
</template>

<script setup>
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import { getCourses } from "@/apps/courses/api";
import { exportStudents, getStudents } from "@/apps/students/api";
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { onMounted, ref } from "vue";
import { bulkUpdateAttendance } from "../api";

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
	},
});

// Data for date and course selection
const attendanceDate = ref(new Date().toISOString().substr(0, 10));
const courses = ref([]);
const selectedCourse = ref(null);

const filters = ref({});
const selectedStudents = ref([]);

// Methods
const isStudentSelected = (student) => {
	return selectedStudents.value.some((s) => s.id === student.id);
};

const toggleStudentSelection = (student) => {
	if (isStudentSelected(student)) {
		removeStudent(student);
	} else {
		selectedStudents.value.push(student);
	}
};

const removeStudent = (student) => {
	selectedStudents.value = selectedStudents.value.filter(
		(s) => s.id !== student.id,
	);
};

const clearSelection = () => {
	selectedStudents.value = [];
};

const fetchCourses = async () => {
	try {
		const response = await getCourses();
		courses.value = response.results;
	} catch (error) {
		console.error("Failed to fetch courses:", error);
	}
};

const submitAttendance = async () => {
	try {
		if (!attendanceDate.value) {
			return { success: false, error: "Please select a date" };
		}

		if (selectedStudents.value.length === 0) {
			return { success: false, error: "Please select at least one student" };
		}

		// Get selected student IDs
		const selectedStudentIds = selectedStudents.value.map(
			(student) => student.id,
		);

		// Build attendance data payload
		const attendanceData = selectedStudentIds.map((id) => ({
			student: id,
			status: "absent",
			reason: "",
		}));

		// API request payload
		const payload = {
			date: attendanceDate.value,
			course: selectedCourse.value,
			attendance_data: attendanceData,
			mark_others_present: true, // Tell backend to mark others as present
		};

		await bulkUpdateAttendance(payload);
		clearSelection();

		return { success: true, message: "Attendance marked successfully" };
	} catch (error) {
		console.error("Error submitting attendance:", error);
		return {
			success: false,
			error: error.message || "Failed to submit attendance",
		};
	}
};

// Initialize
onMounted(() => {
	fetchCourses();
});
</script>

<style scoped>
.selected-student {
    background-color: rgba(244, 67, 54, 0.2) !important; /* Light red with transparency */
}
</style>
