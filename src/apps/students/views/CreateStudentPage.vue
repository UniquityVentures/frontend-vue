<template>
	<v-container>
		<StudentForm
			v-if="stage===1"
			:isUserForm="true"
			:action="handleCreateUser"
			actionName="Create User"
			title="Student User"
			subtitle="Create a user account for the student"
		/>

		<StudentForm
			v-if="stage===2"
			:user="user"
			:isUserForm="false"
			:action="handleCreateStudent"
			actionName="Create Student"
			title="Student Details"
			subtitle="Add student-specific information"
		/>
	</v-container>
</template>

<script setup>
import { createUser } from "@/apps/users/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createStudent } from "../api";
import StudentForm from "../components/StudentForm.vue";

const router = useRouter();
const stage = ref(1);
const user = ref({});

const handleCreateUser = async (userData) => {
	try {
		user.value = await createUser(userData);
		stage.value = 2;
		return { success: true };
	} catch (error) {
		console.error("Failed to create user:", error);
		return { success: false, error };
	}
};

const handleCreateStudent = async (studentData) => {
	try {
		const student = await createStudent({
			...studentData,
			user: user.value.id,
		});
		router.push({ name: "Student", params: { studentId: student.id } });
		return { success: true };
	} catch (error) {
		console.error("Failed to create student:", error);
		return { success: false, error };
	}
};
</script>
