<template>
    <v-container>
        <CoursesLookup title="Courses" subtitle="All Courses" v-model:filters="filters" :hideFilters="true" />
    </v-container>
</template>

<script setup>
import CoursesLookup from "@/apps/courses/components/CoursesLookup.vue";
import { ref } from "vue";

const filters = ref({ is_active: true, sort_by: "name" });
</script>