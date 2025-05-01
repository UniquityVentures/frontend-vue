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
            searchField="name"
            label="Class Teacher"
            v-model="formData.main_teacher"
          />
        </v-col>
        
        <v-col cols="12" md="6">
          <TeacherSelect
			:multiple="true"
            label="Other Teacher"
            v-model="formData.other_teachers"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <BatchSelect
            multiple
            v-model="formData.batches"
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
    </v-card-text>
    <v-card-text>
      <SubmitButton :onSubmit="() => props.action(formData)" :submitText="actionName" />
      <DeleteButton :action="() => deleteCourse(course?.id)" 
        :name="'Course ' + course?.name" v-if="!hideDelete" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import TeacherSelect from "@/apps/teachers/components/TeacherSelect"
import BatchSelect from "@/apps/batches/components/BatchSelect"
import SubmitButton from "@/components/SubmitButton.vue";
import { onMounted, ref } from "vue";
import DeleteButton from "@/components/DeleteButton.vue";
import { deleteCourse } from "../api";

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
	hideDelete: {
		type: Boolean,
		default: false,
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
