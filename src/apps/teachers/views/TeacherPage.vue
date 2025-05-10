<template>
  <v-container>
    <v-row v-if="teacher?.user_details">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="6" sm="12">
            <!-- Teacher Details Card -->
            <TeacherCard :teacher="teacher" class="mb-4" />
            <template v-if="role == 'Admin'">
              <!-- Leading Batches Card (if applicable) -->
              <BatchesCard 
                v-if="teacher?.batches_leading?.length > 0"
                class="mb-4" 
                title="Leading Batches" 
                :filters="{ teachers: props.teacherId }" 
              />

              <!-- Assisting Batches Card (if applicable) -->
              <BatchesCard 
                v-if="teacher?.batches_assisting?.length > 0"
                title="Assisting Batches" 
                :filters="{ teachers: props.teacherId }" 
                class="mb-4" 
              />
            </template>
          </v-col>
          <v-col lg="6" sm="12">
            <template v-if="role == 'Admin'">

              <CoursesCard 
                v-if="teacher?.courses_leading?.length" 
                :filters="{ teachers: props.teacherId }" 
                title="Leading Courses"
                class="mb-4" 
              />

              <CoursesCard 
                v-if="teacher?.courses_assisting?.length" 
                :filters="{ teacher: props.teacherId }" 
                title="Assisting Courses"
              />
            </template>
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
import BatchesCard from "@/apps/batches/components/BatchesCard.vue";
import { getTeacher } from "@/apps/teachers/api";
import TeacherCard from "@/apps/teachers/components/TeacherCard.vue";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import CoursesCard from "@/apps/courses/components/CoursesCard.vue";

const authStore = useAuthStore();
const role = authStore.getRole;

const teacher = ref({});

const props = defineProps({
	teacherId: [Number, String],
});

const fetchDetails = async () => {
	teacher.value = await getTeacher(props.teacherId);
};

onMounted(fetchDetails);
</script>
