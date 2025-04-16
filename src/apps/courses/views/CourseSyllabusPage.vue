<template>
    <v-container>  
        <SyllabusCard v-for="syllabus in syllabi" :key="syllabus.id" :syllabus="syllabus" />
    </v-container>
</template>

<script setup>
import SyllabusCard from "@/apps/syllabus/components/SyllabusCard.vue";
import { getSyllabi } from "@/apps/syllabus/api";
import { ref, onMounted } from "vue";

const props = defineProps({
    courseId: {
        type: [String, Number],
        required: true
    }
});

const syllabi = ref([]);

onMounted(async () => {
    syllabi.value = (await getSyllabi({ course: props.courseId })).results;   
});

</script>