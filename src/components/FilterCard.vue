<template>
	<v-container
		class="pa-4 bg-grey-lighten-5"
		rounded="lg"
	>
	<v-row>
		<v-col cols="12" md="4" lg="3" v-for="field in filtersInfo">
			<v-text-field 
				v-if="field.type === 'string'"
				:label="field.label" 
				v-model="filters[field.key]"
				:rules="[v => !!v || `${field.label} is required`]"
				density="comfortable"
				hide-details
				:disabled="field.disabled"
			></v-text-field>
			<v-number-input
				v-if="field.type === 'integer'"
				:label="field.label" 
				v-model="filters[field.key]"
				:rules="[v => !!v || `${field.label} is required`]"
				density="comfortable"
				hide-details
				:disabled="field.disabled"
			></v-number-input>
			<ServerAutocomplete
				v-if="['number', 'classroom', 'subject', 'teacher', 'student', 'payment_purpose'].includes(field.type)"
				v-model="filters[field.key]"
				:clearable="!field.disabled"
				:fetch="getFilterFetch(field)"
				:getInfo="getFilterInfo(field)"
				:searchField="field.searchField || 'name'"
				:label="field.label"
				density="comfortable"
				:disabled="field.disabled"
			/>
			<v-checkbox 
				v-if="field.type === 'boolean'"
				:label="field.label" 
				v-model="filters[field.key]"
			></v-checkbox>
			<ServerAutocomplete
				v-if="field.type === 'array'"
				v-model="filters[field.key]"
				clearable
				:fetch="getFilterFetch(field)"
				:getInfo="getFilterInfo(field)"
				:searchField="field.searchField || 'name'"
				:label="field.label"
				:multiple='true'
				density="comfortable"
			/>
			<v-select
				v-if="field.type === 'n_nary'"
				v-model="filters[field.key]"
				:items="field.fetchOptions()"
				:label="field.label"
				hide-details
				density="comfortable"
			></v-select>
			<v-date-input
				v-if="field.type === 'dates'"
				color="primary"
				:label="field.label" 
				:multiple="Array.isArray(field.key) ? 'range' : false"
				density="comfortable"
				clearable
				:disabled="field.disabled"
				@update:modelValue="(value) => updateDates(value, field)"
			>
				<!--- The above one-liner does the following
				- Gets the dates in an array from datepicker
				- Sorts them, treating them as a number
				- Assigns the corresponding date to the corresponding field in filter
				--->


				</v-date-input>
			</v-col>
			<v-col cols="12" md="4" lg="3" class="d-flex gap-2">
				<v-btn
					color="primary"
					@click="clearFilters"
					class="ma-2"
				>
					Clear
				</v-btn>
				<v-btn
					v-if="exportFunction"
					color="success"
					:loading="isExporting"
					@click="showExportDialog"
					class="ma-2"
				>
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
				<v-btn
					color="grey-darken-1"
					variant="text"
					@click="showDialog = false"
				>
					Cancel
				</v-btn>
				<v-btn
					color="success"
					variant="text"
					:loading="isExporting"
					@click="handleExport"
				>
					Confirm Export
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { getClassroomInfoFromObj, getClassrooms } from "@/apps/classrooms/api";
import {
	getPayeeInfoFromObj,
	getPayees,
	getPaymentPurposeInfoFromObj,
	getPaymentPurposes,
} from "@/apps/finances/api";
import { getSubjectInfoFromObj, getSubjects } from "@/apps/subjects/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import { getStudentInfoFromObj, getStudents } from "@/apps/students/api";

import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { ref } from 'vue';

const props = defineProps({
	// Each element for this array will be an object with the following keys:
	// - label: String
	// - key: String & [String] for date range
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
	// - fetchOptions: Function? (only for custom number/array types)
	// - fetchOptionsInfo: Function? (only for custom number/array types)
	// - searchField: String? (defaults to 'name')
	filtersInfo: {
		type: Array,
		required: true,
	},
	exportFunction: {
		type: Function,
		default: null,
	},
});

const filters = defineModel();
const isExporting = ref(false);
const showDialog = ref(false);

const getFilterFetch = (field) => {
	switch (field.type) {
		case "classroom":
			return getClassrooms;
		case "subject":
			return getSubjects;
		case "teacher":
			return getTeachers;
		case "payment_purpose":
			return getPaymentPurposes;
		case "payee":
			return getPayees;
		case "student":
			return getStudents;
		default:
			return field.fetchOptions;
	}
};

const clearFilters = () => {
	console.log("Clearing filters");
	for (const key of Object.keys(filters.value)) {
		if (Array.isArray(filters.value[key])) {
			filters.value[key] = [];
		} else {
			filters.value[key] = null;
		}
	}
};

const updateDates = (value, field) => {
	if (!value) {
		for (const key of field.key) {
			filters.value[key] = null;
		}
		return;
	}
	const dates = [...value].sort((a, b) => a - b);
	console.log(filters.value);
	console.log(field);
	filters.value[field.key[0]] = dates[0];
	filters.value[field.key[field.key.length - 1]] = dates[dates.length - 1];
};

const getFilterInfo = (field) => {
	switch (field.type) {
		case "classroom":
			return getClassroomInfoFromObj;
		case "subject":
			return getSubjectInfoFromObj;
		case "teacher":
			return getTeacherInfoFromObj;
		case "payment_purpose":
			return getPaymentPurposeInfoFromObj;
		case "payee":
			return getPayeeInfoFromObj;
		case "student":
			return getStudentInfoFromObj;
		default:
			return field.fetchOptionsInfo;
	}
};

const showExportDialog = () => {
	showDialog.value = true;
};

const handleExport = async () => {
	if (!props.exportFunction) return;
	
	try {
		isExporting.value = true;
		await props.exportFunction(filters.value);
		showDialog.value = false; // Close dialog after successful export
	} catch (error) {
		console.error('Export failed:', error);
		// You might want to add error handling/notification here
	} finally {
		isExporting.value = false;
	}
};
</script>
