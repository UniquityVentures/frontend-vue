<template>
    <v-container v-if="course">
        <v-btn prepend-icon="mdi-plus" color="primary" :to="accountRoute( 'CreateAnnouncement', { query: {course: [course.id]} })">
            Create New Announcement</v-btn>
        <v-btn prepend-icon="mdi-view-list" color="grey-darken-2" :to="accountRoute( 'Announcements', { query: {course: course.id} })">
            View All Announcements</v-btn>
        <v-divider/>
        <ResponsiveDataTable :fetch="getAnnouncements" v-model:filters="filters" title="Announcements"
            :subtitle="`Announcements for ${course.name}`">
            <template #filters-slot>
                <v-row>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by title" v-model="filters.title" />
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="4">
                        <v-text-field label="Search by description" v-model="filters.description" />
                    </v-col>
                </v-row>
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
                        <AnnouncementSmallCard :announcement="item" />
                    </v-col>
                </v-row>
            </template>
            <template #list-slot="{ items }">
                <v-list lines="three">
                    <AnnouncementListItem v-for="item in items" :key="item.id" :announcement="item" />
                </v-list>
            </template>
        </ResponsiveDataTable>
    </v-container>
</template>

<script setup>
import {accountRoute} from "@/services/api";
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementListItem from "@/apps/announcements/components/AnnouncementListItem.vue";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import { getCourse } from "@/apps/courses/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { onMounted, ref } from "vue";

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
 
