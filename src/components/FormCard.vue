<template>
	<v-card>
		<v-card-title>
			{{ actionName }}
		</v-card-title>
		<v-card-subtitle>
			{{ title }}
		</v-card-subtitle>
		<v-card-text>
			<v-row class="pa-2">
				<v-col v-for="field in formFields" v-bind="getFieldWidth(field.type)" class="pa-2">
					<!-- Basic field types -->
					<v-text-field v-if="field.type === FIELD_TYPES.STRING" :label="field.label" v-model="newValue[field.key]"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" :required="field.required"></v-text-field>
						
					<v-textarea v-if="field.type === FIELD_TYPES.LONGSTRING" :label="field.label" v-model="newValue[field.key]"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" :required="field.required"></v-textarea>
						
					<v-number-input v-if="field.type === FIELD_TYPES.INTEGER" :label="field.label" v-model="newValue[field.key]"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" :required="field.required"></v-number-input>
						
					<v-select v-if="field.type === FIELD_TYPES.SELECT" :label="field.label" v-model="newValue[field.key]"
						:items="field.items" :required="field.required"
						:rules="[v => !field.required || !!v || `${field.label} is required`]"></v-select>
						
					<v-text-field v-if="field.type === FIELD_TYPES.DATETIME" :label="field.label" type="datetime-local"
						v-model="newValue[field.key]" :rules="[v => !field.required || !!v || `${field.label} is required`]"
						:required="field.required" ></v-text-field>
						
					<!-- Single entity types -->
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.BATCH" v-model="newValue[field.key]"
						:fetch="getBatches" :getInfo="getBatchInfoFromObj"
						:searchField="field.searchField || 'name'" :label="field.label" :required="field.required"
						:multiple="false"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
					
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.COURSE" v-model="newValue[field.key]"
						:fetch="getCourses" :getInfo="getCourseInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="false"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.TEACHER" v-model="newValue[field.key]"
						:fetch="getTeachers" :getInfo="getTeacherInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="false"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.STUDENT" v-model="newValue[field.key]"
						:fetch="getStudents" :getInfo="getStudentInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="false"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.PAYEE" v-model="newValue[field.key]"
						:fetch="getPayees" :getInfo="getPayeeInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="false"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<!-- Multiple entity types (plural) -->
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.BATCHES" v-model="newValue[field.key]"
						:fetch="getBatches" :getInfo="getBatchInfoFromObj"
						:searchField="field.searchField || 'name'" :label="field.label" :required="field.required"
						:multiple="true"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
					
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.COURSES" v-model="newValue[field.key]"
						:fetch="getCourses" :getInfo="getCourseInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="true"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.TEACHERS" v-model="newValue[field.key]"
						:fetch="getTeachers" :getInfo="getTeacherInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="true"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.STUDENTS" v-model="newValue[field.key]"
						:fetch="getStudents" :getInfo="getStudentInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="true"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<ServerAutocomplete v-if="field.type === FIELD_TYPES.PAYEES" v-model="newValue[field.key]"
						:fetch="getPayees" :getInfo="getPayeeInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required"
						:multiple="true"
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<!-- Other field types -->
					<v-checkbox v-if="field.type === FIELD_TYPES.BOOLEAN" :label="field.label" v-model="newValue[field.key]"
						:required="field.required"></v-checkbox>
						
					<v-file-input v-if="field.type === FIELD_TYPES.FILE" v-model="newValue[field.key]" :label="field.label"
						:required="field.required" show-size counter
						:rules="[v => !field.required || !!v || `${field.label} is required`]"></v-file-input>
						
					<AttachmentForm v-if="field.type === FIELD_TYPES.ATTACHMENT"
						@update:attachment="(v) => newValue[field.key] = v?.id" :required="field.required" show-size
						:rules="[v => !field.required || !!v || `${field.label} is required`]" />
						
					<AttachmentListForm v-if="field.type === FIELD_TYPES.ATTACHMENT_LIST"
						@update:attachments="(v) => newValue[field.key] = v" :required="field.required" v-model="newValue[field.key]" />
						
				</v-col>
			</v-row>
			<SubmitButton v-if="action" :onSubmit="handleAction" :submitText="actionName" />
		</v-card-text>
	</v-card>
</template>

<script setup>
import SubmitButton from "./SubmitButton.vue";
import ServerAutocomplete from "./ServerAutocomplete.vue";
import { ref } from "vue";
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import { getPayeeInfoFromObj, getPayees } from "@/apps/finances/api";
import { getStudentInfoFromObj, getStudents } from "@/apps/students/api";
import { getTransactionPurposeInfoFromObj, getTransactionPurposes } from "@/apps/finances/api";
import { formToApiDateTime } from "@/services/utils";
import { FIELD_TYPES, getFieldWidth, getDefaultEmptyValue } from "./FieldTypeDefinitions";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	actionName: {
		type: String,
		required: true,
	},
	formFields: {
		type: Array,
		required: true,
	},
	action: {
		type: Function,
		required: true,
	},
});

// Initialize form values with proper empty values based on field type
const newValue = ref(
	props?.formFields?.reduce((acc, field) => {
		const { key, defaultValue, type } = field;
		
		// Initialize the field with appropriate default value
		if (defaultValue !== undefined) {
			acc[key] = defaultValue;
		} else {
			acc[key] = getDefaultEmptyValue(type);
		}
		return acc;
	}, {}),
);

const handleAction = async () => {
	try {
		// Format and normalize values before sending to API
		const formattedValue = Object.fromEntries(
			Object.entries(newValue.value).map(([key, value]) => {
				const field = props.formFields.find(f => f.key === key);
				
				// Handle datetime formatting
				if (field?.type === FIELD_TYPES.DATETIME) {
					return [key, formToApiDateTime(value)];
				}
				
				// For entity types that are plural, ensure we map to IDs
				if ([
					FIELD_TYPES.BATCHES, 
					FIELD_TYPES.COURSES, 
					FIELD_TYPES.TEACHERS, 
					FIELD_TYPES.STUDENTS, 
					FIELD_TYPES.PAYEES
				].includes(field?.type) && Array.isArray(value)) {
					return [key, value.map(item => typeof item === 'object' ? item.id : item)];
				}
				
				// For single entity types, get the ID if it's an object
				if ([
					FIELD_TYPES.BATCH, 
					FIELD_TYPES.COURSE, 
					FIELD_TYPES.TEACHER, 
					FIELD_TYPES.STUDENT, 
					FIELD_TYPES.PAYEE
				].includes(field?.type) && value && typeof value === 'object') {
					return [key, value.id];
				}
				
				return [key, value];
			})
		);

		await props.action(formattedValue);
		return { success: true };
	} catch (error) {
		console.error(`Failed to ${props.actionName} ${props.title}:`, error);
		return { success: false, error };
	}
};
</script>
