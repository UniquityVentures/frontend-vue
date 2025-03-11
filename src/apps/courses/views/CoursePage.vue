<template>
  <v-container class="columns-container" v-if="course">
    <CourseCard class="column-item" :course="course" />
    <GenericList 
      class="column-item"
      :fetchFunction="getAssignments"
      :filter="{ course: course.id }" 
      :title="`Assignments`" 
      :viewAllRoute="`CourseAssignments`"
      :config="assignmentListConfig"
    />
  </v-container>
</template>
  
<script setup>
import { getAssignments } from "@/apps/assignments/api";
import { assignmentListConfig } from "@/apps/assignments/config";
import CourseCard from "@/apps/courses/components/CourseCard.vue";
import GenericList from "@/components/GenericList.vue";
import { getTeachers } from "@/apps/teachers/api";
import { api } from "@/services/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	courseId: String,
});

const teachers = ref([]);
const course = ref({});

const getCourseData = async () => {
	course.value = (
		await api.get(`api/allocation/courses/${props.courseId}`)
	).data;
};

onMounted(async () => {
	getCourseData();
	teachers.value = (await getTeachers()).results;
});
</script>
  
