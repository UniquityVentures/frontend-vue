<template>  
  <v-chip
    v-if="classroom?.id"
    v-bind="props"
    class="classroom-chip"
    color="info"
    link
    :to="{ name: 'Classroom', params: { classroomId: classroom.id } }"
  >
    <strong v-if="label">{{ label }}: </strong>
    <v-avatar size="24" icon="mdi-school" />
    {{ classroom?.name || classroom?.id || 'Unknown Classroom' }}
  </v-chip>
</template>

<script setup>
const props = defineProps({
  classroom: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    default: ''
  },
});
</script>
