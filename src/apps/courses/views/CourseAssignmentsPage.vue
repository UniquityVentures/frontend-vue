<template>
    <v-container>
        <AssignmentsLookup :title="`Assignments`" :subtitle="`Assignments for ${course?.name} - ${course?.code}`" 
		:overrideFields="fields" />
    </v-container>
</template>

<script setup>
import AssignmentsLookup from "@/apps/assignments/components/AssignmentsLookup.vue";
import { getCourse } from "@/apps/courses/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	courseId: {
		type: String,
		required: true,
	},
});

const course = ref(null);

const fields = ref([
	{ label: "Title", type: "string", key: "title", required: true },
	{ label: "Description", type: "string", key: "description", required: true },
	{
		label: "Course",
		type: "course",
		key: "course",
		required: true,
		value: Number(props.courseId),
		disabled: true,
		hidden: true,
	},
	{
		label: "Release Date",
		type: "dates",
		key: ["release_start", "release_end"],
		required: true,
	},
	{
		label: "Expiry Date",
		type: "dates",
		key: ["expiry_start", "expiry_end"],
		required: true,
	},
]);

onMounted(async () => {
	course.value = await getCourse(props.courseId);
});
</script>
