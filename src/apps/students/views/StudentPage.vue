<template>
  <v-container class="columns-container">
    <StudentCard class="column-item" :student="student" v-if="student?.user_details" />
    <StudentGuardiansCard class="column-item" :student="student" v-if="student?.user_details" />
    <span v-if="student?.batch">
      <CoursesCard  class="column-item" :filters="{ batches: batch.id }" 
        :title="`Courses Taken`" :subtitle="`Courses in ${batch.name} (for now)`"/>
    </span>
  </v-container>
</template>

<script setup>
import { getBatch } from "@/apps/batches/api";
import CoursesCard from "@/apps/courses/components/CoursesCard.vue";
import { getStudent } from "@/apps/students/api";
import StudentCard from "@/apps/students/components/StudentCard.vue";
import StudentGuardiansCard from "@/apps/students/components/StudentGuardiansCard.vue";
import { onMounted, ref } from "vue";

const student = ref({});
const batch = ref({});

const props = defineProps({
	studentId: Number,
});

const fetchDetails = async () => {
	student.value = await getStudent(props.studentId);
	if (student.value?.batch) {
		batch.value = await getBatch(student.value?.batch);
	}
};

onMounted(fetchDetails);
</script>
