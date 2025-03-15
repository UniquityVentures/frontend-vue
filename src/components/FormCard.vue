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
					<v-text-field v-if="field.type === 'string'" :label="field.label" v-model="newValue[field.key]"
						:rules="[v => !!v || `${field.label} is required`]" :required="field.required"></v-text-field>
					<v-textarea v-if="field.type === 'longstring'" :label="field.label" v-model="newValue[field.key]"
						:rules="[v => !!v || `${field.label} is required`]" :required="field.required"></v-textarea>
					<v-select v-if="field.type === 'select'" :label="field.label" v-model="newValue[field.key]"
						:items="field.items" :required="field.required"></v-select>
					<v-text-field v-if="field.type === 'datetime'" :label="field.label" type="datetime-local"
						v-model="newValue[field.key]" :rules="[v => !!v || `${field.label} is required`]"
						:required="field.required" ></v-text-field>
					<ServerAutocomplete v-if="field.type === 'batch'" v-model="newValue[field.key]"
						:fetch="getBatches" :getInfo="getBatchInfoFromObj"
						:searchField="field.searchField || 'name'" :label="field.label" :required="field.required" />
					<ServerAutocomplete v-if="field.type === 'course'" v-model="newValue[field.key]"
						:fetch="getCourses" :getInfo="getCourseInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required" />
					<ServerAutocomplete v-if="field.type === 'teacher'" v-model="newValue[field.key]"
						:fetch="getTeachers" :getInfo="getTeacherInfoFromObj" :searchField="field.searchField || 'name'"
						:label="field.label" :required="field.required" />
					<ServerAutocomplete v-if="field.type === 'number'" v-model="newValue[field.key]"
						:fetch="field.fetchOptions" :getInfo="field.fetchOptionsInfo"
						:searchField="field.searchField || 'name'" :label="field.label" :required="field.required" />
					<v-checkbox v-if="field.type === 'boolean'" :label="field.label" v-model="newValue[field.key]"
						:required="field.required"></v-checkbox>
					<ServerAutocomplete v-if="field.type === 'array'" v-model="newValue[field.key]"
						:fetch="field.fetchOptions" :getInfo="field.fetchOptionsInfo" :searchField="field.searchField"
						:label="field.label" :multiple='true' :required="field.required" />
					<v-file-input v-if="field.type === 'file'" v-model="newValue[field.key]" :label="field.label"
						:required="field.required" show-size counter></v-file-input>
					<AttachmentForm v-if="field.type === 'attachment'"
						@update:attachment="(v) => newValue[field.key] = v?.id" :required="field.required" show-size />
					<AttachmentsForm v-if="field.type === 'attachment_list'"
						@update:attachments="(v) => newValue[field.key] = v?.map(({ id }) => id)"
						:required="field.required" show-size />
					<ServerAutocomplete v-if="field.type === 'payee'" v-model="newValue[field.key]" :fetch="getPayees"
						:getInfo="getPayeeInfoFromObj" :searchField="field.searchField || 'name'" :label="field.label"
						:required="field.required" />
				</v-col>
			</v-row>
			<SubmitButton v-if="action" :onSubmit="handleAction" :submitText="actionName" />
		</v-card-text>
	</v-card>
</template>

<script setup>
import AttachmentForm from "@/apps/attachments/components/AttachmentForm.vue";
import AttachmentsForm from "@/apps/attachments/components/AttachmentsForm.vue";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { ref } from "vue";
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import { getPayeeInfoFromObj, getPayees } from "@/apps/finances/api";
import { formToApiDateTime } from "@/services/utils";

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	actionName: {
		type: String,
		required: true,
	},
	// Each element for this array will be an object with the following keys:
	// - label: String
	// - key: String
	// - type: String
	//   - 'string'
	//   - 'number'
	//   - 'boolean'
	//	 - 'array'
	//   - 'longstring'
	//   - 'file'
	//   - 'attachment'
	//   - 'attachment_list'
	// - fetchOptions: Function?
	// - fetchOptionsInfo: Function?
	// - searchField: String?
	// - defaultValue: Any
	// - required
	formFields: {
		type: Array,
		required: true,
	},
	action: {
		type: Function,
		required: true,
	},
});
console.log(props.formFields);

const newValue = ref(
	props?.formFields?.reduce((acc, { key, defaultValue }) => {
		acc[key] = defaultValue;
		return acc;
	}, {}),
);

const fullWidthFields = ['longstring', 'attachment', 'attachment_list'];
const quarterWidthFields = ['boolean'];

const getFieldWidth = (fieldType) => {
	if (fullWidthFields.includes(fieldType)) {
		return { cols: 12, md: 12, lg: 12 };
	}
	if (quarterWidthFields.includes(fieldType)) {
		return { cols: 6, md: 4, lg: 3 };
	}
	return { cols: 12, md: 6, lg: 4 };
};

const handleAction = async () => {
	try {
		// Format datetime fields before sending to API
		const formattedValue = Object.fromEntries(
			Object.entries(newValue.value).map(([key, value]) => {
				const field = props.formFields.find(f => f.key === key);
				if (field?.type === 'datetime') {
					return [key, formToApiDateTime(value)];
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
