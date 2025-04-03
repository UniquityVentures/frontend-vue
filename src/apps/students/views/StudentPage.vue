<template>
  <v-container>
    <v-row v-if="student?.user_details">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <!-- Student Details Card -->
            <StudentCard :student="student" class="mb-4" />
            
            <!-- Student Guardians Section -->
            <StudentGuardiansCard :student="student" class="mb-4" />
            
            <!-- Courses Section (if applicable) -->
            <CoursesCard 
              v-if="student?.batch" 
              :filters="{ batches: student.batch }" 
              :title="`Courses taken`"
              :subtitle="`Courses in ${batch?.name || 'Current Batch'}`"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <v-skeleton-loader type="card" class="mb-4" />
            <v-skeleton-loader type="card" class="mb-4" />
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
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
