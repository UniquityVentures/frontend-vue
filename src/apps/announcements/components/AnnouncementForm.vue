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
            <label class="text-subtitle-1">Description</label>
            <div class="ma-4">
              <QuillEditor
                v-model:content="formData.description"
                :options="quillOptions"
                content-type="html"
              />
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <v-card class="ma-2" variant="flat">
      <v-card-title>Dates:</v-card-title>
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
    
    <v-card class="ma-2" variant="flat">
      <v-card-title>Settings:</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field 
              label="Priority" 
              v-model="formData.priority"
            ></v-text-field>
          </v-col>
          
          <v-col cols="6" md="6">
            <v-checkbox 
              label="Is Active" 
              v-model="formData.is_active"
            ></v-checkbox>
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
      <v-card-title>Attachments:</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <AttachmentsInput v-model="formData.attachments" required />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    </v-card-text>
    <v-card-text>
      <SubmitButton :onSubmit="() => props.action(formData)" :submitText="actionName" />
      <DeleteButton :action="() => deleteAnnouncement(announcement?.id)" 
        :name="'Announcement ' + announcement?.title" v-if="!hideDelete" />
    </v-card-text>
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
import { onMounted, ref, inject } from "vue";
import DeleteButton from "@/components/DeleteButton.vue";
import { deleteAnnouncement } from "../api";

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
	hideDelete: {
		type: Boolean,
		default: false,
	},
});

const batchesOrCourses = ref("batches");

// Initialize form data with default values
const formData = ref({});

onMounted(async () => {
	if (props.announcement) {
		formData.value = props.announcement;
	}
});
</script> 
