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
            label="Course Code" 
            v-model="formData.code"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea 
            label="Description" 
            v-model="formData.description"
            rows="4"
          ></v-textarea>
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
          <BatchSelect 
            v-model="formData.batches" 
            label="Batches"
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
      
      <SubmitButton :onSubmit="props.action" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import SubmitButton from "@/components/SubmitButton.vue";
import { ref, onMounted } from "vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";

const props = defineProps({
  course: {
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
    default: "Course",
  },
  subtitle: {
    type: String,
    default: "",
  },
});

// Initialize form data with default values
const formData = ref({
  name: "",
  code: "",
  description: "",
  main_teacher: null,
  other_teachers: [],
  batches: [],
  is_active: true,
});

onMounted(async () => {
  if (props.course) {
    formData.value = props.course;
  }
});
</script>
