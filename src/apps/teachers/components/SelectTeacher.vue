<template>
    <ServerAutocomplete
        :fetch="getTeachers"
        :getInfo="getTeacherInfoFromObj"
        :searchField="searchField"
        :multiple="multiple"
        :rules="rules"
    />
</template>

<script setup>
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";

const props = defineProps({
    multiple: {
        type: Boolean,
    },
});



</script>