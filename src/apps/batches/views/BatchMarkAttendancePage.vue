<template>
    <v-container>
        <BatchAttendanceMarker v-if="batch" :batch="batch" />
    </v-container>
</template>

<script setup>
import BatchAttendanceMarker from "../components/BatchAttendanceMarker.vue";
import { getBatch } from "../api";
import { onMounted, ref } from "vue";

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