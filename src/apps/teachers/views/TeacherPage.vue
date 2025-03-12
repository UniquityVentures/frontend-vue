<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="4">
        <TeacherCard :teacher="teacher" v-if="teacher?.user_details" />
      </v-col>
    </v-row>
    <v-row v-if="teacher?.batches_leading?.length > 0">
      <v-col cols="12">
        <h4 class="text-h6 mb-4">Class Teacher for Batches</h4>
        <BatchesCard :filter="{ class_teacher: props.teacherId }" />
      </v-col>
    </v-row>
    <v-row v-if="teacher?.batches_assisting?.length > 0">
      <v-col cols="12">
        <h4 class="text-h6 mb-4">Teaching Batches</h4>
        <BatchesCard :filter="{ teacher: props.teacherId }" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import BatchesCard from "@/apps/batches/components/BatchesCard";
import { getTeacher } from "@/apps/teachers/api";
import TeacherCard from "@/apps/teachers/components/TeacherCard";
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
