<template>  
  <template v-if="Array.isArray(batch)">
    <v-chip
      v-for="(room, index) in batch"
      :key="room.id"
      v-bind="chipProps"
      color="info"
      link
      :to="{ name: 'Batch', params: { batchId: room.id } }"
    >
      <v-avatar size="24" icon="mdi-school" />
      {{ room?.name || room?.id || 'Unknown Batch' }}
    </v-chip>
  </template>
  
  <v-chip
    v-else-if="batch?.id"
    v-bind="chipProps"
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
const props = defineProps({
  batch: {
    type: [Object, Array],
    required: true,
  },
  label: {
    type: String,
    default: ''
  },
  chipProps: {
    type: Object,
    default: () => ({})
  }
});
</script>
