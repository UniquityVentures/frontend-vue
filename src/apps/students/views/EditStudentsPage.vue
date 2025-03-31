<template>
	<v-container>
		<StudentForm
			v-if="student && user"
			:student="student"
			:user="user"
			:action="handleUpdate"
			actionName="Update"
			title="Student"
			subtitle="Edit student details"
		/>
	</v-container>
</template>

<script setup>
import { getUser, updateUser } from "@/apps/users/api";
import { onMounted, ref } from "vue";
import { getStudent, updateStudent } from "../api";
import StudentForm from "../components/StudentForm.vue";

const props = defineProps({
	studentId: {
		type: Number,
		required: true,
	},
});

const student = ref(null);
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

		// Extract student-specific fields
		const studentData = {
			id: student.value.id,
			identifier: formData.identifier,
			batch: formData.batch,
			phone: formData.phone,
			whatsapp: formData.whatsapp,
			user: user.value.id,
		};

		// Update both user and student data
		await updateUser(userData);
		await updateStudent(studentData);
		return { success: true };
	} catch (error) {
		console.error("Failed to update student:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	student.value = await getStudent(props.studentId);
	user.value = await getUser(student.value.user);
});
</script>
