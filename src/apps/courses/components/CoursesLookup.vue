<template>
    <v-card>
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
		    <FilterCard 
                :fields="fields"
                :exportFunction="exportCourses"
                v-model:filters="filters"
            /> 
        </v-card-text>
        <v-card-text>
            <ResponsiveDataTable 
                :getToFunction="(item) => ({name: 'Course', params: {courseId: item.id}})" 
                :headers="defaultHeaders" 
                :fetch="getCourses" 
                v-model:filters="filters"
                desktopTemplate="card"
                mobileTemplate="card"
            />
        </v-card-text>
    </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, onMounted } from "vue";
import { getCourses, exportCourses } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
    overrideFields: {
        type: Array,
        default: null,
    },
});

// Define default headers inline instead of importing from config
const defaultHeaders = [
    { label: "Name", key: "name" },
    { label: "Course Code", key: "code", type: "string" },
    { label: "Teacher", key: "main_teacher_details", type: 'teacher' },
    { label: "Status", key: "is_active", type: 'is_active' },
    { label: "Batches", key: "batches_details", type: 'batch' },
];

// Define default filter fields inline instead of importing from config
const defaultFilterFields = [
    { label: "Search by name", type: FIELD_TYPES.STRING, key: "name", value: "", defaultValue: "" },
    { label: "Filter by teacher", type: FIELD_TYPES.TEACHER, key: "main_teacher", value: null },
    { label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batches", value: null }
];

// Initialize fields with proper reactivity handling
const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});

// Make sure to update fields when overrideFields changes
onMounted(() => {
    // Force reactivity update for fields if coming from props
    if (props.overrideFields) {
        fields.value = JSON.parse(JSON.stringify(props.overrideFields));
    }
});
</script>
