<template>
  <v-container class="columns-container" v-if="course">
    <CourseCard class="column-item" :course="course" />
    <v-card class="column-item">
      <v-card-title>Join Code</v-card-title>
      <v-card-subtitle>Join Code for this course</v-card-subtitle>
      <v-card-text>
        <v-text-field label="Join Code" :value="course.join_code" readonly persistent-placeholder>
          <template #append>
            <v-btn color="green" size="small" @click="copyJoinCode">{{ copyStatus }}</v-btn>
          </template>
        </v-text-field>
      </v-card-text>
    </v-card>
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
const copyStatus = ref('Copy');

const copyJoinCode = () => {
  navigator.clipboard.writeText(course.value.join_code)
    .then(() => {
      copyStatus.value = 'Copied';
      setTimeout(() => {
        copyStatus.value = 'Copy';
      }, 5000); // Reset back to "Copy" after 5 seconds
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

onMounted(async () => {
  course.value = await getCourse(props.courseId);
  teachers.value = (await getTeachers()).results;
});
</script>
