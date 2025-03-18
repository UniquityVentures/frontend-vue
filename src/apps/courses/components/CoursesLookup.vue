<template>
    <v-card variant="flat">
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>

		<FilterCard 
                :fields="fields"
                :exportFunction="exportCourses"
                v-model:filters="filters"
            /> 
        <ResponsiveDataTable 
            :getToFunction="(item) => ({name: 'Course', params: {courseId: item.id}})" 
            :headers="courseDefaultHeaders" 
            :fetch="getCourses" 
            v-model:filters="filters"
            desktopTemplate="card"
            mobileTemplate="card"
        />
    </v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { getCourses, exportCourses } from "../api";
import { courseDefaultHeaders, courseDefaultFilterFields } from "../config";

const props = defineProps({
    title: {
        type: String,
        default: () => 'Courses',
    },
    subtitle: {
        type: String,
        default: () => 'Courses Master List',
    },
});

const fields = ref(courseDefaultFilterFields);
const filters = ref({})

</script>
