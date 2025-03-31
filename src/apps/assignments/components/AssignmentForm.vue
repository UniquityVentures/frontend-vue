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
        <v-col cols="12">
          <v-text-field 
            label="Title" 
            v-model="formData.title"
            :rules="[v => !!v || 'Title is required']" 
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea 
            label="Description" 
            v-model="formData.description"
            :rules="[v => !!v || 'Description is required']" 
            required
            rows="10"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <CourseSelect 
            v-model="formData.course" 
            label="Course"
            :rules="[v => !!v || 'Course is required']" 
            required
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <v-date-input 
            label="Due Date" 
            v-model="formData.due_date"
            :rules="[v => !!v || 'Due date is required']" 
            required
            color="primary"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <AttachmentsInput v-model="formData.attachments" title="Attachments" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field 
            label="Maximum Score" 
            v-model="formData.max_score"
            type="number"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-text-field 
            label="Passing Score" 
            v-model="formData.passing_score"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      
      <SubmitButton :onSubmit="submitForm" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import AttachmentsInput from "@/apps/attachments/components/AttachmentsInput.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { apiToFormDateTime, formToApiDateTime } from "@/services/utils";
import { onMounted, ref } from "vue";

const props = defineProps({
	assignment: {
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
		default: "Assignment",
	},
	subtitle: {
		type: String,
		default: "",
	},
});

// Initialize form data with default values
const formData = ref({
	title: "",
	description: "",
	course: null,
	due_date: null,
	attachments: null,
	max_score: 100,
	passing_score: 40,
});

const submitForm = async () => {
	try {
		// Create a copy of the form data
		const data = { ...formData.value };

		// Handle datetime formatting
		if (data.due_date) {
			data.due_date = formToApiDateTime(data.due_date);
		}

		// Call the action passed from parent
		return await props.action(data);
	} catch (error) {
		console.error("Error submitting form:", error);
		return { success: false, error };
	}
};

onMounted(() => {
	if (props.assignment) {
		// Copy assignment data to form data
		formData.value = { ...props.assignment };

		// Convert API datetime format to form datetime format
		if (formData.value.due_date) {
			formData.value.due_date = apiToFormDateTime(formData.value.due_date);
		}
	}
});
</script>
