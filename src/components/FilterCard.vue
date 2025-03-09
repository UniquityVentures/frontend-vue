<template>
	<v-container rounded="lg">
		<v-row>
			<v-col cols="6" md="3" lg="2" v-for="field in fields" v-show="!field.hidden" class="pa-2">
				<v-text-field v-if="field.type === 'string'" :label="field.label" v-model="field.value"
					hide-details :disabled="field.disabled"></v-text-field>
				<v-number-input v-if="field.type === 'integer'" :label="field.label" v-model="field.value"
					hide-details :disabled="field.disabled"></v-number-input>
				<ServerAutocomplete v-if="field.type === 'classroom'" v-model="field.value" :clearable="!field.disabled"
					:fetch="getClassrooms" :getInfo="getClassroomInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				<ServerAutocomplete v-if="field.type === 'subject'" v-model="field.value" :clearable="!field.disabled"
					:fetch="getSubjects" :getInfo="getSubjectInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				<ServerAutocomplete v-if="field.type === 'teacher'" v-model="field.value" :clearable="!field.disabled"
					:fetch="getTeachers" :getInfo="getTeacherInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				<ServerAutocomplete v-if="field.type === 'student'" v-model="field.value" :clearable="!field.disabled"
					:fetch="getStudents" :getInfo="getStudentInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				<ServerAutocomplete v-if="field.type === 'payment_purpose'" v-model="field.value"
					:clearable="!field.disabled" :fetch="getPaymentPurposes" :getInfo="getPaymentPurposeInfoFromObj"
					:searchField="field.searchField || 'name'" :label="field.label"
					:disabled="field.disabled" />
				<ServerAutocomplete v-if="field.type === 'number'" v-model="field.value" :clearable="!field.disabled"
					:fetch="field.fetchOptions" :getInfo="field.fetchOptionsInfo"
					:searchField="field.searchField || 'name'" :label="field.label"
					:disabled="field.disabled" />
				<ServerAutocomplete v-if="field.type === 'payee'" v-model="field.value" :clearable="!field.disabled"
					:fetch="getPayees" :getInfo="getPayeeInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				<v-checkbox v-if="field.type === 'boolean'" :label="field.label" v-model="field.value"></v-checkbox>
				<ServerAutocomplete v-if="field.type === 'array'" v-model="field.value" clearable
					:fetch="field.fetchOptions" :getInfo="field.fetchOptionsInfo"
					:searchField="field.searchField || 'name'" :label="field.label" :multiple='true'
					/>
				<v-select v-if="field.type === 'n_nary'" v-model="field.value" :items="field.fetchOptions()"
					:label="field.label" hide-details></v-select>
				<v-date-input v-if="field.type === 'dates'" color="primary" :label="field.label" v-model="field.value"
					:multiple="Array.isArray(field.key) ? 'range' : false" clearable
					:disabled="field.disabled" @update:modelValue="(value) => updateDates(value, field)">
				</v-date-input>
			</v-col>
			<v-col cols="12" md="4" lg="3">
				<v-btn color="primary" @click="clearFilters">
					Clear
				</v-btn>
				<v-btn v-if="exportFunction" color="success" :loading="isExporting" @click="showExportDialog">
					Export
				</v-btn>
			</v-col>
		</v-row>
	</v-container>

	<!-- Add dialog component -->
	<v-dialog v-model="showDialog" max-width="400">
		<v-card>
			<v-card-title>Confirm Export</v-card-title>
			<v-card-text>
				Are you sure you want to export this data?
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="grey-darken-1" variant="text" @click="showDialog = false">
					Cancel
				</v-btn>
				<v-btn color="success" variant="text" :loading="isExporting" @click="handleExport">
					Confirm Export
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { getClassroomInfoFromObj, getClassrooms } from "@/apps/classrooms/api";
import { getPayeeInfoFromObj, getPayees, getPaymentPurposeInfoFromObj, getPaymentPurposes } from "@/apps/finances/api";
import { getStudentInfoFromObj, getStudents } from "@/apps/students/api";
import { getSubjectInfoFromObj, getSubjects } from "@/apps/subjects/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";

import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { ref } from "vue";

const props = defineProps({
	// Array of field objects, each containing:
	// - label: String (display label for the field)
	// - type: String - One of:
	//   - 'string'
	//   - 'integer'
	//   - 'number'
	//   - 'boolean'
	//   - 'array'
	//   - 'n_nary'
	//   - 'classroom'
	//   - 'subject'
	//   - 'teacher'
	//   - 'student'
	//   - 'payment_purpose'
	//   - 'dates'
	// - value: any (current value of the field)
	// - defaultValue?: any (value to reset to when clearing)
	// - disabled?: boolean
	// - fetchOptions?: Function (for custom number/array types)
	// - searchField?: String (defaults to 'name')
	fields: {
		type: Array,
		required: true,
	},
	exportFunction: {
		type: Function,
		default: null,
	},
});

const clearFilters = () => {
	console.log("Clearing filters");
	for (const field of props.fields) {
		if (field.disabled) continue;

		if ("defaultValue" in field) {
			field.value = field.defaultValue;
		} else if (Array.isArray(field.value)) {
			field.value = [];
		} else if (field.type === "string") {
			field.value = "";
		} else {
			field.value = null;
		}
	}
};

const updateDates = (value, field) => {
	if (!value) {
		field.value = null;
		return;
	}
	// If it's a date range (array of dates)
	if (Array.isArray(field.key)) {
		const dates = [...value].sort((a, b) => a - b);
		field.value = dates; // Store the sorted array directly in field.value
	} else {
		// Single date
		field.value = value;
	}
};

// Exporting Logic Here
const isExporting = ref(false);
const showDialog = ref(false);

const showExportDialog = () => {
	showDialog.value = true;
};

const handleExport = async () => {
	if (!props.exportFunction) return;

	try {
		isExporting.value = true;
		await props.exportFunction(filters.value);
		showDialog.value = false;
	} catch (error) {
		console.error("Export failed:", error);
	} finally {
		isExporting.value = false;
	}
};
</script>
