<template>
	<v-container rounded="lg" ref="containerRef">
		<v-row>
			<v-col :cols="forceMobile ? 12 : 6" :md="forceMobile ? 12 : 3" :lg="forceMobile ? 12 : 2" v-for="field in fields" v-show="!field.hidden" class="pa-2">
				
				<v-text-field v-if="field.type === FIELD_TYPES.STRING" :label="field.label" v-model="field.value"
					hide-details :disabled="field.disabled" />
				
				<v-number-input v-if="field.type === FIELD_TYPES.INTEGER" :label="field.label" v-model="field.value"
					hide-details :disabled="field.disabled" />
				
				<v-textarea v-if="field.type === FIELD_TYPES.LONGSTRING" :label="field.label" v-model="field.value"
					hide-details :disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.BATCH" v-model="field.value" :clearable="!field.disabled"
					:fetch="getBatches" :getInfo="getBatchInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.COURSE" v-model="field.value" :clearable="!field.disabled"
					:fetch="getCourses" :getInfo="getCourseInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.TEACHER" v-model="field.value" :clearable="!field.disabled"
					:fetch="getTeachers" :getInfo="getTeacherInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.STUDENT" v-model="field.value" :clearable="!field.disabled"
					:fetch="getStudents" :getInfo="getStudentInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.PAYMENT_PURPOSE" v-model="field.value"
					:clearable="!field.disabled" :fetch="getTransactionPurposes" :getInfo="getTransactionPurposeInfoFromObj"
					:searchField="field.searchField || 'name'" :label="field.label"
					:disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.NUMBER" v-model="field.value" :clearable="!field.disabled"
					:fetch="field.fetchOptions" :getInfo="field.fetchOptionsInfo"
					:searchField="field.searchField || 'name'" :label="field.label"
					:disabled="field.disabled" />
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.PAYEE" v-model="field.value" :clearable="!field.disabled"
					:fetch="getPayees" :getInfo="getPayeeInfoFromObj" :searchField="field.searchField || 'name'"
					:label="field.label" :disabled="field.disabled" />
				
				<v-checkbox v-if="field.type === FIELD_TYPES.BOOLEAN" :label="field.label" v-model="field.value"></v-checkbox>
				
				<ServerAutocomplete v-if="field.type === FIELD_TYPES.MULTI_SELECT" v-model="field.value" clearable
					:fetch="field.fetchOptions" :getInfo="field.fetchOptionsInfo"
					:searchField="field.searchField || 'name'" :label="field.label" :multiple='true'/>
				
				<v-select v-if="field.type === FIELD_TYPES.SELECT" v-model="field.value" :items="field.fetchOptions()"
					:label="field.label" hide-details :disabled="field.disabled" />
				
				<v-date-input v-if="field.type === FIELD_TYPES.DATE" color="primary" :label="field.label" v-model="field.value"
					clearable :disabled="field.disabled" />
				
				<v-date-input v-if="field.type === FIELD_TYPES.DATE_RANGE" color="primary" :label="field.label" v-model="field.value"
					multiple="range" clearable :disabled="field.disabled" @update:modelValue="(value) => updateDates(value, field)" />
				
				<v-select v-if="field.type === FIELD_TYPES.N_NARY" :label="field.label" v-model="field.value"
					:items="field.fetchOptions ? field.fetchOptions() : []" :item-title="'title'" :item-value="'value'"
					hide-details :disabled="field.disabled" clearable />
			</v-col>
			<v-col cols="12" md="4" lg="3">
				<v-btn color="primary" @click="clearFilters">
					Clear
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import { getPayeeInfoFromObj, getPayees, getTransactionPurposeInfoFromObj, getTransactionPurposes } from "@/apps/finances/api";
import { getStudentInfoFromObj, getStudents } from "@/apps/students/api";
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { ref, computed, watch } from "vue";
import { FIELD_TYPES, getDefaultEmptyValue } from "./FieldTypeDefinitions";

const props = defineProps({
	// Array of field objects, each containing:
	// - label: String (display label for the field)
	// - type: String - One of FIELD_TYPES constants
	// - value: any (current value of the field)
	// - key: String or Array (for date ranges)
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
	forceMobile: {
		type: Boolean,
		default: false,
	},
});

const clearFilters = () => {
	console.log("Clearing filters");
	for (const field of props.fields) {
		if (field.disabled) continue;
		if ("defaultValue" in field) {
			field.value = field.defaultValue;
		} else {
			field.value = getDefaultEmptyValue(field.type);
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
		await props.exportFunction(computedFilters.value);
		showDialog.value = false;
	} catch (error) {
		console.error("Export failed:", error);
	} finally {
		isExporting.value = false;
	}
};

// Add model management
const filtersModel = defineModel('filters', { required: true });

// Compute filters from fields
const computedFilters = computed(() => {
	return props.fields.reduce((acc, field) => {
		if (field.value !== undefined && field.value !== null && field.value !== "") {
			if (Array.isArray(field.key)) {
				field.key.forEach((key, index) => {
					if (field.value && field.value[index] !== undefined) {
						acc[key] = field.value[index];
					}
				});
			} else {
				acc[field.key] = field.value;
			}
		}
		return acc;
	}, {});
});

// Sync computed filters to model
watch(computedFilters, (newVal) => {
	filtersModel.value = newVal;
}, { immediate: true, deep: true });

</script>
