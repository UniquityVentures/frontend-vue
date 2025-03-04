<template>
    <v-container>
        <SubjectsList :filter="filter" />
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import SubjectsList from "@/apps/subjects/components/SubjectsList.vue";

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