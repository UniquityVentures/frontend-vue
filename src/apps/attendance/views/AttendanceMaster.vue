<template>
  <v-container>
    <v-card class="mb-4">
      <v-card-title>Attendance Master</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="attendanceDate"
              label="Attendance Date"
              type="date"
              variant="outlined"
              :rules="[v => !!v || 'Date is required']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="selectedCourse"
              label="Select Course (Optional)"
              :items="courses"
              item-title="name"
              item-value="id"
              variant="outlined"
              clearable
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Selected Students Section -->
    <v-card v-if="selectedStudents.length > 0" class="mb-4">
      <v-card-title>
        Selected Students ({{ selectedStudents.length }})
        <v-spacer></v-spacer>
        <v-btn color="error" @click="clearSelection">Clear Selection</v-btn>
      </v-card-title>
      <v-card-text>
        <v-chip-group>
          <v-chip
            v-for="student in selectedStudents"
            :key="student.id"
            closable
            @click:close="toggleStudentSelection(student)"
          >
            {{ student.name }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>Mark Absent Students</v-card-title>
      <v-card-subtitle>Select students who are absent for the selected date</v-card-subtitle>
      
      <FilterCard :fields="filterFields" />
      
      <ResponsiveDataTable 
        :getToFunction="() => ({})"
        :headers="studentHeaders"
        :fetch="getStudents"
        v-model="filters"
        desktopTemplate="card"
      >
        <template #card-item-slot="{ item }">
          <v-card height="100%" variant="flat" class="border pa-2">
            <div class="d-flex align-center mb-2">
              <v-checkbox
                :model-value="isStudentSelected(item)"
                @update:model-value="() => toggleStudentSelection(item)"
                hide-details
                density="compact"
                class="mr-2"
              ></v-checkbox>
              <v-card-title class="text-subtitle-1 pa-0">
                {{ item.name }}
              </v-card-title>
            </div>
            <v-card-subtitle class="pa-0">
              Roll No: {{ item.roll_number }}
            </v-card-subtitle>
            <v-card-text class="pa-0 pt-2">
              <BatchChip v-if="item.batch" :batch="item.batch" />
            </v-card-text>
          </v-card>
        </template>
      </ResponsiveDataTable>
    </v-card>

    <div class="d-flex justify-end mt-4">
      <SubmitButton
        submitText="Mark Attendance"
        :onSubmit="submitAttendance"
      />
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ResponsiveDataTable from '@/components/ResponsiveDataTable.vue';
import FilterCard from '@/components/FilterCard.vue';
import BatchChip from '@/apps/batches/components/BatchChip.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import { getStudents } from '@/apps/students/api';
import { getCourses } from '@/apps/courses/api';
import { bulkUpdateAttendance } from '../api';
import { studentDefaultFilterFields } from '@/apps/students/config';

// State
const attendanceDate = ref(new Date().toISOString().substr(0, 10));
const selectedStudents = ref([]);
const courses = ref([]);
const selectedCourse = ref(null);

// Student table configuration
const studentHeaders = [
  { key: 'name', label: 'Name', type: 'string' },
  { key: 'roll_number', label: 'Roll No', type: 'string' },
  { key: 'batch', label: 'Batch', type: 'batch' }
];

// Filter fields
const filterFields = ref(studentDefaultFilterFields);

// Computed filters from filter fields
const filters = computed(() => {
  return filterFields.value.reduce((acc, field) => {
    if (Array.isArray(field.key)) {
      field.key.forEach((k, i) => {
        acc[k] = field.value?.[i] ?? null;
      });
    } else {
      acc[field.key] = field.value;
    }
    return acc;
  }, {});
});

// Methods
const isStudentSelected = (student) => {
  return selectedStudents.value.some(s => s.id === student.id);
};

const toggleStudentSelection = (student) => {
  if (isStudentSelected(student)) {
    selectedStudents.value = selectedStudents.value.filter(s => s.id !== student.id);
  } else {
    selectedStudents.value.push(student);
  }
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
    
    return { success: true };
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