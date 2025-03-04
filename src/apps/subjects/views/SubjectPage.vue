<template>
  <v-container>
    <v-row align="center" justify="center" v-if="subject">
      <v-col>
        <v-row class="ma-2">
          <v-col cols="12" lg="4">
            <SubjectCard :subject="subject"></SubjectCard>
          </v-col>
          <v-col cols="12" lg="4">
            <AssignmentsList 
              :filter="{ subject: subject.id }" 
              :title="`Assignments`" 
              :to="`SubjectAssignments`"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script setup>
import AssignmentsList from "@/apps/assignments/components/AssignmentsList.vue";
import SubjectCard from "@/apps/subjects/components/SubjectCard.vue";
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
  
