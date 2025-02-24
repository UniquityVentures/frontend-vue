<template>
  <v-card variant="flat">
    <v-card-title>
      <FilterCard 
        v-model="filters"
        :filtersInfo="filtersInfo"
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
import { ref } from "vue";
import { getClassrooms, exportClassrooms } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const defaultFilters = {
  name: "",
  standard: null,
  class_teacher: null,
  is_active: null,
};

const defaultFiltersInfo = [
  {
    label: "Search by name",
    type: "string",
    key: "name",
  },
  {
    label: "Grade",
    type: "n_nary",
    key: "standard",
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
  },
  {
    label: "Status",
    type: "n_nary",
    key: "is_active",
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
  initialFilters: {
    type: Object,
    default: () => ({}),
  },
  initialFiltersInfo: {
    type: Array,
    default: () => ([]),
  },
});

const filters = ref({ ...defaultFilters, ...props.initialFilters });

const filtersInfo = ref(defaultFiltersInfo.map(defaultFilter => {
  const override = props.initialFiltersInfo.find(f => f.key === defaultFilter.key);
  return override ? { ...defaultFilter, ...override } : defaultFilter;
}));

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
