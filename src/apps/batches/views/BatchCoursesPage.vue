<template>
    <v-container>
        <CoursesList 
            :fetchFunction="getCourses"
            :filter="filter"
            title="Courses"
            :limit="25"
        />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getCourses } from "@/apps/courses/api";
import CoursesList from "@/apps/courses/components/CoursesList.vue";

const props = defineProps({
    batchId: {
        type: String,
        required: true,
    },
});

const filter = ref({
    batch: props.batchId,
});
</script>