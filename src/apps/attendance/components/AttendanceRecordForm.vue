<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <StudentSelect
            label="Student"
            v-model="formData.student"
            :rules="[v => !!v || 'Student is required']"
            required
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <v-select
            label="Status"
            v-model="formData.status"
            :items="statusOptions"
            :rules="[v => !!v || 'Status is required']"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <DateSelect v-model="formData.date" label="Date" required />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea 
            label="Reason" 
            v-model="formData.reason"
            rows="4"
            placeholder="Optional reason for the attendance status"
          ></v-textarea>
        </v-col>
      </v-row>
      
      <SubmitButton :onSubmit="submitForm" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import StudentSelect from "@/apps/students/components/StudentSelect.vue";
import DateSelect from "@/components/DateSelect.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  record: {
    type: Object,
    default: null,
  },
  action: {
    type: Function,
    required: true,
  },
  actionName: {
    type: String,
    default: "Save",
  },
  title: {
    type: String,
    default: "Attendance Record",
  },
  subtitle: {
    type: String,
    default: "",
  },
});

const statusOptions = [
  "Present",
  "Absent",
  "Late",
  "Excused"
];

// Initialize form data with default values
const formData = ref({
  student: null,
  status: "Present",
  reason: "",
  date: null,
  course: null,
});

const submitForm = async () => {
  try {
    // Create a copy of the form data
    const data = { ...formData.value };
    
    // Call the action passed from parent
    return await props.action(data);
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error };
  }
};

onMounted(() => {
  if (props.record) {
    // Populate form with existing record data
    formData.value = {
      student: props.record.student,
      status: props.record.status,
      reason: props.record.reason || "",
      date: props.record.date,
      course: props.record.course || null,
    };
  }
});
</script>
