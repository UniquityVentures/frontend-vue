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
            label="Title" 
            v-model="formData.title"
            :rules="[v => !!v || 'Title is required']" 
            required
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <ServerAutocomplete 
            label="Signed By"
            v-model="formData.signed_by"
            :fetch="getTeachers" 
            :getInfo="getTeacherInfoFromObj" 
            searchField="name"
            required
            :rules="[v => !!v || 'Signed By is required']"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-textarea 
            label="Description" 
            v-model="formData.description"
            :rules="[v => !!v || 'Description is required']" 
            required
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-date-input 
            label="Release Date" 
            v-model="formData.release_at" 
            :rules="[v => !!v || 'Release Date is required']"
            required
          ></v-date-input>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-date-input 
            label="Expiry Date" 
            v-model="formData.expiry_at" 
            :rules="[v => !!v || 'Expiry Date is required']"
            required
          ></v-date-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-text-field 
            label="Priority" 
            v-model="formData.priority"
          ></v-text-field>
        </v-col>
        
        <v-col cols="6" md="4">
          <v-checkbox 
            label="Is Active" 
            v-model="formData.is_active"
          ></v-checkbox>
        </v-col>
        
        <v-col cols="6" md="4">
          <v-checkbox 
            label="Is School Wide" 
            v-model="formData.is_school_wide"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <ServerAutocomplete 
            label="Batches"
            v-model="formData.batches"
            :fetch="getBatches" 
            :getInfo="getBatchInfoFromObj" 
            searchField="name"
            multiple
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <ServerAutocomplete 
            label="Courses"
            v-model="formData.courses"
            :fetch="getCourses" 
            :getInfo="getCourseInfoFromObj" 
            searchField="name"
            multiple
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <AttachmentsForm 
            v-model="formData.attachments"
            @update:attachments="v => formData.attachments = v" 
          />
        </v-col>
      </v-row>
      
      <SubmitButton :onSubmit="handleSubmit" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import SubmitButton from "@/components/SubmitButton.vue";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { ref, onMounted } from "vue";
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import AttachmentsForm from "@/apps/attachments/components/AttachmentsForm.vue";
import { formToApiDateTime, apiToFormDateTime } from "@/services/utils";

const props = defineProps({
	announcement: {
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
		default: "",
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
	priority: "low",
	is_active: true,
	is_school_wide: false,
	signed_by: null,
	release_at: null,
	expiry_at: null,
	batches: [],
	courses: [],
	attachments: null,
});

onMounted(async () => {
	if (props.announcement) {
		formData.value = props.announcement;
	}
});

const handleSubmit = async () => {
	try {
		// Create a new object for the formatted data
		const formattedValue = {};

		// Format datetime fields
		formattedValue.title = formData.value.title;
		formattedValue.description = formData.value.description;
		formattedValue.priority = formData.value.priority;
		formattedValue.is_active = formData.value.is_active;
		formattedValue.is_school_wide = formData.value.is_school_wide;
		formattedValue.release_at = formToApiDateTime(formData.value.release_at);
		formattedValue.expiry_at = formToApiDateTime(formData.value.expiry_at);
		formattedValue.attachments = formData.value.attachments;

		// Handle single entity: signed_by
		formattedValue.signed_by =
			typeof formData.value.signed_by === "object"
				? formData.value.signed_by.id
				: formData.value.signed_by;

		// Handle batches array (extract IDs if objects)
		formattedValue.batches = Array.isArray(formData.value.batches)
			? formData.value.batches.map((item) =>
					typeof item === "object" ? item.id : item,
				)
			: [];

		// Handle courses array (extract IDs if objects)
		formattedValue.courses = Array.isArray(formData.value.courses)
			? formData.value.courses.map((item) =>
					typeof item === "object" ? item.id : item,
				)
			: [];

		await props.action(formattedValue);
		return { success: true };
	} catch (error) {
		console.error(`Failed to ${props.actionName} announcement:`, error);
		return { success: false, error };
	}
};
</script> 
