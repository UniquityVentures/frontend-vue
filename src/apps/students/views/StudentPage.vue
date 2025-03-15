<template>
  <v-container class="columns-container">
    <StudentCard class="column-item" :student="student" v-if="student?.user_details" />
    <StudentGuardiansCard class="column-item" :student="student" v-if="student?.user_details" />
    <v-card class="column-item">
      <v-card-title>Batch</v-card-title>
      <v-card-text>
        <v-list-item link class="border">
          <v-list-item-title>{{ student.batch_details?.name }}</v-list-item-title>
          <v-list-item-subtitle>Roll Number: {{ student.roll_no }}</v-list-item-subtitle>
          <v-list-item-text>
            <TeacherChip v-if="batch.class_teacher_details" :teacher="batch.class_teacher_details" :label="`Teacher`"/>
          </v-list-item-text>
        </v-list-item>
      </v-card-text>
    </v-card>
    <CoursesList class="column-item" :filters="{ students: student.id }" :title="`Courses Taken`"/>
  </v-container>
</template>

<script setup>
import { getStudent } from "@/apps/students/api";
import StudentCard from "@/apps/students/components/StudentCard.vue";
import StudentGuardiansCard from "@/apps/students/components/StudentGuardiansCard.vue";
import { onMounted, ref } from "vue";
import CoursesList from "@/apps/courses/components/CoursesList.vue";
import { getBatch } from "@/apps/batches/api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";

const student = ref({});
const batch = ref({});

const props = defineProps({
	studentId: Number,
});

const fetchDetails = async () => {
	student.value = await getStudent(props.studentId);
	batch.value = await getBatch(student.value.batch_details.id);
};

onMounted(fetchDetails);
</script>
