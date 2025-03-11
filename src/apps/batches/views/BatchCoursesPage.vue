<template>
    <v-container>
        <GenericList 
            :fetchFunction="getCourses"
            :filter="filter"
            :title="'Courses'"
            :config="courseListConfig"
            :limit="25"
        />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getCourses } from "@/apps/courses/api";
import { courseListConfig } from "@/apps/courses/config";
import GenericList from "@/components/GenericList.vue";

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