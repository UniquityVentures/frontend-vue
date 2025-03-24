<template>  
  <template v-if="Array.isArray(batch)">
    <v-chip
      v-for="(room, index) in batch"
      :key="room.id"
      color="info"
      link
      :to="{ name: 'Batch', params: { batchId: room.id } }"
    >
      <v-avatar size="24" icon="mdi-school" />
      {{ room?.name || 'Unknown Batch' }}
    </v-chip>
  </template>
  
  <v-chip
    v-else-if="batch?.id"
    class="batch-chip"
    color="info"
    link
    :to="{ name: 'Batch', params: { batchId: batch.id } }"
  >
    <strong v-if="label">{{ label }}: </strong>
    <v-avatar size="24" icon="mdi-school" />
    {{ batch?.name || batch?.id || 'Unknown Batch' }}
  </v-chip>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getBatch } from '../api';  // Add this import

const props = defineProps({
  batch: {
    type: [Object, Array],
  },
  batchId: {
    type: [String, Array, Number],
  },
  label: {
    type: String,
    default: ''
  },
});

const batch = ref([]);

// Fetch batch data when component mounts
onMounted(async () => {
  if (props.batchId) {
    if (Array.isArray(props.batchId)) {
      batch.value = await Promise.all(props.batchId.map(id => getBatch(id)));
    } else {
      batch.value = [await getBatch(props.batchId)];
    }
  } else {
    batch.value = props.batch;
  }
});
</script>
