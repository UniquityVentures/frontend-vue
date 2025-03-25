<script setup>
import { ref, onMounted } from 'vue';
import { getTeacher } from '../api';

const props = defineProps({
    teacher: {
        type: Object,
    },
    teacherId: {
        type: [Number, String],
    },
});

const teacher = ref(null);

onMounted(async () => {
    if (props.teacherId) {
        teacher.value = await getTeacher(props.teacherId);
    } else {
        teacher.value = props.teacher;
    }
});
</script>

<template>
    <v-card v-if="teacher"
    height="100%" link :to="{ name: 'Teacher', params: { teacherId: teacher.id }}" variant="flat" class="border">
        <v-card-title class="text-subtitle-1">{{ teacher.user_details.full_name }}</v-card-title>
        <v-card-subtitle>{{ teacher.identifier }}</v-card-subtitle>
        <v-card-text>
            <v-chip prepend-icon="mdi-email" color="primary">
                {{ teacher.user_details.email }}
            </v-chip><br>
            <v-chip prepend-icon="mdi-whatsapp" color="green">
                {{ teacher.whatsapp }}
            </v-chip>
        </v-card-text>
    </v-card>
</template>
