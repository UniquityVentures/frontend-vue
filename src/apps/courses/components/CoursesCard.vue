<template>
    <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
        <ResponsiveDataTable 
            :getToFunction="(item) => ({name: 'Course', params: {courseId: item.id}})" 
            :headers="courseDefaultHeaders" 
            :fetch="getCourses" 
            v-model="filter"
            desktopTemplate="card"
            mobileTemplate="card"
            forceMobile="true"
        />
    </v-card>
</template>

<script setup>
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getCourses } from "../api";
import { courseDefaultHeaders } from "../config";

const props = defineProps({
    filter: {
        type: Object,
        default: () => ({}),
    },
    title: {
        type: String,
        default: () => 'Courses',
    },
    subtitle: {
        type: String,
        default: () => 'Courses',
    },
});

const filter = ref(props.filter);
</script>
