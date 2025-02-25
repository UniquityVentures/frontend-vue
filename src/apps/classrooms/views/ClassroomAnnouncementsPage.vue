<template>
    <v-container>
        <v-card>
            <v-card-title>
                Announcements for {{ classroom?.name }}
            </v-card-title>
            <v-card-text>
                <AnnouncementsLookup
                    :initialFields="[{
                        key: 'classroom',
                        value: Number(classroomId),
                        disabled: true
                    }]"
                />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import AnnouncementsLookup from "@/apps/announcements/components/AnnouncementsLookup.vue";
import { getClassroom } from "@/apps/classrooms/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	classroomId: {
		type: String,
		required: true,
	},
});

const classroom = ref(null);

onMounted(async () => {
	classroom.value = await getClassroom(props.classroomId);
});
</script>
