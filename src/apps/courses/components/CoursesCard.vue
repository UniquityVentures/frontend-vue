<template>
    <v-card variant="flat">
        <v-card-title>
            <FilterCard 
                :fields="fields"
                :exportFunction="exportCourses"
            /> 
        </v-card-title>
        <ResponsiveDataTable 
            :getToFunction="(item) => ({name: 'Course', params: {courseId: item.id}})" 
            :headers="courseDefaultHeaders" 
            :fetch="getCourses" 
            v-model="filters"
            desktopTemplate="card"
            mobileTemplate="list"
        />
    </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { getCourses, exportCourses } from "../api";
import { courseDefaultHeaders, courseDefaultFilterFields } from "../config";


const customFields = [
    // Add your custom field overrides here if needed
];

const fields = ref(courseDefaultFilterFields.map(defaultField => {
    const override = customFields.find(f => f.key === defaultField.key);
    return override ? { ...defaultField, ...override } : defaultField;
}));

const filters = computed(() => {
    return fields.value.reduce((acc, field) => {
        if (Array.isArray(field.key)) {
            field.key.forEach((k, i) => {
                acc[k] = field.value?.[i] ?? null;
            });
        } else {
            acc[field.key] = field.value;
        }
        return acc;
    }, {});
});
</script>
