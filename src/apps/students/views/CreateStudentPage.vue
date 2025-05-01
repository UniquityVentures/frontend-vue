<template>
	<v-container>
		<v-card class="mb-2">
			<v-card-title>
				Teacher
			</v-card-title>
			<v-card-subtitle>
				Create Teacher
			</v-card-subtitle>
		<UserForm
			v-if="stage===1"
			:action="handleCreateUser"
			v-model="user"
			actionName="Create User"
			title="Student User"
			subtitle="Create a user account for the student"
		/>

		<StudentForm
			v-if="stage===2"
			:user="user"
			:action="handleCreateStudent"
			actionName="Create Student"
			title="Student Details"
			subtitle="Add student-specific information"
		/>
		</v-card>
	</v-container>
</template>

<script setup>
import { createUser } from "@/apps/users/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createStudent } from "../api";
import StudentForm from "../components/StudentForm.vue";
import UserForm from "@/apps/users/components/UserForm.vue";

const router = useRouter();
const stage = ref(1);
const user = ref({});

const handleCreateUser = async (formData) => {
	try {
		user.value = await createUser(formData);
		stage.value = 2;
		return { success: true };
	} catch (error) {
		console.error("Failed to create user:", error);
		return { success: false, error };
	}
};

const handleCreateStudent = async (formData) => {
	try {
		const student = await createStudent({
			...formData,
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
