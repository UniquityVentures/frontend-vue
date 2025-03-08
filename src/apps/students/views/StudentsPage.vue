<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <StudentsStatsCard 
          :buttons="[
            { 
              text: 'Resolve Pending Approvals', 
            }
          ]"
        />
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <FilterCard :fields="fields" :exportFunction="exportStudents" />
          </v-card-title>
          <ResponsiveDataTable
            :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
            :headers="studentDefaultHeaders" 
            :fetch="getStudents" 
            v-model="filters" 
            template="card"
          />
        </v-card>
      </v-col>
    </v-row>
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
