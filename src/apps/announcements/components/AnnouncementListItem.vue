<script setup>
import { ref, onMounted } from 'vue';
import { getAnnouncement } from '../api';
import TeacherChip from '@/apps/teachers/components/TeacherChip.vue';

const props = defineProps({
    announcementId: [Number, String],
    announcement: Object,
});

const announcement = ref(null);

onMounted(async () => {
    if (props.announcementId) {
        announcement.value = await getAnnouncement(props.announcementId);
    } else {
        announcement.value = props.announcement;
    }
});
</script>

<template>
    <v-list-item class="border" v-if="announcement">
        <v-list-item-title>{{ announcement.title }}</v-list-item-title>
        <v-list-item-subtitle class="text-wrap">{{ announcement.description }}</v-list-item-subtitle>
        <v-list-item-text>
            <TeacherChip label="Signed by" :teacher="announcement.signed_by_details" v-if="announcement.signed_by_details" />
        </v-list-item-text>
    </v-list-item>
</template>