<template>
  <v-card variant="flat">
    <v-card-title>
      <FilterCard 
        :fields="fields"
        :exportFunction="exportClassrooms"
      /> 
    </v-card-title>
    <ResponsiveDataTable 
      :getToFunction="(item) => ({name: 'Classroom', params: {classroomId: item.id}})" 
      :headers="headers" 
      :fetch="getClassrooms" 
      v-model="filters"
      :forceMobile="forceMobile"
    />
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { getClassrooms, exportClassrooms } from "../api";
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
    label: "Grade",
    type: "n_nary",
    key: "standard",
    value: null,
    fetchOptions: () => [
      { title: "All Grades", value: null },
      ...[...Array(10)].map((_, i) => ({
        title: `Grade ${i + 1}`,
        value: (i + 1).toString()
      }))
    ],
  },
  {
    label: "Class Teacher",
    type: "teacher",
    key: "class_teacher",
    value: null,
  },
  {
    label: "Status",
    type: "n_nary",
    key: "is_active",
    value: null,
    fetchOptions: () => [
      { title: "All Classes", value: null },
      { title: "Active Only", value: "True" },
      { title: "Inactive Only", value: "False" },
    ],
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
  { title: "Grade", key: "standard" },
  { 
    title: "Class Teacher", 
    key: "class_teacher_details",
    formatFunc: (teacher) => teacher?.user_details?.full_name || '-'
  },
  { 
    title: "Students Count", 
    key: "students",
    formatFunc: (students) => students?.length || 0
  },
  { 
    title: "Status", 
    key: "is_active",
    formatFunc: (status) => status ? "Active" : "Inactive"
  },
  { title: "Actions", key: "actions", sortable: false },
];
</script>
