<template>
  <v-card variant="flat">
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text>
      <v-card class="ma-2" variant="flat">
        <v-card-title>Basic Information:</v-card-title>
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
                rows="10"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <v-card class="ma-2" variant="flat">
        <v-card-title>Date and Time:</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-date-input
                v-model="formData.start"
                label="Start Date & Time"
                :rules="[v => !!v || 'Start Date & Time is required']"
                required
              ></v-date-input>
            </v-col>
            
            <v-col cols="12" md="6">
              <v-date-input
                v-model="formData.end"
                label="End Date & Time"
              ></v-date-input>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <v-card class="ma-2" variant="flat">
        <v-card-title>Recipients:</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-checkbox 
                label="Is School Wide" 
                v-model="formData.is_school_wide"
              ></v-checkbox>
            </v-col>
          </v-row>
          
          <v-row v-if="!formData.is_school_wide">
            <v-col cols="12">
              <v-radio-group v-model="batchesOrCourses" label="Event for Batches or Courses?" inline class="border rounded-lg pt-2">
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
      
      <v-card class="ma-2" variant="flat">
        <v-card-title>Event Creator:</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <TeacherSelect
                label="Created By"
                v-model="formData.created_by"
                :rules="[v => !!v || 'Creator is required']"
                required
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <v-card class="ma-2" variant="flat">
        <v-card-title>Attachment:</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <AttachmentInput v-model="formData.attachment" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-text>
      <SubmitButton :onSubmit="() => props.action(formData)" :submitText="actionName" />
      <DeleteButton :action="() => deleteEvent(event?.id)" 
        :name="'Event ' + event?.title" v-if="!hideDelete" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import TeacherSelect from "@/apps/teachers/components/TeacherSelect"
import CourseSelect from "@/apps/courses/components/CourseSelect"
import BatchSelect from "@/apps/batches/components/BatchSelect"
import SubmitButton from "@/components/SubmitButton.vue";
import AttachmentInput from "@/apps/attachments/components/AttachmentInput.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import { onMounted, ref, watch } from "vue";
import { deleteEvent } from "../api";

const props = defineProps({
  event: {
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
  hideDelete: {
    type: Boolean,
    default: false,
  },
});

const batchesOrCourses = ref("batches");

// Initialize form data with default values
const formData = ref({
  title: "",
  description: "",
  start: null,
  end: null,
  is_school_wide: true,
  batches: [],
  courses: [],
  created_by: null,
  attachment: null,
});

// Watch for changes in is_school_wide
watch(() => formData.value.is_school_wide, (newValue) => {
  if (newValue) {
    formData.value.batches = [];
    formData.value.courses = [];
  }
});

onMounted(async () => {
  if (props.event) {
    for (const [key, value] of Object.entries(formData.value)) {
      if (props.event[key] !== undefined) {
        formData.value[key] = value.constructor(props.event[key]);
      }
    }
    
    // Determine which radio option to select based on existing data
    if (props.event.batches && props.event.batches.length > 0) {
      batchesOrCourses.value = "batches";
    } else if (props.event.courses && props.event.courses.length > 0) {
      batchesOrCourses.value = "courses";
    }
  }
});
</script> 