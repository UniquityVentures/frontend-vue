<template>
    <ServerAutocomplete
        :fetch="getTeachers"
        :getInfo="getTeacherInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
        :label="label"
    />
</template>

<script setup>
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";

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
        default: "Select Teacher",
    }
});

</script>