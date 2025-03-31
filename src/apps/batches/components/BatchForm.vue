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
          <ServerAutocomplete
            :fetch="getTeachers"
            :getInfo="getTeacherInfoFromObj"
            searchField="name"
            label="Class Teacher"
            v-model="formData.main_teacher"
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <ServerAutocomplete
            :fetch="getTeachers"
            :getInfo="getTeacherInfoFromObj"
			:multiple="true"
            searchField="name"
            label="Other Teacher"
            v-model="formData.other_teachers"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ServerAutocomplete
            :fetch="getCourses"
            :getInfo="getCourseInfoFromObj"
            searchField="name"
            :multiple="true"
            label="Courses"
            v-model="formData.courses"
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
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import { ref, onMounted } from "vue";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";

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
