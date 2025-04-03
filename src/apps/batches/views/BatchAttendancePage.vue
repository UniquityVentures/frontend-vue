<template>
    <v-container>
        <BatchAttendanceLookup v-if="batch" :batch="batch" />
    </v-container>
</template>

<script setup>
import BatchAttendanceLookup from "@/apps/batches/components/BatchAttendanceLookup.vue";
import { getBatch } from "@/apps/batches/api";
import { ref, onMounted } from "vue";

const props = defineProps({
    batchId: {
        type: [Number, String],
        required: true,
    },
});

const batch = ref(null);

onMounted(async () => {
    batch.value = await getBatch(props.batchId);
});
</script>