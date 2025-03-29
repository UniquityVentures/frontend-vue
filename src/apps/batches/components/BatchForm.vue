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
          <v-text-field 
            label="Name" 
            v-model="formData.name"
            :rules="[v => !!v || 'Name is required']" 
            required
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-text-field 
            label="Standard" 
            v-model="formData.standard"
            :rules="[v => !!v || 'Standard is required']" 
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <TeacherSelect 
            v-model="formData.main_teacher" 
            label="Main Teacher" 
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <TeacherSelect 
            v-model="formData.other_teachers" 
            label="Other Teachers" 
            multiple
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <CourseSelect 
            v-model="formData.courses" 
            label="Courses"
            multiple
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-checkbox 
            label="Is Active" 
            v-model="formData.is_active"
          ></v-checkbox>
        </v-col>
      </v-row>
      
      <SubmitButton :onSubmit="submitForm" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import SubmitButton from "@/components/SubmitButton.vue";
import { ref, onMounted } from "vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";

const props = defineProps({
  batch: {
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
    default: "Batch",
  },
  subtitle: {
    type: String,
    default: "",
  },
});

// Initialize form data with default values
const formData = ref({
  name: "",
  standard: "",
  main_teacher: null,
  other_teachers: [],
  courses: [],
  is_active: true,
});

const submitForm = async () => {
  try {
    // Call the action passed from parent
    return await props.action(formData.value);
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error };
  }
};

onMounted(() => {
  if (props.batch) {
    // Copy batch data to form data
    formData.value = { ...props.batch };
  }
});
</script> 