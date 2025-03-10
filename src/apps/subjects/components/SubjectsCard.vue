<template>
    <v-card variant="flat">
        <v-card-title>
            <FilterCard 
                :fields="fields"
                :exportFunction="exportSubjects"
            /> 
        </v-card-title>
        <ResponsiveDataTable 
            :getToFunction="(item) => ({name: 'Subject', params: {subjectId: item.id}})" 
            :headers="subjectDefaultHeaders" 
            :fetch="getSubjects" 
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
import { getSubjects } from "../api";
import { subjectDefaultHeaders, subjectDefaultFilterFields } from "../config";

// You'll need to implement this function in your API or remove it if not needed
const exportSubjects = async (filters) => {
    console.log("Export subjects with filters:", filters);
    // Implement export functionality or remove if not needed
};

const customFields = [
    // Add your custom field overrides here if needed
];

const fields = ref(subjectDefaultFilterFields.map(defaultField => {
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
