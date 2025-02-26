<template>
    <v-container>
        <v-card>
            <v-card-title>
                Announcements for {{ classroom?.name }}
                <v-btn variant="outlined" class="ma-2" @click="filters.announcing_now = null">
                    Show All
                </v-btn>
                <v-btn variant="outlined" class="ma-2" @click="filters.announcing_now = 'True'">
                    Show Current
                </v-btn>
            </v-card-title>
            <v-card-text>
                <ResponsiveDataTable
                    :getToFunction="(item) => ({name: 'Announcement', params: {announcementId: item.id}})"
                    :headers="announcementHeaders"
                    :fetch="getAnnouncements"
                    v-model="filters"
                />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { getAnnouncements, announcementHeaders } from "@/apps/announcements/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { getClassroom } from "@/apps/classrooms/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	classroomId: {
		type: String,
		required: true,
	},
});

const classroom = ref(null);
const filters = ref({
	classroom: props.classroomId,
    announcing_now: "True",
});

onMounted(async () => {
	classroom.value = await getClassroom(props.classroomId);
});
</script>
