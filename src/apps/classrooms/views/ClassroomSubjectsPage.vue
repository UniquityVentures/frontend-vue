<template>
    <v-container>
        <GenericList 
            :fetchFunction="getSubjects"
            :filter="filter"
            :title="'Subjects'"
            :config="subjectListConfig"
            :limit="25"
        />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import { getSubjects } from "@/apps/subjects/api";
import { subjectListConfig } from "@/apps/subjects/config";
import GenericList from "@/components/GenericList.vue";

const props = defineProps({
    classroomId: {
        type: String,
        required: true,
    },
});

const filter = ref({
    classroom: props.classroomId,
});
</script>