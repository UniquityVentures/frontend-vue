<template>
  <v-card variant="flat">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle">
      {{ subtitle }}
    </v-card-subtitle>
    
    <v-card class="ma-2" variant="outlined">
      <v-card-title class="text-subtitle-1">Basic Information:</v-card-title>
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
            <TeacherSelect
              label="Signed By"
              v-model="formData.signed_by"
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
              rows="10"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card class="ma-2" variant="outlined">
      <v-card-title class="text-subtitle-1">Dates:</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <DateSelect 
              v-model="formData.release_at"
              label="Release Date"
              :rules="[v => !!v || 'Release Date is required']"
              required
            />
          </v-col>
          
          <v-col cols="12" md="6">
            <DateSelect 
              v-model="formData.expiry_at"
              label="Expiry Date"
              :rules="[v => !!v || 'Expiry Date is required']"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card class="ma-2" variant="outlined">
      <v-card-title class="text-subtitle-1">Settings:</v-card-title>
      <v-card-text>
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
      </v-card-text>
    </v-card>
    
    <v-card class="ma-2" variant="outlined">
      <v-card-title class="text-subtitle-1">Recipients:</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-radio-group v-model="batchesOrCourses" label="Announce to Batches or Courses?" inline class="border rounded-lg pt-2">
              <v-radio label="Batches" value="batches"></v-radio>
              <v-radio label="Courses" value="courses"></v-radio>
            </v-radio-group>
            <BatchSelect
              v-if="batchesOrCourses === 'batches'" 
              multiple
              v-model="formData.batches"
            />
            <CourseSelect
              v-if="batchesOrCourses === 'courses'"
              multiple
              v-model="formData.courses"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card class="ma-2" variant="outlined">
      <v-card-title class="text-subtitle-1">Attachments:</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <AttachmentsInput v-model="formData.attachments" required />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <SubmitButton :onSubmit="() => props.action(formData)" :submitText="actionName" />
  </v-card>
</template>

<script setup>
import AttachmentsForm from "@/apps/attachments/components/AttachmentsForm.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect"
import CourseSelect from "@/apps/courses/components/CourseSelect"
import BatchSelect from "@/apps/batches/components/BatchSelect"
import SubmitButton from "@/components/SubmitButton.vue";
import DateSelect from "@/components/DateSelect.vue";
import AttachmentsInput from "@/apps/attachments/components/AttachmentsInput.vue";
import { onMounted, ref } from "vue";

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

const batchesOrCourses = ref("batches");

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
		for (const [key, value] of Object.entries(formData.value)) {
			if (props.announcement[key] !== undefined) {
				formData.value[key] = value.constructor(props.announcement[key]);
			}
		}
	}
});
</script> 
