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
          <TeacherSelect v-model="formData.signed_by" label="Signed By" />
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
        <v-col cols="12">
          <v-radio-group v-model="batchesOrCourses" label="Announce to Batches or Courses?" inline class="border rounded-lg pt-2">
            <v-radio label="Batches" value="batches"></v-radio>
            <v-radio label="Courses" value="courses"></v-radio>
          </v-radio-group>
          <BatchSelect v-if="batchesOrCourses === 'batches'" v-model="formData.batches" label="Batches" />
          <CourseSelect v-if="batchesOrCourses === 'courses'" v-model="formData.courses" label="Courses" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <AttachmentsInput v-model="formData.attachments" required />
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
import AttachmentsInput from "@/apps/attachments/components/AttachmentsInput.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";

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

const batchesOrCourses = ref('batches');

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


</script> 
