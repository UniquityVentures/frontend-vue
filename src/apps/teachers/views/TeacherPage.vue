<template>
  <v-container class="columns-container">
        <TeacherCard class="column-item" :teacher="teacher" v-if="teacher?.user_details" />
        <BatchesCard 
          v-if="teacher?.batches_leading?.length > 0"
          class="column-item" 
          :title="'Leading Batches'" 
          :filters="{ class_teacher: props.teacherId }" />
        <BatchesCard 
          v-if="teacher?.batches_assisting?.length > 0"
          class="column-item" 
          :title="'Assisting Batches'" 
          :filters="{ teacher: props.teacherId }" />
  </v-container>
</template>

<script setup>
import BatchesCard from "@/apps/batches/components/BatchesCard.vue";
import { getTeacher } from "@/apps/teachers/api";
import TeacherCard from "@/apps/teachers/components/TeacherCard.vue";
import { onMounted, ref } from "vue";

const teacher = ref({});

const props = defineProps({
	teacherId: Number,
});

const fetchDetails = async () => {
	teacher.value = await getTeacher(props.teacherId);
};

onMounted(fetchDetails);
</script>
