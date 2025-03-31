<template>
  <v-container class="columns-container" v-if="course">
    <CourseCard class="column-item" :course="course" />
  </v-container>
</template>
  
<script setup>
import CourseCard from "@/apps/courses/components/CourseCard.vue";
import { getTeachers } from "@/apps/teachers/api";
import { onMounted, ref } from "vue";
import { getCourse } from "../api";

const props = defineProps({
	courseId: String,
});

const teachers = ref([]);
const course = ref({});

onMounted(async () => {
	course.value = await getCourse(props.courseId);
	teachers.value = (await getTeachers()).results;
});
</script>
  
