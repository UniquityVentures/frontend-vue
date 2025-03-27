<template>
    <ServerAutocomplete
        :fetch="getStudents"
        :getInfo="getStudentInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
    />
</template>

<script setup>
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { getStudentInfoFromObj, getStudents } from "@/apps/students/api";

const props = defineProps({
    multiple: {
        type: Boolean,
        default: false,
    },
    searchField: {
        type: String,
        default: "name",
    },
    rules: {
        type: Array,
        default: () => [],
    },
    label: {
        type: String,
        default: "Select Student/s",
    }
});
</script>
