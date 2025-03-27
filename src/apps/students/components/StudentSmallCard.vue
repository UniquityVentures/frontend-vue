<template>
    <v-card link v-if="student" variant="flat" class="border position-relative">
        <div class="menu-container">
            <slot name="menu"></slot>
        </div>
        <v-card-title class="text-subtitle-1">{{ student.user_details.full_name }}</v-card-title>
        <v-card-subtitle>{{ student.student_no }}</v-card-subtitle>
        <v-card-text>
            <BatchChip :batchId="student.batch" /><br>
            <v-chip>Roll No: {{ student.roll_no }}</v-chip>
        </v-card-text>
        <v-card-actions class="justify-center flex-wrap" >
            <v-btn :to="{ name: 'Student', params: { studentId: student.id }}" size="small">View / Edit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import BatchChip from '@/apps/batches/components/BatchChip.vue';
import { ref, onMounted } from 'vue';
import { getStudent } from '../api';

const props = defineProps({
    student: Object,
    studentId: [Number, String],
});

const student = ref(null);

onMounted(async () => {
    if (props.studentId) {
        student.value = await getStudent(props.studentId);
    } else {
        student.value = props.student;
    }
});
</script>

<style scoped>
.menu-container {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
}
</style>