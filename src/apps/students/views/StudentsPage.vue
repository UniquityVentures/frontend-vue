<template>
  <v-container class="columns-container">
        <StudentsStatsCard class="column-item card-width-1" :buttons="[{ text: 'Resolve Pending Approvals', }]" />
        <v-card class="column-item card-width-3">
          <v-card-title>
            <FilterCard :fields="fields" :exportFunction="exportStudents" />
          </v-card-title>
          <ResponsiveDataTable
            :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
            :headers="studentDefaultHeaders" 
            :fetch="getStudents" 
            v-model="filters" 
            desktopTemplate="card"
            mobileTemplate="list"
          />
        </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { getStudents, exportStudents } from "../api";
import { studentDefaultHeaders, studentDefaultFilterFields } from "../config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import StudentsStatsCard from "@/apps/students/components/StudentsStatsCard.vue";

const customFields = [
  // Add your custom field overrides here if needed
];

const fields = ref(studentDefaultFilterFields.map(defaultField => {
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
