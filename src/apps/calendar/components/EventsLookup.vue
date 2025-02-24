<template>
  <v-card variant="flat">
    <v-card-title>
      <FilterCard 
        :fields="fields"
      /> 
    </v-card-title>
    <ResponsiveDataTable 
      :getToFunction="(item) => ({name: 'Event', params: {eventId: item.id}})" 
      :headers="headers" 
      :fetch="getEvents" 
      v-model="filters"
      :forceMobile="forceMobile"
    />
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";
import { getEvents } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const defaultFields = [
  {
    label: "Search by title",
    type: "string",
    key: "title",
    value: "",
    defaultValue: "",
  },
  {
    label: "Filter by classroom",
    type: "classroom",
    key: "classroom",
    value: null,
  },
  {
    label: "Filter by subject",
    type: "subject",
    key: "subject",
    value: null,
  },
  {
    label: "Filter by creator",
    type: "teacher",
    key: "created_by",
    value: null,
  },
  {
    label: "Is School Wide",
    type: "n_nary",
    key: "is_school_wide",
    value: null,
    fetchOptions: () => [
      { title: "All Events", value: null },
      { title: "School Wide Only", value: "True" },
      { title: "Non-School Wide Only", value: "False" },
    ],
  },
  {
    label: "Date Range",
    type: "dates",
    key: ["start", "end"],
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

const formatDate = (dateString) =>
  Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(dateString));

const headers = [
  { title: "Title", key: "title" },
  { title: "Start Time", key: "start", formatFunc: formatDate },
  { title: "End Time", key: "end", formatFunc: formatDate },
  { title: "Actions", key: "actions", sortable: false },
];
</script>
