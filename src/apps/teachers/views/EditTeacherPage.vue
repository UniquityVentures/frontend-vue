<template>
	<v-container>
		<TeacherForm
			v-if="teacher && user"
			:teacher="teacher"
			:user="user"
			:action="handleUpdate"
			actionName="Update"
			title="Teacher"
			subtitle="Edit teacher details"
		/>
	</v-container>
</template>

<script setup>
import { getUser, updateUser } from "@/apps/users/api";
import TeacherForm from "../components/TeacherForm.vue";
import { onMounted, ref } from "vue";
import { getTeacher, updateTeacher } from "../api";

const props = defineProps({
	teacherId: {
		type: Number,
		required: true,
	},
});

const teacher = ref(null);
const user = ref(null);

const handleUpdate = async (formData) => {
	try {
		// Extract user-specific fields
		const userData = {
			id: user.value.id,
			first_name: formData.first_name,
			last_name: formData.last_name,
			email: formData.email,
			is_active: formData.is_active,
			is_approved: formData.is_approved,
		};

		// Extract teacher-specific fields
		const teacherData = {
			id: teacher.value.id,
			identifier: formData.identifier,
			phone: formData.phone,
			whatsapp: formData.whatsapp,
			user: user.value.id,
		};

		// Update both user and teacher data
		await updateUser(userData);
		await updateTeacher(teacherData);
		return { success: true };
	} catch (error) {
		console.error("Failed to update teacher:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	teacher.value = await getTeacher(props.teacherId);
	user.value = await getUser(teacher.value.user);
});
</script>
