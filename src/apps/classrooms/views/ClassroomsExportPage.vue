<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card variant="flat">
          <v-card-title>
            <FilterCard 
              :fields="fields"
              :exportFunction="exportClassrooms"
            /> 
          </v-card-title>
          <ResponsiveDataTable 
            :getToFunction="(item) => ({name: 'Classroom', params: {classroomId: item.id}})" 
            :headers="classroomDefaultHeaders" 
            :fetch="getClassrooms" 
            v-model="filters"
            template="card"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { exportClassrooms, getClassrooms } from "../api";
import { classroomDefaultHeaders, classroomDefaultFilterFields } from "../config";

const forceMobile = ref(false);

const customFields = [
  // Add your custom field overrides here
  // Example: { key: 'is_active', value: 'True' }
];

const fields = ref(classroomDefaultFilterFields.map(defaultField => {
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
