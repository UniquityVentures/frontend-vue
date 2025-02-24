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
      :headers="headers" 
      :fetch="getSubjects" 
      v-model="filters"
      :forceMobile="forceMobile"
    />
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { getSubjects, exportSubjects } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const defaultFields = [
  {
    label: "Search by name",
    type: "string",
    key: "name",
    value: "",
    defaultValue: "",
  },
  {
    label: "Classroom",
    type: "classroom",
    key: "classroom",
    value: null,
  },
  {
    label: "Teacher",
    type: "teacher",
    key: "teacher",
    value: null,
  },
];

const props = defineProps({
  forceMobile: {
    type: Boolean,
    default: false,
  },
  initialFields: {
    type: Array,
    default: () => ([]),
  },
});

// Initialize fields with any overrides from props
const fields = ref(defaultFields.map(defaultField => {
  const override = props.initialFields.find(f => f.key === defaultField.key);
  return override ? { ...defaultField, ...override } : defaultField;
}));

// Replace the filters ref with computed property
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

const headers = [
  { title: "Name", key: "name" },
  { 
    title: "Classroom", 
    key: "classroom_details",
    formatFunc: (classroom) => classroom?.name || '-'
  },
  { 
    title: "Teacher", 
    key: "teacher_details",
    formatFunc: (teacher) => teacher?.user_details?.full_name || '-'
  },
  { title: "Actions", key: "actions", sortable: false },
];
</script> 