<template>
	<v-container>
		<UserForm
			:action="handleUpdateUser"
			v-model="user"
			actionName="Update User"
			title="Student User"
			subtitle="Update the user account for the student"
			class="mb-4"
		/>
		<StudentForm
			v-if="student && user"
			:student="student"
			:user="user"
			:action="handleStudentUpdate"
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
import UserForm from "@/apps/users/components/UserForm.vue";

const props = defineProps({
	studentId: {
		type: Number,
		required: true,
	},
});

const student = ref(null);
const user = ref(null);

const handleStudentUpdate = async (formData) => {
	try {
		// Update both user and student data
		await updateStudent(formData);
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

const handleUpdateUser = async (userData) => {
	try {
		user.value = await updateUser(userData);
		return { success: true };
	} catch (error) {
		console.error("Failed to create user:", error);
		return { success: false, error };
	}
};
</script>
