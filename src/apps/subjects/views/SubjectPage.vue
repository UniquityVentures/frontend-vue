<template>
  <v-container>
    <v-row align="center" justify="center" v-if="subject">
      <v-col>
        <v-row class="ma-2">
          <v-col cols="12" lg="4">
            <SubjectCard :subject="subject"></SubjectCard>
          </v-col>
          <v-col cols="12" lg="4">
            <AnnouncementsList 
              :filter="{ subject: subject.id }" 
              :to="`SubjectAnnouncements`" 
              :title="`Announcements`" 
            />
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
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";
import AssignmentsList from "@/apps/assignments/components/AssignmentsList.vue";
import SubjectCard from "@/apps/subjects/components/SubjectCard.vue";
import { api } from "@/services/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	subjectId: String,
});

const subject = ref({});

const getSubjectData = async () => {
	subject.value = (
		await api.get(`api/allocation/subjects/${props.subjectId}`)
	).data;
};

onMounted(async () => {
	getSubjectData();
});
</script>
  
