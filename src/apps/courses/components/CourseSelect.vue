<template>
    <ServerAutocomplete
        :fetch="getCourses"
        :getInfo="getCourseInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
    />
</template>

<script setup>
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";

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
        default: "Select Course",
    }
});
</script>