<template>
	<v-container>
		<TeacherForm
			v-if="stage===1"
			:isUserForm="true"
			:action="handleCreateUser"
			actionName="Create User"
			title="Teacher User"
			subtitle="Create a user account for the teacher"
		/>

		<TeacherForm
			v-if="stage===2"
			:user="user"
			:isUserForm="false"
			:action="handleCreateTeacher"
			actionName="Create Teacher"
			title="Teacher Details"
			subtitle="Add teacher-specific information"
		/>
	</v-container>
</template>

<script setup>
import TeacherForm from "../components/TeacherForm.vue";
import { ref } from "vue";
import { createTeacher } from "../api";
import { createUser } from "@/apps/users/api";
import { useRouter } from "vue-router";

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

const handleCreateTeacher = async (teacherData) => {
	try {
		const teacher = await createTeacher({ ...teacherData, user: user.value.id });
		router.push({ name: "Teacher", params: { teacherId: teacher.id } });
		return { success: true };
	} catch (error) {
		console.error("Failed to create teacher:", error);
		return { success: false, error };
	}
};
</script>
