<template>
    <v-card class="column-item">
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>

        <!-- Date Selection -->
        <v-card-text>
			<DateSelect
				v-model="attendanceDate"
				label="Attendance Date" 
				:rules="[v => !!v || 'Date is required']"
				required
			/>
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
                    <SubmitButton submitText="Mark Absent" :onSubmit="submitAttendance" />
                </v-card-actions>
            </v-card>
        </v-card-text>
    </v-card>
    <ResponsiveDataTable :fetch="getStudents" class="column-item"
        v-model:filters="filters" title="Select Absentees" subtitle="Select students who are absent"
        :templates="{ desktop: 'card', mobile: 'card' }">
        <template #filters-slot>
            <v-text-field label="Search" v-model="filters.name" />
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2" v-for="item in items" :key="item.id">
                    <v-card height="100%" :variant="isStudentSelected(item) ? 'tonal' : 'flat'"
                        :class="['border', { 'selected-student': isStudentSelected(item) }]"
                        @click="toggleStudentSelection(item)" style="cursor: pointer">
                        <v-card-title class="text-subtitle-1">
                            {{ item.name || item.user_details?.full_name }}
                        </v-card-title>
                        <v-card-subtitle>
                            Roll No: {{ item.roll_no }}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import DateSelect from "@/components/DateSelect.vue";
import { getStudents } from "@/apps/students/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { ref } from "vue";
import { bulkUpdateAttendance } from "../../attendance/api";
import { apiToFormDateTime } from "@/services/utils";

const props = defineProps({
	title: {
		type: String,
		default: "Attendance Marker",
	},
	subtitle: {
		type: String,
		default: "Select Date for marking attendance",
	},
    batch: {
        type: Object,
        required: true,
    }

});

// Data for date and course selection
const attendanceDate = ref(null);

const filters = ref({ batch: props.batch.id, sort_by: "roll_no" });
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
			attendance_data: attendanceData,
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
</script>

<style scoped>
.selected-student {
    background-color: rgba(244, 67, 54, 0.2) !important; /* Light red with transparency */
}
</style>
