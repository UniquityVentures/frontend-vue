<template>
    <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <FilterCard :fields="fields" :exportFunction="exportAssignments" v-model:filters="filters" />
        </v-card-text>
        <ResponsiveDataTable
            :getToFunction="(item) => ({ name: 'Assignment', params: { assignmentId: item.id } })"
            :headers="defaultHeaders"
            :fetch="getAssignments"
            v-model:filters="filters"
        />
    </v-card>
</template>

<script setup>
import { ref } from "vue";
import { getAssignments, exportAssignments } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
    title: {
        type: String,
        default: "Assignments",
    },
    subtitle: {
        type: String,
        default: "Assignments Master List",
    },
});

const defaultHeaders = [
    { label: "Title", key: "title" },
    { label: "Description", key: "description", type: "longstring" },
    { label: "Due Date", key: "due_date", type: "date" },
    { label: "Course", key: "course_details.name", type: "course" },
    { label: "Created By", key: "created_by_details", type: "teacher" },
];

const fields = ref(props.overrideFields ?? [
    { label: "Search by title", type: "string", key: "title", value: "", defaultValue: "" },
    { label: "Filter by course", type: "course", key: "course", value: null },
    { label: "Due Date Range", type: "dates", key: ["due_date_start", "due_date_end"], value: null },
]);

const filters = ref({});
</script>