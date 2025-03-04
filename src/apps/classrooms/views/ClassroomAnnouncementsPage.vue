<template>
    <v-container>
        <v-card variant="flat">
            <v-card-title>Announcements for {{ classroom?.name }}</v-card-title>
            <ResponsiveDataTable
            :getToFunction="(item) => ({ name: 'Announcement', params: { announcementId: item.id } })"
            :headers="announcementDefaultHeaders"
            :fetch="getAnnouncements"
            v-model="filters"
            />
        </v-card>
    </v-container>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import { announcementDefaultHeaders } from "@/apps/announcements/config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, onMounted } from "vue";
import { getClassroom } from "@/apps/classrooms/api";

const props = defineProps({
	classroomId: {
		type: [String, Number],
		required: true
	}
});

const filters = ref({
	classroom: props.classroomId,
});

const classroom = ref(null);

onMounted(async () => {
	classroom.value = await getClassroom(props.classroomId);
});

</script>
