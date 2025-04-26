<template>
  <template v-if="Array.isArray(teachers)">
    <v-chip
      v-for="teacher in teachers"
      :key="teacher.id"
      color="primary"
      link
      :to="accountRoute('Teacher', {  params: { teacherId: teacher.id } })"
    >
      <v-avatar size="24" icon="mdi-account-tie" />
      {{ teacher?.user_details?.full_name || 'Unknown' }}
    </v-chip>
  </template>
  
  <v-chip
    v-else-if="teachers?.id"
    color="primary"
    link
    :to="accountRoute('Teacher', {  params: { teacherId: teacher.id } })"
  >
    <strong v-if="label">{{ label }}: </strong>
    <v-avatar size="24" icon="mdi-account-tie" />
    {{ teachers?.user_details?.full_name || 'Unknown' }}
  </v-chip>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getTeacher } from "../api";
import { accountRoute } from "@/services/api";

const props = defineProps({
	teacher: {
		type: [Object, Array],
	},
	teacherId: {
		type: [String, Number, Array],
	},
	label: {
		type: String,
		default: null,
	},
});

const teachers = ref([]);

onMounted(async () => {
	if (props.teacherId) {
		if (Array.isArray(props.teacherId)) {
			teachers.value = await Promise.all(
				props.teacherId.map((id) => getTeacher(id)),
			);
		} else {
			teachers.value = [await getTeacher(props.teacherId)];
		}
	} else {
		teachers.value = props.teacher;
	}
});
</script>
