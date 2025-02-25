<template>
  <v-container>
  <v-row class="d-flex flex-wrap justify-center">
    <v-col cols="12" lg="4">
      <AnnouncementsList 
      title="School-wide Announcements"
      subtitle="Important announcements for all students and staff"
      :filter="{ 'is_school_wide': 'True' }"
    />
    </v-col>
    <v-col cols="12" lg="4">
      <StudentsStatsCard />
    </v-col>
    <v-col cols="12" lg="4">
      <TeachersStatsCard />
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import AnnouncementsList from "@/apps/announcements/components/AnnouncementsList.vue";
import StudentsStatsCard from "@/apps/students/components/StudentsStatsCard.vue";
import TeachersStatsCard from "@/apps/teachers/components/TeachersStatsCard.vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: {
		AnnouncementsList,
		StudentsStatsCard,
		TeachersStatsCard,
	},
	setup() {
		return {};
	},
});
</script>
