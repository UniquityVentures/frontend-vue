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
    <v-avatar start size="24">
    <v-img v-if="teacher?.user_details?.avatar" :src="teacher.user_details.avatar" alt="teacher"></v-img>
    <v-icon v-else>mdi-account-tie</v-icon>
    </v-avatar>
    {{ teacher?.user_details?.full_name || 'Unknown' }}
    <v-icon v-if="showIcon" end size="small" class="ml-1">mdi-open-in-new</v-icon>
</v-chip>
</template>

<script setup>
const props = defineProps({
  teacher: {
    type: Object,
    required: true
  },
});
</script>
