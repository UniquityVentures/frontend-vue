<template>  
  <template v-if="Array.isArray(course)">
    <v-chip
      v-for="(item, index) in course"
      :key="item.id"
      v-bind="chipProps"
      color="primary"
      link
      :to="{ name: 'Course', params: { courseId: item.id } }"
    >
      <v-avatar size="24" icon="mdi-book-open-variant" />
      {{ item?.name || item?.id || 'Unknown Course' }}
    </v-chip>
  </template>
  
  <v-chip
    v-else-if="course?.id"
    v-bind="chipProps"
    class="course-chip"
    color="primary"
    link
    :to="{ name: 'Course', params: { courseId: course.id } }"
  >
    <strong v-if="label">{{ label }}: </strong>
    <v-avatar size="24" icon="mdi-book-open-variant" />
    {{ course?.name || course?.id || 'Unknown Course' }}
  </v-chip>
</template>

<script setup>
const props = defineProps({
	course: {
		type: [Object, Array],
		required: true,
	},
	label: {
		type: String,
		default: "",
	},
	chipProps: {
		type: Object,
		default: () => ({}),
	},
});
</script>
