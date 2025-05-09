<template>
    <v-container v-if="course">
        <v-btn prepend-icon="mdi-plus" color="accent" :to="{ name: 'CreateAnnouncement', query: {course: [course.id]} }">
            Create New Announcement</v-btn>
        <v-btn prepend-icon="mdi-view-list" color="grey-darken-2" :to="{ name: 'AnnouncementsMaster', query: {course: course.id} }">
            View All Announcements</v-btn>
        <v-divider/>
		<NoticeBoard :filters="{course: courseId}" />
    </v-container>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementListItem from "@/apps/announcements/components/AnnouncementListItem.vue";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import { getCourse } from "@/apps/courses/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { onMounted, ref } from "vue";
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";

const props = defineProps({
    courseId: {
        type: [String, Number],
        required: true,
    },
});

const course = ref(null);
const filters = ref({ course: props.courseId });

onMounted(async () => {
    course.value = await getCourse(props.courseId);
});
</script>
 
