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
            label="Identifier" 
            v-model="formData.student_no"
            hint="Student ID or registration number"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <BatchSelect 
            v-model="formData.batch" 
            label="Batch"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field 
            label="Phone" 
            v-model="formData.phone"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-text-field 
            label="Whatsapp" 
            v-model="formData.whatsapp"
          ></v-text-field>
        </v-col>
      </v-row>

      
      <SubmitButton :onSubmit="submitForm" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
	student: {
		type: Object,
		default: null,
	},
	user: {
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
		default: "Student",
	},
	subtitle: {
		type: String,
		default: "",
	},
});

// Initialize form data with default values
const formData = ref({
	// Student-specific fields
	student_no: "",
	batch: null,
	phone: "",
	whatsapp: "",
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
	if (props.student) {
		// Copy student data to form data
		formData.value = {
			...formData.value,
			student_no: props.student.student_no || "",
			batch: props.student.batch || null,
			phone: props.student.phone || "",
			whatsapp: props.student.whatsapp || "",
		};
	}
});
</script> 
