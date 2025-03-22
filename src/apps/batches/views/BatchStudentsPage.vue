<template>
    <v-container>
        <BatchStudents v-if="batch" :batch="batch" />
    </v-container>
</template>

<script setup>
import BatchStudents from '@/apps/batches/components/BatchStudents.vue';
import { ref, onMounted } from 'vue';
import { getBatch } from '@/apps/batches/api';

const props = defineProps({
    batchId: [Number, String],
});

const batch = ref(null);

onMounted(async () => {
    batch.value = await getBatch(props.batchId);
});

</script>