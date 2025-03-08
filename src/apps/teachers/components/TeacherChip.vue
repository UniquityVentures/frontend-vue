<template>
<v-chip
    v-bind="props"
    class="teacher-chip"
    variant="outlined"
    color="primary"
    size="small"
    link
    :to="{ name: 'Teacher', params: { teacherId: teacher.id } }"
>
    <strong v-if="label">{{ label }}: </strong>
    <v-avatar size="24" icon="mdi-account-tie" />
    {{ teacher?.user_details?.full_name || 'Unknown' }}
</v-chip>
</template>

<script setup>
const props = defineProps({
  teacher: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
});
</script>
