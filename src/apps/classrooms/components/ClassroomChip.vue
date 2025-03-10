<template>  
  <template v-if="Array.isArray(classroom)">
    <v-chip
      v-for="(room, index) in classroom"
      :key="room.id"
      v-bind="chipProps"
      color="info"
      link
      :to="{ name: 'Classroom', params: { classroomId: room.id } }"
    >
      <v-avatar size="24" icon="mdi-school" />
      {{ room?.name || room?.id || 'Unknown Classroom' }}
    </v-chip>
  </template>
  
  <v-chip
    v-else-if="classroom?.id"
    v-bind="chipProps"
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
