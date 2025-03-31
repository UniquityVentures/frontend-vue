<template>
  <v-chip v-if="batch" color="info"
    :to="{ name: 'Batch', params: { batchId: batch.id } }">
    <strong v-if="label">{{ label }}: </strong>
    <v-avatar size="24" icon="mdi-school" />
    {{ batch.name }}
  </v-chip>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getBatch } from '../api';

const props = defineProps({
  batch: {
    type: [Object],
  },
  batchId: {
	type: [String, Number],
  },
  label: {
    type: String,
    default: ''
  },
});

const batch = ref(null);

// Fetch batch data when component mounts
onMounted(async () => {
  if (props.batchId) {
    batch.value = await getBatch(props.batchId);
  } else {
    batch.value = props.batch;
  }
});
</script>
