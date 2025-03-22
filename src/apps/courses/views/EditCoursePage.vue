<template>
	<v-container>
		<FormCard
			v-if="course"
			title="Course"
			actionName="Update"
			:formFields="formFields"
			:action="handleUpdateCourse"
		/>
		<v-skeleton-loader v-else type="card"></v-skeleton-loader>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { onMounted, ref } from "vue";
import { getCourse, updateCourse } from "../api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
	courseId: {
		type: [Number, String],
		required: true,
	},
});

const course = ref(null);
const formFields = ref([
	{ label: "Name", type: FIELD_TYPES.STRING, key: "name", required: true },
	{ label: "Course Code", type: FIELD_TYPES.STRING, key: "code" },
	{ label: "Description", type: FIELD_TYPES.LONGSTRING, key: "description" },
	{
		label: "Teachers",
		type: FIELD_TYPES.TEACHERS,
		key: "teachers",
		required: false,
	},
	{
		label: "Batches",
		type: FIELD_TYPES.BATCHES,
		key: "batches",
		required: false,
	},
	{ label: "Is Active", type: FIELD_TYPES.BOOLEAN, key: "is_active" },
	{ hidden: true, type: FIELD_TYPES.INTEGER, key: "id" },
]);

const handleUpdateCourse = async (courseData) => {
	try {
		courseData.id = props.courseId;
		await updateCourse(courseData);
		router.push({ name: "Course", params: { courseId: props.courseId } });
		return { success: true };
	} catch (error) {
		console.error("Failed to update course:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	try {
		course.value = await getCourse(props.courseId);

		// Update model with default values from the existing course
		formFields.value = formFields.value.map((field) => {
			return {
				...field,
				defaultValue: course.value[field.key],
			};
		});
	} catch (error) {
		console.error("Failed to load course:", error);
	}
});
</script>
