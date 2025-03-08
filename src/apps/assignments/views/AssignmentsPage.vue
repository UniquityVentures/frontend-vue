<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card variant="flat">
          <v-card-title>
            <FilterCard :fields="fields" :exportFunction="exportAssignments" />
          </v-card-title>
          <ResponsiveDataTable
            :getToFunction="(item) => ({ name: 'Assignment', params: { assignmentId: item.id } })"
            :headers="assignmentDefaultHeaders"
            :fetch="getAssignments"
            v-model="filters"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { getAssignments, exportAssignments } from "../api";
import { assignmentDefaultHeaders, assignmentDefaultFilterFields } from "../config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const customFields = [
  // Add your custom field overrides here
  // Example: { key: 'status', value: 'active' }
];

const fields = ref(assignmentDefaultFilterFields.map(defaultField => {
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
