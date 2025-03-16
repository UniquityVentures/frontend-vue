<template>
  <v-container class="columns-container">
    <StudentCard class="column-item" :student="student" v-if="student?.user_details" />
    <StudentGuardiansCard class="column-item" :student="student" v-if="student?.user_details" />
    <v-card class="column-item">
      <v-card-title>Batch</v-card-title>
      <v-card-text>
        
      </v-card-text>
    </v-card>
    <CoursesCard class="column-item" :filters="{ students: student.id }" :title="`Courses Taken`" :subtitle="`Courses Taken by ${student.user_details?.full_name}`"/>
  </v-container>
</template>

<script setup>
import { getStudent } from "@/apps/students/api";
import StudentCard from "@/apps/students/components/StudentCard.vue";
import StudentGuardiansCard from "@/apps/students/components/StudentGuardiansCard.vue";
import { onMounted, ref } from "vue";
import CoursesCard from "@/apps/courses/components/CoursesCard.vue";
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
