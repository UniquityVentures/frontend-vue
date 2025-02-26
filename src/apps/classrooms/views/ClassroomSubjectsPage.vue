<template>
    <v-container>
        <SubjectsList :filter="{ classroom: props.classroomId }" />
    </v-container>
</template>

<script setup>
import SubjectsList from "@/apps/subjects/components/SubjectsList.vue";

const props = defineProps({
    classroomId: Number,
});
</script>
