<template>
  <v-container class="columns-container" v-if="subject">
    <SubjectCard class="column-item" :subject="subject" />
    <GenericList 
      class="column-item"
      :fetchFunction="getAssignments"
      :filter="{ subject: subject.id }" 
      :title="`Assignments`" 
      :viewAllRoute="`SubjectAssignments`"
      :config="assignmentListConfig"
    />
  </v-container>
</template>
  
<script setup>
import { getAssignments } from "@/apps/assignments/api";
import { assignmentListConfig } from "@/apps/assignments/config";
import SubjectCard from "@/apps/subjects/components/SubjectCard.vue";
import GenericList from "@/components/GenericList.vue";
import { getTeachers } from "@/apps/teachers/api";
import { api } from "@/services/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	subjectId: String,
});

const teachers = ref([]);
const subject = ref({});

const getSubjectData = async () => {
	subject.value = (
		await api.get(`api/allocation/subjects/${props.subjectId}`)
	).data;
};

onMounted(async () => {
	getSubjectData();
	teachers.value = (await getTeachers()).results;
});
</script>

<style scoped>
@import "@/assets/styles/cardLayout.css";
</style>
  
