<template>
  <v-container>
    <v-row v-if="teacher?.user_details">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8" sm="12">
            <!-- Teacher Details Card -->
            <TeacherCard :teacher="teacher" class="mb-4" />
            <template v-if="role == 'Admin'">
              <BatchesCard 
                class="mb-4" 
                title="Batches" 
                subtitle="Batches"
                :filters="{ teachers: props.teacherId }" 
              />
            </template>
            <template v-if="role == 'Admin'">
              <CoursesCard 
                :filters="{ teachers: props.teacherId }" 
                title="Courses"
                subtitle="Courses"
                class="mb-4" 
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
